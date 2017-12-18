define(function(require, exports, module) {
	require('swiper');
	var common=require('./common');//公用js
	var hostmap=seajs.hostmap;//域名配置
	var pcc={
		//广告图轮播
		slide:function(){
			if($('#slide li').length>1){
				var mySlide=new Swiper('#slide',{
					pagination: '.swiper-pagination',
					//preloadImages:false,
					//lazyLoading:true,
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
		
		//获取皮草城接口数据模板
		getTpl:function(){
			var tplData='';
			var htmlObj={
				loadData:function(){//获取动态数据
					$.ajax({
						type:'get',
						url:'//'+hostmap.pcc+'/api.php?op=market',
						dataType:'jsonp',
						success:function(data){
							console.log(data);
							var status=data.status,
								result=data.data||null;
							if(status){
								htmlObj.setHtml(result);
								// localStorage.setItem('pcc',JSON.stringify(result));
							}else{
							
							}
						}
					});
				},
				setHtml:function(data){//设置模板
					var render=require('../tpl/pcc');
					var tplHtml = render(data);
					$('#pcc').html(tplHtml);
					pcc.slide();
					pcc.scrll();
				}
			};
			
			tplData=localStorage.getItem('pcc');
			if(tplData){
				tplData=JSON.parse(tplData);
				htmlObj.setHtml(tplData);
			}else{
				htmlObj.loadData();
			}
		},
		
		init:function(){
			pcc.getTpl();
			common.datatrans();
		}
	};
	
	pcc.init();
		
});