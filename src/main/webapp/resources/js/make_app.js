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
$(function(){
	$(".layout_comp").draggable({
		stack: ".ui-dragging",
		containment: 'body',
		start: function(ev, ui){
		},
		drag: function(ev, ui){
		},
		stop: function(ev,ui){
		}
	});
});

//Give droppable function to body
$(function(){
	$("body").droppable({
		accept: ".layout_comp",
		drop: function (event, ui) {

		}
	});
});

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
					$("#make_app_right_list").append("<article id = '"+json[i].email+"'style='position: relative; width: 100%; text-align:center'>"+json[i].email);
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
			type: "GET",
			success: function(json){
				for(var i=0; i<json.length;i++){
					$("#make_app_right_list").append("<article id = '"+json[i].layoutCpnt.id+"'style='position: relative; width: 100%; text-align:center'>" +
							"<img src='http://plto.ipdisk.co.kr/publist/HDD1/beeild"+json[i].imageSrc.fd_IMAGE_SRC+"'></article>");
				}
			},
			error: function(err){
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
					$("#make_app_right_list").append("<article id = '"+json[i].logicCpnt.id+"'style='position: relative; width: 100%; text-align:center'>" +
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
					$("#make_app_right_list").append("<article id = '"+json[i].id+"'style='position: relative; width: 100%; text-align:center'>"+json[i].id+"</article>");
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
























