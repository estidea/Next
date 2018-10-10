var previous = '';
var current ='';

var items = ['mafia','tennis','koworking','board','birthday','consoles','barka','vip'];

function hoverList(id) {
	var svg = document.getElementById('main-svg').contentDocument;
	var item = svg.getElementById(id);
	var lightness = svg.getElementById(id+'-light');
	var lightactive = svg.getElementById(id+'-light-active');

	var active = lightactive.classList.contains('active');
	if (active === false) {
		item.classList.toggle("hovered-item");
		lightness.classList.toggle("hovered");
		lightness.classList.toggle("unhovered");
	}
}

function hideList(id) {
	var svg = document.getElementById('main-svg').contentDocument;
	var item = svg.getElementById(id);
	var lightness = svg.getElementById(id+'-light');
	var lightactive = svg.getElementById(id+'-light-active');

	var active = lightactive.classList.contains('active');
	if (active === false) {
		item.classList.toggle("hovered-item");
		lightness.classList.toggle("hovered");
		lightness.classList.toggle("unhovered");
	}
}

function showModal(id) {
	getDescription(id);
	window.current = id;
	var svg = document.getElementById('main-svg').contentDocument;
	if (window.previous != id) {
		/* Remove active from previous element */
		if (window.previous != '') {
			shutActive(svg, window.previous);
		}
		/* Add active to current element */
		fireActive(svg, id)

		/* Add this element to the current (for the future) */
		window.previous = id;
	}; 

	// if (window.previous != '') {
	// 	shutActive(svg, window.previous);
	// }
};

function fireActive(svg, id) {
	activeItem = svg.getElementById(id);
	lightactive = svg.getElementById(id+'-light-active');
	lightness = svg.getElementById(id+'-light');

	lightactive.classList.toggle("active");

	activeItem.classList.add("hovered-item");
}

function shutActive(svg, id) {
	if (id != '') {
		var activeItem = svg.getElementById(id);
		var lightactive = svg.getElementById(id+'-light-active');
		var lightness = svg.getElementById(id+'-light');
		lightactive.classList.toggle("active");
		activeItem.classList.remove("hovered-item");
		lightness.classList.toggle("hovered");
		lightness.classList.toggle("unhovered");
	}
}


function activeSvg(svg) { // clicks on the items on the svg
	/* Check if the next click on the another svg */
	svg.addEventListener("click", function(event) {

		/* Check, which item was clicked */
		var object = event.path || (event.composedPath && event.composedPath());
		if (object.length > 4) { // click was inside the svg
			var id = object[1].id;
			window.current = id;
			/* Remove double fired events */
			if (window.previous != id) {
				/* Remove active from previous element */
				shutActive(svg, window.previous);

				/* Add active to current element */
				fireActive(svg, id)

				/* Add this element to the current (for the future) */
				window.previous = id;
			}
		} else { // click was beyond the items 
			if (window.previous != '') {
				shutActive(svg, window.previous);
				window.previous = '';
			}
		}
	});
}

function lightHover(name, svg) {
	var item = svg.getElementById(name);
	var lightness = svg.getElementById(name+'-light');
	var lightactive = svg.getElementById(name+'-light-active');

	lightness.classList.add("unhovered");
	item.style.cursor = 'pointer';

	/* Enter the mouse to item on svg */
	item.addEventListener("mouseenter", function() {
		var active = lightactive.classList.contains('active');
		if (active === false) {
			item.classList.toggle("hovered-item");
			lightness.classList.toggle("hovered");
			lightness.classList.toggle("unhovered");
		}
	});

	/* Leave the mouse from item on svg */
	item.addEventListener("mouseleave", function() {
		var active = lightactive.classList.contains('active');
		if (active === false) {
			item.classList.toggle("hovered-item");
			lightness.classList.toggle("hovered");
			lightness.classList.toggle("unhovered");
		}
	});
}

window.addEventListener("load", function() {
	var mainsvg = document.getElementById('main-svg').contentDocument;
	activeSvg(mainsvg);
	for (var i=0;i<8;i++) {
		lightHover(items[i], mainsvg);
	}

	var close = document.getElementById("modal-close");
	close.addEventListener("click", function() {
		document.getElementById("modal-card").style.opacity = 0;
	});
});

function getDescription(id) {
	var project_id = $(this).data('id');
    	that = $(this);
        $.ajax({
            url:'/getdescription',
            type: "POST",
            dataType: "json",
            data: {
                "project_id": id
            },
            async: true,
            success: function (data)
            {
            	$("#modal-title").html(data.title);
            	$("#modal-description").html(data.description);
            	$("#modal-price span").html(data.price);

                // $('div#project-detail').css('z-index', '3');
                // $('div#project-detail').css('opacity', '1');
                // $('h3#project-title').html(data.title);
                // $('span#project-name').html(data.name);
                // $('p#project-description').html(data.description);
                // $('#project-text').html(data.text);
            }
        });
    return false;
}

    

// $(document).on('click', '#project-close', function(){
//     $('div#project-detail').css('opacity', '0');
//     setTimeout (function(){
//     	$('div#project-detail').css('z-index', '-1');
//     }, 200); 
// });



// function getDescription(slug) {
// 	var slug = $(this).data('slug');
//     var	that = $(this);
//         $.ajax({
//             url:'/getdescription',
//             type: "GET",
//             dataType: "json",
//             data: {
//                 "slug": slug
//             },
//             async: true,
//             success: function (data)
//             {
//             	alert('aaa');
//             	alert('Title = ',data.title, ' Desc = ', data.description, ' Price = ', data.price, ' Photo = ', data.photo);
//             	// $("div#project-detail").scrollTop(0);
//              //    $('div#project-detail').css('z-index', '3');
//              //    $('div#project-detail').css('opacity', '1');
//              //    $('h3#project-title').html(data.title);
//              //    $('span#project-name').html(data.name);
//              //    $('p#project-description').html(data.description);
//              //    $('#project-text').html(data.text);
//             }
//         });
//     return false;
// }