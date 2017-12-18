define(function(require, exports, module) {
	//require('top');
	require('newtop');
	var dialog=require('//res.csc86.com/f=v2/m/dialog/js/init.js,/js/m/config.js');
	$('.imgsrc').on('click',function(){
		var $this=$(this);
		var html= '<div class="imgsrcwk"><img src="'+$this.attr('src')+'"></div>';
		art.dialog({
			id:'imgsrc',
			title: false,
			lock: true,
			content: html,
			fixed: true,
			drag:false,
			background: "#000",
			opacity: "0.2",
			init:function(){
				$('.imgsrcwk').css('max-height',$(window).height()-50);
				$(window).on('resize',function(){
					$('.imgsrcwk').css('max-height',$(window).height()-50)
				})
			}
		});
		return false;
	});
});