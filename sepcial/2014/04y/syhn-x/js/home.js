$(function(){
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<305){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});
    $(".showlist li.listshow").hover(function(){
        var $t= $(this);
        $t.addClass("cur").siblings().removeClass("cur");
    })
	$("ul.hedsh li").hover(function(){
		$(this).children("div").css("display","block");
	},function(){
		$(this).children("div").css("display","none");
	})
	
	if($(".thumb").length>0){
		$.get("http://quan.csc86.com/circle/api/info?id=62ab4452-d871-49a4-89e5-09c6ad2647cc",function(data){;
			$(".thumb .g-c-f .g-f-l").html(data.data.memberSum+'<br>成员');
			$(".thumb .g-c-f .g-f-r").html(data.data.topicCount+'<br>话题');
		},"jsonp");
	}
	if($(".tring .tgl").length>0){
		$.get("http://quan.csc86.com/circle/api/info?id=62ab4452-d871-49a4-89e5-09c6ad2647cc",function(data){;
			$(".tring .tgl div:eq(0)").html('&#12288;'+data.data.memberSum+'<span class="g-f-r">'+data.data.topicCount+'</span>');
		},"jsonp");
	}
	
});

function bmto(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"在线报名",padding:"20px",content:'<div class="tablewidth"><table  border="0" cellspacing="0" cellpadding="0">'+
		 '<tr><td colspan="2"><input class="rg" type="radio" name="RadioGroup1" value="采购商" id="RadioGroup1_0" />采购商<input type="radio" name="RadioGroup1" value="供应商" id="RadioGroup1_1"class="rg" />供应商</td></tr>'+
		  '<tr><th><em>*</em>公司名称:</th><td><input name="gsmc" type="text" /></td></tr>'+
		  '<tr><th><em>*</em>所属行业:</th><td><input name="sshy" type="text" /></td></tr>'+
		  '<tr><th><em>*</em>联系人:</th><td><input name="lxr" type="text" /></td></tr>'+
		  '<tr><th><em>*</em>联系电话:</th><td><input name="lxdh" type="text" /></td></tr>'+
		  '<tr><th>电子邮箱:</th><td><input name="dzyx" type="text" /></td></tr>'+
		  '<tr><td colspan="2" style="color:#f9f683">注：请填写真实的联系资料，带*标为必填项目。</td></tr></table></div>',
		ok: function() {
			var cg="",gy="";
			if($("input[name='RadioGroup1']:checked").attr("value")=="采购商"){
				cg="采购商";gy="";
			}else if($("input[name='RadioGroup1']:checked").attr("value")=="供应商"){
				cg="";gy="供应商";
			}
			var gsmc=$("input[name='gsmc']").val(),
				sshy=$("input[name=sshy]").val(),
				lxr=$("input[name=lxr]").val(),
				lxdh=$("input[name=lxdh]").val(),
				dzyx=$("input[name=dzyx]").val();
				if(gsmc==""||sshy==""||lxr==""||lxdh==""){
					if(gsmc==""){}
					if(sshy==""){}
					if(lxr==""){}
					if(lxdh==""){}
					return false;
				}
				$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 47,"subtype": "ajax","dosubmit":"生意红娘","info[cg]":cg,"info[gy]":gy,"info[gsmc]":gsmc,"info[sshy]":sshy,"info[lxr]":lxr,"info[lxdh]":lxdh,"info[dzyx]":dzyx},function(data){
				if(data.status == true){
					alert("恭喜您！信息填写成功！");
					$("input[name=gsmc]").val("");
					$("input[name=sshy]").val("");
					$("input[name=lxr]").val("");
					$("input[name=lxdh]").val("");
					$("input[name=dzyx]").val("");
				}else{
					alert("申请失败，请刷新后重试！");
				}
			},"jsonp");
		},cancel:true,
		fixed: true,background: '#000' ,opacity: 0.7 ,
		lock:true,
		icon: 'question',
		okVal: '保存'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");			
}
