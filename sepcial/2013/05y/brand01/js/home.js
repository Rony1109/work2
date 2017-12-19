$(function(){
	var $new=$("#slide-news");
	$new.delegate("a.next","click",function(){	
		var self = $("div.roll",$new), adwidth = $("div.csc-wrap",$new).width();
		self.animate({left : -adwidth},300,function(){
			self.css({"left":0}).find("div.csc-wrap:first").appendTo(self);
		});
	}).delegate("a.prev","click",function(){
		var self = $("div.roll",$new), adwidth = $("div.csc-wrap:first",$new).width();
		self.find("div.csc-wrap:last").prependTo(self);
		self.css({"left":-adwidth}).animate({left : 0},300);
	});
//电商模范
var dtime,$this= $("#jc_outer"),ln=$this.find("ul").children("li").length;	
    $("#jc_outer").delegate("span.l","click",function(){
	
       scrollRight($this);
    }).delegate("span.r","click",function() {
       scrollLeft($this);
     });
	
	  $('#jc_outer').hover(function(){
			 clearInterval(dtime);
		 },function(){
			 dtime = setInterval(function() {
           		scrollLeft($this);
        }, 4000);
	 }).trigger("mouseleave");
	 
	 //点击向左
	function scrollLeft(obj){
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.animate({ "left" : -lineWidth +"px" }, 400 , function(){
				$self.css({left:0}).find("li:first").appendTo($self);
			})
		}
	}
	
	function scrollRight(obj) {
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.find("li:last").prependTo($self);
			$self.css({ left: -lineWidth }).animate({ "left": 0 + "px" }, 400);
		}   
	}
	 
	$("#cs-lid>li").hover(function(){
		var index = $(this).index();
		var ul = $("#img-d"),w=ul.find("li:first").height();
		ul.stop(false,false).animate({ "top" : -w*index +"px" }, 400 , function(){
			
		})
	}); 
	 
	
function sina(id,fetit,picurl){
  var _w =32, _h = 32;
  var param = {
    url:location.href,
    type:'1',
    count:'0', /**是否显示分享数，1显示(可选)*/
    appkey:'173425282', /**您申请的应用appkey,显示分享来源(可选)*/
    title:fetit, /**分享的文字内容(可选，默认为所在页面的title)*/
    pic:picurl, /**分享图片的路径(可选)*/
    ralateUid:'', /**关联用户的UID，分享微博会@该用户(可选)*/
	language:'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
    rnd:new Date().valueOf()
  }
  var temp = [];
  for( var p in param ){
    temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
  }
  $(id).html('<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>')
}
var pic00 = $("#qqwb_share__").data("pic");
var tit0 = $("#qqwb_share__").data("content");
sina("#fe-sina00",tit0,pic00);

function qq(id,fetit,picurl){
	var p = {
	url:location.href,
	showcount:'0',/*是否显示分享总数,显示：'1'，不显示：'0' */
	desc:'',/*默认分享理由(可选)*/
	summary:'',/*分享摘要(可选)*/
	title:fetit,/*分享标题(可选)*/
	site:'www.csc86.com',/*分享来源 如：腾讯网(可选)*/
	pics:picurl, /*分享图片的路径(可选)*/
	style:'201',
	width:113,
	height:39
	};
	var s = [];
	for(var i in p){
	 s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	$(id).html(['<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&'),'" target="_blank">分享</a>'].join(''));
}

qq("#fe-QQsp00",tit0,pic00);


function postToWb0(fetit,picurl){
	var _t = encodeURI(fetit);
	var _url = encodeURI(location.href);
	var _appkey = encodeURI("118cd1d635c44eab9a4840b2fbf8b0fb");//你从腾讯获得的appkey
	var _pic = encodeURI(picurl);//（列如：var _pic='图片url1|图片url2|图片url3....）
	var _site =location.href;//你的网站地址
	var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
	window.open( _u,'转播到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
}
$("#fe-QQsm00 a.tmblog").click(function(){
	postToWb0(tit0,pic00);	
});

});