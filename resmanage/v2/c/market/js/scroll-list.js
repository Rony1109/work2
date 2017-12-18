//首页轮播列表js
define(function(require, exports, module) {
	var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	require('http://resmanage.csc86.com/v2/m/page.js').init();//分页
	
	//前台显示 最多只允许选择7张轮播
	(function(){
		var len=Number($('input[name=qtShowNum]').val());
		$('input[name^="RadioGroup"]').on('change',function(){
			var $this=$(this),
				$siblings=$this.parent().siblings().find('input[name^="RadioGroup"]'),
				val=$this.val();
				id=$this.parents('tr:first').data('id');
				
		/*	if(val==="1"){
				len++;
			}else{
				len--;
			}
			if(len>7){
				dialog({
					id: "cscTip",
					content: '最多只允许选择 7 张轮播',
					fixed: true,
					lock:true,
					opacity:0.2,
					title: '提示信息',
					icon: 'csc-tip',
					close: function() {
						$siblings.prop('checked',true);
						len=7;
					},
					ok:function(){},
					okVal:'我知道了',
					cancel: false
				});
			}else{*/
				$.post('updateIsshowSubmit.ShufflingManage',{advertisingId:id,isShow:val},function(data){
					var msg=data.msg;
					if(data.success==='true'){
						dialog.success(msg,2);	
					}else{
						dialog.tip(msg,2,function(){
							$siblings.prop('checked',true);
						});	
					}
				},'json');
			//}
		});
	})();
	
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
	
	//批量删除
	$('.jsDelAll').on('click',function(){
		var $this=$(this),
			$parentTbl=$this.parents('#content').find('.xcw-tab'),
			$checked=$parentTbl.find('.jsSltOne:checked'),
			len=$checked.length,
			arryId=[];
		$checked.each(function(){
			arryId.push($(this).parents('tr:first').data('id'));
		});
		if(len==0){
			dialog.tip("请先选择需要删除的图片！",3);
			return false;
		}
		dialog.confirm("确定要删除选中图片！",function(){
			$.post('bacthDeleteSubmit.ShufflingManage',{advertisingIds:arryId.join()},function(data){
				var msg=data.msg;
				if(data.success==='true'){
					dialog.success(msg,2,function(){
						location.href=location.href;
					});	
				}else{
					dialog.tip(msg,2);	
				}
			},'json');
		});
		
	});
	
	//单个删除
	$('.jsDelOne').on('click',function(){
		var $this=$(this),
			$tr=$this.parents('tr:first'),
			id=$tr.data('id');
		dialog.confirm("确定要删除该图片！",function(){
			$.post('deleteSubmit.ShufflingManage',{advertisingId:id},function(data){
				var msg=data.msg;
				if(data.success==='true'){
					dialog.success(msg,2,function(){
						location.href=location.href;
					});	
				}else{
					dialog.tip(msg,2);	
				}
			},'json');
		});
	});
	
});