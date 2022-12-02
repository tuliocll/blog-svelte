import ghost from '$lib/ghost';

export async function get({ params }: { params: { slug: string } }) {
	const { slug } = params;

	const data = await ghost.posts.read({ slug }, { formats: ['html'] });

	return {
		body: data
	};
}
