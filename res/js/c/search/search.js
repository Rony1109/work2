csc.bSearch = function (){
	seajs.use(csc.url("res","/f=js/m/hover"),function (){
		csc.hover("div.cs-select","cs-select-hover");
		csc.hover("div.ss-select","ss-select-hover");
	});
	$("div.cs-select>ul>li").on("click",function (){
		$(this).closest("div").toggleClass("cs-select-hover");
	});
	$("div.ss-select>ol>li").on("click",function (){
		$(this).closest("div").toggleClass("ss-select-hover").end().addClass("cur").siblings().removeClass("cur").end().prependTo($(this).parent());
	});
};

$(function(){
	$(".m-search ol li a").each(function(){
		$(this).attr("title",$(this).text());
	});
	
	$(".m-search ul li a").click(function(){
		var
			$t=$(this),
			$prodOl = $("#prod-ol"),
			$compOl = $("#comp-ol"),
			$stxt = $(".search-txt");
		if ($t.text()=="产品"){
			$prodOl.show();
			$compOl.hide();
			$stxt.removeClass("txt2");
		}else if ($t.text()=="公司"){
			$prodOl.hide();
			$compOl.show();
			$stxt.addClass("txt2");
		};
	});
	
	$("#searchbtn").click(function(){
		var
		current = $(".ss-select ol:visible .cur a");
		if($(".m-search ul li.cur a").text()==="公司" ){
			$(this).prev().find("input[type='hidden']").remove();
			if(current.text()=="主营产品"){
				$(this).next("input[type='hidden']").val("product");
			}else if(current.text()==="公司名称"){
				$(this).next("input[type='hidden']").val("company");
			}
		}else if($(".m-search ul li.cur a").text()==="产品"){			
			$(this).next("input[type='hidden']").remove();
			if(current.text()==="所有类目"){
				$(this).prev().find("input[type='hidden']").remove();
			}
		}
	});
	
	$(".csc-search form,.m-search form,.si-form form").on('submit',function(){
		var
			$t= $(this),
			$q = $t.find("input[name='q']"),
			$qval = $.trim($q.val()),
			$placeholder = $.trim($q.attr("placeholder"));
		if($qval==='' || $qval === $placeholder){
			return false;
		};
		var zmVal=encodeURIComponent($qval).split("%").join("");
		cscga('create', 'SU-10001-1', 'auto','searchTracker'+zmVal);
		cscga('searchTracker'+zmVal+'.require', 'cscplugin',{
			searchKeyWord:$qval,
			eventAction:'searchSuccess'
		});
		cscga('searchTracker'+zmVal+'.cscplugin:searchInit');
	});

    $("ol.list-crumb li:last").addClass("last");
});