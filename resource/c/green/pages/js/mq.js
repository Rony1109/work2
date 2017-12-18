/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {

	var slide = require('slide');
	new slide("#lh_box .li_lh", "#lh_box .li_lh>li", {
        slideWidth : 500,
        slideHeight : 275,
        slideDirection : 0,
        slideSeries:1,
        slides_auto_span : 3000,
        slideButs_bindsj : "mouseover",
        slideButs : "#lh_box .but",
        slides_fun : slide.definedfun
    });
	
    new slide(".rec_slide .inner ul", ".rec_slide .inner ul li:odd", {
        slideWidth : 480,
        slideHeight : 70,
        slideDirection : 0,
        slideSeries:1,
        slides_auto_span : 3000,
        slideButs_bindsj : "mouseover",
        slideButs : ".rec_slide .but",
        slides_fun : slide.definedfun
    });

    $(".contact_info .contact").each(function(){
        var $t = $(this);
        $t.bind("click",function(){
            $(".contact_info").addClass("c_i_hide");
            $t.parent(".contact_info").removeClass("c_i_hide");
        });
    });
    $(document).bind("click",function(e){
        if(!$(e.target).is(".contact,.contact_info div")){
            $(".contact_info").addClass("c_i_hide");
        }
    });
});