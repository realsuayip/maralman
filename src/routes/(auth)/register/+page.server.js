import { redirect, fail } from "@sveltejs/kit";

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
  const { response, content, errors } = await client.registration.send(email);
  if (!response.ok) {
    return fail(400, { email, errors });
  }
  return { email: content.email, step: "code", resend };
}

/**
 * Given code and email, try to obtain a consent which
 * is needed to create a user.
 */
async function code({
  request,
  locals: {
    session: { client },
  },
}) {
  const { email, code } = Object.fromEntries(await request.formData());
  const { response, content, errors } = await client.registration.check(
    email,
    code,
  );
  if (!response.ok) {
    return fail(400, { email, step: "code", errors });
  }
  return { data: content, step: "user" };
}

/**
 * Create a user with given information. If successfully created,
 * sign them in and redirect to homepage.
 */
async function user({ request, locals: { session } }) {
  const payload = Object.fromEntries(await request.formData());
  const { response, content, errors } =
    await session.client.users.create(payload);
  if (!response.ok) {
    return fail(400, { data: payload, step: "user", errors });
  }
  // User created, log-in the user and redirect.
  session.flush();
  session.ident = content.auth;
  session.commit();
  return redirect(302, "/");
}

/** @type {import("./$types").Actions} */
export const actions = { email, code, user };
