//敏感词管理相关js
define(function(require, exports, module) {
	
	var isSubmit=false; //用于防止重复请求的变量
	
	//分页
	require("http://resmanage.csc86.com/v2/m/page.js").init($("form[data-page][data-total]"),{
		name: "pageNo"
	});
	
	var mgc={
		dialog:{
			//普通、错误、及警告提示
			tip:function(msg, closeTime, callback){
				art.dialog({
					id: "cscTip",
					content: msg || "提示信息",
					fixed: true,
					lock:true,
					opacity:0.2,
					title: "提示信息",
					icon: "csc-tip",
					time: closeTime || 1.5,
					close: callback || null
				});
			},
			//成功提示
			success:function(msg, closeTime, callback){
				art.dialog({
					id: "cscSuccess",
					content: msg || "成功提示",
					fixed: true,
					title: "成功提示",
					lock:true,
					opacity:0.2,
					icon: "csc-success",
					time: closeTime || 1.5,
					close: callback || null
				});
			}
		},
		
		//搜索敏感词
		
		//增加敏感词
		addMgc:function(){
			$('#crtMgc').on('click',function(){
				var html='<form id="crtMgcFrm" method="post" action="badWord.insertWord">'+
							'<table class="lrtbl mgc-lrtbl">'+
								'<tr>'+
									'<th>类型：</th>'+
									'<td><input type="radio" id="lvlGaMgc" name="level" value="1"/> <label for="lvlGaMgc">公安违禁词</lable><input class="g-ml10" type="radio" id="lvlYyMgc" name="level" value="2"/> <label for="lvlYyMgc">运营违禁词</label><input class="g-ml10" type="radio" id="lvlMgc" name="level" value="3"/> <label for="lvlMgc">敏感词</label><span class="error-tip"></span></td>'+
								'</tr>'+
								'<tr>'+
									'<th>敏感词：</th>'+
									'<td><input type="text" id="word" name="word" value=""/><span class="error-tip"></span></td>'+
								'</tr>'+
							'</table>'+
						'</form>';
				art.dialog({
					id:"addPop",
					title:"新增敏感词",
					content:html,
					fixed: true,
					lock:true,
					opacity:0.2,
					okVal: "确定",
					ok:function (){
						var $crtMgcFrm=$("#crtMgcFrm"),
							$level=$crtMgcFrm.find("input[name=level]:checked"),
							$lvlTd=$crtMgcFrm.find("input[name=level]").parent(),
							$lvlError=$lvlTd.find(".error-tip"),
							$word=$crtMgcFrm.find("#word"),
							$wordError=$word.parent().find(".error-tip"),
							wordVal=$.trim($word.val()),
							arry=[];
						if(!$level[0]){
							$lvlError.html("请选择类型");
							arry.push(false);
						}else{
							$lvlError.html("");
						}
						if(!wordVal||wordVal.length>30){
							$wordError.html("请输入中文、英文和数字，最多30位敏感词！");
							arry.push(false);
						}else{
							$wordError.html("");
						}
						
						//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
						if ($.inArray(false, arry) >= 0) {
							return false;
						}
						
						//防止多次点击按钮导致重复请求
						if(isSubmit===true){return false;}
						isSubmit=true;
						$(".aui_state_highlight").html("提交中");
						
						//ajax提交
						$.ajax({
							url:$crtMgcFrm.attr('action'),
							type:"GET",
							data:$crtMgcFrm.serializeArray(),
							dataType:"jsonp",
							success:function(data){
								var status=data.status;
								switch (status) {
									case 0 :
									mgc.dialog.tip("新增出错！",2);
									break;
									case 1 :
									mgc.dialog.success("新增成功！",2,function(){
										location.href = location.href;
									});
									break;
									case 2 :
									mgc.dialog.tip("新增失败！",2);
									break;
									case 3 :
									mgc.dialog.tip("敏感词已存在！",2);
									break;
									default :
									break;
								}
							},
							error:function(){
								mgc.dialog.tip("新增出错！",2);
							},
							complete:function(){
								isSubmit=false;
								$(".aui_state_highlight").html("确定");
							}
						});
						return false;
					},
					cancel: true
				});
				return false;
			});
		},
		
		//删除/恢复敏感词
		delHfMgc:function(obj,isDelete,txt){
			obj.on("click",function(){
				var $this=$(this),
					$tr=$this.parents("tr"),
					id=$tr.data("id"),
					level=$tr.data("level"),
					word=$tr.data("word"),
					dataObj={id:id,level:level,word:word,isDelete:isDelete};
				
				art.dialog({
					id: "cfrm",
					content:"确定要"+txt+"该项吗？",
					width:150,
					fixed: true,
					lock:true,
					opacity:0.2,
					title: "确认提示",
					icon: "csc-question",
					ok:function(){
						//防止多次点击按钮导致重复请求
						if(isSubmit===true){return false;}
						isSubmit=true;
						$(".aui_state_highlight").html("提交中");
						
						//ajax提交
						$.ajax({
							url:"badWord.deleteWordById",
							type:"GET",
							data:dataObj,
							dataType:"jsonp",
							success:function(data){
								var status=data.status;
								switch (status) {
									case 0 :
									mgc.dialog.tip(txt+"出错！",2);
									break;
									case 1 :
									mgc.dialog.success(txt+"成功！",2,function(){
										location.href = location.href;
									});
									break;
									case 2 :
									mgc.dialog.tip(txt+"失败！",2);
									break;
									default :
									break;
								}
							},
							error:function(){
								mgc.dialog.tip(txt+"出错！",2);
							},
							complete:function(){
								isSubmit=false;
								$(".aui_state_highlight").html("确定");
							}
						});
						return false;
					},
					cancel: true
				});
				return false;
			});
		},
		
		//修改敏感词级别
		modifyLvl:function(){
			$('.jsModifyLvl').on('click',function(){
				var $this=$(this),
					$tr=$this.parents("tr"),
					id=$tr.data("id"),
					level=$tr.data("level"),
					word=$tr.data("word"),
					dataObj={id:id,oldLevel:level,word:word},
					html='<form id="mdifyMgcFrm" method="post" action="badWord.convertBlackListLevel">'+
							'<table class="lrtbl mgc-lrtbl">'+
								'<tr>'+
									'<th>类型：</th>'+
									'<td><input type="radio" id="lvlGaMgc" name="level" value="1"/> <label for="lvlGaMgc">公安违禁词1</lable><input class="g-ml10" type="radio" id="lvlYyMgc" name="level" value="2"/> <label for="lvlYyMgc">运营违禁词2</label><input class="g-ml10" type="radio" id="lvlMgc" name="level" value="3"/> <label for="lvlMgc">敏感词3</label><span class="error-tip"></span></td>'+
								'</tr>'+
								'<tr>'+
									'<td class="g-tc" colspan="2">是否修改状态？</td>'+
								'</tr>'+
							'</table>'+
						'</form>';
				art.dialog({
					id:"modifyPop",
					title:"状态变更",
					content:html,
					fixed: true,
					lock:true,
					opacity:0.2,
					okVal: "确定",
					init:function(){
						$("#mdifyMgcFrm").find('input[name=level][value='+level+']').attr('checked','true');
					},
					ok:function (){
						var $mdifyMgcFrm=$("#mdifyMgcFrm"),
							$level=$mdifyMgcFrm.find("input[name=level]:checked"),
							$lvlTd=$mdifyMgcFrm.find("input[name=level]").parent(),
							$lvlError=$lvlTd.find(".error-tip"),
							txt="";
						if(!$level[0]){
							$lvlError.html("请选择类型");
							return false;
						}
						
						//防止多次点击按钮导致重复请求
						if(isSubmit===true){return false;}
						isSubmit=true;
						$(".aui_state_highlight").html("提交中");
						
						
						dataObj.newLevel=$level.val();
						if(dataObj.newLevel=="1"){
							txt="公安违禁词1"
						}
						else if(dataObj.newLevel=="2"){
							txt="运营违禁词2"
						}
						else{
							txt="敏感词3"
						}
						
						//ajax提交
						$.ajax({
							url:$mdifyMgcFrm.attr('action'),
							type:"GET",
							data:dataObj,
							dataType:"jsonp",
							success:function(data){
								var status=data.status;
								switch (status) {
									case 0 :
									mgc.dialog.tip("修改出错！",2);
									break;
									case 1 :
									mgc.dialog.success("已转为"+txt+"！",2,function(){
										location.href = location.href;
									});
									break;
									case 2 :
									mgc.dialog.tip("修改失败！",2);
									break;
									default :
									break;
								}
							},
							error:function(){
								mgc.dialog.tip("修改失败！",2);
							},
							complete:function(){
								isSubmit=false;
								$(".aui_state_highlight").html("确定");
							}
						});
						return false;
					},
					cancel: true
				});
				return false;
			});
		},
		
		init:function(){
			mgc.addMgc();//新增敏感词
			mgc.delHfMgc($(".jsDelMgc"),"Y","删除");//删除敏感词
			mgc.delHfMgc($(".jsReMgc"),"N","恢复");//恢复敏感词
			mgc.modifyLvl();//修改敏感词级别
		}
	};
	
	mgc.init();
});