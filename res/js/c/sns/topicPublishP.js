var Kmsg_text;
var imgUrl=csc.url("img");
$(function(){
	if(typeof(KindEditor) != "undefined"){
	KindEditor.each({ 
			'plug-align' : {
				name : '对齐方式',
				method : {
					'justifyleft' : '左对齐',
					'justifycenter' : '居中对齐',
					'justifyright' : '右对齐'
				}
			},
			'plug-indent' : {
				name : '缩进',
				method : {
					'indent' : '向右缩进',
					'outdent' : '向左缩进'
				}
			}
		},function( pluginName, pluginData ){
			var lang = {};
			lang[pluginName] = pluginData.name;
			KindEditor.lang( lang );
			KindEditor.plugin( pluginName, function(K) {
				var self = this;
				self.clickToolbar( pluginName, function() {
					var menu = self.createMenu({
							name : pluginName,
							width : pluginData.width || 100
						});
					KindEditor.each( pluginData.method, function( i, v ){
						menu.addItem({
							title : v,
							checked : false,
							iconClass : pluginName+'-'+i,
							click : function() {
								self.exec(i).hideMenu();
							}
						});
					})
				});
			});
			KindEditor.options.filterLink = true;KindEditor.options.untarget=true;
			KindEditor.plugin('multiimage', function(K) {
				var self = this, name = 'multiimage';
				self.clickToolbar(name, function() {
						up10img();
				})
			})
		});
		Kmsg_text = KindEditor.create('#topicDescription', {
			themeType : 'qq',
			//items : ['bold','fontsize','forecolor','emoticons','multiimage'],
			items : ['bold','italic','fontsize','forecolor','plug-align','link','unlink','emoticons','multiimage'],
			cssData:'body {font-size:14px;}',
			fontSizeTable:['12px','14px','16px','18px','24px','32px'],
			afterChange : function(){
				this.sync();
				var msg_txt = $("#topicDescription").parent().find(".pct_po");
				msg_txt.text(this.count('text') + "/3000");
				if(this.count('text')==0||$(".pl_in").val()==""||$(".pl_in").val()=="最多30个字"){
					if(this.count('text')>3000){
						msg_txt.attr("style","color:#F00;");
						KindEditor(".pb-btn-21").html('<input type="button" class="pb_b" value="提交">');
					}else{
						KindEditor(".pb-btn-21").html('<input type="button" class="pb_b" value="提交">');
					}
				}else if(this.count('text')<=3000){
					msg_txt.removeAttr("style");
					KindEditor(".pb-btn-21").html('<input type="button" class="pb_sub" value="提交">');
				}else{
					msg_txt.attr("style","color:#F00;");
					KindEditor(".pb-btn-21").html('<input type="button" class="pb_b" value="提交">');
				}
			}
		});
	}
	
function up10img() {
	csc.useDialog(function(){
	artDialog({
		title:'上传图片',
		cancelVal:'取消',
		cancel: true,
		content: "<iframe src='//quan.csc86.com/picupload.html' id='editTopicImg' frameborder='0' scrolling='no'></iframe>",
		okVal: '插入图片',
		padding:"0 10px",
		ok:function(){
			var iul=$("#upMsg",$("#editTopicImg").contents()),
				imgLg=$("#upMsg",$("#editTopicImg").contents()).children("li").html(),
				img=[],
				$lg=$("#upMsg",$("#editTopicImg").contents()).children("li").length;
			if($lg<=0){
				csc.useDialog(function(){csc.alert("未有图片，请选择图片！");});
				return false;
			}else if(imgLg.indexOf("图片上传中")>0){
				csc.useDialog(function(){csc.alert("图片正在上传，请稍等！");});
				return false;
			}else if($lg>10){
				csc.useDialog(function(){csc.alert("最多10张图片！");});
				return false;
			}else{
				if($lg>0){
					for(var i=0;i<$lg;i++){
						if($("#upMsg",$("#editTopicImg").contents()).children("li").eq(i).html().indexOf("上传失败")>0){
							
						}else{
							img.push("<img alt='' src='"+imgUrl+$("#upMsg",$("#editTopicImg").contents()).children("li").eq(i).children("a").attr("data-img")+"' />");
						}
						
					}
					//alert(img.join(''));return;
					var imgall=img.join('');
					Kmsg_text.insertHtml(imgall);
				}
			}
		},
		fixed: true,
		background:"#000",
		opacity:"0.3",
		lock:true
	});	
});	
}
	//回复隐藏
	$("div.dc-btn a").live("click",function(){
		var $th=$(this);
		if($th.is(".db-ry-n")){
			$(".dk-con").find(".dc-con").removeClass("mb-show");
			$(".dc-btn").find(".db-bg-h").removeClass("drw-s");
			$(".dc-btn").find(".db-ry-n").removeClass("drw-h");
			$th.parent(".dc-btn").find(".db-bg-h").addClass("drw-s");
			$th.parent(".dc-btn").find(".db-ry-n").addClass("drw-h");
			$th.closest(".dk-con").find(".dc-con").addClass("mb-show");
		}else{
			$th.closest(".dk-con").find(".dc-con").removeClass("mb-show");
			$th.parent(".dc-btn").find(".db-bg-h").removeClass("drw-s");
			$th.parent(".dc-btn").find(".db-ry-n").removeClass("drw-h");
		}		   
	});
	
	//发表话题按钮	
	$("input.pl_in").blur(function(){
			if($(this).val()==""||$(this).val()=="最多30个字"||Kmsg_text.html()===""||Kmsg_text.html()==="<br>"){
				$(".pb-btn-21").html('<input type="button" value="提交" class="pb_b">');
			}else{
				$(".pb-btn-21").html('<input type="button" value="提交" class="pb_sub">');
			}	   
	}).focus(function(){
			if($(this).val()==""||$(this).val()=="最多30个字"||Kmsg_text.html()===""||Kmsg_text.html()==="<br>"){
				$(".pb-btn-21").html('<input type="button" value="提交" class="pb_b">');
			}else{
				$(".pb-btn-21").html('<input type="button" value="提交" class="pb_sub">');
			}	
	});
	
});

