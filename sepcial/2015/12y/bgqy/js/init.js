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
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js'
    },
    
    // Sea.js 的基础路径
     base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	
	var dialog=require('dialog');
	var bg={}
    /*
     * 以下为专题js代码
     * ......
     */
	
	 //右侧浮动菜单
	$(function(){
		var arry=[];
		var fix=$('.bg-xf');
		var fixUl=fix.find('ul');
		var fixLi=fix.find('li');
		$('.flr').each(function(){
            arry.push($(this).offset().top);
        });
		$(window).scroll(function(){
			var _top=$(this).scrollTop();
			_top>=590?fix.fadeIn():fix.fadeOut();
			for(var i=0;i<=arry.length;i++){
				if(_top>=arry[i]&&_top<=arry[i+1]){
					fixLi.eq(i).addClass('cur').siblings().removeClass('cur');
				}
				if(_top>=arry[arry.length-1]){
					fixLi.eq(arry.length-1).addClass('cur').siblings().removeClass('cur');
				} 
			}
		});
		fixLi.find('a').on('click',function(){
			var _index=fixLi.find('a').index(this);
			$('html,body').animate({scrollTop:arry[_index]},500);
			return false;
		});
		
		
	});
	
	$(".xf-cen li").hover(function(){
		$(this).addClass('hv');	
	
	},function(){
		$(this).removeClass('hv');	
	})
	$("#bk-but1").on('click',function(){
		$("#bg-wx1").hide();
		$("#bg-wx2").show();
	});

	$(".lb-ls").hover(function () {
		$(this).hide();
		$(this).next().show();
	});
	$(".lb-ls").next().mouseout(function(){
		$(this).hide();
		$(this).prev().show();
	});
	
	$("#bk-but2").on('click',function(){
		var $this = $(this);
		if($("#industry_id").val()=="")
		{
			alert("所属行业不能为空！");
			return;
		}else if($("#address_id").val()==""){
			alert("旺铺地址不能为空！");
			return;
		}else if($("#Phone_id").val()==""){
			alert("联系方式不能为空！");
			return;
		}else if($("#Reasons_id").val()==""){
			alert("申请理由不能为空！");
			return;
		}else
		{
			var datas=$("form, .bg-tb").serializeArray();
			$.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				if(data.status==true){
					dialog({
						id: 'bg-subxinxi-list',
						title:'',
						fixed: true,
						lock:true,
						background:"#000",
						opacity:"0.3",
						content:$("#bg-subxinxi-list").html(),
						init:function(){
							$("#industry_id").val("");
							$("#address_id").val("");
							$("#Phone_id").val("");
							$("#Reasons_id").val("");
						}
					});
					 
				}else{
							//alert('提交失败！')
				}
			}, 'jsonp');
		}
	})

	$('.xs-img').hover(function(){
		$('.xs-imtxt').show();
	},function(){
		$('.xs-imtxt').hide();
	});
	$(function(){
		var This = $('.bg-lbs');
		var index=1;
		var ns=0;
	    var	len    =$(This).find('li').length;
		var num=$(This).find('.lbs-all').length;
		var timer;
		function fn ( fx ) {
			if( fx === 1) { // 向右
				ns++;
				index=index+5;
				if(ns==6){ns=0;}
				if(index == 31){index = 1;}

			} else if ( fx === 2 ) { // 向左
				ns--;
				index=index-5;
				
				if(ns==-1){ns=5;}
				if(index == -4){index = 26;}

			}
			for(var i=1;i<len+1;i++)
			{
				$('#bg-xs'+i).hide();
			}
			
			for(var i=0;i<num;i++)
			{
				$('.lbs-all').eq(i).hide();
			}
			 //控制上面的图片
			$('#bg-xs'+index).show();
			$('.lbs-all').eq(ns).show();
		}
		$('#bg-xs'+index).show();
		$('.bg-lbs').hover(function(){
			if(timer!=null)
			{
				clearInterval(timer);
			}
		},function(){
			timer=setInterval(function(){
				fn(1);
				
			}, 6000)
		}).trigger("mouseleave");
		
		$('.lbs-lf').click(function(){
			fn(2);
		});
		
		$('.lbs-rt').click(function(){
			fn(1);
		});
		
		$(This).find('li').on('click',function(){
			var lis=$(this).find('img').attr('data-bj');
			
			var len=$('.lbs-all').find('li').length;
	
			for(var i=1;i<len+1;i++)
			{
				if($(this).find('img').attr('data-bj')==i)
				{
					$('#bg-xs'+i).show();
				}else
				{
					$('#bg-xs'+i).hide();
				}
			}
		});
			
		/*var This = $('.lbs-all');
		var sWidth = $(This).find('li').width()+10,
			len    =$(This).find('li').length,
			index  = 1,
			lidex =1,
			Timer;
			$(This).find('ul').width(len*sWidth);
			$(This).find('ul').css("marginLeft" ,"-900px");
			$('#bg-xs'+lidex).show();
			<!-- 右边点击滑动 -->
			$('.lbs-lf').click(function(){

				$('#bg-xs'+index).hide();
				index--;
				if(index ==0){index = len;}
				$('#bg-xs'+index).show();
				Tony(1);

			});
			<!-- 左边点击滑动 -->
			$('.lbs-rt').click(function(){
				$('#bg-xs'+index).hide();
				index++;
				if(index == len+1){index = 1;}
				$('#bg-xs'+index).show();
				Tony(2);
			});
			
			$('.lbs-all').find('li').on('click',function(){
				//alert($(this).find('img').attr('data-bj'));
				var len=$('.lbs-all').find('li').length;
				for(var i=1;i<len+1;i++)
				{
					if($(this).find('img').attr('data-bj')==i)
					{
						$('#bg-xs'+i).show();
					}else
					{
						$('#bg-xs'+i).hide();
					}
				}
			});
			
			$('.bg-lbs').hover(function(){
				clearInterval(Timer);
			},function(){
				Timer=setInterval(function(){
					for(var i=1;i<len+1;i++)
					{
						$('#bg-xs'+i).hide();
					}
					if(len <= index){index = 0;}
					$('#bg-xs'+(index+6)).show();
					Tony(2);
					index=index+5;
				}, 3000)
			}).trigger("mouseleave");
			
			function Tony(num){
				if(num==2)
				{
					$('.lbs-all').find('ul').stop().animate({
						marginLeft :'-1800px'
					},500,function(){
						
						//$('.lbs-all').find("ul").append($('.lbs-all').find("li:first"));
							var idx="";
						for(var i=0;i<5;i++)
						{
							idx+="<li>"+$('.lbs-all').find('ul').find("li").eq(i).html()+"</li>";
						}
						$('.lbs-all').find("ul").append(idx);
						console.log(idx);
						$('.lbs-all').find("ul").css("margin-left",  "-900px");
						
					});

					return false;
				}else
				{
					$('.lbs-all').find('ul').stop().animate({
						marginLeft :'0px'
					},500,function(){
						var $lis=$('.lbs-all').find('ul').find("li").length;
						var idx="";
						for(var i= $lis-5;i<$lis;i++)
						{
							idx+="<li>"+$('.lbs-all').find('ul').find("li").eq(i).html()+"</li>";
						}
						
						$('.lbs-all').find('ul').prepend(idx);
						$('.lbs-all').find("ul").css("margin-left",  "-900px");
						
					});
					return false;
				}
			};*/
			
	});
	exports.module=bg;
});

