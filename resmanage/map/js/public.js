
/*
 copyright by zzjwd!QQ:550703900;
 */


//version1.0 版本记录;2012.3.20第一次更新;All Rights Reserved zzjwd;
//常用正则表达式验证;   
//reg=/^[-+]?\d+$/;整数表达式;
//reg=/^[\u4e00-\u9fa5]+$/;中文串表达式;
//reg=/^\w{3,}@\w+(\.\w+)+$/;email表达式;
//reg=/^[a-z,A-Z]+$/;//只能输入字符串表达式;
//reg=/^(\d{3,4}\-)?[1-9]\d{6,7}$/;电话号码表达式;
//reg=/^(\+\d{2,3}\-)?\d{11}$/;移动电话表达式;
//reg=/^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/; url表达式;
//reg;xinid=/^\(d{15})|(\d{17}(\d|x))$/;公民身份证，中国;
//dater:/\d{4}[-|.]\d{2}[-|.]\d{2}$/;日其表达式;
//imgname:/.[jpg|bmp|png|gif]$/图片名表达;
var reg = {
    zhongwen: /^[\u4e00-\u9fa5]{2,}$/,
    interger: /^[-+]?\d+$/,
    email: /^\w{3,}@\w+(\.\w+)+$/,
    string: /^[a-z,A-Z]+$/,
    tel: /^(\d{3,4}(\-)?)?[1-9]\d{6,7}$/,
    mobile: /^(\+?\d{2,3}\-)?\d{11}$/,
    url: /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
    xinid: /^(\d{17}[\d|X])|\d{15}$/,
    sex: /^(男|女){1}$/,
    phone:/^\d{11}$/,
    dater: /\d{4}[-|.]\d{1,2}[-|.]\d{1,2}$/,
    imgname: /.[jpg|bmp|png|gif]$/
}//end;
function isReg(reg, obj) {//0表示不对，1表示匹配;  
    if (!reg.test($.trim($(obj).val()))) {
        return false;
    } else {
        return true;
    }
} //end;
//常用正则表达式结束;

//常用函数 开始;
function switchStyle(obj, cn1, cn2) {//交换样式，把cn1样式替换成cn2样式;obj为$对像;
    $(obj).removeClass(cn1);
    $(obj).addClass(cn2);
} //end;
function onlyAddOneStyle(obj, cn) {//仅仅为对像添加一个样式;
    $(obj).removeClass();
    $(obj).addClass(cn);
} //end;

function setOddEven(id,cno,cne){
	$(id).each(function(i){
		if(i%2==0){
			$(this).addClass(cno);
		}else{
			$(this).addClass(cne);
		}
	});
}//setOddEven end;
function hover(id, cnv, cno) {//鼠标mouseover and mouseout事件效果;
    $(id).mouseover(function () {
        $(this).removeClass(cno);
        $(this).addClass(cnv);
    }).mouseout(function () {
        $(this).removeClass(cnv);
        $(this).addClass(cno);
    });
} //end;

function onFoucs(id, cnv, cno) {//当有焦点时，样式效果;
    $(id).focus(function () {
        $(this).addClass(cnv);
        $(this).removeClass(cno);
    }).blur(function () {
        $(this).addClass(cno);
        $(this).removeClass(cnv);
    });
}
//常用函数 结束;

//process xml file;导入xml一般会报错，原因主要是xml文档本身字符编码不一致
//引起，解决办法是把xml重新另存为先字符编码为utf-8即可，验证一个xml文档是否
//正确，如果能用ie打开就说明文档本身没有问题。
function loadXML(id, url, node) {//url要导入的xml地址;node xml中的结点名;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: function (d) {
            var html = "";
            $(d).find(node).each(function (i) {
                html += "<option>" + $(this).attr("name") + "</option>";
            });
            $(id).html(html);
        },
        error: function (d) { alert('err:ajax报错'); }
    });
} //end;
//非常好的ajax调用工具;
function ajaxSend(querystr, url, fn) {//说明，只有type为get的时候才能有查询字符串;
    $.ajax({
        type: "get",
        url: url,
        data: querystr, //例如："name=John&location=Boston";
        success: fn,
        error: function (d) {
            alert("出错了"+this.url);
            //alert(d);
        }
    });
} //end;

//非常好的ajax调用工具;
function ajaxSendx(querystr, url,fn) {//说明，只有type为get的时候才能有查询字符串;
    $.ajax({
        type: "get",
        url: url,
        dataType:"json",
        data: querystr, //例如："name=John&location=Boston";
        success: fn,
        error: function (d,d1,d2) {
            //alert(this.url);
            alert(d1);
        }
    });
} //end;
function bindAjax(id, url, qstr, evt, fn) {//fn是调用成功时的回调函数;
    $(id).bind(evt, function () {
        ajaxSend(qstr, url, fn);
    });
} //end;
function redrectUrl(evt) {//返回到页面;evt,为什么回调函数参数，与bindEvent(id,evt,fn,parv1,parv2)一起使用;
    window.location.href = evt.data.par1;
} //end;


