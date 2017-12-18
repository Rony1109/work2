define(function(require, exports, module) {
	var isSubmit=false;
		require('http://resmanage.csc86.com/js/SWFUpload/v2.2.0.1/swfupload.js');
		require('http://resmanage.csc86.com/js/handlers.js');
		
	
	
		
		
	
	artDialog.tip = function(msg, closeTime, callback) {
		this({
			id: 'sid',
			content: msg || '提示信息',
			title: '消息提示',
			opacity:0.3,
			fixed:true,
			lock:true,			
			icon: 'mem-w',
			time: closeTime || 3,
			close: callback || null
		});
	};


	artDialog.loading = function(msg) {
		this({
			id: 'loading',
			content: msg || '提示信息',
			title: '消息提示',
			opacity:0.3,
			fixed:true,
			lock:true,			
			icon: 'mem-w',
			init: function() {
				$(this.DOM.close).remove();
			}
		});
	};
	
	/*
var upload = function(obj){
			var loading;
			obj.each(function(){
				//document.domain = "csc86.com";
				var $this=$(this);
					//$prvwBox=$this.parents('.upld-box:first').siblings('.prvw-box');
				$this.fileupload({
					dataType:'json',
					  url:'//bops.csc86.com/bops-app/bops/image.upload',
					formData:function(){//指定上传的参数
						var dataObj={"Filedata":$this.val()};
						console.log(dataObj);
						return dataObj;
					},
					progressall:function(e,data){
						loading=artDialog.loading('图片正在上传中，请稍后...');
					},
					add:function(e,data){
						var fileInfo=data.files[0],
							regx=/(\.|\/)(jpe?g|png)$/i,
							fileName=fileInfo.name,
							fileSize=fileInfo.size;
						if(!regx.test(fileName)){
							artDialog.tip('仅支持jpg、png格式图片，请选择正确的图片格式！',2);
							return false;
						}else{
							if(fileSize>1024*1024*3){
								
							artDialog.tip('图片大小不得超过3M！',2);
								return false;
							}else{
								
								data.submit();
							}
						}
					},
					done:function(e,data){
						art.dialog({id:"loading"}).close();
						var result = data.result,
							msg=result.msg;
						if(result.status==='1'){
							console.log('成功');
							//$prvwBox.find('img').attr('src','//img.csc86.com'+result.key);
							//$prvwBox.find('input[type=hidden]').val(result.key);
						}else{
							artDialog.tip(data.msg?data.msg:'上传失败，请稍后重试！',2);
						}
					},
					fail:function(e,data){
						art.dialog({id:"loading"}).close();
						artDialog.tip(data.msg?data.msg:'上传失败，请稍后重试！',2);
					}
				});
			});
		};
		
		*/
		
var upload = function(callback){		
		
				$('.jsUploadBtn').each(function(){
		var id=$(this).attr('id');
		new SWFUpload(uploadSettings({
			type:"androidPhoto",
			button_placeholder_id:id,
			button_action:SWFUpload.BUTTON_ACTION.SELECT_FILES,
			file_types: "*.jpg;*.jpeg;*.png",
			file_size_limit : "2MB",
			file_upload_limit : 0,
			button_text_left_padding:16,
			button_text:"点击上传",
			upload_success_handler:function(file, serverData){
				var response =  eval('(' + serverData + ')');
				if(response.result != "success"){
					var msg = response.msg || "上传失败，请稍后重试！";
					artDialog.tip(msg,2);
					return;
				} else {
					var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]);
					var $th=$('#SWFUpload_'+id);
					var $img=$th.siblings(".img");
					$img.find('img').remove();
					$img.append("<img  src="+url+file.type+">");
					var key=response.key.replace(/\//,"")+file.type;
					var $imglink = $th.siblings(".imglink");
				    $imglink.val(url+file.type);
					$th.siblings(".s1").hide();
					if(callback){callback()};
				}
			}
		}));
	});
}
	
	var ca=function(){	
			var $lmbaclink = $('.lmbaclink').val();		
			console.log($lmbaclink);	
			var dataobj={"image":$lmbaclink};						
			$.post('//bops.csc86.com/bops-app/bops/seoCategory.uploadBackgroundPic',dataobj,function(data){
				if(data.status===true){
					
					}else{
					artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);
					}
				},'jsonp');

		};
upload(ca);

