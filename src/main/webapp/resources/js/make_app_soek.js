 // 마우스 우클릭 방지
$(function(){
	$("*").on("contextmenu", function(e) { return false; });
});

/* Create and remove menu start*/

var div_evt = null;
var div_sts = null;
var mouse_downed_cpnt = "";

$(function(){
	$(document).on("mousedown", ".newComp", function(e){
		switch(e.which)
		{
		case 1:	//좌클릭
			mouse_downed_cpnt = $(this).attr("id");
			break;
		case 2: //휠클릭
			
			break;
		case 3:	//우클릭
			
			break;
		default:
			
			break;
		}
	});
	
	//layout_cpnt를 눌럿을때
	$(document).on("mouseup", ".newComp", function(e){
		switch(e.which)
		{
			case 1: // 좌클릭
				if(div_sts !=null)
				{
					if(div_sts.target != $(this).attr("id"))	//만약 sts target의 id와 this의 id가 같지 않으면 
					{
						//기존창 삭제
						remove_sts_menu();
					}
					else
					{
						break;
					}
				}
				if(div_evt != null)	
				{
					//evt_menu 삭제!
					remove_evt_menu();
				}
				// sts_menu 생성!
				if(mouse_downed_cpnt != $(this).attr("id"))	//눌렸던 컴포넌트가 아니면 메뉴를 출력하지 않음.
				{
					return;
				}
				create_sts_menu($(this));
				mouse_downed_cpnt = "";	//다시 초기화

				break;
			case 2:
				// 휠 클릭(이라는데 안먹음)
				break;
			case 3://우클릭시
				//이미 존재한다면 지운다.
				if(div_evt !=null)
				{
					remove_evt_menu();
				}
				if(div_sts != null)	
				{
					//sts_menu 삭제!
					remove_sts_menu();
				}
				//evt_menu 생성!
				create_evt_menu($(this));
				break;
			default:
				break;
		}
	});
	
	//layout cpnt가 아닌 밖을 눌럿을 때
	$("#mainLayer, .pComponent").mousedown(function(e) {
		switch(e.which)
		{
			case 1: 
				// menu 모두 사라짐
				if(div_evt != null)
					remove_evt_menu();
				if(div_sts != null)
					remove_sts_menu();
				break;
			case 2:
				// 휠 클릭(이라는데 안먹음)
				break;
			case 3:
				// menu 모두 사라짐
				if(div_evt != null)
					remove_evt_menu();
				if(div_sts != null)
					remove_sts_menu();
				break;
			default:
				break;
		}
	});
});

