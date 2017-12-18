/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	require('./init');

	var $navHdItem =$('.nav-items li'),
		$navBdUl = $('div.nav-items-bd ul:first'),
		$navItem = $navBdUl.find('li'),
		$map = $('#map'),
		$quick = $('ul.quick'),
		markTime,
		clearMarkTime = false;

	$navBdUl.delegate('a', 'click', function(event) {
		var
			$t = $(this).parent(),
			$tagMarket = $map.find('div.tag-market');
		clearMarkTime = true;
		clearMark();
		$t.addClass('active').siblings('.active').removeClass('active');
		if($tagMarket.is('.g-dn')){
			$tagMarket.removeClass('g-dn').siblings().addClass('g-dn');
			$quick.find('li.cur').removeClass('cur');
		}
		var $active = $tagMarket.find('div.item').eq($t.index());
		position($active);
		$active.addClass('active').siblings('.active').removeClass('active');
		$map.find('div.tag-station').find('.active').removeClass('active');
		return false;
	});

	$map.delegate('div.J_tag:not(.g-dn) div.icon', 'click', function(event) {
		var $t = $(this).parent().trigger('mouseover');
		clearMark();
		position($t);
		$t.addClass('active').siblings('.active').removeClass('active');
		if($t.parent().is('.tag-market')){
			$navItem.removeClass('active').eq($t.index()).addClass('active');
		}
		$t.parent().siblings('.tag-station').find('.active').removeClass('active');
	}).delegate('div.J_tag:not(.g-dn)>div.active', 'mouseover', clearMark)
	.delegate('div.J_tag:not(.g-dn)>div.active', 'mouseout',markPlay)
	.delegate('div.tag-station div.icon', 'click', function(event) {
		clearMark();
		var $t = $(this).parent();
		$t.addClass('active').siblings('.active').removeClass('active');
		$t.parent().siblings(':not(.g-dn)').find('.active').removeClass('active');
		$navItem.removeClass('active');
	});

	function position(item){
		if(item.is('.J_position')) return;
		var $bg = item.find('.bg'),
			$panel = item.find('.panel'),
			$icon = item.find('.icon'),
			$arr = item.find('.arr'),
			min = {
				top : $bg.height()+item.find('.arr').height(),
				left : $bg.width()
			},
			pos = item.position();
		pos.top = pos.top + $icon.height()/2;
		pos.left = pos.left + $icon.width()/2
		if(pos.top < min.top){
			item.addClass('item-y');
		}
		if(pos.left < min.left){
			item.addClass('item-x');
		}
		item.addClass('J_position');
	}

	//标注功能
	function marketTemplate(m,data){
		var
			m = m || 'market',
			position,
			style,
			info,
			items = '<div class="map-tag J_tag tag-'+m+'">';

		for(var i in data){
			position = (data[i]['coordinate'] || '100,100').split(',');
			style = 'style="left:'+position[0]+'px;top:'+position[1]+'px"';
			info = m == 'market' ? ('<div class="g-fl thumb"><a href="//market.csc86.com/'+data[i]['domain']+'"><img src="'+data[i]['img']+'" alt="'+data[i]['marketName']+'" width="110" height="100"/></a></div><div class="info"><h3 class="g-e" title="'+data[i]['marketName']+'">'+data[i]['marketName']+'</h3><div class="g-cf"><a href="'+data[i]['joinURL']+'">申请入驻</a><a href="'+data[i]['buyURL']+'">我要租铺</a><a href="//market.csc86.com/'+data[i]['domain']+'">进入市场</a><a href="'+data[i]['lookURL']+'">观感打分</a></div></div>') : 
			('<div class="g-fl thumb"><a href="'+data[i]['url']+'" target="_blank"><img src="'+data[i]['imagepicture']+'" alt="'+data[i]['name']+'" width="80" height="80"/></a></div><ul class="info"><li>配套名称：<a href="'+data[i]['url']+'" target="_blank">'+data[i]['name']+'</a></li><li>位　　置：'+data[i]['location']+'</li><li>联系电话：'+data[i]['phone']+'</li><li>特　　色：'+data[i]['feature']+'</li></ul>');
			items += ('<div class="item'+(i==0 ? ' active':'')+'"'+style+'>'+
						'<div class="panel">'+
							'<div class="g-cf">'+
								info+
							'</div>'+
							'<div class="bg"></div>'+
							'<div class="arr"></div>'+
						'</div>'+
						'<div class="icon"></div>'+
					'</div>');

		}
		return items += '</div>';
	}

	function markPlay(){
		clearMarkTime = false;
		markTime = setTimeout(function (){
			var
				$active = $map.find('div.J_tag:not(.g-dn)>div.active');

			if($active.length == 0){
				$active = $map.find('div.J_tag:not(.g-dn)>div:first').addClass('active');
			}

			var
				$parent = $active.parent(),
				$next = $active.is(':last-child') ? $parent.find(':first-child') : $active.next();
			$active.removeClass('active');
			position($next);
			$next.addClass('active');
			if($parent.is('.tag-market')){
				$navItem.removeClass('active').eq($next.index()).addClass('active');
			}
			markPlay();
		},3000);
	}

	function clearMark(){
		clearTimeout(markTime);
	}

	function mark(type){
		var $map = $('#map'),
			markets = [
				['market','market/shenzhen'],
				['eat','support/cy'],
				['bank','support/yh'],
				['hotel','support/jd'],
				['enter','support/xx']
			],
			$type = $map.find('div.tag-'+markets[type][0]);
		clearMark();
		$map.find('div.tag-station').find('.active').removeClass('active');
		if($type.length > 0){
			$type.removeClass('g-dn').siblings().addClass('g-dn');
			if(type == 0){
				$navItem.removeClass('active').eq($type.find('div.active').index()).addClass('active');
			}
			markPlay();
			return;
		}
		$.get('//market.csc86.com/api/'+markets[type][1],function(data){
			$map.children().addClass('g-dn');
			$map.append(marketTemplate(markets[type][0],data.data));
			position($map.find('div.J_tag:not(.g-dn)>div.active'));
			markPlay();
			if(type == 0){
				$navItem.eq(0).addClass('active');
			}else{
				$navItem.removeClass('active');
			}
		},'jsonp');
	}

	mark(0);

	$quick.delegate('li a', 'click', function(event) {
		var $li = $(this).parent();
		if($li.is('.cur')){
			return false;
		}
		mark($li.index()+1);
		$li.addClass('cur').siblings('.cur').removeClass('cur');
		$navItem.removeClass('active');
		$navHdItem.removeClass('cur');
		$navBdUl.parent().removeClass('nav-items-bd-cur');
		return false;
	}).delegate('span', 'click', function(event) {
		$(this).parent().removeClass('cur');
		mark(0);
		return false;
	});

	//商铺搜索功能
	var $search = $('#J_search'),
		$searchLayout = $search.parents('.layout-search'),
		$searchResult = $('div.search-result');

	$(document).bind('click',function(event){
		if($(event.target).parents('.layout-search').length == 0){
			$searchResult.addClass('g-dn');
			$searchLayout.removeClass('layout-search-active');
		}
		if(clearMarkTime && $(event.target).parents('.nav-items-bd').length == 0){
			markPlay();
		}

	}).bind('keyup',function(event){
		if(event.which == 27 && $(event.target).parents('.layout-search').length > 0){
			$searchResult.addClass('g-dn');
		}
	});

	$search.on('submit',function (event,start){
		var
			$q = $search.find('[name=q]'),
			q = $.trim($q.val()),
			start = start || 0,
			$start = $search.find('[name=start]').val(start);
		if(q.length == 0){
			$q.trigger('focus');
			return false;
		}
		$.get($search.attr('action'),$search.serializeArray(),function(data){
			if(data == 'empty'){
				data = '<div class="g-tc g-fs14 sr-empty">很抱歉，没有找到符合 <span>“'+q+'” </span> 的结果！</div>'
			}
			$start.val(0);
			$searchResult.html(data).removeClass('g-dn');
		});
		return false;
	});
	$searchResult.delegate('div.sr-page a', 'click', function() {
		var $t = $(this);
		$search.trigger('submit',[$t.data('start')]);
		return false;
	});
	$searchLayout.on('focusin',function(){
		$searchLayout.addClass('layout-search-active');
	});

	if(location.hash){
		hash = location.hash.replace('#','');
		$quick.find('li.'+hash + ' a').trigger('click');
	}

	$('div.csc-style').delegate('span', 'click', function(event) {
		$(this).parent().addClass('csc-style-show');
	}).delegate('h2', 'click', function(event) {
		$(this).parent('.csc-style-show').removeClass('csc-style-show');
	});

});