/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	require('//res.csc86.com/v2/c/member/zhongxin/public/js/init'),
	require('//res.csc86.com/v2/m/dialog/js/init');
		  

	//接口回调状态
	function startdata(tmp,fun){
		if(tmp.status==true){
			dialog.success(tmp.msg,1.5);
			fun();
		}else{
			dialog.tip(tmp.msg,1.5);
		}
	}
	
	//正在加载
	function loading(tmp,id){
		art.dialog({
			id:id,
			width:'200px',
			title:tmp,
			content: '<div class="lodingimg"><img src="//res.csc86.com/v2/c/member/wslm/smartreply/css/img/loading.gif" alt="" /></div>',
			padding:"0 10px",
			cancel:false
		});
	}
	
	//图片上传
	//上传营业执照
	if($('#fileuploadyy').length>0){
		  $('#fileuploadyy').fileupload({
				dataType: 'json',
				singleFileUploads:true,//单文件上传
				progressall:function(){
					loading("上传图片","upimg");
				},
				add:function(e,data){
					var fileInfo=data.files[0];
					var regx=/(\.|\/)(jpe?g|png)$/i;
					if(!regx.test(fileInfo.name)){
						artDialog.tip("仅支持jpg、png格式图片，请选择正确的图片格式！",3);
						return false;
					}else{
						if(fileInfo.size>1024*200){
							artDialog.tip("图片大小不得超过200KB！",2.5);
							return false;
						}else{
							data.submit();
						}
					}
				},
				done: function (e,data){
					art.dialog({id: 'upimg'}).close();
					var $img = $("#fileuploadyy").closest(".downimg");
					if(data.result.result=="success"){
						var arr=data.files[0].name.split('.');
						$img.siblings(".license").find("img").attr("src","//img.csc86.com"+data.result.key);
						$img.siblings("input[name='licenseImg']").attr("value",data.result.key);
						$('input[name=licenseImgType]').val(arr[arr.length-1]);
					}else{
						artDialog.tip(data.result.key);
					}
				}
		});
	}
	
	//旺铺
	if($('#fileuploadwp').length>0){
		  $('#fileuploadwp').fileupload({
				dataType: 'json',
				singleFileUploads:true, //单文件上传
				progressall:function(){
					loading("上传图片","upvoid");
				},
				add:function(e,data){
					var fileInfo=data.files[0];
					var regx=/(\.|\/)(jpe?g|png)$/i;
					if(!regx.test(fileInfo.name)){
						artDialog.tip("仅支持jpg、png格式图片，请选择正确的图片格式！",3);
						return false;
					}else{
						if(fileInfo.size>1024*100){
							artDialog.tip("图片大小不得超过100KB！",2.5);
							return false;
						}else{
							data.submit();
						}
					}
				},
				done: function (e,data) {
					art.dialog({id: 'upvoid'}).close();
					var $img = $("#fileuploadwp").closest(".downimg");
					if(data.result.result=="success"){
						var arr=data.files[0].name.split('.');
						$img.siblings(".license").find("img").attr("src","//img.csc86.com"+data.result.key);
						$img.siblings("input[name='logo']").attr("value",data.result.key);
						$('input[name=logoType]').val(arr[arr.length-1]);
					}else{
						artDialog.tip(data.result.key);
					}
				}
		});
	}
	
	//第二步提交
	function remoceclasst(tmp){
		tmp.siblings("span.ity-tip").removeClass("right");
	}
	function addclasst(tmp){
		tmp.siblings("span.ity-tip").addClass("right");
	}
	$(".tab-w select[name='market']").focus(function(){
		$(this).siblings("span.ity-tip").addClass("right");
	}).blur(function(){
		var $th=$(this);
		if($th.children("option:selected").html()=="请选择市场"){
			$th.siblings("span.ity-tip").removeClass("right");
		}else{
			 $th.siblings("span.ity-tip").addClass("right");
		}
	});
	$(".pdbox input[type='checkbox']").bind("click",function(){
		if($(this).is(":checked")){
			$(this).parent().siblings("span.ity-tip").addClass("right");
		}else{
			$(this).parent().siblings("span.ity-tip").removeClass("right");
		}													 
	});
	var formshidi=$("form[data-type='shidi-two']");
	formshidi.bind('submit', function(){
		var tva=formshidi.find("label");
		var fixDate=$("input[name='fixDate']").val();
		if(!fixDate){
			remoceclasst($("input[name='fixDate']"));
		}else{
			addclasst($("input[name='fixDate']"));
		}
		if($("select[name='market'] option:checked").html()=="请选择市场"){
			remoceclasst($("select[name='market']"));
		}else{
			addclasst($("select[name='market']"));
		}
		if(formshidi.find("label").children("input:checked").length==0){
			remoceclasst($("form[data-type='shidi-two'] .pdbox label"));
		}else{
			addclasst($("form[data-type='shidi-two'] .pdbox label"));
		}
		if($("form[data-type='shidi-two'] span.ity-tip:visible").length>0){
			return false;
		}
	});
	
	//第三步提交
	function sdrzSccssPop(){
		var dg=art.dialog({
			id:'sfrzSuccess',
			title:false,
			content: '<div class="sfrz-success"><div class="bd"><h2>您提交的申请已受理！</h2><p>请您保持手机号码畅通，取证工作人员会尽快和您联系确认。后续您可以通过企业认证--企业实地认证中查询认证进展！</p></div><div class="ft"><a class="okbtn" href="?">确定</a></div></div>',
			opacity:0.2,
			padding:"20px 25px 20px 20px",
			fixed:true,
			lock:true,
			init:function(){
				$('.sfrz-success .okbtn').bind('click',function(){
					$('#savaLocalAll').submit();
					return false;
				});
			}
		});	
	}
	$('#sdrzOkBtn1').bind('click',function(){
		sdrzSccssPop();
	});

});

