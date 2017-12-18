/**
 * 账户中心订购服务
 */


/**
 * 选择套餐
 * sopt : 套餐单选项ID
 * sprice : 价格区ID
 * 
 */
csc.ss_options = function(sopt,sprice){
	$(sopt).find("input:radio").bind("click",function(){$(sprice).text($(this).attr("data-price"))});
}