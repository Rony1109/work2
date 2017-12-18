csc.shopAdvMax = function (id,width,height){
	var
		$id = $("img[data-maxw]:hidden"),
		_do = function (id,act,max){
			if(max){
				var ratio = Math.min(max.width /act.width,max.height /act.height);
				if(ratio < 1){
					id.width = act.width*ratio;
					id.height = act.height*ratio;
				}else{
					id.width = Math.min(act.width , max.width);
					id.height = Math.min(act.height , max.height);
				}
			}
			$(id).fadeIn("fast");
		};
	seajs.use(csc.url("res","/f=js/m/imgReady"),function (){
		$.each($id,function (i,v){
			var
				width = $(this).data("maxw"),
				height = $(this).data("maxh");
			imgReady(v.src, function () {
				_do(v,{width:this.width,height:this.height},{width:width,height:height});
			});
		});
	});
};

csc.SequenceUp = function(){
    var	othis = this;
    $("table").delegate("td a.gup","click",function(){
        var $t = $(this),ids = $t.parents("td").data("id");
        othis.ajaxSequence(ids,"up",$t);
        return false;
    });
    return this;
}

csc.SequenceDown = function(){
    var	othis = this;
    $("table").delegate("td a.gdown","click",function(){
        var $t = $(this),ids = $t.parents("td").data("id");
        othis.ajaxSequence(ids,"down",$t);
        return false;
    });
    return this;
}

csc.ajaxSequence = function(ids, type,obj){
    var	othis = this,
        moveType;
    switch(type){
        case "up":
            moveType = 'U';
            break;
        case "down":
            moveType = 'D';
            break;
        default :
            ;
    }
    $.post("/shop/moveproduct",{"proid":ids,"moveType":moveType},function (data){
        if(data.status){
            if($.browser.msie && $.browser.version < 9.0){
                setTimeout(function(){location.reload()},2000);
            }else{
                $.get(location.href,function (data){
                    $("div.af-bd").html($("div.af-bd",data).html());
                    csc.SequenceDown().SequenceUp();
                });
            }
        }
    },"jsonp");
}

