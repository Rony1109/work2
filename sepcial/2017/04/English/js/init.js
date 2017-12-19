/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({
    alias: {
        'login':'c2/ucenter/js/login.js'
    }
});

define(function(require, exports, module) {
    var login=require('login');
    var topic={
        //登录后修改顶部导航为登录后的相关信息
        hasLoginTop:function(m){
            
            
        },
        init:function(){
            
        }
    }
    topic.init();
});
