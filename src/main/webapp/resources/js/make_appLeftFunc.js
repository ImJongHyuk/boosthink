//Variable for making component id
var compArr = new Array();

//Variable for component visibility
var compVisibility = new Array();

//Component Merge Function
function mergeComponent(newComp, baseComp){
	var mergeGroupCnt = baseComp.attr('groupCnt');
	makeCompGroup(newComp, baseComp, mergeGroupCnt);
}

//Create Component Group Division
function makeCompGroup(newComp, baseComp, mCnt){
	// case of group existing
	if($('#group'+mCnt).length >0){
		for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
			$("[groupCnt="+mCnt+"]").eq(i).offset({
				top:$("[groupCnt="+mCnt+"]").eq(i).offset().top+$('#group'+mCnt).position().top, 
				left:$("[groupCnt="+mCnt+"]").eq(i).offset().left+$('#group'+mCnt).position().left});
		}

		$('#group'+mCnt).children().insertAfter('#group'+mCnt);
		$('#group'+mCnt).remove();
	}
	newComp.attr('groupCnt', mCnt);

	var minLeft = undefined, minTop = undefined, minRight = undefined, minBottom = undefined;
	for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
		if(minLeft > $("[groupCnt="+mCnt+"]").eq(i).offset().left || minLeft == undefined)
			minLeft = $("[groupCnt="+mCnt+"]").eq(i).offset().left;
		if(minTop > $("[groupCnt="+mCnt+"]").eq(i).offset().top || minTop == undefined)
			minTop = $("[groupCnt="+mCnt+"]").eq(i).offset().top;
		if(minRight < $("[groupCnt="+mCnt+"]").eq(i).offset().left+$("[groupCnt="+mCnt+"]").eq(i).width() || minRight == undefined)
			minRight = $("[groupCnt="+mCnt+"]").eq(i).offset().left+$("[groupCnt="+mCnt+"]").eq(i).width();
		if(minBottom < $("[groupCnt="+mCnt+"]").eq(i).offset().top+$("[groupCnt="+mCnt+"]").eq(i).height() || minBottom == undefined)
			minBottom = $("[groupCnt="+mCnt+"]").eq(i).offset().top+$("[groupCnt="+mCnt+"]").eq(i).height();
	}
	$("[groupCnt="+mCnt+"]").wrapAll('<div id=group'+mCnt+' class="compGroup"></div>');
	$('#group'+mCnt).css('width',minRight-minLeft).css('height',minBottom-minTop).css('position','absolute');

	$('#group'+mCnt).offset({top:minTop, left:minLeft});

	for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
		$("[groupCnt="+mCnt+"]").eq(i).offset({
			top:$("[groupCnt="+mCnt+"]").eq(i).offset().top-$('#group'+mCnt).position().top, 
			left:$("[groupCnt="+mCnt+"]").eq(i).offset().left-$('#group'+mCnt).position().left});
	}

	groupOnDraggable();
	$("[groupCnt="+mCnt+"]").draggable('disable');
	$(".compGroup").css('background-color',$('#logicLeft').css('background-color'));
}

//Dynamic Draggable to compGroup
function groupOnDraggable(){
	$('.compGroup').draggable({
		stack: '.compGroup',
		helper: 'original',
		containment: '#logicLeft',
		revert: 'invalid',
		drag: function(ev, ui){
		},
		stop: function(ev,ui){
		}
	});
}

