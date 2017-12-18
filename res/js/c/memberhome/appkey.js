/*一键发布 列表页 dtt 2014.03.22*/
var appkey="";
$(function(){
	var memberId=$("#memberId").val();
	$.post("//member.csc86.com/alibaba/isHaveAuth",{"memberid":memberId},function(data){
		var signature=data.signurl,key=data.appkey,secret=data.secretkey;
		if(!data.status&&location.href.indexOf('?code=')>0){
			alikepsta();
			$("li.pr-push:eq(0),li.pr-push:eq(1)").removeClass("pr-starlive");
			var code=location.href.split("=");
				$.post('https://gw.open.1688.com/openapi/http/1/system.oauth2/getToken/'+key,{"grant_type":"authorization_code","need_refresh_token":true,"client_id":key,"client_secret":secret,"redirect_uri":"//member.csc86.com/product/sell/list.html","code":code[1]},function(data){		
				$.post("//member.csc86.com/alibaba/saveToken",{"memberid":memberId,"tokeninfo":data},function(data){
					artDialog({id:'alikepsta'}).close();
					if(data.status==1)	{
						keysuccess();
						//csc.success("您选择的第三方平台授权成功，请选择产品一键发布第三方平台！",3);	
					}else if(data.status==4){
						infonotwir();
					}else{
						csc.tip("您选择的第三方平台授权过程中，信息中断或信息获取失败！",3);
					}													  
				},"jsonp");																																																											 			});
		}
	},"jsonp");
})

var alikepsta=function(){
	csc.useDialog(function(){
	artDialog({
		id:"alikepsta",
		title: '第三方平台授权状态',
		fixed: true,
		content:'<div class="aliprostart"><div class="loding-1688"><img src="//res.csc86.com/css/c/sign/img/loading.gif" alt="" /><Br /><Br /><Br />正在接收授权信息......</div></div>',
		icon:false
	});	});
}

var keysuccess=function(){
	$("li.pr-push:eq(0),li.pr-push:eq(1)").addClass("pr-starlive");
	csc.useDialog(function(){
	artDialog({
		id:"cscsnotinfo",
		title: '第三方平台授权状态',
		fixed: true,
		content:'<div class="aliprostart"><div class="alisuccr"><i class="alisur"></i><div><h2>第三方平台授权成功!</h2><span>开始选择产品，一键发布第三方平台。</span></div></div></div>',
		icon:false,
		time:3
	});	})
}

//一键发布
$("li.pr-starlive a").live("click",function(){
	var $pro=$(".c>:checkbox:checked").length;
	if($pro){
		$.post("//member.csc86.com/alibaba/isHaveAuth",{"memberid":$("#memberId").val()},function(data){
			var signature=data.signurl,key=data.appkey,secret=data.secretkey;
			if(data.status){
				appstart();
			}else{
			csc.useDialog(function(){
				artDialog({
					id:"cscset",
					title: '选择第三方平台',
					fixed: true,
					close:true,
					content:"<div class='ph-1688icon'><img src='//res.csc86.com/css/c/memberhome/img/albbset.png' alt='' /></div>",
					icon:false,
					ok:function(){
						location.href='http://gw.open.1688.com/auth/authorize.htm?client_id='+key+'&site=china&redirect_uri=http%3A%2F%2Fmember.csc86.com%2Fproduct%2Fsell%2Flist.html&_aop_signature='+signature;
					},
					okVal:"确认"
				});	
			});
			}
		},"jsonp");	
	}else{
		csc.tip("请选中数据后操作");
	}	
});


