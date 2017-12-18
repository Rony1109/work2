var ref='<div class="test-focus"><textarea class="test-val" onkeyup="textarea_maxlen.isMax(\'testVal\',\'120\')"   onfocus="textarea_maxlen.dRMouse()"  onblur="textarea_maxlen.eRMouse()" id="testVal"></textarea><div class="test-lay">请输入理由，最多120个文字。</div></div>';
//人工推荐会员
function changeState(sta,obj){
	if(sta=="all"){
		var selT=$(".g-list tbody input:checked").length;
		if(selT>0){
			var listA=[];
			for(var i=0;i<selT;i++){
				var listV=$(".g-list tbody input:checked").eq(i).attr("value");
				var listTw=$(".g-list tbody input[value='"+listV+"']").parent().next().children().attr("value");
				var listSta=$(".g-list tbody input[value='"+listV+"']").parents("tr").children("td:eq(5)").children("select").children("option:selected").attr("value");
				if(listTw==""||listTw=="N"){
					listA.push(listV+";Y;"+listSta);
				}else{
					listA.push(listV+";N;"+listSta);
				}
			}
			$.get("memberAudit.updateRecommendMember",{"memmberlist":listA.join(",")},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
		}else{
			art.dialog({content:"请选择要推荐的会员！",icon: 'csc-warn',fixed: true,time: 1.5});
		}
	}else{
		var $tr=$(obj).parents("tr"),star;
		if($tr.children("td:eq(1)").children("input").attr("value")==""||$tr.children("td:eq(1)").children("input").attr("value")=="N"){
			star="Y";
		}else{
			star="N";
		}
		var listV=$tr.children("td:eq(0)").children().attr("value")+";"+star+";"+$tr.children("td:eq(5)").children("select").children("option:selected").attr("value");
		$.get("memberAudit.updateRecommendMember",{"memmberlist":listV},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
	}
}


//圈子审核管理 已通过
function trClose(tmp,obj){
	var listVal;
	if(tmp=="all"){
		var selT=$(".g-list input:checked").length;
		if(selT>0){
			var listA=[];
			for(var i=0;i<selT;i++){
				var listV=$(".g-list input:checked").eq(i).attr("value");
					listA.push(listV);
				}
			}
		listVal=listA.join(",");
	}else{
		var $tr=$(obj).parents("tr").children("td:eq(0)").children().children().attr("value");
		listVal=$tr;
	}
	art.dialog({
		 title:"拒绝理由",
		content:ref,
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var textVal=document.getElementById("testVal").value,testValue;
			if(textVal==""){
				art.dialog({
					content: '请选择或输入理由！',
					fixed: true,
					time: 1
				});
				return false;
			}else{
				testValue=textVal;
			};
			$.get("circleAudit.circleCheckClose",{"circleId":listVal,"applyEventType":"NEWCIRCLE","applyState":"PAUSE","applyReason":testValue},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
			},
		init:function(){
			$(".test-focus").click(function(){
				$(this).children(".test-lay").remove();
			});
		},
		cancel: true,
		lock:true
	});
}


function aReturn(tmp,po,pt){
	if(tmp>=1){
		art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
		setTimeout(function(){location.href = location.href;},1500);
	}else{
		art.dialog({content: pt,icon: 'error',fixed: true,time: 1.5});
	}
}

function selecttrends(){
	art.dialog({
		 title:"确定删除",
		content:"确定删除此动态?",
		fixed: true,
		okVal: '确定',
		ok: function () {
			var check=document.getElementById("trendsId").value;
			$.get("marketAudit.updateMarketTrendsState",{"trendsId":check,"trendsState":"FAIL"},function(data){
				if(data==1){
					art.dialog({content:"删除成功！",icon: 'succeed',fixed: true,time: 1.5});
				}else if(data==0){
					art.dialog({content:"删除成功！",icon: 'error',fixed: true,time: 1.5});
				}else{
					art.dialog({content:"系统异常，请刷新后再试！",icon: 'error',fixed: true,time: 1.5});
				};location.href = location.href;
			},"jsonp");
		},
		cancel: true,
		opacity:0,
		lock:true
	});
}
function queryBack()
{
	var til=document.getElementById("trendsTitle").value,
	disId=$("#dispaly option:selected").val(),
	prId=$("#provice option:selected").val(),
	mrktId=$("#marketId option:selected").val(),
	mark=$("#description").text();
	til1=document.getElementById("trendsTitles").value,
	disId1=document.getElementById("dispalys").value;
	prId1=document.getElementById("provices").value;
	mrktId1=document.getElementById("circleNames").value;
	mark1=$("#marketeTrendss").text();
	mark3=mark.replace(/\s/g,'');
	mark2=mark1.replace(/\s/g,'');
	var s;
	try{s = mrktId.indexOf(mrktId1);}catch(e){s=0}
	if(til==til1&&disId==disId1&&s>0){
		location.href="marketAudit.findDynamicWait";
	}else{
	art.dialog({
		 title:"确定离开",
		content:"您有修改过动态标题或市场动态，确定离开？",
		fixed: true,
		okVal: '确定',
		ok: function () {
			location.href="marketAudit.findDynamicWait";
		},
		cancel: true,
		opacity:0,
		lock:true
	});
	}
}

function updateCircleCheck(all,id,textval,obj){
	obj=obj||null;
	var check=document.getElementsByName("trendSelect");
	var name="";
	if(all=='one'){
		name=id;
	}else{
		for(var i=0;i<check.length;i++)
		{
			if(check[i].checked==true)
			{
				name=check[i].value+","+name;
			}
		}
	}
	if(name.length>0)
	{
		if(textval=='yes'){
			art.dialog({
				title:"删除提示",
				content:"您确定要彻底删除？",
				fixed: true,
				background:"#000",
				opacity:"0.3",
				ok: function () {
					$.get("circleAudit.circleCheck",{"applyEventType":'NEWCIRCLE',"circleId":name,"applyState":textval},function(data){
						aReturn(data,"删除成功！","删除失败！");
					},"jsonp")
				},
				cancel: true,
				lock:true
			});
		}else if(textval=="FAIL"){
			mvRefs_pr("circleAudit.circleCheck",{"applyEventType":'NEWCIRCLE',"circleId":name,"applyState":textval},$quan_msg_data.addquan_bad,function(data){aReturn(data,"操作成功！","操作失败！");})
		}else{
			
			//批量和单个通过公用的函数
			var passFun=function(){
				$.get("circleAudit.circleCheck",{"applyEventType":'NEWCIRCLE',"circleId":name,"applyState":textval},function(data){
				aReturn(data,"操作成功！","操作失败！");
			},"jsonp");
			};
			
			if(all=='one'){//点击单个通过时
				var $tr=$(obj).parents("tr:first");
				var	dataObj=JSON.stringify({"circlename":$tr.data("circlename"),"applyusername":$tr.data("applyusername"),"applyreason":$tr.data("applyreason")});
				//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
				isHaveMgc('circleAudit.check',{rows:[dataObj]},function(){
					passFun();
				});
			}else{//点击批量通过时
				passFun();
			}
			
		}
	}else{
		art.dialog({content:"您还没有选择！",icon: 'csc-tip',fixed: true,time: 1.5});
	}
}

function toindex(id,mark){
	var msg={
		title:"提示",
		left:"操作失败!",
		right:"操作成功!",
		contert: mark ? "您确定要恢复前台显示?" : "您确定要取消前台显示?"
	};
	art.dialog({
		title:msg.title,
		content:msg.contert,
		fixed: true,
		background:"#000",
		opacity:"0.3",
		ok: function () {
			$.post("circleAudit.updateCircleShow",{'circleId':id,"circleindexshow":mark},function(data){
				aReturn(data,msg.right,msg.left);
			});
		},
		cancel: true,
		lock:true
	});
}

function toindexs(mark){
	var check=document.getElementsByName("trendSelect"),
	ids = "",
	msg={
		title:"提示",
		left:"操作失败!",
		right:"操作成功!",
		contert: mark ? "您确定要把所选项恢复前台显示?" : "您确定要把所选项取消前台显示?"
	};
	for(var i=0;i<check.length;i++)
	{
		if(check[i].checked==true)
		{
			ids+=check[i].value.split(":")[0]+",";
		}
	}
	if(ids.length>0){
		art.dialog({
			title:msg.title,
			content:msg.contert,
			fixed: true,
			background:"#000",
			opacity:"0.3",
			ok: function () {
				$.post("circleAudit.updateCircleShow",{'circleId':ids,"circleindexshow":mark},function(data){
					aReturn(data,msg.right,msg.left);
				})
			},
			cancel: true,
			lock:true
		});
	}else{
		art.dialog({content:"您还没有选择！",icon: 'error',fixed: true,time: 1.5});
	}
}
