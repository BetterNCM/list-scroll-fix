import './styles.scss';
import { waitForElement } from './utils.js';

// Fix playlist scroll
waitForElement('.g-mn', (dom) => {
	const listScrollVisibilityController = document.createElement('style');
	listScrollVisibilityController.innerHTML = '';
	document.head.appendChild(listScrollVisibilityController);
	const recalc = () => {
		const listContainer = document.querySelector('.m-plylist-pl2 ul .lst');
		if (!listContainer) {
			listScrollVisibilityController.innerHTML = '';
			return;
		}
		const itemHeight = 
			parseInt(
				getComputedStyle(listContainer).getPropertyValue('--item-height')
				|| 
				Array.from(listContainer.querySelectorAll('.pl-di')).find((x) => getComputedStyle(x).display != 'none').querySelector('li.itm').offsetHeight
			);
		const topOfList = Math.max(-(listContainer.getBoundingClientRect().top - 60), 0);
		const listLength = listContainer.childElementCount;
		const currentVisibleChild = Math.floor(topOfList / (itemHeight * 20)) + 1;
		const l = Math.max(currentVisibleChild - 2, 1), r = Math.min(currentVisibleChild + 2, listLength);
		let css = `.m-plylist-pl2 ul .lst {
			padding-top: ${(l - 1) * (itemHeight * 20)}px !important;
			padding-bottom: ${(listLength - r) * (itemHeight * 20)}px !important;
			counter-reset: tlistorder ${(l - 1) * 20} !important;
		}`;
		for (let i = 1; i <= l - 1; i++) {
			css += `.m-plylist-pl2 ul .lst > div:nth-child(${i}) { display: none !important; }`;
		}
		for (let i = r + 1; i <= listLength; i++) {
			css += `.m-plylist-pl2 ul .lst > div:nth-child(${i}) { display: none !important; }`;
		}
		if (listScrollVisibilityController.innerHTML != css) {
			listScrollVisibilityController.innerHTML = css;
		}
		listContainer.classList.add('fixed-scroll-management');
	};
	dom.addEventListener('scroll', recalc , { passive: true });
	document.addEventListener('resize', recalc);
});