// 1. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav). 
const targetElement = document.querySelector("body");

// 2. ...in some event handler after showing the target element...disable body scroll
window.addEventListener("load", function() {
	bodyScrollLock.disableBodyScroll(targetElement);
});

// 3. ...in some event handler after hiding the target element...
// bodyScrollLock.enableBodyScroll(targetElement);

// 4. Useful if we have called disableBodyScroll for multiple target elements,
// and we just want a kill-switch to undo all that.
bodyScrollLock.clearAllBodyScrollLocks();