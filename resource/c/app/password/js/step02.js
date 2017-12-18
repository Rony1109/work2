	var codeForm=document.getElementById("codeForm");
	function CheckCode(opt){
		this.input = opt.input,
		this.subtn = opt.subtn,
		this.init();
	}
	CheckCode.prototype={
		init:function(){
			var self=this;
			this.input.addEventListener("keyup",function(){
				var value=this.value;
				if(value.length>=6){
					this.value=value.slice(0,6);
				}
			},false);
			this.subtn.addEventListener("touchstart",function(){
					this.style.backgroundColor="#F46800";
			},false);
			this.subtn.addEventListener(touchEnd,function(){
				this.style.backgroundColor="#ff6d00";
				if(/^\d{6}$/.test(self.input.value)){			
					codeForm.submit();
				}else{
					alert("验证码输入错误，请重新输入！")
				}
			},false)
		}
	}
	var checkcode=new CheckCode({
		input:document.getElementById("code"),
		subtn:document.getElementsByClassName("sumbit")[0]
	});
	~function(){
		var djs=document.getElementsByClassName("djs")[0],
			timeEle=document.getElementsByClassName("timeEle")[0],
			verificationCode=document.getElementsByClassName("verificationCode")[0],
			bool=false;
		var dest=document.getElementsByClassName("userName")[0].value,count;	
		count=getCookie(dest);
		count>0 ? count-- : count=0;
		setCookie(dest,count,1);
		timeEle.innerHTML=count;
		djs.addEventListener("touchstart",function(){
				this.style.backgroundColor="#D5D3D3";
		},false);
		djs.addEventListener(touchEnd,function(){
			var times = parseInt(timeEle.innerHTML);
			if(bool && times>0 && count>0){		
				bool=false;
				this.style.backgroundColor="transparent";
				hostPost('//i.csc86.com/php.getNewCode?dest='+dest,{method:"get"},function(data){
					if (data.status) {
						times>0 ? times-- : time=0;
						verificationCode.value=data.verificationCode;
						timeEle.innerHTML=times;
						count>0 ? count-- : count=0;
						setCookie(dest,count,1);
						djs.innerHTML="<span class='seconds'>60</span>秒后可重新获取验证码";
						countDown();
					}else{
						 alert(data.msg || '获取失败，请稍后重试！');
						 bool=true;
					}
				});
			}
		},false);
		
		window.onload=function(){
			countDown();
		}
		
		//倒计时方法
		function countDown(){
			var seconds=document.getElementsByClassName("seconds")[0],
				secondtimes=parseInt(seconds.innerHTML),
				i=secondtimes;
			(function(i){
				setTimeout(function(){
					i--;
					seconds.innerHTML=i;
					if(i>0){
						setTimeout(arguments.callee,1000)
					}else{
						djs.innerHTML="重新获取验证码";
						djs.style.backgroundColor="#ccc";
						bool=true;
					}
				},1000)
			})(i)		
		}
		
	}()
	
