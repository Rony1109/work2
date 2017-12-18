//分页值必须正整数值
$(function(){
	$("input.afp-text").live("keyup",function(){
		var $t = $(this);
		$t.val($t.val().replace(/\D/g,''));
		if($t.val() == 0){
			$t.val('');
		}
	});
});

//翻页
csc.page = function (form,page,href){
	if(!form) return;
	var
		$form = $(form),
		num = $.trim($form.find("input.afp-text").val()),
		total = $(".p-total").eq(0).text();
		page = page || "page",
		href = href || $form.attr("action") || false;
	seajs.use(csc.url("res","/f=js/m/param"),function (){
		if(csc.param(page) != num){
			if(parseInt(num) > parseInt(total)){
				num = total;
			}
			if(!href){
				location.search = csc.param(page,num);
			}else{
				location.href = href + "?" + page + "=" +num;
			}
		}
	});
	this.afPage(form);
};

csc.afPage = function (id,show){
	if(!id) return;
	var
		show = show || false,
		$afPageBox = $(id).closest("div.afp-bd").find("div.afp-box"),
		$numText =$afPageBox.find("input.afp-text");
	$("div.afp-box").not($afPageBox).slideUp("fast");
	if(show){
		$afPageBox.is(":visible") || $afPageBox.slideDown("fast",function (){
			$numText.trigger("focus");
		});
	}else{
		$afPageBox.is(":animated") || $afPageBox.slideToggle("fast",function (){
			$afPageBox.is(":visible") && $numText.trigger("focus");
		});
	}
};