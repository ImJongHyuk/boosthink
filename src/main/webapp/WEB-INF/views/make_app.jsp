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
<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/base.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/debug.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/make_app.css'/>" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">

<!-- JavaScript -->
<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="//code.jquery.com/ui/1.9.2/jquery-ui.min.js"></script>
<script src="<c:url value='/resources/js/make_app.js'/>"></script>

<script src="<c:url value='/resources/js/modernizr.custom.79639.js'/>"></script>

</head>

<body>
	<!-- 화면 맨 위 -->
	<header id="make_app_header">
		<p align="left" style="float: left; width: 15%; height: 100%; margin: 0.7% 0px 0px 1.5%;">
			<img height="70%" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/play_together.png" id=""/>
		</p>
		<p align="right" style="float: right; width: 40%; height: 100%; margin: 0.5% 8% 0px 0px;">
			<img height="80%" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246785_megaphone.png" id=""/>
			&nbsp;&nbsp;&nbsp;<img height="80%" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246775_chat.png" id=""/>
			&nbsp;&nbsp;&nbsp;<img height="80%" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246779_profle.png" id=""/>
		</p>
	</header>
	<!-- 화면 header 아래 네비게이터 -->
	<nav id="make_app_nav"></nav>

	<!-- 메인 화면 -->
	
	
	<article id="make_app_main">
		<article class="ch-item ch-img" style="top: 10%; left: 10%;">
			<article class="ch-info"></article>
		</article>
		<article class="ch-item ch-img" style="top: 10%; left: 26%;">
			<article class="ch-info"></article>
		</article>
		<article class="make_app_main_widget" id="make_app_main_widget_1">widget
			3(작업목록)</article>
		<article class="make_app_main_widget" id="make_app_main_widget_2">widget
			4(최근활동)</article>
		<article class="ch-item ch-img" style="top: 40%; left: 10%;">
			<article class="ch-info"></article>
		</article>
		<article class="ch-item ch-img" style="top: 40%; left: 26%;">
			<article class="ch-info">
				<!-- <h3>Add<br> widget</h3> -->
			</article>
		</article>
	</article>

	<!-- 화면 오른쪽 -->
	<article class="make_app_right" id="make_app_right_searchbar">
		<form method="get" action="/search" id="search" style="width: 100%; height: 100%; font-size: 70%;">
			<input name="q" type="text" size="40" placeholder="Search..." style="width: 100%; height: 100%; padding-left: 10%; position: relative; top: 0%" />
		</form>
	</article>
	<article class="make_app_right" id="make_app_right_button">
		<article class="make_app_right_button" id="make_app_right_button_1"></article>
		<article class="make_app_right_button" id="make_app_right_button_2"></article>
		<article class="make_app_right_button" id="make_app_right_button_3"></article>
		<article class="make_app_right_button" id="make_app_right_button_4"></article>
	</article>
	<article class="make_app_right" id="make_app_right_list">
		<article class="right_comp">
			<article class="make_app_right_list_row" style="width: 100%; height: 10%; border: 0px;">
				<article class="make_app_right_list_column_1" style="width: 25%; height:100%; border: 0px;">
					<img style="margin-top: 20%; width: 80%; height: auto; max-height: 80%;" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430245498_Santa-128.png" id=""/>
				</article>
				<article class="make_app_right_list_column_2" style="width: 25%; height:100%; left: 25%; border: 0px;">
					<img style="margin-top: 20%; width: 80%; height: auto; max-height: 80%;" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430245463_Man-1-128.png" id=""/>
				</article>
				<article class="make_app_right_list_column_3" style="width: 25%; height:100%; left: 50%; border: 0px;">
					<img style="margin-top: 20%; width: 80%; height: auto; max-height: 80%;" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246433_Road-Worker-1-128.png" id=""/>
				</article>
				<article class="make_app_right_list_column_4" style="width: 25%; height:100%; left: 75%; border: 0px;">
					<img style="margin-top: 20%; width: 80%; height: auto; max-height: 80%;" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246466_Batman-128.png" id=""/>
				</article>
			</article>
			<article class="make_app_right_list_row" style="width: 100%; height: 10%; border: 0px; top: 10%;">
				<article class="make_app_right_list_column_1" style="width: 25%; height:100%; border: 0px;">
					<img style="margin-top: 20%; width: 80%; height: auto; max-height: 80%;" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430245493_Farmer-128.png" id=""/>
				</article>
				<article class="make_app_right_list_column_2" style="width: 25%; height:100%; left: 25%; border: 0px;">
					<img style="margin-top: 20%; width: 80%; height: auto; max-height: 80%;" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430246433_Road-Worker-1-128.png" id=""/>
				</article>
				<article class="make_app_right_list_column_3" style="width: 25%; height:100%; left: 50%; border: 0px;">
					<img style="margin-top: 20%; width: 80%; height: auto; max-height: 80%;" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430245498_Santa-128.png" id=""/>
				</article>
				<article class="make_app_right_list_column_4" style="width: 25%; height:100%; left: 75%; border: 0px;">
					<img style="margin-top: 20%; width: 80%; height: auto; max-height: 80%;" src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/1430245463_Man-1-128.png" id=""/>
				</article>
			</article>			
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