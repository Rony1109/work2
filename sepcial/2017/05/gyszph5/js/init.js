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
		'layer':'./layer/layer.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
   require('jquery');
	var dialogs=require('layer');//弹框插件
	var gysz={
		tips:function(circleId,type,ele,content) {
			dialogs.open({
				content:type?$("."+circleId).html() : ele,
				skin: 'msg',
				area: ['7rem', '5rem'],
				success: function(elem){

					var This=$(elem);
					This.find(".close").on("click",function(){
						layer.closeAll()
					})
					This.find('#cjzb_btn').on('click',function(){
						if(This.find("#cjzb_company_name").val()==""){
							alert("公司名称不能为空！");
							return;
						}else if(This.find("#cjzb_name").val()=="") {
							alert("联系人不能为空！");
							return;
						}else if(This.find("#cjzb_phone_number").val()==""){
							alert("手机号码不能为空！");
							return;
						}else{
							var array=new Array();
							var attar={
								name:'info[company_name]',
								value:This.find("#cjzb_company_name").val()
							}
							var attar1={
								name:'info[name]',
								value:This.find("#cjzb_name").val()
							}
							var attar2={
								name:'info[phone_number]',
								value:This.find("#cjzb_phone_number").val()
							}
							var attar3={
								name:'formid',
								value:'101'
							}
							var attar4={
								name:'subtype',
								value:'ajax'
							}
							var attar5={
								name:'dosubmit',
								value:'我要报名'
							}
							array[0]=attar;
							array[1]=attar1;
							array[2]=attar2;
							array[3]=attar3;
							array[4]=attar4;
							array[5]=attar5;
							$.get('http://cncms.csc86.com/formguide/index.php', array, function(data) {
								if(data.status==true){
									$('#cjzb_company_name').val("");
									$('#cjzb_name').val("");
									$('#cjzb_phone_number').val("");
									layer.closeAll()
									alert('提交成功!')
								}else{
									alert('提交失败!')
								}
							}, 'jsonp');
						}

					});
				}
			});
		},
		init:function(){

			//document.addEventListener('touchstart',touch, false);
			//document.addEventListener('touchmove',touch, false);
			//document.addEventListener('touchend',touch, false);

			$('#toplf').on('click',function(){
				var This=$(this);
				var slideUl= This.siblings('.cen2_all').find('ul');
				slideUl.children().stop(true,true);

					slideUl.children().first().animate({marginLeft: "-" + 2.01 + "rem"}, 500, function () {
						$(this).appendTo(slideUl).css("margin-left", 0.03+'rem');
					});

			})

			$('#toprt').on('click',function(){
				var This=$(this);
				var slideUl=This.siblings('.cen2_all').find('ul');
				slideUl.children().stop(true,true);

				//slideUl.find('li').css("margin-left", 0);
				slideUl.children().last().css("margin-left", -2.01 + "rem").prependTo(slideUl).animate({marginLeft: 0.03+'rem'}, 500);

			});

			$('.cen2_all').find('li').on('click',function(){
				var index = $(".cen2_all li").index(this);

				var len=$('.cen2_all').find('li').length;
				for(var i=0;i<len;i++)
				{
					if(i==index)
					{
						$('.tables_gys').eq(i).show();
						$('.cen2_all').find('li').eq(i).css('background-color','#e66206');
						$('.cen2_all').find('li').eq(i).find('img').attr('src','image/2-1'+(i+1)+'.png');
					}else{
						$('.tables_gys').eq(i).hide();
						$('.cen2_all').find('li').eq(i).css('background-color','#39507f');
						$('.cen2_all').find('li').eq(i).find('img').attr('src','image/2-'+(i+1)+'.png');
					}
				}

			});
			$('.wxcen').find('li').bind('touchstart',function(e){
				//$(this).find('.wxrt').css('color','#00fff0');
				$(this).find('.wxtc').show();
				$(".wxcen .wxtc").not($(this).find('.wxtc').get(0)).hide();
			});

			$('body').bind('touchstart',function(e){
				if(!$.contains($(".wxcen").get(0),e.target )){
					$(this).find('.wxtc').hide();
				}
			});
			//$('.wxcen').find('li').bind('touchend',function(){
			//	$(this).find('.wxtc').hide()
			//})


			$('#add_gys').on('click',function(){
				gysz.tips('success',true,null,null);
			})
			$('#add_gysl').on('click',function(){
				gysz.tips('success',true,null,null);
			})
			$('.sle_more').on('click',function(){
				var slideUl= $('.hzpp_ul');
				slideUl.children().stop(true,true);
				slideUl.children().first().animate({marginLeft: "-" + 9.5 + "rem"}, 500, function () {
					$(this).appendTo(slideUl).css("margin-left", 0)
				});
			})
		}

	}
	//exports.module=gysz;
	gysz.init();
});



