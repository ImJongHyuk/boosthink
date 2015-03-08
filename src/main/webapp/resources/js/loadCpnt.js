$(function(){/*
	var loadcpnt = new loadCpnt();
	loadcpnt.LoadLayoutCpntByCategory("#layoutCpntContainer",1);
	
	$("#layoutComponentListSelect").change(function(){
		//alert($("#componentListSelect").val());
		loadcpnt.LoadLayoutCpntByCategory("#layoutCpntContainer",$("#layoutComponentListSelect").val());
	});*/
});

function loadCpnt(){
};

loadCpnt.prototype.LoadLayoutCpntByCategory = function(location,category) {
	$(location).empty();
	//html 요소 추가
	var layoutCpnt = this.getLayoutCpntsByCategory(category);
	for(var i=0;i<layoutCpnt.size;i++)
	{
		$(location).html("<img src=\""+layoutCpnt.cpnt[i].src+"\" class=\"pComponent ui-draggable\" id=\""
				+layoutCpnt.cpnt[i].id+"\" orichk=\"1\" arridx=\"0\">");
	}
	
	// Dragable, Droppable 속성 부여
	makeDraggable();
	makeDroppable();
};

loadCpnt.prototype.getLayoutCpntsByCategory = function(category) {
	var temp;
	$.ajax({ type : "post",
		url : "getLayoutComponentsByCategory.ajax",
		data : "category="+category,
		dataType : "json",
		async : false,
		success : function( result ){
			temp = result;
		},
		complete : function( data ){
		},
		error : function(e1,e2,e3){
			alert("요청실패(err:"+e1+" "+e2+" "+e3+")");
		}
	});
	return temp;
};

loadCpnt.prototype.LoadLogicCpntByCategory = function(location, category) {
	$(location).empty();
	//html 요소 추가
	var logicCpnt = this.getLogicCpntsByCategory(category);
	var logicClass = ["cook","processor","merge","sweeper"];
	for(var i=0;i<logicCpnt.size;i++)
	{
		$(location).html("<img src=\""+logicCpnt.cpnt[i].src+"\" class=\"logicComp "+logicClass[category-1]+"\" id=\""
				+logicCpnt.cpnt[i].id+"\" orichk=\"1\" arridx=\""+i+"\" plang=\""+logicCpnt.cpnt[i].id+"\" topComp=0 botComp=0 leftPar=0 rightPar=0>");
	}
	onDraggable();
	onDroppable();
	groupOnDraggable();	
};

loadCpnt.prototype.getLogicCpntsByCategory = function(category) {
	var temp;
	$.ajax({ type : "post",
		url : "getLogicComponentsByCategory.ajax",
		data : "category="+category,
		dataType : "json",
		async : false,
		success : function( result ){
			temp = result;
		},
		complete : function( data ){
		},
		error : function(e1,e2,e3){
			alert("요청실패(err:"+e1+" "+e2+" "+e3+")");
		}
	});
	return temp;
};