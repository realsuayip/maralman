import auth from '$lib/server/auth.js';

export async function handle({ event, resolve }) {
	// todo if failed to auth, 401 incase the page requires auth
	//  https://github.com/sveltejs/kit/issues/6315#issuecomment-1374680430

	const session = new auth.Session(event.cookies);

	event.locals.session = session;
	event.locals.user = await session.getUser();

	session.commit();
	return await resolve(event);
}
