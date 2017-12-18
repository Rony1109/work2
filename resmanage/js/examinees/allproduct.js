	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
$(function(){
	var str = getQueryString('sel_evip');
	if(str){
		$("#sel_evip").val(str);
	}
});	

	function searchByTime(){
			var obj=document.getElementById("go"),sel = $("#sel_evip").val();
			obj.href="productAudit.findProductByTimeOnAllProduct?startTime="+document.getElementById("startTime").value+"&endTime="+document.getElementById("endTime").value+"&sel_evip=" + sel;
		}
		function jumper(){
			var obj=document.getElementById("jumperTo_1");
			var pgCur=document.getElementById("jump").value;
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
				obj.href="#";
			}else{
				obj.href="productAudit.findAllProductByJump?current="+document.getElementById("current").value+"&jump="+document.getElementById("jump").value+"&page="+document.getElementById("page").value+"&total="+document.getElementById("total").value;
				
				//productAudit.findAllProductByJump?current=1&jump=2&page=63322&total=633215
		}
		}
		function jumper2(){
			var obj=document.getElementById("jumperTo2_1");
			var pgCur=document.getElementById("jump2").value;
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
				obj.href="#";
			}else{
				obj.href="productAudit.findAllProductByJump2?current2="+document.getElementById("current2").value+"&jump2="+document.getElementById("jump2").value+"&page2="+document.getElementById("page2").value+"&total2="+document.getElementById("total2").value;
		}
		}
		function jumper3(){
			var obj=document.getElementById("jumperTo3_1");
			var pgCur=document.getElementById("jump").value;
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
				obj.href="#";
			}else{
				obj.href="productAudit.findProductByTimeOnAllProductJump1?current="+document.getElementById("current").value+"&jump="+document.getElementById("jump").value+"&page="+document.getElementById("page").value+"&total="+document.getElementById("total").value+"&startT="+document.getElementById("startT").value+"&endT="+document.getElementById("endT").value;
		}
		}
		function jumper4(){
			var obj=document.getElementById("jumperTo4_1");
			var pgCur=document.getElementById("jump2").value;
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
				obj.href="#";
			}else{
				obj.href="productAudit.findProductByTimeOnAllProductJump2?current2="+document.getElementById("current2").value+"&jump2="+document.getElementById("jump2").value+"&page2="+document.getElementById("page2").value+"&total2="+document.getElementById("total2").value+"&startT2="+document.getElementById("startT2").value+"&endT2="+document.getElementById("endT2").value;
		}
		}
		function jumper5(){
			var obj=document.getElementById("jumperTo5_1");
			var pgCur=document.getElementById("jump").value;
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
				obj.href="#";
			}else{
			obj.href="productAudit.findProductByConditionOnAllProductJump1?current="+document.getElementById("current").value+"&jump="+document.getElementById("jump").value+"&page="+document.getElementById("page").value+"&total="+document.getElementById("total").value+"&selected="+document.getElementById("selected").value+"&searched="+document.getElementById("searched").value;
			}
		}
		function jumper6(){
			var obj=document.getElementById("jumperTo6_1");
			var pgCur=document.getElementById("jump2").value;
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
			}else{
				obj.href="productAudit.findProductByConditionOnAllProductJump2?current2="+document.getElementById("current2").value+"&jump2="+document.getElementById("jump2").value+"&page2="+document.getElementById("page2").value+"&total2="+document.getElementById("total2").value+"&selected2="+document.getElementById("selected2").value+"&searched2="+document.getElementById("searched2").value;
			}
		}
		function searchByCondition(){
			var obj=document.getElementById("searchBy");
			obj.href="productAudit.findProductByConditionOnAllProduct?select="+document.getElementById("select").value+"&search="+document.getElementById("search").value;
		}
