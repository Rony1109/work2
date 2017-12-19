$(function(){
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
			zhname=data.data.userName;
		}
	},"jsonp");

	//左移动
	$(".maito .scr-l").click(function(){
		left_right(".scr-all","1");
	});
	//右移动
	$(".maito .scr-r").click(function(){
		left_right(".scr-all","2");
	});
	//轮播
	var timer;
	$('.maito').mouseenter(function(){
			 clearInterval(timer);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");
	
	
	

})

//登录
function loginname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
			zhname=data.data.userName;
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}

//轮播
var left_right=function(tag,un){
	var $ul=$(tag).find("ul"),
		$w=$ul.find("li:first").width();
	if(!$ul.is(":animated")){
		if(un==1){
			$ul.animate({
				left:-$w
			},300,function(){
				$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
		}else{
			$ul.css({left:-$w}).find("li:last").prependTo($ul);
			$ul.animate({
				left:0
			},300);
		}
	}
}




/*function bmto(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"在线报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">在线报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table width="100%" cellspacing="0" class="table_form">'+
'<tbody><tr><th width="80"> <font color="red">*</font> 公司名称</th>'+
      		'<td><input type="text" class="input-text" value="" size="50" id="company" name="company"></td></tr>'+
		'<tr><th width="80"> <font color="red">*</font> 联系人	  </th>'+
      		'<td><input type="text" class="input-text" value="" size="50" id="contact" name="contact"></td></tr>'+
		'<tr><th width="80"> <font color="red">*</font> 电话	  </th>'+
      '<td><input type="text" class="input-text" value="" size="50" id="tel" name="tel"></td></tr>'+
		'<tr><th width="80"> <font color="red">*</font> 主营产品	  </th>'+
      '<td><input type="text" class="input-text" value="" size="50" id="mainProduct" name="mainProduct"></td></tr></tbody></table></div>',
	  
		ok: function() {
			var company=$("input[name='company']").val(),
				contact=$("input[name=contact]").val(),
				tel=$("input[name=tel]").val(),
				mainProduct=$("input[name=mainProduct]").val();
				if(company==""||contact==""||tel==""||mainProduct==""){
					return false;
				}
				$.post("http://pgmanage.csc86.com/index.php",{"m":"formguide","c":"index","a":"show","formid":22,"action":"js","siteid":1,"info[company]":company,"info[contact]":contact,"info[tel]":tel,"info[mainProduct]":mainProduct},function(data){alert(data);
				if(data.status == true){
					alert("恭喜您！加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
				}else{
					alert("申请失败，请刷新后重试！");
				}
			},"jsonp");
		},cancel:false,
		fixed: true,
		id: 'Fm7',
		icon: 'question',
		okVal: '确认提交'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");			
}

			artDialog({title:"在线报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">在线报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><form  id="myform" name="myform" action="http://pgmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=22&action=js&siteid=1" method="post" "><table width="100%" cellspacing="0" class="table_form">'+
'<tbody><tr width="523" height="47"><th width="80"> <font color="red">*</font> 公司名称</th>'+
      		'<td><input type="text" class="input-text" value="" size="50" id="company" name="info[company]"></td></tr>'+
		'<tr width="523"><th width="80"> <font color="red">*</font> 联系人	  </th>'+
      		'<td><input type="text" class="input-text" value="" size="50" id="contact" name="info[contact]"></td></tr>'+
		'<tr width="523"><th width="80"> <font color="red">*</font> 电话	  </th>'+
      '<td><input type="text" class="input-text" value="" size="50" id="tel" name="info[tel]"></td></tr>'+
		'<tr width="523"><th width="80"> <font color="red">*</font> 主营产品	  </th>'+
      '<td><input type="text" class="input-text" value="" size="50" id="mainProduct" name="info[mainProduct]"></td></tr></tbody></table>'+
'<input type="submit" value=" 提交 " id="dosubmit" name="dosubmit">'+
'</form></div>',

*/
function bmto(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"在线报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">在线报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><form  id="myform" name="myform" action="http://pgmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=22&action=js&siteid=1" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i>公司名称</span><input type="text" name="info[company]" id="company" size="50" value="" class="input-text"></li><li><span color="red"><i>*</i> 联系人</span><input type="text" name="info[contact]" id="contact" size="50" value="" class="input-text"></li><li><span color="red"><i>*</i>电话</span><input type="text" name="info[tel]" id="tel" size="50" value="" class="input-text"></li><li><span color="red"><i>*</i>主营产品</span><input type="text" name="info[mainProduct]" id="mainProduct" size="50" value="" class="input-text"></li></ul>'+
'<input type="submit" value=" 提交 " id="dosubmit" name="dosubmit">'+
'</form></div>',
		ok: function() {},
		cancel:false,
		fixed: true,
		id: 'Fm7',
		init:function(){
			$("form").submit( function () {
				var company=$("input[name='info[company]']").val(),
				contact=$("input[name='info[contact]']").val(),
				tel=$("input[name='info[tel]']").val(),
				mainProduct=$("input[name='info[mainProduct]']").val();
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
