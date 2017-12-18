csc.offer = csc.offer || {};

csc.offer.cateName = function (){
	var	tmp = "",
			$strong = $("div.you-select").children("span,strong");
	$("[name^='category']>:selected").each(function(i) {
		tmp += (i>0 ? " &gt; ":"") + "<span>" + $(this).text() + "</span>";
	});
	$strong.is("strong") ? $strong.html(tmp) : $strong.before('<strong>'+tmp+'</strong>') && $strong.remove();
};

csc.offer.newcateName = function (){
	var	tmp = "",
			$strong = $("div.you-select").find("strong");
	$("[name^='category']>:selected").each(function(i) {
		tmp += (i>0 ? " &gt; ":"") + "<span>" + $(this).text() + "</span>";
	});
	$strong.get(0) ? $strong.html(tmp) : $strong.before('<strong>'+tmp+'</strong>')&& $strong.remove() ;
};

csc.offer.selectCate = function (){
	var
		othis = this,
		cateSelected = $.trim($("#cateSelected").val()),hostname=location.host,
		cats = '';
	if(cateSelected.length>0){
		var cats = cateSelected.split(",");
	}
	$("#cate1,#cate2").on("change",function (){
		var	$t = $(this);
		$('input[name="cmmnClssfy"]').val('');
		$.get('//'+hostname+'/shop/productPublish//productPublish.loadCategory',{cateId:$t.val()},function (data){
			if(data.length){
				var	opt = "";
				$.each(data,function (i,v){
					opt += '<option value="' + v.categoryNo + '">' + v.categoryName + '</option>';
				});
				$t.next().is("select") ? $t.next().html(opt).next("select").remove() : $t.after('<select size="6" name="category[2]">'+opt+'</select>');
				if(cats.length > 0){
					if($t.is("#cate1")){
						setTimeout(function (){
							$("#cate2").val(cats[1]).trigger("change");
							cats.length > 1 || (cats = '');
						},10);
					}else{
						setTimeout(function (){
							$t.next().val(cats[2]).trigger("change");
							cats = '';
						},10);
					}
				}
			}else{
				$t.next("select").remove();
			}
			othis.cateName();
		},"jsonp");
	});
	cateSelected.length && cats.length >0 && setTimeout(function (){$("#cate1").val(cats[0]).trigger("change")},10);
	$("select[name='category[2]']").live("change",othis.cateName);
};

$(function (){
	var
		$categoryPath = $(":hidden[name='categoryPath']"),
		$lableName = $(":hidden[name='lableName']");
		
	$("select[name='lableId']").on("change",function (){
		var	$t = $(this);
		$lableName.val($t.children(":selected").text());
		console.log($lableName.val());
	});
	$("form").on("submit",function(){
		var searchCate = $("div.cate-input").find("div.cate-float"),//搜索结果浮动层
			searchCateinput = $("div.cate-input").find("input:checked");//获取选中的节点
			sc = searchCate.length,
			sci = searchCateinput.length,
			fdcint=$('input[name="cmmnClssfy"]').val();
			radioVal = searchCateinput.val();
		//console.log(sc,sci,radioVal); 
		
		if(!fdcint){
			if($("select[name^='category']:last").val()){
				$categoryPath.val($("div.you-select>strong").html());
			}else{
				csc.showFormError($("select[name^='category']:last"),"请选择产品分类");
				return false;
			}
			}
			
			/*
		if( sc > 0 || sci > 0 ){//从搜索结果中选择
			if(sci > 0){
				$categoryPath.val($("div.you-select>strong,div.you-select>span").html());
					
			}else{
				csc.showFormError($("select[name^='category']:last"),"请选择产品分类");
				return false;
			}
		}else{//直接从类目中选择
			if($("select[name^='category']:last").val()){
				$categoryPath.val($("div.you-select>strong").html());
			}else{
				csc.showFormError($("select[name^='category']:last"),"请选择产品分类");
				return false;
			}
		}
		*/
		
	});
});