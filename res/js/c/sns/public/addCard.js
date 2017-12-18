//名片墙输入名字
var addCard= function(obj) {
	 artDialog({
		   content: '<iframe src="/interface/perfectInfo" id="addName" width="560" height="290" frameborder="0" scrolling="no" name="addName"></iframe>',
		   fixed: true,
		   title: "完善个人信息",
			ok: function() {
				var $name=$("#dName",$("#addName").contents()).val(),
					$diG=$("#diG",$("#addName").contents()).val(),
					$sel=$("#province",$("#addName").contents()).children("option:selected").attr("value"),
					$city=$("#city",$("#addName").contents()).children("option:selected").attr("value"),
					$company=$("#company",$("#addName").contents()).val(),
					$position=$("#position",$("#addName").contents()).val(),
					dataVal=$("#wallcardForm",$("#addName").contents()).serialize();
				var leng1=$name.replace(/([^\x00-\xFF])/g, "aa").length,
					leng2=$diG.replace(/([^\x00-\xFF])/g, "aa").length,
					leng3=$company.replace(/([^\x00-\xFF])/g, "aa").length,
					leng4=$position.replace(/([^\x00-\xFF])/g, "aa").length,
					re1=/^([\u4E00-\u9FA5]|\w)*$/,
					$v=$("ul",$("#addName").contents());
				$v.find(".da-r").removeClass("da-r-po da-ch");
				if($name==""||leng1>20||!(re1.test($name))||$sel==""||$city==""||leng3>60||leng4>20||$diG==""||leng2>20){
					if($name==""){$v.children("li:eq(0)").find(".da-r").addClass("da-r-po da-ch");}
					if(leng1>20){$v.children("li:eq(0)").find(".da-r").addClass("da-r-po da-ch").children("p").html("长度不能超过10个汉字");}
					if(!(re1.test($name))){$v.children("li:eq(0)").find(".da-r").addClass("da-r-po da-ch").children("p").html("不能含有特殊符号");}
					if($sel==""||$city==""){$v.children("li:eq(1)").find(".da-r").addClass("da-r-po da-ch").children("p").html("省、市为必选，区为可选");}
					if(leng3>60){$v.children("li:eq(2)").find("#company").after('<span class="da-r da-r-po da-ch"><p>长度不能超过30个汉字</p></span>');}
					if(leng4>20){$v.children("li:eq(3)").find("#position").after('<span class="da-r da-r-po da-ch"><p>长度不能超过10个汉字</p></span>');}
					if($diG==""){$v.children("li:eq(4)").find(".da-r").addClass("da-r-po da-ch");}
					if(leng2>20){$v.children("li:eq(4)").find(".da-r").addClass("da-r-po da-ch").children("p").html("长度不能超过10个汉字");}
					return false;
				}
			$.get("/interface/perfectInfo?t=edit&"+dataVal,function(data){
				var $val=data.replace(/\s/g,'');
				if($val>=1){
					csc.success("您的名片基础信息设置成功。",3);
					location.reload();
				} else if ($val == -2) {
					csc.alert("内容包含敏感词语！");
				}else{
					csc.alert("保存失败，请重试！");	
				}
			});
		},
		init: function(){
			if($("#addName").attr("value")==""){
				$(".tps").css("color","#ff3300");
				return;
			}
		},
		okVal: '保存',
		background:"#000",
		padding:"20px 25px 0 25px",
		opacity:"0.3",
		lock:true
	});
};