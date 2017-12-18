/*copyright by zzjwd!QQ:550703900; */
 /* 
 调整宽度
 计算机整个标签的实际宽度，
 这个宽度包括padding,margin的宽度;
 id:标签ID;
 padding:手动输入padding及margin之和;
 */
function ajustW(id,padding){
	var w=0;
	if(!padding){
		padding=0;
	}
	$(id).children().each(function(i){
		w+=$(this).width()+padding;
		//alert($(this).width());
	});
	$(id).width(w);
	//alert(w);
}
/* 
 移动功能;
 idL:向左移动按钮标签;
 idR:向右移动按钮标签;
 step:移协的速试;
 id:移动的内容id;
 */
function moveLR(idL,idR,step,id){
	var timer=null;
	$(idL).bind("click",function(){
		clearTimer(timer);
		var w=$(id).scrollLeft();
		w+=step;
		//alert(w);
		var f_s="easeM('"+id+"',"+w+","+0.3+","+timer+","+1+")";
		//alert(f_s);
		timer=setInterval(f_s,50);
	});
	$(idR).bind("click",function(){
		clearTimer(timer);
		var w=$(id).scrollLeft();
		w-=step;
		var f_s="easeM('"+id+"',"+w+","+0.3+","+timer+","+0+")";
		//alert(f_s);
		timer=setInterval(f_s,50);
	});
}
function easeM(id,tp,speed,timer,flg){//flg:1 eq L,flg:0 eq R;
	var cp=$(id).scrollLeft();
	var p=0;
	if(flg==1){
		p=tp-cp;
	}else{
		p=cp-tp;
	}
	var vp=speed*p;
	if(flg==1){
		cp+=vp;
	}else{
		cp-=vp;
	}
	if(p<=5){
		$(id).scrollLeft(tp);
	}else{
		$(id).scrollLeft(cp);
	}
	if(vp==0){
		clearTimer(timer);
	}
}


function autoMove(step,id){
	var timer1=null;

	var f_s="setMove('"+id+"',"+0+","+step+")";
	//alert("dccc");
	timer1=setInterval(f_s,5000);
	
}//autoMove end;

function setMove(id,flg,step){
	//alert("ddd");
	var w=$(id).scrollLeft();
	w=w+step;
	clearTimer(timer2);
	var timer2=null;
	var f_s="easeM('"+id+"',"+w+","+0.3+","+timer2+","+flg+")";
	timer2=setInterval(f_s,50);
}//setMove end;

function clearTimer(th){
	if(th){
		clearInterval(th),th=null;
	}
}
function easeout_move(id,target_y,speed,flg,timer){
	var s_y=getScroll(id,flg);
	var vy=speed*(s_y-target_y);
	s_y-=vy;
	if(s_y-target_y<=5){
		setScroll(id,flg,target_y);
	}else{
		setScroll(id,flg,s_y);
	}
	if(vy==0){
		clearTimer(timer);
	}
}


/*
		o1: 标签元素
		c : 标签元素显示用样式
		e : 触发事件 如 click mouseover 
	*/
	function tab0(o1,c,e){
		o1.each(function(i){
			$(this).bind(e,function(){
				o1.removeClass(c);
				$(this).addClass(c);
			})
			if ($(this).hasClass(c)) {
				$(this).addClass(c);
			}
		})
	}

/*
		o1: 标签元素
		o2: 内容元素
		c : 标签元素显示用样式
		e : 触发事件 如 click mouseover 
	*/
	function tab01(o1,o2,c,e){
		o1.each(function(i){
			$(this).bind(e,function(){
				o2.hide().eq(i).show();
				o1.removeClass(c);
				$(this).addClass(c);
			})
			if ($(this).hasClass(c)) {
				$(this).addClass(c);
				o2.hide().eq(i).show();
			}
		})
	}