$('.seolmtable .t1').on('click','.jh',function(){	
	var $this = $(this);
	var $thistbody = $this.parents('tbody');

		if($this.is('.jh1')){
		$this.removeClass('jh1');
		$thistbody.find('.t2').hide();
		$thistbody.find('.tl2').find('.jh').removeClass('jh1');
		$thistbody.find('.t3').hide();
		}else{
			$this.addClass('jh1');
			$thistbody.find('.t2').show();
			}
		
	return false;
	
});


$('.seolmtable').on('click','.lmsx',function(){
	
	if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
							
	$.post('//bops.csc86.com/bops-app/bops/seoCategory.executeFlushCache',function(data){
		if(data.status===true){
			artDialog.tip(data.body?data.body:'类目已生效,请第二天查验!',2);
			}else{
			artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);
			}
		isSubmit=false;	
		},'jsonp');
		
		return false;
	
		});

$('.seolmtable .t2').on('click','.jh',function(){	
	var $this = $(this);
	var $thistbody = $this.parents('tbody');
	var $thistr=$this.parents('tr');
	var $thismid = $thistr.data('mid');

		
		if($this.is('.jh1')){
		$this.removeClass('jh1');
		
		$.each($thistbody.find('tr'),function() {
            var $this=$(this);
			var $thiscid = $this.data('cid');
			if($thiscid==$thismid){
			$this.hide();
				}
        });
		
		}else{
			$this.addClass('jh1');
			
			$.each($thistbody.find('tr'),function() {
            var $this=$(this);
			var $thiscid = $this.data('cid');
			if($thiscid==$thismid){
			$this.show();
				}
        });
			}
			
	return false;
	
});
	

