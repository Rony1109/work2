/**/
$(function(){
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<505){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});
	$(".link-lc a").click(function(){
		$(".link-lc a").removeAttr("class");
		$(this).addClass("cur");
	});
	$(".but2").hover(function(){
		$(this).addClass("but3");						  
	},function(){$(this).removeClass("but3");	});
	//中奖名单
	/*$.get("http://cmssz.csc86.com/index.php?m=lottery&c=index&a=winner&eventid=1",function(data){	
			var to=data.length>8?8:data.length;
			for(var prop in data){
				var t01=data[prop].wintime*1000;
				var tdate = new Date(t01),prname;
				var ttdata=tdate.getFullYear()+"-"+(tdate.getMonth()+1)+"-"+tdate.getDate()+"-"+tdate.getHours()+":"+tdate.getMinutes();
				if(/\:/.test(data[prop].wininfo)){
					var pr=data[prop].wininfo.split(":");
					prname=pr[1];
				}else{
					prname=data[prop].wininfo;
				}
				if(prop%2==0){
					$("#tabletr").append("<ul><li class='td01'>"+data[prop].winners+"</li><li  class='td02'>"+prname+"</li><li  class='td03'>"+ttdata+"</li></ul>");
				}else{
					$("#tabletr").append("<ul style='background:#fdebaf'><li class='td01'>"+data[prop].winners+"</li><li  class='td02'>"+prname+"</li><li  class='td03'>"+ttdata+"</li></ul>");
				}
			} 
	},"jsonp");	 
	*/
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}
	},"jsonp");
		   
	/*var s=false;
	var rTi;
	$('.contwo').hover(function(){
			 clearInterval(rTi);
			 s=false;
		 },function(){
			 if(!s){
				 s=true;
				 rTi = setInterval(function(){
					tief();
				} ,2000);
			}
	 }).trigger("mouseleave");
	var tief=function(){
		var self=$(".contwo"),lih=$(".contwo ul.show").index();
		//alert(lih); return;
		if(lih==3){
			s=false;
			self.children("ul.show").removeClass("show").siblings("ul:eq(0)").addClass("show");
			$(".contwo .title-01 span").children("a.cur").removeClass("cur").siblings("a:eq(0)").addClass("cur");
		}else{
			s=false;
			self.children("ul.show").removeClass("show").next().addClass("show");
			$(".contwo .title-01 span").children("a.cur").removeClass("cur").next().addClass("cur");
		}
	}
	$('.contwo .title-01 span a').hover(function(){
		$('.contwo .dt04').removeClass("show");
		$('.contwo  .title-01 span a').removeClass("cur");	
		$(this).addClass("cur");
		$(".contwo .dt04:eq("+$(this).index()+")").addClass("show");
	});	 */ 
	
	/*var container = $$("idContainer"), src = "style/img/cjz.gif",
	options = {
		onPreLoad: function(){container.style.background= "url(style/img/cjz.gif) no-repleat center center"; },
		onLoad: function(){ container.style.backgroundImage = ""; }
	},
	it = new ImageTrans( container, options );
	it.load(src);
	
	//右旋转
	var idrgh=false,nu=0,terval,terval02,terval03,terval04,terval05;
	$$("idRight").onclick = function(){
		var nuto;
		it.reset();
		$.get("http://api.csc86.com/api/member/draw",function(data){
			if(data.code==0){
				seajs.use(csc.url("res","/f=js/m/sign"),function (){			
					//csc.checkSign();
					csc.checkSign("location.reload");
				});
			}
			if(data.status==false){
				$(".cjbg a").css("display","none");$(".cjbg .cjspan02").css("display","block");
				switch(data.code){
					case -1:
						artDialog({padding:"30px 0 20px",content:'<div class="tablewidth"><h1 class="lay-h1">活动已过期！</h1><span class="lay-span">请关注华南城其它活动！</span></div>',fixed: false,lock:'false',okVal: '确认'});
						$(".cjbg a,.cjbg .cjspan02").removeAttr("style");
					break;
					case -2:
						artDialog({padding:"30px 0 20px",content:'<div class="tablewidth"><h1 class="lay-h1">非法操作！</h1></div>',fixed: false,ok: function() {},lock:'false',okVal: '确认'});
						$(".cjbg a,.cjbg .cjspan02").removeAttr("style");
					break;
					case -3:
						artDialog({padding:"30px 0 20px",content:'<div class="tablewidth"><h1 class="lay-h1">亲，抽奖失败，请重新抽过！</h1></div>',ok: function() {},fixed: false,lock:'false',okVal: '确认'});
						$(".cjbg a,.cjbg .cjspan02").removeAttr("style");
					break;
					case -4:
						artDialog({padding:"30px 0 20px",content:'<div class="tablewidth"><h1 class="lay-h1">亲，您已抽过奖啦！</h1><span class="lay-span">提交创业方案还有现金大奖哦！</span></div>',fixed: false,lock:'false',ok: function() {},okVal: '确认'});
						$(".cjbg a,.cjbg .cjspan02").removeAttr("style");
					break;
					case -5:
						nuto=8;
						if(!idrgh){
							idrgh=true;
								terval=setInterval(function(){
									if(nu<(6*70)){
										it.right();idrgh=false;nu++;
									}else{
										clearInterval(terval);
										terval02=setInterval(function(){
											if(nu<(6*83)){
												it.right();idrgh=false;nu++;
											}else{
												clearInterval(terval02);
												terval03=setInterval(function(){
													if(nu<(6*88)){
														it.right();idrgh=false;nu++;
													}else{
														clearInterval(terval03);
														terval04=setInterval(function(){
															if(nu<(6*92)){
																it.right();idrgh=false;nu++;
															}else{
																clearInterval(terval04);
																terval05=setInterval(function(){
																	if(nu<6*(96+nuto)-2){
																		it.right();idrgh=false;nu++;
																	}else{
																		idrgh=false;
																		nu=0;
																		clearInterval(terval05);
																		setTimeout(function(){artDialog({padding:"30px 0 20px",content:'<div class="tablewidth"><h1 class="lay-h2">很遗憾，没抽到奖品！</h1><span class="lay-span">请关注华南城其它活动！</span></div>',fixed: false,lock:'false',ok: function() {},okVal: '确认'});$(".cjbg a,.cjbg .cjspan02").removeAttr("style");},2000)
																	}
																},70);
															}
														},60);
													}
												},50);
											}
										},25);
									}
								},10);
						}//旋转end
					break;
					case -6:
						artDialog({padding:"30px 0 20px",content:'<div class="tablewidth"><h1 class="lay-h1">'+data.errors+'</h1></div>',fixed: false,lock:'false',ok: function() {},okVal: '确认'});
						$(".cjbg a,.cjbg .cjspan02").removeAttr("style");
					break;
					case -7:
						artDialog({padding:"30px 0 20px",content:'<div class="tablewidth"><h1 class="lay-h1">今天的活动已截止，请于明日准时参与！</h1><span class="lay-span">请关注华南城其它活动！</span></div>',fixed: false,lock:'false',ok: function() {},okVal: '确认'});
						$(".cjbg a,.cjbg .cjspan02").removeAttr("style");
					break;
				}
			}
			if(data.code==1&&data.status==true){
				$(".cjbg a").css("display","none");$(".cjbg .cjspan02").css("display","block");
				var jp='';
				switch(data.data.prizeid){
					case "11":jp="耳机";nuto=10;break;
					case "14":jp="Iphone手机壳";nuto=5;break;
					case "15":jp="USB风扇";nuto=4;break;
					case "16":jp="华美月饼";nuto=3;break;
					case "10":jp="16GU盘 ";nuto=11;break;
					case "12":jp="焖烧罐 ";nuto=9;break;
					case "9":jp="移动电源 ";nuto=12;break;
					case "13":jp="牛皮钱包 ";nuto=7;break;
					case "7":jp="Iphone5 ";nuto=1;break;
					case "8":jp="平板电脑 ";nuto=6;break;
				}*/
				
				/*抽奖状态*/
				/*if(!idrgh){
					idrgh=true;
						terval=setInterval(function(){
							if(nu<(6*70)){
								it.right();idrgh=false;nu++;
							}else{
								clearInterval(terval);
								terval02=setInterval(function(){
									if(nu<(6*83)){
										it.right();idrgh=false;nu++;
									}else{
										clearInterval(terval02);
										terval03=setInterval(function(){
											if(nu<(6*88)){
												it.right();idrgh=false;nu++;
											}else{
												clearInterval(terval03);
												terval04=setInterval(function(){
													if(nu<(6*92)){
														it.right();idrgh=false;nu++;
													}else{
														clearInterval(terval04);
														terval05=setInterval(function(){
															if(nu<6*(96+nuto)-2){
																it.right();idrgh=false;nu++;
															}else{
																idrgh=false;
																nu=0;
																clearInterval(terval05);
																setTimeout(function(){layInfo(jp);$(".cjbg a,.cjbg .cjspan02").removeAttr("style");},2000);
															}
														},70);
													}
												},60);
											}
										},50);
									}
								},25);
							}
						},10);
				}//旋转end
			}
		},"jsonp");	
		
	}*/

});


