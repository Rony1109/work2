csc.contact = function (ele){
	var $e = $(ele),
		memberid = $e.data("memberid"),
		_addInfo = function (info){
			$e.addClass("cached").before('<div class="fllow-contact-info"><span class="up-arr"></span><ul>'+(info || '<li class="g-t-c">该商家未填写联系人信息</li>')+'</ul></div>');
		},
		_format = function (data){
			for(var i in data){
				data[i] !== null || (data[i] = "");
			}
			return data;
		},
		_cutEmail = function (email){
			email += "";
			if(email.length<21){
				return '<li><span class="flc-key">邮　箱：</span>' + email + '</li>';
			}else{
				var tmp = '<li title="'+email+'" class="flc-email"><span class="flc-key">邮　箱：</span>';
				email = email.substr(0,20);
				return tmp += email +'<span class="flc-more">…</span></li>'
			}
		},
		_im = function (id,type){
			if(!id) return '';
			var
				type = type || "qq",
				href = type == "qq" ? "http://wpa.qq.com/msgrd?v=3&uin="+id+"&site=qq&menu=yes" : "http://www.taobao.com/webww/ww.php?ver=3&touid="+encodeURIComponent(id)+"&siteid=cntaobao&status=2&charset=utf-8",
				src = type == "qq" ? "/image/m/third-im/qq.gif" : "/image/m/third-im/ww.gif";
			return '<img border="0" width="21" height="21" src="'+csc.url("res",src)+'" data-href="'+href+'" alt="点击这里给我发消息" title="点击这里给我发消息" onclick="window.open($(this).data(\'href\'))"/>';
		},
		_formatContact = function (data){
			var
				position = data.position?' ('+data.position+')':'',
				contact = data.contact + position;
			contact = ((data.qqNo || data.wangwang) && contact.length > 8) ? '<span title="'+contact+'" class="flc-val">'+contact.substr(0,8)+'…</span>' : contact;
			return '<li><span class="flc-key">联系人：</span>'+contact+_im(data.qqNo)+_im(data.wangwang,"wangwang")+'</li>';
		};
	if($("#contactStyle").length == 0){
		$("body").append('<style id="contactStyle">.fllow-contact-info{position:absolute;margin-top:26px;background:#fff;z-index:10;}.ci-contact .fllow-contact-info{margin-top:44px}.item .fllow-contact-info{margin-left:-100px}.cl-item .fllow-contact-info{margin-left:-130px}.fllow-contact-info .up-arr{position:absolute;display:block;width:15px;height:8px;margin:-7px 0 0 30px;background:url('+csc.url("res")+'/css/c/detail/img/ask-icon.png) 0 -100px;overflow:hidden}.item .fllow-contact-info .up-arr{margin-left:128px}.cl-item .fllow-contact-info .up-arr{margin-left:142px}.fllow-contact-info ul{width:192px;padding:6px 10px;border:solid 1px #7dbfe9;overflow:hidden}.fllow-contact-info ul li{float:none !important;width:192px !important;height:22px;line-height:22px;white-space:nowrap;}.fllow-contact-info ul li span{display:inline;color:#333}.fllow-contact-info ul li img{margin:0 2px;cursor:pointer}.fllow-contact-info ul .g-t-c{text-align:center}.fllow-contact-info ul li .flc-k{display:inline;color:#666}.fllow-contact-info .flc-email{cursor:pointer}.fllow-contact-info .flc-more{margin-left:4px;color:#067ed4}</style>');
		$(document).on("click",function (event){
			if($(event.target).closest("div.fllow-contact-info").length == 0){
				$("div.fllow-contact-info").addClass("g-v-h");
			}
		});
	}
	if($e.is(".cached")){
		$e.prev("div.fllow-contact-info").toggleClass("g-v-h");
	}else{
		$.get(csc.url("api","/member/contact.html"),{memberid:memberid},function (data){
			if(data.status){
				var data = _format(data.data);
				_addInfo(_formatContact(data)+'<li><span class="flc-key">电　话：</span>'+data.telephone+'</li><li><span class="flc-key">手　机：</span>'+data.moblie+'</li>'+_cutEmail(data.email));
			}else{
				_addInfo();
			}
		},"jsonp");
	}
	return false;
};