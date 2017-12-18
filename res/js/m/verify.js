//验证插件

csc.verify = function (id,autoVerify){
	if(!id) return;
	seajs.use(csc.url("res","/f=js/m/showFormError"),function (){
		var
			verify = function (element){
				var
					success = true,
					role = verifyDate(element).role;
				for( var i in role){
					var regex = eval(role[i].regex);
					if(!regex.test($.trim(element.value))){
						tip.error(element,role[i].tip,verifyDate(element).style.error);
						return;
					}
				}
				tip.clear(element);
				if(verifyDate(element).success){
					tip.success(element);
				}
			},
			verifyDate = function (element){
				var data = $(element).data("verify");
				data.style = data.style || {};
				data.style.parent = data.style.parent || "aff-value";
				data.style.focus = data.style.focus || {};
				data.style.focus.tip = data.style.focus.tip || "g-f-tip";
				data.style.focus.ele = data.style.focus.ele || "aff-text-focus";
				data.style.error = data.style.error || {};
				data.style.error.tip = data.style.error.tip || "g-f-error";
				data.style.error.ele = data.style.error.ele || "aff-text-error";
				data.style.must = data.style.must || data.style.error;
				data.style.must.tip = data.style.must.tip || data.style.error.tip;
				data.style.must.ele = data.style.must.ele || data.style.error.ele;
				data.style.success = data.style.success || {
					"tip":"g-f-success"
				};
				return data;
			},
			focus = function (event){
				if(verifyDate(this).focus){
					tip.focus(this);
				}
			},
			blur = function (){
				if($.trim(this.value).length==0 || $.trim(this.value) == $(this).attr("placeholder")){
					if(verifyDate(this).must){
						tip.error(this,verifyDate(this).must.tip,verifyDate(this).style.must);
					}else{
						tip.clear(this);
					}
				}else{
					if(verifyDate(this).role){
						verify(this);
					}else{
						tip.clear(this);
					}
				}
			},
			tip = {
				focus:function (element,tip){
					var
						tip = tip || verifyDate(element).focus.tip || "请输入信息",
						tipStyle = verifyDate(element).style.focus.tip || "g-f-tip",
						eleStyle = verifyDate(element).style.focus.ele || "aff-text-focus",
						parentStyle = verifyDate(element).style.parent || "g-c-f";
					this.clear(element,"onlyTip");
					csc.showFormError($(element),tip,{errorClass:tipStyle,eleClass:eleStyle,parentClass:parentStyle});
				},
				error:function (element,tip,style){
					var
						tip = tip || "请输入正确的信息",
						style = style || {},
						tipStyle = style.tip || "g-f-error",
						eleStyle = style.ele || "aff-text-error",
						parentStyle = verifyDate(element).style.parent || "g-c-f";
					this.clear(element);
					csc.showFormError($(element),tip,{errorClass:tipStyle,eleClass:eleStyle,parentClass:parentStyle});
				},
				success:function (element,tip){
					var
						tip = tip || verifyDate(element).success.tip || "输入正确",
						tipStyle = verifyDate(element).style.success.tip || "g-f-success",
						parentStyle = verifyDate(element).style.parent || "g-c-f";
					this.clear(element);
					csc.showFormError($(element),tip,{errorClass:tipStyle,parentClass:parentStyle});
				},
				clear:function (element,tipType){
					var
						tipStyle = "",
						eleStyle = "",
						style = verifyDate(element).style,
						parentStyle = verifyDate(element).style.parent || "g-c-f";
					switch(tipType){
						case "onlyTip":
						eleStyle = style.error.ele + " " + style.must.ele;
						break;
						default:
						eleStyle = style.focus.ele + " " + style.error.ele + " " + style.must.ele;
					}
					tipStyle = style.focus.tip + " " + style.error.tip + " " + style.must.tip + " " + style.success.tip;
					$(element).removeClass(eleStyle).closest("."+parentStyle).removeClass(tipStyle);
				}
			};
		$(id).each(function (index, element){
			$(element).bind("focus",focus).bind("blur",blur).parents("form").bind("submit",function (){
				var $t = $(this);
				if(autoVerify) $(element).triggerHandler("blur");
				if($t.find("."+verifyDate(element).style.error.ele).length > 0){
					var $e = $t.find("."+verifyDate(element).style.error.ele+":first");
					setTimeout(function (){
						$e.trigger("focus");
						setTimeout(function (){
							$e.triggerHandler("blur");
						},10);
					},10);
					return false;
				};
			});
		});
	});
};