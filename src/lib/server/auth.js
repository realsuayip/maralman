import crypto from "crypto";
import aes from "$lib/server/aes.js";

const OAUTH_AUTHORIZE_URL = process.env.OAUTH_AUTHORIZE_URL;
const OAUTH_TOKEN_URL = process.env.OAUTH_TOKEN_URL;
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const OAUTH_REDIRECT_URI = process.env.OAUTH_REDIRECT_URI;

const AUTH_SESSION_COOKIE = "sessionid";

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
    client_id: "default",
    redirect_uri: "http://localhost:5173/login/",
  });
  const url = OAUTH_AUTHORIZE_URL + `?` + params.toString();
  return { url, verifier };
}

async function getAuthorizationTokens(code, verifier) {
  const body = new URLSearchParams({
    client_id: OAUTH_CLIENT_ID,
    client_secret: OAUTH_CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    code_verifier: verifier,
    redirect_uri: OAUTH_REDIRECT_URI,
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
    client_id: OAUTH_CLIENT_ID,
    client_secret: OAUTH_CLIENT_SECRET,
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

async function getAuthenticatedUser(token) {
  const response = await fetch("https://asu.suayip.dev/api/users/me/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const content = await response.json();
  return { ok: response.ok, status: response.status, content };
}

class Session {
  // Store session data in cookies in an encrypted manner.
  constructor(cookies) {
    this.cookies = cookies;
    this.data = {};

    const value = cookies.get(AUTH_SESSION_COOKIE);
    if (value) {
      const contents = aes.decrypt(value);
      this.data = JSON.parse(contents);
    }
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

  logout() {
    this.delete("verifier");
    this.delete("ident");
  }

  async rotate() {
    const refreshToken = this.data["ident"]["refresh_token"];
    const { ok, content } = await rotateToken(refreshToken);
    if (ok) {
      this.set("ident", content);
    } else {
      this.delete("ident");
    }
    return { ok, content };
  }

  async getUser() {
    const ident = this.data["ident"];
    if (ident) {
      const accessToken = ident["access_token"];
      const { ok, status, content } = await getAuthenticatedUser(accessToken);
      if (ok) {
        return { ...content, is_authenticated: true };
      } else if (status === 401) {
        const { ok } = await this.rotate();
        if (ok) {
          return await this.getUser();
        }
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
