// 广告管理查看付费词信息
function keywordView(obj){
	var
		$t = $(obj),
		keyId = $t.parents("tr").find("input[type='checkbox']").attr("id"),
		key = $t.parent("td").siblings("td:eq(1)").html(),
		proId = $t.parent("td").siblings("td:eq(2)").html(),
		conpany = $t.parent("td").siblings("td:eq(3)").html(),
		time = $t.parent("td").siblings("td:eq(4)").html(),
		turnSrc  = "";
		if(location.href.indexOf("getAllPayKeyWord")!=-1){
			turnSrc = "all";
		}else if(location.href.indexOf("getUnderwayPayKeyWord")!=-1){
			turnSrc = "inProgress";
		}else if(location.href.indexOf("getOverTimePayKeyWord")!=-1){
			turnSrc = "expired";
		}
		art.dialog({
			 title:'查看关键词',
			content: '<ul class="key-bute-list"><li><span>关键词：</span><p>'+ key +'</p></li><li><span>绑定产品ID：</span><p>'+ proId +'</p></li><li><span>付费企业名称：</span><p>'+ conpany +'</p></li><li><span>到期时间：</span><p>'+ time +'</p></li></ul>',
			fixed: true,
			opacity:"0.3",
			button: [{
				name: '修改',
				callback: function () {
					$.get("paykeywordManager.IsExitPayKeyWord",{"keyId":keyId,"turnSrc":turnSrc},function(data){
						if(data.status == "true"){
							location.href = "paykeywordManager.updatePayKeyWord?keyId=" + keyId + "&turnSrc="+turnSrc;
						}else{
							art.dialog({content:data.data,icon: 'error',fixed: true,time: 2.5});
						}
					},"jsonp");
				},
				focus: true
				}],
			ok: function(){},
			lock:true
		});
}

//付费词删除操作提示
function rReturn(d,po,pt){
	if(!d){
		art.dialog({content: pt,icon: 'error',fixed: true,time: 1.5});
	}else{
		art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
		setTimeout(function(){location.href = location.href;},1500);
	}
}

//关键词绑定的产品数
function checkWordBindNum(){
	var startTime = $("#startTime").val().replace(/\s+/g,"");
	var endTime = $("#endTime").val().replace(/\s+/g,"");
	var keyWord = $("#keyWord").val().replace(/\s+/g,"");
	var id = $("#id").val();
	if(startTime.length < 1 || endTime.length < 1 || keyWord.length < 1){
		alert("请输入关键词，开始日期和结束日期");
		return;
	}
		jQuery.ajax({
	      type : 'GET',
	      url : 'paykeywordManager.keyWordBandNum?keyWord=' + keyWord + '&startTime=' + startTime + '&endTime=' + endTime + '&id='+ id,
	      dataType : 'json',
	      success : function(data) {
	      	if(data < 10){
	      		$("#productId").removeAttr("disabled");
	      	}else{
	      		alert("词：" + keyWord + "在" + startTime + "到" + endTime + "时间段内已绑定10个产品");
	      	}
	      },
	      error : function(data) {
	        alert("操作失败");
	      }
	    });
	}



$(function() {
  var $form = $('form[data-form="payKeyWord"]');
  $form.bind('submit', function() {
    checkParamAndSubmit($(this));
    return false;
  });

  var $member = $('#memberName'),
    $month = $form.find('select[name="month"]'),
    $product = $('#productId'),
    $memberId = $('#memberId');
  $form.delegate('.btnlink[value="检测"]', 'click', function(event) {
    var val = $member.val();

    if (val == '') {
      artDialog({
        content: '请输入会员账号',
        icon: 'error',
        time: 2
      });
      return;
    }
    $member.data('prev', val);
    var $t = $(this).prop('disabled', true);
    $.get('paykeywordManager.examineAccount', {
      memberName: val
    }, function(data) {
      $t.removeProp('disabled');
      if (data['success'] == true) {
        var list = data['monthsList'];
        //后台去处理
        // if (list.length == 0) {
        //   artDialog({
        //     content: '此会员没有添加权限',
        //     icon: 'error',
        //     time: 2
        //   });
        //   return;
        // }
        var html = '';
        for (var i = 0; i < list.length; i++) {
          html += '<option value="' + list[i]['id'] + '#' + list[i]['months'] + '">' + list[i]['months'] + '个月</option>';
        }
        $memberId.val(data['memberId']);
        $month.html(html).prop('disabled', false);
        $product.prop('disabled', false);
      } else {
        artDialog({
          content: data['msg'] || '检测失败，请稍后重试',
          icon: 'error',
          time: 2
        });
      }
    }, 'jsonp');
  }).delegate('#memberName', 'blur', function(event) {
    var $t = $(this);
    if ($t.val() != $t.data('prev')) {
      $t.data('prev', $t.val());
      $month.prop('disabled', true).empty();
      $product.prop('disabled', true).val('');
    }
  });

});

