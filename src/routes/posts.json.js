import * as api from '$lib/api';
import qs from 'qs';

export async function get({ url: { searchParams }, locals }) {
	const page = +searchParams.get('page') || 1;

	const query = qs.stringify({
		pagination: {
			page,
			pageSize: 6
		},
		sort: ['publishedAt:desc']
	});

	const data = await api.get(`posts?populate=*&${query}`, locals.user && locals.user.token);

	return {
		body: {
			articles: data.data,
			pagination: data.meta.pagination
		}
	};
}
