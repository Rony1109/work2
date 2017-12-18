seajs.config({
    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'dialog':'m/dialog/js/init.js'
    },
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});

/*“购买付费关键词”下面的所有页面的相关js*/
define(function(require, exports, module) {
	var $dialog=require('dialog');
	var isSubmit=false;
	
	var buyFfKeyObj={		
		/*已购买的关键词*/
		haveBuyKey:function(){
			//分页跳转相关js
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
			
			//鼠标移入表格对应行变色
			$('.jsXrpmLstTbl tbody').delegate('tr:not(:has(".xrpm-no-data"))','mouseenter',function(){
				$(this).addClass('hover');
			}).delegate('tr:not(:has(".xrpm-no-data"))','mouseleave',function(){
				$(this).removeClass('hover');
			});
		},
		
		/*购买付费关键词*/
		buyFfkey:function(){
			$('.jsBuyFfKeyFrm').bind('submit',function(){
				var _this=$(this);
				if(isSubmit===true){
					return false;
				}
				isSubmit=true;
				var dg=$dialog({
					id:'submitting',
					content:'<img style="margin-right:15px;vertical-align:middle;" src="//res.csc86.com/v2/l/artDialog/4.1.7/skins/icons/csc-loading.gif"/>正在提交中...',
					fixed: true,
					lock: true,
					opacity: .1,
					title: false,
					//icon: 'csc-loading',
					init:function(){
						$.post(_this.attr('action'),_this.serializeArray(),function(data){
							if(data.success){
								$('body').append('<div class="g-dn">'+data.msg+'</div>').find('.jsSmtFrm').trigger('submit');
							}
							else{
								dg.close();
								$dialog.tip(data.msg,2.5);
							}
							isSubmit=false;
						},"json");
					}
				});
				return false;
			});	
		}
	};
	
	module.exports=buyFfKeyObj;
});