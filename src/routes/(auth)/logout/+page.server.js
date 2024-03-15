import { redirect } from "@sveltejs/kit";

export const load = async () => {
  return redirect(302, "/");
};

/** @type {import("./$types").Actions} */
export const actions = {
  // todo invalidate tokens
  default: async ({ locals }) => {
    locals.session.flush();
    locals.session.commit();
    return redirect(302, "/");
  },
};
