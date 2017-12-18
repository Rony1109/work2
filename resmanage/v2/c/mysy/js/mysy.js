define(function(require, exports, module) {
	var page=require('http://resmanage.csc86.com/v2/m/page.js');
	
	var mysy={
		init:function(){
		
			this.opers();
			page.init($('.mysy-cost-topfrom'), {name: 'pageNumber'});
		},
		starttime:function(){
			WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'costendTime\')}',el:'coststartTime'})
		},
		endtime:function(){
			//WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'coststartTime\')}',maxDate:'#F{$dp.$D(\'coststartTime\',{M:+7});}',el:'costendTime'})
			WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'coststartTime\')}',el:'costendTime'})
		},
		startsstime:function(){
			WdatePicker({dateFmt:'yyyy-MM',maxDate:'#F{$dp.$D(\'costssendTime\')}',el:'costssstartTime'})
			//WdatePicker({dateFmt:'yyyy-MM',el:'costssstartTime'})
		},
		endsstime:function(){
			//WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'coststartTime\')}',maxDate:'#F{$dp.$D(\'coststartTime\',{M:+7});}',el:'costendTime'})
			WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'costssstartTime\')}',el:'costssendTime'})
		},
		startjfqxtime:function(){
			WdatePicker({dateFmt:'yyyy-MM-dd',el:'costjfqxtime'})
		},
		opers:function(){
			if($('#cost-dockingsystem').val()=="思源系统"){
				$('.sofftypeshow').show();
				$('.sofftypehide').hide();
			}else{
				$('.sofftypeshow').hide();
				$('.sofftypehide').show();
			}
			
			if($('#costdate').val()==3)
			{
				$('.mysy-costtimehide').show();
				$('.mysy-costtimeshow').hide();
				$('.myst-costtimejfqx').hide();
			}else if($('#costdate').val()==4)
			{
				$('.mysy-costtimehide').hide();
				$('.mysy-costtimeshow').hide();
				$('.myst-costtimejfqx').show();
			}else{
				$('.mysy-costtimehide').hide();
				$('.mysy-costtimeshow').show();
				$('.myst-costtimejfqx').hide();
			}
			/*应收全选*/
			$('.receseleall').on('click',function(){
				if($(this).attr("checked"))
				{
					 $("input[name='recesingle']").each(function () {
						$(this).attr("checked", true); 
					 });
				}else
				{
					$("input[name='recesingle']").each(function () {
						$(this).attr("checked", false); 
					 });	
				}
				
			});
			
			/*已收全选*/
			$('.costseleall').on('click',function(){
				if($(this).attr("checked"))
				{
					 $("input[name='costsingle']").each(function () {
						$(this).attr("checked", true); 
					 });
				}else
				{
					$("input[name='costsingle']").each(function () {
						$(this).attr("checked", false); 
					 });	
				}
				
			});
			
			/*应收单选*/
			$('input[name="recesingle"]').on('click',function(){
				var len=$("input[name='recesingle']").length;
				for(var i=0;i<len;i++)
				{
					if($("input[name='recesingle']").eq(i).attr('checked')){
						$('#receseleall').attr("checked", true); 
					}else{
						$('#receseleall').attr("checked", false); 
					}
				}
			});	  
			
			/*已收单选*/
			$('input[name="costsingle"]').on('click',function(){
				var len=$("input[name='costsingle']").length;
				for(var i=0;i<len;i++)
				{
					if($("input[name='costsingle']").eq(i).attr('checked')){
						$('#costseleall').attr("checked", true); 
					}else{
						$('#costseleall').attr("checked", false); 
					}
				} 
			});
			
			$('#coststrtim').on('click',function(){
				mysy.starttime();
			})
			
			/*data结束日期*/
			$('#costendtim').on('click',function(){
				mysy.endtime();
			})
			
			$('#costssstrtim').on('click',function(){
				mysy.startsstime();
			});
			
			$('#costssendtim').on('click',function(){
				
				mysy.endsstime();
			});
			
			$('#costjfqxstrtim').on('click',function(){
				mysy.startjfqxtime();
			});
			/*批量录入*/
			$('a[name="mysyinput"]').on('click',function(){
				
				if($("input[name='costsingle']:checked")[0])
				{
					art.dialog.confirm('是否确认批量标记,标注后无法更改。', function () {
						var len=$("input[name='costsingle']").length;
						var str="";
						for(var i=0;i<len;i++)
						{
							if($("input[name='costsingle']").eq(i).attr('checked')){
								 str+=$("input[name='costsingle']").eq(i).attr('data-costtabid')+";";
							}
						}
						str=str.substring(0,str.length-1);
						
						$.ajax({
							url:'http://'+location.host+'/bops-app/bops/estate.updateInput',
							data:{'ids':str},
							type: "get",
							dataType: "json",
							success: function (data) {
								var urls=location.href;
								var ss=urls.split('?');

								console.log(ss[0]);
								if(data.msg=="录入成功"){
									var hrefs=$("a[name='mysyexport']").attr("href");	
									//console.log(hrefs);
									var str = hrefs.split('?');
									var pages=$('.mysy-cost-topfrom').attr('data-page');
									if(str[1])
									{
										//console.log(str[1]);
										location.href=ss[0]+'?'+str[1]+"&pageNumber="+pages
										//console.log(ss[0]+'?'+str[1]+"&pageNumber="+pages);
									}
									
									//window.location.reload();
								}else{
									art.dialog({content:"出现异常录入失败",icon: 'error',fixed: true,time: 3});
								}
							}
						});
					}, function(){});
					
					
				}else
				{
					art.dialog({content:"请先选择需要标注录入的交易记录!",icon: 'error',fixed: true,time: 3});
				}
			})
			
			$('#cost-mytable tbody tr').find('td:last').find('input').change(function(){
				var This=$(this);
				var ids=$(this).parent('td').siblings().first().find('input').attr('data-costtabid');
				art.dialog.confirm('是否确认标记,标注后无法更改。', function () {
					$.ajax({
						url:'http://'+location.host+'/bops-app/bops/estate.updateInput',
						data:{'ids':ids},
						type: "get",
						dataType: "json",
						success: function (data) {
							if(data.success)
							{
								art.dialog({content:"录入成功!",icon: 'csc-success',fixed: true,time: 3});
							}else{
								art.dialog({content:"录入失败",icon: 'error',fixed: true,time: 3});
							}
						}
					});
				},function(){
					This.attr('checked',false);
				});
			})
			/*导出数据*/
			/*$('a[name="mysyexport"]').on('click',function(){
				
				
				art.dialog.confirm('是否确认导出所有数据', function () {
					var cityName=$(this).parent().siblings("input[name='cityName']").val();
					var bgnDate=$(this).parent().siblings("input[name='bgnDate']").val();
					var endDate=$(this).parent().siblings("input[name='endDate']").val();
					var bgnDate3=$(this).parent().siblings("input[name='bgnDate3']").val();
					var costType=$(this).parent().siblings("input[name='costType']").val();
					var systemName=$(this).parent().siblings("input[name='systemName']").val();
					var datetype=$(this).parent().siblings("input[name='datetype']").val();
					var payMethod=$(this).parent().siblings("input[name='payMethod']").val();
					var isCoupon=$(this).parent().siblings("input[name='isCoupon']").val();
					var isNull=$(this).parent().siblings("input[name='isNull']").val();
					location.href='http://'+location.host+'/bops-app/bops/estate.exportReceiveRecordReport?cityName='+cityName+'&bgnDate='+bgnDate+'&endDate='+endDate+'&bgnDate3='+bgnDate3+'&costType='+costType+'&systemName='+systemName+'&datetype='+datetype+'&payMethod='+payMethod+'&isCoupon='+isCoupon+'&isNull='+isNull;
				},function(){});
				if($("input[name='costsingle']:checked")[0])
				{
					
					/*var len=$("input[name='costsingle']").length;
					var str="";
					var systemname=$("input[name='systemName']").val();
					for(var i=0;i<len;i++)
					{
						if($("input[name='costsingle']").eq(i).attr('checked')){
							 str+=$("input[name='costsingle']").eq(i).attr('data-costtabid')+";";
						}
					}
					str=str.substring(0,str.length-1);
					
					
					
				}else
				{
					art.dialog({content:"请先选择需要标注录入的交易记录!",icon: 'error',fixed: true,time: 3});
				}
			})*/
			
			/*所属账期和费用属期日期区间清空*/
			$('#costdate').change(function(){
				/*if($(this).val()==3)
				{
					$('.mysy-costtimehide').show();
					$('.mysy-costtimeshow').hide();
				}else{
					$('.mysy-costtimehide').hide();
					$('.mysy-costtimeshow').show();
				}*/
				
				if($('#costdate').val()==3)
				{
					$('.mysy-costtimehide').show();
					$('.mysy-costtimeshow').hide();
					$('.myst-costtimejfqx').hide();
				}else if($('#costdate').val()==4)
				{
					$('.mysy-costtimehide').hide();
					$('.mysy-costtimeshow').hide();
					$('.myst-costtimejfqx').show();
				}else{
					$('.mysy-costtimehide').hide();
					$('.mysy-costtimeshow').show();
					$('.myst-costtimejfqx').hide();
				}
			
			})
			
			$('#cost-dockingsystem').change(function(){
				console.log($(this).val());
				if($(this).val()=="明源系统"){
					$('.sofftypeshow').hide();
					$('.sofftypehide').show();
				}else if($(this).val()=="思源系统"){
					$('.sofftypeshow').show();
					$('.sofftypehide').hide();
				}
				
			})
			
		}
	}
	/*页面加载调用*/
	mysy.init();
});