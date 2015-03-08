<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>회원정보수정</title>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/base.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/modify.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/resources/css/debug.css'/>"/>
	<!-- 잘 안되면 동적 path로 <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/style_1.css" /> -->
	<script src="<c:url value='/js/static/jquery/1.11.0/jquery.js' />" ></script>
	<script src="<c:url value='/resources/js/jquery.validate.js' />" ></script>	
	<script src="<c:url value='/resources/js/modify.js' />" ></script>
	<!-- 잘 안되면 동적 path로 <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.1.0.js"></script> -->
</head>
<body>
	<div id="layer_1">
		<div id="layer_1_left">
		</div>
		<div id="layer_1_center">
			<form id="form_mod_user" action="/plto/modifyProc" method="post">
				<table>
					<tr>
						<th>New Password</th>
						<td>
							<input type="password" name="user_password" id="user_password" onfocus="plusFocus()" onblur="subFocus()">
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
							<input type="text" name="user_firstname" id="user_firstname" value="${firstname}" onfocus="plusFocus()" onblur="subFocus()">			
							</td>
					</tr>
					<tr>
						<th>Last Name</th>
						<td>
							<input type="text" name="user_lastname" id="user_lastname" value="${lastname}" onfocus="plusFocus()" onblur="subFocus()">
						</td>
					</tr>
					<tr>
						<th>Birth Date</th>
						<td>
							<input type="text" name="user_birth_year" id="user_birth_year" value="${year}" onfocus="plusFocus()" onblur="subFocus()"><br>
							<select name = "user_birth_month" name = "user_birth_month"> 
								<c:forEach var="i" begin="1" end="12">
								    <option value="${i}"
								    <c:if test="${month==i}">
										selected
								    </c:if>   
								    > ${i}</option>
	      						</c:forEach>
							</select>
							<select name = "user_birth_day" id = "user_birth_day"> 
								<c:forEach var="i" begin="1" end="31">
								    <option value="${i}"
								    <c:if test="${day==i}">
										selected
								    </c:if>   
								    > ${i}</option>
	      						</c:forEach>
							</select>
						</td>
					</tr>
					<tr>
						<th>Sex</th>
						<td>
							<input type="radio" name="user_sex" id="user_sex" value="male"
								<c:if test="${sex=='M'}">
									checked
							    </c:if>
						    > Male
							<input type="radio" name="user_sex" id="user_sex" value="female"
								<c:if test="${sex=='F'}">
									checked
							    </c:if>
							> Female
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
</body>
</html>
