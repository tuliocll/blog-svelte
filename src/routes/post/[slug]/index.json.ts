import ghost from '$lib/ghost';
import { slugify } from '@tryghost/string';

export async function get({ params }: { params: { slug: string } }) {
	try {
		const { slug } = params;

		const data = await ghost.posts.read({ slug: slugify(slug) }, { formats: ['html'] });

		return {
			body: data
		};
	} catch (err) {
		return {
			body: false
		};
	}
}
