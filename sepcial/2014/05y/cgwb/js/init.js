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
    //require('jquery');
	require('http://res.csc86.com/f=js/l/jquery.js,js/p/artDialog/4.1.5/jquery.artDialog.js,js/p/artDialog/4.1.5/plugins/iframeTools.source.js');
    require('top');
    require('header');
    require('placeholder');
    /*
     * 以下为专题js代码
     * ......
     */

	 $(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<530){
			$(".fiexd").addClass("fiexd_nav");
		}else{
			$(".fiexd").removeClass("fiexd_nav");
		}
	});

	var ss=false;
	var rTim;
	$('.bn-list-l').hover(function(){
			 clearInterval(rTim);
			 ss=false;
		 },function(){
			 $t2=$(this);
			 if(!ss){
				 ss=true;
				 rTim = setInterval(function(){
					tieftwo();
				} ,2000);
			}
	 }).trigger("mouseleave");

	var tieftwo=function(){
		var self=$(".it-sig").children(".bn-list-l"),lih =self.siblings("ul.bn").children(".cur"),ind=self.siblings("ul.bn").children("li").length,seidx=lih.index();
		if((seidx+1)==ind){
			ss=false;
			self.children("a").removeClass("cur").first().addClass("cur");
			self.siblings("ul.bn").find("li").removeClass("cur").first().addClass("cur");
		}else{
			ss=false;
			self.children("a.cur").removeClass("cur").next().addClass("cur");
			self.siblings("ul.bn").children(".cur").removeClass("cur").next().addClass("cur");
		}
	}


	$('.bn-list-l a').hover(function(){
		clearInterval(rTim);
		ss=false;
		var ind=$(this).index();
		$('.bn-list-l a').removeClass("cur");
		$(this).addClass("cur");
		$(this).closest(".it-sig").children(".bn").find("li").removeClass("cur");
		$(this).closest(".it-sig").children(".bn").find("li:eq("+ind+")").addClass("cur");
	},function(){
		var tvi=$(this).closest(".it-sig").find(".bn-list-l");
		if(!ss){
			 ss=true;
			 rTim = setInterval(function(){
				tieftwo(tvi);
			} ,2000);
		}
	}).trigger("mouseleave");

	$(".fiexd").hover(function(){$(this).animate({right:"-5px"});},function(){$(this).animate({right:"-195px"});});



});

function layercg(){
		artDialog({title:"申请小秘书",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-fl">申请小秘书</span><a class="g-fr" href="javascript:;" title="" onclick="closet()"></a></div><form  id="myform" name="myform" action="http://ecmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=21&action=js&siteid=1" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i>公司名称 </span><input type="text" name="info[company]" value="" class="input-text"></li><li><span color="red"><i>*</i>联系人</span><input type="text" name="info[name]" value="" class="input-text"></li><li><span color="red"><i>*</i>职位</span><input type="text" name="info[position]" value="" class="input-text"></li><li><span color="red"><i>*</i>联系电话</span><input type="text" name="info[tel]" value="" class="input-text"></li><li><span color="red">联系邮箱或qq</span><input type="text" name="info[email]" value="" class="input-text"></li></ul>'+
'<input type="submit" value=" 提交 " id="dosubmit" name="dosubmit">'+
'</form></div>',
	ok: function() {},
	cancel:false,
	fixed: true,
	id: 'Fm7',
	init:function(){
		$("form").submit( function () {
			var company=$("input[name='info[company]']").val(),
			name=$("input[name='info[name]']").val(),
			position=$("input[name='info[position]']").val(),
			tel=$("input[name='info[tel]']").val();
			if(company==""||name==""||position==""||tel==""){
				alert("尊敬的用户，你还有重要资料未填写完整，请您核对完毕再提交！");
				return false;
			}else{
				return true;
			}
		} );
	},
	icon: 'question',
	okVal: false});
	return false;
}

function closet(){
	art.dialog({id:'Fm7'}).close();
}

