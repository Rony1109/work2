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

    require("top");

    //点赞
    function _get(o, id) {
        $.get(csc.url("quan", "/likeB.html?topicId=" + id), function(data) {
            if ("sns_likeTopic_000" == data.code) {
                o.find("span").text(1245 + parseInt(data.desc));
                $.get("http://quan.csc86.com/interface/hldlikeCount", {
                    "topicId": id
                }, function(data) {
                    o.find("span").text(1245 + parseInt(data.code));
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
    $(".zan").each(function() {
        var o = $(this),
            id = o.attr("data-id") || "000";
        var mydata = o.find("span");
        $.get("http://quan.csc86.com/interface/hldlikeCount", {
            "topicId": id
        }, function(data) {
            mydata.text(1245 + parseInt(data.code));
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
        comment.init('2768616c-a280-4de2-a091-8ca67d82ed81', $('#JComment'),{pn:2});
    });

    if (window.csc === undefined) {

        seajs.use('http://res.csc86.com/js/', function() {

            //加入圈子
            csc.addCircleCircleId = "";
            csc.addCircleObj = null;
            csc.addCircleCommC = function() {
                    $.get("http://quan.csc86.com/doCircle?t=authC&circleId=" + csc.addCircleCircleId, function(data) {
                        var $val = data.code;
                        if ($val == "NO_POWER") { //无权加入
                            csc.alert("你的身份不满足加入该圈子！")
                        } else if ($val == "join_000") { //已加入
                            csc.alert("已加入");
                        } else if ($val == "join_001") { //己审请
                            csc.alert("您已经申请加入该圈子，请等待审核");
                        } else if ($val == "LOGIN_FAIL") { //未登陆
                            seajs.use(csc.url("res","/f=js/m/sign"),function(){
                                csc.checkSign("location.reload()");
                            });
                        } else if ("no_auth" == $val) {
                            csc.alert("您当前没有加入该圈子的身份或当前圈子不存在！");
                        } else { //已登陆,未加入,未审请,有权审请
                            csc.useDialog(function() {
                                art.dialog({
                                    title: '申请加入商圈',
                                    content: data.code,
                                    fixed: true,
                                    okVal: '确定',
                                    background: "#000",
                                    opacity: "0.3",
                                    ok: function() {
                                        //需要判断加入类型不能为空
                                        $.get("http://quan.csc86.com/doCircle?t=addC&circleId=" + csc.addCircleCircleId + "&" + $("#addCircleForm").serialize(), function(data) {
                                            var val = data.code;
                                            if ("join_001" == val) {
                                                csc.success("申请加入成功！");
                                            } else if ("join_000" == val) {
                                                csc.success("您已成功加入！");
                                            } else if ("sns_fail_id" == val) {
                                                csc.alert("ID无效！");
                                            } else {
                                                csc.alert("申请加入失败！,请重试");
                                            }
                                        }, "jsonp");

                                    },
                                    cancel: true,
                                    lock: true
                                });
                            })
                        }
                    }, 'jsonp')
                }
                //加入圈子按钮
            csc.addCircleCncms = function(circleId, o) {
                csc.addCircleCircleId = circleId;
                csc.addCircleObj = $(o);
                csc.useDialog(function() {
                    csc.addCircleCommC();
                })
            };
        })
    }


    if ($(".repl-hf ul .hl-l span").length > 0) {
        $.get("http://quan.csc86.com/circle/api/info?id=b262ce3a-3b77-4f6c-b786-0ec5f05aa515", function(data) {
            $(".repl-hf ul .hl-l span:eq(0) i:eq(0)").html(data.data.memberSum);
            $(".repl-hf ul .hl-l span:eq(1) i:eq(0)").html(data.data.topicCount);
        }, "jsonp");
    }

    $("a.ad").bind("click", function() {
        var _this = $(this).get(0);
        csc.addCircleCncms('b262ce3a-3b77-4f6c-b786-0ec5f05aa515', _this);
    });

    $("ul.l_tab").delegate('li', 'click', function(event) {
        var
            index = $("ul.l_tab li").index(this),
            _this = $(this);
        _this.addClass("cur").siblings("li").removeClass("cur");
        $(".l_info").eq(index).show().siblings(".l_info").hide();
    });
});