function create_evt_menu(t)
{
	//create base div
	div_evt = document.createElement("div");
	var id_evt=document.createAttribute("id");
	id_evt.value="div_evt";
	div_evt.setAttributeNode(id_evt);
	
	//add target
	//add target
	div_evt.target = t.attr("id");

	//appent event div
	var div_click = document.createElement("div");
	var txt_click = document.createTextNode("click");
	div_click.appendChild(txt_click);
	var id_click=document.createAttribute("id");
	id_click.value="click";
	div_click.setAttributeNode(id_click);
	var class_click=document.createAttribute("class");
	class_click.value="evt";
	div_click.setAttributeNode(class_click);
	div_evt.appendChild(div_click);
	
	var div_dblclick = document.createElement("div");
	var txt_dblclick = document.createTextNode("dblclick");
	div_dblclick.appendChild(txt_dblclick);
	var id_dblclick=document.createAttribute("id");
	id_dblclick.value="dblclick";
	div_dblclick.setAttributeNode(id_dblclick);
	var class_dblclick=document.createAttribute("class");
	class_dblclick.value="evt";
	div_dblclick.setAttributeNode(class_dblclick);
	div_evt.appendChild(div_dblclick);

	var div_mousedown = document.createElement("div");
	var txt_mousedown = document.createTextNode("mousedown");
	div_mousedown.appendChild(txt_mousedown);
	var id_mousedown=document.createAttribute("id");
	id_mousedown.value="mousedown";
	div_mousedown.setAttributeNode(id_mousedown);
	var class_mousedown=document.createAttribute("class");
	class_mousedown.value="evt";
	div_mousedown.setAttributeNode(class_mousedown);
	div_evt.appendChild(div_mousedown);

	var div_mouseenter = document.createElement("div");
	var txt_mouseenter = document.createTextNode("mouseenter");
	div_mouseenter.appendChild(txt_mouseenter);
	var id_mouseenter=document.createAttribute("id");
	id_mouseenter.value="mouseenter";
	div_mouseenter.setAttributeNode(id_mouseenter);
	var class_mouseenter=document.createAttribute("class");
	class_mouseenter.value="evt";
	div_mouseenter.setAttributeNode(class_mouseenter);
	div_evt.appendChild(div_mouseenter);

	var div_mouseleave = document.createElement("div");
	var txt_mouseleave = document.createTextNode("mouseleave");
	div_mouseleave.appendChild(txt_mouseleave);
	var id_mouseleave=document.createAttribute("id");
	id_mouseleave.value="mouseleave";
	div_mouseleave.setAttributeNode(id_mouseleave);
	var class_mouseleave=document.createAttribute("class");
	class_mouseleave.value="evt";
	div_mouseleave.setAttributeNode(class_mouseleave);
	div_evt.appendChild(div_mouseleave);

	var div_mousemove = document.createElement("div");
	var txt_mousemove = document.createTextNode("mousemove");
	div_mousemove.appendChild(txt_mousemove);
	var id_mousemove=document.createAttribute("id");
	id_mousemove.value="mousemove";
	div_mousemove.setAttributeNode(id_mousemove);
	var class_mousemove=document.createAttribute("class");
	class_mousemove.value="evt";
	div_mousemove.setAttributeNode(class_mousemove);
	div_evt.appendChild(div_mousemove);

	var div_mouseover = document.createElement("div");
	var txt_mouseover = document.createTextNode("mouseover");
	div_mouseover.appendChild(txt_mouseover);
	var id_mouseover=document.createAttribute("id");
	id_mouseover.value="mouseover";
	div_mouseover.setAttributeNode(id_mouseover);
	var class_mouseover=document.createAttribute("class");
	class_mouseover.value="evt";
	div_mouseover.setAttributeNode(class_mouseover);
	div_evt.appendChild(div_mouseover);

	var div_mouseout = document.createElement("div");
	var txt_mouseout = document.createTextNode("mouseout");
	div_mouseout.appendChild(txt_mouseout);
	var id_mouseout=document.createAttribute("id");
	id_mouseout.value="mouseout";
	div_mouseout.setAttributeNode(id_mouseout);
	var class_mouseout=document.createAttribute("class");
	class_mouseout.value="evt";
	div_mouseout.setAttributeNode(class_mouseout);
	div_evt.appendChild(div_mouseout);

	// position by mouse
	
	div_evt.style.left = window.event.x+"px";
	div_evt.style.top = window.event.y+"px";
	
	// add to body
	document.body.appendChild(div_evt);
}

function remove_evt_menu()
{
	document.body.removeChild(div_evt);
	div_evt = null;
}

function create_sts_menu(t)
{
	div_sts = document.createElement("div");
	var id_sts=document.createAttribute("id");
	id_sts.value="div_sts";
	div_sts.setAttributeNode(id_sts);
	
	//add target
	div_sts.target = t.attr("id");
	
	//delete button
	var div_del = document.createElement("div");
	var id_del = document.createAttribute("id");
	id_del.value="del";
	div_del.setAttributeNode(id_del);
	div_sts.appendChild(div_del);
	
	// position by mouse
	//@ 추후 위치는 재조정이 필요함!
	div_sts.style.left = t.offset().left + "px";
	div_sts.style.top = t.offset().top - 100 + "px";
	
	// add to body
	document.body.appendChild(div_sts);
}

function remove_sts_menu()
{
	document.body.removeChild(div_sts);
	div_sts = null;
}

/* Create and remove menu end */


/* delete component start */

$(function(){
	$(document).on("click", "#del", function(e)
	{
		deleteComponent(div_sts.target);
	});
});
/* delete component end */


/* Create Logic Layer start */

$(function(){

	//layout_cpnt를 눌럿을때
	$(document).on("mousedown", ".evt", function(e){
		create_div_logic($(this));
		loadLogicLayer();
		remove_evt_menu();
	});
});

