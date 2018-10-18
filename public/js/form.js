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

    e.preventDefault();
    var url = "/form";
    var formSerialize = $(this).serialize();
    $.post(url, formSerialize, function(response) {
        console.log(response);
    }, 'JSON');
});

$(document).on('click', '#modal-form-close', function(){
    $('#modal-form-wrapper').css('opacity', '0');
    $("#modal-form-wrapper").css('transform', 'translateY(-200%)');
});
