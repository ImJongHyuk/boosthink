function loadLogicLayer(){
	$('#div_logic_edit').append("<div id='logicTop'>boosthink</div>");
	$('#div_logic_edit').append("<div id='logicLLeft'></div>");
	$('#div_logic_edit').append("<div id='logicLeft'></div>");
	$('#div_logic_edit').append("<div id='logicRight'></div>");
	
	//exit button
	var img_exit = document.createElement("img");
	img_exit.onclick = function()	//닫을때 이벤트 처리
	{
		if(div_layout_list !=null)	//만약 div_layout_list가 열려있다면 닫고 닫는다.
		{
			remove_div_layout_list();
		}
		
		remove_div_logic();
	};
	img_exit.src = "https://lh6.googleusercontent.com/-1w3ez285coE/VCl20HWodKI/AAAAAAAAADs/NY-ossJKAcE/h120/xbox.png"; 
	var id_exit = document.createAttribute("id");
	id_exit.value = "img_exit";
	img_exit.setAttributeNode(id_exit);
	div_logic_edit.appendChild(img_exit);
	
	$('#logicLLeft').append("<img src='/plto/resources/img/logicCook.png' class='logicComp cook' id='cook'" +
		" orichk='1' arridx='0' plang='cook' topComp=0 botComp=0 leftPar=0 rightPar=0>");
	
	$('#logicLLeft').append("<img src='/plto/resources/img/logicCal.png' class='logicComp processor' id='processor'" +
	" orichk='1' arridx='1' plang='processor' topComp=0 botComp=0 leftPar=0 rightPar=0>");
	
	$('#logicLLeft').append("<img src='/plto/resources/img/logicMerge.png' class='logicComp merge' id='merge'" +
	" orichk='1' arridx='2' plang='merge' topComp=0 botComp=0 leftPar=0 rightPar=0>");
	
	$('#logicLLeft').append("<img src='/plto/resources/img/logicSweeper.png' class='logicComp sweeper' id='sweeper'" +
	" orichk='1' arridx='3' plang='sweeper' topComp=0 botComp=0 leftPar=0 rightPar=0>");
	onDraggable();
	onDroppable();
	groupOnDraggable();	
	/*var loadcpnt = new loadCpnt();
	loadcpnt.LoadLogicCpntByCategory("#logicCpntContainer",1);
	if(typeof $("#"+div_evt.target).attr($("#div_logic_edit").attr("target_evt")+"_logic") !="undefined")
	{
		document.getElementById( "logicLeft" ).innerHTML = $("#"+div_evt.target).attr($("#div_logic_edit").attr("target_evt")+"_logic"); //저장된 로직 정보를 가져옴
	}

	$("#logicComponentListSelect").change(function(){
		loadcpnt.LoadLogicCpntByCategory("#logicCpntContainer",$("#logicComponentListSelect").val());
	});*/
	reLoadDraggable();
	onDroppable();
	groupOnDraggable();

	// 재로드 시, compGroup으로 로드될 경우 내부 logicComp들의 draggable을 disable 해줌
	if($(".compGroup").length != 0)
		$(".compGroup > .logicComp").draggable("disable");

	// 재로드 시, logicCompArr 와 id가 같아도 같은 객체로 인식되지 않아서 refresh 해주어야 함
	for(var i=0; i<$(".newLogicComp").length; i++){
		for(var j=0; j<logicCompArr.length; j++){
			if(logicCompArr[j].attr('id') == $(".newLogicComp").eq(i).attr('id')){
				logicCompArr[j].remove();	// resource 유출의 우려로 기존의 객체는 제거함
				logicCompArr[j] = $(".newLogicComp").eq(i);
			}
		}
	}
}

