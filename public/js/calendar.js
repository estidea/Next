function runCaledar(filter) {
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
	    	$('input[name=form-event').attr("value", event.title);
	    	$('input[name=form-date').attr("value", event.start.format('Do MMMM'));
	    	$('input[name=form-begin').attr("value", event.start.format('H:mm'));
		    $('#modal-form-wrapper').css('opacity', '1');
		    $("#modal-form-wrapper").css('transform', 'translateY(0%)');
		    $("#event-title").html(event.title);
		    $("#event-description").html(event.description);
		    $("#event-date").html(event.start.format('Do MMMM, dddd'));

		    // $("#event-begin").html(event.start.format('H:mm'));
		    // $("#event-end").html(event.end.format('H:mm'));
		    if (event.end.format('H:mm') == '23:59') {
		    	$("#event-time").html('C '+event.start.format('H:mm'));
		    } else {
		    	$("#event-time").html(event.start.format('H:mm')+'-'+event.end.format('H:mm'));
		    }
	    },
	    eventAfterAllRender: function() {
			$("#preloader-bg").removeClass("preloader-active");
		    $(".pong-loader").removeClass("preloader-active");
	    },
	    eventDestroy: function() {
	    	
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
		$("#preloader-bg").addClass("preloader-active");
	    $(".pong-loader").addClass("preloader-active");
	});

	$(".fc-next-button").click(function() {
		var months = getNeighbourMonth();
		$('.fc-icon-left-single-arrow').text(months.prevMonth);
		$('.fc-icon-right-single-arrow').text(months.nextMonth);
		$("#preloader-bg").addClass("preloader-active");
	    $(".pong-loader").addClass("preloader-active");
	});
}



$(document).ready(function() {
	if (checkedCategory != "") {
		categories = [checkedCategory];
		var checkboxes = $("input:checkbox");
    	checkboxes.removeAttr('checked');
    	$("input:checkbox[id=Мафия]").prop( "checked", true );
	}

    runCaledar(categories);

    $.when( runCaledar ).done(function () {
	    customizeCalendar();
	});

	$("#preloader-bg").css('background-color','rgba(0, 0, 0, .5)');

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