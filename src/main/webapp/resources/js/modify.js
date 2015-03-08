
//validate of user
$(function(){
	
	//focusout
	$("#user_firstname").focusout(function ()
			{
		user_message($(this),validate_user_firstname());
			});
	$("#user_lastname").focusout(function ()
			{
		user_message($(this),validate_user_lastname());
			});
	$("#user_password").focusout(function ()
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
	
	//keyup
	$("#user_firstname").keyup(function ()
			{
		user_message($(this),validate_user_firstname());
			});
	$("#user_lastname").keyup(function ()
			{
		user_message($(this),validate_user_lastname());
			});
	$("#user_password").keyup(function ()
			{
		user_message($(this),validate_user_password());
		if($("#user_password2").val().length !="")
		{
			user_message($("#user_password2"),validate_user_password2());
		}
			});
	$("#user_password2").keyup(function ()
			{
		user_message($(this),validate_user_password2());
			});
	$("#user_birth_year").keyup(function ()
			{
		user_message($(this),validate_user_birth_year());
			});
});

function user_message(user_obj, validation)
{
	var s = user_obj.next('span');
	if(validation)
	{
		s.text('');
		return true;
	}
	else
	{	
		if (user_obj.attr("id")=="user_firstname")
		{
			s.text('필수 입력사항입니다.');
		}
		else if (user_obj.attr("id")=="user_lastname")
		{
			s.text('필수 입력사항입니다.');
		}
		else if (user_obj.attr("id")=="user_password")
		{
			s.text('비밀번호는 6-20자 사이.');
		}
		else if (user_obj.attr("id")=="user_password2")
		{
			s.text('비밀번호가 다릅니다.');
		}
		else if (user_obj.attr("id")=="user_birth_year")
		{
			s.text('올바른 년도를 입력하세요.');
		}
		else if (user_obj.attr("id")=="user_sex")
		{
			$("#sex_comment").text('성별을 입력하세요.');
		}
		return false;
	}
}

function validate_user_all_withfocus()
{
	if (!user_message($("#user_password"),validate_user_password()))
	{
		$("#user_password").focus();
		return false;
	}
	else if (!user_message($("#user_password2"),validate_user_password2()))
	{
		$("#user_password2").focus();
		return false;
	}
	else if (!user_message($("#user_firstname"),validate_user_firstname()))
	{
		$("#user_firstname").focus();
		return false;
	}
	else if (!user_message($("#user_lastname"),validate_user_lastname()))
	{
		$("#user_lastname").focus();
		return false;
	}
	else if (!user_message($("#user_birth_year"),validate_user_birth_year()))
	{
		$("#user_birth_year").focus();
		return false;
	}
	else if (!user_message($("#user_sex"),validate_user_sex()))
	{
		$("#user_sex").focus();
		return false;
	}
	else
	{
		return true;
	}
}

function validate_user_password(){		//tested
	var e = document.getElementById('user_password');
	if((e.value.length>=6) && (e.value.length<20))
	{
		return true;
	}
    return false; 
}
function validate_user_password2(){		//tested
	var e1 = document.getElementById('user_password');
	var e2 = document.getElementById('user_password2');
	if(e1.value == e2.value)
	{
		return true;
	}
    return false;
}
function validate_user_firstname(){		//tested
	var e = document.getElementById('user_firstname');
	if(e.value.length!=0)
	{
		return true;
	}
    return false;
}
function validate_user_lastname(){		//tested
	var e = document.getElementById('user_lastname');
	if(e.value.length!=0)
	{
		return true;
	}
    return false;
}
function validate_user_birth_year(){	//tested
	var e = document.getElementById('user_birth_year');
	var d = new Date();
	if( e.value>=1800 && e.value<=d.getFullYear())
	{
			return true;
	}
    return false;
}
function validate_user_sex(){			//tested
	if($(':radio[name="user_sex"]:checked').length < 1)
	{
	    return false;
	}
	return true;
}

$(document).ready(function() {
	$('#user_firstname,#user_lastname,#user_password,#user_password2,#user_sex,#user_birth_year').after('<span></span>');
	
	//submit control
	$("#form_mod_user").submit(function(event){
		
		//after validate, correct:submit or do not
		if(validate_user_all_withfocus())
		{
			alert("회원정보 수정");
		}
		else
		{
			event.preventDefault(); // submit prevent
		}
	});
	
	$("#layer_1_right").click(function(event){
		$("#form_mod_user").submit();
	});
});