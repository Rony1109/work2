//以下两个变量页面事件触发导致的商品曝光埋点需要用到
var triggerEventNum= 0,triggerEventArry=[];
var getUrlParam=function(_url,key){
	if(_url.lastIndexOf("?") != -1){
		var queryStr = _url.substring(_url.lastIndexOf("?") + 1, _url.length);
		if(!key)
			return queryStr;//返回所有参数
		else{
			var params  = queryStr.split("&");
			for(var j = 0 ;j < params.length;j++){
				var tmp = params[j].split("=");
				if(tmp[0]==key){
					return tmp[1];
					break;
				}
			}
		}
	}
};
csc.buyoffer = {};

csc.buyoffer.selectArea = function(province, city, area) {
	var province = province || "#province",
		city = city || "#city",
		area = area || "#area",
		$province = $(province),
		$city = $(city),
		$area = $(area);
	$province.bind("change", function() {
		var $t = $(this);
		$city.html('<option value="s">选择市</option>' + csc.getArea($t.val()));
		$area.val('');
	});
	$city.bind("change", function() {
		var $t = $(this);
		$t.val() == "s" || $area.val($province.children(":selected").text() + "，" + $t.children(":selected").text());
	});
	return this;
};

csc.buyoffer.validity = function() {
	var today = eval($("#today").val()),
		today = Date.UTC(today[0], today[1] - 1, today[2]),
		$showDate = $("#today").siblings(".eg").children("strong");

	function showValidity(v) {
		var validityDay = new Date();
		validityDay.setTime(today + v * 24 * 60 * 60 * 1000);
		var year = validityDay.getFullYear(),
			month = validityDay.getMonth() + 1,
			day = validityDay.getDate();
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		$showDate.text(year + "年" + month + "月" + day + "日");
	}
	$("[name='validdays']").bind("change", function() {
		showValidity($(this).data("date"));
	}).filter(":checked").trigger("change");
};

csc.buyoffer.hideMsg = function(id, type) {
	var
		$value = id.closest(".value"),
		type = type || "error";
	$value.removeClass(type);
};

csc.buyoffer.upMsg = function(file, msg) {
	var
		$li = $("#file-" + file.index),
		$upMsg = $("#upMsg");
	$li.length ? $li.html('<strong>' + file.name + '</strong> ' + msg) :
		$upMsg.length ? $upMsg.append('<li id="file-' + file.index + '"><strong>' + file.name + '</strong> ' + msg + '</li>') : $('<ul id="upMsg" class="up-img"><li id="file-' + file.index + '"><strong>' + file.name + '</strong> ' + msg + '</li></ul>').appendTo($("input[name='imgUrl']").parent());
};

csc.buyoffer.delPic = function(id, index) {
	$(id).closest("li").remove();
	if (index) {
		upFile.setStats({
			successful_uploads: upFile.getStats().successful_uploads - 1
		});
	}
};

