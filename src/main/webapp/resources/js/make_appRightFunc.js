var compListRight = new Array();
var layerChangeFlag = 0;
var appendCompFlag = 0;

function addCompListRight(copyComp, parentLayer){
	compListRight[compListRight.length] = copyComp;
	//var parentLayer = 'userLayerSpace'+copyComp.attr('parentlayer');
	if(layerChangeFlag == 1 && currentLayer != Number($(".usedComponent:first").attr('parentlayer'))){
		$(".usedComponent:first").before("<div class='usedComponent usedComponent" + copyComp.attr('parentlayer') + "' parentlayer='"+ copyComp.attr('parentlayer') +"'>"
				+ parentLayer.attr('id') + "    " + copyComp.attr('id') + "</div>");

		layerChangeFlag = 0;
	}
	else{
		$(".usedComponent" + copyComp.attr('parentlayer') + ":last").after("<div class='usedComponent usedComponent"
				+ copyComp.attr('parentlayer') + "' parentlayer='"+ copyComp.attr('parentlayer') + "'>"
				+ parentLayer.attr('id') + "    " + copyComp.attr('id') + "</div>");
	}

	if(appendCompFlag == 0){
		$("#variableList").append("<div class='usedComponent usedComponent" + copyComp.attr('parentlayer') + "' parentlayer='"+ copyComp.attr('parentlayer') + "'>"
				+ parentLayer.attr('id') + "    " + copyComp.attr('id') + "</div>");
		appendCompFlag = 1;
	}
	$(".usedComponent" + currentLayer).css('border-color','black');
}

// 야 일났다 여기 compListRight가 있는데 객체 정보가 바뀔 때 이 배열들은 안 바뀌는 거 같다 얘 말고 다른 Array 들도 찾아바야것다.
function changeCompListRight(){
	// Case of component 0
	if(compListRight.length == 0)
		$(".usedComponent").remove();
	else{
		$(".usedComponent").remove();
		var layerMax = 0;
		for(var i=0;i<compListRight.length;i++){
			// Set the layerMax
			if(compListRight[i].attr('parentlayer') > layerMax)
				layerMax = compListRight[i].attr('parentlayer');
			// Set the currentLayer compList
			if(compListRight[i].attr('parentlayer') == currentLayer)
				$("#variableList").append("<div class='usedComponent usedComponent" + compListRight[i].attr('parentlayer') +"' parentlayer='" + compListRight[i].attr('parentlayer') + "'>"
						+ compListRight[i].parent().attr('id') + "    " + compListRight[i].attr('id') + "</div>");
		}
		// Set the compList except currentLayer component
		for(var i=0;i<=layerMax;i++){
			if(i == currentLayer)
				i++;
			for(var j=0; j<compListRight.length;j++){
				if(compListRight[j].attr('parentlayer') == i)
					$("#variableList").append("<div class='usedComponent usedComponent" + compListRight[j].attr('parentlayer') +"' parentlayer='" + compListRight[j].attr('parentlayer') + "'>"
							+ compListRight[i].parent().attr('id') + "    " + compListRight[j].attr('id') + "</div>");
			}
		}
		layerMax = 0;
		$(".usedComponent").css('border-color','white');
		$(".usedComponent" + currentLayer).css('border-color','black');		
	}
}