function layInfo(tmp){
	console.log("sd");
	artDialog({padding:"30px 0 0",content:'<div class="tablewidth"><h1 class="lay-h1">恭喜您中奖了！</h1><p>实物奖品将于活动结束后10个工作日统一邮寄，请您耐心等待。<br />请您务必正确无误的填写以下信息，<br />如因获奖者未能及时填写有效信息造成奖品无法邮寄，责任由获奖者自负。</p><table width="100%" border="0" cellspacing="0" cellpadding="0">'+
	'<tr><td>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<input type="text" class="lay-input" name="name" /></td><td>会员账号：<input type="text" class="lay-input" name="cont" disabled="disabled" value="'+$(".top-log b").html()+'"/></td></tr>'+
	'<tr><td>所中奖项：<input type="text" class="lay-input" disabled="disabled" name="pr" value="'+tmp+'"/></td><td>联系电话：<input type="text" class="lay-input" name="tel"/></td></tr>'+
	'<tr><td colspan="2"><ul><li>收货地址：</li><li><input type="text" class="lay-input02" name="adr"/></li></td>'+
	'<tr><td colspan="2">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编：<input type="text" class="lay-input" name="qq"/></td>'+'</tr></table><div class="lay-po">请填写以上信息！</div></div>',fixed: false,lock:'false',ok: function(){
	var name=$("input[name=name]").val(),
	cont=$("input[name=cont]").val(),
	pr=$("input[name=pr]").val(),
	tel=$("input[name=tel]").val(),
	adr=$("input[name=adr]").val(),
	qq=$("input[name=qq]").val();
	if(name==''||cont==''||tel==''||adr==''||qq==''){
		$(".lay-po").css("visibility","visible");
		return false;
	}
	if(/[^\d]/.test(tel)||/[^\d]/.test(qq)){
		$(".lay-po").html("联系电话、邮编为数字！");
		return false;
	}
	$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 26,"subtype": "ajax","dosubmit":"网商孵化基地中奖名单",
			 "info[name]":name,"info[cont]":cont,"info[pr]":pr,"info[tel]":tel,"info[adr]":adr,"info[qq]":qq},
		function(data){
			if(data.status == true){
				alert("中奖信息提交成功！");
			}else{
				alert("提交失败！");
			}
		},"jsonp");	
	},okVal: '确认'});
}


