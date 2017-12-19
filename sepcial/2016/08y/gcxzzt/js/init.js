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
  <!-- 弹窗功能判断 -->
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
  
  <!--判断用户是否注册 -->  
      
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
    //轮播
    var left_right = function(tag, un) {
        var $ul = $(tag).find("ul"),
            $w = $ul.find("li:first").width();
        if (!$ul.is(":animated")) {
            if (un == 1) {
                $ul.animate({
                    left: -$w
                }, 300, function() {
                    $ul.css({
                        left: "0px"
                    }).find("li:first").appendTo($ul);
                });
            } else {
                $ul.css({
                    left: -$w
                }).find("li:last").prependTo($ul);
                $ul.animate({
                    left: 0
                }, 300);
            }
        }
    }
    //轮播
    var timer;
    $('.showIntervalBox').mouseenter(function() {
        clearInterval(timer);
    }).mouseleave(function() {
        var $th = $(this);
        timer = setInterval(function() {
            left_right($th, "1");
        }, 3000);
    }).trigger("mouseleave");
});
