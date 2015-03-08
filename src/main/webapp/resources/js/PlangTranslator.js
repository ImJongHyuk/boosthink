$(function(){
	var pg = new PlangGenerator();
	
	
	//translate_button을 누르면 전송!
	$("#translate_button").click(function() {
		pg.InterpretPlang();
		pg.submitCodes();
	});

	//submit할때 이벤트 처리하고싶은거 넣자.
	$("#submit_to_translate").submit(function(event){
		//after validate, correct:submit or do not
		//event.preventDefault(); // submit prevent
	});
});

function PlangGenerator(){
	/*Variables*/
	this.plangString = "";
	this.faceComponentIds = [];		//클라이언트에서 사용할 컴포넌트 아이디
	this.serverComponentIds = [];	//서버에서 사용할 컴포넌트 아이디
	this.faceComponentValues = [];	//페이스컴포넌트에 입력된 값 (execute할때 필요할듯?)
	this.isValidated = true;			//유효성 검사 플래그
	
	//추가
	this.eventList = [];	//이벤트 정보를 저장하는 리스트
	this.eventNum = 0;		//이벤트 번호 저장 변수
	this.evt_code = "";
	this.map_data = "";
	this.vNum = 0;
};

/*Methods*/
PlangGenerator.prototype.submitCodes = function() {
//	alert($("#layout_data").attr("value")+$("#logic_data").attr("value"));
//	this.map_data ="";
//	this.vNum = 0;
	$("#submit_to_translate").submit();
};

PlangGenerator.prototype.InterpretPlang = function() {
	//form을 생성하고 hidden에 message를 넣고 서버에 전송.
	this.GenCommunicationCodes(this.event);
	this.ScanFaceComponenets();
	$("body").append("<form id=\"submit_to_translate\" action=\"/plto/add_app\" method=\"post\"><input type=\"hidden\" id=\"layout_data\" name=\"layout_data\"><input type=\"hidden\" id=\"logic_data\" name=\"logic_data\"></form>");
	$("#layout_data").attr("value", this.translate_layout());
	$("#layout_data").attr("value", $("#layout_data").attr("value"));
	$("#logic_data").attr("value", this.translate_logic());
	$("#logic_data").attr("value", this.map_data+$("#logic_data").attr("value"));
	//alert( $("#layout_data").attr("value"));
};

