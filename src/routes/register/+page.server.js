/** @type {import('./$types').Actions} */
export const actions = {
	email: async ({ request, fetch, locals }) => {
		const data = await request.formData();
		const email = data.get('email');
		// todo create service layer for api calls
		await fetch('https://asu.suayip.dev/api/verifications/registration/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${locals.session.get('ident')['access_token']}`
			},
			body: JSON.stringify({ email })
		});
		return { email, step: 'code' };
	},
	code: async ({ request, fetch, locals }) => {
		const data = await request.formData();
		const email = data.get('email');
		const code = data.get('code');
		const response = await fetch('https://asu.suayip.dev/api/verifications/registration/check/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${locals.session.get('ident')['access_token']}`
			},
			body: JSON.stringify({ email, code })
		});
		const { consent } = await response.json();
		return { email, consent, step: 'user' };
	},
	user: async ({ request }) => {
		const data = await request.formData();
		return {
			email: data.email,
			consent: data.consent,
			data: Object.fromEntries(data),
			step: 'user',
			errors: {}
		};
	}
};