//添加旭日排名
function checkParamAndSubmit($form) {
  var keyWord = $("#keyWord").val().replace(/\s+/g, "");
  var productId = $("#productId").val().replace(/\s+/g, "");
  var memberName = $("#memberName").val().replace(/\s+/g, "");
  // var startTime = $("#startTime").val().replace(/\s+/g,"");
  // var endTime = $("#endTime").val().replace(/\s+/g,"");
  // var charge = $("#charge").val().replace(/\s+/g,"");
  //  var starts = $("#starts").val().replace(/\s+/g,"");
  // var serviceType = $("#serviceType").val().replace(/\s+/g,"");
  var companyName = $("#companyName").val();
  var memberId = $("#memberId").val();
  var isObligate = $("[name='isObligate']:checked").val();
  if (memberName.length < 1) {
    artDialog({
      content: '请输入会员名！',
      icon: 'error',
      time: 2
    });
    return;
  }
  if (keyWord.length < 1) {
    artDialog({
      content: '请输入关键词！',
      icon: 'error',
      time: 2
    });
    isSubmit = false;
    return;
  }
  var keyWord1 = $("#keyWord").val().replace(/[^\d\w\u4e00-\u9fa5]+$/g, "");
  if (keyWord1.length < 1) {
    artDialog({
      content: '关键词不能全为特殊字符，请修改！',
      icon: 'error',
      time: 2
    });
    return;
  }
  if (keyWord.length > 35) {
    artDialog({
      content: '关键词太长了哦！不要超过35个字符！',
      icon: 'error',
      time: 2
    });
    return;
  }
  if (productId.length < 1) {
    artDialog({
      content: '请输入产品ID！',
      icon: 'error',
      time: 2
    });
    return;
  }


  //    if(starts.length < 1){
  //      alert("请获取关键词星级");
  //      isSubmit = false;
  //      return;
  //    }
  // if(startTime.length < 1 ){
  //  alert("服务起始时间获取失败！");
  //  return;
  // }

  // if(endTime.length < 1){
  //  alert("服务结束时间获取失败！");
  //  return;
  // }
  // if (charge.length < 1) {
  //   alert("请输入费用！");
  //   return;
  // }
  // var float = /^\d+(\.\d{1,2})?$/;
  // if (!float.test(charge)) {
  //   alert("请检查费用格式是否输入有误！");
  //   return;
  // }

  //  if(starts.length < 1){
  //    alert("请获取星级");
  //    return;
  //  }
  // if ($("#productId").attr("disabled")) {
  //   artDialog({
  //     content: '请先验证关键词是否有效',
  //     icon: 'error',
  //     time: 2
  //   });
  //   return;
  // }
  jQuery.ajax({
    type: 'post',
    url: $form.attr('action'),
    data: $form.serializeArray(),
    dataType: 'jsonp',
    success: function(data) {
      if (data.success == true) {
        artDialog({
          content: '操作成功!',
          icon: 'succeed'
        });
        setTimeout(function(){
          location.href = data['url'];
        }, 2000);
      } else {
        artDialog({
          content: '操作失败:' + data.msg,
          icon: 'error',
          time: 2
        });
      }
    },
    error: function(data) {
      artDialog({
        content: '操作失败',
        icon: 'error',
        time: 2
      });
    }
  });
}


