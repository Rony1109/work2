function ratBuyer(memberId,$toRat){//星级评定
	$.post('quality.StarInfo', {memberId:memberId}, function(data) {//取会员信息并构建模板
		var html = '<div class="rat-member"><ul class="g-c-f g-fs-14">' +
				'<li style="width:100%"><strong>会员账号：</strong><p>'+data['memberAccount']+'</p></li>'+
				'<li><strong>企业名称：</strong><p>'+data['enterprise']+'</p></li>'+
				'<li><strong>询盘次数：</strong><p>'+data['inquiryCount']+'</p></li>'+
				'<li><strong>参加活动次数：</strong><p>'+data['actCount']+'</p></li>'+
				'<li><strong>最后一次发布询盘时间：</strong><p>'+data['lastInquiryTime']+'</p></li>'+
				'</ul><div class="g-c-f g-t-c">'+
				'<label class="g-f-l g-t-l"><input type="radio" name="star" value="3" '+(data['star']==3?'checked':'')+' /><span class="g-ico ico-star"><span class="g-ico ico-star-h3"></span></span></label>'+
				'<label class="g-f-r g-t-l"><input type="radio" name="star" value="1" '+(data['star']==1?'checked':'')+' /><span class="g-ico ico-star"><span class="g-ico ico-star-h1"></span></span></label>'+
				'<label class="g-t-l"><input type="radio" name="star" value="2" '+(data['star']==2?'checked':'')+' /><span class="g-ico ico-star"><span class="g-ico ico-star-h2"></span></span></label></div></div>';
		artDialog({
			title:'会员信息',
			content:html,
			ok:function(){
				var $star = $('div.rat-member').find(':checked');
				if($star.length == 0){//选择星级后才能提交
					artDialog.alert('请评定星级！');
					return false;
				}
				$.post('quality.starEvaluating',{memberId:memberId,star:$star.val()}, function(data) {//星级评定接口
					if(data == 0){
						artDialog.alert('操作失败，请稍后重试');
						return;
					}
					$toRat.before('<a href="javascript:" class="g-ico ico-star"><span class="g-ico ico-star-h'+$star.val()+'"></span></a>');
					$toRat.remove();
				},'jsonp');
			},
			cancel:true,
			lock:true
		});
	},'jsonp');
}

function actionMember(memberId,state){//单个会员入库 删除操作
	var urls = {
		'del':'quality.updateCheckedBuyerSpecified',
		'import':'quality.updateUncheckedBuyerSpecified'
	};
	$.post(urls[state], {memberId: memberId}, function(data) {
		if(data == 1){
			artDialog({
				title:'操作成功',
				content:'操作成功',
				icon:'succeed',
				fixed: true,
				time: 1.5
			});
			setTimeout(function(){
				location.href = location.href;
			},1500);
			return;
		}
		artDialog.alert('操作失败，请稍后重试');
	},'jsonp');
}

function actionMembers(memberIds,state){//会员批量操作
	var urls = {
		'del':'quality.updateCheckedBuyerBatch',
		'import':'quality.updateUncheckedBuyerBatch'
	};
	$.post(urls[state], {memberIds: memberIds}, function(data) {
		if(data > 0){
			artDialog({
				title:'操作成功',
				content:'操作成功',
				icon:'succeed',
				fixed: true,
				time: 1.5
			});
			setTimeout(function(){
				location.href = location.href;
			},1500);
			return;
		}
		artDialog.alert('操作失败，请稍后重试');
	},'jsonp');
}

function noticeMember(memberIds){
	artDialog({
		title:'发通知',
		padding:'20px 20px 5px',
		content:'<div class="notice-form">'+
					'<dl class="g-c-f"><dt class="g-f-l g-fw-b g-fs-14">标题：</dt><dd><input type="text" name="msg_title" maxlength="20"/><span>字数在20个字以内</span></dd><dt class="g-f-l g-fw-b g-fs-14">内容：</dt><dd><textarea name="msg_content" maxlength="150"></textarea><br /><span>字数在150字以内</span></dd></dl>'+
				'</div>',
		lock:true,
		ok:function(){
			var dialog = this,
				$form = $('div.notice-form'),
				msg_title = $.trim($form.find('input[name="msg_title"]').val()),
				msg_content = $.trim($form.find('textarea[name="msg_content"]').val());
			if(msg_title == ''){
				artDialog.alert('标题不能为空');
				return false;
			}
			if(msg_content == ''){
				artDialog.alert('内容不能为空');
				return false;
			}
			if(msg_content.length > 150){
				artDialog.alert('内容在150个字以内');
				return false;
			}
			$.post('quality.messageToBuyers', {memberIds:memberIds,msg_title:msg_title,msg_content:msg_content}, function(data) {
				if(data == 1){
					artDialog({
						title:'发送成功',
						content:'发送成功',
						icon:'succeed',
						fixed: true,
						lock:true,
						time: 1.5
					});
					dialog.close();
					return;
				}
				artDialog.alert('发送失败，请稍后重试');
			});
			return false;
		},
		cancel:true
	});
}

function noticeMembers(){//批量发通知
	var
		$checked = $('tbody').find('input:checkbox:checked'),
		ids = [];
	if($checked.length > 0){
		$checked.each(function(){
			ids.push($(this).val());
		});
		noticeMember(ids);
	}else{
		artDialog.alert('请选择你要操作的项！');
	}
}

