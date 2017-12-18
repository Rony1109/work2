/*报价中心管理后台 by lg 2013.10.14*/

function quoteRec(str,id){
	if(str=="Y"){/*推荐商户*/
		art.dialog({id:"quoteRec",title:"推荐商户",lock: true,background: '#000',opacity: 0.6,content:"确定要推荐此商户吗？",
			ok:function(){
				$.get("company.updateCompanyState",{"id":id,"isShow":str},
					function(data){
						if(data){
							art.dialog({content:'已成功推荐商户！',icon: 'succeed',fixed: true,time: 1.5,close: function(){location.href = location.href}});
						}else{
							art.dialog({content:'商户推荐失败，请刷新后再试！',icon: 'error',fixed: true,time: 1.5});
						}
					},"jsonp");
			},
			okVal:"确定",cancel:true,cancelVal:"取消"
		});

	}else if(str=="N"){/*取消推荐商户*/
		art.dialog({id:"quoteRec",title:"取消推荐商户",lock: true,background: '#000',opacity: 0.6,content:"确定取消要推荐此商户吗？",
			ok:function(){
				$.get("company.updateCompanyState",{"id":id,"isShow":str},
					function(data){
						if(data){
							art.dialog({content:'已成功取消推荐！',icon: 'succeed',fixed: true,time: 1.5,close: function(){location.href = location.href}});
						}else{
							art.dialog({content:'取消推荐失败，请刷新后再试！',icon: 'error',fixed: true,time: 1.5});
						}
					},"jsonp");
			},
			okVal:"确定",cancel:true,cancelVal:"取消"
		});
	}
}

function linkAge(id){/*二级联动下拉菜单*/
	var q = id || "#q-s" , n = $(q).next() , v = $("#kindId3").val();
	$(q).children("option").each(function(i){
		var _this = $(this);
		$(this).bind("click",function(){
			if(_this.attr("value")==""){
				$(n).html("<option value=''>所有</option>");
			}else{
				$.get("price.findKindList",{"kindId2":_this.attr("value")},function(data){
					if(data){
						$(n).empty();
						$(n).append("<option value=''>所有</option>");
						for(i=0; i<data.length; i++){
							if(v == data[i].id ){
								$(n).append("<option value='"+data[i].id+"' selected='selected'>"+data[i].name+"</option>");
							}else{
								$(n).append("<option value='"+data[i].id+"'>"+data[i].name+"</option>");
							}
						}
					}
				},"jsonp");
			}
		});
	});
	$(q).find("option:selected").trigger("click");
}

function addAttr(id){//全选
	var input = $(id);
	for(i=0; i<input.length; i++){
		$(input[i]).attr("checked","checked");
	}
}

function delAttr(id){//全不选
	var input = $(id);
	for(i=0; i<input.length; i++){
		$(input[i]).removeAttr("checked");
	}
}

function selectAll(id){//全选
	var input = "input[name=priceIds]";
	$(id).is(":checked") == true ? addAttr(input) : delAttr(input);
}

function delAll(btn){//批量删除
	var l = $("input[name=priceIds]:checked") , edVal = new Array();
	if(l.length<=0){
		art.dialog({content:'未选中！',icon: 'error',fixed: true,time: 1.5});
	}else{
		for(i=0; i<l.length; i++){
			edVal[i] = $(l[i]).attr("value");
		}
		art.dialog({id:"quoteRec",title:"批量删除",lock: true,background: '#000',opacity: 0.6,content:"确定要删除吗？",
			ok:function(){
				$.get("price.deletePriceList",{"priceIds":edVal},function(data){
					if(data>0){
						art.dialog({content:'删除成功！',icon: 'succeed',fixed: true,time: 1.5,close: function(){location.href = location.href}});
					}else{
						art.dialog({content:'删除失败，请刷新后再试！',icon: 'error',fixed: true,time: 1.5});
					}
				},"jsonp")},
			okVal:"确定",cancel:true,cancelVal:"取消"});
	};
};

function delOne(id){//单个删除
	art.dialog({id:"quoteRec",title:"单个删除",lock: true,background: '#000',opacity: 0.6,content:"确定要删除吗？",
		ok:function(){
			$.get("price.deletePrice",{"priceId":id},function(data){
				if(data>0){
					art.dialog({content:'删除成功！',icon: 'succeed',fixed: true,time: 1.5,close: function(){location.href = location.href}});
				}else{
					art.dialog({content:'删除失败，请刷新后再试！',icon: 'error',fixed: true,time: 1.5});
				}
			},"jsonp");},
			okVal:"确定",cancel:true,cancelVal:"取消"});

}

function upFile(id){//上传文件
	if($.trim($(id).val())){
		$("#upFileForm").trigger("submit");
	}
}

function toPrevious(t)//前一页
{
	var $page = $("#inputpage").closest("form"),
		$cur = $page.find("input[name='pageindex']"),
		index = parseInt($.trim($cur.val()));
	if(index == 1){
		art.dialog({
			content: '已经是第一页!',
			fixed: true,
			time: 1.5
		});
	}else{
		$page.find("input[name='inputpage']").css("color","#fff").val(index-1);
		$page.trigger("submit");
	}
}
function toNext(t)//下一页
{
	var $page = $("#inputpage").closest("form"),
		$cur = $page.find("input[name='pageindex']"),
		index = parseInt($.trim($cur.val())),
		total = parseInt($.trim($page.find("input[name='pagetotal']").val()));
	if(index == total){
		art.dialog({
			content: '已经是最后一页!',
			fixed: true,
			time: 1.5
		});
	}else{
		$page.find("input[name='inputpage']").css("color","#fff").val(index+1);
		$page.trigger("submit");
	}
}

function goPage(f){//分页跳转
	var
		$f = $(f),
		inputpage = $.trim($f.find("[name='inputpage']").val()),
		msg = '';
	if(inputpage.length == 0){
		msg = '请输入页码数！';
	}
	if(/^0+$/.test(inputpage)){
		msg = '页码数不能为0！';
	}
	if(parseInt(inputpage) > parseInt($f.find("input[name='pagetotal']").val())){
		msg = '输入页码数大于实际页码数！';
	}
	if(msg.length>0){
		art.dialog({
			content: msg,
			fixed: true,
			time: 1.5
		});
		return false;
	}else{
		$f.find("[name='pageindex']").val(inputpage);
		$f.find("[name='inputpage'],[name='total']").removeAttr("name");
	}
}

function compareNum(){//验证发布数量
	var s = $.trim($("#priceStart").val()) , e = $.trim($("#priceEnd").val());
	if(s == "" && e != ""){
		art.dialog({content:'发布数量不能为空！',icon: 'error',fixed: true,time: 1.5});
		return false;
	}else if(s != "" && e == ""){
		art.dialog({content:'发布数量不能为空！',icon: 'error',fixed: true,time: 1.5});
		return false;
	}
}

$(function(){linkAge();});