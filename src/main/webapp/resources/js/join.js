/**
 * JQuery 로 짤것.
 */

//화면 이동 함수
function shift(a){
	$('body,html').animate({ scrollLeft: a }, 500);
}

function selectbox(){
	/*
	$.ajax({
		   url: 'form_semantic',
		   type: 'GET',
		   data: {'id':$(id).val()},
		   dataType: 'html',
		   error    : function(r) {

	            alert("정보전송에 실패하였습니다.");},
		   success : function(r) {
	            alert("정보전송에 실패하였습니다.");} ,

		  });
	 */
	$("#div1").text("인천");
	$("#div2").text("대구");
	$("#div3").text("부산");
	$("#div4").text("경기");
	$("#div1").fadeIn("slow");
	$("#div2").fadeIn("slow");
	$("#div3").fadeIn("slow");
	$("#div4").fadeIn("slow");





	$("img.select").click(function(){

		alert($(this).text());


//		ajax 통신하여 다음 추천할것을 보내옴.
		$("#div1").fadeOut("slow");
		$("#div2").fadeOut("slow");
		$("#div3").fadeOut("slow");
		$("#div4").fadeOut("slow");
//		디비를 통하여
		$("#div1").text("직장");
		$("#div2").text("대학교");
		$("#div3").text("고등학교");
		$("#div4").text("무직");


		$("#div1").fadeIn("slow");
		$("#div2").fadeIn("slow");
		$("#div3").fadeIn("slow");
		$("#div4").fadeIn("slow");


	});

}

function toIndex(){
	history.back();
}

function toLogin(){
	location.href="/plto/login";
}

//layer_1 -> layer_2
$(function(){
	$("#layer_1_right").click(function(e){
		var scrollRight = $("body").width();
		shift(scrollRight);
	});
});

//layer_2 -> layer_1
$(function(){
	$("#layer_2_left").click(function(e){
		shift(0);
	});
});

//layer_1 -> index.js
$(function(){
	$("#layer_1_left").click(function(e){
		$('body').hide(500, toLogin);
	});
});

//text box 에 포커스 있을 때 안 넘어가게 하기 위한 변수 함수
var isFocus = 0;
function plusFocus(){
	isFocus++;
}
function subFocus(){
	isFocus--;
}


//ajax ID check
function checkEmail(obj,validate){

	$.ajax({
		url: 'check_email',
		type: 'POST',
		data: "email="+$("#j_username").val(),
		dataType: 'html',
		error    : function(r) {
			alert("정보전송에 실패하였습니다.");},
			success : function(r){
				if(r == "occupied")
				{
					var s = obj.next('span');
					s.text("이미 가입된 이메일입니다.");
				}
				else
				{
					user_message(obj,validate);
				}

			}
	});
}

//ajax ID check
function signUp(){
	$.ajax({
		url: 'signup',
		type: 'POST',
		data: $("#form_signup").serialize(),
		dataType: 'html',
		error    : function(r) {
			alert("정보전송에 실패하였습니다.");},
			success : function(r){
				if(r=="success")
				{
					alert("환영합니다.");
					$("#form_signup").submit();
				}
				else
				{
					alert("회원가입 실패");
					location.href="/join";
				}
			}
	});
}

function pop_check(data){
	$("#j_username").next('strong').text(data);
}

/*
function pop_check(data){
	$("#check").text(data);

	$("#overlayer").fadeIn();
	$("#glaylayer").fadeIn();
	setTimeout('$("#overlayer").fadeOut();$("#glaylayer").fadeOut();clearTimeout();', 800); 


	$("#glaylayer").click(function(){

		$("#overlayer").fadeOut();
		$("#glaylayer").fadeOut();
	});

}
 */

//validate of user
$(function(){

	//focusout
	$("#j_username").focusout(function ()
			{
		checkEmail($(this),validate_user_email());

			});
	$("#user_firstname").focusout(function ()
			{
		user_message($(this),validate_user_firstname());
			});
	$("#user_lastname").focusout(function ()
			{
		user_message($(this),validate_user_lastname());
			});
	$("#j_password").focusout(function ()
			{
		user_message($(this),validate_user_password());
		if($("#user_password2").val().length !="")	//confirm을 고치고 password를 고칠경우 예외처리
		{
			user_message($("#user_password2"),validate_user_password2());
		}
			});
	$("#user_password2").focusout(function ()
			{
		user_message($(this),validate_user_password2());
			});
	$("#user_birth_year").focusout(function ()
			{
		user_message($(this),validate_user_birth_year());
			});


});

