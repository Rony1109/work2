define(function(require, exports, module){
	var $dialog=require('dialog'),
	    _num=$('.wp-mdl-hover .jsProXcw',window.top.document).length,//最多可选择的商品数量
	    _sltedNum=$('.slted-num'),
		_jsHvSltProLst=$('.jsHvSltProLst'),
		_mdlEditIframe=$(top.artDialog.list['mdlEdit'].iframe),
		_jsChseHtml=_mdlEditIframe.contents().find('.jsChseHtml');

	/*点击关闭选择商品弹窗*/
	$('.jsCnclBtn').bind('click',function(){
		top.artDialog.list['mdlSltPro'].close();
		
		/*初始化编辑弹窗中的$('.jsChseHtml')信息*/
		_jsChseHtml.attr('data-chsenum',0);
		_jsChseHtml.html('');
	});
	
	/*点击分页*/
	$('.Spage').delegate('li a','click',function(){
		var _this=$(this),
		    _href=_this.attr('href');
		_jsChseHtml.attr('data-chsenum',_sltedNum.html());
		_jsChseHtml.html(_jsHvSltProLst.html());
		window.location.href=_href;
		return false;
	});
	
	/*点击搜索*/
	$('input[name=searchPro]').bind('click',function(){
		_jsChseHtml.attr('data-chsenum',_sltedNum.html());
		_jsChseHtml.html(_jsHvSltProLst.html());
		$('.jsMdlSrchPro').submit();
		return false;
	});
	
	$(function(){
		/*可选择商品数量提示*/
		$('.total-num').html(_num);
		_sltedNum.html($('.jsHvSltProLst li').length);
		
		/*点击分页的时让所选择的商品保留*/
		if(parseInt(_jsChseHtml.data('chsenum'))){
			_sltedNum.html(_jsChseHtml.data('chsenum'));
			_jsHvSltProLst.html(_jsChseHtml.html());
			
			$('.jsSltProLst li').find('.have-slt').remove();
			$('.jsSltProLst li').each(function(){
				var _this=$(this);
				if(!_this.find('.jsSltPro')[0]){
					_this.append('<a class="gray-xbtn jsSltPro" href="">选择</a>');
				}
			});
			_jsChseHtml.find('li').each(function(){
				var _sort=$(this).find('input[name="sort[]"]').val();
			    var _ltLi=$('.jsSltProLst li[data-sort='+_sort+']');
				_ltLi.find('.jsSltPro').remove();
				_ltLi.append('<span class="have-slt">已选择</span>');
			});
		}
		initPicMove();
	});
	
	
	/*选择商品*/
	$('.jsSltProLst').delegate('.jsSltPro','click',function(){
		var _this=$(this),
		    _li=_this.parents('li'),
		    _img=_li.attr('data-img'),
		    _title=_li.attr('data-title'),
		    _price=_li.attr('data-price'),
		    _url=_li.attr('data-url'),
			_sort=_li.attr('data-sort'),
		    _html='<li class="g-cf">\
                    <div class="g-fl pic"><a href="'+_url+'" target="_blank"><img src="'+_img+'" width="50" height="50" alt=""/></a></div>\
                    <div class="g-pr info">\
                        <p class="name"><a href="'+_url+'" title="'+_title+'">'+_title+'</a></p>\
                        <p class="prc">'+_price+'</p>\
                    </div>\
                    <div class="sltpro-opts">\
                    	<a class="move-up jsMoveUp"></a>\
                        <a class="move-down jsMoveDown"></a>\
                        <a class="del-opt jsDelOpt"></a>\
                    </div>\
					<input type="hidden" name="img[]" value="'+_img+'"/>\
					<input type="hidden" name="title[]" value="'+_title+'"/>\
					<input type="hidden" name="price[]" value="'+_price+'"/>\
					<input type="hidden" name="url[]" value="'+_url+'"/>\
					<input type="hidden" name="sort[]" value="'+_sort+'"/>\
                </li>';
		var _sltNum=_jsHvSltProLst.find('li').length;
		if(_sltNum<_num){
			_jsHvSltProLst.prepend(_html);
			_sltedNum.html(_sltNum+1);
			_this.remove();
			_li.append('<span class="have-slt">已选择</span>');
		}else{
			$dialog.tip('您已选择了'+_sltNum+'个产品，不能再选择！');
		}
		
		//初始移动图标样式
		initPicMove();
		return false;
	});
	
	/*鼠标移到已选择商品显示排序及删除按钮*/
	_jsHvSltProLst.delegate('li','mouseenter',function(){
		var _this=$(this);
		_this.addClass('hover');
	}).delegate('li','mouseleave',function(){
		var _this=$(this);
		_this.removeClass('hover');
	});
	
	/***移动相关js***/
	function initPicMove(){
		var _ul=_jsHvSltProLst;
		var _first=_ul.find('li:first');
		var _last=_ul.find('li:last');
		_ul.find('li').removeClass('hover');
		_ul.find('.jsMoveUp').removeClass('no-move-up');
		_ul.find('.jsMoveDown').removeClass('no-move-down');
		_first.find('.jsMoveUp').addClass('no-move-up')
		_last.find('.jsMoveDown').addClass('no-move-down');
	}
	
	//上移
	_jsHvSltProLst.delegate('.jsMoveUp','click',function(){
		var _old=$(this).parents('li');
		var _prev=_old.prev();
		_prev.before(_old);
		initPicMove();
		return false;
	});
	
	//下移
	_jsHvSltProLst.delegate('.jsMoveDown','click',function(){
		var _old=$(this).parents('li');
		var _prev=_old.next();
		_prev.after(_old);
		initPicMove();
		return false;
	});
	
	/*取消选中图片*/
	_jsHvSltProLst.delegate('.jsDelOpt','click',function(){
		var _this=$(this);
		var _li=_this.parents('li');
		var _sort=_li.find('input[name="sort[]"]').val();
		var _ltLi=$('.jsSltProLst li[data-sort='+_sort+']');
		_ltLi.find('.have-slt').remove();
		_ltLi.append('<a class="gray-xbtn jsSltPro" href="">选择</a>');
		_li.remove();
		_sltedNum.html($('.jsHvSltProLst li').length);
		initPicMove();
		return false;
	});
	
	/*点击提交*/
	$('.jsOkBtn').removeAttr('disabled').css('cursor','pointer');
	$('.jsOkBtn').bind('click',function(){
		var _smtBtn=$(this);
		var _form=$('.jsSltProFrm');
		var _sltedNum=$('.jsHvSltProLst li').length;
		var loading;
		
		loading=$dialog.loading('正在提交中，请稍后……');
		_smtBtn.attr('disabled','disabled').css('cursor','default');
		$.post(_form.attr('action'),_form.serializeArray(),function(data){
			loading.close();
			if(data.status){
				data.msg==""?$dialog.tip("提交成功！",2,function(){
					_mdlEditIframe.contents().find('.jsSltNum .slted').html(_sltedNum);
					top.artDialog.list['mdlSltPro'].close();
					
					/*初始化编辑弹窗中的$('.jsChseHtml')信息*/
					_jsChseHtml.attr('data-chsenum',0);
					_jsChseHtml.html('');
				}):$dialog.tip(data.msg,2,function(){ 
					_mdlEditIframe.contents().find('.jsSltNum .slted').html(_sltedNum);
					top.artDialog.list['mdlSltPro'].close();
					
					/*初始化编辑弹窗中的$('.jsChseHtml')信息*/
					_jsChseHtml.attr('data-chsenum',0);
					_jsChseHtml.html('');
				});
			}else{
				data.msg==""?$dialog.tip("提交失败！"):$dialog.tip(data.msg);
				_smtBtn.removeAttr('disabled').css('cursor','pointer');
			}
        },"json");
		return false;
	});
});