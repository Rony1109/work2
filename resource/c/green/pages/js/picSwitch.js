define(function(require, exports, module) {
	var farm = {
		picSwitch : function(ctrlTags,picTags,event,style){
			var 
				auto = 0,
				event = event || "click",
				style = style || "cur",
				length = $(ctrlTags).length,
				time = 3000,
				play = function(){
					autoPlay(auto);
					auto = (auto == length-1) ? 0 : auto + 1;
				}

			$(ctrlTags).each(function(){
				var 
					$t = $(this),
					index = $t.index();
				$t.bind(event,function(){
					auto = index;
					autoPlay(auto);
				});
			}).hover(function(){
				clearInterval(playing);				
			},function(){
				playing = setInterval(play,time);
			});

			function autoPlay(n){
				$(ctrlTags).eq(n).addClass(style).siblings().removeClass(style);
				$(picTags).eq(n).fadeIn().siblings().fadeOut();
			}

			var playing = setInterval(play,time);
		},
		slide : function(options){
			for(var o in options){
				this[o] = options[o];
			}
			var 
				slides = $(this.slides),
				ctrls = $(this.ctrls),
				length = ctrls.find("li").length,
				left = 0,
				width = this.ctrls_width,
				totalWidth = length * width,
				auto = 0;
			ctrls.find("ul").width(totalWidth);
			
			$(this.toPrev).bind('click',function() {				
				if(left < 0){
					left = left + width;
					ctrls.find("ul").animate({
			            left: left
			        },500);
				}
			});

		    $(this.toNext).bind("click",function(){
		        if(Math.abs(left) <  totalWidth - 640){
		        	left = left - width;
		        	ctrls.find("ul").animate({
				        left: left
				    },500);
		        }
		    });

		    ctrls.find("li").each(function() {
		    	var 
		    		$t = $(this),
		    		index = $t.index();
		    	$t.bind("click",function(){
		    		show(ctrls.find("li"),slides.find("li"),index);
		    		auto = index;
		    	});
		    });

		    function show(ctrls,slides,n){
				$(ctrls).eq(n).addClass("cur").siblings().removeClass("cur");
				$(slides).eq(n).fadeIn().siblings().fadeOut();
			}
		}
	}

	farm.picSwitch(".f_e_side li",".f_example .pics li");
	farm.slide({
		slides : ".f_base",
		ctrls : ".f_b_list",
		toPrev : ".f_b_list .l",
		toNext : ".f_b_list .r",
		ctrls_width : 128
	})
});