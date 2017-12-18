define(function(require, exports, module) {
	require('./init');
	var cookie = require('m/jsM/cookie');

	var $history = $('.J_history');
	$history.bind('click', function(event) {
		$(this).toggleClass('brand-history-cur');
	}).children('a').on('click', function(event) {
		event.preventDefault();
	});

	if($history.is('[data-hasnext]')){//如果有下一页
		var $ol = $history.find('ol'),
			loading = false,
			page = 2;
		$ol.bind('scroll',function(){
			if(loading){//加载中
				return;
			}
			var $last = $ol.find('li:last');
			if(($last.position().top - $ol.height() - $ol.scrollTop()) < 40){
				loading = true;
				$.get('listSpecial',{pageIndex:page,type:/type\=2/.test(location.search) ? 2 : 1},function(data){
					var html = '';
					data = data['data'];
					loading = false;
					page++;
					for(var i in data['list']){
						html += '<li title="'+data['list'][i]['theme']+'"><a href="/special?type='+data['list'][i]['specialType']+'&id='+data['list'][i]['id']+'">第'+data['list'][i]['issue']+'期 '+data['list'][i]['theme']+'</a></li>';
					}
					if(data['has_nextPage'] == false){//最后一页解除事件绑定
						$ol.unbind('scroll');
						html += '<li class="last">没有更多了</li>';
					}
					$ol.append(html);
				},'jsonp');
			}
		});
	}


	var play = require('m/sea-modules/focusPlay');
	if($('.banner').find('li').length > 1){
		play.focusPlay('.banner',null,3000);
	}
	if($('.venuesimage').find('li').length > 1){
		play.focusPlay('.venuesimage',null,3000);
	}

	if($('div.img_scroll li').length > 1){//专题详情轮播
		(function(){
			var $div = $('div.img_scroll'),
				$ul = $div.find('ul').wrap('<div class="img_scroll_bd"></div>'),
				$li = $ul.find('li'),
				scroll = '-=810px',
				timer,
				player = function(){
					if($ul.is(':animated')){
						return;
					}
					$ul.animate({marginLeft: scroll},600, function() {
						var mL = parseInt($ul.css('marginLeft'));
						if(mL == 0){
							$ul.css('marginLeft',0-810*$li.length);
						}
						if(mL == (810-1620*$li.length)){
							$ul.css('marginLeft',0-810*($li.length-1));
						}
					});
					timer = setTimeout(player,3000);
				};
			$li.clone().appendTo($ul);
			$ul.width('999999pt').css('marginLeft',0-810*$li.length);
			$div.delegate('span', 'click', function(event) {
				clearTimeout(timer);
				scroll = $(this).is('.btn_left') ? '+=810px' : '-=810px';
				player();
			});
			timer = setTimeout(player,3000);
		}());
	}

	var $zan = $('ul.special-zan');
	$zan.delegate('a', 'click', function(event) {
		if(cookie.get(encodeURIComponent(location.pathname+location.search))){
			alert('请勿重复提交！');
			return false;
		}
		var url = $(this).attr('href');
		$.get(url,function(data){
			data = data['data'];
			if(data['state'] == 1){
				$zan.find('li.g-fl span').html(data['generalCount']);
				$zan.find('li.g-fr span').html(data['badCount']);
				$zan.find('li.m span').html(data['goodCount']);
				cookie.set(encodeURIComponent(location.pathname+location.search),true,1440);
			}
		},'jsonp');
		event.preventDefault();
	});

});