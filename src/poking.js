export default function poking(el) {
	let rect = el.getBoundingClientRect();
	return rect.x + rect.width > window.innerWidth;
};