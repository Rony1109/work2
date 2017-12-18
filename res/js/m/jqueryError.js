/*
window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
 console.log("错误信息：" , errorMessage);
 console.log("出错文件：" , scriptURI);
 console.log("出错行号：" , lineNumber);
 console.log("出错列号：" , columnNumber);
 console.log("错误详情：" , errorObj);
 };
 throw new Error("出错了！");
function ajaxset(){
    document.domain.indexOf("csc86.com")>=0&&typeof $ === 'function'&&$.ajaxSetup( {
        error: function(jqXHR, textStatus, errorMsg){ // 出错时默认的处理函数
            // jqXHR 是经过jQuery封装的XMLHttpRequest对象
            var Poweredby=jqXHR.getResponseHeader("X-Powered-By")?jqXHR.getResponseHeader("X-Powered-By"):'java';
            var dataobj={"interfaceName":this.url,"currentPage":location.href,"interfaceState":jqXHR.status,"errorMessage":errorMsg,"errorText":textStatus,"requestMode":this.type,"requestType":this.dataType,"browserHeader":navigator.userAgent,"operatingSystem":navigator.platform,"webServer":jqXHR.getResponseHeader("Server"),"language":Poweredby,"datetime":new Date(jqXHR.getResponseHeader("Date")).getTime(),"repairStatus":0};
            $.post('//programlog.csc86.com/saveResLog.html?',dataobj,function(){},'json');
            			console.log('接口名称：'+this.url);
             console.log('接口状态：'+jqXHR.status);
             console.log('错误信息：'+errorMsg);
             console.log('错误文本：'+textStatus);
             console.log('请求方式：'+this.type);
             console.log('请求类型：'+this.dataType);
             console.log('当前页面：'+location.href);
             //console.log('mime：'+this.contentType);
             console.log('web服务：'+jqXHR.getResponseHeader("Server"));
             console.log('后端执行语言：'+Poweredby);
             console.log('浏览器报头：'+navigator.userAgent);
             console.log('操作系统：'+navigator.platform);
             console.log('响应时间：'+new Date(jqXHR.getResponseHeader("Date")).getTime());
             //console.log(jqXHR.getAllResponseHeaders());
             //console.log(document.cookie);
        }
    })
};

seajs?seajs.use([],function(){ajaxset()}):ajaxset();
*/