$('body').on('click','.adddlm',function(){
		var $this=$(this);
			if(isSubmit===true){return false;}//阻止重复点击
			isSubmit=true;
			
			var $this=$(this);
			var $thistrdata = $this.parents('tr').data('mid')||"";
			$('.dqxzlm .mid').val($thistrdata);
			
						
			$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadCategory',function(data){
			if(data.status===0){
				var lm = '';
			$.each(data.data,function(){
				var me = this;
				lm+='<p data-catid={"catId":"'+me.categoryNo+'"}>'+me.categoryName+'</p>';
				});
				
				
				var tipHtml='<div class="jcfl">\
		 <div class="title">基础分类：</div>\
		 <div class="con after">\
		 <div class="left after">\
		 <div class="wk wk1">\
		'+lm+'\
		 </div>\
		 <div class="wk wk2">\
		 </div>\
		 <div class="wk wk3">\
		 </div>\
		 <div class="dqxzlm">您当前选择的类目是：<span class="lm1"></span><span class="lm2"></span><span class="lm3"></span><input type="hidden" value="" class="hz1"><input type="hidden" value="" class="py1"><input type="hidden" value="" class="mid"></div>\
		 <div class="ssgjc">搜索关键词</div>\
		 <div class="ssinput"><input class="keywords" value=""></div>\
		 </div>\
		 </div>\
		 <div class="bgl">不关联基础类目</div>\
		 <div class="bglmc">类目名称：<input class="hz2" value=""><input class="py2" type="hidden" value=""></div>\
		 </div>';
				
				var dg=art.dialog({
					id:'adddlm',
					title:"关联基础类目",
					content:tipHtml,
					padding:"10px",
					fixed:true,
					lock:true,
					cancel:true,
					okVal:"确定",
					opacity:0.3,
					ok: function () {
					var catPath=[],categoryName='',categoryNo='',parentId='',seoKeyword='',title='',$lm1=$('.jcfl .wk1 .hover'),$lm2=$('.jcfl .wk2 .hover'),$lm3=$('.jcfl .wk3 .hover');
					if($lm1[0]){catPath.push($lm1.text());categoryName=$lm1.text();categoryNo=$lm1.data('catid').catId}
					if($lm2[0]){catPath.push($lm2.text());categoryName=$lm2.text();categoryNo=$lm2.data('catid').catId}
					if($lm3[0]){catPath.push($lm3.text());categoryName=$lm3.text();categoryNo=$lm3.data('catid').catId}
					
					parentId=$('.dqxzlm .mid').val();
					seoKeyword=$('.jcfl .keywords').val();
					title=$('.jcfl .hz2').val();
					
					var sendurl = '//bops.csc86.com/bops-app/bops/seoCategory.addSeoCategorys';	
					
					var dataobj={"catPath":catPath.join(','),"categoryName":categoryName,"categoryNo":categoryNo,"parentId":$thistrdata,"seoKeyword":seoKeyword,"title":title};
					if($this.is('.editlm')){
					if(!catPath.join(',')&&!seoKeyword){artDialog.tip('基础分类或搜索关键词必填一项！',2); return false}
					}
					
					if($this.is('.editlm')){
						sendurl = '//bops.csc86.com/bops-app/bops/seoCategory.updateSeoCategory';
						dataobj.catSeoId=$thistrdata;
						}
						
					
					if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
							
					$.post(sendurl,dataobj,function(data){
						if(data.status===true){
							if($this.is('.editlm')){
								
								var dataobj2 = {"catSeoId":$thistrdata};
							$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadSeoCategoryByCateId',dataobj2,function(data){
								if(data.status===true){
									$('.xglmtable .jscxglmbx').text(catPath.join(' > '));
									$('.xglmtable .jscxglkeywords').text(seoKeyword);
									$('.xglmtable .dturl').attr("href",data.body.searchUrl||"");
									$('.xglmtable .lmseotitle').val(data.body.seoTitle||"");
									
								}else{
									artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);
									}
								},'jsonp');	
								

								dg.close();

								
								}else{
									location.href=location.href;
									}
							}else{
										artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);
										}
								isSubmit=false;	
						},'jsonp');
						
						return false;	
						
					},
					init:function(){
						if($this.is('.editlm')){
						$('.jcfl .hz2').attr("disabled",true);
						}
							
						$('.jcfl .wk1').on('click','p',function(){
							var $this=$(this);
							var dataobj=$this.data('catid');
							
							$this.addClass('hover').siblings('p').removeClass('hover');
							if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
							
							$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadCategory',dataobj,function(data){
								if(data.status===0){
								$('.dqxzlm .lm1').html($this.html());	
								$('.dqxzlm .lm2').html("");	
								$('.dqxzlm .lm3').html("");	
								$('.dqxzlm .hz1').val($this.html());
								$('.dqxzlm .py1').val($('.dqxzlm .hz1').toPinyin());
								$('.jcfl .wk2 p').remove();	
								$('.jcfl .wk3 p').remove();	
								if(data.data){
									var lm='';
								$.each(data.data,function(){
								var me = this;
								lm+='<p data-catid={"catId":"'+me.categoryNo+'"}>'+me.categoryName+'</p>';
								});
								$('.jcfl .wk2').append(lm);
								}
									}else{
										artDialog.tip(data.errorMsg?data.errorMsg:'系统错误请重试！',2);
										}
								isSubmit=false;		
								},'jsonp');
							});
							
						$('.jcfl .wk2').on('click','p',function(){
							var $this=$(this);
							var dataobj=$this.data('catid');
							$this.addClass('hover').siblings('p').removeClass('hover');
							
							if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
							
							$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadCategory',dataobj,function(data){
								if(data.status===0){
									$('.dqxzlm .lm2').html(" > "+$this.html());	
									$('.dqxzlm .lm3').html("");	
									$('.dqxzlm .hz1').val($this.html());
									$('.dqxzlm .py1').val($('.dqxzlm .hz1').toPinyin());									
									$('.jcfl .wk3 p').remove();	
									if(data.data){
									var lm='';
								$.each(data.data,function(){
								var me = this;
								lm+='<p data-catid={"catId":"'+me.categoryNo+'"}>'+me.categoryName+'</p>';
								});
								
								$('.jcfl .wk3').append(lm);
									}
									}else{
										artDialog.tip(data.errorMsg?data.errorMsg:'系统错误请重试！',2);
										}
								isSubmit=false;		
								},'jsonp');
							});	
					
					
					$('.jcfl .wk3').on('click','p',function(){
							var $this=$(this);
							$('.dqxzlm .hz1').val($this.html());
							$('.dqxzlm .py1').val($('.dqxzlm .hz1').toPinyin());
							$this.addClass('hover').siblings('p').removeClass('hover');
							$('.dqxzlm .lm3').html(" > "+$this.html());	
					});
					
					
					$(".bglmc .hz2").on("keyup keydown change blur",function (){
							$(".bglmc .py2").val($(this).toPinyin());
					});
					

					
							
					}
				});
				
				
			}
			else{
			artDialog.tip(data.errorMsg?data.errorMsg:'系统错误请重试！',2);
			}
			isSubmit=false;
		},'jsonp');

		return false;
	});