function importMembers(){//批量入库会员
	var
		$checked = $('tbody').find('input:checkbox:checked'),
		hasNoRat = false,
		ids = [];
	if($checked.length > 0){
		$checked.each(function(){
			var
				$t = $(this),
				$tr = $t.parents('tr');
			if($tr.find('a.ico-to-rat').length > 0){
				hasNoRat = true;
				return;
			}
			ids.push($t.val());
		});
		if(hasNoRat){
			artDialog.alert('存在未评级会员，不能入库！');
			return;
		}
		actionMembers(ids,'import');
	}else{
		artDialog.alert('请选择你要操作的项！');
	}
}

function delMembers(){//批量删除会员
	var
		$checked = $('tbody').find('input:checkbox:checked'),
		ids = [];
	if($checked.length > 0){
		$checked.each(function(){
			ids.push($(this).val());
		});
		actionMembers(ids,'del');
	}else{
		artDialog.alert('请选择你要操作的项！');
	}
}

function goPage(f){
	var
		$f = $(f),
		inputpage = $.trim($f.find("[name='inputpage']").val()),
		msg = '';
	if(inputpage.length == 0){
		msg = '请输入页码数！';
	}else if(/\D/.test(inputpage)){
		msg = '页码只能为正整数！'
	}else if(/^0+$/.test(inputpage)){
		msg = '页码数不能为0！';
	}else if(parseInt(inputpage) > $f.data('total')){
		msg = '输入页码数大于实际页码数！';
	}else if(parseInt(inputpage) == $f.data('index')){
		msg = '当前已经是第'+inputpage+'页！';
	}
	if(msg.length != ''){
		artDialog({
			icon:'error',
			content: msg,
			fixed: true,
			time: 1.5
		});
		return false;
	}else{
		$f.find("[name='page']").val(inputpage);
		$f.find("[name='inputpage'],[name='total']").css('color','#fff').removeAttr("name");
	}
}

/*弹窗提示相关js*/
function dialogTip(msg, closeTime, callback){
	artDialog({
		id: 'tip',
		content: msg || '成功提示',
		fixed: true,
		lock:true,
		opacity: .1,
		icon: 'csc-tip',
		time: closeTime || 1.5,
		close: callback || null
	});
}

/*升级取消vip*/
var isSubmit=false;
function vipFun(msg,data){	
	artDialog.confirm(msg,function(){
		if(isSubmit===true){
			return false;
		};
		isSubmit=true;
		$.post('quality.vip',data,function(data){
			console.log(data);
			if(data.result=="Y"){
				location.href=location.href;
			}else{
				dialogTip(data.msg?data.msg:'升级失败！')
			}
			isSubmit=false;
		},"json");
	},function(){
		
	});
}

$(function(){
	$('div.g-list').delegate('thead input:checkbox', 'change', function(event) {//全选事件
		change($(this).prop('checked'));
	}).delegate('a.ico-to-rat,a.ico-star', 'click', function(event) {//评级事件绑定
		var	$t = $(this),
			memberId = $t.parents('tr').data('buyer');
		ratBuyer(memberId,$t);
		event.preventDefault();
	}).delegate('a.ico-import,a.ico-del', 'click', function(event) {//入库 删除操作
		var
			$t = $(this),
			$tr = $t.parents('tr');
		if($tr.find('a.ico-to-rat').length > 0){
			artDialog.alert('该会员还未评级，不能入库！');
			return;
		}
		actionMember($tr.data('buyer'),$t.is('.ico-import') ? 'import' : 'del');
		event.preventDefault();
	}).delegate('a.ico-mail', 'click', function(event) {
		noticeMember([$(this).parents('tr').data('buyer')]);
		event.preventDefault();
	});

	$('button.import-companys').bind('click',importMembers);
	$('button.send-notice').bind('click',noticeMembers);
	$('button.del').bind('click',delMembers);

	$('form[data-total]').delegate('a.pg-prev,a.pg-next', 'click', function(event) {

		var $t = $(this),
			$form = $t.parents('form'),
			index = $form.data('index'),
			total = $form.data('total');
		if(index == 1 && $t.is('.pg-prev')){
			artDialog({
				icon:'error',
				content: '已经是第一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		if(index == total && $t.is('.pg-next')){
			artDialog({
				icon:'error',
				content: '已经是最后一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		$form.find('input[name="inputpage"]').val( $t.is('.pg-next') ? index + 1 : index-1);
		$form.trigger('submit');
		event.preventDefault();
	});

	autoCompleteDefaultVal($('form[data-autocomplete]'));
	
	
	/*取消vip*/
	$('#content').delegate('.jsCancelVip','click',function(){
		var _this=$(this),
			_id=$.trim(_this.parents('tr').data('buyer')),
			_data={agg_vip:0,memberIds:_id};
		vipFun('取消VIP等级？',_data);
		return false;
	});
	
	/*升级为vip*/
	$('#content').delegate('.jsUpVip','click',function(){
		var _this=$(this),
			_id=$.trim(_this.parents('tr').data('buyer')),
			_data={agg_vip:1,memberIds:_id};
		vipFun('确定要把该买家升级为VIP买家吗？',_data);
		return false;
	});
	
	/*批量升级为vip*/
	$('.jsUpVips').bind('click',function(){
		var _this=$(this),
			_checked =_this.parents('#content').find('.g-list tbody').find('input:checkbox:checked'),
			_ids = [];
		if(_checked.length > 0){
			_checked.each(function(){
				_ids.push($(this).val());
			});
			var _data={agg_vip:1,memberIds:_ids.join(',')};
			vipFun('确定要把所有选中买家升级为VIP买家吗？',_data);
		}else{
			dialogTip('请选择你要操作的项！');
		}
		return false;
	});
});