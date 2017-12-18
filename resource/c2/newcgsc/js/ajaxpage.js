define(function(require, exports, module) {
	var ajaxpage=require('l/ajaxPage/1.0.2/ajaxPage.js');//ajaxPage插件
	var index={
		//ajaxpage分页
		ajaxpages:function(){
	var $pagetable=$('.pagetable').find('tbody');
	ajaxpage.init({
		obj:$pagetable,//必填，需要分页的内容容器（obj暂时只在无数据时用到了）
		pageObj:$('.ajax-page'),//必填，分页容器
		isMoveTop:true,//点击分页滚动条是否移动到对应位置
		moveObj:$pagetable,//移动到对应位置的容器
		curPage:1,//默认当前页
		nodata:'<tr><td colspan="4">暂无成交记录</td></tr>',//暂无数据时的html
		type:'post',//ajax请求方式
		url:'http://shop12790441.b2b.csc86.com/record/3952584.html',//请求的url
		pagetz:false,//是否开启输入数字跳转
		dataObj:{},//ajax请求传的参数，必须为object类型,默认为null即只传递当前页page（已在下面b对象中的ajax函数中写死）
		dataType:'jsonp',//ajax请求返回的数据类型
		beforeSend:function(){//ajax请求前执行 
			//$lst.html('<li>加载中...</li>');
		},
		content:function(data){//处理内容循环函数，只有当返回的status时为1时才会执行到此处，所以在此处无需判断status是否为1了
			var html='';
			$.each(data.data,function(i,n){
				var me=this;
				html+='<tr>\
                <td>'+me.memberName+'</td>\
                <td>'+me.other+'</td>\
                <td>'+me.num+'</td>\
                <td>'+me.paytime+'</td>\
                </tr>\
                <tr>';
			});
			$pagetable.html(html);
		}
});
		},
		
		//首页入口函数
		init:function(){
			index.ajaxpages(); 
		}
	};
	index.init();
});