define(function(require, exports, module) {
	var jxtj={
		touch:function(obj,offset,callback){
			var start,
				end,
				isLock=false,
				isMove=false,
				isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
            	hasTouch = 'ontouchstart' in window && !isTouchPad;
				objparent=obj.parent();
			
			var fn={
				//移动容器
				translate:function(diff){
					obj.css({
                        "-webkit-transform": "translate(0," + diff + "px)",
                        "transform": "translate(0," + diff + "px)"
                    });
				},
				//设置效果时间
				setTranslition:function(time){
					obj.css({
                        "-webkit-transition": "all " + time + "s",
                        "transition": "all " + time + "s"
                    });
				},
				//返回到初始位置
				backDf:function(){
					fn.translate(0 - offset);
                    //标识操作完成
                    isLock = false;
				}
			};
			
			//滑动开始
			obj.on("touchstart", function (e) {
				if (objparent.scrollTop() <= 0 && !isLock) {
					var even = typeof event == "undefined" ? e : event;
					
					//标识操作进行中
					isLock = true;
					isMove = true;
					
					//保存当前鼠标Y坐标
					start = hasTouch ? even.touches[0].pageY : even.pageY;
					
					//消除滑块动画时间
					fn.setTranslition(0);
				}
			});

			//滑动中
			obj.on("touchmove", function (e) {
				if (objparent.scrollTop() <= 0 && isMove) {
					var even = typeof event == "undefined" ? e : event;
	
					//保存当前鼠标Y坐标
					end = hasTouch ? even.touches[0].pageY : even.pageY;
	
					if (start < end) {
						even.preventDefault();
						//消除滑块动画时间
						fn.setTranslition(0);
						//移动滑块
						fn.translate(end - start - offset);
					}
	
				}
			});


			//滑动结束
			obj.on("touchend", function (e) {
				if (isMove) {
					isMove = false;
					//判断滑动距离是否大于等于指定值
					if (end - start >= offset) {
						//设置滑块回弹时间
						fn.setTranslition(1);
						//保留提示部分
						fn.translate(0);
	
						//执行回调函数
						if (typeof callback == "function") {
							callback.call(fn, e);
						}
					} else {
						//返回初始状态
						fn.backDf();
					}
				}
			});
		},
		init:function(){
			jxtj.touch($('#jxtj'),61,function(){
				var that = this;

				setTimeout(function () {
					that.backDf.call();
				}, 2000);
			});
		}
	};
	
	jxtj.init();
	
});