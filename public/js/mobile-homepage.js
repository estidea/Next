var previous = 'mafia';
var current ='mafia';
var items = ['mafia','tennis','koworking','board','birthday','consoles','barka','vip'];

window.addEventListener("load", function() {
    $('#mafia-offer').toggleClass('active');
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
            }
        });
    return false;
	}
}