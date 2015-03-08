<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Play Together! PLTO</title>
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/base.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/main.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/debug.css'/>" />
	
<!--	<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/bootstrap.min.css'/>" media="screen" />
	-->
	 <link rel="stylesheet" href=<c:url value='/resources/css/metro-bootstrap.css'/>>
	
<!-- 잘 안되면 동적 path로 <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/style_1.css" /> -->
<script src="<c:url value='/js/static/jquery/1.11.0/jquery.js' />"></script>
<script src="<c:url value='/resources/js/main.js' />"></script>
<!-- 잘 안되면 동적 path로 <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.1.0.js"></script> -->
<!--<script src="<c:url value='/resources/js/bootstrap.min.js' />"></script>-->
<script src="<c:url value='/resources/js/metro.min.js' />"></script>
</head>

<body class="metro">
	<div id="layer_top">
		<span>PLTO</span>
	</div>
	<div id="layer_middle">
		<div id="layer_middle_left"></div>
		<div id="layer_middle_center">
			<div id=layer_1>
				<h1>Apps!</h1>
				<table width="600" class="table">
					<thead>
					<tr >
						<th>게시글 번호</th>
					</tr>
					</thead>
					<tfoot>
					</tfoot>
					<tbody class="striped">
					<c:forEach var="board" items="${list}">
						<tr>
							<td><a class="board" id=${board.id}>${board.id}</a></td>
						</tr>
					</c:forEach>
					</tbody>
				</table>

			</div>
			<a id="GoAppList">GoAppList</a>
			<button type="button" class="warning">버튼</button>
		</div>
		<div id="layer_middle_right"></div>
	</div>
	<div id="layer_bottom">
		<span id="mod_user">회원정보 수정</span><br> 
		<span id="disconnect_session"><a href="<c:url value="j_spring_security_logout" />" target="_self">로그아웃</a></span>
	</div>
</body>
</html>

<!-- <jsp:include page="test.jsp" /> -->