function dropElseComp(target){
	var mCnt = target.attr('groupCnt');

	// redefining of compGroup
	var minLeft = undefined, minTop = undefined, minRight = undefined, minBottom = undefined;

	// target doesn't belong to group
	if((target.attr('botcomp') == undefined || target.attr('botcomp') == 0) &&
			(target.attr('topcomp') == undefined || target.attr('topcomp') == 0))
		return;

	// target group has only 2 component
	if($('#group'+mCnt +'> .newLogicComp').length ==2){
		$("[groupCnt="+mCnt+"]").eq(0).offset({
			top:$("[groupCnt="+mCnt+"]").eq(0).offset().top+$('#group'+mCnt).position().top, 
			left:$("[groupCnt="+mCnt+"]").eq(0).offset().left+$('#group'+mCnt).position().left});

		$("[groupCnt="+mCnt+"]").eq(1).offset({
			top:$("[groupCnt="+mCnt+"]").eq(1).offset().top+$('#group'+mCnt).position().top, 
			left:$("[groupCnt="+mCnt+"]").eq(1).offset().left+$('#group'+mCnt).position().left});

		$('#group'+mCnt).children().insertAfter('#group'+mCnt);
		$('#group'+mCnt).remove();
		if(target.attr('botcomp') == undefined || target.attr('botcomp') == 0){
			$('#'+target.attr('topcomp')).attr('botcomp', 0);
			target.attr('topcomp',0);
		}
		else if(target.attr('topcomp') == undefined || target.attr('topcomp') == 0){
			if(target.attr('botcomp').search('merge') != -1){
				if(target.attr('id') == $('#'+target.attr('botcomp')).attr('leftpar'))
					$('#'+target.attr('botcomp')).attr('leftpar', 0);
				else
					$('#'+target.attr('botcomp')).attr('rightpar', 0);
			}
			else
				$('#'+target.attr('botcomp')).attr('topcomp', 0);
			target.attr('botcomp',0);
		}
		$("[groupCnt="+mCnt+"]").draggable('enable');
		$("[groupCnt="+mCnt+"]").eq(0).attr('groupCnt', groupCnt++);
		$("[groupCnt="+mCnt+"]").eq(1).attr('groupCnt', groupCnt++);
		return;
	}

	// case of target has not bottom component
	if(target.attr('botcomp') == undefined || target.attr('botcomp') == 0){
		target.draggable('enable');
		target.insertAfter(target.parent());
		$('#'+target.attr('topcomp')).attr('botcomp', 0);
		target.attr('topcomp',0);
		// give a new groupCnt
		target.attr('groupCnt', groupCnt++);
	}
	// case of target has not top component
	else if(target.attr('topcomp') == undefined || target.attr('topcomp') == 0){
		// case of bottom component is merge component
		target.draggable('enable');
		target.insertAfter(target.parent());
		if(target.attr('botcomp').search('merge') != -1){
			if(target.attr('id') == $('#'+target.attr('botcomp')).attr('leftpar'))
				$('#'+target.attr('botcomp')).attr('leftpar', 0);
			else
				$('#'+target.attr('botcomp')).attr('rightpar', 0);			
		}
		else
			$('#'+target.attr('botcomp')).attr('topcomp', 0);
		target.attr('botcomp',0);
		// give a new groupCnt
		target.attr('groupCnt', groupCnt++);
	}
	// case of target has top & bottom component
	if(target.attr('topComp') != undefined && target.attr('topComp') != 0 && target.attr('botComp') != undefined && target.attr('botComp') != 0){
		compTraversal($('#'+target.attr('topcomp')),mCnt);

		// SET THE TOP OF TARGET
		for(var i=0;i<$("[groupCnt="+groupCnt+"]").length;i++){
			$("[groupCnt="+groupCnt+"]").eq(i).offset({
				top:$("[groupCnt="+groupCnt+"]").eq(i).offset().top+$('#group'+mCnt).position().top, 
				left:$("[groupCnt="+groupCnt+"]").eq(i).offset().left+$('#group'+mCnt).position().left});
		}
		$("[groupCnt="+groupCnt+"]").insertAfter($('#group'+mCnt));

		if($("[groupCnt="+groupCnt+"]").length == 1){
			// recovery of draggable attribute
			$("[groupCnt="+groupCnt+"]").draggable('enable');
		}
		else{
			for(var i=0;i<$("[groupCnt="+groupCnt+"]").length;i++){
				if(minLeft > $("[groupCnt="+groupCnt+"]").eq(i).offset().left || minLeft == undefined)
					minLeft = $("[groupCnt="+groupCnt+"]").eq(i).offset().left;
				if(minTop > $("[groupCnt="+groupCnt+"]").eq(i).offset().top || minTop == undefined)
					minTop = $("[groupCnt="+groupCnt+"]").eq(i).offset().top;
				if(minRight < $("[groupCnt="+groupCnt+"]").eq(i).offset().left+$("[groupCnt="+groupCnt+"]").eq(i).width() || minRight == undefined)
					minRight = $("[groupCnt="+groupCnt+"]").eq(i).offset().left+$("[groupCnt="+groupCnt+"]").eq(i).width();
				if(minBottom < $("[groupCnt="+groupCnt+"]").eq(i).offset().top+$("[groupCnt="+groupCnt+"]").eq(i).height() || minBottom == undefined)
					minBottom = $("[groupCnt="+groupCnt+"]").eq(i).offset().top+$("[groupCnt="+groupCnt+"]").eq(i).height();
			}
			$("[groupCnt="+groupCnt+"]").wrapAll('<div id=group'+groupCnt+' class="compGroup"></div>');
			$('#group'+groupCnt).css('width',minRight-minLeft).css('height',minBottom-minTop).css('position','absolute');
			$('#group'+groupCnt).offset({top:minTop, left:minLeft});

			for(var i=0;i<$("[groupCnt="+groupCnt+"]").length;i++){
				$("[groupCnt="+groupCnt+"]").eq(i).offset({
					top:$("[groupCnt="+groupCnt+"]").eq(i).offset().top-$('#group'+groupCnt).position().top, 
					left:$("[groupCnt="+groupCnt+"]").eq(i).offset().left-$('#group'+groupCnt).position().left});
			}
		}

		groupCnt++;

		minLeft = undefined; minRight = undefined; minTop = undefined; minBottom = undefined;

		// SET THE TARGET
		target.draggable('enable');
		target.insertAfter(target.parent());
		// set the top component attribute
		$('#'+target.attr('topcomp')).attr('botcomp',0);
		target.attr('topcomp',0);
		// set the bottom component attribute
		if(target.attr('botcomp').search('merge') != -1){
			if(target.attr('id') == $('#'+target.attr('botcomp')).attr('leftpar'))
				$('#'+target.attr('botcomp')).attr('leftpar', 0);
			else
				$('#'+target.attr('botcomp')).attr('rightpar', 0);			
		}
		else
			$('#'+target.attr('botcomp')).attr('topcomp', 0);
		target.attr('botcomp',0);
		// set the target group count
		target.attr('groupCnt',groupCnt);
		groupCnt++;

		// SET THE BOTTOM OF TARGET
		if($('#group'+mCnt).length >0){
			for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
				$("[groupCnt="+mCnt+"]").eq(i).offset({
					top:$("[groupCnt="+mCnt+"]").eq(i).offset().top+$('#group'+mCnt).position().top, 
					left:$("[groupCnt="+mCnt+"]").eq(i).offset().left+$('#group'+mCnt).position().left});
			}
			$('#group'+mCnt).children().insertAfter('#group'+mCnt);
			$('#group'+mCnt).remove();
		}
		console.log(mCnt);
		console.log($('#group'+mCnt).length);
		if($("[groupCnt="+mCnt+"]").length == 1){
			// recovery of draggable attribute
			$("[groupCnt="+mCnt+"]").draggable('enable');
		}
		else{
			for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
				if(minLeft > $("[groupCnt="+mCnt+"]").eq(i).offset().left || minLeft == undefined)
					minLeft = $("[groupCnt="+mCnt+"]").eq(i).offset().left;
				if(minTop > $("[groupCnt="+mCnt+"]").eq(i).offset().top || minTop == undefined)
					minTop = $("[groupCnt="+mCnt+"]").eq(i).offset().top;
				if(minRight < $("[groupCnt="+mCnt+"]").eq(i).offset().left+$("[groupCnt="+mCnt+"]").eq(i).width() || minRight == undefined)
					minRight = $("[groupCnt="+mCnt+"]").eq(i).offset().left+$("[groupCnt="+mCnt+"]").eq(i).width();
				if(minBottom < $("[groupCnt="+mCnt+"]").eq(i).offset().top+$("[groupCnt="+mCnt+"]").eq(i).height() || minBottom == undefined)
					minBottom = $("[groupCnt="+mCnt+"]").eq(i).offset().top+$("[groupCnt="+mCnt+"]").eq(i).height();
			}
			$("[groupCnt="+mCnt+"]").wrapAll('<div id=group'+mCnt+' class="compGroup"></div>');
			$('#group'+mCnt).css('width',minRight-minLeft).css('height',minBottom-minTop).css('position','absolute');
			$('#group'+mCnt).offset({top:minTop, left:minLeft});

			for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
				$("[groupCnt="+mCnt+"]").eq(i).offset({
					top:$("[groupCnt="+mCnt+"]").eq(i).offset().top-$('#group'+mCnt).position().top, 
					left:$("[groupCnt="+mCnt+"]").eq(i).offset().left-$('#group'+mCnt).position().left});
			}
		}

		groupOnDraggable();
		return;
	}

	if($('#group'+mCnt).length >0){
		for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
			$("[groupCnt="+mCnt+"]").eq(i).offset({
				top:$("[groupCnt="+mCnt+"]").eq(i).offset().top+$('#group'+mCnt).position().top, 
				left:$("[groupCnt="+mCnt+"]").eq(i).offset().left+$('#group'+mCnt).position().left});
		}

		$('#group'+mCnt).children().insertAfter('#group'+mCnt);
		$('#group'+mCnt).remove();
	}

	// redefining of compGroup
	var minLeft = undefined, minTop = undefined, minRight = undefined, minBottom = undefined;

	for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
		if(minLeft > $("[groupCnt="+mCnt+"]").eq(i).offset().left || minLeft == undefined)
			minLeft = $("[groupCnt="+mCnt+"]").eq(i).offset().left;
		if(minTop > $("[groupCnt="+mCnt+"]").eq(i).offset().top || minTop == undefined)
			minTop = $("[groupCnt="+mCnt+"]").eq(i).offset().top;
		if(minRight < $("[groupCnt="+mCnt+"]").eq(i).offset().left+$("[groupCnt="+mCnt+"]").eq(i).width() || minRight == undefined)
			minRight = $("[groupCnt="+mCnt+"]").eq(i).offset().left+$("[groupCnt="+mCnt+"]").eq(i).width();
		if(minBottom < $("[groupCnt="+mCnt+"]").eq(i).offset().top+$("[groupCnt="+mCnt+"]").eq(i).height() || minBottom == undefined)
			minBottom = $("[groupCnt="+mCnt+"]").eq(i).offset().top+$("[groupCnt="+mCnt+"]").eq(i).height();
	}
	$("[groupCnt="+mCnt+"]").wrapAll('<div id=group'+mCnt+' class="compGroup"></div>');
	$('#group'+mCnt).css('width',minRight-minLeft).css('height',minBottom-minTop).css('position','absolute');
	$('#group'+mCnt).offset({top:minTop, left:minLeft});

	for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
		$("[groupCnt="+mCnt+"]").eq(i).offset({
			top:$("[groupCnt="+mCnt+"]").eq(i).offset().top-$('#group'+mCnt).position().top, 
			left:$("[groupCnt="+mCnt+"]").eq(i).offset().left-$('#group'+mCnt).position().left});
	}
	groupOnDraggable();
}

