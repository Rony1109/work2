define(function(require, exports, module) {
	require('m/dialog/js/init');
	var placeholder = require('//res.csc86.com/v2/m/sea-modules/placeholder.js');
	
	$.extend({
		setDialogs: function(obj) {
			var $this = this;
			$('.mytable').on('click', obj['$dom'], function() {
				$this.cscConfirm(obj);
			});
		},
		tip: function(obj) {
			artDialog({
				id: 'cscTip',
				content: obj['content'],
				fixed: true,
				title: false,
				icon: 'mem-w',
				lock: true,
				padding: obj['padding'] || '20px 35px 20px 10px',
				opacity: 0.20,
				time: obj['closeTime'] || false,
				close: obj['closeCallback'] || function() {},
				init: obj['callback'] || function() {
					this.DOM.content.css({
						'height': 'auto'
					})
				}
			});
		},
		cscConfirm: function(obj) {
			artDialog({
				id: obj['id'] || 'cscConfirm',
				width: obj['width'] || 'auto',
				content: obj['content'],
				fixed: true,
				lock: true,
				opacity: 0.20,
				title: obj['title'],
				okVal: obj['okVal'],
				cancelVal: obj['cancelVal'],
				ok: obj['okFun'],
				cancel: obj['cancelFun'] || true,
				init: obj['callback'] || function() {
					$(this.DOM.title[0]).css('min-width', '380px');
					this.DOM.content.css({
						'height': 'auto'
					})
				}

			});
		},
		beforeItems: function(obj) {
			obj.setDom.on('click', function() {
				$(this).before(obj['addItems']);
			});
		},
		addItems: function(obj) {
			obj.setDom.on('click', function() {
				obj['itemsParent'].append(obj['addItems']);
				placeholder.placeholder(obj['itemsParent'].find('.custom'), '#999');

			});
		},
		setTip: function(obj) {
			var $this = this;
			$('.mytable').on('click', obj['$dom'], function() {
				$this.tip(obj);
			});
		},
		nameSpace: {},
		AjaxGet: function($url, $data, OurDone, msg) {
			var $this = $this;
			$.ajax({
				url: $url,
				dataType: 'jsonp',
				data: $data
			}).done(function(data) {
				OurDone(data);
			}).fail(function() {
				$this.tip({
					content: msg,
					padding: "20px 35px 20px 10px",
					closeTime: 1,
					callback: function() {

					}
				})
			})
		}
	});
})