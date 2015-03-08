//userLayerTab Size Down
function tabSizeDown(){
	var size = $('.userLayerSpace').eq(0).width()/layerCnt;
	$('.userLayerTab').css('width', size);
	for(var i=1; i<$('.userLayerTab').length; i++){
		$('[class=userLayerTab]').eq(i).offset({
			left : $("[class=userLayerTab]").eq(i-1).offset().left + size});
	}
}

//userLayerTab Size Up
function tabSizeUp(){
	var size = $('.userLayerSpace').eq(0).width()/layerCnt;
	$('.userLayerTab').css('width', size);
	for(var i=1; i<$('.userLayerTab').length; i++){
		$('[class=userLayerTab]').eq(i).offset({
			left : $("[class=userLayerTab]").eq(i-1).offset().left + size});
	}
}

//get a tab's right offset
function getTabRightOffset(target){
	if($('.userLayerTab').length == 1)
		return;
	var tabRight = new Array();
	var size = target.width();

	for(var i=0;i<$('.userLayerTab').length;i++)
		tabRight[i] =  $('.userLayerTab').eq(i).offset().left + size;
	
	// target offset masking
	//tabRight[target.attr('originalnumber')] = -1;
	return tabRight;
}

//get a nearest tab
function findNearestTab(target, tabRightArr){
	var minDistance = 100, distance;
	var targetLeft = target.offset().left;
	var retCompIdx = null;
	var minSize = target.width();

	// need a test Exception vertical side
	if(Math.abs(($('.userLayerTab').eq(0).offset().top+$('.userLayerTab').eq(0).height()/2)-(target.offset().top+target.height()/2)) > target.height()){
		$('.nearestTabR').removeClass("nearestTabR");
		$('.nearestTabL').removeClass("nearestTabL");
		return null;
	}
	
	// first userLayerTab Exception
	if(Math.abs(target.offset().left-$('.userLayerTab').eq(0).offset().left) < minSize/2){
		$('.nearestTabR').removeClass("nearestTabR");
		$('.userLayerTab').eq(0).addClass("nearestTabL");
		target.removeClass("nearestTabL");
		return -1;
	}
	
	$('.nearestTabL').removeClass("nearestTabL");
	for(var i=0; i<tabRightArr.length; i++){
		distance = Math.abs(tabRightArr[i]-targetLeft);
		if(minDistance >= distance){
			minDistance = distance;
			if(retCompIdx != null)
				$('.nearestTabR').removeClass("nearestTabR");
			retCompIdx = i;
			$('[originalnumber='+i+']').addClass("nearestTabR");
			target.removeClass("nearestTabR");
		}
	}

	if(minDistance > minSize/2){
		$('.nearestTabR').removeClass("nearestTabR");
		return null;
	}

	return retCompIdx;
}
/*
//shift tabs except target
function shiftTabFunc(target, idx){
	var size = target.width();
	// Move to first position
	if(idx == -1){
		// set target's offset
		target.offset({left: $('[originalnumber=0]').offset().left});
		var oriNum = target.attr('originalnumber');
		// set rest tabs
		for(var i=0; i<target.attr('originalnumber'); i++){
			if($('.userLayerTab').eq(i).attr('id') != target.attr('id')){ // 이 if문은 있을 필요가 있는 건가
				$('.userLayerTab').eq(i).attr('originalnumber', parseInt($('.userLayerTab').eq(i).attr('originalnumber'))+1);
				$('.userLayerTab').eq(i).offset({left: $('.userLayerTab').eq(i).offset().left+size});
				// children's parentlayer set
				$('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)).children().attr('parentlayer', $('.userLayerTab').eq(i).attr('originalnumber'));
			}
		}
		// set target's originalnumber
		target.attr('originalnumber', idx+1);

		// 이거 리얼 after 되는 지 확인 복사 안 되고
		$('[originalnumber =1]').before(target);
		// children's parentlayer set
		$('#userLayerSpace'+target.attr('id').substr(12)).children().attr('parentlayer', idx+1);

		// change the compVisibility[][], 이거슨 리소스 낭비인가, 일단 remove 해주고 하는 것이 옳지 않을까
		for(var i=0; i<=oriNum; i++){
			compVisibility[i] = new Array();
			for(var j=0;j<$('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)+'> img').length;j++)
				compVisibility[i][j] = $('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)+'> img').eq(j).attr('id');
		}
	}
	// Move to Right
	else if(idx > target.attr('originalnumber')){
////////////////////////////////////////////테스트 필요
		// set target's offset
		target.offset({left: $('[originalnumber='+idx+']').offset().left});
		var oriNum = target.attr('originalnumber');
		// set rest tabs
		for(var i=parseInt(target.attr('originalnumber'))+1; i<=idx; i++){
			if($('.userLayerTab').eq(i).attr('id') != target.attr('id')){
				$('.userLayerTab').eq(i).attr('originalnumber', parseInt($('.userLayerTab').eq(i).attr('originalnumber'))-1);
				$('.userLayerTab').eq(i).offset({left: $('.userLayerTab').eq(i).offset().left-size});
				// children's parentlayer set
				$('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)).children().attr('parentlayer', $('.userLayerTab').eq(i).attr('originalnumber'));
			}
		}
		// set target's originalnumber
		target.attr('originalnumber', idx);
		$('[originalnumber ='+idx+']').after(target);
		// children's parentlayer set
		$('#userLayerSpace'+target.attr('id').substr(12)).children().attr('parentlayer', idx+1);

		// change the compVisibility[][]
		for(var i=oriNum; i<=idx; i++){
			compVisibility[i] = new Array();
			for(var j=0;j<$('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)+'> img').length;j++){
				compVisibility[i][j] = $('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)+'> img').eq(j).attr('id');
				$('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)+'> img').eq(j).attr('parentlayer', i);
			}
		}
	}
	// Move to Left
	else if(idx < target.attr('originalnumber')){

		// set target's offset
		target.offset({left: $('[originalnumber='+idx+']').offset().left+size});
		var oriNum = target.attr('originalnumber');
		// set rest tabs
		for(var i=idx+1; i<target.attr('originalnumber'); i++){
			if($('.userLayerTab').eq(i).attr('id') != target.attr('id')){
				$('.userLayerTab').eq(i).attr('originalnumber', parseInt($('.userLayerTab').eq(i).attr('originalnumber'))+1);
				$('.userLayerTab').eq(i).offset({left: $('.userLayerTab').eq(i).offset().left+size});
				// children's parentlayer set
				$('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)).children().attr('parentlayer', $('.userLayerTab').eq(i).attr('originalnumber'));
			}
		}
		// set target's originalnumber
		target.attr('originalnumber', idx+1);
		$('[originalnumber ='+idx+']').after(target);
		// children's parentlayer set
		$('#userLayerSpace'+target.attr('id').substr(12)).children().attr('parentlayer', idx+1);

		// change the compVisibility[][]
		for(var i=idx+1; i<=oriNum; i++){
			compVisibility[i] = new Array();
			for(var j=0;j<$('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)+'> img').length;j++)
				compVisibility[i][j] = $('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)+'> img').eq(j).attr('id');
		}

	}

	///////////// 여기서부터는 중복이라 사료됨.
	// set a layerArr array
	for(var i = 0; i<$('.userLayerTab').length; i++)
		layerArr[i] = $('.userLayerTab').eq(i).attr('id');

	// set a compListRight[]
	for(var i = 0; i<compListRight.length; i++)
		compListRight[i] = $('.userLayerSpace > img').eq(i);

	// change currentLayer
	curretnLayer = target.attr('originalnumber');
	changeLayer(target);
	// restructure the right list
	changeCompListRight();
	layerChangeFlag = 1;
	deleteFlag = 0;

}
*/



