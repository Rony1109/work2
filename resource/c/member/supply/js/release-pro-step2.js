/*发布产品：填写基本信息*/
define(function(require, exports, module) {
	require("//res.csc86.com/swfupload/");//上传图片插件
	require('//res.csc86.com/f=v2/l/jui/core.js,v2/l/jui/widget.js,v2/l/jui/mouse.js,v2/l/jui/sortable.js');
	require('//res.csc86.com/v2/c/member/common/js/alertDialog');//按钮弹窗组件
	var _uploadUrl = $('#uploadUrl').val();
	// var ue = require('//res.csc86.com/v2/m/jsM/ueditor.js');
	
	var $prcTab = $('.prc-tab'); //价格右侧容器
	
	var $jsSetRlFrm = $('.jsBasicForm'); //表单form
	
	var $unitsSlt = $('.frm-slt[name=units]'); //计量单位下拉列表
	var $cstmPrc = $('#cstmPrc'); //自定义价格单选框

	var $minimumOrder = $('input[name=minimumOrder]'); //最小起订量
	
	var $supplyquantity = $('input[name=supplyquantity]'); //供货数量
	var $unlimited = $('input[name=unlimited]'); //供货数量处复选框
	
	var $isOfferSample = $('input[name=isOfferSample]'); //是否提供样品单选框
	var $yesSample = $('#yesSample'); //是提供样品单选框
	var $sampleTab = $('.sample-tab'); //是否提供样品单选框父容器
	var $jsYesSmplDtl = $('.jsYesSmplDtl'); //设置样品容器
	var $samplePrc = $jsYesSmplDtl.find('input[name="sample[price]"]'); //样品单价文本框
	var $sampleNum = $jsYesSmplDtl.find('input[name="sample[count]"]'); //样品数量文本框
	var $sampleYf = $jsYesSmplDtl.find('input[name="sample[freight]"]'); //样品运费文本框
	
	var $shExplain=$('.sh-explain');
	var $isThRdo = $('input[name=returns][type=radio]'); //退货单选框
	var $isChngRdo = $('input[name=changes][type=radio]'); //换货单选框
	
	var $noZxjy = $('#noZxjy'); //不开通在线交易单选框
		
	var $jsReviewBtn = $('.jsReviewBtn'); //预览产品按钮
	
	artDialog.tip = function(msg, closeTime, callback) {
		this({
			id: 'sid',
			content: msg || '提示信息',
			title: '消息提示',
			opacity:0.3,
			fixed:true,
			lock:true,			
			icon: 'mem-w',
			width:0,
			padding:  '20px 35px 20px 10px',
			time: closeTime || 3,
			close: callback || null
		});
	};


	artDialog.loading = function(msg) {
		this({
			id: 'loading',
			content: msg || '提示信息',
			title: '消息提示',
			opacity:0.3,
			fixed:true,
			lock:true,			
			icon: 'mem-w',
			padding:  '20px 35px 20px 10px',
			init: function() {
				$(this.DOM.close).remove();
			}
		});
	};
	
	
	var upload = function(callback){		
		
				$('.jsUploadBtn').each(function(){
		var id=$(this).attr('id'),data=$(this).data("num");
		 new SWFUpload(uploadSettings({
			upload_url: _uploadUrl,
			//type:"androidPhoto",
			button_placeholder_id:id,
			button_action:SWFUpload.BUTTON_ACTION.SELECT_FILES,
			file_types: "*.jpg;*.jpeg;*.png",
			file_size_limit : "3MB",
			button_image_url : "//res.csc86.com/v2/c/member/supply/images/btnbac.png",
			button_width : 80,
			button_height : 80,
			file_upload_limit : 0,
			button_text_left_padding:16,
			button_text_top_padding: 30,
			button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_text: '<span class="btncor">上传图片</span>',
			button_text_style:".btncor{color:#666666;font-size:12px}",
			upload_success_handler:function(file, serverData){
				var response =  eval('(' + serverData + ')');
				if(response.result != "success"){
					var msg = response.msg || "上传失败，请稍后重试！";
					artDialog.tip(msg,2);
					return;
				} else {
					var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]);
					var $th=$('#SWFUpload_'+id);
					var $thparent=$th.parents('.tjtp li');
					//$thparent.find('.p1').html("<img  src="+url+file.type+">");
					$thparent.find('.p0 img').attr("src",url);
					var key=response.key.replace(/\//,"")+file.type;
					var $imglink = $thparent.find('input');
				    $imglink.val(response.key);
					
					//this.setButtonText('<span class="btncor">上传图片</span>');
					if(callback){callback()};

				}
			}
		}));
	});
};
	if($('#productId').val()){
		upload();
		}
	var common=require('./release-pro.js');//发布产品相关页面公用js
	var valid=common.valid;//表单验证
	
	var $jsBasicForm=$('.jsBasicForm');//表单form
	var $proTitle=$('#proTitle');//产品标题
	
	var $proAttrTbl=$('.pro-attr-table');//产品属性table容器
	var $proName=$('#proName');//产品名称
	var $proBrnd=$('#proBrnd');//品牌/生产商
	var $zldj=$('#zldj');//质量等级
	var $sccd=$('#sccd');//生产产地
	var $proNmbr=$('#proNmbr');//产品编码
	var $prprtySlt=$('.frm-slt[name^=productPropertys]');//动态生成的产品属性下拉列表
	var $prprtyRadio=$('input[name^=productPropertys][type=radio]');//动态生成的产品属性单选框
	var $prprtyCheckBox=$('input[name^=productPropertys][type=checkbox]');//动态生成的产品属性复选框
	var $prprtyIpt=$('input[name^=productPropertys][type=text]');//动态生成的产品属性文本框
	
	var $proPicBox=$('.pro-pic .frm-value');//产品图片列表容器
	var $picIpt=$('input[name^="pic["');//存放产品图片的隐藏域

	
	var $prodtlDescr=$('.prodtl-descr .frm-value');//详细说明右侧容器
	var isSubmit = false;//阻止重复提交用的

	
var sljs=function(){
						
		var $jsysks=$('.jsysks');
		var $jsggcn=$('.jsggcn');
		var $jscpggk=$('.jscpggk');
		var $kssltables = $('.kssltable');
		var arr=[];
		var arr2=[];
		var arr3=[];
		var $jsysksinput=$jsysks.find('input');
		var $jsggcninput=$jsggcn.find('input');
		var $jscpggkinput=$('.jscpggk').find('.ipt-txt');
		var len= $jsggcninput.length;
		var html='';
		var nums=0;
		var $speekval=$('input[name=speak]:checked').val();

		
		
		$.each($jscpggkinput,function(){
			var me=$(this);
			if(me.val()){
				arr.push(true);
				$('.jsnewtpts').show();
				if($speekval==1){
					$('.jsksslk').show();
					}else if($speekval==2){
					$('.jsggbjk').show();
						}
				
				}
			});

			if(!arr.length){
				$('.jsnewtpts').hide();
				if($speekval==1){
					$('.jsksslk').hide();
					}else if($speekval==2){
					$('.jsggbjk').hide();
						}
				};
				
	
	
	if($speekval==1){
				var  $kssltable = $('.kssltable').eq(0);
				}else if($speekval==2){
				var  $kssltable = $('.kssltable').eq(1);
					}else{
				var $kssltable = $('.kssltable').eq(0);		
						}
		
		
		
	function inp(i,val1,val2){
		if($speekval==1){
				 return '<td><input name="cscSkuProducts['+i+'][amount]" type="text" value="'+val1+'"></td>';
				}else if($speekval==2){	
				 return '<td><input name="cscSkuProducts['+i+'][price]" value="'+val2+'" type="text"></td><td><input name="cscSkuProducts['+i+'][amount]" value="'+val1+'" type="text"></td>';	
					}
		
		}			
			

		$.each($jsysksinput,function(){
			var me=$(this);
			if(me.val()){
				arr2.push(true);
				}
			});
			
		$.each($jsggcninput,function(){
			var me=$(this);
			if(me.val()){
				arr3.push(true);
				}
			});	
		
		
		if(arr2.length==0){
				$.each($jsggcninput,function(i){
				var _me=$(this);
				var _meval =_me.val();
				var $thisclass=_me.data("tpnum");
				if(_meval){
				var $thisdatas1=_me.data("datas1")?_me.data("datas1")[0]?_me.data("datas1")[0]:"":"";
				
				var $thisdatas2=_me.data("datas2")?_me.data("datas2")[0]?_me.data("datas2")[0]:"":"";
						html+='<tbody class="'+$thisclass+'"><tr><td></td><td>'+_meval+'</td><input name="cscSkuProducts['+nums+'][color]" type="hidden" value=""><input name="cscSkuProducts['+nums+'][size]" type="hidden" value="'+_meval+'">'+inp(nums,$thisdatas1,$thisdatas2)+'</tr></tbody>';
				}	
				nums++;
			});		
					}
			
			$.each($jsysksinput,function(m){
				var me=$(this);
				var meval =me.val();
				var $thisclass=me.data("tpnum");
				var flg=true;	
				if(meval){				
				    html+='<tbody class="'+$thisclass+'">';
				if(arr3.length==0){
				var $thisdatas1=me.data("datas1")?me.data("datas1")[0]?me.data("datas1")[0]:"":"";
				var $thisdatas2=me.data("datas2")?me.data("datas2")[0]?me.data("datas2")[0]:"":"";		
				html+='<tr><td>'+meval+'</td><td></td><input name="cscSkuProducts['+nums+'][color]" type="hidden" value='+meval.replace(/\"/,"&quot;").replace(/\'/,"&apos;")+'><input name="cscSkuProducts['+nums+'][size]" type="hidden" value="">'+inp(nums,$thisdatas1,$thisdatas2)+'</tr>';
				nums++;
					}else{
					$.each($jsggcninput,function(i){
				var _me=$(this);
				var _meval =_me.val();
				if(_meval){
					//console.log(me.data("datas1"));
				
				var $thisdatas1=me.data("datas1")?me.data("datas1")[i]?me.data("datas1")[i]:"":"";
				var $thisdatas2=me.data("datas2")?me.data("datas2")[i]?me.data("datas2")[i]:"":"";		
							if(flg){
							html+='<tr><td rowspan="'+arr3.length+'">'+meval+'</td><td>'+_meval+'</td><input name="cscSkuProducts['+nums+'][color]" type="hidden" value='+meval.replace(/\"/,"&quot;").replace(/\'/,"&apos;")+'><input name="cscSkuProducts['+nums+'][size]" type="hidden" value='+_meval.replace(/\"/,"&quot;").replace(/\'/,"&apos;")+'>'+inp(nums,$thisdatas1,$thisdatas2)+'</tr>';
							flg=false;
							}else{
					html+='<tr><td>'+_meval+'</td><input name="cscSkuProducts['+nums+'][color]" type="hidden" value='+meval.replace(/\"/,"&quot;").replace(/\'/,"&apos;")+'><input name="cscSkuProducts['+nums+'][size]" type="hidden" value='+_meval.replace(/\"/,"&quot;").replace(/\'/,"&apos;")+'>'+inp(nums,$thisdatas1,$thisdatas2)+'</tr>';
					
					}
				nums++;
					}
					
					
			});	
						
						}
				
			html+='</tbody>';
					}
				});

		$kssltables.find('tbody').remove();
		$kssltable.append(html);
			
		
		/*$.each($kssltables.find('tbody'),function(){
			var $this=$(this);
			var $thisclass=$this.attr('class');
			var $thisamount=$this.find('input[name*="[amount]"]');
			var $thisprice=$this.find('input[name*="[price]"]');
			
			var arr4=[];
			var arr5=[];
			$.each($thisamount,function(){
				var me=$(this);
				var meval=me.val();
				arr4.push(meval);
				});
			$.each($thisprice,function(){
				var me=$(this);
				var meval=me.val();
				arr5.push(meval);
				});	
			if(arr2.length>0){
		$('.jsysks').find('input[data-tpnum='+$thisclass+']').data("datas1",arr4);	
		$('.jsysks').find('input[data-tpnum='+$thisclass+']').data("datas2",arr5);
			}else{
		$('.jsggcn').find('input[data-tpnum='+$thisclass+']').data("datas1",arr4);	
		$('.jsggcn').find('input[data-tpnum='+$thisclass+']').data("datas2",arr5);
			}
			});*/
	};
	
	
	var cfvalue=function(obj,blurobj,tsy){
		var nums2=0;
		var trfa=true;
		$.each(obj,function(){
				var me=$(this).val();
				if(blurobj.val()==me&&blurobj.val()){
				nums2++;
					}
					
				});
				if(nums2>1){
				blurobj.val('');
				artDialog.tip(tsy,3,function(){blurobj.focus();});
				trfa=false;
				return false;
					}
				return trfa;	
		}

	$('.jscpggk').on('keyup','.ipt-txt',function(){
		var $this=$(this);
		this.value=this.value.replace(/\;/g,'；');
	});
	
		$('.jsysks').on('blur','.ipt-txt',function(){
		var $this=$(this);
		var arr=[];
		var $thisval=$this.val();
		var $thistpnum = $this.data("tpnum");
		var $flg=$this.data("flg");
		var $kssltable = $('.kssltable');
		var $jsCmmnLst = $('.jsCmmnLst');
		var num=$thistpnum.substr(5);
		var innum=0;
		var $tjtpli= $('.tjtp').find('li[class^="tpnum"]');
		var reobj=null;
		
			if(!cfvalue($('.jsysks').find('.ipt-txt'),$this,'颜色/款式中名称重复，请重新输入！')){
				return false;
				};
				

			sljs();	
			

				
		if($thisval){
			if($flg){
				$.each($tjtpli,function(){
				var $this=$(this);
				if($this.attr('class').substr(5)*1>num*1){
					reobj = $this;
					return false;
					}
				});
				
				if(reobj){
				$('.tjtp').find(reobj).before('<li class="'+$thistpnum+'"><p class="p0"><a><img class="bacimg" src="//res.csc86.com/v2/c/member/supply/images/1px-white.png"></a></p><p class="p1"><img  id="uploadBtn"'+num+' data-num="'+num+'" class="jsUploadBtn" src="//res.csc86.com/image/no-img.png" width="80" height="80"></p><p class="p2" title="'+$thisval+'">'+$thisval+'</p><input type="hidden" name="color_style_img['+num+']" value="" class=></li>');		
					}else{
				$('.tjtp').find('ul').append('<li class="'+$thistpnum+'"><p class="p0"><a><img class="bacimg" src="//res.csc86.com/v2/c/member/supply/images/1px-white.png"></a></p><p class="p1"><img  id="uploadBtn"'+num+' data-num="'+num+'" class="jsUploadBtn" src="//res.csc86.com/image/no-img.png" width="80" height="80"></p><p class="p2" title="'+$thisval+'">'+$thisval+'</p><input type="hidden" name="color_style_img['+num+']" value="" class=></li>');	
					}
			
			upload();
			$this.data({"flg":0});
			}else{
			$('.tjtp').find('li.'+$thistpnum).find('.p2').text($thisval).attr('title',$thisval);
				}
			
		}else{
			$this.data({"flg":1});
			$('.tjtp').find('.'+$thistpnum).remove();
		
			}
		});
		
		
	$('.jsggcn').on('blur','.ipt-txt',function(){
		var $this=$(this);
		var $thisval=$this.val();
if(!cfvalue($('.jsggcn').find('.ipt-txt'),$this,'尺码/规格中名称重复，请重新输入')){
	return false;
	}		
			sljs();
		});	
		
		



$('.kssltable').on('keyup','input[name^="cscSkuProducts["',function(){
				this.value=this.value.replace(/[^0-9\.]+/g,'');
				this.value=this.value.replace(/[.]+/g,'.');
				this.value=this.value.replace(/^[.]/g,'');
				this.value=this.value.replace(/([.].*)([.])/g,'$1');
				this.value=this.value.replace(/(^[0-9]{1,6}\.[0-9]{2})(.*)/g,"$1");
				if(this.value>=999999){//限制文本框最大值为999999，即最多6位数
					this.value=999999;
				}
	});
	

$('.kssltable').on('blur','input[name*="[amount]"]',function(){
	var $this=$(this);
	var arr=[];
	var $thisparent=$this.parents('.kssltable');
	var $thistbody=$this.parents('tbody');
	var $thisclass=$thistbody.attr('class');
	var $thistr=$this.parents('tr');
	$.each($thistbody.find('input[name*="[amount]"]'),function(){
		var meval=$(this).val();
		arr.push(meval);
		});
		
		if($thistr.find('input[name*="[color]"]').val()){
		$('.jsysks').find('input[data-tpnum='+$thisclass+']').data("datas1",arr);	
			}else{
		$('.jsggcn').find('input[data-tpnum='+$thisclass+']').data("datas1",arr);
				}
		
	});

$('.kssltable').on('blur','input[name*="[price]"]',function(){
	var $this=$(this);
	var arr=[];
	var $thisparent=$this.parents('.kssltable');
	var $thistbody=$this.parents('tbody');
	var $thisclass=$thistbody.attr('class');
	var $thistr=$this.parents('tr');
	$.each($thistbody.find('input[name*="[price]"]'),function(){
		var meval=$(this).val();
		arr.push(meval);
		});
		
		if($thistr.find('input[name*="[color]"]').val()){
		$('.jsysks').find('input[data-tpnum='+$thisclass+']').data("datas2",arr);	
			}else{
		$('.jsggcn').find('input[data-tpnum='+$thisclass+']').data("datas2",arr);		
				}
		
	});	


if($('#productId').val()){
	$.each($('.kssltable').find('tbody'),function(){
			var $this=$(this);
			var $thisamount=$this.find('input[name*="[amount]"]').eq(0);
			var $thisprice=$this.find('input[name*="[price]"]').eq(0);
			$thisamount.trigger('blur');
			$thisprice.trigger('blur');
			});	
	}



	//全部价格相同
	$('.jsalljgsame').on('click',function(){
		var $this=$(this);
		var $thisparents=$this.parents('.kssltable');
		var $sl=$thisparents.find('input[name*="[price]"]');
		if($this.is(':checked')){
			$sl.val($sl.eq(0).val());
		//	$sl.prop('readonly',true);
			}else{
			//$sl.prop('readonly',false);	
				}
		});	
		
	//全部数量相同	
	$('.jsallslsame').on('click',function(){
		var $this=$(this);
		var $thisparents=$this.parents('.kssltable');
		var $sl=$thisparents.find('input[name*="[amount]"]');
		if($this.is(':checked')){
		$sl.val($sl.eq(0).val());
		//$sl.prop('readonly',true);
		}else{
			//$sl.prop('readonly',false);	
				}
	});	
		
			
	var colornums=0;	
	//添加颜色/款式
	$('.jsAddColor').on('click',function(){
		var $this=$(this);
		var $ul=$this.parent();
		var arr=[];
		var arr2=[];
		
		var len=$this.parent().find('input').length;
		var $thisprevint=$this.prev().find('input');
		var $thisprevintdata=$thisprevint.data('num');
				
		if($this.prev()[0]){
			colornums= $thisprevintdata*1+1;
			}
			
		var tprNum = len > 0 ? len : 0;
		var html = '<li><input class="ipt-txt" data-flg="1" data-num="'+colornums+'" data-tpnum="tpnum'+colornums+'" type="text" maxlength="10" value="" name="color_style[' + colornums + ']"><span></span></li>';
		if(len+1>20){
			artDialog.tip('最多添加20种！',3);
			}else{
			$this.before(html);
			
			if($ul.hasClass('jsysks')){
			
				if($ul.find('.ipt-txt').length==1){
					$.each($('.jsggcn').find('.ipt-txt'),function(){
						var me=$(this);
						var meval=me.val();
						var medatas1=me.data("datas1");
						var medatas2=me.data("datas2");
						if(meval&&medatas1){
							arr.push(medatas1);
							}
						if(meval&&medatas2){
							arr2.push(medatas2);
							}	
						});
						
					$ul.find('.ipt-txt').data("datas1",arr);	
					$ul.find('.ipt-txt').data("datas2",arr2);
					};		
			
			
			};

			}
		
		
	});
	
		
		var sizenums=0;
	//添加尺码/规格
	$('.jsAddSize').on('click',function(){
		var $this=$(this);
		var len=$this.parent().find('input').length;
		var $thisprevint=$this.prev().find('input');
		var $thisprevintdata=$thisprevint.data('num');

		if($this.prev()[0]){
			sizenums= $thisprevintdata*1+1;
			}
		var tprNum = len > 0 ? len : 0;
		var html = '<li><input class="ipt-txt" data-flg="1" data-num="'+sizenums+'" data-tpnum="tpnum'+sizenums+'" type="text" maxlength="15" value="" name="size_property[' + sizenums + ']"><span></span></li>';
		if(len+1>20){
			artDialog.tip('最多添加20种！',3);
			}else{
			$this.before(html);
			}
	});
	

			
			
	var $prcRadio = $('input[name=speak]'); //报价方式
		$prcRadio.on('change', function() {
		var $this = $(this);
		var val = $this.val();
		var  $kssltable = $('.kssltable');	
		
		var $jsysgginputs=$('.jscpggk').find('input');
		var $jsysgginputsarr=[];
		
			$.each($jsysgginputs,function(){
				var me=$(this);
				if(me.val()){
					$jsysgginputsarr.push(true);
					}
				});
				
		
			
		if (val == "1") {
			$('.jskssl').show();
			$('.jsggbj').hide();
			if($jsysgginputsarr.length){$('.jsksslk').show();$('.jsggbjk').hide();}
			if($('.jsysks').find('.ipt-txt').length>0){
			$('.jsysks').find('.ipt-txt').eq(0).trigger('blur');
			}else if($('.jsggcn').find('.ipt-txt').length>0){
			$('.jsggcn').find('.ipt-txt').eq(0).trigger('blur');
			};
		}else if(val == "2") {
			if(!$jsysgginputsarr.length){
				$.tip({
				content: '请先添加产品颜色和规格！',
				closeTime: 5
			});
			$this.prop('checked',false);
			$('input[name="speak"][value="1"]').prop('checked',true);
			$('input[name="speak"][value="1"]').trigger('change');
			return false;
				}
			
			$('.jskssl').hide();
			$('.jsggbj').show();
			if($jsysgginputsarr.length){$('.jsksslk').hide();$('.jsggbjk').show();}
			if($('.jsysks').find('.ipt-txt').length>0){
			$('.jsysks').find('.ipt-txt').eq(0).trigger('blur');
			}else if($('.jsggcn').find('.ipt-txt').length>0){
			$('.jsggcn').find('.ipt-txt').eq(0).trigger('blur');
			};
		}else if(val == "3") {
			
			if($('input[name="isOfferSample"]:checked').val()=="N"){
				$('#noTrade').prop('checked', true);
				$('#yesTrade').prop('checked', false);
				}
				
			$('.jskssl').hide();
			$('.jsggbj').hide();
			$('.jsksslk').hide();
			$('.jsggbjk').hide();
			
			$kssltable.find('tbody').remove();
			}
	});
	
	
	
	//添加价格区间
	
	var $jsCstmProDtl = $('.jsCstmProDtl'); //自定义价格具体内容的容器
	var $prcTbl = $jsCstmProDtl.find('.prc-table');
	var $prcTbody = $prcTbl.find('tbody');
	var units = '单位'; //用来保存单位
	
	$('.jsAddPrc').on('click', function() {
		var len = $prcTbody.find('tr').length + 1;
		var html = '<tr><td><input class="ipt-txt jsCgNum" type="text" name="productCustomprices[' + (len - 1) + '][minimum]" value="" maxlength="6"> <span><em class="jsUnit">' + units + '</em>(含)以上</span></td><td><input class="ipt-txt jsPriceTxt" type="text" name="productCustomprices[' + (len - 1) + '][price]" value=""> <span>元/<em class="jsUnit">' + units + '</em></span></td></tr>';
		var num = (3 - len) > 0 ? 3 - len : 0;
		var sTips = '( 最多还可添加' + num + '组 )';
		$(this).find('em').html(sTips)
		if (len < 4) {
			$prcTbody.append(html);
		} else {
			$.tip({
				content: '最多只能添加三个区间！',
				closeTime: 2
			});
		}
	}).on('click', 'em', function() {
		return false;
	});

	
	
	//删除颜色/款式(尺码/规格)
 var ggcmindex;	
	$('.jsCmmnLst').on('mouseenter','li:not(.add-btn)',function(){
		$(this).find('span').show();
			if($(this).parents('ul').is('.jsggcn')){
			  ggcmindex=$(this).index();	
			}		
			
	}).on('mouseleave','li:not(.add-btn)',function(){
		$(this).find('span').hide();
	});
	
		$('.jsCmmnLst').on('click','li span',function(){
		var $this=$(this);
		var $thisinput=$this.siblings('.ipt-txt');
		var $li=$this.parent();
		var $ul=$li.parent();
		var $thisdatas1=$thisinput.data("datas1");
		var $thisdatas2=$thisinput.data("datas2");
		$li.remove();
		if($ul.hasClass('jsysks')){
			var val = $li.find('input').data("tpnum");
			$('.tjtp').find('.'+val).remove();
			
				if(!$ul.find('.ipt-txt').length){
					$.each($('.jsggcn').find('.ipt-txt'),function(i){
						var me=$(this);
						var meval=me.val();
						if(meval&&$thisdatas1){
							me.data("datas1",$thisdatas1[i]);
							}
						if(meval&&$thisdatas2){
							me.data("datas2",$thisdatas2[i]);
							}	
						});
					};		
			
			
			};
		
		
		if($ul.hasClass('jsggcn')){
			$.each($('.jsysks').find('.ipt-txt'),function(){
			
			var $this=$(this);
			var $thisval=$(this).val();
			var $thisdatas1=$this.data('datas1');
			var $thisdatas2=$this.data('datas2');
			if($thisdatas1&&$thisval){
				$thisdatas1.splice(ggcmindex,1);
				$this.data("datas1",$thisdatas1);
				}
			if($thisdatas2&&$thisval){
				$thisdatas2.splice(ggcmindex,1);
				$this.data("datas2",$thisdatas2);
				}	
			});
			}	
			
		sljs();
		$ul.find('input').each(function(i) {
			var myName = $(this).attr('name');
			var Reg = /^(color_style)/g;
			if (Reg.test(myName)) {
				$(this).attr('name', 'color_style[' + i + ']');
			} else {
				$(this).attr('name', 'size_property[' + i + ']');
			}
		})
	})	
	
	//添加产品属性
	$('.jsAddAttr').on('click',function(){
		var $this=$(this);
		var $tr=$this.parents('tr');
		var $table=$tr.parents('.pro-attr-table');
		var len = $table.find('.jsCstmAttr').length;
		var i = len > 0 ? len : 0
		var html='<tr class="jsCstmAttr">\
					  <th>自定义属性：</th>\
					  <td><input class="g-c8 ipt-txt" type="text" name="productCusPropertys[' + i + '][propertyname]" value="属性" placeholder="属性" maxlength="10"><input class="g-c8 ipt-txt" type="text" name="productCusPropertys[' + i + '][property]" value="属性值" placeholder="属性值" maxlength="15"><a class="del-opt jsDelOpt">删除</a></td>\
				  </tr>';
		$tr.before(html);
	});
	
	//产品属性获取和失去焦点时、删除产品属性
	$proAttrTbl.on('focus blur','.jsCstmAttr .ipt-txt',function(e){
		var $type = e.type,
			$this = $(this),
			$val = $this.val();
		if ($type == 'focusin' || $type == 'focus') {
			if ($val == "属性" || $val == "属性值") {
				$this.val('').removeClass('g-c8');
			}
		} else if (e.type == "focusout" || $type == 'blur') {
			if ($val == "") {
				$this.addClass('g-c8');
				$this.val($this.attr('placeholder'));
			}
		}
	}).on('click','.jsDelOpt',function(){
		var $this=$(this);
		var $tr=$this.parents('.jsCstmAttr');
		var $table=$this.parents('.pro-attr-table');
		$tr.remove();
		$table.find('.jsCstmAttr').each(function(i){
			var $this=$(this);
			$this.find('.ipt-txt:first').attr('name', 'productCusPropertys[' + i + '][propertyname]');
			$this.find('.ipt-txt:last').attr('name', 'productCusPropertys[' + i + '][property]');
		})
		return false;
	});
	
	//品牌/生产商 质量等级 下拉列表选择其他时，显示文本框
	$('#proBrnd,#zldj').on('change',function(){
		var $this=$(this);
		var $otherTxt=$this.siblings('.brnd-other-txt');
		var val=$this.val();
		if(val==='other'){
			$otherTxt.show();
		}else{
			$otherTxt.hide();
			if(!$.trim($otherTxt.val())){
				$otherTxt.removeClass('frm-error');
			}
		}
	});



	
	
	//产品属性里动态生成的下拉列表选择其他时，显示文本框
	$prprtySlt.on('change',function(){
		var $this=$(this);
		var $option = $this.find(":selected");
		var $otherTxt=$this.siblings('.other-txt');
		var val=$this.val();
		var html='<input class="ipt-txt other-txt" type="text" name="" value="" maxlength="15">';
		if(/其他/.test($option.text())){
			if(!$otherTxt[0]){
				$this.after(html);
			}else{
				$otherTxt.show();
			}
		}else{
			if($otherTxt[0]){
				$otherTxt.hide();
				if(!$.trim($otherTxt.val())){
					$otherTxt.removeClass('frm-error');
				}
			}
		}
	});
	
	//其他（文本框）值改变时，对应的下拉列表其他的值也跟着改变
	$proAttrTbl.on('keyup','.other-txt',function(){
		var $this=$(this);
		var val=$this.val();
		$this.siblings('.frm-slt').find('option:contains("其他")').val('其他|' + val);
	});
	
	//产品图片排序函数
	function sortable() {
		$(".jsPropicLst").sortable({
			connectWith: '.jsPropicLst li',
			cursor: "move",
			revert: true, //动画
			axis: 'x',
			distance: 5,
			helper: 'clone',
			placeholder: 'placeholder',
			update: function() {
	
			}
		});
	}
	
	//设置水印 和 上传图片
	var _addWtrMrk = $('#addWtrMrk');
	var _uploaded = $('.jsPropicLst .del-pic');
	var _uploadedLen = _uploaded.length;
	var swfu = new SWFUpload(uploadSettings({
		upload_url: _uploadUrl,
		post_params: {
			ismark: _addWtrMrk.is(':checked') ? 1 : 0
		},
		button_placeholder_id: "fileupload",
		button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
		button_image_url: '//res.csc86.com/v2/c/member/supply/css/img/upload-btn.png',
		button_text: '<span class="upload-btn">批量上传图片</span>',
		button_text_style:".upload-btn{color:#444444;}",
		button_width: 94,
		file_upload_limit: 4,
		button_text_left_padding: 10,
		button_text_top_padding: 2,
		swfupload_loaded_handler: function() {
			var stats = swfu.getStats();
			stats.successful_uploads = _uploadedLen;
			swfu.setStats(stats);
		},
		file_queue_error_handler: function(file, errorCode, message) {
			var msg = "您选择的图片错误，请重新选择图片上传！";
			switch (errorCode) {
				case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
					msg = "您选择的图片大小错误，请重新选择图片上传！";
					break;
				case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
					try {
						msg = "您选择的图片超过最大(" + this.settings.file_size_limit + ")限制，请处理后上传！"
					} catch (e) {
						msg = "您选择的图片大小超过最大限制，请处理后上传！";
					}
					break;
				case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
					msg = "您的图片格式有误！";
					break;
				case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
					msg = "最多只能上传4张图片！";
					break;
				default:
					msg = "您选择的图片错误，请重新选择图片上传！";
			};
			csc.useDialog(function() {
				csc.alert(msg);
			});
		},
		//上传图片成功操作
		upload_success_handler: function(file, serverData) {
			var $this = this;
			var data = eval("(" + serverData + ")");
			var stats = $this.getStats();
			if(data){
				if (data.result == "success") {
					var _img = $('.propic-lst li img[src$="no-img.png"]:first');
					var _li = _img.parent('li');
					_img.attr('src', csc.url("img", data.key.replace(/(\d+)\.(.{3,4})$/, "thumbs/$1_t1.$2")));
					_li.append('<a class="del-pic" href="javascript:void(0);"title="删除图片">&times;</a>')
					_li.find('input[type=hidden]').val(data.key);
	
					//var stats = $this.getStats();
					//sucNum = stats.successful_uploads;
	
					//图片排序
					sortable();
				} else {
					csc.alert(data.msg);
				}
			}else{
				csc.alert('上传图片失败，请重新上传！');
			}
			stats.successful_uploads =$('.jsPropicLst .del-pic').length;
			$this.setStats(stats);
		}
	}));

	_addWtrMrk.on('click', function() {
		var isChecked = _addWtrMrk.is(':checked');
		swfu.addPostParam('ismark', isChecked ? 1 : 0);
		if (isChecked) {
			$.get('//member.csc86.com/ajax/watermarkCheck', function(data) {
				var oStatus = data.status;
				switch (oStatus) {
					case '-1':
						$.tip({
							content: '您尚未登录，请登录后在设置水印！',
							closeTime:2,
							closeCallback: function() {
								window.location.reload();
							}
						});
						break;
					case '0':
						$.tip({
							content: '您尚未设置水印，请先设置水印，才能正确的显示水印！',
							closeTime:2.5,
							closeCallback: function() {
								_addWtrMrk.prop('checked', false);
							}
						});
						break;
					default:
						break;
				}
			}, 'jsonp');
		} else {

		}
	});

	//若初始时已经有上传了的图片则可以移动排序
	if (_uploaded.length > 0) {
		sortable();
	}

	//点击删除图片
	$('.jsPropicLst li').delegate('.del-pic', 'click', function() {
		var _this = $(this);
		var _li = _this.parent();
		var _len = _li.parent().find('.del-pic').length - 1;
		$('.jsPropicLst').append(_li);
		_this.siblings('img').attr('src', '//res.csc86.com/image/no-img.png');
		_this.siblings('input[type=hidden]').val('');
		_this.remove();
		var stats = swfu.getStats();
		stats.successful_uploads = _len;
		swfu.setStats(stats);
		return false;
	});
	

	//表单验证公用函数
	var validFrm={
		frmRadio:function(obj,tipObj,nullTip){//单选框验证
			var static;
			var isChecked=obj.is(':checked');
			if(!isChecked){
				valid.errorTip(tipObj,nullTip);
				static=false;
			}else{
				tipObj.find('.valid-error').remove();
				static=true;
			}
			return static;
		},
		iptTxt:function(obj){//文本框和下拉列表(产品属性里动态生成的除外)
			var isMust=true,
				tipObj=obj.parent(),
				nullTip='',
				errorTip='',
				regx=null,
				type=0,
				val=$.trim(obj.val()),
				frmName=obj.attr('name');
			switch(frmName){
				case 'title'://产品标题
				errorTip='请输入产品标题，建议包含产品关键字，5-40字符';
				nullTip='请输入产品标题，建议包含产品关键字，5-40字符';
				regx=/^[\w\W]{5,40}$/;
				break;
				
				case 'productName'://产品名称
				errorTip='请填写产品名称，20个字符以内';
				nullTip='请填写产品名称，20个字符以内';
				regx=/^[\w\W]{1,20}$/;
				break;
				
				case 'productcd'://生产产地
				errorTip='请填写产地，15个字以内';
				nullTip='请填写产地，15个字以内';
				regx=/^[\w\W]{1,15}$/;
				break;
				
				case 'units': //计量单位下拉列表
					errorTip = '请选择计量单位';
					regx = /^[0-9]+$/;
					break;
					
				
				case 'brand_producer':
				nullTip='请选择或填写品牌/生产商，15个字以内';
				if(val==='other'){
					obj.removeClass('frm-error');
				}
				break;
				
				case 'productzldj':
				nullTip='请选择或填质量等级，15个字以内';
				if(val==='other'){
					obj.removeClass('frm-error');
				}
				break;
				
				case 'brand_producer_other'://品牌生产商处的其他文本框
				errorTip='请选择或填写品牌/生产商，15个字以内';
				nullTip='请选择或填写品牌/生产商，15个字以内';
				regx=/^[\w\W]{1,15}$/;
				break;
				
				case 'productzldj_other'://品牌生产商处的其他文本框
				errorTip='请选择或填质量等级，15个字以内';
				nullTip='请选择或填质量等级，15个字以内';
				regx=/^[\w\W]{1,15}$/;
				break;
				
				case 'sample[price]': //样品单价文本框
					nullTip = '请填写样品单价，大于或等于0，最多2位小数，6位数以内';
					errorTip = '请填写样品单价，大于或等于0，最多2位小数，6位数以内';
					type = 1;
					break;
				case 'sample[count]': //样品数量文本框
					nullTip = '请填写样品数量，只可输入大于0的整数，不超过6位数';
					errorTip = '请填写样品数量，只可输入大于0的整数，不超过6位数';
					regx = /^[1-9][0-9]{0,5}$/;
					break;
				case 'sample[freight]': //样品运费文本框
					nullTip = '请填写样品运费，大于或等于0，最多2位小数，6位数以内';
					errorTip = '请填写样品运费，大于或等于0，最多2位小数，6位数以内';
					type = 1;
					break;
				case 'supplyquantity': //库存数量文本框
					nullTip = '请填写库存数量，只可输入大于0的整数，不超过6位数'
					errorTip = '请填写库存数量，只可输入大于0的整数，不超过6位数';
					regx = /^[1-9][0-9]{0,5}$/
					break;	
				case 'minimumOrder': //库存数量文本框
					nullTip = '请填写最小起订量，只可输入大于0的整数，不超过6位数'
					errorTip = '请填写最小起订量，只可输入大于0的整数，不超过6位数';
					regx = /^[1-9][0-9]{0,5}$/
					break;	
					
				
				
				case 'productNumber'://产品编码
				isMust=false;
				errorTip='只可输入英文和数字';
				regx=/^[a-zA-Z0-9]{0,15}$/;	
				break;
			}
			if(/\[propertyname\]$/.test(frmName)){//自定义属性中的属性名
				isMust=false;
				errorTip='只可输入汉字和英文，10个字以内';
				regx=/^[\u4e00-\u9fa5a-zA-Z]{0,10}$/ ;	
			}
			return valid.init({
				isMust:isMust,
				obj:obj,
				tipObj:tipObj,
				nullTip:nullTip,
				errorTip:errorTip,
				regx:regx,
				type:type
			});	
		},
		frmDtIpt:function(obj){//产品属性里动态生成的文本框和下拉列表
			var isMust=true,
				tipObj=obj.parents('td'),
				nullTip='',
				errorTip='',
				regx=null,
				val=$.trim(obj.val()),
				frmName=obj.attr('name'),
				$hidden=tipObj.find('input[name^=productPropertys][type=hidden]'),
				isRequire=$hidden.val(),
				nameTxt=$hidden.data('pname'),
				frmType=obj.attr('type');
			if(isRequire!='Y'){
				isMust=false;		
			}
			switch(frmType){
				case 'text'://文本框
				if(obj.hasClass('other-txt')){
					nullTip='请选择或填写'+nameTxt+'，15个字以内';
					errorTip='请选择或填写'+nameTxt+'，15个字以内';
					regx=/^[\w\W]{1,15}$/;
				}
				if(/^productPropertys/.test(frmName)){//动态生成的产品其他属性(文本框)
					nullTip='请填写'+nameTxt;
				}
				break;
				default://下拉列表
				nullTip='请填写'+nameTxt;
				if(obj.find('option:contains("其他")')[0]){
					nullTip='请选择或填写'+nameTxt+'，15个字以内';
				}
				if(/其他/.test(val)){
					obj.removeClass('frm-error');
				}
				break;
			}
			return valid.init({
				isMust:isMust,
				obj:obj,
				tipObj:tipObj,
				errorTip:errorTip,
				nullTip:nullTip,
				regx:regx
			});
		},
		frmDtRadio:function(obj){//产品属性里的动态单选框
			var $td=obj.parents('td');
			var $hidden=$td.find('input[name^=productPropertys][type=hidden]');
			var $isMust=$hidden.val();
			var txt=$hidden.data('pname');
			if($isMust==='Y'){
				return validFrm.frmRadio(obj,$td,'请选择'+txt);
			}
			return true;
		},
		frmDtChekbox:function(obj){//产品属性里的动态复选框
			var arry=[];
			var $td=obj.parents('td');
			var $hidden=$td.find('input[name^=productPropertys][type=hidden]');
			var $isMust=$hidden.val();
			var name=$hidden.data('pname');
			$td.find('input[name^=productPropertys][type=checkbox]').each(function(){
				var $this=$(this);
				var ischeck=$this.is(':checked');
				var val=$this.val();
				if(ischeck){
					arry.push($this.val());
				}
			});
			if($isMust==='Y'){
				if(arry.length<1){
					valid.errorTip($td,'请选择'+name);
					return false;
				}else{
					$td.find('.valid-error').remove();
				}
			}
			return true;
		},
		cstmPrc: function(obj) {//自定义价格区间处相关js验证
			var cgNumTip='请输入大于0的整数，不超过6位数';
			var prcTip='请输入大于0的数字，最多2位小数，不超过6位数';
			var cgNumRegx=/^[1-9][0-9]{0,5}$/;
			var prcRegx=/^([1-9][0-9]{0,5}(\.[0-9]{0,2})?|0\.[1-9][0-9]?|0\.0[1-9])$/;
			var $cgNum=null,$prc=null;
			var isCgNum=obj.hasClass('jsCgNum');
			var $slbTxt=obj.parent().siblings().find('.ipt-txt');
			if(isCgNum){//判断当前文本框是否为采购数量文本框
				$cgNum=obj;
				$prc=$slbTxt;
			}else{
				$cgNum=$slbTxt;
				$prc=obj;
			}
			
			var $allCgNum=$prcTbody.find('.jsCgNum');//所有的采购数量文本框
			var len=$allCgNum.length;//采购数量文本框的总数
			var $cgParent=$cgNum.parent();
			var $prcParent=$prc.parent();
			var cgVal=$.trim($cgNum.val());
			var prcVal=$.trim($prc.val());
			var cgStatic=false,prcStatic=false;
			
			//获取采购数量文本框验证状态
			var getCgSttc=function(arg){
				return valid.init({
					isMust:true,
					obj:arg,
					tipObj:arg.parent(),
					errorTip:cgNumTip,
					nullTip:cgNumTip,
					regx:cgNumRegx
				});
			};
			
			//获取产品单价文本框验证状态
			var getPrcSttc=function(arg){
				return valid.init({
					isMust:true,
					obj:arg,
					tipObj:arg.parent(),
					errorTip:prcTip,
					nullTip:prcTip,
					type:1,
					regx:prcRegx
				});
			};
			var mainTest = function() {
				if (isCgNum){
					cgStatic = getCgSttc($cgNum);
					if(prcVal){
						prcStatic = getPrcSttc($prc);
					}
				}else{
					prcStatic = getPrcSttc($prc);
					if(cgVal){
						cgStatic = getCgSttc($cgNum);
					}
				}
			};
			var $otherTr = obj.parents('tr').siblings('tr');
			var otherCgArry = [],valdArry = [];

			//循环除当前文本框外的其他文本框，并将得到的采购数量存在otherCgArry数组里面
			$otherTr.each(function() {
				var $this = $(this);
				var $curCg = $this.find('.jsCgNum');
				var $curPrc = $this.find('.jsPriceTxt');
				var curCgVal = $.trim($curCg.val());
				var curPrcVal = $.trim($curPrc.val());
				if (curCgVal||curPrcVal) {
					var curCgStatic = getCgSttc($curCg);
					var curPrcStatic=false;
					if (curCgStatic) {
						if ($.inArray(curCgVal, otherCgArry) < 0) {
							otherCgArry.push(curCgVal);
						} else {
							valdArry.push(false);
						}
					}
					if(curPrcVal){
						curPrcStatic = getPrcSttc($curPrc);
					}
					if(!curCgStatic || !curPrcStatic){
						valdArry.push(false);
					}
				}
			});
			switch(len){
				case 1:
				mainTest();
				break;
				default:
				if(otherCgArry.length>0){
					if(cgVal||prcVal){
						mainTest();
					}else{
						$cgNum.removeClass('frm-error');
						$prc.removeClass('frm-error');
						$cgParent.find('.valid-error').remove();
						$prcParent.find('.valid-error').remove();
						cgStatic=true;
						prcStatic=true;
					}
				}else{
					mainTest();
				}
			}
			if(!cgStatic||!prcStatic){
				valdArry.push(false);
			}
			
			if(otherCgArry.length>0){
				if($.inArray(cgVal,otherCgArry)>=0){//用于检测是否有重复采购数量
					$cgNum.addClass('frm-error');
					valid.errorTip($cgParent,'采购数量不可重复');
					$cgParent.find('.valid-error:contains("采购数量不可重复")').addClass('valid-repeat');
					valdArry.push(false);
				}else{
					var $errorTip=$cgParent.find('.valid-error:contains("采购数量不可重复")');
					otherCgArry.push(cgVal);
					$errorTip.siblings('.ipt-txt').removeClass('frm-error');
					$errorTip.remove();
					
					$prcTbody.find('.valid-repeat').siblings('.jsCgNum').each(function(){
						validFrm.cstmPrc($(this));
					});
				}
			}
			
			if($.inArray(false,valdArry)>=0){//只要有一个处于报错状态则返回false
				return false;
			}else{//当全部都正确的时候去的错误信息与红框
				$prcTbody.find('.ipt-txt').removeClass('frm-error');
				$prcTbody.find('.valid-error').remove();
				return true;
			}	
		},
		saledRdoChange: function(obj) { //退货、换货单选框切换并验证
			var $this = obj,
				$dd = $this.parents('dd'),
				$cmmnNumOpts=$dd.find('.cmmn-num-opts'),
				$iptTxt = $dd.find('.ipt-txt'),
				$p=$cmmnNumOpts.parents('p'),
				val = $this.val();
			if (val === 'Y') {
				$p.removeClass('nocheck');
				$iptTxt.removeAttr('disabled');
				$cmmnNumOpts.addClass('jsNumOpts');
			} else {
				$p.addClass('nocheck');
				$iptTxt.attr('disabled', true);
				$cmmnNumOpts.removeClass('jsNumOpts');
			}
		},
		smtForm: function() { //提交表单相关验证
			editor.sync();//同步内容
			var arry = [];
			
			var picHtml="";
			var propic=$picIpt.val();
			var $content=$('#content2');
			var dtlVal = editor.getContent();
			var dtlValLen=dtlVal.length;//详情内容的长度
			var $brndOtherTxt=$('.brnd-other-txt');
			arry.push(validFrm.iptTxt($proTitle));//产品标题验证
			arry.push(validFrm.iptTxt($proName));//产品名称验证
			arry.push(validFrm.iptTxt($proBrnd));//品牌、生产商验证
			if($proBrnd.find('.brnd-other-txt').is(':visible')){//品牌、生产商验证选择其他时显示的文本框的验证
				arry.push(validFrm.iptTxt($brndOtherTxt));
			}
			/*
			arry.push(validFrm.iptTxt($zldj));//质量等级验证
			if($zldj.find('.brnd-other-txt').is(':visible')){//品牌、生产商验证选择其他时显示的文本框的验证
				arry.push(validFrm.iptTxt($brndOtherTxt));
			}*/
			
			//arry.push(validFrm.iptTxt($sccd));//产地验证
			
			//arry.push(validFrm.iptTxt($proNmbr));//产品编码验证
			
			
			$prprtySlt.each(function(){//动态生成的产品属性下拉列表验证
				arry.push(validFrm.frmDtIpt($(this)));
			});
			
			
			
			$prprtyCheckBox.each(function(){//动态生成的产品属性复选框验证
				arry.push(validFrm.frmDtChekbox($(this)));
			});
			$prprtyIpt.each(function(){//动态生成的产品属性文本框验证
				arry.push(validFrm.frmDtIpt($(this)));
			});
			$prprtyRadio.each(function(){//动态生成的产品属性单选框验证
				arry.push(validFrm.frmDtRadio($(this)));
			});
			
			$('.other-txt').each(function(){//下拉列表选择其他时显示的文本框的验证
				arry.push(validFrm.frmDtIpt($(this)));
			});
			
			//产品图片验证
			$picIpt.each(function(){
				picHtml+=$(this).val();
			});
			
			
			if($.trim(picHtml).length<1){
				if(!$proPicBox.find('.valid-error')[0]){
					$proPicBox.append('<span class="valid-tips valid-error">请至少上传一张产品图片</span>');
				}else{
					$proPicBox.find('.valid-error').html('请至少上传一张产品图片');
				}
				arry.push(false);
			}else{
				$proPicBox.find('.valid-error').remove();
			}
			
			
			//验证详细说明
			if(dtlValLen<50||dtlValLen>55000){
				valid.errorTip($prodtlDescr,'请填写产品详细说明，50-55000字符');
				/*if(!$prodtlDescr.find('.valid-error')[0]){
					$prodtlDescr.append('<span class="valid-tips valid-error">请填写产品详细说明，50-55000字符</span>');
				}else{
					$prodtlDescr.find('.valid-error').html('请填写产品详细说明，50-55000字符');
				}*/
				arry.push(false);
			}else{
				$prodtlDescr.find('.valid-error').remove();
			}
			
						arry.push(validFrm.iptTxt($unitsSlt)); //计量单位验证
						
						

			arry.push(validFrm.frmRadio($prcRadio, $prcTab, '请选择')); //价格处单选按钮验证
			if ($jsCstmProDtl.is(':visible')) { //当选择自定义价格区间时验证对应的表单
			if($('input[name=speak]:checked').val()==1){
				$prcTbody.find('.ipt-txt').each(function() {
					arry.push(validFrm.cstmPrc($(this)));
				});
			}
			}

			if (!$supplyquantity.is(':disabled')) { //库存数量文本框框验证
				//arry.push(validFrm.iptTxt($supplyquantity));
			}
				

			//否选择提供样品相关js验证
			arry.push(validFrm.frmRadio($isOfferSample, $sampleTab, '请选择是否提供样品'));
			if ($jsYesSmplDtl.is(':visible')) {
				arry.push(validFrm.iptTxt($samplePrc)); //样品单价验证
				arry.push(validFrm.iptTxt($sampleNum)); //样品数量验证
				arry.push(validFrm.iptTxt($sampleYf)); //样品运费验证

			}
			
		
			
			//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
			if ($.inArray(false, arry) >= 0) {
				return false;
			}
			return true;
		},
		frmSmt:function(){//点击下一步、保存草稿 后对表单验证
			editor.sync();//同步内容
			var arry=[];
			var picHtml="";
			var propic=$picIpt.val();
			var $content=$('#content2');
			var dtlVal = editor.getContent();
			var dtlValLen=dtlVal.length;//详情内容的长度
			var $brndOtherTxt=$('.brnd-other-txt');
			arry.push(validFrm.iptTxt($proTitle));//产品标题验证
			// arry.push(validFrm.iptTxt($proName));//产品名称验证
			arry.push(validFrm.iptTxt($proBrnd));//品牌、生产商验证
			if($brndOtherTxt.is(':visible')){//品牌、生产商验证选择其他时显示的文本框的验证
				arry.push(validFrm.iptTxt($brndOtherTxt));
			}
			arry.push(validFrm.iptTxt($proNmbr));//产品编码验证
			
			$prprtySlt.each(function(){//动态生成的产品属性下拉列表验证
				arry.push(validFrm.frmDtIpt($(this)));
			});
			$prprtyCheckBox.each(function(){//动态生成的产品属性复选框验证
				arry.push(validFrm.frmDtChekbox($(this)));
			});
			$prprtyIpt.each(function(){//动态生成的产品属性文本框验证
				arry.push(validFrm.frmDtIpt($(this)));
			});
			$prprtyRadio.each(function(){//动态生成的产品属性单选框验证
				arry.push(validFrm.frmDtRadio($(this)));
			});
			
			$('.other-txt').each(function(){//下拉列表选择其他时显示的文本框的验证
				arry.push(validFrm.frmDtIpt($(this)));
			});
			
			//产品图片验证
			$picIpt.each(function(){
				picHtml+=$(this).val();
			});
			if($.trim(picHtml).length<1){
				if(!$proPicBox.find('.valid-error')[0]){
					$proPicBox.append('<span class="valid-tips valid-error">请至少上传一张产品图片</span>');
				}else{
					$proPicBox.find('.valid-error').html('请至少上传一张产品图片');
				}
				arry.push(false);
			}else{
				$proPicBox.find('.valid-error').remove();
			}
			
			//验证详细说明
			if(dtlValLen<50||dtlValLen>55000){
				valid.errorTip($prodtlDescr,'请填写产品详细说明，50-55000字符');
				/*if(!$prodtlDescr.find('.valid-error')[0]){
					$prodtlDescr.append('<span class="valid-tips valid-error">请填写产品详细说明，50-55000字符</span>');
				}else{
					$prodtlDescr.find('.valid-error').html('请填写产品详细说明，50-55000字符');
				}*/
				arry.push(false);
			}else{
				$prodtlDescr.find('.valid-error').remove();
			}
			
			/*if(false && editor.count('img')>10){
				$keEdit.addClass('frm-error');
				valid.errorTip($prodtlDescr,'插入的图片超过了最大值10张');
				arry.push(false);
			}*/
			
			//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
			if ($.inArray(false, arry) >= 0) {
				return false;
			}
			return true;
		}
	}
	
	//产品标题验证
	$proTitle.on('blur',function(){
		validFrm.iptTxt($(this));
	});
	
	//产品名称验证 2015/7/2 
 
	$proName.on('blur',function(){
		validFrm.iptTxt($(this));
	});
	
	
	
	//品牌 生产商 下拉列表验证
	$proBrnd.on('click',function(){
		validFrm.iptTxt($(this));
	});
	
	//质量等级 下拉列表验证
	/*
	$zldj.on('click',function(){
		validFrm.iptTxt($(this));
	});	*/
	
	//生产产地 验证
	$sccd.on('blur',function(){
		validFrm.iptTxt($(this));
	});		
	
	//品牌 生产商 下拉列表中其他（文本框）验证
	$proAttrTbl.on('blur','.brnd-other-txt',function(){
		validFrm.iptTxt($(this));
	});
	
	//产品编码验证
	$proNmbr.on('blur',function(){
		validFrm.iptTxt($(this));
	});
	
	//产品属性里动态生成的下拉列表验证
	$prprtySlt.on('click',function(){
		validFrm.frmDtIpt($(this));
	});
	
	//产品属性里动态生成的下拉列表中其他（文本框）验证
	$proAttrTbl.on('blur','.other-txt',function(){
		validFrm.frmDtIpt($(this));
	});
	
	//动态生成的产品属性复选框验证
	$prprtyCheckBox.on('blur',function(){
		validFrm.frmDtChekbox($(this));
	});
	
	//动态生成的产品属性单选框验证
	$prprtyRadio.on('change',function(){
		validFrm.frmDtRadio($(this))
	});
	
	//动态生成的产品属性文本框验证
	$prprtyIpt.on('blur',function(){
		validFrm.frmDtIpt($(this));
	});
	
	//自定义产品属性验证
	$proAttrTbl.on('blur','.ipt-txt[name$="[propertyname]"]',function(){
		validFrm.iptTxt($(this));
	});
	
		//选择计量单位各处的“单位”两个字同步对应的单位
	$unitsSlt.on('change', function() {
		var $this = $(this);
		var text = $this.find('option:selected').text();
		units = text;
		$('.jsUnit').html(units);
	});

	//计量单位验证
	$unitsSlt.on('click', function() {
		validFrm.iptTxt($(this));
	});
	
		//自定义价格区间处相关表单验证
	$prcTbody.on('blur', '.ipt-txt', function() {
		validFrm.cstmPrc($(this));
	});
	
	
	
	//样品设置处tab切换
	var $jsYesSmplDtl = $('.jsYesSmplDtl'); //设置样品容器
	var $isOfferSample = $('input[name=isOfferSample]'); //是否提供样品单选框
	var $sampleTab = $('.sample-tab'); //是否提供样品单选框父容器
	$isOfferSample.on('change', function() {
		var $this = $(this);
		var val = $this.val();
		if (val === "Y" && $jsYesSmplDtl.is(':hidden')) {
			$jsYesSmplDtl.show();
		} else {
			if($('input[name="speak"]:checked').val()=="3"){
				$('#noTrade').prop('checked', true);
				$('#yesTrade').prop('checked', false);
				}
			$jsYesSmplDtl.hide();
			$jsYesSmplDtl.find('.ipt-txt').removeClass('frm-error');
			$jsYesSmplDtl.find('.valid-error').remove();
			if (!$cstmPrc.is(':checked')) {
				$noZxjy.prop('checked', true);
			}
		}
		validFrm.frmRadio($this, $sampleTab, '请选择是否提供样品'); //验证是否选择提供样品
	});




		$samplePrc.on('blur', function() { //样品单价验证
		validFrm.iptTxt($(this));
	});

	$sampleNum.on('blur', function() { //样品数量验证
		validFrm.iptTxt($(this));
	});

	$sampleYf.on('blur', function() { //样品运费验证
		validFrm.iptTxt($(this));
	});

	$isThRdo.on('change', function() { //退货单选框切换
		validFrm.saledRdoChange($(this));
	});

	$isChngRdo.on('change', function() { //换货单选框切换
		validFrm.saledRdoChange($(this));
	});
	
	//防止点击时选中文本（主要是为了兼容ie，其他浏览器在样式里面设置了
	$('.cmmn-num-opts').find('i').each(function(){
		$(this)[0].onselectstart=function(){return false;}
	});
	
	//退换货处加减相关js
	$shExplain.on('click','.jsNumOpts .plut-opt',function(){
		var $this=$(this);
			$numipt = $this.next('.ipt-txt'),
			num = $numipt.val() * 1 - 1;
		num = num <= 1 ? 1 : num;
		if(num<2){
			$this.removeClass().addClass('no-plut-opt');
		}
		if(num<99){
			$this.siblings('.no-add-opt').removeClass().addClass('add-opt');
		}
		$numipt.val(num);
		return false;
	});
	
	$shExplain.on('click','.jsNumOpts .add-opt',function(){
		var $this=$(this);
			$numipt = $this.prev('.ipt-txt'),
			num = $numipt.val() * 1 + 1;
		if(num>1){
			$this.siblings('.no-plut-opt').removeClass().addClass('plut-opt');	
		}
		if(num>=99){
			num=99;
			$this.removeClass().addClass('no-add-opt');
		}
		$numipt.val(num);
		return false;
	});
	
	$shExplain.on('keyup','.jsNumOpts .ipt-txt',function(){
		var $this=$(this),
			$plutOpt=$this.prev(),
			$addOpt=$this.next();
		this.value=this.value.replace(/\D/g,'');
		var num=this.value;
		if(parseInt(num)===0){
			this.value=1;
		}
		if(this.value>=99){
			this.value=99;
			$addOpt.removeClass().addClass('no-add-opt');
		}else{
			$addOpt.removeClass().addClass('add-opt');	
		}
		if(this.value>1){
			$plutOpt.removeClass().addClass('plut-opt');	
		}else{
			$plutOpt.removeClass().addClass('no-plut-opt');	
		}
	});
	
	$shExplain.on('blur','.jsNumOpts .ipt-txt',function(){
		var $this=$(this),
			$addOpt=$this.next(),
			defaultVal=$this.data('default');
		this.value=this.value.replace(/\D/g,'');
		if(!this.value){
			this.value=defaultVal;
		}
		if(this.value>=99){
			this.value=99;
			$addOpt.removeClass().addClass('no-add-opt');
		}else{
			$addOpt.removeClass().addClass('add-opt');	
		}
	});

	//供货方式中的预定只读
	$('#yd').on('click', function() {
		return false;
	});


	//供货数量处复选框切换
	$unlimited.on('change', function() {
		var $this = $(this);
		var $frmValue = $this.parents('.frm-value');
		var isChecked = $this.is(':checked');
		if (isChecked) {
			$supplyquantity.attr('disabled', true);
			$supplyquantity.removeClass('frm-error');
			$frmValue.find('.valid-error').remove();
		} else {
			$supplyquantity.removeAttr('disabled');
		}
	});

	//供货数量文本框验证
	$supplyquantity.on('blur', function() {
		validFrm.iptTxt($(this));
	});
	
	//最小起订量文本框验证
	$minimumOrder.on('blur', function() {
		validFrm.iptTxt($(this));
	});	
	
		//选择计量单位各处的“单位”两个字同步对应的单位
	$unitsSlt.on('change', function() {
		var $this = $(this);
		var text = $this.find('option:selected').text();
		units = text;
		$('.jsUnit').html(units);
	});

	//计量单位验证
	$unitsSlt.on('click', function() {
		validFrm.iptTxt($(this));
	});
	
	
		//是否开通在线交易
	$('input[name=isTrade]').on('change', function() {
		var isCstmPrc = $cstmPrc.prop('checked');
		var iscstmsize = $('#cstmsize').prop('checked');
		var isSample = $yesSample.prop('checked');
		var valtf = $(this).val()=="Y"?true:false;
		if (valtf&&!iscstmsize&&!isCstmPrc && !isSample) {
			$.tip({
				content: '自定义价格区间”和“提供样品”至少需要选择一个才能正常开通在线交易！',
				closeTime: 5
			});
			$('input[name=isTrade][value="N"]').prop('checked',true);
			$('input[name=isTrade][value="Y"]').prop('checked',false);
			$('#noZxjy').trigger('click');
			
		}
	});

	
	
	
	/***点击底部按钮相关js***/
	/*
	var ajaxFun=function(num){//num为1代表保存进入下一步，0代表保存草稿
		if(num===1){
			if(!validFrm.frmSmt()){
				return false;
			}
		}
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;
		var href=location.href;
		var url='';
		if(/\?/.test(location.href)){
			url=location.search?href+'&isNext='+num:href+'isNext='+num;
		}else{
			url=location.search?href+'&isNext='+num:href+'?isNext='+num;
		}
		var params = $jsBasicForm.serializeArray();
		$.post(url, params ,function(data){
			var status=data.status;
			var error=data.msg;
			if(status==='-1'){
				$.tip({
					content:error,
					closeTime: 2,
					closeCallback:function(){
						location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
					}
				});
			}else if(status==='0'){
				if(typeof(error)==='object'){
					$.each(error, function(i, n){
						$.tip({
							content:n,
							closeTime:2
						});
					});
				}else{
					$.tip({
						content:error,
						closeTime:2
					});
				}
			}else if(status==='-2'){
				var a=[],b=[],msg='';
				for(var i in error){//遍历json
					a.push(i);//key
					b.push((error)[i]);//value
				}
				for(var i = 0; i <a.length; i++){//构建错误信息
					if(a[i]=="enterpriseName"){
						msg += '<p><strong>企业名称</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}else if(a[i]=="licenseNumber"){
						msg += '<p><strong>营业执照注册号</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}else if(a[i]=="regAuhtority"){
						msg += '<p><strong>登记机关</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}else if(a[i]=="legalPerson"){
						msg += '<p><strong>法定代表人</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}else if(a[i]=="scope"){
						msg += '<p><strong>经营范围</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}else if(a[i]=="proposer"){
						msg += '<p><strong>申请人</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}else if(a[i]=="proposerDep"){
						msg += '<p><strong>申请人部门</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}else if(a[i]=="proposerPost"){
						msg += '<p><strong>申请人职位</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}else if(a[i]=="title"){
						msg += '<p><strong>产品标题</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}else if(a[i]=="content"){
						msg += '<p><strong>详细说明</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
					}
				}
				artDialog({
					id:'errorTip',
					title:false,
					content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2><p>'+msg+'</p>',
					fixed: true,
					lock:true,
					width:380,
					padding:'25px 50px 25px 25px',
					opacity:0,
					icon:'mem-n',
					ok:function(){},
					close:function(){
						$("input[name='"+a[0]+"']").focus();//默认第一个设置焦点
					}
				});
			}else{
				location.href=data.url;
			}
			isSubmit=false;
		},'jsonp');
		return false;
	};
	



	//保存进入下一步
	$('#jsNextBtn').on('click',function(){
		ajaxFun(1);
	});	
	
	//保存草稿
	$('#jsSaveCg').on('click',function(){
		ajaxFun(0);
	});
	*/

	// 编辑器
	require.async("./useEditor.js", function (m) {
		m.init("content2");
	});
		
		var submitForm={
		ajax:function(url,num){
			if (isSubmit === true) {
				return false;
			} //阻止表单重复提交
			isSubmit = true;//调试用
			$.ajax({
				url: url,
				data: $jsSetRlFrm.serializeArray(),
				async: num === 3 ? false : true,
				type: "POST",
				dataType: 'jsonp',
				success: function(data) {
					var status = data.status;
					var error = data.msg;
					if(status==='-1'){
						$.tip({
							content: error,
							closeTime: 3,
							closeCallback:function(){
								location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
							}
						});
					}
					else if (status === '0') {
						if (typeof(error) === 'object') {
							$.each(error, function(i, n) {
								$.tip({
									content: n,
									closeTime: 3
								});
							});
						} else {
							$.tip({
								content: error,
								closeTime: 3
							});
						}
						isSubmit = false;
					}else if(status==='-2'){
						var a=[],b=[],msg='';
						for(var i in error){//遍历json
							a.push(i);//key
							b.push((error)[i]);//value
						}
						for(var i = 0; i <a.length; i++){//构建错误信息
							if(a[i]=="enterpriseName"){
								msg += '<p><strong>企业名称</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="licenseNumber"){
								msg += '<p><strong>营业执照注册号</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="regAuhtority"){
								msg += '<p><strong>登记机关</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="legalPerson"){
								msg += '<p><strong>法定代表人</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="scope"){
								msg += '<p><strong>经营范围</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="proposer"){
								msg += '<p><strong>申请人</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="proposerDep"){
								msg += '<p><strong>申请人部门</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="proposerPost"){
								msg += '<p><strong>申请人职位</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="title"){
								msg += '<p><strong>产品标题</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="content"){
								msg += '<p><strong>详细说明</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}
						}
						artDialog({
							id:'errorTip',
							title:false,
							content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2><p>'+msg+'</p>',
							fixed: true,
							lock:true,
							width:380,
							padding:'25px 50px 25px 25px',
							opacity:0,
							icon:'mem-n',
							ok:function(){},
							close:function(){
								$("input[name='"+a[0]+"']").focus();//默认第一个设置焦点
							}
						});
					} else {
						var $rvwParent = $jsReviewBtn.parent();
						if (num === 3) { //当点击预览时新页面打开预览页面
							window.open(data.url);
							isSubmit = false;
						} else {
							location.href = data.url;
						}
					}
					//isSubmit = false;
				}
			});
		},
		init:function(num){
			var $productId=$('#productId').val();
			var urlhost=location.host;
			var url1='',url3='',url4='';
			if (num === 1 || num === 3 ||num===4) {
				if(num === 1){
				 url1='//'+location.host+'/shop/productPublish/productPublish.productPublish';	
					}else if(num === 3){
					 url1='//'+location.host+'/shop/productPublish/productPublish.preview';		
						}else if(num === 4){
							$('#productType').val('1');
						 url1='//'+location.host+'/shop/productPublish/productPublish.productPublish';	
							}
			
				if (!validFrm.smtForm()) {
					return false;
				}
			}

			if(num===2){
				if($productId){
				location.href='//'+location.host+'/shop/productPublish/productPublish.chooseCategory?productId='+$productId;
					}else{
				location.href='//'+location.host+'/shop/productPublish/productPublish.chooseCategory?goPageOne=true';		
						}
				
				}

			
			var href = location.href;
			var url = '';
			if (/\?/.test(location.href)) {
				url = location.search ? href + '&isSubmit=' + num : href + 'isSubmit=' + num;
			} else {
				url = location.search ? href + '&isSubmit=' + num : href + '?isSubmit=' + num;
			}
			if(num===1){
				if($jsSetRlFrm.data('url')){
					if (isSubmit === true) {
						return false;
					} //阻止表单重复提交
					isSubmit = true;//调试用
					$.get($jsSetRlFrm.data('url'), function(data) {
						isSubmit = false;
						var status=data.status;
						var error=data.error;
						if(status === '-1'){
							$.tip({
								content: error,
								closeTime: 3,
								closeCallback:function(){
									location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
								}
							});
						}
						else if(status === '1'){
							submitForm.ajax(url,num);
						}
						else{
							$.cscConfirm({
								content: '<p class="cfrm-icon" style="text-align:center;font-size:14px;">'+error+'</p>',
								title: false,
								callback: function() {
									$(this.DOM.buttons).css({
										'padding': '8px 15px'
									});
									$(this.DOM.title[0]).css('min-width', '380px')
								},
								okFun: function() {
									submitForm.ajax(url,num);
								},
								cancelFun: true
							});
						}
					}, 'jsonp');
				}else{
					submitForm.ajax(url1,num);
				}
			}else{
				submitForm.ajax(url1,num);
			}
			return false;
		}
	};
	
	
	
		//点击发布产品按钮
	$('.jsRlsBtn').on('click', function() {
		submitForm.init(1);
	});

	//点击返回上一步
	$('.jsBackBtn').on('click', function() {
		submitForm.init(2);
	});

	//点击预览产品
	$jsReviewBtn.on('click', function() {
		submitForm.init(3);
	});

	//点击保存草稿
	$('.jsScgBtn').on('click', function() {
		submitForm.init(4);
	});
	
	
	/*
	require.async("//res.csc86.com/editor/",function() {
		//编辑器相关js
		KindEditor.each({
			'plug-align': {
				name: '对齐方式',
				method: {
					'justifyleft': '左对齐',
					'justifycenter': '居中对齐',
					'justifyright': '右对齐'
				}
			},
			'plug-order': {
				name: '编号',
				method: {
					'insertorderedlist': '数字编号',
					'insertunorderedlist': '项目编号'
				}
			},
			'plug-indent': {
				name: '缩进',
				method: {
					'indent': '向右缩进',
					'outdent': '向左缩进'
				}
			}
		}, function(pluginName, pluginData) {
			var lang = {
				'image': '网络图片',
				'multiimage': '本地上传'
			};
			lang[pluginName] = pluginData.name;
			KindEditor.lang(lang);
			KindEditor.plugin(pluginName, function(K) {
				var self = this;
				self.clickToolbar(pluginName, function() {
					var menu = self.createMenu({
						name: pluginName,
						width: pluginData.width || 100
					});
					K.each(pluginData.method, function(i, v) {
						menu.addItem({
							title: v,
							checked: false,
							iconClass: pluginName + '-' + i,
							click: function() {
								self.exec(i).hideMenu();
							}
						});
					})
				});
			});
		});
		editor = KindEditor.create('#content', {
			themeType: 'qq',
			allowImageUpload: false,
			items: [
				'bold', 'italic', 'underline', 'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'plug-align', 'plug-order', 'plug-indent', 'link', 'image', 'multiimage', 'table'
			],
			untarget: true,
			filterLink: true,
			afterBlur: function(data) {
				var self = this,
				    count = self.count(),
					$content = $("#content"),
					$keEdit=$('.ke-edit');
				if (count < 50 || count>55000) {
					$keEdit.addClass('frm-error');
					valid.errorTip($prodtlDescr,'请填写产品详细说明，50-55000字符');
				}
				else if (self.count('img') > 10) {
					$keEdit.addClass('frm-error');
					valid.errorTip($prodtlDescr,'插入的图片超过了最大值10张');
				} else {
					$keEdit.removeClass('frm-error');
					$prodtlDescr.find('.valid-error').remove();
				}
				self.sync();//同步内容
			}
		});
	});
	*/
});