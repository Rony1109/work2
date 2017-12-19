/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'comment':'m/comment/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    var comment=require('comment');

    //评论
	comment.init('baabf606-8508-42ba-9768-13b609e1a7ca',$('#JComment'),{pn:3});

});
