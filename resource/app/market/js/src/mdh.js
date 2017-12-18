var refresh;
define(function(require, exports, module) {
	require('swiper');	
	var common=require('./common.js?asdfasd123');//公用js
	var hostmap=seajs.hostmap;//域名配置
	var index={
		cateid:common.GetQueryString("cate") || "1",
		sessid:common.GetQueryString("sessionId") || "",
		currentcateid:"",
		cateArray:{},
		cateData:function(id){
			return index.cateArray["c"+id];
		},
		changeURLPar:function(url, par, par_value) {
			var host=url.split("?")[0];
			return par==url.split("?")[1].split("=")[0] ? host+"?"+par+"="+par_value : url+"&"+par+"="+par_value;			
		},
		//菜单效果
		slide:function(){				
			mySlidenav=new Swiper('.jnav',{
				// effects:"slide",
				initialSlide:Number(index.cateid) -1,
				speed:500,
				slidesPerView:3,
				paginationClickable:true,
				onInit:function(sw){
					smnav(Number(index.cateid) -1);
				}
			});		
			function smnav(i){
				var slidleft =$("#thnav li").eq(i).children("span").offset().left,cnt=$(".Jbusul").eq(i),ulid=cnt.prop("id").split("ul")[1];
				$(".bar").css("width",$("#thnav li").eq(i).children("span").width()).offset({
					left : slidleft
				});
				cnt.siblings(".Jbusul").removeClass("act");
				cnt.addClass("act");
				setClass(i);
				$("#jmenuall li").siblings("li").removeClass("act");
				$("#jmenuall li").eq(i).addClass("act");
				index.getdata(ulid);
				index.currentcateid=ulid;
			}
			function goLocation(i){				
				setClass(i);
			}
			$(".jmenu").on("touchstart",function(){//下拉菜单
				var jmheight=$("#jmenuall").height() + $(".jmcont p").height();
				if($(".jnav").hasClass("act")){//已展开状态
					$(".jnav,.jmenu").removeClass("act");
				}
				else{//未展开状态
					$(".jnav,.jmenu").addClass("act");

				}
			});	
				
			$("#thnav li").each(function(idx, el) {
				$(el).on("tap",function(){
					goLocation(idx);
					smnav(idx);
				});
			});
			$("#jmenuall li").each(function(idx, el){
				$(el).on("tap",function(){
					goLocation(idx);
					mySlidenav.slideTo(idx, 500, false);
					$(".jnav,.jmenu").removeClass("act");
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
			};
			refresh=function(){
				var ulid=index.currentcateid;
				$("#ul"+ulid).children("li.busine").remove();
				localStorage.removeItem("wrap"+ulid);
				index.getdata(ulid);
			};
		},

		//获取对应接口数据
		getdata:function(cateid,callback){
			var url="//"+hostmap.gsc+"/famousShop/getFamousShopProductList",data={categoryNo:index.cateData(cateid),sessionId:index.sessid};
			var ocateul=$("#ul"+cateid);
			var getWrapHtml=function(id){
				$.ajax({
					type:"get",
					url:url,
					data:data,
					dataType:"jsonp",
					success:function(data){	
						// console.log(data);
						if(data.status){
							if(data.data!=""){
								updateHtml(data,id);
							}
							else{
								ocateul.html('<div class="emptyMsg"><p>暂无数据!</p></div>');
							}
							
						}
						else{

						}
						
					}
				});
			},isUpdate=function(id,shid){
				$.ajax({
					type:"get",
					url:url,
					data:data,
					dataType:"jsonp",
					success:function(data){
						// console.log(data);
						if(data.data[0].shopId!=shid){//如有更新
							updateHtml(data,id);
						}
					}
				});
			},updateHtml=function(d,id){
				var mdhulhtml={
					wrapHtml:"",
					upTime:new Date(),
					shopId:d.data[0].shopId 
				};					
				var render=require('../tpl/public/mdh_shop');				
				mdhulhtml.wrapHtml = render(d);
				ocateul.html(mdhulhtml.wrapHtml);
				clickAttention(id);
				localStorage.setItem("wrap"+id,JSON.stringify(mdhulhtml));
			},clickAttention=function(catid){//点击关注事件
				$("#ul"+catid).children(".busine").each(function(){
					var _this=$(this);
					_this.find(".jatten").on("tap",function(e){
						if(!_this.hasClass("disabled")){
							e.preventDefault();
							var _th=$(this),shopid=_th.data("shopid");
							// console.log(index.sessid+"shopid"+shopid);
							//判断是否登陆
							if(index.sessid != "" ){
								$.ajax({
									type:"get",
									url:"//"+hostmap.gsc+"/shop/favorite",
									data:{
										sessionId:index.sessid,
										shopId:shopid
									},
									dataType:"jsonp",
									success:function(data){
										if(data.status=="true"){
											_th.addClass("disabled");
											_th.text("已关注");
										}
										else{
											common.loadURL("gsc://"+"login");
											// console.log(data.msg);
										}
									}
								});
							}
							else{
								common.loadURL("gsc://"+"login");
								// console.log("gsc://"+"login"+data.msg);
							}
						}					
						
					});
				});
			};
			if(localStorage["wrap"+cateid]){//检测是否有缓存
				var htobj=eval("(" +localStorage["wrap"+cateid]  + ")");				
				ocateul.children(".datalate").css("display","none");
				ocateul.append(htobj.wrapHtml);
				isUpdate(cateid,htobj.shopId);
				clickAttention(cateid);
			}
			else{
				getWrapHtml(cateid);
			}			
		},
		initView:function(callback){
			$.ajax({
				url:"./js/src/category.json",
				type:"get",
				dataType:'json',
				success:function(data){
					var obj=data.data;
					$.each(obj,function(name,value){						
						var a="";
						for (var i = 0; i < value.childNode.length; i++) {								
							i==0 ? a=value.childNode[i].cateId : a+=","+value.childNode[i].cateId;		
						};
						index.cateArray["c"+value.cateId]=a;
					})
					var render=require('../tpl/public/mdh_module');
					var mdhhtml = render(data);
					$("#main").append(mdhhtml);
					callback();
					
				}
			});
		},

		init:function(){
			index.initView(function(){
				index.slide();
				// index.getdata(index.cateid);				
			});
		}
	};	
	index.init();
	common.datatrans();
	// module.exports=index;
});