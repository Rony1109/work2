/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'dialog': 'm/dialog/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
    require('http://res.csc86.com/f=js/m/config.js,v2/l/artDialog/4.1.7/jquery.artDialog.js,v2/l/artDialog/4.1.7/plugins/iframeTools.source.js,js/m/dialog.js');
     var dialog = require('dialog');
     seajs.use(csc.url("res", "/f=js/m/sign"),function(){});

    /*
     * 以下为专题js代码
     * ......
     */
    // 申请按钮
     $("#botbtn,#addbtn").on("click",function(){
      $.ajax({
        url: 'http://api.csc86.com/notify/count/all/',
        dataType: 'jsonp',
        type: 'get',
        success: function(data) {
          if (data.status) {
            $("#maskform").fadeIn();
          } else {
            csc.checkSign("location.reload");
            // var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
            // if (isLogin.status != true) {
            //   location.href = "http://member.csc86.com/login/phone/?done=" + encodeURIComponent(location.href);
            //   return false;
            // }
          }
        }
      });        
     });
     // 关闭
     $(".closebtn1,.closebtn2,.Jstay").on("click",function(){
        $(this).parents(".Jmask").fadeOut();
     });
     // 提交
     $(".Jsubmit").on("click",function(e){
        e.preventDefault();
        $(".Jgsyform").submit();
        $("#maskform").fadeOut(function(){
            $("#masksuc").fadeIn();
        })        
     });
     // 分享
     var share ='<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网">人人网</a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a><a href="#" class="bds_more" data-cmd="more"></a></div>';
            $(".share").html(share);
        
        window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{"bdSize":16}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
});
