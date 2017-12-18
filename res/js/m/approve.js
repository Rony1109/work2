csc.approve = function(ele){
	var $e = $(ele);
		if ($e.find("span").hasClass("ico-20-real")) {
			approveTxt = "企业实名认证";
		}else if($e.find("span").hasClass("ico-20-entity")){
			approveTxt = "实体店认证";
		}
	if($e.is(".cached")){
		$e.next().toggleClass("g-v-h");
	}else{
	$("#approveStyle").length || $("body").append('<style id="approveStyle">.follow-approve-info{position:absolute;display:inline-block;margin:28px 0 0 -36px;_width:100px;padding:5px 10px;border:solid 1px #7dbfe9;background:#fff;z-index:10;}.follow-approve-info span{position:absolute;display:block;width:15px;height:8px;margin:-13px 0 0 0;background:url('+csc.url("res")+'/css/c/detail/img/ask-icon.png) 0 -100px;overflow:hidden}.follow-approve-info h5{color:#7dbfe9;}.follow-approve-info p{color:#666;}</style>');
	$e.addClass("cached").after('<div class="follow-approve-info"><span class="up-arr"></span><h5>'+ approveTxt +'</h5></div>');
	return false;
	};
};