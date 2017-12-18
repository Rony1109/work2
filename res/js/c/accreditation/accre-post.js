 $(function(){
    //实体店认证（已实名重新认证）
  /* if(window.location.href.indexOf("Physicalstoredetailscertification")!=-1){
		$("span.aff-submit a.padd").click(function(){
			$.post("/accreditation/Physicalstoredetailscertification",function(data){
				if(data.status){
					location.href="/accreditation/Physicalstorefirstcertification";
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");	
		});
   }*/
   //实体店认证（未实名重新认证）
   if(window.location.href.indexOf("Physicalstoredetailscertification")!=-1){
		$("span.aff-submit a.padd").click(function(){
			$.post("/accreditation/Physicalstoredetailscertification",function(data){
				
				if(data.status){
					location.href="/accreditation/Physicalstorecertification";
				}else{
					csc.alert(data.msg);
				}
		 },"jsonp");	
		});
   }
     //实体店认证（已实名认证第二步）
   if(window.location.href.indexOf("physicalstorecertificationrealnamesecond")!=-1){
		$(".aff-submit input").on("click",function(){
			$.post("/accreditation/physicalstorecertificationrealnamesecond/second",function(data){
				if(data.status){
					$('#second').attr('action', "/accreditation/Physicalstorecertificationrealnamesecond").submit();
					//location.href="/accreditation/Physicalstorecertificationrealnamesuccess";
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");
			return false;
		});	
		
	}
   //实体店认证（未实名认证第三步）
   if(window.location.href.indexOf("Physicalstorethirdcertification")!=-1){
		 $(".localinfo-show .aff-submit input").on("click",function(){
			$.post("/accreditation/Physicalstorethirdcertification/second",function(data){
				if(data.status){
					$('#third').attr('action', "/accreditation/Physicalstorethirdcertification").submit();
					//location.href="/accreditation/Physicalstoresuccesscertification";
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");	
			return false;
		});		
	}
  //未实名实体店第四步
	if(window.location.href.indexOf("Physicalstoresuccesscertification")!=-1){
		$(".success-tips a").click(function(){
			$.post("/accreditation/Physicalstoresuccesscertification",function(data){
				if(data.status){
					location.href="/accreditation/Physicalstorefirstcertification";
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");	
		});
	}
	 //已实名实体店第四步
	if(window.location.href.indexOf("physicalstorecertificationrealnamesuccess/")!=-1){
		$(".success-tips a").click(function(){
			$.post("/accreditation/physicalstorecertificationrealnamesuccess",function(data){
				if(data.status){
					location.href="/accreditation/physicalstorecertificationrealnamefirst";
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");	
		});
	}
  //企业实名认证（重新认证）
   if(window.location.href.indexOf("Enterpriserealnamedetailsauthentication")!=-1){
		$(".aff-submit a.padd").click(function(){
			$.post("/accreditation/Enterpriserealnamedetailsauthentication",function(data){
				if(data.status){
					location.href="/accreditation/Enterpriserealnameblackauthentication";
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");	
		});		
	}
	 //企业实名认证（认证第三步）
   if(window.location.href.indexOf("Enterpriserealnamethirdauthentication")!=-1){
		/* $(".info-show .aff-submit input").on("click",function(){
			$.post("/accreditation/Enterpriserealnamethirdauthentication/second",function(data){
				if(data.status){
					$('#third').attr('action', "/accreditation/Enterpriserealnamethirdauthentication").submit();
					//location.href="/accreditation/Enterpriserealnamethirdauthentication";
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");	
			return false;
		});	*/	
	}
	//已实名企业认证第四步
	if(window.location.href.indexOf("Enterpriserealnamesuccessauthentication")!=-1){
		$(".success-tips a").click(function(){
			$.post("/accreditation/Enterpriserealnamesuccessauthentication",function(data){
				if(data.status){
					location.href="/accreditation/Enterpriserealnamefirstauthentication";
				}else{
					csc.alert(data.msg);
				}
			},"jsonp");	
		});
	}
});