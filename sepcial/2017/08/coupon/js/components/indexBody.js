/*页面公用方法*/
var WEBCommon={
	init:{
		isLogin:false //判断是否登录 true:登录 false：未登录
	},
	//获取网址附带参数，如/index.html?ttt=1&yyy=2,则WEBCommon.searchObj()['ttt']=1,为WEBCommon.searchObj()['yyy']=2
	searchObj:function(){
		var searchArr=(location.search==""?[]:location.search.substr(1).split('&'));
		var result=[];
		for(var i=0,len=searchArr.length; i<len; i++){
			result.push(searchArr[i].split('=')[0]+':"'+searchArr[i].split('=')[1]+'"');
		}
		return eval('({'+result.join(',')+'})');
	},
	//中奖名单滚动
	scrollTxt:function(){
		$('#js-listulScroll li:even').addClass('lieven');
		$("#js-listulScroll").myScroll({
			speed:40, //数值越大，速度越慢
			rowHeight:40 //li的高度
		});
	},
	//获取优惠券相关情形
	getCoupon:function(couponId,callBackFn,errCallbanck){
		var _this=this;
		var params=couponId;
		var dataArr=function(){
				if(_this.searchObj()['city']){
					return {"couponIds":params,city:_this.searchObj()['city']};
				}else{
					return {"couponIds":params};
				}
			}();	
		$.ajax({  
			type : "get",  
			async:false,  
			url : "http://api.csc86.com/couponsdown/index",
			data:dataArr,
			dataType : "jsonp",//数据类型为jsonp  
			jsonp: "callback",//服务端用于接收callback调用的function名的参数  
			success : function(data){  
				callBackFn(data);
			},  
			error:function(){  
				errCallbanck();  
			}  
		}); 
	},
	//判断是否登录
	isLogin:function(callBackFn){
		$.ajax({  
			type : "get",  
			async:false,  
			url : "http://api.csc86.com/member/islogin",  
			dataType : "jsonp",//数据类型为jsonp  
			jsonp: "callback",//服务端用于接收callback调用的function名的参数  
			success : function(data){  
				callBackFn(data);
			},  
			error:function(){  
				alert('fail');  
			}  
		}); 
	},
	//显示登录弹窗
	loginDiaShow:function(data){
		//data={type:'',title:'',subtitle:''} type:1为登录提示 ，2为非登录提示
		var renderHtml = template('tpl-isLoginBox',data);//渲染模板
		$("#js-couponBagDia").html(renderHtml);	
	},
	//开始抽奖
	getLotteryinfo:function(orderid,callBackFn){
		$.ajax({  
			type : "get",  
			async:false,  
			url : "http://api.csc86.com/newdownlottery/orderDraw?orderId="+orderid,  
			dataType : "jsonp",//数据类型为jsonp  
			jsonp: "callback",//服务端用于接收callback调用的function名的参数  
			success : function(data){  
				callBackFn(data);
			},  
			error:function(){  
				alert('fail');  
			}  
		});
	},
	//校验输入
	checkIpt:function(){
		var username=$.trim($('#js-username').val()),
			userphone=$.trim($('#js-userphone').val()),
			useraddr=$.trim($('#js-useraddr').val()),
			ordercode=$.trim($("#js-iptordercode").val());
		if(username=="" || userphone=="" || useraddr==""){
			$("#js-msgtxt").text('请把联系信息填写完整，以免收不到奖品哦！');
			return false;
		}
		return {linkman:username,phone:userphone,address:useraddr,orderId:ordercode}	
	},
	//提交联系人信息
	sendUserInfo:function(callBackFn,errFn){
		var checkObj=this.checkIpt();
		if(!checkObj){
			errFn();
			return ;
		}
		$.ajax({  
			type : "get",  
			async:false,  
			url : "http://api.csc86.com/newdownlottery/WriteContact?orderId="+checkObj.orderId+"&linkman="+checkObj.linkman+"&phone="+checkObj.phone+"&address="+checkObj.address,  
			dataType : "jsonp",//数据类型为jsonp  
			jsonp: "callback",//服务端用于接收callback调用的function名的参数  
			success : function(data){  
				callBackFn(data);
			},  
			error:function(){  
				alert('fail');  
			}  
		});
	},
	//获取中奖者名单
	getLottery:function(callBackFn){
		//http://api.csc86.com/newdownlottery/getHit
		$.ajax({  
			type : "get",  
			async:false,  
			url : "http://api.csc86.com/newdownlottery/getHit",  
			dataType : "jsonp",//数据类型为jsonp  
			jsonp: "callback",//服务端用于接收callback调用的function名的参数  
			success : function(data){  
				callBackFn(data);
			},  
			error:function(){  
				alert('fail');  
			}  
		});	
	}
}

