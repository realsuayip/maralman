import { fail } from "@sveltejs/kit";

/**
 * Similar logic to account update.
 */
async function patch({
  request,
  locals: {
    session: { client },
    user,
  },
}) {
  const form = await request.formData();
  const keys = ["allows_all_messages", "allows_receipts", "is_private"];
  const payload = Object.fromEntries(keys.map((key) => [key, !!form.get(key)]));
  const { response, content, errors } = await client.users.update(payload);
  if (!response.ok) {
    return fail(400, { user: { ...user, ...payload }, errors });
  }
  return { user: content };
}

/** @type {import("./$types").Actions} */
export const actions = { default: patch };
