define(function(require, exports, module) {
    var inVisible={
        options:{
            container:$(window)//目前元素上下左右位置对比的元素，后面称为父元素
        },
        isIn:function(options){
            var opts={
                targetE:$('img').eq(0)//单个目标元素
            }
            opts=$.extend({},inVisible.options,opts,options);
            var $window=$(window);
            var $targetE=opts.targetE;//目标元素
            var $container=opts.container;//获取父元素
            var eWidth=$targetE.width();//目标元素的宽
            var eHeight=$targetE.height();//目标元素的高
            var eTop=$targetE.offset().top;//目标元素与文档顶部的距离
            var eLeft=$targetE.offset().left;//目标元素与文档左侧的距离
            var pWidth=$container.innerWidth();//获取父元素的宽
            var pHeight=$container.innerHeight();//获取父元素的高
            var pTop,pLeft,posT,posB,posL,posR;

            //获取水平父元素相对于文档顶部左侧的距离，分为以下两种情况；
            if($container[0]==$window[0]){
                pTop=$container.scrollTop();
                pLeft=$container.scrollLeft();
            }else{
                pTop=$container.offset().top;
                pLeft=$container.offset().left;
            }

            //对象顶部与文档顶部之间的距离，如果它小于垂直父元素底部与文档顶部的距离，则说明垂直方向上已经进入可视区域了；
            posT = eTop - (pTop + pHeight);
            //对象底部与文档顶部之间的距离，如果它大于垂直父元素顶部与文档顶部的距离，则说明垂直方向上已经进入可视区域了；
            posB = eTop + eHeight - pTop;

            // 水平方向上同理；
            posL = eLeft - (pLeft + pWidth);
            posR = eLeft + eWidth - pLeft;

            // 只有当这个对象是可视的，并且这四个条件都满足时，才能给这个对象赋予图片路径；
            if ( $targetE.is(':visible') && (posT < 0 && posB > 0) && (posL < 0 && posR > 0) ) {
                return true;
            }else{
                return false;
            }
        },
        lazyLoad:function(options){//有待扩展开发
            var opts={
                elements:$('img'),//标签名、类名、id 选择器
                excludeE:null,
                eventType:'scroll',
                dataAttr:'data-original',
                placeholder:"//res.csc86.com/v2/m/init/image/1.gif",
                isProga:false //新增变量，商品曝光埋点需要用到
            };
            opts=$.extend({},inVisible.options,opts,options);
            var $window=$(window);
            var $container=opts.container;//获取集合父元素
            var $elements=opts.elements;//需要懒加载的元素集合,也可能只有一个
            var $excludeE=opts.excludeE;//排除哪些元素
            var eventType=opts.eventType;//事件类型
            var dataAttr=opts["dataAttr"];
            var placeholder=opts.placeholder;
            var isProga=opts.isProga;
            var mdArry=[],mdObj={},mdArry1=[],mdArry2=[],mdArry3=[];//新增变量，商品曝光埋点需要用到
            var lazyLoadNum=0;//新增变量，商品曝光埋点需要用到
            var numRegx=/^\d+$/;

            if($excludeE){
                $elements=$elements.not($excludeE);
            }

            var loading=function(){
                mdArry=[],mdArry2=mdArry1,mdArry1=[],mdArry3=[],mdObj={};

                $elements.each(function() {
                    var $this = $(this),
                        url = $this.attr(dataAttr),
                        left = $this.offset().left,
                        top = $this.offset().top;

                    var isInVisible=inVisible.isIn({
                        targetE:$this,
                        container:$container
                    });

                    if ($this.is('img') && ($this.attr("src") === undefined || $this.attr("src") === false)) {
                        $this.attr("src", placeholder);
                    }

                    $this.one('appear',function(){
                        if(url){
                            if($this.is('img')){
                                $this.attr(src,url);
                                $this.removeAttr(dataAttr);
                            }else{
                                $this.css("background-image", "url("+ url +")");
                            }
                        }
                    });

                    $this.on("inGa", function() {
                        //获取到达可视区域的商品id,根据以下条件来判断是否为商品
                        if(isProga && ($this.attr('data-proid')||$this.parents('a[href*="product"]:first')[0] || $this.parents('a[href*="detail"]:first')[0])){
                            var proHref='';
                            var proId=$this.attr('data-proid') || '';
                            if(proId){
                                mdObj[proId +'|'+left+'|'+top] = proId;
                            }
                            else {
                                proHref=$this.parents("a:first").attr('href');
                                if(proHref.indexOf('.html')>=0) {
                                    proId = $.trim(proHref.replace(/(.*\/)*([^.]+).*/ig, "$2"));
                                    if (numRegx.test(proId)) {
                                        mdObj[proId +'|'+left+'|'+top] = proId;
                                        //mdObj[''+proId]=proId;//将当前可视区域产品的商品id设为mdObj对象的属性，以防重复
                                    }
                                }
                            }
                        }
                    });

                    $this.on("outGa",function(){
                        //获取离开可视区域的商品id,根据以下条件来判断是否为商品
                        if(isProga && ($this.attr('data-proid')||$this.parents('a[href*="product"]:first')[0] || $this.parents('a[href*="detail"]:first')[0])){
                            var proHref='';
                            var proId=$this.attr('data-proid') || '';
                            if(proId){
                                mdArry3.push(proId+'|'+left+'|'+top);
                            }
                            else {
                                proHref=$this.parents("a:first").attr('href');
                                if(proHref.indexOf('.html')>=0){
                                    proId=$.trim(proHref.replace(/(.*\/)*([^.]+).*/ig,"$2"));
                                    if(numRegx.test(proId)){
                                        mdArry3.push(proId+'|'+left+'|'+top);
                                    }
                                }
                            }
                        }
                    });

                    if($this.is(':visible') && isInVisible){
                        $this.trigger('appear');
                        if(isProga){
                            $this.trigger('inGa');
                        }
                    }else{
                        if(isProga){
                            $this.trigger('outGa');
                            for(var i=0;i<mdArry3.length;i++){
                                var farMdIndex=mdArry2.indexOf(mdArry3[i]);
                                if(farMdIndex>=0){
                                    mdArry2.splice(farMdIndex,1);
                                }
                            }
                        }
                    }
                });

                /*
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
            };

            //加载完毕即执行
            $(document).ready(function() {
                loading();
            });

            //调整窗口大小
            if($container[0]==$window[0]){
                $window.bind("resize", function() {
                    loading();
                });
            }

            //事件执行
            if(eventType.indexOf("scroll")===0){
                $container.on(eventType, loading);
            }
        }
    };
    module.exports=inVisible;
});