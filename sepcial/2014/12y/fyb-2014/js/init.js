
define(function(require){
	var $win = $(window).height();
var dbs = {
			"sc-main-bg":{
				feng:{right: 418, top: 105},
				yun:{left: 505, top: 230},
				bang:{right: 415,top: 370},
				year:{left: 590, top: 75},
				yin: {right: 460, top: 95},
				xiang: {left: 470, top: 200},
				cui: {right: 445, top: 95},
				can: {left: 500, top: 320}
			}
		};

	/*$('.multi-outer a').each(function(){
		$(this).on({
			mouseenter: function(){
				$(this).
			}
		});
	});*/
	
	require('./jquery.easing');
	//$('.screen-main').height($win);
	$(function(){
		$('.slogen').fadeIn(1800);
		for(var z in dbs){
			+function(){
				var k = z;
				$("."+k).on("yc",function(){
					var dbsn = dbs[k];
					var fdiv = $(this);
					for(var i in dbsn){
						var xx = dbsn[i];
						var cssatt = typeof(xx.left) == "undefined" ? "right" : "left";
						fdiv.find("."+i).css(cssatt, (parseInt(Math.random()*1000))%2 != 0 ? "-2000px":"2000px");
					}
				}).on("xs",function(){
					var dbsn = dbs[k];
					var fdiv = $(this);
					for(var i in dbsn){
						fdiv.find("."+i).animate(dbsn[i],1800, 'easeOutQuint');
					}
					
				}).on("go",function(){
					var o = $(this);
					$(this).trigger("yc").trigger("xs");

					var numb = o.offset().top;
					$('html,body').stop().animate({
						scrollTop: numb
					},1000,function(){
						thisdiv = o;
					});
				}).trigger("yc");
			}();

			$("li[data-divname]").on("click",function(){
				$("."+$(this).attr("data-divname")).trigger("go");
				$(this).addClass('cur '+$(this).attr('data-class')).siblings().attr('class','');
				$(this).parent().prev('span').attr('class','navimg _'+$(this).attr('data-class'));
			})

			//获取当前在哪一屏
			/*var arr = [0,756,1512,2268,3024];

			$(window).on('scroll', function(){
				var $win_top = $(document).scrollTop();
				for(var j = arr.length; j >= 0; j--) {
					if($win_top <= arr[j]) {
						$(".fixed-banner ul li").eq(j).addClass('cur '+$(".fixed-banner ul li").eq(j).attr('data-class')).siblings().attr('class','');
						$(".fixed-banner ul li").eq(j).parent().prev('span').attr('class','navimg _'+$(".fixed-banner ul li").eq(j).attr('data-class'));
					}
				}
			});*/



		}

		$(".sc-main-bg").trigger("xs").unbind("xs").unbind("yc");
	});

	var mark1 = false, thisdiv = $(".sc-main-bg");
	$('body').on('mousewheel',function(e){
		setTimeout(function(){mark1 = false},800);
		var ev = e.originalEvent || e;
		var delta = ev.wheelDelta ? (ev.wheelDelta / 120) : (- ev.detail / 3);
		if(mark1) return false;
		if(delta < 0) {
			var o_div = thisdiv.parent().next().find(".g-o-a");
			if(o_div.length > 0){
				//o_div.trigger("yc").trigger("xs");
				o_div.trigger("go");			
			}
		}else {
			var o_div = thisdiv.parent().prev().find(".g-o-a");
			if(o_div.length > 0){
				//o_div.trigger("yc").trigger("xs");
				o_div.trigger("go");
			}
		}
		mark1 =true;
	});

	 $("ul.l_tab").delegate('li', 'click', function(event) {
        var
            index = $("ul.l_tab li").index(this);
        $(".cover").eq(index).show().parent(index).siblings().children(".cover").hide();
		$(".lt").eq(index).show().parent(index).siblings().children(".lt").hide();
        $(".l_info").eq(index).show().siblings(".l_info").hide();
    });
	
	  $("ul.tab").delegate('li', 'click', function(event) {
        var
            index = $("ul.tab li").index(this);
        $(".info").eq(index).show().siblings(".info").hide();
    });
	
	$("ul.itab").delegate('li', 'click', function(event) {
        var
            index = $("ul.itab li").index(this);
        $(".hver").eq(index).show().parent(index).siblings().children(".hver").hide();
		$(".p1").eq(index).show().parent(index).siblings().children(".p1").hide();
        $(".picshow").eq(index).show().siblings(".picshow").hide();
    });
	

	
	require('./scroll');
	    var tm;
	    $(".img-scroll").CscScroll({
	        Left: 438,
	        Right:219,
	        Time: 2000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 4
	    });
		
		require('./scroll');
	    var tm;
	    $(".img-scroll2").CscScroll({
	        Left: 438,
	        Right:219,
	        Time: 2000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 4
	    });
	
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
                o.parent().find("p.vote span").text(1245 + parseInt(data.desc));
                $.get("http://quan.csc86.com/interface/hldlikeCount", {
                    "topicId": id
                }, function(data) {
                    o.parent().find("p.vote span").text(1245 + parseInt(data.code));
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
	
	
	
	
});