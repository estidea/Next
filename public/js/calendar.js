function runCaledar(filter) {
	console.log(filter);
	var height = $('#desktop-center').height();
	$('#calendar').fullCalendar({
	    events: {
	    	url: '/calendrierFeed',
	    	data: function () { // a function that returns an object
                return {
                    categories: categories
                };
            },
        },
	    defaultView: 'month',
	    selectable:false,
	    selectHelper:false,
	    editable:false,
	    timeFormat: 'H:mm',
	    contentHeight: height,
	    eventClick : function( event, jsEvent, view ) {
		    $('#modal-form-wrapper').css('opacity', '1');
		    $("#modal-form-wrapper").css('transform', 'translateY(0%)');
		    $("#event-title").html(event.title);
		    $("#event-description").html(event.description);
		    $("#event-date").html(event.start.format('Do MMMM, dddd'));
		    $("#event-begin").html(event.start.format('H:mm'));
		    $("#event-end").html(event.end.format('H:mm'));
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

	var months = getNeighbourMonth();
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
    runCaledar(categories);

    $.when( runCaledar ).done(function () {
	    customizeCalendar();
	});

    $("input:checkbox").change(function() { 
            if($(this).is(":checked")) { 
        	    categories.push($(this).val());
            } else {
            	position = $.inArray($(this).val(), categories);
				if ( ~position ) categories.splice(position, 1);
            	
            }
            $('#calendar').fullCalendar( 'refetchEvents' );
        }); 
});

window.onresize = function(event) {
	var height = $('#desktop-center').height();
	$('#calendar').fullCalendar('option', 'contentHeight', height);
};

