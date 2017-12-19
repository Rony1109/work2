/*
 * 抽奖
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'http://cdn.bootcss.com/jquery/1.11.0/jquery.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'scrollLoading':'./jquery.scrollLoading.js',
		'comment': 'm/comment/js/init.js',
		'dialog':'m/dialog/js/init.js',
		'scroll':'./scroll.js'
		
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('jquery');

$('.list-img').hover(function() {
	$(this).find('.ewm').show();
}, function() {
	$(this).find('.ewm').hide();
});
	
	require('dialog');
	require('http://res.csc86.com/f=js/m/config.js');		
	seajs.use(csc.url("res", "/f=js/m/sign"));
	// 抽奖名单
	$.ajax({
		//url:'http://special.csc86.com/2016/02y/kcxph/js/data2.json',
		url:'//api.csc86.com/newlottery/getHit',
		data:{},
		type:'get',
		//dataType:'json',
		dataType:'jsonp',
		beforeSend:function(){
			$(".cjcontent .rcon").html('<p class="loading">加载中...</p>');
		},
		success:function(data){
			if(data.status===true){
				var cons="";
				$.each(data.data,function(){
					var _this= this;
					cons+='<li class="after"><span class="s1">'+this.account+'</span><span class="s2">'+this.awards+'</span><span class="s3">'+this.drawtime+'</span></li>';
				});

				$(".cjcontent .rcon").html(cons);
			}
			//系统异常时
			else {
				$(".cjcontent .rcon").html('<p class="loading">加载失败，请刷新页面后重试！</p>');
			}
			
		},
		//请求异常时
		error:function(){
			$(".cjcontent .rcon").html('<p class="loading">加载失败，请刷新页面后重试！</p>');
		}
	});

if ($(window).scrollTop() > 600) {
	$('#rightnav').show();
};
$(window).scroll(function(event) {
	var top = $(window).scrollTop();
	if (top > 600) {
		$('#rightnav').show();
	} else {
		$('#rightnav').hide();
	}
});

(function($, window, document, undefined) {
    var EventUtil = {
        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element["on" + type] = null;
            }
        }
    }

    function extend(obj, obj1) {
        for (var attr in obj1) {
            obj[attr] = obj1[attr];
        }
        return obj;
    }

    function addClass(element, value) {
        if (!element.className) {
            element.className = value;
        } else {
            var newClassName = element.className;
            newClassName += " ";
            newClassName += value;
            element.className = newClassName;
        }
    }

    function removeClass(obj, cn) {
        return obj.className = obj.className.replace(new RegExp("\\b" + cn + "\\b"), "");
    }

    var dialogs = function(content, cancel, fun1, fun2, id) {
        $("#cjbtn").data({
            stop: 1
        });
        $.dialog({
            id: id || 'chouj',
            cancel: cancel && null,
            title: false,
            background: '#000',
            content: content || "",
            fixed: true,
            lock: true,
            opacity: .85,
            init: fun1 || null,
            close: fun2 || null
        });
    };

    function isType(type) {
        return function(o) {
            return Object.prototype.toString.call(o) === '[object ' + type + ']';
        }
    }
    var isString = isType("String");
    var isObject = isType("Object");
    var isArray = isType("Array");

    function Game(opt) {
        this.btn = opt.btn,
        this.gameList = opt.gameList,
        this.list = $(this.gameList).find(".cj p"),
        this.max = this.list.length,
        this.minCycle = opt.minCycle,
        this.winResult,
        this.timer,
        this.init();
    }

    Game.prototype = {
        addOpacity: function(obj, classname) {
            if (typeof obj.length != "undefined") {
                for (var i = 0,
                len = obj.length; i < len; i++) {
                    addClass(obj[i], classname);
                }
            } else {
                addClass(obj, classname);
            }
        },
        removeOpacity: function(obj, classname) {
            if (typeof obj.length != "undefined") {
                for (var i = 0,
                len = obj.length; i < len; i++) {
                    removeClass(obj[i], classname);
                }
            } else {
                removeClass(obj, classname);
            }
        },
        init: function() {
            var self = this;
            $("#cjbtn").data({
                stop: 1
            });
            EventUtil.addHandler(self.btn, "click",
            function() {
                if ($("#cjbtn").data("stop") == 1) {
                    $("#cjbtn").data({
                        stop: 0
                    });
                    var $chouj = $(".chouj");
                    var $choujdh = $chouj.find(".dh").val();
                    var $cjbtn = $("#cjbtn");

                    $.ajax({
                        url: '//api.csc86.com/newlottery/orderDraw',
                        data: {
                            orderId: $choujdh
                        },
                        type: 'post',
                        dataType: 'jsonp',
                        beforeSend: function() {},
                        success: function(data) {
                            //登陆
                            if (data.No == -1) {
                                csc.checkSign("location.reload");
                            } else {
                                if (!$choujdh) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">请输入订单号！</p></div>');
                                    return false;
                                };
                                var No=data.No;
                                // var No = 1;
                                if (No == -4) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">抽奖活动还未开始哦！</p></div>');
                                    return false;
                                };
                                if (No == -9) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">系统查询不到您的订单，请继续购物哦！</p></div>');
                                    return false;
                                };
                                if (No == -14) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">亲，你迟到了，奖品已全部抽完！</p></div>');
                                    return false;
                                };
                                if (No == -3) {
                                    dialogs('<div class="dhno"><img src="image/hdjs.png"><p class="p2">亲，活动已经结束，不能抽奖了哦！</p></div>');
                                    return false;
                                };
                                if (No == -8) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">该订单号已经抽过奖啦！</p></div>');
                                    return false;
                                };
                                if (No == -9) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">该订单号不存在！</p></div>');
                                    return false;
                                };
                                if (No == -7) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">该订单号已经中过奖啦！</p></div>');
                                    return false;
                                };
                                if (No == -15) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">该订单尚未交易完成，不能参与抽奖!</p></div>');
                                    return false;
                                };
                                if (No == -16) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">非活动期间的订单号不能抽奖!</p></div>');
                                    return false;
                                };
                                if (No == -17) {
                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">亲，低于' + data.data.minMoney + '元的订单不能参与抽奖哦！</p></div>');
                                    return false;
                                };
                                self.winResult =data.data.id;	
                                // self.winResult = 1;
                                var count = 1,
                                i = 0,
                                speed = 150,
                                result = self.winResult,
                                num = -1;

                                clearInterval(self.timer);
                                self.removeOpacity(self.list, "active");
                                self.addOpacity(self.list[0], "active"); (function move() {

                                    self.timer = setTimeout(function() {
                                        if (count <= self.minCycle) {
                                            self.removeOpacity(self.list[i], "active"); (i == 8) && (count++);
                                            i < 9 ? i++:i = 0;

                                            self.addOpacity(self.list[i], "active");

                                            if (count == self.minCycle && result < 6 && i >= 9 - (6 - result)) {

                                                speed < 200 ? speed += 40 : speed = 200;
                                            } else {
                                                speed < 50 ? speed = 50 : speed -= 10;

                                            }
                                            move();
                                        } else {

                                            (result <= 6) && (speed < 200 ? speed += 40 : speed = 200); (result > 6 && num >= 5) && (speed < 200 ? speed += 40 : speed = 200);

                                            if (num < result - 1) {

                                                self.removeOpacity(self.list[i], "active");
                                                i < 9 ? i++:i = 0;
                                                num = i;

                                                self.addOpacity(self.list[i], "active");
                                                move();
                                            } else {

                                                dialogs('<div class="zj"><div class="con"><div class="jp after">' + data.data.awards + '</div><div class="title">请填写有效联系方式<br>奖品将于活动结束后7个工作日内发放。</div><div class="context after"><li class="after"><p class="info">姓名：</p><p class="p2"><input name="linkman" id="yname"  value="" placeholder="请输入您的姓名"></p></li><li class="after"><p class="info">电话：</p><p class="p2"><input name="phone" id="yphone" value="" placeholder="请输入您的电话"></p></li><li class="after"><p class="info">地址：</p><p class="p2"><input name="address" id="yaddress"  value="" placeholder="请输入您的地址"></p></li><li class="after"><input id="an2" class="an2" value="确认提交" type="submit"></li></div></div></div>', false,
                                                function() {
                                                    var phoneRegx = /^1\d{10}$/;
                                                    var $zj = $(".zj");
                                                    var $tel = $("#yphone");
                                                    var $yaddress = $("#yaddress");
                                                    var $yname = $("#yname");
                                                    var $an2 = $(".an2");
                                                    var $info = $zj.find(".info");
                                                    var isSubmit = false;
                                                    $tel.on('blur',
                                                    function() {
                                                        var $this = $(this);
                                                        var _phone = $.trim($this.val());
                                                        if (!phoneRegx.test(_phone)) {
                                                            $info.eq(1).addClass("red");
                                                            $this.focus();
                                                        } else {
                                                            $info.eq(1).removeClass("red");
                                                        }
                                                    });
                                                    $yaddress.on('blur',
                                                    function() {
                                                        var $this = $(this);
                                                        var _yaddress = $.trim($this.val());
                                                        if (!_yaddress) {
                                                            $info.eq(2).addClass("red");
                                                            $this.focus();
                                                        } else {
                                                            $info.eq(2).removeClass("red");
                                                        }
                                                    });
                                                    $yname.on('blur',
                                                    function() {
                                                        var $this = $(this);
                                                        var _yname = $.trim($this.val());
                                                        if (!_yname) {
                                                            $info.eq(0).addClass("red");
                                                            $this.focus();
                                                        } else {
                                                            $info.eq(0).removeClass("red");
                                                        }
                                                    });

                                                    $zj.on('click', '.an2',
                                                    function() {
                                                        if (!$.trim($yname.val())) {
                                                            $info.eq(0).addClass("red");
                                                            $yname.focus();
                                                            return false;
                                                        } else {
                                                            $info.eq(0).removeClass("red");
                                                        }
                                                        if (!phoneRegx.test($.trim($tel.val()))) {
                                                            $info.eq(1).addClass("red");
                                                            $tel.focus();
                                                            return false;
                                                        } else {
                                                            $info.eq(1).removeClass("red");
                                                        }
                                                        if (!$.trim($yaddress.val())) {
                                                            $info.eq(2).addClass("red");
                                                            $yaddress.focus();
                                                            return false;
                                                        } else {
                                                            $info.eq(2).removeClass("red");
                                                        }
                                                        var datajsons = {
                                                            orderId: $choujdh,
                                                            linkman: $yname.val(),
                                                            phone: $tel.val(),
                                                            address: $yaddress.val()
                                                        };

                                                        $.ajax({
                                                            url: '//api.csc86.com/newlottery/writeContact',
                                                            data: datajsons,
                                                            type: 'post',
                                                            dataType: 'jsonp',
                                                            beforeSend: function() {

},
                                                            success: function(data) {
                                                                if (data.status === true) {
                                                                    var $zj = $(".zj");
                                                                    var $tel = $("#yphone");
                                                                    var $yaddress = $("#yaddress");
                                                                    var $yname = $("#yname");
                                                                    $.dialog.list['chouj'].close();
                                                                    dialogs('<div class="dhno"><p class="p2">信息提交成功！</p></div>');

                                                                    return false;
                                                                }
                                                                //系统异常时
                                                                else {
                                                                    $.dialog.list['chouj'].close();
                                                                    dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">提交失败，请刷新页面后重试！</p></div>');

                                                                    return false;
                                                                }

                                                            },
                                                            //请求异常时
                                                            error: function() {
                                                                $.dialog.list['chouj'].close();
                                                                dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">系统错误，请刷新页面后重试！</p></div>');
                                                                return false;
                                                            }
                                                        });

                                                        if (isSubmit === true) {
                                                            return false;
                                                        }
                                                        isSubmit = true;

                                                    });

                                                });

                                            }
                                        }
                                    },
                                    speed)
                                })();

                            }

                        },
                        //请求异常时
                        error: function() {

                            dialogs('<div class="dhno yc">系统异常，请刷新后重试！</p></div>');

                        }
                    });
                }
            });
        }
    }

    window.Game = Game;
    var lottery = new Game({
        btn: document.getElementById("cjbtn"),
        gameList: document.getElementById("cjlist"),
        minCycle: 4
    });
})(jQuery, window, document);

});