/*
//get a tab's left offset
function getTabLeftOffset(target){
	if($('.userLayerTab').length == 1)
		return;
	var tabLeft = new Array();

	for(var i=0;i<$('.userLayerTab').length;i++)
		tabLeft[i] =  $('.userLayerTab').eq(i).offset().left;

	// target offset masking
	tabLeft[target.attr('originalnumber')] = -1;
	return tabLeft;
}

//get a nearest tab
function findNearestTabL(target, leftArr){
	var minDistance = 10000, distance;
	var targetRight = target.offset().left + target.width();
	var retCompIdx = -1;
	var minSize = target.width();
	for(var i=0; i<rightArr.length; i++){
		distance = Math.abs(leftArr[i]-targetRight);
		if(minDistance >= distance){
			minDistance = distance;
			if(retCompIdx != -1)
				$('.nearestTabL').removeClass("nearestTabL");
			retCompIdx = i;
			$('[originalnumber='+retCompIdx+']').addClass("nearestTabL");
		}
	}

	if(minDistance > minSize/2){
		$('.nearestTabL').removeClass("nearestTabL");
		return -1;
	}

	// need a test Exception vertical side
	if(Math.abs($('.userLayerTab').eq(0).offset().top-target.offset().top) > 50){
		$('.nearestTabL').removeClass("nearestTabL");
		return -1;
	}

	return retCompIdx;
}

//shift tabs except target
function shiftTabLFunc(target, idx){
	var size = target.width();
	// set target's offset
	target.offset({left: $('[originalnumber='+idx+']').offset().left});
	var oriNum = target.attr('originalnumber');
	// set rest tabs
	for(var i=idx+1; i<target.attr('originalnumber'); i++){
		if($('.userLayerTab').eq(i).attr('id') != target.attr('id')){
			$('.userLayerTab').eq(i).attr('originalnumber', parseInt($('.userLayerTab').eq(i).attr('originalnumber'))+1);
			$('.userLayerTab').eq(i).offset({left: $('.userLayerTab').eq(i).offset().left+size});
			// children's parentlayer set
			$('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)).children().attr('parentlayer', $('.userLayerTab').eq(i).attr('originalnumber'));
		}
	}
	// set target's originalnumber
	target.attr('originalnumber', idx+1);
	$('[originalnumber ='+idx+']').after(target);
	// children's parentlayer set
	$('#userLayerSpace'+target.attr('id').substr(12)).children().attr('parentlayer', idx+1);

	// change the compVisibility[][]
	for(var i=idx+1; i<=oriNum; i++){
		compVisibility[i] = new Array();
		for(var j=0;j<$('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)+'> img').length;j++)
			compVisibility[i][j] = $('#userLayerSpace'+$('.userLayerTab').eq(i).attr('id').substr(12)+'> img').eq(j).attr('id');
	}

	// set a layerArr array
	for(var i = 0; i<$('.userLayerTab').length; i++)
		layerArr[i] = $('.userLayerTab').eq(i).attr('id');

	// set a compListRight[]
	for(var i = 0; i<compListRight.length; i++)
		compListRight[i] = $('.userLayerSpace > img').eq(i);

	// change currentLayer
	curretnLayer = target.attr('originalnumber');
	changeLayer(target);
	changeCompListRight();
	layerChangeFlag = 1;
	deleteFlag = 0;

}
 */

/*
4. drop 시 ui.original 위치 고정, 이에 따른 수정 작업, 각각 오른쪽으로 하나씩 +1 같은 느낌으로
`1) 우측 tab들의 orinalNumber변경
`2) 각 tab들의 위치 변경
`3) layerArr의 id 위치도 swap(layerArr는 현재 layer tab들의 id를 모아 놓은 배열)
----------Tab 아이디 기준으로 변경이라 안바꿔줘도 될듯 4) LayerSpace의 id 변경 : LayerSpace + originalNumber
'5) component들의 parentLayer 변경 - 이건 drop 했을 때 가능할듯 싶은데, 소속 레이어 child 녀석들을 일괄적으로 바꿔주거나 하면 될 것 같다. 다시 생각할 필요
`6) compVisibility[][] 값 변경
`7) compListRight[] 값 변경
5. currentLayer를 이동한 layer 의 originalNumber로 변경, pink는 안 해도 되겠다.
추가
6. 세로 Exception도 필요할 듯
7. 맨 앞으로 보내는 것도.
`8. currentLayer 새로 잡아줘야 한다. 아마 보여주는 것도 새로..*/