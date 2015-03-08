function goBack()
{
	history.go(-1);
}

$(function(){
	//translate_button을 누르면 전송!
	$("#translate_button").click(function() {
		
		//form을 생성하고 hidden에 data를 넣고 서버에 전송.
	});
	$(".app").click(function(){
		var message = $(this).html();
		$("#layer_1").append("<form id=\"submit_to_translate\" action=\"/plto/put_up\" method=\"post\"><input type=\"hidden\" id=\"app_id\" name=\"app_id\"></form>");
		$("#app_id").attr("value",message);
		$("#submit_to_translate").submit();
	});
	
});