define(function(require){
	var fn = require('./shadow');
	var slide = require('./slide');
	var submit = require('./submit');
	require('./marquee');
	fn.shadow('.shadow','.dialog' , '.addr .submit');
	fn.slide('.ctn2 ul.right li', '#alt_tip', '.ctn2 .img img');
	slide({
		elem : '.img ul li',
		thumb : '.img ol li',
		parentEl : '.top_ctn .img',
	});
	//fn.marquee('.ctn3 ul');
	$('.autoplay').kxbdMarquee();

	$('.autoplay ul li').click(function(){
		var path = $(this).find('a img').attr('src')
		$('.ctn3 .left img').attr('src', path);
		return false;
	});
	submit('.dialog .form form');
	//console.info(marquee);
});