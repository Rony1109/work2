$(function(){
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		if(topscr<705){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	

	//导航
	$(".ment").hover(function(){
		$(this).children("ul").css("display","block");				  
	},function(){
		$(this).children("ul").css("display","none");	
	});

	//首页

	$(".m-img,.m-pr05").live("mouseenter",function(){

		var $th=$(this);

		$th.children(".li-bg,.li-f").css("display","block");

	}).live("mouseleave",function(){

		var $th=$(this);

		$th.children(".li-bg,.li-f").removeAttr("style"); 

	});




	var textTimer,AutoScroll = function (obj){

		    var self=obj,lih =self.find("div:first").height();

			self.animate({

					top:-lih

			},500,function(){

				self.css({top:"0px"}).find("div:first").appendTo(self);

			});

	}



	$('#lbspan').hover(function(){

			 clearInterval(textTimer);

		 },function(){

			 $t=$(this);

			textTimer = setInterval(function(){

				 AutoScroll($t)

			} ,2000);

	 }).trigger("mouseleave");

	

	//轮播

	var s=false;
	var rTimer;
	$('#lbtwoone').hover(function(){
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
		var self=$t,lih =self.children("ul:visible"),ind=self.children("ul").length,seidx=lih.index();
		if(seidx==ind){
			s=false;
			self.children(".lb-icon").children("a").removeClass("cur").first().addClass("cur");
			self.children("ul").css("display","none").first().css("display","block");
		}else{
			s=false;
			self.children(".lb-icon").children("a.cur").removeClass("cur").next().addClass("cur");
			self.children("ul:visible").css("display","none").next().css("display","block");
		}
	}

	$('#lbtwoone .icon1 a').hover(function(){
		clearInterval(rTimer);	
		var ind=$(this).index();
		$('#lbtwoone .lb-icon a').removeClass("cur");
		$(this).addClass("cur");
		$('#lbtwoone ul').css("display","none");
		$("#lbtwoone ul:eq("+ind+")").css("display","block");
	},function(){
		var tvi=$("#lbtwoone");
		if(!s){
			 s=true;
			 rTimer = setInterval(function(){
				timef(tvi);
			} ,2000);
		}
	}).trigger("mouseleave");


	var ss=false;
	var rTim;
	$('#lbtwotwo').hover(function(){
			 clearInterval(rTim);
			 ss=false;
		 },function(){
			 $t2=$(this);
			 if(!ss){
				 ss=true;
				 rTim = setInterval(function(){
					tieftwo($t2);
				} ,2000);
			}
	 }).trigger("mouseleave");

	var tieftwo=function($t2){
		var self=$t2,lih =self.children("ul:visible"),ind=self.children("ul").length,seidx=lih.index();
		if(seidx==ind){
			ss=false;
			self.children(".lb-icon").children("a").removeClass("cur").first().addClass("cur");
			self.children("ul").css("display","none").first().css("display","block");
		}else{
			ss=false;
			self.children(".lb-icon").children("a.cur").removeClass("cur").next().addClass("cur");
			self.children("ul:visible").css("display","none").next().css("display","block");
		}
	}

	$('#lbtwotwo .icon2 a').hover(function(){
		clearInterval(rTim);
		var ind=$(this).index();
		$('#lbtwotwo .lb-icon a').removeClass("cur");
		$(this).addClass("cur");
		$('#lbtwotwo ul').css("display","none");
		$("#lbtwotwo ul:eq("+ind+")").css("display","block");
	},function(){
		var tvi=$("#lbtwotwo");
		if(!ss){
			 ss=true;
			 rTim = setInterval(function(){
				tieftwo(tvi); 
			} ,2000);
		}
	}).trigger("mouseleave");
	
	
	var sss=false;
	var rrTim;
	$('#lbtwothree').hover(function(){
			 clearInterval(rrTim);
			 sss=false;
		 },function(){
			 $t3=$(this);
			 if(!sss){
				 sss=true;
				 rrTim= setInterval(function(){
					tiefthree($t3);
				} ,2000);
			}
	 }).trigger("mouseleave");

	var tiefthree=function($t3){
		var self=$t3,lih =self.children("ul:visible"),ind=self.children("ul").length,seidx=lih.index();
		if(seidx==ind){
			sss=false;
			self.children(".lb-icon").children("a").removeClass("cur").first().addClass("cur");
			self.children("ul").css("display","none").first().css("display","block");
		}else{
			sss=false;
			self.children(".lb-icon").children("a.cur").removeClass("cur").next().addClass("cur");
			self.children("ul:visible").css("display","none").next().css("display","block");
		}
	}

	$('#lbtwothree .icon2 a').hover(function(){
		clearInterval(rrTim);
		var ind=$(this).index();
		$('#lbtwothree .lb-icon a').removeClass("cur");
		$(this).addClass("cur");
		$('#lbtwothree ul').css("display","none");
		$("#lbtwothree ul:eq("+ind+")").css("display","block");
	},function(){
		var tvi=$("#lbtwothree");
		if(!sss){
			 sss=true;
			 rrTim = setInterval(function(){
				tiefthree(tvi); 
			} ,2000);
		}
	}).trigger("mouseleave");
	


	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}
	},"jsonp");

	//分页
	$(".md-page .page-l,.md-page i:eq(0)").click(function(){
		$(".story-one").removeClass("so-cur");
		$(".story-one:lt(2)").addClass("so-cur");
		$(".md-page i").removeClass("cur");
		$(".md-page i:eq(0)").addClass("cur");
	});
	$(".md-page .page-r,.md-page i:eq(1)").click(function(){
		$(".story-one").removeClass("so-cur");
		$(".story-one:gt(1)").addClass("so-cur");
		$(".md-page i").removeClass("cur");
		$(".md-page i:eq(1)").addClass("cur");
	});

});

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

