seajs.config({
    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'dialog':'m/dialog/js/init.js'
    },
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});

define(function(require, exports, module) {
	var $dialog=require('dialog');
	var isSubmit=false;
	
	var pmMng={
		init:function(){
			/*分页跳转相关js*/
			$(".gotoPage").click(function(){
				var _this=$(this);
				var pageNo = _this.siblings(".pageNo").val(); 
				var pageCount = _this.attr("pageCount");
				var currentPage = _this.attr("pageNo");
				if(pageNo == null || pageNo == ""){
					return false;
				}
				pageNo = parseInt(pageNo);
				pageCount = parseInt(pageCount);
		
				if(pageNo > pageCount){
					pageNo.val(pageCount);
				}
				_this.closest(".getoForm").submit();
			});
			
			/*鼠标移入表格对应行变色*/
			$('.jsXrpmLstTbl tbody').delegate('tr:not(:has(".xrpm-no-data"))','mouseenter',function(){
				$(this).addClass('hover');
			}).delegate('tr:not(:has(".xrpm-no-data"))','mouseleave',function(){
				$(this).removeClass('hover');
			});
			
			/*关键词状态下拉列表*/
			$("#selectDateType").change(function(){
				var _this=$(this);
				var _url=_this.attr("data-url");
				window.location = _url+"?dateType=" + _this.val();
			});
		},
		
		/*赠送关键词*/
		zsKey:function(){
			//取消排名
			$('.jsXrpmLstTbl').delegate('.jsCancelPm','click',function(){
				var _this=$(this),
					_id=_this.data('id');
				$dialog({
					id:"cancelPm",
					title: false,
					fixed: true,
					close:true,
					content:'<p class="cnclpm-pop">这个关键词好像带来不少曝光,<br>取消排名后，有可能抢不回来了哦！</p>',
					icon:'mem-w',
					ok:function(){
						if(isSubmit===true){
							return false;
						}
						isSubmit=true;
						$.post("//search.csc86.com/user/deletePayKeyword.do",{"id":_id},function(data){
							if(data.success){
								location.href=location.href;
							}
							else{
								$dialog.error(data.msg,true,3);
							}
							isSubmit=false;
						},"jsonp");
					},
					okVal:"我要换词",
					cancelVal: "那算了",
					cancel:true
				});
				return false;
			});
		},
		
		/*付费关键词*/
		ffKey:function(){
			/*预留函数*/
		}
	};
	pmMng.init();
	module.exports=pmMng;	
});