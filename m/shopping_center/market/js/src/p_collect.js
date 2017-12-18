define(function(require, exports, module){
        require('dropload');
        var _c= require('./index_ser_goListTest');
        var hostmap=seajs.hostmap;//域名配置
        var isAjaxGoing = false, isIniting = true;
        var urlParams = {
            type:"product",
            page: 1
        };
        var url = _c.debug ? "/market/json/good_list.json" : "//" + hostmap.test + "/shop/myFavorites";
        var product = $("#product");
        var shop = $("#shop");
        var prodList = $("#pro_list");
        var dropload = $('.pro_list_container').dropload({
            scrollArea : window,
            domUp : {
                domClass   : 'dropload-up',
                domRefresh : '<div class="dropload-refresh sh_font_sz24 sh_te_align_c ">↓下拉刷新</div>',
                domUpdate  : '<div class="dropload-update sh_font_sz24 sh_te_align_c">↑释放更新</div>',
                domLoad    : '<div class="dropload-load sh_font_sz24 sh_te_align_c">...加载中...</div>'
            },
            domDown : {
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh sh_font_sz24 sh_te_align_c">↑上拉加载更多</div>',
                domLoad    : '<div class="dropload-load sh_font_sz24 sh_te_align_c">...加载中...</div>',
                domNoData  : '<div class="dropload-noData sh_font_sz24 sh_te_align_c">暂无数据</div>'
            },
            loadUpFn : function(me){//下拉刷新
                if (isAjaxGoing) return;
                urlParams.page = 1;
                refreshProdList();
            },
            loadDownFn : function(me){ //上拉加载
                if (isAjaxGoing) return;
                if (isIniting) {
                    isIniting = false;
                } else {
                    urlParams.page++;
                }
                refreshProdList();
            }
        });
        function refreshProdList(type) {
            if (isAjaxGoing) return;
            isAjaxGoing = true;
            var params = {
                type: urlParams.type,
                page: urlParams.page
            };
            $.ajax({
                url: url + (_c.debug ? "?" + _c.hash-- : ""),
                type: "get",
                contentType: _c.contentType,
                data: params,
                dataType: _c.dataType,
                success:function(data){
                    $("#_waiting_load").hide();
                    isAjaxGoing = false;
                    var productList=data.data.obj.resultList;
                    var totalPage = data.data.obj.pageCount;
                    var result='';
                        if (productList.length > 0) {
                            for(var i=0;i<productList.length;i++){
                                if(params.type=="member"){
                                    result +=
                                        '<div class="clearfix  sh_pd_top30  sh_pd_bottom30 sh_bor_bottom_1 sh_bg_color_1">\
                                            <div class="sh_width_92 sh_margin_a  clearfix sh_height_198 ">\
                                                <a  class="block" href="//'+hostmap.test+'/shop/index_shop.ftl?memberid='+productList[i].collectId+'">';
                                         result +='<div class="sh_width_4 sh_float_l sh_lingheight_100  sh_font_sz0 ">\
                                                       <img class="index_ser_list" alt="" src="//img.csc86.com'+productList[i].pic+'">';
                                         result +='</div>\
                                                    <div class="sh_width_8 sh_float_l sh_wor_space  sh_positon_r sh_font_sz0 sh_positon_r sh_height_198" >\
                                                        <span class="sh_di_block sh_font_sz32 li-ht42 sh_font_color5 sh_font_700 index_img_alter">'+productList[i].title+'</span>\
                                                        <div class="sh_font_sz32 sh_lingheight_100  sh_pd_top50 real-nameBg sh_positon_a sh_bottom_0">\
                                                            <span class="block real-nameCheck sh_ellipsis">\
                                                                <em class="sh_font_color6 ">企业实名认证</em>&nbsp;<span class="sh_font_color6 "><em class="care-num">'+productList[i].favoriteCount+'</em>人关注</span>\
                                                            </span>\
                                                        </div>\
                                                    </div>\
                                                </a>\
                                            </div>\
                                        </div>'
                                }else{
                                result +=
                                    '<div class="clearfix  sh_pd_top30  sh_pd_bottom30 sh_bor_bottom_1 sh_bg_color_1">\
                                        <div class="sh_width_92 sh_margin_a  clearfix sh_height_198 ">\
                                             <a  class="block" href="//'+hostmap.test+'/search/product_detail.ftl?productId='+productList[i].collectId+'">';
                                      result +='<div class="sh_width_4 sh_float_l sh_lingheight_100  sh_font_sz0 ">\
                                                   <img class="index_ser_list" alt="" src="//img.csc86.com'+productList[i].pic+'">';
                                      result +='</div>\
                                                <div class="sh_width_8 sh_float_l sh_wor_space  sh_positon_r sh_font_sz0 sh_positon_r sh_height_198">\
                                                    <span class="sh_di_block sh_font_sz32 li-ht42 sh_pd_bottom10 sh_font_color5 sh_font_700 index_img_alter">'+productList[i].title+'</span>\
                                                    <span class="sh_di_block sh_font_sz28 sh_lingheight_100  sh_pd_top50 sh_positon_a sh_bottom_0">\
                                                         <em class="sh_font_color2 ">￥</em><em class="sh_font_color2">'+productList[i].price+'</em><em class="sh_font_color2"></em>\
                                                    </span>\
                                                </div>\
                                             </a>\
                                        </div>\
                                    </div>'
                                }
                            }
                            dropload.resetload();
                        }
                    if (totalPage <= 0) {
                        prodList.html("<img src='//res.csc86.com/v3/shopping_center/market/demo/index_serch_zero.png' alt='' class='sh_img_max'/>");
                        $(".pro_list_container .dropload-down").css("display","none");
                    }else if (urlParams.page > 1){
                        prodList.append(result);
                        $(".pro_list_container .dropload-down").css("display","block");
                    }else {
                        prodList.html(result);
                        $(".pro_list_container .dropload-down").css("display","block");
                    }
                    if(totalPage <= 0 || urlParams.page >= totalPage){
                        // 锁定
                        //dropload.lock();//暂时注释，满足刷新，原设计为只有一页时不用刷新，如果需要则注释该行
                        dropload.noData();
                    }else {
                        //dropload.unlock();//暂时注释，满足刷新，原设计为只有一页时不用刷新，如果需要则注释该行
                        dropload.noData(false);
                    }
                    // 每次数据加载完，必须重置
                    dropload.resetload();
                },
                error: function(xhr, type){
                    // 即使加载出错，也得重置
                    dropload.resetload();
                }
            });
        }

    $(".sh_tab_box li").on('click', function (event) {//tab函数
        var index=$(this).index();
        if(index==0){
            if (isAjaxGoing) return;
            urlParams.page = 1;
            urlParams.type = 'product';
            refreshProdList();
        }else{
            if (isAjaxGoing) return;
            urlParams.page = 1;
            urlParams.type = 'member';
            refreshProdList();
        }
        $(".sh_tab_box li").eq(index).addClass("sh_active").siblings().removeClass('sh_active');//防止数据未请求完时触发其他函数

    })
});
