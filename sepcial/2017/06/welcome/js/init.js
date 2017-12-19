define(function(require, exports, module) {
	require('../js/jquery.scrollTo.min');
	require('../js/jquery.mousewheel.min');

	//导航
	var rightNav = {
		init:function(){
			this.defaultIndex = 0;
			this.dom = $(".mod-nav-list");
			this.lis = this.dom.children();
			var index = this.getDefaultIndex();
			this.switchIndex(index);
			this.initEvent();
		},
		getDefaultIndex:function(){
			var h =$(window).height();
			var scrollTop =$(window).scrollTop();
			var index = 0;
			for(var i = 0,len=9;i<len;i++){
				if(scrollTop>=i*h && scrollTop<(i+1)*h){
					index=i;
					break;
				}
			}
			return index;
		},
		switchIndex:function(index){
			if(typeof(index) == 'undefined'){
				index = this.defaultIndex;
			}
			this.switchUi(index);
		},
		switchUi:function(index){
			if(index==0){
				this.dom.hide();
			}else{
				this.switchNav(index);
				this.dom.show();
			}
		},
		switchNav:function(index){
			index = index==0?9:index-1; //第一屏不显示后跳过去
			var currentLi = this.lis.eq(index);
			currentLi.addClass("current").siblings().removeClass("current");
		},
		initEvent(){
			this.dom.find("li").hover(function(){
				$(this).addClass("hovered");
			},function(){
				$(this).removeClass("hovered");
			});
		}
	};
	//二维码
	var qcComponents = {
		init:function(){
			this.tabIndex =0;
			this.maxIndex =2;
			this.start =false;
			this.startAnimate();
			this.initEvent();
		},
		switchQc:function(i){
			var navA = $(".mod-section-page7 .qr-nav a");
			var qcMains = $(".mod-section-page7 .dl .qr");
			var activeTarget = navA.eq(i);
			activeTarget.addClass("active");
			activeTarget.parent().siblings().find("a").removeClass("active");
			var qcTarget = qcMains.eq(i);
			qcMains.removeClass("active_qr");
			qcTarget.addClass("active_qr");
		},
		startAnimate:function(){
			var self  =this;
			self.timer = setInterval(function(){
				self.start =true;
				self.tabIndex++;
				self.tabIndex = self.tabIndex>self.maxIndex?0:self.tabIndex;
				self.switchQc(self.tabIndex);
			},3000);
		},
		initEvent:function(){
			var self = this;
			$(".mod-section-page7 .qr-nav a").hover(function(){
				clearInterval(self.timer);
				self.start =false;
				var activeTarget = $(this);
				var i = activeTarget.parent().index();
				self.tabIndex = i;
				self.switchQc(self.tabIndex);
			},function(){
				if(!self.start){
					self.startAnimate();
				}
			});
		}
	};

	//类似九宫格卡片
	var companyCard ={
		init:function(){
			this.initEvent();
		},
		initEvent:function(){
			var allCard = $(".mod-section-page8 .card");
			$(".mod-section-page8 .card").hover(function(e){
				$(this).find(".company-logo").fadeOut(500);
			},function(){
				$(this).find(".company-logo").fadeIn(500);
			});


		}
	};

	//滚动改变导航
	var scrollComponents = {
		init:function(){
			this.initEvent();
		},
		initEvent:function(){
			$(window).scroll(function(){
				// console.log("do scroll");
				var h =$(window).height();
				var scrollTop =$(window).scrollTop();
				var index = 0;
				for(var i = 0,len=9;i<len;i++){
					if(scrollTop>=i*h && scrollTop<(i+1)*h){
						index=i;
						break;
					}
				}
				rightNav.switchIndex(index);
			});
			var self = this;
			self.scrolling = false;
			// $(window).on('mousewheel', function(event,delta) {
			//     // console.log(event.deltaX, event.deltaY, event.deltaFactor,delta);
			//     var dir = delta > 0 ? 'Up' : 'Down' ;
			//     event.preventDefault(); 
			//     if(self.scrolling){
			//     	return false;
			//     }
			//     var scrollTop =$(window).scrollTop();
			//     var h =$(window).height();
			//     var index = 0;
			// 	for(var i = 0,len=9;i<len;i++){
			// 		if(scrollTop>=i*h && scrollTop<(i+1)*h){
			// 			index=i;
			// 			break;
			// 		}
			// 	}

			// 	var scrollto =dir=='Up'? (index-1)*h:(index+1)*h;
			// 	self.scrolling =true;
			// 	$(window).animate({scrollTop: scrollto}, 500,function(){
			// 		self.scrolling =false;
			// 	});
			// });

		}
	};

	

	//流星暂时写第1屏
	var meteorComponents = {
		init:function(){
			$(".mod-star-list .meteor .box").addClass("action");
		}
	};

	var lightComponents = {
		init:function(){
			var lightList = $('#lightList li');
	        var count = 0;
	        var time = 1000;
	        var animationFn = function(){
	            if (count == lightList.length) {
	                lightList.each(function(i){
	                    $(this).addClass('noAction');
	                });
	            }else {
	                lightList.eq(count).removeClass('noAction');
	            }
	            if (count == lightList.length - 1) {
	                time = 10000;
	            }else {
	                time = 1000;
	            }
	            count = (count + 1) % (lightList.length + 1);
	            setTimeout(animationFn, time);
	        };
	        setTimeout(animationFn, 2000);
		}
	};




	$(function(){
		rightNav.init();
		qcComponents.init();
		companyCard.init();
		scrollComponents.init();
		meteorComponents.init();
		lightComponents.init();
	});

});
