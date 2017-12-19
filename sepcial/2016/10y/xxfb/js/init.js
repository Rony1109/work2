/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'jquery':'l/jquery/1.10.2/jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('jquery');
    /*
     * 以下为专题js代码
     * ......
     */
    var index={
        slide:function(index){
            var $ttx=$('.ttx').eq(index),
                $ttxLst=$ttx.find('.ttx-lst'),
                $ttxTrg=$ttx.find('.ttx-trg');
            $ttxTrg.cscSwitch($ttxLst.find('li'), {
                trigger: 'a',
                effect: 'scroll',
                currCls: 'cur',
                speed: .5
            }).carousel().autoplay(3);
        },
        menu:function () {
            var arry=[];
            var fix=$('.zt-menu');
            var fixUl=fix.find('.zt-menu-lst');
            var fixLi=fixUl.find('li');
            $('.zt-flr').each(function(){
                arry.push($(this).offset().top);
            });
            $(window).scroll(function(){
                var _top=$(this).scrollTop();
                if(_top>=arry[0]-100){
                    fix.slideDown();
                }else{
                    fix.slideUp();
                }
                for(var i=0;i<=arry.length;i++){
                    if(_top>=arry[i]&&_top<=arry[i+1]){
                        fixLi.eq(i).addClass('cur').siblings().removeClass('cur');
                    }
                    if(_top>=arry[arry.length-1]){
                        fixLi.eq(arry.length-1).addClass('cur').siblings().removeClass('cur');
                    }
                }
            });
            fixLi.find('a').on('click',function(){
                var _index=fixLi.find('a').index(this);
                $('html,body').animate({scrollTop:arry[_index]},500);
                return false;
            });
        },
        scrll:function () {
            require.async('l/cscSwitch/js/cscSwitch.js',function(){
                var $ppxf=$('.ppxf'),
                    $prev=$ppxf.find('.prev'),
                    $next=$ppxf.find('.next'),
                    $li=$('.ppxf-lst li'),
                    $a=$li.find('a'),
                    $cmpny=$('.cmpny'),
                    len=$li.length;
                if(len>0) {
                    $ppxf.cscSwitch($li, {
                        effect: 'scroll',
                        steps: 6,
                        visible: 6,
                        nextBtn: $next,
                        prevBtn: $prev
                    });
                }
                $a.hover(function(){
                    var $this=$(this),
                        n=$a.index(this);
                    $cmpny.hide().eq(n).show();
                    $a.stop(true,false).animate({width:163},300);
                    $this.stop(true,false).animate({width:342},300);
                },function(){
                    var $this=$(this);
                    $this.stop(true,false).animate({width:163},300);
                });

                $('.ttx').each(function () {
                    var $this=$(this),
                        $ttxLst=$this.find('.ttx-lst'),
                        $ttxTrg=$this.find('.ttx-trg');
                    $ttxTrg.cscSwitch($ttxLst.find('li'), {
                        trigger: 'a',
                        effect: 'scroll',
                        currCls: 'cur',
                        speed: .5
                    }).carousel().autoplay(3);
                });
            });
        },
        wybm:function () {
            var $form=$('form[name^=wybmFrm]'),
                $ttl=$form.find('.ttl'),
                $iptTxt=$form.find('.ipt-txt');
            $ttl.on('click',function () {
                $ttl.removeClass('djpptg');
                $(this).addClass('djpptg');
            })
            $iptTxt.on('focus',function(){
                var $this=$(this),
                    $span=$this.siblings('span');
                $span.hide();
            })
            $iptTxt.on('blur',function(){
                var $this=$(this),
                    $span=$this.siblings('span');;
                if($.trim($this.val())==""){
                    $span.show();
                }
            })

            $form.on('submit',function () {
                var $this=$(this),
                    $ttl=$this.find('.ttl'),
                    $smt=$this.find('input[type=submit]');
                if(!$ttl.hasClass('djpptg')){
                    alert("请先选择对应的项！");
                    return false;
                }

                $smt.attr('disabled',true).css('cursor','default');

                $.ajax({
                    type:"post",
                    url:$this.attr('action'),
                    data:$this.serializeArray(),
                    dataType:"jsonp",
                    success:function(data){
                        if (data.status == true) {
                            alert("提交成功！");
                        } else {
                            alert("提交失败，请重新填写并提交！");
                        }
                        $smt.removeAttr('disabled').css('cursor','pointer');
                        $this[0].reset();
                        $this.find('li span').show();
                    },
                    error:function(){
                        alert("提交失败，请重新填写并提交！");
                    },
                    complete:function(){
                        $smt.removeAttr('disabled').css('cursor','pointer');
                    }
                });
                return false;
            })
        },
        init:function () {
            //品牌先锋
            index.scrll();

            //导航菜单
            index.menu();

            //我要报名提交表单
            index.wybm();
        }
    };
    index.init();
});
