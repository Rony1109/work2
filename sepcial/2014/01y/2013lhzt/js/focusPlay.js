csc = {};

csc.playStyle = function(li, style) {

	var

		ul = li.parent(),

		n = li.index();

	ul.stop(true);

	switch (style) {

		case 1:

		case "top":

			ul.animate({marginTop: -li.height() * n}, "fast");

			break;

		case 2:

		case "left":

			ul.animate({marginLeft: -li.width() * n}, "normal");

			break;

		default:

			li.fadeIn("normal").siblings(":visible").fadeOut("fast");

	}

	return this;

};

csc.foucsPlay = function(id, li, time, cur, style, tStyle) {

	

	var

		othis = this,

		$id = $(id),

		li = li || "ul.c>li",

		$uli = $id.find(li),

		$tli = $id.find("ul.t>li"),

		$length = $uli.length,

		time = time || 6000,

		cur = cur || "cur",

		style = style || 0,

		tStyle = tStyle || 0,

		$ol = '<ol><li class="cur">1</li>',

		n = 0;

	if($length < 2){return};

	for (var i = 2; i <= $length; i++) {

		$ol += "<li>" + i + "</li>";

	}

	$ol += "</ol>";

	$id.append($ol);

	$ol = $id.find("ol>li")

	var

		play = function() {

			$uli.stop(true, true);

			$ol.stop(true, true);

			othis.playStyle($uli.eq(n), style);

			if ($tli.length) {

				$tli.stop(true, true);

				othis.playStyle($tli.eq(n), tStyle);

			}

			$ol.eq(n).addClass("cur").siblings().removeClass();

			n = (n == $length - 1) ? 0 : n + 1;

		};

	playIng = setInterval(play, time);

	csc.hover = function(w) {

		$(w).hover(function() {

			clearInterval(playIng);

			n = $(this).index();

			play();

		}, function() {

			playIng = setInterval(play, time);

		});

	};

	csc.hover($uli);

	csc.hover($ol);

	//csc.hover("#adv-upload>li>img");

	return this;

};





csc2 = {};

csc2.playStyle = function(li, style) {

	var

		ul = li.parent(),

		n = li.index();

	ul.stop(true);

	switch (style) {

		case 1:

		case "top":

			ul.animate({marginTop: -li.height() * n}, "fast");

			break;

		case 2:

		case "left":

			ul.animate({marginLeft: -li.width() * n}, "normal");

			break;

		default:

			li.fadeIn("normal").siblings(":visible").fadeOut("fast");

	}

	return this;

};

csc2.foucsPlay = function(id, li, time, cur, style, tStyle) {

	

	var

		othis = this,

		$id = $(id),

		li = li || "ul.d>li",

		$uli = $id.find(li),

		$tli = $id.find("ul.e>li"),

		$length = $uli.length,

		time = time || 6000,

		cur = cur || "cur",

		style = style || 0,

		tStyle = tStyle || 0,

		//$ol = '<ol><li class="cur">1</li>',

		n = 0;

	//if($length < 2){return};

	//for (var i = 2; i <= $length; i++) {

		//$ol += "<li>" + i + "</li>";

	//}

	//$ol += "</ol>";

	//$id.append($ol);

	$ol = $id.next("ol").children();

	var

		play = function() {

			$uli.stop(true, true);

			$ol.stop(true, true);

			othis.playStyle($uli.eq(n), style);

			if ($tli.length) {

				$tli.stop(true, true);

				othis.playStyle($tli.eq(n), tStyle);

			}

			$ol.eq(n).addClass("cur").siblings().removeClass();

			n = (n == $length - 1) ? 0 : n + 1;

		};

	playIng = setInterval(play, time);

	csc2.hover = function(w) {

		$(w).hover(function() {

			clearInterval(playIng);

			n = $(this).index();

			play();

		}, function() {

			playIng = setInterval(play, time);

		});

	};

	csc2.hover($uli);

	csc2.hover($ol);

	//csc2.hover("#adv-upload>li>img");

	return this;

};



csc3 = {};

