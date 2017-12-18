define(function(require, exports, module) {
	var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	var common={
		/*全选和反选功能*/
		check:function(){
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
		},
		/*向上排序*/
		upOpt:function(url){
			$('.jsUpOpt').on('click',function(){
				var $this=$(this),
					$tr=$this.parents('tr:first'),
					upVenueId=$tr.data('id'),
					$jsPx=$tr.find('.jsPx'),
					jsPx=$jsPx.val(),//当前项的排序序号
					spv=$jsPx.prev().text();
					
					$prevTr=$tr.prev(),
					$prevPx=$prevTr.find('.jsPx'),
					prevPx=$prevPx.val(),//当前项的前一项的排序序号
					spp=$prevPx.prev().html();
					
					downVenueId=$prevTr.data('id');
				if(!$prevTr[0]){
					dialog.tip('已经是第一个了，不能在往前移啦！',3);
				}else{ 
					$.post(url,{"upId":upVenueId,"upSort":jsPx,"downId":downVenueId,"downSort":prevPx},function(data){
						if(data.success)
						{
							location.href=location.href;
							
						}else
						{
							dialog.tip('页面排序失败',3);
						}
						/*$prevTr.before($tr);
						if($tr.hasClass('bg')){
							$tr.removeClass('bg');
							$prevTr.addClass('bg');
						}else{
							$tr.addClass('bg');
							$prevTr.removeClass('bg');
						}
						$jsPx.val(prevPx);
						$prevPx.val(jsPx);
						$jsPx.prev().html(spp);
						$prevPx.prev().html(spv);*/
					},'json');
				}
				return false;
			});
		},
		/*点击向下*/
		downOpt:function(url){
			$('.jsDownOpt').on('click',function(){
				var $this=$(this),
					$tr=$this.parents('tr:first'),
					$jsPx=$tr.find('.jsPx'),  //点击当前行
					upVenueId=$tr.data('id'), //当前行的id
					jsPx=$jsPx.val();//当前项的排序序号 input的值
					spv=$jsPx.prev().text(); //显示的序号
					var $nextTr=$tr.next();   //下一行 
					var $nextPx=$nextTr.find('.jsPx');//下一行input
					var nextPx=$nextPx.val();//下一列input的值
					var downVenueId=$nextTr.data('id'); //下一行的ID
					
					spp=$nextPx.prev().html(); //下一行显示的需要
					
					/*
					
					spv=$jsPx.prev().text(); //这个才是序号
					upVenueId=$tr.data('id'),  //当前的ID
					$nextTr=$tr.next(),
					$nextPx=$nextTr.find('.jsPx'), //下一个ID

					downVenueId=$nextTr.data('id'),
					nextPx=$nextPx.val();//当前项的下一列 排序序号  input的值
					spp=$nextPx.prev().html(); //
					*/
				if(!$nextTr[0]){
					
					dialog.tip('已经是最后一个了，不能在往后移啦！',3);
				}else{
				$.post(url,{"upId":upVenueId,"upSort":jsPx,"downId":downVenueId,"downSort":nextPx},function(data){
					/*$nextTr.after($tr);
					if($tr.hasClass('bg')){
						$tr.removeClass('bg');
						$nextTr.addClass('bg');
					}else{
						$tr.addClass('bg');
						$nextTr.removeClass('bg');
					}
					$jsPx.val(nextPx);
					$nextPx.val(jsPx);
					$jsPx.prev().html(spp);
					$nextPx.prev().html(spv);*/
					
					if(data.success)
					{
						location.href=location.href;
						//window.location.reload();
					}else
					{
						dialog.tip('页面排序失败',3);
					}
				},'json');
					
				}
				return false;
			});
		}
	};
	module.exports=common;
});