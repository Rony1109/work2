
function bname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
				artDialog({padding:"0",content:'<div class="tablewidth"><h1 class="lay-h1">优质供应商报名订座</h1><div class="g-h-30"></div><ul><li class="l">企业名称</li><li class="r"><input type="text" class="lay-input02" name="cy"/><span></span></li></ul>'+
			'<ul><li class="l">联系人</li><li class="r"><input type="text" class="lay-input02" name="name"/><span></span></li></ul>'+
			'<ul><li class="l">联系电话</li><li class="r"><input type="text" class="lay-input02" name="tel"/></li></ul>'+
			'<ul><li class="l">主营产品</li><li class="r"><input type="text" class="lay-input02" name="str"/></li></ul>'+
			'<ul><li class="l">对哪个订单感兴趣？</li><li class="r"><input type="text" class="lay-input" name="xq"/></li></ul><div class="g-h-10"></div></div>',fixed: false,lock:'false',ok: function(){
			$(".tablewidth span").removeClass("cur");
			var cy=$("input[name=cy]").val(),
			name=$("input[name=name]").val(),
			tel=$("input[name=tel]").val(),
			str=$("input[name=str]").val(),
			xq=$("input[name=xq]").val();
			if(cy==''||name==''){
				if(cy==""){$("input[name=cy]").siblings("span").addClass("cur");}
				if(name==""){$("input[name=name]").siblings("span").addClass("cur");}
				return false;
			}
			$.post("http://cncms.csc86.com/formguide/index.php",{"formid":45,"subtype": "ajax","dosubmit":"订单见面会",
					 "info[cy]":cy,"info[name]":name,"info[tel]":tel,"info[tel]":tel,"info[str]":str,"info[xq]":xq},
				function(data){
					if(data.status == true){
						alert("亲，您填写的信息提交成功！");
					}else{
						alert("信息提交失败！");
					}
				},"jsonp");	
			},okVal: '确认'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}

function bnametwo(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
					artDialog({padding:"0",id:"atrbtn",content:'<div class="tablewidth"><h1 class="lay-h1">优质采购商发布订单</h1><div class="g-h-30"></div><div class="tolink"><a class="lay-l" href="javascript:;" onclick="infotwo()"></a><a class="lay-r" href="http://member.csc86.com/inquiry/openpublish.html" target="_blank"></a></div><div class="g-h-10"></div></div>',fixed: false,lock:'false'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}

function infotwo(){
	art.dialog({id:'atrbtn'}).close();
	artDialog({padding:"0",content:'<div class="tablewidth"><h1 class="lay-h1">优质采购商发布订单</h1><div class="g-h-30"></div><ul><li class="l">企业名称</li><li class="r"><input type="text" class="lay-input02" name="cy"/><span></span></li></ul>'+
	'<ul><li class="l">联系人</li><li class="r"><input type="text" class="lay-input02" name="name"/><span></span></li></ul>'+
	'<ul><li class="l">联系电话</li><li class="r"><input type="text" class="lay-input02" name="tel"/></li></ul>'+
	'<ul><li class="l">订单详情</li><li class="r"><input type="text" class="lay-input02" name="str"/></li></ul><div class="g-h-10"></div></div><a class="lay-alink" href="http://member.csc86.com/inquiry/openpublish.html" target="_blank">自行发布订单</a>',fixed: false,lock:'false',ok: function(){
	$(".tablewidth span").removeClass("cur");
	var cy=$("input[name=cy]").val(),
	name=$("input[name=name]").val(),
	tel=$("input[name=tel]").val(),
	str=$("input[name=str]").val();
	if(cy==''||name==''){
		if(cy==""){$("input[name=cy]").siblings("span").addClass("cur");}
		if(name==""){$("input[name=name]").siblings("span").addClass("cur");}
		return false;
	}
	$.post("http://cncms.csc86.com/formguide/index.php",{"formid":46,"subtype": "ajax","dosubmit":"订单见面会",
			 "info[cy]":cy,"info[name]":name,"info[tel]":tel,"info[tel]":tel,"info[str]":str},
		function(data){
			if(data.status == true){
				alert("亲，您填写的信息提交成功！");
			}else{
				alert("信息提交失败！");
			}
		},"jsonp");	
	},okVal: '确认',init:function(){
		$(".aui_c button.aui_state_highlight").css("background","url(style/img/btn02.png) no-repeat left top");
	}});
}

