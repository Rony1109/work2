//圈子头相弹出名片
var csc = csc || {};
csc.snsCard = csc.snsCard || {};
//csc.snsCard.bindSelectStr = ".mail-ly";
//csc.snsCard.showIng = 0;
//csc.snsCard.showIDE = "";
//csc.snsCard.bind = function(){}
csc.snsCard.int = 0;
csc.snsCard.Cache = {}; //名片缓存,用户登陆时建议清空;
csc.snsCard.closeXC;
csc.snsCard.showXC;
csc.snsCard.showSpace=200; //多久后显示名片(毫秒)
csc.snsCard.getCardHtml = function(fuid,callBack){
	$.get(csc.url('quan','/interface/pcard'),{'fuid':fuid}, function(data) {
		callBack(data);
	},'jsonp');
};

/*新的SNS显示名片方法
*   HTML结构: <tag class="SNScard" fuid="用户id" wz="位置标示">...</tag>
*
*	class="SNScard" 必须
*	fuid="用户id" 必须
*	wz="位置标示" 可省略,默认为自动; 0,1,2,3 分别指 上,右,下,左;
*	时注意a标签的中有IMG时的显示情况, A标签建议字义为块无素;
*/
$(function(){
	var cardDIV,toZB=[0,0];
	if($('#SNSCardDIV').length < 1){//创建名片div
		cardDIV = $('<div id="SNSCardDIV" class="g-snscard"></div>');
		$('body').append(cardDIV);
	}else{
		cardDIV = $('#SNSCardDIV');
	}

	if($('link[href*="sns/visiting-card.css"]').length < 1){//加载名片样式
		seajs.use(csc.url('res','/f=css/c/sns/visiting-card.css'));
	}

	if($('link[href*="zzmark/css.css"]').length < 1){//加载图标样式
		seajs.use(csc.url('res','/f=css/m/zzmark/css.css'));
	}
	


	$(document).data('SNScardBind') || $(document).delegate('.SNScard[fuid]','mouseenter',function(){
		clearTimeout(csc.snsCard.closeXC);
		var _int = ++csc.snsCard.int;
		var o=$(this),
			offset = o.offset();//触发元素相对窗口位置
		switch (o.attr('wz')) {
			case '0' ://上
				toZB = [offset.left,offset.top-cardDIV.outerHeight()];
				break;
			case '1' ://右
				toZB = [offset.left+o.outerWidth(),offset.top];
				break;
			case '2' ://下
				toZB = [offset.left,offset.top+o.outerHeight()];
				break;
			case '3' ://左
				toZB = [offset.left-cardDIV.outerWidth(),offset.top];
				break;
			case '4' ://自动(外)
				toZB = [offset.left+o.outerWidth(),offset.top];
				break;
			default ://自动
				var AS = [o.outerWidth(),o.outerHeight()], //触发元素的尺寸
					DS = [cardDIV.outerWidth(),cardDIV.outerHeight()], //名片的尺寸
					DScroll = [document.documentElement.scrollLeft+document.body.scrollLeft,document.documentElement.scrollTop+document.body.scrollTop],
					DClien = [document.documentElement.clientWidth,document.documentElement.clientHeight],
					AF = [offset.left-DScroll[0]>0?offset.left-DScroll[0]:0,offset.top-DScroll[1]>0?offset.top-DScroll[1]:0],
					AO = [];
					if(DClien[0]>DS[0]){
						toZB[0]=offset.left+DS[0]-DScroll[0]<=DClien[0]?offset.left:DClien[0]-DS[0]+DScroll[0];
						if(AF[0]+AS[0]<=DClien[0] && AF[0]+AS[0]>=DS[0] && offset.left+DS[0]-DScroll[0]>DClien[0]){
							toZB[0] = offset.left+AS[0]-DS[0];
						}
					}else{
						toZB[0]=DScroll[0];
					}
					if(DClien[1]>DS[1]){
						if(offset.top+AS[1]+DS[1]-DScroll[1]<=DClien[1]){
							toZB[1]=offset.top+AS[1];
						}else if(offset.top-DScroll[1]>=DS[1]){
							toZB[1]=offset.top-DS[1];
						}else{
							toZB[1]=offset.top+DS[1]-DScroll[1]<=DClien[1]?offset.top:DClien[1]-DS[1]+DScroll[1];
							if(AF[1]+AS[1]<=DClien[1] && AF[1]+AS[1]>=DS[1] && offset.top+DS[1]-DScroll[1]>DClien[1]){
								toZB[1] = offset.top+AS[1]-DS[1];
							}
						}
					}else{
						toZB[1]=DScroll[1];
					}
		}

		cardDIV.css({'left':toZB[0]+'px','top':toZB[1]+'px'});
		if(csc.snsCard.Cache[o.attr('fuid')]){
			cardDIV.html(csc.snsCard.Cache[o.attr('fuid')]);
		}else{
			cardDIV.html('<span class="loading">正在加载名片...</span>');
			csc.snsCard.getCardHtml(o.attr('fuid'),function(data){
				csc.snsCard.Cache[o.attr('fuid')]=data.code;
				if(_int!=csc.snsCard.int){return;};
				cardDIV.html(data.code);
			});
		}
		csc.snsCard.showXC = setTimeout(function(){cardDIV.show()},csc.snsCard.showSpace);
	}).delegate('.SNScard[fuid]','mouseleave',function(){
		clearTimeout(csc.snsCard.showXC);
		csc.snsCard.closeXC = setTimeout(function(){cardDIV.hide();},10);
	}).delegate('#SNSCardDIV','mouseleave',function(){
		clearTimeout(csc.snsCard.showXC);
		csc.snsCard.closeXC = setTimeout(function(){cardDIV.hide();},10);
	}).delegate('#SNSCardDIV','mouseenter',function(){
		clearTimeout(csc.snsCard.closeXC);
	}).data('SNScardBind',1);
});