function create_div_logic(t)
{
	div_logic = document.createElement("div");
	var id_logic = document.createAttribute("id");
	id_logic.value = "div_logic";
	div_logic.setAttributeNode(id_logic);
	
	// div_logic에 div_black 추가. 어둡게 하는 투명한 레이어
	var div_black = document.createElement("div");
	var id_black = document.createAttribute("id");
	id_black.value = "div_black";
	div_black.setAttributeNode(id_black);
	div_logic.appendChild(div_black);
	
	// div_logic에 div_logic_edit추가.
	var div_logic_edit = document.createElement("div");
	var id_logic_edit = document.createAttribute("id");
	id_logic_edit.value = "div_logic_edit";
	div_logic_edit.setAttributeNode(id_logic_edit);
	
	
	
	// print txt_cpnt txt_evt
	//var txt_cpnt = document.createTextNode(div_evt.target);
	//div_logic_edit.appendChild(txt_cpnt);
	//var txt_evt = document.createTextNode(t.attr("id"));
	//div_logic_edit.appendChild(txt_evt);
	
	div_logic.appendChild(div_logic_edit);

	//div_logic_edit에 컴포넌트와 이벤트 정보를 attr 추가
	var target_cpnt = document.createAttribute("target_cpnt");
	target_cpnt.value = div_evt.target;
	div_logic_edit.setAttributeNode(target_cpnt);
	var target_evt = document.createAttribute("target_evt");
	target_evt.value = t.attr("id");
	div_logic_edit.setAttributeNode(target_evt);
	
	//add to body
	document.body.appendChild(div_logic);
}

function remove_div_logic()
{
	$("#"+$("#div_logic_edit").attr("target_cpnt")).attr($("#div_logic_edit").attr("target_evt")+"_logic",$("#logicLeft").html()); //로직 정보 저장
	document.body.removeChild(div_logic);
	div_logic = null;
}
		
/* Create Logic Layer end */


/* Create Layout List start */
var div_layout_list = null;
var div_layout_cpnt_list = null;
var DELAY = 200, timer = null, clickCnt =0;

function funcDblClick(target) {
	// 클릭 이벤트 실행 방지
	clearTimeout(timer);
	// To do
	dropComp(target);
	console.log('dbl click');
	// 클릭 카운트 초기화
	clickCnt = 0;
};
function dropComp(target){
	if(target.attr('id').search('merge') != -1){
		dropMergeComp(target);
	}
	else{
		dropElseComp(target);
	}
	$(".compGroup").css('background-color',$('#logicLeft').css('background-color'));
	
	for(var i=0; i<logicCompArr.length; i++){
		if(logicCompArr[i].attr('id') == target.attr('id'))
			logicCompArr.splice(i,1);
	}
	
	target.remove();
}

$(function(){
	$(document).on("click", ".logicComp", function(e){
		var thisComp = $(this);
		clickCnt++;
		if(clickCnt == 1){
			// click
			timer = setTimeout(function(){
				if(div_layout_list != null) //이미 존재하면 기존창 지우고 새로 띄움
					remove_div_layout_list();
				create_div_layout_list(e,thisComp);
				clickCnt=0;}, DELAY);
		} else{
			// double click
			funcDblClick($(this));
		}
	}).on('dblclick', '.logicComp', function(e){
		e.preventDefault();
	});
	
	$(document).on("mousedown", "#div_logic", function(e){
		if(div_layout_list !=null)
		{
			remove_div_layout_list();
		}
	});

	//현재 표시된 컴포넌트들의 _layout_id
	var _layout_id = "";
	
	//마우스를 올렷을때 layout컴포넌트들을 보여주는 창을 만드는 이벤트
	$(document).on("mouseover", "._layout", function(e){
		if ( _layout_id != $(this).attr("id")) // 아이디가 같지 않으면 지우고 다시 생성.
		{
			if(div_layout_cpnt_list != null) // 존재하면 지우고 다시 생성
			{
				remove_div_layout_cpnt_list();
			}
			create_div_layout_cpnt_list($(this));
		}
		else // 그렇지 않다면 
		{
			if(div_layout_cpnt_list == null) // 존재하지 않으면 create
			{
				create_div_layout_cpnt_list($(this));
				_layout_id = $(this).attr("id");
			}
		}
	});

	// 마우스를 내렸을때 layout컴포넌트들을 보여주는 창을 없애는 이벤트
	$(document).on("mouseover", "#div_logic", function(e){
		if(div_layout_cpnt_list != null )
		{
			remove_div_layout_cpnt_list();
		}
	});

});

