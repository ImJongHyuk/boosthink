<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>어플제작</title>

<!-- Style Sheet -->
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/make_app.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/base.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/debug.css'/>" />
<link type="text/css" rel="stylesheet"
	href="<c:url value='/resources/css/make_app_soek.css'/>" />

<!-- JavaScript -->
<script src="<c:url value='/js/static/jquery/1.11.0/jquery.js' />"></script>
<script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script><!-- 페이지에서 긁어오지 말고 maven으로 해결하자! -->
<script src="<c:url value='/resources/js/a_heeyong.js'/>"></script>
<script src="<c:url value='/resources/js/a_younghwan.js'/>"></script>
<script src="<c:url value='/resources/js/make_appCenter.js'/>"></script>
<script src="<c:url value='/resources/js/make_appCenterFunc.js'/>"></script>
<script src="<c:url value='/resources/js/make_appLeft.js'/>"></script>
<script src="<c:url value='/resources/js/make_appLeftFunc.js'/>"></script>
<script src="<c:url value='/resources/js/make_appRightFunc.js'/>"></script>
<script src="<c:url value='/resources/js/make_app_soek.js'/>"></script>
<script src="<c:url value='/resources/js/logicLayer.js'/>"></script>
<script src="<c:url value='/resources/js/PlangTranslator.js'/>"></script>
<script src="<c:url value='/resources/js/loadCpnt.js'/>"></script>

</head>

<body>
	<!-- Left -->
	<div id="componentList" class="rightDiv">
		Components<br> 
		<select id="layoutComponentListSelect">
			<option value="1">button</option>
			<option value="2">Image</option>
			<option value="3">Text</option>
		</select>
		<div id="layoutCpntContainer">
			<img src="<c:url value='/resources/img/baseButton.png'/>" class='pComponent ui-draggable' id='baseButton' orichk='1' arridx=0>
			<img src="<c:url value='/resources/img/baseImage.png'/>" class='pComponent ui-draggable' id='baseImage' orichk='1' arridx=1>
			<img src="<c:url value='/resources/img/baseText.png'/>" class='pComponent ui-draggable' id='baseText' orichk='1' arridx=2>
		</div>
	</div>


	<!-- Center -->
	<div id="mainLayer" class="centerDiv">
		<!-- Initializing First Layer -->
		<div class='userLayerTab' id='userLayerTab0' originalNumber=0>
			Layer0<img src='https://lh6.googleusercontent.com/-1w3ez285coE/VCl20HWodKI/AAAAAAAAADs/NY-ossJKAcE/h120/xbox.png' class="xbox">
		</div>
		<div class='userLayerSpace' id='userLayerSpace0'>
			
			
			<div class='pComponent newComp section' id='section3'><img src="<c:url value='/resources/img/tempdiff.png'/>" class="pComponent newComp" id='tempdiff'></div>
			<div class='pComponent newComp section' id='section4'></div>
			<div class='pComponent newComp section' id='section5'></div>
		</div>
		<button id="createNewLayer">New Layer</button>
		<button id="translate_button">translate_button</button>
		
	</div>

	<!-- Right -->
	<div id="variableList" class="leftDiv"></div>
</body>
</html>