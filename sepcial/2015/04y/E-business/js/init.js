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
    require('jquery');

    //跨浏览器的方法
var EventUtil={
    /*
    与addHandler()对应的方法是removeHandler(),他们的职责分别是添加和移除事件处理程序；
    这两个方法首先都会检测传入的元素中是否存在DOM2级方法（所有DOM节点，IE9+、firefox、safari、chrome、opera都支持），如果存在则使用该方法：传入事件类型、事件处理程序函数和第三个参数false(表示冒泡阶段)；
    如果存在的是IE的方法，则采用第二种方案（IE及opera支持）；
    最后一种方案就是使用DOM0级方法（虽然现在浏览器支持，但应该都不会执行这里的代码，前面两种方案基本够了，且前面两种方案支持在一个元素上添加多个事件处理程序，而最一种方案只能添加一个事件处理程序）
    */
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    //获取事件对象
    getEvent:function(event){
        return event?event:window.event;
    },
    //获取事件的目标
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    //取消事件默认行为
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    //阻止事件冒泡
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    },
	//获取鼠标滚轮增量值，当为120时表示向前滚动，当为-120时表示向后滚动
	getWheelDelta:function(event){
		if(event.wheelDelta){//兼容除firefox外的其他浏览器，event.wheelDelta为120时表示向前，当为-120时表示向后
			//return (client.engine.opera&&client.engine.opera<9.5?-event.wheelDelta:event.wheelDelta);
			return (window.opera&&window.opera.version()<9.5?-event.wheelDelta:event.wheelDelta);
		}else{//兼容firefox浏览器，在firefox中event.detail值为3表示向后滚动，为-3表示向前
			return -event.detail*40;
		}
	},
	//获取键盘的字符编码
	getCharCode:function(event){
		//ie9、firefox、chrome、safiri的event对象中都支持一个charCode属性,这个属性只有在发生keypress事件时才包含值，而且这个值是按下的那个键所代表字符的ASCII编码，此时的keyCode通常等于0或者也可能等于所按键的键码。ie8及之前版本和opera则是在keyCode中保存字符的ASCII编码。要想以跨浏览器方式取得字符编码，必须首先检测charCode属性是否可用，在不支持的浏览器中charCode值为undefined;
		if(typeof event.charCode=="number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	}
}


var page=0;
var ismove=true;

$('.flr-trg a').on('click',function(){
	var index=$('.flr-trg a').index(this);
	ismove=false;
	$('.scroll').animate({'top':-index*100+'%'},500,function(){
		page=index;
		$('.flr-trg a').removeClass('cur').eq(page).addClass('cur');
		ismove=true;
	});
	return false;
});

function handleMouseWheel(event){
	event=EventUtil.getEvent(event);
	var delta=EventUtil.getWheelDelta(event);
	var totalPage=$('.flr').length;
	switch(delta){
		case 120://向上滚动
		if(page>0&&ismove){
			ismove=false;
			$('.scroll').animate({'top':'+=100%'},500,function(){
				page--;
				$('.flr').removeClass('cur').eq(page).addClass('cur');
				$('.flr-trg a').removeClass('cur').eq(page).addClass('cur');
				ismove=true;
			});
		}
		break;
		case -120://向下滚动
		if(page<totalPage-1&&ismove){
			ismove=false;
			$('.scroll').animate({'top':'-=100%'},500,function(){
				page++;
				$('.flr').removeClass('cur').eq(page).addClass('cur');
				$('.flr-trg a').removeClass('cur').eq(page).addClass('cur');
				ismove=true;
			});
		}
		break;
	};
}

//鼠标滚轮滚动事件兼容除firefox外的其他浏览器
EventUtil.addHandler(document,'mousewheel',handleMouseWheel);

//firefox支持一个名为DOMMouseScroll的类似事件，也是在鼠标滚轮滚动时触发
EventUtil.addHandler(document,'DOMMouseScroll',handleMouseWheel);

	
	$(function(){ 
		$(".CRselectBox").hover(function(){ 
		$(this).addClass("CRselectBoxHover"); 
		},function(){ 
			$(this).removeClass("CRselectBoxHover"); 
			}); 
			$(".CRselectValue").click(function(){ 
				$(this).blur(); 
				$(".CRselectBoxOptions").show(); 
				return false; 
				}); 
			$(".CRselectBoxItem a").click(function(){ 
				$(this).blur(); 
				var value = $(this).attr("rel"); 
				var txt = $(this).text(); 
				$("#abc").val(value); 
				$("#abc_CRtext").val(txt); 
				$(".CRselectValue").text(txt); 
				$(".CRselectBoxItem a").removeClass("selected"); 
				$(this).addClass("selected"); 
				$(".CRselectBoxOptions").hide(); 
				return false; 
			}); 
		/*点击任何地方关闭层*/ 
		$(document).click(function(event){ 
		if( $(event.target).attr("class") != "CRselectBox" ){ 
		$(".CRselectBoxOptions").hide(); 
		} 
		}); 
		}) 



});
