import ghost from '$lib/ghost';

export async function get({ url: { searchParams } }: { url: { searchParams: URLSearchParams } }) {
	try {
		const pageParam = searchParams.get('page');
		const page = pageParam ? +pageParam : 1;
		const data = await ghost.posts.browse({
			limit: 6,
			page,
			order: ['published_at DESC'],
			include: ['tags', 'authors']
		});

		return {
			body: {
				articles: data,
				pagination: data.meta.pagination
			}
		};
	} catch (err) {
		console.log('Erro', err);
		return {
			body: {
				articles: [],
				pagination: {}
			}
		};
	}
}
