/**
 * Register function for the  plugin.
 */
function providePlugin(pluginName, pluginConstructor) {
	var cscga = window[window['CSCAnalyticsObject'] || 'cscga'];
	if (typeof cscga == 'function') {
		cscga('provide', pluginName, pluginConstructor);
	}else{
		console.warn("cscplugin no found");
	}
}
/**
 * Constructor for the  plugin.
 */
var cscplugin = function(tracker, config) {
	this.tracker = tracker;
	this.eventCategory=config.eventCategory;
	this.eventAction = config.eventAction;
	this.eventLabel = config.eventLabel;
	this.eventValue=config.eventValue;
	this.data = config.data;
	this.mData=config.mData;
	this.isEcAction=config.isEcAction;
	this.ecActionType=config.ecActionType;
	this.userName = config.userName ;
	this.userId=config.userId;
	this.userKinds = config.userKinds;
	this.allprice = config.allprice;
	this.allSpecies = config.allSpecies;
	this.CpnPrc = config.CpnPrc;
	this.cpnid = config.cpnid;
	this.orderId = config.orderId;
	this.defaultbank = config.defaultbank;
	this.plantId = config.plantId;
	this.payMoney = config.payMoney;
	this.payNumber=config.payNumber;
	this.productId=config.productId;
	this.proType=config.proType;
	this.memberId=config.memberId;
	this.singlePrc=config.singlePrc;//产品单价
	this.dtlOptProNum=config.dtlOptProNum;//详情页当前点击加入采购单或立即下单时商品的数量
	this.searchKeyWord=config.searchKeyWord;//搜索的关键字
	this.searchKeyPrc1=config.searchKeyPrc1;//搜索价格关键字1
	this.searchKeyPrc2=config.searchKeyPrc2;//搜索价格关键字2
	this.province=config.province;//身份
	this.city=config.city;//市
	this.proFirstCat=config.proFirstCat;//产品一级分类
	this.proSecCat=config.proSecCat;//产品二级分类
	this.businessType=config.businessType;//商家类型
	this.prid=config.prid;//商品id
	this.shopId=config.shopId;//店铺id
	this.tabTxt=config.tabTxt;//tab对应的内容
	this.contact=config.contact;//联系人
	this.phone=config.phone;//联系方式
	this.ttl=config.ttl;//标题
	this.qq=config.qq;//qq
};

cscplugin.prototype.LoginInit= function() {
	var userName = this.userName;
	var eventAction =this.eventAction;
	var eventLabel=this.eventLabel;
	if (userName) {
		this.tracker.set('userName', userName);
	}
	if (eventLabel&&eventAction) {
		this.tracker.send('event',{
			'eventCategory': 'User',
			'eventAction': eventAction,
			'eventLabel' : eventLabel
		});
	}

};

cscplugin.prototype.RegisterInit= function() {
	var userName = this.userName;
	var userKinds = this.userKinds;
	var eventAction=this.eventAction;
	if (userName) {
		this.tracker.set('userName', userName);
	}
	if (userKinds) {
		this.tracker.set('userKinds', userKinds);
	}
	if (eventAction) {
		this.tracker.send('event',{
			'eventCategory': 'User',
			'eventAction': eventAction
		});
	}

};

cscplugin.prototype.PaymentsInit= function() {
	var orderId = this.orderId;
	var defaultbank = this.defaultbank;
	var plantId=this.plantId;
	var eventAction=this.eventAction;
	var payMoney=this.payMoney;
	if (plantId) {
		this.tracker.set('plantId', plantId);
	}
	this.tracker.set('payMoney', payMoney);
	this.tracker.set('orderId', orderId);
	this.tracker.set('defaultbank', defaultbank);
	if (eventAction) {
		this.tracker.send('event',{
			'eventCategory': 'Payments',
			'eventAction': eventAction
		});
	}
};

cscplugin.prototype.PayResultInit= function() {
	this.tracker.send('event',{
		'eventCategory': 'Payments',
		'eventAction': 'PayResult'
	});
};

//提交订单
cscplugin.prototype.SubmitorderInit= function() {
	var data = this.data;
	var eventAction =this.eventAction;
	if (data) {
		for(var i=0;i<data.length;i++){
			cscga('sumitordertracker.ec:addProduct', data[i]);
		}
	}
	cscga('sumitordertracker.ec:setAction','checkout', {
		//'allSpecies':this.allSpecies,
		'CpnPrc':this.CpnPrc,
		'Cpnuuid':this.cpnid
	});
	if (eventAction) {
		this.tracker.send('event',{
			'eventCategory': 'order',
			'eventAction': eventAction
		});
	}
};

//订单提交成功
cscplugin.prototype.smtOrderSucInit=function(){
	var orderId = this.orderId;
	var payMoney=this.payMoney;
	this.tracker.set('payMoney', payMoney);
	this.tracker.set('orderId', orderId);
	this.tracker.send('event',{
		'eventCategory': 'order',
		'eventAction': this.eventAction
	});
};

//加入购物车
cscplugin.prototype.addToCartInit=function(){
	var dtlOptProNum=this.dtlOptProNum;
	var data=this.data;
	if (data) {
		for(var i=0;i<data.length;i++){
			cscga('addToCartTracker'+dtlOptProNum+'.ec:addProduct', data[i]);
		}
	}
	cscga('addToCartTracker'+dtlOptProNum+'.ec:setAction', 'add');
	this.tracker.send('event',{
		'eventCategory': 'order',
		'eventAction': this.eventAction
	});
};

