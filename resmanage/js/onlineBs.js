$(function() {
	var sHtml = '<p>拒绝理由：</p><textarea name="" id="reason" style="height: 100px;width: 240px;margin-top: 10px;" maxlength="50" onkeyup="if(this.value.length>50)this.value=this.value.substr(0,49)"></textarea>';
	//拒绝
	$('.refs,.detail-refs').on('click', function() {
		var $this = $(this);
		var memberId = $.trim($this.attr('memberid'))
		$url = 'http://bops.csc86.com/bops-app/bops/memberPay.refsOpen?memberId=' + memberId;
		operate($this, $url, '拒绝开通', sHtml);
	});
	//通过
	$('.pass,.detail-pass').on('click', function() {
		var $this = $(this);
		var memberId = $.trim($this.attr('memberid'))
		var $url = 'http://bops.csc86.com/bops-app/bops/memberPay.allowOpen?memberId=' + memberId;
		
		//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
		isHaveMgc('memberPay.memberPayCheck',{memberIds:[memberId]},function(){
			operate($this, $url, '同意开通', '是否同意开通在线交易？');
		});

	});
	//批量拒绝
	$('.bach_refs').on('click', function() {
		var $this = $(this);
		var $url = "http://bops.csc86.com/bops-app/bops/memberPay.bachRefs"
		operate($this, $url, '拒绝开通', sHtml, true)
	});
	//批量通过
	$('.bach_pass').on('click', function() {
		var $this = $(this);
		var $url = "http://bops.csc86.com/bops-app/bops/memberPay.bachPass";
		operate($this, $url, '同意开通', '是否同意开通在线交易？', true);
	});
	//详情页返回操作
	$('.detail-back').on('click', function() {
		var url = $(this).attr('href');
		window.location = url;
	});
	//交互求求操作
	function operate(obj, url, title, msg, flag) {
		var data = [];
		var $url = null;
		if (flag) {
			$('.list-id').find('input[type="checkbox"]').each(function() {
				var $me = $(this);
				if ($me.prop('checked')) {
					data.push($me.val());
				}
			});
			if (data.length == 0) {
				art.dialog({
					id: 'cscTip',
					content: "没有选择要操作的对象！",
					fixed: true,
					title: false,
					time: 1.5
				});
				return;
			}
			$url = url + "?ids=" + data.toString();
		} else {
			$url = url;
		}
		art.dialog({
			title: title,
			content: msg,
			fixed: true,
			lock: true,
			opacity:0.2,
			ok: function() {
				var $reason = $('#reason'),
					len = $reason.length,
					$val = $reason.val();
				if (len > 0) {
					if ($val == '') {
						art.dialog({
							id: 'cscTip',
							content: '拒绝理由不能为空！',
							icon: 'mem-w',
							fixed: true,
							title: '提示',
							time: 1.5
						});
						return false;
					}
					$urls = $url + '&reason=' + $('#reason').val();
				} else {
					$urls = $url
				}
				$.get($urls, function(data) {
					art.dialog({
						id: 'cscTip',
						content: data.msg,
						fixed: true,
						title: '提示',
						time: 1.5,
						close: function() {
							if (obj.siblings('.detail-back')[0]) {
								window.location = obj.siblings('.detail-back').attr('href');
							} else {
								window.location.reload();
							}
						}
					})
				}, 'jsonp');
			},
			cancel: true,
			cancelVal: '关闭'
		});
	}
	$('.detail-next').on('click', function() {
		var $url = 'http://bops.csc86.com/bops-app/bops/' + $(this).attr('href');
		window.location = $url;
	});
})