define(function(require, exports, module) {
	var isSubmit=false;
	var dialog=require('dialog');
	var hasLoginInfo=require('hasLoginInfo');//获取弹窗登录后不刷新页面改变页面登录后的信息
	var $jsColorLst = $('.jsColorLst');
	var $jsProSizeItm = $('.jsProSizeItm');
	var $stock=$('.jsStock');
	var $jsOrderFrm=$(".jsOrderFrm");
	var $orderLst=$('.jsOrderLst');
	var lwNum=proInf.priceRange[0][0];//最低订购数
	var isDj=parseInt(proInf.isDj);
	//var proDprice={'dPrc':proInf.priceRange[0][1]};//用来存放单价，方便本js其他地方使用
	$(".jsLjxdBtn,.jsAddCgdBtn,.jsLjcyBtn").data({Boole:1});
	var isMyshop=$jsOrderFrm.find('input[type=hidden][name=buyerId]').val()==$jsOrderFrm.find('input[type=hidden][name=sellerId]').val()?true:false;//获取是否自己店铺

	var proDtlOrder={
		rangePrc: function (l, n) {//获取对应数量的价格
		  if (l && l.length) {
			  for (var m = 0; m < l.length; m++) {
				  if (m === 0 && n < l[m][0]) {
					  return l[m][1];
				  }
				  if (m < l.length - 1 && n >= l[m][0] && n < l[m + 1][0]) {
					  return l[m][1];
				  }
				  if (m === l.length - 1 && n >= l[m][0]) {
					  return l[m][1];
				  }
			  }
		  }
		},
		skuPrc: function (obj) {//获取对应数量的价格
		var num=proDtlOrder.numFun(obj);
		var price=0;
		$.each(obj,function(){
			var $this = $(this);
			var $thisprice = $(this).parents('tr').data('info').price;
			var $thisnum = $(this).val()*1;
				price+=$thisprice*$thisnum;
			}
		
		);
			price=proDtlOrder.formatPrc(price);	
			return price;
		},
		formatPrc: function (s) {//转换价钱格式
			var s = s.toString().split(",").join("");
			if (/[^0-9\.]/.test(s)) return "invalid value";
			s = s.replace(/^(\d*)$/, "$1.");
			s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
			s = s.replace(".", ",");
			var re = /(\d)(\d{3},)/;
			while (re.test(s)) {
				s = s.replace(re, "$1,$2");
			}
			s = s.replace(/,(\d\d)$/, ".$1");
			return s.replace(/^\./, "0.");
		},
		reFormatPrc:function(s){//恢复价钱格式与前面formatPrc刚好相反
			var s = s.toString().split(",").join("");
			return s;
		},
		numFun:function(obj){//获取数量
			var num=0;
			obj.each(function(){
				num+=this.value*1;
			});
			return num;
		},
		priceFun:function(obj){//获取单价
			var num=proDtlOrder.numFun(obj);
			var price=proDtlOrder.formatPrc(proDtlOrder.rangePrc(proInf.priceRange,num));
			
			return price;
		},
		changePrice:function(obj,price){//改变价格
			obj.html(price);
		},
		cmnChange:function(obj){
			obj=obj?obj:null;
			if(obj){
				var colorNum=proDtlOrder.numFun(obj.find('.num-ipt'));//每个款式对应的选购数量
				colorNum=colorNum%1>0?colorNum.toFixed(2):colorNum;
				var datainfo = obj.data('info');
				var color=datainfo.color||"";
				var thisprice=datainfo.price;
				var size=datainfo.size||"";
				var fgf=color&&size?"-":""
			}
			
			//根据数量改变库存显示
			var $numIpt=$jsProSizeItm.find('.num-ipt');
			var totalNum=proDtlOrder.numFun($numIpt);
			var totalGhNum=proInf.totalNum;
			if(!isDj&&totalGhNum){//非定金 且 供货量非不限
				if(totalNum>totalGhNum){
					$stock.html('需卖家确认，支付订金（'+proInf.deposit+'）');
				}else{
					$stock.html('<span class="g-mr10">现货</span>支付后'+$stock.data("time")+'小时内发货');
				}
			}
			
			var price,totalPrice;
			if(!proInf.isSKU){
			//根据数量改变价格
			price=proDtlOrder.priceFun($numIpt);
			proDtlOrder.changePrice($jsProSizeItm.find('.itm-bd .prc'),price);
			
			//已选择(总价)
			totalPrice=proDtlOrder.formatPrc(Math.round(proDtlOrder.rangePrc(proInf.priceRange,totalNum)*100*totalNum)/100);
			}else{
			totalPrice = proDtlOrder.skuPrc($numIpt);
				}
		
			
			
			var itmHtml='';
			var $size=null;
			if(color||size){
				itmHtml='<li data-size="'+color+size+'">'+decodeURIComponent(color)+fgf+decodeURIComponent(size)+'，<strong class="num">'+colorNum+'</strong>'+proInf.unit+'；</li>';
				$colorsize = $orderLst.find('li[data-size="'+color+size+'"]');
			}else{
				itmHtml='<li class="jsNoclr"><strong class="num">'+colorNum+'</strong>'+proInf.unit+'；</li>';
				$colorsize = $orderLst.find('.jsNoclr');
			}
			
			var totalHtml='总价 <strong class="prc">'+totalPrice+'</strong> 元';
			var $totalPrice=$orderLst.find('.total-prc');
			
			$totalPrice.html(totalHtml);
			if(totalNum==0){//当选择的所有总数为0时移除总价
				$totalPrice.html("");
			}
			if($colorsize&&$colorsize.length>0){
				$colorsize.find('.num').html(colorNum);
				if(colorNum==0){//当所选单个颜色对应的总数为0时则移除
					$colorsize.remove();
				}
				return;
			}
			if(colorNum==0){//当所选单个颜色对应的总数为0时则不显示在所选项处
				itmHtml='';
			}
			$totalPrice.before(itmHtml);
		},
		init:function(){
			//显示更多尺码
			$('.jsMoreSize').on('click',function(){
				var _this=$(this),
				    _itmBd=_this.parent().siblings('.itm-bd');
					_itmBd.find('tr').removeClass('g-dn');
				_itmBd.css({'height':'100%','max-height':'100%'});
				_this.hide();
				return false;
			});
			
			//鼠标放到颜色上对应颜色改变状态
			$('.jsColorLst li').hover(function(){
				var _this=$(this);
				_this.addClass('hover');
			},function(){
				var _this=$(this);
				_this.removeClass('hover');
			});
			

			
			$jsColorLst.on('click','li',function(){//选择颜色
				var _this=$(this);
				var _thisimg = _this.find('img');
				if(_thisimg[0]){
				var  _thisimgsrc=_this.find('img').attr('src');
				var _sImgUrlt3 = _thisimgsrc.replace(/(.*)_t1(.*)/,"$1_t3$2");
				var _sImgUrlt4 = _thisimgsrc.replace(/(.*)_t1(.*)/,"$1_t4$2");	
				$('.jsProDtlPic').find('.pic-c img').attr('src',_sImgUrlt3);
				$('.jsProDtlPic').find('.pic-c a').attr('href',_sImgUrlt4);
					};	
				var	_index=$('.jsColorLst li').index(this);
				_this.siblings('.cur').trigger('blur').removeClass('cur').end().addClass('cur');
				$('.jsProSizeItm .itm-bd').hide().eq(_index).fadeIn();

			}).find('li').on('blur',function(){//当前颜色失去焦点时
				var _this=$(this);
				var itmNum=0;
				$jsProSizeItm.find('.itm-bd:eq('+ _this.index() +') .num-ipt').each(function(){
					itmNum+=$(this).val()*1;
				});
				if(itmNum>0){
					_this.removeClass('cur').addClass('selected');
				}else{
					_this.removeClass('cur selected');
				}
			});
			
			//刷新页面重置表单
			$('.jsOrderFrm')[0].reset();
			
			//鼠标移入数量文本框
			$jsProSizeItm.on('mouseenter','.num-ipt',function(){
				$(this).addClass('hover');
			}).on('mouseleave','.num-ipt',function(){
				$(this).removeClass('hover');
			});
			
			//鼠标移入添加按钮
			$jsProSizeItm.on('mouseenter','.add-opt',function(){
				var $this=$(this);
				var $numipt = $this.prev('.num-ipt');
				$this.addClass('add-hover');
				$numipt.addClass('hover');
			}).on('mouseleave','.add-opt',function(){
				var $this=$(this);
				var $numipt = $this.prev('.num-ipt');
				$this.removeClass('add-hover');
				$numipt.removeClass('hover');
			});
			
			//鼠标移入减少按钮
			$jsProSizeItm.on('mouseenter','.plut-opt',function(){
				var $this=$(this);
				var $numipt = $this.next('.num-ipt');
				$this.addClass('plut-hover');
				$numipt.addClass('hover');
			}).on('mouseleave','.plut-opt',function(){
				var $this=$(this);
				var $numipt = $this.next('.num-ipt');
				$this.removeClass('plut-hover');
				$numipt.removeClass('hover');
			});
			
			//数量文本框值只能输入数字
			$jsProSizeItm.on('keyup','.num-ipt',function(e){
				var $this=$(this);
				var $itmBd=$this.parents('.itm-bd');
				var $thistr=$this.parents('tr');
				//this.value=this.value.replace(/\D/g,'');
				this.value=this.value.replace(/[^0-9\.]+/g,'');
				this.value=this.value.replace(/[.]+/g,'.');
				this.value=this.value.replace(/^[.]/g,'');
				this.value=this.value.replace(/([.].*)([.])/g,'$1');
				this.value=this.value.replace(/(^[0-9]{1,6}\.[0-9]{2})(.*)/g,"$1");
				if(this.value>0){
					$this.prev().removeClass().addClass('plut-opt');	
				}else{
					$this.prev().removeClass().addClass('no-plut-opt');	
				}
				
				if(this.value>=999999){//限制文本框最大值为999999，即最多6位数
					this.value=999999;
					$this.next().removeClass().addClass('no-add-opt');
				}else{
					$this.next().removeClass().addClass('add-opt');	
				}
				
				proDtlOrder.cmnChange($thistr);
			});
			
			//数量文本框鼠标失去焦点时
			$jsProSizeItm.on('blur','.num-ipt',function(e){
				var $this=$(this);
				var $itmBd=$this.parents('.itm-bd');
				var $thistr=$this.parents('tr');
				//this.value=this.value.replace(/\D/g,'');
				this.value=this.value.replace(/[^0-9\.]+/g,'');
				this.value=this.value.replace(/[.]+/g,'.');
				this.value=this.value.replace(/(^[1-9]{1,6}\.[0-9]{2})(.*)/g,"$1");				
				if(!this.value){
					this.value=0;
				}
				
				if(this.value>=999999){//限制文本框最大值为999999，即最多6位数
					this.value=999999;
					$this.next().removeClass().addClass('no-add-opt');
				}else{
					$this.next().removeClass().addClass('add-opt');	
				}
				
				proDtlOrder.cmnChange($thistr);
			});
			
			//防止点击时选中文本（主要是为了兼容ie，其他浏览器在样式里面设置了
			$('.order-num-opts').find('span').each(function(){
				$(this)[0].onselectstart=function(){return false;}
			}); 
			
			//点击添加按钮
			$jsProSizeItm.on('click','.add-opt',function(){
				var $this=$(this);
				var $itmBd=$this.parents('.itm-bd');
				var $thistr=$this.parents('tr');
				var $numipt = $this.prev('.num-ipt');
				var _num = $numipt.val() * 1 + 1;
				_num=_num%1>0?_num.toFixed(2):_num;
				if(_num>0){
					$this.siblings('.no-plut-opt').removeClass().addClass('plut-opt');	
				}
				
				if(_num>=999999){//限制文本框最大值为999999，即最多6位数
					_num=999999;
					$this.removeClass().addClass('no-add-opt');
					$numipt.removeClass('hover');
				}
				
				$numipt.val(_num);
				proDtlOrder.cmnChange($thistr);
			});
			
			//点击减少按钮
			$jsProSizeItm.on('click','.plut-opt',function(){
				var $this=$(this);
				var $itmBd=$this.parents('.itm-bd');
				var $thistr=$this.parents('tr');
				var $numipt = $this.next('.num-ipt');
				var _num = $numipt.val() * 1 - 1;
				_num=_num%1>0?_num.toFixed(2):_num;
				_num = _num <= 0 ? 0 : _num;
				if ($numipt.val() < 1) {
					return;
				}
				if(_num<1){
					$this.removeClass().addClass('no-plut-opt');
					$numipt.removeClass('hover');
				}
				
				if(_num<999999){//限制文本框最大值为999999，即最多6位数
					$this.siblings('.no-add-opt').removeClass().addClass('add-opt');
				}
				
				$numipt.val(_num);
				proDtlOrder.cmnChange($thistr);
			});
			
			//点击加入采购单按钮
			$('.jsAddCgdBtn').on('click',function(){
				var $this=$(this);
				var $jsOrderFrm=$this.parents('.jsOrderFrm');
				var $buyerIdIpt=$('input[type=hidden][name=buyerId]');
				var buyerId=$buyerIdIpt.val();
				var sellerId=$('input[type=hidden][name=sellerId]').val();
				var productId=$('input[type=hidden][name=productId]').val();
				var shoppingCarDetail=[];
				var orderNum=0;//订购总数
				

				$.get("//api.csc86.com/notify/count/all/",function (data){

					//未登录时弹出弹窗登录
					if(data.status!=true){
						hasLoginInfo.loginInfo();
						return false;
					}

					if (isMyshop == true) {
						if($this.data("Boole")==1){
							$this.append("<span>不能对自己店铺的商品下单</span>");
							$this.data({Boole:0});
						}
						return false;
					}

					$jsProSizeItm.find('.num-ipt').each(function(){
						var _arry=[];
						var $this=$(this);
						var _num=this.value*1;
						var _id=$this.parents('.order-num-opts').data('id');
						orderNum+=_num;
						if(_num>0){
							_arry.push(_id,_num);
						}
						if(_arry.length>0){
							shoppingCarDetail.push(_arry);
						}
					});

					if(orderNum<lwNum){
						dialog.tip('采购数量必须为大于等于'+lwNum+'的整数！',2.5);
						return false;
					}

					if(isSubmit===true){return false;}//阻止表单重复提交
					isSubmit=true;
					$.post('//api.csc86.com/AddShoppingCar',{"buyerId":buyerId,"sellerId":sellerId,"productId":productId,"shoppingCarDetail":shoppingCarDetail},function(data){

						var _msg=data.msg;
						if(data.status){
							var mdArry=[];
							$jsProSizeItm.find('.prosize-tbl tbody tr').each(function(i){
								var $this=$(this);
								var qntt=$this.find('input[name^=addNum]').val();
								var mdObj={};
								if(qntt>0) {
									mdObj.id=productId+':'+$this.find('input[name^=addId]').val();
									mdObj.quantity=qntt;
									if(proInf.isSKU){
										mdObj.price=proInf.priceRange[i][1];
									}else{
										mdObj.price=proDtlOrder.rangePrc(proInf.priceRange,orderNum);
									}
									mdArry.push(mdObj);
								}
							});
							cscga('create', 'SU-10001-1', 'auto','addToCartTracker'+orderNum);
							cscga('addToCartTracker'+orderNum+'.require', 'ec');
							cscga('addToCartTracker'+orderNum+'.require', 'cscplugin',{
								data:mdArry,
								dtlOptProNum:orderNum,
								eventAction:'addToCartSuccess'
							});
							cscga('addToCartTracker'+orderNum+'.cscplugin:addToCartInit');

							var html='<div class="addcgdd-sucpop">\
								<h2>成功加入进货车！</h2>\
								<p class="tip">当前进货车共<em class="num">'+data.num+'</em>种货品</p>\
								<div class="frm-btns">\
									<a class="gojs-abtn" href="//i.csc86.com/carDetail">去结算</a><a class="gocg-abtn jsGoCgAbtn" href="">继续进货</a>\
								</div>\
							</div>';

							var dg=dialog({
								title:false,
								content:html,
								padding:0,
								fixed:true,
								lock:true,
								opacity:0,
								init:function(){
									$('.jsGoCgAbtn').on('click',function(){
										dg.close();
										return false;
									});
								}
							});
						}else{
							dialog.tip(_msg?_msg:'提交失败！',2);
						}
						isSubmit=false;
					},"jsonp");

				},"jsonp");
				return false;
			});

			
			//点击立即下单
			$('.jsLjxdBtn').on('click',function(){
				var $this=$(this);
				var $jsOrderFrm=$this.parents('.jsOrderFrm');
				var $buyerIdIpt=$('input[type=hidden][name=buyerId]');
				var buyerId=$buyerIdIpt.val();
				var shoppingCarDetail=[];
				var orderNum=0;//订购总数

				$.get("//api.csc86.com/notify/count/all/",function (data){
					//未登录时弹出弹窗登录
					if(data.status!=true){
						hasLoginInfo.loginInfo();
						return false;
					}

					if (isMyshop == true) {
						if($this.data("Boole")==1){
							$this.append("<span>不能对自己店铺的商品下单</span>");
							$this.data({Boole:0});
						}
						return false;
					}

					$jsProSizeItm.find('.num-ipt').each(function(){
						var _arry=[];
						var $this=$(this);
						var _num=this.value*1;
						var _id=$this.parents('.order-num-opts').data('id');
						orderNum+=_num;
						if(_num>0){
							_arry.push(_id,_num);
						}
						if(_arry.length>0){
							shoppingCarDetail.push(_arry);
						}
					});

					if(orderNum<lwNum){
						dialog.tip('采购数量必须为大于等于'+lwNum+'的整数！',2.5);
						return false;
					}

					$jsOrderFrm.trigger('submit');
				},"jsonp");
				return false;
			});
		}
	}
	proDtlOrder.init();
});