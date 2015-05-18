<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>PLTO에 오신 것을 환영합니다.</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- bootstrap CDN -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/base.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/debug.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/login.css'/>" />

<!-- 잘 안되면 동적 path로 <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/style_1.css" /> -->
<!-- JavaScript -->
<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="//code.jquery.com/ui/1.9.2/jquery-ui.min.js"></script>
<script src="<c:url value='/resources/js/login.js' />"></script>
<!-- 잘 안되면 동적 path로 <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.1.0.js"></script> -->
</head>
<!-- 로드시 Fade in -->
<body onload="fIn()">
	<!-- <img src="//i.imgur.com/T2qCras.png" id="login_plto_logo" /> -->
	<!-- <article id="layer_middle_left">&lt;</article> -->

	<div class="container" style="position: absolute; top: 30%; left: 15%; right: 15%; width: 70%;">
		<!-- <h2 style="text-align: left;"><img src="//i.imgur.com/T2qCras.png" id="" style="width: 150px; margin-left: 8%;"/></h2> -->
		<form class="form-horizontal" role="form" style="height: 100%;">
			<div class="row" style="height: 100%;">
				<div class="col-sm-5" style="border-right: 5px; height: 100%; border-color: #707070; border-style: solid; padding-right: 50px;">
					<div class="form-group">
						<div class="col-sm-4"></div>
						<div class="col-sm-8" style="text-align: left;"><img src="//i.imgur.com/T2qCras.png" id="" style="width: 135px; height: auto;"/></div>
					</div>
					<div class="form-group">
						<!-- <label class="control-label col-sm-4" for="email">Email:</label> -->
						<div class="col-sm-offset-4 col-sm-8" style="text-align: left;">
							<!-- <p class="form-control-static">someone@example.com</p> -->
							<input type="email" class="form-control" id="email" placeholder="Email Address" style="background-color: #d1e0ff;">
						</div>
					</div>
					<div class="form-group">
						<!-- <label class="control-label col-sm-4" for="pwd">Password:</label> -->
						<div class="col-sm-offset-4 col-sm-8">
							<input type="password" class="form-control" id="pwd" placeholder="Password" style="background-color: #ffdeda;">
						</div>
					</div>
					<div class="form-group" style="margin-bottom: 10px;">
						<div class="col-sm-offset-4 col-sm-8" style="text-align: left;">
							<button type="submit" class="btn btn-default" style="width: 90%; background-color: #ededed;">Login</button>
						</div>
					</div>
				</div>
				<div class="col-sm-7" style="height: auto; padding-top: 60px; padding-left: 20px;">
					<div class="col-sm-6" style="height: 100%; font-size: 18px; text-align: left;">
						Login with :<br>
						<a href="" onfocus="this.blur()">
							<img src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/facebook.png" style="width: 50px; height: auto; margin-top: 5%;">
						</a>
						<a href="" onfocus="this.blur()">
							<img src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/google.png" style="width: 50px; height: auto; margin-top: 5%; margin-left: 2%;">
						</a>
					</div>
					<!-- <div class="col-sm-4" style="text-align: left;">
						<a href="" onfocus="this.blur()">
							<img src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/facebook.png" style="width: 50px; height: auto;">
						</a><br>
						<a href="" onfocus="this.blur()">
							<img src="http://plto.ipdisk.co.kr/publist/HDD1/beeild/plto_image/google.png" style="width: 50px; height: auto; margin-top: 20px;">
						</a>
					</div> -->
				</div>
			</div>
		</form>
	</div>


	<!-- <form id="login_form"
		action="<c:url value="j_spring_security_check" />" method="post">
		<table id="login_table" style="width: 100%;">
			<tr style="width: 100%;">
				<th style="width: 5%;"><label for="j_username" style="width: 100%;">ID</label></th>
				<td style="width: 95%;"><input id="j_username" name="j_username" type="text" style="width: 11.5%;"></td>
			</tr>
			<tr>
				<th><label for="j_password">Password</label></th>
				<td><input id="j_password" name="j_password" type="password"></td>
			</tr>
		</table>
	</form> -->




	<!-- <img src="//i.imgur.com/hVITmbR.png" id="label_id" />
		<input id="input_id" type="text">
		
		<img src="//i.imgur.com/hDRavWc.png" id="label_pw"/>
		<input id="input_pw" type="text">
		
		<input type="button" value="login" id="login_button">
		
		<article id="sign_up"> sign up </article>
		
		<article id="login_with"> login_with </article> -->








	<a id="GoEdit">GoEdit</a>
	<BR>
	<a id="GoAppList">GoAppList</a>
	<BR>
	<a id="GoTest">Soek's test</a>


	<!-- <article id="layer_middle_right">&gt;</article> -->
</body>
</html>
