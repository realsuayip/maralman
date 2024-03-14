import { Client } from "$lib/api-client.js";
import { error } from "@sveltejs/kit";

export const load = async ({ fetch, parent, params }) => {
  const { session } = await parent();
  const client = new Client(fetch, session.ident.access_token);
  const { content, errors } = await client.users.by(params.username);
  if (errors) {
    error(errors.status, { message: errors.messages });
  }
  return { profile: content };
};
