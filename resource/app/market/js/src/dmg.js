define(function(require, exports, module) {
	require('swiper');
	var common=require('./common');//公用js
	var picLazyLoad=require('picLazyLoad');
	var hostmap=seajs.hostmap;//域名配置
	var dmg={
		//广告图轮播
		slide:function(){
			if($('#slide li').length>1){
				var mySlide=new Swiper('#slide',{
					pagination: '.swiper-pagination',
					//preloadImages:false,
					//lazyLoading:true,
					autoplay:3000,
					loop:true,
					onTap:function(swiper,e){
						common.scrollTap(swiper,e);
					}
				});	
			}
		},
		
		//东盟特色
		scrll:function(){
			var myScroll=new Swiper('#scroll',{
				slidesPerView : 'auto',
				loop:false,
				onTap:function(swiper,e){
					common.scrollTap(swiper,e)
				}
			});	
		},
		
		//获取东盟购接口数据模板
		getTpl:function(cb){
			var tplData='';
			var htmlObj={
				loadData:function(){//获取动态数据
					$.ajax({
						type:'get',
						url:'//'+hostmap.dmg+'/api.php?op=market',
						dataType:'jsonp',
						success:function(data){
							// console.log(data);
							var status=data.status,
								result=data.data||null;
							if(status){
								htmlObj.setHtml(result);								
								// localStorage.setItem('dmg',JSON.stringify(result));
							}else{
							
							}
						}
					});
				},
				setHtml:function(data){//设置模板
					var render=require('../tpl/dmg');
					var tplHtml = render(data);
					$('#dmg').html(tplHtml);
					dmg.slide();
					dmg.scrll();
					common.datatrans();
					$('.lazyload').picLazyLoad({
						effect: "fadeIn",
						threshold: 50,
						placeholder: 'images/blank.gif'
					});
				}
			};
			
			tplData=localStorage.getItem('dmg');
			if(tplData){
				tplData=JSON.parse(tplData);
				htmlObj.setHtml(tplData);
			}else{
				htmlObj.loadData();
			}
		},
		
		init:function(){
			dmg.getTpl();			
		}
	};
	
	dmg.init();
});