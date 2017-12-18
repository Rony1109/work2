/* 相册 2014.1.21 by lg*/

var abm = {
	prv	: function(div,num,t){
		/*var slideUl = $(div).parent().find("ul.sma-img"), num = num || 5, t = t || 500, 
			img = slideUl.children(),
			imgTotal = img.length,
			imgWidth = img.last().outerWidth(true),
			slideWidth = parseInt(slideUl.css("margin-left")) + ( imgWidth * num ),
			ulWidth = imgTotal * imgWidth + 30,
			lct = parseInt(-slideWidth/imgWidth),
			bigImg = img.parents(".g-pr").prev(".big-img");
		
		slideUl.css("width",ulWidth);//初化ul宽度
			//console.log(imgTotal);
		if( lct % num == 0){
			var focusImg = img.eq(lct),
				src = focusImg.children("img").attr("bigsrc");
			if( slideWidth <= 0){
				slideUl.stop(true,true);
				slideUl.animate({marginLeft:slideWidth},t,function(){
					bigImg.children("img").attr("src",src);
					focusImg.addClass("hover").siblings('.hover').removeClass("hover");
				
				});
			}else{return false}
		}else{
//			console.log(lct);
		}*/
		
	   var slideUl = $(div).parent().find("ul.sma-img"), ln = slideUl.find('li').length;
	  var $self = slideUl,len=$self.children().length;
		if (!$self.is(":animated")&&ln>6) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.find("li:gt("+(len-6)+")").prependTo($self);
			$self.css({ left: -lineWidth*5 }).animate({ "left": 0 + "px" }, 400);
			this.fimg($self.find("li:first"));
		}  	
	},
	next: function(div,num,t){
		/*var slideUl = $(div).parent().find("ul.sma-img"), num = num || 5, t = t || 500, 
			img = slideUl.children(),
			imgTotal = img.length,
			imgWidth = img.last().outerWidth(true),
			slideWidth = parseInt(slideUl.css("margin-left")) - ( imgWidth * num ),
			ulWidth = imgTotal * imgWidth + 30,
			lct = -slideWidth/imgWidth,
			bigImg = img.parents(".g-pr").prev(".big-img");
			//console.log(slideWidth);
		slideUl.css("width",ulWidth);//初化ul宽度
		
		if( lct % num == 0){
			var focusImg = img.eq(lct),
				src = focusImg.children("img").attr("bigsrc");
			if( -slideWidth+30 < ulWidth ){
				slideUl.stop(true,true);
				slideUl.animate({marginLeft:slideWidth},t,function(){
					bigImg.children("img").attr("src",src);
					focusImg.addClass("hover").siblings('.hover').removeClass("hover");
//					console.log(imgTotal,imgWidth,slideWidth,ulWidth,lct);
				});
			}else{return false}
		}else{
//			console.log(lct);
		}*/
		
		var  $t= this,slideUl = $(div).parent().find("ul.sma-img"),$self = slideUl;
			if (!$self.is(":animated")&&$self.children().length>6) {
				var lineWidth = $self.find("li:first").width(); //获取宽度
				$self.animate({ "left" : -lineWidth*5 +"px" }, 400 , function(){
					$self.css({left:0}).find("li:lt(5)").appendTo($self);
					$t.fimg($self.find("li:first"));
				})
			}
	},
	fimg: function(img){
		var img = $(img),
			bigImg = img.parents(".g-pr").prev(".big-img"),
			src = img.children("img").attr("bigsrc");
		bigImg.children("img").attr("src",src);
		img.addClass("hover").siblings('.hover').removeClass("hover");
	},
	tab	: function(tab,abm){//tab切换
		var tabMenu = $(tab), abm = $(abm),
			lspan = $('<span class="ico-s-lt">&lt;</span>'),
			rspan = $('<span class="ico-s-gt">&gt;</span>'),
			la = $('<a class="ico-s-lt" href="javascript://" onclick="abm.prv(this)">&lt;</a>'),
			ra = $('<a class="ico-s-gt" href="javascript://" onclick="abm.next(this)">&gt;</a>'),
			fs = abm.children().first(),
			fl = fs.find(".sma-img").children().length;
		fl > 5 ? fs.children(".g-pr").append(la,ra) : fs.children(".g-pr").append(lspan,rspan);//初始化第一个按钮
		tabMenu.children().each(function(i){
			$(this).bind("click",function(){
				$(this).addClass("hover").siblings().removeClass("hover");
				var thisNode = abm.children().hide().eq(i),
					imgLength = thisNode.show().find("ul.sma-img").children().length,
					lspanLength = thisNode.find("span.ico-s-lt").length,
					rspanLength = thisNode.find("span.ico-s-gt").length,
					laLength = thisNode.find("a.ico-s-lt").length,
					raLength = thisNode.find("a.ico-s-gt").length;
				if(lspanLength <=0 && rspanLength <=0 && laLength <=0 && raLength <=0 ){//判断按钮是否存在
					imgLength >5 ? thisNode.children(".g-pr").append(la,ra) : thisNode.children(".g-pr").append(lspan,rspan);//插入按钮
				}
			});
		})
	}
};