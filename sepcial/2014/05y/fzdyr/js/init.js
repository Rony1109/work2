/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

    // 别名配置
    alias: {

        'top': 'm/top-bar/js/init.js'
    },
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('./textScroll');


    //抽奖相关
    var _Dialog = function(dom) {
        var $dialog = $("#dialog");
        var LF = $(window).width() / 2 - $dialog.width() / 2,
            TP = $(window).height() / 2 - $dialog.height() / 2 + $(window).scrollTop() - 180,
            $shade = $("<div></div>"),
            WH = $(window).width(),
            HT = $("body").height();
        $shade.addClass("shade").css({
            height: HT + "px",
            width: WH + "px"
        });
        $("body").append($shade);
        $("#dialog").css({
            left: LF + "px",
            top: TP + "px"
        }).show();
        dom.show();
    };
    var AllSubmit = function() {
        if (arguments.length > 0) {
            return arguments[0]
        } else {
            $("#dialog").hide();
            $(".shade").remove();
        }
    };
    $("span.fix-btn").bind("click", AllSubmit(function() {
        AllSubmit();
        if (window.csc) {
            seajs.use(csc.url("res", "/f=js/m/sign"), function() {
                csc.checkSign("location.reload()");
            });
        } else {
            seajs.use('http://res.csc86.com/js/', function() {
                seajs.use(csc.url("res", "/f=js/m/sign"), function() {
                    csc.checkSign("location.reload()");
                });
            });
        }
    }));
    $("span.gameover").bind("click", function() {
        AllSubmit();
    });
    $("#myform").submit(function(e) {
        console.log(e)
        submitOK = "true"
        if ($("#name").val() == "") {
            alert("姓名不能为空！");
            submitOK = "false"
        }
        if ($("#tel").val() == "") {
            alert("电话号码不能为空！");
            submitOK = "false"
        }
        if ($("#adress").val() == "") {
            alert("地址不能为空！");
            submitOK = "false"
        }
        if ($("#zipCode").val() == "") {
            alert("邮编不能为空！");
            submitOK = "false"
        }
        if (submitOK == "false") {
            return false;
        }
    });
    //奖项
    var para = "";
    var jqpa = {
            '20': ['一等奖：ipad mini 1台', 30],
            '21': ['二等奖：焖烧罐 1个', 160],
            '22': ['三等奖：移动电源 1个', 290],
            '23': ['四等奖：16GU盘 1个', 120],
            '24': ['五等奖：耳机 1个', 200],
            '25': ['六等奖：抱枕 1个', 70]
        }
        //中奖名单

    function _getDom(data) {
        if (data['status']) {
            var $html = "";
            $tr = "";
            $.each(data['data'], function(i, v) {
                $tr += "<tr>" +
                    "<td><div class='g-e' title='" + v['winners'] + "'>" + v['winners'] + "</div></td>" +
                    "<td><div class='g-e' title='" + jqpa[v['prizeid']][0] + "'>" + jqpa[v['prizeid']][0] + "</div></td>" +
                    "<td>" + (Number(new Date(Number(v['wintime'])).getMonth()) + 1) + "月" + new Date(Number(v['wintime'])).getDate() + "日</td>" +
                    "</tr>";
                $html += $tr;
            });
            $("#win-name").append($tr);
            $("#win-name").TextSCroll({
                AnimateDom: "tr:first",
                Direction: {
                    marginTop: "-22px"
                },
                Time: 2000,
                OnlineName: txtimer,
                Visible: 3
            });

        }
    }

    $.get('http://api.csc86.com/choujiang/getwinner.html?vest=true', {
        channelid: 3,
        eventid: 9
    }, function(data) {
        _getDom(data);
    }, 'jsonp');


    $(".cj-btn").click(function() {
        $.get('http://api.csc86.com/choujiang/lottery.html?', {
            channelid: 3,
            eventid: 9
        }, function(data) {
            switch (data['No']) {
                case -1:
                    topic(0, data)
                    break;
                case -2: //活动已禁用
                    topic(1, data)
                    break;
                case -3: //活动已过期
                    topic(2, data)
                    break;
                case -4: //活动还没开始
                    topic(1, data)
                    break;
                case -5: //非法操作，我已经记录您的信息并通知警察叔叔了！哭吧你……
                    topic(3, data)
                    break;
                case -7: //已抽过
                    topic(5, data)
                    break;
                case -8: //已抽过
                    topic(5, data)
                    break;
                case 1:
                    rotateF(jqpa[data['data']['prizeid']][1], 6, data)
                    break;
                default:
                    var angle = [250, 330],
                        angle = angle[Math.floor(Math.random() * angle.length)];
                    rotateF(jqpa[data['data']['prizeid']][1], 4)
            }
        }, 'jsonp')
    });

    function rotateF(angle, i, data) {
        $("#rotaed").rotate({
            angle: 0,
            duration: 5000,
            animateTo: 1440 + angle,
            callback: function() {
                topic(i, data)
            }
        });
    }

    function topic(i, data) {
        _Dialog($(".dialog-tx:eq(" + i + ")"));
        if (data && i == 6) {
            console.log(jqpa[data['data']['prizeid']][0])
            $(".dialog-tx:eq(" + i + ")").find("#award").val(jqpa[data['data']['prizeid']][0]);
            $(".dialog-tx:eq(" + i + ")").find("#account").val(data['data']['winners']);
        }
    }
