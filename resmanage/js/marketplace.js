//var url =BASEURL+"bops-app/bops/";
//会员审核
var ref='<div class="ly-d-art"><p><label><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="填写的批发市场不存在">1、填写的批发市场不存在</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="该市场名称已经存在，不能重复创建">2、该市场名称已经存在，不能重复创建</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写正确的批发市场名称">3、请填写正确的批发市场名称</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="市场形象图模糊、不清晰">4、市场形象图模糊、不清晰</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="市场形象图与该市场不相符">5、市场形象图与该市场不相符</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您填写的市场所在地与实际市场不相符">6、您填写的市场所在地与实际市场不相符</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写正确的市场地址">7、请填写正确的市场地址</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="主营行业必须与该市场的行业相符合">8、主营行业必须与该市场的行业相符合</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您填写的该市场的行业已经存在，不能重复创建">9、您填写的该市场的行业已经存在，不能重复创建</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您填写的经营范围与主营行业不相符">10、您填写的经营范围与主营行业不相符</label></p>'+
              			'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="市场介绍内容格式不正确，导致页面不能正常显示">11、市场介绍内容格式不正确，导致页面不能正常显示</label></p>'+
						'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="市场介绍不能包含国家违禁产品和服务">12、市场介绍不能包含国家违禁产品和服务</label></p>'+
						'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value=" 详细填写正确的市场介绍，你可以从文化背景，市场规模，经营产品范围等方面有效描述">13、 详细填写正确的市场介绍，你可以从文化背景，市场规模，经营产品范围等方面有效描述</label></p></div>'+
						'<div class="test-focus"><textarea class="test-val" id="testVal" ></textarea><div id="test_msg" style="color:#F00;"></div><div class="test-lay">请输入理由，最多2000个字。</div></div>';

