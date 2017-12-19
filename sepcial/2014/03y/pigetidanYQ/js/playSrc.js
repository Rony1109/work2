
(function(win,$){
	var cq = win.cq||{};
  //点击向右
	cq.srcR = function (obj) {
		var $self = obj.find("ul"),len=$self.children().length;
		if (!$self.is(":animated")&&len>5) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.find("li:gt("+(len-5)+")").prependTo($self);
			$self.css({ left: -lineWidth*4 }).animate({ "left": 0 + "px" }, 400);
		}   
	};
	
	 //点击向左
		cq.srcL = function (obj) {
			var $self = obj.find("ul");
			if (!$self.is(":animated")&&$self.children().length>5) {
				var lineWidth = $self.find("li:first").width(); //获取宽度
				$self.animate({ "left" : -lineWidth*4 +"px" }, 400 , function(){
				$self.css({left:0}).find("li:lt(4)").appendTo($self);
			})
		}
	} ;
	win['cq'] = cq;
})(window,$||{});


$(function(){
	var barandtime,$obj= $("#ad-scolls"),ln=$obj.find("ul").children("li").length;	
    $("#ad-scolls").delegate("span.l","click",function(){
       cq.srcR($obj);
    }).delegate("span.r","click",function() {
       cq.srcL($obj);
     });
	 
	 //滑入 停止动画，滑出开始动画.
	$('#ad-scolls').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$("#ad-scolls");
			textTimer = setInterval(function(){
				 cq.srcL($t);
			} ,2000);
	 }).trigger("mouseleave");
});

function bmto(bg,con){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"在线报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">在线报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><form  id="myform" name="myform" action="http://pgmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid='+bg+'&action=js&siteid=1" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i>公司名称</span><input type="text" name="info[company]" id="company" size="50" value="" class="input-text"></li><li><span color="red"><i>*</i> 联系人</span><input type="text" name="info[contact]" id="contact" size="50" value="" class="input-text"></li><li><span color="red"><i>*</i>电话</span><input type="text" name="info[tel]" id="tel" size="50" value="" class="input-text"></li><li><span color="red"><i>*</i>'+con+'</span><input type="text" name="info[mainProduct]" id="mainProduct" size="50" value="" class="input-text"></li></ul>'+
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






































































