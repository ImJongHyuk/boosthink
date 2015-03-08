<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>로그인 중복</title>

<link rel="stylesheet"
	href=<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>>

<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap.min.js' />"></script>

</head>

<script type="text/javascript">
	window.onload = function() {
		alert("다른 장소에서 로그인되었습니다.");
		location.replace("/plto/login");
	}
</script>

<body>

</body>
</html>