let initialized = false;

function highlight(predicate, label = () => '') {
	if (!initialized) {

		let s = document.createElement('style');
		s.textContent = `
			.dt-highlight {
				outline: 2px solid red;
			}

			.dt-highlight:after {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(255, 0, 0, 0.1);
				content: ' ';
				pointer-events: none;
			}
		`;

		document.head.appendChild(s);

		let obs = new MutationObserver(() => {
			document.emitEvent('dt-change');
		});

		obs.observe(document.documentElement, {
			childList: true,
			subtree: true,
			attributes: true
		});

		initialized = true;
	}

	const fn = () => {
		[...document.querySelectorAll('*')].forEach(el => {
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

export { highlight };