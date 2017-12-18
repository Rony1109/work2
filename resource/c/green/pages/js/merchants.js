/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
    var slide = require('slide');
  new slide(".J-slide ul",".J-slide ul>li",{
        slideWidth: 500,
        slideHeight:260, 
        slideDirection: 0,
        slides_xssm:1,
        slideSeries:1,
        zantin: true,
        slides_auto_span : 6000,
        slideButs : '.J-slide>ol', //切换按钮容器，样式自定义
        slideButs_html : function(i){return "<li>"+i+"</li>";}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
        slideButs_bindsj : "mouseover",
        slideButs_selectclass : "cur",
        slides_controller: '.J-slide>ol',
        slides_fun:slide.definedfun
    });
    var merchant={};
    //遮罩
    merchant.shade=function(){
       var $dom=$("<div>")
       $dom.addClass("dailog-shade")
       $dom.css({height:$("body").height()+"px",width:$(window).width()+"px"});
        $("body").append($dom);
    }
    //判断登录包含多版本控制
    merchant.Login=function(func,title){
              $.get("//api.csc86.com/api/member/islogin",function(data){
        if(data.status==true){
            merchant.FixDialog(title);
        }else{
           if(window.csc){
              $(document).unbind().bind('cscSignEd',function(){
                 func()
            });
            seajs.use('//res.csc86.com/f=js/m/sign',function(){
                           
                            csc.checkSign();;            
                        });
        }else{
         
            seajs.use('//res.csc86.com/js/',function(){
                $(document).unbind().bind('cscSignEd',function(){
                 func()
            });
            seajs.use('//res.csc86.com/f=js/m/sign',function(){
                           
                            csc.checkSign();;            
                        });
        });       
        }
        }
    },"jsonp");
    }
    //弹出框
    merchant.FixDialog=function(title){
       var $d=$(".dailog")
       var LF=$(window).width()/2-$d.width()/2,TP=$(window).height()/2-$d.height()/2+$(window).scrollTop();
       $d.find("h2").text(title);
       $d.css({display:"block",left:LF+"px",top:TP+"px"});
      merchant.shade()
      
       var scl=null;
       $(window).unbind().bind("scroll resize",function(){
        if($d.is(":visible")){
            if(scl!=null){
                clearTimeout(scl);     
            }
            scl=setTimeout(function(){
                TP=$(window).height()/2-$d.height()/2+$(window).scrollTop()
                $d.css({left:LF+"px",top:TP+"px"});
            },400);
          }
       });
       $(".close").unbind().bind("click",function(){
        $d.hide();
        $(".dailog-shade").remove();
       });
   }
   //加盟
    $(".boutique-btn").delegate("span[title='我要加盟']","click",function(){
        var $me=$(this);
         var _name=$me.attr("name")
        $("#item").val(_name+'-我要加盟');
        $me.addClass("join-click");
        merchant.Login(function(){merchant.FixDialog("我要加盟")},"我要加盟");
    });
    //加盟详情
    
     $(".join").delegate("span[title='我要加盟']","click",function(){
        var $me=$(this);
         var _name=$me.attr("name")
        $("#item").val(_name+'-我要加盟');
        $me.addClass("join-click");
        merchant.Login(function(){merchant.FixDialog("我要加盟")},"我要加盟");
    });
    //考察
    $(".boutique-btn").delegate("span[title='我要考察']","click",function(){
        var $me=$(this);
        var _name=$me.attr("name")
        $("#item").val(_name+'-我要考察');
        merchant.Login(function(){merchant.FixDialog("我要考察")},"我要考察");
    });
//认证
    $(".main-btn").delegate("span[title='我要认证']","click",function(){
        var $me=$(this);
        $("#item").val('我要认证');
        merchant.Login(function(){merchant.FixDialog("我要认证")},"我要认证");
    });
//招商
    $(".main-btn").delegate("span[title='我要招商']","click",function(){
        var $me=$(this);
        $("#item").val('我要招商');
        merchant.Login(function(){merchant.FixDialog("我要招商")},"我要招商");
  
    });

    //表单验证
    $("#myform").delegate("input[type='button']","click",function(){
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
        };  
        var reg=/(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        if($("#name").val()==""){
            alert("请填写您的真实姓名！");
            $("#name")[0].focus();
        }
        else if(reg.test($("#tel").val())==false){
            alert("请填写您的真实电话号码！")
             $("#tel")[0].focus();
        }
        
        else{
            var _Json=$("form[name='myform']").serializeJson();
            $.get('/index.php?m=formguide&c=index&a=show&formid=17&action=js&siteid=1&ajax=1',_Json,function(data){
              switch(data.stutas){
                case true:
                $(".close").trigger("click");
                $("form[name='myform']").get(0).reset();
                alert("提交成功！")
                break;
                case false:
                alert("提交失败！")
                break;
              }
            },'jsonp'); 
    }
   
});
 $("textarea").attr("maxlength","250");
     $("#myform").delegate("textarea","keyup",function(e){  
        console.log($(this).val().length)
        var _val=$(this).val();
        if($(this).length>250){
           e.returnValue=false;
        }
    })
});