//诚商通页面旭日管理页面添加或更新
function dialogTip(msg, closeTime, callback){
	artDialog({
		id: 'xrpmTip',
		content: msg || '提示信息',
		fixed: true,
		lock:true,
		opacity: .1,
		icon: 'csc-tip',
		time: closeTime || 1.5,
		close: callback || null
	});
}
function dialogSuc(msg, closeTime, callback){
	artDialog({
		id: 'xrpmSuc',
		content: msg || '成功提示',
		fixed: true,
		lock:true,
		opacity: .1,
		icon: 'succeed',
		time: closeTime || 1.5,
		close: callback || null
	});
}
	function submitForm(){
		 //id
        var id = $("input[name='id']").val().replace(/\s+/g,"");
        //会员ID
        var memberId = $("input[name='memberId']").val().replace(/\s+/g,"");
        //关键词keyWord
        var keyWord = $("input[name='keyWord']").val().replace(/\s+/g,"");
        //绑定产品productId
        var productId = $("input[name='productId']").val().replace(/\s+/g,"");
        //星级
  //      var starts = $("input[name='starts']").val().replace(/\s+/g,"");
        //服务类型
        var serviceType = $("input[name='serviceType']").val().replace(/\s+/g,"");
        //公司名称
        var companyName = $("input[name='companyName']").val().replace(/\s+/g,"");
         //会员账号
        var memberName = $("input[name='memberName']").val().replace(/\s+/g,"");
        //结束时间
        var endTime = $("input[name='endTime']").val().replace(/\s+/g,"");
        //是否为预留48小时
        var isObligate = $("input[name='isObligate']").val().replace(/\s+/g,"");
        var isSubmit = true;

        if(memberId.length < 1){
        	dialogTip("会员ID丢失");
        	isSubmit = false;
        	return;
        }
        if(keyWord.length < 1){
        	dialogTip("请输入关键词");
        	isSubmit = false;
        	return;
        }
        var keyWord1 = $("#keyWord").val().replace(/[^\d\w\u4e00-\u9fa5]+$/g,"");
		if(keyWord1.length <1){
			dialogTip("关键词不能全为特殊字符，请修改！");
			return;
		}
        if(productId.length < 1){
        	dialogTip("请输入产品ID");
        	isSubmit = false;
        	return;
        }
    //    if(starts.length < 1){
    //    	alert("请获取关键词星级");
    //    	isSubmit = false;
    //    	return;
    //    }
        if(serviceType.length < 1){
        	dialogTip("服务类型获取失败");
        	isSubmit = false;
        	return;
        }
        if(companyName.length < 1){
        	dialogTip("公司名称获取失败");
        	isSubmit = false;
        	return;
        }
        if(memberName.length < 1){
        	dialogTip("会员账号获取失败");
        	isSubmit = false;
        	return;
        }
        if(endTime.length < 1){
        	dialogTip("服务结束时间获取失败");
        	isSubmit = false;
        	return;
        }
    //    if(starts > 3){
    //    	alert("大于3星级的词是保留此，不能用");
    //    	isSubmit = false;
   //    	return;
    //    }
        if(isSubmit && $("input[name=productId]:not(:disabled)")){
        	//$("#add_or_update_payword_form").submit();
        	jQuery.ajax({
	      type : 'GET',
	      url : 'paykeywordManager.cstAjaxAddOrUpdatePayWord',
	      data: {id:id, keyWord:keyWord, serviceType:serviceType, productId:productId, companyName:companyName, memberName:memberName, endTime:endTime, memberId:memberId,isObligate:isObligate},
	      dataType : 'json',
	      success : function(data) {
	      	if(data.status=="true"){
	      		dialogSuc("操作成功!",1.5,function(){
					location.href = "paykeywordManager.manageCstBindPayKeyWord?memberId=" + memberId + "&companyName=" + companyName + "&endTime=" + endTime + "&serviceType=" + serviceType + "&memberName=" + memberName+"&isObligate="+isObligate;
				});
	      	}else{
	      		dialogTip("操作失败:" + data.msg,2.5);
	      	}
	      },
	      error : function(data) {
	        dialogTip("操作失败");
	      }
	    });
        }
	}


function keyWord_input_change(){
  //     $("input[name='starts']").attr("value","");
       $("#productId").attr("disabled","true");
   //    $("#show_starts").empty();
	}


//删除诚商通旭日排名
function deleteCstPayWord(id){
	artDialog.confirm('确定要删除吗？',function(){
		jQuery.ajax({
			type : 'GET',
			url : 'paykeywordManager.ajaxDeleteCstPayWord?id=' + id,
			dataType : 'json',
			success : function(data) {
				$("#dd_payword_" + id).remove();
			},
			error : function(data) {
				alert("操作失败");
			}
		});
	},function(){
	
	});
}

