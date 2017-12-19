var csc = {};
csc.tab = function(){
	var ck = $(".ck"),
		ck011 = "ck011",
		ck012 = "ck012",
		ck013 = "ck013",
		show = $(".showme");
	ck.children().each(function(i){
		ck.children().first().addClass("ck011");
		show.children().first().show();
		$(this).hover(function(){
			if(i == 0){
				ck.children().siblings().removeClass(ck011);
				ck.children().siblings().removeClass(ck012);
				ck.children().siblings().removeClass(ck013);
				ck.children().eq(i).addClass(ck011);
				show.children().siblings().hide();
				show.children().eq(i).show();
			}
			if(i == 1){
				ck.children().siblings().removeClass(ck011);
				ck.children().siblings().removeClass(ck012);
				ck.children().siblings().removeClass(ck013);
				ck.children().eq(i).addClass(ck012);
				show.children().siblings().hide();
				show.children().eq(i).show();
			}
			if(i == 2){
				ck.children().siblings().removeClass(ck011);
				ck.children().siblings().removeClass(ck012);
				ck.children().siblings().removeClass(ck013);
				ck.children().eq(i).addClass(ck013);
				show.children().siblings().hide();
				show.children().eq(i).show();
			}
		});
	});
};

csc.autoScroll = function(t,s){
	var pr = $(".grid"),
		s = 2000 || s * 1000,
		t = 1000 || t * 1000,
		h = pr.children().outerHeight(true),
		setTimes = setInterval(function(){
			pr.children().first().animate({marginTop:-h},t,function(){
				$(this).appendTo(pr).css("margin-top",0);
			});
		},s);
};

csc.yz = function(){
	var subtn = $("#subtn"),
		nick = $("#nick"),
		num = $("#num"),
		cname = $("#cname"),
		textarea = $("#textarea"),
		err = "<span class='erro'>*</span>",
		reg = /^([0-9]{11})?$/,
		flag = 0;
	subtn.on("click",function(){
		var nick_val = $.trim(nick.val()),
			num_val = $.trim(num.val()),
			cname_val = $.trim(cname.val()),
			textarea_val = $.trim(textarea.val()),
		flag = num_val.search(reg);
		nick.next().remove();
		num.next().remove();
		cname.next().remove();
		if(nick_val.length < 2 || nick_val.length > 10 || nick_val == ""){
			nick.after(err);
		}if(flag < 0 || num_val == ""){
			num.after(err);
		}if(cname_val.length < 4 || cname_val.length > 20){
			cname.after(err);
		}if($(".erro").length > 0){
			$(".erro").first().prev().focus();
			return false;
		}else{
			$.ajax({
				type: "POST",
				url: "http://cncms.csc86.com/formguide/index.php",
				async: false,
				data: {
					"formid":13,
					"subtype":"ajax",
					"dosubmit":"活动信息",
					"info[realname]":nick_val,
					"info[mobile]":num_val,
					"info[company]":cname_val,
					"info[description]":textarea_val
				},
				success: function(data){
					if(data.status == true){
						alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
						csc.clearInfo(nick,num,cname,textarea);
					}else{
						alert("申请失败，请刷新后重试！");
					}
				},
				dataType: "jsonp"
			});
		}
	});
};
csc.clearInfo = function(nick,num,cname,textarea){
	nick.val("");num.val("");cname.val("");textarea.val("");
};