import { redirect } from "@sveltejs/kit";
import auth from "$lib/server/auth.js";

export const load = async ({ locals, url }) => {
  const session = locals.session;
  const code = url.searchParams.get("code");
  const verifier = session.get("verifier");

  // todo: may be these parts delegated to session?
  // todo: parameterize verifier
  if (code && verifier) {
    const { ok, content } = await auth.getAuthorizationTokens(code, verifier);
    if (ok) {
      return session.login(content);
    }
    return { ok, content };
  }

  const request = auth.createAuthorizationRequest();
  session.set("verifier", request.verifier);
  session.commit();
  redirect(302, request.url);
};
