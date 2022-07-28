import type { ReactionType } from '$lib/types/reactions.types';

async function reactionClick(reactionName: string) {
	if (!getReactionClick(reactionName)) {
		localStorage.getItem();
	}
}

/**
 * @description Check if user already reacted on this post.
 */
function getReactionClick(reactionName: string) {
	try {
		// TODO: Coloca titulo do post dentro da chave
		const getReactions = localStorage.getItem('tuliocalil@reactions');

		if (!getReactions) {
			return false;
		}

		const reactions: ReactionType[] = JSON.parse(getReactions);

		const reaction = reactions.find((reaction) => reaction.reactionName === reactionName);

		if (!reaction) {
			return false;
		}

		return true;
	} catch (_) {
		return false;
	}
}

export { reactionClick, getReactionClick };
