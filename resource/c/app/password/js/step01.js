	function userCode(opt){
		this.user = opt.userNum,
		this.btn = opt.btn,
		this.timeEle = opt.timeEle,
		this.times=opt.times,
		this.tipLoad=opt.tipLoad,
		this.init();
	}	
	userCode.prototype = {
		test:function(num){
			var res = /(^(13|15|17|18)\d{9}$)|(\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)/g;
			if(res.test(num)){
				return true;
			}else{
				return false;
			}
		},
		init:function(){
			var self = this,times=parseInt(self.times);
			self.btn.addEventListener("touchstart",function(){
					this.style.backgroundColor="#F46800";
			},false);
		
			self.btn.addEventListener(touchEnd,function(){
				this.style.backgroundColor="#ff6d00";
				var bool,
					tel = self.user.value.replace(/(^\s+)|(\s+$)/g,"");
				if(self.test(tel)){
					var  count=getCookie(tel);
					(count = null || count == "") && setCookie(tel,"3",1);	
					var  codeForm=document.getElementById("codeForm");
					codeForm.submit();	
				}else{
					alert("请按照正确的格式填写！");
				}
				
			},false)
		}
	}
	
	var usercode = new userCode({	
		userNum:document.getElementById("phone"),
		btn:document.getElementById("btn"),
		timeEle:document.getElementsByClassName("times")[0],
		times:document.getElementsByClassName("times")[0].innerHTML,
		tipLoad:document.getElementsByClassName("tipLoad")[0]
	}); 
	~function(){
		var tip1=document.getElementsByClassName("tip")[0],
			tip2=document.getElementsByClassName("tip")[1];
		if(tip2.innerHTML != "") tip1.style.display="none";
	}()