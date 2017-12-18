define(function(require, exports, module) {
	//require('//res.csc86.com/v2/c/order/js/data.js');
	//require('//res.csc86.com/v2/c/order/js/datatext.js');

	var isSubmit=false;
    var dialog=require('dialog');
    var cmmn=require('./init.js');
	var $prchsOrderTbl=$('.prchs-order-tbl');
	var $prchsBox=$('.prchs-box');
	var $_jsSltAll=$('._jsSltAll');
	var $jsSltAll=$('.jsSltAll');
	var $jsPrchsFrm=$('.jsPrchsFrm');
	
	var $tblfoot=$(".prchs-order-tblfoot");
	var $tblfoottop=$tblfoot.offset().top;
	var $tblfooth=$tblfoot.height();
	var $tblfootw=$tblfoot.width();
	var $winw=$(window).width();
	var $winh=$(window).height();

	//以下两个变量页面事件触发导致的商品曝光埋点需要用到
	var triggerEventNum= 0,triggerEventArry=[];

	/*
	(function (config) {
    config['lock'] = true;
	config['opacity'] = 0;
})(art.dialog.defaults);
*/

	$(window).resize(function(){
		$winw=$(window).width();
		$winh=$(window).height(); 
		if($tblfoottop>$(document).scrollTop()+$(window).height() ){
			$tblfoot.addClass("fx").end().css("left",($winw-$tblfootw)/2+"px");
			}else{
			$tblfoot.removeClass("fx").end().css("left","0px");
				}
	});
	
	if( $tblfoottop-$tblfooth>$(document).scrollTop()+$(window).height()){
		$tblfoot.addClass("fx").end().css("left",($winw-$tblfootw)/2+"px");
	}else{
		$tblfoot.removeClass("fx").end().css("left","0px");
	};
	$(window).scroll(function(){
		if($(document).scrollTop()>$tblfoottop-$winh+$tblfooth-50){
			$tblfoot.removeClass("fx").end().css("left","0px");
		}else{
			$tblfoot.addClass("fx").end().css("left",($winw-$tblfootw)/2+"px");
		}
	});
				
				
	//全选 反选
	$prchsOrderTbl.on('click','.jsSltAll',function(){
		var checkArry=[];
		var $this=$(this);
		var $parentTbl=$this.parents('.prchs-order-tbl');
		var $parentTbd=$this.parents('tbody');
		var $parentTr=$parentTbl.find("tbody").find("tr");
		var $numipt=$parentTr.find(".num-ipt");
		var $jsSltOne=$parentTbl.find('.jsSltOne');
		var	$jsOneTprc=$parentTbl.find(".jsOneTprc");
		var $jsAllTPrc=$parentTbl.find(".jsAllTPrc");
		var $jsAllTnum=$parentTbl.find(".jsAllTnum");
		if($this.is(':checked')){
			$jsSltOne.prop('checked',true);
			$parentTr.removeClass('noSlt');
			$numipt.data("controll",true);
			$numipt.removeAttr("disabled");
			

			/*//改变总数量
			var proNum=0;
			$numipt.each(function(){
				proNum+=$(this).val()*1;
			});
			$jsAllTnum.html(proNum);
			
			//改变总额
			var money=0;
			$jsOneTprc.each(function(){
				money+=cmmn.reFormatPrc($(this).html())*100;
			})
			money=Math.round(money)/100;
			$jsAllTPrc.html(cmmn.formatPrc(money));*/
		}else{
			$jsSltOne.prop('checked',false);
			$parentTr.addClass('noSlt');
			$numipt.data("controll",false);		
			$numipt.attr("disabled",true);
			
			/*$jsAllTnum.html('0');
			$jsAllTPrc.html("0.00");*/
		}
		
		$prchsBox.find('.jsSltAll').each(function(){
			var $this=$(this);
			if($this.is(':checked')){
				checkArry.push(true);
			}else{
				checkArry.push(false);
			}
			return;
		});
		if($.inArray(false,checkArry)<0){
			$_jsSltAll.prop('checked',true);
		}else{
			$_jsSltAll.prop('checked',false);
		}
		
		
		cmmn.changeSmt($this);
	});

	$prchsBox.on('click','._jsSltAll',function(){
		var $this=$(this);
		//var $parentTbl=$this.parents('.jsPrchsFrm');
		var $jsSltAll=$prchsBox.find(".jsSltAll");
		var $parentTr=$prchsBox.find("tbody").find("tr");
		var $numipt=$prchsBox.find(".num-ipt");
		var $jsSltOne=$prchsBox.find('.jsSltOne');
		var	$jsOneTprc=$prchsBox.find(".jsOneTprc");
		var $jsAllTPrc=$prchsBox.find(".jsAllTPrc");
		var $jsAllTnum=$prchsBox.find(".jsAllTnum");
		if($this.is(':checked')){
			$jsSltAll.prop('checked',true);
			$jsSltOne.prop('checked',true);
			$parentTr.removeClass('noSlt');
			$numipt.data("controll",true);
			$numipt.removeAttr("disabled");
			$_jsSltAll.prop('checked',true);
			/*//改变总数量
			var proNum=0;
			$numipt.each(function(){
				proNum+=$(this).val()*1;
			});
			$jsAllTnum.html(proNum);
			
			//改变总额
			var money=0;
			$jsOneTprc.each(function(){
				money+=cmmn.reFormatPrc($(this).html())*100;
			})
			money=Math.round(money)/100;
			$jsAllTPrc.html(cmmn.formatPrc(money));*/
		}else{
			$jsSltAll.prop('checked',false);
			$jsSltOne.prop('checked',false);
			$parentTr.addClass('noSlt');
			$numipt.data("controll",false);		
			$numipt.attr("disabled",true);
			$_jsSltAll.prop('checked',false);
			/*$jsAllTnum.html('0');
			$jsAllTPrc.html("0.00");*/
		}
		//cmmn.change_all();
		cmmn.changeSmt($this);
	});
	
	//不全选时 让全选复选框改成未选中状态
	$prchsBox.on('click','.jsSltOne',function(){
		var checkArry=[];
		var checkArry2=[];
		var $this=$(this);
		var _num=0;
		var $parentTbl=$this.parents('.prchs-order-tbl');
		var $parentTr=$this.parents('tr');
		var $numipt=$parentTr.find(".num-ipt");
		var $jsSltAll=$parentTbl.find('.jsSltAll');
		var _priceRange=$this.parents("tbody").data('proinf')?$this.parents("tbody").data('proinf').priceRange:[[0,0]];
		_priceRange.sort(function(a,b){return a[0]>b[0]?1:-1});
		var _proinfnum=_priceRange[0][0]*1;
		
		/*
		var $thischeckeds=$this.parents("tbody").find(".jsSltOne:checked");
		$thischeckeds.each(function() {
            var $this=$(this);
			_num+=$this.parents('tr').find(".num-ipt").val()*1;
        });

		if(_num<_proinfnum){
					if($thischeckeds.length>0){
dialog.tip('该商品最少购买量'+_proinfnum+',系统已自动为您修改',5);
		}
		$thischeckeds.find(".no-plut-opt").removeClass().addClass("plut-opt");
			$thischeckeds.each(function() {
            var $this=$(this);
			$this.parents('tr').find(".num-ipt").val(_proinfnum);
        });
		}
			*/
		
			//if(_num<_proinfnum){dialog.tip('该商品最少购买量'+_proinfnum+',请修改商品数量',5);};		
		//var $jsAllTPrc=$parentTbl.find(".jsAllTPrc");
		//var	$jsOneTprc=$parentTr.find(".jsOneTprc");
		//var $jsAllTnum=$parentTbl.find(".jsAllTnum");
		var	money=0;
		if(!$this.is(':checked')){
			$parentTr.addClass('noSlt');
			$numipt.data("controll",false);
			$numipt.attr("disabled",true);
			
			
			/*//改变总金额
			money=cmmn.reFormatPrc($jsAllTPrc.html())*100-cmmn.reFormatPrc($jsOneTprc.html())*100;
			money=Math.round(money)/100; 
			$jsAllTPrc.html(cmmn.formatPrc(money));
			
			//改变总数量
			$jsAllTnum.html($jsAllTnum.html()*1-$numipt.val()*1);*/
		}else{
			$numipt.data("controll",true);
			$parentTr.removeClass('noSlt');
			$numipt.removeAttr("disabled");	
			//$_jsSltAll.removeAttr("disabled");
			
			/*//改变总金额
			money=cmmn.reFormatPrc($jsAllTPrc.html())*100+cmmn.reFormatPrc($jsOneTprc.html())*100;
			money=Math.round(money)/100; 
			$jsAllTPrc.html(cmmn.formatPrc(money));
			
			//改变总数量
			$jsAllTnum.html($jsAllTnum.html()*1+$numipt.val()*1);*/
		}
		
		$parentTbl.find('.jsSltOne').each(function(){
			var $this=$(this);
			if($this.is(':checked')){
				checkArry2.push(true);
			}else{
				checkArry2.push(false);
			}
			return;
		});
		$prchsBox.find('.jsSltOne').each(function(){
			var $this=$(this);
			if($this.is(':checked')){
				checkArry.push(true);
			}else{
				checkArry.push(false);
			}
			return;
		});
		if($.inArray(false,checkArry)<0){
			$_jsSltAll.prop('checked',true);
		}else{
			$_jsSltAll.prop('checked',false);
		};
		if($.inArray(false,checkArry2)<0){
			$jsSltAll.prop('checked',true);
		}else{
			$jsSltAll.prop('checked',false);
		}

		cmmn.changeSmt($this);
	});

	//单个商品删除
	$prchsOrderTbl.on('click','.jsDelOne',function(){
		var $this=$(this);
		var $parentTr=$this.parents('tr');
		var $parentTbl=$this.parents('.prchs-order-tbl');
		var $parentFrm=$this.parents('.jsPrchsFrm');
		var $tbody=$this.parents('tbody:first');
		var proNum=$parentTbl.find('.jsDelOne').length;
		var lineId=$parentTr.find('.jsSltOne').val();
		var carId=$parentTbl.find('input[type=hidden][name=carId]').val();
		var dataObj={"lineId":lineId,"carId":carId};

		triggerEventNum++;
		triggerEventArry=[];

		dialog.confirm("确定要删除该商品？",function(){
			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			$.post('https://i.csc86.com/deleteCarLine',dataObj,function(data){
				var _msg=data.msg;
				if(data.status=="200"){
						/*	
					if($parentTbl.find("tr").size()==2){
						$parentTbl.remove();
						cmmn.changeSmt($this);
						//dialog.tip(_msg?_msg:'删除成功！',2);
						}else{
						$parentTr.remove();	
						cmmn.changeSmt($this);
						//dialog.tip(_msg?_msg:'删除成功！',2);	
							}		
						*/
					if (typeof cscgaMd == 'object') {
						triggerEventArry.push({
							id:$tbody.find('input[name=productId]').val()+':'+$parentTr.find('input[name=skuIds]').val(),
							price:$parentTr.find('.jsOnePrc').html(),
							quantity:$parentTr.find('.num-ipt').val()
						});
						cscgaMd.removeCart('pc', triggerEventNum, triggerEventArry);
					}
					location.href=location.href;
				}else{
					dialog.tip(_msg?_msg:'删除失败！',2);
				}
				isSubmit=false;
			},'jsonp');
			
		},function(){
			//取消
		});
		
		return false;
	});

	//删除所有商品
	$prchsBox.on('click','.jsDelAll',function(){
		var arry=[];
		var $this=$(this);
		var $parentTbl=$prchsBox.find('.prchs-order-tbl');
		var $parentFrm=$this.parents('.jsPrchsFrm');
		var $checked=$parentFrm.find('.jsSltOne:checked');
		var $jsSltOnenum=$parentFrm.find('.jsSltOne');
		var $checkedtr =$parentFrm.find('.jsSltOne:checked').parents("tr");
		var $checkedtbl =$parentFrm.find('.jsSltOne:checked').parents(".prchs-order-tbl");
		var checkedLen=$checked.length;
		var proNum=$prchsBox.find('.jsSltOne').length;
		var carId=$prchsBox.find('input[type=hidden][name=carId]').val();
		if(checkedLen==0){
			dialog.tip("请选择需要删除的商品！",2);
			return false;
		}

		triggerEventNum++;
		triggerEventArry=[];

		$checked.each(function(){
			var $this=$(this);
			var $tr=$this.parents('tr');
			var lineId=$tr.find('.jsSltOne').val();
			var $tbody=$this.parents('tbody:first');
			arry.push(lineId);
			triggerEventArry.push({
				id:$tbody.find('input[name=productId]').val()+':'+$tr.find('input[name=skuIds]').val(),
				price:$tr.find('.jsOnePrc').html(),
				quantity:$tr.find('.num-ipt').val()
			});
		});
	/*	
	$parentTbl.each(function(){
		var arry2=[];
		for(var i=0;i<$(this).find('.jsSltOne:checked').length;i++){
			var lineId=$(this).find('.jsSltOne:checked').eq(i).val();
			arry2.push(lineId);
			}
			var carId=$(this).find('input[type=hidden][name=carId]').val();		
		dataObj={"lineId":arry2.join(","),"carId":carId};
			arry.push(dataObj);
		});
		
		console.log(arry);
		
		//var dataObj=[{"lineId":arry.join(","),"carId":carId},{"lineId":arry.join(","),"carId":carId}];

//var dataObj={"lineId":"164,165,166","carId":"11"};

var dataObj =arry[0];
*/

		var dataObj={"lineId":arry.join(",")};
		dialog.confirm("确定要删除选中的商品？",function(){
			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			$.post('https://i.csc86.com/deleteCarLine',dataObj,function(data){
				var _msg=data.msg;
				if(data.status=="200"){
					/*
						if($checkedtbl.find("tr").size()==2){
						$parentTbl.remove();
						cmmn.changeSmt($this);
						//dialog.tip(_msg?_msg:'删除成功！',2);
						}else{
						$checkedtr.remove();	
						cmmn.changeSmt($this);
						//dialog.tip(_msg?_msg:'删除成功！',2);	
							}	
							*/
					if (typeof cscgaMd == 'object') {
						cscgaMd.removeCart('pc', triggerEventNum, triggerEventArry);
					}
					location.href=location.href;
				}else{
					dialog.tip(_msg?_msg:'删除失败！',2);
				}
				isSubmit=false;
			},'jsonp');
		},function(){
			//取消
		});	
		
		return false;
	});
	
//单个移至收藏夹	
	$prchsOrderTbl.on('click','.jsMoveOne',function(){
		var arry=[];
		var $this=$(this);
		var $parentTbl=$this.parents('.prchs-order-tbl');
		var $parentTR=$this.parents('tr');
		var $parentTbody=$this.parents('tbody');
		var $parentTbodytr=$this.parents('tbody').find("tr");
		var $parentFrm=$this.parents('.jsPrchsFrm');
		var carId=$parentTbl.find('input[type=hidden][name=carId]').val();
		var productId=$parentTbody.find('input[type=hidden][name=productId]').val();
		var shopId=$parentTbl.find('input[type=hidden][name=shopId]').val();
		//var dataObj={"carId":carId,"productId":productId,"shopId":shopId};

		triggerEventNum++;
		triggerEventArry=[];

		$parentTbodytr.each(function(){
			var lineId=$(this).find('input[type=checkbox][name=lineId]').val();
			arry.push(lineId);
		});

		$parentTbl.find('input[name=productId]').each(function(){
			var $this=$(this);
			var $tr=$this.parent().find('tr');
			if($this.val()==productId){
				$tr.each(function(){
					var $this=$(this);
					triggerEventArry.push({
						id:$parentTbody.find('input[name=productId]').val()+':'+$this.find('input[name=skuIds]').val(),
						price:$this.find('.jsOnePrc').html(),
						quantity:$this.find('.num-ipt').val()
					});
				});
			}
		});

		var dataObj={"lineId":arry.join(","),"shopId":shopId,"productId":productId};
		dialog.confirm("确定要将商品移至收藏夹？",function(){
			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			$.post('https://i.csc86.com/moveToFavorites',dataObj,function(data){
				var _msg=data.msg;
				if(data.status=="200"){
					/*
					if($parentTbl.find("tbody").size()==1){
						$parentTbl.remove();
						cmmn.changeSmt($this);
						dialog.tip(_msg?_msg:'移至收藏夹成功！',2);
						}else{
						$parentTbody.remove();	
						cmmn.changeSmt($this);
						dialog.tip(_msg?_msg:'移至收藏夹成功！',2);	
							}
					*/
					if (typeof cscgaMd == 'object') {
						cscgaMd.moveToFav('pc', triggerEventNum, triggerEventArry);
					}
					location.href=location.href;
				}else{
					dialog.tip(_msg?_msg:'移至收藏夹失败！',2);
				}
				isSubmit=false;
			},'jsonp');
		},function(){
			//取消
		});	
		
		return false; 
	});

	//批量移至收藏夹
	$prchsOrderTbl.on('click','.jsMoveAll',function(){
		var $this=$(this);
		var $parentTbl=$this.parents('.prchs-order-tbl');
		var $parentFrm=$this.parents('.jsPrchsFrm');
		var carId=$prchsBox.find('input[type=hidden][name=carId]').val();
		var productId=$prchsBox.find('input[type=hidden][name=productId]').val();
		var shopId=$prchsBox.find('input[type=hidden][name=shopId]').val();
		var dataObj={"carId":carId,"productId":productId,"shopId":shopId};
		dialog.confirm("确定要将商品移至收藏夹？",function(){
			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			$.post('https://i.csc86.com/moveToFavorites',dataObj,function(data){
				var _msg=data.msg;
				if(data.status=="200"){
					location.href=location.href;
				}else{
					dialog.tip(_msg?_msg:'移至收藏夹失败！',2);
				}
				isSubmit=false;
			},'jsonp');
		},function(){
			//取消
		});	
		
		return false; 
	});
	
	//确认下单
	$jsPrchsFrm.on('click','.qrxd-smt',function(){
			var arry = [];
			var arry2 = [];
			var arry3 = [];
			var $this = $(this);
			var $form = $this.parents('.jsPrchsFrm');
			//var _proInf=$this.parents('tbody').data('proinf').priceRange;
			var _allNum = parseInt($form.find('.jsAllTnum').html());
			var $checked = $form.find('.jsSltOne:checked');
			var $tbody = $form.find('.prchs-order-tbl').find("tbody");
			//console.log($tbody.length);return false;
			//var productId=$form.find('input[type=hidden][name=productId]').eq(0).val();
			//var shopId=$form.find('input[type=hidden][name=shopId]').val();
			var $shopId = $form.find('input[type=hidden][name=shopId]');
			//var dataObj={"productId":productId,"shopId":shopId};
			if ($checked.length == 0) {
				dialog.tip("请选择需要采购的商品！", 2);
				return false;
			}
			if (isSubmit === true) {
				return false;
			}//阻止表单重复提交
			isSubmit = true;
			/*
			 $checked.each(function(){
			 var productId=$(this).parents('tbody').find('input[type=hidden][name=productId]').val();
			 arry.push(productId);
			 });
			 */

			triggerEventNum++;
			triggerEventArry = [];

			$tbody.each(function () {
				var $this = $(this);
				var $thischecked = $this.find('.jsSltOne:checked');
				if ($thischecked.length > 0) {
					var num = 0;
					var productId = $(this).find('input[type=hidden][name=productId]').val();
					arry.push(productId);
					$thischecked.each(function () {
						var $this = $(this);
						var $pTb = $this.parents('tbody');
						var $pTr = $this.parents('tr');
						num += $pTr.find(".num-ipt").val() * 1;

						triggerEventArry.push({
							id: $pTb.find('input[name=productId]').val() + ':' + $pTr.find('input[name=skuIds]').val(),
							price: $pTr.find('.jsOnePrc').html(),
							quantity: $pTr.find('.num-ipt').val()
						});

					});
					arry3.push(num);
				}
			});

			$shopId.each(function () {
				var $this = $(this);
				if ($this.parents(".prchs-order-tbl").find('.jsSltOne:checked').length > 0) {
					var shopId = $this.val();
					arry2.push(shopId);
				}
			});

			var dataObj = {"shopId": arry2.join(","), "productId": arry.join(","), "number": arry3.join(",")};
			var payhost = location.host;
			$.post('https://' + payhost + '/carOrder/checkProduct', dataObj, function (data) {
				var _msg = data.msg;
				if (data.status === "200") {
					/*
					 var result=data.data;
					 var shopIsOpenPay=result.shopIsOpenPay;
					 var isTrade=result.isTrade;
					 var minCount=parseInt(result.minProductCount);
					 if(shopIsOpenPay==="Y"){//判断旺铺是否开通在线交易
					 if(isTrade==="Y"){//可以在线交易
					 if(_allNum<minCount){
					 dialog.tip('采购数量必须为大于等于'+minCount+'的整数！',2.5);
					 isSubmit=false;
					 return false;
					 }
					 $form.trigger('submit');
					 }else{//不支持在线交易
					 dialog.tip('<div class="notrade-tip"><h2>此商品已不支持在线交易！</h2><p class="g-h5"></p><p>您可以删除商品或移至收藏夹</p></div>',3);
					 }
					 }else{
					 dialog.tip('<div class="notrade-tip"><h2>此商品已不支持在线交易！</h2><p class="g-h5"></p><p>您可以删除商品或移至收藏夹</p></div>',3);
					 }
					 }else{
					 dialog.tip(_msg?_msg:'确认下单失败！',2);
					 }

					 */
					if (typeof cscgaMd == 'object') {
						cscgaMd.cartJs('pc', triggerEventArry);
					}
					$form.trigger('submit');
				} else {
					isSubmit = false;
					dialog.tip(_msg ? '<div class="notrade-tip"><h2>' + _msg + '</h2></div>' : '提交失败', 3);
				}
			}, 'json');

			return false;

	});

    $('.gwc').hover(function(){
		$(this).addClass('orange');
		$('.num').addClass('orangeNum')
	},function(){
		$(this).removeClass('orange');
		$('.num').removeClass('orangeNum')
	})
});