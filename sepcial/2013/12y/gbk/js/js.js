/* 供爆款
 * 2013.12.11
 * by lg
 */
function signNow(){//报名弹窗
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			art.dialog({padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">马上报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table border="0" cellspacing="0" cellpadding="0">'+
			  '<tr><th><em>*</em>姓名:</th><td><input name="nick" type="text" /><span>请输入您的姓名</span></td></tr>'+
			  '<tr><th><em>*</em>企业名称:</th><td><input name="cp" type="text" /><span>如无企业则填个人采购</span></td></tr>'+
			  '<tr><th><em>*</em>所属行业:</th><td><input name="hy" type="text" /><span>请输入所属行业</span></td></tr>'+
			  '<tr><th><em>*</em>月采购量:</th><td><input name="num" type="text" /><span>请输入月采购量</span></td></tr>'+
			  '<tr><th><em>*</em>联系电话:</th><td><input name="tel" type="text" /><span>请输入联系电话</span></td></tr>'+
			  '<tr><th><em>*</em>QQ:</th><td><input name="qq" type="text" /><span>请输入QQ</span></td></tr></table></div>',
			ok: function() {
				var nick = $("input[name='nick']").val(),
					cp=$("input[name='cp']").val(),
					hy=$("input[name=hy]").val(),
					num=$("input[name=num]").val(),
					tel=$("input[name=tel]").val(),
					qq=$("input[name=qq]").val();
					$(".tablewidth td span").removeAttr("style");
					if(nick =="" || cp==""||hy==""||num==""||qq==""||tel==""){
						if(nick==""){$("input[name='nick']").siblings("span").css("display","inline-block")}
						if(cp==""){$("input[name='cp']").siblings("span").css("display","inline-block")}
						if(hy==""){$("input[name='hy']").siblings("span").css("display","inline-block")}
						if(num==""){$("input[name='num']").siblings("span").css("display","inline-block")}
						if(tel==""){$("input[name='tel']").siblings("span").css("display","inline-block")}
						if(qq==""){$("input[name='qq']").siblings("span").css("display","inline-block")}
						return false;
					}
					$.post("http://cncms.csc86.com/formguide/index.php",{
						"formid": 43,
						"subtype": "ajax",
						"dosubmit":"供爆款第01期",
						"info[nick]":nick,
						"info[cp]":cp,
						"info[hy]":hy,
						"info[num]":num,
						"info[tel]":tel,
						"info[qq]":qq
					},function(data){
						if(data.status == true){
							alert("恭喜您！报名成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
							$("input[name=nick]").val("");
							$("input[name=cp]").val("");
							$("input[name=hy]").val("");
							$("input[name=num]").val("");
							$("input[name=tel]").val("");
							$("input[name=qq]").val("");
						}else{
							alert("报名失败，请刷新后重试！");
						}
				},"jsonp");
			},cancel:false,
			fixed: true,
			id: 'Fm7',
			okVal: '马上报名'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.signIn("location.reload");
			});
		}
	},"jsonp");
};

function closet(){art.dialog({id:'Fm7'}).close();}//关闭报名弹窗

