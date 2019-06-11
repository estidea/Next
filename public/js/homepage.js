var previous = '';
var current ='consoles';

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
};

function fireActive(svg, id) {
	var activeItem = svg.getElementById(id);
	var lightactive = svg.getElementById(id+'-light-active');
	var lightness = svg.getElementById(id+'-light');
	var itemInList = document.getElementById(id+'-offer');
	itemInList.classList.add("offers-hovered");
	lightactive.classList.toggle("active");

	activeItem.classList.add("hovered-item");
}

function shutActive(svg, id) {
	if (id != '') {
		var activeItem = svg.getElementById(id);
		var lightactive = svg.getElementById(id+'-light-active');
		var lightness = svg.getElementById(id+'-light');
		var itemInList = document.getElementById(id+'-offer');
		itemInList.classList.remove("offers-hovered");
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
				fireActive(svg, id);
				getDescription(id);

				/* Add this element to the current (for the future) */
				window.previous = id;
			}
		} else { // click was beyond the items 
			if (window.previous != '') {
				shutActive(svg, window.previous);
				window.previous = '';
				/* Hide the modal */
				$('#modal-card').css('opacity', '0');
			    $("#modal-card").css('transform', 'translateX(-150%)');
			    window.current = '';
			    setTimeout (function(){
			    	$('#modal-card').css('opacity', '1');
			    }, 200); 
			}
		}
	});
}

function lightHover(name, svg) {
	var item = svg.getElementById(name);
	var lightness = svg.getElementById(name+'-light');
	var lightactive = svg.getElementById(name+'-light-active');
	var itemInList = document.getElementById(name+'-offer');

	lightness.classList.add("unhovered");
	item.style.cursor = 'pointer';

	/* Enter the mouse to item on svg */
	item.addEventListener("mouseenter", function() {
		var active = lightactive.classList.contains('active');
		if (active === false) {
			itemInList.classList.toggle("offers-hovered");
			item.classList.toggle("hovered-item");
			lightness.classList.toggle("hovered");
			lightness.classList.toggle("unhovered");
		}
	});

	/* Leave the mouse from item on svg */
	item.addEventListener("mouseleave", function() {
		var active = lightactive.classList.contains('active');
		if (active === false) {
			itemInList.classList.toggle("offers-hovered");
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
	/* Open the modal with consoles first */
	var consolesOffer = document.getElementById('consoles-offer').parentElement;
	var event = new Event("click");
	consolesOffer.dispatchEvent(event);
	var lightness = mainsvg.getElementById('consoles-light');
	lightness.classList.toggle("hovered");
	lightness.classList.toggle("unhovered");

});

function getDescription(id) {
	if (id != window.previous) {
		$("#preloader-bg").addClass("preloader-active");
	    $(".pong-loader").addClass("preloader-active");
		$("#modal-card").css('transform', 'translateX(-200%)');
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
				console.log('description\'ve got');
            	$("#modal-title").html(data.title);
            	$("#modal-photo").css('background-image','url(../img/'+data.photo+')');
            	$("#modal-description").html(data.description);
            	$("#modal-price span").html(data.price);
            	$("#modal-additional").html(data.additional);
            	$("#modal-btn a").attr("id", data.slug);
            	$("#modal-btn").css('display','flex');
            	if (data.button == true) {
            		if (data.href != '') {
            			$("#modal-btn a").attr("href", data.href);
            		} else {
            			$("#modal-btn a").attr("href", '#');
            		}
            		
            	} else {
            		$("#modal-btn").css('display','none');
            	}
				
				setTimeout(function() {
            		$("#preloader-bg").removeClass("preloader-active");
			    	$(".pong-loader").removeClass("preloader-active");
			    	$("#modal-card").css('transform', 'translateX(0%)');
            	},50);
			},
			error: function() {
				console.log('description\'ve not been got');
				$("#preloader-bg").removeClass("preloader-active");
				$(".pong-loader").removeClass("preloader-active");
			}
        });
    return false;
	}
}

$(document).on('click', '#modal-close', function(){
	var svg = document.getElementById('main-svg').contentDocument;
	shutActive(svg, window.current);
	var itemInList = document.getElementById(window.current+'-offer');
	itemInList.classList.remove("offers-hovered");
    $('#modal-card').css('opacity', '0');
    $("#modal-card").css('transform', 'translateX(-150%)');
    window.current = '';
    window.previous ='';
    setTimeout (function(){
    	$('#modal-card').css('opacity', '1');
    }, 200); 
});


$(document).on('click', '#modal-btn', function(){
	var offer =  $(this).children("a").attr("id");
	var href =  $(this).children("a").attr("href");
	if (href == '#') {
		$('select option[value="'+offer+'"]').prop('selected', true);
	    $('#modal-form-wrapper').css('opacity', '1');
	    $("#modal-form-wrapper").css('transform', 'translateY(0%)');
	};
});
