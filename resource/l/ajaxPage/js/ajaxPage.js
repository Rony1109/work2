/*
ajax分页
后台返回的格式应类似下面的格式（其中status、page、totalPage、data这个几个字段应跟下面的取名及格式一模一样，且是返回时不可缺少的项）：
{
	status:1, //1代表有记录，0代表无记录
	page:1,//page代表当前页数
	pageSize:10,//pageSize为每页显示的条数
	totalPage:20 //totalPage代表总页数,无记录时返回为0
	data:[ //返回的记录，当无记录的时候直接返回空数组[]
		{},
		{}
	]	
}
by pengle (在不影响现有功能的基础上，若以下代码达不到你的要求，可自行扩展)
演示效果可查看旺铺商品详情页评论列表
*/

define(function(require, exports, module){
	var ajaxPage={
		creatHtml:function(page,totalPage){
			var html='';
			if(page>1){
				html+='<a class="prev" href="">&lt; 上一页</a>';
			}else{
				html+='<a class="prev no-prev">&lt; 上一页</a>';
			}
			if(totalPage<=10){
				for(var i=1;i<=totalPage;i++){
					if(page===i){
						html+='<a class="cur">'+i+'</a>';
					}else{
						html+='<a class="itm" href="">'+i+'</a>';
					}
				}
			}else{
				if(page<=4){
					for(var i=1;i<=page-1;i++){
						html+='<a class="itm" href="">'+i+'</a>';
					}
					html+='<a class="cur">'+page+'</a>';
					html+='<a class="itm" href="">'+(page+1)+'</a>';  
					html+='<a class="itm" href="">'+(page+2)+'</a>';  
					html+='<span>...</span>';  
					html+='<a class="itm" href="">'+totalPage+'</a>';
				}
				if(page>4&&(page<=totalPage-3)){
					html+='<a class="itm" href="">1</a>';  
					html+='<span>...</span>';
					html+='<a class="itm" href="">'+(page-2)+'</a>'; 
					html+='<a class="itm" href="">'+(page-1)+'</a>';  
					html+='<a class="cur">'+page+'</a>';  
					html+='<a class="itm" href="">'+(page+1)+'</a>';  
					html+='<a class="itm" href="">'+(page+2)+'</a>'; 
					html+='<span>...</span>';  
					html+='<a class="itm" href="">'+totalPage+'</a>';  
				}
				if(page>totalPage-3){
					html+='<a class="itm" href="">1</a>'; 
					html+='<span>...</span>';  
					html+='<a class="itm" href="">'+(page-2)+'</a>'; 
					html+='<a class="itm" href="">'+(page-1)+'</a>';  
					html+='<a class="cur">'+page+'</a>';  
					for(var i = page+1;i<totalPage;i++){  
						html+='<a class="itm" href="">'+i+'</a>'; 
					}  
				}
			}
			if(page<totalPage){  
				html+='<a class="next" href="">下一页 &gt;</a>';  
			}else{
				html+='<a class="next no-next">下一页 &gt;</a>';  
			}
			html+='<span class="total">共 <em>'+totalPage+'</em> 页</span>';
			if(totalPage>1){
				html+='<span class="goto">到第 <input id="pageTxt" class="page-txt" type="text" name="" value=""/> 页 <a class="page-smt" href="">确定</a></span>';
			}
			return html;
		},
		init:function(options,data){
			var opts={
				obj:null,//必填，需要分页的内容容器
				pageObj:null,//必填，分页容器
				isMoveTop:false,//点击分页滚动条是否移动到对应位置
				moveObj:null,//移动到对应位置的容器
				curPage:1,//默认当前页
				nodata:'',//暂无数据时的html
				type:'get',//ajax请求方式
				url:'',//请求的url
				dataType:'jsonp',//ajax请求返回的数据类型
				beforeSend:function(){},//ajax请求前执行 
				content:function(){}//处理内容循环函数
			};
			
			opts=$.extend({},opts,options);
			
			var obj=opts.obj,
				pageObj=opts.pageObj,
				isMoveTop=opts.isMoveTop,
				moveObj=opts.moveObj,
				curPage=opts.curPage,
				nodata=opts.nodata,
				type=opts.type,
				url=opts.url,
				dataType=opts.dataType,
				beforeSend=opts.beforeSend;
			var b={
				ajax:function(curPage,isBind){//ajax请求
					isBind=isBind?isBind:false;
					$.ajax({
						type:type,
						url:url+'?page='+curPage,
						dataType:dataType, 
						beforeSend:beforeSend,
						success:function(data){
							if(data.status){//1有记录,0无记录
								var	totalPage=data.totalPage;//总页数
									page=data.page;//当前页
								
								opts.content(data.data);//处理需要分页的内容
								
								//生成分页html
								var html=ajaxPage.creatHtml(page,totalPage);	
								pageObj.html(html);
								
								if(isBind){
									b.toPageBind(page,totalPage);
								}
							}else{
								obj.html(nodata);
							}
						}
					});
				},
				toPage:function(page){
					b.ajax(page);
					if(isMoveTop){//点击分页滚动条上移
						$('html,body').animate({scrollTop:moveObj.offset().top},300);
					}
				},
				toPageBind:function(page,totalPage){//点击事件相关
					//点击上一页
					pageObj.on('click','.prev',function(){
						if(page==1){
							return false;
						}
						page--;
						b.toPage(page);
						return false;
					});
					
					//点击下一页
					pageObj.on('click','.next',function(){
						if(page==totalPage){
							return false;
						}
						page++;
						b.toPage(page);
						return false;
					});
					
					//点击对应页面
					pageObj.on('click','.itm',function(){
						page=parseInt($(this).html());
						b.toPage(page);
						return false;
					});
					
					//点击当前页
					pageObj.on('click','.cur',function(){
						return false;
					});
					
					//跳转第几页的文本框只能输入数字，当输入为非数字时直接制空，当输入大于最大页数时直接变为最大页数
					pageObj.on('keyup','.page-txt',function(){
						var $this=$(this),
							val=$this.val();
						$this.val(val.replace(/\D/g,''));
						var num=$this.val();
						if(num>=totalPage){
							num=totalPage;
						}
						$this.val(num);
						return false;
					});
					
					//点击确定
					pageObj.on('click','.page-smt',function(){
						var val=$.trim($('.page-txt').val());
						if(!pageTxt){
							return false;
						}
						page=parseInt(val);
						b.toPage(page);
						return false;
					});
				},
				run:function(){
					b.ajax(curPage,true);
				}
			};
			b.run();
		}
	};
	
	module.exports=ajaxPage;
});