//logicComp 클래스를 가진 element을 draggable하게 만들어주는 function
function onDraggable(){
	$('.logicComp').draggable({
		stack: '.logicComp',
		helper: 'clone',
		containment: 'body',
		revert: 'invalid',
		start: function(ev, ui){
			$(ui.helper).attr('id','temp');
		},
		drag: function(ev, ui){
			retComp = findNearestLogic(ui.helper);
		},
		stop: function(ev,ui){
		}
	});
}

//reLoad 시 newLogicComp (containment: 'body') 에게 draggable 속성 부여
function reLoadDraggable(){
	$('.newLogicComp').draggable({
		stack: '.newLogicComp',
		helper: 'original',
		containment: 'body',
		revert: 'invalid',
		start: function(ev, ui){
		},
		drag: function(ev, ui){
			retComp = findNearestLogic($(this));
		},
		stop: function(ev,ui){
		}
	});
}

var logicArr = new Array();
var logicCompArr = new Array();
var btChk = 0; // bottom to top = 0, top to bottom = 1
var groupCnt = 0;
function onDroppable(){
	$('#logicLeft').droppable({
		accept: '.logicComp, .compGroup',
		drop: function (ev, ui) {
			var thisComp = $(ui.draggable);
			if(retComp != undefined)
				mergeChk = chkDropException(retComp, thisComp);
			// 'oriChk' == 1 means original, 0 means clone
			if($(ui.draggable).attr('oriChk') == 1){
				var element = $(ui.draggable).clone().attr('oriChk',0).attr('groupCnt',groupCnt);
				// Give the id each component
				if(logicArr[element.attr('arrIdx')] == undefined)
					logicArr[element.attr('arrIdx')] = 0;
				element.attr('id', element.attr('id')+logicArr[element.attr('arrIdx')]++);
				dynamicLogicDraggable(element);

				// Component appending & properties setting
				$('#logicLeft').append(element);
				element.css('visibility','visible').css('width',thisComp.css('width'))
				.addClass('newLogicComp').css('position','absolute');
				if(retComp == undefined){
					element.offset({top: ui.helper.offset().top, left: ui.helper.offset().left}).attr('groupCnt',groupCnt);
				}
				else if(btChk == 0){
					if(mergeChk == 1){
						element.offset({top: retComp.offset().top+retComp.height(), left: retComp.offset().left+retComp.width()/2});
						element.attr('leftPar',retComp.attr('id'));
						retComp.attr('botComp',element.attr('id'));
					}
					else if(mergeChk == 2){
						element.offset({top: retComp.offset().top+retComp.height(), left: retComp.offset().left-retComp.width()/2});
						element.attr('rightPar',retComp.attr('id'));
						retComp.attr('botComp',element.attr('id'));
					}
					else{
						element.offset({top: retComp.offset().top+retComp.height(), left: retComp.offset().left});
						element.attr('topComp',retComp.attr('id'));
						retComp.attr('botComp',element.attr('id'));
					}
					mergeComponent(element, retComp);
				}
				else{
					if(mergeChk == 3){
						element.offset({top: retComp.offset().top-thisComp.height(), left: retComp.offset().left-thisComp.width()/2});
						retComp.attr('leftPar',element.attr('id'));
						element.attr('botComp',retComp.attr('id'));
					}
					else if(mergeChk == 4){
						element.offset({top: retComp.offset().top-thisComp.height(), left: retComp.offset().left+retComp.width()-thisComp.width()/2});
						retComp.attr('rightPar',element.attr('id'));
						element.attr('botComp',retComp.attr('id'));
					}
					else{
						element.offset({top:retComp.offset().top-thisComp.height(), left: retComp.offset().left});
						element.attr('botComp',retComp.attr('id'));
						retComp.attr('topComp',element.attr('id'));
					}
					mergeComponent(element, retComp);
				}
				logicCompArr[logicCompArr.length] = element;	// Add change function when logic component deleting
				groupCnt++;
			}
			else{
				if(retComp == undefined)
					;//thisComp.attr('groupCnt',groupCnt++);
				else if(btChk == 0){
					if(mergeChk == 1){
						thisComp.offset({top: retComp.offset().top+retComp.height(), left: retComp.offset().left+retComp.width()/2});
						thisComp.attr('leftPar',retComp.attr('id'));
						retComp.attr('botComp',thisComp.attr('id'));
					}
					else if(mergeChk == 2){
						thisComp.offset({top: retComp.offset().top+retComp.height(), left: retComp.offset().left-retComp.width()/2});
						thisComp.attr('rightPar',retComp.attr('id'));
						retComp.attr('botComp',thisComp.attr('id'));
					}
					else{
						thisComp.offset({top: retComp.offset().top+retComp.height(), left: retComp.offset().left});
						thisComp.attr('topComp',retComp.attr('id'));
						retComp.attr('botComp',thisComp.attr('id'));
					}
					mergeComponent(thisComp, retComp);
				}
				else{
					if(mergeChk == 3){
						thisComp.offset({top: retComp.offset().top-thisComp.height(), left: retComp.offset().left-thisComp.width()/2});
						retComp.attr('leftPar',thisComp.attr('id'));
						thisComp.attr('botComp',retComp.attr('id'));
					}
					else if(mergeChk == 4){
						thisComp.offset({top: retComp.offset().top-thisComp.height(), left: retComp.offset().left+retComp.width()-thisComp.width()/2});
						retComp.attr('rightPar',thisComp.attr('id'));
						thisComp.attr('botComp',retComp.attr('id'));
					}
					else{
						thisComp.offset({top: retComp.offset().top-thisComp.height(), left: retComp.offset().left});
						retComp.attr('topComp',thisComp.attr('id'));
						thisComp.attr('botComp',retComp.attr('id'));
					}
					mergeComponent(thisComp, retComp);
				}
			}
			//canvasDraw();
		}
	});
}

