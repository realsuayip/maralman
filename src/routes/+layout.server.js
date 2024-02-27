export const trailingSlash = "always";
export const load = async ({ locals }) => {
  return { user: locals.user, session: locals.session.data };
};
