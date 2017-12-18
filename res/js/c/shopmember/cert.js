csc.cert = {};
csc.cert.preview = function(id){
	var
		id = $(id);
	id.bind("click",function(event){
		event.preventDefault();
		var
			$t = $(this),
			srcPic = $t.find("img").attr("src"),
			width = 500,
			height = 400,
			msg='<img src="'+ srcPic +'" width="'+ width +'" height="'+ height +'" />',
			certName = $t.parent("td").next("td").text();
		csc.useDialog(function(){
			artDialog({
				content:msg,
				fixed: true,
				title:certName,
				lock:true
			});
		});
	});
};