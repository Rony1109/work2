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
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');

    /*
     * 以下为专题js代码
     * ......
     */
	 require('./focusPlay');
		 $("#src-img li").hover(function() {
			$(this).find("div.shade").show();
		}, function() {
			$(this).find("div.shade").hide();
		});
	  
	   csc.foucsPlay("#src-img",null,2008);
		var $li = $("#src-img ol>li");
		$("#adv-upload").find("li").on("mouseover",function (){
			$li.eq($(this).index()).trigger("mouseover");
		}).on("mouseout",function (){
			$li.eq($(this).index()).trigger("mouseout");
		});
		
	  //点赞
    function _get(o, id) {
        $.get(csc.url("quan", "/likeB.html?topicId=" + id), function(data) {
            if ("sns_likeTopic_000" == data.code) {
                o.parent().find("p.vote span").text(33 + parseInt(data.desc));
                $.get("http://quan.csc86.com/interface/hldlikeCount", {
                    "topicId": id
                }, function(data) {
                    o.parent().find("p.vote span").text(33 + parseInt(data.code));
                }, "jsonp");
            } else if ("login_fail" == data.code) {
                seajs.use(csc.url("res", "/f=js/m/sign"), function() {
                    csc.checkSign("location.reload()");
                });
            } else if ("sns_likeTopic_001" == data.code) {
                csc.useDialog(function() {
                    csc.alert("赞过了！");
                });
            } else {
                csc.useDialog(function() {
                    csc.alert(data.desc);
                });
            }
        }, "jsonp");
    }
    $(".zan").each(function() {
       var o = $(this),
            id = o.data("id") || "000";
        var $mydata = o.parent().find("p.vote span");
        $.get("http://quan.csc86.com/interface/hldlikeCount", {
            "topicId": id
        }, function(data) {
            $mydata.text(33 + parseInt(data.code));
        }, "jsonp");
    });
	
	$(document).on('click','.zan',function(event){
		event.preventDefault();
			var o = $(this),
            id = o.data("id") || "000";
		 if (window.csc) {
                _get(o, id);
            } else {
                seajs.use('http://res.csc86.com/js/', function() {
                    _get(o, id);
                })
            }
		
	});
	
	 $(".tball").click(function(index) {
			var $th = $(this),
			  idx = $th.index();
			if (idx > 0) {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $th.addClass("tlcurone");
			  $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
			} else {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $th.addClass("tlcurone");
			   $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
				}
		  });

		  $(".tball").each(function(index){
				$(this).on('click',function(){
					$(".tab-sig").eq(index).show().sliblings(".tab-sig").hide();
				})	
			});


		 $(window).scroll(function() {
			var topscr = $(this).scrollTop();
			//alert(topscr);
			if (topscr < 500) {
			  $(".fiexd").addClass("fiexd_nav");
			} else {
			  $(".fiexd").removeClass("fiexd_nav");
			}
		  });

		$(".tablenameto").click(function() {
			var $th = $(this),
			  idx = $th.index();
			if (idx > 0) {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $(".tball:eq(" + idx + ")").addClass("tlcurone");
			   $(".tab-sig:eq(" + idx + ")").addClass("tballcur");
			} else {
			  $(".tball").removeClass("tlcurone");
			  $(".tab-sig").removeClass("tballcur");
			  $(".tball:eq(0)").addClass("tlcurone");
			  $(".tab-sig:eq(0)").addClass("tballcur");
			}
			document.location.href = window.location.pathname + "#tabname"
			return false;
		  });	
	
});
