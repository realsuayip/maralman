import { PUBLIC_CLIENT_BASE_URL } from "$env/static/public";

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
    this.users = new User(this);
  }

  get token() {
    return this._token;
  }

  getURL(endpoint, params) {
    const url = new URL(`api/${endpoint}/`, PUBLIC_CLIENT_BASE_URL);
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

  async get(endpoint, params) {
    const method = "GET";
    const url = this.getURL(endpoint, params);
    const headers = this.getHeaders();
    const options = { method, headers };
    return this.toResponse(url, options);
  }

  async post(endpoint, payload) {
    const method = "POST";
    const url = this.getURL(endpoint);
    const headers = this.getHeaders();
    const body = JSON.stringify(payload);
    const options = { method, headers, body };
    return this.toResponse(url, options);
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

class User extends Endpoint {
  async create(payload) {
    return await this.client.post("users", payload);
  }

  async by(username) {
    return await this.client.get("users/by", { username });
  }
}
