csc.news = {};

function checkEdit(editor){
	var 
		editor = editor || newsContent || {},
		amountErr='';
	if(editor.count('img')>10){
		amountErr = '插入的图片超过了最大值10张';
	}else if(editor.count('text') === 0){
		amountErr = '文章内容不能为空';
	}else if(editor.count('text') < 50 || editor.count('text') > 20000){
		amountErr ='内容最少为50个字，最多不可超过20000个字';
	}else if(editor.count('text') < 20001 && editor.count('html') > 60000){
		amountErr ='您表单中填写的数据量过大';
	}
	return _showErr(amountErr);
};

function _showErr(err){
	var err = err;
	if(err===''){
		$("#n-editor").hide();
	}else{
		$("#amountErr").addClass("g-f-error").html(err).parents(".aff-value").addClass("g-f-error");
		$("#n-editor").show();
		return false;
	}
}

//上传图片处理
function shopNewsSuccess(file, serverData){
	var response =  eval('(' + serverData + ')');
	var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]),stauts="upload";
	csc.useDialog(function (){
		if(response.result !== "success"){
			var msg = response.msg || "上传失败!";
			csc.useDialog(function (){
				csc.error(msg);
			});
			return;
		}
		if(window.location.href.indexOf("publish")!=-1){
			$("#imgUrl"+id).val(response.key);
			$("#imgload0"+id).attr("src",url);
			$("#news-pic").show();
		}
	});
}

//公司动态删除
function newsDel(id,msg){
	var
	_url,
	_id = id,
	_msg = msg;
	if(location.href.indexOf("status=N") != -1){
			_url = '/shop/list.html?status=N'
		}else{
			_url = '/shop/list.html'
		}
		if(_id.length>0){
			artDialog({
				id:"cscTip",
				content:_msg,
				fixed: true,
				title: false,
				icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
				ok:function(){
					$.post(_url,{"delid":_id},function(data){
						if(data.status){
							location.reload();
						}
					},"jsonp");
				},
 				cancel: true
			});
		}else{
			csc.tip("请选中数据后操作！",2.5);
		}
}

$(function(){
	
	//公司动态编辑
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
				'plug-order' : {
					name : '编号',
					method : {
						'insertorderedlist' : '数字编号',
						'insertunorderedlist' : '项目编号'
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
				var lang = {
	              'image':'网络图片',
	              'multiimage':'本地上传'
	            };
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
			});
		window.newsContent = KindEditor.create('#newscontent', {
			themeType : 'qq',
			allowImageUpload:false,
			uploadJson:csc.url("img","/upload?type=shopNewsTexteditor"),
			items : ['bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent','link','image','multiimage','table'],
			untarget:true,
			filterLink:true,
			afterChange : function(){
				this.sync();
				var
				msg_txt = $("#newscontent").parent().find(".f-amount"),
				amount = this.count('text');
				msg_txt.text( amount + "/20000");
			},afterBlur:function(){
				checkEdit(this);
			}
		});
	}
	
	//删除图片
	$("#news-pic").delegate(".xc","click",function(){
		$(this).parents("#news-pic").hide();
		$("#imgUrl0").val("");
	});
	
	/*var failtip = $("#failtip").val();
	csc.useDialog(function(){
		if(failtip ===""){
			csc.tip("发表失败");
		}else if(failtip ==="-1"){
			csc.tip("您填写的信息中包含违禁词，请修改后再提交");
		}
	});*/
	//公司动态批量删除
csc.useDialog(function(){
	$(".news-list .del-all").bind("click",function(){
		var delid=$(".news-list .af-list-bd input:checked").map(function() {
			return this.id;
		}).get(),
		msg = '确定要删除所选择的动态吗？';
		newsDel(delid,msg);
	});
	
	//公司动态列表删除
	$(".news-list .af-list-bd .del").bind("click",function(){
		var
		$t = $(this),
		delid = $t.parents("tr").find("input").map(function(){
			return this.id;
		}).get(),
		msg='确定要删除这条动态吗？'
		newsDel(delid,msg);
	});
});


	$('.checkedAll label input').click(function(){
		$('.news-list tbody input[type="checkbox"],.checkedAll input[type="checkbox"]').attr('checked',this.checked);
	});
	
	//动态预览
	$("#preview").bind("click",function(){
		var
		$t=$(this),
		actionUrl = $t.data("url");
		$t.parents("form").attr("action",actionUrl).trigger("submit");
	});
	
	//发布公司动态
	$("#newsForm").on('submit',function(){
		var $title = $("input[name='title']");
		if($.trim($title.val())===''){
			$title.focus();
			return false;
		}else{
			return checkEdit();
		}
	});
	
	//违禁词判断
	var failTip = $.parseJSON($("input#failtip").val());
	if(failTip){
		var failStatus=failTip.status;
		var a=[],b=[],msg='';
		for(var i in failTip.msg){//遍历json
			a.push(i);//key
			b.push((failTip.msg)[i]);//value
		}
		for(var i = 0; i <a.length; i++){//构建错误信息
			if(a[i]=="title"){
				msg += '<p><strong>标题</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}else if(a[i]=="content"){
				msg += '<p><strong>文字内容</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}else if(a[i]=="keyWord"){
				msg += '<p><strong>关键词</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}else if(a[i]=="bookName"){
				msg += '<p><strong>证书名称</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}else if(a[i]=="agency"){
				msg += '<p><strong>发证机构</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}else if(a[i]=="bookNo"){
				msg += '<p><strong>证书编号</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
			}
		}
		if(failStatus==='-2'){
			csc.useDialog(function(){
				artDialog({
					id:'errorTip',
					title:false,
					content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2>'+msg,
					fixed: true,
					lock:true,
					width:380,
					padding:'25px 50px 25px 25px',
					opacity:0,
					icon:'mem-n',
					ok:function(){},
					close:function(){
						$("input[name='"+a[0]+"']").focus();//默认第一个设置焦点
					}
				});
			});
		}
	}
	
});