function mlNow(){//选择面料
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			art.dialog({padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">我来配面料</span><a class="g-f-r" href="javascript:;" title="" onclick="closem()"></a></div><table border="0" cellspacing="0" cellpadding="0">'+
			  '<tr><th><em>*</em>姓名:</th><td><input name="nick" type="text" /><span>请输入您的姓名</span></td></tr>'+
			  '<tr><th><em>*</em>联系电话:</th><td><input name="tel" type="text" /><span>请输入联系电话</span></td></tr>'+
			  '<tr><th><em>*</em>企业名称:</th><td><input name="cp" type="text" /><span>如无企业则填个人采购</span></td></tr>'+
			  '<tr><th><em>*</em>旺铺网址:</th><td><input name="url" type="text" /><span>请输入旺铺网址</span></td></tr>'+
			  '<tr><th><em>*</em>产品名称:</th><td><input name="pn" type="text" /><span>请输入产品名称</span></td></tr>'+
			  '<tr><th><em>*</em>产品网址:</th><td><input name="purl" type="text" /><span>请输入产品网址</span></td></tr></table></div>',
			ok: function() {
				var nick = $("input[name='nick']").val(),
					tel=$("input[name=tel]").val(),
					cp=$("input[name='cp']").val(),
					url=$("input[name=url]").val(),
					pn=$("input[name=pn]").val(),				
					purl=$("input[name=purl]").val();
					$(".tablewidth td span").removeAttr("style");
					if(nick =="" || tel == "" || cp=="" || url == "" || pn == "" || purl == ""){
						if(nick==""){$("input[name='nick']").siblings("span").css("display","inline-block")}
						if(tel==""){$("input[name='tel']").siblings("span").css("display","inline-block")}
						if(cp==""){$("input[name='cp']").siblings("span").css("display","inline-block")}
						if(url==""){$("input[name='url']").siblings("span").css("display","inline-block")}
						if(pn==""){$("input[name='pn']").siblings("span").css("display","inline-block")}
						if(purl==""){$("input[name='purl']").siblings("span").css("display","inline-block")}
						return false;
					}
					$.post("http://cncms.csc86.com/formguide/index.php",{
						"formid": 42,
						"subtype": "ajax",
						"dosubmit":"供爆款第01期",
						"info[nick]":nick,
						"info[tel]":tel,
						"info[cp]":cp,
						"info[url]":url,
						"info[pn]":pn,					
						"info[purl]":purl
					},function(data){
						if(data.status == true){
							alert("恭喜您！报名成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
							$("input[name=nick]").val("");
							$("input[name=tel]").val("");
							$("input[name=cp]").val("");
							$("input[name=url]").val("");
							$("input[name=pn]").val("");						
							$("input[name=purl]").val("");
						}else{
							alert("报名失败，请刷新后重试！");
						}
				},"jsonp");
			},cancel:false,
			fixed: true,
			id: 'Fm8',
			okVal: '马上报名'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.signIn("location.reload");
			});
		}
	},"jsonp");			
};
function closem(){art.dialog({id:'Fm8'}).close();}//关闭面料弹窗

function addFavourite(url,title){//添加收藏
	function findKeys(){
		var isMSIE=/*@cc_on!@*/false;
		var ua=navigator.userAgent.toLowerCase(),isMac=(ua.indexOf("mac")!=-1),isWebkit=(ua.indexOf("webkit")!=-1),str=(isMac?"Command/Cmd":"CTRL");
		if(window.opera&&(!opera.version||(opera.version()<9))){str+=" + T"}
		else{
			if(ua.indexOf("konqueror")!=-1){str+=" + B"}
			else{if(window.opera||window.home||isWebkit||isMSIE||isMac){str+=" + D"}else{str+=" + D"}}
		}
		return str
	}
	try{
		if(document.all){window.external.addFavorite(url,title)}
		else{
			if(window.sidebar){window.sidebar.addPanel(title,url,"")}
			else{alert("浏览器不支持自动添加收藏夹。关闭本对话框后，请您手动使用组合快捷键'"+findKeys()+"'进行添加。")}
		}
	}catch(e){
		alert("浏览器不支持自动添加收藏夹。关闭本对话框后，请您手动使用组合快捷键'"+findKeys()+"'进行添加。")
	}
}

function getInviteLink(){
	$.get(csc.url("api","/member/GetInviteRegUrl"),function(str){
		if(str.status){
			art.dialog({padding:"20px",content:'<div class="tablewidth invt"><div class="tab-title"><span class="g-f-l">获取邀请链接</span><a class="g-f-r" href="javascript:;" title="" onclick="closed()"></a></div><div class="invt_code"><textarea id="areaSource" name="" cols="" rows="">亲！推荐你一个免费B2B平台，汇集最新采销商机，1分钟免费开店！涵盖B2B100多个行业，亿万采购商等你开店报价。'+str.data.url+'</textarea></div></div>',
			ok: function(){
				$("#areaSource").select();
				return false;
			},cancel:false,
			fixed: true,
			id: 'Fm9',
			okVal: '点击复制'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function(){
				csc.signIn("location.reload");
			});
		};		
	},"jsonp");
};
function closed(){art.dialog({id:'Fm9'}).close();}//关闭面料弹窗