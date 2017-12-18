define(function(require, exports, module){
    require('dropload');
    var hostmap = seajs.hostmap;
    var memberId = require('./url_express')(window.location.href).params.memberid;
    var keyWord = require('./url_express')(window.location.href).params.keyWord;
    //以上为浏览器url里参数值获取;
    var isAjaxGoing = false;
    var urlParams = {
        memberid: decodeURI(memberId),
        keyword: decodeURI(keyWord),
        page: 0
    };
   $(function(){
       $('.title').html(decodeURI(keyWord));
        var index = {
                dialog: function(ele, con, time){  //弹出框效果
                    $(ele).html(con).show();
                    setTimeout(function(){
                        $(ele).html(con).hide();
                    }, time)
                },
                search_goods: function(){
                    var keyword = $('.index_ser_goo').val();
                    var reg = /^\s*$/g; //如果是空，或者""
                    if(!reg.test(keyword) && keyword != ''){
                        window.location.href = '//res.csc86.com/v3/shopping_center/market/html/search_instore_goods.html?keyWord=' + keyword + '&memberid=' + decodeURI(memberId);
                    }else{
                        index.dialog("#msg-content", "请输入商品搜索关键字...", 2000);
                    }
                },
                searchAction: function(){  //搜索框js效果
                    $('.index_ser_goo').on('blur', function(){
                        index.search_goods();
                    });
                    $('.search_action').on('click', function(){
                        index.search_goods();
                    });
                },
                goodsListAjax: function(){  // 店内搜索结果展示
                    var dropload = $('.goods_container').dropload({
                        scrollArea: window,
                        domUp: {
                            domClass: 'dropload-up',
                            domRefresh: '<div class="dropload-refresh sh_font_sz24 sh_te_align_c ">↓下拉刷新</div>',
                            domUpdate: '<div class="dropload-update sh_font_sz24 sh_te_align_c">↑释放更新</div>',
                            domLoad: '<div class="dropload-load sh_font_sz24 sh_te_align_c"><span class="loading"></span>加载中<em class="loading_p">.</em></div>'
                        },
                        domDown: {
                            domClass: 'dropload-down',
                            domRefresh: '<div class="dropload-refresh sh_font_sz24 sh_te_align_c">↑上拉加载更多</div>',
                            domLoad: '<div class="dropload-load sh_font_sz24 sh_te_align_c"><span class="loading"></span>加载中<em class="loading_p">.</em></div>',
                            domNoData: '<div class="dropload-noData sh_font_sz24 sh_te_align_c">暂无数据</div>'
                        },
                        loadUpFn: function (me) {
                            if (isAjaxGoing) return;
                            refreshGoodsList();
                        },
                        loadDownFn: function (me) {
                            if(isAjaxGoing) return;
                            refreshGoodsList();
                        }
                    });
                    function refreshGoodsList(){
                        urlParams.page++;
                        // console.log(urlParams.page); 接口当前 page
                        $.ajax({
                            url: "//"+ hostmap.test + "/shop/loadProductsByKeyword?",
                            type: 'get',
                            data: urlParams,
                            dataType: 'jsonp',
                            success: function(data){
                                if(data.status == 100){
                                    var goodsList = data.data.obj.list;
                                    var totalPage = data.data.obj.totalPage;
                                    console.log(goodsList);
                                    if(goodsList[0]){
                                        document.title = goodsList[0].enterprise + '-' + decodeURI(keyWord);
                                    }else{
                                        decodeURI(keyWord);
                                    }
                                    var result = '';
                                    if (totalPage >= 1) {
                                        for (var i = 0; i < goodsList.length; i++) {
                                            result +=
                                                "<div class='sh_clear  sh_pd_top30  sh_pd_bottom30 sh_bor_top_1 sh_bg_color_1'>" +
                                                    "<div class='sh_width_92 sh_margin_a  sh_clear '>" +
                                                        "<div class='sh_width_4 sh_float_l sh_lingheight_100  sh_font_sz0 '>" +
                                                            "<a href='//" + hostmap.test + "/search/product_detail.ftl?productId=" + goodsList[i].id + "'  data-href='" + goodsList[i].id + "'>" +
                                                                "<img src='//img.csc86.com/" + goodsList[i].pic1 + "' class='index_ser_list' alt=''/>" +
                                                            "</a>" +
                                                        "</div>" +
                                                        "<div class='sh_width_8 sh_float_l sh_wor_space  sh_positon_r sh_font_sz0'>" +
                                                            "<a href='//" + hostmap.test + "/search/product_detail.ftl?productId=" + goodsList[i].id + "'  data-href='" + goodsList[i].id + "'>" +
                                                                "<span class='sh_di_block sh_font_sz32 sh_lingheight_1_5 sh_pd_bottom10 sh_font_color5 li-ht42'>" + goodsList[i].title + "</span>" +
                                                            "</a>" +
                                                            "<span class='sh_di_block sh_font_sz28 sh_lingheight_100 sh_pd_bottom10 sh_pd_top10'>" +
                                                                "<em class='sh_font_color2 '>￥</em>" + "<em class='sh_font_color2'>" + goodsList[i].price + "</em>" + "<em class='sh_font_color2'>起</em>" +
                                                            "</span>" +
                                                            "<div class='sh_font_sz24 sh_font_color7 sh_lingheight_100'>" + goodsList[i].enterprise + "</div>" +
                                                        "</div>" +
                                                    "</div>" +
                                                "</div>";
                                        }

                                        if(urlParams.page >totalPage){
                                            isAjaxGoing = true;
                                            result = '';
                                            dropload.resetload();
                                        }
                                        $('.goods_list').append(result);
                                    }else{
                                        $('.goods_container').html("<img src='//res.csc86.com/v3/shopping_center/market/demo/index_serch_zero.png' alt='' class='sh_img_max'/>");
                                    }
                                    // 每次数据加载完，必须重置
                                    if(totalPage <= 0 || urlParams.page >= totalPage){
                                        // 锁定
                                        dropload.lock();
                                        dropload.noData();
                                    }else {
                                        dropload.unlock();
                                        dropload.noData(false);
                                    }
                                    dropload.resetload();
                                }else if(data.status == 101){
                                    window.location.href = 'http://m.develop.csc86.com/templates/500.ftl';
                                }else{
                                    window.location.href= 'http://m.develop.csc86.com/templates/404.ftl';
                                }
                            },
                            error: function(){
                                dropload.resetload(); //即使请求出错，dropload也要重置
                                window.location.href = 'http://m.develop.csc86.com/templates/500.ftl';
                            }
                        });
                    }
                },
                init: function(){
                    index.searchAction();
                    index.goodsListAjax();
                }
        };
        index.init();
     });
});