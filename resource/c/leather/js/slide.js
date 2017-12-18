/**
 * 幻灯片
 *
 */
define(function(require, exports, module) {
    //幻灯片
    var slide = require("slide");

    new slide("#lh_box .li_lh", "#lh_box .li_lh>li", {
        slideWidth : 540,
        slideHeight : 220,
        slideDirection : 0,
        slideSeries:1,
        slides_auto_span : 3000,
        slideButs_bindsj : "mouseover",
        slideButs : "#lh_box .but",
        slides_fun : slide.definedfun
    });
    new slide("#lh_box1 .li_lh", "#lh_box1 .li_lh>li", {
        slideWidth : 490,
        slideHeight : 250,
        slideDirection : 0,
        slideSeries:1,
        slides_auto_span : 3000,
        slideButs_bindsj : "mouseover",
        slideButs : "#lh_box1 .but",
        slides_fun : slide.definedfun
    });
    new slide("#lh_box2 .li_lh", "#lh_box2 .li_lh>li", {
        slideWidth : 410,
        slideHeight : 250,
        slideDirection : 0,
        slideSeries:1,
        slides_auto_span : 3000,
        slideButs_bindsj : "mouseover",
        slideButs : "#lh_box2 .but",
        slides_fun : slide.definedfun
    });
    new slide("#lh_box3 .li_lh", "#lh_box3 .li_lh>li", {
        slideWidth : 1000,
        slideHeight : 200,
        slideDirection : 0,
        slideSeries:1,
        slides_auto_span : 3000,
        slideButs_bindsj : "mouseover",
        slideButs : "#lh_box3 .but",
        slides_fun : slide.definedfun
    });
    new slide("#lh_box4 .li_lh", "#lh_box4 .li_lh>li", {
        slideWidth : 988,
        slideHeight : 270,
        slideDirection : 1,
        slideSeries:1,
        slides_auto_span : 5000,
        slideButs_bindsj : "mouseover",
        slideButs : "#lh_box4 .but",
        slides_fun : function(i){
            $("#lh_box4 .li_lh .item:eq(" + i + ") .info,#lh_box4 .li_lh .item:eq(" + i + ") .info-bg").hide().css("bottom",-54 + "px");
            $("#lh_box4 .but a:eq("+i+")").addClass("s").siblings().removeClass("s");
        },
        slides_end : function (i) {

            $("#lh_box4 .li_lh .item:eq(" + i + ") .info,#lh_box4 .li_lh .item:eq(" + i + ") .info-bg").show().animate({"bottom":0},300);
        }
    });
    new slide("#lh_box5 .li_lh", "#lh_box5 .li_lh>li", {
        slideWidth : 988,
        slideHeight : 270,
        slideDirection : 1,
        slideSeries:1,
        slides_auto_span : 5000,
        slideButs_bindsj : "mouseover",
        slideButs : "#lh_box5 .but",
        slides_fun : function(i){
            $("#lh_box5 .li_lh .item:eq(" + i + ") .info,#lh_box5 .li_lh .item:eq(" + i + ") .info-bg").hide().css("bottom",-54 + "px");
            $("#lh_box5 .but a:eq("+i+")").addClass("s").siblings().removeClass("s");
        },
        slides_end : function (i) {

            $("#lh_box5 .li_lh .item:eq(" + i + ") .info,#lh_box5 .li_lh .item:eq(" + i + ") .info-bg").show().animate({"bottom":0},300);
        }
    });
});