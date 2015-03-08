var layerCnt = 1;
var lastLayerCnt = 1;
var layerArr = new Array();
var currentLayer = 0;
var deleteFlag = 0;	// For preventing duplication event, (.userLayerTab & .xbox)

//Layer Create Function 
function createLayer(layerCnt){
	// layer tab
	var left = (layerCnt*10+5) + "%";
	$("#mainLayer").append("<div class='userLayerTab' id='userLayerTab" + lastLayerCnt + "' originalNumber="+layerCnt+">Layer" + lastLayerCnt + "<img src='/plto/resources/img/xbox.png' class='xbox'></div>");
	$("#userLayerTab" + lastLayerCnt).css({'position': 'absolute', 
		'top': '5%', 'left': left, 'width': '10%', 'height': '5%', 'background-color': 'pink'});
	tabDraggable($("#userLayerTab" + lastLayerCnt));

	// layer space
	$("#mainLayer").append("<div class='userLayerSpace' id='userLayerSpace" + lastLayerCnt + "'></div>");
	$("#userLayerSpace" + lastLayerCnt).css({'position': 'absolute', 'background-color': 'white', 
		'top': '10%', 'left': '5%', 'width': '90%', 'height': '75%'});

	// Show the last layer
	$("#" + layerArr[currentLayer]).css('background-color', 'white');
	var currentLayerNum = Number($("#"+layerArr[currentLayer]).attr('id').substr(12));
	$("#userLayerSpace" + currentLayerNum).css('visibility','hidden');
	for(var i = 0; i<compVisibility[currentLayer].length; i++)
		$('#'+compVisibility[currentLayer][i]).css('visibility','hidden');

	currentLayer = layerCnt;

	// Make Arr for compVisibility
	compVisibility[currentLayer] = new Array();

	// Save the id to layerArr
	layerArr[layerCnt] = "userLayerTab" + lastLayerCnt;
	lastLayerCnt++;
}

//////////////////////////////////////////////////////////////parameter 이름 좀 통일하자
//Layer Change Function
function changeLayer(clickedLayer){
	// Set userLayerTab css
	$("#"+layerArr[currentLayer]).css('background-color','white');
	clickedLayer.css('background-color','pink');

	// Get Layer Number
	var clickedLayerNumber = clickedLayer.attr('originalNumber');
	var tabNum = Number(clickedLayer.attr('id').substr(12));
	var currentLayerNum = Number($("#"+layerArr[currentLayer]).attr('id').substr(12));

	// Set userLayerSpace css
	$("#userLayerSpace" + currentLayerNum).css('visibility','hidden');
	$("#userLayerSpace" + tabNum).css('visibility','visible');

	for(var i = 0; i<compVisibility[currentLayer].length; i++)
		$('#'+compVisibility[currentLayer][i]).css('visibility','hidden');
	currentLayer = clickedLayerNumber;
	for(var i = 0; i<compVisibility[currentLayer].length; i++)
		$('#'+compVisibility[currentLayer][i]).css('visibility','visible');
}

//Layer Delete Function
function deleteLayer(clickedX){
	// Get Layer Number & tab Number
	var tabNum = Number(clickedX.parent().attr('id').substr(12));
	var left = 0;
	var clickedXNumber = clickedX.parent().attr('originalNumber');
	// Exception for 1 layer
	if(layerArr.length == 1){
		alert("layer는 최소 한 개가 있어야 합니다.");
		deleteFlag = 1;
		return;
	}

	// When the xbox in the currentLayer, css set
	$("#"+layerArr[currentLayer]).css('background-color','white');
	// Delete CurrentLayer Component
	for(var i = 0; i<compVisibility[currentLayer].length; i++)
		$('#'+compVisibility[currentLayer][i]).css('visibility', 'hidden');
	var currentVar = Number($("#"+layerArr[currentLayer]).attr('id').substr(12));
	$("#userLayerSpace" + currentVar).css('visibility','hidden');

	// Component delete & id delete from compVisibility array
	layerCompDelete(compVisibility[clickedXNumber]);

	// Delete the target from compVisibility array
	compVisibility.splice(clickedXNumber, 1);
	// Modifying parentLayer
//////////////////////////////////////////////////////////////////////////그냥 그대로 쓰면 안됨?(parentLayer, originalNumber) => 그대로 쓰고 위치만 변경
	for(var i = clickedXNumber; i< compVisibility.length; i++)
		for(var j = 0; j<compVisibility[i].length; j++)
			$('#'+compVisibility[i][j]).attr('parentLayer', $('#'+compVisibility[i][j]).attr('parentLayer')-1);

	clickedX.parent().remove();
	$("#userLayerSpace" + tabNum).remove();

	// Case of last layer
	if(clickedXNumber == layerArr.length-1){
		layerArr.splice(clickedXNumber, 1);
		var setLayerNum = Number($("#"+layerArr[clickedXNumber-1]).attr('id').substr(12));
		$("#" + layerArr[clickedXNumber-1]).css('background-color','pink');
		$("#userLayerSpace" + setLayerNum).css('visibility', 'visible');
		currentLayer = clickedXNumber-1;
		for(var i = 0; i<compVisibility[currentLayer].length; i++)
			$('#'+compVisibility[currentLayer][i]).css('visibility','visible');
		layerCnt--;
		deleteFlag = 1;
		return;
	}

	// For common case	
	layerArr.splice(clickedXNumber, 1);
	for(var i=clickedXNumber; i<layerArr.length; i++){
		left = (i*10+5) + "%";
		$("#"+layerArr[i]).attr('originalNumber', i);
		$("#"+layerArr[i]).css('left', left);
	}
	var setLayerNum = Number($("#"+layerArr[clickedXNumber]).attr('id').substr(12));
	$("#" + layerArr[clickedXNumber]).css('background-color','pink');
	$("#userLayerSpace" + setLayerNum).css('visibility', 'visible');
	currentLayer = clickedXNumber;
	for(var i = 0; i<compVisibility[currentLayer].length; i++)
		$('#'+compVisibility[currentLayer][i]).css('visibility','visible');
	layerCnt--;
	deleteFlag = 1;
	return;
}

