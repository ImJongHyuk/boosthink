$(document).ready(function () {
	makeDraggable();
	makeDroppable();
});

function makeDraggable()
{
	//Make element draggable
	$(".pComponent").draggable({
		stack: '.pComponent',
		helper: 'clone',
		containment: 'body',
		revert: 'invalid'
	});	
}

function makeDroppable()
{
	//Make element droppable
	$("#userLayerSpace0").droppable({
		accept: '.pComponent',
		drop: function (ev, ui) {
			var thisComp = $(ui.draggable);
			// 'oriChk' == 1 means original, 0 means clone
			if(thisComp.attr('oriChk') == 1){
				var element = thisComp.clone().attr('oriChk',0);
				// Give the id each component
				if(compArr[element.attr('arrIdx')] == undefined)
					compArr[element.attr('arrIdx')] = 0;
				element.attr('id', element.attr('id')+compArr[element.attr('arrIdx')]++);

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
	});	
}