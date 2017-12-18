csc.select = function (id,fun,dVal){
	var
		othis = this,
		id = id || ".g-select",
		$id = $(id),
		$items = $id.children(".s-items"),
		fun = fun || function (){},
		$sTxt = $id.children("a.s-txt").on("click",function (){
			$id.toggleClass("g-select-hover");
		});

	seajs.use(csc.url("res","/f=js/m/hover"),function (){
		othis.hover(id,"g-select-hover");
	});

	$items.delegate("a","click",function (){
		var
			$t = $(this),
			text = $.trim($t.text()),
			val = $.trim($t.next("span").text()) || text;
		if($t.parent().is(".cur")) return;
		$sTxt.text(text);
		$items.find(".cur").removeClass("cur");
		$t.parent().addClass("cur");
		$id.removeClass("g-select-hover");
		fun(val,text);
		return false;
	});
	dVal && $items.children(":contains('" + dVal + "')").children("a").trigger("click");
};