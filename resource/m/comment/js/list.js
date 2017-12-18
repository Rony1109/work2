/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
	var $comments,
		cached = {};

	function init(id, $id, obj) {
		if ($id.find('div.g-comment-items').length < 1) {
			$id.append('<div class="g-comment-items"></div>');
			$comments = $id.find('div.g-comment-items');
			getComments(id, obj);
			$id.delegate('a[data-start]', 'click', function(event) { //翻页事件绑定
				obj['start'] = ($(this).data('start') - 1) * (obj['pn'] || 10);
				getComments(id, obj);
			});
		}
	}

	function getComments(id, obj) {
		obj = obj || {};
		obj['start'] = obj['start'] || 0;
		cached[id] = cached[id] || {};
		if (cached[id][obj['start']]) { //检测有没有缓存页面
			$comments.html(cached[id][obj['start']]);
			return;
		}
		$.get('//quan.csc86.com/api/comment/thread/' + id, obj, function(data) {
			if (data['status']) {
				var list = data['data']['list'],
					html = '<ul>';
				for (var i = 0; i < list.length; i++) {
					html += creatItem(list[i]);
				}
				html += '</ul>';
				html += creatPages(data['data']);
				cached[id][obj['start']] = html;
				$('.J_reply').html(data['data']['totalRows'] || 0); //更新回复数量
				$comments.html(html);
			}
		}, 'jsonp');
	}

	function creatPages(data) { //翻页处理
		var html = '<div class="g-comment-page">';
		if (data['has_prePage']) {
			html += '<a href="javascript:" title="上一页" data-start="' + (data['pageIndex'] - 1) + '">上一页</a>';
		}
		if (data['totalPages'] < 6) {
			for (var i = 1; i <= data['totalPages']; i++) {
				if (i != data['pageIndex']) {
					html += '<a href="javascript:" data-start="' + i + '">' + i + '</a>';
				} else {
					html += '<span class="cur">' + i + '</span>';
				}
			}
		} else {
			if (data['pageIndex'] < 4) {
				for (var i = 1; i < data['pageIndex']; i++) {
					html += '<a href="javascript:" data-start="' + i + '">' + i + '</a>';
				}
				html += '<span class="cur">' + data['pageIndex'] + '</span>';
				for (var j = (data['pageIndex'] + 1); j < 5; j++) {
					html += '<a href="javascript:" data-start="' + j + '">' + j + '</a>';
				}
				html += '<span class="break">...</span><a href="javascript:" data-start="' + data['totalPages'] + '">' + data['totalPages'] + '</a>';
			} else if (data['pageIndex'] > (data['totalPages'] - 3)) {
				html += '<a href="javascript:" data-start="1">1</a><span class="break">...</span>';
				for (var i = (data['totalPages'] - 3); i < data['pageIndex']; i++) {
					html += '<a href="javascript:" data-start="' + i + '">' + i + '</a>';
				}
				html += '<span class="cur">' + data['pageIndex'] + '</span>';
				for (var j = (data['pageIndex'] + 1); j <= data['totalPages']; j++) {
					html += '<a href="javascript:" data-start="' + j + '">' + j + '</a>';
				}
			} else {
				html += '<a href="javascript:" data-start="1">1</a><span class="break">...</span>';
				for (var i = (data['pageIndex'] - 1); i < data['pageIndex']; i++) {
					html += '<a href="javascript:" data-start="' + i + '">' + i + '</a>';
				}
				html += '<span class="cur">' + data['pageIndex'] + '</span>';
				for (var j = (data['pageIndex'] + 1); j < (data['pageIndex'] + 2); j++) {
					html += '<a href="javascript:" data-start="' + j + '">' + j + '</a>';
				}
				html += '<span class="break">...</span><a href="javascript:" data-start="' + data['totalPages'] + '">' + data['totalPages'] + '</a>';
			}
		}
		if (data['has_nextPage']) {
			html += '<a href="javascript:" title="下一页" data-start="' + (data['pageIndex'] + 1) + '">下一页</a>';
		}
		return html + '</div>';
	}

	function creatItem(data) { //单条评论构建
		var html = '<li class="g-cf g-comment-item">';
		html += '<a href="//quan.csc86.com/u/' + data['memberId'] + '" target="_blank" class="g-fl"><img src="' + (data['head'] ? '//img.csc86.com' + data['head'] : '//res.csc86.com/image/c/membercenter/photo-male-small.jpg') + '" alt="' + data['memberName'] + '" width="60" height="60" onerror="this.src=\'//res.csc86.com/image/c/membercenter/photo-male-small.jpg\'"/></a>' + '<div class="g-comment-info"><div class="g-comment-member"><a href="//quan.csc86.com/u/' + data['memberId'] + '" target="_blank">' + data['memberName'] + '</a></div><div class="g-comment-content">' + data['content'] + '</div><div class="g-tr g-comment-time">' + data['createTime'] + '</div></div>'
		html += '</li>'
		return html;
	}
	exports.refresh = function(id, obj) {
		cached = {};
		obj['start'] = 0;
		getComments(id, obj);
	}
	exports.init = init; //外部接口

});