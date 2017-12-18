/**
 * 前端模板js文件
 * 
 */

define(function(require, exports, module) {

	//设置首页及添加收藏
	require('m/top-bar/js/init');
	require('m/head-search/js/init');

    //复制文本代码
    require('./ZeroClipboard.min');

    var clip = new ZeroClipboard($("#codecopy"), {
        moviePath: "//www.csc86.com/statics/js/ZeroClipboard.swf"
    } );
    clip.on('complete', function(client, args) {
        $(".copytxt").html("代码已复制").fadeIn();
        setTimeout(function(){
            $(".copytxt").fadeOut();
        },2000)
    });

    //友情链接更多
    require('c/home/links/js/linkMore');

    $(".condition h3:eq(2)").addClass("bor-t");
});