/*
		o1: 标签元素
		o2: 内容元素
		c : 标签元素显示用样式
		e : 触发事件 如 click mouseover 
	*/
	function tab1(o1,o2,c,e){
		o1.each(function(i){
			$(this).bind(e,function(){
				o2.hide().eq(i).show();
				o1.removeClass(c);
				$(this).addClass(c);
			})
			if ($(this).hasClass(c)) {
				$(this).addClass(c);
				o2.hide().eq(i).show();
			}
		})
	}
	/*
		o1: 标签元素
		o2: 内容元素
		c : 标签元素显示用样式
		t1: 标签切换时间
		t2: 内容渐进时间
		a : 内容渐进起始半透明度 0.1~1
		b : 内容渐进结束半透明度 0.1~1
	*/
	function tab2(o1,o2,c,t1,t2,a,b){
		var count=o1.size()-1;
		var now;
		var TimeInterval;
		o1.each(function(i){
			$(this).mouseover(function(){
				o2.hide().eq(i).show();
				o1.removeClass(c);
				$(this).addClass(c);
				window.clearInterval(TimeInterval);
			}).mouseout(function(){
				now = i+1;
				TimeInterval = window.setInterval(changeimage,t1);
			});
			//初始化显示
			if ($(this).hasClass(c)) {
				$(this).addClass(c);
				o2.hide().eq(i).show();
				now = i+1;
			}
		})
		
		TimeInterval = window.setInterval(changeimage,t1);
		function changeimage(){
			if(now>count)now=0;
			o2.hide().eq(now).stop().fadeTo(0,a).fadeTo(t2,b);
			o1.removeClass(c).eq(now).addClass(c);
			now++;
		}
	}
	
	
	/*
		o1: 标签元素
		o2: 内容元素
		o3: 内容元素
		c : 标签元素显示用样式
		e : 触发事件 如 click mouseover 
	*/
	function tab3(o1,o2,o3,c,e){
		o1.each(function(i){
			$(this).bind(e,function(){
				o2.hide().eq(i).show();
				o3.hide().eq(i).show();
				o1.removeClass(c);
				$(this).addClass(c);
			})
			if ($(this).hasClass(c)) {
				$(this).addClass(c);
				o2.hide().eq(i).show();
				o3.hide().eq(i).show();
			}
		})
	}
	/*
		o1: 标签元素
		o2: 内容元素
		o3: 内容元素
		c : 标签元素显示用样式
		t1: 标签切换时间
		t2: 内容渐进时间
		a : 内容渐进起始半透明度 0.1~1
		b : 内容渐进结束半透明度 0.1~1
	*/
	function tab4(o1,o2,o3,c,t1,t2,a,b){
		var count=o1.size()-1;
		var now;
		var TimeInterval;
		o1.each(function(i){
			$(this).mouseover(function(){
				o2.hide().eq(i).show();
				o3.hide().eq(i).show();
				o1.removeClass(c);
				$(this).addClass(c);
				window.clearInterval(TimeInterval);
			}).mouseout(function(){
				now = i+1;
				TimeInterval = window.setInterval(changeimage,t1);
			});
			//初始化显示
			if ($(this).hasClass(c)) {
				$(this).addClass(c);
				o2.hide().eq(i).show();
				o3.hide().eq(i).show();
				now = i+1;
			}
		})
		
		TimeInterval = window.setInterval(changeimage,t1);
		function changeimage(){
			if(now>count)now=0;
			o3.hide().eq(now).show();
			o2.hide().eq(now).stop().fadeTo(0,a).fadeTo(t2,b);
			o1.removeClass(c).eq(now).addClass(c);
			now++;
		}
	}
	//id 要取消的标签组id;
	function cancelStyle(id,styleName,styleValue,isFirst){//isFirst is 1:first,or end;
		if(isFirst){
			$(id+":first").css(styleName,styleValue);
		}else{
			$(id+":last").css(styleName,styleValue);
		}
	}
	//奇偶添加样式;
	function setEvenOddStyle(id,cn_e,cn_o){
			$(id+":even").addClass(cn_e);
			$(id+":odd").addClass(cn_o);
	}//setEvenStyle end;
	
	
	//from id's set remove index is i;
	//id:elements set;
	//i: index of elements set for id;
	function removeStyle(id,i,styleName,styleValue){
		$(id).eq(i).css(styleName,styleValue);
	}//removeStyle end;
	/*
		o1: 标签元素
		o2: 内容元素
		c : 标签元素显示用样式
		e : 触发事件 如 click mouseover 
	*/
	function tab05(o1,o2,c,e){
		o2.hide();
		o1.each(function(i){
			$(this).bind(e,function(){
				o2.hide().eq(i).show().mouseleave(function(){
					o2.hide();
					o1.removeClass(c);
				});
				o1.removeClass(c);
				$(this).addClass(c);
			});
			if ($(this).hasClass(c)) {
				$(this).addClass(c);
				o2.hide().eq(i).show();
			}
		});
	}
	/*
	id:元素id;
	*/
	function setHover(id,cN){
		$(id).mouseover(function(){
			$(this).addClass(cN);
		}).mouseout(function(){
			$(this).removeClass(cN);
		});
	}
	
	function setOutHover(id,cN){
		$(id).mouseover(function(){
			$(this).removeClass(cN);
		}).mouseout(function(){
			$(this).addClass(cN);
		});
	}
	
	//ajust current href,then according to it to call js;
	
	function doCurrentHref(){
		//alert(document.URL);
		var strHref=arguments[0]?arguments[0]:"";
		var fn=arguments[1]?arguments[1]:function(){};
		if(document.URL.indexOf(strHref)>=0){
			//alert("jfoafsd");
			fn();
		}
	}// ajustCurrentHref end;
	
	//id: for elements;
	//cns:prefix of styleName ;eaxmple:top_1,top_2,"top_" is cns;
	//num:number of elements;
	function setStyleForElements(cns,id,num){
		$(id).each(function(i){
			var j=i%num;
			$(this).addClass(cns+eval(j+1));
		});
	}//setStyle end;
	
	//id:object of operation;
	//flag:true is add operation,false is sub operation;
	//valId:operated object by id;
	function addOrSub(addId,subId,valId){
			$(addId).click(function(){
				$(valId).val(parseInt($(valId).val())+1);
			});
			$(subId).click(function(){
				if(parseInt($(valId).val())>0){
					$(valId).val(parseInt($(valId).val())-1);
				}
			});
/*
 copyright by zzjwd!QQ:550703900;
 */
	}//addOrSub end;
