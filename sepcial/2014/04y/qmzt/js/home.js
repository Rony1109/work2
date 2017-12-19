$(function(){
	$.get(csc.url("api","/member/isLogin.html"),function (data){
			if(data.status){
				$.get(csc.url("api","/member/messagecount.html"),{type:"json"},function (dataMsg){
					$("div.top-sign-info").find("span.bd").html('<a href="http://member.csc86.com/" target="_blank" rel="nofollow">'+data.data.userName+'</a>！消息<a class="top-msg-num" href="http://member.csc86.com/membercenter/messageall/" target="_blank" rel="nofollow">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="http://member.csc86.com/login/logout" rel="nofollow">退出</a>');
				},"jsonp");
			}else{
				$("div.top-sign-info").find("span.bd").html('欢迎光临华南城网！ <a rel="nofollow" href="http://member.csc86.com/login/phone/" class="tit">登录</a><span class="v-line"></span><a rel="nofollow" target="_blank" href="http://member.csc86.com/register/phonereg">免费注册</a>');
			}
	},"jsonp");	


	var i=0,len=$(".nav li").length;
	//鼠标悬停
    $(".nav li").mouseover(function(){
    	i=$(".nav li").index(this);
    	$(this).addClass("cur").siblings().removeClass("cur")
    	_tab(i);
    });
    //左侧按钮
    $(".btn_left").click(function(){
    	if(i==0){return}
    	i-=1;
    	$(".nav li").eq(i).trigger("mouseover");
    });
    //右侧按钮
    $(".btn_right").click(function(){
    	if(i==len-1){return}
    	i+=1;
    	$(".nav li").eq(i).trigger("mouseover");
    });
    function _tab(n){
    	$(".list li").eq(i).addClass("cur").siblings().removeClass("cur");
    	$(".img_show a").eq(i).addClass("cur").siblings().removeClass("cur");   
    	if(n!=0){
    		$(".btn_left").addClass("btn_cur");
    	}
    	else{
    		$(".btn_left").removeClass("btn_cur");
    	}
    	if(n==len-1){
    		$(".btn_right").removeClass("btn_cur");
    	}
    	else{
    		$(".btn_right").addClass("btn_cur");
    	}	
    }
     $(".pic_wall li").each(function(){
     	$(this).find("span").css("width",$(this).width()+"px");
     	$(this).hover(function(){
    	var HT=$(this).height()-20,WH=$(this).width()-20;
    	$(this).find("div").show().css({height:HT+"px",width:WH+"xp"});
    	$(this).find("span").hide();
    },function(){
    	$(this).find("div").hide();
    	$(this).find("span").css("display","block");
    });
     });
     var bac=["#fd832a","#c8834c","#4895ee"]
     $(".hj_nav li").each(function(i){
     	$(this).mouseover(function(){
     		$(this).addClass("cur").siblings().removeClass("cur")
     		$(".hj_list > ul").eq(i).addClass('cur').siblings().removeClass("cur")
     		$(".hj_list").css("background",bac[i])
     	})
     });

      $q = $('#fiexd');
      var fixed_num = 610;
      $(window).on('scroll',function(){
        var sT = $(this).scrollTop();
        if($.browser.msie&&$.browser.version==6.0){
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
      var nav_bck=["#8d663b","#3399ff","#36b26a","#333","#ffc000"]
      $('ul>li', $q).each(function(index){
        var $me = $(this);
        $me.hover(function(){
          $(this).css("background",nav_bck[index]);
        },function(){
          $(this).css("background","#333");
        })
        $me.on('click', function(){ 
          if(index==4){
            $(window).scrollTop(0);
          }
          else{
            $(this).addClass('active').siblings().removeClass('active');
          }         
        });
      });
	  
	 //左移动
	$(".info-to .scr-l").click(function(){
		left_right("div.info-to","1");
	});
	//右移动
	$(".info-to .scr-r").click(function(){
		left_right("div.info-to","2");
	});
	 //赞
	$("a.linksx[data-topic]").each(function(index, element){
		var o = $(this),id=o.attr("data-topic") || "000";
		$.get("http://quan.csc86.com/interface/hldlikeCount",{"topicId":id},function(data){
			o.text("上香("+data.code+")");
		},"jsonp");
		o.on("click",function(){
			$.get(csc.url("quan","/likeB.html?topicId="+id),function(data){
				if("sns_likeTopic_000"==data.code){
					o.text(data.desc);
				}else if("login_fail"==data.code){
					seajs.use(csc.url("res","/f=js/m/sign"),function(){
						csc.checkSign("location.reload()");
					});
				}else if("sns_likeTopic_001"==data.code){
					csc.useDialog(function(){csc.alert("上香过了！");});
				}else{
					csc.useDialog(function(){csc.alert(data.desc);});
				}
			},"jsonp");
			return false;
		})
	}); 
	  
});

//轮播
var left_right=function(tag,un){
	var $ul=$(tag).find(".scr-all"),
		$w=$ul.find("ul:first").width();
	if(!$ul.is(":animated")){
		if(un==1){
			$ul.animate({
				left:-$w
			},300,function(){
				$ul.css({left:"0px"}).find("ul:first").appendTo($ul);});
		}else{
			$ul.css({left:-$w}).find("ul:last").prependTo($ul);
			$ul.animate({
				left:0
			},300);
		}
	}
}

function addFavourite(url,title){
    function findKeys(){
        var isMSIE=/*@cc_on!@*/false;
        var ua=navigator.userAgent.toLowerCase(),isMac=(ua.indexOf("mac")!=-1),isWebkit=(ua.indexOf("webkit")!=-1),str=(isMac?"Command/Cmd":"CTRL");
        if(window.opera&&(!opera.version||(opera.version()<9))){str+=" + T"}
        else{
            if(ua.indexOf("konqueror")!=-1){str+=" + B"}
            else{if(window.opera||window.home||isWebkit||isMSIE||isMac){str+=" + D"}else{str+=" + D"}}
        }
        return str
    }
    try{
        if(document.all){window.external.addFavorite(url,title)}
        else{
            if(window.sidebar){window.sidebar.addPanel(title,url,"")}
            else{alert("浏览器不支持自动添加收藏夹。关闭本对话框后，请您手动使用组合快捷键'"+findKeys()+"'进行添加。")}
        }
    }catch(e){
        alert("浏览器不支持自动添加收藏夹。关闭本对话框后，请您手动使用组合快捷键'"+findKeys()+"'进行添加。")
    }
}

  function SetHomepage(url)  
      {  
         //如果url为空，默认为当前页面url。  
         if(!url)  
         {  
            url=document.URL;  
         }  
  
         if (document.all)//IE  
         {  
            document.body.style.behavior = 'url(#default#homepage)';  
            document.body.setHomePage(url);  
         }  
         else if (window.sidebar)//火狐  
         {  
            if (window.netscape)  
            {  
               try  
               {  
                  window.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
               }  
               catch (e)  
               {  
                  alert("此操作被浏览器拒绝！请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]的值设置为'true',双击即可。");  
               }  
            }  
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);  
            prefs.setCharPref('browser.startup.homepage', url);  
         }  
         else{
            alert("浏览器为开通此功能");
         }
      }  
