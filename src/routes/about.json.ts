import ghost from '$lib/ghost';

export async function get() {
	const about = await ghost.settings.browse();
	const authors = await ghost.authors.browse();

	return {
		body: {
			...about,
			author: authors[0]
		}
	};
}
