import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
	url: 'http://localhost:2368',
	key: '4f1a6bf1a83634b5e65c786fa9',
	version: 'v5.0'
});

export default api;
