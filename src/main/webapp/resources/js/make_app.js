//make_app_right_list의 현재 버튼과 정보 상태를 저장할 전역변수, 버튼 객체가 저장된다.
var make_app_state;

$(document).ready(function(){
	/* 첫 로드 시 유저화면으로 초기화 */
	make_app_initialize();
	/* 첫 로드 시 make_app_right_button_1의 상태이므로 설정 */
	make_app_state = $("#make_app_right_button_1");
});

$(document).on("click", ".make_app_right_button", function(e){
	var buttonId = $(this).attr("id");
	/* 클릭한 버튼이 현재 화면일 경우 */
	if(buttonId == make_app_state.attr("id"))
		return;
	/* 다른 버튼 클릭 이벤트 */
	else{
		/* 현재 make_app_main의 정보 저장(현재 make_app_state 상태와 연관되어 저장) */
		save_make_app_state(make_app_state);

		/* 현재 make_app_main과 make_app_right를 비움 */
		remove_make_app_state(make_app_state);

		/* 클릭한 버튼에 따른 정보를 make_app_main과 make_app_right_list에 출력 후 make_app_state 변경 */
		load_make_app_state($(this));
	}
});

//Give draggable function to each layout_component
//원본 유지하고 싶으면 "helper: clone," 추가
function set_draggable_attr(class_name){
	$("."+class_name).draggable({
		stack: ".ui-draggable-dragging",
		helper: "clone",
		containment: "body",
		revert: "invalid",
		opacity: 0.35,
		start: function(ev, ui){
			show_comp_coord($(ui.helper));
		},
		drag: function(ev, ui){
			move_comp_coord($(ui.helper));
		},
		stop: function(ev,ui){
			remove_comp_coord($(ui.helper));
		}
	});	
}

/* Give resizable function to each layout_component */
function set_resizable_attr(class_name){
	$("."+class_name).each(function(){
		$(this).resizable({
			alsoResize: '#'+$(this).attr('id')+' > img',
			minHeight: $(this).height(),
			minWidth: $(this).width(),
			maxHeight: $("#make_app_main").height(),
			maxWidth: $("#make_app_main").width(),
			start: function(event, ui){
				show_comp_size($(this));
			},
			resize: function(event, ui){
				resize_comp_size($(this));
			},
			stop: function(event, ui){
				remove_comp_size($(this));
			}
		});
	});
}

//Give droppable function to body
function set_droppable_attr(class_name){
	$(".ui-droppable").droppable("destroy");

	$("#make_app_main").droppable({
		accept: "." + class_name,
		drop: function (event, ui) {
			/* 현재 이동 중인 컴포넌트(clone) 원본 */
			var original_comp = $(ui.draggable);
			/* 현재 이동 중인 컴포넌트(clone) 헬퍼 */
			var helper = $(ui.helper);
			/* 복사된 컴포넌트 */
			var copy_comp = $(ui.draggable).clone().attr('original',0).attr('id',$("[id^='"+original_comp.attr("id")+"']").length);
			copy_comp.offset({top: helper.offset().top, left: helper.offset().left});
		}
	});
}

/* 첫 로드 시 유저화면으로 초기화 */
function make_app_initialize(){
	// 이 부분은 빼놓고 현준이가 마무리 되면 initialize
	/*$("#make_app_main").append("<article class='make_app_main_widget' id='make_app_main_widget_1'>widget1</article><article class='make_app_main_widget' id='make_app_main_widget_2'>widget2</article>" +
			"<article class='make_app_main_widget' id='make_app_main_widget_3'>widget3</article><article class='make_app_main_widget' id='make_app_main_widget_4'>widget4</article>" +
			"<article class='make_app_main_widget' id='make_app_main_widget_5'>widget5</article><article class='make_app_main_widget' id='make_app_main_widget_6'>widget6</article>" +
			"<article class='make_app_main_widget' id='make_app_main_widget_7'>widget7(작업목록)</article>	<article class='make_app_main_widget' id='make_app_main_widget_8'>widget8(최근활동)</article>");*/
}

/* 현재 make_app_main의 정보 저장(현재 make_app_state 상태와 연관되어 저장) */
function save_make_app_state(make_app_state){












}

/* 현재 make_app_main과 make_app_right를 비움 */
function remove_make_app_state(make_app_state){
	$("#make_app_main").children().remove();
	$("#make_app_right_list").children().remove();
}

