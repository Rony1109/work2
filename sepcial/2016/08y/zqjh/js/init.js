/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'jquery':'l/jquery/1.10.2/jquery',
        'login':'m/newtopnav/js/init',
        'dialog':'m/dialog/js/init'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');
    require('jquery');
    require('http://res.csc86.com/f=js/m/config.js');
    var dialog = require('dialog');
    var isLogin = require('login'),
        hasLogin = isLogin.status, //判断是否登录，ture为登录，false未登录
        memberId = isLogin.data.id, //会员ID
        memberName = isLogin.data.username; //会员名

    var cscs={};
    cscs.dialogs=function(circleId){
        dialog({
            id: circleId,
            title:'',
            fixed: true,
            lock:true,
            background:"#000",
            opacity:"0.3",
            //content:$("#"+circleId).html(),
            init:function(){

            }
        });
    }
    /*
     * 以下为专题js代码
     * ......
     */
    var index = {
        //领取优惠券
        getTicket:function(){
            var getBtn = $(".ticket-list ul").find('li');
            getBtn.find(".getnow").click(function(){
                var url = $(this).attr('data-src');
                if(hasLogin){
                    //领取规则
                    $.get(url,function(data){
                        //console.log(JSON.stringify(data));
                        if(data.status == true){
                            var ID = data.data.Code;
                            switch(ID){
                                case "1":
                                alert("优惠券成功领取至钱包，下单即可使用！");
                                break;

                                case "2":
                                alert("请求出现异常，请刷新页面重新领取！");
                                break;

                                case "3":
                                alert("您今日已经领满5张该券，不要太贪心哦，明天再来领取吧！");
                                break;

                                case "180110102003":
                                alert("优惠券号不能为空，请联系客服参与领券！");
                                break;

                                case "180110105001":
                                alert("不存在此优惠券，请查看优惠券号是否有误！");
                                break;

                                default:
                                alert("不好意思，本期优惠券领取活动已经结束！更多优惠请关注官方活动内容哦！")
                            }
                            
                        }
                    },"jsonp");

                }else{
                    //登陆窗提示
                    alert("请先登录，再领区优惠券哦！");
                    $.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
                        //alert(JSON.stringify(data));
                        if(data.status != true) {
                            seajs.use(csc.url("res", "/js/m/sign"), function() {
                                csc.checkSign("location.reload");
                            });
                        }
                    },"jsonp");
                }
            });
        }
        };
    index.getTicket();


    /*$(window).load(function(){
        $.getJSON("http://api.csc86.com/coupons?callback=?&couponId=9999",function(data){
            alert(JSON.stringify(data));
        });
    });*/
});
