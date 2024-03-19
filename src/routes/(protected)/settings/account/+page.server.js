import { ServerClient } from "$lib/server/api-client.js";
import { fail } from "@sveltejs/kit";

/**
 * Update the information of currently authenticated user and
 * return the user instance. If update fails, returned object
 * will contain user-submitted data instead.
 */
async function patch({ request, fetch, locals }) {
  const user = Object.fromEntries(await request.formData());
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