//诚商通旭日排名 从右到左效果
	function wantOption(id,keyWord,productId,serviceType){
		$("input[name='id']").attr("value",id);
		$("input[name='keyWord']").attr("value",keyWord);
		$("input[name='productId']").attr("value",productId);
	//	$("input[name='starts']").attr("value",starts);
		$("input[name='serviceType']").attr("value",serviceType);
		$("#productId").removeAttr("disabled");
	//	if(starts == 0){
	//				$("#show_starts").html('<b class="icon-d-star"></b><b class="icon-d-star"></b><b class="icon-d-star"></b>');
	//			}
	//			if(starts == 1){
	//				$("#show_starts").html('<b class="icon-y-star"></b><b class="icon-d-star"></b><b class="icon-d-star"></b>');
	//			}
	//			if(starts == 2){
	//				$("#show_starts").html('<b class="icon-y-star"></b><b class="icon-y-star"></b><b class="icon-d-star"></b>');
	//			}
	//			if(starts == 3){
	//				$("#show_starts").html('<b class="icon-y-star"></b><b class="icon-y-star"></b><b class="icon-y-star"></b>');
	//			}
	//			if(starts == 4){
	//				$("#show_starts").html('保留词！');
	//			}
		}

		//预留词添加提交
	function checkWordParamAndSubmit(){
		var word = $("#word").val().replace(/\s+/g,"");
	//	var categoryLevel = $("#categoryLevel").val().replace(/\s+/g,"");
		var remarks = $("#remarks").val().replace(/\s+/g,"");
		var isReserved = $("#isReserved").val().replace(/\s+/g,"");
		if(word.length < 1 || remarks.length < 1 || isReserved.length < 1){
			art.dialog({
				content: "所有参数都必填哦！",
				error: true,
				time: 1.5
			});
      		//alert(data.msg);
      		return false;

		}
		if(word.length >35){
			art.dialog({
				content: '关键词太长啦！不要超过35个字符哦！',
				error: true,
				time: 1.5
			});
			return false;

		}
		if(remarks.length>10){
			art.dialog({
				content: '备注太长啦！不要超过10个字符哦！',
				error: true,
				time: 1.5
			});
			return false;
		}

		jQuery.ajax({
	      type : 'GET',
	      url : 'paykeywordManager.addReservedWord',
	      data: {word:word, remarks:remarks, isReserved:isReserved},
	      dataType : 'json',
	      success : function(data) {
	      if(data.status=="true"){
	    	  art.dialog({
					content: '添加成功！',
					fixed: true,
					time: 1,
					close:function(){
						location.href = "paykeywordManager.getReservedWords?isReserved="+isReserved;
					}
				});
	      	}else{
	      		art.dialog({
					content: data.msg,
					error: true,
					time: 1.5
				});
	      		//alert(data.msg);
	      		return false;
	      	}
	      },
	      error : function(data) {
	    		art.dialog({
					content: data.msg,
					error: true,
					time: 1.5
				});
	      		//alert(data.msg);
	      		return false;
	      }
	    });
	}

function addPayKeyWord(){
	art.dialog({
		title:'付费预留添加',
		content: '<form action=""><dl class="add-key"><dt><span>*</span>关键词：</dt><dd><input type="text" name="word" id="word" /></dd><dt><span>*</span>预留备注：</dt><dd><input type="text" name="remarks" id="remarks"/><input type="hidden" name = "isReserved" id="isReserved" value="1"/></dd></dl></form>',
		fixed: true,
		ok:function(){
			return checkWordParamAndSubmit();
		},
		cancel:true,
		okVal:'添加'
	});
}

function addUnPayKeyWord(){
	art.dialog({
		title:'赠送预留添加',
		content: '<form action=""><dl class="add-key"><dt><span>*</span>关键词：</dt><dd><input type="text" name="word" id="word" /></dd><dt><span>*</span>预留备注：</dt><dd><input type="text" name="remarks" id="remarks"/><input type="hidden" name = "isReserved" id="isReserved" value="2"/></dd></dl></form>',
		fixed: true,
		ok:function(){
			return checkWordParamAndSubmit();
		},
		cancel:true,
		okVal:'添加'
	});
}

