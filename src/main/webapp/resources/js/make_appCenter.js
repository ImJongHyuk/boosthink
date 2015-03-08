$(document).ready(function(){
	alert(1);
	layerArr[0] = "userLayerTab0";
	compVisibility[0] = new Array();
	tabDraggable($("#userLayerTab0"));
});

//userLayerTab hidden & visibility
//LayerTab Click Event
$(document).on("click", ".userLayerTab", function(e){
	// Change the layer name
	if($(this).attr('originalNumber') == currentLayer && deleteFlag == 0){
		changeLayerName($(this));
		return;
	}
	// Change the layer
	if(deleteFlag == 0){
		changeLayer($(this));
		changeCompListRight();
		layerChangeFlag = 1;
	}
	deleteFlag = 0;
});

//New Layer Button Click Event => Create New Layer
$(document).on("click", "#createNewLayer", function(e){
	createLayer(layerCnt);
	layerCnt++;

	// tabSizeDown() is implemented in a_heeyong.js
	if(layerCnt>9)
		tabSizeDown();

	changeCompListRight();
	layerChangeFlag = 1;

	dynamicDrop();
});

//X box Click Event => Delete Layer
$(document).on("click", ".xbox", function(e){
	deleteLayer($(this));
	
	// tabSizeUp() is implemented in a_heeyong.js
	if(layerCnt >= 9)
		tabSizeUp();
	
	changeCompListRight(); // Right restructuring final after delete layer
});

//Give draggable function to each tab
function tabDraggable(tab){
	tab.draggable({
		stack: '.ui-dragging',
		helper: 'clone',
		containment: 'body',
		start: function(ev, ui){
			$(ui.helper).attr('id','temp');
			$(ui.helper).removeClass("userLayerTab");
			// get RightOffset
			tabRightOffset = getTabRightOffset($(this));	// a_heeyong.js
		},
		drag: function(ev, ui){
			retCompIdx = findNearestTab(ui.helper, tabRightOffset);	// a_heeyong.js
		},
		stop: function(ev,ui){
			$('.nearestTabR').removeClass("nearestTabR");
			$('.nearestTabL').removeClass("nearestTabL");
			// Exception of component group
			if(retCompIdx == null)
				return;
			//shiftTabFunc($(this),retCompIdx);	// a_heeyong.js
		}
	});
}