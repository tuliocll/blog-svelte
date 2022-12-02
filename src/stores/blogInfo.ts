import { writable } from 'svelte/store';

export const initial_state = {
	title: 'Tulio Calil',
	description: 'Um blog feito por DEV para DEVs.',
	logo: null,
	icon: null,
	accent_color: '#FF1A75',
	cover_image: 'https://static.ghost.org/v5.0.0/images/publication-cover.jpg',
	facebook: null,
	twitter: '@tuliocalil',
	lang: 'pt-br',
	locale: 'pt-br',
	timezone: 'Etc/UTC',
	codeinjection_head: null,
	codeinjection_foot: null,
	navigation: [
		{ label: 'Home', url: '/' },
		{ label: 'Twitter', url: '/about/' },
		{ label: 'Linkedin', url: '/' },
		{ label: 'Github', url: '/' }
	],
	secondary_navigation: [{ label: 'Sign up', url: '#/portal/' }],
	meta_title: null,
	meta_description:
		'Firulas sobre React, React Native, Flutter, Elixir, Nodejs, Arquitetura e várias outras coisas hype do momento.',
	og_image: '',
	og_title: null,
	og_description:
		'Firulas sobre React, React Native, Flutter, Elixir, Nodejs, Arquitetura e várias outras coisas hype do momento.',
	twitter_image: '',
	twitter_title: null,
	twitter_description:
		'Firulas sobre React, React Native, Flutter, Elixir, Nodejs, Arquitetura e várias outras coisas hype do momento.',
	members_support_address: 'noreply',
	members_enabled: true,
	members_invite_only: false,
	paid_members_enabled: false,
	firstpromoter_account: null,
	portal_button_style: 'icon-and-text',
	portal_button_signup_text: 'Subscribe',
	portal_button_icon: null,
	portal_plans: ['free'],
	portal_name: true,
	portal_button: true,
	comments_enabled: 'off',
	url: '',
	version: '5.24',
	author: {
		id: '1',
		name: 'Tulio Calil',
		slug: 'tulio',
		profile_image:
			'https://www.gravatar.com/avatar/27d42a770b2671abecd78862a5a38998?s=250&r=x&d=mp',
		cover_image: null,
		bio: null,
		website: null,
		location: null,
		facebook: null,
		twitter: null,
		meta_title: null,
		meta_description: null,
		url: 'http://localhost:2368/author/tulio/'
	}
};
export const blogInfoStore = writable(initial_state);
