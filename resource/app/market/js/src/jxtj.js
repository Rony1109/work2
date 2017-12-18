define(function(require, exports, module) {
	require('dropload');
	var common=require('./common');//公用js
	var hostmap=seajs.hostmap;//域名配置
	var page=1;
	var $jxtj=$('#jxtj');
	var $jxtjLst=$('#jxtjLst');
	var $deatlate=$('#deatlate');
	var isAjax=true;
	var jxtj={
		
		//加载页面公用函数
		loadPage:function(options,me){
			me=me||'';
			var opts={
				curPage:1,//当前页
				num:20,//每页显示的条数
				dfLoading:$deatlate,//初始进入页面或者重新加载页面时显示的进度条
				content:function(){},
				error:function(){}//请求出错时执行的函数
			};
			opts=$.extend({},opts,options);
			
			var	curPage=opts.curPage,
				num=opts.num,
				dfLoading=opts.dfLoading,
				beforeSend=opts.beforeSend,
				content=opts.content,
				error=opts.error;
			
			if(isAjax){
				$.ajax({
					type:'get',
					url:'//'+hostmap.www+'/api.php?op=market&page='+curPage+'&num='+num,
					dataType:'jsonp',
					beforeSend:function(){
						//当请求前先将进度条透明度设为1（即显示进度条）
						if(dfLoading){
							dfLoading.css('opacity',1);
						}
					},
					success:function(data){
						var status=data.status,
							result=data.data||null,
							html='',
							tPage=1,
							rowset=[];
						if(status){
							tPage=Math.ceil(result.total/num);
							rowset=result.rowset;
							for(var i=0; i < rowset.length; i++){
								var desc=rowset[i].desc;
								var prc=desc!='价格面议'?'&yen; '+desc:desc;
								html+='<li class="g-cf">'+
									'<p class="g-fl pic" style="background-image:url('+rowset[i].thumb+')"></p>'+
									'<div class="g-pr inf">'+
										'<p class="t">'+rowset[i].title+'</p>'+
										'<p class="prc">'+prc+'</p>'+
										'<a class="buy-btn" data-href="product?productId='+rowset[i].product_id+'">立即购买</a>'+
									'</div>'+
								'</li>';
							}
							content(html);
							if(curPage==tPage){
								isAjax=false;
								return false;
							}
						}else{
							error();
						}
					},
					complete:function(){
						//当请求完成时无论成功或者失败都将进度条透明度设为0（即隐藏进度条）
						if(dfLoading){
							dfLoading.css('opacity',0);
						}
					}, 
					error:error
				});	
			}else{
				if(me){
					me.resetload();
				}
			}
		},
		
		//首次进入页面、重新加载页面、上滑页面时执行的公用函数
		loadFun:function(isLoad,me){
			//当下滑时需传入me，初始进入页面和重新加载页面时me为空字符串
			me=me||'';
			
			//下滑至顶部更新页面时此项未空字符串，初始进入页面和重新加载页面时此项为$deatlate（即有进度条）
			var dfLoading=isLoad?$deatlate:'';
			var opts={
				dfLoading:dfLoading,
				content:function(html){
					$jxtjLst.html(html);
					
					//下滑至顶部更新页面时执行
					if(me){
						me.resetload();
					}
				},
				error:function(){
					var html='<div class="load-fail"><p>请求失败</p><p><a class="reload">点此重新加载</a></p></div>';
					if(!$jxtj.find('.load-fail')[0]){
						$jxtj.prepend(html);
					}
				}
			}
			jxtj.loadPage(opts,me);
			
			//点此重新加载页面
			$jxtj.on('tap','.reload',function(){
				opts.dfLoading=$deatlate;
				me='';
				jxtj.loadPage(opts,me);
			});
		},
		
		//上下滑动加载页面
		upDown:function(){
			$jxtj.dropload({
				scrollArea:window,
				loadUpFn:function(me){//下滑
					jxtj.loadFun(false,me);
				},
				loadDownFn:function(me){//上滑
					page++;
					jxtj.loadPage({
						curPage:page,
						dfLoading:'',
						content:function(html){
							$jxtjLst.append(html);
							me.resetload();
						},
						error:function(){
                			me.resetload();
						}
					},me);
				}
			});
			
		},
		
		init:function(){
			jxtj.loadFun(true);
			jxtj.upDown();
			common.datatrans();
		}
	};
	
	jxtj.init();
	
});