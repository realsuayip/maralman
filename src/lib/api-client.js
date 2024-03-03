const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;
const CLIENT_CREDENTIALS_TOKEN = process.env.CLIENT_CREDENTIALS_TOKEN;

export class Client {
  constructor(fetch, token) {
    this.fetch = fetch;
    this.token = token || CLIENT_CREDENTIALS_TOKEN;

    // Endpoints
    this.registration = new Registration(this);
    this.users = new User(this);
  }

  getURL(endpoint) {
    return new URL(`api/${endpoint}/`, CLIENT_BASE_URL);
  }

  getHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  async post(endpoint, payload) {
    const method = "POST";
    const url = this.getURL(endpoint);
    const headers = this.getHeaders();
    const body = JSON.stringify(payload);
    const options = { method, headers, body };
    return await this.fetch(url, options);
  }

  // todo: add toContent
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
}