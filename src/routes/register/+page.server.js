import { Client } from "$lib/api-client.js";
import { redirect } from "@sveltejs/kit";

/**
 * Sends a confirmation code to given email. This code
 * will be requested during `code` action.
 */
async function email({ request, fetch }) {
  const data = await request.formData();
  const email = data.get("email");

  const client = new Client(fetch);
  const response = await client.registration.send(email);
  const content = await response.json();

  if (!response.ok) {
    return { email, errors: content.errors };
  }
  return { email: content.email, step: "code" };
}

/**
 * Given code and email, try to obtain a consent which
 * is needed to create a user.
 */
async function code({ request, fetch }) {
  const data = await request.formData();
  const [email, code] = [data.get("email"), data.get("code")];

  const client = new Client(fetch);
  const response = await client.registration.check(email, code);
  const content = await response.json();

  if (!response.ok) {
    // todo: if response status == 404, do proper error.
    return { email, step: "code", errors: content.errors };
  }
  return { email, consent: content.consent, step: "user" };
}

/**
 * Create a user with given information. If successfully created,
 * sign them in and redirect to homepage.
 */
async function user({ request, fetch, locals }) {
  const data = await request.formData();
  const client = new Client(fetch);

  const payload = Object.fromEntries(data);
  const response = await client.users.create(payload);
  const content = await response.json();

  if (!response.ok) {
    return {
      email: data.email,
      consent: data.consent,
      data: Object.fromEntries(data),
      step: "user",
      errors: content.errors,
    };
  }

  // User created, log-in the user and redirect.
  const session = locals.session;
  session.delete("verifier");
  session.set("ident", content.auth);
  session.commit();
  return redirect(302, "/");
}

/** @type {import("./$types").Actions} */
export const actions = { email, code, user };
