export default function all(includeOtherEventTargets = false) {
	return [ 
		...(includeOtherEventTargets ? [window, document] : []),
		...document.querySelectorAll('*')
	];
};