$(function(){

//	if(csc.param){
//		$('#classifySelect').val(csc.param('classify'));
//	}else{
//		seajs.use(csc.url('res','/f=js/m/param'),function(){
//			$('#classifySelect').val(csc.param('classify'));
//		});
//	}

	$('.checkedAll label').live("click",function(){
		if($(this).find('input').is(':checked')){
			$('.pro-list tbody input[type="checkbox"],.checkedAll input[type="checkbox"]').attr('checked','checked');
		}else{
			$('.pro-list tbody input[type="checkbox"],.checkedAll input[type="checkbox"]').removeAttr('checked');
		}
	});
	csc.useDialog(function (){
		$("#af-list-bd tr td a.less-recom").live("click",function(){
			var id=$(this).parents("tr").find('input[type="checkbox"]').val(),arrId=[];
			arrId[0]=id;
			if(window.location.href.indexOf("showcaseRecommend")!=-1){
				$.post("/shop/showcaseRecommend",{"arrId":arrId,"t":"less"},function(data){
					if(data.status){
					
						csc.success(data.msg,2);
						setTimeout(function(){
							location.reload();
						},2000);
					}else{
						csc.alert(data.msg);
					}
				},"jsonp");
			}else if(window.location.href.indexOf("product")!=-1){
				$.post("/shop/product",{"arrId":arrId,"t":"less"},function(data){
					if(data.status){
						csc.success(data.msg,2);
						setTimeout(function(){
							location.reload();
						},2000);
					}else{
						artDialog({
							id:"cscAlert",
							content:data.msg,
							fixed: true,
							title: false,
							icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
							cancelVal: '关闭',
							cancel: true
						});
					}
				},"jsonp");
			}
		});
		
		$(".cert-tb").delegate("td .del","click",function(event){
			event.preventDefault();
			var
				delIdUrl = $(this).attr("href"),
				msg = '确认删除吗？';
			artDialog({
					content:msg,
					fixed: true,
					title:"删除荣誉证书",
					width:330,
					ok:function(){
						location.href = delIdUrl;
					},
					cancel:true,
					lock:true
			});
		});
		
		$(".canncelRec").live("click",function(){
			var
			arrId=[],
			$checked = $("#af-list-bd tr td input:checked");
			$checked.each(function(index, element) {
			   arrId[index] = $(this).val();
			});
			if($checked.length>0){
				if(window.location.href.indexOf("showcaseRecommend")!=-1){
					$.post("/shop/showcaseRecommend",{"arrId":arrId,"t":"more"},function(data){
						if(data.status){
							csc.success(data.msg,2);
							setTimeout(function(){
								location.reload();
							},2000);
						}else{
						csc.alert(data.msg);
						}
					},"jsonp");
				}else if(window.location.href.indexOf("product")!=-1){
					$.post("/shop/product",{"arrId":arrId,"t":"more"},function(data){
						if(data.status){
							csc.success(data.msg,2);
							setTimeout(function(){
								location.reload();
							},2000);
						}else{
							artDialog({
								id:"cscAlert",
								content:data.msg,
								fixed: true,
								title: false,
								icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
								cancelVal: '关闭',
								cancel: true
							});
						}
					},"jsonp");
				}
			}else{
				csc.tip("请选中数据后操作",2);
			}
		});
		
		$(".add-cert-btn").bind("click",function(event){
			event.preventDefault();
			var
				$t = $(this),
				id = $t.attr("id"),
				href = $t.attr("href");
            if(href == "javascript:csc.cstVerify();"){
                csc.cstVerify();
            }else{
                if(id==0){
                    csc.alert("您只能上传15张荣誉证书");
                }else if(id==1){
                    location.href = '/shop/addcertificates';
                }
            }
		});
		
		$('#search-btn').click(function(){
				$("#classifySelect01").submit();
		});
		$('#classifySelect').change(function(){
			$("#classifySelect00").submit();
		});

		$('.proClassify tbody').delegate(".p-cate-l ul li","click",function(){
			var
			$t = $(this)
			thisId = $t.attr('id'),
			Txt =$t.text(),
			arrId =[];
			arrId[0] = $t.parents('td').parent('tr').attr('id');
			$.get("/shop/proCate",{"thisId":thisId,"arrId":arrId},function(data){
				if(data.status){
					setTimeout(function(){
						$(this).parent('td').prev('td').html(Txt);
						location.reload();
					},1000);
				}
			},"jsonp")
			$t.parents(".p-cate-b").removeClass("p-cate-b-h");
		});
		
	$(".af-page").delegate(".p-cate-l ul li","click",function(){
		var
		$t = $(this),
		arrId =[],
		Txt =$t.text(),
		thisId = $t.attr("id"),
		$checkArr = $('.proClassify tbody input:checked');
		if($checkArr.length > 0){
			$.each($checkArr,function(i){
				arrId[i] =$($checkArr[i]).parent('td').parent('tr').attr('id');
			});
		}else{
			csc.useDialog(function(){
				csc.tip("请选中数据后操作！");
			});
		}
		$.get("/shop/proCate",{"thisId":thisId,"arrId":arrId},function(data){
			if(data.status){
				setTimeout(function(){
					location.reload();
				},1000);
			}
		},"jsonp")
		$t.parents(".p-cate-b").removeClass("p-cate-b-h");
	});
        //vip域名提示
        $("#vipdomain").bind("click",function(){
            csc.tip('亲，请联系我们客服来帮您开通服务&nbsp;&nbsp;&nbsp;<br/><br/>客服热线：<span style="color:#f60;">400-184-8666</span>',10);
        });
    });
	
	seajs.use(csc.url("res","/f=js/m/hover"),function (){
		csc.hover("div.p-cate-b","p-cate-b-h");
	});

	$('.tt-close').click(function(){$(this).parent().hide();});
	
	var 
		shopIndex = location.href.indexOf("/shop/"),
		shopLeftUrl = location.href.slice(shopIndex);
		$('.nav-items ul li a[href="'+ shopLeftUrl +'"]').parent('li').addClass('cur');	

	(csc.ie6 || csc.ie8) && csc.shopAdvMax();

    csc.SequenceDown().SequenceUp();

	//旺铺装修过期提醒
	var _jsWpZxItm=$('.jsWpZxItm');
	_jsWpZxItm.find('.close').bind('click',function(){
		_jsWpZxItm.find('.wpgq-tips').remove();
	});
	
});