$(function(){
	$("#SWFUpload_0").css("display","none");
})
//拒绝
function selecttrends(tmp,state,te,sel){
	switch(te){
		case "all":
			var selT=$("table tbody .list-id input:checked").length;
			if(selT>0){
				var tem=[];
				for(var i=0;i<selT;i++){
					tem.push($("table tbody .list-id input:checked").eq(i).attr("value"));
				}
				var selVal=tem.join(",");
				artDialog(tmp,state,te,sel,selVal);
			}else{art.dialog({content: '请先选择您要操作的项！',fixed: true,time: 1.5});}
		break;
		case "one":
			var selVal=$(tmp).parent("td").siblings(".list-id").children("input").attr("value");
			artDialog(tmp,state,te,sel,selVal);
		break;
		case "other":
			var selVal=document.getElementById("marketId").value;
			artDialog(tmp,state,te,sel,selVal);
		break;
		default:
		break;
	}
}
function artDialog(tmp,state,te,sel,val){
	var te_s = te;
	art.dialog({
		 title:"拒绝理由",
		content: ref,
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var textVal=document.getElementById("testVal").value,testValue;
			if(textVal==""||textVal.length<5||textVal.length>2000){
				$("#test_msg").show().text("请输入理由，字数限制为5～2000个");
				return false;
			}else{
				testValue=textVal;
			};
			switch(sel){
				case "1":
				$.post("marketCheckManageNews.updateNewMarketState",{"marketId":val+",","applyState":state,"replyReason":testValue},function(data){
					if(te_s=="other"){
						rePw(data);
					}else{
						aReturn(data,"操作成功！","操作失败！");
					}
				},"jsonp");
				break;
				case "2":
				$.post("marketCheckManage.updateCommentCheckManage",{"commentId":val+",","commentSate":state,"commentReason":testValue},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
				break;
				case "3":
				$.post("marketCheckManage.updateActivityCheck",{"activityId":val+",","activitySate":state,"activityReason":testValue},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
				break;
				default:
				break;
			}
		},
		init : function () {
				$(".test-focus").click(function () {
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

function selecttrendsDetail(){
	art.dialog({
		 title:"确定删除",
		content:"确定删除此动态?",
		fixed: true,
		okVal: '确定',
		ok: function () {
			var check=document.getElementById("trendsId").value;
			$.get("marketAudit.updateMarketTrendsState",{"trendsId":check+",","trendsState":"FAIL"},function(data){
				if(data==1){
					art.dialog({content:"删除成功！",icon: 'succeed',fixed: true,time: 1.5});
				}else if(data==0){
					art.dialog({content:"删除失败！",icon: 'error',fixed: true,time: 1.5});
				}else{
					art.dialog({content:"系统异常，请刷新后再试！",icon: 'error',fixed: true,time: 1.5});
				};history.back();
			},"jsonp");
		//location.href="marketAudit.updateMarketTrendsState?trendsId="+check+",&trendsState=FAIL";
		},
		cancel: true,
		opacity:0,
		lock:true
	});
}

function checksub(){
	var $marketId=$("#marketId").attr("value").toString();
	var $td1_1=$(".waitin-tr3 tr:eq(1)").children("td:eq(1)").children("input").attr("value"),
			$td1_2=$(".waitin-tr3 tr:eq(1)").children("td:eq(2)").children("input").attr("value"),
			$td1_3=$(".waitin-tr3 tr:eq(1)").children("td:eq(3)").children("input").attr("value"),
			$td2_1=$(".waitin-tr3 tr:eq(2)").children("td:eq(1)").children("input").attr("value"),
			$td2_2=$(".waitin-tr3 tr:eq(2)").children("td:eq(2)").children("input").attr("value"),
			$td2_3=$(".waitin-tr3 tr:eq(2)").children("td:eq(3)").children("input").attr("value"),
			$td3_1=$(".waitin-tr3 tr:eq(3)").children("td:eq(1)").children("input").attr("value"),
			$td3_2=$(".waitin-tr3 tr:eq(3)").children("td:eq(2)").children("input").attr("value"),
			$td3_3=$(".waitin-tr3 tr:eq(3)").children("td:eq(3)").children("input").attr("value");
	if($marketId.length!=36){
		$(".at-look tr td .po-cet-cl").css("color","#f30");
		return false;
	}
	if($td1_1!=""){
		if($td1_2==""||$td1_3==""){
			return poInput(1);
		}else if($td1_2==""){
			return poInput(1);
		}else if($td1_3==""){
			return poInput(1);
		}else if($td1_2.toString().substring(0,7)!="http://"){
			return poInput(1);
		}else if($td1_3.toString().substring(0,7)!="http://"){
			return poInput(1);
		}
	}
	if($td2_1!=""){
		if($td2_2==""||$td2_3==""){
			return poInput(2);
		}else if($td2_2==""){
			return poInput(2);
		}else if($td2_3==""){
			return poInput(2);
		}else if($td2_2.toString().substring(0,7)!="http://"){
			return poInput(2);
		}else if($td2_3.toString().substring(0,7)!="http://"){
			return poInput(2);
		}
	}
	if($td3_1!=""){
		if($td3_2==""||$td3_3==""){
			return poInput(3);
		}else if($td3_2==""){
			return poInput(3);
		}else if($td3_3==""){
			return poInput(3);
		}else if($td3_2.toString().substring(0,7)!="http://"){
			return poInput(3);
		}else if($td3_3.toString().substring(0,7)!="http://"){
			return poInput(3);
		}
	}
}
function poInput(tmp){
	$(".po-cet-cl").css("color","#888");
	$(".waitin-tr3 tr:eq("+tmp+")").children("td:eq(3)").children(".po-cet-cl").css("color","#f30");
	return false;
}

function changepro(tmp){
	$.get("marketAudit.chengeProvince",{"provice":tmp},function(data){
		$("#marketId").html("");
		var selval="";
		$.each(data,function (key,val){
				selval+="<option value="+val.marketId+">"+val.circleName+"</option>";
		});
		$("#marketId").append(selval);
	},"jsonp");
}
//下一条
function nextpage(tmp,um){
	var cur=parseInt($("#indexpage").attr("value"));
	var pum=$("input[name=sumNamber]").val();
	switch(um){
		case "1":
		if(pum==cur){
			art.dialog({content: "当前已是最后一条！",icon: 'error',fixed: true,time: 1.5});
		}else{
			if(cur+1>tmp){
				var t=parseInt($('input[name=start]').val())+1;
				location.href="marketCheckManageSettled.showMarketCheckManage?applyState="+$('input[name=applyState]').val()+"&start="+t+"&selectOne="+$('input[name=selectOne]').val()+"&marketName="+$('input[name=marketName]').val()+"&startTime="+$('input[name=startTime]').val()+"&endTime="+$('input[name=endTime]').val()+"&add="+$('input[name=add]').val()+"&onestart="+$("input[name=onestart]").val();
			}else{
				var star=$(".index-look table tr"),mark,comp,appl;
				for(var i=0; i<star.length;i++){
					if(star.eq(i).children("td:eq(3)").html()==cur){
						comp=star.eq(i+1).children("td:eq(0)").html();
						appl=star.eq(i+1).children("td:eq(1)").html();
						mark=star.eq(i+1).children("td:eq(2)").html();
					}
				}
				$.post("marketCheckManageSettled.showMarketCheckInfolist",{"marketId":mark,"companyId":comp,"applyId":appl,"listtest":cur+1},function(data){
					var $t=$(".wait-m table");
					$t.eq(0).find("tr:eq(0)").find("td").html(data.market.memberJoinTime);
					var member,city,mbcount;
					switch(data.market.memberState){
						case "NORMAL":
							member="正常";
						break;
						case "QUIT":
							member="退出";
						break;
						case "DISABLE":
							member="失效";
						break;
					}
					$t.eq(0).find("tr:eq(1)").find("td").html(member);
					$t.eq(1).find("tr:eq(0)").find("td").html(data.market.marketName);
					$t.eq(1).find("tr:eq(1)").find("td").html(data.market.catName);
					if((data.market.city!=="undefined")&&(data.market.province!=="undefined")){
						city=data.market.city.split(":");
						$t.eq(1).find("tr:eq(2)").find("td").html(data.market.province+","+city[1]);
					}
					if((data.market.city!=="undefined")&&(data.market.province==="undefined")){
						city=data.market.city.split(":");
						$t.eq(1).find("tr:eq(2)").find("td").html(city[1]);
					}
					if((data.market.city==="undefined")&&(data.market.province!=="undefined")){
						$t.eq(1).find("tr:eq(2)").find("td").html(data.market.province);
					}
					$t.eq(1).find("tr:eq(3)").find("td").html(data.market.tagName);
					if(data.market.memberCount=="undefined"){
						mbcount=="";
					}else{
					mbcount=data.market.memberCount+"家";
					}
					$t.eq(1).find("tr:eq(4)").find("td").html(mbcount);
					$t.eq(2).find("tr:eq(0)").find("td").html(data.memberdto.enterprise);
					var tagname="";
					if(data.membercatName==="undefined"){
						tagname="";
					}else if(data.membercatName.length=="1"){
						tagname=data.membercatName[0].name;

					}else{
						for(var i=0;i<data.membercatName.length;i++){
							tagname+=data.membercatName[i].name+",";
						}
					}
					$t.eq(2).find("tr:eq(1)").find("td").html(tagname);
					$("#indexpage").attr("value",data.listtest);
					$t.eq(2).find("tr:eq(2)").find("td").html(data.tagname);
					$t.eq(2).find("tr:eq(3)").find("td").html(data.memberdto.model);
					$t.eq(2).find("tr:eq(4)").find("td").html(data.memberdto.enterpriseType);
					$t.eq(2).find("tr:eq(5)").find("td").html(data.memberdto.introduce);
				},"jsonp");
			}
		}
		break;
		case "2":
		if(pum==cur){
			art.dialog({content: "当前已是最后一条！",icon: 'error',fixed: true,time: 1.5});
		}else{
			if(cur+1>tmp){
				var t=parseInt($('input[name=start]').val())+1;
				location.href="marketCheckManageNews.showNewMarketCheckManage?applyState="+$('input[name=applyState]').val()+"&start="+t+"&selectOne="+$('input[name=selectOne]').val()+"&marketName="+$('input[name=marketName]').val()+"&startTime="+$('input[name=startTime]').val()+"&endTime="+$('input[name=endTime]').val()+"&add="+$('input[name=add]').val()+"&onestart="+$("input[name=onestart]").val();
			}else{
				var star=$(".index-look table tr"),mark,comp,appl;
				for(var i=0; i<star.length;i++){
					if(star.eq(i).children("td:eq(3)").html()==cur){
						comp=star.eq(i+1).children("td:eq(0)").html();
						appl=star.eq(i+1).children("td:eq(1)").html();
						mark=star.eq(i+1).children("td:eq(2)").html();
					}
				}
				$.post("marketCheckManageNews.showNewMarketInfolist",{"marketId":mark,"companyId":comp,"applyId":appl,"listtest":cur+1},function(data){
					var $t=$(".wait-m table");
					$("#indexpage").attr("value",data.listtest);
					$t.eq(0).find("tr:eq(0)").find("td").html(data.market.applyTime2);
					var member,city,mbcount;
					switch(data.market.applyState){
						case "WAITING":
							member="待审核";
						break;
						case "PASS":
							member="已通过";
						break;
						case "FAIL":
							member="已拒绝";
						break;
					}
					$t.eq(0).find("tr:eq(1)").find("td").html(member);
					$("#marketNamechange").html(data.market.marketName);
					$("#marketNames").val(data.market.marketName);
					if((data.market.city!=="undefined")&&(data.market.province!=="undefined")){
						$t.eq(1).find("tr:eq(1)").find("td").html(data.market.province+","+data.market.city);
					}
					if((data.market.city!=="undefined")&&(data.market.province==="undefined")){
						city=data.market.city.split(":");
						$t.eq(1).find("tr:eq(1)").find("td").html(data.market.city);
					}
					if((data.market.city==="undefined")&&(data.market.province!=="undefined")){
						$t.eq(1).find("tr:eq(1)").find("td").html(data.market.province);
					}
					$t.eq(1).find("tr:eq(2)").find("td").html(data.market.catName);
					$t.eq(1).find("tr:eq(3)").find("td").html(data.market.tagName);
					$t.eq(1).find("tr:eq(4)").find("div.text_con").html(data.market.marketDescription);
					window.editor.html(data.market.marketDescription);
					$(".highslide").attr("href",data.market.marketLogoUrl);
					$("#imgload0").attr("src",data.market.marketLogoUrl);
					$t.eq(2).find("tr:eq(1)").find("td").html(data.member.email);
					$t.eq(2).find("tr:eq(2)").find("td").html(data.member.phone);
					$t.eq(2).find("tr:eq(4)").find("td").html(data.memberdto.enterprise);
					var tagname="";
					if(data.membercatName==="undefined"){
						tagname="";
					}else if(data.membercatName.length=="1"){
						tagname=data.membercatName[0].name;

					}else{
						for(var i=0;i<data.membercatName.length;i++){
							tagname+=data.membercatName[i].name+",";
						}
					}
					$t.eq(2).find("tr:eq(5)").find("td").html(tagname);
					$t.eq(2).find("tr:eq(6)").find("td").html(data.memberdto.address);
					$("#applyId").attr("value",data.applyId);
					$("#companyId").attr("value",data.companyId);
					$("#marketId").attr("value",data.applyId+":"+data.marketId+":"+data.companyId+",");
					$("#oldState").attr("value",data.market.applyId);
					$("#applyState").attr("value","PASS");
					$("#marketName").attr("value",data.market.marketName);
					$("#description").attr("value",data.market.marketDescription);
					$("#url2").attr("value",data.market.marketLogoUrl);

				},"jsonp");
			}
		}
		break;
		case "3":
		if(pum==cur){
			art.dialog({content: "当前已是最后一条！",icon: 'error',fixed: true,time: 1.5});
		}else{
			if(cur+1>tmp){
				var t=parseInt($('input[name=start]').val())+1;
				location.href="marketCheckManage.showCommentCheckManage?commentState="+$('input[name=commentState]').val()+"&start="+t+"&selectOne="+$('input[name=selectOne]').val()+"&companyName="+$('input[name=companyName]').val()+"&startTime="+$('input[name=startTime]').val()+"&endTime="+$('input[name=endTime]').val()+"&add="+$('input[name=add]').val()+"&onestart="+$("input[name=onestart]").val();
			}else{
				var star=$(".index-look table tr"),comp,appl;
				for(var i=0; i<star.length;i++){
					if(star.eq(i).children("td:eq(2)").html()==cur){
						comp=star.eq(i+1).children("td:eq(0)").html();
						appl=star.eq(i+1).children("td:eq(1)").html();
					}
				}
				$.post("marketCheckManage.showMarketCommentlist",{"commentId":comp,"userId":appl,"listtest":cur+1},function(data){
					var $t=$(".wait-m table");
					$("#indexpage").attr("value",data.listtest);
					$t.eq(0).find("tr:eq(0)").find("td").html(data.comment.marketName);
					var member;
					switch(data.comment.topicState){
						case "WAITING":
							member="待审核";
						break;
						case "NORMAL":
							member="正常";
						break;
						case "DELETE":
							member="已删除";
						break;
					}
					$t.eq(0).find("tr:eq(1)").find("td").html(member);
					$("#commentIds").html(data.comment.commentId);
					$("#commentId").val(data.comment.commentId+":"+data.userId);
					$t.eq(0).find("tr:eq(2)").find("td").html(data.comment.type);
					$t.eq(0).find("tr:eq(3)").find("td").html(data.comment.commentTime);
					$t.eq(0).find("tr:eq(4)").find("td").html(data.comment.commentContent);
					$t.eq(1).find("tr:eq(0)").find("td").html(data.comment.userName);
					$t.eq(1).find("tr:eq(1)").find("td").html(data.comment.companyName);
				},"jsonp");
			}
		}
		break;
		case "4":
		if(pum==cur){
			art.dialog({content: "当前已是最后一条！",icon: 'error',fixed: true,time: 1.5});
		}else{
			if(cur+1>tmp){
				var t=parseInt($('input[name=start]').val())+1;
				location.href="marketCheckManage.findMarketTopicCommentList?commentState="+$('input[name=commentState]').val()+"&start="+t+"&selectOne="+$('input[name=selectOne]').val()+"&companyName="+$('input[name=companyName]').val()+"&startTime="+$('input[name=startTime]').val()+"&endTime="+$('input[name=endTime]').val()+"&add="+$('input[name=add]').val()+"&onestart="+$("input[name=onestart]").val();
			}else{
					var star=$(".index-look table tr"),comp,appl;
					for(var i=0; i<star.length;i++){
						if(star.eq(i).children("td:eq(2)").html()==cur){
							comp=star.eq(i+1).children("td:eq(0)").html();
							appl=star.eq(i+1).children("td:eq(1)").html();
						}
					}
					$.post("marketCheckManage.showMarketTopicCommentlist",{"commentId":comp,"userId":appl,"listtest":cur+1},function(data){
						var $t=$(".wait-m table");
						$("#indexpage").attr("value",data.listtest);
						$t.eq(0).find("tr:eq(0)").find("td").html(data.comment.marketName);
						var member;
						switch(data.comment.commentState){
							case "WAITING":
								member="待审核";
							break;
							case "NORMAL":
								member="正常";
							break;
							case "DELETE":
								member="已删除";
							break;
						}
						$t.eq(0).find("tr:eq(1)").find("td").html(member);
						$("#commentIds").html(data.comment.commentId);
						$("#commentId").val(data.comment.commentId+":"+data.userId);
						$t.eq(0).find("tr:eq(2)").find("td").html(data.comment.type);
						$t.eq(0).find("tr:eq(3)").find("td").html(data.comment.commentTime);
						$t.eq(0).find("tr:eq(4)").find("td").html(data.comment.commentContent);
						$t.eq(0).find("tr:eq(5)").find("td").html(data.comment.topicContent);
						$t.eq(1).find("tr:eq(0)").find("td").html(data.comment.userName);
						$t.eq(1).find("tr:eq(1)").find("td").html(data.comment.companyName);
					},"jsonp");
				}
		break;
		}
	}
}
//市场创建编辑
function changeMarketName()
{
	$("#SWFUpload_0").css("display","inline-block");
	$(".text_con,#marketNamechange,#change").css("display","none");
	$(".edit_text,#marketNames").css("display","block");
	$(".ke-container").css({"width":"450px","height":"300px"});
	$(".edit_text .ke-edit,.edit_text .ke-edit-iframe").css({"width":"450px","height":"270px"});
	$("#save").css("display","inline-block");
}
//请出市场
function stateCheck(){
	var star=$(".index-look table tr"),comp;
	for(var i=0; i<star.length;i++){
		if(star.eq(i).children("td:eq(3)").html()==$("#indexpage").val()){
			comp=star.eq(i).children("td:eq(0)").html() + ":" + star.eq(i).children("td:eq(2)").html() ;
		}
	}
	//67d99d6c-41df-49df-9b6f-4a8693462ea4:67d99d6c-41df-49df-9b6f-4a8693462ea4,
	//alert(comp);return;
	art.dialog({
		 title:"退出市场",
		content: "您确定要请出市场？",
		fixed: true,
		background:"#000",
		opacity:"0.3",
		ok: function () {
			$.get("marketCheckManageSettled.quitMarket",{"applyId":comp+","},function(data){
				rePw(data);
			},"jsonp");
		},
		cancel: true,
		lock:true
	});
}

//通过与保存
function submitcheck(tmp){
	switch(tmp){
		case "1":
		$.get("marketCheckManageNews.updateNewMarket",{"marketId":$("#marketId").val(),"replyReason":"","applyState":"PASS","oldState":$("#oldState").val()},							function(data){
		rePwCh(data);
	},"jsonp");
		break;
		case "2":
		if($("#marketNames").val()==""||window.editor.html()==""){
			art.dialog({content: "市场名称、市场简介及图片不能为空！",icon: 'error',fixed: true,time: 1.5});
		}else{
			$.post("marketCheckManageNews.updateMarketNews",{"marketDescription":window.editor.html(),"marketNames":$("#marketNames").val(),"upDImg":$("#upDImg").val(),"url2":$("#url2").val(),"marketId":$("#marketId").val()},function(data){
			var t=$("#marketNames").val();
			var e=window.editor.html();
			$("#marketNamechange").html(t);
			$(".text_con").html(e);
			$(".edit_text,#marketNames").css("display","none");
			$("#marketNamechange,.text_con").css("display","block");
			rePwRe(data,t,e);
			$("#SWFUpload_0").css("display","none");
		},"jsonp");
			}

		break;
	}
}

/*删除市场话题和评论（话题与评论共用）
 delMarketComment(
 	all,		批量or单个
	id,			传入的ID
	state,		信息状态
	pagetype	页面判断
 )
*/
function delMarketComment(all,id,state,pagetype)
		{

			var name="";
			var check=document.getElementsByName("trendSelect");
			if(all=='one')
			{
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
				if(pagetype=="topic"){
					if(state=='DELETE')
					{
						art.dialog({
							 title:"删除话题",
							content: "您确定要删除话题？",
							fixed: true,
							background:"#000",
							opacity:"0.3",
							ok: function () {
								$.get("marketCheckManage.updateCommentCheck",{"commentId":name,"commentSate":state},function(data){
									if(data==1){
										art.dialog({content:"删除成功！",icon: 'succeed',fixed: true,time: 1.5});
										location.href = location.href;
									}else if(data==0){
										art.dialog({content:"删除失败！",icon: 'error',fixed: true,time: 1.5});
										location.href = location.href;
									}else{
										art.dialog({content:"系统异常，请刷新后再试！",icon: 'error',fixed: true,time: 1.5});
										return false;
									}
								},"jsonp");
							},
							cancel: true,
							lock:true
						});
					}
				}else if(pagetype=="comment"){
					if(state=='DELETE')
					{
						art.dialog({
							 title:"删除评论",
							content: "您确定要删除评论？",
							fixed: true,
							background:"#000",
							opacity:"0.3",
							ok: function () {
								$.get("marketCheckManage.updateMarketTopicComment",{"commentId":name,"commentSate":state},function(data){
									if(data==1){
										art.dialog({content:"删除成功！",icon: 'succeed',fixed: true,time: 1.5});
										location.href = location.href;
									}else if(data==0){
										art.dialog({content:"删除失败！",icon: 'error',fixed: true,time: 1.5});
										location.href = location.href;
									}else{
										art.dialog({content:"系统异常，请刷新后再试！",icon: 'error',fixed: true,time: 1.5});
										return false;
									}
								},"jsonp");
							},
							cancel: true,
							lock:true
						});
					}
				}
			}else{
				art.dialog({content:'请选择您要操作的一行！',fixed: true,time: 1.5});
			}
		}

//删除
function deletecomment(tmp){
	switch(tmp){
		case "topic":
			art.dialog({
				 title:"删除话题",
				content: "您确定要删除话题？",
				fixed: true,
				background:"#000",
				opacity:"0.3",
				ok: function () {
					$.get("marketCheckManage.updateCommentCheck",{"commentId":$("#commentIds").val(),"commentSate":"DELETE"},function(data){
						rePw(data);
					},"jsonp");
				},
				cancel: true,
				lock:true
			});
		break;
		case "comment":
			art.dialog({
				 title:"删除评论",
				content: "确定要删除评论？",
				fixed: true,
				background:"#000",
				opacity:"0.3",
				ok: function () {
					$.get("marketCheckManage.updateMarketTopicComment",{"commentId":$("#commentIds").val(),"commentSate":"DELETE"},function(data){
		rePw(data);
					},"jsonp");
				},
				cancel: true,
				lock:true
			});
		break;
	}

}
function rePwCh(tmp){
	switch (tmp) {
	   case 1 :
			poTS("审核成功！");
			break;
	   case 0 :
	   		poFi("审核失败！");
			break;
	}
}
function rePwRe(tmp,t,e){
	switch (tmp) {
	   case 1 :
	   		art.dialog({content:"保存成功！",icon: 'succeed',fixed: true,time: 1.5});
			$("#change").css("display","inline-block");
			$("#marketNamechange").val(t);
			$(".text_con").html(e);
			$(".edit_text,#marketName,#save").css("display","none");
			$(".text_con,#marketNamechange").css("display","block");
			break;
	   case 0 :
	   		poFi("保存失败！");
			break;
	}
}
function rePw(tmp){
	switch (tmp) {
	   case 1 :
			poTS("操作成功！");
			break;
	   case 0 :
	   		poFi("操作失败！");
			break;
	}
}
function poTS(tmp){
	art.dialog({content:tmp,icon: 'succeed',fixed: true,time: 1.5});
	setTimeout(function(){$(".next-page").click();},1500);
}
function poFi(tmp){
	art.dialog({content: tmp,icon: 'error',fixed: true,time: 1.5});
}

//添充拒绝理由
function selVal(tmp) {
	$(".test-focus").find(".test-lay").remove();
	var ly = $("#testVal").val(),addstr = tmp.value.replace(/[\.,;!。，；！、]\s*$/,"");;
	if ($(tmp).attr("checked")) {
		if ($.trim(ly) != "" && !(/[；。！，!,\.;!]\s*$/ig.test(ly))){
			ly += "；";
		}
		ly += addstr;
		if(!/[；。！，!,\.;!]\s*$/ig.test(addstr)){
			ly += "；";
		}
	} else { //删除己选的拒绝理由(tmp为checkbox时有效);
		var reg = new RegExp($.trim(addstr)+"(\s*；\s*)*");
		ly = ly.replace(reg, "");
	}
	$("#testVal").val(ly);
}

//动态编辑
function changeActivity(tmp){
	$(".text_con,#marketNamechange,#change").css("display","none");
	$(".edit_text,#trendsTitle").css("display","block");
	$(".ke-container").css({"width":"550px","height":"300px"});
	$(".edit_text .ke-edit,.edit_text .ke-edit-iframe").css({"width":"550px","height":"270px"});
	$("#save").css("display","inline-block");
}
//保存
function submitsave(){
	if($("#marketId option").length<=0||$("#marketId option").attr("value")==""){
		art.dialog({content: "省、市为必填，区为可选！",icon: 'error',fixed: true,time: 1.5});
		return false;
	}else if($("#trendsTitle").val()==""||window.editor.html()==""){
		art.dialog({content: "动态标题、市场动态不能为空！",icon: 'error',fixed: true,time: 1.5});
		return false;
	}
}

function changeprochange(tmp){
	$.get("marketAudit.chengeProvince",{"provice":tmp},function(data){
		$("#marketId").html("");
		var selval="";
		$.each(data,function (key,val){
				selval+="<option value="+val.marketId+","+val.circleName+">"+val.circleName+"</option>";
		});
		$("#marketId").append(selval);
	},"jsonp");
}
//市场创建审核 已拒绝 移动至已通过
function updateMarketToPass(all,v,textval){
	var check=document.getElementsByName("trendSelect");
	var name="";
	if(all=="one"){
		name=v;
	}else{
		for(var i=0;i<check.length;i++)
		{
			if(check[i].checked==true)
			{
				name=check[i].value+","+name;
			}
		}
	}
	if(name.length>0){
		$.get("marketCheckManageNews.updateNewMarket",{"marketId":name,"applyState":textval},function(data){
			if(data==1){art.dialog({content: "操作成功！",icon: 'succeed',fixed: true,time: 1.5});}
			else{art.dialog({content: "操作失败！",icon: 'error',fixed: true,time: 1.5});}
			location.href = location.href;
		},"jsonp");
	}else{
		art.dialog({content: "您还没有选择要创建的市场！",icon: 'error',fixed: true,time: 1.5});
	}
}

//入驻市场审核 请出市场
function outMarket(state,list){
	var check=document.getElementsByName("trendSelect");
	var name="";
	if(state=='one')
	{
		name=list;
	}else{
		for(var i=0;i<check.length;i++)
		{
			if(check[i].checked==true)
			{
				name=check[i].value+","+name;
			}
		}
	}
	if(name.length>0){
		mvRefs_pr("marketCheckManageSettled.quitMarket",{"applyId":name},$quan_msg_data.market_out,function(data){
			if(data == 1 || data == 0){
				alert_aReturn(data,"操作成功！","操作失败！",function(){location.href = location.href;});
			}else{
				alert_aReturn(0,"","系统异常，请刷新后再试！");
			}

		})
	}else{
		alert_aReturn(0,"","您还没有选择要请出的市场！");
	};
	return false;
}
//删除市场动态
function deleteTrends(textval){
	var check=document.getElementsByName("trendSelect");
	var name="";
	for(var i=0;i<check.length;i++)
	{
		if(check[i].checked==true)
		{
			name=check[i].value+","+name;
		}
	}
	if(name.length>0)
	{
		art.dialog({
		title:"市场动态审核",
		content: "确定删除此动态？",
		fixed: true,
		background:"#000",
		opacity:"0.3",
		ok: function () {
				$.get("marketAudit.updateMarketTrendsState",{"trendsId":name,"trendsState":textval},function(data){
					if(data==1){
						art.dialog({content:"删除成功！",icon: 'succeed',fixed: true,time: 1.5});
					}else if(data==0){
						art.dialog({content:"删除失败！",icon: 'error',fixed: true,time: 1.5});
					}else{
						art.dialog({content:"系统异常，请刷新后再试！",icon: 'error',fixed: true,time: 1.5});
					};location.href = location.href;
				},"jsonp");

		},
		cancel: true,
		lock:true
		});
	}else{
		art.dialog({content: "您还没有选择要删除的动态！",fixed: true,time: 1.5});
	}
}



//人工推荐圈子
function updateRecommentCircle(vals,circleId,recommendPage,recommendSort){
	var starLevel=document.getElementById("starLevel"+circleId).value;
	$.get("circleAuditRec.updateRecommendCircle",{"circleId":circleId,"recommendState":vals,"recommendPage":recommendPage,"recommendSort":recommendSort,"starLevel":starLevel},function(data){
		if(data==1){
			if(vals=="Y")
				art.dialog({content:"推荐成功！",icon: 'succeed',fixed: true,time: 1.5});
			else if(vals=="N")
				art.dialog({content:"撤销成功！",icon: 'succeed',fixed: true,time: 1.5});
		}else if(data==0){
			art.dialog({content:"操作失败！",icon: 'error',fixed: true,time: 1.5});
		}else{
			art.dialog({content:"系统异常，请刷新后再试！",icon: 'error',fixed: true,time: 1.5});
		};location.href = location.href;
	},"jsonp");
	//location.href="circleAuditRec.updateRecommendCircle?circleId="+circleId+"&start=${cuurentPage!""}&recommendState="+vals+"&recommendPage=${list.recommendPage!""}&recommendSort=${list.recommendSort!""}&starLevel="+starLevel;
}
//圈子内容审查-话题状态修改
//增加话题永久删除功能 章君 2014年04月10日
function updateTopicCheck(all,id,topicState){
	var check=document.getElementsByName("trendSelect");
	var name="";
	if(all=='one')
	{
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
	if(name.length>0){
		switch(topicState){
			case 'HIDE':
			mvRefs_pr("circleAuditTopic.updateTopicCheck",{"topicIds":name,"topicState":topicState},$quan_msg_data.topic_hidden);
			break;
			case 'DELETEFOREVER':
			art.dialog.confirm('确认永久删除当前选中的话题？永久删除后的话题将不可恢复。',function(){
				$.get('circleAudit.deleteTopic',{topicIds:name,topicState:topicState},function(data){
					if(data==1){
					art.dialog({content:"操作成功！",icon: 'succeed',fixed: true,time: 1.5});
					}else if(data==0){
						art.dialog({content:"操作失败！",icon: 'error',fixed: true,time: 1.5});
					}else{
						 art.dialog({content:"系统异常，请刷新后再试！",icon: 'error',fixed: true,time: 1.5});
					};
					location.href = location.href;
				},'jsonp');
			});
			break;
			default:
			$.get("circleAuditTopic.updateTopicCheck",{"topicIds":name,"topicState":topicState},function(data){
				if(data==1){
					art.dialog({content:"操作成功！",icon: 'succeed',fixed: true,time: 1.5});
				}else if(data==0){
					art.dialog({content:"操作失败！",icon: 'error',fixed: true,time: 1.5});
				}else{
					 art.dialog({content:"系统异常，请刷新后再试！",icon: 'error',fixed: true,time: 1.5});
				};location.href = location.href;
			},"jsonp");
		}
	}else{
		art.dialog({content:"您还没有选择！",icon: 'error',fixed: true,time: 1.5});
	}
}

//圈子内容审查-回复管理删除
function deleteTopicReply(state,idval){
	var check=document.getElementsByName("trendSelect");
	var name="";
	if(state=='one'){
		name=idval;
	}
	for(var i=0;i<check.length;i++){
		if(check[i].checked==true){
			name=check[i].value+","+name;
		}
	}
	if(name.length>0){
		art.dialog({
		title:"删除评论？",
		content:"您确定要删除评论？",
		fixed: true,
		background:"#000",
		opacity:"0.3",
		ok: function () {
			$.get("circleAuditTopic.deleteTopicReply",{"topicIds":name},function(data){
				if(data==1)
					art.dialog({content:"删除成功！",icon: 'succeed',fixed: true,time: 1.5});
				else if(data==0)
					art.dialog({content:"删除失败！",icon: 'error',fixed: true,time: 1.5});
				else
					 art.dialog({content:"系统异常，请刷新后再试！",icon: 'error',fixed: true,time: 1.5});
				location.href = location.href;
			},"jsonp")
		},
		cancel: true,
		lock:true
	});
	}else{
		art.dialog({content:"您还没有选择！",icon: 'error',fixed: true,time: 1.5});
	}
}

function showTopicLikeDialog(id){
	var tid = id;
	art.dialog({
		title:"修改话题赞数量",
		content:'<div class="art-u">话题赞数量： <strong class="ysl">-</strong></div>'+
		'<div class="art-u">修改数量为： <input type="text" name="likeCount" maxlength="6" onkeyup="this.value=this.value.replace(/\\D/g,\'\')"> 最多6位数字</div>',
		fixed: true,
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var nlikeCount = $(this.DOM.wrap[0]).find("[name='likeCount']").val();
			if (nlikeCount === "")return false;
			var o = this;
			$.get("circleAudit.updateTopicLikeCount",{topicId:tid,likeCount:nlikeCount},function(data){
				if(data==1)
					art.dialog({content:"修改成功！",icon: 'succeed',fixed: true,time: 1.5});
				else if(data==0)
					art.dialog({content:"修改失败！",icon: 'error',fixed: true,time: 1.5});
				else
					art.dialog({content:"修改失败，请检查参数！",icon: 'error',fixed: true,time: 1.5});
			});
		},
		init : function(){
			var o = this;
			$.get("circleAudit.findLikeCountByTopicId",{"topicId":tid},function(data){
				$(o.DOM.wrap[0]).find(".ysl").text(data);
			});
		},
		cancel: true,
		lock:true
	});
}