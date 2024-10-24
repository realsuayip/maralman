import auth from "$lib/server/auth.js";
import { matchRoute } from "$lib/routes.js";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  const session = new auth.Session(event);

  event.locals.session = session;
  event.locals.user = await session.getUser();

  if (
    !event.locals.user.is_authenticated &&
    matchRoute(event.route, "protected")
  ) {
    // todo: possible to do some ?next=
    redirect(302, "/");
  }

  session.commit();
  return await resolve(event);
}
