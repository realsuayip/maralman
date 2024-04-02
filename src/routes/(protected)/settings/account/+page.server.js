import { fail } from "@sveltejs/kit";

/**
 * Update the information of currently authenticated user and
 * return the user instance. If update fails, returned object
 * will contain user-submitted data instead.
 */
async function patch({
  request,
  locals: {
    session: { client },
    user,
  },
}) {
  const payload = Object.fromEntries(await request.formData());
  const { response, content, errors } = await client.users.update(payload);
  if (!response.ok) {
    return fail(400, { user: { ...user, ...payload }, errors });
  }
  return { user: content };
}

/** @type {import("./$types").Actions} */
export const actions = { default: patch };
