verify_why = function(options){
	op = options || {};
	this.v_m_err = op.f_err || verify_why.e_d.v_m_err;
	this.v_m_success = op.f_success || verify_why.e_d.v_m_success;
	this.v_m_focus = op.f_focus || verify_why.e_d.v_m_focus;
	this.v_m_clear = op.f_clear || verify_why.e_d.v_m_clear;
	this.v_m_default = op.f_default || verify_why.e_d.v_m_default;
	this.eve_verifi = op.eve_verifi || "change"; //触发验证的事件。
}
verify_why.prototype = {
	v_m_err:function(){},		//验证出错操作
	v_m_success:function(){},	//验证成功操作
	v_m_focus:function(){},		//焦点提示
	v_m_clear:function(){},		//预留:清除样式
	v_m_default:function(){}	//预留:还原样式
}
verify_why.prototype.patterns = {
	//{err:{"${}格式错误":null},success:{"${}": }}
	//不能为空
	require:{err:{"${require}不能为空!":/^$/ig},require:"不能为空!"},
	//正整数
	integer:{err:{"${integer}只支持数字":/[^\d]+/,"${integer1}格式错误":/./},success:{"${integer}":/^\d+$/}},
	//日期:中国习惯(2012/12/21)
	date:{err:{"${date}日期格式错误":/./},success:{"${date}":/^\d{4}([\/\-])(((0[1-9])|(1[0-2]))|([1-9]))\1(([012]\d|30|31)|([1-9]))$/}}, 
	//电子邮件
	email:{err:{"${email}电子邮件格式错误":/./},success:{"${email}":/^\w+((\-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i}},
	//货币格式，保留两位小数
	usd:{err:{"${usd}不是有效的货币格式":/./},success:{"${usd}":/^￥?((\d{1,3}(,\d{3})*)|\d+)(\.(\d{2})?)?$/}}, 
	//url地址
	url:{err:{"${url}URL地址错误":/./},success:{"${url}":/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i}},
	//数字,支持科学记数法(1.01e23)
	number:{err:{"${number}数字格式错误":/./},success:{"${number}":/^[+-]?(\d+(\.\d*)?|\.\d+)([Ee]-?\d+)?$/}},
	//邮政编码
	zip: {err:{"${zip}格式错误":/./},success:{"${zip}":/^[1-9]\d{5}$/}}, 
	//电话:中国电话,支持分机 如:"010-88888888-520"
	phone: {err:{"${phone}电话号码不正确！区号－电话号码－分机号":/./},success:{"${phone}":/^(0[\d]{2,3}\-)?[1-9][\d]{6,7}(\-[\d]+)?$/}},
	//手机
	mobile:{err:{"${mobile}格式错误":/./},success:{"${mobile}":/^1\d{10}$/}},
	//GUID编码验证
	guid:{err:{"${guid}应填入GUID格式的编码:{3F2504E0-4F89-11D3-9A0C-0305E82C3301}.":null},success:{"${guid}":/^((\{([0-9a-fA-F]){8}-(([0-9a-fA-F]){4}-){3}([0-9a-fA-F]){12}\})|(([0-9a-fA-F]){8}-(([0-9a-fA-F]){4}-){3}([0-9a-fA-F]){12}))$/}},
	//12小时制时间验证
	time12:{err:{"${time12}请输入有效的24小时制时间格式: 23:00":null},success:{"${time12}": /^((0?\d)|(1[012])):[0-5]\d?\s?[aApP]\.?[mM]\.?$/}},
	//24小时制时间验证
	time24:{err:{"${time24}请输入有效的12小时制时间格式: 12:00 AM/PM":null},success:{"${time24}": /^(20|21|22|23|[01]\d|\d)(([:][0-5]\d){1,2})$/}},
	//阻止HTML标签验证
	nonHtml:{err:{"${nonHtml}存在非法这符":null},success:{"${nonHtml}": /^[^<>]*$/}},
	//QQ号
	qq:{err:{"${qq}QQ号错误":/./},success:{"${qq}":/^[^0]\d{4,10}$/}},
	//简单身份证号验证(15或18位)
	IDcord:{err:{"${IDcord}身份证号码格式错误":/./},success:{"${IDcord}": /^((\d{15})|(\d{17}(\d|x|X)))$/}},
	//IP地址
	IP:{err:{"${IP}IP地址错误":/./},success:{"${IP}":/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/}}
} //内置匹配规则
verify_why.prototype.info = function(obj){
	var objs = $(obj).find("[data-verify]")
	var o = this;
	objs.each(function(index, element) {
		o.datainfo(element);
		o.eventinfo(element);
	});
	if($(obj).get(0).tagName.toLowerCase() == "form"){
		$(obj).on("submit",function(){
			var items = $(this).find("[data-verify]");
			for(var item_=0 ; item_<items.length; item_++){
				if(!$(items[item_]).trigger("v_verifi")){}
			}
			for(var item__=0 ; item__<items.length; item__++){
				if(!$(items[item__]).attr("onerr")){
					return false;
				}
			}
		})
	}
}	//调用入口
verify_why.prototype.datainfo = function (obj){
	var o = $(obj);
	if(o.attr("data-verify") == "") return;
	var data; 
	try{eval('data = ' + o.attr("data-verify"));}catch(err){
		alert("验证参数错误！");
		return;
	};
	if(data == null){return;}
	if(data.type){
		var arr = data.type.split("|");
		for(var i in arr){
			var $n = arr[i];
			if(this.patterns[$n]){
				if(this.patterns[$n]["focus"]){
					data["focus"] || (data["focus"] = this.patterns[$n]["focus"]);
				}
				
				if(this.patterns[$n]["require"]){
					data["require"] || (data["require"] = this.patterns[$n]["require"]);
				}
				if(this.patterns[$n]["err"]){
					data["err"] || (data["err"]={});
					for(n in this.patterns[$n]["err"]){
						data["err"][n] = this.patterns[$n]["err"][n];
					}
				}
				if(this.patterns[$n]["success"]){
					data["success"] || (data["success"]={});
					for(n in this.patterns[$n]["success"]){
						data["success"][n] = this.patterns[$n]["success"][n];
					}
				}
			}
		}
	}
	
	if(!data.success){
		data.success = {};
		data["success"]["${none}"] = null;
	}
	
	o[0].data_verifi = data;
}	//验证参数初始化
verify_why.prototype.eventinfo = function(obj){
	var o = $(obj), z = this;
	o.on("v_verifi",function(){//验证
		return z.v_verifi(this);
	}).on("v_m_err",function(event,msg){//出错提示
		z.v_m_err(this,msg);
	}).on("v_m_success",function(event,msg){//通过提示
		z.v_m_success(this,msg);
	}).on("v_m_default",function(event,msg){//恢复默认
		z.v_m_default(this,msg);
	}).on("v_m_focus",function(event,msg){//焦点提示
		z.v_m_focus(this,msg);
	}).on("focus",function(){
		$(this).trigger("v_m_focus");
	}).on(this.eve_verifi,function(){
		$(this).trigger("v_verifi");
	})
}	//事件绑定初始化
verify_why.prototype.yz_class = function(o,yz_class){
	var $o = this;
	var obj = $(o), val = obj.val().toString(), jg = {pass:true,msg:"",vpass:false};
	for(v in yz_class){
		var type= csc.typeOf(yz_class[v]);
		jg.msg = v.replace(/\$\{[^\}]*\}/,"");
		if(type == "regexp"){
			var ps = yz_class[v].test(val);
			if(!ps){ continue;}
			return jg;
		}else if(type == "function"){
			if(!yz_class[v](val)){ continue; }
			return jg;
		}else if(type == "array"){
			var ps = false;
			for(var arr in yz_class[v]){
				if(val == yz_class[v][arr]) {
					ps = true;
				}
			}
			if(!ps){ continue; }
			return jg;
		}else if(type == "element"){
			var element = yz_class[v];
			if(val != yz_class[v].value) {continue;}
			return jg;
			if(!element.verify_pepei){
				element.verify_pepei = [];
				element.verify_pepei[element.verify_pepei.length] = obj[0];
				$(yz_class[v]).on("verify_p",function(){
					for(var pa in this.verify_pepei){
						if(!$(this).attr("onerr")){
							$o.v_verifi(this.verify_pepei[pa]);
						}else{
							$(this.verify_pepei[pa]).trigger("v_m_default");
						}
					}
				}).on("change",function(){
					if(obj.val() != ""){
						$(this).trigger("verify_p");
					}
				});
			}else{
				var noin = false;
				for(a in element.verify_pepei){
					if(element.verify_pepei[a] == obj[0]){
						noin=true;
					};
				}
				if(!noin){
					//alert(element.verify_pepei.length);
					element.verify_pepei[element.verify_pepei.length]=obj[0];
				}
			};
			if($(yz_class[v]).val() == ""){
				jg.vpass=true;
				jg.pass=false;
				return jg;
			};
			if(val != yz_class[v].val()) {continue;}
			return jg;
		}else if(type == "jquery"){
			var element = yz_class[v][0];
			if(!element.verify_pepei){
				element.verify_pepei = [];
				element.verify_pepei[element.verify_pepei.length] = obj[0];
				yz_class[v].on("verify_p",function(){
					for(var pa in this.verify_pepei){
						if(!$(this).attr("onerr")){
							$o.v_verifi(this.verify_pepei[pa]);
						}else{
							$(this.verify_pepei[pa]).trigger("v_m_default");
						}
					}
				}).on("change",function(){
					if(obj.val() != ""){
						$(this).trigger("verify_p");
					}
				});
			}else{
				var noin = false;
				for(a in element.verify_pepei){
					if(element.verify_pepei[a] == obj[0]){
						noin=true;
					};
				}
				if(!noin){
					//alert(element.verify_pepei.length);
					element.verify_pepei[element.verify_pepei.length]=obj[0];
				}
			};
			if(yz_class[v].val() == ""){
				jg.vpass=true;
				jg.pass=false;
				return jg;
			};
			if(val != yz_class[v].val()) {continue;}
			return jg;
		}else if(type == "string" || type == "number"){
			if(val != yz_class[v]){ continue; };
			return jg;
		}else if(type == "undefined" || type=="null"){
			return jg;
		}			
	}
	jg.msg="",jg.pass=false;
	return jg;
}	//常规验证类
verify_why.prototype.v_verifi = function(o){
	o.data_verifi || this.datainfo(o);
	var data = o.data_verifi || null;
	var $o = $(o);
	if(!data){return true;}
	var jg;
	//为空验证
	if(data.require){
		if(csc.typeOf(data.require)=="string"){
			if($o.val() == "" || $o.val() == null){
				$o.trigger("v_m_err",data.require);
				$o.attr("onerr","1");
				return false;			
			}
		}else if(csc.typeOf(data.require)=="array"){//联合验证
			var require_ = true;
			for(var r in data.require){
				if(csc.typeOf(data.require[r])=="string"){
					for(var i=0 ; i<$(data.require[r]).length; i++){
						if($($(data.require[r])[i]).val() != ""){
							require_ = false;
						}
					}
				}else if(csc.typeOf(data.require[r])=="jquery"){
					for(var i=0 ; i<data.require[r].length; i++){
						if($(data.require[r][i]).val() != ""){
							require_ = false;
						}
					}
				}else if(csc.typeOf(data.require[r]) == "element"){
					if(data.require[r].value != ""){
						require_ = false;
					}
				}
				if(!require_){
					break;
				}
			}
			if(!require_){
				//alert("成功!");
				//$o.trigger("v_m_err",jg.msg);
				$o.trigger("v_m_default");
				$o.attr("onerr",null);
				return true;
			}else{
				jg = this.yz_class($o,data.err);
				if(jg.pass){
					$o.trigger("v_m_err",jg.msg);
					$o.attr("onerr",1);
				}
				return false;
			};
		}
	}
	//格式验证
	if(csc.typeOf(data.success) == "object"){
		jg = this.yz_class($o,data.success);//$(this).val()
	}
	if(jg && jg.pass){
		$o.trigger("v_m_success",jg.msg);
		$o.attr("onerr",null);
		return true;
	}else if(jg.vpass){//特殊通过标记
		$o.trigger("v_m_default")
		$o.attr("onerr",null);
		return true;
	}else{//检测错误格式
		if(csc.typeOf(data.err) == "object"){
			jg = this.yz_class($o,data.err);
			if(jg.pass){
				$o.trigger("v_m_err",jg.msg);
				$o.attr("onerr","1");
				return false;
			}
		}
	}
	$o.trigger("v_m_default");
	$o.attr("onerr",null);
	return true;
}	//验证

//默认样式处理 现阶段表单模版样式处理;
verify_why.e_d = {};
verify_why.e_d.v_m_clear = function (obj,tipType){
	var	tipStyle = "",
		eleStyle = "";
	switch(tipType){
		case "onlyTip":
		tipStyle = "g-f-tip" + " " + "g-f-error" + " " + "g-f-error" + " " + "g-f-success";
		break;
		default:
		eleStyle = "g-f-tip" + " " + "aff-text-error" + " " + "g-f-error";
		tipStyle = "g-f-tip" + " " + "g-f-error" + " " + "g-f-error" + " " + "g-f-success";
	}
	if(obj.tagName.toLowerCase() != "input") {
		$(obj).closest(".aff-value").removeClass(tipStyle);
	}else{
		$(obj).removeClass(eleStyle).closest(".aff-value").removeClass(tipStyle);
	}
}
verify_why.e_d.v_m_err = function(obj,msg){
	this.v_m_clear(obj);
	if(obj.tagName.toLowerCase() != "input") {
		csc.showFormError($(obj),msg,{errorClass:"g-f-error",eleClass:"_noclass_"});
	}else{
		csc.showFormError($(obj),msg,{errorClass:"g-f-error",eleClass:"aff-text-error"});
	
	}
}
verify_why.e_d.v_m_success = function(obj,msg){
	this.v_m_clear(obj);
	if(obj.tagName.toLowerCase() != "input") {
		csc.showFormError($(obj),msg,{errorClass:"g-f-success",eleClass:"_noclass_"});
	}else{
		csc.showFormError($(obj),msg,{errorClass:"g-f-success"});
	}
}
verify_why.e_d.v_m_default = function(obj,msg){
	this.v_m_clear(obj);
}
verify_why.e_d.v_m_focus = function(obj,msg){
	var $msg = obj.data_verifi.focus;
	if($msg && $(obj).val()==""){
		this.v_m_clear(obj,"onlyTip");
		if(obj.tagName.toLowerCase() != "input") {
			csc.showFormError($(obj),msg,{errorClass:"g-f-success",eleClass:"_noclass_"});
		}else{
			csc.showFormError($(obj),$msg,{errorClass:"g-f-tip",eleClass:"aff-text-focus"});
		}
	}
}