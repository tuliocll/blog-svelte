import * as api from '$lib/api.js';

export async function get() {
	const about = await api.get(`about?populate=*`);

	return {
		body: about
	};
}
