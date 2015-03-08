<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8" />
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>시험게시판</title>
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/base.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/app_list.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/debug.css'/>" />

<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/bootstrap.min.css'/>" media="screen" />

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

<script src="<c:url value='/js/static/jquery/1.11.0/jquery.js' />"></script>
<script src="<c:url value='/resources/js/app_list.js' />"></script>
<script src="<c:url value='/resources/js/bootstrap.min.js' />"></script>
</head>
<body>
	<div id=layer_1>
		<h1>Apps!</h1>
		<table  width="600" >
			<tr>
				<th>앱 번호</th>
			</tr>
			<c:forEach var="layout" items="${list}">
				<tr>
					<td><a class="app" id=${layout.id}>${layout.id}</a></td>
				</tr>
			</c:forEach>
		</table>

	</div>
</body>
</html>