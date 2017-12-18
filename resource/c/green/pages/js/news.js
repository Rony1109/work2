define(function(require, exports, module) {
    var NewsSlide = require('slide');
	new NewsSlide(".N-slide ul",".N-slide ul>li",{
        slideWidth: 400,
        slideHeight:260, 
        slideDirection: 0,
        slides_xssm:1,
        slideSeries:1,
        zantin: true,
        slides_auto_span : 6000,
        slideButs : '.N-slide>ol', //切换按钮容器，样式自定义
        slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
        slideButs_bindsj : "mouseover",
        slideButs_selectclass : "cur",
        slides_controller: '.N-slide>ol',
        slides_fun:NewsSlide.definedfun
    });

});