/**
 * 
 */
$(function(){
	$("#PLTO").click(function(){
		location.href="/plto/main";
	});
});
//
//$(document).ready(function(){
//	setInterval(function(){checkToScript();}, 200);
//	// 200ms마다 ajax통신
//});
//
////$(function(){
////	$("#mod_user").click(function(e){
////		location.href="/plto/mod_user";
////	});
////	$("#disconnect_session").click(function(e){
////		location.href="/plto/disconnect_session";
////	});
////});
//
//
//function checkToScript(){
//	$.ajax({ type : "post",
//		url : "checkToScript.ajax",
//		data : "thread_id="+$("#thread_id").val(),
//		dataType : "json",
//		success : function( data ){
//			if(data.type == "print")
//			{
//				$("#"+data.target).children().val(data.data);
//			}
//		},
//		complete : function( data ){
//		},
//		error : function(e1,e2,e3){
//			alert("요청실패(err:"+e1+" "+e2+" "+e3+")");
//		}
//	});
//}