//Change layer name function
function changeLayerName(target){
	var changeName = prompt("Change the layer Name");
	target.text(changeName);
	target.append("<img src='/plto/resources/img/xbox.png' class='xbox'>");
	target.attr('userLayerName', changeName);
}

//Dynamic Droppable
function dynamicDrop(){
	$(".userLayerSpace").droppable({
		accept: '.pComponent',
		drop: function (ev, ui) {
			// Add component on the only current layer
			if($("#userLayerTab"+$(this).attr('id').substr(14)).attr('originalNumber') == currentLayer){
				var thisComp = $(ui.draggable);
				// 'oriChk' == 1 means original, 0 means clone
				if($(ui.draggable).attr('oriChk') == 1){
					var element = $(ui.draggable).clone().attr('oriChk',0);
					// Give the id each component
					if(thisComp.attr('id') == "pButton" || thisComp.attr('id') == "pImage" || thisComp.attr('id') == "pText"){
						if(compArr[element.attr('arrIdx')] == undefined)
							compArr[element.attr('arrIdx')] = 0;
						element.attr('id', element.attr('id')+compArr[element.attr('arrIdx')]++);
					}
					//When an existing object is dragged
					element.draggable({
						stack:'.pComponent',
						containment: 'body',
						revert: 'invalid',
						start: function (ev, ui) {
							$('#div_sts').hide();
						},
						stop: function(ev, ui){
							// position by mouse stop
							$('#div_sts').css('left',$(this).offset().left + "px");
							$('#div_sts').css('top',$(this).offset().top-100 + "px");
						}
					});
					// Component appending & properties setting
					element.css('position','absolute');				
					$('#userLayerSpace'+Number($("#"+layerArr[currentLayer]).attr('id').substr(12))).append(element);
					element.offset({top: ui.helper.offset().top, left: ui.helper.offset().left});
					element.addClass('newComp');
					element.attr('parentLayer',currentLayer);
					element.css('visibility','visible');
					compVisibility[currentLayer][compVisibility[currentLayer].length] = element.attr('id');
					addCompListRight(element,$(this));
				}
			}
		}
	});
}

//Each Component Delete Function
function deleteComponent(target){
	var targetObj = $('#'+target);
	// Delete the target from compListRight array
	for(var i=0;i<compListRight.length;i++){
		if(compListRight[i].attr('id') == target){
			compListRight.splice(i,1);
			break;
		}
	}
	for(var i=0;i<compVisibility[currentLayer].length;i++){
		if(compVisibility[currentLayer][i] == targetObj.attr('id')){
			compVisibility[currentLayer].splice(i,1);
			break;
		}
	}
	//Restructuring right layout
	changeCompListRight();
	if(compListRight.length == 0)
		appendCompFlag = 0;

	// Remove the component
	targetObj.remove();
	remove_sts_menu();
}

//Component Delete Function In Layer Delete
function layerCompDelete(target){

	// Delete the target from compListRight array
	for(var i=0; i<target.length; i++){
		for(var j=0; j<compListRight.length; j++){
			if(target[i] == compListRight[j].attr('id')){
				compListRight.splice(j,1);
				break;
			}
		}
		// Remove the component
		$('#'+target[i]).remove();
	}

	//Restructuring right layout
	changeCompListRight();
	if(compListRight.length == 0)
		appendCompFlag = 0;
}