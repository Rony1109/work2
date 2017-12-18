$(function(){
	$('a.J_close_notice').one('click',function(){//提醒完善名片
		var $t = $(this).parent();
		$t.fadeOut(400,function(){
			$t.remove();
		});
		seajs.use(csc.url('res','/f=js/m/cookie'),function(){
			csc.setCookie('quanHideNotice',true,525600);
		});
	});


	function grab(obj,pos){//抢占名片
		var os=$('#selfid').val()?"1":0;
		$.ajax({
			type: "POST",
			async:false,
			url: csc.url('quan',"/cards/update?t=update&sort="+(pos+1)+"&os="+os),
			success: function(data){
				data=$.trim(data)-0;
				if(data>0){
					artDialog({
						title:false,
						content:'<div class="g-ff-y pop-notice">'+
									'<div class="bd">'+
										'<strong>恭喜你，抢占成功！</strong>'+
										'<p>今晚12点前，这个位置就是<br/>你的了，明天再接再厉哦！</p>'+
									'</div>'+
								'</div>',
						padding:0,
						time:3,
						lock: true,
						fixed: true
					});
					location.reload();
				}else if(-1==data){ //未登录重新登录
					seajs.use(csc.url("res","/f=js/m/sign"),function (){ 	
						csc.signIn("location.reload");
					});
				}else if(-2==data){//名片信息不全
					csc.addName(obj);
				}else if(-3==data){
					window.popNotice = artDialog({
						title:false,
						content:'<div class="g-ff-y pop-notice">'+
									'<div class="bd">'+
										'<strong>呃额...没抢到~</strong>'+
										'<p>就只慢了0.1秒，位置刚被<br/>人占了，赶快找个空位再试试吧！</p>'+
									'</div>'+
									'<div class="ft"><a href="javascript:void(popNotice.close())" class="btn">好 的</a></div>'+
								'</div>',
						padding:0,
						fixed: true,
						lock: true,
						close:function(){
							location.reload();
						}
					});
				}else{
					try{window.popNotice.close();}catch (e){}
					window.popNotice = artDialog({
						title:false,
						content:'<div class="g-ff-y pop-notice">'+
									'<div class="bd">'+
										'<div class="g-h-25"></div>'+
										'<strong>抱歉，网络不给力，抢占不成功～</strong>'+
									'</div>'+
									'<div class="ft"><a href="javascript:void(popNotice.close())">算了</a>&nbsp; &nbsp;<a href="javascript:" class="btn J_tryAgain">我再试试</a></div>'+
								'</div>',
						padding:0,
						init:function(){
							$('a.J_tryAgain').on('click',function(){
								$(this).html('正在抢占...');
								grab(obj,pos);
							});
						},
						fixed: true,
						lock: true
					});
				}
			},
			error:function(){
				try{window.popNotice.close();}catch (e){}
				window.popNotice = artDialog({
					title:false,
					content:'<div class="g-ff-y pop-notice">'+
								'<div class="bd">'+
									'<div class="g-h-25"></div>'+
									'<strong>抱歉，网络不给力，抢占不成功～</strong>'+
								'</div>'+
								'<div class="ft"><a href="javascript:void(popNotice.close())">算了</a>&nbsp; &nbsp;<a href="javascript:" class="btn J_tryAgain">我再试试</a></div>'+
							'</div>',
					padding:0,
					init:function(){
						$('a.J_tryAgain').on('click',function(){
							$(this).html('正在抢占...');
							grab(obj,pos);
						});
					},
					fixed: true,
					lock: true
				});
			}
		});
	}

	$('div.card-items').delegate('li.empty', 'click', function(event) {
		grab(this,$(this).index());
	}).delegate('li.item', 'mouseover', function(event) {//名片高亮
		var $t = $(this).addClass('hover');
		if($t.is('.ins-cur')){
			$t.addClass('ins-cur-hover');
		}
	}).delegate('li.item', 'mouseout', function(event) {
		var $t = $(this).removeClass('hover');
		if($t.is('.ins-cur')){
			$t.removeClass('ins-cur-hover');
		}
	}).delegate('li:not(.large) div.t-n a', 'mouseover', function(event) {//名片完整展示
		var $li = $(this).parents('li.item');
		$li.addClass('t-hover');
		if($li.is('.ins-cur')){
			$li.addClass('ins-t-hover');
		}
	}).delegate('li.t-hover div.t-n a', 'mouseout', function(event) {
		var $li = $(this).parents('li.item');
		$li.removeClass('t-hover');
		if($li.is('.ins-cur')){
			$li.removeClass('ins-t-hover');
		}
	});

	$('div.card-nav').delegate('a', 'click', function(event) {//名片行业筛选高亮
		var
			$t = $(this),
			$li =$t.parent(),
			$ul = $li.parent(),
			$cards = $('div.card-items');
		if($li.is('.cur')){
			$ul.find('li.last a').trigger('click');
			return;
		}
		$ul.find('li').removeClass('all cur');
		$cards.find('li.ins-cur').removeClass('ins-cur ins-large');
		if($li.is('.last')){
			$li.addClass('all');
		}else{
			$li.addClass('cur');
			$cards.find('li[data-ins*="'+$t.data('ins')+'"]').addClass('ins-cur').filter('.large').addClass('ins-large');
		}
	});


	var $cardNav = $('div.card-nav'),
		ofT = $cardNav.parent().offset().top;


	$cardNav.delegate('h2', 'click', function(event) {
		$cardNav.is('.card-nav-mini') ? $cardNav.removeClass('card-nav-mini') : $cardNav.addClass('card-nav-mini');
	});

	function cardNavRePosition(){
		var cW = document.documentElement.clientWidth;
		if(cW < 1240){
			if($cardNav.is(':not(.card-nav-pos)')){
				$cardNav.addClass('card-nav-pos');
			}
		}else{
			$cardNav.removeClass('card-nav-pos');
		}
	}
	cardNavRePosition();

	function cardFixed(){
		var sT = $(window).scrollTop();
		if(sT > ofT){
			if(csc.ie6){
				$cardNav.animate({
					top:sT
				},200);
			}else if($cardNav.is(':not([style])')){
				$cardNav.css({
					position:'fixed',
					top:0
				});
			}
		}else if(sT < ofT && $cardNav.is('[style]')){
			$cardNav.removeAttr('style');
		}
	}

	$(window).bind('resize',cardNavRePosition).bind('scroll',cardFixed);

});