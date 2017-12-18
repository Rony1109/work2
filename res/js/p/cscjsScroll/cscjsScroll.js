(function ($) {
	$.fn.cscjsScroll = function (o) {
		var settings = {
			showArrows:true,	//是否显示,向上向下按钮
			wheelSpeed:18,		//按钮,键盘滚动比例参数
			IntervalIime:30,	//拖动滑块时，定时器间隔
			shortcutKey:true,	//是否启用,上下箭头,翻页等快捷键
			shortcutKeySpeed:0	//平滑滚动时间,0为关闭
		};
		var self,self_data,set,Scroll_main,Scroll_Outside,Scroll_y,Scroll_y_Drag,Scroll_y_Drag_Bar,Scroll_y_Up,Scroll_y_Down,ArrowDirection;
		var ArrowsInterval,KeyIntervalArr,DragInterval,TextMoveInterval;
		
		var set = $.extend({}, settings, o || {});
		init(this);
		function init(e) {
			self = $(e);
			self.css({"overflow": "auto"}); 
			self_data = {
				height:self.height(),
				innerHeight:self.innerHeight(),
				Scroll_main_Height:0,
				Scroll_main_max:0,
				Scroll_y_show:0,
				Scroll_y_Drag_height:0,
				Scroll_y_Bar_height:0,
				Scroll_y_max:0,
				WheelMultiplier:0,
				dragPosition:0,
				mouseInBarposition:0
			};			
			
			self.find(".Scroll_main").length || self.wrapInner("<div class='Scroll_main'></div>"); 
			Scroll_main = self.find(".Scroll_main");
			if (Scroll_main.height() > self_data.height) {
				self.attr('tabindex', 0);
				self.css({"position":"relative","outline":"none"}); 
				self.find(".Scroll_Outside").length || Scroll_main.wrap("<div class='Scroll_Outside' style='position:relative; overflow:hidden; width:100%; height:100%'></div>"); 
				Scroll_Outside = self.find(".Scroll_Outside")
				Scroll_main.css({"position":"relative"}); 
				
				self.find(".Scroll_y").length || ShowScroll_y();//垂直方向滚动条模仿
				SetScroll_size();//各数据初始化
				SetScroll_bind();
				
				self_data.Scroll_y_show = 1;
				self_data.Scroll_main_max = self_data.Scroll_main_Height - self_data.height;//内容显示区最大活动空间
				self_data.Scroll_y_max = self_data.Scroll_y_Drag_height - self_data.Scroll_y_Bar_height;//计算滚动条最大活动空间
				self_data.WheelMultiplier = 2 * set.wheelSpeed * self_data.Scroll_y_max / self_data.Scroll_main_Height; //计算滚动条滚动比例值
				//console.log("滚动比例参数:" + "2*" + set.wheelSpeed + "*" + self_data.Scroll_y_max + "/" +self_data.Scroll_main_Height + "=" + self_data.WheelMultiplier);
				
			}
		};
		//生成html结构
		function ShowScroll_y() {
			self.find(".Scroll_y").length || self.append("<div class='Scroll_y' style=' position:absolute; right:0px; top:0px;'></div>");
			Scroll_y = self.find(".Scroll_y");
			
			self.css({ "width": self.width() - Scroll_y.width() + "px", "padding-right": parseInt(self.css("padding-right").replace("px","")) + Scroll_y.width() + "px"}); 
			
			if (set.showArrows && Scroll_y.find(".Scroll_y_Up").length<=0) Scroll_y.append("<div class='Scroll_y_Up'></div>");//向按钮
			
			Scroll_y.find(".Scroll_y_Drag").length || Scroll_y.append("<div class='Scroll_y_Drag' style='position:relative; overflow:hidden;'></div>");
			Scroll_y_Drag = Scroll_y.find(".Scroll_y_Drag");
			
			Scroll_y.find(".Scroll_y_Drag_Bar").length || Scroll_y_Drag.append("<div class='Scroll_y_Drag_Bar' style=' position:relative;'></div>");
			Scroll_y_Drag_Bar = Scroll_y.find(".Scroll_y_Drag_Bar");
			
			Scroll_y_Drag_Bar.find(".Scroll_y_DBT") || Scroll_y_Drag_Bar.append("<div class='Scroll_y_DBT'></div>")
			.append("<div class='Scroll_y_DBM'><div class='Scroll_y_DBMB'></div></div>")
			.append("<div class='Scroll_y_DBB'></div>");

			if (set.showArrows && Scroll_y.find(".Scroll_y_Down").length<=0) Scroll_y.append("<div class='Scroll_y_Down'></div>");//向下按钮
			
			Scroll_y_Up = Scroll_y.find(".Scroll_y_Up");
			Scroll_y_Down = Scroll_y.find(".Scroll_y_Down");
		}
		
		//记算比例，高度
		function SetScroll_size(){
			with (Scroll_y){
				var Scroll_y_Drag_height = Scroll_y_Drag.height();
				self_data.Scroll_main_Height = Scroll_main.height();
				css({"height": self_data.innerHeight});
				Scroll_y_Drag.height(self_data.innerHeight - Scroll_y_Up.outerHeight() - Scroll_y_Down.outerHeight() + "px");
				
				if (Scroll_y_Drag.outerHeight() > Scroll_y_Drag_height){
					Scroll_y_Drag.height(Scroll_y_Drag_height - (Scroll_y_Drag.outerHeight() - Scroll_y_Drag_height) + "px")
				};
				
				self_data.Scroll_y_Drag_height = Scroll_y_Drag.height();
				
				var Proportion =  self_data.height / self_data.Scroll_main_Height;
				Scroll_y_Drag_Bar.height(Scroll_y_Drag.outerHeight() * Proportion  + "px");
				self_data.Scroll_y_Bar_height = Scroll_y_Drag_Bar.outerHeight();
				
				var Scroll_y_DBT = find(".Scroll_y_DBT");
				var Scroll_y_DBM = find(".Scroll_y_DBM");
				var Scroll_y_DBMB = find(".Scroll_y_DBMB");
				var Scroll_y_DBB = find(".Scroll_y_DBB");
				
				var BarMinHeight = Scroll_y_DBT.outerHeight() + Scroll_y_DBM.outerHeight() + Scroll_y_DBB.outerHeight();
				
				if (BarMinHeight >= Scroll_y_Drag_Bar.height()){
					Scroll_y_Drag_Bar.height(BarMinHeight + "px");
					self_data.Scroll_y_Bar_height = Scroll_y_Drag_Bar.outerHeight();
				}else{					
					Scroll_y_DBM.height(Scroll_y_Drag_Bar.height() - BarMinHeight + Scroll_y_DBM.height() + "px");
				}
			}
		};
		
		//事件绑定
		function SetScroll_bind(){
			//绑定快捷键
			if(set.shortcutKey){
				self.bind("keydown",function(e){	
					//console.log(e.keyCode);
					switch (e.keyCode) {
						case 38: //↑
							ArrowsUpdate();
							if (!KeyIntervalArr) KeyIntervalArr = setInterval(Arrowsclick,set.IntervalIime);
							return false;
						case 40: //↓
							ArrowsDowndate();	
							if (!KeyIntervalArr) KeyIntervalArr = setInterval(Arrowsclick,set.IntervalIime);
							return false;
						case 33: //PageUp
							PageUP();
							return false;
						case 34: //PageDown
							PageDown();
							return false;
						case 35: //End
							toEnd();
							return false;
						case 36: //Home
							toHome()
							return false;
						default:
					}
				}).bind('keyup',function(e) {
					var keycodes = ["33","34","35","36","38","40"], 
						stop_mark = function(){for(var i in keycodes){if(e.keyCode == keycodes[i]){return true};}}();
					if (stop_mark) {
						resetArrowsClsaa();
						clearInterval(KeyIntervalArr);
						return false;
					}
				});
			}
			
			//向上按钮
			var Scroll_y_Up_On = 0;
			Scroll_y_Up.bind("mouseenter",function(){
				if (Scroll_y_Up_On){
					ArrowsUpdate();
					ArrowsInterval = setInterval(Arrowsclick,set.IntervalIime);
				}
			})
			.bind("mouseleave",ArrowsLeave)
			.bind("mousedown", function(){
				Scroll_y_Up_On = 1;
				ArrowsUpdate();
				ArrowsMouseDown();
			});	
			
			//向下按钮
			var Scroll_y_Down_On = 0;
			Scroll_y_Down.bind("mouseenter",function(){
				if (Scroll_y_Down_On){
					ArrowsDowndate();
					ArrowsInterval = setInterval(Arrowsclick,set.IntervalIime);
				}
			})
			.bind("mouseleave",ArrowsLeave)
			.bind("mousedown", function(){
				Scroll_y_Down_On = 1;
				ArrowsDowndate();
				ArrowsMouseDown();
			});
			
			function ArrowsLeave(){
				if (Scroll_y_Up_On) resetArrowsClsaa();
				if (Scroll_y_Down_On) resetArrowsClsaa();
			};
			
			function ArrowsMouseDown(){
				ignoreNativeDrag();
				ArrowsInterval = setInterval(Arrowsclick,set.IntervalIime);
				ArrowsToDocumentMouseup();
			};
			
			function ArrowsToDocumentMouseup(){
				$(document).bind("mouseup",function(){					
					Scroll_y_Up_On = 0;
					Scroll_y_Down_On = 0;
					resetArrowsClsaa();
					$(document).unbind("mouseup");
					ResumeNativeDrag();
				})
			};
			
			var Scroll_y_Drag_Down_On = 0;
			Scroll_y_Drag.bind("mouseenter",function(e){
				if (Scroll_y_Drag_Down_On){DraglickDirection(e);DragInterval = setInterval(Draglick,set.IntervalIime);}
			}).bind("mouseleave",Dragmouseleave)
			.bind("mouseup", function(e){
				Scroll_y_Drag_Down_On = 0;
				Scroll_y_Drag_Bar.removeClass("Scroll_y_Drag_Bar_D");
				clearInterval(DragInterval);
			}).bind("mousedown",Scroll_y_Drag_mousedown);	
			
			var Scroll_y_Bar_Down_On = 0;
			Scroll_y_Drag_Bar.bind("mousedown", function(e){
				Scroll_y_Drag.unbind("mousedown").unbind("mouseleave");
				Scroll_y_Drag_Bar.addClass("Scroll_y_Drag_Bar_D");
				Scroll_y_Bar_Down_On = 1;
				self_data.mouseInBarposition = getPos(e,"Y") - Scroll_y_Drag.offset().top - Scroll_y_Drag_Bar.position().top;
				ignoreNativeDrag();
				
				$(document).bind("mouseup",function(){					
					Scroll_y_Bar_Down_On = 0;
					Scroll_y_Drag_Bar.removeClass("Scroll_y_Drag_Bar_D");
					Scroll_y_Drag.bind("mousedown",Scroll_y_Drag_mousedown).bind("mouseleave",Dragmouseleave);	
					$(document).unbind("mouseup").unbind("mousemove");
					ResumeNativeDrag();
				})
				.bind("mousemove", function(e){if (Scroll_y_Bar_Down_On) Barclick(e);});
				
			}).bind("mousemove", function(e){
				if (Scroll_y_Bar_Down_On) Barclick(e);
			});	
			
			self.bind('mousewheel',mousewheel).bind('DOMMouseScroll',mousewheel);
			//self.bind('mousewheel',function(event){alert(window.event.wheelDelta  + " " + window.event.detail)}).bind('DOMMouseScroll',mousewheel);
			var selectDirection = 0;
			var moveIncrease = 1;
			Scroll_Outside.bind("mousedown",function(){
				var maxIntervalTime = 100;
				var minIntervalTime = 1;
				
				$(document).bind("mouseup",function(){	
					clearInterval(TextMoveInterval);

					$(this).unbind("mouseup").unbind("mousemove");	
				})
				.bind("mousemove", function(e){
					var mouseposition = getPos(e,"Y") - Scroll_Outside.offset().top;
					selectDirection = mouseposition < 0  ? -1 : (mouseposition > Scroll_Outside.height()) ? 1 : 0;
					if (selectDirection){
						var marginLong = mouseposition < 0 ? -mouseposition : mouseposition - Scroll_Outside.height();
						moveIncrease = marginLong / 10;
						clearInterval(TextMoveInterval);
						TextMove();
						TextMoveInterval = setInterval(TextMove,50);
					}
				});				
			});

			function Dragmouseleave(){
				clearInterval(DragInterval)
				$(document).bind("mouseup",function(){
					Scroll_y_Drag_Down_On = 0;
					Scroll_y_Drag_Bar.removeClass("Scroll_y_Drag_Bar_D");
					clearInterval(DragInterval);
					ResumeNativeDrag();
				})
			};
			
			function Scroll_y_Drag_mousedown(e){
				Scroll_y_Drag_Bar.addClass("Scroll_y_Drag_Bar_D");
				ignoreNativeDrag();
				Scroll_y_Drag_Down_On = 1;
				DraglickDirection(e);
				DragInterval = setInterval(Draglick,set.IntervalIime);
				Scroll_y_Drag_Bar.bind("mousemove", function(e){moveY = getPos(e,"Y")});
			};
			
			//鼠标滚轮处理
			function mousewheel(e){
				e = e || window.event;
				var ev = e.originalEvent || e;
				var delta = ev.wheelDelta ? (ev.wheelDelta / 120) : (- ev.detail / 3);
				var d = self_data.dragPosition;
				positionDrag(self_data.dragPosition - delta * self_data.WheelMultiplier);
				var dragOccured = d != self_data.dragPosition;
				return !dragOccured;
			};	
			
			var TextMove = function(){				
				var Scroll_main_position = Scroll_main.position().top - selectDirection * moveIncrease;
				Scroll_main_position = Scroll_main_position < -self_data.Scroll_main_max ? -self_data.Scroll_main_max : Scroll_main_position > 0 ? 0 : Scroll_main_position;
				self_data.dragPosition = self_data.Scroll_y_max * (-Scroll_main_position / self_data.Scroll_main_max);
				
				Scroll_main.css({'top':Scroll_main_position+'px'});
				Scroll_y_Drag_Bar.css({'top':self_data.dragPosition+'px'});
			}
		};
		
		var ignoreNativeDrag = function() {
			$('html').bind('dragstart',function(){return false;})
				.bind('selectstart',function(){return false;});
		};
		var ResumeNativeDrag = function() {
			$('html').unbind('dragstart').unbind('selectstart');
		};
		
		/*键盘按键事件处理*/
		function resetArrowsClsaa(){
			clearInterval(ArrowsInterval);
			if (set.showArrows){
				Scroll_y_Up.removeClass("Scroll_y_Up_D");
				Scroll_y_Down.removeClass("Scroll_y_Down_D");
			}
		};
		var ArrowsUpdate = function(){
			if (set.showArrows) Scroll_y_Up.addClass("Scroll_y_Up_D");
			ArrowDirection = -1;
			Arrowsclick();
		};
		var ArrowsDowndate = function(){
			if (set.showArrows) Scroll_y_Down.addClass("Scroll_y_Down_D");
			ArrowDirection = 1;
			Arrowsclick();
		};
		var PageUP = function(){
			var Scroll_main_position = Scroll_main.position().top + self_data.innerHeight;
			setPosition(Scroll_main_position);
		}
		var PageDown = function(){
			var Scroll_main_position = Scroll_main.position().top - self_data.innerHeight;
			setPosition(Scroll_main_position);
		}
		var toEnd = function(){
			setPosition(-self_data.Scroll_main_max);
		}
		var toHome = function(){
			setPosition(0);
		}

		var moveY = 0;
		var DraglickDirection = function(e){
			moveY = getPos(e,"Y");
			Draglick();
		};
		
		var Arrowsclick = function() {
			positionDrag(self_data.dragPosition + ArrowDirection * self_data.WheelMultiplier);
		};
		
		var Draglick = function() {
			var mouseposition = moveY - Scroll_y_Drag.offset().top;
			var BarHalf = Scroll_y_Drag_Bar.position().top + self_data.Scroll_y_Bar_height / 2;	
			ArrowDirection = (mouseposition < BarHalf - self_data.WheelMultiplier / 2 ) ? -1 :(mouseposition > BarHalf + self_data.WheelMultiplier / 2) ? 1 : 0;
			positionDrag(self_data.dragPosition + ArrowDirection * self_data.WheelMultiplier);
			if (!ArrowDirection || (self_data.dragPosition == 0) || (self_data.dragPosition == self_data.Scroll_y_max)){
				clearInterval(DragInterval);
				return false;
			}
		};
		
		function Barclick(e){
			var mouseposition = getPos(e,"Y") - Scroll_y_Drag.offset().top;
			positionDrag(mouseposition - self_data.mouseInBarposition);	
		}
		
		//根据主体 定位滚动条
		var setPosition = function(Itop){
			Scroll_main.stop();
			Scroll_y_Drag_Bar.stop();
			Itop = Itop > 0 ? 0 : (Itop < -self_data.Scroll_main_max ? -self_data.Scroll_main_max : Itop);
			self_data.dragPosition = self_data.Scroll_y_max * (-Itop / self_data.Scroll_main_max);
			Scroll_main.animate({'top':Itop+'px'},set.shortcutKeySpeed);
			//Scroll_y_Drag_Bar.css({'top':self_data.dragPosition+'px'});
			Scroll_y_Drag_Bar.animate({'top':self_data.dragPosition+'px'},set.shortcutKeySpeed);
		}
		
		// 根据滚动条位置定位主体
		var positionDrag = function(destY){
			destY = destY < 0 ? 0 : (destY > self_data.Scroll_y_max ? self_data.Scroll_y_max : destY);
			self_data.dragPosition = destY;	
			Scroll_y_Drag_Bar.css({'top':destY+'px'});
			var p = destY / self_data.Scroll_y_max;
			Scroll_main.css({'top':((self_data.height-self_data.Scroll_main_Height)*p ) + 'px'});
		};

		var getPos = function (event, c) {
			var p = c.toUpperCase() == 'X' ? 'Left' : 'Top';
			return event['page' + c] || (event['client' + c] + (document.documentElement['scroll' + p] || document.body['scroll' + p])) || 0;
		};
    };	
})(jQuery);