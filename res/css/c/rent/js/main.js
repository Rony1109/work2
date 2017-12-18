$(document).ready(function(){
	//选项卡切换
	isLogin(".top-sign-info","isLogin.html","messagecount.html");
  //$(".submit").mousedown(function(){
  	//if(!isFlag){window.location.href="//member.csc86.com/login/phone/";}
  //});
	//底部更多
		$(".links-down").click(function(){
            if($(this).siblings('span').height()<30){
                $(this).css("background-position","31px -10px").siblings('span').height(44);
            }
            else{
                $(this).css("background-position","31px 6px").siblings('span').height(22);
            }
            
        });


	/*$('#wrapper div.caption a').each(function(index){
		var me = $(this);
		//点击标题切换
		me.click(function(){
			$(this).addClass('active').css({
				background: 'url(//res.csc86.com/css/c/rent/images/active'+ (index == 0 ? 1 : 2) +'.jpg) no-repeat'
			}).siblings('a').removeClass('active').css({
				background: 'url(//res.csc86.com/css/c/rent/images/title'+ (index == 0 ? 2 : 1) +'.jpg) no-repeat'
			});
			//运动效果
			$(this).parent().find('b').animate({
				left : index == 0 ? 10 : 160
			});
			//内容切换
			$('#wrapper').find('form').eq(index).show().siblings().hide();
			//阻止默认事件
			return false;
		});
	});*/

	//表单提交
	$('input').each(function(){
		$(this).val($(this).attr("place"));
		$(this).focus(function(){
			if($(this).val()==$(this).attr("place")){$(this).val("");}
		}).blur(function(){
			if($.trim($(this).val())==""){$(this).val($(this).attr("place"));}
		  
			if($(this).attr("zrequired")=="1"){
			if($(this).val()==""||$(this).val()==$(this).attr("place")){
				$(this).css("border","1px solid red");
				$(this).attr("tit","0");

					}
					else if(!(new RegExp($(this).attr("zpattern")).test($(this).val()))){
						$(this).css("border","1px solid red");
						//$(this).select();
						$(this).attr("tit","0");
					}else{$(this).attr("tit","1");}
		}else{
			if($(this).val()==""||$(this).val()==$(this).attr("place")){
						$(this).attr("tit","1");
					}
					else if(!(new RegExp($(this).attr("zpattern")).test($(this).val()))){
						$(this).css("border","1px solid red");
						$(this).attr("tit","0");
					}else{$(this).attr("tit","1");}
		}
		if($(this).attr("tit")=="1"){$(this).css("border","1px solid #dedddd");}
		
		});
	});

	$('#rent , #claim').each(function(){
		var me = $(this);
 		me.submit(function(){
 			if(!isFlag){window.location.href="//member.csc86.com/login/phone/";return false;}
 			var inputArray=me.find('input[type=text]');
			for(var i=0;i<inputArray.length;i++){
				if($(inputArray[i]).attr("tit")=="0"){
					return false;
				}
				if($(inputArray[i]).val()==$(inputArray[i]).attr("place")){
					$(inputArray[i]).val("");
				}
			}
			
			$.post("//cncms.csc86.com/formguide/index.php",$(this).serialize(),function(data){
				//if(data){
					//alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
					//$(this).find('input').val('');
				//}else{
					//alert("申请失败，请刷新后重试！");
				//}
			});
		});
	});



	function dialog(obj , shadow){
		shadow.css({
			width : $(document).width(),
			height : $(document).height(),
			background : '#666',
			zIndex : 998,
			opacity : 0.6
		}).show();

		obj.show();

		$('div.close a').click(function(){
			obj.hide();
			shadow.hide();
			return false;
		});
	}

	/*
		validForm(form , {
			field1 : {
				required : true,
				reg : reg1,
			},
			field2 : {
				required : true,
				reg : reg2,
			}
		});
	

	function validForm(form , options){
		$(form).submit(function(){
			$.each(options , function(){
				alert();
			});
		});
	}*/ 

});