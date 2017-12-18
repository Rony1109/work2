csc.suggest = function (id){
	return;
	seajs.use(this.url("res","/f=css/m/suggest/style.css"));
	var
		othis = this,
		id = id || "form input[name='q'][autocomplete]",
		$id = $(id),
		kArr = [13,27,38,40],
		_getKeys = function (q){
			var	q = $.trim($id.val());
			if(!q){
				othis.oldSuggestQ = '';
				_hide();
				return;
			}
			q != othis.oldSuggestQ && $.get(othis.url("search","/offer/ajaxWord/"),{"q":q},function (d){
				othis.oldSuggestQ = q;
				d.length ? _show(d,q) : _hide() ;
			},"jsonp");
		},
		_show = function (d,q){
			var	tmp = "";
			$.each(d,function (i,v){
				tmp += '<li>' + v.replace(eval("/"+q+"/i"),"<em>"+q+"</em>")+ '</li>';
			});
			if($("div.g-suggest").length){
				$("div.g-suggest > ul").html(tmp);
			}else{
				$("body").append('<div class="g-suggest" style="margin-top:'+$id.outerHeight()+'px;width:'+$id.outerWidth()+'px"><ul>' + tmp + '</ul></div>');
			}
			var $gS = $("div.g-suggest");
			seajs.use(othis.url("res","/f=js/m/hover"),function (){
				othis.hover($gS.find("li"));
			});
			$gS.delegate("li","click",function (){
				$id.val($(this).text()).closest("form").trigger("submit");
				_hide();
			});
			if(othis.ie6){
				var	$ul = $gS.children("ul"),
						height = $ul.height();
				$gS.children("iframe").length ==1 || $gS.prepend('<iframe src="about:blank" frameborder="0" scrolling="no"/>');
				$gS.height(height);
				$ul.css("margin-top",(0-height));
			}
			$(window).resize(function (){
				$gS.css($id.offset());
			}).trigger("resize");
		},
		_hide = function (){
			$("div.g-suggest").remove();
		};
	$id.on("keydown",function (event){
		var	kC = event.keyCode;
		if($.inArray(kC,kArr) >0 && $("div.g-suggest").length > 0){
			var	li = $("div.g-suggest>ul>li"),
					cur = li.filter(".hover");
			switch(kC){
				case 13:
				$id.val(cur.text());
				_hide();
				break;
				case 27:
				$id.val(othis.oldSuggestQ);
				_hide();
				break;
				case 38:
				var	nCur=(cur.index()==0||cur.length<1)?li.last():cur.prev();
				nCur.addClass("hover");cur.removeClass("hover");
				$id.val(nCur.text());
				break;
				case 40:
				var	nCur=(cur.index()==li.length-1||cur.length<1)?li.first():cur.next();
				nCur.addClass("hover");cur.removeClass("hover");
				$id.val(nCur.text());
				break;
			}
		}else{
			setTimeout(_getKeys,40);
		}
	}).on("keyup",function (event){
		var	kC = event.keyCode;
		$.inArray(kC,kArr) < 0 && setTimeout(_getKeys,40);
	}).on("blur",function (){
		setTimeout(_hide,150);
	});
};