/*页面所有组件对象*/
var VUEComponents={
	//注册按钮
	regbtn:function(){
		return Vue.extend({ 
			data:{
				
			},
			template: '<a href="http://res.csc86.com/v3/shopping_center/market/html/login_reg_acc.html?from=coupon" class="regbtn active">马上注册会员</a>',
			props: ['userLogin']
		});
	},
	//消息提示弹框
	msgDialog:function(){
		return Vue.extend({ 
			data:{
				
			},
			template: '<div class="coupon-bag">\
						<div class="table">\
							<div class="cell">\
								<div class="bagbox">\
									<div class="close" v-on:click="closeDialog"></div>\
									<!--第一种情况-->\
									<div class="content" v-if="couponDatas.data.Code==\'1\'">\
										<div class="greetings">\
											<p><i class="ico"></i>恭喜您！</p>\
											<p>成功领取优惠券</p>\
										</div>\
										<div class="explantion">\
											<p>已存放至您的<em>【用户中心】</em>-<em>【我的优惠券】</em>中</p>\
											<p>您的现金券有效期至<em>2017年9月30日23：59</em></p>\
											<p>赶紧去进货吧！</p>\
										</div>\
									</div>\
									<!--第二种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110105008\'">\
										<h4 class="parent-tips">您还未登录</h4>\
										<div class="child-tips">\
											<p>领取的优惠券将无处存放哦~</p>\
											<p>请<em>先注册登录后</em>再领券</p>\
										</div>\
									</div>\
									<!--第三种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'3\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>该优惠券只向新人发放！</p>\
										</div>\
									</div>\
									<div class="content" v-else-if="couponDatas.data.Code==\'2\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>接口异常！</p>\
										</div>\
									</div>\
									<!--第四种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110105005\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>您来晚了，该优惠券已领完！</p>\
										</div>\
									</div>\
									<!--第五种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110105007\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>您来晚了，该活动已结束！</p>\
										</div>\
									</div>\
									<!--第六种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110105001\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>不存在此优惠券，请查看券号是否有误！</p>\
										</div>\
									</div>\
									<!--第七种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110105002\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>该优惠券已过期！</p>\
										</div>\
									</div>\
									<!--第八种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110105003\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>设置领取的优惠券张数超出优惠券可领取的限制张数！</p>\
										</div>\
									</div>\
									<!--第九种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110105004\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>此券不能在线领取！</p>\
										</div>\
									</div>\
									<!--第十种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110105006\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>你已领过该券！</p>\
										</div>\
									</div>\
									<!--第十一至十四种情况-->\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110102001\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>会员号不能为空，请查看会员是否登录！</p>\
										</div>\
									</div>\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110102002\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>用户名不能为空！</p>\
										</div>\
									</div>\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110102003\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>优惠券号不能为空！</p>\
										</div>\
									</div>\
									<div class="content" v-else-if="couponDatas.data.Code==\'180110102004\'">\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>领取的优惠券张数须大于0！</p>\
										</div>\
									</div>\
									<!--其他情况-->\
									<div class="content" v-else>\
										<h4 class="parent-tips">对不起</h4>\
										<div class="child-tips">\
											<p>优惠券操作异常！</p>\
										</div>\
									</div>\
									<div class="nickname">\
										<div v-if="couponDatas.data.Code==\'1\'">\
											<div class="nickimg"><img src="images/logo.png" alt="用户头像"></div>\
											<div class="nick">{{userNickname}}</div>\
										</div>\
									</div>\
									<div class="btnbox">\
										<!--第一种情况-->\
										<a href="http://m.csc86.com" v-if="couponDatas.data.Code==\'1\'">去进货</a>\
										<!--第二种情况-->\
										<a href="http://res.csc86.com/v3/shopping_center/market/html/login.html" v-else-if="couponDatas.data.Code==\'180110105008\'">立即登录</a>\
										<!--第三种情况-->\
										<a href="javascript:;" v-on:click="closeDialog" v-else>确定</a>\
									</div>\
								</div>\
							</div>\
						</div>\
					</div>',
				props: ['couponDatas','showDialog','userNickname'],
				methods:{
					closeDialog:function(){
						couponApps.isShowDialog=false;
					}	
				}
		});
	}
}

/*注册组件*/	 
var compRegbtn=Vue.component("reg-button", VUEComponents.regbtn());
var compMsgDialog=Vue.component("reg-button", VUEComponents.msgDialog());

/*创建实例*/
var couponApps = new Vue({
	data:{
		isLogin:false, //是否登录false:未登录 ture：已登录
		isShowDialog:false, //是否显示消息弹窗
		couponData:{}, //优惠券数据
		userNick:'',//用户昵称
		logo:'',//华南城logo
		couponbtntxt:'立即领取优惠券',//按钮文本
		isRepeat:true //防止优惠券领取按钮重复提交
	},
	components:{
		'reg-button':compRegbtn,
		'msg-dialog':compMsgDialog
	},
	created:function(){
		var _this=this;
		//校验是否登录
		WEBCommon.isLogin(function(data){
			_this.isLogin=!data.status;
			if(data.status){
				_this.userNick=data.data.userName;
			}
			//console.log("isLoginResult:"+JSON.stringify(data));
		});
	},
	methods:{
		//获取优惠券使用情形
		getCoupons:function(){
			var _this=this;
			if(_this.isRepeat){
				_this.isRepeat=false;
				_this.couponbtntxt='提交中...';
				var couponIdStr=['20170606001','555','533335','44444','44444'];//优惠券ID数组，刘宁修改此处
				WEBCommon.getCoupon(couponIdStr,function(data){
					_this.couponData=data;
					_this.isShowDialog=true;
					_this.isRepeat=true;
					_this.couponbtntxt='立即领取优惠券';
					//console.log("ajaxCouponResult:"+JSON.stringify(data));
				},function(){
					_this.isRepeat=true;
					_this.couponbtntxt='立即领取优惠券';
				});
			}
			
		}
	}
}).$mount('#couponApp');

