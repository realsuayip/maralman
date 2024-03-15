import { Client } from "$lib/api-client.js";
import { env } from "$env/dynamic/private";

export class ServerClient extends Client {
  get token() {
    return this._token || env.CLIENT_CREDENTIALS_TOKEN;
  }
}
