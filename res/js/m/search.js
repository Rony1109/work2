csc.search = function (id){
	var
		//id = id || "form[action*='/selloffer/']" || "form[action*='/company/']",
		id = id || "form[action*='/']",
		$id = $(id);
	$id.bind("submit",function (){
		var
			$q = $(this).find("input[name='q']"),
			val = $.trim($q.val()),
			arr = ["请输入公司名称或关键词","请输入产品名称"];
		if(val.length == 0 || $.inArray(val,arr)!=-1){
			$q.trigger("focus");
			return false;
		}
	});
	return this;
};

csc.searchType = function (id, defaultType){
	var
		that = this,
		id = id || "div.hf-search",
		$id = $(id),
		$form = $id.find("form"),
		$ul = $id.find("ul"),
		action,
		placeholder,
		$btn = $form.find("input.btn[value='搜索'],input.cs-btn[value='搜 索']"),
		arr = ["请输入公司名称或关键词","请输入产品名称"],
		ceili,
		ceiling = ["50","35"];//产品、公司输入文字上限
	$ul.delegate("a","click",function (){
		var	$t = $(this),
			text = $.trim($t.text()),
			val = $.trim($("#search-txt").val());
		if($.inArray(val,arr) != -1){
			val = "";
		}
		if($t.parent().is(".cur")) return false;
		if($t.parents("div").is(".cs-select")){
			$t.parent().insertBefore($t.parent().prev());
		}
		switch(text){
			case "公司":
			action = "/companys.html";
			placeholder = arr[0];
			ceili = ceiling[0];
			break;
			default:
			action = "/products.html";
			placeholder = arr[1];
			ceili = ceiling[1];
		}
		var txtStr = '<input type="text" id="search-txt" maxlength="'+ ceili  +'" autocomplete="off" value="'+val+'" placeholder="'+placeholder+'" name="q" class="txt" />';
		$form.find("input[name='q']").remove();
		if($id.is("div.m-search")){
			$btn.prev(".ss-txt").append(txtStr);
		}else if($id.is("div.csc-search")){
			$btn.prev(".cs-txt").append(txtStr);
		}
		seajs.use(csc.url("res","/f=js/m/placeholder"),function (){
			csc.placeholder("input[name='q']");
		});
		$t.parent().addClass("cur").siblings(".cur").removeClass("cur");
		$form.attr("action",csc.url("search",action));
		that.search();
		return false;
	});
	if(defaultType){
		$ul.find("a:contains('"+defaultType+"')").trigger("click");
		return;
	}
	if(location.protocol + "//" + location.host == csc.url("search")){
		$ul.find("a[href*='"+location.pathname+"']").trigger("click");
	}
};