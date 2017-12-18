/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	require('//res.csc86.com/v2/c/member/zhongxin/public/js/datadeitor');


	//正在加载
	function loading(tmp,id){
		art.dialog({
			id:id,
			width:'200px',
			title:tmp,
			content: '<div class="lodingimg"><img src="//res.csc86.com/v2/c/member/wslm/smartreply/css/img/loading.gif" alt="" /></div>',
			padding:"0 10px",
			cancel:false
		});
	}
	
	//行业选择
	$("div.setindu-hy").hover(function(){
		$(this).addClass("hover");					   
	},function(){
		$(this).removeClass("hover");
	});
	$("div.conhy-all").delegate("input","change",function(){
		var txt=$.trim($(this).parent().text());
		if($(this)[0].checked){
			if($("div.conhy-all").find("input:checked").length>5){
				csc.useDialog(function (){
					csc.tip("最多可选择5个类别");
				});
				$(this).attr("checked",false);
				$("#indu").removeClass("hover");
				return;
			}
			$("div.indusse-all").append("<span>"+txt+"<input type='hidden' value='"+$(this).val()+"' name='tradeIds[]'></span>");
            $("input[name*='productCategory']").removeClass("aff-text-error");
		}else{
			$("div.indusse-all span:contains("+txt+")").remove();
		}
	});
	$("div.selec-con").delegate("span","click",function(){
		var txt=$.trim($(this).text());
		$(this).remove();
		$("div.conhy-all label:contains("+txt+")").find("input:checkbox").attr("checked",false);
	});
	
	//选择省市
	$("select[name='provinceId'],select[name='cityId']").live("change",function(){
		var $th=$(this);
		var set=$th.children("option:selected").val(),
		setval=$th.children("option:selected").html();
		if($th.attr("name")=="provinceId"){
			$("input[name='province']").val(setval);
		}
		if(set==""){
			if(setval=="请选择省"){
				$("input[name='province']").val("");
				$("select[name='cityId']").html("<option value=''>请选择市</option>");
			}
			$("select[name='areaId']").html("<option value=''>请选择区/县</option>");
			$("input[name='city']").val("");
			$("input[name='area']").val("");
		}else{
			$.post("//approve.csc86.com/user/cityList",{"itemID":set,"timestamp":new Date().getTime()},function(data){	
				var vt=$th.attr("name")=="provinceId"?"<option value=''>请选择市</option>":"<option value=''>请选择区/县</option>";
				for(var i=0;i<data.length;i++){
					vt+="<option value='"+data[i].itemID+"'>"+data[i].itemName+"</option>";
				}
				if($th.attr("name")=="provinceId"){
					$("select[name='cityId']").html(vt);
					$("select[name='areaId']").html("<option value=''>请选择区/县</option>");
				}else{
					$("select[name='areaId']").html(vt);
					$("input[name='city']").val(setval);
					$("input[name='area']").val("");
				}
			},"jsonp");	
		}											 
	})
	$("select[name='areaId']").live("change",function(){
		$("input[name='area']").val($(this).children("option:selected").html());
	});
	
	//以下是鼠标移进移出
	function toname(th){
		var va=$("input[name='"+th+"']");
		if(th=="regNo"&&va.val()==""){
			//va.siblings("span.ity-tip").removeClass("right");
			va.siblings("span.po").css("display","none");
		}else if(th=="regCap"&&va.val()==""){
			va.siblings("span.ity-tip").addClass("right");
		}else if(va.val()==""){
			va.siblings("span.ity-tip").removeClass("right");
		}else if(va.val()!=""&&va=="regNo"){
			va.siblings("span.ity-tip").addClass("right");
			//va.siblings("span.po").removeAttr("style");
			va.siblings("span.po").css("display","none");
		}else if(va.val()!=""&&va=="regCap"){
			va.siblings("span.ity-tip").addClass("right");
			//va.siblings("span.po").removeAttr("style");
			//va.siblings("span.po").css("display","none");
		}else{
			va.siblings("span.ity-tip").addClass("right");
		}
	}
	$(".tab-w input[type='text']").focus(function(){
		
		$(this).siblings("span.ity-tip").addClass("right");
	}).blur(function(){
		var th=$(this).attr("name");
		toname(th);
	});
	
	var  $licenseNoinput=$(".tab-w").find("input[name=licenseNo]");
	$licenseNoinput.on('keyup',function(){
		var $this=$(this);
		checkLength($this);
	});
	$licenseNoinput.on('blur',function(){
		var $this=$(this);
		checkLength($this);
	});
	function checkLength(txtObj){
		var _val=$.trim(txtObj.val());
		var _len=_val.length;
		if(_len>18){
			_val=_val.substr(0,18);
			_len=18;
			txtObj.val(_val);
		}
		//txtObj.siblings('.numtip').find('em').html(18-_len);
	}
	
	//鼠标移进移出 企业属地
	$(".tab-w select[name='cityId']").focus(function(){
		$(this).siblings("span.ity-tip").addClass("right");
	}).blur(function(){
		var $th=$(this);
		if($th.children("option:selected").val()==""){
			$th.siblings("span.ity-tip").removeClass("right");
		}else{
			 $th.siblings("span.ity-tip").addClass("right");
		}
	});
	
	//鼠标移进移出 经营范围
	function totext(tmp,maxnum,txt){
		if(tmp.val().length>maxnum&&tmp.val()!=""){
			tmp.siblings("span.ity-tip").removeClass("right").html("限制"+maxnum+"字，已超出"+(tmp.val().length-maxnum)+"字。");
		}else if(tmp.val()==""){
			tmp.siblings("span.ity-tip").removeClass("right").html(txt);
		}else{
			 tmp.siblings("span.ity-tip").addClass("right").html(txt);
		}
	}
	$(".tab-w textarea[name='bizScope']").focus(function(){
		$(this).siblings("span.ity-tip").addClass("right");
	}).blur(function(){
		totext($(this),200,'请输入经营范围');
	});
	$(".tab-w input[name='name']").focus(function(){
		$(this).siblings("span.ity-tip").addClass("right");
	}).blur(function(){
		totext($(this),50,'请输入企业名称');
	});
	
	
	//以下是表单提交
	function remoceclass(tmp){
		tmp.siblings("span.ity-tip").removeClass("right");
	}
	function addclass(tmp){
		tmp.siblings("span.ity-tip").addClass("right");
	}
	var formIdentity=$("form[data-type='identity']");
	formIdentity.bind('submit', function(event){
		var tva=$(".tab-w input[type='text']"),
			set=$(".tab-w select[name='cityId']"),
			tea=$(".tab-w textarea"),
			logo=$(".tab-w input[name='logo']"),
			yy=$(".tab-w input[name='licenseImg']");
		tva.each(function(i){
	
			if(tva.eq(i).val()==""&&tva.attr('name')!='regNo'&&tva.attr('name')!='regCap'){
				tva.eq(i).siblings("span.ity-tip").removeClass("right");
			}										 
		});
		if(set.children("option:selected").val()==""){remoceclass(set);}else{addclass(set);}
		if($(".tab-w input[type='radio']:checked").length==0){remoceclass($(".tab-w input[type='radio']").parent());}else{addclass($(".tab-w input[type='radio']").parent());}
		if(tea.val()==""){remoceclass(tea);}else{addclass(tea);}
		totext(tea,200,'请输入经营范围');
		if(yy.val()==""){remoceclass(yy);}else{addclass(yy);}
		if(logo.val()==""){remoceclass(logo);}else{addclass(logo);}
		if($(".indusse-all span").length<=0){remoceclass($(".tab-w .aff-value"));}else{addclass($(".tab-w .aff-value"));}
		if($('form[data-type="identity"] span.ity-tip:visible').length>0){
			return false;
		}					 
	});
		
});