function postdj(){
	var cont=$("input[name=rg201]").val(),
	name=$("input[name=name]").val(),
	tel=$("input[name=tel]").val(),
	mail=$("input[name=mail]").val(),
	qq=$("input[name=qq]").val();
	if(cont==''||name==''||tel==''){
		alert('带"*"号为必填项，请重新输入！');
		return;
	}else{
		$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 26,"subtype": "ajax","dosubmit":"网商孵化基地",
			   "info[cont]":cont,"info[name]":name,"info[tel]":tel,"info[mail]":mail,"info[qq]":qq},
			   function(data){
			if(data.status == true){
				alert("报名信息已成功提交！");
				$("input[name=cont]").val("");
				$("input[name=name]").val("");
				$("input[name=tel]").val("");
				$("input[name=mail]").val("");
				$("input[name=qq]").val("");
			}else{
				alert("提交失败，请刷新后重试！");
			}
		},"jsonp");	
	}
}

function infobn(){
	artDialog({padding:"30px 0 20px",content:'<div class="tablewidth"><h1 class="lay-h1">方案内容</h1>'+
			  '<div class="conten-lay"><strong>第一部分 公司概况</strong><br />(一) 公司介绍<br />1、详细介绍公司背景、规模、团队、资本构成（或个人简历）；<br />2、 团队成员介绍（或个人取得的资格证等）<br />人员数量，核心成员在技术、运营或管理方面的经验和成功经历进行介绍。<br />(二) 公司（个人）经营战略<br />近期及未来3-5年的发展方向、发展战略和要实现的目标。<br /><strong>第二部分 产品及服务</strong><br />(一) 主营业务介绍<br />(二) 产品竞争力或技术优势<br /><strong>第三部分 行业及市场</strong><br />(一) 行业情况：行业发展历史及趋势<br /> (二) 市场潜力分析<br />(三) 行业竞争分析：<br />主要竞争对手及其优劣势对比分析，包括性能、价格、服务等方面；<br />(四) 市场规划：<br />公司未来3-5年的销售收入预测（融资不成功情况下）<br /><strong>第四部分 营销策略（非必填写项目）</strong><br />(一)目标市场分析<br />(二)客户行为分析<br />(三)营销业务计划<br />（1）建立销售网络、销售渠道、设立代理商、分销商方面的策略<br />（2）广告、促销方面的策略<br />（3）产品/服务的定价策略<br />（4）对销售队伍采取的激励机制<br /><strong>第五部分 风险及风险管理（非必填写项目）</strong><br />说明该项目实施过程中可能遇到的风险，及其应对措施。包括：技术风险、市场风险、管理风险、政策风险等。</div></div>',
	fixed: false,lock:'false',ok: function() {},okVal: '确认'});
}

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

