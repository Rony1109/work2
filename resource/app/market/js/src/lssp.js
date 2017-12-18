var refresh=function(){};
define(function(require, exports, module) {
	require('swiper');
	var common=require('./common');//公用js
	var hostmap=seajs.hostmap;//域名配置
	var picLazyLoad=require('picLazyLoad');
	var lssp={
		//广告图轮播
		slide:function(){
			if($('#slide li').length>1){
				var mySlide=new Swiper('#slide',{
					pagination: '.swiper-pagination',
					/*preloadImages:false,
					lazyLoading:true,*/
					autoplay:3000,
					loop:true
				});	
			}
		},
		
		//今日特推
		scrll:function(){
			var myScroll=new Swiper('#scroll',{
				slidesPerView : 'auto',
				loop:false
			});	
		},
		
		//获取绿色食品接口数据模板
		getTpl:function(){
			var tplData='';
			var htmlObj={
				loadData:function(){//获取动态数据
					$.ajax({
						type:'get',
						url:'//'+hostmap.lssp+'/api.php?op=market',
						dataType:'jsonp',
						success:function(data){
							var status=data.status,
								result=data.data||null;
								// console.log(data);
							if(status){
								htmlObj.setHtml(result);
								// localStorage.setItem('lssp',JSON.stringify(result));
							}else{
							
							}
						}
					});
				},
				setHtml:function(data){//设置模板
					console.log(data)
					var render=require('../tpl/lssp');
					var tplHtml = render(data);
					$('#lssp').html(tplHtml);
					lssp.slide();
					lssp.scrll();
					$('.lazyload').picLazyLoad({
						effect: "fadeIn",
						threshold: 50,
						placeholder: 'images/blank.gif'
					});
				}
			};
			
			// tplData=localStorage.getItem('lssp');
			if(tplData){
				tplData=JSON.parse(tplData);
				htmlObj.setHtml(tplData);
			}else{
				htmlObj.loadData();
			}
		},
		
		init:function(){
			lssp.getTpl();
			common.datatrans();
		}
	};
	
	lssp.init();
		
});