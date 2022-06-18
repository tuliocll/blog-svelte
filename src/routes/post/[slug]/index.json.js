import * as api from '$lib/api.js';
import qs from 'qs';

export async function get({ params, locals }) {
	const { slug } = params;
	const query = qs.stringify({
		filters: {
			slug: {
				$eq: slug
			}
		}
	});
	const post = await api.get(`posts?populate=*&${query}`, locals.user && locals.user.token);

	return {
		body: post
	};
}
