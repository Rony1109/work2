/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({
    alias: {
        'login':'c2/ucenter/js/login.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'dialog':'m/dialog/js/init.js'
    }
});

define(function(require, exports, module) {
    var login=require('login');
    var dialog=require('dialog');
    var topic={
        //登录后修改顶部导航为登录后的相关信息
        hasLoginTop:function(m){
            var $topNav=$('.top_nav'),
                $jGuest=$topNav.find('.J_guest'),
                $jMember=$topNav.find('.J_member'),
                $hyzxsp=$topNav.find('.hyzxsp'),
                $hyzxMenu=$hyzxsp.find('.dorp_menu'),
                ucUrl='//i.csc86.com',
                sallerHtml='<div class="right after">'
                    +'<p class="title">卖家中心</p>'
                    +'<ul>'
                    +'<li><a href="https://i.csc86.com/seller/sellerOrders" target="_blank">已卖出货物</a></li>'
                    +'<li><a href="http://member.csc86.com/product/sell.html" target="_blank">发布产品</a></li>'
                    +'<li><a href="http://member.csc86.com/product/sell/list.html" target="_blank">管理产品</a></li>'
                    +'<li><a href="http://member.csc86.com/shop/shopinfo.html" target="_blank">我的旺铺</a></li>'
                    +'</ul>'
                    +'</div>';
            if(!$hyzxMenu.find('.right')[0]&&m.data.userkinds=='GY'){
                console.log(1);
                ucUrl='//i.csc86.com/#mem_Seller';
                $hyzxsp.find('.navhover').attr('href',ucUrl);
                $hyzxMenu.append(sallerHtml);
                $hyzxMenu.width(160);
                $hyzxMenu.find('.right').show();
            }
            $jGuest.addClass('g-dn');
        },
        dialogs:function(circleId){
            dialog({
                id: circleId,
                title: '',
                fixed: true,
                lock: true,
                background: "#000",
                opacity: "0.3",
                content: $("#" + circleId).html(),
                init:function() {
                    var that= this;
                    $('#cjzb_btn').on('click',function(){
                        var company_name=$('#company_name').val(),
                            name=$('#name').val(),
                            phone_number=$('#phone_number').val();
                        if(company_name==""&&name==""&&phone_number==""){
                        }else{
                            var datas=$("#zbtable").serializeArray();

                            $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
                                if(data.status==true){
                                    $('#company_name').val("");
                                    $('#name').val("");
                                    $('#phone_number').val("");
                                    that.close();
                                    dialog.alert('提交成功');
                                }else{
                                    alert('提交失败!')
                                }
                            }, 'jsonp');
                        }
                    })
                }
            });
        },
        init:function(){
            $('#cjzbtop_tab').find('li').on('click',function(){
                var len=$('#cjzbtop_tab').find('li').length,
                    This=$(this);
                var idx= This.attr('id').split('_');

                for(var i=0;i<len;i++){
                    $('#cjzbtop_tab').find('li').eq(i).css('background-image','url(./image/1-5.png)');
                    $('#lib_icon'+(i+1)).attr('src','./image/2-'+(i+1)+'.png');
                    $('#cjab_centab').find('.cjab_table').eq(i).hide();
                }
                This.find('img').attr('src',"./image/3-"+(parseInt(idx[1]))+".png");
                This.css('background-image','url(./image/1-51.png)');
                $('#cjab_centab').find('.cjab_table').eq(parseInt(idx[1])-1).show();
            });

            $('#cjzbtop_lfbtn').on('click',function(){
                var This=$(this);
                var slideUl= This.parent().siblings('ul');
                slideUl.children().stop(true,true);
                var len= This.parent().siblings('ul').find('li').length;
                if(len>6){
                    slideUl.children().first().animate({marginLeft: "-" + 182 + "px"}, 500, function () {
                        $(this).appendTo(slideUl).css("margin-left", -28);
                        slideUl.find('li:first').css("margin-left", 6);
                    });
                }
            });

            $('#cjzbtop_rtbtn').on('click',function(){
                var This=$(this);
                var slideUl= This.parent().siblings('ul');
                slideUl.children().stop(true,true);
                var len= This.parent().siblings('ul').find('li').length; //li
                if(len>6) {
                    slideUl.find('li').css("margin-left", -28);
                    slideUl.children().last().css("margin-left", -182 + "px").prependTo(slideUl).animate({marginLeft: 6}, 500);
                }
            });

            $('#cjzbbmt_lfbtn').on('click',function() {
                var slideUl= $('.cjzbzslb_ul');
                slideUl.children().stop(true,true);
                slideUl.children().first().animate({marginLeft: "-" + 1079 + "px"}, 500, function () {
                    $(this).appendTo(slideUl).css("margin-left", 0)
                });
            });

            $('#cjzbbmt_rtbtn').on('click',function() {
                var slideUl= $('.cjzbzslb_ul');
                slideUl.children().stop(true,true);
                slideUl.children().last().css("margin-left", -1079 + "px").prependTo(slideUl).animate({marginLeft: 0}, 500);
            })

            $('#jrzb_btn').on('click',function() {
                topic.dialogs('cjzb_tc');
            });

            $('.add_zb').on('click',function() {
                topic.dialogs('cjzb_tc');
            });

            $('.top_bar1').find('li').hover(function(){
               $(this).find('.bar_icon').css('background-color','#4b6087');
                var len=$('.top_bar1').find('li').length;
                var idx=$(this).index();
                for(var i=1;i<len+1;i++)
                {
                    if(idx==i-1)
                    {
                        $(this).find('.bar_icon').find('img').attr('src','./image/4-'+i+'1.png');
                    }
                }
               $(this).find('.em1,.em2').css('color','#f8e606');
               $(this).find('.bar_qq').show();

            },function(){
                $(this).find('.bar_icon').css('background-color','#243040');
                $(this).find('.em1').css('color','#fff');
                $(this).find('.em2').css('color','#a4a8ac');
                $(this).find('.bar_qq').hide();
                var len=$('.top_bar1').find('li').length;
                var idx=$(this).index();
                for(var i=1;i<len+1;i++)
                {
                    if(idx==i-1)
                    {
                        $(this).find('.bar_icon').find('img').attr('src','./image/4-'+i+'.png');
                    }
                }
            });
            //顶部固定导航
            (function(){
                var fixnav = $(".top_bar1");
                var topnavHeight = $(".top_bar1").height();
                $(window).scroll(function(){
                    var	scrHeight = $(this).scrollTop();
                    (scrHeight>=topnavHeight+530)?fixnav.addClass('fixnav'):fixnav.removeClass('fixnav');
                });
            })();



        }
    }
    topic.init();
});
