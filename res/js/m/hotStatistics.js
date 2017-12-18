/*
 * Hot Statistics JS 运营分析（js动态布点）
 * v1.1.0 By Lg 2013.04.09
*/

var Hot = Hot || {
	bindClick : function(str,href,num,lable){
		var str = str,
			href = href,
			num = num,
			lable = lable || "href";
		str.on("mousedown",function(){
			if(lable=="form"){
				if(str.next().length != 0){str.next().remove()};
				str.after("<input name='spm' value='01_010001' type='hidden' />");
			}else{
				str.attr(lable,href+"?spm=01_"+num);
			}
		});
	},
	dot : function(searchbtn,nav,hivmem,conhover,hotindustry){
		var str = Hot,
			indexSearch = searchbtn || $("#searchbtn"),
			searchForm = indexSearch.parents("form"),
			indexNav = nav || $("#hotnav"),
			nav01 = indexNav.children().eq(1).children("a"),
			nav03 =indexNav.children().eq(2).children("a"),
			indexCard_A = hivmem || $("#hiv-mem > p > a"),
			indexCard_LI_A = conhover || $("#con-hover > li > a"),
			productCenter = hotindustry || $(".hot-industry > a:last");
		str.bindClick(indexSearch,searchForm,"010001","form");
		str.bindClick(productCenter,productCenter.attr("href"),"010002");
		str.bindClick(nav01,nav01.attr("href"),"010003");
		str.bindClick(nav03,nav03.attr("href"),"010004");
		str.bindClick(indexCard_A,indexCard_A.attr("href"),"010005");
		str.bindClick(indexCard_LI_A,indexCard_LI_A.attr("href"),"010005");
	}
};
$(function(){Hot.dot();});