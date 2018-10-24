function runCaledar(filter) {
	var height = $('#mobile-center').height() - 36;
	$('#mobile-calendar').fullCalendar({
	    events: {
	    	url: '/calendrierFeed',
	    	data: function () { // a function that returns an object
                return {
                    categories: categories
                };
            },
        },
	    defaultView: 'listWeek',
	    selectable:false,
	    selectHelper:false,
	    editable:false,
	    timeFormat: 'H:mm',
	    contentHeight: height,
	    eventClick : function( event, jsEvent, view ) {
	    	$('input[name=form-event').attr("value", event.title);
	    	$('input[name=form-date').attr("value", event.start.format('Do MMMM'));
	    	$('input[name=form-begin').attr("value", event.start.format('H:mm'));
		    $('#modal-form-wrapper').css('opacity', '1');
		    $("#modal-form-wrapper").css('transform', 'translateY(0%)');
		    $("#event-title").html(event.title);
		    $("#event-description").html(event.description);
		    $("#event-date").html(event.start.format('Do MMMM, dddd'));
		    $("#event-begin").html(event.start.format('H:mm'));
		    $("#event-end").html(event.end.format('H:mm'));
	    },
	    eventAfterAllRender: function() {
			$("#preloader-bg").removeClass("preloader-active");
		    $(".pong-loader").removeClass("preloader-active");
	    },
	    eventDestroy: function() {
	    	
	    }
	});
}


function customizeCalendar() {

	var calendarLeft = $('.fc-prev-button');
	var calendarRight = $('.fc-next-button');
	var calendarDate = $('.fc-toolbar');
	
	// $('#calendar-left').replaceWith( calendarLeft );
	// $('#calendar-date').replaceWith( calendarDate );
	// $('#calendar-right').replaceWith( calendarRight );
	// $('.fc-right').css('display','none');

	$(".fc-prev-button").click(function() {
		$("#preloader-bg").addClass("preloader-active");
	    $(".pong-loader").addClass("preloader-active");
	});

	$(".fc-next-button").click(function() {
		$("#preloader-bg").addClass("preloader-active");
	    $(".pong-loader").addClass("preloader-active");
	});
}

$(document).ready(function() {
    runCaledar(categories);
    $.when( runCaledar ).done(function () {
	    customizeCalendar();
	});

	$("#preloader-bg").css('background-color','rgba(0, 0, 0, .5)');
});

