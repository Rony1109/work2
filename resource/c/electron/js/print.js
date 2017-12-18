// JavaScript Document
define(function(require, exports, module) {
	require('m/top-bar/js/init');
	require('m/head-search/js/init');
/*	var gotop = require("./modules/gotop/dz_gotop");
	gotop.setmain({marginbottom:100,marginleft:0});*/
	printCon = function(id){
		$(id).click(function(){
			var code="<body onload=window.print()>",html='';
			 code+='<link rel="stylesheet" href="/v2/m/init/css/style.css"/><link rel="stylesheet" href="/v2/c/electron/css/base.css"/><link rel="stylesheet" href="/v2/c/electron/css/dz_ny.css"/><div class="news_det" style="width:760px; border:none;">';
			  html=$("div.news_det").html();
			  html=html.replace('<li><a class="print" href="javascript:;">打印</a></li>','');
			  code+=html;
			  code+='</div><script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script></body>';
			  var newwin=window.open('','','');
			  newwin.opener = null;
			  newwin.document.write(code);
			  newwin.document.close();
		});
		 
	};
	
	$(function(){printCon('a.print');})
});