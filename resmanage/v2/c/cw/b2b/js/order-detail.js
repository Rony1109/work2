/*财务管理-b2b订单管理 下的订单详情页js*/
define(function(require, exports, module){
	var isSubmit=false;


	$('.imgsrc').on('click',function(){
		var $this=$(this);
		var html= '<div class="imgsrcwk"><img src="'+$this.attr('src')+'"></div>';
		art.dialog({
			id:'imgsrc',
			title: false,
			lock: true,
			content: html,
			fixed: true,
			drag:false,
			background: "#000",
            dblclick_hide:true,
			opacity: "0.2",
            init:function(){
                $('.imgsrcwk').css('max-height',$(window).height()-50);
                $(window).on('resize',function(){
                    $('.imgsrcwk').css('max-height',$(window).height()-50)
                })
            }
		});
		return false;
	});



	var dialog={
		success:function(msg,closeTime,callback){
			art.dialog({
				content: msg,
				icon:'csc-success',
				fixed:true,
				lock:true,
				opacity:0.2,
				time:closeTime || 2,
				padding:'20px 25px 20px 10px',
				close:callback || null
			});
		},
		error:function(msg,closeTime,callback){
			art.dialog({
				content: msg,
				icon: 'csc-error',
				fixed: true,
				lock:true,
				opacity:0.2,
				time:closeTime || 2,
				padding:'20px 25px 20px 10px',
				close:callback || null
			});
		},
		tip:function(msg,closeTime,callback){
			art.dialog({
				content: msg,
				icon: 'csc-tip',
				fixed: true,
				lock:true,
				opacity:0.2,
				time:closeTime || 2,
				padding:'20px 25px 20px 10px',
				close:callback || null
			});
		}
	}
	//更改订单状态
	$('.jsMdfySttc').on('click',function(){
		var $this=$(this);
		var inf=$this.data('inf');
		var status=$('#showChangeStatus').val();
		var orderId=inf.orderId;
		var html=['<div>',
					  '<p>请选择订单状态：</p>',
					  '<p class="g-h-10"></p>',
					  '<select name="status" style="width:200px;">',
						  '<option value="">请选择订单状态</option>',
						  (status==="5"?'<option value="2">已付款</option>':'<option value="3">交易完成</option>'),
					  '</select>',
				  '</div>'].join('');
		var dg=art.dialog({
			id:'changeSttc',
			title: '更改订单状态',
			lock: true,
			content: html,
			fixed: true,
			drag:false,
			background: "#000",
			opacity: "0.2",
			ok: function() {
				var val=$('select[name=status]').val();
				if(val===""){
					dialog.tip("请选择订单状态");
					return false;
				}else{
					if(isSubmit===true){return false;}//阻止表单重复提交
					isSubmit=true;
					$.get('http://bops.csc86.com/bops-app/bops/sz.modifyB2bOrderStatus',{status:val,orderId:orderId},function(data){
						dg.close();
						if(data.statuscode===1){
							dialog.success('订单状态修改成功',2,function(){
								location.href=location.href;
							});
						}else{
							dialog.error('订单状态修改失败');
						}
						isSubmit=false;
					},'jsonp');
				}
				return false;
			}
		});
		return false;
	});
});