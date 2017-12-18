define(function(require, exports, module) {
	var weixin={
		isWeiXin:function(){
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'								    		){
				return true;
			}else{
				return false;
			}
		}
	}
     module.exports = weixin;
});