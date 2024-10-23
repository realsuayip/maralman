import { fail } from "@sveltejs/kit";

/**
 * Sends a confirmation code to given email. This code
 * will be requested during `code` action.
 */
async function email({
  request,
  locals: {
    session: { client },
  },
}) {
  const data = await request.formData();
  const [email, resend] = [data.get("email"), !!data.get("resend")];
  const { response, content, errors } = await client.passwordReset.send(email);
  if (!response.ok) {
    return fail(400, { email, errors });
  }
  return { email: content.email, step: "code", resend };
}

/**
 * Given code and email, try to obtain a consent which
 * is needed to reset the password.
 */
async function code({
  request,
  locals: {
    session: { client },
  },
}) {
  const { email, code } = Object.fromEntries(await request.formData());
  const { response, content, errors } = await client.passwordReset.check(
    email,
    code,
  );
  if (!response.ok) {
    return fail(400, { email, step: "code", errors });
  }
  return { data: content, step: "password" };
}

/**
 * Set the password to supplied one.
 */
async function password({ request, locals: { session } }) {
  const payload = Object.fromEntries(await request.formData());
  const { response, errors } =
    await session.client.users.passwordReset(payload);
  if (!response.ok) {
    delete payload["password"];
    return fail(400, { data: payload, step: "password", errors });
  }
  return { step: "done" };
}

export const actions = { email, code, password };
