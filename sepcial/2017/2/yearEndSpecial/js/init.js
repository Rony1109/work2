/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'echarts': 'l/echarts/echarts.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');
    require('jquery');
    require('echarts');
    /*
     * 以下为专题js代码
     * ......
     */

     $(function(){
        var index = {
            charts: function(){
                $.ajax({
                    url: './js/option.json',
                    type: 'get',
                    dataType: 'json',
                    success: function(data){
                        var option = data;
                        console.log(data);
                        function showCharts(id, obj){
                            // 基于准备好的dom，初始化echarts实例
                            var myChart = echarts.init(document.getElementById(id));
                            myChart.setOption(obj);
                        }
                        showCharts('hardware1', option.hardware1[0]);
                        showCharts('hardware2', option.hardware2[0]);
                        showCharts('hardware3', option.hardware3[0]);
                        showCharts('hardware4', option.hardware4[0]);
                        showCharts('wjfbtPie', option.pie[0]);

                        function tabEchars(sel,bgcolor,echartsBox,arr){
                            $(sel).find('li').on('click', function(){
                                var $this = $(this),
                                    $index = $this.index();
                                $this.addClass(bgcolor).siblings().removeClass(bgcolor);
                                switch($index){
                                    case 0:
                                        showCharts(echartsBox, arr[0]);
                                        break;
                                    case 1:
                                        showCharts(echartsBox, arr[1]);
                                        break;
                                    case 2:
                                        showCharts(echartsBox, arr[2]);
                                        break;
                                    case 3:
                                        showCharts(echartsBox, arr[3]);
                                        break;
                                    default:
                                        return;
                                }
                            });
                        }
                        tabEchars('.hardware-sub1','hardware-bgcolor', 'hardware1', option.hardware1);
                        tabEchars('.hardware-sub2','hardware-bgcolor','hardware2', option.hardware2);
                        tabEchars('.hardware-sub3','hardware-bgcolor', 'hardware3', option.hardware3);
                        tabEchars('.hardware-sub4','hardware-bgcolor', 'hardware4', option.hardware4);
                    }
                });
            },
            nav: function(){
                var navContainer = $('.nav-container'),
                    navBox = $('.navbox'),
                    navBtn = navContainer.find('ul').find('li'),
                    arrTop = [];
                navBox.each(function(){
                    arrTop.push($(this).offset().top-240);
                });
                //console.info(arrTop);
                $(window).scroll(function(){
                    var topOffset = $(this).scrollTop();
                    topOffset >= 720 ? navContainer.addClass('nav-fixed') :navContainer.removeClass('nav-fixed');
                });
                navBtn.on("click", function(){
                    var $this = $(this),
                        $index = $this.index();
                        $this.addClass('hover').siblings().removeClass('hover');
                    $('html,body').animate({scrollTop: arrTop[$index]}, 500);
                    return false;
                })
            },
            articleTab: function(){
                function switchArt(class1, class2){
                        var switchBtn = $(class1).find(class2);
                        var items = $(class1 + " .trend-box").find('.trend-con');
                        var hideHeight = items.height();
                        var title1 = items.eq(0).find('h3 a').html();
                        var title2 = items.eq(1).find('h3 a').html();
                        var isTurn = true;
                        //console.log(hideHeight);
                        switchBtn.on("click", function() {
                            if (isTurn) {
                                $(class2).html(title1);
                                items.eq(1).animate({"top": 0}, 300);
                                items.eq(0).css({"top": hideHeight + "px"})
                                isTurn = false;
                            } else {
                                $(class2).html(title2);
                                items.eq(0).animate({"top": 0}, 300);
                                items.eq(1).css({"top": hideHeight + "px"});
                                isTurn = true;
                            }
                        });
                    }
                    switchArt('.handwareIndustry', '.hardware-turn');
                    switchArt('.tin', '.tin-turn');
                    switchArt('.textile', '.textile-turn');
                    switchArt('.leather', '.leather-turn');
                },
            init: function(){
                    index.charts(); //图表及tab切换
                    index.nav(); //顶部导航效果
                    index.articleTab(); //文章切换
                }
            };
         index.init();
        });
     });