function dynamicLogicDraggable(target){
	//When an existing object is dragged
	target.draggable({
		stack:'.logicComp',
		containment: 'body',
		revert: 'invalid',
		start: function (ev, ui) {
		},
		drag: function(ev, ui){
			retComp = findNearestLogic(target);
		},
		stop: function(ev, ui){
		}
	});
}

function findNearestLogic(target){
	if(logicCompArr.length == 0)
		return;
	var targetLeft = target.offset().left+target.width()/2;
	var targetTop = target.offset().top;
	var minDistance = 10000, distance;
	var retComp = undefined;
	var compWid, compHei;

	for(var i=0;i<logicCompArr.length;i++){
		if(logicCompArr[i].attr('id') != target.attr('id')){
			compWid = logicCompArr[i].offset().left + logicCompArr[i].width()/2;
			compHei = logicCompArr[i].offset().top + logicCompArr[i].height();
			distance = Math.sqrt(Math.pow(compWid-targetLeft, 2)
					+ Math.pow(compHei-targetTop, 2));
			if(minDistance >= distance){
				btChk = 0;
				minDistance = distance;
				if(retComp != undefined){
					$('.bNear').removeClass("bNear");
					$('.bTop').removeClass("bTop");
				}
				retComp = logicCompArr[i];
				retComp.addClass("bNear");
			}
		}
	}

	targetTop = target.offset().top+target.height();
	for(var i=0;i<logicCompArr.length;i++){
		if(logicCompArr[i].attr('id') != target.attr('id')){
			compWid = logicCompArr[i].offset().left + logicCompArr[i].width()/2;
			compHei = logicCompArr[i].offset().top;
			distance = Math.sqrt(Math.pow(compWid-targetLeft, 2)
					+ Math.pow(compHei-targetTop, 2));
			if(minDistance >= distance){
				btChk = 1;
				minDistance = distance;
				if(retComp != undefined){
					$('.bNear').removeClass("bNear");
					$('.bTop').removeClass("bTop");
				}
				retComp = logicCompArr[i];
				retComp.addClass("bTop");
			}
		}
	}

	if(minDistance > 50){
		$('.bNear').removeClass("bNear");
		$('.bTop').removeClass("bTop");
		return undefined;
	}

	return retComp;
}

