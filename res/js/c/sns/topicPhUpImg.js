 /*$(function(){
		  //alert($(".ke-icon-multiimage").length);
	var imgUrl=csc.url("img");
	$(".ke-icon-multiimage").click(function(){
		csc.useDialog(function(){
			artDialog({
				title:'上传图片',
				cancelVal:'取消',
				cancel: true,
				content: "<iframe src='//quan.csc86.com/picupload.html' id='editTopicImg' frameborder='0' scrolling='no'></iframe>",
				okVal: '插入图片',
				padding:"0 10px",
				ok:function(){
					var iul=$("#upMsg",$("#editTopicImg").contents()),
						imgLg=$("#upMsg",$("#editTopicImg").contents()).children("li").html(),
						img=[],
						$lg=$("#upMsg",$("#editTopicImg").contents()).children("li").length;
					if($lg<=0){
						csc.useDialog(function(){csc.alert("未有图片，请选择图片！");});
						return false;
					}else if(imgLg.indexOf("图片上传中")>0){
						csc.useDialog(function(){csc.alert("图片正在上传，请稍等！");});
						return false;
					}else if($lg>10){
						csc.useDialog(function(){csc.alert("最多10张图片！");});
						return false;
					}else{
						if($lg>0){
							for(var i=0;i<$lg;i++){
								if($("#upMsg",$("#editTopicImg").contents()).children("li").eq(i).html().indexOf("上传失败")>0){
									
								}else{
									img.push("<img alt='' src='"+imgUrl+$("#upMsg",$("#editTopicImg").contents()).children("li").eq(i).children("a").attr("data-img")+"' />");
								}
								
							}
							//alert(img.join(''));return;
							var imgall=img.join('');
							Kmsg_text.insertHtml(imgall);
						}
					}
				},
				fixed: true,
				background:"#000",
				opacity:"0.3",
				lock:true
			});	
		});
	});
})*/