//搜索
cscplugin.prototype.searchInit=function(){
	var kwd=this.searchKeyWord;
	var prc1=this.searchKeyPrc1;
	var prc2=this.searchKeyPrc2;
	var prv=this.province;
	var city=this.city;
	var cat1=this.proFirstCat;
	var cat2=this.proSecCat;
	var type=this.businessType;
	if(kwd){
		this.tracker.set("searchKeyWord",encodeURIComponent(kwd));
	}
	if(prc1){
		this.tracker.set("searchKeyPrc1",encodeURIComponent(prc1));
	}
	if(prc2){
		this.tracker.set("searchKeyPrc2",encodeURIComponent(prc2));
	}
	if(prv){
		this.tracker.set("province",encodeURIComponent(prv));
	}
	if(city){
		this.tracker.set("city",encodeURIComponent(city));
	}
	if(cat1){
		this.tracker.set("proFirstCat",encodeURIComponent(cat1));
	}
	if(cat2){
		this.tracker.set("proSecCat",encodeURIComponent(cat2));
	}
	if(type){
		this.tracker.set("businessType",encodeURIComponent(type));
	}
	this.tracker.send('event',{
		'eventCategory': 'search',
		'eventAction': this.eventAction
	});
};

//增强型电子商务插件相关(通用)
cscplugin.prototype.ecInit=function(ec,ea){
	var data=this.data;
	var trackerName=this.tracker.get('name');
	var isEcAction=this.isEcAction;
	var ecActionType=this.ecActionType||"add";
	var mData=this.mData||{};
	for(var i=0;i<data.length;i++){
		cscga(trackerName+'.ec:addProduct', data[i]);
	}
	if(isEcAction){
		cscga(trackerName+'.ec:setAction', ecActionType,mData);
	}
	this.tracker.send('event',{
		'eventCategory': ec,
		'eventAction': ea
	});
};

//无其他插件
cscplugin.prototype.defaultInit=function(ec,ea){
	var data=this.data;
	var trackerName=this.tracker.get('name');
	/*for(i in data){
		this.tracker.set(""+i,""+data[i]);
	}*/
	cscga(trackerName+'.set',data);
	this.tracker.send('event',{
		'eventCategory': ec,
		'eventAction': ea
	});
};

//商品曝光
cscplugin.prototype.commodityExposureInit=function(){
	this.ecInit('product','proShow');
};

//商品详情评价那里的tab
cscplugin.prototype.proDtlTabInit=function(){
	this.defaultInit('tab','proDtlTab');
};

//立即采样
cscplugin.prototype.takeSampleInit=function(){
	this.defaultInit('product','takeSample');
};

//移除购物车
cscplugin.prototype.removeCartInit=function(){
	this.ecInit('order','removeCartSuccess');
};

//购物车处的移至收藏夹
cscplugin.prototype.moveToFavInit=function(){
	this.ecInit('order','moveToFavSuccess');
};

//购物车处的结算
cscplugin.prototype.cartJsInit=function(){
	this.ecInit('order','settlement');
};

//点击旺铺中的询盘相关的按钮
cscplugin.prototype.askInit=function(){
	this.defaultInit('product','ask');
};

//绑定手机
cscplugin.prototype.bindPhoneInit=function(){
	this.defaultInit('User','bindPhoneSuccess');
};

//采购单发布
cscplugin.prototype.buyApplyInit=function(){
	this.defaultInit('product','buyApply');
};

//找回密码
cscplugin.prototype.findPwdInit=function(){
	this.defaultInit('User','findPwdSuccess');
};

//点击qq联系方式
cscplugin.prototype.qqInit=function(){
	this.defaultInit('User','qq');
};

//取消订单
cscplugin.prototype.cancelOrderInit=function(){
	this.defaultInit('order','cancelOrder');
};

//取消订单成功
cscplugin.prototype.cancelOrderSucInit=function(){
	this.defaultInit('order','cancelOrderSuccess');
};

//确认收货
cscplugin.prototype.qrshInit=function(){
	this.defaultInit('order','confirmReceipt');
};

//确认收货成功
cscplugin.prototype.qrshSucInit=function(){
	this.defaultInit('order','confirmReceiptSuccess');
};

//催发货
cscplugin.prototype.cfhInit=function(){
	this.defaultInit('order','expediting');
};

//催发货成功
cscplugin.prototype.cfhSucInit=function(){
	this.defaultInit('order','expeditingSuccess');
};

//接受备货
cscplugin.prototype.acceptBhInit=function(){
	this.defaultInit('order','acceptStock');
};

//接受备货成功
cscplugin.prototype.acceptBhSucInit=function(){
	this.defaultInit('order','acceptStockSuccess');
};

//查看物流
cscplugin.prototype.viewWlInit=function(){
	this.defaultInit('order','viewLogistics');
};

//评价
cscplugin.prototype.commentInit=function(){
	this.defaultInit('order','comment');
};

//评价成功
cscplugin.prototype.commentSucInit=function(){
	this.defaultInit('order','commentSuccess');
};

//去支付
cscplugin.prototype.goPaymentInit=function(){
	this.defaultInit('order','goPayment');
};

//第三方登录
cscplugin.prototype.threeLoginSucInit=function(){
	this.defaultInit('User','loginSuccess');
};

//线下支付
cscplugin.prototype.offlinePaymentInit=function(){
	this.defaultInit('Payments','offlinePayment');
}

cscplugin.prototype.favSucInit=function(){
	this.defaultInit('fav','favSuccess');
}

// 注册插件
providePlugin('cscplugin', cscplugin);