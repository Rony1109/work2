function goPage(f) {
	var
		$f = $(f),
		inputpage = $.trim($f.find("[name='page']").val()),
		msg = '';
	if (inputpage.length == 0) {
		msg = '请输入页码数！';
	} else if (/\D/.test(inputpage)) {
		msg = '页码只能为正整数！'
	} else if (/^0+$/.test(inputpage)) {
		msg = '页码数不能为0！';
	} else if (parseInt(inputpage) > $f.data('total')) {
		msg = '输入页码数大于实际页码数！';
	} else if (parseInt(inputpage) == $f.data('index')) {
		msg = '当前已经是第' + inputpage + '页！';
	}
	if (msg.length != '') {
		artDialog({
			icon: 'error',
			content: msg,
			fixed: true,
			time: 1.5
		});
		return false;
	} else {
		$f.find("[name='page']").val(inputpage);
	}
}

$(function() {
	$('form[data-total]').delegate('a.pg-prev,a.pg-next', 'click', function(event) {

		var $t = $(this),
			$form = $t.parents('form'),
			index = $form.data('index'),
			total = $form.data('total');
		if (index == 1 && $t.is('.pg-prev')) {
			artDialog({
				icon: 'error',
				content: '已经是第一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		if (index == total && $t.is('.pg-next')) {
			artDialog({
				icon: 'error',
				content: '已经是最后一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		$form.find('input[name="page"]').val($t.is('.pg-next') ? index + 1 : index - 1);
		$form.trigger('submit');
		event.preventDefault();
	});

	autoCompleteDefaultVal($('form[data-autocomplete]'));

	var csc = {};
	csc.Tpr = null;
	$('#joinActivity').on('click', function() { //添加活动
		var $this = $(this),
			copanyName = $(this).attr('companyName'),
			userId = $(this).attr('userId'),
			shtml = '<form action="" class="myForm">' +
			'<input type="hidden" name="userId" value="' + userId + '" />' +
			'<input type="hidden" name="activityId" />' +
			'<table class="atv-form">' +
			'<tr>' +
			'<th>企业名称：</th>' +
			'<td>' + copanyName + '</td>' +
			'</tr>' +
			'<tr>' +
			'<th>活动链接：</th>' +
			'<td><input type="text" name="linkurl" /> <button id="seachMsg" userId="' + userId + '">查询</button></td>' +
			'</tr>' +
			'<tr>' +
			'<th>活动主题：</th>' +
			'<td><input type="text" name="activityTitle" readonly /></td>' +
			'</tr>' +
			'<tr>' +
			'<th>活动时间：</th>' +
			'<td><input type="text" name="time" readonly /></td>' +
			'</tr>' +
			'<tr>' +
			'<th>活动地点：</th>' +
			'<td><input type="text" name="address" readonly /></td>' +
			'</tr>' +
			'<tr>' +
			'<th>活动类型：</th>' +
			'<td><input type="text" name="activityType" readonly /></td>' +
			'</tr>' +
			'</table>'
		'</form>';
		art.dialog({
			title: "添加活动",
			fixed: true,
			content: shtml,
			background: "#000",
			opacity: "0.5",
			ok: function() {
				var $data = $('.myForm').serialize(),
					$linkurl = $('input[name=linkurl]').val();
				if (csc.Tpr === null) {
					art.dialog({
						title: "提示",
						fixed: true,
						content: '请输入链接，完成查询！',
						background: "#000",
						opacity: "0.5",
						init: function() {
							this.DOM.iconBg.css('background-position', '-5px 0')
						},
						lock: true,
						icon: 'warning',
						time: 1.5
					});
					return false;
				}
				$.get('findAndJoinActivity.findAndJoinActivity', $data, function(data) {
					if (data.success === 'true') {
						art.dialog({
							title: "提示",
							fixed: true,
							icon: 'succeed',
							content: '添加活动成功！',
							background: "#000",
							opacity: "0.5",
							lock: true,
							time: 1.5,
							init: function() {
								this.DOM.iconBg.css('background-position', '-5px 0')
							},
							close: function() {
								window.location.reload();
							}
						});
					} else {
						art.dialog({
							title: "提示",
							fixed: true,
							icon: 'error',
							content: data.msg,
							background: "#000",
							init: function() {
								this.DOM.iconBg.css('background-position', '-5px 0')
							},
							opacity: "0.5",
							lock: true,
							time: 1.5
						});
					}
				}, 'json')
			},
			cancel: true,
			lock: true
		})
		csc.Tpr = null;
	});
	$('body').on('click', '#seachMsg', function() {
		var $tileVal = $('input[name=linkurl]').val(),
			$data = 'linkurl=' + $tileVal;
		if ($tileVal == '') {
			art.dialog({
				title: "提示",
				fixed: true,
				content: '活动链接不能为空！',
				background: "#000",
				opacity: "0.5",
				init: function() {
					this.DOM.iconBg.css('background-position', '-5px 0')
				},
				lock: true,
				icon: 'warning',
				time: 1.5
			});
			return false;
		}
		$.get('findAndJoinActivity.findAndJoinActivity', $data, function(data) {
			var $data = data.data,
				times = '';
			if ($data) {
				csc.Tpr = true;
				$('.myForm').find('input').each(function() {
					var $name = $(this).attr('name');
					switch ($name) {
						case 'activityId':
							$(this).val($data.activityId);
							break;
						case 'activityTitle':
							$(this).val($data.activityTitle);
							break;
						case 'time':
							var $dataStart = new Date($data.activityBeginDate),
								$dataEnd = new Date($data.activityEndDate),
								_StartMonth = $dataStart.getMonth(),
								_endMonth = $dataEnd.getMonth(),
								_startDay = $dataStart.getDate(),
								_endDay = $dataEnd.getDate(),
								$StartMonth = (_StartMonth + 1) >= 10 ? (_StartMonth + 1) : '0' + (_StartMonth + 1),
								$endMonth = (_endMonth + 1) >= 10 ? (_endMonth + 1) : '0' + (_endMonth + 1),
								$startDay = _startDay >= 10 ? _startDay : '0' + _startDay,
								$endDay = _endDay >= 10 ? _endDay : '0' + _endDay;
							times += $dataStart.getFullYear() +
								'-' +
								$StartMonth +
								'-' +
								$startDay +
								'~' +
								$dataEnd.getFullYear() +
								'-' +
								$endMonth +
								'-' +
								$endDay;
							$(this).val(times);
							break;
						case 'address':
							$(this).val($data.address);
							break;
						case 'activityType':
							$(this).val($data.activityType);
							break;

					}
				})
				$('input[name=classify]').val(data.classify);
				$('input[name=activityId]').val(data.activityId);
			} else if ($data == '') {
				$('.myForm').get(0).reset();
				art.dialog({
					title: "提示",
					fixed: true,
					content: data.msg,
					background: "#000",
					icon: 'warning',
					opacity: "0.5",
					init: function() {
						this.DOM.iconBg.css('background-position', '-5px 0')
					},
					lock: true,
					time: 1.5
				});
			} else {
				art.dialog({
					title: "提示",
					fixed: true,
					content: '操作失败，请重试！',
					icon: 'warning',
					background: "#000",
					opacity: "0.5",
					init: function() {
						this.DOM.iconBg.css('background-position', '-5px 0')
					},
					lock: true,
					time: 1.5
				});
			}
		}, 'json');
		return false;
	});

});