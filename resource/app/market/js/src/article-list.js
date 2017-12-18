define(function(require, exports, module) {
	require('swiper');
	// var debug=require('debug');
	var common = require('./common'); //公用js
	var MyDropLoad = require('dropload');
	var fa=require('fastclick');
	FastClick.attach(document.body);
	var hostmap = seajs.hostmap; //域名配置
	var channelData = {
			"channelInfo": [{
				"id": "79",
				"name": "编辑精选"
			}, {
				"id": "71",
				"name": "大视野"
			}, {
				"id": "69",
				"name": "生意管家"
			}, {
				"id": "67",
				"name": "今日行情"
			}, {
				"id": "68",
				"name": "资本变数"
			}, {
				"id": "74",
				"name": "行业风向"
			}, {
				"id": "70",
				"name": "电商导师"
			}, {
				"id": "77",
				"name": "订单见面会"
			}, {
				"id": "72",
				"name": "品牌之星"
			}, {
				"id": "75",
				"name": "精品导购"
			}, {
				"id": "76",
				"name": "中国好企业"
			}]
		},
		article = {
			channelid: Number(common.GetQueryString("id")) || channelData.channelInfo[0].id,
			channelindex: function(id) { //线上接口频道顺序与本地频道顺序不一样，需要通过频道id去关联统一（通过线上id，返回本地频道索引）
				var channel = channelData.channelInfo;
				for (var i = 0; i < channel.length; i++) {
					if (id == channel[i].id) return i;
				}
			},
			newsCache: channelData,
			currentChannelId: "", //当前的滑动ulid			
			setCache : function(id, data) {
				for (var i = 0; i < article.newsCache.channelInfo.length; i++) {
					if (article.newsCache.channelInfo[i].id == id) {
						if (id == "79") {
							article.newsCache.channelInfo[i].force_data = data.force_data;
							article.newsCache.channelInfo[i].cate_list = data.cate_list[id];
						} else {
							article.newsCache.channelInfo[i].cate_list = data.cate_list[id];
						}

					}
				}
			},
			addCache:function(id,data){
				if(localStorage['gscNews'+id]){
					var newstoragedata=localStorage['gscNews'+id]+data;
					localStorage.removeItem['gscNews'+id];
					localStorage.setItem('gscNews'+id,newstoragedata);	
				}
				else{
					localStorage.setItem('gscNews'+id,data);	
				}
			},
			addCacheStr:function(id,str){
				if(localStorage['gscNews'+id]){
					localStorage['gscNews'+id]+=str;
				}
			},
			urlto: function() { //点击列表链接传值
				$("body").on("tap", "a[data-url]", function(e) {
					var _this = $(this),
						tit, sumb, link;
					if (_this.hasClass("pro-link")) {
						tit = _this.find("h3").text(), sumb = _this.find("img").prop("src"), link = _this.prop("href")
					} else {
						tit = _this.find("img").prop('alt'), sumb = _this.find("img").prop("src"), link = _this.prop("href")
					}
					e.preventDefault();
					if (window.WebViewJavascriptBridge) {
						window.WebViewJavascriptBridge.callHandler('showBackBtn', {
							"title": tit,
							"src": sumb,
							"link": link
						});
					}
					window.location.href = _this.prop("href");
				});
			},
			slideUrlTo:function(){
				$("body").on("click", "a[data-href]", function(e) {
					var _this = $(this),
						tit, sumb, link;
					if (_this.hasClass("pro-link")) {
						tit = _this.find("h3").text(), sumb = _this.find("img").prop("src"), link = _this.prop("href")
					} else {
						tit = _this.find("img").prop('alt'), sumb = _this.find("img").prop("src"), link = _this.data("href");
					}
					e.preventDefault();
					if (window.WebViewJavascriptBridge) {
						window.WebViewJavascriptBridge.callHandler('showBackBtn', {
							"title": tit,
							"src": sumb,
							"link": link
						});
					}
					window.location.href = _this.data("href");
				});
			},
			initView: function(callback) { //初始化框架
				render = require('../tpl/article/artilce_frame');
				var screenHeight = document.documentElement.clientHeight,
					navHeight = $(".jnav").height();
				var frame = render(channelData);
				var initscroll = function() {
					var swiperNav;
					swiperNav = new Swiper('.jnav', { //初始化频道列表
						// initialSlide:article.channelindex(article.channelid),
						speed: 500,
						paginationClickable: true,
						slidesPerView: 4,
						onInit: function(sw) {
							smnav(article.channelindex(article.channelid));
							$("#jmenuall li").eq(article.channelindex(article.channelid)).addClass("act");
						}
					});
					var navHeight = $(".jnav").height() + 5; //获取头部导航的高
					$("#scrolWrap").css("height", screenHeight + "px");
					var dropload = $("#scrolWrap").dropload({
						scrollArea: window,
						loadUpFn: function(me) {
							article.getListById(article.currentChannelId, {
								page: 1,
								isFrash: true
							},function(){
								me.resetload();
								var swipimage=new Swiper(".channel-focus1",{
									pagination: ".channel-pagin1",
									paginationClickable: true,
									loop:true
								});
								article.slideUrlTo();
							});
						},
						loadDownFn: function(me) {
							if($("#news" + article.currentChannelId).data("page")){//刷新后的第一次下拉	操作
								
								if($("#news" + article.currentChannelId).data("page-end")!="1"){//上次未加载完
									article.getListById(article.currentChannelId, {
										page: $("#news" + article.currentChannelId).data("page") + 1,
										isFrash: false
									},function(){
										me.resetload();
									});
								}
								else{//上次加载完
									article.getListById(article.currentChannelId, {
										page: article.getPageIndex(article.currentChannelId) + 1,
										isFrash: false
									},function(){
										me.resetload();
									});	
								}								
							}else{
								article.getListById(article.currentChannelId, {
									page: article.getPageIndex(article.currentChannelId) + 1,
									isFrash: false
								},function(){
									me.resetload();
								});								
							}
						}
					});

					function smnav(i) {
						var slidleft = $("#thnav li").eq(i).offset().left,
							cnt = $(".Jbusul").eq(i),cntid=cnt.prop("id").split("news")[1];
						$(".bar").css("width", $("#thnav li").eq(i).width()).offset({
							left: slidleft
						});

						cnt.siblings("ul").removeClass("current");
						cnt.addClass("current");

						$("#jmenuall li").siblings("li").removeClass("act");
						$("#jmenuall li").eq(i).addClass("act");
						article.currentChannelId = cntid;
						if (window.WebViewJavascriptBridge) {
							window.WebViewJavascriptBridge.callHandler('dealChannelId',cntid);
						}
					}
					$(".jmenu").on("touchstart", function() { //下拉菜单
						if ($(".jnav").hasClass("act")) { //已展开状态
							$(".jnav,.jmenu").removeClass("act");
						} else { //未展开状态
							$(".jnav,.jmenu").addClass("act");
							$("#menubg").css("display","block");
						}
					});
					$("#thnav li").each(function(idx, el) {
						$(el).on("click", function() {
							setClass(idx);
							smnav(idx);
						});
					});

					$("#jmenuall li").each(function(idx, el) {
						
						$(el).on("click", function() {							
							setClass(idx);
							swiperNav.slideTo(idx, 500, false);					
							$(".jnav,.jmenu").removeClass("act");
							setTimeout(function(){
								$("#menubg").css("display","none");
							},"600");
							smnav(idx);
						});
					});
					function setClass(i) {
						$("#thnav li").each(function(index, el) {
							if (index != i) {
								if ($(el).hasClass("active")) {
									$(el).removeClass("active");
								}
							} else {
								$(el).addClass("active");
							}
						});
					}

				};
				$("#article-list").append(frame);
				initscroll();
				callback();
			},
			getInitData: function() {
				var url = "//" + hostmap.info + '/api.php',
					initdata = {
						op: "market_list",
						num: "20"
					};
				var initData = function(callback) { //首次加载数据
						var cb = callback,nowid=article.currentChannelId;
						if (localStorage["gscNews"+nowid]){
							// readCacheData(JSON.parse(localStorage['gscNews']));
							$("#news"+nowid).append(localStorage["gscNews"+nowid]);
							$("#news" + nowid).find(".jload").hide();
							$("#news"+nowid).siblings("ul").each(function(){
								var id=$(this).prop("id").split("news")[1];
								if(localStorage["gscNews"+id]){
									$("#news"+id).append(localStorage["gscNews"+id]);
									$("#news" + id).find(".jload").hide();
								}
							});
							var swipimage=new Swiper(".channel-focus1",{
								pagination: ".channel-pagin1",
								paginationClickable: true,
								loop:true
							});
							article.slideUrlTo();
						} else {
							$.ajax({
								url: url,
								type: "get",
								data: initdata,
								dataType: "jsonp",
								success: function(data) {
									if (data.status == 1) {
										readData(data.data);
										
										cb();
									}
								}
							});
						}

					},
					readData = function(data) { //读取接口数据
						var cate_list = data.cate_list,
							force_data = data.force_data;
						for (id in cate_list) {
							if (id == "79") {
								getInitArtlist(id, cate_list[id], force_data);
								
							} else {
								getInitArtlist(id, cate_list[id]);
							}
							// article.setCache(id, data);
						};
					},
					readCacheData = function(data) { //读取缓存数据
						var resource = data.channelInfo;
						for (var i = 0; i < resource.length; i++) {
							var obj = resource[i];
							if (obj.id == "79") {
								getInitArtlist(obj.id, obj.cate_list, obj.force_data);
							} else {
								getInitArtlist(obj.id, obj.cate_list);
							}
						};
					},
					getInitArtlist = function(listid, dataobj, scrollobj) { //得到初始化列表
						var dataarray = {
								"dataarray": dataobj
							},
							datascro = {
								"dataarray": scrollobj
							};
						var render = require('../tpl/article/artilce_frame_li'),
							renderscroll = require('../tpl/article/artilce_frame_slide'),
							renderscrollli = require('../tpl/article/artilce_frame_li_sumb'),
							ul;
						if (scrollobj) {
							ul = renderscroll(datascro) + renderscrollli(dataarray);
						} else {
							ul = render(dataarray);							
						}
						$("#news" + listid).find(".jload").css("display", "none");
						$("#news" + listid).data("page", 1);
						$("#news" + listid).append(ul);

						localStorage.setItem("gscNews"+listid,ul);
					};
				initData(function() {
					// console.log(article.newsCache);
					// localStorage.setItem("gscNews", JSON.stringify(article.newsCache))
				});
			},
			getListById: function(id, opts, mefun) {
				var url = "//" + hostmap.info + '/api.php',
					initdata = {
						op: "market", //模块儿名称
						page: opts.page, //第几页
						catid: id, //频道id
						l: 20 //每页条数
					},
					getArtlist = function(listid, dataobj, scrollobj) {
						var dataarray = {
								"dataarray": dataobj
							},
							datascro = {
								"dataarray": scrollobj
							};
						var render = require('../tpl/article/artilce_frame_li'),
							renderscroll = require('../tpl/article/artilce_frame_slide'),
							renderscrollli = require('../tpl/article/artilce_frame_li_sumb'),
							ul;
						if (listid == "79") {
							ul = scrollobj ? renderscroll(datascro) + renderscrollli(dataarray) : renderscrollli(dataarray);
								$(".channel-focus1")
						} else {
							ul = render(dataarray);
						}
						if(dataobj.length==0){
							nodatamsg($("#news" + listid));
						}else{
							$("#news" + listid).append(ul);
							article.addCache(id,ul);
						}						
						opts.isFrash ? $("#news" + listid).data("page", 1) : $("#news" + listid).data("page", opts.page);
					},
					removedata = function(id) { // 移除原数据
						$("#news" + id).children("li").remove();
						if(localStorage['gscNews'+id]){
							localStorage.removeItem('gscNews'+id);
						}
						if($("#news" + id).find(".msgulbox").length > 0) $("#news" + id).find(".msgulbox").remove();
						// $("#news" + id).children(".jload").show();
						if ($("#news" + id).children(".slidebox")) {
							$("#news" + id).children(".slidebox").remove();
						}
					},
					getAjax = function(initdata,cb) {
						// $("#news" + id).find(".jload").show();
						$.ajax({
							type: "get",
							url: url,
							dataType: "jsonp",
							data: initdata,
							success: function(data) {
								if (data.status == 1) {
									var cate_list = data.data.cate_list,
										force_data = data.data.force_data;
										// console.log(cate_list);
									if (id == "79") {
										initdata.page == 1 ? getArtlist(id, cate_list, force_data) : getArtlist(id, cate_list);
									} else {
										getArtlist(id, cate_list);
										
									}
									// $("#news" + id).find(".jload").hide();
									cb();
								}
							}
						});
					},nodatamsg=function(obj){//提示咨询加载完
						if(obj.find(".nolistmsg").length==0){
							if(obj.find(".msgulbox").length==0){
								obj.append('<div class="msgulbox">暂无咨询</div>');
								obj.data("page-end","1");					
							}
							else{
								obj.find(".msgulbox").show();						
							}
							setTimeout(function(){
								obj.find(".msgulbox").hide()
							},"2000")
						}
					};
				if (opts.isFrash) {
					removedata(id);
					getAjax(initdata,mefun);


				} else {
					getAjax(initdata,mefun);
				}
			},
			getPageIndex:function(crid){
				var num=Number($("#news" + crid).children("li.datali").size());
				return Math.ceil(num / 20);
			},
			init: function() {}
		};
	article.initView(function() {
		article.getInitData();
		article.urlto();
	});
});