$(function(){
	$("#libWord>p>span:odd").addClass("bg");//词库添加奇偶行样式
//添加、修改付费词
	$("#paidkeyform .btn").bind("click",function(){
		var
			othis = $(this),
			$key = $("#keyWord"),
			$keyId = $("#keyId"),
			$pro_id = $("#productId"),
			$compay_name = $("#companyName"),
			$startTime = $("#startTime"),
			$endTime = $("#endTime"),
			msg = ['请输入关键词','请输入要绑定的产品Id','请填写付费企业名称','请选择开始时间','请选择结束时间'],
			newmsg = '',
			turnStatus = $("#turnSrc").val();
		if(_showErr($key,msg[0]) && _showErr($pro_id,msg[1]) && _showErr($compay_name,msg[2]) && _showErr($startTime,msg[3]) && _showErr($endTime,msg[4])){
			if(othis.attr("name") == "update"){
				$.get("paykeywordManager.submitUpdatePayKeyWord",{"keyId":$keyId.val(),"keyWord":$key.val(),"productId":$pro_id.val(),"companyName":$compay_name.val(),"startTime":$startTime.val(),"endTime":$endTime.val()},function(data){
					if(data.updateStatus=="true"){
						if(turnStatus=="expired"){
							location.href="paykeywordManager.getOverTimePayKeyWord";
						}else if(turnStatus=="inProgress"){
							location.href="paykeywordManager.getUnderwayPayKeyWord";
						}else if(turnStatus=="all"){
							location.href="paykeywordManager.getAllPayKeyWord";
						}
					}else{
						art.dialog({content:data.data,icon: 'error',fixed: true,time: 1.5});
						return false;
					}
				},"jsonp");
			}else{
				$.get("paykeywordManager.addPayKeyWord",{"keyWord":$key.val(),"productId":$pro_id.val(),"companyName":$compay_name.val(),"startTime":$startTime.val(),"endTime":$endTime.val()},function(data){
					if(data.addStatus=="true"){
						location.href="paykeywordManager.getAllPayKeyWord" ;
					}else{
						art.dialog({content:data.data,icon: 'error',fixed: true,time: 1.5});
						return false;
					}
				},"jsonp");
			}
		}


		function _showErr(t,msg){
			var
				patternT = /([\u4e00-\u9fa5]+$)/,
				patternH =  /(^[^A-Za-z0-9\u4e00-\u9fa5]+$)/,
				patternC =  /(^[^\u4e00-\u9fa5]+$)/,
				$err = $("<em class='err'>"+ msg +"</em>"),
				$t = t,
				arrtmp=['仅支持数字、字母、汉字，可输入2-16字数','仅支持数字、字母、符号等，可输入1-36字数','不允许全部是数字，不允许全部是英文，可输入4-128字数']
			if(!$.trim($t.val())){
				if($t.is($startTime) || $t.is($endTime)){
					$t.parent("li").find(".err").remove();
					$t.parent("li").append($err.html(msg).removeClass("g-v-h"));
				}else{
					if(!$t.next().is(".err")){
						$t.after($err.html(msg).removeClass("g-v-h"));
					}else{
						$t.next().removeClass("g-v-h");
					}
				}
				return false;
			}else{
				if($t.is($key) && ( patternH.test($key.val()) || $key.val().length < 2|| $key.val().length > 16)){
					if(!$t.next().is(".err")){
						$t.after($err.html(arrtmp[0]).removeClass("g-v-h"));
						return false;
					}else{
						$t.next().html(arrtmp[0]).removeClass("g-v-h");
						return false;
					}
				}else if($t.is($startTime) || $t.is($endTime)){
					$t.parent("li").find(".err").addClass("g-v-h");
				}else if($t.is($pro_id) &&( patternT.test($pro_id.val()) || $pro_id.val().length<1 || $pro_id.val().length >36)){
					if(!$t.next().is(".err")){
						$t.after($err.html(arrtmp[1]).removeClass("g-v-h"));
						return false;
					}else{
						$t.next().html(arrtmp[1]).removeClass("g-v-h");
						return false;
					}
				}else if($t.is($compay_name) &&( patternC.test($compay_name.val()) || $compay_name.val().length<4 || $compay_name.val().length >128)){
					if(!$t.next().is(".err")){
						$t.after($err.html(arrtmp[2]).removeClass("g-v-h"));
						return false;
					}else{
						$t.next().html(arrtmp[2]).removeClass("g-v-h");
						return false;
					}
				}else{
					$t.next().addClass("g-v-h");
				}
				return true;
			}
		}
	});
//删除操作
	$("#rank_del").bind("click",function(){
		var
			$t = $(this),
			list = $t.parents(".operation").next(".g-list"),
			l = list.find("input[type='checkbox']:checked").length;
			keyId = list.find("tbody input:checked").map(function(){
				return this.id;
			}).get().join(",");
		if(!l){
			art.dialog({
				content: '请选择删除项！',
				fixed: true,
				time: 1.5
			});
		}else{
			art.dialog({
				content: '确认要删除此旭日排名吗？',
				ok:function(){
					$.get("paykeywordManager.deletePayKeyWord",{"keyId":keyId},function(data){
						rReturn(data,"操作成功","操作失败");
					},"jsonp");
				},
				fixed: true,
				cancel: true
			});

		}
	});

	// 预留词删除操作
	$("#rank_del_word").bind("click",function() {
				var
				list = $(".g-list"),
				l = list.find("input[type='checkbox']:checked").length;
				keyId = list.find("input[type='checkbox']:checked").map(function(){
					return this.id;
				}).get().join(",");
				if (!l) {
					art.dialog({
						content : '未选中任何词！',
						fixed : true,
						time : 1.5
					});
				} else {
					art.dialog({
						content : '确认要删除此词吗？',
						ok : function() {
							$.get("paykeywordManager.deleteReservedWords", {"keyId" : keyId}, function(data) {
								rReturn(data, "操作成功", "操作失败");
							}, "jsonp");
						},
						fixed : true,
						cancel : true
					});

				}
			});

			// 获取星级
/*	$("#get_starts")
			.bind(
					"click",
					function() {
						var word = $("#keyWord").val();
						jQuery
								.ajax({
									type : 'GET',
									url : 'paykeywordManager.getStarts?word='
											+ word,
									dataType : 'json',
									success : function(data) {
										var dis = false;
										$("#show_starts").empty();
										if (data == 0) {
											$("#show_starts")
													.html(
															'<b class="icon-d-star"></b><b class="icon-d-star"></b><b class="icon-d-star"></b>');
											dis = true;
										}
										if (data == 1) {
											$("#show_starts")
													.html(
															'<b class="icon-y-star"></b><b class="icon-d-star"></b><b class="icon-d-star"></b>');
											dis = true;
										}
										if (data == 2) {
											$("#show_starts")
													.html(
															'<b class="icon-y-star"></b><b class="icon-y-star"></b><b class="icon-d-star"></b>');
											dis = true;
										}
										if (data == 3) {
											$("#show_starts")
													.html(
															'<b class="icon-y-star"></b><b class="icon-y-star"></b><b class="icon-y-star"></b>');
											dis = true;
										}
										if (data == 4) {
											$("#show_starts")
													.html(
															'<font color="red">该词已被预留，不可赠送</font>');
											dis = false;
										}
										if (dis) {
											$("#productId").removeAttr(
													"disabled");
											$("input[name='starts']").attr(
													"value", data);
										}
									},
									error : function(data) {
										alert("获取星级失败")
									}
								});
					});*/

	// 获取星级
/*	$("#add_page_get_starts")
			.bind(
					"click",
					function() {
						var word = $("#keyWord").val();
						jQuery
								.ajax({
									type : 'GET',
									url : 'paykeywordManager.getStarts?word='
											+ word,
									dataType : 'json',
									success : function(data) {
										$("#add_page_show_starts").empty();
										if (data == 0) {
											$("#add_page_show_starts")
													.html(
															'<b class="icon-d-star"></b><b class="icon-d-star"></b><b class="icon-d-star"></b>');
										}
										if (data == 1) {
											$("#add_page_show_starts")
													.html(
															'<b class="icon-y-star"></b><b class="icon-d-star"></b><b class="icon-d-star"></b>');
										}
										if (data == 2) {
											$("#add_page_show_starts")
													.html(
															'<b class="icon-y-star"></b><b class="icon-y-star"></b><b class="icon-d-star"></b>');
										}
										if (data == 3) {
											$("#add_page_show_starts")
													.html(
															'<b class="icon-y-star"></b><b class="icon-y-star"></b><b class="icon-y-star"></b>');
										}
										if (data == 4) {
											$("#add_page_show_starts")
													.html(
															'<font color="red">预留词</font>');
										}
										$("input[name='starts']").attr("value",
												data);
									},
									error : function(data) {
										alert("获取星级失败")
									}
								});
					});*/

//返回后退
	//$(".btnlink").bind("click",function(){history.back();});
});
