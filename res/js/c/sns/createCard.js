
(function createCard(){
	csc.useDialog(function(){
	 artDialog({
			content: '<iframe src="/personal/personal/guide" id="creCardSig" frameborder="0" scrolling="no"></iframe>',
			fixed: true,
			padding:"0 10px 0 10px",
			okVal: '生成个人名片',
			ok:function(){
				var $name=$("#name",$("#creCardSig").contents()).val();
				var $sel=$("#province",$("#creCardSig").contents()).children("option:selected").attr("value");
				var $city=$("#city",$("#creCardSig").contents()).children("option:selected").attr("value");
				var dataVal=$("#guideForm",$("#creCardSig").contents()).serialize();
				if($name==""&&$sel==""){
					$("#catProPo",$("#creCardSig").contents()).css("color","#f30");
					$("#catNamePo",$("#creCardSig").contents()).css("color","#f30");
					return false;
				}else if($sel==""||$city==""){
					$("#catNamePo",$("#creCardSig").contents()).css("color","#888");
					$("#catProPo",$("#creCardSig").contents()).css("color","#f30");
					return false;
				}else if($name==""){
					$("#catProPo",$("#creCardSig").contents()).css("color","#888");
					$("#catNamePo",$("#creCardSig").contents()).css("color","#f30");
					return false;
				}else{
						$.get("/personal/personal/edit?t=guide&data&"+dataVal+"&head="+$("#circleLogoUrl",$("#creCardSig").contents()).attr("value"),function(data){
							var $val=data.replace(/\s/g,'');
							if($val>=1){
								location.reload();
							}else{
								csc.alert("名片生成失败！");	
							}
						});
					}
				},
			opacity:"0.3",
			lock:true
		});
	});    
})();   
		   

