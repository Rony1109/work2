/**
 * 前端模板js文件
 * 
 */
 seajs.config({
	alias:  {
		'top':'m/newtopnav/js/init.js',
		'copyright':'m/bot-rightcopy/js/init.js',
		'search':'m/newsearch/js/init.js',
		'backTop':'m/back-top/js/init.js'
	}		
		
});
define(function(require, exports, module) {
	require('top');
	require('copyright');
	require('search');
	require('backTop');
	$('.g-back').addCss().goBack();//返回头部

	
	//内容轮播
	function SlideWarp(opt){
		this.slide=opt.slide,
		this.slideLi=opt.slideLi,
		this.slideLista=opt.slideLista,
		this.len=opt.len,
		this.index=0,
		this.prevIcon=opt.prevIcon,
		this.nextIcon=opt.nextIcon;
		this.slideLi.eq(0).addClass("cur_slide_warp");
		if(this.len === 1){
			this.prevIcon.hide();
			this.nextIcon.hide();
		}else if(this.len>1){
			this.apoint();
			this.init();
		}
	}	
	
	SlideWarp.prototype={
		slideAuto:function(){
			var self=this,len=this.len,
				slideLi=this.slideLi,
				slideLista=this.slideLista;
			this.timer=setInterval(function(){
				self.index<len-1 ? self.index++ :self.index=0;
				slideLi.eq(self.index).addClass("cur_slide_warp").siblings().removeClass("cur_slide_warp");
				slideLista.find("i").eq(self.index).addClass("cur_i").siblings().removeClass("cur_i");
			},3000)	

		},
		apoint:function(){
			var self = this,arr=[];
			for(var i=0,len=self.len;i<len;i++){
				if(i == 0){
					arr[i]='<i class="inlineb slide_icon cur_i"></i>'
				}else{			
					arr[i]='<i class="inlineb slide_icon"></i>'
				}
			}
			self.slideLista.html(arr.join(''));
		},
		init:function(){
			var self=this,
				slideLi=this.slideLi,
				slide= this.slide,
				slideLista=this.slideLista;	
			self.slideAuto();	
			slideLista.find("i").hover(function(){
				clearInterval(self.timer);
				slideLi.eq($(this).index()).addClass("cur_slide_warp").siblings().removeClass("cur_slide_warp");
				$(this).addClass("cur_i").siblings().removeClass("cur_i");		
				self.index=$(this).index();
			},function(){
				self.slideAuto();
			});
			slide.hover(function(){
				self.prevIcon.show();
				self.nextIcon.show();			
			},function(){
				self.prevIcon.hide();
				self.nextIcon.hide();				
			});
			slideLi.hover(function(){
				clearInterval(self.timer);
			},function(){
				self.slideAuto();
			})
			this.prevIcon.on("click",function(){
				clearInterval(self.timer);
				self.index>0 ? self.index-- : self.index=0;
				slideLi.eq(self.index).addClass("cur_slide_warp").siblings().removeClass("cur_slide_warp");
				slideLista.find("i").eq(self.index).addClass("cur_i").siblings().removeClass("cur_i");		
				self.slideAuto();			
			});
			this.nextIcon.on("click",function(){
				clearInterval(self.timer);
				self.index<self.len-1 ? self.index++ : self.index=self.len-1;
				slideLi.eq(self.index).addClass("cur_slide_warp").siblings().removeClass("cur_slide_warp");
				slideLista.find("i").eq(self.index).addClass("cur_i").siblings().removeClass("cur_i");		
				self.slideAuto();				
			})
		}
	}
	var fiber=$(".slide").find('ul').find('li'),
		slidew = new SlideWarp({
			slide:$(".slide"),
			slideLi:fiber,
			slideLista:$(".apiont"),
			prevIcon:$(".prev"),
			nextIcon:$(".next"),
			len:fiber.length
		});		
	
	
	
	/*瀑布流*/
	function waterFall(opt){
		this.fallWarp = opt.fallWarp,
		this.list = $("#waterfall").find('li'),
		this.curH = Number($(window).height()),
		this.winHeight = Number($(document.body).outerHeight(true)),
		this.bool = true,
		this.ajaxEndbool = true,
		this.count = 3,
		this.cid = $("#categoryId").val();
		this.init();
	
	}
	waterFall.prototype={
		addCon:function(){
			return 
		},
		ajaxHost:function(){
			var self=this;
			this.bool = false;
			var datetime = new Date();
			datetime = datetime.getTime().toString();
			$(".loadTip").show();
			$.ajax({
				 type: "get",
				 async: false,
				 url: "//www.csc86.com/api.php?op=get_wlife_product&cid="+self.cid+"&datetime="+datetime+"&page="+self.count,
				 dataType:"jsonp",
				 callback:"getProductsInfo",
				 success:function(data){
					var html = '',
					scroolTop = $(window).scrollTop();
					if(data.status === "true"){	
						self.count++;
						self.ug = navigator.userAgent;
						if(/MSIE 6.0/.test(self.ug)||/MSIE 7.0/.test(self.ug)){
							setTimeout(function(){	
								for(var i = 0 ,len = data.data.length ; i<len;i++){
									var disHTML = '';
									if(parseFloat(data.data[i].discount) == 0){
											disHTML = '';
									}else{
										disHTML='<span class="discount">'+data.data[i].discount+'</span><em>折</em>';
									}
									html='<div class="fallcell">'+
											'<div class="wf_top">'+
												'<img src='+data.data[i].imgsrc+' alt='+data.data[i].imgalt+'  title='+data.data[i].imgalt+' style="width:100%;min-height:260px"/>'+
												'<span class="hv_mark"></span>'+
												'<span class="hv_code">'+
													'<img src='+data.data[i].codeSrc+' alt="" width="170px" height="170px"/>'+
													'<br />'+
													'<span>喜欢我，就扫我吧</span>'+
												'</span>'+
											'</div>'+
											'<div class="wf_txt">'+
												'<p class="wf_txt_tit">'+data.data[i].title+'</p>'+
												'<p class="wf_txt_pri">'+disHTML+'<i class="pri_dis"><i class="cur_pri">￥'+data.data[i].price+'</i><br /><i class="old_pri">￥'+data.data[i].oldprice+'</i></i></p>'+
											'</div>'+		
										'</div>	';
									self.list.eq(i).append(html);
									self.getWH();									
								}
							},400)	
						}else{		
							setTimeout(function(){			
								for(var i = 0 ,len = data.data.length ; i<len;i++){
									var disHTML = '';
									if(parseFloat(data.data[i].discount) == 0){
											disHTML = '';
									}else{
										disHTML='<span class="discount">'+data.data[i].discount+'</span><em>折</em>';
									}
									html='<div class="fallcell">'+
											'<div class="wf_top">'+
												'<img src='+data.data[i].imgsrc+' alt='+data.data[i].imgalt+'  title='+data.data[i].imgalt+' style="width:100%;min-height:260px"/>'+
												'<span class="hv_mark"></span>'+
												'<span class="hv_code">'+
													'<img src='+data.data[i].codeSrc+' alt="" width="170px" height="170px"/>'+
													'<br />'+
													'<span>喜欢我，就扫我吧</span>'+
												'</span>'+
											'</div>'+
											'<div class="wf_txt">'+
												'<p class="wf_txt_tit">'+data.data[i].title+'</p>'+
												'<p class="wf_txt_pri">'+disHTML+'<i class="pri_dis"><i class="cur_pri">￥'+data.data[i].price+'</i><br /><i class="old_pri">￥'+data.data[i].oldprice+'</i></i></p>'+
											'</div>'+		
										'</div>	';
									var minIndex = self.getMinList();
									self.list.eq(minIndex).append(html);
									self.getWH();
								}
							},400)
						}
						setTimeout(
							function(){		
								self.bool = true;
								$(".loadTip").hide();
								$('body,html').scrollTop(scroolTop);
							}
						,500)
					}else{
						self.bool = true;
						self.ajaxEndbool = false;
						$("#foot_warp").show();
						$(".loadTip").html("没有数据了");
					}
				 },
				 error:function(){
					alert("网络异常，请刷新页面！")
				 } 
			})
		},
		
		//判断最小的列
		getMinList:function(){
			var arr=[],list = this.list;
			for(var i = 0 ,len = list.length ; i<len ; i++){
				arr[i]=list.eq(i).outerHeight();
			}
			//升序排列
			arr.sort(function compare(a,b){
				return a-b;
			});
			for(var j=0;j<list.length;j++){
				if(list.eq(j).outerHeight()==arr[0]){
					return j;
				}
			}

		},
		getWH:function(){
			this.winHeight = Number($(document.body).outerHeight(true));
			this.curH = Number($(window).height());
		},
		init:function(){
			var slef = this,scrollHt;
			$(window).on("scroll",function(){
				if(slef.winHeight - $(this).scrollTop()- slef.curH <50 ){
					if(slef.ajaxEndbool){
						(slef.bool === true ) && (slef.ajaxHost(),scrollHt = $(this).scrollTop());
					}
				}
				
			});
			$(window).on('resize',function(){
				slef.getWH();
			})
			/*兼容ie6*/
			if(/MSIE 6.0/.test(navigator.userAgent)){
				slef.list.find(".wf_top").hover(function(){
					$(this).find('.hv_code').show();
					$(this).find('.hv_mark').show();
				},function(){
					$(this).find('.hv_code').hide();
					$(this).find('.hv_mark').hide();				
				});
			}
		}
	}
	var waterfall = new waterFall({
		fallWarp : $("#waterfall"),
		list : $("#waterfall").find('li')
	});
	
	
});