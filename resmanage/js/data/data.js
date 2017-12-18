
/* 抓取数入库 */

//跳转
function listPage(tmp){
	var page=$(tmp).parent().find("input[name=pageNo]").val();
	if(page==""){
		art.dialog({content: "请输入页数！",icon: 'error',fixed: true,time: 1.5});
	}else if(page == 0){
		art.dialog({content: "页数不能为0！",icon: 'error',fixed: true,time: 1.5});
	}else if(parseInt(page)>parseInt($(".pagesize").html())){
		art.dialog({content: "页数超出已有页数，请重新输入！",icon: 'error',fixed: true,time: 1.5});
	}else{
		window.location.href="thirdInquiry.allThirdInquiry?pageNo="+$(tmp).prev("input").val();
	}
}

function insertData(){//入库
	var
		$checked = $('.g-list tbody').find('input:checkbox:checked'),
		ids = [];
	if($checked.length > 0){
		$checked.each(function(){
			ids.push($(this).val());
		});
	}else{
		artDialog.alert('请选择你要操作的项！');
		return false;
	}

	return ids;

}

/*弹窗提示相关js*/
function dialogTip(msg, closeTime, callback){
	artDialog({
		id: 'tip',
		content: msg || '成功提示',
		fixed: true,
		lock:true,
		opacity: .1,
		icon: 'succeed',
		time: closeTime || 1.5,
		close: callback || null
	});
}


function goback(){
	window.history.go(-1);
}

function intoLibs(ids){//入库
	if(ids.length > 0){
		$.post('thirdInquiry.addThirdInquiry', {id:ids}, function(response){
			if(response.status > 0){
				dialogTip(response.msg, 1.5, function(){ window.location.href = "thirdInquiry.allThirdInquiry?pageNo=1" })
			}else{
				artDialog.alert(response.msg);
			}
		},"json");
	}
}

function delData(ids){//删除
	if(ids.length > 0){
		$.get('thirdInquiry.deleteThirdInquiry', {id:ids}, function(response){
			if(response.status > 0){
				dialogTip(response.msg, 1.5, function(){ window.location.href = "thirdInquiry.allThirdInquiry?pageNo=1" })
			}else{
				artDialog.alert(response.msg);
			}
		},"json");
	}
}

$(function(){
	$('div.g-list').delegate('thead input:checkbox', 'change', function(event) {//列表全选事件
		change($(this).prop('checked'));
	})

	$("#addbtn").bind("click",function(){//列表页入库

		intoLibs(insertData().join(","));

	});

	$("#delbtn").bind("click",function(){//列表页删除

		delData(insertData().join(","))		

	});

	$("#invbtn").bind("click",function(){//清除冗余数据

		$.get('thirdInquiry.deleteInvalidData', function(response){
			dialogTip(response.msg, 1.5, function(){ window.location.href = window.location.href })
		},"json");

	});

	$("#addbtn_detail").bind("click",function(e){//详情页入库

		if (e && e.preventDefault){e.preventDefault();}else{window.event.returnValue = false;return false;}

		var id = $(this).attr("data-id");

		var inquiryName = $.trim($("input[name='inquiryName']").val()),
			number = $.trim($("input[name='number']").val()),
			contact = $.trim($("input[name='contact']").val()),
			phoneNumber = $.trim($("input[name='phoneNumber']").val()),
			expireDate = $.trim($("input[name='expireDate']").val()),
			addTime = $.trim($("input[name='addTime']").val()),
			validDays = $.trim($("input[name='validDays']").val()),
			memberCompany = $.trim($("input[name='memberCompany']").val()),
			remark = $.trim($("input[name='remark']").val()),
			content = $.trim($("textarea[name='content']").val());

		if(inquiryName && number && contact && phoneNumber && expireDate){

			$.post('thirdInquiry.updateThirdInquiry', {id:id,inquiryName:inquiryName,number:number, contact:contact, phoneNumber:phoneNumber,expireDate:expireDate,addTime:addTime,validDays:validDays,memberCompany:memberCompany,remark:remark,content:content}, function(response){
				if(response.status > 0){
					dialogTip(response.msg, 1.5, function(){ window.location.href = "thirdInquiry.allThirdInquiry?pageNo=1" })
				}else{
					artDialog.alert(response.msg);
				}
			},"json");

		}else{
			artDialog.alert("采购标题、采购量、联系人、联系电话和截止时间不能为空！");
			return false;
		}

	});

	$("#delbtn_detail").bind("click",function(){//详情页删除

		var $this = $(this);

		delData($this.attr("data-id"));

	});



})

