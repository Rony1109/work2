/**
 * 会员中心2.0
 * 订单相关操作 -- 评价
 * anthor guoz
 * date 2015-11-07
 */
define(function(require, exports, module) {
	var valid=require('l/valid/js/valid.js');

	function comment(options, callback) {
		options = options || {};
		require('c/member/common/css/uc-common.css');
		require('./css/productComment.css');
		var dialog = require('dialog');
		
		var proImg = options['proImg'] || '',
			href = options['link'] || '',
			proName = options['proName'] || '';
		var html='<form class="jsCmmntFrm">'+
					  '<div class="pblsh-cmmnt">'+
					  	  '<div class="cmmnt-hd">'+
							  '<table class="g-pr uc-lrtbl pblsh-cmmnt-tbl">'+
								  '<colgroup>'+
									  '<col />'+
									  '<col />'+
								  '</colgroup>'+
								  '<tbody>'+
									  '<tr>'+
										  '<th>商品信息：</th>'+
										  '<td>'+
											  '<ul class="g-ivm order-pro-lst">'+
												  '<li class="g-cf frst">'+
													  '<p class="g-fl ibox pic"><a class="i" href="'+href+'" target="_blank"><img src="'+proImg+'" alt=""/></a></p>'+
													  '<p class="g-pr t"><a href="'+href+'" target="_blank">'+proName+'</a></p>'+
												  '</li>'+
											  '</ul>'+
											  
										  '</td>'+
									  '</tr>'+
									  '<tr class="scr-tr">'+
										  '<th><em class="g-cred">* </em>评分：</th>'+
										  '<td>'+
											  '<ul class="g-cf g-fl cmmnt-scr">'+
												  '<li class="scr1"><span>1</span></li>'+
												  '<li class="scr2"><span>2</span></li>'+
												  '<li class="scr3"><span>3</span></li>'+
												  '<li class="scr4"><span>4</span></li>'+
												  '<li class="scr5"><span>5</span></li>'+
											  '</ul>'+
											  '<input id="cmmntScr" type="hidden" name="score" value=""/>'+
										  '</td>'+
									  '</tr>'+
									  '<tr class="cmmnt-ctr">'+
										  '<th valign="top"><em class="g-cred">* </em>评价：</th>'+
										  '<td>'+
											  '<textarea id="cmmntTxt" class="g-pr txt-area" name="evaluationContent" cols="" rows=""></textarea>'+
											  '<div class="ctr-tip"><span class="g-c8">10-500字</span></div>'+
										  '</td>'+
									  '</tr>'+
								  '</tbody>'+
							  '</table>'+
						  '</div>'+
						  '<div class="g-tr frm-cz"><input class="org-btn" type="submit" name="" value="提交评价"/><label class="g-ml15 g-mr30 g-c4" for="nmTj"><input id="nmTj" name="isAnonymous" type="checkbox" value="1"> 匿名评价</label></div>'+
					  '</div>'+
					  '</form>';
		
		var commentDialog =new dialog({
			id:'cmmnt',
			content: html,
			title: '发表评论',
			padding:'0',
			width:600,
			fixed:true,
			lock:true,
			opacity:0.2,
			init:function(){
				var $jsCmmntFrm = $('.jsCmmntFrm'),//评论form
					$cmmntScr = $('#cmmntScr'),//存放所评的分数隐藏域
					$scrLi = $('.scr-tr ul li'),//评分列表
					$cmmntTxt = $('#cmmntTxt'),//评价内容
					$nmTj = $('#nmTj');//匿名评价复选框
				
				//表单验证
				var validFrm=function(obj,isSmtValid){
					var isMust=true,
						nullTip='',
						errorTip='',
						regx=null,
						objId=obj.attr('id');
					switch(objId){
						case 'cmmntScr':
						nullTip='请评分';
						break;
						case 'cmmntTxt':
						nullTip='请输入评价内容，10-500字';
						errorTip='评价内容需10-500字';
						regx=/^[\w\W]{10,500}$/;
						break;
					}
					return valid.init({
						isMust:isMust,
						obj:obj,
						errorClass:'frm-error',
						nullTip:nullTip,
						errorTip:errorTip,
						regx:regx,
						isSmtValid:isSmtValid
					});
				};	
					
				//鼠标经过星星
				$scrLi.hover(function(){
					var $this=$(this),
						$parent=$this.parent(),
						clss=$this.attr('class');
					$parent.addClass('cmmnt-'+clss+'-hover');
				},function(){
					var $this=$(this),
						$parent=$this.parent(),
						clss=$this.attr('class');
					$parent.removeClass('cmmnt-'+clss+'-hover');
				});
				
				//鼠标点击星星
				$scrLi.on('click',function(){
					var $this=$(this),
						$parent=$this.parent(),
						clss=$this.attr('class'),
						score=$this.find('span').text();
					$parent.removeClass().addClass('g-cf cmmnt-scr cmmnt-'+clss);
					$cmmntScr.val(score);
					validFrm($cmmntScr,0);
				});
				
				//匿名评价复选框
				$nmTj.on('change',function(){
					var $this=$(this);
					if($this.is(':checked')){
						$this.val(0);
					}else{
						$this.val(1);
					}
				});
				
				//评价内容失去焦点验证
				$cmmntTxt.on('blur',function(){
					validFrm($(this),0);
				});
				
				//提交表单
				$jsCmmntFrm.on('submit',function(){
					var $this=$(this),
						isSubmit = false,
						arry=[];
					
					arry.push(validFrm($cmmntTxt,0));//评价内容验证
					arry.push(validFrm($cmmntScr,0));//评分验证
					
					//当qrslArry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
					if ($.inArray(false, arry) >= 0) {
						return false;
					}
					options['score']=$cmmntScr.val();
					options['evaluationContent']=$cmmntTxt.val();
					options['isAnonymous']=$nmTj.val();
					
					//阻止表单重复提交
					if (isSubmit === true) {
						return false;
					} 
					isSubmit = true;
					
					//ajax提交
					$.post('/buyer/userEvaluation',options,function(data){
						if(data.status===1){
							commentDialog.close();
							dialog.success(data.msg?data.msg:'操作成功！', 3, function () {
								// location.href=location.href;
								if (typeof callback === 'function') 
									callback();
							});
						}else{
							dialog.error(data.msg?data.msg:'操作失败！', 3);
						}
						isSubmit=false;
					},'json');
					return false;
				});
			}
		});
	}
	module.exports = comment;
});