/*
trigger upload file button;
	*/
	function triggerEvent(evt,id,obId,valId){
		$(id).click(function(){
			$(obId).trigger(evt);
		});
	}//triggerEvent end;
	
	function setAutoMove(){
		var focusScroll_01 = new ScrollPic();
			  focusScroll_01.scrollContId   = "FS_Cont_01"; //内容容器ID
			  focusScroll_01.arrLeftId      = "FS_arr_left_01";//左箭头ID
			  focusScroll_01.arrRightId     = "FS_arr_right_01"; //右箭头ID

			  focusScroll_01.dotListId      = "FS_numList_01";//点列表ID
			  focusScroll_01.dotClassName   = "numB";//点className
			  focusScroll_01.dotOnClassName	= "curB";//当前点className
			  focusScroll_01.listType		= "number";//列表类型(number:数字，其它为空)
			  focusScroll_01.listEvent      = "onmouseover"; //切换事件

			  focusScroll_01.frameWidth     = 1000;//显示框宽度
			  focusScroll_01.pageWidth      = 1000; //翻页宽度
			  focusScroll_01.upright        = false; //垂直滚动
			  focusScroll_01.speed          = 20; //移动速度(单位毫秒，越小越快)
			  focusScroll_01.space          = 30; //每次移动像素(单位px，越大越快)
			  focusScroll_01.autoPlay       = true; //自动播放
			  focusScroll_01.autoPlayTime   = 5; //自动播放间隔时间(秒)
			  focusScroll_01.circularly     = true;
			  focusScroll_01.initialize(); //初始化
			  focusScroll_01.onpagechange = function(){
			   $(".scroll_info").hide();
			   
			   $("#txt0"+(focusScroll_01.pageIndex+1)).show();
			  };
	
	}//setAutoMove end;
	
	function slideDiv(lbt,cid,cname,evt){
	$(lbt).each(function(i){
		if($(this).hasClass(cname)){
			$(cid).hide();
			$(cid).eq(i).show();
		}
		$(this).bind(evt,function(){
			$(lbt).removeClass(cname);
			$(this).addClass(cname);
			$(cid).hide();
		$(cid).eq(i).animate({ 
		    width: "611"
		  },function(){
		  	$(this).show();
		  });
		});
	});
}//sliedDiv end;
function cycleTab(o1,o2,c,t1,t2,a,b){
		var count=o1.size()-1;
		var now;
		var TimeInterval;
		o1.each(function(i){
			$(this).mouseover(function(){
				o2.hide().eq(i).show();
				o1.removeClass(c);
				$(this).addClass(c);
				window.clearInterval(TimeInterval);
			}).mouseout(function(){
				now = i+1;
				TimeInterval = window.setInterval(changeimage,t1);
			});
			//初始化显示
			if ($(this).hasClass(c)) {
				$(this).addClass(c);
				o2.hide().eq(i).show();
				now = i+1;
			}
		});
		
		TimeInterval = window.setInterval(changeimage,t1);
		function changeimage(){
			if(now>count)now=0;
			o2.hide().eq(now).stop().fadeTo(0,a).fadeTo(t2,b);
			o1.removeClass(c).eq(now).addClass(c);
			now++;
		}
	}//cycleTab end;
	