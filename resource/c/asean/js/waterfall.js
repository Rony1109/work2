define(function(require, exports, module) {
	var waterfall = function($dom, option) {
		//默认参数
		var items = {
				itmes: '.items-fall',
				minColCount: 4,
				marginTop: 15,
				minDefault: 24,
				MinHeight: 0
			},
			option = $.extend(items, option);
		this.init.apply(this, [$dom, option]);
		return this;
	}
	waterfall.prototype = {
		//组装器
		init: function() {
			var me = this;
			var $dom = arguments[0],
				option = arguments[1];
			this.Render($dom, option.Data, option.minDefault);
			var $img = $($dom).find('img');
			$img.one('load', function() {
				me.SetPosition($dom, option);
			});
			$img.one('error', function() {
				$(this).attr('src', '//res.csc86.com/v2/c/asean/css/img/defaultpic.gif');
				me.SetPosition($dom, option);
			});
		},
		//模板构建
		LoadData: function(Data, len) {
			var sLi = ""
			for (var i = 0; i < len; i++) {
				var Reg = /^[1-9]?[0-9]*\.[0-9]*$/;
				var price = (Data['speak'] == 'Y' || Data[i]['price'] == '' || Number(Data[i]['price']) <= 0) ? '价格面议' : (Reg.test(Data[i]['price']) ? Data[i]['price'] : Data[i]['price'] + '.00');
				var favorite = Data[i]['favorite'] == true ?
					'<span class="collectioned">已收藏</span>' :
					'<span class="collection" productId="' + Data[i]['productId'] + '">收藏</span>'
				var _sLi = '<li class="items-fall"><a href="http://' + Data[i]['submain'] + '.csc86.com/product/' + Data[i]['productId'] + '.html" target="_blank" title="' + Data[i]['title'] + '">' +
					'<img src="//img.csc86.com/' + Data[i]['picUrl'] + '" width="178"  alt="" />' +
					'<b class="bg">' + price + '</b>' +
					'<b>' + price + '</b>' +
					'<span>' + Data[i]['title'] + '</span>' +
					'</a>' +
					'<div class="tool g-cf">' +
					favorite +
					'<span class="open-shop"><a href="http://' + Data[i]['submain'] + '.csc86.com" target="_blank">进入旺铺</a></span>' +
					'</div>' +
					'</li>'
				sLi += _sLi;
			}
			return sLi;
		},
		//设置位置
		SetPosition: function($dom, option) {
			var $dom = $dom,
				me = this,
				oLi = $dom.find(option.itmes),
				_width = oLi.eq(0).outerWidth() + 16,
				PositionAry = [],
				len = option.minColCount,
				i = 0;

			for (; i < len; i++) {
				PositionAry.push([_width * i, 0]);
			}
			oLi.each(function(i) {
				var Temporary = 0,
					$this = $(this);
				var _Height = $this.height() + 17;
				for (var j = 0; j < len; j++) {
					if (PositionAry[j][1] < PositionAry[Temporary][1]) {
						Temporary = j;
					}
				}
				this.style.cssText = 'left:' + PositionAry[Temporary][0] + 'px;top:' + PositionAry[Temporary][1] + 'px;display:block;'
				PositionAry[Temporary][1] = PositionAry[Temporary][1] + _Height;
			});
			var pos = [];
			for (var i = 0; i < len; i++) {
				pos.push(PositionAry[i][1]);
			}
			pos.sort(function(a, b) {
				return a - b;
			});
			$dom.height(pos[len - 1]);

		},
		//渲染
		Render: function($dom, Data, len) {
			var Data = this.LoadData(Data, len);
			$dom.append(Data);
		}
	}
	//实例化接口
	$.fn.waterfall = function(option) {
		var $this = $(this);
		return new waterfall($this, option);
	}

})