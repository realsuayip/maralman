import { Client } from "$lib/api-client.js";
import { CLIENT_CREDENTIALS_TOKEN } from "$env/static/private";

export class ServerClient extends Client {
  get token() {
    return this._token || CLIENT_CREDENTIALS_TOKEN;
  }
}
