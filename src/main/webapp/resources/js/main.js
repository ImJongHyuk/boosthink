/**
 * 
 */
$(function(){
	$("#mod_user").click(function(e){
		location.href="/plto/modify";
	});
	$("#disconnect_session").click(function(e){
		location.href="/plto/disconnect_session";
	});	
	$("#GoAppList").click(function(){
		location.href= "/plto/app_list";
	}); 
});

function goBack()
{
	history.go(-1);
}

$(function(){
	//translate_button을 누르면 전송!
	$("#translate_button").click(function() {
		
		//form을 생성하고 hidden에 data를 넣고 서버에 전송.
	});
	$(".board").click(function(){
		var message = $(this).html();
		$("#layer_1").append("<form id=\"submit_to_translate\" action=\"/plto/execute_app\" method=\"post\"><input type=\"hidden\" id=\"board_id\" name=\"board_id\"></form>");
		$("#board_id").attr("value",message);
		$("#submit_to_translate").submit();
	});
	
});
