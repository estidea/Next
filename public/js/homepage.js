function lightHover(name, svg) {
	var item = svg.getElementById(name);
	var lightness = svg.getElementById(name+'-light');
	lightness.classList.add("unhovered");
	item.style.cursor = 'pointer';
	item.addEventListener("mouseenter", function() {
		item.classList.toggle("hovered-item");
		lightness.classList.toggle("hovered");
		lightness.classList.toggle("unhovered");
	});
	item.addEventListener("mouseleave", function() {
		item.classList.toggle("hovered-item");
		lightness.classList.toggle("hovered");
		lightness.classList.toggle("unhovered");
	});
}

var items = ['mafia','tennis','koworking','board','birthday','consoles','barka','vip','kicker'];
window.addEventListener("load", function() {
	var mainsvg = document.getElementById('main-svg').contentDocument;
	for (var i=0;i<9;i++) {
		lightHover(items[i], mainsvg);
	}
	
});