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
	function searchByTime() {
		var obj = document.getElementById("go"),
			sel_val = $("#sel_evip").find("option:selected").val();
		location.href = "productAudit.findProductByTimeOnChecked?startTime=" + document.getElementById("startTime").value + "&endTime=" + document.getElementById("endTime").value + "&checked=" + document.getElementById("checked").value + "&sel_evip=" + sel_val + "&sel_level1="+$('#sel_level1').val()+"&isTrade="+$('#isTrade').val();
		return false;
	}
		function jumper(){
			var obj=document.getElementById("jumperTo");
			var pgCur=document.getElementById("jump").value;
			var sel_val = $("#sel_evip").find("option:selected").val();
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
			}else{
				obj.href="productAudit.findProductOnCheckedByJump?current="+document.getElementById("current").value+"&jump="+document.getElementById("jump").value+"&page="+document.getElementById("page").value+"&total="+document.getElementById("total").value+"&checked="+document.getElementById("checked").value;
			}
		}
		function jumper2(){
			var obj=document.getElementById("jumperTo2");
			var pgCur=document.getElementById("jump2").value;
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
			}else{
				obj.href="productAudit.findProductOnCheckedByJump2?current2="+document.getElementById("current2").value+"&jump2="+document.getElementById("jump2").value+"&page2="+document.getElementById("page2").value+"&total2="+document.getElementById("total2").value+"&checked2="+document.getElementById("checked2").value;
			}
		}
		function jumper3(){
			var obj=document.getElementById("jumperTo3");
			var pgCur=document.getElementById("jump").value;
			var sel_val = $("#sel_evip").find("option:selected").val();
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
			}else{
				obj.href="productAudit.findProductByTimeOnCheckedJump1?current="+document.getElementById("current").value+"&jump="+document.getElementById("jump").value+"&page="+document.getElementById("page").value+"&total="+document.getElementById("total").value+"&startT="+document.getElementById("startT").value+"&endT="+document.getElementById("endT").value+"&checked="+document.getElementById("checked").value + "&sel_evip=" + sel_val + "&sel_level1="+$('#sel_level1').val()+"&isTrade="+$('#isTrade').val();
			}
		}
		function jumper4(){
			var obj=document.getElementById("jumperTo4");
			var pgCur=document.getElementById("jump2").value;
			var sel_val = $("#sel_evip").find("option:selected").val();
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
			}else{
				obj.href="productAudit.findProductByTimeOnCheckedJump2?current2="+document.getElementById("current2").value+"&jump2="+document.getElementById("jump2").value+"&page2="+document.getElementById("page2").value+"&total2="+document.getElementById("total2").value+"&startT2="+document.getElementById("startT2").value+"&endT2="+document.getElementById("endT2").value+"&checked2="+document.getElementById("checked2").value + "&sel_evip=" + sel_val + "&sel_level1="+$('#sel_level1').val()+"&isTrade="+$('#isTrade').val();
			}
		}
		function jumper5(){
			var obj=document.getElementById("jumperTo5");
			var pgCur=document.getElementById("jump").value;
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
			}else{
				obj.href="productAudit.findProductByConditionOnCheckedJump1?current="+document.getElementById("current").value+"&jump="+document.getElementById("jump").value+"&page="+document.getElementById("page").value+"&total="+document.getElementById("total").value+"&selected="+document.getElementById("selected").value+"&searched="+document.getElementById("searched").value+"&checked="+document.getElementById("checked").value;
		}
		}
		function jumper6(){
			var obj=document.getElementById("jumperTo6");
			var pgCur=document.getElementById("jump2").value;
			if(pgCur.value<1){
				alert("请输入要跳转的页码");
			}else{
			obj.href="productAudit.findProductByConditionOnCheckedJump2?current2="+document.getElementById("current2").value+"&jump2="+document.getElementById("jump2").value+"&page2="+document.getElementById("page2").value+"&total2="+document.getElementById("total2").value+"&selected2="+document.getElementById("selected2").value+"&searched2="+document.getElementById("searched2").value+"&checked2="+document.getElementById("checked2").value;
		}
		}
		function searchByCondition(){
			var obj=document.getElementById("searchBy");
			obj.href="productAudit.findProductByConditionOnChecked?select="+document.getElementById("select").value+"&search="+document.getElementById("search").value+"&checked="+document.getElementById("checked").value;
		}