//선택된 로직 컴포넌트를 저장하기 위한 변수
var selected_logic_cpnt = null;

function create_div_layout_list(e,t)
{
	selected_logic_cpnt = t; 	//selected_logic_cpnt를 현재 타겟으로 설정.
	
	//div_layout_list 생성
	div_layout_list = document.createElement("div");
	var id_layout_list = document.createAttribute("id");
	id_layout_list.value = "div_layout_list";
	div_layout_list.setAttributeNode(id_layout_list);

	//_layout추가를 위한 변수들
	var i;
	var layout = new Array();
	var id_layout = new Array();
	var class_layout = new Array();
	var txt_layout = new Array();
	var pos_layout = new Array();
	var top = 0;
	var left = 0;
	
	for (i=0;i<layerArr.length;i++)
	{
		layout[i] = document.createElement("div");
		//아이디 설정
		id_layout[i] = document.createAttribute("id");
		id_layout[i].value = "_"+layerArr[i];
		layout[i].setAttributeNode(id_layout[i]);
		// 클래스 설정
		class_layout[i]=document.createAttribute("class");
		class_layout[i].value="_layout";
		layout[i].setAttributeNode(class_layout[i]);
		// 텍스트 설정
		txt_layout[i] = document.createTextNode($("#"+layerArr[i]).text());
		layout[i].appendChild(txt_layout[i]);
		// 위치 설정
		pos_layout[i] = document.createAttribute("style");
		pos_layout[i].value = "top:"+top+"px;"+"left:"+left+"px;";
		layout[i].setAttributeNode(pos_layout[i]);
		
		//div_layout_list에 추가
		div_layout_list.appendChild(layout[i]);
		top += 25;
	}
	
	//위치 설정
	div_layout_list.style.left = e.pageX+"px";
	div_layout_list.style.top = e.pageY+"px";
	
	//add to body
	document.body.appendChild(div_layout_list);
}

function remove_div_layout_list()
{
	selected_logic_cpnt = null;	//삭제시 다시 비선택으로 바꿔줌
	document.body.removeChild(div_layout_list);
	div_layout_list = null;
}

