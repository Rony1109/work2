define(function(require, exports, module) {
	var page=require('http://resmanage.csc86.com/v2/m/page.js');
	
	var recon={
		init:function(){

			this.opers();
		},
		starttime:function(){
				WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'costendTime\')}',el:'coststartTime'})
		},
		endtime:function(){
			//WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'coststartTime\')}',maxDate:'#F{$dp.$D(\'coststartTime\',{M:+7});}',el:'costendTime'})
			WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'coststartTime\')}',el:'costendTime'})
		},
		startsstime:function(){
			
			WdatePicker({dateFmt:'yyyy-MM',el:'costssstartTime'})
		},
		opers:function(){
			/*初始化打开判断系统类型*/
			if($('#cost-dockingsystem').val()=="明源系统"){
				$('.sofftypeshow').hide();
				$('.sofftypehide').show();
				$('.sofftyoeall').hide();
			}else if($('#cost-dockingsystem').val()=="思源系统") {
				$('.sofftypeshow').show();
				$('.sofftypehide').hide();
				$('.sofftyoeall').hide();
			}else if($('#cost-dockingsystem').val()=="全部")
			{
				$('.sofftyoeall').show();
				$('.sofftypeshow').hide();
				$('.sofftypehide').hide();
				
			}

			/*初始化打开判断费用属期*/
			if($('#costdate').val()==3)
			{
				$('.mysy-costtimehide').show();
				$('.mysy-costtimeshow').hide();
			}else{
				$('.mysy-costtimehide').hide();
				$('.mysy-costtimeshow').show();
			}
			/*点击表格展开图标*/
			$('.reconblock').on('click',function(){
				$(this).parents('tr').next().find('table').hide();
				$(this).hide();
				$(this).siblings('.reconnone').show();
			})
			/*点击表格收缩图标*/
			$('.reconnone').on('click',function(){
				$(this).parents('tr').next().find('table').show();
				$(this).hide();
				$(this).siblings('.reconblock').show();
			})
			
			/*分区全选*/
			$("input[name='reconcheall']").on('click',function(){
				if($(this).attr("checked"))
				{
					$(this).parents('tr').next().find("input[name='reconchesingle']").each(function () {
						$(this).attr("checked", true); 
					});
				}else
				{
					$(this).parents('tr').next().find("input[name='reconchesingle']").each(function () {
						$(this).attr("checked", false); 
					});	
				}
				
			});
			
			/*单选点击*/
			$('input[name="reconchesingle"]').on('click',function(){
				var lenall=$(this).parents('.reconbodylist').find("input[name='reconchesingle']").length
				var lensele=$(this).parents('.reconbodylist').find("input[name='reconchesingle']:checked").length;
				if(lensele>=lenall)
				{
					console.log(1);
					$(this).parents('.recontbodylist').find("input[name='reconcheall']").attr("checked", true);
				}else{
					console.log(2);
					$(this).parents('.recontbodylist').find("input[name='reconcheall']").attr("checked", false);
				}
				
			});
			
			/*所有的全选*/
			$('#reconseleall').on('click',function(){
				if($(this).attr("checked"))
				{
					 $("input[class='reconselsig']").each(function () {
						$(this).attr("checked", true); 
					 });
				}else
				{
					$("input[class='reconselsig']").each(function () {
						$(this).attr("checked", false); 
					 });	
				}
			})
			
			/*房间费用查询*/
			$('.costmanageseleall').on('click',function(){
				
				if($(this).attr("checked"))
				{
					
					 $("input[class='reconselsig']").each(function () {
						$(this).attr("checked", true); 
					 });
				}else
				{
					$("input[class='reconselsig']").each(function () {
						$(this).attr("checked", false); 
					 });	
				}
			})
			
			/*点击下拉系统改变后触发系统选择*/
			$('#cost-dockingsystem').change(function(){
				if($(this).val()=="明源系统"){
					$('.sofftypehide').show();
					$('.sofftypeshow').hide();
					$('.sofftyoeall').hide();
				}else if($(this).val()=="思源系统"){
					$('.sofftypeshow').show();
					$('.sofftypehide').hide();
					$('.sofftyoeall').hide();
				}else if($(this).val()=="全部"){
					$('.sofftypeshow').hide();
					$('.sofftypehide').hide();
					$('.sofftyoeall').show();
				}
				
			})
			
			/*所属账期和费用属期日期区间清空*/
			$('#costdate').change(function(){
				if($(this).val()==3)
				{
					$('.mysy-costtimehide').show();
					$('.mysy-costtimeshow').hide();
				}else{
					$('.mysy-costtimehide').hide();
					$('.mysy-costtimeshow').show();
				}
			})
			
			/*选择月份的日期属于所属账期的触发*/
			$('#coststrtim').on('click',function(){
				recon.starttime();
			})
			
			/*data结束日期*/
			$('#costendtim').on('click',function(){
				recon.endtime();
			})
			/*data开始日期*/
			$('#costssstrtim').on('click',function(){
				recon.startsstime();
			});
		}
	}
	/*页面加载调用*/
	recon.init();
});