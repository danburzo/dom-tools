import all from './all.js';

let initialized = false;

export default function highlight(predicate, label = () => '') {
	if (!initialized) {

		let s = document.createElement('style');
		s.textContent = `
			.dt-highlight {
				outline: 2px solid red;
				box-shadow: inset 0px 0px 0 9999px rgba(255, 0, 0, 0.1);
			}
		`;

		document.head.appendChild(s);

		let obs = new MutationObserver(() => {
			document.dispatchEvent(new CustomEvent('dt-change', {}));
		});

		obs.observe(document.documentElement, {
			childList: true,
			subtree: true,
			attributes: true
		});

		initialized = true;
	}

	const fn = () => {
		all().forEach(el => {
			if (predicate(el)) {
				if (!el.classList.contains('dt-highlight')) {
					el.classList.add('dt-highlight');
				}
				let title = label(el);
				if (el.title !== title) {
					el.title = title;	
				}
			} else {
				if (el.classList.contains('dt-highlight')) {
					el.classList.remove('dt-highlight');
				}
				if (el.title) {
					el.title = '';
				}
			}
 		})
	};

	document.addEventListener('dt-change', fn);
	fn();
}