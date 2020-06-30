/*
	Checks whether a DOM Element is a stacking context,
	and returns the reason why that's the case.

	Reference:

	https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

 */
export default function stackingCtx(el) {
	if (el === document.documentElement) {
		return ['doc'];
	}

	let s = getComputedStyle(el);

	if (s.zIndex !== 'auto') {
		if (s.position === 'absolute' || s.posiiton === 'relative') {
			return [`position (${s.position})`, s.zIndex];
		}
		let ps = getComputedStyle(el.parentNode);
		if (ps.display === 'flex') {
			return ['flex-child', s.zIndex];
		}
		if (ps.display === 'grid') {
			return ['grid-child', s.zIndex];
		}
	}

	if (s.position === 'sticky' || s.position === '-webkit-sticky' || s.position === 'fixed') {
		return [`position (${s.position})`, s.zIndex];
	}

	if (s.opacity !== '1') {
		return ['opacity', s.zIndex];
	}

	if (s.mixBlendMode !== 'normal') {
		return ['mix-blend-mode', s.zIndex];
	}

	if (s.transform !== 'none') {
		return ['transform', s.zIndex];
	}

	if (s.filter !== 'none') {
		return ['filter', s.zIndex];
	}

	if (s.perspective !== 'none') {
		return ['perspective', s.zIndex];
	}

	if (s.clipPath !== 'none') {
		return ['clip-path', s.zIndex];
	}

	if (CSS.supports('mask', 'none') && s.mask !== 'none') {
		return ['mask', s.zIndex];
	}

	if (CSS.supports('mask-image', 'none') && s.maskImage !== 'none') {
		return ['mask-image', s.zIndex];
	}

	if (CSS.supports('mask-border', 'none') && s.maskBorder !== 'none') {
		return ['mask-border', s.zIndex];
	}

	if (s.isolation === 'isolate') {
		return ['isolation', s.zIndex];
	}

	if (s.webkitOverflowScrolling === 'touch') {
		return ['-webkit-overflow-scrolling', s.zIndex];
	}

	let wc = s.willChange.split(',').map(it => it.trim());

	if (wc.some(k => k === 'opacity' || k === 'mix-blend-mode' || k === 'transform' || k === 'filter' || k === 'perspective' || k === 'clip-path' || k === 'mask' || k === 'mask-image' || k === 'mask-border' || k === 'isolation')) {
		return ['will-change', s.zIndex];
	}

	if (CSS.supports('contain', 'none')) {
		let sc = s.contain.split(/\s+/).map(it => it.trim());
		if (sc.some(k => k === 'content' || k === 'strict' || k === 'paint' || k === 'layout')) {
			return ['contain', s.zIndex];
		}
	}

	return false;
}