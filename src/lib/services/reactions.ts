import config from '$lib/config/website';

/**
 * @description Register new reaction to the post.
 */
async function setReaction(reactionId: number, postTitle: string) {
	if (getReaction(reactionId, postTitle)) {
		// If want to create a toggle (undo reaction)
		// enabled the `removeItem` line.
		// localStorage.removeItem(`${config.siteTitle}@reactions-${reactionId}-${postTitle}`);
		return false;
	}

	localStorage.setItem(`${config.siteTitle}@reactions-${reactionId}-${postTitle}`, 'true');
	return true;
}

/**
 * @description Check if user already reacted on this post.
 */
function getReaction(reactionId: number, postTitle: string) {
	try {
		const getReactions = localStorage.getItem(
			`${config.siteTitle}@reactions-${reactionId}-${postTitle}`
		);

		if (!getReactions || getReactions === 'false') {
			return false;
		}

		return true;
	} catch (_) {
		return false;
	}
}

export { setReaction, getReaction };
