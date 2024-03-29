const base = import.meta.env ? import.meta.env.VITE_API_URL : '';

type methods = 'POST' | 'DELETE' | 'GET' | 'PATCH' | 'PUT';

async function send({
	method,
	path,
	data,
	token
}: {
	method: methods;
	path: string;
	data?: any;
	token: string;
}) {
	const opts = {
		method,
		headers: {
			'Content-Type': '',
			Authorization: ''
		},
		body: ''
	};

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	return fetch(`${base}/api/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function get(path: string, token: string) {
	return send({ method: 'GET', path, token });
}

export function del(path: string, token: string) {
	return send({ method: 'DELETE', path, token });
}

export function post(path: string, data: any, token: string) {
	return send({ method: 'POST', path, data, token });
}

export function put(path: string, data: any, token: string) {
	return send({ method: 'PUT', path, data, token });
}