$('.seolmtable .up,.seolmtable .down').on('click',function(){
	var $this=$(this);
	var $thisaction = $this.data('action');
	var $thistrmid = $(this).parents('tr').data('mid');
	var dataobj={"sortAction":$thisaction,"catSeoId":$thistrmid}
	if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
	$.post('//bops.csc86.com/bops-app/bops/seoCategory.updateSeoCategorySort',dataobj,function(data){
								if(data.status===true){
									location.href=location.href
									}else{
										artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);
										}
								isSubmit=false;		
								},'jsonp');	
							return false;						
	});
	
$('.seolmtable .del').on('click',function(){
	var $this=$(this);
	var $thistrmid = $(this).parents('tr').data('mid');
	var dataobj={"catSeoId":$thistrmid}
	if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
	$.post('//bops.csc86.com/bops-app/bops/seoCategory.deleteSeoCategory',dataobj,function(data){
								if(data.status===true){
									location.href=location.href
									}else{
										artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);
										}
								isSubmit=false;		
								},'jsonp');	
							return false;						
	});
		

$('.seolmtable').on('click','.edit',function(){
		var $this=$(this);
		var $thistrmid = $this.parents('tr').data('mid');
		var dataobj={"catSeoId":$thistrmid}
		if(isSubmit===true){return false;}//阻止重复点击
		isSubmit=true;
							
	$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadSeoCategoryByCateId',dataobj,function(data){
								if(data.status===true){		
								
								var usehtml=data.body.isUsed=="Y"?'<label class="mr25"><input type="radio" name="flagqq" value="Y" checked>是</label><label><input name="flagqq" value="N" type="radio">否</label>':'<label class="mr25"><input type="radio" value="Y" name="flagqq">是</label><label><input name="flagqq" value="N" type="radio" checked>否</label>';
								var advicehtml=data.body.isAdvice=="Y"?'<label class="mr25"><input type="radio" value="Y" name="flagtj" checked>是</label><label><input name="flagtj" type="radio" value="N">否</label>':'<label class="mr25"><input type="radio" name="flagtj" value="Y">是</label><label><input name="flagtj" type="radio" value="N" checked>否</label>';
								
								var seokeyword=data.body.seoKeyword?' + <span class="red fontw jscxglkeywords">'+data.body.seoKeyword+'</span><span class="fontw ml5">(关键词)</span>':' + <span class="red fontw jscxglkeywords"></span><span class="fontw ml5">(关键词)</span>';
								
								var searchurl = data.body.seoUrl?'<a target="_blank" class="dturl" href="'+data.body.searchUrl+'">点击这里</a>':"无";
								
								var seotitle = data.body.seoTitle?'<input class="inpt1 lmseotitle" value="'+data.body.seoTitle+'">':'<input class="inpt1 lmseotitle" value="">';
								
								seotitle=data.body.seoUrl?seotitle:'<input class="inpt1 lmseotitle" value="" disabled>';
								
								
								if(data.body.searchUrl&&data.body.searchUrl!="无"){$('.xglmtable .dturl').attr("href",data.body.searchUrl);}else{
										$('.xglmtable .dturl').removeAttr("href");
										}
								
								var seoUrl=data.body.seoUrl||"无";
							
								var collectcategory=data.body.collectCategory?data.body.collectCategory.replace(/,/g, " > "):"";
								
								var sfgl =  seoUrl&&seoUrl!="无"?'<span class="cxgl adddlm editlm">重新关联</span>':"";
								
								var friendlinks = data.body.friendLinks;
								
								var friendlinkshtml='';
								$.each(friendlinks,function(){
									var me = this;
									friendlinkshtml+='<span class="yqlj" data-linkid="'+me.id+'">'+me.linkName+' '+me.sortId+'<em>×</em></span>';
									});
									
									friendlinkshtml = data.body.searchUrl?friendlinkshtml+'<span class="add">+</span>':"";
									
									
								
								var tipHtml='<div class="xglm">\
		<table class="xglmtable"  cellspacing="0" cellpadding="0">\
		<colgroup>\
		<col width="90">\
		<col>\
		</colgroup>\
		<tbody>\
		<tr>\
		<td class="fontw">类目名称：</td>\
		<td><input class="inpt1 lmtitle" value="'+data.body.title+'"></td>\
		</tr>\
		<tr>\
		<td class="fontw">短URL：</td>\
		<td>'+seoUrl+'</td>\
		</tr>\
		<tr>\
		<td class="fontw">类目Title：</td>\
		<td>'+seotitle+'<span class="fontw mr5">(针对SEO)</span></td>\
		</tr>\
		<tr>\
		<td class="fontw">是否推荐：</td>\
		<td>'+advicehtml+'</td>\
		</tr>\
		<tr>\
		<td class="fontw">是否启用：</td>\
		<td>'+usehtml+'</td>\
		</tr>\
		<tr data-mid="'+$thistrmid+'">\
		<td class="fontw">关联类目：</td>\
		<td>\
		<span class="red fontw jscxglmbx">'+collectcategory+'</span>'+seokeyword+sfgl+'\
		</td>\
		</tr>\
		<tr>\
		<td class="fontw">动态URL：</td>\
		  <td>'+searchurl+'</td>\
		</tr>\
		<tr>\
		<td class="fontw">友情链接：</td>\
		<td class="jsyqlj">'+friendlinkshtml+'</td>\
		</tr>\
		</tbody>\
		</table>\
		</div>';
				
				var dg=art.dialog({
					id:'editlm',
					title:"修改类目",
					content:tipHtml,
					padding:"10px",
					fixed:true,
					lock:true,
					cancel:true,
					okVal:"确定",
					opacity:0.3,
					ok: function () {
						
				var categoryName = $('.xglmtable .lmtitle').val(),seoTitle=$('.xglmtable .lmseotitle').val(),isUsed=$('.xglmtable').find('input[name=flagqq]:checked').val(),  isAdvice=$('.xglmtable').find('input[name=flagtj]:checked').val()	;
					
					
				var dataobj={"title":categoryName,"seoTitle":seoTitle,"isUsed":isUsed,"isAdvice":isAdvice,"catSeoId":$thistrmid};	
				
				
				
				$.post('//bops.csc86.com/bops-app/bops/seoCategory.updateSeoCategory',dataobj,function(data){
					
			if(data.status===true){	
						dg.close();
						location.href=location.href;
				}else{
				artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);	
				}

				},'jsonp');
						return false;
					},
					init:function(){	
						
		$('.xglmtable').on('click','.yqlj',function(){
		var $this=$(this);
		var $thislinkid=$this.data('linkid');
		var  dataobj = {"linkId":$thislinkid};
		if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
							
		$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadLinkByLinkId',dataobj,function(data){
			if(data.status===true){
				
				var tipHtml='<div class="addyqlj">\
		<table class="addyqljtable"  cellspacing="0" cellpadding="0">\
		<colgroup>\
		<col width="90">\
		<col>\
		</colgroup>\
		<tbody>\
		<tr>\
		<td class="fontw">文本：</td>\
		<td><input class="inpt1 linkname" value="'+data.body.linkName+'"><span class="red">*</span></td>\
		</tr>\
		<tr>\
		<td class="fontw">链接：</td>\
		<td><input class="inpt1 linkurl" value="'+data.body.linkUrl+'"><span class="red">*</span></td>\
		</tr>\
		<tr>\
		<td class="fontw">排序：</td>\
		<td><input class="inpt1 sort" value="'+data.body.sortId+'"></td>\
		</tr>\
		</tbody>\
		</table>\
		</div>';
				
				var dg2=art.dialog({
					id:'edityqlj',
					title:"修改友情链接",
					content:tipHtml,
					padding:"10px",
					fixed:true,
					lock:true,
					cancel:true,
					okVal:"确定",
					opacity:0.3,
					ok: function () {
					
		var $linkname = $('.addyqljtable .linkname').val();
		var $linkurl = $('.addyqljtable .linkurl').val();
		var $sort = $('.addyqljtable .sort').val();
		var dataobj = {"linkName":$linkname,"sort":$sort,"linkUrl":$linkurl,"linkId":$thislinkid,"catSeoId":$thistrmid};	
		
		
			if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
	$.post('//bops.csc86.com/bops-app/bops/seoCategory.updateLink',dataobj,function(data){
								if(data.status===true){
									
			var dataobj = {"catSeoId":$thistrmid};		
			$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadLinkByCateId',dataobj,function(data){
			if(data.status===true){
				var newlinkhtml='';
				$.each(data.body,function(){
					var me = this;
					newlinkhtml+='<span class="yqlj" data-linkid="'+me.id+'">'+me.linkName+' '+me.sortId+'<em>×</em></span>';
					});
					newlinkhtml+='<span class="add">+</span>';
					$('.xglmtable .jsyqlj').html(newlinkhtml);
					dg2.close();
				}else{
				artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);	
					}
			},'jsonp');				
								
				}else{
				artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);	
					}
					isSubmit=false;		
			},'jsonp');		
						return false;
					},
					init:function(){
						
					}
				});
				
				
				}else{
				
				}
			isSubmit=false;		
			},'jsonp');
			
		return false;
	});
	
	
	
	$('.xglmtable').on('click','.yqlj em',function(){
		
		var $this = $(this);
		var $thisspan = $this.parents('.yqlj');
	    var $thislinkid = $thisspan.data('linkid');
		var  dataobj = {"linkId":$thislinkid};
		$.post('//bops.csc86.com/bops-app/bops/seoCategory.deleteLink',dataobj,function(data){
			if(data.status===true){
				$thisspan.remove();
				}else{
				artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);	
				}
			},'jsonp');
		return false;
		
		});
	
	$('.xglmtable').on('click','.add',function(){
		var $this=$(this);

		var tipHtml='<div class="addyqlj">\
		<table class="addyqljtable"  cellspacing="0" cellpadding="0">\
		<colgroup>\
		<col width="90">\
		<col>\
		</colgroup>\
		<tbody>\
		<tr>\
		<td class="fontw">文本：</td>\
		<td><input class="inpt1 linkname" value=""><span class="red">*</span></td>\
		</tr>\
		<tr>\
		<td class="fontw">链接：</td>\
		<td><input class="inpt1 linkurl" value=""><span class="red">*</span></td>\
		</tr>\
		<tr>\
		<td class="fontw">排序：</td>\
		<td><input class="inpt1 sort" value=""></td>\
		</tr>\
		</tbody>\
		</table>\
		</div>';
				
				var dg3=art.dialog({
					id:'edityqlj',
					title:"增加友情链接",
					content:tipHtml,
					padding:"10px",
					fixed:true,
					lock:true,
					cancel:true,
					okVal:"确定",
					opacity:0.3,
					ok: function () {
						
		var $linkname = $('.addyqljtable .linkname').val();
		var $linkurl = $('.addyqljtable .linkurl').val();
		var $sort = $('.addyqljtable .sort').val();
		var dataobj = {"linkName":$linkname,"sort":$sort,"linkUrl":$linkurl,"catSeoId":$thistrmid};
		
			if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
	$.post('//bops.csc86.com/bops-app/bops/seoCategory.addLink',dataobj,function(data){
		var dataobj = {"catSeoId":$thistrmid};
								if(data.status===true){
		$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadLinkByCateId',dataobj,function(data){
			if(data.status===true){
				var newlinkhtml='';
				$.each(data.body,function(){
					var me = this;
					newlinkhtml+='<span class="yqlj" data-linkid="'+me.id+'">'+me.linkName+' '+me.sortId+'<em>×</em></span>';
					});
					newlinkhtml+='<span class="add">+</span>';
					$('.xglmtable .jsyqlj').html(newlinkhtml);
					
				}else{
				artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);	
					}
			},'jsonp');							
									dg3.close();
									//artDialog.tip('添加成功',2);
									}else{
										artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);
										}
								isSubmit=false;		
								},'jsonp');									
						return false;
					},
					init:function(){
						
					}
				});
		return false;
	});
	
	

					}
				});
	
			
									}else{
										artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);
										}
								isSubmit=false;		
								},'jsonp');	
							return false;						
						
		

		
	});
	
	
	
