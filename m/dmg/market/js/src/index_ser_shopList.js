define(function(require, exports, module) {
    var _c= require('./index_ser_goListTest');
    var hostmap=seajs.hostmap;//域名配置
    require('dropload');
    var value=require('./url_express')(window.location.href).params.keyWord;
    //以上是获取浏览器url地址里面所带参数
    $("header").find(".tittle").html(decodeURI(value));  //标题栏加载数据
    var isAjaxGoing = false, isIniting = true;
    var urlParams = {
        keyWord:decodeURI(value),
        //_sort: null,
        page: 1
    };
    var url = _c.debug ? "/market/json/company.json" : "//" + hostmap.test + "/search/company.do?shopType=dm";
    var shopList = $(".shop_list");
    var droploadDown = $(".dropload-down");
    var dropload = $('.shop_list_container').dropload({
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
            //console.log("loadUpFn")
            urlParams.page = 1;
            refreshShopList();
        },
        loadDownFn: function (me) {
            if (isAjaxGoing) return;
            if (isIniting) {
                isIniting = false;
            } else {
                urlParams.page++;
            }
            refreshShopList();
        }
    });
    function refreshShopList() {
        if (isAjaxGoing) return;
        isAjaxGoing = true;
        var params = {
            keyWord: urlParams.keyWord,
            //sort: urlParams.sort,
            page: urlParams.page
        };
        $.ajax({
            url: url + (_c.debug ? "?" + _c.hash-- : ""),
            type: "get",
            contentType: _c.contentType,
            data: params,
            dataType: _c.dataType,
            success:function(data){
                isAjaxGoing = false;
                var companyList = data.data.companyList;
                var totalPage = data.data.totalPage;
                var result='';
                var src;
                if (totalPage> 0 || urlParams.page > 1) {
                    for (var j = 0, len = companyList.length; j < len; j++) {
                        if(companyList[j].imgUrl == '' || companyList[j].imgUrl == undefined){
                            src = '../demo/default_logo.jpg';
                        }else{
                            src='http://img.csc86.com' + companyList[j].imgUrl;
                        }
                        result +=
                            "<li class= 'sh_pd_30 sh_bg_color_1'>" +
                                "<a class='sh_font_color5' href="+ '//'+hostmap.test + '/shop/dm/index_shop.ftl?memberid=' + companyList[j].memberId+ ">" +
                                    "<div class='sh_font_sz0 sh_clear'>" +
                                        "<div class='sh_float_l login_wei'><img class='sh_img_max' src="+ src + "></div>" +
                                        "<div class='sh_float_r sh_width_82'>" +
                                            "<div class='sh_pd_left14'>" +
                                                "<div class='sh_font_sz32 sh_font_color22 sh_lingheight_100 index_img_alter sh_height_66 sh_pd_top5'>" + companyList[j].enterprise + "</div>" +
                                                "<div class='sh_pd_top20'>" +
                                                    "<span class='sh_di_inblock sh_width_6 sh_pd_top5'>" +
                                                        "<i><img class='index_skin sh_v_middle' src='../demo/shop_special_icon.jpg'></i>" +
                                                    "</span>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                    "<span class='sh_di_block sh_font_sz28 sh_pd_top15 index_img_alter main_products li-ht32'><em class='sh_font_color7'>主营：</em>" + companyList[j].businessName + "</span>" +
                                    "<span class='sh_di_block sh_font_sz28 sh_pd_top15 index_img_alter li-ht32'><em class='sh_font_color7'>地址：</em>" + companyList[j].province + companyList[j].address + "</span>" +
                                "</a>" +
                            "</li>";
                    }
                    shopList.append(result);
                }
                else {
                    $(".shop_list_container").html("<img src='//res.csc86.com/v3/shopping_center/market/demo/index_serch_zero.png' alt='' class='sh_img_max'/>");
                }
                // 每次数据加载完，必须重置
                dropload.resetload();
                if(totalPage <= 0 || urlParams.page >= totalPage){
                    // 锁定
                    dropload.lock();
                    dropload.noData();
                }else {
                    dropload.unlock();
                    dropload.noData(false);
                }
                dropload.resetload();
            },
            error: function(xhr, type){
                //alert('请求数据错误');
                // 即使加载出错，也得重置
                dropload.resetload();
            }
        });
    }
})