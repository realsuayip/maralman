import crypto from "crypto";
import aes from "$lib/server/aes.js";

import { env as pub } from "$env/dynamic/public";
import { env } from "$env/dynamic/private";
import { ServerClient } from "$lib/server/api-client.js";
import { error, redirect } from "@sveltejs/kit";

const AUTH_SESSION_COOKIE = "sessionid";
const OAUTH_AUTHORIZE_URL = pub.PUBLIC_CLIENT_BASE_URL + "o/authorize/";
const OAUTH_TOKEN_URL = pub.PUBLIC_CLIENT_BASE_URL + "o/token/";

function createAuthorizationRequest() {
  const verifier = crypto.randomBytes(100).toString("binary");
  const challenge = crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");
  const params = new URLSearchParams({
    response_type: "code",
    code_challenge: challenge,
    code_challenge_method: "S256",
    client_id: env.OAUTH_CLIENT_ID,
    redirect_uri: env.OAUTH_REDIRECT_URI,
  });
  const url = OAUTH_AUTHORIZE_URL + `?` + params.toString();
  return { url, verifier };
}

async function getAuthorizationTokens(code, verifier) {
  const body = new URLSearchParams({
    client_id: env.OAUTH_CLIENT_ID,
    client_secret: env.OAUTH_CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    code_verifier: verifier,
    redirect_uri: env.OAUTH_REDIRECT_URI,
  });
  const response = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });
  const content = response.ok && (await response.json());
  return { ok: response.ok, content };
}

async function rotateToken(refresh_token) {
  const body = new URLSearchParams({
    client_id: env.OAUTH_CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  });
  const response = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });

  const content = response.ok && (await response.json());
  return { ok: response.ok, content };
}

const AnonymousUser = { is_authenticated: false };

class Session {
  // Store session data in cookies in an encrypted manner.
  constructor(event) {
    this.cookies = event.cookies;
    this.data = {};

    const value = this.cookies.get(AUTH_SESSION_COOKIE);
    if (value) {
      const contents = aes.decrypt(value);
      this.data = JSON.parse(contents);
    }

    this.client = new ServerClient(event.fetch, this.ident?.access_token);
  }

  get ident() {
    return this.data.ident;
  }

  set ident(content) {
    this.set("ident", content);
    this.client.token = content.access_token;
  }

  flush() {
    this.delete("verifier");
    this.delete("ident");
    this.client.token = null;
  }

  set(key, value) {
    this.data[key] = value;
  }

  get(key) {
    return this.data[key];
  }

  delete(key) {
    delete this.data[key];
  }

  commit() {
    if (Object.keys(this.data).length === 0) {
      this.cookies.delete(AUTH_SESSION_COOKIE, { path: "/" });
      return;
    }
    const contents = aes.encrypt(JSON.stringify(this.data));
    this.cookies.set(AUTH_SESSION_COOKIE, contents, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  login(ident) {
    this.flush();
    this.ident = ident;
    this.commit();
    redirect(302, "/");
  }

  async rotate() {
    const refreshToken = this.ident.refresh_token;
    const { ok, content } = await rotateToken(refreshToken);
    if (ok) {
      this.ident = content;
    } else {
      this.flush();
    }
    return { ok, content };
  }

  async getUser() {
    if (this.ident) {
      const { response, content, errors } = await this.client.users.me();
      if (response.ok) {
        return { ...content, is_authenticated: true };
      } else if (response.status === 401) {
        const { ok } = await this.rotate();
        if (ok) {
          return await this.getUser();
        }
      } else {
        // TODO: If this block is reached via a form, errors are not
        //  propagated properly. Maybe redirect to root?
        error(errors.status, { message: errors.messages });
      }
    }
    return AnonymousUser;
  }
}

export default {
  createAuthorizationRequest,
  getAuthorizationTokens,
  Session,
};
