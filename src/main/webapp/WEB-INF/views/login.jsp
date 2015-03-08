<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>PLTO에 오신 것을 환영합니다.</title>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/base.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/login.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/debug.css'/>"/>
	<!-- 잘 안되면 동적 path로 <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/style_1.css" /> -->
	<script src="<c:url value='/js/static/jquery/1.11.0/jquery.js' />" ></script>
	<script src="<c:url value='/resources/js/login.js' />" ></script>
	<!-- 잘 안되면 동적 path로 <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.1.0.js"></script> -->
</head>
<body onload="fIn()">
	<div id="layer_top">
		<p>PLTO</p>
	</div>
	<div id="layer_middle">
		<div id="layer_middle_left">
			<a>&lt;</a>
		</div>
		<div id="layer_middle_center">
			<form id="login_form" action="<c:url value="j_spring_security_check" />" method="post">
				<table id="login_table">
					<tr>
						<th><label for="j_username">ID</label></th>
						<td><input id="j_username" name="j_username" type="text"></td>
					</tr>
					<tr>
						<th><label for="j_password">Password</label></th>
						<td><input id="j_password" name="j_password" type="password"></td>
					</tr>
				</table>
			</form>
				<P>수평정렬은 블록의 사이즈가 딱 정해져 있지 않으면 못하는듯. 찾아보면 거의 수동으로 하네.</P>
				<a id="GoEdit">GoEdit</a><BR>
				<a id="GoAppList">GoAppList</a><BR>
				<a id="GoTest">Soek's test</a>
			
		</div>
		<div id="layer_middle_right">
			&gt;
		</div>
	</div>
	<div id="layer_bottom">걍 fixed 시험해봄</div>
</body>
</html>
