import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import { getFirestore } from 'firebase/firestore';
import { browser } from '$app/env';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_FIREBASE_APPID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTIDS
};

const app = () => {
	if (browser) {
		return initializeApp(firebaseConfig);
	}
};
export const analytics = () => {
	if (app) {
		return getAnalytics(app());
	}
};
export const perf = () => {
	if (app) {
		return getPerformance(app());
	}
};
export const db = () => {
	if (app) {
		return getFirestore(app());
	}
};
