$(function(){

	$.get(csc.url("api","/member/isLogin.html"),function (data){
		console.log(data)
			if(data.status){
			   var para=data.data.memberId;

				$("#con-login").html(' <textarea name="" cols="" id="areaSource" rows="" class="area">Hi，亲爱的朋友，推荐你一个免费B2B平台，汇集最新采销商机，1分钟免费开店！涵盖B2B100多个行业，亿万采购商等你开店报价。http://member.csc86.com/register/phonereg/?inviteId='+para+'</textarea>').siblings(".copy").css("display","block");

			}

	},"jsonp");	
});