define(function(require, exports, module) {
	$(function(){
		var hostmap=seajs.hostmap;//域名配置
		require('swiper');//滑动插件
		require('//res.csc86.com/f=v3/dmg/market/js/src/isLogin_not')("//"+ hostmap.test +"/carCount",".sh_cart_index",".pro_de_add_s");//购物车数量显示
		var dialog=require('layer');//弹框插件
		var tips = function(tip) {
			dialog.open({
				content:tip
				,skin: 'msg'
				,time:2 //2秒后自动关闭
			});
			return false;
		};
		var isFalse= false;  // false关闭商铺搜索功能
		var swiper = new Swiper('.swiper-container', {//首页banner轮播
			pagination: '.swiper-pagination',
			paginationClickable: true,
			autoplay: 5000
		});
		var index_choose_container = new Swiper('.index_choose_container', {//首页产品轮播
			slidesPerView: 3,
			paginationClickable: true,
			spaceBetween: 5,
			autoplay: 3000
		});
		$(".index_triangle").on('click',function () {//首页，商品、商铺搜索页三角形商铺与商品切换
			if (isFalse) {
				$(this).find("span").html("商铺");
				$('.index_ser_bg').attr('placeholder', "请输入商铺关键字");
				$('.index_ser_goo').attr('placeholder', "请输入商铺关键字");
				isFalse = false;
			} else {
				$(this).find("span").html("商品");
				$('.index_ser_bg').attr('placeholder', "请输入商品关键字");
				$('.index_ser_goo').attr('placeholder', "请输入商品关键字");
				isFalse = true;
			}
		});
		$(".index_ser_bg").on('click',function () {//首页搜索框点击跳转
			var data_index = $(this).prev().find("span").html();
			if (data_index == "商品") {
				window.location.href ="//"+hostmap.test+"/search/searchProduct.ftl?type=3"
			} else {
				window.location.href = "//"+hostmap.test+"/search/searchProduct.ftl?type=4"
			}
		});
		function index_ser_goo(ele,sel){//商铺、商品搜索页面失焦时跳转页面以及提示函数
			var null_r = $(ele).val();
			var data_ser = $(sel).prev().html();
			var reg = /^\s*$/g;//  如果是空，或者""
			if(null_r!=""&&!reg.test(null_r)){
				var newsobj=cscStatis.obj2extend({"searchKeyWord ":null_r},{"eventAction":"searchSuccess","hitType": "event"});
				cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t"}}).send({"Tracer": "searchSuccessTracker"});
				if (data_ser == "商品"){
					window.location.href = "//"+hostmap.test+"/search/product.ftl?keyWord=" + null_r+"&type=dm"
				}else{
					window.location.href = "//res.csc86.com/v3/dmg/market/html/index_ser_shopList.html?keyWord=" + null_r+"&type=dm"
				}
			}else{
				if (data_ser == "商品") {
					tips("<label class='sh_font_sz32'>请输入您要搜索的商品...</label>");
				}else{
					tips("<label class='sh_font_sz32'>请输入您要搜索的商铺...</label>");
				}
			}
		}
		$(".index_ser_goo").on("blur",function(){//商铺、商品搜索页面失焦时事件
			//index_ser_goo(".index_ser_goo",".triangle-bottomright")
		});
		$(".index_ser_circle").add(".recent-ser").click(function(){//商铺、商品搜索页面失焦时事件
			index_ser_goo(".index_ser_goo",".triangle-bottomright")
		});

		$(".recent-ser").parent().css("overflow","hidden");

		var $winth = $(window),
			$img = $('img'),
			imgTop,          //图片距离顶部高度
			scTop,             //滚动条高度
			ckwidtH;           //窗口高度
			ckwidtH = $winth.height();         //获得可视浏览器的高度
			$winth.scroll( function() {
				scTop = $winth.scrollTop();       //获取滚动条到顶部的垂直高度
				$img.each(function(){
					imgTop =  $(this).offset().top;
					if(imgTop - ckwidtH < scTop &&     //图片必须出现在窗口底部上面
						imgTop - ckwidtH > 0 &&        //排除首页图片
						$(this).attr('src') != $(this).data('url')){          //排除已经加载过的图片
						$(this).attr({
							src: $(this).data('url')
						});
					}
				});
		});
	})
});