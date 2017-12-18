var config={
 "mapImgBasePath":"images",
 "mapCellSize":"200",
 "mapViewWidth":"1100",
 "mapViewHeight":"400",
 "mapViewLeft":"0",
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
		{"area":[3010,1011,548,940],"text":"皮革区","type":"1","nzoom":"7","czoom":"1,2,3",xid:"L"},
		{"area":[3858,925,470,1053],"text":"纺织区","type":"1","nzoom":"7","czoom":"1,2,3",xid:"T"},
		{"area":[3030,2593,542,940],"text":"电子印刷区","type":"1","nzoom":"7","czoom":"1,2,3",xid:"P"},
		{"area":[3900,2595,490,940],"text":"五金化工","type":"1","nzoom":"7","czoom":"1,2,3",xid:"M"}
	]//areadata end;


/*全局模型*/

var g_var=new Object();
g_var.trace=null;
g_var.lineXid=0;
g_var.lineYid=0;
g_var.debug=false;
g_var.clickN=0;
g_var.path="http://resmanage.csc86.com/map/";
g_var.Base="";
g_var.noManage=0;
g_var.relPath="http://192.168.0.161:9097/map-app/map/";
g_var.stimer=null;
g_var.mxy=[0,0];//鼠标停浮值;
g_var.mf=false;