function bmto(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"在线报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">在线报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table  border="0" cellspacing="0" cellpadding="0">'+
	
		  '<tr><th><em>*</em>公司名称:</th><td><input name="companyname" type="text" /><span>请输入公司名称</span></td></tr>'+
	
		  '<tr><th>主营行业:</th><td><input name="industry" type="text" /></td></tr>'+
	
		  '<tr><th><em>*</em>联系人:</th><td><input name="contact" type="text" /><span>请输入联系人</span></td></tr>'+
	
		  '<tr><th><em>*</em>联系电话:</th><td><input name="tel" type="text" /><span>请输入联系电话</span></td></tr>'+
	
		  '<tr><th>QQ:</th><td><input name="qq" type="text" /></td></tr></table></div>',
	
		ok: function() {
	
			var gs=$("input[name='companyname']"),
	
				hy=$("input[name=industry]").val(),
	
				lx=$("input[name=contact]"),
	
				dh=$("input[name=tel]"),
	
				qq=$("input[name=qq]").val();
	
				$(".tablewidth td span").removeAttr("style");
	
				if(gs.val()==""||lx.val()==""||dh.val()==""){
	
					if(gs.val()==""){gs.siblings("span").css("display","inline-block")}
	
					if(lx.val()==""){lx.siblings("span").css("display","inline-block")}
	
					if(dh.val()==""){dh.siblings("span").css("display","inline-block")}
	
					return false;
	
				}
	
				$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 15,"subtype": "ajax","dosubmit":"活动信息","info[companyname]":gs.val(),"info[industry]":hy,"info[contact]":lx.val(),"info[tel]":dh.val(),"info[qq]":qq},function(data){
	
				if(data.status == true){
	
					alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
	
					$("input[name=companyname]").val("");
	
					$("input[name=industry]").val("");
	
					$("input[name=contact]").val("");
	
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



function dosubmit(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			var gs=$("textarea[name='content2']").val(),
			qq=$("input[name=tel2]").val();
			if(gs==""||gs=="输入您的意见或建议"||qq==""||qq=="留下您的联系方式"){
				alert("请填写活动反馈信息！")
				return false;
			}
		$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 16,"subtype": "ajax","dosubmit":"活动反馈","info[content]":gs,"info[tel]":qq},function(data){
			if(data.status == true){
				alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
				$("textarea[name=content2]").val("");
				$("input[name=tel2]").val("");
			}else{
				alert("申请失败，请刷新后重试！");
			}
		},"jsonp");
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");	
}

//提交表单

function subForm(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".addi-r table td span").html("");
			var companyname=$("input[name=companyname]").val(),
				industry=$("input[name=industry]").val(),
				contact=$("input[name=contact]").val(),
				tel=$("input[name=tel]").val(),
				qq=$("input[name=qq]").val();
			//var regval=tel.search(/^([0-9]{11})?$/);
			var qqval=(/^([1-9]\d*)$/).test(qq);
		
			var qqt=!(qq==""||qqval);
		
			if(companyname==""||contact==""||tel==""||qqt){
		
				if(companyname==""){$("input[name=companyname]").siblings("span").html("*")}
		
				if(contact==""){$("input[name=contact]").siblings("span").html("*")}
		
				if(tel==""){$("input[name=tel]").siblings("span").html("*")}
		
				if(qqt){$("input[name=qq]").siblings("span").html("*");}
		
				return false;
		
			}
		
			$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 15,"subtype": "ajax","dosubmit":"活动信息","info[companyname]":companyname,"info[industry]":industry,"info[contact]":contact,"info[tel]":tel,"info[qq]":qq},function(data){
		
					if(data.status == true){
		
						alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
		
						$("input[name=companyname]").val("");
		
						$("input[name=industry]").val("");
		
						$("input[name=contact]").val("");
		
						$("input[name=tel]").val("");
		
						$("input[name=qq]").val("");
					}else{
						alert("申请失败，请刷新后重试！");
					}
				},"jsonp");
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");	
}