$('.seolmtable').on('click','.pp',function(){
		var $this=$(this);
		var $thismid=$this.parents('tr').data('mid');
		
		var dataobj={"catSeoId":$thismid};
		
		$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadPicByCateId',dataobj,function(data){
			if(data.status===true){
				var zthtml='';
				var sphtml='';
				$.each(data.body.shopPhotos,function(){
					var me=this;
					zthtml+='<li class="li1" data-photoid="'+me.id+'"><img src="'+me.image+'"><span class="s1">×</span><span class="s2">'+me.sortId+'</span></li>';
					});
					zthtml+='<li><span class="s3">+</span></li>';
				$.each(data.body.topicPhotos,function(){
					var me=this;
					sphtml+='<li class="li1" data-photoid="'+me.id+'"><img src="'+me.image+'"><span class="s1">×</span><span class="s2">'+me.sortId+'</span></li>';
					});
					sphtml+='<li><span class="s3">+</span></li>';	
					
				}else{
				
				}
				
					var tipHtml='<div class="ppzt">\
<table class="ppzttable"  cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="90">\
                <col>\
				</colgroup>\
				<tbody>\
				<tr  data-type="1">\
                <td class="title">品牌商铺：</td>\
                <td class="td1">\
                <ul>'+zthtml+'</ul>\
                </td>\
                </tr>\
                <tr data-type="2">\
                <td class="title">品牌专题：</td>\
                <td class="td2">\
                <ul>'+sphtml+'</ul>\
                </td>\
                </tr>\
				</tbody>\
				</table>\
</div>';
				
				var dg=art.dialog({
					id:'ppzt',
					title:"品牌商铺与专题",
					content:tipHtml,
					padding:"10px",
					fixed:true,
					lock:true,
					cancel:true,
					//okVal:"关闭",
					cancelVal:"关闭",
					opacity:0.3,
					//ok: function () {
						//this.close();
						//return false;
					//},
					init:function(){
						
						
		$('.ppzttable').on('click','.li1',function(){
		var $this=$(this);
		var $thisphotoid=$(this).data("photoid");
		var $thistype=$this.parents('tr').data('type');
		var $thistd=$this.parents('td');
		var $thistdclass=$this.parents('td').attr("class");		
		var dataobj={"photoId":$thisphotoid};

		$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadPicByPhotoId',dataobj,function(data){
					if(data.status===true){
					
					var tipHtml='<div class="addppzt">\
<table class="addppzttable"  cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="90">\
                <col>\
				</colgroup>\
				<tbody>\
				<tr>\
                <td>标题：</td>\
                <td><input class="i1 ppname" value="'+data.body.name+'"><span class="red">*</span></td>\
                </tr>\
                <tr>\
                <td>链接：</td>\
                <td><input class="i1 ppurl" value="'+data.body.url+'"><span class="red">*</span></td>\
                </tr>\
                <tr>\
                <td>排序：</td>\
                <td><input class="i1 ppsort" value="'+data.body.sortId+'"></td>\
                </tr>\
                <tr>\
                <td class="title">图片：</td>\
                <td><input id="uploadBtn0" class="i2 ppimg jsUploadBtn" type="button" value="浏览···" /><p class="img"><img src="'+data.body.image+'"></p><input class="imglink" value="" type="hidden"></td>\
                </tr>\
				</tbody>\
				</table>\
</div>';
				
				var dg2=art.dialog({
					id:'editpp',
					title:"修改品牌商铺与专题",
					content:tipHtml,
					padding:"10px",
					fixed:true,
					lock:true,
					cancel:true,
					okVal:"确定",
					opacity:0.3,
					ok: function () {
					var ppname=$('.addppzttable .ppname').val();	
					var ppurl=$('.addppzttable .ppurl').val();	
					var ppsort=$('.addppzttable .ppsort').val();	
					var ppimage=$('.addppzttable .imglink').val();
					var dataobj = {"name":ppname,"url":ppurl,"sort":ppsort,"image":ppimage,"photoId":$thisphotoid,"catSeoId":$thismid};	
			$.post('//bops.csc86.com/bops-app/bops/seoCategory.updatePic',dataobj,function(data){
					if(data.status===true){	
				var dataobj={"type":$thistype,"catSeoId":$thismid};
					$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadPicByCateId',dataobj,function(data){
							var ztpphtml='';
							if($thistype==1){
							$.each(data.body.shopPhotos,function(){
								var me = this;
								ztpphtml+='<li class="li1"  data-photoid="'+me.id+'"><img src="'+me.image+'"><span class="s1">×</span><span class="s2">'+me.sortId+'</span></li>';
								});
							}else{
							$.each(data.body.topicPhotos,function(){
								var me = this;
								ztpphtml+='<li class="li1"  data-photoid="'+me.id+'"><img src="'+me.image+'"><span class="s1">×</span><span class="s2">'+me.sortId+'</span></li>';
								});			
								}
													
								ztpphtml+='<li><span class="s3">+</span></li>';
							
								$('.'+$thistdclass).find('li').remove();
						
					    $('.'+$thistdclass).find('ul').append(ztpphtml);
						
						dg2.close();
							},'jsonp');
							
						}else{
					artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);					
							}
					},'jsonp');	
						
						return false;
					},
					init:function(){
						upload();
					}
				});
				
					}else{
					artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);		
						}
						},'jsonp');
		return false;
	});
	

	$('.ppzttable').on('click','.s1',function(){
		
		var $this = $(this);
		var $thisspan = $this.parents('.li1');
	    var $thisphotoid = $thisspan.data('photoid');
		var  dataobj = {"photoId":$thisphotoid};
		$.post('//bops.csc86.com/bops-app/bops/seoCategory.deletePic',dataobj,function(data){
			if(data.status===true){
				$thisspan.remove();
				}else{
				artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);	
				}
			},'jsonp');
		return false;
		
		});
			
	
	$('.ppzttable').on('click','.s3',function(){
		var $this=$(this);
		var $thistype=$this.parents('tr').data('type');
		var $thistd=$this.parents('td');
		var $thistdclass=$this.parents('td').attr("class");

		var tipHtml='<div class="addppzt">\
<table class="addppzttable"  cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="90">\
                <col>\
				</colgroup>\
				<tbody>\
				<tr>\
                <td>标题：</td>\
                <td><input class="i1 ppname" value=""><span class="red">*</span></td>\
                </tr>\
                <tr>\
                <td>链接：</td>\
                <td><input class="i1 ppurl" value=""><span class="red">*</span></td>\
                </tr>\
                <tr>\
                <td>排序：</td>\
                <td><input class="i1 ppsort" value=""></td>\
                </tr>\
                <tr>\
                <td class="title">图片：</td>\
                <td><input id="uploadBtn0" class="i2 ppimg jsUploadBtn" type="button" value="浏览···" /><span class="s1">未选择文件<b>*</b></span><p class="img"></p><input class="imglink" value="" type="hidden"></td>\
                </tr>\
				</tbody>\
				</table>\
</div>';
				
				var dg3=art.dialog({
					id:'addpp',
					title:"增加品牌商铺与专题",
					content:tipHtml,
					padding:"10px",
					fixed:true,
					lock:true,
					cancel:true,
					okVal:"确定",
					opacity:0.3,
					ok: function () {
					var ppname=$('.addppzttable .ppname').val();	
					var ppurl=$('.addppzttable .ppurl').val();	
					var ppsort=$('.addppzttable .ppsort').val();	
					var ppimage=$('.addppzttable .imglink').val();
						if(isSubmit===true){return false;}//阻止重复点击
							isSubmit=true;
				
					
					var dataobj = {"name":ppname,"url":ppurl,"sort":ppsort,"image":ppimage,"type":$thistype,"catSeoId":$thismid};	
				$.post('//bops.csc86.com/bops-app/bops/seoCategory.addPic',dataobj,function(data){
					if(data.status===true){
						//artDialog.tip(data.body.errorMsg?data.body.errorMsg:'上传成功！',2);
						var dataobj={"type":$thistype,"catSeoId":$thismid};
						$.post('//bops.csc86.com/bops-app/bops/seoCategory.loadPicByCateId',dataobj,function(data){
							var ztpphtml='';
							if($thistype==1){
							$.each(data.body.shopPhotos,function(){
								var me = this;
								ztpphtml+='<li class="li1"  data-photoid="'+me.id+'"><img src="'+me.image+'"><span class="s1">×</span><span class="s2">'+me.sortId+'</span></li>';
								});
							}else{
							$.each(data.body.topicPhotos,function(){
								var me = this;
								ztpphtml+='<li class="li1"  data-photoid="'+me.id+'"><img src="'+me.image+'"><span class="s1">×</span><span class="s2">'+me.sortId+'</span></li>';
								});			
								}
													
								ztpphtml+='<li><span class="s3">+</span></li>';
								$('.'+$thistdclass).find('li').remove();
						
					    $('.'+$thistdclass).find('ul').append(ztpphtml);
						
						dg3.close();
							},'jsonp');
							
						
						
							
						}else{
						artDialog.tip(data.body.errorMsg?data.body.errorMsg:'系统错误请重试！',2);			
							}
							isSubmit=false;
					},'jsonp');		
						
						return false;
					},
					init:function(){

						upload();
						
					}
				});
		return false;
	});
	
	
						
					}
				});
				
	
			
			},'jsonp');


		return false;
	});
		
	

	
});