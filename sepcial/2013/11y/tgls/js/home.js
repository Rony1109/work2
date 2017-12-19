var nameto="";
$(function(){
	 $(".lc-one").hover(function(){
		var $left=$(".one-b").position().left;
		var $top=$(".one-b").position().top;
		$(".one-b").animate({left:$left+15,top:$top+15},1000);				 
	},function(){
		var $left=$(".one-b").position().left;
		var $top=$(".one-b").position().top;
		$(".one-b").animate({left:$left-15,top:$top-15},1000);	
	});
		   
	//导航鼠标滑过效果
	$(".nv-c a").hover(function(){
		if(!$(this).hasClass("cur")){
			$(this).children(".ic-t").css("display","inline-block");		
		}
	},function(){
		if(!$(this).hasClass("cur")){
			$(this).children(".ic-t").css("display","none");
		}
	});
	$(".nv-c a").click(function(){
		$(".nv-c a").removeClass("cur");
		$(this).children(".ic-t").css("display","inline-block");	
		$(this).addClass("cur");		  
	});
	//左右移动
	$(".seven-ban .l").click(function(){
		var $index=$(".sv-all ul li.cur").prevAll().length;
		var $ul=$(".sv-all ul").position().left;
		if($index!=0){
			$(".sv-all ul").animate({left:$ul+230},300);
			$(".sv-all ul li.cur").removeClass("cur").prev().addClass("cur");
		}
	});
	$(".seven-ban .r").click(function(){
		var $index=$(".sv-all ul li.cur").nextAll().length;
		var $ul=$(".sv-all ul").position().left;
		if($index!=3){
			$(".sv-all ul").animate({left:$ul-230},300);
			$(".sv-all ul li.cur").removeClass("cur").next().addClass("cur");
		}
	});
	
	//轮播
	var s=false;
	var rTimer;
	$('.seven-ban').hover(function(){
			 clearInterval(rTimer);
			 s=false;
		 },function(){
			 $t=$(this);
			 if(!s){
				 s=true;
				 rTimer = setInterval(function(){
					timef($t); 
				} ,2000);
			}
	 }).trigger("mouseleave");
	
	var timef=function($t){
		var self=$t,lih =self.find("li.cur").nextAll().length;
		var $ul=self.find("ul").position().left;
		if(lih!=3){
			$(".sv-all ul").animate({left:$ul-230},300);
			$(".sv-all ul li.cur").removeClass("cur").next().addClass("cur");
		}else{
			$(".sv-all ul").animate({left:0},300);
			$(".sv-all ul li.cur").removeClass("cur").siblings("li:eq(0)").addClass("cur");
		}
	}
	
	
	
	$(window).scroll( function() {
		var topscr = $(this).scrollTop();
		$(".nv-c a").removeClass("cur");
		$(".nv-c a .ic-t").removeAttr("style");
		if(topscr<=686){
			$(".nv-c a:eq(0)").addClass("cur");
		}else if(topscr>686&&topscr<=1372){
			$(".nv-c a:eq(1)").addClass("cur");
		}else if(topscr>1372&&topscr<=2058){
			$(".nv-c a:eq(2)").addClass("cur");
		}else if(topscr>2058&&topscr<=2774){
			$(".nv-c a:eq(3)").addClass("cur");
		}else if(topscr>2774&&topscr<=3430){
			$(".nv-c a:eq(4)").addClass("cur");
		}else if(topscr>3430&&topscr<=4116){
			$(".nv-c a:eq(5)").addClass("cur");
		}else if(topscr>4116&&topscr<=4310){
			$(".nv-c a:eq(6)").addClass("cur");
		}else if(topscr>4310&&topscr<=5648){
			$(".nv-c a:eq(7)").addClass("cur");
		}
	} );
	
	$(".thr-r h4 a").click(function(){
		$.get("http://api.csc86.com/api/member/islogin",function(data){
			if(data.status==true){
				nameto=data.data.userName;
				bmto();
			}else{
				seajs.use(csc.url("res","/f=js/m/sign"),function (){			
					csc.checkSign("location.reload");
				});
			}
		},"jsonp");					   
	});
	$(".lc-four ul li a.sy").click(function(){
		$.get("http://api.csc86.com/api/member/islogin",function(data){
			if(data.status==true){
				nameto=data.data.userName;
				bmtoT();
			}else{
				seajs.use(csc.url("res","/f=js/m/sign"),function (){			
					csc.checkSign("location.reload");
				});
			}
		},"jsonp");					   
	});
	
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}
	},"jsonp");
	
});
//页面滚动
$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
$(document).ready(function() {
    $('a[href*=#]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset
                },
                300);
                return false;
            }
        }
    });
});


