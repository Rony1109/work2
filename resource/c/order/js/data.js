$.ajax({
					url:'//i.csc86.com/v2/c/order/js/json.txt',
					data:{},
					type:'post',
					dataType:'json',
					beforeSend:function(){
						$(".jsPrchsFrm").html('<p class="loading">加载中...</p>');
					},
					success:function(data){
						
						
						
						if(data.status==="200"){
							
							
	var heads = '<table class="prchs-tbl-hd"><colgroup><col width="66"><col><col width="149"><col width="98"><col width="272"><col width="123"></colgroup><thead><tr><th><input class="_jsSltAll" name="" checked="checked" type="checkbox"><span>全选</span></th><th>货品</th><th>单价（元）</th><th>数量</th><th>小计（元）</th><th>操作</th></tr></thead></table>';

var outputs ="",shopcount=0,species=0,quantity=0,moneysum=0;
$.each(data.json,function(){
	var _this= this;
	shopcount++;
	outputs+='<table class="order-tbl prchs-order-tbl"><colgroup><col width="36"><col><col width="179"><col width="98"><col width="272"><col width="123"></colgroup><thead><tr><td><input class="jsSltAll" name="" checked="checked" type="checkbox"></td><td colspan="5"><input type="hidden" name="carId" value="'+this.carId+'"><input type="hidden" name="shopId" value="'+this.shopId+'"><div class="g-c8 g-tl">卖家：<a href="'+this.shopurl+'" target="_blank">'+this.shopname+'</a></div></td></tr></thead>';
	$.each(_this.tbody,function(){
	var _this= this;
	outputs+='<tbody data-proinf='+this.proinf+'><input type="hidden" name="productId" value="'+this.productId+'">';
	$.each(_this.products,function(){
	species++;	
	quantity+=(this.quantity*100)/100;
	moneysum+=(this.subtotal*100)/100;
	outputs+='<tr><td><input class="jsSltOne" name="lineId" type="checkbox" checked="checked" value="'+this.lineId+'"></td><td><div class="g-cf order-proitm"><div class="g-fl g-ivm proitm-hd"><a class="i" href="'+this.producturl+'" target="_blank"><img src="'+this.imgsrc+'" alt=""></a></div><div class="g-pr proitm-bd"><p class="title"><a href="'+this.producturl+'" target="_blank" title="'+this.commodityname+'">'+this.commodityname+'</a></p><p class="inf"><span>'+this.specification+'：'+this.size+'</span></p></div></div></td><td><span class="jsOnePrc">'+this.price+'</span></td><td><div class="order-num-opts jsNumOpts"><span class="plut-opt">-</span><input maxlength="6" class="num-ipt" type="text" name="" data-default="2" data-controll="true" value="'+this.quantity+'"><span class="add-opt">+</span></div></td><td><span class="prc jsOneTprc">'+this.subtotal+'</span></td><td><div class="prchs-opts"><p><a class="jsDelOne" href="">删除</a><br><a class="jsMoveOne" href="">移至收藏夹</a></p></div></td></tr>';
	});
	outputs+='</tbody>';
	});
	outputs+='</table>';
	});

var foots='<table class="order-tbl prchs-order-tblfoot"><colgroup><col width="66"><col><col width="149"><col width="98"><col width="272"><col width="123"></colgroup><tfoot><tr><td><input class="_jsSltAll" name="lineId" type="checkbox" checked="checked" value="286"><span  class="_span">全选</span></td><td colspan="5"><div class="g-fl total-opts"><a class="jsDelAll" href="">删除所选</a></div><div class="g-fr total-inf"><span>供应商数量：<em class="jsAllSUnum">'+shopcount+'</em></span><span>商品种类：<em class="jsAllSPnum">'+species+'</em>种</span><span>数量总计：<em class="jsAllTnum">'+quantity+'</em>件</span><span>商品总额（不含运费）：<em class="prc jsAllTPrc">'+moneysum+'</em>元</span><a class="org-abtn qrxd-smt"href="">结算</a></div></td></tr></tfoot></table>';	

//alert(shopcount);	
//alert(species);
//alert(quantity);
//alert(moneysum);

//console.log(heads+outputs+foots);
$(".jsPrchsFrm").html(outputs+foots);




						}
						//系统异常时
						else{
						$(".jsPrchsFrm").html('<p class="loading">加载失败，请刷新页面后重试！</p>');
						}
						
					},
					//请求异常时
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$(".jsPrchsFrm").html('<p class="loading">加载失败，请刷新页面后重试！</p>');
						console.log(XMLHttpRequest);
						console.log(textStatus);
						console.log(errorThrown);
					}
				});
				
