/*copyright by zzjwd!QQ:550703900; */
$().ready(function(){
	//pulbic js;

	//rintingList js start;
	doCurrentHref("/",function(){

		mapAutoMove($(".tab"),$(".tc"),$(".mapc span"),"curLi",3000,1000,0.1,1);
		setJcDiv();
		jcar(".jcar");

		isLogin('span.bd','isLogin.html','messagecount.html');
		//底部更多
		$(".links-down").click(function(){
            if($(this).siblings('span').height()<30){
                $(this).css("background-position","31px -10px").siblings('span').height(44);
            }
            else{
                $(this).css("background-position","31px 6px").siblings('span').height(22);
            }
            
        });

		
	});//rintingList end;
	/*
 copyright by zzjwd!QQ:550703900;
 */
	
});

function jcar(obj){
	$(obj).jCarouselLite({
		auto:800,
		speed:800,
		vertical:true
});
}


function mapAutoMove(o1,o2,o3,c,t1,t2,a,b){
		var count=o1.size()-1;
		//alert(count);
		var now;
		var TimeInterval;
		o1.each(function(i){
			$(this).mouseover(function(){
				$(".mapc span").show().eq(i).hide();
				o2.hide().eq(i).show();
				
				o1.removeClass(c);
				resetImg(o1);
				$(this).attr("src","//res.csc86.com/css/c/ksihome/images/map0"+i+"o.jpg");
				$(this).addClass(c);
				window.clearInterval(TimeInterval);
			}).mouseout(function(){
				now = i+1;
				TimeInterval = window.setInterval(changeimage,t1);
			});
			//初始化显示
			if ($(this).hasClass(c)) {
				$(this).attr("src","//res.csc86.com/css/c/ksihome/images/map0"+i+"o.jpg");
				$(".mapc span").show().eq(i).hide();
				o2.hide().eq(i).show();
				
				now = i+1;
			}
		})
		o3.each(function(i){
			$(this).mouseover(function(){
				o1.removeClass(c);
				resetImg(o1);
				o1.eq(i).attr("src","//res.csc86.com/css/c/ksihome/images/map0"+i+"o.jpg");
				o1.eq(i).addClass(c);
				$(".mapc span").show().eq(i).hide();
				o2.hide().eq(i).show();
				
				window.clearInterval(TimeInterval);
			}).mouseout(function(){
				now = i+1;
				TimeInterval = window.setInterval(changeimage,t1);
			});
		});
		TimeInterval = window.setInterval(changeimage,t1);
		function changeimage(){
			if(now>count)now=0;
			$(".mapc span").show().eq(now).hide();
			o2.hide().eq(now).stop().fadeTo(0,a).fadeTo(t2,b);
			
			o1.removeClass(c);
			o1.eq(now).addClass(c);
			resetImg(o1);
			o1.eq(now).attr("src","//res.csc86.com/css/c/ksihome/images/map0"+now+"o.jpg");
			now++;
		}
	}
	
	function resetImg(obj){
		obj.each(function(j){
		
			$(this).attr("src","//res.csc86.com/css/c/ksihome/images/map0"+j+".jpg");
		});
	}//resetImg end;
	
	function setJcDiv(){
		$(".jcList li").mouseenter(function(){
			$(this).find("span").animate({"height":"139px"},300);
			$(this).find("div").animate({"height":"139px"},300);
		}).mouseleave(function(){
			$(this).find("span").animate({"height":"30px"},300);
			$(this).find("div").animate({"height":"30px"},300);
		});
	}//setJcDiv end;
	

	function isLogin(obj,url1,url2){
		var path="//api.csc86.com/member/";
		url1=path+url1;
		url2=path+url2;
		$.ajax({
	        type: "get",
	        url: url1,
	        dataType:"jsonp",
	        data: "", //例如："name=John&location=Boston";
	        success: function(data){
	        	if(data.status){
	        		$.get(url2,{type:"json"},function(dataMsg){	
	        			/*var html="<b>您好,</b><a href='//member.csc86.com/'>";
	        			html+=data.data.userName+"!";
	        			html+="</a><b>消息</b><a class='msg' href='//member.csc86.com/membercenter/messageall/'>";
	        			html+=dataMsg.data.count;
	        			html+="</a><a href='//member.csc86.com/login/logout' class='logout'>退出</a>";*/

	        			$(obj).html('<a href="//member.csc86.com/" target="_blank" id="J_signEd" data-memberid="'+data.data.userName+'">'+data.data.userName+'</a>！消息<a href="//member.csc86.com/membercenter/messageall/" target="_blank" class="top-msg-num">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="//member.csc86.com/login/logout">退出</a>');
	        		},"jsonp");
	        		
	        	}
	        },
	        error: function (d,d1,d2) {
	            alert(this.url);
	           
	        }
	    });
	}//isLogin end;






	