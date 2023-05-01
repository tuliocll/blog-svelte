/**
 * Generate sitemap.xml file
 */

export default async function generateSitemap(posts: PostType[], host) {
	let xml = '<?xml version="1.0" encoding="UTF-8"?>';
	xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

	posts.forEach((post) => {
		xml += `<url>`;
		xml += `<loc>${host}/post/${post.slug}</loc>`;
		xml += `<lastmod>${post.updated_at}</lastmod>`;
		xml += `<changefreq>always</changefreq>`;
		xml += `</url>`;
	});

	xml += `</urlset>`;

	console.info('New sitemap generated successfull!');
	return xml;
}
