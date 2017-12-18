define(function(require, exports, module) {
	require('./init')
	var slide = require('slide');
	new slide(".J-slide ul", ".J-slide ul>li", {
		slideWidth: 299,
		slideHeight: 220,
		slideDirection: 0,
		slides_xssm: 1,
		slideSeries: 1,
		zantin: true,
		slides_auto_span: 6000,
		slideButs: '.J-slide>ol', //切换按钮容器，样式自定义
		slideButs_html: function(i) {
			return "<li>" + (i + 1) + "</li>";
		}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
		slideButs_bindsj: "mouseover",
		slideButs_selectclass: "cur",
		slides_controller: '.J-slide>ol',
		slides_fun: slide.definedfun
	});
	var parameter = 'ff6b7f51-83f6-4913-9f12-e72185cc39c4,0bf32c17-0443-41b5-a33e-2dcb2ee96aca';
	parameter = $(".talk-list").attr('data') == "undefined" ? parameter : $(".talk-list").attr('data');
	$.get('//api.csc86.com/QuanNewsFeed/getNewFeed?quanId=' + parameter, function(data) {
		var len = data.length;
		if (len > 0) {
			var sLi = '';
			for (var i = 0; i < 3; i++) {
				var myData = data[i],
					userHead = myData['userHead'],
					userName = myData['userName'],
					objectName = myData['objectName'],
					gradeName = myData['gradeName'],
					objectId = myData['objectId'],
					userId = myData['userId'],
					gradeId = myData['gradeId'],
					gradeName = myData['gradeName'],
					url = myData['newsFeedType'] == 'CREATEACTIVITY' ?
					'//quan.csc86.com/event/detail/' :
					'//quan.csc86.com/thread/detail/';
				sLi += '<li>' +
					'<a href="//quan.csc86.com/u/' + userId + '" target="_blank" class="head-img">' +
					'<img src="//img.csc86.com/scale/60/' + userHead + '" alt="" width="43" height="43" />' +
					'<span></span>' +
					'</a>' +
					'<p>' +
					'<a href = "//quan.csc86.com/u/' + userId + '" ' +
					'title = "' + userName + '" target="_blank">' + userName + ' </a>' +
					'<i class="level us_l' + gradeId + '" title="' + gradeName + '"></i>' +
					'<span>刚刚发表了话题</span>' +
					'</p>' +
					'<a href="' + url + objectId + '.html" target="_blank" class="clear-both" title="' + objectName + '">' +
					objectName +
					'</a>' +
					'</li>'
			}
			$(".talk-list").html(sLi);
		}
	}, 'jsonp')
})