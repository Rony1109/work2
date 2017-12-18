var config={
 "mapImgBasePath":"sz",
 "mapCellSize":"256",
 "mapViewWidth":"660",
 "mapViewHeight":"400",
 "mapViewLeft":"322",
 "mapViewTop":"113",
 "maxLevel":"7",
 "mapViewId":"vc",
 "mapId":"mp",
 "isCollapse":"0",
 "mapLeft":"mapL",
 "mapTop":"mapT"
}
var mapdata={//地图初始化数据;//w,h,cx,cy;
	"zoom_1":[1000,500,497,257],
	"zoom_2":[2000,1000,995,513],
	"zoom_3":[3000,1500,1492,768],
	"zoom_4":[4000,2000,1985,1029],
	"zoom_5":[5000,2500,2488,1282],
	"zoom_6":[6000,3000,2978.5,1557.5],
	"zoom_7":[7000,3500,3475,1817]
}//mapdata end;


//热区定义;热区的右上角定义，x,y,w,h,显示的提示框信息,热区的类型，类型分点击出提示，点击进下一层;
//type:0,表示普通热区,1表示跳进热区;
var areadata=[
		{"area":[3010,1011,548,940],"text":"皮革区","type":"1","nzoom":"7","czoom":"1234567",xid:"L"},
		{"area":[3858,925,470,1053],"text":"纺织区","type":"1","nzoom":"7","czoom":"1234567",xid:"T"},
		{"area":[3030,2593,542,940],"text":"电子印刷区","type":"1","nzoom":"7","czoom":"1234567",xid:"P"},
		{"area":[3900,2595,490,940],"text":"五金化工","type":"1","nzoom":"7","czoom":"1234567",xid:"M"},
		{"area":[2542,1928,50,30],"text":"麦当劳","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-190},
		{"area":[2350,1925,50,25],"text":"欢乐迪KTV","type":"0","czoom":"67",xid:"L","bg":"dicons.png","bx":-3,"by":-31},
		{"area":[2304,1925,50,30],"text":"时代金球影城","type":"0","czoom":"567",xid:"L","bg":"dicons.png","bx":-11,"by":0},
		{"area":[2549,1673,50,30],"text":"肯德基","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-255},
		{"area":[2396,1655,50,30],"text":"中国建设银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-122},
		{"area":[2405,1329,60,30],"text":"华盛奥特莱斯","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-3,"by":-355},
		{"area":[2513,1996,50,30],"text":"巴西烤肉","type":"0","czoom":"67",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[2522,2026,50,30],"text":"掌柜私房菜","type":"0","czoom":"67",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[2560,2000,50,30],"text":"南北药行","type":"0","czoom":"67",xid:"L","bg":"dicons.png","bx":-7,"by":-291},
		{"area":[3299,2100,50,30],"text":"七天连锁酒店","type":"0","czoom":"67",xid:"L","bg":"dicons.png","bx":-12,"by":-221},
		{"area":[3252,2100,30,30],"text":"工商银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-161},
		{"area":[3750,2101,50,30],"text":"维也纳酒店2座","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-7,"by":-320},
		{"area":[3750,1454,50,30],"text":"维也纳酒店1座","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-7,"by":-320},
		{"area":[3234,1500,50,30],"text":"农业银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-61},
		{"area":[3123,1490,50,30],"text":"如家酒店","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[3060,1489,20,30],"text":"宁波酒家","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-464},
		{"area":[4013,234,50,30],"text":"富豪酒家","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		
		
		{"area":[2425,1925,50,25],"text":"中国银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-14,"by":-93}
		
	]//areadata end;
	
//、、、、、、、、、、、、、肯德基；
var pts={
		 "cy":[
		{"area":[2542,1928,50,30],"text":"麦当劳","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-190},
		{"area":[2549,1673,50,30],"text":"肯德基","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-255},
		{"area":[2513,1996,50,30],"text":"巴西烤肉","type":"0","czoom":"67",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[2522,2026,50,30],"text":"掌柜私房菜","type":"0","czoom":"67",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[4577,587,50,30],"text":"开元餐饮","type":"0","czoom":"1234567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[3189,2116,50,30],"text":"湘粉人家","type":"0","czoom":"1234567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[3214,1583,50,30],"text":"和味豆浆王","type":"0","czoom":"1234567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[4565,1112,50,30],"text":"咖啡吧","type":"0","czoom":"1234567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[3289,1591,50,30],"text":"森田扒房","type":"0","czoom":"1234567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[2451,1979,50,30],"text":"滋乐滋乐小火锅","type":"0","czoom":"1234567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[3085,2116,50,30],"text":"上岛咖啡","type":"0","czoom":"1234567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[3035,2104,50,30],"text":"翠竹园快餐","type":"0","czoom":"1234567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
		{"area":[3752,1941,50,30],"text":"青岛啤酒文化广场","type":"0","czoom":"1234567",xid:"p","bg":"dicons.png","bx":-11,"by":0}
	],
	//、、如家快捷酒店、7天连锁酒店
		"dy":[
			{"area":[3123,1490,50,30],"text":"如家快捷酒店","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-466},
			//{"area":[3060,1489,20,30],"text":"宁波酒家","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-464},
			//{"area":[2889,2001,20,30],"text":"维也纳酒店","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-464},
			//{"area":[2889,2001,20,30],"text":"维也纳酒店","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-464},
			{"area":[3750,2101,50,30],"text":"维也纳酒店2座","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-7,"by":-320},
			{"area":[3750,1454,50,30],"text":"维也纳酒店1座","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-7,"by":-320},
			{"area":[3299,2100,50,30],"text":"7天连锁酒店","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-464},
			{"area":[1688,1249,50,30],"text":"薰衣草酒店","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-464},
			{"area":[4013,234,50,30],"text":"华南富豪酒家","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-17,"by":-466}
		],
		//时代进球影城、欢乐迪KTV、、、
	  "ktv":[
	  	{"area":[2304,1925,50,30],"text":"时代金球影城","type":"0","czoom":"567",xid:"L","bg":"dicons.png","bx":-11,"by":0},
	  	{"area":[1605,1279,50,30],"text":"浩林健身俱乐部","type":"0","czoom":"567",xid:"L","bg":"dicons.png","bx":-11,"by":0},
	  	{"area":[3076,1475,50,30],"text":"尚艺美发","type":"0","czoom":"567",xid:"L","bg":"dicons.png","bx":-11,"by":0},
	  	{"area":[1646,1333,50,30],"text":"张玉珊修身堂","type":"0","czoom":"567",xid:"L","bg":"dicons.png","bx":-11,"by":0},
	  	{"area":[3812,2084,50,30],"text":"浅水湾休闲会所","type":"0","czoom":"567",xid:"L","bg":"dicons.png","bx":-11,"by":0},
	  	{"area":[2541,1981,50,30],"text":"沙宣美发","type":"0","czoom":"567",xid:"L","bg":"dicons.png","bx":-11,"by":0},
			{"area":[2350,1925,50,25],"text":"欢乐迪KTV","type":"0","czoom":"67",xid:"L","bg":"dicons.png","bx":-3,"by":-31}
		],
		"yh":[
			{"area":[3234,1500,50,30],"text":"农业银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-61},
			{"area":[3252,2100,30,30],"text":"工商银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-161},
			{"area":[2396,1655,50,30],"text":"中国建设银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-122},
			{"area":[4274,813,50,30],"text":"中国邮政银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-122},
			{"area":[2134,2783,50,30],"text":"中国民生银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-11,"by":-122},
			{"area":[2425,1925,50,25],"text":"中国银行","type":"0","czoom":"34567",xid:"L","bg":"dicons.png","bx":-14,"by":-93}
		]
		
	}

var xy={
	"L":0,
	"T":1,
	"P":2,
	"M":3
}
/*全局模型*/

var g_var=new Object();
g_var.trace=null;
g_var.lineXid=0;
g_var.lineYid=0;
g_var.debug=false;
g_var.clickN=0;
g_var.path="//res.csc86.com/css/c/map/";
g_var.imgPath="//map.csc86.com/image/";
g_var.Base="";
g_var.noManage=0;
g_var.relPath="//map.csc86.com/ajax/map";
g_var.stimer=null;
g_var.mxy=[0,0];//鼠标停浮值;
g_var.mf=false;//移动标志;
g_var.clickf=true;//单击标志;
g_var.downf=false;//按下标志;

var template="<div id='tpin'><h1><img id='tpimg' src='{enterpriseImgUrl}'/><span id='tph' title='{enterpriseName}'><b>{enterpriseName}</b><i class='iren{isClaim}'></i></span><a id='zzjwd_close' href='javascript:;'></a></h1><div id='tphimg'><img id='himg' src='{userImgUrl}'/><div id='tpsinfor'><p><label>店　　主：</label>{contactPerson}</p><p><label>移动电话：</label>{phone}</p><p><b id='tpxy'>诚信服务，美好共赢</b></p></div></div><div id='tplinfor'><p><label>主营：</label><span>{industry}</span></p><p><label>铺位：</label><span>{shopId}</span></p><p><label>座机：</label><span>{telephone}</span></p></div><div id='wp'><i id='wpi'></i><a id='wpa' target='_blank' href='{shopAddress}'>旺铺</a><b id='product'>产品橱窗&gt;&gt;</b></div></div><ul id='tproduct'></ul>";
var template1="<div id='tpzx'><h1><span id='tph'>该商铺未有商家入驻，期待您的加盟</span><a id='zzjwd_close' href='#'></a></h1><h2><i class='zi'></i><span>招商电话：0755-28498888</span></h2><h2><i class='ci'></i><span>招商网址：<a href='//sz.csc86.com/invest/' target='_blank'>//sz.csc86.com/invest/</a></span></h2></div><!--tpin end-->";
var litemp="<li><a href='{shopAddress}{productid}' target='_blank'><img src='{pictUrl}'/></a><span><i></i><a href='{shopAddress}{productid}' target='_blank'>{productName}</a></span></li>";
var mingpL='<div class="pbox"><div class="cor"><h1><span>皮革原辅料市场</span><a id="close" href="javascript:;"></a></h1><img src="//res.csc86.com/css/c/map/img/pg.png"/><div class="tList"><p>全国最好的皮革批发基地</p><p>为您打造一条龙服务</p><h2>已有【<b>{number}</b>】家企业入驻</h2><p><a id="rz" href="//map.csc86.com/apply/signup.html" target="_blank"></a><a id="rn" href="//map.csc86.com/apply/shop.html" target="_blank"></a></p></div><div class="clear"></div><div><a id="enter" href="//map.csc86.com/sz/detail.html?area=l" target="_blank"></a></div></div><span class="jt"></span></div>';
var mingpT='<div class="pbox"><div class="cor"><h1><span>纺织服装原辅料市场</span><a id="close" href="javascript:;"></a></h1><img src="//res.csc86.com/css/c/map/img/t.png"/><div class="tList"><p>华南地区最大的纺织服装原料、辅料、面料集中市场</p><p>为您打造一条龙服务</p><h2>已有【<b>{number}</b>】家企业入驻</h2><p><a id="rz" href="//map.csc86.com/apply/signup.html" target="_blank"></a><a id="rn" href="//map.csc86.com/apply/shop.html" target="_blank"></a></p></div><div class="clear"></div><div><a id="enter" href="//map.csc86.com/sz/detail.html?area=t" target="_blank"></a></div></div><span class="jt"></span></div>';
var mingpM='<div class="pbox"><div class="cor"><h1><span>五金化工塑胶市场</span><a id="close" href="javascript:;"></a></h1><img src="//res.csc86.com/css/c/map/img/wu.png"/><div class="tList"><p>五金、化工、塑料生产厂家的直销基地，国内最大的国际化塑料物流中心</p><h2>已有【<b>{number}</b>】家企业入驻</h2><p><a id="rz" href="//map.csc86.com/apply/signup.html" target="_blank"></a><a id="rn" href="//map.csc86.com/apply/shop.html" target="_blank"></a></p></div><div class="clear"></div><div><a id="enter" href="//map.csc86.com/sz/detail.html?area=m" target="_blank"></a></div></div><span class="jt"></span></div>';
var mingpP='<div class="pbox"><div class="cor"><h1><span>电子印刷包装市场</span><a id="close" href="javascript:;"></a></h1><img src="//res.csc86.com/css/c/map/img/yin.png"/><div class="tList"><p>印刷纸品包装企业的采购平台，为您打造一条龙服务！</p><h2>已有【<b>{number}</b>】家企业入驻</h2><p><a id="rz" href="//map.csc86.com/apply/signup.html" target="_blank"></a><a id="rn" href="//map.csc86.com/apply/shop.html" target="_blank"></a></p></div><div class="clear"></div><div><a id="enter" href="//map.csc86.com/sz/detail.html?area=p" target="_blank"></a></div></div><span class="jt"></span></div>';