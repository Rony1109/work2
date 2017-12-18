define(function(require, exports, module){
	var dialog=require('http://resmanage.csc86.com/v2/m/dialog/js/init.js');
	//单选框选择事件
	$('#radiogroup label').each(function(i, th) {
		$(th).on("click", function() {
			$(th).find("input").prop("checked", true)
		});
	});
	//主营行业多选框
	$("#hylist li").each(function(i, el) {
		$(el).find("input").change(function(e) {
			// e.preventDefault();
			var _th=$(this),spao=_th.next();
			if(_th.is(":checked")){//选中状态下
				if($('.hyselected span').size() >=3){
					dialog.tip("最多选择三个",2);
					_th.prop("checked", false);
				}else{
					$('.hyselected').append('<span  id="sled'+spao.prop("id")+'"><em>'+spao.text()+'</em><i>X</i></span>');
					rebindrem();					
				}
			}else{
				_th.prop("checked", false);
				$('.hyselected').find($("#sled"+spao.prop("id"))).remove();
			}
		})
		$(el).find("span").on("click",function(){
			checkedEvent($(this).siblings("input"),$(this));
		});
	});
	var rebindrem=function(){
		$('.hyselected span').each(function(i){
			var _t=$(this);
			_t.find("i").on("click",function(){
				var id=_t.prop("id").split("sled")[1];
				$("#"+id).siblings('input').prop("checked",false);
				_t.remove();
			});
		});
	};

	
	var checkedEvent=function(inpo,spao){
		if(inpo.is(":checked")){//状态是选中的
			inpo.prop("checked", false);
			$('.hyselected').find($("#sled"+spao.prop("id"))).remove();
		}else{
			inpo.prop("checked", true);
			if($('.hyselected span').size() >=3){
				dialog.tip("最多选择三个",2);
				inpo.prop("checked", false);
			}else{
				$('.hyselected').append('<span  id="sled'+spao.prop("id")+'"><em>'+spao.text()+'</em><i>X</i></span>');
				rebindrem();
			}			
		}
	}
	$("#hycate-btn").on("click", function() {
		if ($("#cate-panel").hasClass('show')) {
			$("#cate-panel").removeClass('show');
			$("#hycate-btn").val("选择");
		} else {
			if($('.cate-input-text').val()!=""){
				$("#cate-panel").addClass("show");
				$("#hycate-btn").val("X");
			}else{
				dialog.tip("请输入网址",2);
			}

			
		}
	});
	//查询事件
	$('.cate-search-btn').on("click",function(i){
		var url=$('.cate-input-text').val();		
		if(url==""){
			dialog.alert("请输入网址",1);
		}else{
			$(".g-dn").css("display","inline");
			$.ajax({
				type:"get",
				url:"http://bops.csc86.com/bops-app/bops/app.getShopCategory",
				dataType:"jsonp",
				data:{
					url:url
				},
				success:function(data){
					// console.log(data);
					var shopName=data.data.enterprise,
					shopid=data.data.id,
					moduleid=data.data.modelId,//经营类目id
					selllist=data.data.sellList,//主营产品/服务
					tradeList=data.data.tradeList;//主营行业

					$('#shopId').val(shopid);
					// 经营类目
					$("#"+moduleid).prop("checked",true);
					if($('.hyselected').children().length!=0){
						$('.hyselected').empty();
					}
					//主营行业
					for(var i in tradeList){
						var hyid=tradeList[i].id,hyname=tradeList[i].name;
						$('.hyselected').append('<span  id="sled'+hyid+'"><em>'+hyname+'</em><i>X</i></span>');
						rebindrem();
						$("#"+hyid).siblings('input').prop("checked",true);
					};
					for(var i in selllist){
						$('.cpservice li:eq('+i+')').find("input").val(selllist[i]);
					}
					$("#shopName").text(shopName);	
					$(".g-dn").css("display","none");
				},
				error:function(){
					dialog.tip('地址不存在或网络错误!',2,function(){
						$(".g-dn").css("display","none");
					});				
				}
			});
		}
	});
	//提交表单
	var typebool=true;
	$('input[type="submit"]').on("click",function(e){
		e.preventDefault();
		if(typebool){			
			if($('#shopId').val()!=""){
				var modelId=$("input[name='modeltype']:checked").prop("id"),
					modelname=$("#"+modelId).next("span").text(),sell="[",trade=[];
					//selllist组装
					var indexsell=0
					$(".cpservice li").each(function(i){			
						if($(this).find("input").val()!=""){		
							if(indexsell==0){
								sell+="'"+$(this).find("input").val()+"'";
							}
							else{
								sell+=",'"+$(this).find("input").val()+"'";
							}
							indexsell++;
						}
					});
					sell+="]";
					//trade组装
					$(".hyselected span").each(function(i){
						var id=$(this).prop("id").split("sled")[1],name=$(this).find("em").text();
						var tradeobj={
							'id':id,
							'name':name
						};
						trade.push(tradeobj);
					});
					
				$.ajax({
					type:"get",
					url:"http://bops.csc86.com/bops-app/bops/app.shopCategoryEdit",
					data:{
						id:$('#shopId').val(),
						modelId:modelId,
						model:modelname,
						sell:sell,
						trade:JSON.stringify(trade)
					},
					dataType:"jsonp",
					success:function(data){
						// console.log(data);
						if(data.success){
							dialog.tip(data.msg,2,function(){
							});
						}
					}
				});
			}else{
				dialog.alert("请查询商品地址");
			}
			
		}
	});

});