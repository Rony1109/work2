/*
* 动态刷新下拉列表
* author 章君
*/

csc.writeArea = function (select,data,defaultVal){
	var 
		data = data.sort(function (a,b){
			return a.sort - b.sort
		}),
		tmp = select.children(":first").html() || '请选择',
		selected = "";
	tmp = '<option value="s">' + tmp + '</option>';
	$.each(data,function (i,v){
		if(v.id == defaultVal || v.name == defaultVal){
			selected = " selected";
		}else{
			selected = "";
		}
		tmp += '<option value="' + v.id + '"'+selected+'>' + v.name + '</option>';
	});
	select.html(tmp);
};

csc.getArea = function (province,city,defaultProvince,defaultCity){
	if(!province) return;
	var
		othis = this,
		province = province || "select[name='province']",
		$province = $(province),
		city = city || $province.next("select"),
		$city = $(city);
	$province.on("change",function (){
		var	$t = $(this);
		if($t.val() != "s"){
			$.get(csc.url("api","/area/getcity"),{provinceId:$t.val()},function (data){
				othis.writeArea($city,data,defaultCity);
			},"jsonp");
		}
	});
	if(defaultProvince){
		$province.children("option[value='"+defaultProvince+"']").length ? $province.val(defaultProvince) : $province.children(":contains('"+defaultProvince+"')").prop("select",true);
		$province.trigger("change");
	}
	return this;
};

csc.selectArea = function (id,fun,dVal){
	var
		othis = this,
		id = id || ".g-select-area",
		$id = $(id),
		$areas = $id.children(".s-items"),
		dVal = dVal || "所有地区",
		fun = fun || function (){},
		$sTxt = $id.children("a.s-txt").on("click",function (){
			$id.toggleClass("g-select-hover");
		}),
		_checkCur = function (t){
			var p = t.parent();
			return p.is(".cur") && !p.is(".prov-item");
		},
		_select = function (t){
			var val = $.trim(t.text());
			$sTxt.text(val);
			$id.find(".cur").removeClass("cur");
			t.parent().addClass("cur");
			$id.removeClass("g-select-hover");
		};

	seajs.use(csc.url("res","/f=js/m/hover"),function (){
		othis.hover(id,"g-select-hover").hover(id+" li.prov-item","prov-item-hover");
	});
	$areas.delegate("a","click",function (){
		var
			$t = $(this),
			val = $.trim($t.text());
		if(_checkCur($t)) return;
		_select($t);
		fun(val,$t);
		return false;
	});
	_select($id.find("a:contains('" + dVal + "')"));
};