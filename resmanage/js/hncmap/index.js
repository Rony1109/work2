// JavaScript Document
$(function(){
	$.get("shopdomains.getAllCountsJson",function(data){
		for(var n in data){
			var countDiv;
			if(data[n].froms == "皮革"){countDiv = $(".index_q1");}
			if(data[n].froms == "纺织"){countDiv = $(".index_q2");}
			if(data[n].froms == "印刷包装电子"){countDiv = $(".index_q3");}
			if(data[n].froms == "五金化工塑胶"){countDiv = $(".index_q4");}
			countDiv.find(".q_li li:eq(0)").text(data[n].belongMarketCount);
			countDiv.find(".q_li li:eq(1)").text(data[n].enterpriseCount);
			countDiv.find(".q_li li:eq(2)").text(data[n].numberCount);
			countDiv.find(".q_li li:eq(3)").text(data[n].submainCount);
		}
	},"jsonp")
	ShowRzl();
})
function ShowRzl(){
	var rex = function(sdata){
		$.get("/bops-app/bops/shopdomains.getShopDamainsCheck",sdata,function(data){
			var str = (data.status).toFixed(2).replace(/(\.0*$)|((?=(\.\d*[1-9])?)0+$)/,"") + "%",
				str1 = (data.status1).toFixed(2).replace(/(\.0*$)|((?=(\.\d*[1-9])?)0+$)/,"") + "%";
			rzl_box.find(".rzl_1").text(str);
			rzl_box.find(".rzl_2").text(str1);
		},"jsonp");
		/*$.get("/bops-app/bops/shopdomains.getShopDamainsMemberCheck",sdata,function(data){
			var str = (data.status*100) + "%";
			rzl_box.find(".rzl_2").text(str);
		},"jsonp");*/
	}
	var rzl_box =$('<div class="rzlbox"><div></div><p>入 驻 率：<span class="rzl_1">0%</span></p><p>开通旺铺：<span class="rzl_2">0%</span></p></div>');
	var s_Y = $('<select name="yeas"></select>'),s_M = $('<select name="month"></select>'),this_Y=(new Date()).getFullYear(),this_M = (new Date()).getMonth()+1;
	for(var Y_i = this_Y;Y_i>=2009;Y_i--){
		s_Y.append($('<option value="'+Y_i+'">'+Y_i+'</option>'));
	}
	for(var M_i = 1;M_i<=12;M_i++){
		s_M.append($('<option value="'+M_i+'">'+M_i+'</option>'));
	}
	s_Y.val(this_Y).on("change",function(){
		$(this).parents("form").submit();
	});
	s_M.val(this_M).on("change",function(){
		$(this).parents("form").submit();
	});
	var rzl_form = $('<form></form>').on("submit",function(){
		rex($(this).serialize());
		return false;
	});
	rzl_box.find("div").append(rzl_form.append(s_Y).append(s_M));
	$("#move_box").append(rzl_box);
	rex({"yeas":this_Y,"month":this_M});
}