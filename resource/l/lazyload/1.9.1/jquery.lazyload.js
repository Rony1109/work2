/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 * 针对刚进入页面或者scroll导致的懒加载增加了商品曝光埋点统计
 * 其他事件导致的请自行在对应页面的js代码里面加上埋点统计。不过通常懒加载的话非scroll导致的懒加载不要用这个插件
 * 若需增加商品曝光的埋点直接将isProga设为true,且将threshold设成0，以达到商品一出现在可视区域就获取商品id发送出去
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);
    var mdArry=[],mdObj={},mdArry1=[],mdArry2=[],mdArry3=[];//新增变量，商品曝光埋点需要用到
    var lazyLoadNum=0;//新增变量，商品曝光埋点需要用到
    var numRegx=/^\d+$/;
    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            placeholder     : "//res.csc86.com/v2/m/init/image/1.gif",
            isProga:false //新增变量，商品曝光埋点需要用到
        };

        function update() {
            var counter = 0;
            mdArry=[],mdArry2=mdArry1,mdArry1=[],mdArry3=[],mdObj={};
            elements.each(function() {
                var $this = $(this);
                var left=$this.offset().left;
                var top=$this.offset().top;

                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    if(settings.isProga){
                        $this.trigger('cscga');
                    }
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    if(settings.isProga){
                        $this.trigger('farCscga');
                        for(var i=0;i<mdArry3.length;i++){
                            var farMdIndex=mdArry2.indexOf(mdArry3[i]);
                            if(farMdIndex>=0){
                                mdArry2.splice(farMdIndex,1);
                            }
                        }
                    }
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });
            /*
            新增商品曝光埋点
            将获当前获取到的可视区域的商品id数组mdArry1和前一次的获取到的且当前还处于可视区域的商品id数组mdArry2做对比，
            剔除仍处于可视区域但已经发送的商品id，以防重复发送
            */
            if(mdObj){
                for(i in mdObj){
                    mdArry1.push(i);
                }
                for(var i=0;i<mdArry2.length;i++){
                    var mdIndex=mdArry1.indexOf(mdArry2[i]);
                    if(mdIndex>=0){
                        delete mdObj[mdArry2[i]];
                    }
                }
                if(mdObj){
                    for(i in mdObj){
                        mdArry.push({id:mdObj[i]});
                    }
                    if(mdArry.length>0){
                        lazyLoadNum++;
                        if (typeof cscga == 'function') {
                            cscga('create', 'SU-10001-1', 'auto', 'proExpsrTracker' + lazyLoadNum);
                            cscga('proExpsrTracker' + lazyLoadNum + '.require', 'ec');
                            cscga('proExpsrTracker' + lazyLoadNum + '.require', 'cscplugin', {
                                data: mdArry,
                                isEcAction: false
                            });
                            cscga('proExpsrTracker' + lazyLoadNum + '.cscplugin:commodityExposureInit');
                        }
                    }
                }
            }

        }


        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }
            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function(i) {
            var self = this;
            var $self = $(self);
            var left=$self.offset().left;
            var top=$self.offset().top;

            self.loaded = false;
            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />").bind("load", function() {
                        var original = $self.attr("data-" + settings.data_attribute);
                        $self.hide();
                        if ($self.is("img")) {
                            $self.attr("src", original);
                        } else {
                            $self.css("background-image", "url('" + original + "')");
                        }
                        $self[settings.effect](settings.effect_speed);

                        self.loaded = true;

                        /* Remove image from array so it is not looped next time. */
                        if(!settings.isProga){
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);
                        }

                        if (settings.load) {
                            var elements_left = elements.length;
                            settings.load.call(self, elements_left, settings);
                        }
                    }).attr("src", $self.attr("data-" + settings.data_attribute));
                }

            });


            //获取到达可视区域的商品id
            $self.on("cscga", function() {
                //新增根据以下条件来判断是否为商品
                if(settings.isProga&&($self.attr('data-proid')||$self.parents('a[href*="product"]:first')[0]||$self.parents('a[href*="detail"]:first')[0])){
                    var proHref='';
                    var proId=$self.attr('data-proid')||'';
                    if(proId){
                        mdObj[proId +'|'+left+'|'+top] = proId;
                    }
                    else{
                        proHref = $self.parents("a:first").attr('href');
                        if (proHref.indexOf('.html') >= 0) {
                            proId = $.trim(proHref.replace(/(.*\/)*([^.]+).*/ig, "$2"));
                            if (numRegx.test(proId)) {
                                mdObj[proId + '|' + left + '|' + top] = proId;
                                //mdObj[''+proId]=proId;//将当前可视区域产品的商品id设为mdObj对象的属性，以防重复
                            }
                        }
                    }
                }
            });

            //获取离开可视区域的商品id
            $self.on("farCscga",function(){
                //新增根据以下条件来判断是否为商品
                if(settings.isProga&&($self.attr('data-proid')||$self.parents('a[href*="product"]:first')[0]||$self.parents('a[href*="detail"]:first')[0])){
                    var proHref='';
                    var proId=$self.attr('data-proid') || '';
                    if(proId){
                        mdArry3.push(proId + '|' + left + '|' + top);
                    }
                    else{
                        proHref = $self.parents("a:first").attr('href');
                        if (proHref.indexOf('.html') >= 0) {
                            proId = $.trim(proHref.replace(/(.*\/)*([^.]+).*/ig, "$2"));
                            if (numRegx.test(proId)) {
                                mdArry3.push(proId + '|' + left + '|' + top);
                            }
                        }
                    }
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });


        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
