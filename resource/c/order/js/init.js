define(function(require, exports, module) {
	var isSubmit=false;
   // require('top');
	require('newtop');
	var dialog=require('dialog');
	var $jsNumOpts=$('.jsNumOpts');
	var $prchsOrderMain=$('#prchsOrderMain');//采购单页面标志
	var $smtOrderMain=$('#smtOrderMain');//提交订单页面标志
	
	//提交订单页面选择器
	if($smtOrderMain[0]){
		var $cpnBox=$('.cpn-box');
		var $cpnBoxBd=$cpnBox.find('.box-bd');
		var $jsKycpn=$('.jsKycpn');//可用优惠券列表
		var $cpnTab=$('.cpn-tab');
		var $jsKycpn=$('.jsKycpn');//可用优惠券容器
		var $jsBkycpn=$('.jsBkycpn');//不可用优惠券容器
		var $jsCpnPrc=$('.jsCpnPrc');//可抵扣金额
	}
	
	var cmmn={
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
		allTnum:function(obj){//计算单个订单总数
			var allTnum=0;
			obj.each(function(){
				allTnum+=this.value*1;
			});
			return allTnum;
		},
		allTprc:function(obj){//计算单个订单总额
			var allTprc=0;
			obj.each(function(){
				allTprc+=cmmn.reFormatPrc($(this).text())*100;
			});
			allTprc=Math.round(allTprc)/100;
			return cmmn.formatPrc(allTprc);
		},
		payAllTprc:function(obj,per){//应付总额
			var payAllTprc=0;
			obj.each(function(){
				payAllTprc+=cmmn.reFormatPrc($(this).text())*100;
			});
			return cmmn.formatPrc(Math.round(payAllTprc*per/100)/100);
		},
		changeSmt:function(obj){//改变单价、小计、订单总数、订单总额
		    var checkArry=[];
			var $prchsbox=$('.prchs-box');
			var $orderTbl=$('.order-tbl').eq(0);
			var $parentTbl=obj.parents('.order-tbl');
			var $prchsordertbl=$(".prchs-order-tbl");
			var $parentTbd=obj.parents('tbody');	
			var $parentTbdcheck=obj.parents('tbody').find(".jsSltOne:checked");	
			//if($parentTbd.length<1){$parentTbd=$orderTbl.find("tbody").eq(0)};
			var $parentsTbd=obj.parents('tbody');
			var $parentTr=obj.parents('tr');
			var nullproinf={"totalNum":"0","deposit":"0","priceRange":[[0,0]]};
			var _proinf=$parentsTbd.data('proinf')||nullproinf;
	
			
			var _priceRange=_proinf.priceRange;//价格范围
			_priceRange.sort(function(a,b){return a[0]>b[0]?1:-1});
			
			var _totalNum=_proinf.totalNum;//供货量
			var _deposit=_proinf.deposit.split('%')[0]*1;
			var _isDj=_proinf.isDj;
			var _allTnum=0;//订单总数
			var _allTnum1=0;//订单总数
			var _allTprc=0;//订单总额
			
			var $jsSltOne=$parentTbd.find('.jsSltOne:checked');
			var $jsboxOne=$prchsbox.find('.jsSltOne:checked');
			var $jsSltAll=$prchsbox.find(".jsSltAll:checked");

			
			if($('#prchsOrderMain')[0]){//采购单页面订单总数
			//if($parentTbd.length<1){_allTnum=cmmn.allTnum($jsboxOne.parents('tr').find('.num-ipt'));};
				_allTnum=cmmn.allTnum($parentTbdcheck.parents('tr').find('.num-ipt'));//同种商品选中项的总数
				_allTnum1=cmmn.allTnum($jsboxOne.parents('tr').find('.num-ipt'));//所有商品选中项的总数
				_allTnum1=_allTnum1%1>0?_allTnum1.toFixed(2):_allTnum1;
			}
			
			if($('#smtOrderMain')[0]){//提交订单页面订单总数
				_allTnum=cmmn.allTnum($parentTbl.find('.num-ipt'));
			}
			
			//改变单价、小计
			var _onePrc=cmmn.rangePrc(_priceRange,_allTnum);
			$parentTbd.find('.jsOnePrc').html(cmmn.formatPrc(_onePrc));//单价
			
			$parentTbd.find('.jsOneTprc').each(function(){
				var $this=$(this);
				var _oneNum=$this.parents('tr').find('.num-ipt').val();
				
				//小计
				$this.html(cmmn.formatPrc(Math.round(_onePrc*_oneNum*100)/100)); 
			});
			var jsAllSUnum = 0;
			/*
			if(!obj.parents(".order-tbl").find(".jsSltAll").is(':checked')){
				if(obj.parents(".order-tbl").find(".jsSltOne:checked").size()>0){jsAllSUnum++;};
				}
			*/
			$prchsordertbl.each(function(){
				var $this=$(this);
				if($this.find('.jsSltOne:checked').length>0){
					jsAllSUnum++;
					return;
					};
		});
			
			
			//采购单页面输出总数及总额
			if($('#prchsOrderMain')[0]){
				_allTprc=cmmn.allTprc($jsboxOne.parents('tr').find('.jsOneTprc')); //订单总额(选中项的总额)
				$prchsbox.find('.jsAllTnum').html(_allTnum1);
				$prchsbox.find('.jsAllTPrc').html(_allTprc);
				$prchsbox.find('.jsAllSUnum').html(jsAllSUnum);
				$prchsbox.find('.jsAllSPnum').html($jsboxOne.size());
			}
			
			//提交订单页面输出总数及总额与应付总额、订金
			if($('#smtOrderMain')[0]){
				_allTprc=cmmn.allTprc($parentTbl.find('.jsOneTprc'));//订单总额
				$('.jsAllTnum').html(_allTnum);
				$('.jsAllTPrc').html(_allTprc);
				var payAllTprc=0;//应付总金额
				var $jsYfTtlPrc=$('.jsYfTtlPrc');
				/*var jsCpnPrc=cmmn.reFormatPrc($('.jsCpnPrc').html())*1;//优惠券金额
				var orderTprc=cmmn.reFormatPrc(_allTprc)*1;
				
				//优惠券
				$.post('http://i.csc86.com/carOrder/getCouponInfo',{totalPrice:orderTprc,catId:_catid,memberId:_memberid},function(data){
					var	status=data.status,
						data=data.data,
						kycpn=data.kycpn,
						bkycpn=data.bkycpn,
						len1=kycpn.length,
						len2=bkycpn.length,
						html='',
						html2='';
					if(status){
						$cpnTab.find('.num1').html(len1);
						$cpnTab.find('.num2').html(len2);
						if(len1<1){
							html='<p class="no-cpn">'+
									'此订单暂无可用的优惠券！您可以<a href="//payment.csc86.com/coupon.search.do" target="_blank">查看所有优惠券</a>了解使用限制！<br/>'+
									'如果您有优惠券号或者实体券，需要先<a href="//payment.csc86.com/coupon.search.do?isOpn=1" target="_blank">激活绑定</a>才能使用！'+
								'</p>';
						}else{
							html+='<ul class="cpn-lst">';
							$.each(kycpn,function(i,n){
								var i=kycpn[i];
								var type=i["type"];
								var maxprc=i["max"];
								var maxhtml=type=='现金券'?'':maxprc+'-';
								html+='<li data-max="'+maxprc+'" data-cpnprc="'+i["cpnprc"]+'"><input type="checkbox" value="'+i["id"]+'" name="cpn[]" class="g-ml20"><span class="prc">'+maxhtml+i["cpnprc"]+'</span><span class="desc">'+i["desc"]+'</span><span class="type">'+type+'</span><span class="date">有效期至'+i["date"]+'</span></li>';
							});
							html+='</ul>';
						}
						$jsKycpn.html(html);
						
						if(len2<1){
							html2='<p class="no-cpn">'+
									  '您的账户中暂无有效优惠券，如有优惠券号或者实体券，请先<a href="href="//payment.csc86.com/coupon.search.do" target="_blank">激活绑定</a>!'+
								  '</p>';
						}else{
							html2+='<ul class="cpn-lst">';
							$.each(bkycpn,function(i,n){
								var i=bkycpn[i];
								var type=i["type"];
								var maxprc=i["max"];
								var maxhtml=type=='现金券'?'':maxprc+'-';
								html2+='<li><span class="prc">'+maxhtml+i["cpnprc"]+'</span><span class="desc">'+i["desc"]+'</span><span class="type">'+type+'</span><span class="date">有效期至'+i["date"]+'</span><span class="g-cred">'+i["reson"]+'</span></li>';
							});
							html2+='</ul>';
						}
						$jsBkycpn.html(html2);		
					}
				},'json');*/
				
				//判断使用优惠券处是否展开，如果展开则隐藏 且 用劵抵扣金额设为0
				if($cpnBox.hasClass('cpn-box-unfold')){
					$cpnBox.removeClass('cpn-box-unfold');
					$jsCpnPrc.html('0.00');
				}
				
				if(!_isDj){//现货时 且 非不限
					if(_totalNum){
						if(_allTnum>_totalNum){
							payAllTprc=cmmn.payAllTprc($parentTbl.find('.jsOneTprc'),_deposit);
							if($jsYfTtlPrc.find('.jsPayDj')[0]){
								$jsYfTtlPrc.find('.jsPayDj').html(payAllTprc);
								return false;
							}
							$('.jsYfTtlPrc').html('应付订金（<em class="jsDpst">'+_proinf.deposit+'</em>）：<em class="g-cred g-fs16 jsPayDj">'+payAllTprc+'</em> <span>元</span>');
						}
						else{
							payAllTprc=cmmn.payAllTprc($parentTbl.find('.jsOneTprc'),100);
							if($jsYfTtlPrc.find('.jsPayAllTPrc')[0]){
								$jsYfTtlPrc.find('.jsPayAllTPrc').html(payAllTprc);
								return false;
							}
							$('.jsYfTtlPrc').html('应付总额：<em class="g-cred g-fs16 jsPayAllTPrc">'+payAllTprc+'</em> <span>元</span>');
						}
					}
					else{
						payAllTprc=cmmn.payAllTprc($parentTbl.find('.jsOneTprc'),100);
						if($jsYfTtlPrc.find('.jsPayAllTPrc')[0]){
							$jsYfTtlPrc.find('.jsPayAllTPrc').html(payAllTprc);
							return false;
						}
						$('.jsYfTtlPrc').html('应付总额：<em class="g-cred g-fs16 jsPayAllTPrc">'+payAllTprc+'</em> <span>元</span>');
					}
				}
				else{//非现货时
					payAllTprc=cmmn.payAllTprc($parentTbl.find('.jsOneTprc'),_deposit);
					if($jsYfTtlPrc.find('.jsPayDj')[0]){
						$jsYfTtlPrc.find('.jsPayDj').html(payAllTprc);
						return false;
					}
					$('.jsYfTtlPrc').html('应付订金（<em class="jsDpst">'+_proinf.deposit+'</em>）：<em class="g-cred g-fs16 jsPayDj">'+payAllTprc+'</em> <span>元</span>');
				}
				
			}
		},
		change_all:function(){//改变单价、小计、订单总数、订单总额
		var $prchsbox=$('.prchs-box');
		var $jsSltOne=$prchsbox.find('.jsSltOne:checked');
		var $jsSltAll=$prchsbox.find(".jsSltAll:checked");
			if($('#prchsOrderMain')[0]){//采购单页面订单总数
				_allTnum=cmmn.allTnum($jsSltOne.parents('tr').find('.num-ipt'));//选中项的总数
			}
			
			if($('#smtOrderMain')[0]){//提交订单页面订单总数
				_allTnum=cmmn.allTnum($parentTbl.find('.num-ipt'));
			}		
		if($('#prchsOrderMain')[0]){
				_allTprc=cmmn.allTprc($jsSltOne.parents('tr').find('.jsOneTprc')); //订单总额(选中项的总额)
				$prchsbox.find('.jsAllTnum').html(_allTnum);
				$prchsbox.find('.jsAllTPrc').html(_allTprc);
				$prchsbox.find('.jsAllSUnum').html($jsSltAll.size());
				$prchsbox.find('.jsAllSPnum').html($jsSltOne.size());
			}
		},
		saveNum:function(obj,num){//保存当个商品对应颜色的数量
			var _lineId=obj.parents('tr').find('.jsSltOne').val();
			var _dataObj={"lineId":_lineId,"quantity":num};
		//	if(isSubmit===true){return false;}//阻止表单重复提交
		//	isSubmit=true;
			$.post('https://i.csc86.com/updateCarQuantity',_dataObj,function(data){
		//		isSubmit=false;
			},'jsonp');
		},
		init:function(){
			
			
			//采购页面刷新重置表单
			if($prchsOrderMain[0]){
				$('.jsPrchsFrm')[0].reset();
			}
			
			//订单提交页刷新时重置表单
			if($('#smtOrderMain')[0]){
				$('.jsSmtOrderFrm')[0].reset();
			}
			
			//鼠标移入数量文本框
			$jsNumOpts.on('mouseenter','.num-ipt',function(){
				var $this=$(this);
				if($this.data("controll")){
					$this.addClass('hover');
				}
			}).on('mouseleave','.num-ipt',function(){
				var $this=$(this);
				if($this.data("controll")){
					$this.removeClass('hover');
				}
			});
			
			//鼠标移入添加按钮
			$jsNumOpts.on('mouseenter','.add-opt',function(){
				
				var $this=$(this);
				var $numipt = $this.prev('.num-ipt');
				if($numipt.data("controll")){
					$this.addClass('hover');
					$numipt.addClass('hover');
				}
			}).on('mouseleave','.add-opt',function(){
				var $this=$(this);
				var $numipt = $this.prev('.num-ipt');
				if($numipt.data("controll")){
					$this.removeClass('hover');
					$numipt.removeClass('hover');
				}
			});
			
			//鼠标移入减少按钮
			$jsNumOpts.on('mouseenter','.plut-opt',function(){
				var $this=$(this);
				var _numipt=0;
				var $numipt = $this.next('.num-ipt');
				var _numipts=$this.parents("tbody").find(".num-ipt");
				var _priceRange=$this.parents("tbody").data('proinf')?$this.parents("tbody").data('proinf').priceRange:[[0,0]];
				_priceRange.sort(function(a,b){return a[0]>b[0]?1:-1});
				var _proinfnum=_priceRange[0][0]*1;
				
				/*
				var $thischeckeds=$this.parents("tbody").find(".jsSltOne:checked");
		$thischeckeds.each(function() {
            var $this=$(this);
			_numipt+=$this.parents('tr').find(".num-ipt").val()*1;
        });
		
					_numipts.each(function() {
                   _numipt+=$(this).val()*1;
                });
				

				if(_numipt<=_proinfnum||$numipt.val()<2){
					$this.removeClass().addClass('no-plut-opt');
					return
					}
				*/
				if($numipt.val()<2){
					$this.removeClass().addClass('no-plut-opt');
					return
					}
				if($numipt.data("controll")){
					$this.addClass('hover');
					$numipt.addClass('hover');
				}
			}).on('mouseleave','.plut-opt',function(){
				var $this=$(this);
				var $numipt = $this.next('.num-ipt');
				if($numipt.data("controll")){
					$this.removeClass('hover');
					$numipt.removeClass('hover');
				}
			});
			
			//数量文本框值只能输入数字
			$jsNumOpts.on('keyup','.num-ipt',function(e){
				var $this=$(this);
				var _numipt=0;
				var _priceRange=$this.parents("tbody").data('proinf')?$this.parents("tbody").data('proinf').priceRange:[[0,0]];
				_priceRange.sort(function(a,b){return a[0]>b[0]?1:-1});
				var _proinfnum=_priceRange[0][0]*1;
				var _numipts=$this.parents("tbody").find(".num-ipt");
				var _defaultVal=$this.data('default');		
				
				//this.value=this.value.replace(/\D/g,'');
				this.value=this.value.replace(/[^0-9\.]+/g,'');
				this.value=this.value.replace(/[.]+/g,'.');
				this.value=this.value.replace(/^[.]/g,'');
				this.value=this.value.replace(/([.].*)([.])/g,'$1');
				this.value=this.value.replace(/(^[0-9]{1,6}\.[0-9]{2})(.*)/g,"$1");
				 //this.value=this.value.replace(/([\d]{1,6}\.[\d]{1,2})/g,"$1"); 

				///^[^0-9\.]+$/g
				//^[1-9][\d]{0,3}(\.[\d]{1,2})?$|^(0\.(?!0+$)[\d]{1,2})?$|^(10{4})(\.[0]{1,2})?$/
				
				/*
				var $thischeckeds=$this.parents("tbody").find(".jsSltOne:checked");
		$thischeckeds.each(function() {
            var $this=$(this);
			_numipt+=$this.parents('tr').find(".num-ipt").val()*1;
        });
		
				_numipts.each(function() {
                   _numipt+=$(this).val()*1;
                });	
				*/
				var _num=this.value*1;
				if(parseInt(_num)===0){
					this.value=1;
				}
				/*
				if(_numipt<_proinfnum){
					this.value=_proinfnum-_numipt+_num;
					}
					*/
				if(this.value>1){
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
				
				cmmn.changeSmt($this);
				
				//采购单页面保存修改数量(其他页面无需保存)
				if($prchsOrderMain[0]){
					cmmn.saveNum($this,_num);
				}
			});
			
			//数量文本框鼠标失去焦点时
			$jsNumOpts.on('blur','.num-ipt',function(e){
				var $this=$(this);
				var _defaultVal=$this.data('default');
				//this.value=this.value.replace(/\D/g,'');
				this.value=this.value.replace(/[^0-9\.]+/g,'');
				this.value=this.value.replace(/[.]+/g,'.');
				this.value=this.value.replace(/(^[1-9]{1,6}\.[0-9]{2})(.*)/g,"$1");
				if(!this.value){
					this.value=_defaultVal;
				}
				
				if(this.value>=999999){//限制文本框最大值为999999，即最多6位数
					this.value=999999;
					$this.next().removeClass().addClass('no-add-opt');
				}else{
					$this.next().removeClass().addClass('add-opt');	
				}
				
				var _num=this.value;
				
				cmmn.changeSmt($this);
				
				//采购单页面保存修改数量(其他页面无需保存)
				if($prchsOrderMain[0]){
					cmmn.saveNum($this,_num);
				}
			});
			
			//防止点击时选中文本（主要是为了兼容ie，其他浏览器在样式里面设置了）
			$jsNumOpts.find('span').each(function(){
				$(this)[0].onselectstart=function(){return false;}
			});
			
			//点击添加按钮
			$jsNumOpts.on('click','.add-opt',function(){
				var $this=$(this);
				var $numipt = $this.prev('.num-ipt');
				var _numipt=0;
				var _priceRange=$this.parents("tbody").data('proinf')?$this.parents("tbody").data('proinf').priceRange:[[0,0]];
				_priceRange.sort(function(a,b){return a[0]>b[0]?1:-1});
				var _proinfnum=_priceRange[0][0]*1;
				
				var _numipts=$this.parents("tbody").find(".num-ipt");
				var _noplutopt=$this.parents("tbody").find(".no-plut-opt");
				_numipts.each(function() {
                   _numipt+=$(this).val()*1;
                });				
				if(_numipt+1>=_proinfnum){
					_noplutopt.removeClass().addClass('plut-opt');	
					}
					
				if($numipt.data("controll")){
					var _num = $numipt.val() * 1 + 1;
					_num=_num%1>0?_num.toFixed(2):_num;
				
					if(_num>1){
						$this.siblings('.no-plut-opt').removeClass().addClass('plut-opt');	
					}
					
					if(_num>=999999){//限制文本框最大值为999999，即最多6位数
						_num=999999;
						$this.removeClass().addClass('no-add-opt');
						$numipt.removeClass('hover');
					}
					
					$numipt.val(_num);
					
					cmmn.changeSmt($this);
					
					//采购单页面保存修改数量(其他页面无需保存)
					if($prchsOrderMain[0]){
						cmmn.saveNum($this,_num);
					}
				}
			});	
			
			//点击减少按钮
			$jsNumOpts.on('click','.plut-opt',function(){
				var $this=$(this);
				var $numipt = $this.next('.num-ipt');
				var _numipt=0;
				var _priceRange=$this.parents("tbody").data('proinf')?$this.parents("tbody").data('proinf').priceRange:[[0,0]];
				_priceRange.sort(function(a,b){return a[0]>b[0]?1:-1});
				var _proinfnum=_priceRange[0][0]*1;

				var _numipts=$this.parents("tbody").find(".num-ipt");
				var _plutopt=$this.parents("tbody").find(".plut-opt");
				if($numipt.data("controll")){
					
					
					var _num = $numipt.val() * 1 - 1;
					_num=_num%1>0?_num.toFixed(2):_num;
					_num = _num <= 1 ? 1 : _num;
					if ($numipt.val() < 2) {
						return;
					}
					
					if(_num<2){
						$this.removeClass().addClass('no-plut-opt');
						$numipt.removeClass('hover');
					}
					
					if(_num<999999){//限制文本框最大值为999999，即最多6位数
						$this.siblings('.no-add-opt').removeClass().addClass('add-opt');
					}
					
					$numipt.val(_num);
					cmmn.changeSmt($this);
					/*	
			var $thischeckeds=$this.parents("tbody").find(".jsSltOne:checked");
		$thischeckeds.each(function() {
            var $this=$(this);
			_numipt+=$this.parents('tr').find(".num-ipt").val()*1;
        });
	
		
					_numipts.each(function() {
                   _numipt+=$(this).val()*1;
                });
				

	
					if(_numipt<=_proinfnum){
						$thischeckeds.parents('tr').find(".plut-opt").removeClass().addClass('no-plut-opt');
						$numipt.removeClass('hover');
						return
						};
					*/
					
					//采购单页面保存修改数量(其他页面无需保存)
					if($prchsOrderMain[0]){
						cmmn.saveNum($this,_num);
					}
				}
			});
		}
	}
	
//获取第一个订单的商品信息
	var firstProinf=$('.order-tbl').eq(0).data('proinf');
	
//排除样品提交（即提交样品不需要执行下面的js）	
	var $orderTodys =$('.prchs-order-tbl').find('tbody');
	var $orderTodyarr=[];
	$orderTodys.each(function() {
        var $this=$(this);
		var $thisval=$this.data('proinf')?true:false;
		 $orderTodyarr.push($thisval);
    });

	if($.inArray(true,$orderTodyarr)>-1){
		cmmn.init();
		}

/*提交订单页面优惠券相关js*/
	if($smtOrderMain[0]){
		
		//初始可用优惠券列表中的复选框是可选且未选择状态(未选中状态在前面的cmmn.init()函数的表单重置中实现了，此处只实现可选)
		$jsKycpn.find('input[type=checkbox]').attr('disabled',false);
		
		//展开优惠券
		$cpnBox.on('click','.box-hd',function(){
			if($cpnBoxBd.is(':visible')){
				$cpnBox.removeClass('cpn-box-unfold');
			}else{
				$cpnBox.addClass('cpn-box-unfold');
				var arr=[];
				var $orderTbl=$('.order-tbl');
				var $jsSmtOrderFrm=$('.jsSmtOrderFrm');
				var $orderTbltr=$orderTbl.find("tbody").find("tr");
				//console.log($orderTbltr.length);
				$orderTbltr.each(function() {
                var $this=$(this);
				var _productId=$this.find("input[type=hidden][name=productId]").val();
				var _catid=$this.find("input[type=hidden][name=catid]").val();
				var _shopId=$this.find("input[type=hidden][name=shopId]").val();
				var _price=$this.find("input[type=hidden][name=price]").val();
				arr.push('{"productId":"'+_productId+'","catid":"'+_catid+'","shopId":"'+_shopId+'","price":"'+_price+'"}');
                });
				arr=arr.join(",");
				arr="["+arr+"]";
				//console.log(arr);
				//var jsAllTPrc=cmmn.reFormatPrc($('.jsAllTPrc').html())*1;//订单总金额
				
				//阻止表单重复请求
				if(isSubmit===true){return false;}
				isSubmit=true;
				
				//ajax请求
				$.ajax({
					url:'//i.csc86.com/carOrder/getCouponInfo',
					data:{data:arr},
					type:'post',
					dataType:'json',
					beforeSend:function(){
						$jsKycpn.html('<p class="loading">加载中...</p>');
						$jsBkycpn.html('<p class="loading">加载中...</p>');	
					},
					success:function(data){
						var	status=data.status,
							data=data.data,
							kycpn=data.kycpn,
							bkycpn=data.bkycpn,
							len1=kycpn.length,
							len2=bkycpn.length,
							html='',
							html2='';
						if(status){
							$cpnTab.find('.num1').html(len1);
							$cpnTab.find('.num2').html(len2);
							if(len1<1){
								html='<p class="no-cpn">'+
										'此订单暂无可用的优惠券！您可以<a href="//payment.csc86.com/coupon.search.do" target="_blank">查看所有优惠券</a>了解使用限制！<br/>'+
										'如果您有优惠券号或者实体券，需要先<a href="//payment.csc86.com/coupon.search.do?isOpn=1" target="_blank">激活绑定</a>才能使用！'+
									'</p>';
							}else{
								html+='<ul class="cpn-lst">';
								$.each(kycpn,function(i,n){
									var i=kycpn[i];
									var type=i["type"];
									var maxprc=i["max"];
									
									var maxhtml=(type=='现金劵')?'':maxprc+'-';
									html+='<li data-max="'+maxprc+'" data-cpnprc="'+i["cpnprc"]+'"><input type="checkbox" value="'+i["id"]+'" name="cpn[]" class="g-ml20"><input type="hidden" name="canuse[]" value="'+i["canuse"]+'"><input type="hidden" name="cpnid[]" value="'+i["couponId"]+'"><span class="prc">'+maxhtml+i["cpnprc"]+'</span><span class="desc">'+i["desc"]+'</span><span class="type">'+type+'</span><span class="date">有效期至'+i["date"]+'</span></li>';
								});
								html+='</ul>';
							}
							$jsKycpn.html(html);
							
							if(len2<1){
								html2='<p class="no-cpn">'+
										  '您的账户中暂无有效优惠券，如有优惠券号或者实体券，请先<a href="//payment.csc86.com/coupon.search.do?isOpn=1" target="_blank">激活绑定</a>!'+
									  '</p>';
							}else{
								html2+='<ul class="cpn-lst">';
								$.each(bkycpn,function(i,n){
									var i=bkycpn[i];
									var type=i["type"];
									var maxprc=i["max"];
									var maxhtml=(type=='现金劵')?'':maxprc+'-';
									html2+='<li><span class="prc">'+maxhtml+i["cpnprc"]+'</span><span class="desc">'+i["desc"]+'</span><span class="type">'+type+'</span><span class="date">有效期至'+i["date"]+'</span><span class="g-cred">'+i["reson"]+'</span></li>';
								});
								html2+='</ul>';
							}
							$jsBkycpn.html(html2);		
						}
						//系统异常时
						else{
							$jsKycpn.html('<p class="loading">加载失败，请刷新页面后重试！</p>');
							$jsBkycpn.html('<p class="loading">加载失败，请刷新页面后重试！</p>');	
						}
						isSubmit=false;
					},
					//请求异常时
					error:function(){
						$jsKycpn.html('<p class="loading">加载失败，请刷新页面后重试！</p>');
						$jsBkycpn.html('<p class="loading">加载失败，请刷新页面后重试！</p>');	
						isSubmit=false;
					}
				});
			}
		});
		
		//tab切换
		$cpnTab.on('click','li',function(){
			var $this=$(this);
			var index=$this.index();
			$this.addClass('cur').siblings('li').removeClass('cur');
			$('.cpn-tab-c').eq(index).show().siblings('.cpn-tab-c').hide();
		});
		
		//选择可用优惠券
		$jsKycpn.on('change','input[type=checkbox]',function(){
			var $this=$(this);
			var $cuproduct=$("#cuproduct");
			var $parent=$this.parent();
			var $thiscanuse=$parent.find('input[type="hidden"][name="canuse[]"]').val();
			var $other=$parent.siblings().find('input[type=checkbox]');
			var $jsDpst=$('.jsDpst');
			var cpnPrc=0;//优惠券金额
			var jsAllTPrc=cmmn.reFormatPrc($('.jsAllTPrc').html())*1;//订单总金额
			var payPrc=0;//应付总额
			var yfPrc=$('.jsYfPrc')[0]?cmmn.reFormatPrc($('.jsYfPrc').html()):0;//运费
			if($this.is(':checked')){
				$cuproduct.val($thiscanuse);
				$other.prop('checked',false).attr('disabled',true);
				cpnPrc=$parent.data('cpnprc')*1
			}else{
				$other.attr('disabled',false);
				cpnPrc=0;
			}
			
			if(cpnPrc>=jsAllTPrc){
				payPrc=yfPrc;
			}else{
				payPrc=Math.round(jsAllTPrc*100-cpnPrc*100+yfPrc*100)/100;
			}
			
			//为订金时
			if($jsDpst[0]){
				//为订金比例百分比前面的数字，如30%，则为30
				var deposit=$jsDpst.html().split('%')[0]*1;
				payPrc=Math.round(payPrc*deposit*100/100)/100;
				
			}
			
			$jsCpnPrc.html(cmmn.formatPrc(cpnPrc));
			
			if($jsDpst[0]){
				$('.jsPayDj').html(cmmn.formatPrc(payPrc));//应付定金
			}else{
				$('.jsPayAllTPrc').html(cmmn.formatPrc(payPrc));//应付总额
			}
		});
	}
    module.exports=cmmn;	
});
