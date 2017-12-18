define(function(require, exports, module) {
	var common=require('./common.js');
	var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	require('http://resmanage.csc86.com/v2/m/page.js').init();//分页
	
	var lcMng={
		/*批量删除*/
		delAll:function(){
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
					dialog.tip("请先选择需要删除的楼层！",3);
					return false;
				}
				dialog.confirm("确定要删除选中的楼层！",function(){
					console.log({ids:arryId.join()});
					$.post('http://bops.csc86.com/bops-app/bops/floorAreaDelete',{ids:arryId.join()},function(data){
						console.log(data);
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
		},
		/*单个删除*/
		delOne:function(){
			$('.jsDelOne').on('click',function(){
				var $this=$(this),
					$tr=$this.parents('tr:first'),
					id=$tr.data('id');
				dialog.confirm("确定要删除该楼层！",function(){
					$.post('http://bops.csc86.com/bops-app/bops/floorAreaDelete',{ids:id},function(data){
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
		},
		init:function(){
			common.check();//全选反选
			common.upOpt('http://bops.csc86.com/bops-app/bops/floorAreaUpdateSort');//向上排序 
			common.downOpt('http://bops.csc86.com/bops-app/bops/floorAreaUpdateSort')//向下排序
			lcMng.delAll();//批量删除
			lcMng.delOne();//单个删除
		}
	};
	lcMng.init();
});