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
	
	/*var dialog=require('dialog');*/
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
/*	$(function(){        
		
	});*/
	$(function(){
		var This = $('.lbs-all');
		var sWidth = $(This).find('li').width()+10,
			len    =$(This).find('li').length,
			index  = 1,
			Timer;
			$(This).find('ul').width(len*sWidth);
			$(This).find('ul').css("marginLeft" ,"-180px");
			$('#bg-xs'+index).show();
			
			
			$('.lbs-lf').click(function(){

				$('#bg-xs'+index).hide();
				index--;
				if(index ==0){index = len;}
				$('#bg-xs'+index).show();
				Tony(index,2);

			});
			
			$('.lbs-rt').click(function(){
				$('#bg-xs'+index).hide();
				index++;
				if(index == len+1){index = 1;}
				$('#bg-xs'+index).show();
				Tony(index,1);
			});
			
			$('.bg-lbs').hover(function(){
				clearInterval(Timer);
			},function(){
				Timer=setInterval(function(){
					$('#bg-xs'+index).hide();
					if(len == index){index = 0;}
					$('#bg-xs'+(index+1)).show();
					Tony(index,1);
					index++;
				}, 3000)
			}).trigger("mouseleave");
			
			function Tony(obj,num){
				if(num==2)
				{
					$('.lbs-all').find('ul').stop().animate({
						marginLeft :'-360px'
					},500,function(){
						
						$('.lbs-all').find("ul").append($('.lbs-all').find("li:first"));
						$('.lbs-all').find("ul").css("margin-left",  "-180px");
						
					});

					return false;
				}else
				{
					$('.lbs-all').find('ul').stop().animate({
						marginLeft :'0px'
					},500,function(){
						
						$('.lbs-all').find('ul').prepend($('.lbs-all').find("li:last"));
						$('.lbs-all').find("ul").css("margin-left",  "-180px");
						
					});
					return false;
				}
			};
			
	});
	exports.module=bg;
});

