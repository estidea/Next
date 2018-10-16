function runCaledar() {
	var height = $('#mobile-center').height() - 36;
	$('#mobile-calendar').fullCalendar({
	    events: '/calendrierFeed',
	    defaultView: 'listWeek',
	    selectable:false,
	    selectHelper:false,
	    editable:false,
	    timeFormat: 'H:mm',
	    contentHeight: height,
	    eventMouseover: function( event, jsEvent, view ) {
	    	console.log(event.description);
	    	console.log(view);
	    }
	});
}

$(document).ready(function() {
    runCaledar();
 //    $.when( runCaledar ).done(function () {
	//     // customizeCalendar();
	// });

	$(".fc-prev-button").click(function() {
		console.log('prev');
		runCaledar();
	});

	$(".fc-next-button").click(function() {
		console.log('next');
		runCaledar();
	});

});
