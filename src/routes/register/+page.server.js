import { Client } from '$lib/api-client.js';

/** @type {import('./$types').Actions} */
export const actions = {
	email: async ({ request, fetch }) => {
		const data = await request.formData();
		const email = data.get('email');

		const client = new Client(fetch);
		const response = await client.registration.send(email);
		const content = await response.json();

		if (!response.ok) {
			return { email, step: 'email', errors: content };
		}
		return { email: content.email, step: 'code' };
	},
	code: async ({ request, fetch }) => {
		const data = await request.formData();
		const [email, code] = [data.get('email'), data.get('code')];

		const client = new Client(fetch);
		const response = await client.registration.check(email, code);
		const content = await response.json();

		if (!response.ok) {
			return { email, code, step: 'code', errors: content };
		}
		return { email, consent: content.consent, step: 'user' };
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
