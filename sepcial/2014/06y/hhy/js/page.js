define(function(require, exports, module) {
	function AllPage(dom) {
		this.Parent = dom;
		this.flag = true;
		this.init.apply(this, arguments);
		this.active = 1;

	};
	AllPage.prototype = {
		init: function(data) {
			this.setLi();
			this.pageCtr()
		},
		setLi: function() {
			var me = this,
				PageNum = $(".J-page").length,
				oLi = "<li class='page-cur'>1</li>",
				oLiA = "<li>...</li>";
			$(".all-page span").text(PageNum)
			if (PageNum > 10) {
				for (var i = 1; i < 6; i++) {
					oLi += "<li>" + (i + 1) + "</li>"
				}


				oLiA += "<li>" + PageNum + "</li>"
				$(".page-number").html(oLi + oLiA);

			} else {
				for (var i = 1; i < PageNum; i++) {
					oLi += "<li>" + (i + 1) + "</li>"
				}
				$(".page-number").html(oLi);
			}

		},
		fixLi: function(index) {
			var me = this,
				PageNum = $(".J-page").length,
				oLi = "<li>1</li><li>...</li>",
				oLiA = "",
				oLiB = "<li>...</li>"
			for (var i = index - 2; i < index; i++) {
				oLiA += "<li>" + (i + 1) + "</li>";
			}
			for (var i = index; i < index + 2; i++) {
				oLiA += "<li>" + (i + 1) + "</li>"
			}
			if (index < PageNum - 3) {
				oLiA += "<li>...</li><li>" + PageNum + "</li>"
			} else {
				if (me.flag) {
					for (var i = index; i < PageNum; i++) {
						oLiA += "<li>" + (i + 1) + "</li>";
						me.flag = false;
					}
				}
			}
			$(".page-number").html(oLi + oLiA);
		},
		_fixLi: function() {
			var me = this,
				len = this.Parent.find('.items').length,
				PageNum = $(".J-page").length,
				oLi = "<li>1</li><li>...</li>",
				oLiA = "";
			for (var i = PageNum - 5; i < PageNum; i++) {
				oLiA += "<li>" + (i + 1) + "</li>"
			}
			$(".page-number").html(oLi + oLiA);
			console.log(oLiA)
		},
		showPage:function(i){
			$(".J-page").eq(i).removeClass('g-dn').siblings().addClass('g-dn');
		},
		pageCtr: function() {
			var split = 5,
				me = this,
				len = this.Parent.find('.items').length,
				PageNum = Math.round(len / 5);
			//点击页码
			$(".page-number").delegate('li', 'click', function() {
				me.active = $(this).text();
				if (me.active == "...") {
					return
				} else {
					me.showPage(me.active-1);
					if (PageNum > 10) {
						if (me.active > 5 && me.active < PageNum - 2) {
							me.fixLi(me.active - 1);
						} else if (me.active < 5) {
							me.setLi()
						} else if (me.active >= PageNum - 2) {
							me._fixLi();
						}
					}
					$(".page-number").find('li').each(function() {
						if ($(this).text() == me.active) {
							$(this).addClass("page-cur").siblings().removeClass("page-cur");
						}
					})
				}
				me._Style(me.active, PageNum);
			});
			//搜索
			$('.page-btn').bind('click', function() {
				me.active = $(".text").val() || 1;
				if (!isNaN(me.active)) {
					me.showPage(me.active-1);
					if(PageNum>10){
						if (me.active > 5 && me.active < PageNum - 2) {
						me.fixLi(me.active - 1);
					} else if (me.active < 5) {
						me.setLi()
					} else if (me.active >= PageNum - 2) {
						me._fixLi();
					}
					}
					$(".page-number").find('li').each(function() {
						if ($(this).text() == me.active) {
							$(this).addClass("page-cur").siblings().removeClass("page-cur");
						}
					});
					me._Style(me.active, PageNum);
				} else {
					return
				}

			});
			//上一页
			$(".pre").bind('click', function() {
				if (me.active > 1) {
					me.active -= 1;
					me.showPage(me.active-1);
					if(PageNum>10){
						if (me.active > 5 && me.active < PageNum - 2) {
						me.fixLi(me.active - 1);
					} else if (me.active < 5) {
						me.setLi()
					} else if (me.active > PageNum - 2) {
						me._fixLi();
					}
					}
					$(".page-number").find('li').each(function() {
						if ($(this).text() == me.active) {
							$(this).addClass("page-cur").siblings().removeClass("page-cur");
						}
					});
				}
				me._Style(me.active, PageNum);
			});
			//下一页
			$(".next").bind('click', function() {
				if (me.active < PageNum) {
					me.active = Number(me.active) + 1;
						me.showPage(me.active-1);;
					if (PageNum>10) {
						if (me.active > 5 && me.active < PageNum - 2) {
							me.fixLi(me.active - 1);
						} else if (me.active < 5) {
							me.setLi()
						} else if (me.active > PageNum - 2) {
							me._fixLi();
						}
					}
					$(".page-number").find('li').each(function() {
						if ($(this).text() == me.active) {
							$(this).addClass("page-cur").siblings().removeClass("page-cur");
						}
					});
				}
				me._Style(me.active, PageNum);
			});
		},
		_Style: function(start, end) {
			if (start == end) {
				$(".next").addClass('defau');
				$(".pre").removeClass('defau');
			} else if (start > 1 && start < end) {
				$(".pre").removeClass('defau');
				$(".next").removeClass('defau');
			} else if (start == 1) {
				$(".pre").addClass('defau')
				$(".next").removeClass('defau');
			}
		}
	};
	$.fn.Page = function() {
		var $me = $(this)
		return new AllPage($me)
	}

})