PlangGenerator.prototype.translate_layout = function(){
	//layout_msg
	var layout_msg ="<LAYOUT>\n";
	
	// html
	var html = "";
	var i;
	for(i=0;i<layerArr.length;i++)
	{
		html = html + "<DIV id=\""+layerArr[i].replace("userLayerTab","userLayerSpace")+"\">\n";
		html = html + $("#"+layerArr[i].replace("userLayerTab","userLayerSpace")).html();
		html = html + "</DIV>\n";
	}
	
	html = html.replace(" ui-draggable", ""); 	// ui-draggable class 속성 삭제
	html = html.replace(/ orichk=\"([0-9])*\"/, "");	//orichk 속성 삭제
	html = html.replace(/ arridx=\"([0-9])*\"/, "");	//arridx 속성 삭제
	html = html.replace(/ parentlayer=\"([0-9])*\"/, "");	//parentlayer 속성 삭제
	html = html.replace(/ visibility: (visible|hidden)/, "");	//visibility 속성 삭제	
	
	// css
	var css = "<style>\n";
	css = css + "</style>\n";
	
	// javascript
	var script = "<script>\n";
	script = script + this.plangString;
	script = script + "</script>\n";
	
	//merge
	layout_msg = layout_msg + css + script + html + "</LAYOUT>";
	return layout_msg;
};

PlangGenerator.prototype.translate_logic = function(){
	var logic_msg = "";		//logicdata를 담을 변수
	$("body").append("<div id=\"logic_loader\" style=\"visibility: hidden;\"></div>");	//컴포넌트에서 logic data를 찾아서 load할 div
	
	var i,j;
	//scan component
	for(i=0 ; typeof compVisibility[i] !="undefined" ; i++)
	{
		for(j=0 ; typeof compVisibility[i][j] !="undefined" ; j++)
		{
			var cpnt = compVisibility[i][j];
			if(typeof $("#"+cpnt).attr("click_logic") != "undefined")
			{
				this.translate_event(cpnt, "click");
			}
			if(typeof $("#"+cpnt).attr("dblclick_logic") != "undefined")
			{
				this.translate_event(cpnt, "dblclick");
			}
			if(typeof $("#"+cpnt).attr("mousedown_logic") != "undefined")
			{
				this.translate_event(cpnt, "mousedown");
			}
			if(typeof $("#"+cpnt).attr("mouseenter_logic") != "undefined")
			{
				this.translate_event(cpnt, "mouseenter");
			}
			if(typeof $("#"+cpnt).attr("mousemove_logic") != "undefined")
			{
				this.translate_event(cpnt, "mousemove");
			}
			if(typeof $("#"+cpnt).attr("mouseover_logic") != "undefined")
			{
				this.translate_event(cpnt, "mouseover");
			}
			if(typeof $("#"+cpnt).attr("mouseout_logic") != "undefined")
			{
				this.translate_event(cpnt, "mouseout");
			}
		}
	}
	$("#logic_loader").remove();
	return logic_msg;
};

PlangGenerator.prototype.translate_event = function(cpnt, evt) {
	$("#logic_loader").append($("#"+cpnt).attr(evt+"_logic"));	// logic_loader에 로직데이터 load
	$("#logic_loader *").css("visibility","hidden");	//로드한 로직데이터 hidden으로
	var i;
	for(i=1;typeof $("#logic_loader > div:nth-child("+i+")").attr("id") != "undefined" ; i++)
	{
		var sweeper = $("#"+$("#"+$("#logic_loader > div:nth-child("+i+")").attr("id")+" .sweeper").attr("id"));
		if(typeof sweeper.attr("id") != "undefined")
		{
			this.eventList[this.eventNum] ="";	//이벤트를 저장할 변수
			this.evt_code = "<EVENT:"+cpnt + "_" + evt+">{";
			this.trip(sweeper);
			this.evt_code = this.evt_code + "}";
			this.eventList[this.eventNum] = this.evt_code + "\n<PLANG>" + this.eventList[this.eventNum] + "\n</PLANG>";	//이벤트코드를 합침
			
			if(this.isValidated == false)	//에러플래그가 검출되면 해석한 event초기화. 
			{
				//플래그와 eventList의 내용 초기화
				this.isValidated = true;
				this.eventList[this.eventNum] ="";
			}
			else
			{
				//alert(this.eventList[this.eventNum]);
				this.eventNum++;
			}
			//getComunacationCode 작성 요망@@@@@@@@@@@
		}
	}
	$("#logic_loader").empty();	// logic_loader에서 삭제
};


//연결된 모든 로직 컴포넌트를 해석하기 위한 재귀함수
PlangGenerator.prototype.trip = function(cpnt){
	if(typeof cpnt.attr('class') == "undefined" )
	{
		this.isValidated = false;
		return;
	}
	else if(cpnt.attr('class').search('cook') != -1)	//cook 검출
	{
		this.eventList[this.eventNum] = this.eventList[this.eventNum] + "\n<"+cpnt.attr("plang")+":v"+this.vNum+">{<"+cpnt.attr("target")+">}";
		cpnt.attr("val","v"+this.vNum);	//타겟 등록
		this.evt_code = this.evt_code + "<" + cpnt.attr("target") + ">";	//이벤트 코드에 레이아웃 컴포넌트 등록
		this.vNum++;
		return;
	}
	else if(cpnt.attr('class').search('processor') != -1)	//processor 검출
	{
		if(cpnt.attr('class').search('merge') != -1)	//merge의 경우
		{
			this.trip($("#"+cpnt.attr("leftpar")));
			this.trip($("#"+cpnt.attr("rightpar")));
		
			var rightpar = $("#"+cpnt.attr("rightpar"));
			var leftpar = $("#"+cpnt.attr("leftpar"));
			this.eventList[this.eventNum] = this.eventList[this.eventNum] + "\n<"+cpnt.attr("plang")+":v"+this.vNum+">{<"+rightpar.attr("val")+",<<+>>,"+leftpar.attr("val")+">}";
			cpnt.attr("val","v"+this.vNum);
			this.vNum++;
			return;
		}
		else 	//merge가 아닌 일반적인 processor
		{
			this.trip($("#"+cpnt.attr("topcomp")));
			this.eventList[this.eventNum] = this.eventList[this.eventNum] + "\n<"+cpnt.attr("plang")+":v"+this.vNum+">{<"+$("#"+cpnt.attr("topcomp")).attr("val")+">}";
			cpnt.attr("val","v"+this.vNum);
			this.vNum++;
			return;
		}
	}
	else if(cpnt.attr('class').search('sweeper') != -1)	//sweeper 검출
	{
		this.trip($("#"+cpnt.attr("topcomp")));
		this.eventList[this.eventNum] = this.eventList[this.eventNum] + "\n<"+cpnt.attr("plang")+":"+cpnt.attr("target")+">{<"+$("#"+cpnt.attr("topcomp")).attr("val")+">}";
		
		this.evt_code = this.evt_code + "<" + cpnt.attr("target") + ">";	//이벤트코드에 등록
		return;
	}
};

PlangGenerator.prototype.GenCommunicationCodes = function(event) {
	this.plangString += this.plangString
		+"$(function(){"
		+"$(\"#"+event+"\").click(function(){"
		+"callJSON_jackson($(\"#layout_id\").val(),\"button1\",$(\"#text1\").children().val());"
		+"});"
		+"});"
		+"function callJSON_jackson(t1,t2,t3){"
		+"$.ajax({ type : \"post\","
		+"url : \"exercise\","
		+"data : \"layout_id=\" + t1 + \"&event_id=\" + t2 + \"&start_value=\" + t3,"
		+"success : function( data ){"
		+"$(\"#text2\").children().attr(\"value\",data);"
		+"},"
		+"complete : function( data ){"
		+"alert(\"complete\");"
		+"},"
		+"error : function(e1,e2,e3){"
		+"alert(\"요청실패(err:\"+e1+\" \"+e2+\" \"+e3+\")\");"
		+"}"
		+"});"
		+"}";
};

PlangGenerator.prototype.ScanFaceComponenets = function() {
	var i;
	var j;
	//scan component
	for(i=0 ; typeof compVisibility[i] !="undefined" ; i++)
	{
		for(j=0 ; typeof compVisibility[i][j] !="undefined" ; j++)
		{
			this.MapFaceComponentId(compVisibility[i][j]); //스캔한 컴포넌트를 매핑함.
		}
	}
};

PlangGenerator.prototype.MapFaceComponentId = function(layout_component_id) 
{
	this.map_data = this.map_data + "<MAP:<VAR:v"+this.vNum+">>{<"+layout_component_id+">}";	//map String생성
	this.faceComponentIds[this.vNum] = layout_component_id;	//faceComponentIds 배열에 추가
	this.serverComponentIds[this.vNum] = "v" + this.vNum;		//serverComponentIds 배열에 추가
	this.vNum++;
};

PlangGenerator.prototype.ScanFaceComponentValues = function() {
	
};

PlangGenerator.prototype.ValidationPlang = function() {
	
};