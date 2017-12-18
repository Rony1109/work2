define(function(require, exports, module) {
	if($('.jsWpZc')[0]){
		$.post("//member.csc86.com/ajax/shopMenu?type=renovation",function(data){
			$('.jsWpZc').attr('href',data.url);
		},"jsonp");
	}
	
    $(".expand").hover(function(){
		var _this=$(this);
        _this.find("a.c-a").addClass('c-hover');
		if(_this.hasClass('jsWpMng')&&!_this.find('.shop-nav')[0]){
			if(!_this.find('.loading-box')[0]){
				_this.append('<ul class="loading-box"><li style="text-align:center;"><img src="//res.csc86.com/v2/m/init/image/loading.gif" width="16" height="16" alt=""/></li></ul>');
			}
			$.post("//member.csc86.com/ajax/shopMenu?type=json",function(data){
				_this.append(data.shopMenu);
				_this.find('.loading-box').remove();
			},"jsonp");
		}
    },function(){
		var _this=$(this);
        _this.find("a.c-a").removeClass('c-hover');
    });	

	// 询盘管理，判断时候有新消息
	(function () {
		var $d = $( "#leftnav-xpgl" );
		$d.css("position", "relative");
		$.get("//inquiry.csc86.com/newInquiryMsg", function ( res ) {
			if ( res[0].data > 0 ) {
				$d.append('<i class="icon-news"></i>');
			}
		}, 'jsonp');
	})();
});