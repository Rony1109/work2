/**
 * 会员中心
 * 
 */
define(function(require, exports, module) {

	/*图片上传插件*/
	require('c/member/wslm/public/js/fileUpload/jquery.ui.widget');
	require('c/member/wslm/public/js/fileUpload/jquery.iframe-transport');
	require('c/member/wslm/public/js/fileUpload/jquery.fileupload');

	require("m/jsM/placeholder")("input[placeholder]");//为input添加提示语[placeholder]
	require("tab")("#prizeTab li","#prizeCont>div","click","cur");//tab切换
	require("l/My97DatePicker/4.8/WdatePicker");//日期插件
	var dialog = require('m/dialog/js/init');//弹出框


	module.exports = {
		verfyLine : function(inputdom){//检测"|"
			var $inputdom = $(inputdom),
				inputval = $.trim($inputdom.val());

			if (inputval.indexOf("|") > -1){
				$inputdom.siblings('font.erro').remove();
				$inputdom.parent().append('<font class="erro v-t c-ef0000"><b class="m-l10 m-r5">*</b> 关键词中不能包含“|”</font>');
				return false;
			}else{
				$inputdom.siblings('font.erro').remove();
				return true;
			}
		},
		verfyBlank : function(inputdom){//验证是否为空
			var $inputdom = $(inputdom),
				inputval = $.trim($inputdom.val());

			if (!inputval){
				$inputdom.siblings('font.erro').remove();
				$inputdom.parent().append('<font class="erro v-t c-ef0000"><b class="m-l10 m-r5">*</b> 不能为空</font>');
				return false;
			}else{
				$inputdom.siblings('font.erro').remove();
				return true;
			}
		},
		verfyImg : function(obj){//验证图片是否上传
			var $obj = $(obj);
			if($obj.prop("src") == "//res.csc86.com/v2/c/member/wslm/micromarketing/css/img/0.jpg" || $obj.prop("src") == "" ){
				$obj.siblings('font.erro').remove();
				$obj.parent().append('<font class="erro v-t c-ef0000"><b class="m-l10 m-r5 v-t">*</b> 您还没有上传图片</font>');
				return true;
			}else{
				$obj.siblings('font.erro').remove();
				return true;
			}
		},
		replaceVal : function(obj,o){//只能输入数字或大于0的数字
			var o = o || false;
			$(obj).live("keyup",function(){
				var $input = $(this);
				$input.val($input.val().replace(/\D/g,''));
				if(o){
					if($input.val() == 0){ $input.val('') };
				}
			});
		}
	}


	var $prizecont = $("#prizeCont"),	//整个添加内容的父级
		$prizeTab = $("#prizeTab"),		//tab标签父级
		$img = $("#uploaded"),			//图片
		$nextSet = $("#nextSet"),		//下一步按钮
		$submitbtn = $("#submitBtn");	//提交按钮

	module.exports.replaceVal(".input-num");
	module.exports.replaceVal(".input-num2",true)

	function startdata(tmp,fun){//接口回调状态
		if(tmp.status==true){
			dialog.success(tmp.msg,1.5);
			fun();
		}else{
			dialog.tip(tmp.msg,1.5);
		}
	}

	function loading(tmp,id){//正在加载中[弹出框]
		dialog({
			id:id,
			width:'200px',
			title:tmp,
			content: '<div class="lodingimg"><br><br><img src="//res.csc86.com/v2/c/member/wslm/smartreply/css/img/loading.gif" alt="" /><br><br></div>',
			padding:"0 10px",
			cancel:false
		});
	};

	if($('#uploadImg').length>0){
		$('#uploadImg').fileupload({//上传图片
			dataType: 'json',
			progressall:function(){
				loading("上传图片","upimage");
			},
			done: function (e,data) {
				dialog({id: 'upimage'}).close();
				if( data.total > 2048000 ){//限制文件上传大小2MB
					dialog.error("图片大小不能超过2MB，请重新上传！")
				}else{
					startdata(data.result,function(){
						$img.prop("src",data.result.data.url);
						$img.siblings("input[name='fileName']").prop("value",data.result.data.fileName);
						$img.siblings('font.erro').remove();
					});
				}
			}
		});
	};
	
	$nextSet.bind("click",function(){//下一步按钮事件

		var prizecont = $prizecont.children(":first");
		var input = prizecont.find("input[type='text']");
		for(i = 0; i< input.length; i++){ module.exports.verfyBlank(input[i]) };//提交验证是否为空
		module.exports.verfyImg($img)//验证图片是否上传
		var erro = prizecont.find("font.erro").length;
		if( erro > 0 ){ return false; }else{//进入下一选项
			$prizecont.children(":last").show().siblings().hide();
			$prizeTab.children(":last").addClass('cur').siblings().removeClass('cur');
		}
	});

	$prizecont.delegate("input[type='text']","blur",function(){//输入框失去焦点时的验证
		if($(this).prop("id") == "keyword" ){
			if ( module.exports.verfyBlank($(this)) ) {
				module.exports.verfyLine(this);
			}
		}else{
			module.exports.verfyBlank($(this));
		}
	});

	var submitEvent = function(){//提交表单事件

		var input = $prizecont.find("input[type='text']");
		for(i = 0; i< input.length; i++){ module.exports.verfyBlank(input[i]) };//提交验证是否为空
		module.exports.verfyImg($img)//验证图片是否上传

		var erro = $prizecont.find("font.erro").length;

		if(erro>0){ return false; }else{

			$submitbtn.unbind("click");

			loading("添加活动","submitform");

			var formlist = $prizecont.closest("form").serialize();
			$.post(window.location.href,formlist,function(response){
				if (response.status) {
					dialog({id: 'submitform'}).close();
					if($("#edit").val() > 0 ){
						dialog.success(response.msg,1.5); $submitbtn.bind("click",submitEvent);
					}else{
						dialog.success(response.msg,1.5,function(){window.location.href = response.data.redirectUrl});
					}
				}else{
					dialog({id: 'submitform'}).close();
					dialog.error(response.msg);
					$submitbtn.bind("click",submitEvent);
					if($("#edit").val() <= 0 ){
						$img.prop("src","//res.csc86.com/v2/c/member/wslm/micromarketing/css/img/0.jpg");
					}
				}
			},"json")
		}
	};

	$submitbtn.bind("click",submitEvent);//绑定提交事件

});