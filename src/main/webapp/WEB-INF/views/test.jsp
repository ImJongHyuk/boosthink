<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page  contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>TestPage</title>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/base.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/test.css'/>"/>
	<!--  link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/debug.css'/>"/-->
	<!-- 잘 안되면 동적 path로 <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/style_1.css" /> -->
	<script src="<c:url value='/js/static/jquery/1.11.0/jquery.js' />" ></script>
	<script src="<c:url value='/resources/js/test.js'/>"></script>
	<!-- 잘 안되면 동적 path로 <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.1.0.js"></script> -->
</head>
<body>
<div id="div_logic">
	<div class="newlogicComp" id="component_1">component_1</div>
	<div class="newlogicComp" id="component_2">component_2</div>
</div>
</body>
</html>
