$(function(){
	//最新动态
	$(".pr01 li").hover(function(){
		$(".pr01 li").removeClass("cur");
		$(this).addClass("cur");
	});
	
	//聚焦华南城
	$(".bn02 li").hover(function(){
		$(".bn02 li.cur").stop().animate({width: '55px'}, 300).removeClass("cur");
		 $(this).stop().animate({ width: "530px"}, 300).addClass("cur");
	});
	
	//专业市场效果图展示
	$(".po-width .rto").click(function(){
		var leng=$(".po-width .cto li.cur").nextAll().length;
		var left=$(".po-width .cto").position().left;
		if(leng==2){return;}
		$(".po-width .cto li.cur").removeClass("cur").next().addClass("cur");
		$(".po-width .cto").animate({left:left-194},200);
	});
	$(".po-width .lto").click(function(){
		var leng=$(".po-width .cto li.cur").prevAll().length;
		var left=$(".po-width .cto").position().left;
		if(leng==0){return;}else{
			$(".po-width .cto li.cur").removeClass("cur").prev().addClass("cur");
			$(".po-width .cto").animate({left:left+194},200);
		}
	});
	
	//全国各地华南城
	$(".po-width02 .rto").click(function(){
		var leng=$(".po-width02 .cto li.cur").nextAll().length;
		var left=$(".po-width02 .cto").position().left;
		if(leng==3){return;}
		$(".po-width02 .cto li.cur").removeClass("cur").next().addClass("cur");
		$(".po-width02 .cto").animate({left:left-220},200);
	});
	$(".po-width02 .lto").click(function(){
		var leng=$(".po-width02 .cto li.cur").prevAll().length;
		var left=$(".po-width02 .cto").position().left;
		if(leng==0){return;}else{
			$(".po-width02 .cto li.cur").removeClass("cur").prev().addClass("cur");
			$(".po-width02 .cto").animate({left:left+220},200);
		}
	});

	
	$(".illustration .title span a").hover(function(){
		$(".it-sig").removeClass("show");
		$(".it-sig:eq("+$(this).index()+")").addClass("show");					 
	});
	
	var ss=false;
	var rTim;
	$('.bn-list').hover(function(){
			 clearInterval(rTim);
			 ss=false;
		 },function(){
			 $t2=$(this);
			 var show=$(this).parent().hasClass("show")?true:false;
			 if(!ss&&show){
				 ss=true;
				 rTim = setInterval(function(){
					tieftwo();
				} ,2000);
			}
	 }).trigger("mouseleave");
	
	var tieftwo=function(){
		var self=$(".show").children(".bn-list"),lih =self.siblings("ul.bn").children(".cur"),ind=self.siblings("ul.bn").children("li").length,seidx=lih.index();
		if((seidx+1)==ind){
			ss=false;
			self.children("a").removeClass("cur").first().addClass("cur");
			self.siblings("ul.bn").find("li").removeClass("cur").first().addClass("cur");
		}else{
			ss=false;
			self.children("a.cur").removeClass("cur").next().addClass("cur");
			self.siblings("ul.bn").children(".cur").removeClass("cur").next().addClass("cur");
		}
	}
	
	
	$('.bn-list a').hover(function(){
		clearInterval(rTim);
		ss=false;
		var ind=$(this).index();
		$('.bn-list a').removeClass("cur");
		$(this).addClass("cur");
		$(this).closest(".it-sig").children(".bn").find("li").removeClass("cur");
		$(this).closest(".it-sig").children(".bn").find("li:eq("+ind+")").addClass("cur");
	},function(){
		var tvi=$(this).closest(".it-sig").find(".bn-list");
		if(!ss){
			 ss=true;
			 rTim = setInterval(function(){
				tieftwo(tvi); 
			} ,2000);
		}
	}).trigger("mouseleave");
	
	//
	var textTimer,iu,AutoScroll = function (obj){
		    var self=obj.find("ul"),lih =self.find("li:first").height();
			self.animate({
					top:-lih
			},500,function(){
				self.css({top:"0px"}).find("li:first").appendTo(self);
			});
	}

	$('.height-r').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 iu=$(this);
			textTimer = setInterval(function(){
				 AutoScroll(iu);
			} ,2000);
	 }).trigger("mouseleave");
	
});


function bmto(){
	artDialog({title:"在线报名",padding:"0 20px",content:'<div class="tablewidth"><div class="tab-title">招商意向登记表</div><table  border="0" cellspacing="0" cellpadding="0">'+
	  '<tr><th>租售意向:</th><td><input class="radio-in" type="radio" name="direction" value="租铺" id="RadioGroup1_0" />租铺&nbsp;&nbsp;<input class="radio-in"  type="radio" name="direction" value="售铺" id="RadioGroup1_1" />售铺</td></tr>'+
	  '<tr><th>公司名称:</th><td><input name="cp" type="text" /></td></tr>'+
	  '<tr><th>联  系 人:</th><td><input name="name" type="text" /></td></tr>'+
	  '<tr><th>手机号码:</th><td><input name="cell" type="text" /></td></tr>'+
	  '<tr><th>联系电话:</th><td><input name="tel" type="text" /></td></tr>'+
	  '<tr><th>电子邮箱:</th><td><input name="mail" type="text" /></td></tr>'+
	  '<tr><th>意见及建议:</th><td><textarea name="proposal" cols="" rows=""></textarea></td></tr>'+
'</table><div class="popto"><button onclick="closet()"></button></div></div>',
	ok: function() {
		var direction=$("input[name=direction]").val(),
			cp=$("input[name=cp]").val(),
			name=$("input[name=name]").val(),
			cell=$("input[name=cell]").val(),
			tel=$("input[name=tel]").val(),
			mail=$("input[name=mail]").val(),
			proposal=$("textarea[name=proposal]").val();
			$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 21,"subtype": "ajax","dosubmit":"郑州华南城招商专题","info[direction]":direction,"info[cp]":cp,"info[name]":name,"info[cell]":cell,"info[tel]":tel,"info[mail]":mail,"info[proposal]":proposal},function(data){
			if(data.status == true){
				alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
				closet();
			}else{
				alert("申请失败，请刷新后重试！");
			}
		},"jsonp");
	},cancel:true,
	fixed: true,
    id: 'Fm7',
	lock:'false',
    icon: 'question',
    okVal: '&nbsp;'});
}
function closet(){
	$("input[name=cp]").val("");
	$("input[name=name]").val("");
	$("input[name=cell]").val("");
	$("input[name=tel]").val("");
	$("input[name=mail]").val("");
	$("textarea[name=proposal]").val("");
}




