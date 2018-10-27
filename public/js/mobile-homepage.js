// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

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
    $("#preloader-bg").addClass("preloader-active");
    $(".pong-loader").addClass("preloader-active");
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
                $("#preloader-bg").removeClass("preloader-active");
                $(".pong-loader").removeClass("preloader-active");
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