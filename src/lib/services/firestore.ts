import {
	collection,
	doc,
	Firestore,
	getDocFromServer,
	setDoc,
	updateDoc
} from 'firebase/firestore';

export async function insertNewData(
	dbInstance: Firestore,
	collectionName: string,
	body: object,
	docKey: string
) {
	try {
		const docReactions = doc(collection(dbInstance, collectionName), docKey);

		const checkPostReaction = await getDocument(dbInstance, collectionName, docKey);

		if (!checkPostReaction) {
			await setDoc(docReactions, body);
			return true;
		}

		await updateDoc(docReactions, body);
		return true;
	} catch (e) {
		console.error('Error adding document: ', e);
		return false;
	}
}

export async function getDocument(dbInstance: Firestore, collectionName: string, docKey: string) {
	try {
		const docReactions = doc(collection(dbInstance, collectionName), docKey);

		const checkPostReaction = await getDocFromServer(docReactions);

		if (!checkPostReaction.data()) {
			return false;
		}

		return checkPostReaction.data();
	} catch (e) {
		console.error('Error adding document: ', e);
		return false;
	}
}
