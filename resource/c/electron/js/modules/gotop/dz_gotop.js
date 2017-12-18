define(function(require, exports, module) {
	require('./css.css');
	var ie6 = !-[1,]&&!window.XMLHttpRequest;
	var html = '<div id="why_goTop"><a class="why_top" href="#">返回顶部</a></div>';
	var d_option = {
		main_width:1000,
		marginleft:10,
		showTop:206,
		marginbottom:150
	};
	exports.setmain = function(option){
		var top = $(html),mark=false;
		var _option = $.extend({},d_option,option);
		$("body").append(top);
		if(!ie6){
			top.css({
				bottom:_option.marginbottom + "px"
			})
			//console.log("top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-document.getElementById('why_goTop').offsetHeight-"+ _option.marginbottom +"))");
		}else{
			top[0].style.cssText = "top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight - document.getElementById('why_goTop').offsetHeight - "+ _option.marginbottom +"));"
			
		}		
		top.css({
			"left":"50%",
			"margin-left": (_option.main_width/2 + _option.marginleft) +"px",
			"display":"none"
		});

		//alert(top[0].style.cssText);
		top.find("a.why_top").on("click",function(){
			//return false;
			var o = $(this);
			mark = true;
			o.addClass("s");
			$("body,html").animate({scrollTop:0},300);
			o.animate({"margin-top":-200},300);
			top.fadeOut(400,function(){
				mark = false;
				o.removeClass("s");
				o.css("margin-top","0");
				o.stop(true);
			});
			return false;
		});
		
		$(window).on("scroll resize", function(){ 
			if(!mark){
				var scrollTop = (document.documentElement.scrollTop + document.body.scrollTop);
				if(scrollTop > _option.showTop){
					top.fadeIn(200);
				}else{
					top.fadeOut(200);
				}

			}
		}).trigger("scroll"); 
	}
});
