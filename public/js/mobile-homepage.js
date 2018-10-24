var previous = 'mafia';
var current ='mafia';
var items = ['mafia','tennis','koworking','board','birthday','consoles','barka','vip'];

window.addEventListener("load", function() {
    $('#mafia-offer').toggleClass('active');
    setTimeout(function() {
        $("#preloader-bg").toggleClass("preloader-active");
        $(".pong-loader").toggleClass("preloader-active");
        $("#preloader-bg").css('background-color','rgba(0, 0, 0, .5)');
    },1000);
});

function showModal(id) {
	getDescription(id);
	window.current = id;
    var element = '#'+id+'-offer';
    $(element).toggleClass('active');
    var prev = '#'+window.previous+'-offer';
    $(prev).toggleClass('active');
    window.previous = id;
};

function getDescription(id) {
	if (id != window.previous) {
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
                $("#mobile-center-image").attr("src","/img/mobile/"+data.slug+".svg");
            	$("#mobile-title").html(data.title);
            	$("#mobile-description").html(data.description);
            	$("#mobile-price span").html(data.price);
                if (data.additional != null) {
                    $("#mobile-additional").css('display','block');
                    $("#mobile-additional").html(data.additional);
                } else {
                    $("#mobile-additional").css('display','none');
                }
            }
        });
    return false;
	}
}

$(document).on('click', '#mobile-btn', function(){
    var offer =  $(this).children("a").attr("id");
    var href =  $(this).children("a").attr("href");
    if (href == '#') {
        $('select option[value="'+offer+'"]').prop('selected', true);
        $('#modal-form-wrapper').css('opacity', '1');
        $("#modal-form-wrapper").css('transform', 'translateY(0%)');
    };
});