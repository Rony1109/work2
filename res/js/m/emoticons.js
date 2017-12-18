/*
* 插入表情,替代字符串;
* author: why
* Date: 2013年3月27日
* exp:
* 对外接口只有一个: emoticons_ico.emoticons('id',this)
* 将在this元素下方打开表情选择框,选中表情后的值将插入id元素中;
*/
var ico_name = [];
var emoticons_ico = emoticons_ico || {};
$(document).on("click",function(){
	if(emoticons_ico.d_c && emoticons_ico.wrapperDiv){
		emoticons_ico.wrapperDiv.remove();
		emoticons_ico.wrapperDiv = null;
	}
});
(function(){
emoticons_ico.path = csc.url("res",'/js/p/kindeditor/4.1.2/plugins/emoticons/images/');
emoticons_ico.type = csc.url("res",'/js/p/kindeditor/4.1.2/themes/default/default.css');
emoticons_ico.allowPreview=1; //预览开关
emoticons_ico.currentPageNum = 1; //默认打开的页码
emoticons_ico.table;
var rows = 5, cols = 9, total = 135, startNum = 0,cells = rows * cols, pages = Math.ceil(total / cells),
	colsHalf = Math.floor(cols / 2),
	elements = [];
emoticons_ico.createPageTable = function(currentPageNum){
	var pageDiv;
	if(emoticons_ico.wrapperDiv.find(".ke-page").length){
		pageDiv = emoticons_ico.wrapperDiv.find(".ke-page");
	}else{
		pageDiv = $('<div class="ke-page"></div>');
		emoticons_ico.wrapperDiv.append(pageDiv);
	}
	for (var pageNum = 1; pageNum <= pages; pageNum++) {
		if (currentPageNum !== pageNum) {
			var a = $('<a href="javascript:;">[' + pageNum + ']</a>');
			emoticons_ico.bindPageEvent(a, pageNum);
			pageDiv.append(a);
			elements.push(a);
		} else {
			pageDiv.append($('<span>[' + pageNum + ']</span>'));
		}
		pageDiv.append("&nbsp;");
	}
}
emoticons_ico.bindPageEvent = function(el, pageNum) {
	
	el.click(function(event) {
		emoticons_ico.removeEvent();
		emoticons_ico.table.parentNode.removeChild(emoticons_ico.table);
		emoticons_ico.wrapperDiv.find(".ke-page").remove();
		emoticons_ico.table = emoticons_ico.createEmoticonsTable(pageNum, emoticons_ico.wrapperDiv);
		emoticons_ico.createPageTable(pageNum);
		emoticons_ico.currentPageNum = pageNum;
		event.stopPropagation();
	});
}

emoticons_ico.createEmoticonsTable = function(pageNum, parentDiv) {
	var table = document.createElement('table');
	var previewDiv = emoticons_ico.wrapperDiv.find(".ke-preview");
	parentDiv.append(table);
	if (previewDiv) {
		$(table).mouseover(function() {
			previewDiv.show();
		});
		$(table).mouseout(function() {
			previewDiv.hide();
		});
		elements.push($(table));
	}
	table.className = 'ke-table';
	table.cellPadding = 0;
	table.cellSpacing = 0;
	table.border = 0;
	var num = (pageNum - 1) * cells + startNum;
	for (var i = 0; i < rows; i++) {
		var row = table.insertRow(i);
		for (var j = 0; j < cols; j++) {
			var cell = $(row.insertCell(j));
			cell.addClass('ke-cell');
			emoticons_ico.bindCellEvent(cell, j, num);
			var span = $('<span class="ke-img"></span>')
				.css('background-position', '-' + (24 * num) + 'px 0px')
				.css('background-image', 'url(' + emoticons_ico.path + 'static.gif)');
			cell.append(span);
			elements.push(cell);
			num++;
		}
	}
	return table;
}

emoticons_ico.bindCellEvent = function(cell, j, num) {
	ico_name[num] = "qq"+num;
	var previewDiv = emoticons_ico.wrapperDiv.find(".ke-preview"),
		previewImg = emoticons_ico.wrapperDiv.find("img.ke-preview-img");
	if (previewDiv.length) {
		cell.mouseover(function() {
			if (j > colsHalf) {
				previewDiv.css('left', 0);
				previewDiv.css('right', '');
			} else {
				previewDiv.css('left', '');
				previewDiv.css('right', 0);
			}
			previewImg.attr('src', emoticons_ico.path + num + '.gif');
			$(this).addClass('ke-on');
		});
	} else {
		cell.mouseover(function() {
			$(this).addClass('ke-on');
		});
	}
	cell.mouseout(function() {
		$(this).removeClass('ke-on');
	});
	cell.click(function(e) {
		var obj;
		if(csc.typeOf(emoticons_ico.text_boj) == "jquery" || csc.typeOf(emoticons_ico.text_boj)=="string"){
			var obj1 = $(emoticons_ico.text_boj);
			obj1.val(obj1.val()+"[ico:"+ico_name[num]+"]").focus();
		}else{
			emoticons_ico.text_boj.insertHtml('<img src="' + emoticons_ico.path + num + '.gif" border="0" alt="" />').focus();
		}
	});
}
emoticons_ico.removeEvent=function() {
	$.each(elements, function() {
		this.unbind();
	});
}

emoticons_ico.emoticons = function(obj,o,kindObj) {
	//seajs.use(emoticons_ico.type,function(){
		emoticons_ico.d_c = false;
		setTimeout(function(){emoticons_ico.d_c=true;},200)
		emoticons_ico.text_boj = obj;
		var previewDiv, previewImg;
		if(emoticons_ico.wrapperDiv && emoticons_ico.elem == o){
			emoticons_ico.wrapperDiv.remove();
			emoticons_ico.wrapperDiv = null;
			return false;
		}
		emoticons_ico.elem = o;
		if(!emoticons_ico.wrapperDiv){
			emoticons_ico.wrapperDiv = $('<div class="ke-plugin-emoticons"></div>');
			$("body").append(emoticons_ico.wrapperDiv);
			if (emoticons_ico.allowPreview) {
				previewDiv = $('<div class="ke-preview"></div>').css('right', 0);
				previewImg = $('<img class="ke-preview-img" src="' + emoticons_ico.path + startNum + '.gif" />');
				emoticons_ico.wrapperDiv.append(previewDiv);
				previewDiv.append(previewImg);
			}
			emoticons_ico.wrapperDiv.attr("style","display: block; position: absolute; z-index: 811213; border:1px solid #DDD; padding:2px; background-color:#FFF;");
			emoticons_ico.table = emoticons_ico.createEmoticonsTable(emoticons_ico.currentPageNum, emoticons_ico.wrapperDiv);
			emoticons_ico.currentPageNum = 1;
			emoticons_ico.createPageTable(emoticons_ico.currentPageNum);
		}
		var off = $(o).offset();
		emoticons_ico.wrapperDiv.css({"left":off.left+"px","top":off.top + $(o).outerHeight()+"px"});
		return false;
	//})
}

//**编码转解码**//
emoticons_ico.tohtml = function(str){
	var n = str.match(/\[ico:qq\d+\]/g)? str.match(/\[ico:qq\d+\]/g).length : 0;
	var reg = /\[ico:qq(\d+)\]/;
	var str_t=str;
	for(var i=0; i< n ; i++ ){
		var arr = reg.exec(str_t);
		var img = "<img src=\"" + emoticons_ico.path + arr[1] + ".gif" + "\" />";
		str_t = str_t.replace(reg,img);
	}
	return str_t;
}

})();