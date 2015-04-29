<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>어플제작</title>
<!-- bootstrap CDN -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

<!-- Style Sheet -->
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/base.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/debug.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/make_app.css'/>" />

<!-- JavaScript -->
<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="//code.jquery.com/ui/1.9.2/jquery-ui.min.js"></script>
<script src="<c:url value='/resources/js/new_make_layout.js'/>"></script>

</head>

<body>
	<!-- 화면 맨 위 -->
	<header id="make_app_header">
		<div class="container-fluid">    
		  <div class="row">
		    <div class="col-sm-6">
		      <p align="left" style="margin: 10px 0px 0px 20px; font-family: Buxton Sketch; font-size: 50px; color: #707070;"><b>Play Together</b></p>
		    </div>
		    <div class="col-sm-6">
		      <p align="right" style="margin: 15px 100px 0px 0px"><img width="70px" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246785_megaphone.png" id=""/>&nbsp;&nbsp;&nbsp;<img width="70px" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246775_chat.png" id=""/>&nbsp;&nbsp;&nbsp;<img width="70px" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246779_profle.png" id=""/></p>
		    </div>
		  </div>
		</div>
		
		
	</header>
	<!-- 화면 header 아래 네비게이터 -->
	<nav id="make_app_nav"></nav>

	<!-- 메인 화면 -->
	<article id="make_app_main"></article>
	<article class="make_app_main_widget" id="make_app_main_widget_1">widget
		1</article>
	<article class="make_app_main_widget" id="make_app_main_widget_2">widget
		2</article>
	<article class="make_app_main_widget" id="make_app_main_widget_3">widget
		3(작업목록)</article>
	<article class="make_app_main_widget" id="make_app_main_widget_4">widget
		4(최근활동)</article>
	<article class="make_app_main_widget" id="make_app_main_widget_5">widget
		5</article>
	<article class="make_app_main_widget" id="make_app_main_widget_6">widget
		6</article>

	<!-- 화면 오른쪽 -->
	<article class="make_app_right" id="make_app_right_searchbar"></article>
	<article class="make_app_right" id="make_app_right_button">
		<article class="make_app_right_button" id="make_app_right_button_1">사람</article>
		<article class="make_app_right_button" id="make_app_right_button_2">레이</article>
		<article class="make_app_right_button" id="make_app_right_button_3">로직</article>
		<article class="make_app_right_button" id="make_app_right_button_4">섭스</article>
	</article>
	<article class="make_app_right" id="make_app_right_list">
		<article class="right_comp">
			<p style="font-size: 25px; margin-top: 10px;"><img width="50px" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430245498_Santa-128.png" id=""/>&nbsp;&nbsp;&nbsp;강호동</p>
			<hr style="color: b0b0b0; background-color:#b0b0b0; height: 1px; border: none; margin-top: 10px; margin-bottom: 10px;" />
			<p style="font-size: 25px;"><img width="50px" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246466_Batman-128.png" id=""/>&nbsp;&nbsp;&nbsp;유재석</p>
			<hr style="color: b0b0b0; background-color:#b0b0b0; height: 1px; border: none; margin-top: 10px; margin-bottom: 10px;" />
		</article>
		
	</article>

	<!-- 화면 아래쪽 -->
	<footer id="make_app_footer">
		<article class="make_app_footer" id="make_app_footer_1">간략한
			설명</article>
		<article class="make_app_footer" id="make_app_footer_2">메모</article>
		<article class="make_app_footer" id="make_app_footer_3">담벼락</article>
		<article class="make_app_footer" id="make_app_footer_4">방문기록</article>
	</footer>
</body>
</html>