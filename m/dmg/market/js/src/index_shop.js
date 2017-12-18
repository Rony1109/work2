define(function(require, exports, module) {
    require('dropload');
    var isLogin = require('//api.csc86.com/notify/count/all/?callback=define');
    var dialog=require('layer');//弹框插件
    var hostmap = seajs.hostmap; //域名配置
    var memberId = require('./url_express')(window.location.href).params.memberid;
    //以上是获取浏览器url地址里面所带参数
    var isAjaxGoing = false, isIniting = true;
    $.debug=false;
    var hotPage = 1;
    var allPage = 1;
    var hotGoodsApi =  "//" + hostmap.test + "/shop/loadHotProducts?";
    var allGoodsApi =  "//" + hostmap.test + "/shop/loadProductsByKeyword?";
    var hotGoodsList =$('.hot_goods_list');
    var allGoodsList =$('.all_goods_list');
    var hotGoodsContainer = $('.hot_goods_container');
    var allGoodsContainer = $('.all_goods_container');
    var tips = function(tip) {
        dialog.open({
            content:tip
            ,skin: 'msg'
            ,time:2 //2秒后自动关闭
        });
        return false;
    };
    function loadGoodsList(goodsContainer){
        var droploadDown = $(".dropload-down");
        var dropload = goodsContainer.dropload({
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
                domNoData: '<div class="dropload-noData sh_font_sz24 sh_te_align_c">加载完毕</div>'
            },
            /*loadUpFn: function () {
                if(isIniting){
                    hotPage = 1;
                    refreshGoodsList(hotGoodsApi, hotPage, hotGoodsList, hotGoodsContainer);
                }else{
                    goodsContainer.find('ul').html("");
                    allPage = 1;
                    refreshGoodsList(allGoodsApi, allPage, allGoodsList, allGoodsContainer);
                }
            },*/
            loadDownFn: function () {
                if(isIniting){
                    refreshGoodsList(hotGoodsApi, hotPage, hotGoodsList, hotGoodsContainer);
                   hotPage++;
                }else{
                    refreshGoodsList(allGoodsApi, allPage, allGoodsList, allGoodsContainer);
                   allPage++;
                }

            }
        });

        function refreshGoodsList(apiUrl, apiPage, goodsList, goodsContainer) {
            console.log(apiUrl);
            var params = {
                memberid: decodeURI(memberId),
                page: apiPage
            };
            $.ajax({
                url: apiUrl,
                type: "get",
                contentType: "application/json; charset=utf-8",
                data: params,
                dataType: "jsonp",
                success: function(data){
                    if(data.status == 100){
                        isAjaxGoing = true;
                        var goodsitems = data.data.obj.list;
                        var totalPage = data.data.obj.totalPage;
                        var result='';
                        if(totalPage >= 1){
                            //console.log(params.page); //当前加载的 page
                            //console.log(goodsitems);  //当前页数据
                            for(var i = 0; i< goodsitems.length; i++){
                                result +=
                                    "<li class='sh_float_l sh_box-sizing_C  sh_width_50'>"+
                                        "<div class=' sh_width_95 sh_margin_a sh_bg_color_1'>"+
                                            "<div class=' sh_width_95 sh_margin_a '>"+
                                                "<a  href=//"+ hostmap.test + '/dmg/product/' + goodsitems[i].id +">"+
                                                    "<div class='image '><img  src=//img.csc86.com/"+ goodsitems[i].pic1 + " ></div>"+
                                                    "<span class='sh_font_color6 sh_di_block index_img_alter li-ht32 sh_pd_top15'>" + goodsitems[i].title + "</span>"+
                                                    "<span class='sh_font_sz24 sh_font_color21 sh_di_block sh_lingheight_100 sh_pd_top10 sh_pd_bottom10'>￥" + goodsitems[i].price +"</span>"+
                                                "</a>"+
                                            "</div>"+
                                        "</div>"+
                                    "</li>";
                            }
                            if(params.page >totalPage){
                                result = '';
                                isAjaxGoing = true;
                                dropload.resetload();
                            }
                            goodsList.append(result);
                        }else{
                            goodsList.html("<img src='//res.csc86.com/v3/shopping_center/market/demo/index_serch_zero.png' alt='' class='sh_img_max'/>");
                            $('.dropload-down').remove();
                        }
                        // 每次数据加载完，必须重置
                        if(totalPage <= 0 || params.page >= totalPage){
                            // 锁定
                            dropload.lock();
                            dropload.noData();
                        }else {
                            dropload.unlock();
                            dropload.noData(false);
                        }
                        dropload.resetload();
                    }else if(data.status == 101){
                        window.location.href = 'http://'+ hostmap.test + '/templates/500.ftl';
                    }else{
                        window.location.href = 'http://'+  hostmap.test +'/templates/404.ftl';
                    }
                },
                error: function(xhr, type){
                    // 即使加载出错，也得重置
                    dropload.resetload();
                    window.location.href = 'http://'+ hostmap.test +'/templates/500.ftl';
                }
            })
        }
    }


    $(function(){
        var index = {
            searchActive: function(){ //顶部搜索框效果
                var searchActive = $('#search_active');
                    searchActive.addClass('search_active sh_bg_color_1');
                    searchActive.find('.search_back').attr('src' , '//res.csc86.com/v3/shopping_center/market/demo/pro_intrHead_left_a.png');
                    searchActive.find('.search_icon').attr('src' , '//res.csc86.com/v3/shopping_center/market/demo/index_ser_icon.png');

                function indexSearchGoods(){
                    var keyword = $(".index_ser_goo").val();
                    if(keyword){
                        window.location.href = '//res.csc86.com/v3/dmg/market/html/search_instore_goods.html?keyWord='+ keyword +'&memberid='+ decodeURI(memberId);
                    }else{
                        return;
                    }
                }

                $('.index_ser_goo').blur(function(){
                    indexSearchGoods();
                });
                $('.search_icon').on('click', function(){
                    indexSearchGoods();
                });
            },
            tab: function() { //tab切换
                $('.shop_tab_box').find('li').on('click', function () {
                    var $this = $(this),
                        $index = $this.index();
                    $this.addClass('sh_active').siblings().removeClass('sh_active');
                    $('.shop_tab_item').addClass('sh_tab').eq($index).removeClass('sh_tab');

                    switch ($index) {
                        case 0:
                            $this.find('img').attr('src', '//res.csc86.com/v3/shopping_center/market/demo/shop_index.png').end().next().find('img').attr('src', '//res.csc86.com/v3/shopping_center/market/demo/all_goods.png');
                            isIniting = true;
                            $('.dropload-down').remove();
                            loadGoodsList(hotGoodsContainer);
                            break;
                        case 1:
                            $this.find('img').attr('src', '//res.csc86.com/v3/shopping_center/market/demo/all_goods2.png').end().prev().find('img').attr('src', '//res.csc86.com/v3/shopping_center/market/demo/shop_index2.png');
                            isIniting = false;
                            $('.dropload-down').remove();
                            loadGoodsList(allGoodsContainer);
                            break;
                        default:
                    }
                })
            },
            mainInfo: function(){  //店铺主体信息加载
                var mainInfoApi= "//" +  hostmap.test + "/shop/loadShopMainInfo?", _is_store_not=null;//已经收藏;
                function src_exchange(type){
                    if(type){
                        $(".shop_collect").attr("src","//res.csc86.com/v3/shopping_center/market/demo/collect2.png");
                    }else{
                        $(".shop_collect").attr("src","//res.csc86.com/v3/shopping_center/market/demo/collect.png");

                    }
                }
                function num_exchange(type){//收藏取消关注人数变化
                    if(type){
                        $(".total-num").html((+$(".total-num").html())+1)  //收藏取消关注人数增加
                    }else{
                        $(".total-num").html((+$(".total-num").html())-1)   //收藏取消关注人数减少
                    }
                }
                function  _change_storeAjax(url,params,type){//收藏与取消收藏共用ajax函数
                    $.ajax({
                        url:url,
                        type: $.debug ? "get":"post",
                        data:params,
                        dataType:$.debug ? "json":"jsonp",
                        success: function (data) {
                            if(type){
                                if(data.status=="200"){
                                    var newsobj=cscStatis.obj2extend({"shopId":memberId},{"memberid":"","eventAction":"favSuccess","hitType": "event"});
                                    cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t"}}).send({"Tracer": "favSuccessTracker"});
                                    src_exchange(true);
                                    num_exchange(true);
                                    tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                    _is_store_not=true;//收藏
                                }else{
                                    src_exchange(false);
                                    num_exchange(false);
                                    tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                    _is_store_not=false;//未收藏
                                }
                            }else{
                                if(data.status=="200"){
                                    var newsobj=cscStatis.obj2extend({"shopId":memberId},{"memberid":"","eventAction":"delFavorate","hitType": "event"});
                                    cscStatis({"data": newsobj, "format": {"eventAction": "ea","hitType": "t"}}).send({"Tracer": "delFavorateTracker"});
                                    src_exchange(false);
                                    num_exchange(false);
                                    tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                    _is_store_not=false;//未收藏
                                }else{
                                    src_exchange(true);
                                    num_exchange(true);
                                    tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                    _is_store_not=true;//收藏
                                }
                            }
                        },
                        error: function (xhr, type) {
                            tips("<label class='sh_font_sz32'>后台程序报错，操作失败</label>");
                        }
                    });
                }
                function _change_store() {//添加到收藏夹功能
                    if(_is_store_not){//已经收藏过则是取消收藏
                        _change_storeAjax("//"+hostmap.test+"/cancelFavorites",{"collectId":memberId},false)
                    }else{
                        _change_storeAjax("//"+hostmap.test+"/shop/addFavorites",{"shopId":memberId},true)
                    }
                }
                $.ajax({
                    url: mainInfoApi,
                    type: "get",
                    data: {memberid: decodeURI(memberId)},
                    dataType: "jsonp",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        $('.main_title').html(data.data.obj.enterprise);
                        $('.total-num').html(data.data.obj.favoriteCount);
                        if(data.data.obj.imgUrl == '' || data.data.obj.imgUrl == undefined){
                            $('.main_logo').find('img').attr("src" , "//res.csc86.com/v3/shopping_center/market/demo/default_logo.jpg");
                        }else{
                            $('.main_logo').find('img').attr("src","//img.csc86.com" + data.data.obj.imgUrl).on("click",function(){
                              window.location.href="//res.csc86.com/v3/dmg/market/html/shop_intr.html?memberId="+decodeURI(memberId)
                            });
                        }
                        if ($.debug||isLogin.status){
                            if(data.data.obj.isFavorite=="Y"){
                                _is_store_not=true;//已经收藏
                                 src_exchange(true);
                                $(".shop-store").on("click",_change_store);
                            }else{
                                _is_store_not=false;//未收藏
                                src_exchange(false);
                                $(".shop-store").on("click",_change_store);
                            }
                        }else{
                            src_exchange(false);
                            $(".shop-store").on("click",function(){
                                tips("<label class='sh_font_sz32'>亲，您还没有登录,暂时无法收藏哦...</label>");
                            })
                        }

                    },
                    error: function(){
                        tips("<label class='sh_font_sz32'>数据请求发生异常，请刷新页面后重试...</label>");
                    }
                })
            },
            goodsListLoad: function(){ //热销商品及全部商品加载
                loadGoodsList(hotGoodsContainer);
               // isIniting = false;
               // loadGoodsList(allGoodsContainer);
               // isIniting = true;
            },
            init: function(){ //初始化函数
                index.searchActive();
                index.tab();
                index.mainInfo();
                index.goodsListLoad();
            }
        };

        index.init();
    });
});