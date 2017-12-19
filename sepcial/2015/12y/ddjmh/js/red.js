define(function(require, exports, module) {
    require('../js/init');
	var isSubmit=false;
	var redmodule={
	    init:function(){
			var memberIds="463cd8e5-9c03-40dd-b590-18ebd88841b1;6b17b492-da3e-4015-85e6-b4ffb48112e3;8d3ea0a7-c79c-4c6b-b866-eea81c646ec8;6b6f26e2-964e-4468-a58e-cc6a4a825585;28373868-0cf9-4932-bda8-e7cb5f520182;82ca511a-4076-451e-ae46-836f0b918a88;18c7e978-f852-4d98-a3cd-a8f8ecba612f;968e6e56-a0ff-4e67-a70f-61be6609e32b;09fbaeb1-603b-42d5-9c5a-5a591e808e79;1e2807dc-23ad-4ed1-81ce-97c0f3020caf;b6a1961e-e18e-4796-9f09-fc663d40df57;6f8cd6b1-5850-45d1-8b9f-ffb3603ef968;e787d377-7666-4976-ae18-131eae66a809;040fc7ac-a2cc-491c-aca9-52cf42f54483;8b9eb5e5-620c-432d-b818-d53d804013bb;923ec1f0-53f4-45be-9776-b48042ea4487";
		    var OtheMmemberIds="32cf21a8-6dde-4980-a723-4b92911222ae;abbee10c-4ac7-4263-95c3-860f8cd99992;910a57eb-8ab0-4eb0-9bb6-351133cac669;2283db9e-c79f-4b36-a016-7787d8584a14;48a2cfa9-c96d-40f8-bd21-c5b82567376e;dc689a54-fd13-4e2c-adfb-77753933ca45;60357953-863a-42e9-9cdf-ff93b205fcd3;dd656207-6f96-4b08-8608-1c411d97af15;e274457c-8f15-431f-9405-b5edf54ebf91;ca1d9d74-d08b-4d5f-9397-edf0d8428fcf;eee00eaa-6d2e-44a2-be70-10474db080f0;518a618a-c79c-4d3f-8c03-b04a5b29a6b0;90ce7e49-196c-42da-9477-f07f68007fcd;4761ce67-25dc-40b3-9be3-ae6422051f76;6b9d989f-070d-485f-b392-53b92b98f45e";
			var startDate="2015-10-20 00:00:00";
			var endDate  ="2015-12-20 00:00:00";
			
			var loading='<p class="loading">加载中，请耐心等待...</p>',
				$flr1=$('#ddjmh_wfblist'),//无纺布、布、棉
				$flr2=$('#ddjmh_nkoulist'),//面料、纱、家纺
				$flr3=$('#ddjmh_pglist');//皮革、皮类
			
			var ajaxFun=function(obj,dataObj){
				var $ul=obj.find('ul'),
					$ckgd=obj.find('.ckgd'),//查看更多
					$sqgd=obj.find('.sqgd'),//收起
					opts={
						"memberIds":memberIds,
						"OtheMmemberIds":OtheMmemberIds,
						"startDate":startDate,
						"endDate":endDate
					};
				
				opts=$.extend({},opts,dataObj);
				
				//只有当没有li的时候才说明数据没有加载，这时才需要ajax加载，若有就说明已经执行了ajax，则后面不需要在执行
				if($ul.find('li').length<1){
					if(isSubmit===true){return false;}
					isSubmit=true;
					$.ajax({
						url:'http://inquiry.csc86.com/ddjm-list',
						type:'post',
						data:opts,
						dataType:'jsonp',
						beforeSend:function(){
							if(!obj.find('.loading')[0]){
								obj.prepend(loading);
							}
						},
						success:function(data){
							var len=data.length,
								htm='',
								suppotFile=['jpg','bmp','jpeg','png','gif'];
								
							obj.find('.loading').remove();
		
							for(var i=0;i<len;i++){
								var fileType = (data[i].imgUrl.substring(data[i].imgUrl.lastIndexOf(".")+1,data[i].imgUrl.length)).toLowerCase();
								var boot;
								
								if($.inArray(fileType,suppotFile)>=0){
									boot="true";
								}else{
									boot="false";
								}
								
								if(i<8){
									htm+='<li>';
								}else{
									htm+='<li class="g-dn">';
								}
								htm+='<div class="bod-br-all">';
								htm+='<div class="bod-br-tabs">';
								htm+='<div class="bod-br-top">';
								htm+='<span>'+data[i].inquiryName+'</span>';
								htm+='<p>采购量：<strong style="color:#ff9f2d;">'+data[i].purchaseNumber+'</strong> '+data[i].purchaseUnits+'</p>';
								htm+='</div>';
								htm+='<div class="bod-br-center">';
								htm+='<div class="bod-br-center-left">';
								htm+='<p>发布时间：'+data[i].addTime+'</p>';
								htm+='<p>截止时间：'+data[i].expireDate +'</p>';
								htm+='</div>';
								
								if(!data[i].img==""&&boot=="true")
								{
									htm+='<div class="bod-br-center-right">';
									if(i<8){
										htm+='<a href="javascript:;"><img src="http://img.csc86.com/'+data[i].img+'" width="100%" height="100%"/></a>';
									}else{
										htm+='<a href="javascript:;"><img src="http://res.csc86.com/v2/m/init/image/pix.png" data-original="http://img.csc86.com/'+data[i].img+'" width="100%" height="100%"/></a>';
									}
									htm+='</div>';
									htm+='<div class="bor-right-imgbig">';
									if(i<8){
										htm+='<img src="http://img.csc86.com/'+data[i].img+'" width="100%" height="100%"/>';
									}else{
										htm+='<img src="http://res.csc86.com/v2/m/init/image/pix.png" data-original="http://img.csc86.com/'+data[i].img+'" width="100%" height="100%"/>';
									}
									htm+='</div>';
								}
								htm+='<div style="clear: both;"></div>';
								htm+='</div>';
								htm+='<div class="bod-br-foot">'+data[i].content+'</div>';
								htm+='</div>';
								htm+='<div class="bod-br-btn-ccc"><a href=http://member.csc86.com/quote/detail.html?id='+data[i].Id+'>已经截止</a></div>';
								htm+='</div>';
								htm+='</li>'; 	
							}
							$ul.append(htm);
							if(len>8){
								$ckgd.show();
							}
							$ckgd.on('click',function(){
								$ul.find('li:gt(7)').removeClass('g-dn');
								$ul.find('img').each(function(){//图片懒加载
									var $this=$(this),
										original=$this.data('original');
									$this.attr('src',original);
									$this.removeAttr('data-original');
									
								});
								$ckgd.hide()
								$sqgd.show();
							});
							$sqgd.on('click',function(){
								$ul.find('li:gt(7)').addClass('g-dn');
								$ckgd.show()
								$sqgd.hide();
							});
							isSubmit=false;
						} 
					});
				}
			}
			
			//初始第一楼层先加载进来
			ajaxFun($flr1,{
				"categoryIds":"01",
				"title":"布"
				//"title":"无纺布;布;棉"
			});
			
			//其他楼层根据页面滚动来加载
			$(window).scroll(function(){
				var top=$(this).scrollTop(),
					flrTop2=$flr2.offset().top,
					flrTop3=$flr3.offset().top;
				if(top>flrTop2-400){
					ajaxFun($flr2,{
						"categoryIds":"01",
						"title":"纱;面料;毛巾;棉"
					});
				}
				if(top>flrTop3-400){
					ajaxFun($flr3,{
						"categoryIds":"01",
						"title":"皮革;皮;羊皮"
					});
				}
			});
		}
	}
	redmodule.init();
});
