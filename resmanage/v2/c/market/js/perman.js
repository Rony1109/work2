//周边热货管理js
define(function(require, exports, module) {
	var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	require('http://resmanage.csc86.com/v2/m/page.js').init();//分页
	
	var cityVal=$('input[name=city][type=hidden]').eq(0).val();
	
	$('.xcw-tab img').on('dblclick',function(){
		var srcs=$(this).attr('src');
		//window.open($(this).attr('src'))
		$.dialog({
			title:false,
			content: '<img src='+srcs+' style="max-width:450px;max-height:450px;">',
			width: 500,
			height: 500,
			lock:true,
			opacity:0.2
		});
	});
	
	//全选和反选
	$('.jsSltAll').on('click',function(){
		var $this=$(this),
			$parentTbl=$this.parents('table:first'),
			$jsSltOne=$parentTbl.find('.jsSltOne');
		if($this.is(':checked')){
			$jsSltOne.prop('checked',true);
		}else{
			$jsSltOne.prop('checked',false);
		}
	});
	
	//不全选
	$('.jsSltOne').on('click',function(){
		var $this=$(this),
			$parentTbl=$this.parents('table:first'),
			$jsSltAll=$parentTbl.find('.jsSltAll'),
			arry=[];
		$parentTbl.find('.jsSltOne').each(function(){
			var $this=$(this);
			if($this.is(':checked')){
				arry.push(true);
			}else{
				arry.push(false);
			}
		});
		if($.inArray(false,arry)<0){
			$jsSltAll.prop('checked',true);
		}else{
			$jsSltAll.prop('checked',false);
		}
	});
	
	//切换类目获取当前类目的列表
	/*$('#ctgry').on('change',function(){
		var $this=$(this);
		var ctgryId=$this.val();
		$.get("app.ctgryProductManage",{ctgryId:ctgryId,city:cityVal},function(data) {
			if(data.success==="true"){
				location.href=data.url;
			}else{
				dialog.tip('获取失败!');
			}
		}, "json");
	});*/
	
	//获取最新排名
	$('#getNewPm').on('click',function(){
		var $this=$(this);
		var ctgryId=$('#ctgry').val();
		$this.attr('disabled',true).val('正在获取最新排名...');
		$.get("app.hotProduct",{ctgryId:ctgryId,city:cityVal},function(data) {
			if(data.success==="true"){
				dialog.tip('获取成功!',2,function(){
					location.href=data.url;
				});
			}else{
				dialog.tip('获取失败!');
			}
			$this.removeAttr('disabled').val('获取最新排名');
		}, "json");
	});
	
	//提交
	$('#zbrhSmt').on('click',function(){
		var $this=$(this),
			$checked=$('.jsSltOne:checked'),
			arry=[];
		if($checked.length<1){
			dialog.tip('请先选择需要提交的项!',3);
			return false;
		}
		
		$checked.each(function(){
			arry.push($(this).val());
		});
		
		$this.attr('disabled',true).val('正在提交...');
		$.get("app.updateDisplay",{productId:JSON.stringify(arry),city:cityVal},function(data) {
			if(data.success==="true"){
				dialog.tip('提交成功!',2,function(){
					location.href=data.url;
				});
			}else{
				dialog.tip('提交失败!');
			}
			$this.removeAttr('disabled').val('提交');
		}, "json");
		
	});
	

});