var csc=csc||{};

//加好友

var addfriendAct = function($id) {

  csc.useDialog(function(){	

		seajs.use(csc.url("res","/f=js/m/sign"),function(){

			csc.checkSign();

		});

	});

  //要加处理登录页判断

   var $name="", sname ='<div class="g-f-msg-box"><input type="text" class="txt" id="uname" value=""/><p class="tps" style="margin-top:6px;"><strong>提示</strong>请输入您的姓名</p></div>';

	$.get(csc.url("member","/public/personal/username"),function(data){

		$name=$.trim(data.username);

		if($name=="NotLogin"){

			seajs.use(csc.url("res","/f=js/m/sign"),function (){			

				csc.checkSign("location.reload");

			});

		}else if (!$name) {

			csc.useDialog(function (){

			artDialog({id: "addfriend0",content: sname,fixed: true,title: "请输入您的姓名",width: 280,padding: "10px 19px 10px 15px",init: function() {

					$("#uname").live("focus", function() {

						var $val = $(this).val(), defaultValue = $("#uname")[0].defaultValue;

						if (!$val || $val === defaultValue) {

							$(this).val("");

							$("#tps").hide();

						}

					});

				},ok: function() {

					var defaultValue = $("#uname")[0].defaultValue, $name = $.trim($("#uname").val());

					if (!$name || $name === defaultValue) {

						$("#uname").focus();

						$("#tps").show();

						return false;

					}

					relfirend($id, $name);

				},cancel:function(){},lock: true});

				})

		} else{

			relfirend($id);

		}

	},"jsonp");

};

//交互名片

function cardfriend(fuid, obj) {

    $.post(csc.url("member","/public/personal/card"), {"t": "change","fuid": fuid},function(data){

        if ("sns_cardchange_000" == data.code) {

        	csc.useDialog(function (){csc.success("交换成功");})

        } else if("sns_cardchange_003"==data.code){

           csc.useDialog(function (){ csc.success("名片已收");})

        }else if("login_fail"==data.code){

			login();

		}else{

        	csc.alert("操作失败,请重试"); 

        }

    },'jsonp');

}







