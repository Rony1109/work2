// JavaScript Document
!
function(t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var a = i[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return t[n].call(a.exports, a, a.exports, e),
        a.loaded = !0,
        a.exports
    }
    var i = {};
    return e.m = t,
    e.c = i,
    e.p = "",
    e(0)
} ([function(t, e, i) {
    t.exports = i(1)
},
function(t, e, i) {
    i(2),
    i(3),
    i(4),
    jQuery(function(t) {
        function e() {
            s.css("margin-top", "-" + d + "px").addClass("site-topbar-offset"),
            f = !1,
            c.addClass("nav-bar-fixed"),
            o = t(".mi1scroll-pagination").fadeIn("500"),
            MI.products.supportsTransitions && l.addClass("section-transition")
        }
        function i(e, i) {
            var n = t(".site-footer").outerHeight(!0) + t(".site-info").outerHeight(!0) + 50;
            return f || -1 !== e || "up" !== i ? f && 1 === e && "down" === i ? (s.animate({
                marginTop: -d
            },
            500,
            function() {
                o.fadeIn("500"),
                c.addClass("nav-bar-fixed")
            }), f = !1, !1) : p || e !== l.length || "down" !== i ? p && e === l.length - 2 && "up" === i ? (s.animate({
                marginTop: -d
            },
            500,
            function() {
                c.addClass("nav-bar-fixed"),
                o.fadeIn("500")
            }), p = !1, !1) : (t.isNumeric(i) && (s.css({
                marginTop: -d
            }), f = !1, p = !1), !0) : (c.removeClass("nav-bar-fixed"), o.fadeOut("500"), s.animate({
                marginTop: -(d + n)
            },
            500), p = !0, !1) : (c.removeClass("nav-bar-fixed"), o.fadeOut("500"), s.animate({
                marginTop: 0
            },
            500), f = !0, !1)
        }
        function n(t) {
            2 === t && (l.eq(2).find(".J_jumpNum").hasClass("finish") || (l.eq(2).find(".J_jumpNum").addClass("finish"), MI.products.jumpNumber(l.eq(2).find(".J_jumpNum"), {
                time: 1500
            })))
        }
        var a, o, s = t("body").children().eq(0),
        r = t(".J_miOneScroll"),
        d = r.offset().top,
        l = r.children(".section"),
        h = t(".J_arrowDown"),
        c = t(".J_fixNarBar"),
        u = t(".J_tabSwitch"),
        f = !1,
        p = !1,
        m = document.all && !document.addEventListener,
        v = -1 !== navigator.userAgent.toLowerCase().indexOf("iphone") || -1 !== navigator.userAgent.toLowerCase().indexOf("ipad"),
        g = -1 !== navigator.userAgent.toLowerCase().indexOf("android");
        v || g || (a = r.miOneScroll({
            sectionSelector: ".section",
            mode: "vertical",
            updateURL: !1,
            onLoad: e,
            beforeMove: i,
            afterMove: n
        }), h.on("click",
        function(t) {
            t.preventDefault(),
            a.moveDown()
        })),
        u.children("li").on("click",
        function(e) {
            var i = t(this).index(),
            n = t(this).closest(".tab-switch").next(".tab-container");
            e.preventDefault(),
            t(this).addClass("active").siblings().removeClass("active"),
            n.find(".tab-content").hide().eq(i).removeClass("hide").show()
        }),
        t(".J_samplesSlider").xmSlide({
            width: 1142,
            height: 650,
            responsiveWidth: 900,
            navigation: {
                effect: "fade"
            },
            effect: {
                fade: {
                    speed: 400
                }
            },
            play: {
                effect: "fade",
                interval: 5e3,
                auto: !0,
                pauseOnHover: !1,
                restartDelay: 2500
            }
        }),
        m && t(".xm-product-box").addClass("lteie8")
    }),
    function() {
        var t = jQuery,
        e = function() {
            function t() {
                this.fadeDuration = 500,
                this.fitImagesInViewport = !0,
                this.resizeDuration = 700,
                this.positionFromTop = 50,
                this.showImageNumberLabel = !0,
                this.alwaysShowNavOnTouchDevices = !1,
                this.wrapAround = !1
            }
            return t.prototype.albumLabel = function(t, e) {
                return "Image " + t + " of " + e
            },
            t
        } (),
        i = function() {
            function e(t) {
                this.options = t,
                this.album = [],
                this.currentImageIndex = void 0,
                this.init()
            }
            return e.prototype.init = function() {
                this.enable(),
                this.build()
            },
            e.prototype.enable = function() {
                var e = this;
                t("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",
                function(i) {
                    return e.start(t(i.currentTarget)),
                    !1
                })
            },
            e.prototype.build = function() {
                var e = this;
                t("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo(t("body")),
                this.$lightbox = t("#lightbox"),
                this.$overlay = t("#lightboxOverlay"),
                this.$outerContainer = this.$lightbox.find(".lb-outerContainer"),
                this.$container = this.$lightbox.find(".lb-container"),
                this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10),
                this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10),
                this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10),
                this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10),
                this.$overlay.hide().on("click",
                function() {
                    return e.end(),
                    !1
                }),
                this.$lightbox.hide().on("click",
                function(i) {
                    return "lightbox" === t(i.target).attr("id") && e.end(),
                    !1
                }),
                this.$outerContainer.on("click",
                function(i) {
                    return "lightbox" === t(i.target).attr("id") && e.end(),
                    !1
                }),
                this.$lightbox.find(".lb-prev").on("click",
                function() {
                    return e.changeImage(0 === e.currentImageIndex ? e.album.length - 1 : e.currentImageIndex - 1),
                    !1
                }),
                this.$lightbox.find(".lb-next").on("click",
                function() {
                    return e.changeImage(e.currentImageIndex === e.album.length - 1 ? 0 : e.currentImageIndex + 1),
                    !1
                }),
                this.$lightbox.find(".lb-loader, .lb-close").on("click",
                function() {
                    return e.end(),
                    !1
                })
            },
            e.prototype.start = function(e) {
                function i(t) {
                    n.album.push({
                        link: t.attr("href"),
                        title: t.attr("data-title") || t.attr("title")
                    })
                }
                var n = this,
                a = t(window);
                a.on("resize", t.proxy(this.sizeOverlay, this)),
                t("select, object, embed").css({
                    visibility: "hidden"
                }),
                this.sizeOverlay(),
                this.album = [];
                var o, s = 0,
                r = e.attr("data-lightbox");
                if (r) {
                    o = t(e.prop("tagName") + '[data-lightbox="' + r + '"]');
                    for (var d = 0; d < o.length; d = ++d) i(t(o[d])),
                    o[d] === e[0] && (s = d)
                } else if ("lightbox" === e.attr("rel")) i(e);
                else {
                    o = t(e.prop("tagName") + '[rel="' + e.attr("rel") + '"]');
                    for (var l = 0; l < o.length; l = ++l) i(t(o[l])),
                    o[l] === e[0] && (s = l)
                }
                var h = a.scrollTop() + this.options.positionFromTop,
                c = a.scrollLeft();
                this.$lightbox.css({
                    top: h + "px",
                    left: c + "px"
                }).fadeIn(this.options.fadeDuration),
                this.changeImage(s)
            },
            e.prototype.changeImage = function(e) {
                var i = this;
                this.disableKeyboardNav();
                var n = this.$lightbox.find(".lb-image");
                this.$overlay.fadeIn(this.options.fadeDuration),
                t(".lb-loader").fadeIn("slow"),
                this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),
                this.$outerContainer.addClass("animating");
                var a = new Image;
                a.onload = function() {
                    var o, s, r, d, l, h, c;
                    n.attr("src", i.album[e].link),
                    o = t(a),
                    n.width(a.width),
                    n.height(a.height),
                    i.options.fitImagesInViewport && (c = t(window).width(), h = t(window).height(), l = c - i.containerLeftPadding - i.containerRightPadding - 20, d = h - i.containerTopPadding - i.containerBottomPadding - 120, (a.width > l || a.height > d) && (a.width / l > a.height / d ? (r = l, s = parseInt(a.height / (a.width / r), 10), n.width(r), n.height(s)) : (s = d, r = parseInt(a.width / (a.height / s), 10), n.width(r), n.height(s)))),
                    i.sizeContainer(n.width(), n.height())
                },
                a.src = this.album[e].link,
                this.currentImageIndex = e
            },
            e.prototype.sizeOverlay = function() {
                this.$overlay.width(t(window).width()).height(t(document).height())
            },
            e.prototype.sizeContainer = function(t, e) {
                function i() {
                    n.$lightbox.find(".lb-dataContainer").width(s).css("margin-left", -s / 2),
                    n.$lightbox.find(".lb-prevLink").height(r),
                    n.$lightbox.find(".lb-nextLink").height(r),
                    n.showImage()
                }
                var n = this,
                a = this.$outerContainer.outerWidth(),
                o = this.$outerContainer.outerHeight(),
                s = t + this.containerLeftPadding + this.containerRightPadding,
                r = e + this.containerTopPadding + this.containerBottomPadding;
                a !== s || o !== r ? this.$outerContainer.animate({
                    width: s,
                    height: r
                },
                this.options.resizeDuration, "swing",
                function() {
                    i()
                }) : i()
            },
            e.prototype.showImage = function() {
                this.$lightbox.find(".lb-loader").hide(),
                this.$lightbox.find(".lb-image").fadeIn("slow"),
                this.updateNav(),
                this.updateDetails(),
                this.preloadNeighboringImages(),
                this.enableKeyboardNav()
            },
            e.prototype.updateNav = function() {
                var t = !1;
                try {
                    document.createEvent("TouchEvent"),
                    t = this.options.alwaysShowNavOnTouchDevices ? !0 : !1
                } catch(e) {}
                this.$lightbox.find(".lb-nav").show(),
                this.album.length > 1 && (this.options.wrapAround ? (t && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), t && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), t && this.$lightbox.find(".lb-next").css("opacity", "1"))))
            },
            e.prototype.updateDetails = function() {
                var e = this;
                "undefined" != typeof this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title && this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast").find("a").on("click",
                function(e) {
                    location.href = t(this).attr("href")
                }),
                this.album.length > 1 && this.options.showImageNumberLabel ? this.$lightbox.find(".lb-number").text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn("fast") : this.$lightbox.find(".lb-number").hide(),
                this.$outerContainer.removeClass("animating"),
                this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,
                function() {
                    return e.sizeOverlay()
                })
            },
            e.prototype.preloadNeighboringImages = function() {
                if (this.album.length > this.currentImageIndex + 1) {
                    var t = new Image;
                    t.src = this.album[this.currentImageIndex + 1].link
                }
                if (this.currentImageIndex > 0) {
                    var e = new Image;
                    e.src = this.album[this.currentImageIndex - 1].link
                }
            },
            e.prototype.enableKeyboardNav = function() {
                t(document).on("keyup.keyboard", t.proxy(this.keyboardAction, this))
            },
            e.prototype.disableKeyboardNav = function() {
                t(document).off(".keyboard")
            },
            e.prototype.keyboardAction = function(t) {
                var e = 27,
                i = 37,
                n = 39,
                a = t.keyCode,
                o = String.fromCharCode(a).toLowerCase();
                a === e || o.match(/x|o|c/) ? this.end() : "p" === o || a === i ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : ("n" === o || a === n) && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
            },
            e.prototype.end = function() {
                this.disableKeyboardNav(),
                t(window).off("resize", this.sizeOverlay),
                this.$lightbox.fadeOut(this.options.fadeDuration),
                this.$overlay.fadeOut(this.options.fadeDuration),
                t("select, object, embed").css({
                    visibility: "visible"
                })
            },
            e
        } ();
        t(function() {
            {
                var t = new e;
                new i(t)
            }
        })
    }.call(this)
},
function(t, e) {
    MI.namespace("products"),
    MI.products = function() {
        function t(e, i) {
            return i = i > e.length ? e.length: i,
            0 > i ? 0 : t(e, i - 1) + e[i]
        }
        function e(t) {
            return "number" == typeof t && isFinite(t) && t % 1 === 0
        }
        function i(e, n) {
            function a() {
                var t = -1;
                return $(u).each(function(e) {
                    return f + l - u[e] > 0 ? void(t += 1) : !1
                }),
                0 > t ? !1 : void(d.eq(t).hasClass("xm-visible-section") || (s.onlyOneVisible && d.removeClass("xm-visible-section"), d.eq(t).addClass("xm-visible-section"), "function" == typeof s.onVisible && s.onVisible(t)))
            }
            var o, s, r, d, l, h = $(e),
            c = [],
            u = [],
            f = 0;
            if (0 === h.length) return e;
            if (h.length > 1) return h.each(function() {
                i($(this), n)
            }),
            h;
            o = {
                selector: ".section",
                viewport: $(window),
                sectionOffsetFix: 300,
                onlyOneVisible: !1,
                onLoad: function() {},
                onVisible: function(t) {}
            },
            s = $.extend({},
            o, n),
            d = h.children(s.selector),
            r = h.addClass("xm-visible-section-container").offset().top,
            f = $(document).scrollTop() - r,
            l = s.viewport.height(),
            d.each(function() {
                c.push($(this).height())
            });
            for (var p = 0; p < c.length; p += 1) {
                var m = d.eq(p).attr("data-offset-fix") ? parseInt(d.eq(p).attr("data-offset-fix")) : s.sectionOffsetFix;
                u[p] = t(c, p - 1) + m
            }
            "function" == typeof s.onLoad && s.onLoad(),
            $(window).on({
                "resize.visible": function() {
                    l = $(window).height(),
                    a()
                },
                "scroll.visible": function() {
                    f = $(document).scrollTop() - r,
                    a()
                }
            }),
            $(document).ready(function() {
                a()
            })
        }
        function n(t, i) {
            function a(t, i) {
                return e(t) ? t: t.toFixed(i)
            }
            function o() {
                if (1e3 * c / r.time > 100) {
                    var t = Math.floor(c / 50);
                    h *= t,
                    c /= t,
                    o()
                }
            }
            var s, r, d, l, h, c, u, f = $(t);
            return 0 === f.length ? t: f.length > 1 ? (f.each(function() {
                n($(this), i)
            }), f) : (s = {
                stepBase: 1,
                startNum: 0,
                fixed: 1,
                time: 1e3
            },
            r = $.extend({},
            s, i), l = Number(f.attr("data-end-number")) || Number(f.text()), l && 0 !== l ? (d = r.startNum, !e(l) && e(r.stepBase) ? (h = .1 * r.stepBase, c = Math.ceil(l / h)) : (h = 1 * r.stepBase, c = Math.ceil(l / h)), o(), f.text(d), void(u = window.setInterval(function() {
                d += h,
                c -= 1,
                f.text(a(d, r.fixed)),
                1 > c && (window.clearInterval(u), f.text(l))
            },
            r.time / c))) : !1)
        }
        var a = function() {
            var t = document.createElement("p").style,
            e = ["ms", "O", "Moz", "Webkit"];
            if ("" === t.transition) return ! 0;
            for (; e.length;) return e.pop() + "Transition" in t ? !0 : !1
        } ();
        return {
            supportsTransitions: a,
            visibleWatcher: i,
            jumpNumber: n
        }
    } ()
},
function(t, e) { !
    function(t, e, i) {
        var n = {
            sectionSelector: ".section",
            easing: "ease",
            duration: 1e3,
            quietPeriod: 800,
            mode: "vertical",
            loop: !1,
            pagination: !0,
            keyboard: !0,
            updateURL: !1,
            onLoad: null,
            beforeMove: null,
            afterMove: null
        },
        a = function() {
            var t = document.createElement("p").style,
            e = ["ms", "O", "Moz", "Webkit"];
            if ("" === t.transition) return ! 0;
            for (; e.length;) return e.pop() + "Transition" in t
        } ();
        t.fn.swipeEvents = function() {
            return this.each(function() {
                function e(t) {
                    var e = t.originalEvent.touches;
                    e && e.length && (n = e[0].pageX, a = e[0].pageY, o.on("touchmove", i))
                }
                function i(t) {
                    var e = t.originalEvent.touches;
                    if (e && e.length) {
                        var s = n - e[0].pageX,
                        r = a - e[0].pageY;
                        s >= 50 && o.trigger("swipeLeft"),
                        -50 >= s && o.trigger("swipeRight"),
                        r >= 50 && o.trigger("swipeUp"),
                        -50 >= r && o.trigger("swipeDown"),
                        (Math.abs(s) >= 50 || Math.abs(r) >= 50) && o.unbind("touchmove", i)
                    }
                }
                var n, a, o = t(this);
                o.on("touchstart", e)
            })
        },
        t.fn.miOneScroll = function(i) {
            function o(t, i) {
                var n = 0,
                a = "";
                if ("get" === t) {
                    if ("" !== e.location.hash) {
                        a = e.location.hash.split("#")[1];
                        for (var o = 0,
                        s = w.length; s > o; o += 1) if (a === w[o]) {
                            n = o;
                            break
                        }
                    }
                } else {
                    var r = "undefined" != typeof p.eq(i).data("anchor") ? p.eq(i).data("anchor") : "section" + (i + 1);
                    history.replaceState ? history.pushState({},
                    document.title, "#" + r) : location.hash = r
                }
                return n
            }
            function s(e, i) {
                var n = "horizontal" === f.mode ? b: x,
                s = -e * n + "px";
                p.removeClass("section-active section-finish").eq(e).addClass("section-active"),
                "fade" === f.mode ? p.eq(e).fadeIn(f.duration).siblings().fadeOut(f.duration / 2) : a ? u.css({
                    transform: "horizontal" === f.mode ? "translate3d(" + s + ", 0, 0)": "translate3d(0, " + s + ", 0)"
                }) : "horizontal" === f.mode ? u.animate({
                    left: s
                },
                f.duration,
                function() {
                    p.eq(e).addClass("section-finish section-done"),
                    "function" == typeof f.afterMove && f.afterMove(e, i)
                }) : u.animate({
                    top: s
                },
                f.duration,
                function() {
                    p.eq(e).addClass("section-finish section-done"),
                    "function" == typeof f.afterMove && f.afterMove(e, i)
                }),
                f.pagination && 0 !== i && t(".mi1scroll-pagination").children("li").removeClass("active").eq(e).addClass("active"),
                f.updateURL && 0 !== i && o("set", e),
                u.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                function() {
                    p.eq(e).addClass("section-finish section-done"),
                    "function" == typeof f.afterMove && f.afterMove(e, i)
                })
            }
            function r(t) {
                var e = (new Date).getTime();
                e - v < f.quietPeriod + f.duration || (0 > t ? c.moveDown() : c.moveUp(), v = e)
            }
            function d() {
                b = t(e).width(),
                x = t(e).height(),
                l.css({
                    width: b,
                    height: x
                }),
                p.css({
                    width: b,
                    height: x
                }),
                "horizontal" === f.mode && u.css("width", b * p.length),
                0 !== m && c.moveTo(m)
            }
            var l, h, c = this,
            u = t(this),
            f = t.extend({},
            n, i),
            p = t(f.sectionSelector),
            m = 0,
            v = 0,
            g = null,
            b = t(e).width(),
            x = t(e).height(),
            y = "",
            w = [];
            return c.moveDown = function() {
                if (m < p.length - 1) {
                    if ("function" == typeof f.beforeMove && f.beforeMove(m + 1, "down") === !1) return ! 1;
                    m += 1,
                    s(m, "down")
                } else if (f.loop) {
                    if ("function" == typeof f.beforeMove && f.beforeMove(0, "down") === !1) return ! 1;
                    m = 0,
                    s(m, "down")
                } else if ("function" == typeof f.beforeMove && f.beforeMove(m + 1, "down") === !1) return ! 1;
                return m
            },
            c.moveUp = function() {
                if (m > 0) {
                    if ("function" == typeof f.beforeMove && f.beforeMove(m - 1, "up") === !1) return ! 1;
                    m -= 1,
                    s(m, "up")
                } else if (f.loop) {
                    if ("function" == typeof f.beforeMove && f.beforeMove(p.length - 1, "up") === !1) return ! 1;
                    m = p.length - 1,
                    s(m, "up")
                } else if ("function" == typeof f.beforeMove && f.beforeMove(m - 1, "up") === !1) return ! 1;
                return m
            },
            c.moveTo = function(t) {
                var e = m;
                return "function" == typeof f.beforeMove && f.beforeMove(m, t - m) === !1 ? !1 : (m = t > p.length - 1 || 0 > t ? 0 : t, s(m, t - e), m)
            },
            t("html, body").addClass("mi1scroll-container").css({
                margin: 0,
                height: "100%",
                overflow: "hidden"
            }),
            u.addClass("mi1scroll").wrap(t('<div class="mi1scroll-wrapper" />')),
            l = t(".mi1scroll-wrapper"),
            l.css({
                width: b,
                height: x
            }),
            p.css({
                width: b,
                height: x
            }),
            "fade" === f.mode ? (l.css({
                position: "relative"
            }), u.addClass("mi1scroll"), p.css({
                position: "absolute",
                left: "0",
                top: "0"
            }).hide()) : (a ? u.addClass("mi1scroll").css({
                transition: "all " + f.duration + "ms " + f.easing
            }) : (l.css({
                position: "relative"
            }), u.addClass("mi1scroll").css({
                position: "absolute",
                left: "0",
                top: "0"
            })), "horizontal" === f.mode && (u.css("width", b * p.length), p.css("float", "left"))),
            p.each(function(e) {
                var i = e + 1,
                n = "undefined" != typeof t(this).data("anchor") ? t(this).data("anchor") : "section" + i;
                t(this).attr({
                    "data-index": i
                }),
                w.push(n),
                y += "undefined" != typeof t(this).attr("data-title") ? '<li><a href="#' + n + '" data-index="' + i + '" data-title="' + t(this).attr("data-title") + '"><span class="dot">' + i + '</span><span class="title">' + t(this).attr("data-title") + "</span></a></li>": '<li><a href="#' + n + '" data-index="' + i + '"><span class="dot">' + i + "</span></a></li>"
            }),
            f.pagination && p.length > 1 && (t('<ol class="mi1scroll-pagination"></ol>').html(y).appendTo(l), t(".mi1scroll-pagination").find("a").on("click",
            function(e) {
                e.preventDefault(),
                c.moveTo(t(this).data("index") - 1)
            })),
            h = o("get"),
            f.updateURL && h > 0 && h < p.length ? (c.moveTo(h), p.eq(h).fadeIn(f.duration)) : (p.eq(0).removeClass("hide").show().addClass("section-finish section-done"), f.pagination && p.length > 1 && t(".mi1scroll-pagination li").first().addClass("active")),
            t(document).on("mousewheel DOMMouseScroll MozMousePixelScroll",
            function(t) {
                var e = t.originalEvent.wheelDelta || -t.originalEvent.detail;
                t.preventDefault(),
                r(e)
            }),
            u.swipeEvents().on({
                swipeDown: function() {
                    c.moveUp()
                },
                swipeUp: function() {
                    c.moveDown()
                }
            }),
            t(e).on("resize",
            function() {
                g && e.clearTimeout(g),
                g = e.setTimeout(function() {
                    d()
                },
                300)
            }),
            f.keyboard === !0 && t(document).on("keydown",
            function(t) {
                var e = t.target.tagName.toLowerCase();
                switch (t.which) {
                case 38:
                    "input" !== e && "textarea" !== e && c.moveUp();
                    break;
                case 40:
                    "input" !== e && "textarea" !== e && c.moveDown();
                    break;
                case 32:
                    "input" !== e && "textarea" !== e && c.moveDown();
                    break;
                case 33:
                    "input" !== e && "textarea" !== e && c.moveUp();
                    break;
                case 34:
                    "input" !== e && "textarea" !== e && c.moveDown();
                    break;
                case 36:
                    c.moveTo(1);
                    break;
                case 35:
                    c.moveTo(p.length);
                    break;
                default:
                    return
                }
            }),
            "function" == typeof f.onLoad && f.onLoad(),
            this
        }
    } (jQuery, window)
},
function(t, e) { (function() { !
        function(t, e, i) {
            var n, a, o;
            return o = "xmSlide",
            a = {
                width: 940,
                height: 528,
                responsiveWidth: 960,
                start: 1,
                navigation: {
                    active: !0,
                    effect: "slide"
                },
                pagination: {
                    active: !0,
                    effect: "slide"
                },
                play: {
                    active: !1,
                    effect: "slide",
                    interval: 5e3,
                    auto: !1,
                    swap: !0,
                    pauseOnHover: !1,
                    restartDelay: 2500
                },
                effect: {
                    slide: {
                        speed: 500
                    },
                    fade: {
                        speed: 300,
                        crossfade: !0
                    }
                },
                callback: {
                    loaded: function() {},
                    start: function() {},
                    complete: function() {}
                }
            },
            n = function() {
                function e(e, i) {
                    this.element = e,
                    this.options = t.extend(!0, {},
                    a, i),
                    this._defaults = a,
                    this._name = o,
                    this.init()
                }
                return e
            } (),
            n.prototype.init = function() {
                var i, n, a, o, s, r, d, l = this;
                return i = t(this.element),
                d = i.find("img").length > 1 ? !1 : !0,
                this.data = t.data(this),
                t.data(this, "animating", !1),
                t.data(this, "total", i.children().not(".xm-slider-navigation", i).length),
                t.data(this, "current", this.options.start - 1),
                t.data(this, "vendorPrefix", this._getVendorPrefix()),
                "undefined" != typeof TouchEvent && (t.data(this, "touch", !0), this.options.effect.slide.speed = this.options.effect.slide.speed / 2),
                i.css({
                    overflow: "hidden"
                }),
                i.slidesContainer = i.children().not(".xm-slider-navigation", i).wrapAll("<div class='xm-slider-container'>", i).parent().css({
                    overflow: "hidden",
                    position: "relative"
                }),
                t(".xm-slider-container", i).wrapInner("<div class='xm-slider-control'>", i).children(),
                t(".xm-slider-control", i).css({
                    position: "relative",
                    left: 0
                }),
                t(".xm-slider-control", i).children().addClass("xm-slider-slide").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 0,
                    display: "none",
                    webkitBackfaceVisibility: "hidden"
                }),
                t.each(t(".xm-slider-control", i).children(),
                function(e) {
                    var i;
                    return i = t(this),
                    i.attr("xm-slider-index", e)
                }),
                this.data.touch && (t(".xm-slider-control", i).on("touchstart",
                function(t) {
                    return l._touchstart(t)
                }), t(".xm-slider-control", i).on("touchmove",
                function(t) {
                    return l._touchmove(t)
                }), t(".xm-slider-control", i).on("touchend",
                function(t) {
                    return l._touchend(t)
                })),
                i.fadeIn(0),
                i.find("img").each(e.devicePixelRatio < 1.5 ?
                function() {
                    t(this).attr("data-src-orig", t(this).attr("src"))
                }: function() {
                    var e = t(this).attr("srcset");
                    e && e.split(" 2x")[0] && t(this).attr("data-src-orig", e.split(" 2x")[0]).removeAttr("srcset")
                }),
                this.update(),
                this.data.touch && !d && this._setuptouch(),
                t(".xm-slider-control", i).children(":eq(" + this.data.current + ")").eq(0).fadeIn(0,
                function() {
                    return t(this).css({
                        zIndex: 10
                    })
                }),
                this.options.navigation.active && !d && (s = t("<a>", {
                    "class": "xm-slider-previous xm-slider-navigation icon-slides icon-slides-prev",
                    href: "#",
                    title: "上一张",
                    text: "上一张"
                }).appendTo(i), n = t("<a>", {
                    "class": "xm-slider-next xm-slider-navigation icon-slides icon-slides-next",
                    href: "#",
                    title: "下一张",
                    text: "下一张"
                }).appendTo(i)),
                t(".xm-slider-next", i).click(function(t) {
                    return t.preventDefault(),
                    l.stop(!0),
                    l.next(l.options.navigation.effect)
                }),
                t(".xm-slider-previous", i).click(function(t) {
                    return t.preventDefault(),
                    l.stop(!0),
                    l.previous(l.options.navigation.effect)
                }),
                this.options.play.active && (o = t("<a>", {
                    "class": "xm-slider-play xm-slider-navigation",
                    href: "#",
                    title: "Play",
                    text: "Play"
                }).appendTo(i), r = t("<a>", {
                    "class": "xm-slider-stop xm-slider-navigation",
                    href: "#",
                    title: "Stop",
                    text: "Stop"
                }).appendTo(i), o.click(function(t) {
                    return t.preventDefault(),
                    l.play(!0)
                }), r.click(function(t) {
                    return t.preventDefault(),
                    l.stop(!0)
                }), this.options.play.swap && r.css({
                    display: "none"
                })),
                this.options.pagination.active && (a = t("<ul>", {
                    "class": "xm-slider-pagination"
                }).appendTo(i), t.each(new Array(this.data.total),
                function(e) {
                    var i, n;
                    return i = t("<li>", {
                        "class": "xm-slider-pagination-item"
                    }).appendTo(a),
                    n = t("<a>", {
                        href: "#",
                        "data-xm-slider-item": e,
                        html: e + 1
                    }).appendTo(i),
                    n.click(function(e) {
                        return e.preventDefault(),
                        l.stop(!0),
                        l["goto"](1 * t(e.currentTarget).attr("data-xm-slider-item") + 1)
                    })
                })),
                t(e).bind("resize",
                function() {
                    return l.update()
                }),
                this._setActive(),
                this.options.play.auto && !d && this.play(),
                this.options.callback.loaded(this.options.start)
            },
            n.prototype._setActive = function(e) {
                var i, n;
                return i = t(this.element),
                this.data = t.data(this),
                n = e > -1 ? e: this.data.current,
                t(".active", i).removeClass("active"),
                t(".xm-slider-pagination li:eq(" + n + ") a", i).addClass("active")
            },
            n.prototype.update = function() {
                var i, n, a;
                return i = t(this.element),
                a = i.width(),
                this.options.width = a,
                n = this.options.height,
                a <= this.options.responsiveWidth && i.find("img").each(e.devicePixelRatio < 1.5 ?
                function() {
                    t(this).attr("data-src-r") && t(this).attr("src", t(this).attr("data-src-r"))
                }: function() {
                    t(this).attr("data-src-r-2x") ? t(this).attr({
                        src: t(this).attr("data-src-r-2x")
                    }) : t(this).attr("data-src-r") && t(this).attr("src", t(this).attr("data-src-r"))
                }),
                a > this.options.responsiveWidth && i.find("img").each(function() {
                    t(this).attr({
                        src: t(this).attr("data-src-orig")
                    })
                }),
                t(".xm-slider-control, .xm-slider-container", i).css({
                    width: a,
                    height: n
                })
            },
            n.prototype.next = function(e) {
                var i;
                return i = t(this.element),
                this.data = t.data(this),
                t.data(this, "direction", "next"),
                void 0 === e && (e = this.options.navigation.effect),
                "fade" === e ? this._fade() : this._slide()
            },
            n.prototype.previous = function(e) {
                var i;
                return i = t(this.element),
                this.data = t.data(this),
                t.data(this, "direction", "previous"),
                void 0 === e && (e = this.options.navigation.effect),
                "fade" === e ? this._fade() : this._slide()
            },
            n.prototype["goto"] = function(e) {
                var i, n;
                if (i = t(this.element), this.data = t.data(this), void 0 === n && (n = this.options.pagination.effect), e > this.data.total ? e = this.data.total: 1 > e && (e = 1), "number" == typeof e) return "fade" === n ? this._fade(e) : this._slide(e);
                if ("string" == typeof e) {
                    if ("first" === e) return "fade" === n ? this._fade(0) : this._slide(0);
                    if ("last" === e) return "fade" === n ? this._fade(this.data.total) : this._slide(this.data.total)
                }
            },
            n.prototype._setuptouch = function() {
                var e, i, n, a;
                return e = t(this.element),
                this.data = t.data(this),
                a = t(".xm-slider-control", e),
                i = this.data.current + 1,
                n = this.data.current - 1,
                0 > n && (n = this.data.total - 1),
                i > this.data.total - 1 && (i = 0),
                a.children(":eq(" + i + ")").css({
                    display: "block",
                    left: "100%"
                }),
                a.children(":eq(" + n + ")").css({
                    display: "block",
                    left: "-100%"
                })
            },
            n.prototype._touchstart = function(e) {
                var i, n;
                return i = t(this.element),
                this.data = t.data(this),
                n = e.originalEvent.touches[0],
                this._setuptouch(),
                t.data(this, "touchtimer", Number(new Date)),
                t.data(this, "touchstartx", n.pageX),
                t.data(this, "touchstarty", n.pageY),
                e.stopPropagation()
            },
            n.prototype._touchend = function(e) {
                var i, n, a, o, s, r, d, l = this;
                return i = t(this.element),
                this.data = t.data(this),
                r = e.originalEvent.touches[0],
                o = t(".xm-slider-control", i),
                o.position().left > .5 * this.options.width || o.position().left > .1 * this.options.width && Number(new Date) - this.data.touchtimer < 250 ? (t.data(this, "direction", "previous"), this._slide()) : o.position().left < -(.5 * this.options.width) || o.position().left < -(.1 * this.options.width) && Number(new Date) - this.data.touchtimer < 250 ? (t.data(this, "direction", "next"), this._slide()) : (a = this.data.vendorPrefix, d = a + "Transform", n = a + "TransitionDuration", s = a + "TransitionTimingFunction", o[0].style[d] = "translateX(0px)", o[0].style[n] = .85 * this.options.effect.slide.speed + "ms"),
                o.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
                function() {
                    return a = l.data.vendorPrefix,
                    d = a + "Transform",
                    n = a + "TransitionDuration",
                    s = a + "TransitionTimingFunction",
                    o[0].style[d] = "",
                    o[0].style[n] = "",
                    o[0].style[s] = ""
                }),
                e.stopPropagation()
            },
            n.prototype._touchmove = function(e) {
                var i, n, a, o, s;
                return i = t(this.element),
                this.data = t.data(this),
                o = e.originalEvent.touches[0],
                n = this.data.vendorPrefix,
                a = t(".xm-slider-control", i),
                s = n + "Transform",
                t.data(this, "scrolling", Math.abs(o.pageX - this.data.touchstartx) < Math.abs(o.pageY - this.data.touchstarty)),
                this.data.animating || this.data.scrolling || (e.preventDefault(), this._setuptouch(), a[0].style[s] = "translateX(" + (o.pageX - this.data.touchstartx) + "px)"),
                e.stopPropagation()
            },
            n.prototype.play = function(e) {
                var i, n, a, o = this;
                return i = t(this.element),
                this.data = t.data(this),
                !this.data.playInterval && (e && (n = this.data.current, this.data.direction = "next", "fade" === this.options.play.effect ? this._fade() : this._slide()), t.data(this, "playInterval", setInterval(function() {
                    return n = o.data.current,
                    o.data.direction = "next",
                    "fade" === o.options.play.effect ? o._fade() : o._slide()
                },
                this.options.play.interval)), a = t(i), this.options.play.pauseOnHover && (a.unbind(), a.bind("mouseenter",
                function() {
                    return t(".xm-slider-navigation", i).show(),
                    o.stop()
                }), a.bind("mouseleave",
                function() {
                    return t(".xm-slider-navigation", i).hide(),
                    o.play()
                })), t.data(this, "playing", !0), t(".xm-slider-play", i).addClass("xm-slider-playing"), this.options.play.swap) ? (t(".xm-slider-play", i).hide(), t(".xm-slider-stop", i).show()) : void 0
            },
            n.prototype.stop = function(e) {
                var i;
                return i = t(this.element),
                this.data = t.data(this),
                clearInterval(this.data.playInterval),
                this.options.play.pauseOnHover && e && t(".xm-slider-container", i).unbind(),
                t.data(this, "playInterval", null),
                t.data(this, "playing", !1),
                t(".xm-slider-play", i).removeClass("xm-slider-playing"),
                this.options.play.swap ? (t(".xm-slider-stop", i).hide(), t(".xm-slider-play", i).show()) : void 0
            },
            n.prototype._slide = function(e) {
                var i, n, a, o, s, r, d, l, h, c, u = this;
                return i = t(this.element),
                this.data = t.data(this),
                this.data.animating || e === this.data.current + 1 ? void 0 : (t.data(this, "animating", !0), n = this.data.current, e > -1 ? (e -= 1, c = e > n ? 1 : -1, a = e > n ? -this.options.width: this.options.width, s = e) : (c = "next" === this.data.direction ? 1 : -1, a = "next" === this.data.direction ? -this.options.width: this.options.width, s = n + c), -1 === s && (s = this.data.total - 1), s === this.data.total && (s = 0), this._setActive(s), d = t(".xm-slider-control", i), e > -1 && d.children(":not(:eq(" + n + "))").css({
                    display: "none",
                    left: 0,
                    zIndex: 0
                }), d.children(":eq(" + s + ")").css({
                    display: "block",
                    left: c * this.options.width,
                    zIndex: 10
                }), this.options.callback.start(n + 1), this.data.vendorPrefix ? (r = this.data.vendorPrefix, h = r + "Transform", o = r + "TransitionDuration", l = r + "TransitionTimingFunction", d[0].style[h] = "translateX(" + a + "px)", d[0].style[o] = this.options.effect.slide.speed + "ms", d.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
                function() {
                    return d[0].style[h] = "",
                    d[0].style[o] = "",
                    d.children(":eq(" + s + ")").css({
                        left: 0
                    }),
                    d.children(":eq(" + n + ")").css({
                        display: "none",
                        left: 0,
                        zIndex: 0
                    }),
                    t.data(u, "current", s),
                    t.data(u, "animating", !1),
                    d.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd"),
                    d.children(":not(:eq(" + s + "))").css({
                        display: "none",
                        left: 0,
                        zIndex: 0
                    }),
                    u.data.touch && u._setuptouch(),
                    u.options.callback.complete(s + 1)
                })) : d.stop().animate({
                    left: a
                },
                this.options.effect.slide.speed,
                function() {
                    return d.css({
                        left: 0
                    }),
                    d.children(":eq(" + s + ")").css({
                        left: 0
                    }),
                    d.children(":eq(" + n + ")").css({
                        display: "none",
                        left: 0,
                        zIndex: 0
                    },
                    t.data(u, "current", s), t.data(u, "animating", !1), u.options.callback.complete(s + 1))
                }))
            },
            n.prototype._fade = function(e) {
                var i, n, a, o, s, r = this;
                return i = t(this.element),
                this.data = t.data(this),
                this.data.animating || e === this.data.current + 1 ? void 0 : (t.data(this, "animating", !0), n = this.data.current, e ? (e -= 1, s = e > n ? 1 : -1, a = e) : (s = "next" === this.data.direction ? 1 : -1, a = n + s), -1 === a && (a = this.data.total - 1), a === this.data.total && (a = 0), this._setActive(a), o = t(".xm-slider-control", i), o.children(":eq(" + a + ")").css({
                    display: "none",
                    left: 0,
                    zIndex: 10
                }), this.options.callback.start(n + 1), this.options.effect.fade.crossfade ? (o.children(":eq(" + this.data.current + ")").stop().fadeOut(this.options.effect.fade.speed), o.children(":eq(" + a + ")").stop().fadeIn(this.options.effect.fade.speed,
                function() {
                    return o.children(":eq(" + a + ")").css({
                        zIndex: 0
                    }),
                    t.data(r, "animating", !1),
                    t.data(r, "current", a),
                    r.options.callback.complete(a + 1)
                })) : o.children(":eq(" + n + ")").stop().fadeOut(this.options.effect.fade.speed,
                function() {
                    return o.children(":eq(" + a + ")").stop().fadeIn(r.options.effect.fade.speed,
                    function() {
                        return o.children(":eq(" + a + ")").css({
                            zIndex: 10
                        })
                    }),
                    t.data(r, "animating", !1),
                    t.data(r, "current", a),
                    r.options.callback.complete(a + 1)
                }))
            },
            n.prototype._getVendorPrefix = function() {
                var t, e, n, a, o;
                for (t = i.body || i.documentElement, n = t.style, a = "transition", o = ["Moz", "Webkit", "Khtml", "O", "ms"], a = a.charAt(0).toUpperCase() + a.substr(1), e = 0; e < o.length;) {
                    if ("string" == typeof n[o[e] + a]) return o[e];
                    e++
                }
                return ! 1
            },
            t.fn[o] = function(e) {
                return this.each(function() {
                    return t.data(this, "plugin_" + o) ? void 0 : t.data(this, "plugin_" + o, new n(this, e))
                })
            }
        } (jQuery, window, document)
    }).call(this)
}]);