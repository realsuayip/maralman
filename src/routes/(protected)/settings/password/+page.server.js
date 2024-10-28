import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({
    request,
    locals: {
      session: { client },
    },
  }) => {
    const payload = Object.fromEntries(await request.formData());
    const { response, errors } = await client.users.passwordChange(payload);
    if (!response.ok) {
      return fail(400, { errors });
    }
    return { step: "success" };
  },
};