function dropMergeComp(target){
	var mCnt = target.attr('groupCnt');
	var minLeft = undefined, minTop = undefined, minRight = undefined, minBottom = undefined;

	// target doesn't belong to group
	if((target.attr('botcomp') == undefined || target.attr('botcomp') == 0) &&
			(target.attr('leftpar') == undefined || target.attr('leftpar') == 0) &&
			(target.attr('rightpar') == undefined || target.attr('rightpar') == 0))
		return;

	// target group has only 2 component
	if($('#group'+mCnt +'> .newLogicComp').length ==2){
		$("[groupCnt="+mCnt+"]").eq(0).offset({
			top:$("[groupCnt="+mCnt+"]").eq(0).offset().top+$('#group'+mCnt).position().top, 
			left:$("[groupCnt="+mCnt+"]").eq(0).offset().left+$('#group'+mCnt).position().left});

		$("[groupCnt="+mCnt+"]").eq(1).offset({
			top:$("[groupCnt="+mCnt+"]").eq(1).offset().top+$('#group'+mCnt).position().top, 
			left:$("[groupCnt="+mCnt+"]").eq(1).offset().left+$('#group'+mCnt).position().left});

		$('#group'+mCnt).children().insertAfter('#group'+mCnt);
		$('#group'+mCnt).remove();

		if(target.attr('botcomp') != undefined && target.attr('botcomp') != 0){
			if(target.attr('botcomp').search('merge') != -1){
				if(target.attr('id') == $('#'+target.attr('botcomp')).attr('leftpar'))
					$('#'+target.attr('botcomp')).attr('leftpar', 0);
				else
					$('#'+target.attr('botcomp')).attr('rightpar', 0);
			}
			else
				$('#'+target.attr('botcomp')).attr('topcomp', 0);
			target.attr('botcomp',0);
		}
		else if(target.attr('leftpar') != undefined && target.attr('leftpar') != 0){
			$('#'+target.attr('leftpar')).attr('botcomp', 0);
			target.attr('leftpar',0);
		}
		else{
			$('#'+target.attr('rightpar')).attr('botcomp', 0);
			target.attr('rightpar',0);
		}
		$("[groupCnt="+mCnt+"]").draggable('enable');
		$("[groupCnt="+mCnt+"]").eq(0).attr('groupCnt', groupCnt++);
		$("[groupCnt="+mCnt+"]").eq(1).attr('groupCnt', groupCnt++);
		return;
	}

	// separate left parents
	compTraversal($('#'+target.attr('leftpar')),mCnt);

	// SET THE LEFT PARENTS OF TARGET
	for(var i=0;i<$("[groupCnt="+groupCnt+"]").length;i++){
		$("[groupCnt="+groupCnt+"]").eq(i).offset({
			top:$("[groupCnt="+groupCnt+"]").eq(i).offset().top+$('#group'+mCnt).position().top, 
			left:$("[groupCnt="+groupCnt+"]").eq(i).offset().left+$('#group'+mCnt).position().left});
	}
	$("[groupCnt="+groupCnt+"]").insertAfter($('#group'+mCnt));

	if($("[groupCnt="+groupCnt+"]").length == 1){
		// recovery of draggable attribute
		$("[groupCnt="+groupCnt+"]").draggable('enable');
	}
	else{
		for(var i=0;i<$("[groupCnt="+groupCnt+"]").length;i++){
			if(minLeft > $("[groupCnt="+groupCnt+"]").eq(i).offset().left || minLeft == undefined)
				minLeft = $("[groupCnt="+groupCnt+"]").eq(i).offset().left;
			if(minTop > $("[groupCnt="+groupCnt+"]").eq(i).offset().top || minTop == undefined)
				minTop = $("[groupCnt="+groupCnt+"]").eq(i).offset().top;
			if(minRight < $("[groupCnt="+groupCnt+"]").eq(i).offset().left+$("[groupCnt="+groupCnt+"]").eq(i).width() || minRight == undefined)
				minRight = $("[groupCnt="+groupCnt+"]").eq(i).offset().left+$("[groupCnt="+groupCnt+"]").eq(i).width();
			if(minBottom < $("[groupCnt="+groupCnt+"]").eq(i).offset().top+$("[groupCnt="+groupCnt+"]").eq(i).height() || minBottom == undefined)
				minBottom = $("[groupCnt="+groupCnt+"]").eq(i).offset().top+$("[groupCnt="+groupCnt+"]").eq(i).height();
		}
		$("[groupCnt="+groupCnt+"]").wrapAll('<div id=group'+groupCnt+' class="compGroup"></div>');
		$('#group'+groupCnt).css('width',minRight-minLeft).css('height',minBottom-minTop).css('position','absolute');
		$('#group'+groupCnt).offset({top:minTop, left:minLeft});

		for(var i=0;i<$("[groupCnt="+groupCnt+"]").length;i++){
			$("[groupCnt="+groupCnt+"]").eq(i).offset({
				top:$("[groupCnt="+groupCnt+"]").eq(i).offset().top-$('#group'+groupCnt).position().top, 
				left:$("[groupCnt="+groupCnt+"]").eq(i).offset().left-$('#group'+groupCnt).position().left});
		}
	}
	groupCnt++;
	minLeft = undefined; minRight = undefined; minTop = undefined; minBottom = undefined;

	// separate right parents
	compTraversal($('#'+target.attr('rightpar')),mCnt);

	// SET THE RIGHT PARENTS OF TARGET
	for(var i=0;i<$("[groupCnt="+groupCnt+"]").length;i++){
		$("[groupCnt="+groupCnt+"]").eq(i).offset({
			top:$("[groupCnt="+groupCnt+"]").eq(i).offset().top+$('#group'+mCnt).position().top, 
			left:$("[groupCnt="+groupCnt+"]").eq(i).offset().left+$('#group'+mCnt).position().left});
	}
	$("[groupCnt="+groupCnt+"]").insertAfter($('#group'+mCnt));

	if($("[groupCnt="+groupCnt+"]").length == 1){
		// recovery of draggable attribute
		$("[groupCnt="+groupCnt+"]").draggable('enable');
	}
	else{
		for(var i=0;i<$("[groupCnt="+groupCnt+"]").length;i++){
			if(minLeft > $("[groupCnt="+groupCnt+"]").eq(i).offset().left || minLeft == undefined)
				minLeft = $("[groupCnt="+groupCnt+"]").eq(i).offset().left;
			if(minTop > $("[groupCnt="+groupCnt+"]").eq(i).offset().top || minTop == undefined)
				minTop = $("[groupCnt="+groupCnt+"]").eq(i).offset().top;
			if(minRight < $("[groupCnt="+groupCnt+"]").eq(i).offset().left+$("[groupCnt="+groupCnt+"]").eq(i).width() || minRight == undefined)
				minRight = $("[groupCnt="+groupCnt+"]").eq(i).offset().left+$("[groupCnt="+groupCnt+"]").eq(i).width();
			if(minBottom < $("[groupCnt="+groupCnt+"]").eq(i).offset().top+$("[groupCnt="+groupCnt+"]").eq(i).height() || minBottom == undefined)
				minBottom = $("[groupCnt="+groupCnt+"]").eq(i).offset().top+$("[groupCnt="+groupCnt+"]").eq(i).height();
		}
		$("[groupCnt="+groupCnt+"]").wrapAll('<div id=group'+groupCnt+' class="compGroup"></div>');
		$('#group'+groupCnt).css('width',minRight-minLeft).css('height',minBottom-minTop).css('position','absolute');
		$('#group'+groupCnt).offset({top:minTop, left:minLeft});

		for(var i=0;i<$("[groupCnt="+groupCnt+"]").length;i++){
			$("[groupCnt="+groupCnt+"]").eq(i).offset({
				top:$("[groupCnt="+groupCnt+"]").eq(i).offset().top-$('#group'+groupCnt).position().top, 
				left:$("[groupCnt="+groupCnt+"]").eq(i).offset().left-$('#group'+groupCnt).position().left});
		}
	}
	groupCnt++;

	// SET THE TARGET
	target.draggable('enable');
	target.insertAfter(target.parent());

	// set the top component attribute
	$('#'+target.attr('leftpar')).attr('botcomp',0);
	$('#'+target.attr('rightpar')).attr('botcomp',0);
	target.attr('leftpar',0);
	target.attr('rightpar',0);
	// set the bottom component attribute
	if(target.attr('botcomp').search('merge') != -1){
		if(target.attr('id') == $('#'+target.attr('botcomp')).attr('leftpar'))
			$('#'+target.attr('botcomp')).attr('leftpar', 0);
		else
			$('#'+target.attr('botcomp')).attr('rightpar', 0);			
	}
	else
		$('#'+target.attr('botcomp')).attr('topcomp', 0);
	target.attr('botcomp',0);
	// set the target group count
	target.attr('groupCnt',groupCnt);
	groupCnt++;
/////////////////////////////////////////////////////////////////////////////////////////////////////////
	if($('#group'+mCnt).length >0){
		for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
			$("[groupCnt="+mCnt+"]").eq(i).offset({
				top:$("[groupCnt="+mCnt+"]").eq(i).offset().top+$('#group'+mCnt).position().top, 
				left:$("[groupCnt="+mCnt+"]").eq(i).offset().left+$('#group'+mCnt).position().left});
		}

		$('#group'+mCnt).children().insertAfter('#group'+mCnt);
		if($("[groupCnt="+mCnt+"]").length == 1){
			$("[groupCnt="+mCnt+"]").draggable('enable');
			$('#group'+mCnt).remove();
			groupOnDraggable();
			return;
		}
		$('#group'+mCnt).remove();
	}

	// redefining of compGroup
	var minLeft = undefined, minTop = undefined, minRight = undefined, minBottom = undefined;

	for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
		if(minLeft > $("[groupCnt="+mCnt+"]").eq(i).offset().left || minLeft == undefined)
			minLeft = $("[groupCnt="+mCnt+"]").eq(i).offset().left;
		if(minTop > $("[groupCnt="+mCnt+"]").eq(i).offset().top || minTop == undefined)
			minTop = $("[groupCnt="+mCnt+"]").eq(i).offset().top;
		if(minRight < $("[groupCnt="+mCnt+"]").eq(i).offset().left+$("[groupCnt="+mCnt+"]").eq(i).width() || minRight == undefined)
			minRight = $("[groupCnt="+mCnt+"]").eq(i).offset().left+$("[groupCnt="+mCnt+"]").eq(i).width();
		if(minBottom < $("[groupCnt="+mCnt+"]").eq(i).offset().top+$("[groupCnt="+mCnt+"]").eq(i).height() || minBottom == undefined)
			minBottom = $("[groupCnt="+mCnt+"]").eq(i).offset().top+$("[groupCnt="+mCnt+"]").eq(i).height();
	}
	$("[groupCnt="+mCnt+"]").wrapAll('<div id=group'+mCnt+' class="compGroup"></div>');
	$('#group'+mCnt).css('width',minRight-minLeft).css('height',minBottom-minTop).css('position','absolute');
	$('#group'+mCnt).offset({top:minTop, left:minLeft});

	for(var i=0;i<$("[groupCnt="+mCnt+"]").length;i++){
		$("[groupCnt="+mCnt+"]").eq(i).offset({
			top:$("[groupCnt="+mCnt+"]").eq(i).offset().top-$('#group'+mCnt).position().top, 
			left:$("[groupCnt="+mCnt+"]").eq(i).offset().left-$('#group'+mCnt).position().left});
	}
	groupOnDraggable();

	// undefined의 경우 사용할 때 예외처리 안해도 되는거?
}

function compTraversal(node, mCnt){
	if(node.attr('id') == undefined || node.attr('id') == 0)
		return;

	// set the new groupCnt
	if(node.attr('groupCnt') == mCnt)
		node.attr('groupCnt',groupCnt);

	// case of node is not merge component
	if(node.attr('id').search('merge') == -1){
		compTraversal($('#'+node.attr('topComp')), mCnt);
	}
	// case of node is merge component
	else{
		compTraversal($('#'+node.attr('leftPar')), mCnt);
		compTraversal($('#'+node.attr('rightPar')), mCnt);
	}
}