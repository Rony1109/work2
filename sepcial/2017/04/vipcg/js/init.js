/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({
    alias: {
        'top': 'c2/newcgsc/js/newtop.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'login':'c2/ucenter/js/login.js',
        'dialog':'m/dialog/js/init.js'
    }
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');
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

                }
            });
        },
        init:function(){
            /*弹窗登录demo*/
                $.get("//login.csc86.com/islogin/ajax",function (data){
                    if(data.status){
                        //当页面一进来就已经登录时 执行的代码()
                        topic.hasLoginTop(data.data);
                    }else{
                    }
                },"jsonp");

            $("#vip1_from").find(".cen2_btn").on("click",function(){
                var $this = $(this);
                $("#vip1_from").find('.redfont').hide();
                if($("#vip1_name").val()=="")
                {
                    $('#vip1_name').parent().next().show()
                    return;
                }else if($("#vip1_phone_number").val()==""){
                    $('#vip1_phone_number').parent().next().show()
                    return;
                }else if($("#vip1_company_name").val()==""){
                    $('#vip1_company_name').parent().next().show()
                    return;
                }else if($("#vip1_mail").val()==""){
                    $('#vip1_mail').parent().next().show()
                    return;
                }else
                {
                    var datas=$("#vip1_from").serializeArray();
                    $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
                        console.log(data);
                        if(data.status==true){
                            topic.dialogs("cgddlx");
                            $("#vip1_name").val("");
                            $("#vip1_phone_number").val("");
                            $("#vip1_company_name").val("");
                            $("#vip1_mail").val("");
                            $("#vip1_demand").val("");
                        }else{
                            alert('提交失败!')
                        }
                    }, 'jsonp');
                }

            });

            $("#vip2_from").find(".cen4_btn").on("click",function(){
                var $this = $(this);
                $("#vip2_from").find('.redfont').hide();
                if($("#vip2_name").val()=="")
                {
                    $('#vip2_name').parent().next().show()
                    return;
                }else if($("#vip2_phone_number").val()==""){
                    $('#vip2_phone_number').parent().next().show()
                    return;
                }else if($("#vip2_company_name").val()==""){
                    $('#vip2_company_name').parent().next().show()
                    return;
                }else if($("#vip2_mail").val()==""){
                    $('#vip2_mail').parent().next().show()
                    return;
                }else
                {
                    var datas=$("#vip2_from").serializeArray();
                    $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
                        console.log(data);
                        if(data.status==true){
                            topic.dialogs("cgddlx");
                            $("#vip2_name").val("");
                            $("#vip2_phone_number").val("");
                            $("#vip2_company_name").val("");
                            $("#vip2_mail").val("");
                            $("#vip2_demand").val("");
                        }else{
                            alert('提交失败!')
                        }
                    }, 'jsonp');
                }

            });

            $('#kcbtn').on('click',function(){
               topic.dialogs("vip_kctc");

            })

            $('#djck').on('click',function(){
                topic.dialogs("vip2_kctc");

            })

            $('.tabls_lfbtn').on('click',function(){
                var This=$(this);
                var slideUl= This.parent().parent().siblings('.cen3_txt2').find('.txt2_lsall');
                slideUl.children().stop(true,true);
                var len= This.parent().parent().siblings('.cen3_txt2').find('.txt2_lsall').find('span').length;
                var txtlen="txt2_centxt"+len;
                if(slideUl.children().last().attr('class')==txtlen)
                {
                }else{
                    slideUl.children().last().css("margin-left",-442+"px").prependTo(slideUl).animate({marginLeft:0},500)
                }

            });

            $('.tabls_rtbtn').on('click',function(){
                var This=$(this);
                var slideUl= This.parent().parent().siblings('.cen3_txt2').find('.txt2_lsall');
                slideUl.children().stop(true,true);
                var len= This.parent().parent().siblings('.cen3_txt2').find('.txt2_lsall').find('span').length -1;
                var txtlen="txt2_centxt"+len;
                if(slideUl.children().last().attr('class')==txtlen)
                {
                }else {
                    slideUl.children().first().animate({marginLeft: "-" + 442 + "px"}, 500, function () {
                        $(this).appendTo(slideUl).css("margin-left", 0)
                    });
                }
                //.animate({marginLeft:"-"+size2+"px"}
                //topic.loop('#cen3_txt2id','#txt_rtbtn','#txt_lfbtn','#cen3_txt2ul');
            });

        }
    }


    topic.init();
});
