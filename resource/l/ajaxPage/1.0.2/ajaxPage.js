/*
ajax分页by pengle
请与开发约定后台返回格式为如下，且以下几个需要跟下面一模一样，除以下几个字段外 可根据项目需要返回需要的其他字段，其他字段不做限制
{
	status:1, //1代表有记录，0代表无记录
	page:1,//page代表当前页数
	pageSize:10,//pageSize为每页显示的条数
	totalPage:20, //totalPage代表总页数,无记录时返回为0
	totalRecord:100, //代表共多少条记录
	data:[ //返回的记录，当无记录的时候直接返回空数组[]
		{},
		{}
	]	
}

分页html（html是固定死的，可自己设置样式来达到自己需要的外观效果）:
<a class="prev" href="">&lt; 上一页</a><a href="">1</a><span>...</span><a href="">3</a><a href="">4</a><a class="cur" href="">5</a><a href="">6</a><a href="">7</a><span>...</span><a class="next" href="">下一页 &gt;</a><span class="total">共<em>50</em>页</span><span>到第 <input id="pageTxt" class="page-txt" type="text" name="" value=""/> 页 <input id="pageSmt" class="page-smt" type="submit" name="" value="确定"/></span>

以上仅为分页html(调用此插件后动态生成)，实际用的时候需要外面包含个父容器，如:
<div class="ajax-page">
	分页html
</div>

--------------------------------------------------------------------------

下面举个例子，此次我以seajs异步加载为例子
描述：
1、实现效果是ul里面放内容礼包 ajax-page里面放分页代码
2、当点击分页的时候，页面滚动条回到ul开始处
3、假设请求url为ajax.php
4、若除当前页外还需要传的参数为dataObj={mm:"a","cc":"b"}，若不需要另外传递参数则dataObj设为null,注意当前页page为固定值已经在插件代码里面写死其值为curPage的值，无需在传递的参数中另外设置，且必须规定后台获取当前页的name是page。

html代码：
<ul class="lst">
	此处为内容列表
</ul>
<div class="ajax-page">
	此处为调用插件后动态生成的分页html
</div>

js代码：
require.async('//res.csc86.com/v2/l/ajaxPage/js/ajaxPage.js',function(m){
	var $lst=$('.lst');
	m.init({
		obj:$lst,//必填，需要分页的内容容器（obj暂时只在无数据时用到了）
		pageObj:$('.ajax-page'),//必填，分页容器
		isMoveTop:true,//点击分页滚动条是否移动到对应位置
		moveObj:$lst,//移动到对应位置的容器
		curPage:1,//默认当前页
		nodata:'<li>暂无数据</li>',//暂无数据时的html
		type:'get',//ajax请求方式
		url:'ajax.php',//请求的url
		dataObj:dataObj,//ajax请求传的参数，必须为object类型,默认为null即只传递当前页page（已在下面b对象中的ajax函数中写死）
		dataType:'jsonp',//ajax请求返回的数据类型
		beforeSend:function(){//ajax请求前执行 
			$lst.html('<li>加载中...</li>');
		},
		content:function(data){//处理内容循环函数，只有当返回的status时为1时才会执行到此处，所以在此处无需判断status是否为1了
			var data=data.data;
			var html='';
			$.each(data,function(i,n){
				html+='<li>'+data.title+'</li>';
			});
			$lst.append(html);
		}
	});
});
*/

define(function(require, exports, module){
	var AjaxPage = {
		creatHtml: function(page, totalPage,pagetz){
			var html = '';
			if(page > 1){
				html += '<a class="prev" href="javascript:;">&lt; 上一页</a>';
			}else{
				html += '<a class="prev no-prev">&lt; 上一页</a>';
			}
			if(totalPage <= 10){
				for(var i=1;i<=totalPage;i++){
					if(page===i){
						html+='<a class="cur" href="javascript:;">'+i+'</a>';
					}else{
						html+='<a class="itm" href="javascript:;">'+i+'</a>';
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
			if(totalPage>1&&pagetz){
				html+='<span class="goto">到第 <input id="pageTxt" class="page-txt" type="text" name="" value=""/> 页 <a class="page-smt" href="">确定</a></span>';
			}
			return html;
		},
		init: function(options){
			
			//默认的参数
			var opts={
				obj:null,//必填，需要分页的内容容器（obj暂时只在无数据时用到了）
				pageObj:null,//必填，分页容器
				isMoveTop:false,//点击分页滚动条是否移动到对应位置
				moveObj:null,//移动到对应位置的容器
				pynum:0,//偏移数
				curPage:1,//默认当前页
				nodata:'',//暂无数据时的html
				type:'get',//ajax请求方式
				url:'',//请求的url
				pagetz:true,//是否开启页面输入数字跳转
				dataObj:null,//ajax请求传的参数，必须为object类型,默认为null即只传递当前页page（已在下面b对象中的ajax函数中写死）
				dataType:'jsonp',//ajax请求返回的数据类型
				beforeSend:function(){},//ajax请求前执行 
				content:function(data){}//处理内容循环函数，只有当返回的status时为1时才会执行到此处，所以在此处无需判断status是否为1了
			};
			
			opts=$.extend({},opts,options);
			
			var obj=opts.obj,
				pageObj=opts.pageObj,
				isMoveTop=opts.isMoveTop,
				moveObj=opts.moveObj,
				pynum=opts.pynum,
				curPage=opts.curPage,
				nodata=opts.nodata,
				type=opts.type,
				url=opts.url,
				dataObj=opts.dataObj,
				dataType=opts.dataType,
				beforeSend=opts.beforeSend,
				dataObj=dataObj?dataObj:{},
				pagetz=opts.pagetz,
				totalPage = 0;
			var b={
				ajax:function(curPage,isBind, params){
					
					isBind=isBind?isBind:false;
					
					//传递给后台的当前页，若dataObj中本身也有个page属性，则会被下面的这个覆盖掉
					dataObj.page=curPage;
					
					//ajax请求
					$.ajax({
						type:type,
						url:url,
						data:!! params ? params : dataObj,
						dataType:dataType, 
						beforeSend:beforeSend,
						success:function(data){
							if(data.status){//1有记录,0无记录
								    totalPage=data.totalPage;//总页数
									page=data.page;//当前页
								
								opts.content(data);//处理需要分页的内容
								
								//生成分页html
								var html = AjaxPage.creatHtml(page,totalPage,pagetz);	
								pageObj.html(html);
								
								if(isBind){
									b.toPageBind(page);
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
						$('html,body').animate({scrollTop:moveObj.offset().top+pynum},300);
					}
				},
				toPageBind:function(page){//点击事件相关
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
			this.ajax = b.ajax;
		},
		create: function (container, totalPage) {
			container = typeof container === "object" ? $(container) : $(document.getElementById(container)) || $(document.body);
			totalPage = parseInt(totalPage, 10) || 11;

			
		}
	};
	
	module.exports = AjaxPage;
});