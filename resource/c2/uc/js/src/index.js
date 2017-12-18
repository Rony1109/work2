/**
 * 会员中心2.0
 * anthor guoz
 * date 2015-11-06
 */
seajs.config({
	paths: {
		'tpl': 'c2/uc/tpl/index/build'
	}
});
define(function(require, exports, module) {
	var	HOST = seajs.hostmap;  // 域名配置表
	var isLoginObj=require('c2/newcgsc/js/newtop.js');/*统一用www.csc86.com页面的顶部导航*/
	var isCg=(isLoginObj.data.userkinds=='GY')?false: true; //是否为采购商，true为是

	//以下两个变量页面事件触发导致的商品曝光埋点需要用到
	var triggerEventNum= 0,triggerEventArry=[];

	var Index = {
		init: function () {
			var hash = location.hash,
				url,
				_this = this;

			if (!hash || (hash !== '#buyers' && hash !== '#mem_Seller')) {
				url = 'newversionindex';
			} else {
				url = hash.replace('#', '');
			}
			// 第一次加载请求数据
			$.get(url, function (res) {
				var data = _this.createTplData(res);
				_this.renderTpl(data);
				// 引导
				require('//res.csc86.com/f=js/m/config.js,js/m/cookie.js');
				if(!csc.getCookie('info')){
					$('.tscon').show();
					$('.tscon .s1').click(function(){
						$('.tscon').hide();
						});
					$('.tscon .s2').click(function(){
						$('.tscon').hide();
						window.open('//payment.csc86.com/');
						});	
					csc.setCookie('info','info',3600*24*365);
					};
				//require('./intro');

				$('a[href*="inquiry/openpublish.html"]').on('click',function(){
					triggerEventNum++;
					triggerEventArry=[];
					triggerEventArry.push({
						userName:csc.getCookie('username')
					})
					if(typeof cscgaMd == 'object'){
						cscgaMd.buyApply('pc', triggerEventNum, triggerEventArry[0]);
					}
				});
			}, 'json');
		},
		/*
		 *根据java接口返回的数据 创建模板需要的数据格式
		 *@param srcData: java接口返回的数据
		 *@return object: 模板需要的格式数据
		 */
		createTplData: function (srcData) {
			srcData = srcData.data || {};
			var isHasShop = srcData.isHasShop === 'true' ? true : false,      // 是否开通旺铺
				isOnlineTrade = srcData.isOnlineTrade === 'Y' || srcData.isOnlineTrade === 'W' ? true : false,  // 是否开通在线交易
				role = '',                                                     // 买家还是卖家 buyers or mem_Seller
				leftMenuData = {},                                             // 左侧菜单数据
				usrData = {},
				orderTab = {},
				companyInfo = {},
				shopUrl = '',
				// 卖家菜单数据
				salerMenuData = {
					header: '卖家首页',
					menus: [
						{type: 1, text: '旺铺管理', href: 'http://'+ HOST.member +'/shop/shopinfo.html', target: '_blank'},
						{type: 2, text: '产品'},
						{type: 3, items: [
					    	{text: '产品管理', href: 'http://'+ HOST.member +'/product/sell/list.html'},
					    	{text: '发布产品', href: 'http://'+ HOST.member +'/product/sell.html'}
						]},
						{type: 2, text: '销售'},
						{type: 3, items: [
					    	{text: '发货管理', href: 'https://'+ HOST.i +'/send/waitList'},
					    	{text: '已卖出货物', href: 'https://'+ HOST.i +'/seller/sellerOrders'},
					    	{text: '退换货管理', href: 'https://'+ HOST.i +'/return/list'}
						]},
						{type: 2, text: '询盘管理'},
						{type: 3, items: [
					    	{text: '收到的询盘', href: 'http://'+ HOST.member +'/quote/list.html'},
					    	{text: '发出报价', href: 'http://'+ HOST.member +'/quote/pricelist.html'},
					    	{text: '询盘大厅', href: 'http://'+ HOST.member +'/quote/index.html'}
						]},
						{type: 2, text: '商机订阅'},
						{type: 3, items: [
					    	{text: '订单商机', href: 'http://'+ HOST.inquiry +'/inquiry/management/list'},
					    	{text: '商机订阅管理', href: 'http://'+ HOST.inquiry +'/inquiry/management/manage_supply?name=new'}
						]},
						{type: 2, text: '结算'},
						{type: 3, items: [
					    	{text: '交易账务', href: 'https://'+ HOST.i +'/draw/list'},
					    	//{text: '提取货款', href: 'https://'+ HOST.i +'/draw/account'}
						]},
						{type: 2, text: '旺铺统计'},
						{type: 3, items: [
					    	{text: '流量统计', href: 'http://'+ HOST.statistics +'/user/flowstatistics.do'},
					    	{text: '产品和询盘统计', href: 'http://'+ HOST.statistics +'/user/productAndInquiryStatistics.do'},
					    	{text: '关键词统计', href: 'http://'+ HOST.statistics +'/user/keyWordsStatistics.do'}
						]},
						{type: 1, text: '买家管理', href: 'http://'+ HOST.inquiry +'/inquiry/purchaser-list'},
						{type: 1, text: '我的收藏', href: 'https://'+ HOST.i +'/user/favoriteList'}
					]
				},
				// 买家菜单数据
				buyerMenuData = {
					header: '买家首页',
					menus: [
						{type: 2, text: '进货'},
						{type: 3, items: [
					    	{text: '已采购的货物', href: 'https://'+ HOST.i +'/buyer/buyerOrder'},
					    	{text: '退换货管理', href: 'https://'+ HOST.i +'/returnRepairService/getList'}
						]},
						{type: 2, text: '询价管理'},
						{type: 3, items: [
					    	{text: '收到的报价', href: 'http://'+ HOST.inquiry +'/inquiry/quotationlist'},
					    	{text: '发出的采购', href: 'http://'+ HOST.member +'/inquiry/openList.html'},
					    	{text: '发出的询盘', href: 'http://'+ HOST.member +'/inquiry/list.html'},
					    	{text: '询盘的产品', href: 'http://'+ HOST.inquiry +'/inquiry/productlist'}
						]},
						{type: 2, text: '计划'},
						{type: 3, items: [
					    	{text: '采购单', href: 'https://'+ HOST.i +'/carDetail', target: '_blank'},
					    	{text: '发布采购计划', href: 'http://'+ HOST.member +'/inquiry/openpublish.html', target: '_blank'}
						]},
						{type: 1, text: '我的钱包', href: 'https://'+ HOST.payment},
						{type: 1, text: '供应商管理', href: 'http://'+ HOST.inquiry +'/inquiry/supplier-list'},
						{type: 1, text: '我的收藏', href: 'https://'+ HOST.i +'/user/favoriteList'}
					]
				},
				// 玩转电商数据
				playBuzzs = [
					{name: '帮中小企业拓展销售增营业额', link: 'http://api.csc86.com/g/view.html?id=f6365501-a247-4b1d-88a4-d00443c57bc8'},
					{name: '5年后中国线上零售或达10万亿', link: 'http://api.csc86.com/g/view.html?id=a2695a78-d1ea-4418-9c18-cdfc1929f390'},
					{name: '前三季网上零售同比增36.2%', link: 'http://api.csc86.com/g/view.html?id=178bc87a-dd33-4ead-9271-744967c991b0'},
					{name: '2016农村网购望增到4600亿元', link: 'http://api.csc86.com/g/view.html?id=b5ae7d10-eaab-4c87-96d7-8c545e3d8a28'},
					{name: '节日促销技巧：线上线下融合促增长', link: 'http://api.csc86.com/g/view.html?id=abcbf8f6-21c7-4d66-b090-4993937c4d11'},
					{name: '国家要求3年教会农民手机上网', link: 'http://api.csc86.com/g/view.html?id=b8dd12f8-da3f-49fc-a14d-534e7f183716'},
					{name: '预测2016电商进出口6.5万亿http://api.csc86.com/g/view.html?id=ea70c719-e7ca-4927-8679-853be3719916', link: 'http://api.csc86.com/g/view.html?id=2f6769f5-9490-41b5-b4d2-9525964aaf84'},
					{name: '预测移动互联用户破8.75亿', link: 'http://api.csc86.com/g/view.html?id=ea70c719-e7ca-4927-8679-853be3719916'},
					{name: '外贸“互联网+”渐成趋势', link: 'http://api.csc86.com/g/view.html?id=16001f55-38f3-42ac-9e69-2b40f0aa0ff9'}
				];
			// 根据location.hash判断角色
			var hash = location.hash;
			if (hash !== '#buyers' && hash !== '#mem_Seller') {
				role = isHasShop ? 'mem_Seller' : 'buyers';
			} else {
				role = hash.replace('#', '');
			}

			// 根据角色判断左侧菜单数据
			leftMenuData = role === 'buyers' ? buyerMenuData : salerMenuData;
			// 用户信息赋值
			var userInfo = srcData.userTopcInf || {};
			usrData.figimg = !!userInfo.memberImgUrl ? '//img.csc86.com' + userInfo.memberImgUrl : '//res.csc86.com/v2/c2/uc/images/fg.png';
			usrData.name = userInfo.memberName || '';
			usrData.phone = !! userInfo.phone;
			usrData.email = !! userInfo.eMail;
			usrData.order = parseInt(userInfo.currentMonthOrderCount || 0, 10) || 0;
			usrData.money = parseFloat(userInfo.drawMoney || 0, 10).toFixed(2) || 0;
			usrData.money = usrData.money >= 1000000 ? ('>' + 999999) : usrData.money;
			usrData.order = usrData.order >= 1000000 ? ('>' + 999999) : usrData.order;
			// 企业名称
			if (!!srcData.memberEnterpriseInf) {
				companyInfo.name = srcData.memberEnterpriseInf.enterprise || '';  
				companyInfo.companyACT1 = srcData.memberEnterpriseInf.realTag == '102' || srcData.memberEnterpriseInf.realTag == '106' ? true : false;
				companyInfo.companyACT2 = srcData.memberEnterpriseInf.credit == '1' ? true : false; // 企业身份认证
				companyInfo.companyACT3 = srcData.memberEnterpriseInf.stroeTag == '102' ? true : false; 
			} else {
				companyInfo.name = '';  
				companyInfo.companyACT1 = false;
				companyInfo.companyACT2 = false; // 企业身份认证
				companyInfo.companyACT3 = false; 
			}
			var temp = srcData.userOlderInf || {};
			orderTab = role === 'mem_Seller' ? [{text: '待发货', num: temp.tab$1Count || 0}, 
											{text: '待确认', num: temp.tab$2Count || 0}, 
											{text: '待买家收货', num: temp.tab$3Count || 0}, 
											{text: '退货换货', num: temp.tab$4Count || 0}] 
		                                 
		                                 : [{text: '待付款', num: temp.tab$1Count || 0}, 
											{text: '待卖家发货', num: temp.tab$2Count || 0}, 
											{text: '待收货', num: temp.tab$3Count || 0}, 
											{text: '待评价', num: temp.tab$4Count || 0}];
            if (srcData.sysmain) {
            	shopUrl = srcData.sysmain.match(/\/\/(.+)\//i)[1];
            }
            // 返回
            var memberEnterpriseInf = srcData.memberEnterpriseInf || {};
            var userOlderInf = srcData.userOlderInf || {};
            var userInquiryInf = srcData.userInquiryInf || {};
			return {
				host           : HOST,
				isHasShop      : isHasShop,
				isOnlineTrade  : isOnlineTrade,
				openShopUrl  :srcData.openShopUrl||'',
				openTradeUrl :srcData.openTradeUrl||'',
				role           : role,
				isCg           :isCg,
				leftMenuData   : leftMenuData,
				usrData        : usrData,
				companyInfo    : companyInfo,
				orderTab       : orderTab,
				userInquiryInf : srcData.userInquiryInf || {},
				personlACT     : memberEnterpriseInf.realTag == '105' || memberEnterpriseInf.realTag == '106' ? true : false,
				isCST          : memberEnterpriseInf.memberLevel == 'cst' ? true : false,
				isVIP          : memberEnterpriseInf.memberLevel == 'vip' ? true : false,
				orders         : userOlderInf.orders || [],
				inquirys       : userInquiryInf.inquirys || [],
				endTime        : srcData.endTime || '', // 诚商通到期时间
				playBuzzs      : playBuzzs,             // 玩转电商
				shopUrl        : shopUrl,                // 旺铺地址
				importUserStatus: srcData.importUserStatus
			};
		},
		/*
		 *根据既定的数据格式渲染模板
		 *@param data: 模板数据，由 this.createTplData 方法生成
		 *@return this
		 */
		renderTpl: function (data) {
			var tpl_index = require('tpl/tpl_index'),
			    html_index = tpl_index(data || {}),
				$container = $('#container'), // html 容器
				$loading = $('#loading');

			$loading.remove();
			$container.append(html_index);

			//移除供用商我的买家左侧处的我的钱包
			if(!isCg){
				$('.leftmenu li a:contains("我的钱包")').parents('li').remove();
			}

			this.eventHandler(data);  // 绑定事件

			// 郑州诚商通旺铺激活检查
			if (data.role === 'mem_Seller') {
				require('./zhengzShopActived.js?t=20160412'); 
			}
			return this;
		},
		/*
		 *根据订单或者询盘的的数据格式render 表格
		 *@param data: 订单或者询盘的数据
		 *@type: 数据表格类型，订单类型，询盘待报价类型  询盘已报价类型
		 *@$container: html容器
		 */
		renderTable: function (data, type, $container, opName, role) {
			$container.empty();
			var tpl = require('tpl/tpl_index_table'),
				templateData = {
					colNames: [],
					colData: [],
					type : type,
					role : role,
					isCg:isCg,
					host: HOST
				},
				createCol = function (o, type, text, link, imgurl) {
					return {
						isPro: type === 1 ? true : false,
						isBtn: type === 2 ? true : false,
						isLink: type === 3 ? true : false,
						link: link || '',
						text: text || '',
						imgurl: imgurl || '',
						data: o
					};
				};
			if (type === 1) { // 订单数据的表格
				templateData.colNames = [{text: '订单号', width: 110}, 
										 {text: '订单商品', width: 310}, 
										 {text: '下单时间', width: 150}, 
										 {text: '约定发货时间（最晚）', width: 150}, 
										 {text: '操作', width: 80}];
				for (var i = 0; i < data.length; i++) {
					var temp = data[i];
					var arr = [];
					arr.push( createCol(temp, 0, temp.orderNo),
							  createCol(temp, 1, temp.orderDetails[0].productName, temp.orderDetails[0].link, temp.orderDetails[0].image), 
							  createCol(temp, 0, temp.creatTime), 
							  createCol(temp, 0, temp.promiseDispatchTime), 
							  createCol(temp, 2, opName));
					templateData.colData[i] = arr;
				}
			} else if (type === 2) { // 询盘待报价数据的表格
				templateData.colNames = [{text: '询盘名称', width: 110}, 
										 {text: '询盘产品', width: 310}, 
										 {text: '采购数量', width: 80}, 
										 {text: '询盘时间', width: 150}, 
										 {text: '操作', width: 80}];
				for (var i = 0; i < data.length; i++) {
					var temp = data[i];
					var arr = [];
					arr.push( createCol(temp, 0, temp.inquiryName),
							  createCol(temp, 1, temp.productName, temp.inquiryProductHref, temp.productImgUrl), 
							  createCol(temp, 0, temp.purchaseNumber), 
							  createCol(temp, 0, temp.inquiryTime.substring(0, temp.inquiryTime.length - 2)), 
							  createCol(temp, 2, opName));
					templateData.colData[i] = arr;
				}
			} else {  // 询盘已报价数据的表格
				templateData.colNames = [{text: '询盘名称', width: 110}, 
										 {text: '询盘产品', width: 310}, 
										 {text: '采购数量', width: 80}, 
										 {text: '询盘时间', width: 150}, 
										 {text: '卖家报价', width: 80}, 
										 {text: '操作', width: 80}];
				for (var i = 0; i < data.length; i++) {
					var temp = data[i];
					var arr = [];
					arr.push( createCol(temp, 0, temp.inquiryName),
							  createCol(temp, 1, temp.productName, temp.inquiryProductHref, temp.productImgUrl), 
							  createCol(temp, 0, temp.purchaseNumber), 
							  createCol(temp, 0, temp.inquiryTime.substring(0, temp.inquiryTime.length - 2)), 
							  createCol(temp, 0, temp.productPrice), 
							  createCol(temp, 2, opName));
					templateData.colData[i] = arr;
				}
			}
			$container.html(tpl(templateData));
			var _this = this;
			$container.find('.op').click(function(event) {
				_this.ordersOperation.call(this);
			});
		},
		ordersOperation: function () {
			var text = $(this).text(),
				_this = $(this),
				dialog = require('dialog'),
				data = $.parseJSON($(this).next().text());
			switch ( text ) {
				case '立即支付' :
					window.open($(this).attr('payhref'));
					break;
				case '催卖家发货' :
					(function() {
						var url = 'buyer/urgingSellerShipped',
							param = {
								sellerId: data.shopid,
								orderNo: data.orderNo,
								type: '2'
							};
						$.post(url, param, function(data, textStatus, xhr) {
							if (data.status == '200') {
								dialog.success(data.msg, 3);

								// 刷新
								$.get('buyers/orderview', {viewType: 1}, function (res) {
									var orders = res.data.items;
									Index.renderTable(orders || [], 1, $('#orderContainer'), '催卖家发货', 'buyers');
								}, 'json');

							} else {
								dialog.error(data.msg, 3);
							}
						}, 'jsonp');
					})();
					break;
				case '确认' :
					window.open($(this).attr('payhref'));
					break;
				case '确认收货' :
					(function () {
						var tips = '请收到货后，再确认收货！否则您可能钱货两空！';
						dialog.confirm(tips, function () {
							var url = '/buyer/confirmReceive',
								param = {orderNo: data.orderNo, sellerId: data.shopid};
							$.post(url, param, function(data, textStatus, xhr) {
								if (data.status === '200') {
									dialog.success(data.msg, 3);
									// 刷新
									$.get('buyers/orderview', {viewType: 2}, function (res) {
										var orders = res.data.items;
										Index.renderTable(orders || [], 1, $('#orderContainer'), '确认收货', 'buyers');

										location.reload();
										/*var txt = $('#ordertab').children('a').eq(2).find('span').text();
										txt = txt.match(/\((\d+)\)/)[1];
										txt = parseInt(txt, 10);
										txt = txt - 1;
										$('#ordertab').children('a').eq(2).find('span').text('(' + txt + ')');*/
									}, 'json');

								} else {
									dialog.error(data.msg, 3);
								}
							}, 'jsonp');
						});
					})();
					break;
				case '评价' :
					var comment = require('productComment');
					comment(data, function () {
						$.get('buyers/orderview', {viewType: 3}, function (res) {
							var orders = res.data.items;
							Index.renderTable(orders || [], 1, $('#orderContainer'), '评价', 'buyers');
							
							location.reload();
							/*var txt = $('#ordertab').children('a').last().find('span').text();
							txt = txt.match(/\((\d+)\)/)[1];
							txt = parseInt(txt, 10);
							txt = txt - 1;
							$('#ordertab').children('a').last().find('span').text('(' + txt + ')');*/
						}, 'json');
					});
					break;
				case '去发货' :
					window.open('//' + HOST.i + '/send/toDeliver?orderId=' + data.orderNo);
					break;
				case '订单跟踪' :
					var shower = require('showLogistics');
					shower(data);
					break;
				case '查看并受理' : 
					window.open('//' + HOST.i + '/return/detail?orderId=' + data.orderNo);
					break;
				case '查看' :
					window.open($(this).attr('inquiryhref'));
					break;
				case '报价':
					window.open('http://'+ HOST.member +'/quote/sendPrice.html?id='+ data.inquiryId +'&type=price');
					break;
			}
		},
		eventHandler: function (data) {
			var _this = this,
				$orderContainer = $('#orderContainer'),
				$inquiryContainer = $('#inquiryContainer'),
				$ordertab = $('#ordertab'),
				$inquiryTab = $('#inquiryTab'),
				role = data.role;
			this.renderTable(data.orders, 1, $orderContainer, role === 'buyers' ? '立即支付' : '去发货', role);
			this.renderTable(data.inquirys, 2, $inquiryContainer, role === 'buyers' ? '查看' : '报价', role);

			// 订单选项卡
			$ordertab.children('a').click(function(event) {
				$(this).addClass('hover').siblings().removeClass('hover');
				var role = data.role,
					index = $ordertab.children('a').index($(this)),
					url = '',
					opNames = '',
					opNames1 = ['立即支付', '催卖家发货', '确认收货', '评价'],
					opNames2 = ['去发货', '确认', '订单跟踪', '查看并受理'];
				if (role === 'buyers') {
					url = 'buyers/orderview';
					opNames = opNames1;
				} else {
					if (!data.isOnlineTrade || !data.isHasShop) {
						return false;
					}
					url = 'seller/order';
					opNames = opNames2;
				}
				$.get(url, {viewType: index}, function (res) {
					var orders = role === 'buyers' ? res.data.items :  res.orders;
					_this.renderTable(orders || [], 1, $orderContainer, opNames[index], role);
				}, 'json');
			});
			// 询盘选项卡
			$inquiryTab.children('a').click(function(event) {
				$(this).addClass('hover').siblings().removeClass('hover');
				var role = data.role,
					index = $inquiryTab.children('a').index($(this)),
					url = '',
					type = 2,
					opNames = [];
				if (role === 'buyers') {
					url = 'buyers/inquiryview';
					opNames = ['查看', '查看'];
				} else {
					url = 'seller/inquiryview'
					opNames = ['报价', '查看'];
				}
				if (index === 0) {
					type = 2;
				} else {
					type = 3;
				}
				$.get(url, {viewType: index}, function (res) {
					var inquirys = role === 'buyers' ? res.data.items :  res.inquirys;
					_this.renderTable(inquirys, type, $inquiryContainer, opNames[index], role);
				}, 'json');
			});
			// 买家卖家切换
			window.onhashchange = function () {
				var hash = location.hash;
				if (hash === '#buyers' || hash === '#mem_Seller') {
					location.reload();
				}
			}
		}
	}
	Index.init();
});