function user_message(user_obj, validation)
{
	var s = user_obj.next('span');
	if(validation == true)
	{
		s.text('');
		return true;
	}
	else
	{	
		if (user_obj.attr("id")=="j_username")
		{
			s.text(validation);
		}
		else if (user_obj.attr("id")=="user_firstname")
		{
			s.text(validation);
		}
		else if (user_obj.attr("id")=="user_lastname")
		{
			s.text(validation);
		}
		else if (user_obj.attr("id")=="j_password")
		{
			s.text(validation);
		}
		else if (user_obj.attr("id")=="user_password2")
		{
			s.text(validation);
		}
		else if (user_obj.attr("id")=="user_birth_year")
		{
			s.text(validation);
		}
		else if (user_obj.attr("id")=="user_sex")
		{
			$("#sex_comment").text(validation);
		}
		return false;
	}
}

function validate_user_all_withfocus()
{
	$.ajax({
		url: 'check_email',
		type: 'POST',
		data: "email="+$("#j_username").val(),
		dataType: 'html',
		error    : function(r) {
			alert("정보전송에 실패하였습니다.");},
			success : function(r){
				if(r == "occupied")
				{
					$("#j_username").focus();
				}
				else
				{
					if (!(user_message($("#j_username"),validate_user_email())))
					{
						$("#j_username").focus();
					}
					else if (!user_message($("#j_password"),validate_user_password()))
					{
						$("#j_password").focus();
					}
					else if (!user_message($("#user_password2"),validate_user_password2()))
					{
						$("#user_password2").focus();
					}
					else if (!user_message($("#user_firstname"),validate_user_firstname()))
					{
						$("#user_firstname").focus();
					}
					else if (!user_message($("#user_lastname"),validate_user_lastname()))
					{
						$("#user_lastname").focus();
					}
					else if (!user_message($("#user_birth_year"),validate_user_birth_year()))
					{
						$("#user_birth_year").focus();
					}
					else if (!user_message($("#user_sex"),validate_user_sex()))
					{
						$("#user_sex").focus();
					}
					else
					{
						signUp();

					}
				}

			}
	});


}

function validate_user_email(){			//tested
	var e = document.getElementById('j_username');
	var re = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if(re.test(e.value)&&e.value.length!=0)
	{
		return true;
	}
	return "잘못된 메일 주소입니다.";  

}
function validate_user_password(){		//tested
	var e = document.getElementById('j_password');
	if((e.value.length>=6) && (e.value.length<20))
	{
		return true;
	}
	return "비밀번호는 6-20자 사이."; 
}
function validate_user_password2(){		//tested
	var e1 = document.getElementById('j_password');
	var e2 = document.getElementById('user_password2');
	if(e1.value == e2.value)
	{
		return true;
	}
	return "비밀번호가 다릅니다.";
}
function validate_user_firstname(){		//tested
	var e = document.getElementById('user_firstname');
	if(e.value.length!=0)
	{
		return true;
	}
	return "필수 입력사항입니다.";
}
function validate_user_lastname(){		//tested
	var e = document.getElementById('user_lastname');
	if(e.value.length!=0)
	{
		return true;
	}
	return "필수 입력사항입니다.";
}
function validate_user_birth_year(){	//tested
	var e = document.getElementById('user_birth_year');
	var d = new Date();
	if( e.value>=1800 && e.value<=d.getFullYear())
	{
		return true;
	}
	return "올바른 년도를 입력하세요.";
}
function validate_user_sex(){			//tested
	if($(':radio[name="user_sex"]:checked').length < 1)
	{
		return "성별을 입력하세요.";;
	}
	return true;
}

$(document).ready(function() {
	$('#j_username,#user_firstname,#user_lastname,#j_password,#user_password2,#user_birth_year').after('<span></span>');


	$("#layer_2_right").click(function(){
		validate_user_all_withfocus();
	});  

	selectbox();

	$("#form").submit(function(){
		alert("Submitted");
	});

	$("button").click(function(){
		$("form").submit();
	});

	// 방향키로 form.jsp 제어
	$('body').keydown(function(e){
		if(e.keyCode == 39){
			var scrollRight = $("body").width();
			if(isFocus == 0)
				shift(scrollRight);
		}
		if(e.keyCode == 37)
			shift(0);
	});
});
/*
$(window).unload(function(){
	alert("!!");
});*/
/*
window.onbeforeunload = function (){
	event.returnValue = 'IE';	// IE
	return 'CHROmE';						// Chrome
};
 */
function fIn(){
	$("#layer_1").fadeIn(500);
}

//validate 확인 후 boolean 값 반환
//birth_year 까진 확인이 되는데 month,day,sex 에 대해서는 확인이 안되는 중... textbox만 되는건가.
//option이랑 radio button? 은 value 가져오는 방법이 다를지도..
//아 그리고 validate 하다 보면 isFocus 무시하고 넘어갈 때가 있는데 내일 확인해봐야겠다.