function chkDropException(target, thisComp){
	$('.bNear').removeClass('bNear');
	$('.bTop').removeClass('bTop');
	// bottom to top
	if(btChk == 0){
		if(thisComp.attr('class').search('cook') != -1){
			alert("Cook은 붙을 수 없습니다.");
			retComp = undefined;
			return 0;
		}
		if(retComp.attr('class').search('sweeper') != -1){
			alert("Sweeper에 붙일 수 없습니다.");
			retComp = undefined;
			return 0;
		}
		if(retComp.attr('botComp') != 0){
			alert("이미 온 손님이 계시구만 가만히 있어야겠다.");
			retComp = undefined;
			return 0;
		}
		if(thisComp.attr('class').search('merge') != -1 && thisComp.attr('leftPar') != 0 && thisComp.attr('rightPar') != 0){
			alert("제기랄 양 쪽이 꽉 찼구만!");
			retComp = undefined;
			return 0;
		}
		if(thisComp.attr('class').search('merge') != -1 && thisComp.attr('leftPar') == 0){
			alert("내 왼쪽에 붙도록 해라!!");
			return 1;
		}
		if(thisComp.attr('class').search('merge') != -1 && thisComp.attr('leftPar') != 0){
			alert("내 오른쪽에 붙도록 해라!!");
			return 2;
		}

		if(retComp.attr('id').search('cook') != -1){
		}
		else if(retComp.attr('id').search('calcul') != -1){

		}
		else if(retComp.attr('id').search('merge') != -1){

		}
	}
	// top to bottom
	else{
		if(thisComp.attr('class').search('sweeper') != -1){
			alert("Sweeper는 위에 붙일 수 없습니다.");
			retComp = undefined;
			return 0;
		}
		if(retComp.attr('class').search('cook') != -1){
			alert("Cook은 아래에 붙을 수 없습니다.");
			retComp = undefined;
			return 0;
		}
		if(retComp.attr('class').search('merge') != -1){
			if(retComp.attr('leftPar') != 0 && retComp.attr('rightPar') != 0){
				alert("둘 다 꽉 차서 넣을 수가 없군! 제길!");
				retComp = undefined;
				return 0;
			}
			if(retComp.attr('leftPar') == 0){
				alert("왼쪽에 붙을거야!");
				return 3;
			}
			else{
				alert("오른쪽으로 간답!");
				return 4;
			}
		}

		if(retComp.attr('topComp') != 0){
			alert("이미 온 손님이 계시구만 가만히 있어야겠다.");
			retComp = undefined;
			return 0;
		}
	}
	return 0;
}/* return 0 은 undefined로 바꾸고 제 자리에 정지
 	return 1 은 merge2 시 좌측에 맞추기 bottom to top
 	return 2 는 merge2 시 우측에 맞추기 bottom to top
 	return 3 은 merge2 시 좌측에 끼워 넣기 top to bottom
 	return 4 는 merge2 시 우측에 끼워 넣기 top to bottom
 */ /* merge 분리나 merge에서 분리 시에 leftPar, rightPar 세팅 필요 */
