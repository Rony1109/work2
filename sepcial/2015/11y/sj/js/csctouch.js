define(function(require, exports, module) {
(function($, window, document,undefined) {
	var csctouch=function(element, option) {
		this.element = element,
        this.defaults = {
        callback:null
        },
        this.option = $.extend({}, this.defaults, option||{}),
		this.init();
	}
	csctouch.prototype = {
		init: function() {		
			var _this = this;
			var _thisele=_this.element;
			var _thismove=_thisele.find("ul");
			var _option=_this.option;
			var defaults = {x: 5,y: 5,x1:0,y1:0,x2:0,y2:0};
			var _thismoveli=_thisele.find("li");
			var _thismoveliw=_thismoveli.innerWidth();
			var _thismovelinum=_thismoveli.length;
			var _thiselew=_thisele[0].offsetWidth;
			var maxW=_thismoveliw*_thismovelinum;
			var maxmovenum=maxW-_thisele[0].offsetWidth;
			var ml,mt,changeX,eventchangeX,eventchangeY,nums=0;
			_thismove[0].style.width=maxW+"px";
			if(_thiselew>maxW){return false;};
	
		_thismove[0].addEventListener("touchstart",function() {											  
			ml=parseInt(_thismove[0].style.marginLeft||0);
			mt=parseInt(_thismove[0].style.marginTop||0);						   
            defaults.x1 = event.targetTouches[0].pageX;
            defaults.y1 = event.targetTouches[0].pageY;
				
        }, false);
		 _thismove[0].addEventListener("touchmove",function() {										  
            defaults.x2 = event.targetTouches[0].pageX;
            defaults.y2 = event.targetTouches[0].pageY;
			
		   changeX = defaults.x2-defaults.x1+ml;  
		 
		   eventchangeX=defaults.x2-defaults.x1;
           eventchangeY = defaults.y2-defaults.y1;  
		    
             changeX= changeX>0?0:changeX;
			changeX= Math.abs(changeX)>maxmovenum?-maxmovenum:changeX;
		 if(Math.abs(eventchangeX)-Math.abs(eventchangeY)>defaults.x){	
		 event.preventDefault();	
         _thismove[0].style.marginLeft=changeX+"px"; 
		 }else{}
		 
          
        }, false);
		
		 _thismove[0].addEventListener("touchend",function() {
			if(changeX!=0&&changeX!=-maxmovenum){
			var marginLeft=_thismove[0].style.marginLeft;
			 if(eventchangeX<0){
			 nums += Math.ceil( -eventchangeX/_thismoveliw);
			 num=-nums*_thismoveliw<-maxmovenum?-maxmovenum:-nums*_thismoveliw; 
			 _thismove.stop().animate({
				 marginLeft:num+"px"
				 },200,_option.callback); return false;
			 }if(eventchangeX>0){
				 
				 nums -= Math.ceil( eventchangeX/_thismoveliw);
				 num=-nums*_thismoveliw>=0?0:-nums*_thismoveliw;

				_thismove.stop().animate({
				 marginLeft:num+"px"
				 },200,_option.callback);return false;
				 }
			}
}, false);

		},		
	}
	$.fn.csctouch = function(option) {
		var Jqtouch = new csctouch(this, option);
		return this;
	};
})(jQuery, window, document);	

})