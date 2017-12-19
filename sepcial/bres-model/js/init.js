define(function(require, exports, module) {
    // bres中加载 ImgScrollor 模块并调用
    var ImgScrollor = require('ImgScrollor');
    var imgList = [
        {imgUrl: 'image/default.jpg', href: ''},
        {imgUrl: 'image/default.jpg', href: ''},
        {imgUrl: 'image/default.jpg', href: ''},
        {imgUrl: 'image/default.jpg', href: ''},
        {imgUrl: 'image/default.jpg', href: ''},
        {imgUrl: 'image/default.jpg', href: ''},
        {imgUrl: 'image/default.jpg', href: ''},
        {imgUrl: 'image/default.jpg', href: ''},
        {imgUrl: 'image/default.jpg', href: ''},
        {imgUrl: 'image/default.jpg', href: ''}
    ];
    new ImgScrollor('imgScrollorContainer', {
        imgWidth: 255,
        imgHeight: 160,
        imgList: imgList
    });
    // 检查登录，设置首页，收藏，设置搜索,频道选择
    (function () {
        var special = require('special');
        special.isLogin();
        special.placeholder('#search-txt');
        special.search();
        special.searchType("div.m-search");

        var browser = navigator.userAgent.toLowerCase();
        $('.sethome').click(function () {
            if(browser.indexOf('webkit') > 0) {
                alert('您的浏览器未开启该功能');
            }
            special.setHome();
            return false;
        });
        $('.addfav').click(function(){
            special.addFav(location.href, document.title);
            return false;
        });
        $('.top-my-account').hover(function(){
            $(this).addClass('hover').find('.bd').show();
        }, function(){
            $(this).removeClass('hover').find('.bd').hide();
        });
        //频道选择
        $('.selected_channel').on({
            mouseover: function() {
                $(this).find('.sel_chnel').addClass('hover');
                $(this).find('.chnel_list').show();
            },
            mouseout: function() {
                $(this).find('.sel_chnel').removeClass('hover');
                $(this).find('.chnel_list').hide();
            }
        });
        require('http://res.csc86.com/v2/m/head-search/js/searchComplete');
        $('.ss-txt').SearchComplete();
    })();
    /*
     * 以下为专题js代码
     * ......
     */

});
