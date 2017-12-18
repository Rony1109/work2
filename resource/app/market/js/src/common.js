define(function(require, exports, module) {
	// var debug=require("debug");
	var common={
		//ios传值
		datatrans:function(){						
			$("body").on("click","a[data-href]",function(e){				
				e.preventDefault();
				var href=$(this).data("href");
				// console.log(href);
				// debug.log(href);
				common.loadURL("gsc://"+href);
			});
		},
		loadURL:function(url) {
			var iFrame;
			iFrame = document.createElement("iframe");
			iFrame.setAttribute("src", url);
			iFrame.setAttribute("style", "display:none;");
			iFrame.setAttribute("height", "0px");
			iFrame.setAttribute("width", "0px");
			iFrame.setAttribute("frameborder", "0");
			document.body.appendChild(iFrame);
			// 发起请求后这个iFrame就没用了，所以把它从dom上移除掉
			iFrame.parentNode.removeChild(iFrame);
			iFrame = null;
		},
		// 地址栏参数解析	
		GetQueryString:function(name){
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null) return  unescape(r[2]); 
		     return null;
		}
	};
	
	module.exports=common;
	
});