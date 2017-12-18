/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	var upload=require('c/member/wslm/smartreply/js/upload'),
		  dialog = require('m/dialog/js/init');
		 // login=require('c/member/common/js/verfylogin');

	//热门活动标题切换
	$(".atn-nav ul>li").on("click",function(){
		hover_more($(this),".atn-nav ul>li",".atn-tab>li");
	});
	
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
		dialog({
			id:id,
			width:'200px',
			title:tmp,
			content: '<div class="lodingimg"><img src="//res.csc86.com/v2/c/member/wslm/smartreply/css/img/loading.gif" alt="" /></div>',
			padding:"0 10px",
			cancel:false
		});
	}
	
	//图片上传
	if($('#fileupload').length>0){
		  $('#fileupload').fileupload({
				dataType: 'json',
				maxFileSize: 5000000,//文件最大5MB
				progressall:function(){
					loading("上传语音","upvoid");
				},
				done: function (e,data) {
					art.dialog({id: 'upvoid'}).close();
					var $img = $("#filevoid");
					startdata(data.result,function(){
						$img.val(data.result.data.nativeName);	
						$img.siblings("input[name='fileName']").attr("value",data.result.data.fileName);
					});
				}
		});
	}
	if($('#fileuploadimg').length>0){
		  $('#fileuploadimg').fileupload({
				dataType: 'json',
				maxFileSize: 2000000,//文件最大5MB
				progressall:function(){
					loading("上传图片","upimg");
				},
				done: function (e,data) {
					art.dialog({id: 'upimg'}).close();
					var $img = $("#filimg");
					startdata(data.result,function(){
						$img.val(data.result.data.nativeName);
						$img.siblings("input[name='fileName']").attr("value",data.result.data.fileName);
					});
				}
		});
	}
	
		
	//tmp:$(this);elem:当前事件元素；add：同时要添加删除的class;
	function hover_more(tmp,elem,add,num){
		var length=arguments.length;
		if(length==3){
			$th=tmp.index();
			$(add).removeClass("cur");
			$(add).eq($th).addClass("cur");
		}
		$(elem).removeClass("cur");
		tmp.addClass("cur");
	}
	
	//提交选择FORM
	var $textForm = $('form[data-type="text"]');
	var $imgForm = $('form[data-type="img"]');
	var $voidForm = $('form[data-type="void"]');
	var $textAddForm = $('form[data-type="text-add"]');
	var $imgaddtoForm = $('form[data-type="imgaddto"]');
	function postsubmit(ev,set,fun){
		ev.preventDefault();
		var tel=set.attr('data-type')=='text'?set.find("textarea").val():(set.attr('data-type')=='text-add'?set.find("input[name='keywords']").val():set.find("input[name='title']").val());
		var ut=(set.attr('data-type')=='imgaddto'||set.attr('data-type')=='img')?1:(set.attr('data-type')=='void'?2:0);
		if(tel==""){dialog.tip("带“<i class='colortip'>*</i>”为必填项！",1.5);return false;}
		if(ut==1){
			var url=set.find("input[name='url']").val();
			if(url!=""&&url.indexOf("http://")<0){
				dialog.tip('链接格式以“http://”开头！',1.5);return false;
			}
		}else if(ut==2){
			set.find("input.text-btn").attr("value","正在保存...");
		}
		$.post(window.location.href,set.serializeArray(),function(data){
			startdata(data,function(){
				fun();				
			});	
		},"json");
		return false;
	}
	
	//自定义回复 文本
	$textForm.bind('submit', function(event){
		postsubmit(event,$textForm,function(){
			$imgForm.find("input[name='title']").val("");
			$imgForm.find("input[name='url']").val("");
			$imgForm.find("#filimg").val("");
			$voidForm.find("#filevoid").val("");
			$voidForm.find("input[name='title']").val("");
			$voidForm.find("input[name='depict']").val("");									
		});
	});
	
	
	
	//自定义回复 图文
	$imgForm.bind('submit', function(event){
		postsubmit(event,$imgForm,function(){
			$textForm.find("textarea").val("");	
			$voidForm.find("input[name='title']").val("");
			$voidForm.find("input[name='depict']").val("");	
			$voidForm.find("#filevoid").val("");								
		});
	});
	
	
	//自定义回复 语音
	$voidForm.bind('submit', function(event){
		postsubmit(event,$voidForm,function(){
			$voidForm.find("input.text-btn").attr("value","提交保存");
			$textForm.find("textarea").val("");	
			$imgForm.find("input[name='title']").val("");
			$imgForm.find("input[name='url']").val("");	
			$imgForm.find("#filimg").val("");							
		});
	});	
	
	//自定义回复 文本 添加回复
	$textAddForm.bind('submit', function(event){
		postsubmit(event,$textAddForm,function(){
			if(!($textAddForm.find("input[name='id']").val())){
				$textAddForm.find("input[name='keywords']").val("");
				$textAddForm.find("textarea[name='content']").val("");	
			}							
		});
	});	
	
	
	//构选
	var selectAll = function (){
		var
			$all = $("[name='all']"),
			$inquiryId = $(".c :checkbox");
		$all.on("change",function (){
			var	prop = $(this).prop("checked");
			$all.prop("checked",prop);
			$inquiryId.prop("checked",prop);
		});
		$inquiryId.on("change",function (){
			$inquiryId.filter(":not(:checked)").length ? $all.prop("checked",false) : $all.prop("checked",true);
		});
		return this;
	};
	
	selectAll();
	
	
	
	//删除
	$(".af-page ul .del").click(function(event){
		event.preventDefault();
		var links=$(this).children("a").attr("href");
		if($(".c :checkbox:checked").length){
			var	msg = "确定要删除所选项吗？";
			dialog.confirm(msg,function (){
				var ids = [];
				$(".c :checkbox:checked").each(function (i,v){
					ids[i] = v.value;
				});
				$.post(links,{"ids":ids},function (data){
					startdata(data,function(){window.location.reload();});
				},"jsonp");
			});
		}else{
			dialog.tip("请选中数据后操作");
		}
		return;
	});
	  
		
	//自定义回复 文本 添加回复
	var $imgAdd = $(".attention .imgadd");
	$imgAdd.click(function(event){
		event.preventDefault();
		var links,keyval,check01,check02,$th=$(this);
		if($th.is("li")){
			links=$th.children("a").attr("href");
			keyval="";
			check01='<input type="radio" id="RadioGroup1_0" value="1" name="isMatch">';
			check02='<input type="radio" id="RadioGroup1_1" value="0" name="isMatch" checked="checked">';
		}else{
			links=$th.attr("href");
			keyval=$th.closest("tr").find(".keyedit").html();
			check01=$th.attr("data-type")==1?'<input type="radio" id="RadioGroup1_0" value="1" name="isMatch" checked="checked">':'<input type="radio" id="RadioGroup1_0" value="1" name="isMatch">';
			check02=$th.attr("data-type")==0?'<input type="radio" id="RadioGroup1_1" value="0" name="isMatch" checked="checked">':'<input type="radio" id="RadioGroup1_1" value="0" name="isMatch">';
		}
		dialog({
				id:"imgAdd",
				width:"660px",
				title:'添加回复规则',
				content: '<div class="imgaddlay"><ul class="sig"><li class="til">关键词:</li><li class="sig-r"><input type="text" maxlength="100" class="text-input" value="'+keyval+'" name="keywords"><span class="sig-tip"><i>*</i>多个关键词请用|格开：例如: 美丽|漂亮|好看 </span></li></ul><ul class="sig"><li class="til">匹配类型:</li><li class="sig-r"><label>'+check01+'完全匹配(用户输入的和此关键词一样才会触发!)</label><Br /><label>'+check02+'包含匹配 (只要用户输入的文字包含本关键词就触发!)</label></li></ul></div>',
				okVal: '确定',
				padding:"0 10px",
				cancelVal:"取消",
				cancel:true,
				ok:function(){
					var key=$(".imgaddlay .text-input").val();
					if(key==""){dialog.tip("带“<i class='colortip'>*</i>”为必填项！",1.5);return false;}
					$.post(links,{"keywords":key,"isMatch":$(".imgaddlay .sig-r input:checked").attr("value")},function(data){
						startdata(data,function(){window.location.reload();});
					},"json");
				}
			});
		
		return false;
	});	
	
	//自定义回复 图文
	$imgaddtoForm.bind('submit', function(event){
		postsubmit(event,$imgaddtoForm,function(){
			$imgaddtoForm.find(".text-input").val("");		
			$imgaddtoForm.find("textarea[name='content']").val("");							
		});
	});
	
	//图文回复列表 排序
	$("tbody.af-list-bd input.px").blur(function(){
		var $th=$(this);
		if($th.attr("data-type")!=$th.val()){
			$.post($("#sortlinks").val(),{"id":$th.closest("tr").find(".c").children("input").val(),"display":$th.val()},function(data){
				startdata(data,function(){window.location.reload();});
			},"json");
		}
		
	});
	//页面加载计算字数
	if($textForm.length>0){
		var curLength=$textForm.find("textarea ").val().length;	
		$textForm.find("span.po").html("*还可以输入"+(600-curLength)+"字");
	}


});

//自定义回复 文本控制在600字内
function limitChars(tmp){
	var $th=$(tmp);
	var curLength=$th.val().length;	
	if(curLength>=600){
		var num=$th.val().substr(0,600);
		$th.val(num);
	}
	$th.siblings("span.po").html("*还可以输入"+(600-$th.val().length)+"字");
}

