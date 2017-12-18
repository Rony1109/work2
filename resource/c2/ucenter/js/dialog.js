/*
* 为了兼容老版的弹窗样式，此处引用的样式文件继续用老版的，而新版的样式写在各自的js或者css里面
* */
define(function(require, exports, module) {
    require('//res.csc86.com/f=v2/m/dialog/css/style.css');
    require('//res.csc86.com/f=v2/l/artDialog/4.1.7/jquery.artDialog.js,v2/l/artDialog/4.1.7/plugins/iframeTools.js');
    (function(config) {
        config['path'] = '//res.csc86.com/v2/l/artDialog/4.1.7';
    }(art.dialog.defaults));

    var dialogObj={

        //常用弹窗公用配置参数
        opts:{
            title:false,
            fixed:true,
            lock:true,
            opacity: 0.2,
            width:'auto',
            height:'auto',
            padding:0,
            close:function(){},
            init:function(){},
            dbClickHide:false //双击不关闭弹窗
        },


        /*普通的弹窗*/
        dft:function(options){
            var opts={
                id:'dft',
                content:'内容信息'
            };
            opts=$.extend({},dialogObj.opts,opts,options);
            return artDialog(opts);
        },

        /*提示弹窗*/
        tip:function(options){
            var opts={
                id:'tip',
                content:'提示信息',
                icon: 'tip-v2.0.0',
                padding:'25px 35px 25px 15px',
                cancel:false,
                time:2,
                init:function(){
                    $(this.DOM.wrap[0]).addClass('artdiatipsshow');
                }
            };
            opts=$.extend({},dialogObj.opts,opts,options);
            return artDialog(opts);
        },

        stop:function(options){
            var opts={
                id:'stop',
                content:'禁止信息',
                icon: 'stop-v2.0.0',
                padding:'25px 35px 25px 15px',
                cancel:false
            };
            opts=$.extend({},dialogObj.opts,opts,options);
            return artDialog(opts);
        },

        /*loading弹窗*/
        loading:function(options){
            var opts={
                id:'loading',
                content:'处理中。。。',
                icon: 'loading-v2.0.0',
                cancel:false,
                padding:'25px 35px 25px 15px'
            };
            opts=$.extend({},dialogObj.opts,opts,options);
            return artDialog({
                id:opts.id,
                title:opts.title,
                content:opts.content,
                icon: opts.icon,
                fixed:opts.fixed,
                lock:opts.lock,
                opacity: opts.opacity,
                width:opts.width,
                height:opts.height,
                cancel:opts.cancel,
                padding:opts.padding,
                close:function(){
                    $(this.DOM.iconBg).removeClass('loading');
                    opts.close();
                },
                init: function() {
                    $(this.DOM.iconBg).addClass('loading');
                    opts.init();
                },
                dbClickHide:opts.dbClickHide
            });
        },

        /*iframe弹窗*/
        ifm:function(options){
            var opts={
                id:'ifm',
                url:'',
                cancel:false
            };
            opts=$.extend({},dialogObj.opts,opts,options);
            return artDialog.open(opts.url,opts);
        }
    };

    module.exports = dialogObj;

});