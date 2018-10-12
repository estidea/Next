var previous = '';
var current ='';
var items = ['mafia','tennis','koworking','board','birthday','consoles','barka','vip'];

window.addEventListener("load", function() {

});

function showModal(id) {
	getDescription(id);
	window.current = id;
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
            	$("#modal-title").html(data.title);
            	$("#modal-description").html(data.description);
            	$("#modal-price span").html(data.price);
				$("#modal-card").css('transform', 'translateX(0%)');
            }
        });
    return false;
	}
}