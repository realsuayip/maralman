import { fail } from "@sveltejs/kit";

async function send({
  request,
  locals: {
    session: { client },
  },
}) {
  const { email } = Object.fromEntries(await request.formData());
  const { response, content, errors } = await client.email.send(email);
  if (!response.ok) {
    return fail(400, { email, errors });
  }
  return { email: content.email, step: "confirm" };
}

async function confirm({
  request,
  locals: {
    session: { client },
  },
}) {
  const { email, code } = Object.fromEntries(await request.formData());
  const { response, content, errors } = await client.email.check(email, code);
  if (!response.ok) {
    return fail(400, { email, step: "confirm", errors });
  }
  return { email: content.email, step: "success" };
}

/** @type {import("./$types").Actions} */
export const actions = { send, confirm };
