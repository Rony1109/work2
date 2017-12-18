/**
 * 皮革市场
 * 
 */
seajs.config({
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'foot': 'c/spining/common/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    }
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('foot');
    require('./loading');
    require('./index');
    require('./sub');
    require('./slide');

    //tab切换
    var tab = require("tab");
    tab($(".sc-busi ul li"),$(".sc-busi ol"),"mouseover","cur");
    tab($(".tab-outer li"),$(".tab-inner"),"mouseover","cur");
    tab($(".rank-list ul li"),$(".rank-list ol"),"mouseover","cur");

    //返回顶部
    var gotop = require("./gotop");
});
