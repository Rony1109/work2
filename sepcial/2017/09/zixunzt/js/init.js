
seajs.config({

    // 别名配置
    alias: {

		
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {

	

    /*
     * 以下为专题js代码
     * ......
     */


			//初始值
			var btnLeft=$('.btnLeft');//左边按钮
			var btnRight=$('.btnRight');//右边按钮
			var arrUl=$('#arrLi');
			var arrLi=$('#arrLi>li');
			var btnLi=$('#btnLi>li');
			var arrLilen=arrLi.length;
			var oldli=[];
			$.each(arrLi,function(){
				var me=this;
				return oldli.push(me)
			});
			var arrSort=[];
			var kai=true;//开关
			//始终显示五张图片，数组的第3位是大图所在位置，俩侧一次递减
			var pos=[
				{width:'403px',height:'230px',left:'70px',top:'100px',zindex:1,opacity:0.2,borderWidth:"0px"},
				{width:'525px',height:'300px',left:'140px',top:'65px',zindex:2,opacity:0.6,borderWidth:"0px"},
				{width:'700px',height:'400px',left:'240px',top:'0px',zindex:4,opacity:1,borderWidth:"10px"},
				{width:'525px',height:'300px',left:'535px',top:'65px',zindex:2,opacity:0.6,borderWidth:"0px"},
				{width:'403px',height:'230px',left:'725px',top:'100px',zindex:1,opacity:0.2,borderWidth:"0px"},
				{width:'200px',height:'114px',left:'500px',top:'200px',zindex:0,opacity:0,borderWidth:"0px"}
			];
			/*初始化图片位置，然后把所有li记录到arrSort里*/
			for(var i=0;i<arrLilen;i++){
				if(i<5){
					$(arrLi[i]).css({
						'width':pos[i].width,
						'height':pos[i].height,
						'left':pos[i].left,
						'top':pos[i].top,
						'z-index':pos[i].zindex,
						'opacity':pos[i].opacity,
						'borderWidth':pos[i].borderWidth
					});
				}else{
					$(arrLi[i]).animate({
						'width':pos[5].width,
						'height':pos[5].height,
						'left':pos[5].left,
						'top':pos[5].top,
						'z-index':pos[5].zindex,
						'opacity':pos[5].opacity,
						'borderWidth':pos[5].borderWidth
					});
				}
			}
			var oPath=parseInt(arrLi.eq(2).attr('data-num'));
			moveClass(oPath);
			for(var i=0;i<arrLilen;i++){
				arrSort.push(arrLi[i])
			}

			//左按钮点击
			btnRight.on('click',function(){
				//点击进来的时候检测上一个动画是否执行完了，没执行之前，不可以再进行下一步动画操作
				if(kai){
					kai=false;

					doPrev();
					setTimeout(function(){kai=true;},500);

				}

			});
			//右按钮点击
			btnLeft.on('click',function(){
				//点击进来的时候检测上一个动画是否执行完了，没执行之前，不可以再进行下一步动画操作
				if(kai){

					kai=false;
					doNext();

					setTimeout(function(){kai=true;},500)
				}

			});
			//btn点击
			btnLi.on('click',function(){

				var _index=$(this).index();

				arrSort.splice(0,arrSort.length);
				$.each(oldli,function(){
					var me = this;
					arrSort.push(me)
				});
				if(_index==0){
					for (var i=0;i<2;i++){
						doNext()
					}
				}else if(_index==1){
					doNext()
				}else if(_index>1){
					for (var i=0;i<_index-2;i++){
						arrSort.push(arrSort.shift());
					}
					doMove();
				}


			});
			//数组造作 上一个依次排序
			function doPrev(){

				arrSort.push(arrSort.shift());
				doMove();
			};
			//数组造作 下一个依次排序
			function doNext(){

				arrSort.unshift(arrSort.pop());
				doMove();

			};
			//根据排序,计算元素新的位置，然后animate
			function doMove(){
				arrUl.append(arrSort);
				for(var i=0;i<arrLilen;i++){
					if(i<5){
						$(arrSort[i]).css('z-index',pos[i].zindex);
						$(arrSort[i]).stop().animate({
							'width':pos[i].width,
							'height':pos[i].height,
							'left':pos[i].left,
							'top':pos[i].top,
							'opacity':pos[i].opacity,
							'borderWidth':pos[i].borderWidth
						},500);}else{
						$(arrSort[i]).stop().animate({
							'width':pos[5].width,
							'height':pos[5].height,
							'left':pos[5].left,
							'top':pos[5].top,
							'opacity':pos[5].opacity,
							'borderWidth':pos[5].borderWidth
						},500);
					}
				}
				var _index=parseInt($(arrSort[2]).attr('data-num'));
				moveClass(_index);
			}
			//给当前btn加减class
			function moveClass(oindex){
				btnLi.removeClass('active');
				btnLi.eq(oindex).addClass('active');
			}


			$('.content2 .title ul').on('click','li',function(){
			    var $this=$(this);
                var $thisindex=$this.index();
                $this.siblings().removeClass('active').end().addClass('active');
                $('.con').eq($thisindex).siblings('.con').removeClass('active').end().addClass('active');
            })

            $.each($('.content2 .con'),function(){
                var $this=$(this);
                var ullen=$this.find('ul').length;
                var html=''
                for(var i=0;i<ullen;i++){
                    if(i==0){
                        html+='<span class="num active">1</span>'
                    }else{
                        html+='<span class="num">'+(i+1)+'</span>'
                    }
                }

                var totalhtml='<span class="total">共'+ullen+'页</span>';
                $this.find('.tab .next').before(html).after(totalhtml);

            })

            $('.content2 .tab').on('click','.num',function(){
                var $this=$(this);
                var $thisparent=$(this).parents('.con');
                var $thisindex=$this.index()-1;
                $this.siblings().removeClass('active').end().addClass('active');
                $thisparent.find('ul').eq($thisindex).siblings('ul').removeClass('active').end().addClass('active');
            })

            $('.content2 .tab').on('click','.prev',function(){
                var $this=$(this);
                var $thistab=$(this).parents('.tab');
                var $thiscon=$(this).parents('.con');
                var $thisnum=$thistab.find('.active').text();
                if ($thisnum==1){
                    return false;
                }else{
                    $thisindex=$thisnum-2;
                }
                $thistab.find('.num').eq($thisindex).siblings().removeClass('active').end().addClass('active');
                $thiscon.find('ul').eq($thisindex).siblings('ul').removeClass('active').end().addClass('active');
            })

            $('.content2 .tab').on('click','.next',function(){
                var $this=$(this);
                var $thistab=$(this).parents('.tab');
                var $thismax=$thistab.find('.num').length;
                var $thiscon=$(this).parents('.con');
                var $thisnum=$thistab.find('.active').text();
                if ($thisnum==$thismax){
                    return false;
                }else{
                    $thisindex=$thisnum;
                }
                $thistab.find('.num').eq($thisindex).siblings().removeClass('active').end().addClass('active');
                $thiscon.find('ul').eq($thisindex).siblings('ul').removeClass('active').end().addClass('active');
            })



    window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"6","bdPos":"right","bdTop":"100"}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

});