function bmto(){
	artDialog({title:"填写信息",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">填写信息</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table  border="0" cellspacing="0" cellpadding="0">'+
	  '<tr><th><em>*</em>姓名:</th><td><input name="name" type="text" /><span>请输入姓名</span></td></tr>'+
	  '<tr><th><em>*</em>公司名称:</th><td><input name="cp" type="text" /><span>请输入公司名称</span></td></tr>'+
	  '<tr><th><em>*</em>地址:</th><td><input name="addr" type="text" /><span>请输入地址</span></td></tr>'+
	  '<tr><th><em>*</em>联系电话:</th><td><input name="tel" type="text" /><span>请输入联系电话</span></td></tr>'+
	  '<tr><th>QQ:</th><td><input name="qq" type="text" /></td></tr></table></div>',
	ok: function() {
		var ne=$("input[name='name']"),
			cp=$("input[name=cp]"),
			addr=$("input[name=addr]"),
			tel=$("input[name=tel]"),
			qq=$("input[name=qq]").val();
			$(".tablewidth td span").removeAttr("style");
			if(ne.val()==""||cp.val()==""||addr.val()==""||tel.val()==""){
				if(ne.val()==""){ne.siblings("span").css("display","inline-block")}
				if(cp.val()==""){cp.siblings("span").css("display","inline-block")}
				if(addr.val()==""){addr.siblings("span").css("display","inline-block")}
				if(tel.val()==""){tel.siblings("span").css("display","inline-block")}
				return false;
			}
			$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 37,"subtype": "ajax","dosubmit":"抢购信息","info[hyzh]":nameto,"info[name]":ne.val(),"info[cp]":cp.val(),"info[addr]":addr.val(),"info[tel]":tel.val(),"info[qq]":qq},function(data){
			if(data.status == true){
				alert("恭喜您！申请加入成功，我们的客服人员会与您取得联系，感谢您的参加！");
				$("input[name=name]").val("");
				$("input[name=cp]").val("");
				$("input[name=addr]").val("");
				$("input[name=tel]").val("");
				$("input[name=qq]").val("");
			}else{
				alert("申请失败，请刷新后重试！");
			}
		},"jsonp");
	},cancel:false,
	fixed: true,
    id: 'Fm7',
    icon: 'question',
    okVal: '确认提交'});
}
function closet(){
	art.dialog({id:'Fm7'}).close();	
}

function bmtoT(){
	artDialog({title:"填写信息",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">填写信息</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table  border="0" cellspacing="0" cellpadding="0">'+
	  '<tr><th><em>*</em>姓名:</th><td><input name="name" type="text" /><span>请输入姓名</span></td></tr>'+
	  '<tr><th><em>*</em>试用服务:</th><td><input name="syfw" type="text" /><span>请输入试用服务</span></td></tr>'+
	  '<tr><th><em>*</em>公司名称:</th><td><input name="cp" type="text" /><span>请输入公司名称</span></td></tr>'+
	  '<tr><th><em>*</em>地址:</th><td><input name="addr" type="text" /><span>请输入地址</span></td></tr>'+
	  '<tr><th><em>*</em>联系电话:</th><td><input name="tel" type="text" /><span>请输入联系电话</span></td></tr>'+
	  '<tr><th>QQ:</th><td><input name="qq" type="text" /></td></tr></table></div>',
	ok: function() {
		var ne=$("input[name='name']"),
			syfw=$("input[name=syfw]"),
			cp=$("input[name=cp]"),
			addr=$("input[name=addr]"),
			tel=$("input[name=tel]"),
			qq=$("input[name=qq]").val();
			$(".tablewidth td span").removeAttr("style");
			if(ne.val()==""||syfw.val()==""||cp.val()==""||addr.val()==""||tel.val()==""){
				if(ne.val()==""){ne.siblings("span").css("display","inline-block")}
				if(syfw.val()==""){syfw.siblings("span").css("display","inline-block")}
				if(cp.val()==""){cp.siblings("span").css("display","inline-block")}
				if(addr.val()==""){addr.siblings("span").css("display","inline-block")}
				if(tel.val()==""){tel.siblings("span").css("display","inline-block")}
				return false;
			}
			$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 38,"subtype": "ajax","dosubmit":"单价试用","info[hyzh]":nameto,"info[name]":ne.val(),"info[syfw]":syfw.val(),"info[cp]":cp.val(),"info[addr]":addr.val(),"info[tel]":tel.val(),"info[qq]":qq},function(data){
			if(data.status == true){
				alert("恭喜您！申请加入成功，我们的客服人员会与您取得联系，感谢您的参加！");
				$("input[name=name]").val("");
				$("input[name=syfw]").val("");
				$("input[name=cp]").val("");
				$("input[name=addr]").val("");
				$("input[name=tel]").val("");
				$("input[name=qq]").val("");
			}else{
				alert("申请失败，请刷新后重试！");
			}
		},"jsonp");
	},cancel:false,
	fixed: true,
    id: 'Fm7',
    icon: 'question',
    okVal: '确认提交'});
}

//登录
function loginname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}