csc.offer = csc.offer || {};
csc.offer.cateName = function (){
	var	tmp = "",
			$strong = $("div.you-select:not('.aff-fr')").children("span,strong");
	$("[name^='category']>:selected").each(function(i) {
		tmp += (i>0 ? " &gt; ":"") + "<span>" + $(this).text() + "</span>";
	});
	$strong.is("strong") ? $strong.html(tmp) : $strong.before('<strong>'+tmp+'</strong>') && $strong.remove();
};

csc.offer.selectCate = function (){
	var	othis = this,
		cateSelected = $.trim($("#cateSelected").val()),
		cats = '';
	if(cateSelected.length>0){
		var cats = cateSelected.split(",");
	}
	$("#cate1,#cate2").on("change",function (){
		var	$t = $(this);
		$.get("http://bops.csc86.com/bops-app/bops/app.getChildCategory",{id:$t.val()},function (data){
			if(data.data.length){
				var	opt = "";
				$.each(data.data,function (i,v){
					opt += '<option value="' + v.categoryNo + '">' + v.categoryName + '</option>';
				});
				$t.next().is("select") ? $t.next().html(opt).next("select").remove() : $t.after('<select size="6" name="category[2]">'+opt+'</select>');
				if(cats.length > 0){
					if($t.is("#cate1")){
						setTimeout(function (){
							$("#cate2").val(cats[1]).trigger("change");
							cats.length > 1 || (cats = '');
						},10);
					}else{
						setTimeout(function (){
							$t.next().val(cats[2]).trigger("change");
							cats = '';
						},10);
					}
				}
			}else{
				$t.next("select").remove();
			}
			othis.cateName();
		},"jsonp");
	});
	cateSelected.length && cats.length >0 && setTimeout(function (){$("#cate1").val(cats[0]).trigger("change")},10);
	$("select[name='category[2]']").live("change",othis.cateName);
};
define(function(require, exports, module) {
	var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	$(function() {
		
		csc.offer.selectCate();
		//查询事件
		$('.cate-search-btn').on("click",function(i){
			var url=$('.cate-input-text').val();			
			if(url==""){
				dialog.alert("请输入网址");
			}
			else{
				$(".g-dn").css("display","inline");
				$.ajax({
					type:"get",
					url:"http://bops.csc86.com/bops-app/bops/app.getProductCategory",
					dataType:"jsonp",
					data:{
						url:url
					},
					success:function(data){
						var proName=data.data.productName,catename=data.data.categoryName,catPath=data.data.catPath;
						$("#productName").text(proName);
						$("#productName").data("id",data.data.productId);
						$(".aff-fr strong").text(catename);	
						$(".g-dn").css("display","none");
					},
					error:function(data){
						dialog.tip('商品网址不存在或网络错误!',2,function(){
							$(".g-dn").css("display","none");
						});		
					}
				});
			}
		});
		//提交表单
		var typebool=true;
		$('input[type="submit"]').on("click",function(e){
			e.preventDefault();
			if(typebool){
				var selectedarr="",selectname="",productid=$('#productName').data('id'),catthreeid=$('select[name="category[2]"]').val();
				if(productid){
					$('select').each(function(i){
						if(i==0){
							selectedarr+=$(this).val();
							selectname+=$(this).find("option:selected").text();
						}else{
							selectedarr+=";"+$(this).val();
							selectname+=">"+$(this).find("option:selected").text();
						}						
					});
					$.ajax({
						type:"get",
						url:"http://bops.csc86.com/bops-app/bops/app.productCategoryEdit",
						data:{
							catPath:selectedarr,
							categoryName:selectname,
							productId:productid,
							catId:catthreeid
						},
						dataType:"jsonp",
						success:function(data){
							console.log(data);
							if(data.success){
								dialog.tip(data.msg,2,function(){

								});
							}
						}
					});
				}else{
					dialog.alert("请查询商品地址");
				}				
			}
		});
	})
});