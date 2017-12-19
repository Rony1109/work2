/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');

    /*
     * 以下为专题js代码
     * ......
     */
    // 标杆故事切换
    (function () {
        var $banner = $("#scrollWrap"),
          $bannerList = $("#scrollList"),
          $bannerItems = $bannerList.children(),
          itemWidth = $banner.width(),
          itemLen = $bannerList.children().length;

        $bannerList.css("width", itemLen * itemWidth);
        $bannerItems.css("width", itemWidth);
        $('#total').text(itemLen);
        /*for (var i = 0; i < itemLen; i++) {
          if (i === 0) {
            $banner.find(".scroll-index").append(' <li class="hover"><a href="javascript:;"></a></li>');
          } else {
            $banner.find(".scroll-index").append('<li><a href="javascript:;"></a></li>');
          }
        }*/

        /*var timer = null;
        function setTimer () {
          timer = setInterval(function () {
            scroll(1, $bannerList);
          }, 3000);
        }
        setTimer();
        $banner.hover(function (){
          clearInterval(timer);
        }, function (){
          setTimer();
        });*/
        var count = 1;
        $banner.find(".prev").click(function () {
          scroll(2, $bannerList);
        });
        $banner.find(".next").click(function () {
          scroll(1, $bannerList);
        });
        function scroll ( fx, ul ) {
          if ( fx === 1) { // next
            ul.animate({
              left: - itemWidth
            }, 500, function () {
              ul.children().slice(0, 1).appendTo( ul );
              ul.css("left", 0);
            });
            count ++;
            if (count > itemLen) {
              count = 1;
            }
          } else if ( fx === 2 ) { // prev
            var clone = ul.clone();
            clone.prependTo( $banner );
            clone.css("width", itemWidth * itemLen);
            clone.css("top", 0);
            clone.css("left", -itemWidth * itemLen);

            ul.animate({
              left: itemWidth
            }, 500, function () {
              ul.children().slice(-1).prependTo( ul );
              ul.css("left", 0);
            });
            clone.animate({
              left: -itemWidth * itemLen + itemWidth
            }, 500, function () {
              clone.remove();
            });
            count --;
            if (count < 1) {
              count = itemLen;
            }
          }
          // $banner.find(".scroll-index").children().removeClass("hover").eq(index).addClass("hover");
          $('#count').text(count);
        }
    })();

    // 标杆故事图片切换
    (function () {
        $('.Jimgscrollwrap').each(function(index, el) {
            var $banner = $(el),
              $bannerList = $banner.find('.Jimgscrolllist'),
              $bannerItems = $bannerList.children(),
              itemWidth = $banner.width(),
              itemLen = $bannerList.children().length,
              count = 0;

            $bannerList.css("width", itemLen * itemWidth);
            $bannerItems.css("width", itemWidth);
            for (var i = 0; i < itemLen; i++) {
              if (i === 0) {
                $banner.find(".scroll-index").append('<a href="javascript:;" class="hover"></a>');
              } else {
                $banner.find(".scroll-index").append('<a href="javascript:;"></a>');
              }
            }

            var timer = null;
            function setTimer () {
              timer = setInterval(function () {
                scroll(1, $bannerList);
              }, 3000);
            }
            setTimer();
            $banner.hover(function (){
              clearInterval(timer);
            }, function (){
              setTimer();
            });
            $banner.find(".prev").click(function () {
              scroll(2, $bannerList);
            });
            $banner.find(".next").click(function () {
              scroll(1, $bannerList);
            });
            function scroll ( fx, ul ) {
              if ( fx === 1) { // next
                ul.animate({
                  left: - itemWidth
                }, 500, function () {
                  ul.children().slice(0, 1).appendTo( ul );
                  ul.css("left", 0);
                });
                count ++;
                if (count === itemLen) {
                  count = 0;
                }
              } else if ( fx === 2 ) { // prev
                var clone = ul.clone();
                clone.prependTo( $banner );
                clone.css("width", itemWidth * itemLen);
                clone.css("top", 0);
                clone.css("left", -itemWidth * itemLen);

                ul.animate({
                  left: itemWidth
                }, 500, function () {
                  ul.children().slice(-1).prependTo( ul );
                  ul.css("left", 0);
                });
                clone.animate({
                  left: -itemWidth * itemLen + itemWidth
                }, 500, function () {
                  clone.remove();
                });
                count --;
                if (count === -1) {
                  count = itemLen - 1;
                }
              }
              $banner.find(".scroll-index").children().removeClass("hover").eq(count).addClass("hover");
            }
        });
    })();

    // 标杆故事切换
    (function () {
        var $banner = $("#wrap2"),
          $bannerList = $("#list2"),
          $bannerItems = $bannerList.children(),
          itemWidth = $banner.width(),
          itemLen = $bannerList.children().length;

        $bannerList.css("width", itemLen * itemWidth);
        $bannerItems.css("width", itemWidth);
        $('#total2').text(itemLen);

        var count = 1;
        $('#page2').find(".prev").click(function () {
          scroll(2, $bannerList);
        });
        $('#page2').find(".next").click(function () {
          scroll(1, $bannerList);
        });
        function scroll ( fx, ul ) {
          if ( fx === 1) { // next
            ul.animate({
              left: - itemWidth
            }, 500, function () {
              ul.children().slice(0, 1).appendTo( ul );
              ul.css("left", 0);
            });
            count ++;
            if (count > itemLen) {
              count = 1;
            }
          } else if ( fx === 2 ) { // prev
            var clone = ul.clone();
            clone.prependTo( $banner );
            clone.css("width", itemWidth * itemLen);
            clone.css("top", 0);
            clone.css("left", -itemWidth * itemLen);

            ul.animate({
              left: itemWidth
            }, 500, function () {
              ul.children().slice(-1).prependTo( ul );
              ul.css("left", 0);
            });
            clone.animate({
              left: -itemWidth * itemLen + itemWidth
            }, 500, function () {
              clone.remove();
            });
            count --;
            if (count < 1) {
              count = itemLen;
            }
          }
          // $banner.find(".scroll-index").children().removeClass("hover").eq(index).addClass("hover");
          $('#count2').text(count);
        }
    })();
});
