export default function getEvents(el) {
	if (!window.getEventListeners) {
		throw new Error('This method is not supported in this browser.');
	}
	return Object.values(getEventListeners(el)).map(it => ({
		...it,
		target: el
	}));
}