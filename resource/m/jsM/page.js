define(function(require,exports,module){
	var m = {};
	m.page = function(form,page,href){
		if(!form) return;
		var
			$form = $(form),
			num = $.trim($form.find("input.afp-text").val()),
			total = $(".p-total").eq(0).text();
			page = page || "page",
			href = href || $form.attr("action") || false;

		var param = require("m/jsM/param");
		
		if(param.param(page) != num){
			if(parseInt(num) > parseInt(total)){
				num = total;
			}
			if(!href){
				location.search = param.param(page,num);
			}else{
				location.href = href + "?" + page + "=" +num;
			}
		}

		this.afPage(form);
	}
	
	m.afPage = function(id,show){
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

	module.exports = m;
});