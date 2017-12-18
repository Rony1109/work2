$(function(){
	for(var i=0;i<=$("tr").length;i++){
		$('tr:eq('+i+') td:gt(3) div.ly-a').addClass("top-r");
		$('tr:eq('+i+') td:lt(4) div.ly-a').addClass("top-l");
	};
	$("div.vs-bg").hover(
	  function () {
		$(this).addClass("vc-over");
	  },
	  function () {
		$(this).removeClass("vc-over");
	  }
	);
	$("div.vs-show").hover(
	  function () {
		  var $th=$(this);
		 $th.addClass("vs-ly-top"); 
		 if($th.children().is(".ly-a")){
			 $th.children("div.ly-a").addClass("ly-c");
			var box=$th.children("div.ly-a").attr("id");
			var ta=box.split("_");
			if(!($th.children(".ly-a").children().is(".ly-a-l"))){
				showPersonalCard(ta[0],box);
			}		}
	  },
	  function () {
		  	var $th=$(this);
		  	$th.removeClass("vs-ly-top"); 
			$th.children("div.ly-a").removeClass("ly-c");
	  }
	);
});
//名片墙输入名字
 csc.addName = function(obj) {
	 window.cscAddName = artDialog({
		   content: '<iframe src="//quan.csc86.com/cards/WallcardInfo" id="addName" width="560" height="330" frameborder="0" scrolling="no" name="addName"></iframe>',
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
				if($name==""||leng1>20||!(re1.test($name))||$sel==""||$city==""||leng3>60||leng4>20||$diG==""||leng2>40){
					if($name==""){$v.children("li:eq(0)").find(".da-r").addClass("da-r-po da-ch");}
					if(leng1>20){$v.children("li:eq(0)").find(".da-r").addClass("da-r-po da-ch").children("p").html("长度不能超过10个汉字");}
					if(!(re1.test($name))){$v.children("li:eq(0)").find(".da-r").addClass("da-r-po da-ch").children("p").html("不能含有特殊符号");}
					if($sel==""||$city==""){$v.children("li:eq(1)").find(".da-r").addClass("da-r-po da-ch").children("p").html("省、市为必选，区为可选");}
					if(leng3>60){$v.children("li:eq(2)").find("#company").after('<span class="da-r da-r-po da-ch"><p>长度不能超过30个汉字</p></span>');}
					if(leng4>20){$v.children("li:eq(3)").find("#position").after('<span class="da-r da-r-po da-ch"><p>长度不能超过10个汉字</p></span>');}
					if($diG==""){$v.children("li:eq(4)").find(".da-r").addClass("da-r-po da-ch");}
					if(leng2>40){$v.children("li:eq(4)").find(".da-r").addClass("da-r-po da-ch").children("p").html("长度不能超过20个汉字");}
					return false;
				}
			$.get("//quan.csc86.com/cards/edit?t=wallcardinfo&"+dataVal,function(data){
				var $val=data.replace(/\s/g,'');
				if($val>=1){
					artDialog({
						title:false,
						content:'<div class="g-ff-y pop-notice">'+
									'<div class="bd">'+
										'<div class="g-h-25"></div>'+
										'<strong>名片信息已保存</strong>'+
									'</div>'+
								'</div>',
						padding:0,
						time:3,
						lock:true
					});
					setTimeout(function(){$(obj).trigger('click');},3000);
				}else{
					window.popNotice = artDialog({
						title:false,
						content:'<div class="g-ff-y pop-notice">'+
									'<div class="bd">'+
										'<div class="g-h-25"></div>'+
										'<strong>名片信息保存失败，请<a href="javascript:void(popNotice.close(),cscAddName.show())">重试</a></strong>'+
									'</div>'+
								'</div>',
						padding:0,
						lock:true
					});
				}
			});
			cscAddName.hide();
			return false;
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