$(function() {
	KindEditor.ready(function(K) {
		K.each({
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
		K.create('#description', {
			themeType: 'qq',
			allowImageUpload: false,
			items: [
				'bold', 'italic', 'underline', 'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'plug-align', 'plug-order', 'plug-indent', 'link', 'image', 'multiimage'
			],
			untarget: true,
			filterLink: true,
			afterChange: function() {
				var
					$description = $("#description"),
					errorMsg = "插入的图片超过了最大值10张";
				if (this.count('img') > 10) {
					csc.showFormError($description, errorMsg);
					$description.data("error", "too many images");
				} else {
					$description.removeData("error");
					if ($description.closest("div.aff-value").find("div.g-f-msg-box").text() == errorMsg) {
						$description.closest("div.aff-value").removeClass("g-f-error").find("div.g-f-msg-box").remove();
					}
				}
				$description.removeClass("aff-text-error");
			}
		});
	});

	seajs.use(csc.url("res", "/f=js/m/placeholder"), function() {
		csc.placeholder("input[placeholder]");
	});
	seajs.use(csc.url("res", "/f=js/m/verify"), function() {
		csc.verify("input[data-verify]");
	});
	var othis = csc.buyoffer;
	if (othis.errors) {
		seajs.use(csc.url("res", "/f=js/m/showFormError"), function() {
			if (othis.errors.productCategory) {
				othis.errors['productCategory[]'] = othis.errors.productCategory;
			}
			csc.formErros(othis.errors);
		});

		if(othis.errors){
			var failStatus=othis.errors.status;
			var a=[],b=[],errtxt='',btTxt='',dtlTxt='';
			var type=othis.errors.type;
			for(var i in othis.errors.msg){//遍历json
				a.push(i);//key
				b.push((othis.errors.msg)[i]);//value
			}
			
			//发布询盘和修改询盘页面
			if(type=="xunpan"){
				btTxt="询盘名称";
				dtlTxt="详细说明";
			}
			
			//发布采购计划和修改采购计划页面
			if(type=="caigou"){
				btTxt="采购标题";
				dtlTxt="详细描述";
			}
			
			for(var i = 0; i <a.length; i++){//构建错误信息
				if(a[i]=="inquiryName"){
					errtxt += '<p><strong>'+btTxt+'</strong>&nbsp;中的<span style="color:#f00;">"'+b[i]+'"</span>,属于违禁词或敏感词,请修改!</p>';
				}else if(a[i]=="content"){
					errtxt += '<p><strong>'+dtlTxt+'</strong>&nbsp;中的<span style="color:#f00;">"'+b[i]+'"</span>,属于违禁词或敏感词,请修改!</p>';
				}else if(a[i]=="contact"){
					errtxt += '<p><strong>联系人</strong>&nbsp;中的<span style="color:#f00;">"'+b[i]+'"</span>,属于违禁词或敏感词,请修改!</p>';
				}else if(a[i]=="memberCompany"){
					errtxt += '<p><strong>公司名称</strong>&nbsp;中的<span style="color:#f00;">"'+b[i]+'"</span>,属于违禁词或敏感词,请修改!</p>';
				}
			}
			if(failStatus==='-2'){
				csc.useDialog(function(){
					artDialog({
						id:'errorTip',
						title:false,
						content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2>'+errtxt,
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
				});
			}
		}


	}
	othis.selectArea().selectArea("#suppliersProvince", "#suppliersCity", "#suppliersArea");
	if ($("#area").val()) {
		(function() {
			var　 arr = $("#area").val().split('，');
			$("#province").children(":contains('" + arr[0] + "')").prop("selected", true).trigger("change");
			setTimeout(function() {
				$("#city").children(":contains('" + arr[1] + "')").prop("selected", true).trigger("change");
			}, 20);
		})();
	}
	if ($("#suppliersArea").val()) {
		(function() {
			var　 arr = $("#suppliersArea").val().split('，');
			$("#suppliersProvince").children(":contains('" + arr[0] + "')").prop("selected", true).trigger("change");
			setTimeout(function() {
				$("#suppliersCity").children(":contains('" + arr[1] + "')").prop("selected", true).trigger("change");
			}, 20);
		})();
	}
	$("#cateSelect :checked").closest("li").addClass("selected");
	if ($("input[name='imgUrl']").val()) {
		window.upImgs = eval($("input[name='imgUrl']").val());
		$.each(upImgs, function(i, v) {
			$.each(v, function(ii, vv) {
				csc.buyoffer.upMsg({
					name: vv,
					index: "o" + i
				}, msg = '<a href="javascript:" onclick="csc.buyoffer.delPic(this,true);" data-img=\'{"' + ii + '":"' + vv + '"}\'>删除图片</a>');
			});
		});

	}

	function startTime() {
		WdatePicker({
			el: 'startTime',
			isShowClear: false,
			readOnly: true,
			minDate: '%y-%M-%d',
			maxDate: '#F{$dp.$D(\'endTime\',{d:-1});}'
		});
	}

	function endTime() {
		WdatePicker({
			el: 'endTime',
			isShowClear: false,
			readOnly: true,
			minDate: '#F{$dp.$D(\'startTime\',{d:1})||\'%y-%M-%d\'}'
		});
	}
	$("#startTime").focus(startTime).next().click(startTime);
	$("#endTime").focus(endTime).next().click(endTime);
	$(".post-form form").on("submit", function() {

		var $this=$(this);
		var contactVal=$this.find('input[name=contact]').val();
		var mdObj={};

		if ($("#description").data("error")) { //编辑器图片过多
			$("#description").trigger("focus");
			return false;
		}
		if ($("#upMsg a[data-img]").length) {
			var val = "[";
			$("#upMsg a[data-img]").each(function(index, element) {
				if (index > 0) {
					val += "," + JSON.stringify($(element).data("img"));
				} else {
					val += JSON.stringify($(element).data("img"));
				}
			});
			val += "]";
			$("input[name='imgUrl']").val(val);
		}
		if (!$("[name='agreement']").is(":checked")) {
			csc.useDialog(function() {
				csc.alert("要使用我们的服务，您必须同意接受《华南网城采购交易协议》！");
			});
			return false;
		}

		if(!othis.errors&&contactVal){
			triggerEventNum= 0;
			triggerEventArry=[];
			if($('.ba-hd').html()=="采购单发布"){
				mdObj.ttl=encodeURIComponent($('input[name=inquiryName]').val());
			}
			if($('.ba-hd').html()=="询盘单发布"){
				mdObj.prid=getUrlParam(location.href,'proid');
			}
			mdObj.contact=encodeURIComponent(contactVal);
			mdObj.phone=$this.find('input[name=phoneNumber]').val();
			triggerEventArry.push(mdObj);
			if(typeof cscgaMd == 'object'){
				if($('.ba-hd').html()=="采购单发布"){
					cscgaMd.buyApply('pc', triggerEventNum, triggerEventArry[0]);
				}
				if($('.ba-hd').html()=="询盘单发布"){
					cscgaMd.ask('pc', triggerEventNum, triggerEventArry[0]);
				}
			}
		}
	});


	$("#indus-con").delegate("input", "change", function() {
		var txt = $.trim($(this).parent().text());
		if ($(this)[0].checked) {
			if ($("#indus-con").find("input:checked").length > 3) {
				csc.useDialog(function() {
					csc.tip("最多可选择3个类别");
				});
				$(this).attr("checked", false);
				$("#indu").removeClass("hover");
				return;
			}
			$indusSele.append("<span>" + txt + "</span>");
			$indusSele.find('.dtip').remove();
			$("input[name*='productCategory']").removeClass("aff-text-error");
		} else {
			$("#indus-sele span:contains(" + txt + ")").remove();
			if ($indusSele.find('span').length === 0) {
				$indusSele.append('<span class="dtip">所属行业</span>');
			}
		}
	});

	var $indusSele = $("#indus-sele");
	$indusSele.delegate("span:not(.dtip)", "click", function() {
		var txt = $.trim($(this).text());
		$(this).remove();
		$("#indus-con label:contains(" + txt + ")").find("input:checkbox").attr("checked", false);
		if ($indusSele.find('span').length === 0) {
			$indusSele.append('<span class="dtip">所属行业</span>');
		}
	});

	if ($indusSele.find('span').length === 0) {
		$indusSele.append('<span class="dtip">所属行业</span>')
	}


	$("#indu").hover(function() {
		$(this).addClass("hover");
	}, function() {
		$(this).removeClass("hover");
	});
	$("select[name='purchaseUnits']").change(function() {
		var $t = $(this);
		if ($t.find(":selected").text() !== '单位') {
			$t.removeClass("aff-text-error");
		}
	});

	var $advanced = $('.advanced');
	$('.adv-control .to').bind('click', function() {
		var $t = $(this);
		if ($t.is('.to-hide')) {
			$t.removeClass('to-hide').html('点此填写详细采购信息<span class="g-d-ib"></span>');
			$advanced.removeClass('advanced-show');
		} else {
			$t.addClass('to-hide').html('点此收起<span class="g-d-ib"></span>');
			$advanced.addClass('advanced-show');
		}
	});

	var $unit = $('[name="purchaseUnits"]');

	$unit.css({
		color: $unit.val() ? '#333' : '#cdcdcd'
	});

	$unit.on('focus', function() {
		$unit.css('color', '#333');
	}).on('blur', function() {
		$unit.css({
			color: $unit.val() ? '#333' : '#cdcdcd'
		});
	});

});