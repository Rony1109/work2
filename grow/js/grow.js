define(function (require, exports, module) {
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

    var usersession = getCookie('usersession');

    if (usersession != null && usersession != "") {
        //console.log(usersession);
    }else{
        //window.top.location.href="http://operate.csc86.com/login/index.html";
    }

    if( window.top == window.self ){
        $('.warpbottom').removeClass('ifrm');
        $('.close-left').removeClass('disnone');
    }


    $('.close-left').on('click',function(){
        if($('.warpbottom').is('.qp')){
            $('.warpbottom').removeClass('qp');
        }else{
            $('.warpbottom').addClass('qp');
        }
    });


    $('.menu').find('ul li').on('click',function(){
       $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
        var i=$(this).index();
        $('.gadgetcontent').find('.nk').eq(i).addClass('disshow').siblings('.nk').removeClass('disshow');
    });


    var dialog=require('//grow.csc86.com/f=v5/js/dialog/js/init.js,v5/js/config.js');
    require('//grow.csc86.com/f=v5/js/jqueryfileupload/js/vendor/jquery.ui.widget.js,v5/js/jqueryfileupload/js/jquery.iframe-transport.js,v5/js/jqueryfileupload/js/jquery.fileupload.js');//上传图片插件
    var ajaxpage=require('js/ajaxPage.js');//ajaxPage插件


$('.ckqs').on('click',function(){
    var arr=[];
        $('.sstable2 tbody').find('tr').each(function(){
            var $this=$(this);
            var $thisdataid=$this.data("id");
            var $thisdatares=$this.data("res");
            var $thisdataproname=$this.data("proname");
            var params='ids[]='+$thisdataid;
            arr.push(params)
        });

    location.href='http://grow.csc86.com/v5/qushi.grow?'+arr.join('&')
});


    if($('.echart')[0]){
        require('js/echarts.js');//echarts插件
        require("//grow.csc86.com/f=v5/bootstrap/dist/js/bootstrap.min.js,v5/js/daterangepicker/moment.min.js,v5/js/daterangepicker/daterangepicker.js");


        (function() {
                var eChart = echarts.init($('.echart')[0]);
                option = {
                    color: ['#e7c900', '#00e687', '#ee0d28', '#0015db', '#00acd7', '#cd7900', '#7000ef', '#ef00dc', '#4a4c67', '#4bb6a1', '#8376c5', '#27262b', '#e6a1ea', '#187cc3', '#ef3b8c', '#fbed72', '#50e7fd', '#2c205b', '#0c9c3f', '#547b22', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                    title: {
                        text: '商品价格趋势',
                        subtext:'(重新选择商品比价)',
                        subtarget:'self',
                        sublink: 'http://grow.csc86.com/v5/searchpro.grow',
                        subtextStyle:{color:'#337ab7'},
                        x: 'center',
                        y: 0
                    },
                    grid:{
                        left:'5%',
                        right:'5%',
                        bottom:80
                    },
                    toolbox: {
                        right:20,
                        show: true,
                        itemGap:12,
                        itemSize:20,
                        feature: {
                            myTool1: {
                                show: true,
                                title: '重新选择商品比价',
                                icon: 'image://http://grow.csc86.com/v5/img/skip.png',
                                onclick: function () {
                                   location.href='http://grow.csc86.com/v5/searchpro.grow'
                                }
                            },
                            magicType: {type: ['bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        data: [],
                        bottom:0,
                        formatter: function (name) {
                            return name.substring(0,5)+'···';
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false,
                            type: 'shadow'
                        }/*,
                        formatter: function (params) {
                            return '<span style="background: '+params[0].color+'">'+params[0].color+'</span>'+ params[0].seriesName+' : <span style="color: #ff0000">'+params[0].value+'</span>元';
                        }*/
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    },
                    series: []
                };

                eChart.setOption(option);
                eChart.showLoading();
                var locsea =location.search;
                if(locsea.indexOf('ids')<0){
                    dialog.tip('请选择商品查看趋势',3,function(){
                        location.href='http://grow.csc86.com/v5/searchpro.grow'
                    });
                }else{
                    $.post('//hacking.csc86.com/productPriceTrend'+locsea,function(data){
                        eChart.hideLoading();
                        if(data.msg){
                            var arr=[];
                            $.each(data.data,function(i){
                                var me=this;
                                arr.push((i+1)+':'+me.name);
                                me["type"]="line";
                                me["showSymbol"]=true;
                                me["hoverAnimation"]=true;
                                me["symbolSize"]=8;
                                me["name"]=(i+1)+':'+me.name
                            });

                            var option2={
                                xAxis:{data:data.date},
                                series:data.data,
                                legend:{data:arr}
                            };
                            eChart.setOption(option2);
                        }else{
                            dialog.tip(data.msg?data.msg:'暂无数据',3)
                        }
                    },'jsonp');
                }


                $('#datepicker').daterangepicker({
                    format: 'yyyy-mm-dd',
                    'minDate': '01/01/2017',
                    'maxDate': (moment(Date.now()).subtract(0, 'd')).format('MM-DD-YYYY'),
                    "startDate": moment().subtract(6,'days'),
                    "endDate": new Date(),
                    locale : {
                        applyLabel : '确定',
                        cancelLabel : '取消',
                        fromLabel : '起始时间',
                        toLabel : '结束时间',
                        customRangeLabel : '自定义',
                        daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
                        monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                            '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                        firstDay : 1
                    },
                    'ranges' : {
                        '最近1日': [moment().subtract(1,'days'), moment()],
                        '最近7日': [moment().subtract(6,'days'), moment()],
                        '最近30日': [moment().subtract(29,'days'), moment()]
                    },
                    "opens": 'left'
                },function (start, end, label) {
                    var startDate=start.format('YYYY-MM-DD');
                    var endDate=end.format('YYYY-MM-DD');

                    var locsea =location.search;
                    if(locsea.indexOf('ids')<0){
                        dialog.tip('请选择商品查看趋势',3,function(){
                            location.href='http://grow.csc86.com/v5/searchpro.grow'
                        });
                    }else{
                        eChart.showLoading();
                        $.post('//hacking.csc86.com/productPriceTrend'+locsea+'&startDate='+startDate+'&endDate='+endDate,function(data){
                            eChart.hideLoading();
                            if(data.status){
                                var arr=[];
                                $.each(data.data,function(i){
                                    var me=this;
                                    arr.push((i+1)+':'+me.name);
                                    me["type"]="line";
                                    me["showSymbol"]=true;
                                    me["hoverAnimation"]=true;
                                    me["symbolSize"]=8;
                                    me["name"]=(i+1)+':'+me.name
                                });

                                var option2={
                                    xAxis:{data:data.date},
                                    series:data.data,
                                    legend:{data:arr}
                                };
                                eChart.setOption(option2);
                            }else{
                                dialog.tip(data.msg?data.msg:'暂无数据',3)
                            }
                        },'jsonp');
                    }

                });


            }
            )();
    }



    $('.jsform').on('submit',function(){
        var $this=$(this);
        if($('.sstable').is('.disnone')){$('.sstable').removeClass('disnone')};
        var datas=$this.serialize();
        var $wplytsm= $('.sstable');
        var proxyurl = '//hacking.csc86.com/offerQuery?'+datas;
        var $pagetable=$('.sstable').find('tbody');
        var	ajaxpageurl = proxyurl;
            ajaxpage.init({
                obj:$pagetable,//必填，需要分页的内容容器（obj暂时只在无数据时用到了）
                pageObj:$('.ajax-page2'),//必填，分页容器
                isMoveTop:true,//点击分页滚动条是否移动到对应位置
                moveObj:$wplytsm,//移动到对应位置的容器
                curPage:1,//默认当前页
                nodata:'<tr><td colspan="12">暂无数据</td></tr>',//暂无数据时的html
                type:'post',//ajax请求方式
                url:ajaxpageurl,//请求的url
                pagetz:false,//是否开启输入数字跳转get
                dataObj:{pageSize:20},//ajax请求传的参数，必须为object类型,默认为null即只传递当前页page（已在下面b对象中的ajax函数中写死）
                dataType:'jsonp',//ajax请求返回的数据类型
                beforeSend:function(){//ajax请求前执行
                    //$pagetable.html('<tr><td colspan="8">数据加载中···</td></tr>');
                },
                content:function(data){//处理内容循环函数，只有当返回的status时为1时才会执行到此处，所以在此处无需判断status是否为1了
                    var html='';
                    $.each(data.data,function(i,n){
                        var me=this;
                        html+='<tr>\
                <td>'+me.productName+'</td>\
                <td>'+me.brand+'</td>\
                <td>'+me.sku+'</td>\
                <td>'+me.price+'</td>\
                <td>'+me.taux+'</td>\
                <td>'+me.invoice+'</td>\
                <td>'+me.surrName+'</td>\
                <td>'+me.linkman+'</td>\
                <td>'+me.linkPhone+'</td>\
                <td>'+me.deliveryTime+'</td>\
                <td>'+me.payStatus+'</td>\
                <td>'+me.employee+'</td>\
                </tr>';
                    });
                    $pagetable.html(html);
                }
            });



        return false;
    });

    var oidarr=[];

    function removeArray(arr, val) {
        var index = $.inArray(val, arr);
        if (index >= 0){
            arr.splice(index, 1);
        }

    };

    $('.sstable').on('click','input[name="xzk[]"]',function(){
        var $this=$(this);
        var $thisval=$this.val();
        var $thisoid=$this.parents('tr').data("oid");
        var $thisres=$this.parents('tr').data("res");
        var $thisproname=$this.parents('tr').data("proname");
        if($this.is(':checked')){
            oidarr.push($thisval);
            var html='<tr data-id="'+$thisval+'" data-res="'+$thisres+'" data-proname="'+$thisproname+'">';
            $this.parents('tr').find('td').each(function(i){
                var $this=$(this);
                if(i!==0){
                    html+=$this.prop("outerHTML");
                }
            });
            html+='</tr>';
            var oidlen=$('.sstable2').find('tbody[data-oid='+$thisoid+']').length;
            if(oidlen){
                $('.sstable2').find('tbody[data-oid='+$thisoid+']').append(html);
            }else{
                $('.sstable2').append('<tbody data-oid='+$thisoid+'>'+html+'</tbody>');
            }

        }else{
            removeArray(oidarr,$thisval);
            $('.sstable2').find('tr[data-id='+$thisval+']').remove();
        }

        if(oidarr.length){
            if($('.yxz').is('.disnone')){$('.yxz').removeClass('disnone')};
        }else{
            $('.yxz').addClass('disnone')
        };

    });


    $('.jsform2').on('submit',function(){
        var $this=$(this);
        if($('.sstable').is('.disnone')){$('.sstable').removeClass('disnone')};
        $('.yxz').addClass('disnone');
        $('.sstable2').find('tbody').find('tr').remove();
        var datas=$this.serialize();
        var $wplytsm= $('.sstable');
        var proxyurl = '//hacking.csc86.com/productQuery?'+datas;
        var $pagetable=$('.sstable').find('tbody');
        var	ajaxpageurl = proxyurl;
        ajaxpage.init({
            obj:$pagetable,//必填，需要分页的内容容器（obj暂时只在无数据时用到了）
            pageObj:$('.ajax-page2'),//必填，分页容器
            isMoveTop:true,//点击分页滚动条是否移动到对应位置
            moveObj:$wplytsm,//移动到对应位置的容器
            curPage:1,//默认当前页
            nodata:'<tr><td colspan="8">暂无数据</td></tr>',//暂无数据时的html
            type:'post',//ajax请求方式
            url:ajaxpageurl,//请求的url
            pagetz:false,//是否开启输入数字跳转
            dataObj:{pageSize:10},//ajax请求传的参数，必须为object类型,默认为null即只传递当前页page（已在下面b对象中的ajax函数中写死）
            dataType:'jsonp',//ajax请求返回的数据类型
            beforeSend:function(){//ajax请求前执行
                //$pagetable.html('<tr><td colspan="8">数据加载中···</td></tr>');
            },
            content:function(data){//处理内容循环函数，只有当返回的status时为1时才会执行到此处，所以在此处无需判断status是否为1了
                var html='';
                $.each(data.data,function(i,n){
                    var me=this;
                    var checked=$('.sstable2').find('tr[data-id="'+me.id+'"]').length?' checked="checked"':'';
                    html+='<tr data-oid="'+me.resourceOrder+'" data-res="'+me.resource+'" data-proname="'+me.productName+'">\
                <td><input type="checkbox" name="xzk[]" value="'+$.trim(me.id)+'"' +checked+'></td>\
                <td><a href="'+me.productUrl+'" target="_blank">'+decodeURIComponent(me.productName)+'</a></td>\
                <td>'+decodeURIComponent(me.brand)+'</td>\
                <td>'+decodeURIComponent(me.specification)+'</td>\
                <td>'+decodeURIComponent(me.unit)+'</td>\
                <td>'+decodeURIComponent(me.material)+'</td>\
                <td>'+me.priceRemark+'</td>\
                <td>'+decodeURIComponent(me.resourceName)+'</td>\
                </tr>';
                });
                $pagetable.html(html);
            }
        });

        return false;
    });




    $('.jsallbox').on('click',function(){
        var $this=$(this);
        if($this.is(':checked')){
            $this.parents('.chbwk').find('input[name="resource[]"]').prop('checked',true)
        }else{
            $this.parents('.chbwk').find('input[name="resource[]"]').prop('checked',false)
        }
    });

    $('input[name="resource[]').on('click',function(){
        var arr=[];
        $('input[name="resource[]').each(function(){
            var $this=$(this);
            if($this.is(':checked')){
                arr.push(true);
            }else{
                arr.push(false);
                return false;
            }
        });
        if($.inArray(false,arr)<0){
            $('.jsallbox').prop('checked',true);
        }else{
            $('.jsallbox').prop('checked',false);
        };
    });



    var upload = function(obj){
        var loading;
        obj.each(function(){
            var $this=$(this);
            $this.fileupload({
                dataType:'json',
                url:obj.data("url"),
                formData:function(){//指定上传的参数
                    var dataObj={};
                    return dataObj;
                },
                progressall:function(e,data){
                    dialog.loading('文件正在上传中，请稍后...');
                },
                add:function(e,data){
                    var fileInfo=data.files[0],
                        regx=/(\.|\/)(xlsx?)$/i,
                        fileName=fileInfo.name,
                        fileSize=fileInfo.size;
                    if(!regx.test(fileName)){
                        dialog.tip('仅持xls、xlsx格式文件，请选择正确的文件格式！',2);
                        return false;
                    }else{
                        if(fileSize>1024*1024*30){

                            dialog.tip('文件大小不得超过30M！',2);
                            return false;
                        }else{

                            data.submit();
                        }
                    }
                },
                done:function(e,data){
                    console.log(obj.data("url")+'/'+usersession);
                    art.dialog({id:"cscLoading"}).close();

                    if(data.result.status=='1'){
                        dialog.tip(data.result.msg?data.result.msg:'上传成功！',3,function(){$('.menu li').eq(1).trigger('click')});
                    }else{

                        dialog.tip(data.result.msg?data.result.msg:'上传失败，请稍后重试！',9999);
                    }
                },
                fail:function(e,data){
                    art.dialog({id:"cscLoading"}).close();
                    dialog.tip(data.result?data.result.msg:'上传失败，请稍后重试！',3);
                }
            });
        });
    };

    upload($('.fileUploadBtn'));

    var lefthtml= '<li><a href="http://grow.csc86.com/v5/gadget.grow"><span class="glyphicon glyphicon-list"></span>供应商报价信息检索</a></li>\
        <li><a href="http://grow.csc86.com/v5/searchpro.grow"><span class="glyphicon glyphicon-list"></span>商品比价搜索</a></li>\
        <li><a href="http://grow.csc86.com/v5/qushi.grow"><span class="glyphicon glyphicon-list"></span>商品价格趋势</a></li>\
        <li><a href="http://grow.csc86.com/v5/inquiry.grow"><span class="glyphicon glyphicon-list"></span>上传询价单</a></li>\
        <li><a href="logStatistic.html"><span class="glyphicon glyphicon-list"></span>列表五</a></li>';
    $('.warpbottom').find('.left ul').append(lefthtml);

});