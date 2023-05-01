import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
	url: import.meta.env ? import.meta.env.VITE_GHOST_URL : '',
	key: import.meta.env ? import.meta.env.VITE_GHOST_KEY : '',
	version: 'v5.0'
});

export default api;
