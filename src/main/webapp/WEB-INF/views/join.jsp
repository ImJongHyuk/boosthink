<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>회원가입</title>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/base.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/join.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/debug.css'/>"/>
	<!-- 잘 안되면 동적 path로 <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/style_1.css" /> -->
	<script src="<c:url value='/js/static/jquery/1.11.0/jquery.js' />" ></script>
	<script src="<c:url value='/resources/js/jquery.validate.js' />" ></script>	
	<script src="<c:url value='/resources/js/join.js' />" ></script>
	<!-- 잘 안되면 동적 path로 <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.1.0.js"></script> -->
</head>
<body onload="fIn()">
	<div id="layer_1">
		<div id="layer_1_left">
		</div>
		<div id="layer_1_center">
			<form id="form_signup" action="<c:url value="j_spring_security_check" />" method="post">
				<table>
				
					<tr>
						<th>E-Mail</th>
						<td>
							<input type="text" name="j_username" id="j_username" onfocus="plusFocus()" onblur="subFocus()">
							<!-- type="email" : IE9이상버전만 됨,Safari안됨 -->
						</td>
					</tr>
					<tr>
						<th>Password</th>
						<td>
							<input type="password" name="j_password" id="j_password" onfocus="plusFocus()" onblur="subFocus()">
						</td>
					</tr>
					<tr>
						<th>Confirm</th>
						<td>
							<input type="password" name="user_password2" id="user_password2" onfocus="plusFocus()" onblur="subFocus()">
						</td>
					</tr>
						<tr>
						<th>First Name</th>
						<td>
							<input type="text" name="user_firstname" id="user_firstname" onfocus="plusFocus()" onblur="subFocus()">
						</td>
					</tr>
					<tr>
						<th>Last Name</th>
						<td>
							<input type="text" name="user_lastname" id="user_lastname" onfocus="plusFocus()" onblur="subFocus()">
						</td>
					</tr>
					
					<tr>
						<th>Birth Date</th>
						<td>
							<input type="text" name="user_birth_year" id="user_birth_year" onfocus="plusFocus()" onblur="subFocus()"><br>
							<select name = "user_birth_month" name = "user_birth_month"> 
								<% 
									for(int i=1; i<=12; i++){ 
								%> 
								    <option value = "<%=i%>"><%=i%></option> 
								<% 
									} 
								%> 
							</select>
							<select name = "user_birth_day" id = "user_birth_day"> 
								<% 
									for(int i=1; i<=31; i++){ 
								%> 
								    <option value = "<%=i%>"><%=i%></option> 
								<% 
									} 
								%> 
							</select>
						</td>
					</tr>
					
					<tr>
						<th>Sex</th>
						<td>
							<input type="radio" name="user_sex" id="user_sex" value="male"> Male
							<input type="radio" name="user_sex" id="user_sex" value="female"> Female
	      					<br><span id="sex_comment"></span>
						</td>
					</tr>
				</table>
			</form>
		</div>
		<div id="layer_1_right">
			<a>&gt;</a>
		</div>
	</div>
	<div id="layer_2">
		<div id="layer_2_left">
			<a>&lt;</a>
		</div>
		<div id="layer_2_center">


			<div>
				<img id="div1" class="select"
					style="width: 180px; height: 180px; display: none; background-color: white;"></img>
				<img id="div2" class="select"
					style="width: 180px; height: 180px; display: none; background-color: green;"></img><br>
				<img id="div3" class="select"
					style="width: 180px; height: 180px; display: none; background-color: orange;"></img>
				<img id="div4" class="select"
					style="width: 180px; height: 180px; display: none; background-color: blue;"></img>
				<img id="results"
					style="width: 180px; height: 180px; display: none; background-color: black;"></img>
			</div>




		</div>
		<div id="layer_2_right">
			<a onclick="">&gt;</a>
		</div>
	</div>
	<div id="glaylayer"></div>
	<div id="overlayer">
	<p id="check" align="center">
	
	<img src="./images/ok.jpg">
	</p>
	
	</div>
</body>
</html>
