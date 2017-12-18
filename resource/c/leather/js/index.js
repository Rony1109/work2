/**
 * 皮革首页demo
 *
 */

define(function(require, exports, module) {

    //检查是否登录
    $.get("//api.csc86.com/notify/notify",function(data){
        if(data.status==true){
            $(".log-msg").html('<ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>'+data.data.purchase+'</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>'+data.data.bank+'</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>'+data.data.message+'</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul>');
        }
    },"jsonp");

    //导购信息
    $(".dgxx ul.txt li").each(function(i){
        var $t = $(this);
        $t.mousemove(function(){
            $t.addClass("cur").siblings().removeClass("cur");
            $(".dgxx ul.pic li").eq(i).addClass("cur").siblings().removeClass("cur");
        });
    });
	
	//爆款产业带
	$('.i-wrap').hover(function(){
		
		$(this).find('.mask').show();
		$(this).find('.info').show();
	},function(){
		$(this).find('.mask').hide();
		$(this).find('.info').hide();
	})
	

    //友情链接
    function linksMore(){
        var $more = $('<a href="//www.csc86.com/hwlink/" class="g-fr gd" target="_blank">更多</a>'),
            $lbox = $(".frie-links div.g-fl"),
            $btn = $(".frie-links .more");
            $btn.html("&nbsp;").after($more);
        if(parseInt($lbox.height())>30){
            $btn.show();
            $btn.prev("div.g-fl").addClass("hide");
            $btn.bind("click",function(){
                var $t = $(this);
                if($t.hasClass("zk")){
                    $t.removeClass("zk");
                    $t.prev("div.g-fl").addClass("hide");
                }else{
                    $t.addClass("zk");
                    $t.prev("div.g-fl").removeClass("hide");
                }
            });
        }
    }
    linksMore();

    //分类
    var pg_hover = require("hover");
    pg_hover(".qyft ul li","cur");
    pg_hover(".cate-dl dd","d-cur",function(ele){
        var o = $(ele);
        var l = o.find(".def"),
            r = o.find(".popcate"),
            navbox = $(".cate-dl");
        var l_offs = l.offset(),
            l_oH = l.outerHeight(),
            r_oH = r.outerHeight(),
            cH = document.documentElement.clientHeight,
            bs = $("body").scrollTop(),
            csstop=0;
        if(l_offs.top + l_oH > bs + cH){
            csstop = l_oH - r_oH;
        }else if(l_offs.top + r_oH > bs + cH){
            csstop = bs + cH - l_offs.top - r_oH;
        }
        csstop = csstop + l_offs.top > navbox.offset().top ? csstop : navbox.offset().top - l_offs.top;
        r.css("top",csstop - 1 + "px");
    });

    //供应求购
    var tab = require("tab");
    tab("#tab1 .tab_t a",["#tab1 .more a","#tab1 .tab_d1"],"mouseover","s",0,function(i){
        $("#tab1 .tab_d1 .text_type1").trigger("gd_stop").eq(i).trigger("gd_play");
    });
});