//设为首页，加入收藏
/*加入收藏夹
调用方法：
<a onclick="AddFavorite(window.location,document.title)">加入收藏</a>
<a onclick="SetHome(this,window.location)">设为首页</a>

*/

function addFavorite(url, tit) {
    try {
        window.external.addfavorite(url, tit);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(tit, url, "");
        }
        catch (e) {
            alert("加入收藏失败，请使用ctrl+d进行添加");
        }
    }
} //end;

/*设为首页*/
function setHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(vrl);
    }
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
} //end;
//汇总调用---
function setHF(idh, idf, url, tit) {
    $(idh).click(function () {
        addFavorite(url, tit);
    });
    $(idf).click(function () {
        setHome($(idf)[0], url);
    });
} //end;
function bindEvent(id, evt, fn, parv1, parv2) {//绑定一个事件，并带处理过程;
    $(id).bind(evt, { par1: parv1, par2: parv2 }, fn);
} //end;


//表单js提交;
function clickForm(id, fm, url, qt, mthod) {//提交无检测;
    $(id).click(function () {
        $(fm).attr("action", url);
        if (mthod == null || mthod == "") {
            mthod = "post";
        }
        $(fm).attr("method", mthod);
        $(fm)[0].submit();
    });
} //end;
function submitForm(fm, url, mthod, enctype) {//无动作提交;就是说还需要增加单击事件，其实就是无提交;
    $(fm).attr("action", url);
    if (mthod == null || mthod == "") {
        mthod = "post";
    }
    if (enctype != null || enctype != "") {
        $(fm).attr("enctype", "multipart/form-data"); //文件当类型js写不进去;
        alert("ccc");
    }
    $(fm).attr("method", mthod);
    alert("bb");
    alert($(fm).attr("enctype"));
    document.getElementById("fm").submit();
} //end;

	//ajust current href,then according to it to call js;
	
	function doCurrentHref(){
		var strHref=arguments[0]?arguments[0]:"";
		var fn=arguments[1]?arguments[1]:function(){};
		if(document.URL.indexOf(strHref)>=0){
			fn();
		}
	}// ajustCurrentHref end;
	
	//id 要取消的标签组id;
	function cancelStyle(id,styleName,styleValue,isFirst){//isFirst is 1:first,or end;
		if(isFirst){
			$(id+":first").css(styleName,styleValue);
		}else{
			$(id+":last").css(styleName,styleValue);
		}
	}
//copyright by zzjwd on 2012.10.10;

//copyright by zzjwd on 2012.10.10;
var UTool = {
    Hashtable:function (){
            this.container = new Object();

            this.put = function (key, value){
                if (typeof (key) == "undefined"){
                    return false;
                } 
                if (this.contains(key)){
                    return false;
                } 
                this.container[key] = typeof (value) == "undefined" ? null : value;
                return true;
            };
            this.remove = function (key){
                delete this.container[key];
            };
            this.size = function (){
                var size = 0;
                for (var attr in this.container) {
                    size++;
                }
                return size;
            };
            this.get = function (key){
                return this.container[key];
            };
            this.contains = function (key){
                return typeof (this.container[key]) != "undefined";
            };
            this.clear = function () {
                for (var attr in this.container){
                    delete this.container[attr];
                }
            };
            this.toString = function(){
                var str = '';
                for (var attr in this.container){
                    str += ',"' + attr + '":"' + this.container[attr]+'"';
                }
                if(str.length>0){
                    str = str.substr(1, str.length);
                }
                return "{" + str + "}";
            };
        }//Hashtable end;

}//UTool end;

function getFormData(obj) {
    var ht = new UTool.Hashtable();
    obj.each(function (i) {
        ht.put($(this).attr("name"),encodeURI($(this).val()));
    });
    return ht.toString();
} //getInputValue end;

function getBasePath(){
	var reg = /^http:\/\/[^\/]+\//i;
	return location.href.match(reg)+"bops-app/bops/";
}//getBasePath end;


function isR(reg, obj) {//0表示不对，1表示匹配;  
    if (!reg.test($.trim(obj))) {
        return false;
    } else {
        return true;
    }
} //end;
//常用正则表达式结束;


function getFormDataY(obj,gz){
  var ht=new UTool.Hashtable();
  var flag=0;
  obj.each(function(i){
  	if(($(this).attr("type")=="checkbox")){
  			if($(this)[0].checked){
  				$(this).val("1");
  			}else{
  				$(this).val("0");
  			}
  		}
  	if(typeof(gz[i])=="string"){
  		
  		if(($(this).val()!="")&&(!isR(reg[gz[i]],$(this).val()))){
  			$(this).css("border","1px solid red");
  			alert("输入有错误!");
  			flag=1;
  		}
  	}else{
  		if($(this).val().length>gz[i]){
  			$(this).css("border","1px solid red");
	  		alert("输入的长度过长了!");
	  		flag=1;
  		}
  	}
  	ht.put($(this).attr("name"),encodeURI($(this).val()));
  });
  if(flag==1){
  	return false;
  }
  return ht.toString();
}//getFormDataY end;


	