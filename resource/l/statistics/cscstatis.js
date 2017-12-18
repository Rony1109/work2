/*!
 * cscStatis JavaScript Library v1.0.0
 * http://www.csc86.com/
 *
 * author:renmaohua
 *
 *
 cscStatis().send();
 cscStatis({"data": {"Tracer2": "pageview2"}}).send({"Tracer": "pageview2"});
 cscStatis({"data": {"a": 2, "b": 2}, "format": {"a": "aaa", "b": "bbb"}}).send({"Tracer": "event2"});
 *
 * Date: 2017-04-07 T10:24Z
 */

/* cscStatis start*/

(function (window, undefined) {

    /* Document对象数据 */
    function getDomain() {
        return document.domain || '';
    }

    function getUrl() {
        return document.URL || '';
    }

    function getTitle() {
        return encodeURIComponent(document.title) || '';
    }

    function getReferrer() {
        return document.referrer || '';
    }

    /* Window对象数据 */

    function getscreenResolution() {
        return window.screen.width + '×' + window.screen.height;
    }

    function getScreencolorDepth() {
        return window.screen.colorDepth || 0;
    }

    /* 获取UA */
    function getUA() {
        var ua = navigator.userAgent;
        if (ua.length > 250) {
            ua = ua.substring(0, 250);
        }
        return ua;
    }

    /* 获取浏览器类型 */
    function getBrower() {
        var ua = getUA();
        if (ua.indexOf("Maxthon") != -1) {
            return "Maxthon";
        } else if (ua.indexOf("MSIE") != -1) {
            return "IE";
        } else if (ua.indexOf("Firefox") != -1) {
            return "Firefox";
        } else if (ua.indexOf("Chrome") != -1) {
            return "Chrome";
        } else if (ua.indexOf("Opera") != -1) {
            return "Opera";
        } else if (ua.indexOf("Safari") != -1) {
            return "Safari";
        } else if (ua.indexOf("Mozilla") != -1) {
            return "Mozilla";
        } else {
            return "Other";
        }
    }

    /* 获取浏览器语 */
    function getBrowerLanguage() {
        var lang = navigator.language;
        return lang != null && lang.length > 0 ? lang : "";
    }

    /* 获取操作系统 */
    function getPlatform() {
        return navigator.platform || "";
    }

    function objextend(objs) {
        var args = {};
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "object") {
                for (var property in arguments[i]) {
                    args[property] = arguments[i][property];
                }
            }
        }
        return args;
    }

    function editParamkey(a, b) {
        Paramkey[a] = b;
    }

    function setParamkey(a, b) {

        var c = {};
        for (var i in a) {
            c[i] = a[i]
        }
        for (var m in b) {
            for (var n in c) {
                if (m == n) {
                    c[b[n]] = c[n];
                    if (m != b[m]) {
                        delete    c[n];
                    }

                }

            }
        }
        return c;

    }

    function set2Paramkey(a, b) {
        var c = {};
        for (var i in a) {
            c[i] = a[i]
        }
        for (var m in b) {
            for (var n in c) {
                if (m == n) {
                    c[n + '|0|' + b[n]] = c[n];
                    delete    c[n];
                }

            }
        }
        return c;
    }

    function getParam(url) {
        var url = url || window.location.href, args = {};
        if (url.indexOf("?") > 0) {
            var params = url.split("?")[1].split("&");

            for (var i = 0; i < params.length; i++) {
                var param = params[i].split("=");
                var key = param[0];
                var val = param[1];
                if (typeof args[key] == "undefined") {
                    args[key] = val;
                } else if (typeof args[key] == "string") {
                    args[key] = [args[key]];
                    args[key].push(val);
                } else {
                    args[key].push(val);
                }
            }

        }
        return args;
    }

    function setArgs(obj) {
        var args = [];
        for (var i in obj) {
            if (obj[i]) {
                var n = i;
                if (i.indexOf("|0|") > 0) {
                    n = i.split("|0|")[1]
                }
                args.push(n + '=' + encodeURIComponent(obj[i]));
            }

        }
        return args.join('&');
    }

    function consoleinfo(obj, arg) {

        arg = arg || {"Tracer": ""};
        for (var n in arg) {
            console.group(n + ':' + arg[n]);
        }

        for (var i in obj) {
            if (obj[i]) {
                var arr = i.split("|0|");
                var str2 = arr[1] ? ' (&' + arr[1] + ')' : "";
                console.info(arr[0] + str2 + ' : ' + decodeURIComponent(obj[i]));
            }

        }
        console.groupEnd();
        console.log(new Array(150).join("-"));
    }

    function setImg(args) {
        var img = new Image(1, 1);
        img.src = '//gol.csc86.com/1.gif?' + setArgs(args);
    }

    function getTime() {
        var timestamp = new Date().getTime();
        return timestamp;
    }

    if (!window.console) window.console = {};

    //设置cookie
    var setCookie = function (cookieName, value, expiretimes) {
        var exdate = new Date();
        var domain = document.domain.replace(/.*\.(.*\..*)/g, '$1');
        exdate.setTime(exdate.getTime() + expiretimes);
        document.cookie = cookieName + "=" + escape(value) + ";path=/;domain=" + domain + ";" +
            ((expiretimes == null) ? "" : ";expires=" + exdate.toGMTString());
    };

    //获取cookie
    var getCookie = function (cookieName) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(cookieName + "=");
            if (c_start != -1) {
                c_start = c_start + cookieName.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
            return "";
        }
        return "";
    };

    //生成uuid
    var createUUID = (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });

    //生成sessionid
    var createSessionId = (function () {
        var reg = new RegExp("-", "g");
        return createUUID().replace(reg, "").toLowerCase();
    });

    (function () {
        var now = new Date();
        var _gtra = "";
        var _gtrb = "";
        var _gtrc = "";
        _gtra = getCookie("_gtra");
        _gtrb = getCookie("_gtrb");
        _gtrc = getCookie("_gtrc");
        if (_gtra != "") {
            //同会话
            if (_gtrb != "" && _gtrc != "") {
                var pageNumStr = _gtrb.substring(_gtrb.lastIndexOf('.') + 1, _gtrb.length);
                console.log(pageNumStr);
                var pagetNum = pageNumStr*1+1;
                _gtrb = _gtrb.substring(0, _gtrb.indexOf('.') + 1) + now.getTime() + '.' + pagetNum;
                setCookie("_gtrb", _gtrb, 1000 * 60 * 30);

                //新会话
            } else {
                var sessionId = createSessionId();
                var visitNumStr = _gtra.substring(_gtra.lastIndexOf('.') + 1, _gtra.length);
                var visitNum = visitNumStr*1+1;
                _gtra = _gtra.substring(0, _gtra.lastIndexOf('.') + 1) + visitNum;
                _gtrb = sessionId + "." + now.getTime() + "." + "1";
                _gtrc = sessionId;
                setCookie("_gtra", _gtra, 1000 * 60 * 60 * 24 * 365 * 2);
                setCookie("_gtrb", _gtrb, 1000 * 60 * 30);
                setCookie("_gtrc", _gtrc, null);

            }
            //第一次
        } else {
            var sessionId = createSessionId();
            var uuid = createUUID();
            _gtra = uuid + '.' + now.getTime() + '.1';
            _gtrb = sessionId + "." + now.getTime() + "." + "1";
            _gtrc = sessionId;
            setCookie("_gtra", _gtra, 1000 * 60 * 60 * 24 * 365 * 2);
            setCookie("_gtrb", _gtrb, 1000 * 60 * 30);
            setCookie("_gtrc", _gtrc, null);
        }

        var uuid = getCookie("log_uuid");
        if (uuid == "") {
            uuid = createUUID();
            setCookie("log_uuid", uuid, 1000 * 60 * 60 * 24 * 365 * 2);
        }
    })();

    var urlParams = getParam();
    var params = {};
    var Paramkey = {};
    //csc86 pc-1 csc86 h5-2   JD-3(域名未定)
    var csctrackerid = document.domain.indexOf("csc86.com") >= 0 ? document.getElementsByTagName('meta')['apple-mobile-web-app-status-bar-style'] ? 'SU-10001-2' : 'SU-10001-1' : 'SU-10001-3';
    var charset = document.characterSet ? document.characterSet : document.charset;
    params.title = getTitle();
    params.domain = getDomain();
    params.location = getUrl();
    params.referrer = getReferrer();
    params.screenResolution = getscreenResolution();
    params.screencolorDepth = getScreencolorDepth();
    params.browerLanguage = getBrowerLanguage();
    //params.userAgent = getUA();
    params.brower = getBrower();
    params.platform = getPlatform();
    params.gtra = getCookie("_gtra");
    params.gtrb = getCookie("_gtrb");
    params.gtrc = getCookie("_gtrc");
    params.csctrackerId = csctrackerid;
    params.encoding = charset;

    var infoParams = objextend({}, urlParams, params);

    editParamkey("title", "dt");
    editParamkey("location", "url");
    editParamkey("domain", "dn");
    editParamkey("screenResolution", "sr");
    editParamkey("screencolorDepth", "sc");
    editParamkey("platform", "pf");
    editParamkey("browerLanguage", "ul");
    editParamkey("brower", "bw");
    //editParamkey("userAgent", "ua");
    editParamkey("referrer", "referrer");
    editParamkey("csctrackerId", "tid");
    editParamkey("encoding", "de");

    var _version = "1.0.0",
        cscdebug = typeof(window.csc2debug) == "undefined" ? false : window.csc2debug;//调试模式

    var cscStatisargs = null;
    if (window.cscStatis) {
        cscStatisargs = cscStatis.q;
    }


    cscStatis = function (config) {
        return new cscStatis.fn.init(config);
    };

    cscStatis.fn = cscStatis.prototype = {
        constructor: cscStatis,
        init: function (config) {
            this.config = config || {};
            this.configdata = this.config["data"] || {};
            this.configformat = this.config["format"] || {};
            this.newconfigformat = objextend({}, Paramkey, this.configformat);
            this.infoParams = objextend({}, infoParams, this.configdata, {"z": getTime()});
            this.info2Params = set2Paramkey(this.infoParams, this.newconfigformat);
            this.sendParams = setParamkey(this.infoParams, this.newconfigformat);
        },
        send: function (obj) {
            cscdebug && consoleinfo(this.info2Params, obj);
            setImg(this.sendParams);

        }

    };

    cscStatis.setParamkeys = function (a, b, h) {
        var c = {};
        for (var o in a) {
            if (a[o]) {
                if (a[o].constructor == Array) {
                    var q = [];
                    for (var x = 0; x < a[o].length; x++) {
                        var s = {};
                        for (var p in a[o][x]) {
                            s[p] = a[o][x][p]
                        }
                        q.push(s);
                    }
                    a[o] = q;
                }
                c[o] = a[o]
            }

        }

        for (var m in c) {
            if (c[m].constructor == Array) {
                var n = [];
                for (var k = 0; k < c[m].length; k++) {
                    var l = {};
                    for (var v in c[m][k]) {
                        if (b) {
                            if (h) {
                                if (v in h["format"]) {
                                    l[v + (k + 1) + "|0|" + b + (k + 1) + h["format"][v]] = c[m][k][v]
                                } else {
                                    l[b + (k + 1) + v] = c[m][k][v]
                                }
                            } else {
                                l[b + (k + 1) + v] = c[m][k][v]
                            }
                        } else {
                            l[v] = c[m][k][v]
                        }
                    }
                    n.push(l);
                }
                c[m] = n;
            }
        }
        return cscStatis.set2Args(c);

    };

    cscStatis.set2Args = function (a) {
        var args = {};
        for (var m in a) {
            if (a[m].constructor == Array) {
                for (var o = 0; o < a[m].length; o++) {
                    for (var n in a[m][o]) {
                        if (a[m][o][n]) {
                            args[n] = a[m][o][n];
                        }
                    }
                }
            } else {
                args[m] = a[m];
            }
        }
        return args;
    };

    cscStatis.obj2extend = function (objs) {
        var args = {};
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "object") {
                for (var property in arguments[i]) {
                    args[property] = arguments[i][property];
                }
            }
        }
        return args;
    };

    cscStatis.fn.init.prototype = cscStatis.fn;

    (function () {
        var sessionId = getCookie('sessionId');
        if (sessionId != null && sessionId != "") {
            var userId = getCookie(sessionId + '_user');
            var loginType = getCookie(sessionId + '_login');
            if (loginType != null && loginType != "") {
                var arr = ['h5', 'web'];
                var status = true;
                for (var i = 0; i < arr.length; i++) {
                    if (loginType == arr[i]) {
                        status = false;
                        break;
                    }
                }
                if (status) {
                    var news2obj = {"userId": userId, "loginType": loginType};
                    var newsobj = cscStatis.obj2extend(news2obj, {"eventAction": "thirdPartySuccess", "hitType": "event"});
                    cscStatis({"data": newsobj, "format": {"eventAction": "ea", "hitType": "t"}}).send({"Tracer": "thirdPartyTracker"});
                }
                setCookie(sessionId + '_login', "", -1000 * 60 * 60 * 24 * 7);
                setCookie(sessionId + '_user', "", -1000 * 60 * 60 * 24 * 7);
            }
        }
    })();

    cscdebug&&console.warn("调试模式已启动，上线前请关闭调试模式。（华南城网:www.csc86.com）");

    if (cscStatisargs) {
        for (var i = 0; i < cscStatisargs.length; i++) {
            cscStatis(cscStatisargs[i][0]).send(cscStatisargs[i][1]);
        }

    }

    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = cscStatis;
    } else {
        window.cscStatis = cscStatis;
        if (typeof define === "function" && define.amd) {
            define("cscStatis", [], function () {
                return cscStatis;
            });
        }
    }
})(window);

/* cscStatis end*/