var t;
function canvasDraw()
{
	var pro = 0;	//2d로 이미지를 그리겠다
	var height, width, topNum, topShape, bottomShape, color;

	for(var i=0;i<$('.logicComp').length;i++){
		pro = $('#'+$('.logicComp').eq(i).attr('id'))[0].getContext('2d');

		height = $('.logicComp').eq(i).attr('height');	//canvas의 height
		width = $('.logicComp').eq(i).attr('width');	//canvas의 width
		t = 10;

		topNum = $('.logicComp').eq(i).attr('topNum');
		topShape = $('.logicComp').eq(i).attr('topShape');
		bottomShape = $('.logicComp').eq(i).attr('bottomShape');
		color = $('.logicComp').eq(i).attr('color');

		pro.fillStyle = color;		//색상 설정
		pro.fillRect(0,t,width,height-2*t);		//몸통 사각형 생성
		pro.fillRect(0, 0, width, t);			//top 색칠

		pro.fillStyle = "pink";
		switch(topShape){
		case '1':
			switch(topNum)
			{
			case '1':
				pro.beginPath();
				pro.arc(width/2, 0, t, 0, 1*Math.PI, false);	//draw top circle
				break;
			case '2':
				pro.beginPath();
				pro.arc(width/4, 0, t, 0, 1*Math.PI, false);	//draw top circle
				pro.arc(3*width/4, 0, t, 0, 1*Math.PI, false);	//draw top circle	
				break;
			case '3':
				pro.beginPath();
				pro.arc(width/6, 0, t, 0, 1*Math.PI, false);	//draw top circle
				pro.arc(3*width/6, 0, t, 0, 1*Math.PI, false);	//draw top circle	
				pro.arc(5*width/6, 0, t, 0, 1*Math.PI, false);	//draw top circle
				break;
			}
			pro.fill();
			break;
		case '2':
			switch(topNum)
			{
			case '1':
				pro.fillRect(width/2-t/2, 0, t, t);	//draw top rect
				break;
			case '2':
				pro.fillRect(width/4-t/2, 0, t, t);	//draw top rect
				pro.fillRect(3*width/4-t/2, 0, t, t);	//draw top rect
				break;
			case '3':
				pro.fillRect(width/6-t/2, 0, t, t);	//draw top rect
				pro.fillRect(3*width/6-t/2, 0, t, t);	//draw top rect
				pro.fillRect(5*width/6-t/2, 0, t, t);	//draw top rect
				break;
			}
			break;
		case '3':
			switch(topNum)
			{
			case '1':
				pro.beginPath();   
				pro.moveTo(width/2,t);
				pro.lineTo(width/2-t/2,0);
				pro.lineTo(width/2+t/2,0);
				pro.closePath();
				pro.fill();
				break;
			case '2':
				pro.beginPath();   
				pro.moveTo(width/4,t);
				pro.lineTo(width/4-t/2,0);
				pro.lineTo(width/4+t/2,0);
				pro.closePath();
				pro.fill();

				pro.beginPath();   
				pro.moveTo(3*width/4,t);
				pro.lineTo(3*width/4-t/2,0);
				pro.lineTo(3*width/4+t/2,0);
				pro.closePath();
				pro.fill();
				break;
			case '3':
				pro.beginPath();   
				pro.moveTo(width/6,t);
				pro.lineTo(width/6-t/2,0);
				pro.lineTo(width/6+t/2,0);
				pro.closePath();
				pro.fill();

				pro.beginPath();   
				pro.moveTo(3*width/6,t);
				pro.lineTo(3*width/6-t/2,0);
				pro.lineTo(3*width/6+t/2,0);
				pro.closePath();
				pro.fill();

				pro.beginPath();   
				pro.moveTo(5*width/6,t);
				pro.lineTo(5*width/6-t/2,0);
				pro.lineTo(5*width/6+t/2,0);
				pro.closePath();
				pro.fill();
				break;
			}
			break;
		}

		pro.fillStyle = color;
		pro.clearRect(0, height-t, width, t);	//bottom 색칠
		switch(bottomShape)
		{
		case '1':
			pro.beginPath();
			pro.arc(width/2, height-t, t, 0, 1*Math.PI, false);	//draw top circle
			pro.fill();		
			break;
		case '2':
			pro.fillRect(width/2-t/2, height-t, t, t);	//draw top rect
			break;
		case '3':
			pro.beginPath();
			pro.moveTo(width/2,height);
			pro.lineTo(width/2-t/2,height-t);
			pro.lineTo(width/2+t/2,height-t);
			pro.closePath();
			pro.fill();
			break;
		}
	}
}