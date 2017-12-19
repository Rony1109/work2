/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径djs-d
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('jquery');
    require('top');
    require('header');
    require('placeholder');

    /*
     * 以下为专题js代码
     * ......
     */
     //轮播图 
	 function bannerImg(a,b,c){
		 var tabLi = $(a),
		     tabLen = tabLi.length,
			 prevBtn = $(b),
			 nextBtn = $(c),
			 _index = 0,
			 _timer = null;
		nextBtn.on("click",function(){
			_index++;
			if(_index > tabLen-1){
				_index = 0;
				}
				changeLi(_index);
			}); 
		prevBtn.on("click",function(){
			_index--;
			if(_index <0){
				_index = tabLen -1;
				}
				changeLi(_index);
			});	
		function changeLi(_index){
		  tabLi.eq(_index).css("display","block");
		  tabLi.eq(_index).siblings().css("display","none");
		  clearInterval(_timer);
		  _timer = setInterval(function(){nextBtn.click()},3000);
		  }
		  _timer = setInterval(function(){nextBtn.click()},3000);	 	
		 }
		bannerImg(".rollist ul li",".leftBtn",".rightBtn"); 
		
		//顶部导航
		$(function(){
		  var nav = $("#navbox");
		  $(window).scroll(function(){
		     var topscr = $(this).scrollTop();
		     topscr > 818?nav.addClass("navbox"):nav.removeClass("navbox");
		  });
		});
		
		<!-- 倒计时 -->
	var time={
	    init:function()
		{
			var EndTime= new Date('2017/03/09 23:59:59');
			var NowTime = new Date();
			var t =EndTime.getTime() - NowTime.getTime();
			var d=Math.floor(t/1000/60/60/24);
            var h=Math.floor(t/1000/60/60%24);
            var m=Math.floor(t/1000/60%60);
            var s=Math.floor(t/1000%60);
			//alert(h.substring(0,1));
			
			if(d<10)
			{
				d="0"+d;
			}
			if(h<10)
			{
				h="0"+h;
			}
			if(m<10)
			{
				m="0"+m;
			}
			if(s<10)
			{
				s="0"+s;
			}
			$("#djs-d").html(d);
			$("#djs-h").html(h);
			$("#djs-m").html(m);
			$("#djs-s").html(s);
			setTimeout(time.init,1000);
		}
	}
    
    time.init();
});
