$(document).ready(function() {
    $('#form-begin').change(function() {
        var time = $('#form-begin').val();
        $('#form-end').attr("value", time);
        $('#form-end').attr("data-uk-timepicker", "start:"+time[0]+time[1]);
    });
    // $('#form-end')

    //     var timepicker = UIkit.timepicker(element, { /* options */ });
});

jQuery(function($){
   $("#form-phone").mask("+38(999) 999-9999");
});

$('#booking').submit(function(e) {
    $("#preloader-bg").addClass("preloader-active");
    $(".pong-loader").addClass("preloader-active");
    e.preventDefault();
    var url = "/form";
    var formSerialize = $(this).serialize();
    $.post(url, formSerialize, function(response) {
        $("#preloader-bg").removeClass("preloader-active");
        $(".pong-loader").removeClass("preloader-active");
        $('#modal-form-wrapper').css('opacity', '0');
        $("#modal-form-wrapper").css('transform', 'translateY(-200%)');
        $("#modal-card").css('transform', 'translateX(-200%)');
        $("#modal-notification").css('opacity', '1');
        $("#modal-notification").css('display', 'flex');
        setTimeout(function(){
            $("#modal-notification").css('opacity', '0');
        },3000);
        setTimeout(function(){
            $("#modal-notification").css('display', 'none');
        },3300);
    }, 'JSON');
});

$('#event-booking').submit(function(e) {
    $("#preloader-bg").addClass("preloader-active");
    $(".pong-loader").addClass("preloader-active");
    e.preventDefault();
    var url = "/event-form";
    var formSerialize = $(this).serialize();
    $.post(url, formSerialize, function(response) {
        $("#preloader-bg").removeClass("preloader-active");
        $(".pong-loader").removeClass("preloader-active");
        $('#modal-form-wrapper').css('opacity', '0');
        $("#modal-form-wrapper").css('transform', 'translateY(-200%)');
        $("#modal-notification").css('opacity', '1');
        $("#modal-notification").css('display', 'flex');
        setTimeout(function(){
            $("#modal-notification").css('opacity', '0');
        },3000);
        setTimeout(function(){
            $("#modal-notification").css('display', 'none');
        },3300);
    }, 'JSON');
});

$(document).on('click', '#modal-form-close', function(){
    $('#modal-form-wrapper').css('opacity', '0');
    $("#modal-form-wrapper").css('transform', 'translateY(-200%)');
});

$(document).mouseup(function (e) {
    var container = $("#modal-form-wrapper");
    if (container.is(e.target) && container.has(e.target).length === 0) {
        container.css('opacity', '0');
        container.css('transform', 'translateY(-200%)');
    }
    
});

$(document).mouseover(function (e) {
    var container = $("#modal-form-wrapper");
    if (container.is(e.target) && container.has(e.target).length === 0) {
        container.css('background-color', 'rgba(0, 0, 0, 0.5)');
    } else {
        container.css('background-color', 'rgba(0, 0, 0, 0.6)');
    }
});