function bname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			var zh=$("input[name=zh]").val(),
			name=$("input[name=name]").val(),
			tel=$("input[name=tel]").val(),
			mu=$("input[name=mu]").val(),
			hy=$("input[name=hy]").val(),
			ad=$("input[name=ad]").val(),
			cxxy=$("input[name=cxxy]").val();
			if(zh==""||name==""||tel==""||hy==""){
				alert('带"*"为必填项，请输入！');return;
			}else{
				$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 27,"subtype": "ajax","dosubmit":"创业方案报名",
					 "info[zh]":zh,"info[name]":name,"info[tel]":tel,"info[mu]":mu,"info[hy]":hy,"info[ad]":ad,"info[cxxy]":cxxy},
				function(data){
					if(data.status == true){
						alert("您已成功提交报名信息，感谢您对本次活动的支持！提交创业方案更有机会取胜哦！");
						$("input[name=zh]").val("");
						$("input[name=name]").val("");
						$("input[name=tel]").val("");
						$("input[name=mu]").val("");
						$("input[name=hy]").val("");
						$("input[name=ad]").val("");
						$("input[name=cxxy]").val("");
					}else{
						alert("报名内容，提交失败！");
					}
				},"jsonp");	
			}
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
	
}
 layInfo("顺东方大厦");

