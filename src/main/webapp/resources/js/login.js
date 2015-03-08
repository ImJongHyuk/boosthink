/**
 * 
 */

function toJoin() {	
	location.href ="join";
}

$(function(){
	$("#layer_middle_left").click(function(){
		$('body').hide(500, toJoin);
	});
});

function fIn(){
	$('body').fadeIn(500);
}

$(document).ready(function() {
	//login submit control
	$("#layer_middle_right").click(function(){
		$("#login_form").submit();
	}); 
	
	$("#GoEdit").click(function(){
		location.href= "make_app";
	});
	
	$("#GoAppList").click(function(){
		location.href= "app_list";
	}); 
	
	$("#GoTest").click(function(){
		location.href= "test";
	}); 
});