var appstart=function(){
	csc.useDialog(function(){
		artDialog({
			id:"cscstart",
			title: '选择第三方平台类目',
			fixed: true,
			close:true,
			content:'<ul class="af-form"><li class="g-c-f aff-item"><div class="aff-key"><span class="star">*</span>产品类目：</div><div class="g-f-content aff-value pro-cate" id="alibastart"><select id="alibastr1" name="catid[0]"  size="6"></select><select id="alibastr2" name="productids[0]"  size="6"></select><div class="you-select">您当前选择的类目是：<span>尚未选择</span></div></div></li></ul>',
			icon:false,
			ok:function(){
				var $prod=[],
					leng=$("#alibastart select").length,
					$list2=$("#alibastr"+leng+" option:selected");
				if($list2.length==0){
					$("#alibastart div.you-select").html('您当前选择的类目是：<strong>尚未选择类目</strong');
					return false;
				}else{
					$(".c>:checkbox:checked").each(function (i,v){
						$prod[i]=v.value;
					});
					var topro=$prod.join(',');
					aliprostart($list2.val(),topro);
				}
			},
			init:function(){
				$("div.aui_content").css("padding","20px 25px 6px 0");
				$.post("//member.csc86.com/alibaba/findLevel1Category",function(data){
					var set1='';
					 $.each(data,function(i,v){
						set1+='<option value="'+v.catsid+'">'+v.catsname+'</option>';				 
					});
					$("#alibastr1").prepend(set1);
				},"jsonp");
				
				$('#alibastart').delegate('#alibastr1', "change",function(){
					var $th=$("#alibastr1 option:selected");
					$.post("//member.csc86.com/alibaba/findChildCategory",{'parentCategory':$th.val()},function(data){
						var set2='';
						 $.each(data,function(i,v){
							set2+='<option value="'+v.catsid+'">'+v.catsname+'</option>';			 
						});
						$("#alibastr2").prepend(set2);
						$("#alibastart div.you-select").html('您当前选择的类目是：<strong><span>'+$th.html()+'</span></strong');
					},"jsonp");	
					
				}).delegate("#alibastr2",'change',function(){
					var $th=$("#alibastr2 option:selected");
					$.post("//member.csc86.com/alibaba/findChildCategory",{'parentCategory':$th.val()},function(data){
						if(!!data){
							var set3='<select id="alibastr3" name="catid[0]"  size="6">';
							 $.each(data,function(i,v){
								set3+='<option value="'+v.catsid+'">'+v.catsname+'</option>';				 
							});
							 set3+='</select>';
							if($("#alibastart select").length==3){
								$("#alibastr3").replaceAll(set3); 
							}else{
								$("#alibastr2").after(set3);
							}
							
						}
					},"jsonp");	
					var $th1=$("#alibastr1 option:selected").html(),
						$th2=$("#alibastr2 option:selected").html();
					$("#alibastart div.you-select strong").html('<span>'+$th1+'</span><span>&nbsp;&gt;&nbsp;'+$th2+'</span>');
				}).delegate("#alibastr3","change",function(){
					var $th=$("#alibastr3 option:selected");
					$.post("//member.csc86.com/alibaba/findChildCategory",{'parentCategory':$th.val()},function(data){
						if(!!data){
							var set4='<select id="alibastr4" name="catid[0]"  size="6">';
							 $.each(data,function(i,v){
								set4+='<option value="'+v.catsid+'">'+v.catsname+'</option>';				 
							});
							 set4+='</select>';
							if($("#alibastart select").length==4){
								$("#alibastr4").replaceAll(set4); 
							}else{
								$("#alibastr3").after(set4);
							}
						}
					},"jsonp");	
						var $th1=$("#alibastr1 option:selected").html(),
							$th2=$("#alibastr2 option:selected").html(),
							$th3=$("#alibastr3 option:selected").html();
							$("#alibastart div.you-select strong").html('<span>'+$th1+'</span><span>&nbsp;&gt;&nbsp;'+$th2+'</span><span>&nbsp;&gt;&nbsp;'+$th3+'</span>');
					
				}).delegate("#alibastr4","change",function(){
					var $th1=$("#alibastr1 option:selected").html(),
						$th2=$("#alibastr2 option:selected").html(),
						$th3=$("#alibastr3 option:selected").html(),
						$th4=$("#alibastr4 option:selected").html();
					$("#alibastart div.you-select strong").html('<span>'+$th1+'</span><span>&nbsp;&gt;&nbsp;'+$th2+'</span><span>&nbsp;&gt;&nbsp;'+$th3+'</span><span>&nbsp;&gt;&nbsp;'+$th4+'</span>');
				});
			},
			okVal:"发布"
		});	
	});
}

var aliprostart=function(list,tipro){
	csc.useDialog(function(){
	artDialog({
		id:"cscsto",
		title: '第三方平台发布状态',
		fixed: true,
		content:'<div class="aliprostart"><div class="loding-1688"><img src="//res.csc86.com/css/c/sign/img/loading.gif" alt="" /><Br /><Br /><Br />请勿关闭 ，正在发布中......</div></div>',
		icon:false,
		init:function(){
			$.post("//member.csc86.com/alibaba/sendInfoAlibaba",{'catid':list,'productids':tipro,'memberid':$("#memberId").val()},function(data){
				var topro=data.join("、");
				artDialog({id:'cscsto'}).close();
				if(data.length>0){
					infosuccess(topro);
				}else{
					csc.tip("此产品不能重复发布或发布失败！",5);
				}
			},"jsonp");
		}
	});	})
}

var infosuccess=function(topro){
	csc.useDialog(function(){
	artDialog({
		id:"cscsnotinfo",
		title: '第三方平台发布状态',
		fixed: true,
		close:true,
		content:'<div class="aliprostart"><div class="alisuccr"><i class="alisur"></i><div><h2>发布成功!</h2><span>产品：'+topro+'，在第三方平台默认分类</span></div></div></div>',
		icon:false,
		ok:function(){
			location.reload();
		},
		okVal:"确定",
		cancel:false
	});	})
}

var infonotwir=function(){
	csc.useDialog(function(){
	artDialog({
		id:"cscsnotinfo",
		title: '第三方平台授权状态',
		fixed: true,
		close:true,
		content:'<div class="aliprostart"><div class="notinfo"><strong>您在第三方平台旺铺未开通！</strong><span>开通旺铺才能发布产品</span></div></div>',
		icon:false,
		ok:function(){
			artDialog({id:'cscsnotinfo'}).close();
			window.open("http://corp.1688.com/company/post_company.htm","_blank");
		},
		okVal:"马上开通旺铺",
		cancel:"取消"
	});	})
}






