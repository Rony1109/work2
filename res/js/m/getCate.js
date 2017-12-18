//同getArea获取二级类目，新增
csc.writeCate = function (select,data,defaultVal){
	var 
		data = data.sort(function (a,b){
			return a.sort - b.sort
		}),
		tmp = select.children(":first").html() || '请选择',
		selected = "";
	tmp = '<option value="s">' + tmp + '</option>';
	$.each(data,function (i,v){
		if(v.categoryNo == defaultVal || v.categoryName == defaultVal){
			selected = " selected";
		}else{
			selected = "";
		}
		tmp += '<option value="' + v.categoryNo + '"'+selected+'>' + v.categoryName + '</option>';
	});
	select.html(tmp);
};

csc.getCate = function (oneCate,twoCate,defaultOneCate,defaultTwoCate){
	if(!oneCate) return;
	var
		othis = this,
		oneCate = oneCate || "select[name='oneCate']",
		$oneCate = $(oneCate),
		twoCate = twoCate || $oneCate.next("select"),
		$twoCate = $(twoCate);
	$oneCate.on("change",function (){
		var	$t = $(this),
				cateId = $(this).find('option:selected').attr('id');
		if($t.val() != "s"){
			$.get(csc.url("search","/site/Subcategory"),{"cateId":cateId},function (data){
				othis.writeCate($twoCate,data,defaultTwoCate);
			},"jsonp");
		}
	});
	if(defaultOneCate){		
		$oneCate.children("option[value='"+defaultOneCate+"']").length ? $oneCate.val(defaultOneCate) : $oneCate.children(":contains('"+defaultOneCate+"')").prop("select",true);
		$oneCate.trigger("change");
	}
	return this;
};