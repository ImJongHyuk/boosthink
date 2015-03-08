<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>어플 실행</title>
<head>

<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/base.css'/>">
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/execute_app.css'/>" />
<link type="text/css" rel="stylesheet"
		href="<c:url value='/resources/css/debug.css'/>" />
<!-- 잘 안되면 동적 path로 <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/style_1.css" /> -->
<script src="<c:url value='/resources/js/execute_app.js' />"></script>
<!-- 잘 안되면 동적 path로 <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.1.0.js"></script> -->

</head>
<body>
	<div id="layer_middle">
		<div id="layer_middle_left"></div>
		<div id="layer_middle_center">
			<div id="layer_execute">${layout_data}</div>
		</div>
		<div id="layer_middle_right">
		</div>
	</div>
</body>
</html>
