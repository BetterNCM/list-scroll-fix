export const waitForElement = (selector, fun) => {
	selector = selector.split(',');
	let done = true;
	for (const s of selector) {
		if (!document.querySelector(s)) {
			done = false;
		}
	}
	if (done) {
		for (const s of selector) {
			fun.call(this, document.querySelector(s));
		}
		return;
	}
	let interval = setInterval(() => {
		let done = true;
		for (const s of selector) {
			if (!document.querySelector(s)) {
				done = false;
			}
		}
		if (done) {
			clearInterval(interval);
			for (const s of selector) {
				fun.call(this, document.querySelector(s));
			}
		}
	}, 100);
}
export const waitForElementAsync = async (selector) => {
	if (document.querySelector(selector)) {
		return document.querySelector(selector);
	}
	return await betterncm.utils.waitForElement(selector);
}