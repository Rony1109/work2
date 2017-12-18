define(function(require, exports, module) {
	require('//res.csc86.com/f=v2/l/jui/core.js,v2/l/jui/widget.js,v2/l/jui/mouse.js,v2/l/jui/sortable.js');
	var placeholder = require('//res.csc86.com/v2/m/sea-modules/placeholder.js');

	/*在线交易项目新增*/
	require('./transaction');
	
	//自定义属性
	(function() {
		var attrHtml = '<li><span class="ipt-itm"><input class="name" type="text" name="productCusPropertys[propertyname][]" data-default="" value="" maxlength="10" placeholder="属性" /></span>：<span class="ipt-itm"><input class="value" type="text" name="productCusPropertys[property][]" data-default="" value="" maxlength="10" placeholder="属性值" /></span> <a class="del-opt" href="">删除</a></li>';
		var attrList = $('.jsCstmProAttr');
		var tagArry = window.location.href.split('?')[1].split('=');
		var proidIndex = $.inArray('proid', tagArry);
		var proid = "";
		if (proidIndex >= 0) {
			proid = tagArry[proidIndex + 1];
		}
		//点击添加产品属性
		$('.cstm-proattr .add-opt').click(function() {
			attrList.append(attrHtml);
			placeholder.placeholder(attrList.find('.ipt-itm input[type=text]'), '#999');
			return false;
		});

		//删除整条属性
		attrList.delegate('.del-opt', 'click', function() {
			var _this = $(this),
				_nameArry = [],
				_valArry = [],
				_jsCstmProAttr = $('.jsCstmProAttr'),
				_parent = _this.parent();
			_parent.remove();
			return false;
		});

	})();

	//设置水印 和 上传图片
	var _addWtrMrk = $('#addWtrMrk');
	var _uploaded = $('.jsPropicLst .del-pic');
	var _uploadedLen = _uploaded.length;
	var _uploadUrl = $('#uploadUrl').val();
	var swfu = new SWFUpload(uploadSettings({
		upload_url: _uploadUrl,
		post_params: {
			ismark: _addWtrMrk.is(':checked') ? 1 : 0
		},
		button_placeholder_id: "fileupload",
		button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
		button_image_url: '//res.csc86.com/v2/c/member/supply/css/img/upload-btn.png',
		button_text: '批量上传图片',
		button_width: 94,
		file_upload_limit: 4,
		button_text_left_padding: 10,
		button_text_top_padding: 2,
		swfupload_loaded_handler: function() {
			var stats = swfu.getStats();
			stats.successful_uploads = _uploadedLen;
			swfu.setStats(stats);
		},
		file_queue_error_handler: function(file, errorCode, message) {
			var msg = "您选择的图片错误，请重新选择图片上传！";
			switch (errorCode) {
				case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
					msg = "您选择的图片大小错误，请重新选择图片上传！";
					break;
				case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
					try {
						msg = "您选择的图片超过最大(" + this.settings.file_size_limit + ")限制，请处理后上传！"
					} catch (e) {
						msg = "您选择的图片大小超过最大限制，请处理后上传！";
					}
					break;
				case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
					msg = "您的图片格式有误！";
					break;
				case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
					msg = "最多只能上传4张图片！";
					break;
				default:
					msg = "您选择的图片错误，请重新选择图片上传！";
			};
			csc.useDialog(function() {
				csc.alert(msg);
			});
		},
		//上传图片成功操作
		upload_success_handler: function(file, serverData) {
			var $this = this;
			var data = eval("(" + serverData + ")");
			if (data.result == "success") {
				var _img = $('.propic-lst li img[src$="no-img.png"]:first');
				var _li = _img.parent('li');
				_img.attr('src', csc.url("img", data.key.replace(/(\d+)\.(.{3,4})$/, "thumbs/$1_t1.$2")));
				_li.append('<a class="del-pic" href="javascript:void(0);"title="删除图片">&times;</a>')
				_li.find('input[type=hidden]').val(data.key);

				var stats = $this.getStats();
				sucNum = stats.successful_uploads;

				//图片排序
				sortable();
			} else {
				csc.alert(data.msg);
			}
		}
	}));

	_addWtrMrk.bind('change', function() {
		swfu.addPostParam('ismark', _addWtrMrk.is(':checked') ? 1 : 0);
	});

	//若初始时已经有上传了的图片则可以移动排序
	if (_uploaded.length > 0) {
		sortable();
	}

	//点击删除图片
	$('.jsPropicLst li').delegate('.del-pic', 'click', function() {
		var _this = $(this);
		var _li = _this.parent();
		var _len = _li.parent().find('.del-pic').length - 1;
		$('.jsPropicLst').append(_li);
		_this.siblings('img').attr('src', '//res.csc86.com/image/no-img.png');
		_this.siblings('input[type=hidden]').val('');
		_this.remove();
		var stats = swfu.getStats();
		stats.successful_uploads = _len;
		swfu.setStats(stats);
		return false;
	});
});

function sortable() {
	$(".jsPropicLst").sortable({
		connectWith: '.jsPropicLst li',
		cursor: "move",
		revert: true, //动画
		axis: 'x',
		distance: 5,
		helper: 'clone',
		placeholder: 'placeholder',
		update: function() {

		}
	});

}