/**
* @说明
* AnimateDom--要执行动画的子元素
* Direction--动画滚动距离
* Time--时间间隔
* linedUp--列队名称
* Visible--列队中可视元素数量
* $(".mytabel").TextSCroll({
        AnimateDom:"tr:first",
        Direction:{marginTop:"-22px"},
        Time:2000,
        OnlineName:txTime,
        Visible:3
    });
*/
define(function(require, exports, module) {
        jQuery.fn.TextSCroll=function(data){
        var $me=$(this),_child=data.AnimateDom.split(":")[0],flag=true;
            $(this).undelegate().delegate($me,"mouseenter mouseleave onload",function(e){
                if(e.type=="mouseenter"){
                   clearInterval(data.OnlineName);
               }
               else if(e.type=="mouseleave"){
                  if($me.find(_child).length>data.Visible){
                     if(flag==true){$me.append($me.clone().find(_child));};
                     flag=false;
                data.OnlineName=setInterval(function(){
                    $me.stop().animate(data.Direction,500,function(){
                        $me.append($me.find(data.AnimateDom));
                        if(data.Left==true){
                            $me.css("margin-left",0)
                        }else{
                            $me.css("margin-top",0)
                        }
                    })
                },data.Time);
              }
            }    
        }).trigger("mouseleave");
    }
})