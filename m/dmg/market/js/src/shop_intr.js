define(function(require, exports, module){
    $(function(){
        var memberid = require('./url_express')(window.location.href).params.memberId;//获取url参数
        var hostmap = seajs.hostmap; //域名配置
        var dialog=require('layer');//弹框插件
        var tips = function(tip) { //提示
            dialog.open({
                content:tip
                ,skin: 'msg'
                ,time:2 //2秒后自动关闭
            });
            return false;
        }
        function _draw_image(url,params){ //渲染页面
            $.get(url,params, function(data) {
                $("#_waiting_load").hide();
                var str="";
                if(data.status=="100"){
                 str+=
                  '<div class="sh_pd_top40 sh_pd_left30 sh_pd_right20 sh_font_sz0 clearfix shop_search_bg sh_pd_bottom40 ">\
                        <div class="sh_width_18 sh_float_l main_logo ">\
                           <img  src="//img.csc86.com'+data.data.obj.imgUrl+'">"';
                str+='</div>\
                        <div class="sh_width_82 sh_float_r sh_clear">\
                            <div class="sh_width_9  sh_margin_l_18">\
                                <div class="sh_font_sz32 sh_font_color8 li-ht42 index_img_alter ">'+data.data.obj.enterprise+'</div>\
                                <div class="sh_font_sz24 sh_font_color8 sh_pd_top40">\
                                    <span class="sh_di_inblock sh_width_6">\
                                        <i><img class="index_skin sh_v_middle" src="//res.csc86.com/v3/shopping_center/market/demo/campany_icon.png"></i>\
                                        <em class="sh_v_middle">企业实名认证</em>\
                                    </span>\
                                    <span class="sh_di_inblock sh_width_40 ">\
                                         <i><img class="index_skin sh_v_middle" src="//res.csc86.com/v3/shopping_center/market/demo/concern.png"></i>\
                                         <span class="sh_v_middle"><em class="total-num">'+data.data.obj.favoriteCount+'</em>人关注</span>\
                                    </span>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';
                    str+= '<div class=" sh_bg_color_1 ">\
                        <div class="sh_bor_bottom_1">\
                            <span class="block sh_width_92 sh_margin_a sh_font_sz28 sh_lingheight_100  sh_font_color22 sh_pd_top15 sh_pd_bottom15">企业概况</span>\
                        </div>\
                        <ul class="sh_width_92 sh_margin_a sh_font_sz24 li-ht42 sh_pd_top15 sh_pd_bottom15">';
                            if(data.data.obj.introduce&&data.data.obj.introduce!=""){
                                str+= '<li><em class="sh_font_color13 ">公司介绍:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.introduce+'</em></span></li>'
                            }
                           if(data.data.obj.registerDate&&data.data.obj.registerDate!=""){
                            str+= '<li><em class="sh_font_color13 ">成立时间:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.registerDate+'</em>年</span></li>'
                           }
                            if(data.data.obj.registerMoney&&data.data.obj.registerMoney!=""){
                                str+= '<li><em class="sh_font_color13 ">注册资金:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.registerMoney+'</em>元</span></li>'
                            }
                            if(data.data.obj.displayTradeList&&data.data.obj.displayTradeList!=""){
                                str+= '<li><em class="sh_font_color13 ">经营范围:</em><span class="sh_font_color5 sh_margin_l_1">';
                                var len=data.data.obj.displayTradeList;
                                 for(var i in len){
                                     str+='<em>'+len[i].name+'、</em>'
                                 }
                                str+='</span></li>'

                            }
                            if(data.data.obj.address&&data.data.obj.address!=""){
                                str+= '<li><em class="sh_font_color13">经营地址:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.address+'</em></span></li>'
                            }
                            if(data.data.obj.person&&data.data.obj.person!=""){
                                str+= '<li><em class="sh_font_color13 ">法定代表人:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.person+'</em></span></li>'
                            }
                         str+= '</ul>\
                        <div class="sh_separate10 sh_bg_color_3"></div>\
                    </div>\
                    <div class=" sh_bg_color_1 ">\
                        <div class="sh_bor_bottom_1">\
                            <span class="block sh_width_92 sh_margin_a sh_font_sz28 sh_lingheight_100  sh_font_color22 sh_pd_top15 sh_pd_bottom15">主营情况</span>\
                        </div>\
                        <ul class="sh_width_92 sh_margin_a sh_font_sz24 li-ht42 sh_pd_top15 sh_pd_bottom15">'
                            if(data.data.obj.sellList&&data.data.obj.sellList!=""){
                                str+= '<li><em class="sh_font_color13 ">主营产品/服务:</em><span class="sh_font_color5 sh_margin_l_1">';
                                var len=data.data.obj.sellList;
                                for(var i in len){
                                    str+='<em>'+len[i]+'、</em>'
                                }
                                str+='</span></li>';
                            }
                            if(data.data.obj.tradeList&&data.data.obj.tradeList!=""){
                                str+= '<li><em class="sh_font_color13 ">主营行业:</em><span class="sh_font_color5 sh_margin_l_1">';
                                var len=data.data.obj.tradeList;
                                for(var i in len){
                                    str+='<em>'+len[i].name+'、</em>'
                                }
                                str+='</span></li>'

                            }
                            if(data.data.obj.model&&data.data.obj.model!=""){
                                str+= '<li><em class="sh_font_color13">经营模式:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.model+'</em></span></li>'
                            }
                            if(data.data.obj.operateAddressList&&data.data.obj.operateAddressList!=""){
                                str+= '<li><em class="sh_font_color13 ">主要经营地:</em><span class="sh_font_color5 sh_margin_l_1">';
                                var len=data.data.obj.operateAddressList;
                                for(var i in len){
                                    str+='<em>'+len[i].address+'、</em>'
                                }
                                str+='</span></li>'

                            }
                str+= '</ul>\
                        <div class="sh_separate10 sh_bg_color_3"></div>\
                    </div>\
                    <div class=" sh_bg_color_1 ">\
                        <div class="sh_bor_bottom_1">\
                            <span class="block sh_width_92 sh_margin_a sh_font_sz28 sh_lingheight_100  sh_font_color22 sh_pd_top15 sh_pd_bottom15">企业规模</span>\
                        </div>\
                        <ul class="sh_width_92 sh_margin_a sh_font_sz24 li-ht42 sh_pd_top15 sh_pd_bottom15">';
                            if(data.data.obj.staff&&data.data.obj.staff!=""){
                                str+= '<li><em class="sh_font_color13 ">员工人数:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.staff+'</em>年</span></li>'
                            }
                        if(data.data.obj.trunover&&data.data.obj.trunover!=""){
                            str+= '<li><em class="sh_font_color13 ">年营业额:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.trunover+'</em></span></li>'
                        }
                        if(data.data.obj.registerMoney&&data.data.obj.registerMoney!=""){
                            str+= '<li><em class="sh_font_color13">注册资本:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.registerMoney+'</em></span></li>'
                        }
                        if(data.data.obj.enterpriseType&&data.data.obj.enterpriseType!=""){
                            str+= '<li><em class="sh_font_color13">企业类型:</em><span class="sh_font_color5 sh_margin_l_1"><em>'+data.data.obj.enterpriseType+'</em></span></li>'
                        }
                    str+= '</ul>\
                        <div class="sh_separate10 sh_bg_color_3"></div>\
                    </div>';
                  $(".article-intr").html(str)
                }else{
                    tips("<label class='sh_font_sz32'>"+data.msg+"</label>")
                }
            },"jsonp")
        }
        _draw_image("//" +  hostmap.test + "/shop/loadShopMainInfo",{memberid:decodeURI(memberid)})
    })

});

