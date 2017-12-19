/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('m/dialog/css/style.css');
    require('l/artDialog/4.1.7/jquery.artDialog.js');
    require('l/artDialog/4.1.7/plugins/iframeTools.js');
    require('l/artDialog/4.1.7/plugins/iframeTools.js');

    var dialog = artDialog;

    var $fixed = $('div.online-services');
    if($fixed.length > 0 && $fixed.css('position') != 'fixed'){
        $(window).bind('scroll',function(){
            var tP = $(this).scrollTop();
            $fixed.stop(true,true).animate({top:tP+172},150);
        }).trigger('scroll');
    }

    exports.indexScroll = function (){
        var $div = $('div.index-scroll'),
            $ul = $div.find('ul'),
            $li = $ul.find('li'),
            rW = $li.length * 303,
            scroll = '-=909px',
            timer,
            player = function(){
                if($ul.is(':animated')){
                    return;
                }
                var mL = parseInt($ul.css('marginLeft'));
                if(scroll == '-=909px'){
                    if((rW+mL) < 1){
                        $ul.css('marginLeft',rW+mL);
                    }
                }else{
                    if((909+mL) > 0){
                        $ul.css('marginLeft',mL-rW);
                    }
                }

                $ul.animate({marginLeft: scroll},600);
                timer = setTimeout(player,3000);
            };
        $li.clone().appendTo($ul);
        $div.delegate('a.prev,a.next', 'click', function(event) {
            clearTimeout(timer);
            scroll = $(this).is('.prev') ? '+=909px' : '-=909px';
            player();
        });
        timer = setTimeout(player,3000);
    };

    exports.clubScroll = function (){
        var $div = $('div.club-activity'),
            $ul = $div.find('ul'),
            $li = $ul.find('li'),
            rW = $li.length * 802,
            scroll = '-=802px',
            timer,
            player = function(){
                if($ul.is(':animated')){
                    return;
                }
                var mL = parseInt($ul.css('marginLeft'));
                if(scroll == '-=802px'){
                    if((rW+mL) < 1){
                        $ul.css('marginLeft',rW+mL);
                    }
                }else{
                    if((802+mL) > 0){
                        $ul.css('marginLeft',mL-rW);
                    }
                }

                $ul.animate({marginLeft: scroll},600);
                timer = setTimeout(player,3000);
            };
        $li.clone().appendTo($ul);
        $div.delegate('a.prev,a.next', 'click', function(event) {
            clearTimeout(timer);
            scroll = $(this).is('.prev') ? '+=802px' : '-=802px';
            player();
        });
        timer = setTimeout(player,3000);
    };

    exports.joinus = function(){        

        var veryfyBlank = function(inputdom){//验证是否为空
            var $inputdom = $(inputdom), inputval = $.trim($inputdom.val());

            if (!inputval){
                $inputdom.siblings('font.erro').remove();
                $inputdom.after('<font class="erro c-red">不能为空</font>');
                return false;
            }else{ $inputdom.siblings('font.erro').remove(); return true; }

        }

        $(document).delegate('.jionpop form','submit',function submitFun(event){
            event.preventDefault();
            var $form = $(this);
            var input = $form.find('input[type="text"]') , Y = true;
            for(i=0; i<input.length; i++){
                var v = veryfyBlank( input[i] );
                if(!v){ Y = false }
            }
            if(Y){
                var list = $form.serializeArray();
                $.post($form.attr("action"),list,function(data){
                    dialog({id: 'joinus'}).close();
                    if(data.status){ artDialog.success("提交成功！",2) }else{ artDialog.error("提交失败，请刷新后再试！") }
                },'jsonp');
            }else{ return false }
        });

        var html = '<div class="jionpop g-ffy g-pr">'+
                        '<h2>申请加入生意红娘</h2><form action="http://cncms.csc86.com/formguide/index.php">'+
                        '<ul>'+
                            '<li><span><b>*</b>公司名称：</span><input class="poptxt" type="text" name="info[company]" /></li>'+
                            '<li><span><b>*</b>所属行业：</span><input class="poptxt" type="text" name="info[Industry]" /></li>'+
                            '<li><span><b>*</b>联系人：</span><input class="poptxt" type="text" name="info[name]" /></li>'+
                            '<li><span><b>*</b>联系电话：</span><input class="poptxt" type="text" name="info[phone]" /></li>'+
                            '<li><span><b>*</b>联系邮箱：</span><input class="poptxt" type="text" name="info[email]" /></li>'+
                            '<li><span>&nbsp;</span><input class="popsavebtn g-ffy" type="submit" value="保存" /></li>'+
                        '</ul>'+
                        '<a id="closepop" class="closepop" href="javascript://">关闭</a>'+
                        '<input type="hidden" name="formid" value="63">'+
                        '<input type="hidden" name="subtype" value="ajax">'+
                        '<input type="hidden" name="dosubmit" value="申请生意红娘"></form>'+
                    '</div>';

        $("#join").bind("click",function(){
            var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
            if (isLogin.status == true) {
                dialog({
                    id:"joinus",
                    content: html || '申请加入生意红娘',
                    fixed: true,
                    title: false,
                    lock:true
                });
                $("#closepop").bind("click",function(){ dialog({id: 'joinus'}).close(); });
            } else {
                alert('请先登录，登录后会返回当前页！')
                window.location = "http://member.csc86.com/login/phone/"
            }
        });

    };

    artDialog.tip = function (msg, closeTime, callback){
        this({
            id:"cscTip",
            content: msg || '提示信息',
            fixed: true,
            title: false,
            icon: "mem-w",
            time:closeTime || 1.5,
            close:callback || null
        });
    };

    artDialog.alert = function (msg, fun){
        this({
            id:"cscAlert",
            content: msg || '警告信息',
            fixed: true,
            title: false,
            icon: "mem-w",
            ok:fun || null
        });
    };

    artDialog.confirm = function (msg,okFun,cancelFun){
        this({
            id:"cscConfirm",
            content:msg || '请确认操作？',
            fixed: true,
            title: false,
            icon: 'mem-q',
            ok:okFun || function(){},
            cancel:cancelFun || function(){}
        });
    };

    artDialog.error = function (msg,okfun){
        this({
            id:"cscError",
            content: msg || '错误提示',
            fixed: true,
            title: false,
            icon: 'mem-e',
            ok: okfun || true
        });
    };

    artDialog.success = function (msg,closeTime,callback){
        this({
            id:"cscSuccess",
            content: msg || '成功提示',
            fixed: true,
            title: false,
            icon: 'mem-c',
            time:closeTime || 1.5,
            close:callback || null
        });
    };

});
