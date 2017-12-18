define(function(require, exports, module) {
	require('c2/newcgsc/js/newback-top.js');
	var index={


		//首页入口函数
		init:function(){
			
			$('#zx_sidebar').append('<div class="g-back g-dn">'+
			'<a class="scrollzx" href="javascript:;" target="_blank">'+
			'<img src="//res.csc86.com/v2/c2/newcgsc/image/sq-12.png" width="24" height="24"><br>在线咨询</a>'+
			'<a class="scrolljhc"  href="https://i.csc86.com/carDetail"><img src="//res.csc86.com/v2/c2/newcgsc/image/sq-11.png" width="24" height="20"> <br>进货车<em></em></a>'+
			'<a class="scrollwx" href="javascript:;" ><img src="//res.csc86.com/v2/c2/newcgsc/image/sq-13.png" width="31" height="24"><br>微信</a>'+
			'<a class="scrolltop"  href="javascript:;"><img src="//res.csc86.com/v2/c2/newcgsc/image/sq-14.png" width="22" height="24"><br>返回顶部</a>'+
			'<div class="g-code g-dn"><img src="//csc86.com/themes/classic/css/qrcode_2caeaadc4175cadea6201c428ee65f4b.png" alt="" width="150" height="150" /></div>'+'</div>')
			$('.g-back').addCss().goBack(true); //右边侧边栏返回调用的JS

			$('.scrollzx').on('click',function(){
				window.open('http://p.qiao.baidu.com/cps/chat?siteId=10707232&userId=5784152','','width=800,height=600,top=200,left=400');
			})
			
			$.post('//www.csc86.com/default/BuycarInfo',function(data){
				if(data.status==true){
					if(data.data.carNum){
						$('.scrolljhc').find('em').text(data.data.carNum);
						$('.scrolljhc').find('em').show();
					}else{
						$('.scrolljhc').find('em').remove();
					}
				}else{
					$('.scrolljhc').find('em').remove();
				}
			},'jsonp');
		}
	};
	index.init();
});
//http://p.qiao.baidu.com/cps/chat?siteId=2211581&userId=5784152          csc86.com
//http://p.qiao.baidu.com/cps/chat?siteId=10707232&userId=5784152          res.csc86.com