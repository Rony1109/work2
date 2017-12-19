/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
    
    /*
     * 以下为专题js代码
     * ......
     */
     //滚动向上
     var timers,$member=$(".member");
     if($member.find("li").length>10){
    $(".member").append($(".member").clone().find("li"));
     $(".member").hover(function(){
        clearInterval(timers);
     },function(){
        var $me=$(this).find("ul");
         timers=setInterval(function(){
            $me.animate({marginTop:-270+"px"},1000,function(){
               $me.append($me.find("li:lt(10)")); 
               $me.css("margin-top",0)
            })
        },3000)
       
     }).trigger("mouseleave");
     };
     function shade(){
        var oDiv=$("<div></div>");
            oDiv.addClass("shade").css({width:$(window).width()+"px",height:$("body").height()+"px"});
            $("body").append(oDiv);
     }
    $(".items").bind("mouseenter mouseleave click",function(e){
        var b=$(this).css("left")=="auto"?$(this).css("right").split("px")[0]:$(this).css("left").split("px")[0];
        var a=Number(b)+10
        if(e.type=="mouseenter"){
            if($(this).css("left")=="auto"){
                $(this).attr("style","right:"+a+"px;z-index:999");

            }
            else{
              $(this).attr("style","left:"+a+"px;z-index:999");
            }
           
        }
        else if(e.type=="mouseleave"){
              $(this).removeAttr("style");
        }
        else if(e.type=="click"){
            var i=$(".items").index(this);
            var LF=$(window).width()/2-$(".show").eq(i).width()/2,TP=$(".fly").offset().top-$(".show").eq(i).height()
            $(".show").eq(i).css({left:LF+"px",top:TP+"px"}).show();
            shade();
        }
    });
    //关闭按钮
    $(".close").click(function(){
        $(".show").hide();
        $(".shade").remove();
    });
    //滚动
    require("./scroll")();
    var tm;
        $(".img-scroll").CscScroll({
            Left:460,
            Right:230,
            Time:2000,
            linedUp:tm,
            Auto:true,
            Visual:4  
        });

//右侧导航
         $q = $('#fiexd');
      var fixed_num = 610;
      $(window).on('scroll',function(){
        var sT = $(this).scrollTop();
        var ua=navigator.userAgent.toLowerCase();
       var  check = function(r){return r.test(ua);}

        var isOpera = check(/opera/);
        var isIE = !isOpera && check(/msie/);
        var isIE6 = isIE && check(/msie 6/);
        if(isIE6){
          if(sT>fixed_num){
              $q.animate({
                top:$(window).scrollTop()
              },200);
  
          }else if(sT<fixed_num){
            $q.css({
              top:fixed_num
            });
          }
          return;
        }
        if(sT>fixed_num && $q.is(':not([style])')){
          $q.css({
            position:'fixed',
            top:0
          });
        }else if(sT<fixed_num && $q.is('[style]')){
          $q.removeAttr('style');

        }
      });

      $('ul>li', $q).each(function(index){
        var $me = $(this);
        $me.on('click', function(){ 
          if(index==2){
            $(window).scrollTop(0);
          }     
        });
      });
      var merchant={};
      //弹窗
      merchant.dailog =function(){
        var LF=$(window).width()/2-$(".mytable").width()/2,TP=$(window).height()/2-$(".mytable").width()/2+$(window).scrollTop();
        $(".mytable").css({left:LF+"px",top:TP+"px"}).removeClass("g-dn");
        shade();
      }
      //判断登录
       merchant.Login=function(func){
      $.get("http://api.csc86.com/api/member/islogin",function(data){
        if(data.status==true){
            merchant.dailog();
        }else{
           if(window.csc){
              $(document).unbind().bind('cscSignEd',function(){

                 func()
            });
            seajs.use('http://res.csc86.com/f=js/m/sign',function(){
                           
                            csc.checkSign();            
                        });
        }else{
            seajs.use('http://res.csc86.com/js/',function(){
                $(document).unbind().bind('cscSignEd',function(){

                 func()
            });
            seajs.use('http://res.csc86.com/f=js/m/sign',function(){
                            csc.checkSign();            
                        });
        });       
        }
        }
    },"jsonp");
             };
/*             //表单提交
      (function($){

      })(jQuery)
          $.fn.serializeJson=function(){  
            var serializeObj={};  
            var array=this.serializeArray();  
            var str=this.serialize();  
            $(array).each(function(){  
                if(serializeObj[this.name]){  
                    if($.isArray(serializeObj[this.name])){  
                        serializeObj[this.name].push(this.value);  
                    }else{  
                        serializeObj[this.name]=[serializeObj[this.name],this.value];  
                    }  
                }else{  
                    serializeObj[this.name]=this.value;   
                }  
            });  
            return serializeObj;  
        };  */

         //显示表单   
      $(".side_nav ul").delegate("li:eq(0)","click",function(){
        var $me=$(this);
        merchant.Login(function(){$me.trigger("click")});
       $(".mytable table:eq(0)").removeClass("g-dn");
      });
       $(".side_nav").delegate("li:eq(1)","click",function(){
        var $me=$(this);
        merchant.Login(function(){$me.trigger("click")});
       $(".mytable table:eq(1)").removeClass("g-dn");
      });
       $(".closed").click(function(){
        $(".mytable table").addClass("g-dn");
        $(".mytable").addClass("g-dn");
        $(".shade").remove();
       });

    
        $(".btn:eq(0)").click(function(){
          require('./serializeJson')
          $(".closed").trigger('click');
          var Json=$("form[name='shangjia']").serializeJson();
         Json['formid']=53;
         Json['subtype']="ajax";
         Json['dosubmit']="企业加入"
         if(Json['qymc']==""||Json['lxr']==""||Json['lxdh']==""){
          alert("带*的不能为空！")
          return
         }
         $.get("http://cncms.csc86.com/formguide/index.php",Json,function(data){
          if(data.status == true){
            
            alert("亲，您填写的信息提交成功！"); 
          }else{
            alert("信息提交失败！");
          }
        },"jsonp");
        })
$(".btn:eq(1)").click(function(){
          require('./serializeJson')
       $(".closed").trigger('click');
        var Json= $("form[name='geren']").serializeJson();
         Json['formid']=54;
         Json['subtype']="ajax";
         Json['dosubmit']="个人加入";
         if(Json['qymc2']==""||Json['lxr2']==""||Json['lxdh2']==""){
          alert("带*的不能为空！")
          return
         }
         $.get("http://cncms.csc86.com/formguide/index.php",Json,function(data){
          if(data.status == true){
             alert("亲，您填写的信息提交成功！");
          }else{
            alert("信息提交失败！");
          }
        },"jsonp");
      })
});
