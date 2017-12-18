define(function(require, exports, module) {
	require('./waterfall');

	function GetData(obj) {
		this.init(this, obj);
		return this;
	}
	GetData.prototype = {
		init: function() {
			var option = arguments[1];
			this.Klick(option); //事件加载
			this.getFirst('', 13); //获取一级类目
			this.getSecond('&categoryId=13');
			this.getProducts('&categoryId=13'); //获取产品
			this.Collection(); //收藏
		},
		Klick: function(option) {
			/*
			 * id：国家的筛选条件,
			 * ids一级类目，
			 * idss二级类目，
			 * bsid商家筛选，
			 * priceId价格排序，newUpdate最新发布
			 * firstIndex缓存类目高亮项ID
			 * secondIndex缓存二级类目高亮项ID
			 */
			var id = '',
				ids = '&categoryId=13',
				idss = '',
				order = '',
				bsId = '',
				priceId = '',
				newUpdte = '',
				mainId = '',
				firstIndex = 13,
				secondIndex = null;
			var me = this;
			//筛选条件事件
			option.cLickElements.on('click', 'p a', function() {
				$('.clear-key').show();
				$('.water-fall').html('');
				$(this).addClass('cur').siblings().removeClass('cur');
				$(".water-fall").removeAttr('').html('')
				var $this = $(this);
				var txt = $(this).text().replace(/\({1}|\d|\)/g, '');
				var parentId = $(this).parent().parent().attr('id');
				switch (parentId) {
					case 'contry':
						$('#second-key').parent().hide();
						$('.second-key p').html('');
						var mytxt = encodeURI($(this).text().replace('馆', ''));
						id = ',country:' + mytxt;
						ids = '';
						idss = '';
						var index = option.cLickElements.find('a').index(this);
						$('#first-key b a').attr('dataId', index);
						$('#first-key a,#second-key a').removeClass('cur');
						mainId = id + ids + idss;
						firstIndex = null;
						me.getFirst(id);
						//me.getSecond(id+ids);
						$('.contry,.second,.third').remove();
						me.setCrumbs('国家', txt);
						break;
					case 'first-key':
						ids = '&categoryId=' + $(this).attr('categoryid');
						mainId = id + ids
						me.getSecond(mainId);
						me.setCrumbs('类目', txt);
						firstIndex = $this.attr('categoryid')
						break;
					case 'second-key':
						$(this).addClass('cur');
						idss = '&twocategoryId=' + $(this).attr('categoryid');
						var mainId = id + ids + idss;
						me.setCrumbs('', txt);
						secondIndex = $this.attr('categoryid');
						break;
				}
				me.getProducts(mainId);
				$('.water-fall').removeAttr('style')
				$('.get-product').hide();
				$('.promotion,.demotion').removeClass('cur-0').removeClass('cur-1');

			});
			//清除单个筛选条件
			$('.key-words-select').on('click', '.closed', function() {
				$('.promotion,.demotion').removeClass('cur-0').removeClass('cur-1');
				$('.water-fall').html('')
				var $this = $(this);
				var index = $(this).parent().text().slice(0, 2);
				var i = $('.closed').index(this);
				$(this).parent().remove();

				switch (index) {
					case '国家':
						id = '';
						mainId = ids + idss;
						me.getFirst(id, firstIndex);
						if (ids !== '') {
							me.getSecond(ids, secondIndex);
						}
						me.getProducts(mainId);
						$('#second-key a,#contry a').removeClass('cur')
						break;
					case "类目":
						ids = '';
						idss = '';
						mainId = id;
						firstIndex = null;
						me.getFirst(mainId);
						me.getProducts(mainId);
						$('#first-key a,#second-key a').removeClass('cur');
						$('.third').remove();
						$('.column:last').hide()
						break;
					default:
						idss = '';
						mainId = id + ids;
						me.getProducts(mainId, secondIndex);
						secondIndex = null;
						$('#second-key a').removeClass('cur');
						break;
				}
				var len = $('.on-key span').length;
				if (len <= 0) {
					$('.clear-key').hide();
				}
			});
			//清楚筛选条件
			$('.clear-key').on('click', function() {
				$('.promotion,.demotion').removeClass('cur-0').removeClass('cur-1');
				$('.water-fall').html('')
				me.getFirst('', 13); //获取一级类目
				me.getSecond('&categoryId=13');
				me.getProducts('&categoryId=13'); //获取产品
				$('.on-key').html('<span class="key-words-on second">类目：<span class="fc-ff8f5c">礼品、工艺品</span><b class="closed"></b></span>');
				$('#contry p a').removeClass('cur')
				$('.get-product').hide();
			});
			//点击全部
			$('.key-words-link b a').on('click', function() {
				$('.promotion,.demotion').removeClass('cur-0').removeClass('cur-1');
				$('.water-fall').html('');
				var index = $('.key-words-link b a').index(this);
				switch (index) {
					case 0:
						id = '';
						mainId = ids + idss;
						me.getFirst(id, firstIndex);
						if (ids !== '') {
							me.getSecond(ids, secondIndex);
						}
						me.getProducts(mainId, secondIndex);
						$('#contry a').removeClass('cur');
						$('.ifirst').remove();
						break;
					case 1:
						ids = '';
						idss = '';
						mainId = id
						me.getFirst(mainId);
						me.getProducts(mainId);
						$('#first-key a,#second-key a').removeClass('cur');
						$('.second,.third').remove();
						$('.fix-pd').hide();
						break;

				}
				var len = $('.on-key span').length;
				if (len <= 0) {
					$('.clear-key').hide();
				}
			});
			//商家筛选
			$('.select').on('click', 'li', function() {
				$('.promotion,.demotion').removeClass('cur-0').removeClass('cur-1');
				$(this).addClass('cur').siblings('li').removeClass('cur');
				var txt = $(this).text();
				$('.select span').text(txt);
				var evip = $(this).attr('evip');
				bsId = evip == 'all' ? '' : ',evip:' + $(this).attr('evip');
				mainId = bsId + id + ids + idss;
				$('.water-fall').html('').removeAttr('style');
				me.getProducts(mainId);
				$('.get-product').hide();
			});
			//价格排序
			$('.price-sort').on('click', 'span', function() {
				var i = $('.price-sort span').index(this);
				var n = i > 0 ? 0 : 1;
				$(this).addClass('cur-' + i).siblings().removeClass('cur-' + n);
				priceId = $(this).attr('price');
				mainId = ',order:price,desc:' + priceId + bsId + id + ids + idss;
				$('.water-fall').html('').removeAttr('style');
				me.getProducts(mainId);
				$('.get-product').hide();
			});
			//最新发布
			$('.all-new').on('click', function() {
				$('.promotion,.demotion').removeClass('cur-0').removeClass('cur-1');
				var publicTime = null;
				if ($(this).hasClass('new')) {
					$(this).removeClass('new').text('最新发布');
					publicTime = ',order:publishTime,desc:asc';
				} else {
					$(this).addClass('new').text('最早发布');
					publicTime = ',order:publishTime,desc:desc';

				}
				mainId = publicTime + bsId + id + ids + idss;
				$('.water-fall').html('').removeAttr('style');
				me.getProducts(mainId);
				$('.price-sort span').removeClass('cur-0 cur-1');
				$('.get-product').hide();
			});

		},
		getFirst: function(id, firstIndex) { //获取一级类目
			var me = this;
			$(this).addClass('cur').siblings().removeClass('cur');
			$.get(me.setUrl(id, false), function(data) {
				if (data.length - 1 > 0) {
					var sA = '';
					//循环目录
					for (var i = 0; i < data.length - 1; i++) {
						sA += '<a href="javascript:;" categoryID="' + data[i]["categoryID"] + '">' + data[i]["categoryName"] + '<span>(' + data[i]["categoryCount"] + ')</span></a>';
					}
					$('#first-key').show();
					$('#first-key p').html(sA);
					//设置高亮
					$('#first-key p').find('a').each(function() {
						if ($(this).attr('categoryid') == firstIndex) {
							$(this).addClass('cur');
						}
					});
					if ($('#first-key p').height() > 48) {
						$('.btn-more').show().off().on('click', 'span', function() {
							$('#first-key').toggleClass('h-48');
							if (!$(this).hasClass('spread')) {
								$(this).addClass('spread').text('收起');
							} else {
								$(this).removeClass('spread').text('更多');
							}
						});
					} else {
						$('.btn-more').hide();
					}

				} else {
					$('#first-key').hide();
					$('.key-words:last').hide();
					$('#first-key p').html('');
					$('.btn-more').hide();
				}
			}, 'jsonp').fail(function() {
				$('#first-key').hide();
				$('.btn-more').hide();
				$('.key-words:last').hide();
				$('.second,.third').remove();
			});

		},
		getSecond: function(id, secondIndex) { //获取二级类目
			var me = this;
			var secSa = '';
			if ($(this).hasClass('cur')) {
				return;
			}
			$(this).addClass('cur');
			$('#second-key').parent().hide();
			$.get(me.setUrl(id, false), function(data) {
				for (var j = 0; j < data.length - 1; j++) {
					secSa += '<a href="javascript:;" categoryid="' + data[j]["categoryID"] + '">' + data[j]["categoryName"] + '<span>(' + data[j]["categoryCount"] + ')</span></a>';
				}
				$('#second-key p').html(secSa);

				$('#second-key  p').find('a').each(function() {
					if ($(this).attr('categoryid') == secondIndex) {
						$(this).addClass('cur');
					}
				});
				$('#second-key').parent().show();

			}, 'jsonp');
		},
		setCrumbs: function(Class, ClassName) { //设置当前筛选条件
			var sDom = null;
			if (Class) {
				if (Class == '国家') {
					$('.ifirst').remove()
					sDom = '<span class="key-words-on ifirst">' +
						Class +
						'：<span class="fc-ff8f5c">' +
						ClassName +
						'</span><b class="closed"></b></span>';
					$(sDom).prependTo('.on-key');
				} else {
					$('.second,.third').remove()
					sDom = '<span class="key-words-on second">' + Class + '：<span class="fc-ff8f5c">' + ClassName + '</span><b class="closed"></b></span>';
					$('.on-key').append(sDom);
				}
			} else {
				$('.third').remove()
				sDom = '<span class="key-words-on third"><span class="fc-ff8f5c">' + ClassName + '</span><b class="closed"></b></span>';
				$('.on-key').append(sDom);
			}

		},
		getProducts: function(id) { //获取产品
			var waterfall;
			var me = this;
			$('.onload').show();
			me.id = id;
			//初始化默认加载产品
			$.get(me.setUrl(me.id, true) + '&start=0&rows=4', function(data) {
				var dataLen = data.length - 1;
				if (dataLen > 0) {
					$('body').removeAttr('flag');
					$('.onload').hide();
					var id = id;
					var startId = 4,
						endId = 4;
					page = 1;

					var DefaultNum = dataLen > 4 ? 4 : data.length - 1;
					waterfall = $('.water-fall').waterfall({
						Data: data,
						minColCount: 4,
						minDefault: DefaultNum
					});
					if (data[dataLen]['countNum'] <= 4) {
						$(window).off('scroll');
						return
					}
					//滚动时候加载产品
					var scrollTimer = null;
					$(window).off('scroll').on('scroll', function() {
						if (scrollTimer) {
							clearTimeout(scrollTimer)
						}
						scrollTimer = setTimeout(function() {
							var a = $(document).scrollTop() >= $(document).height() - $(window).height();
							var b = $(document).scrollTop() >= $('.water-fall').outerHeight() - $(window).height() - 400;
							if (a || b) {
								startId = page * 4;

								$('.onload').show();
								$.get(me.setUrl(me.id, true) + '&start=' + startId + '&rows=4', function(data) {
									var dLen = data.length - 1;
									if (data.length - 1 <= 0) {
										$(window).off('scroll');
										$('.onload').hide();
										return;
									}
									var isEnd = startId / 4 == 15;
									if (isEnd) {
										$('.get-product').show();
										$('.onload').hide();
										me.getMore(startId);
										$(window).off('scroll');
										return;
									}
									$('.onload').hide();
									page++;
									DefaultLen = 4 > data.length - 1 ? data.length - 1 : 4;
									waterfall = $('.water-fall').waterfall({
										Data: data,
										minColCount: 4,
										minDefault: DefaultLen
									});
								}, 'jsonp');

							}
						}, 400);
					});
				} else {
					$('.water-fall').text('暂无产品');
					$('.onload').hide();
				}
			}, 'jsonp');

		},
		setUrl: function(id, flag) { //url拼装
			var isLogin = require('//api.csc86.com/member/isLogin.html?callback=define');
			var memberId = '';
			if (isLogin['data']['memberId']) {
				memberId = isLogin['data']['memberId'];
			} else {
				memberId = '';
			}
			var sUrl = flag ?
				/*'http://www.1668dm.com/search.product?memberid=' + memberId + '&params=shopType:dm' :
				'http://www.1668dm.com/search.category?params=shopType:dm';*/
				'http://www.1668dm.com/api.php?op=searchProduct&memberid=' + memberId + '&params=shopType:dm' :
				'http://www.1668dm.com/api.php?op=searchCategory&params=shopType:dm';
			sUrl += id;
			return sUrl;
		},
		getMore: function(startId) { //点击更多加载60个产品
			var me = this;
			$('.get-product').off('click').on('click', function() {
				if ($('body').attr('flag')) {
					return;
				}
				$('.onload').show();
				$.get(me.setUrl(me.id, true) + '&start=' + startId + '&rows=60', function(data) {
					$('.onload').hide();
					startId += 60;
					var DefaultLen = 60 > data.length - 1 ? data.length - 1 : 60;
					var countNmm = Math.ceil(data[data.length - 1]['countNum'] / 60);
					isEnd = startId / 60 >= countNmm;
					if (isEnd) {
						$('body').attr('flag', true);
						$('.get-product').hide();
					}

					waterfall = $('.water-fall').waterfall({
						Data: data,
						minColCount: 4,
						minDefault: DefaultLen
					});

				}, 'jsonp');
			})
		},
		Collection: function() { //收藏产品事件
			require('m/dialog/js/init');
			//登录状态

			var isLogin = require('//api.csc86.com/member/isLogin.html?callback=define');
			$('.water-fall').on('click', '.collection', function() {
				var id = $(this).attr('productId');
				var $this = $(this);
				if (isLogin.status == false) {
					window.location = '//member.csc86.com/login/phone/';
					return;
				}
				$.get('//api.csc86.com/favorites/saveforgoods.html?gid=' + id, function(data) {
					var d = null;
					if (data.status) {
						$this.removeClass('collection').addClass('collectioned').text('已收藏');
						artDialog.tip('收藏成功');
					} else {
						artDialog.tip('收藏失败');
					}
				}, 'jsonp');
			});
		}
	}
	exports.GetData = function(obj) {
		return new GetData(obj)
	}
})