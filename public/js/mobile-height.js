// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

document.documentElement.style.height = window.innerHeight + 'px';

window.addEventListener('resize', () => {
  
	if(($(document.activeElement).prop('type') === 'text') || ($(document.activeElement).prop('type') === 'tel') || ($(document.activeElement).prop('type') === 'textarea') || ($(document.activeElement).prop('type') === 'number')) {
	} else {
    	let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		document.documentElement.style.height = window.innerHeight + 'px';
	}
});
