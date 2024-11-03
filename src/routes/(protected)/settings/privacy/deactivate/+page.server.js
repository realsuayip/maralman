import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({
    request,
    locals: {
      session: { client },
    },
  }) => {
    const payload = Object.fromEntries(await request.formData());
    const { response, errors } = await client.users.deactivate(payload);
    if (!response.ok) {
      return fail(400, { errors });
    }
    return redirect(302, "/");
  },
};