csc3.bigImg = function(){

	var dimg = $(".d_img"),

		curpage = $(".curpage"),

		totalpage = $(".totalpage"),

		smallDiv = $(".small_img > div"),

		smallImg = $(".small_img > div >a"),

		smallWidth = smallImg.outerWidth(true),

		alength = smallImg.length,

		allWidth = alength*smallWidth,

		dnews = $(".d_news"),

		nextBtn = $(".right_btn"),

		leftBtn = $(".left_btn"),

		hoverLdiv = $(".lclick"),

		showLdiv = $(".lbtn"),

		hoverRdiv = $(".rclick"),

		showRdiv = $(".rbtn"),

		noTips = $(".none_tips"),

		cur = "small_cur",

		l = 9;

	dimg.children().first().fadeIn("slow");

	dnews.children().first().fadeIn("slow");

	smallImg.siblings().removeClass(cur);

	smallImg.first().addClass(cur);

	csc3.page(curpage,totalpage,alength,1);

	smallImg.each(function(i){

		$(this).on("click",function(){

			noTips.hide();

			dimg.children().hide();

			dimg.children().eq(i).fadeIn("slow");

			dnews.children().hide();

			dnews.children().eq(i).fadeIn("slow");

			$(this).siblings().removeClass(cur);

			$(this).addClass(cur);

			csc3.page(curpage,totalpage,alength,i+1);

		});

	});

	csc3.focusLbtn(hoverLdiv,showLdiv,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips);

	csc3.focusRbtn(hoverRdiv,showRdiv,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips);

	csc3.next(nextBtn,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips);

	csc3.prev(leftBtn,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips);

};

csc3.next = function(nextBtn,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips){

	nextBtn.on("click",function(){

		noTips.hide();

		var v = $("."+cur).index(),

			ml = smallDiv.css("margin-left");v++;

		var	c = smallWidth*v-parseInt(ml);

		if(v % l == 0){

			if(c < allWidth){

				smallDiv.animate({marginLeft:"-"+c},500);

			}else{noTips.fadeTo("slow",0.6);return false;}

		}else if(v >= alength){noTips.fadeTo("slow",0.6);return false;}

		csc3.page(curpage,totalpage,alength,v+1);

		dimg.children().hide();

		dimg.children().eq(v).fadeIn("slow");

		dnews.children().hide();

		dnews.children().eq(v).fadeIn("slow");

		smallImg.siblings().removeClass(cur);

		smallImg.eq(v).addClass(cur);

	});

};

csc3.prev = function(leftBtn,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips){

	leftBtn.on("click",function(){

		noTips.hide();

		var v = $("."+cur).index(),

			ml = smallDiv.css("margin-left");

		var	c = smallWidth*v+parseInt(ml);

		if(v % l == 0){

			if(c >= 0){

				smallDiv.animate({marginLeft:+c},500);

			}else{noTips.fadeTo("slow",0.6);return false;}

		};

		if(v == 0){noTips.fadeTo("slow",0.6);return false;}else{v--}

		csc3.page(curpage,totalpage,alength,v+1);

		dimg.children().hide();

		dimg.children().eq(v).fadeIn("slow");

		dnews.children().hide();

		dnews.children().eq(v).fadeIn("slow");

		smallImg.siblings().removeClass(cur);

		smallImg.eq(v).addClass(cur);

	});

};

csc3.page = function(curpage,totalpage,alength,v){

	curpage.empty();

	totalpage.empty();

	curpage.html(v);

	totalpage.html(alength);

};

csc3.focusFun = function(hoverDiv,showDiv){

	var Hdiv = $(hoverDiv),

		Sdiv = $(showDiv);

	if($.browser.msie){

		Sdiv.fadeTo("slow",0.4);

	}else{

		Hdiv.hover(function(){

			Sdiv.fadeTo("slow",0.6);

		},function(){

			Sdiv.hide();

		});

	}

};

csc3.focusLbtn = function(hoverLdiv,showLdiv,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips){

	csc3.focusFun(hoverLdiv,showLdiv);

	csc3.prev(showLdiv,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips);

};

csc3.focusRbtn = function(hoverRdiv,showRdiv,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips){

	csc3.focusFun(hoverRdiv,showRdiv);

	csc3.next(showRdiv,dimg,dnews,smallImg,cur,l,smallDiv,smallWidth,allWidth,alength,curpage,totalpage,noTips);

};