//发起新话题
var sb=false;
csc.topicPh=function(){
	var editorTxt =Kmsg_text.html() ;
	var efl=$.trim($(".pct_po").html()).split("/"),err="";
	var imgVal=$(document.getElementsByTagName('iframe')[0].contentWindow.document.body).find("img"),j=[];
	for(var i=0,t=imgVal.length;i<t;i++){
		var ig=imgVal.eq(i).attr("src");
		if(ig.indexOf("img.csc86.com")>0){
			j.push("1");
		}
	}
	if(j.length>10){
		err="最多上传10张图片！";
	}
	if(editorTxt===""||editorTxt==="<br>"){
		//err="内容不能为空";
		$("pb-btn-21").html('<input type="button" value="提交" class="pb_b">');
		return false;
	}
	if($("input[id=title]").val()==""||$("input[id=title]").val()=="最多30个字"){
		//err="标题不能为空";
		$(".pb-btn-21").html('<input type="button" value="提交" class="pb_b">');
		return false;
	}
	if(efl[0]>3000){
		//err = "内容不能超出3000字";
		$(".pb-btn-21").html('<input type="button" value="提交" class="pb_b">');
		return false;
	}
	if(err!==""){
		csc.useDialog(function (){csc.alert(err);});
		return false;
	}
	if(!sb){
		sb=true;
		return true;
	}else{
		return false;
	}	
}

function fontLeng(tmp){
	var leng=$(tmp).val().length;
	if(leng>0&&Kmsg_text.html()!=""){
		$(".pb-btn-21").html('<input type="button" value="提交" class="pb_sub">');
	}else{
		$(".pb-btn-21").html('<input type="button" value="提交" class="pb_b">');
	}
}
