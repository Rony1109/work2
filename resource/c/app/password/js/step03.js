	var hastouch = "ontouchstart" in window?true:false,
	touchStart= hastouch?"touchstart":"mousedown",
	touchMove= hastouch?"touchmove":"mousemove",
	touchEnd = hastouch?"touchend":"mouseup";
	~function(){
		var submit=document.getElementsByClassName("submit")[0],
			pwd1=document.getElementById("pwd"),
			pwd2=document.getElementById("againPwd"),
			errtip=document.getElementsByClassName("errtip")[0],
			formBool=true;
		submit.addEventListener("touchstart",function(){
				this.style.backgroundColor="#F46800";
		},false);
		submit.addEventListener(touchEnd,function(){		
			this.style.backgroundColor="#ff6d00";
			var newPAS1=pwd1.value,
				newPAS2=pwd2.value;
			
			//验证判断
			if((newPAS1.length>=0 && newPAS1.length<6) || (newPAS2.length>=0 && newPAS2.length<6)){
				errtip.style.display="block";
				errtip.innerHTML="密码长度为6-20位";
				return;
			}else{
				if(newPAS1 != newPAS2){
					errtip.style.display="block";
					errtip.innerHTML="密码输入不一致，请重新输入";
					return;
				}else{
					var arr=[],item,bool=true;
					arr=Array.prototype.slice.call(newPAS1);
					item=arr[0];
					for(var i=1,len=arr.length;i<len;i++){
						(item != arr[i]) && (bool=false);
					}
					if(bool){				
						errtip.style.display="block";
						errtip.innerHTML="密码不能使用相同字符";
						return;
					}
				}
				errtip.style.display="none";
				if(formBool){	
					var memberId=document.getElementsByClassName('memberId')[0].value,
						dest=document.getElementsByClassName("dest")[0].value;
					hostPost("//i.csc86.com/php.phoneModifyPwd",{method:"post",data:"randPwd="+newPAS1+"&memberId="+memberId+"&dest="+dest},function(data){
						if(data.status){
							var warp=document.getElementsByClassName("warp")[0],
								suctip=document.getElementById("suctip"),
								a=suctip.getElementsByTagName("a")[0];
							warp.style.display="block",
							suctip.style.display="block";
							document.body.style.overflow="hidden";
							a.addEventListener("touchstart",function(){
									this.style.backgroundColor="rgb(236, 152, 0)";
							},false);
							a.addEventListener(touchEnd,function(e){
								this.style.backgroundColor="orange";
								if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
									window.location="http://hncwforgetpassword";
								}else if(navigator.userAgent.match(/android/i)) {	
									if(e.preventDefault){
										e.preventDefault();
									}else{
										e.returnValue=false;
									}
									window.demo.clickOnAndroid();
								}
							},false);							
						}else{
							 alert(data.msg || '修改失败，请稍后重试！');	
							 formBool=true;
						}
					})
				}
			}
		},false)
	}();