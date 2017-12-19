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
        'jquery':'l/jquery/1.10.2/jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');
    require('jquery');
    /*
     * 以下为专题js代码
     * ......
     */

     //各行业PK榜图文切换
     $(function(){
        function changeCon(a){
            var ulBox = [];
            var tinLi = $(a).find(".company").find("li");
            $(a + " .ul-box").each(function(){
                ulBox.push($(this));
            });
            //alert(ulBox);
            tinLi.hover(function(){ 
            var $index = tinLi.index(this);
                $(this).css("background-color","#03283D")
                ulBox[$index].show();
                ulBox[$index].siblings().hide();
            },function(){
                $(this).css("background-color","#00101A")
            });
        }
        changeCon(".tin-ranking");
        changeCon(".tex-lea");
        changeCon(".non-woven");
     });

     //查看更多商家排行
     $(function(){
          function moreCompany(id){
            var more = $(id);
            var moreh = $(id).find("h1");
            var moreUl = $(id).find("ul");
            moreh.on("click",function(){
                if(moreh.html() !== "收&nbsp;&nbsp;&nbsp;起&nbsp;&nbsp;-"){
                moreUl.slideDown();
                moreh.css({"background-color":"#193666"});
                moreh.html("收&nbsp;&nbsp;&nbsp;起&nbsp;&nbsp;-");
              }else{
                moreUl.slideUp();
                moreh.css({"background-color":"#00101A"});
                moreh.html("查看更多商家排行&nbsp;&nbsp;+");
              }
            });
          }
          moreCompany("#more");
          moreCompany("#more-1");
     });

     // 倒计时
     $(function(){
         var time = {
            init:function(){
                var deadTime = new Date('2016/07/31 00:00:00'),
                    startTime = new Date(),
                    times = null,
                    totalTime = deadTime.getTime()-startTime.getTime(),
                    day = Math.floor(totalTime/1000/60/60/24),
                    hour = Math.floor(totalTime/1000/60/60%24),
                    minutes = Math.floor(totalTime/1000/60%60),
                    seconds = Math.floor(totalTime/1000%60);
                    if(day<10){
                        day = "0" + day;
                    }
                    if(hour<10){
                        hour = "0" + hour;
                    }
                    if(minutes<10){
                        minutes = "0" + minutes;
                    }
                    if(seconds<10){
                        seconds = "0" +seconds;
                    }
                    $("#day").html(day);  
                    $("#hour").html(hour);  
                    $("#minutes").html(minutes);  
                    $("#seconds").html(seconds);
                   clearTimeout(times); 
                   if(totalTime <= 0){
                      clearTimeout(times);
                   }else{
                      times = setTimeout(time.init,1000);
                   } 

            }
         }
         time.init()
     });
});
