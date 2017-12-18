//特惠管理 、商家管理、活动管理、专题管理、消息管理、找货类目管理、特惠类目、商家类目 JS

var url = BASEURL+"bops-app/bops/";

$(function(){



})

//删除弹出框
var delmode=function(tmp){
	art.dialog({
		title:'删除',
		content: '<div>你确认删除所选项吗？</div>',
		fixed: true,
		background:"#000",
		opacity:"0.3",
		ok: function () {
			tmp();
		},
		cancel: true,
		lock:true
	});
}

//列表页 删除状态
var delstart=function(tmp){
	if(tmp=="false"){
		poFi("删除失败！");
	}else{
		poTS("删除成功")
	}
}

//编辑页 提交状态
var editstart=function(tmp){
	if(tmp=="false"){
		poFi("操作失败！");
	}else{
		art.dialog({content:"操作成功！",icon: 'succeed',fixed: true,time: 1.5});
		setTimeout(function(){history.back();},1500);
	}
}



//成功提示
function poTS(tmp){
	art.dialog({content:tmp,icon: 'succeed',fixed: true,time: 1.5});
	setTimeout(function(){location.href = location.href;},1500);
}

//错误提示
function poFi(tmp){
	art.dialog({content: tmp,icon: 'error',fixed: true,time: 1.5});
}

// 分页跳转
var topage=function(tmp){
	var pagecur=$(tmp).siblings(".innu").val();
	if(pagecur<1){
		alert("请输入要跳转的页码");
		return false;
	}else{
		pageto(tmp,pagecur);
	}
}
// 回车分页跳转
var pageKeyDown=function(e,tmp){
	var e=e||event;
　 var currKey=e.keyCode||e.which||e.charCode;
	 if(currKey==13){
		var pagecur=$(tmp).val();
		if(pagecur<1){
			alert("请输入要跳转的页码");
			return false;
		}else{
		pageto(tmp,pagecur);
		}
	}
}
// 上一页
var toup=function(tmp){
	var pagecur=parseInt($(tmp).parent(".page-r").children("b").eq(1).html())-1;
	pagecur=pagecur<1?1:pagecur;
	pageto(tmp,pagecur)
}
// 下一页
var todown=function(tmp){
	var pagecur=parseInt($(tmp).parent(".page-r").children("b").eq(1).html())+1;
	pageto(tmp,pagecur)
}


//回调状态提示
var datasucc=function(start,fal,tru){
	if(start=="false"){
		poFi(fal);
	}else{
		poTS(tru);
	}
}

//价格控制
var record={
	num:""
}
var checkDecimal=function(n){
	var decimalReg=/^\d{0,8}\.{0,1}(\d{1,2})?$/;
	if(n.value!=""&&decimalReg.test(n.value)){
			record.num=n.value;
		}else{
		if(n.value!=""){
			n.value=record.num;
		}
	}
}

function todia(tmp,sigId,cent){
	art.dialog({
		title:'回复',
		content:cent,
		fixed: true,
		background:"#000",
		opacity:"0.3",
		width:'500',
		ok: function () {
			if($("textarea").val()==""){
				poFi("请输入回复内容！");
				return 	false;
			}else if($("textarea").val().length>150){
				poFi("最多输入150字！");
				return 	false;
			}
			$.post("finance.updateQA",{"uuid":sigId,"answer":$("#answer").val()},function(data){
				var suc=data>0?"true":"false";
				datasucc(suc,"回复失败！","回复成功！");
			},"jsonp");
		},
		cancel: true,
		lock:true
	});
}


//商家管理  批量商家分类
var showQaDetail=function(tmp,sigId){
	if(tmp=="wait"){
		$.get("finance.findQaById",{"uuid":sigId},function(data){
			todia(tmp,sigId,'<div class="ibanking-lay"><span class="ibk-l">用户名:</span><span class="ibk-r">'+data.username+'</span></div><div class="ibanking-lay"><span class="ibk-l">提问时间:</span><span class="ibk-r">'+data.question_time+'</span></div><div class="ibanking-lay"><span  class="ibk-l">问题:</span><span class="ibk-r">'+data.question+'</span></div><div class="ibanking-lay"><span  class="ibk-l">回复:</span><span class="ibk-r"><textarea id="answer" class="test-val"></textarea></span></div>');
		},"jsonp");

	}else if(tmp=="pass"){
		$.get("finance.findQaById",{"uuid":sigId},function(data){
			todia(tmp,sigId,'<div class="ibanking-lay"><span class="ibk-l">用户名:</span><span class="ibk-r">'+data.username+'</span></div><div class="ibanking-lay"><span class="ibk-l">提问时间:</span><span class="ibk-r">'+data.question_time+'</span></div><div class="ibanking-lay"><span  class="ibk-l">问题:</span><span class="ibk-r">'+data.question+'</span></div><div class="ibanking-lay"><span  class="ibk-l">回复:</span><span class="ibk-r"><textarea id="answer" class="test-val">'+data.answer+'</textarea></span></div>');
		},"jsonp");
	}else{
		$.get("finance.findQaById",{"uuid":sigId},function(data){
			art.dialog({
				title:'回复',
				content:'<div class="ibanking-lay"><span class="ibk-l">用户名:</span><span class="ibk-r">'+data.username+'</span></div><div class="ibanking-lay"><span class="ibk-l">提问时间:</span><span class="ibk-r">'+data.question_time+'</span></div><div class="ibanking-lay"><span  class="ibk-l">问题:</span><span class="ibk-r">'+data.question+'</span></div><div class="ibanking-lay"><span  class="ibk-l">回复:</span><span class="ibk-r">'+data.answer+'</span></div>',
				fixed: true,
				background:"#000",
				opacity:"0.3",
				ok: function () {
					art.dialog.close();
					$.get("finance.findQaById",{"uuid":sigId},function(data){
						todia(tmp,sigId,'<div class="ibanking-lay"><span class="ibk-l">用户名:</span><span class="ibk-r">'+data.username+'</span></div><div class="ibanking-lay"><span class="ibk-l">提问时间:</span><span class="ibk-r">'+data.question_time+'</span></div><div class="ibanking-lay"><span  class="ibk-l">问题:</span><span class="ibk-r">'+data.question+'</span></div><div class="ibanking-lay"><span  class="ibk-l">回复:</span><span class="ibk-r"><textarea id="answer" class="test-val">'+data.answer+'</textarea></span></div>');
					},"jsonp");
				},
				cancel: true,
				okVal:"修改回复",
				lock:true
			});
		},"jsonp");
	}
}


 //产品问答搜索
function searchByQa(state){

	 var  searchname=document.getElementById("searchname").value; //用户名

	 var  question=document.getElementById("question").value; //关键词

	 var st=$("#startTime").val(); //开始时间

	 var et=$("#endTime").val(); //结束时间

	 var url_arg="?state="+state+"&question="+question+"&searchname="+searchname+"&startdate="+st+"&enddate="+et;

	 window.location.href="finance.findProductQADataList"+ url_arg;
}







