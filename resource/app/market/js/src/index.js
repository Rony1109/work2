define(function(require, exports, module) {
	require('swiper');
	var common=require('./common');//公用js
	var hostmap=seajs.hostmap;//域名配置
	var picLazyLoad=require('picLazyLoad');
	var index={			
		slide:function(){	//广告banner图轮播ui	
			var mySlide=new Swiper('#slide',{
				pagination: '.swiper-pagination',
				preloadImages:true,
				//lazyLoading:true,
				autoplayDisableOnInteraction:false,
				autoplay:5000,
				loop:true,
				speed:500,
				lazyLoading:true,
				// onTap:function(swiper,e){
				// 	// common.scrollTap(swiper,e);
				// }
				// onLazyImageLoad: function(swiper, slide, image){
				//       console.log(swiper);//Swiper实例
				//       console.log(slide);//哪个slide里面的图片在加载
				//       console.log(image);//哪个图片在加载
				// },
				// onLazyImageReady: function(swiper){
				//       alert('延迟加载图片完成');
				//       console.log(swiper);//Swiper实例
				//       console.log(slide);//哪个slide里面的图片在加载
				//       console.log(image);//哪个图片在加载
				// }
			});	
		},		
		//今日推荐ui
		scrll:function(){
			var tjScroll=new Swiper('#scroll',{
				slidesPerView : 'auto',
				loop:false
			});
		},	
		adscroll:function(){
			var adscl=new Swiper('#adslide',{
				loop:true,
				onTap:function(swiper,e){
					common.scrollTap(swiper,e);
				}
			});
		},
		// 名店汇ui
		mdhscroll:function(){
			var mdhScroll=new Swiper('#scrollmdh',{
				slidesPerView : 'auto',
				loop:false,
				loopedSlides:3
			});	
		},
		getData:function(cbdata){
			//三大类目data
			var getCategory=function(){
				$.ajax({
					url:"//"+hostmap.gsc+"/category/appHomeCategory",
					type:"get",
					dataType:"jsonp",
					success:function(data){
						// console.log(data);
						var render=require('../tpl/public/index_cate');
						var catehtml = render(data);
						$("#cate").html(catehtml);
						// $(".chnbox").each(function(i){
						// 	$(this).css("-webkit-animation-delay",i*0.2+"s").addClass("flipInY");
						// });
					}
				});
			},
			// //精选推荐data
			getJxtj=function(cb){
				$.ajax({
					url:"//"+hostmap.www+"/api.php?op=market&page=1&num=15",
					type:"get",
					dataType:"jsonp",
					success:function(data){
						// console.log(data);
						var render=require('../tpl/public/index_jxtj');
						var jxtjhtml = render(data.data);
						$("#jxtjul").html(jxtjhtml);						
						cb();
							
					}
				});
			},
			// banner广告data
			getAdimg=function(cbk){
				$.ajax({//轮播图
					url:"//"+hostmap.gsc+"/advertising/listPage?page=1",
					type:"get",
					dataType:"jsonp",
					success:function(data){
						// console.log(data);
						var render=require('../tpl/public/slide');
						var html = render(data);
						if(data.data.length>0){
							if(data.data.length==1){
								$("#slide").append(html);									
							}
							else{
								$("#slide").append(html);	
								// index.slide();
							}
						}											
						cbk();
					}
				}),
				$.ajax({//中间广告图
					url:"//"+hostmap.gsc+"/advertising/listPage?page=2",
					type:"get",
					dataType:"jsonp",
					success:function(data){
						if(data.data.length!=0){
							var render=require('../tpl/public/adslide');
							var adhtml = render(data);
							if(data.data.length==1){
								$("#ad").append(adhtml);
								$("body").on("tap","a[data-slidehref]",function(e){				
									e.preventDefault();
									var href=$(this).data("slidehref");
									// console.log(href);
									common.loadURL("gsc://"+href);
								});
							}
							else{
								$("#ad").append(adhtml);
								index.adscroll();
							}							
						}
					}
				});
			},
			getMdh=function(cbmdh){//名店汇data
				$.ajax({
					url:"./js/src/category.json",
					type:"get",
					dataType:'json',
					success:function(data){
						// console.log(data);
						var render=require('../tpl/public/index_mdh');
						var html = render(data);
						// console.log(html);
						$("#mdhul").html(html);
						// index.mdhscroll();						
						cbmdh();
					}
				});
			},
			init=function(cb){				
				getCategory();	
				getAdimg(function(){										
					getJxtj(function(){						
						getMdh(function(){							
							// $('#adarea').css("display","block");		
							common.datatrans();
							index.scrll();	
							index.slide();
							$('.lazyload').picLazyLoad({
								threshold: 50,
								placeholder: 'images/blank.gif'
							});
							// index.adscroll();
							index.mdhscroll();	
							cb();							
						});
					});
				});
									
			};
			init(function(){

			});
					
		},
		init:function(){
			index.getData();
			
		}
	};	
	index.init();	
	
	$("#tsjump li").each(function(index,el){//特色市场点击事件处理
		$(el).children("a").on("tap",function(e){
			e.preventDefault();
			var href=$(this).data("href");
			// console.log("gsc://"+href);
			common.loadURL("gsc://"+href);
		});
	});
});