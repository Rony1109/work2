/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js'
    },
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	var dialog=require('dialog');
	var bg={},_play_not=true,_save=false;
	$.debug=false;
	//弹窗功能判断
	function _getData(){
		$.ajax({
			url:'http://api.csc86.com/Zhuanti/MemallCount',
			type: $.debug ? "get":"post",
			dataType:$.debug ? "json":"jsonp",
			success: function (data) {
				if(data.status){
					_save=true;
					$(".vedio-aly").html(data.data.sign);
					$(".register-aly").html(data.data.attend);
				}else{
					alert("程序报错")
				}

			},
			error: function (xhr, type) {
				alert("程序报错")
			}
		});
	}
	_getData();

	// 弹窗功能判断	 // 提交表单数据
	bg.dialogs=function(circleId,btnId, formClass, type){
		dialog({
			id: circleId,
			title:'',
			fixed: true,
			content:$("#"+circleId).html(),
			init:function(){

				$(btnId).find("input").on("click", function(){
					var _video_value=+$(".vedio-aly").html(),_sign_value=+$(".register-aly").html();
					switch(type){
						case 1:
							if($("#mediaName").val() == ""){
								alert("媒体名称不能为空！");
								return;
							}
							if($("#mediaNumber").val() == ""){
								alert("到访人数不能为空！");
								return;
							}
							if($("#mediaConnectnumber").val() == ""){
								alert("联系方式不能为空");
								return;
							}
							if($("#mediaInterview").val() == ""){
								alert("采访大纲不能为空");
								return;
							}
							break;
						case 2:
							if($('input:radio[name="companyform"]:checked').val() == undefined){
								alert("请选择公司类型！");
								return
							}
							if($("#Companyname").val() == ""){
								alert("公司名称不能为空！");
								return;
							}
							if($("#Number").val() == ""){
								alert("到访人数不能为空！");
								return;
							}
							if($("#Connectnumber").val() == ""){
								alert("联系方式不能为空");
								return;
							}
							break;
						default:
							return;
					}

					var datas=$(btnId).parent().serializeArray();
					$.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
						if(data.status==true){
							alert("恭喜您，提交成功！");
							switch(type){
								case 1:
									if(_save){
										$(".vedio-aly").html(_video_value+1);
										$(".aui_state_focus").css("display","none")
									}
									break;
								case 2:
									if(_save){
										$(".register-aly").html(_sign_value+1)
										$(".aui_state_focus").css("display","none")
									}
									break;
								default:
									return;
							}
						}else{
							alert("数据发送异常，请刷新页面后重试！");
						}
					}, 'jsonp');

				});
			}
		});
	}

	$(".vedio-apply").click(function(){
		bg.dialogs("page12","#media-btn", ".media-application", 1);//媒体申请
	});
	$(".register").click(function(){
		bg.dialogs("page11","#register-btn", ".register-application", 2);//注册参会
	});
	<!-- 倒计时 -->
	var time={
		init:function()
		{
			var EndTime= new Date('2017/03/24 13:00:00');
			var NowTime = new Date();
			var t =EndTime.getTime() - NowTime.getTime();
			var d=Math.floor(t/1000/60/60/24);
			var h=Math.floor(t/1000/60/60%24);
			var m=Math.floor(t/1000/60%60);
			var s=Math.floor(t/1000%60);
			//alert(h.substring(0,1));

			if(d<10)
			{
				d="0"+d;
			}
			if(h<10)
			{
				h="0"+h;
			}
			if(m<10)
			{
				m="0"+m;
			}
			if(s<10)
			{
				s="0"+s;
			}
			$("#djs-d").html(d);
			$("#djs-h").html(h);
			$("#djs-m").html(m);
			$("#djs-s").html(s);
			setTimeout(time.init,1000);
		}
	}

	time.init();

	function _scrollTopC(){  //滚动条滚动头部导航显示
		var top=$(window).scrollTop();
		if(top>600){
			$(".top-nav").css("display", "none");
			$(".bt-nav-2").css("display", "none");
			$(".bt-nav").css("display", "block");
		}else{
			$(".bt-nav").css("display", "none");
			$(".top-nav").css("display", "block");
			$(".bt-nav-2").css("display", "block");
		}
	}
	_scrollTopC();
	$(window).on('scroll',_scrollTopC);



	$("#video-play").click(function(){//视频播放
		if(_play_not){
			$("#player2").get(0).play();
			_play_not=false
		}else{
			$("#player2").get(0).pause();
			_play_not=true
		}

	})

	$('.bank-list li').hover(function(){ //移入移除
		$(this).addClass('li-hover');
		$(this).removeClass('bef');
	},function(){
		$(this).removeClass('li-hover');
		$(this).addClass('bef');
	});

	$('.move').hover(function(){ //头部动画
		$(this).animate({
			left:-20
		},500);
	},function(){
		$(this).animate({
			left:0
		},500);
	});


	//左右轮播
	var $prev = $(".bo_btn_pr"),
		$next = $(".bo_btn_ne");
	function lrScroll(tag,un,time){
		var $ul=$(tag).find("ul"),
			$w=$ul.find("li:first").width();
		if(!$ul.is(":animated")){
			if(un==1){
				$ul.animate({
					left:-$w
				},time,function(){
					$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
			}else{
				$ul.css({left:-$w}).find("li:last").prependTo($ul);
				$ul.animate({
					left:0
				},time);
			}
		}
	};
	function lrAutoPlay(tag,un,time){
		var scrollTimer;
		$(tag).hover(function(){
			clearInterval(scrollTimer);
		},function(){
			var _this=$(this);
			scrollTimer=setInterval(function(){
				lrScroll(_this,un);
			},time);
		}).trigger("mouseleave");
	};

	//if($('.wqzt-lst li').length>4){
	//	lrAutoPlay(".wqzt","1",5000);
	//}
	$next.on("click",function(){
		lrScroll(".wqzt",1,500);
	});

	$prev.on("click",function(){
		lrScroll(".wqzt",2,500);
	})
});
