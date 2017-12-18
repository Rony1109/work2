//artDialog常用配置调用
/**
 * 调用
 * var dialog = require("m/jsM/dialog.js");
 * dialog.tip / dialog.alert ...
 */
 
seajs.config({
    // 别名配置
    alias: {
        'art_dialog': "l/artDialog/4.1.5/artDialog.js",
        'mem_skin' : "l/artDialog/4.1.5/skins/mem.css",
        'art_source' : "l/artDialog/4.1.5/artDialog.source.js",
        'iframeTools' : "l/artDialog/4.1.5/plugins/iframeTools.source.js"
    }
});

define(function(require, exports, module) {

    seajs.use(["art_dialog","mem_skin","iframeTools","art_source"]);
    /*
     * 自动关闭提示
     * msg 提示内容
     * closeTime 停留时间 默认1.5(1.5秒)
     */
    module.exports.tip = function(msg, closeTime, callback) {
        var closeTime = closeTime || 1.5;
        artDialog({
            id: "cscTip",
            content: msg,
            fixed: true,
            title: false,
            //padding:"0 19px 0 15px",
            icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
            init: function() {
                $(this.DOM.wrap[0]).find("div.aui_content").addClass("g-f-l g-fs-12");
            },
            time: closeTime,
            close: callback || null
        });
    };

    /*
     * 带确认按钮提示
     * msg 提示内容
     * fun 确认后的回调函数
     */
    module.exports.alert = function(msg, fun) {
        var fun = fun || function() {};
        artDialog({
            id: "cscAlert",
            content: msg,
            fixed: true,
            title: false,
            //title:"警告",
            //padding:"0 19px 0 15px",
            icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w",
            ok: fun
        });
    };

    /*
     * 带确认按和取消按钮提示
     * msg 提示内容
     * okFun 确认的回调函数
     * cancelFun  取消的回调函数
     * title 标题
     */
    module.exports.confirm = function(msg, okFun, cancelFun, title, lock) {
        var title = title || "警告",
            okFun = okFun || function() {},
            cancelFun = cancelFun || function() {},
            lock = lock || false;
        artDialog({
            id: "cscConfirm",
            content: msg,
            fixed: true,
            title: false,
            //padding:"0 19px 0 15px",
            icon: _ARTDIALOG_SKINS_ICOS_[3] || 'mem-q',
            ok: okFun,
            cancel: cancelFun,
            lock: lock
        });
    };

    /*
     * 出错提示
     * msg 提示内容
     */
    module.exports.error = function(msg, okfun) {
        artDialog({
            id: "cscError",
            content: msg,
            fixed: true,
            title: false,
            //padding:"0 19px 0 15px",
            icon: _ARTDIALOG_SKINS_ICOS_[2] || 'mem-e',
            ok: okfun || true
        });
    };

    /*
     * 操作成功提示
     * msg 提示内容
     * closeTime 停留时间 默认1.5(1.5秒)
     */
    module.exports.success = function(msg, closeTime, callback) {
        var closeTime = closeTime || 1.5;
        artDialog({
            id: "cscSuccess",
            content: msg,
            fixed: true,
            title: false,
            //padding:"0 19px 0 15px",
            icon: _ARTDIALOG_SKINS_ICOS_[1] || 'mem-c',
            time: closeTime,
            close: callback || null
        });
    };

});
