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
        'placeholder': 'm/sea-modules/placeholder.js',
        'dialog':'m/dialog/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
  require('jquery');
    require('top');
    require('header');
    require('placeholder');
    var dialog=require('dialog');
    var bg={};
  // 弹窗功能判断 
    bg.dialogs=function(circleId){
    dialog({
       id: circleId,
       title:'',
       fixed: true,
       lock:true,
       background:"#000",
       opacity:"0.3",
       content:$("#"+circleId).html(),
       init:function(){
        var that=this;
          $('#bg-sh-subbtn').on('click',function(){
              var $this = $(this);
          if($("#name_id").val()=="")
          {
              alert("姓名不能为空！");
              return;
          }else if($("#position_id").val()==""){
              alert("职位不能为空！");
            return;
            }else if($("#TEL_id").val()==""){
              alert("联系电话不能为空！");
              return;
            }
          {
              var datas=$this.parents("form.bg-fromid").serializeArray();
              $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
                  if(data.status==true){
                  that.close();
                bg.dialogs('bg-subxinxi-list');
                }else{
                  //alert('提交失败！')
              }
            }, 'jsonp');
             }
         });
       }
      });
    }
  
  //判断用户是否注册  
      
    $("body").delegate(".final-btn-pd em","click",function(){
     $.ajax({
      url: 'http://api.csc86.com/notify/count/all/',
      dataType: 'jsonp',
      type: 'get',
      success: function(dataMsg) {
        // alert(JSON.stringify(dataMsg));
          bg.dialogs('bg-sh-xinxi');
        }
      })  
  });
    /*
     * 以下为专题js代码
     * ......
     */
     //焦点图
    $(function(){
        var rollbox = document.getElementById("rollbox"),
               rollist = document.getElementById("rollist"),
               btns = document.getElementById("btns").getElementsByTagName("span"),
               prev = document.getElementById("prev"),
               next = document.getElementById("next"),
               index = 0,
               animated = false;
               
               //点击选项 图片高亮
               function showBtn(){
                   for(var i = 0; i < btns.length; i++){
                       if(btns[i].className == "cur"){
                         btns[i].className = "";
                         break;
                         }
                       }
                       btns[index].className = "cur";
                   }
               
               //点击左右切换
               function animate(offset){
                   animated = true;
                   var time = 400;//位移总时间
                   var interval =10; //位移间隔时间
                   var speed = offset/(time/interval); //单次位移距离
                   var newLeft = parseInt(rollist.style.left) + offset;
                   function snail(){//点击时，页面缓慢移动以动画效果呈现
                       if((speed < 0 && parseInt(rollist.style.left) > newLeft) || (speed > 0 && parseInt(rollist.style.left) < newLeft)){
                           rollist.style.left = parseInt(rollist.style.left) + speed + "px";
                           setTimeout(arguments.callee,interval);
                           }else{
                                animated = false;
                                rollist.style.left = newLeft  +"px";
                                if(newLeft > -980){
                                    rollist.style.left = -4900 + "px";
                                 }
                                if(newLeft < -4900){
                                    rollist.style.left = -980 + "px";
                                 }   
                               }
                       }
                     snail();  
                   }
                 
               //点击右边按钮   
               next.onclick = function(){
                if(animated){
                    return
                } 
                   if(index == 4){
                      index = 0;
                   }else{
                       ++index;
                       }
                     
                   animate(-980);
                   showBtn();
                 }
                   
               //点击左边按钮    
               prev.onclick = function(){
                if(animated){
                    return
                } 
                   if(index == 0){
                       index = 4;
                       }else{
                            --index;
                           }   
  
                      animate(980);
                      showBtn();    
               }
               
               //点击图片选项切换
               for(var j = 0; j < btns.length; j++){
                   btns[j].onclick = function(){//此段代码优化了图片在高亮显示时容易出现的bug，即当前选项高亮时，点击事件不做任何工作
                       if(this.className == "cur"){
                          return;
                       }
                       var newIndex = parseInt(this.getAttribute("index"));
                      // alert(newIndex);
                       var offset = -980*(newIndex - index);
                       animate(offset);
                       index = newIndex;
                       showBtn();
                       //debugger;bug检测
                       }       
                   }    
            });


    $(function(){
      var nav = $("#nav"),navA = nav.find("ul>li>a"),arr = [];
      $(".navbox").each(function(){
        arr.push($(this).offset().top);
      });
      navA.on("click",function(){
        var $index = navA.index(this);
        $("html,body").animate({scrollTop:arr[$index]-120},500);
        return false;
      });
    $(window).scroll(function(){     
      /*控制导航条的显示*/
      var topscr = $(this).scrollTop();
      if(topscr >= 688){
        nav.addClass("navp");
      }else{
        nav.removeClass("navp");
      }
    });
 });


});