/* 클릭한 버튼에 따른 정보를 make_app_main과 make_app_right_list에 출력 후 make_app_state 변경 */
function load_make_app_state(change_app_state){
	var button_id = change_app_state.attr('id');
	/* User List */
	if(button_id == "make_app_right_button_1"){
		$.ajax({
			url: "get_dynamic_all_members.ajax",
			type: "GET",
			success: function(json){
				for(var i=0; i<json.length;i++){
					$("#make_app_right_list").append("<article id = '"+json[i].email+"'style='position: relative; width: 100%; text-align:center;'>"+json[i].email);
				}
			},
			error: function(err){
				alert("BUTTON1_ERROR?");
			}
		});
	}
	/* Layout Component List */
	else if(button_id == "make_app_right_button_2"){
		
		$.ajax({
			url: "get_dynamic_all_layout_cpnt.ajax",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			dataType: "json",
			success: function(json){
				for(var i=0; i<json.length;i++){
					$("#make_app_right_list").append("<article id = 'layout_comp_"+json[i].layoutCpnt.id+"' class='layout_comp' style='position: relative; width: 25%; text-align:center;' primarykey='"+json[i].layoutCpnt.id+"' original='1'>" +
							"<img src='http://plto.ipdisk.co.kr/publist/HDD1/beeild"+json[i].imageSrc.fd_IMAGE_SRC+"'></article>");
				}
				set_draggable_attr("layout_comp");
				set_resizable_attr("layout_comp");
				set_droppable_attr("layout_comp");
			},
			error: function(err){
				System.out.println("DSDSFASDF");
				System.out.println(json);
				alert("BUTTON2_ERROR?");
			}
		});		
	}
	/* Logic Component List */
	else if(button_id == "make_app_right_button_3"){
		$.ajax({
			url: "get_dynamic_all_logic_cpnt.ajax",
			type: "GET",
			success: function(json){
				for(var i=0; i<json.length;i++){
					$("#make_app_right_list").append("<article id = '"+json[i].logicCpnt.id+"'style='position: relative; width: 100%; text-align:center;'>" +
							"<img src='http://plto.ipdisk.co.kr/publist/HDD1/beeild"+json[i].imageSrc.fd_IMAGE_SRC+"'></article>");
				}
			},
			error: function(err){
				alert("BUTTON3_ERROR?");
			}
		});		
	}
	/* Service Application List */
	else if(button_id == "make_app_right_button_4"){
		$.ajax({
			url: "get_dynamic_app_list_all.ajax",
			type: "GET",
			success: function(json){
				for(var i=0; i<json.length;i++){
					$("#make_app_right_list").append("<article id = '"+json[i].id+"'style='position: relative; width: 100%; text-align:center;'>"+json[i].id+"</article>");
				}
			},
			error: function(err){
				alert("BUTTON4_ERROR?");
			}
		});
	}
	/* make_app_state 변경 */
	make_app_state = change_app_state;
}

/* 컴포넌트 이동시작시 좌표 표시 draggable.start
 * 사용 : set_draggable_attr */
function show_comp_coord(comp){
	$("body").append("<article id='comp_coord_box' style='position: absolute; width: 5%; background-color: skyblue;'></article>");
	$("#comp_coord_box").append(comp.offset().top.toFixed(2) + "<br>" + comp.offset().left.toFixed(2));
	$("#comp_coord_box").css("top", comp.offset().top - $("#comp_coord_box").height());
	$("#comp_coord_box").css("left", comp.offset().left);
}

/* 컴포넌트 이동 중 좌표 표시 draggable.drag
 * 사용 : set_draggable_attr */
function move_comp_coord(comp){
	$("#comp_coord_box").html(comp.offset().top.toFixed(2) + "<br>" + comp.offset().left.toFixed(2));
	$("#comp_coord_box").css("top",comp.offset().top - $("#comp_coord_box").height());
	$("#comp_coord_box").css("left",comp.offset().left);
}

/* 컴포넌트 이동시 좌표 표시창 제거 draggable.stop
 * 사용 : set_draggable_attr */
function remove_comp_coord(comp){
	$("#comp_coord_box").remove();
}

/* 컴포넌트의 크기 출력, 시작시 현재 크기 resizable.start
 * 사용 : set_resizable_attr */
function show_comp_size(comp){
	$("body").append("<article id='comp_size_box' style='position: absolute; width: 5%; background-color: skyblue;'></article>");
	$("#comp_size_box").append(comp.width().toFixed(2) + "<br>" + comp.height().toFixed(2));
	$("#comp_size_box").css("top", comp.offset().top - $("#comp_size_box").height());
	$("#comp_size_box").css("left", comp.offset().left);	
}

/* 컴포넌트의 크기 출력, 크기 조절시 조절 중인 크기 resizable.resize
 * 사용 : set_resizable_attr */
function resize_comp_size(comp){
	$("#comp_size_box").html(comp.width().toFixed(2) + "<br>" + comp.height().toFixed(2));
	$("#comp_size_box").css("top",comp.offset().top - $("#comp_size_box").height());
	$("#comp_size_box").css("left",comp.offset().left);	
}

/* 컴포넌트의 크기 출력, 종료시 출력창 제거 resizable.stop
 * 사용 : set_resizable_attr
 */
function remove_comp_size(comp){
	$("#comp_size_box").remove();
} 




















