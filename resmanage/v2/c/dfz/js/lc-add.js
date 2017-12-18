define(function(require, exports, module) {
	var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	var isSubmit=false;
	
	var lcAdd={
		//添加楼层介绍
		addAbout:function(){
			$('#lcAddBox').on('click','.jsAddOpt',function(){
				var $this=$(this),
					$tr=$this.parents('tr:first'),
					html='<tr>'+
							'<th>楼层介绍：</th>'+
							'<td>'+
								'<input type="text" value="" name="itemName" class="ipt-txt"><a class="add-opt jsAddOpt">+</a><a class="plut-opt jsPlutOpt">-</a>'+
							'</td>'+
						'</tr>';
				$tr.after(html);
				return false;
			});
		},
		//删除楼层介绍
		delAbout:function(){
			$('#lcAddBox').on('click','.jsPlutOpt',function(){
				var $this=$(this),
					$tr=$this.parents('tr:first');
				$tr.remove();
				return false;
			});
		},
		//提交
		submitFrm:function(){
			$('.jsLcAddFrm').on('submit',function(){
				var $this=$(this);
				var $title=$this.find('#title');
				if($title.val()==""){
					dialog.tip("带“*”为必填项！",3);
					return false;
				}
				
				//阻止表单重复请求
				if(isSubmit===true){return false;}
				isSubmit=true;
				$.post($this.attr('action'),$this.serializeArray(),function(data){
					var msg=data.msg;
					if(data.success==='true'){
						
						dialog.success(msg,2,function(){
							//location.href='http://bops.csc86.com/bops-app/bops/'+data.url;
							//location.href=location.href;
							location.href='http://bops.csc86.com/bops-app/bops/floorAreaManage?venueId='+$("#venueId").val();
						});	
					}else{
						dialog.tip(msg,2);	
					}
					//请求完成后恢复isSubmit为false，让点击提交时请求可再次请求
					isSubmit=false;
				},'json');
				return false;
			});
		},
		init:function(){
			lcAdd.addAbout();
			lcAdd.delAbout();
			lcAdd.submitFrm();
		}
	};
	lcAdd.init();
});