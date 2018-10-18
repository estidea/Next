function runCaledar() {
	var height = $('#desktop-center').height();
	$('#calendar').fullCalendar({
	    events: {
	    	url: '/calendrierFeed',
	    	data: function () { // a function that returns an object
                return {
                    category: '',
                };
            },
        },
	    defaultView: 'month',
	    selectable:false,
	    selectHelper:false,
	    editable:false,
	    timeFormat: 'H:mm',
	    contentHeight: height,
	    eventMouseover: function( event, jsEvent, view ) {
	    	console.log(event.description);
	    	console.log(event);
	    }
	});
}

function getNeighbourMonth() {
	var moment = $('#calendar').fullCalendar('getDate');
	moment.locale('ru');

	var months = {
		nextMonth: '',
		prevMonth: ''
	};
  	months.nextMonth = moment.add(1, 'months').format('MMMM').slice(0,3);
  	months.prevMonth = moment.subtract(2, 'months').format('MMMM').slice(0,3);

  	return months;
}

function customizeCalendar() {
	// var moment = $('#calendar').fullCalendar('getDate');
	// moment.locale('ru');
	var months = getNeighbourMonth();
 //  	var nextMonth = moment.add(1, 'months').format('MMMM').slice(0,3);
 //  	var prevMonth = moment.subtract(2, 'months').format('MMMM').slice(0,3);
	var calendarLeft = $('.fc-prev-button');
	var calendarRight = $('.fc-next-button');
	var calendarDate = $('.fc-toolbar');
	
	$('#calendar-left').replaceWith( calendarLeft );
	$('#calendar-date').replaceWith( calendarDate );
	$('.fc-icon-left-single-arrow').text(months.prevMonth);
	$('.fc-icon-right-single-arrow').text(months.nextMonth);
	$('#calendar-right').replaceWith( calendarRight );
	$('.fc-right').css('display','none');

	$(".fc-prev-button").click(function() {
		var months = getNeighbourMonth();
		$('.fc-icon-left-single-arrow').text(months.prevMonth);
		$('.fc-icon-right-single-arrow').text(months.nextMonth);
	});

	$(".fc-next-button").click(function() {
		var months = getNeighbourMonth();
		$('.fc-icon-left-single-arrow').text(months.prevMonth);
		$('.fc-icon-right-single-arrow').text(months.nextMonth);
	});
}

$(document).ready(function() {
    runCaledar();

    $.when( runCaledar ).done(function () {
	    customizeCalendar();
	});

});

window.onresize = function(event) {
	var height = $('#desktop-center').height();
	$('#calendar').fullCalendar('option', 'contentHeight', height);
};