$(document).ready(function(e) {
    /*中奖名单列表*/
	WEBCommon.getLottery(function(result){
		var listArr=[];
		for(var i=0,len=result['data'].length;i<len;i++){
			listArr.push('<li>恭喜'+result['data'][i]['account']+'  抽中了'+result['data'][i]['account']+' '+result['data'][i]['drawtime']+'</li>');
		}
		$("#js-lottersListUl").html(listArr.join(''));
	});
	
	/*中奖名单滚动*/
	WEBCommon.scrollTxt();
	
	/*关闭弹框*/
	$(document).on('click','.js-closeDialog',function(){
		$("#js-couponBagDia").text('');
	});	
	
	/*开始抽奖*/
	var isRepeatLot=true;//防止重复抽奖
	$("#js-btnGetLottery").on('click',function(){
		var _self=$(this);
		//if(WEBCommon.init.isLogin){
			if(isRepeatLot){
				isRepeatLot=false;
				_self.text('抽奖中...');
				WEBCommon.getLotteryinfo($("#js-iptordercode").val(),function(result){
					//result={"status":false,"No":-15,"msg":"未登录"}
					//中奖
					if(result['status']){
						//alert('中奖')
						var renderHtml = template('tpl-linkusInfoBox',result['data']);//渲染模板
						$("#js-couponBagDia").html(renderHtml);	
						$("#jsjiangping"+result['data']['id']).find('.jiang').show();
						isRepeatLot=true;
						_self.text('开始抽奖');
						return ;
					}
					//未中奖
					if(result['No']==-1){
						WEBCommon.loginDiaShow({type:'1',title:'你还未登录',subtitle:'请先登录再抽奖！'});
					}else if(result['No']==-4){
						WEBCommon.loginDiaShow({type:'2',title:'别心急哦^_^',subtitle:'抽奖活动还未开始哦！'});
					}else if(result['No']==-3){
						WEBCommon.loginDiaShow({type:'2',title:'抽奖活动已经结束哦^_^',subtitle:'期待您持续关注下次抽奖！'});
					}else if(result['No']==-9){
						WEBCommon.loginDiaShow({type:'2',title:'对不起哦^_^',subtitle:'您使用的订单号是无效的订单号！'});
					}else if(result['No']==-8){
						WEBCommon.loginDiaShow({type:'2',title:'你已参加过抽奖',subtitle:'一个订单号只能抽奖一次！'});
					}else if(result['No']==-16){
						WEBCommon.loginDiaShow({type:'2',title:'非常抱歉^_^',subtitle:'非活动期间的订单号不能抽奖！'});
					}else if(result['No']==-15){
						WEBCommon.loginDiaShow({type:'2',title:'对不起^_^',subtitle:'该订单尚未交易完成，不能抽奖！'});
					}else if(result['No']==-17){
						WEBCommon.loginDiaShow({type:'2',title:'对不起^_^',subtitle:result['msg']});
					}else if(result['No']==0){
						WEBCommon.loginDiaShow({type:'2',title:'很遗憾您未中奖，感谢你的参与',subtitle:'期待您持续关注下次抽奖！'});
					}else{
						WEBCommon.loginDiaShow({type:'2',title:'对不起^_^',subtitle:'您的操作有误，请重试'});
					}
					isRepeatLot=true;
					_self.text('开始抽奖');
				});
			}
		//}else{
			//alert('未登录')
			//WEBCommon.loginDiaShow({type:'1',title:'你还未登录',subtitle:'请先登录再抽奖！'});
		//}
	});
	
	/*中奖者提交联系信息*/	
	var isRepeatuser=true;//防止重复提交联系人信息
	$(document).on('click','#js-btnSubmitLinkInfo',function(){
		var _self=$(this);
		if(isRepeatuser){
			isRepeatuser=false;
			_self.text('提交中...');
			WEBCommon.sendUserInfo(function(result){
				if(result['status']){
					location.href=location.href;
				}else{
					$("#js-msgtxt").text(result['msg']);
					isRepeatuser=true;
					_self.text('提交');
				}
			},function(){
				isRepeatuser=true;
				_self.text('提交');
			});
		}
	});	
	
	$("#js-couponBagDia").on('focus','input[type="text"]',function(){
		$("#js-msgtxt").text('');
	});	
	
	$("#js-btnerweima").on('click',function(){
		$("#js-erweimaboxs").show().addClass('aniBotToUp');
	});	
	$("#js-erwmcloseDialog").on('click',function(){
		$("#js-erweimaboxs").hide().removeClass('aniBotToUp');
	});	
});