function create_div_layout_cpnt_list(t)
{
	var layout_visibility;
	
	//div_layout_cpnt_list 생성
	div_layout_cpnt_list = document.createElement("div");
	var id_layout_cpnt_list = document.createAttribute("id");
	id_layout_cpnt_list.value = "div_layout_cpnt_list";
	div_layout_cpnt_list.setAttributeNode(id_layout_cpnt_list);

	//위치 설정
	var str = div_layout_list.style.left;
	var n = str.lastIndexOf("px");
	var left = str.substring(0, n);
	
	str = div_layout_list.style.top;
	var n = str.lastIndexOf("px");
	var top = str.substring(0, n);
	
	str = t.css("top");
	var n = str.lastIndexOf("px");
	
	div_layout_cpnt_list.style.left = eval(left)+100+"px";
	div_layout_cpnt_list.style.top = eval(str.substring(0, n)) + eval(top) + "px";
	
	//add to body
	document.body.appendChild(div_layout_cpnt_list);
	
	//layout_cpnt data 추가
	var i;
	var layout_cpnt = new Array();
	var id_layout_cpnt = new Array();
	var class_layout_cpnt = new Array();
	var txt_layout_cpnt = new Array();
	var pos_layout_cpnt = new Array();
	var top = 0;
	var left = 0;
	
	//layer번호를 알아낸다.
	var layer_num = t.attr("id").replace("_userLayerTab","");

	for(i=0 ; typeof compVisibility[layer_num][i] != "undefined" ; i++)
	{
		layout_cpnt[i] = document.createElement("div");
		//아이디 설정
		id_layout_cpnt[i] = document.createAttribute("id");
		id_layout_cpnt[i].value = "_"+compVisibility[layer_num][i];
		layout_cpnt[i].setAttributeNode(id_layout_cpnt[i]);
		// 클래스 설정
		class_layout_cpnt[i] = document.createAttribute("class");
		class_layout_cpnt[i].value = "_layout_cpnt";
		layout_cpnt[i].setAttributeNode(class_layout_cpnt[i]);
		// 텍스트 설정
		txt_layout_cpnt[i] = document.createTextNode(compVisibility[layer_num][i]);
		layout_cpnt[i].appendChild(txt_layout_cpnt[i]);
		// 위치 설정
		pos_layout_cpnt[i] = document.createAttribute("style");
		pos_layout_cpnt[i].value = "top:"+top+"px;"+"left:"+left+"px;";
		layout_cpnt[i].setAttributeNode(pos_layout_cpnt[i]);
		
		//div_layout_list에 추가
		div_layout_cpnt_list.appendChild(layout_cpnt[i]);
		top += 25;
		
		/* 선택한 컴포넌트에 target 추가 및 선택된 표시 기능 Start */
		document.getElementById(id_layout_cpnt[i].value).onclick=function()
		{
			$("#_"+selected_logic_cpnt.attr("target")).css("background-color","pink");
			$("#"+selected_logic_cpnt.attr("id")).attr("target",$(this).attr("id").replace("_",""));	//타겟을 현재 레이아웃 컴포넌트로 설정.
			$(this).css("background-color","yellow");
		};
		if($("#"+selected_logic_cpnt.attr("id")).attr("target") == id_layout_cpnt[i].value.replace("_",""))
		{
			$("#"+id_layout_cpnt[i].value).css("background-color","yellow");
		}
		/* 선택한 컴포넌트에 target 추가 및 선택된 표시 기능 End */
		
		/* HighLight 기능 Start */
		document.getElementById(id_layout_cpnt[i].value).onmouseover=function()
		{
			// 에디트창의 속성 변경
			$("#div_logic_edit").css("visibility","hidden");
			$("#div_layout_list").css("opacity","0.5");
			$("#div_layout_cpnt_list").css("opacity","0.5");
			$(".newLogicComp").css("visibility","hidden");
			
			//타겟의 css속성 변경
			layout_visibility = $("#"+t.attr("id").replace("_userLayerTab","userLayerSpace")).css("visibility");	// 타겟의 visibility를 저장
			
			if(layout_visibility =="hidden")	// 타겟이 hidden이면 타겟의 layer와 컴포넌트들을 모두 visible로 바꾸어줌.
			{
				$("#"+t.attr("id").replace("_userLayerTab","userLayerSpace")).css("visibility","visible");
				$("#"+t.attr("id").replace("_userLayerTab","userLayerSpace")+" *").css("visibility","visible");
			}
			$("#"+t.attr("id").replace("_userLayerTab","userLayerSpace")).css("z-index","50");	//z-index조절로 위에 표시되게 함.
			$("#"+$(this).attr("id").replace("_","")).css("background","yellow");	//노란 배경으로 하일라이팅
		};
		
		document.getElementById(id_layout_cpnt[i].value).onmouseout=function()
		{
			// 에디트창의 속성 변경
			$("#div_logic_edit").css("visibility","visible");
			$("#div_layout_list").css("opacity","1.0");
			$("#div_layout_cpnt_list").css("opacity","1.0");
			$(".newLogicComp").css("visibility","visible");
			
			//타겟의 css속성 변경
			if(layout_visibility =="hidden")	// 타겟의 원래 visibility가 hidden이였다면 다시 hidden으로 바꿈
			{
				$("#"+t.attr("id").replace("_userLayerTab","userLayerSpace")).css("visibility","hidden");
				$("#"+t.attr("id").replace("_userLayerTab","userLayerSpace")+" *").css("visibility","hidden");
			}
			$("#"+t.attr("id").replace("_userLayerTab","userLayerSpace")).css("z-index","");
			$("#"+$(this).attr("id").replace("_","")).css("background","");
		};
		/* HighLight 기능 End*/
	}	
}

function remove_div_layout_cpnt_list()
{
	document.body.removeChild(div_layout_cpnt_list);
	div_layout_cpnt_list = null;
}

/* Create Layout List end */