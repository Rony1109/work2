define(function(require){
	var fn = require('./shadow');
	var slide = require('./slide');
	var submit = require('./submit');
	require('./marquee');
	fn.shadow('.shadow','.dialog' , '.addr .submit');
	fn.slide('.ctn2 ul.right li', '#alt_tip', '.ctn2 .img img');
	slide({
		elem : '.img ul li',
		thumb : '.img ol li',
		parentEl : '.top_ctn .img',
	});
	//fn.marquee('.ctn3 ul');
	$('.autoplay').kxbdMarquee();

	$('.autoplay ul li').click(function(){
		var path = $(this).find('a img').attr('src')
		$('.ctn3 .left img').attr('src', path);
		return false;
	});
	submit('.dialog .form form');
	//console.info(marquee);
});;

/**
* @classDescription 模拟Marquee，无间断滚动内容
* @author Aken Li(www.kxbd.com)
* @date 2009-07-17
* @DOM
* <div id="marquee">
*    <ul>
*       <li></li>
*       <li></li>
*    </ul>
* </div>
* @CSS
* #marquee {width:200px;height:50px;overflow:hidden;}
* @Usage
* $('#marquee').kxbdMarquee(options);
* @options
*   delay:等待多久后滚动，单位秒
*   isEqual:true,//所有滚动的元素长宽是否相等,true,false
* loop: 0,//循环滚动次数，0时无限
*   direction: 'left',//滚动方向，'left','right','up','down'
*   scrollAmount:1,//步长
*   scrollDelay:20//时长
*   controlBtn:{left:'#goL',right:'#goR'},//控制加速滚动的按钮ID，有四个属性left,right,up,down分别对应四个方向
*   newAmount:4,//加速滚动的步长
*   eventA:'mouseenter',//鼠标事件，加速
*   eventB:'mouseleave'//鼠标事件，原速
*/
(function($){

$.fn.kxbdMarquee = function(options){
   var opts = $.extend({},$.fn.kxbdMarquee.defaults, options);
  
   return this.each(function(){
    var $marquee = $(this);//滚动元素容器
    var _scrollObj = $marquee.get(0);//滚动元素容器DOM
    var scrollW = $marquee.width();//滚动元素容器的宽度
    var scrollH = $marquee.height();//滚动元素容器的高度
    var $element = $marquee.children(); //滚动元素
    var $kids = $element.children();//滚动子元素
    var scrollSize=0;//滚动元素尺寸
    var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//滚动类型，1左右，0上下

    //防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
    $element.css(_type?'width':'height',10000);
    //获取滚动元素的尺寸
    if (opts.isEqual) {
     scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
    }else{
     $kids.each(function(){
      scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
     });
    }
    //滚动元素总尺寸小于容器尺寸，不滚动
    if (scrollSize<(_type?scrollW:scrollH)) return;
    //克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
    $element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
   
    var numMoved = 0;
    function scrollFunc(){
     var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
     if (opts.loop > 0) {
      numMoved+=opts.scrollAmount;
      if(numMoved>scrollSize*opts.loop){
       _scrollObj[_dir] = 0;
       return clearInterval(moveId);
      }
     }
     if(opts.direction == 'left' || opts.direction == 'up'){
      var newPos = _scrollObj[_dir] + opts.scrollAmount;
      if(newPos>=scrollSize){
       newPos -= scrollSize;
      }
      _scrollObj[_dir] = newPos;
     }else{
      var newPos = _scrollObj[_dir] - opts.scrollAmount;
      if(newPos<=0){
       newPos += scrollSize;
      }
      _scrollObj[_dir] = newPos;
     }
    };
    //滚动开始
    var moveId;
    if(opts.delay>0){
     setTimeout(function(){
      moveId = setInterval(scrollFunc, opts.scrollDelay);
     },opts.delay*1000);
    }else{
     moveId = setInterval(scrollFunc, opts.scrollDelay);
    }
   
    //鼠标划过停止滚动
    $marquee.hover(
     function(){
      clearInterval(moveId);
     },
     function(){
      clearInterval(moveId);
      moveId = setInterval(scrollFunc, opts.scrollDelay);
     }
    );
   
    //控制加速运动
    if(opts.controlBtn){
     $.each(opts.controlBtn, function(i,val){
      $(val).bind(opts.eventA,function(){
       opts.direction = i;
       opts.oldAmount = opts.scrollAmount;
       opts.scrollAmount = opts.newAmount;
      }).bind(opts.eventB,function(){
       opts.scrollAmount = opts.oldAmount;
      });
     });
    }
   });
};
$.fn.kxbdMarquee.defaults = {
   delay:0,
   isEqual:true,//所有滚动的元素长宽是否相等,true,false
   loop: 0,//循环滚动次数，0时无限
   direction: 'left',//滚动方向，'left','right','up','down'
   scrollAmount:1,//步长
   scrollDelay:30,//时长
   newAmount:3,//加速滚动的步长
   eventA:'mousedown',//鼠标事件，加速
   eventB:'mouseup'//鼠标事件，原速
};

$.fn.kxbdMarquee.setDefaults = function(settings) {
   $.extend( $.fn.kxbdMarquee.defaults, settings );
};

})(jQuery);
;define(function(require , exports , module){
	//弹框和遮罩层
	var shadow = function(elem , dialog , btn){
		var params = {
			width: $(document).width(),
			height: $(document).height(),
			opacity: 0.6
		};
		//点击按钮显示弹框
		$(btn).bind('click', function(){
			$(elem).css(params).show();
			$(dialog).show();
			return false;
		});
		$(dialog).find('.close').bind('click', function(){
			$(dialog).hide();
			$(elem).hide();
			return false;
		});
	};
	//
	var slide = function(elem, tip, img){
		//显示第一个
		$(tip).html($(elem).eq(0).find('a img').attr('alt'));
		$(elem).each(function(){
			$(this).bind('click', function(){
				$(img).attr('src', $(this).find('a img').attr('src'));
				$(this).addClass('cur').siblings('li').removeClass('cur');
				$(tip).html($(this).find('a img').attr('alt'));
			});
		});
	};

	//跑马灯
	var marquee = function(elem){
		var w_li = $(elem).find('li').width(),
			w_ul = $(elem).width();

		console.log(w_ul);
		function autoplay(){
			var timeStamp = setInterval(function(){

			}, 1000);
		}
		autoplay();
	};

	module.exports = {
		shadow: shadow,
		slide: slide,
		marquee: marquee
	};
});;define(function(require , exports , module){
	var slide = function(options){
		var defaults = {
			elem : '.content .nav-src ul li',
			thumb : '.content .nav-src ol li',
			curStyle : 'cur',
			parentEl : '.nav-src',
			during : 500,
			speed : 3000,
			type : 'mouseover'
		};

		var options = $.extend(defaults , options || {});

		var curNum, timer;
		//事件控制播放
		$(options.elem).eq(0).show().siblings('li').hide();
		$(options.thumb).each(function(index){
			$(this).bind(options.type , function(){
				curNum = index;
				$(this).addClass(options.curStyle).siblings('li').removeClass(options.curStyle);
				$(options.elem).eq(index).fadeIn(options.during).siblings('li').fadeOut(options.during);
			});
		});

		var nums = $(options.thumb).length;
		//自动播放
		function autoPlay(){
			if(!curNum) curNum = 0;
			if(!timer) clearInterval(timer);
			timer = setInterval(function(){
				if(curNum == (nums-1)) curNum = 0;
				else {
					curNum++;
				}

				$(options.thumb).eq(curNum).addClass(options.curStyle).siblings('li').removeClass(options.curStyle);
				$(options.elem).eq(curNum).fadeIn(options.during).siblings('li').fadeOut(options.during);
				

			}, options.speed);
		}
		
		autoPlay();
		$(options.parentEl).hover(function(){
			clearInterval(timer);
		} , function(){
			autoPlay();
		});
		
		
	};

	module.exports = slide;
});;define(function(require , exports , module){
	var submit = function(form){
		isLogin('span.bd','isLogin.html','messagecount.html');
		$(form).submit(function(){
			var contacts = $('input[name="contacts"]');
			var phone = $('input[name="phone"]');

			if($.trim(contacts.val()) == "" || $.trim(phone.val()) == "") {
				if($.trim(contacts.val()) == ""){
					contacts.css('border-color', 'red').focus().blur(function(){
						$(this).css('border-color', '#dedede');
					});
				}
				else {
					phone.css('border-color', 'red').focus().blur(function(){
						$(this).css('border-color', '#dedede');
					});
				}
				return false;
			}
			else {
				$.post('http://cncms.csc86.com/formguide/index.php',$(this).serialize(), function(data){
					if(data.status == true){
						alert('恭喜您！申请加入成功！');
					}
					else {
						alert('申请失败！请刷新后重试！');
					}
				},'jsonp');
				return true;
			}
			
		});
	
	
	function isLogin(obj,url1,url2){
		var path="http://api.csc86.com/member/";
		url1=path+url1;
		url2=path+url2;
		$.ajax({
	        type: "get",
	        url: url1,
	        dataType:"jsonp",
	        data: "", //例如："name=John&location=Boston";
	        success: function(data){
	        	if(data.status){
	        		$.get(url2,{type:"json"},function(dataMsg){	
	        			/*var html="<b>您好,</b><a href='http://member.csc86.com/'>";
	        			html+=data.data.userName+"!";
	        			html+="</a><b>消息</b><a class='msg' href='http://member.csc86.com/membercenter/messageall/'>";
	        			html+=dataMsg.data.count;
	        			html+="</a><a href='http://member.csc86.com/login/logout' class='logout'>退出</a>";*/

	        			$(obj).html('<a href="http://member.csc86.com/" target="_blank" id="J_signEd" data-memberid="'+data.data.userName+'">'+data.data.userName+'</a>！消息<a href="http://member.csc86.com/membercenter/messageall/" target="_blank" class="top-msg-num">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="http://member.csc86.com/login/logout">退出</a>');
	        		},"jsonp");
	        		
	        	}
	        },
	        error: function (d,d1,d2) {
	            alert(this.url);
	        }
	    });
	}//isLogin end;
	};
	module.exports = submit;
});