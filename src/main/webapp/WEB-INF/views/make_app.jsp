<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>어플제작</title>

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
	<header id="make_app_header">Play Together</header>
	<!-- 화면 header 아래 네비게이터 -->
	<nav id="make_app_nav"></nav>

	<!-- 메인 화면 -->
	<article id="make_app_main"></article>
	<article class="make_app_main_widget" id="make_app_main_widget_1">widget
		1</article>
	<article class="make_app_main_widget" id="make_app_main_widget_2">widget
		2</article>
	<article class="make_app_main_widget" id="make_app_main_widget_3">widget
		3</article>
	<article class="make_app_main_widget" id="make_app_main_widget_4">widget
		4</article>
	<article class="make_app_main_widget" id="make_app_main_widget_5">widget
		5</article>
	<article class="make_app_main_widget" id="make_app_main_widget_6">widget
		6</article>
	<article class="make_app_main_widget" id="make_app_main_widget_7">widget
		7(작업목록)</article>
	<article class="make_app_main_widget" id="make_app_main_widget_8">widget
		8(최근활동)</article>

	<!-- 화면 오른쪽 -->
	<article class="make_app_right" id="make_app_right_searchbar"></article>
	<article class="make_app_right" id="make_app_right_button">
		<article class="make_app_right_button" id="make_app_right_button_1">사람</article>
		<article class="make_app_right_button" id="make_app_right_button_2">레이</article>
		<article class="make_app_right_button" id="make_app_right_button_3">로직</article>
		<article class="make_app_right_button" id="make_app_right_button_4">섭스</article>
	</article>
	<article class="make_app_right" id="make_app_right_list"></article>

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