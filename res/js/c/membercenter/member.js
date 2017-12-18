 $.ajaxSetup({
	/*error:function (XMLHttpRequest, textStatus, errorThrown){
		if(XMLHttpRequest.responseText =='' || XMLHttpRequest.responseText.indexOf('id="loginName"') > 0){
			csc.useDialog(function (){
				csc.alert("登录超时，请重新登录！",function (){
					location.href = csc.url("login","/?done=" + encodeURIComponent(location.href));
				});
			});
		}
	}*/
});

//城商通验证
csc.cstVerify = function(){
    var othis = this;
    csc.useDialog(function (){
        var msg = '您还没有开通这个功能，加入<a href="//cncms.csc86.com/special/yunyingguanli/cst/" target="_blank">城商通会员</a>试试！';
        art.dialog({
            content: msg,
            ok: function () {
                window.open("//cncms.csc86.com/special/yunyingguanli/cst/","_blank");
            },
            okVal:'去试试',
            cancelVal: '我知道了',
            cancel: true
        });
    });
}

$(function(){
	//常用工具伸缩面版
	$("#capose").hover(function(){
		var	$t = $(this);
		if($t.not(":animated")){
			$t.stop().animate({right:0}, 500,function (){
				$t.children("a").css("background-position","0 0");
			});
		}
	},function(){
		var	$t = $(this);
		if($t.not(":animated")){
			$t.stop().animate({right:-240},500,function (){
				$t.children("a").removeAttr("style");
			});
		}
	});

	$(document).delegate("#msgi-link li .del", "click", function() {
		var $this = $(this),
			id = $this.attr("id");
		$.post("/membercenter/messagehide", {
			"id": id
		}, function(data) {
			if (data.status) {
				if (data.message && data.message.length > 0) {
					var str = "",
						countnum = data.countmessage >= 100 ? "99+" : data.countmessage;
					$.each(data.message, function(index, value) {
						str += '<li><a class="del" href="javascript:" id=' + data.message[index].messageId + '></a><a class="title" href="/membercenter/messagelook/?messageId=' + data.message[index].messageId + '&index=' + data.message[index].index + '">' + data.message[index].title + '</a></li>';
					});
					$("#msgi-link").html(str);
					$("#talNum-o").text(countnum);
				}
			} else {
				csc.alert(data.msg);
			}
		}, "jsonp");
	});
	seajs.use(csc.url("res","/f=js/m/backTop"));
	seajs.use(csc.url("res","/f=js/c/membercenter/memtool.js"));
	seajs.use(csc.url("res","/f=js/m/hrefinfo"),function (){
			csc.hrefinfo("ul.main>li>a");
		});
	csc.useDialog();
	wp_menu();

	csc.lte_ie8 = (function (){
		return /MSIE.(8|7|6)\.0/.test(navigator.userAgent);
	})();
	//ie6图片缩放
	csc.lte_ie8 && seajs.use(csc.url("res","/f=js/m/imgMax"),function (){
		$("img[data-max]").each(function (index,item){
			var $item = $(item),
				max = $item.data("max");
			csc.imgMax(item,max,max);
			$item.fadeIn("fast");
		});
	});


	//以下两个变量页面事件触发导致的商品曝光埋点需要用到
	var triggerEventNum= 0,triggerEventArry=[];
	$('a[href*="inquiry/openpublish.html"]').on('click',function(){
		triggerEventNum++;
		triggerEventArry=[];
		triggerEventArry.push({
			userName:document.cookie.match(new RegExp("(^| )username=([^;]*)(;|$)"))[2]
		})
		if(typeof cscgaMd == 'object'){
			cscgaMd.buyApply('pc', triggerEventNum, triggerEventArry[0]);
		}
	});

});

function wp_menu(){//旺铺等左侧菜单伸缩 ,鼠标移入效果；
	$("ul.af-nav-items>li>ul>li,ul.nav-items>li>ul>li").hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");})
	$("ul.af-nav-items>li>ul,ul.nav-items>li>ul").each(function(item){
		$(this).parent("li").find(">a").bind("click",function(obj){
			$(this).parent("li").toggleClass("has-children-cur");
			//return false;
		})
	})
}
