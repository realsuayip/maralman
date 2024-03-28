import { ServerClient } from "$lib/server/api-client.js";
import { fail } from "@sveltejs/kit";

/**
 * Similar logic to account update.
 */
async function patch({ request, fetch, locals }) {
  const form = await request.formData();
  const keys = ["allows_all_messages", "allows_receipts", "is_private"];
  const user = Object.fromEntries(keys.map((key) => [key, !!form.get(key)]));
  const client = new ServerClient(fetch, locals.session.ident.access_token);
  const { response, content, errors } = await client.users.update(user);
  const success = response.ok;
  if (!success) {
    return fail(400, { user: { ...locals.user, ...user }, errors });
  }
  return { user: content };
}

/** @type {import("./$types").Actions} */
export const actions = { default: patch };
