import { env } from "$env/dynamic/public";
import { browser } from "$app/environment";

const GenericError = {
  status: 500,
  code: "server_error",
  message: ["We could not handle your request. Please try again later."],
};

export class Client {
  constructor(fetch, token = null) {
    this.fetch = fetch;
    this._token = token;

    // Endpoints
    this.registration = new Registration(this);
    this.email = new Email(this);
    this.passwordReset = new PasswordReset(this);
    this.users = new User(this);
  }

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  getURL(endpoint, params) {
    const url = new URL(`api/${endpoint}/`, env.PUBLIC_CLIENT_BASE_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value),
      );
    }
    return url;
  }

  getHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  async request(method, endpoint, payload, params) {
    const url = this.getURL(endpoint, params);
    const headers = this.getHeaders();
    const options = { method, headers };
    if (payload) {
      options.body = JSON.stringify(payload);
    }
    return this.toResponse(url, options);
  }

  async get(endpoint, params, payload) {
    return await this.request("GET", endpoint, payload, params);
  }

  async post(endpoint, payload, params) {
    return await this.request("POST", endpoint, payload, params);
  }

  async patch(endpoint, payload, params) {
    return await this.request("PATCH", endpoint, payload, params);
  }

  async put(endpoint, payload, params) {
    return await this.request("PUT", endpoint, payload, params);
  }

  async delete(endpoint, payload, params) {
    return await this.request("DELETE", endpoint, payload, params);
  }

  async toResponse(url, options) {
    // This is some naive implementation that handles network
    // errors and JSON parsing errors. Returns some sane defaults
    // in either case.
    return await this.fetch(url, options)
      .then((response) =>
        response
          .json()
          .then((content) => {
            if (response.ok) {
              return { response, content };
            }
            if (response.status === 401 && browser) {
              // Access token is possibly expired, reload the page
              // to force token rotation.
              location.reload();
            }
            return { response, content, errors: this.toErrors(content) };
          })
          .catch((error) => {
            console.log(error);
            return {
              response,
              content: GenericError,
              errors: this.toErrors(GenericError),
            };
          }),
      )
      .catch((error) => {
        console.log(error);
        return {
          response: { ok: false },
          content: GenericError,
          errors: this.toErrors(GenericError),
        };
      });
  }

  toErrors(content) {
    const { status, code, message, errors } = content;

    let messages = [message];
    let fieldErrors = errors || {};

    if (Array.isArray(errors)) {
      messages = errors;
      fieldErrors = {};
    }

    const hasFieldErrors =
      status === 400 &&
      code === "invalid" &&
      Object.keys(fieldErrors).length !== 0;
    return { status, code, messages, fieldErrors, hasFieldErrors };
  }
}

class Endpoint {
  constructor(client) {
    this.client = client;
  }
}

class Verification extends Endpoint {
  type;

  async send(email) {
    return await this.client.post(`verifications/${this.type}`, { email });
  }

  async check(email, code) {
    return await this.client.post(`verifications/${this.type}/check`, {
      email,
      code,
    });
  }
}

class Registration extends Verification {
  type = "registration";
}

class Email extends Verification {
  type = "email";
}

class PasswordReset extends Verification {
  type = "password-reset";
}

class User extends Endpoint {
  async create(payload) {
    return await this.client.post("users", payload);
  }

  async by(username) {
    return await this.client.get("users/by", { username });
  }

  async me() {
    return await this.client.get("users/me");
  }

  async update(payload) {
    return this.client.patch("users/me", payload);
  }

  async passwordReset(payload) {
    return this.client.patch("users/password-reset", payload);
  }

  async passwordChange(payload) {
    return this.client.patch("users/password-change", payload);
  }
}