//头部登录部分
    require('top');
//tab
    $(".tab-nav").delegate("li", "mouseover", function() {
        var index = $(".tab-nav li").index(this);
        $(this).addClass("cur").siblings("li").removeClass("cur")
        $(".tab-box").eq(index).removeClass("g-dn").siblings(".tab-box").addClass("g-dn")
    })

    /*
     *时间轴
     */
    var MyDate = new Date(),
        MyDate1 = new Date(),
        MyDate2 = new Date(),
        MyDate3 = new Date(),
        MyDate4 = new Date(),
        MyDate5 = new Date(),
        MyDate6 = new Date();
    MyDate.setFullYear(2014, 4, 14);
    MyDate1.setFullYear(2014, 6, 7);
    MyDate2.setFullYear(2014, 6, 14);
    MyDate3.setFullYear(2014, 6, 19);
    MyDate4.setFullYear(2014, 6, 25);
    MyDate5.setFullYear(2014, 7, 7);
    MyDate6.setFullYear(2014, 7, 15);

    function setDom(i) {
        $(".over").removeClass("g-dn");
        $(".wait:lt(" + i + ")").addClass("g-dn");
        $(".start:lt(" + i + ")").removeClass("g-dn");
        $(".start:eq(0)").addClass("g-dn");
    }
    var Width = [208, 345, 478, 612, 742, 882, 955];
    var today = new Date();
    if (today >= MyDate && today < MyDate1) {
        $(".ontime").css("width", Width[0] + "px");
        $(".wait:eq(0)").addClass("g-dn");
        $(".start:eq(0)").removeClass("g-dn");
    } else if (today >= MyDate1 && today < MyDate2) {
        $(".ontime").css("width", Width[1] + "px");

        setDom(2);
    } else if (today >= MyDate2 && today < MyDate3) {
        $(".ontime").css("width", Width[2] + "px");
        setDom(2);
    } else if (today >= MyDate3 && today < MyDate4) {
        $(".ontime").css("width", Width[3] + "px");
        setDom(3)
    } else if (today >= MyDate4 && today < MyDate5) {
        $(".ontime").css("width", Width[4] + "px");
        setDom(4);
    } else if (today >= MyDate5 && today < MyDate6) {
        $(".ontime").css("width", Width[5] + "px");
        setDom(4);
    } else if (today >= MyDate6) {
        $(".ontime").css("width", Width[6] + "px");
        setDom(5);
    }
    //图片滚动
    require('./scroll')();
    var tm;
    $(".img-scroll").CscScroll({
        Left: 268,
        Right: 134,
        Time: 2000,
        linedUp: tm,
        Auto: true,
        Visual: 5
    });
    var tms;
    $(".img-scroll-b").CscScroll({
        Left: 460,
        Right: 230,
        Time: 2000,
        linedUp: tms,
        Auto: true,
        Visual: 4
    });
    //文字滚动
    var txTime, txtimer;
    $(".text-scroll ul").TextSCroll({
        AnimateDom: "li:first",
        Direction: {
            marginTop: "-22px"
        },
        Time: 2000,
        OnlineName: txTime,
        Visible: 7
    });



    //点赞
    function _get(o, id) {
        $.get(csc.url("quan", "/likeB.html?topicId=" + id), function(data) {
            if ("sns_likeTopic_000" == data.code) {
                o.text(data.desc);
                $.get("http://quan.csc86.com/interface/hldlikeCount", {
                    "topicId": id
                }, function(data) {
                    mydata.text(data.code);
                    
                }, "jsonp");
            } else if ("login_fail" == data.code) {
                seajs.use(csc.url("res", "/f=js/m/sign"), function() {
                    csc.checkSign("location.reload()");
                });
            } else if ("sns_likeTopic_001" == data.code) {
                csc.useDialog(function() {
                    csc.alert("赞过了！");
                });
            } else {
                csc.useDialog(function() {
                    csc.alert(data.desc);
                });
            }
        }, "jsonp");
    }
    $(".z-btn").each(function() {
        var o = $(this),
            id = o.attr("data-id") || "000";
        var mydata = o.siblings(".your-name").find("b");
        $.get("http://quan.csc86.com/interface/hldlikeCount", {
            "topicId": id
        }, function(data) {
            mydata.text(data.code);
        }, "jsonp");
        o.on("click", function() {
            if (window.csc) {
                _get(o, id);
            } else {
                seajs.use('http://res.csc86.com/js/', function() {
                    _get(o, id);
                })
            }
            return false;
        })
    });

    //评论
    seajs.use('http://res.csc86.com/v2/m/comment/js/init', function(comment) {
        comment.init('7cfcc2c6-9a75-4f3b-b63e-d024c666f8a6', $('#JComment'));
    });


});