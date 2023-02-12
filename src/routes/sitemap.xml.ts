/**
 * Route to generate/update sitemap.xml
 */
import ghost from '$lib/ghost';
import generateSitemap from '$lib/services/generateSitemap';

export async function get({ url }: { url: URL }) {
	const data = await ghost.posts.browse({
		limit: 100000,
		page: 1,
		order: ['published_at DESC']
	});

	const sitemap = await generateSitemap(data, url.origin);

	return {
		header: {
			'content-type': 'application/xml'
		},
		body: sitemap
	};
}
