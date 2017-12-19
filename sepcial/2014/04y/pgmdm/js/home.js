$(function(){
	
	var ss=false;
	var rTim;
	$('.bn-list').hover(function(){
			 clearInterval(rTim);
			 ss=false;
		 },function(){
			 $t2=$(this);
			 if(!ss){
				 ss=true;
				 rTim = setInterval(function(){
					tieftwo();
				} ,2000);
			}
	 }).trigger("mouseleave");
	
	var tieftwo=function(){
		var self=$(".it-sig").children(".bn-list"),lih =self.siblings("ul.bn").children(".cur"),ind=self.siblings("ul.bn").children("li").length,seidx=lih.index();
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


	//轮播
	var timer;
	$('.lcall').mouseenter(function(){
			 clearInterval(timer);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");

})

//轮播
var left_right=function(tag,un){
	var $ul=$(tag).find(".lctop"),
		$w=$ul.find("span:first").height();
	if(!$ul.is(":animated")){
		if(un==1){
			$ul.animate({
				top:-$w
			},300,function(){
				$ul.css({top:"0px"}).find("span:first").appendTo($ul);});
		}else{
			$ul.css({top:-$w}).find("span:last").prependTo($ul);
			$ul.animate({
				left:0
			},300);
		}
	}
}


function bmto(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"买家报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">买家报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><form  id="myform" name="myform" action="http://pgmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=24&siteid=1" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i>公司名称 </span><input type="text" name="info[company]" id="contact" value="" class="input-text"></li><li><span color="red"><i>*</i>联系人</span><input type="text" name="info[contact]" id="tel" value="" class="input-text"></li><li><span color="red"><i>*</i>电话</span><input type="text" name="info[tel]" id="mainProduct" value="" class="input-text"></li><li><span color="red"><i>*</i>采购产品</span><input type="text" name="info[mainProduct]" id="company" value="" class="input-text"></li></ul>'+
'<input type="submit" value=" 提交 " id="dosubmit" name="dosubmit">'+
'</form></div>',
		ok: function() {},
		cancel:false,
		fixed: true,
		id: 'Fm7',
		init:function(){
			$("form").submit( function () {
				var company=$("input[name='info[mainProduct]']").val(),
				contact=$("input[name='info[company]']").val(),
				tel=$("input[name='info[contact]']").val(),
				mainProduct=$("input[name='info[tel]']").val();
				if(company==""||contact==""||tel==""||mainProduct==""){
					return false;
				}else{
					return true;
				}
			} );
		},
		icon: 'question',
		okVal: false});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");			
}

function closet(){
	art.dialog({id:'Fm7'}).close();	
}

function bmtotwo(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"卖家报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">卖家报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closett()"></a></div><form  id="myform" name="myform" action="http://pgmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=23&siteid=1" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i>公司名称</span><input type="text" name="info[company]" id="mainProduct" value="" class="input-text"></li><li><span color="red"><i>*</i>联系人</span><input type="text" name="info[contact]" id="company" value="" class="input-text"></li><li><span color="red"><i>*</i>电话</span><input type="text" name="info[tel]" id="contact" value="" class="input-text"></li><li><span color="red"><i>*</i>主营产品</span><input type="text" name="info[mainProduct]" id="tel" value="" class="input-text"></li></ul>'+
'<input type="submit" value=" 提交 " id="dosubmit" name="dosubmit">'+
'</form></div>',
		ok: function() {},
		cancel:false,
		fixed: true,
		id: 'Fm8',
		init:function(){
			$("form").submit( function () {
				var company=$("input[name='info[contact]']").val(),
				contact=$("input[name='info[tel]']").val(),
				tel=$("input[name='info[mainProduct]']").val(),
				mainProduct=$("input[name='info[company]']").val();
				if(company==""||contact==""||tel==""||mainProduct==""){
					return false;
				}else{
					return true;
				}
			} );
		},
		icon: 'question',
		okVal: false});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");			
}
function closett(){
	art.dialog({id:'Fm8'}).close();	
}