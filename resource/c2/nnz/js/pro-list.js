define(function(require, exports, module) {
	require('./common.js');

	$(".sch-xl").hover(function(){
		$(this).find('ul').css('display','block');
		$(this).find('li').css('display','block');
		$(this).find('span').next().removeClass('sch-dw');
		$(this).find('span').next().addClass('sch-up');
		
	},function(){
		$(this).find('ul').css('display','none');
		$(this).find('li').css('display','none');
		$(this).find('span').next().removeClass('sch-up');
		$(this).find('span').next().addClass('sch-dw');
	})
	
	$(".sch-xl").find('li').hover(function(){
		$(this).css('background','#ccc');
	},function(){
		$(this).css('background','#fff');
	});
	
	$(".sch-xl").find('li').on('click',function(){
		$(".sch-xl").find('span').text($(this).text());
		$(".sch-xl").find('ul').css('display','none');
		$(this).hide();
		var arr = ["请输入产品名称", "请输入公司名称或关键词"];
		var $q = $('.sch-bk').find("input[name='q']");
		var url = ['/nanningo/products.html', '/nanningo/companys.html'];
		var $ch_search = $('.sch-bk').find('.search_txt1');
		var $form = $('.sch-bk').find('form');
		var $cscId=$('input[name=cscId]')[0];
		var index=$(this).index();
		var $input = '<input type="text" id="search-txt" maxlength="50" autocomplete="off" value="" placeholder="' + arr[index] + '" name="q"  class="qsr">';
		$form.attr('action', url[index]);
		$ch_search.html($input);
		$ch_search.append($cscId);
		ph.placeholder('#search-txt');
		return false;
	})
	
	$(".opt-sp").hover(function(){
		$(this).css('color','#2379d1');
		$(this).find('ul').show();
		$(this).find('p').hide();
		 return false;
	},function(){
		$(this).css('color','#444');
		$(this).find('ul').hide();
		$(this).find('p').show();
	});
	
	$(".opt-sp").find('li').hover(function(){
		$(this).css('background','#f9f8f9');
		$(this).css('color','#2379d1');
	},function(){
		$(this).css('background','#fff');
		$(this).css('color','#444');
	});
	
	$(".opt-sysj").find('li').on('click',function(){
		var url=location.href; 
		var typ=$(this).find('span').text();
		var urls=changeURLArg(url,'businessType',typ); 
		var emtxt=$(this).parents('.opt-sp').find('em').text();
		
		$(this).parents('.opt-sp').css('color','#444');
		$(this).parents('.opt-sp').find('em').text($(this).html());
		$(this).html(emtxt);
		$(this).parents('.opt-sp').find('p').show();
		$(this).parents('.opt-sp').find('ul').hide();
		 location.href=urls;
		 return false;
	});
	
	$('.option-zxfb').on('click',function(){
		var url=location.href; 
		//var typ=$(this).find('span').text();
		var urls=changeURLArg(url,'sort','time-desc');
		location.href=urls;
		return false;
	});
	
	$('.option-zh').on('click',function(){
		var url=location.href; 
		//var typ=$(this).find('span').text();
		var urls=changeURLArg(url,'sort','all');
		location.href=urls;
		return false;
	});
	
	
	
	/*上下排序*/
	$('.option-jg').find('a').eq(0).on('click',function(){
		var url=location.href; 
		var img=$(this).find('img').attr('src');
		console.log(img);
		//var typ=$(this).find('span').text();
		var urls=changeURLArg(url,'sort','price-asc');
		location.href=urls;
		return false;
	})
	
	$('.option-jg').find('a').eq(1).on('click',function(){
		var url=location.href; 
		//var typ=$(this).find('span').text();
		var urls=changeURLArg(url,'sort','price-desc');
		location.href=urls;
		return false;
	})
	/*商品经营模式*/
	$(".opt-jyms").find('li').on('click',function(){
		var url=location.href; 
		var typ=$(this).find('span').text();
		var urls=changeURLArg(url,'businessModeId',typ); 
		var emtxt=$(this).parents('.opt-sp').find('em').text();
		$(this).parents('.opt-sp').css('color','#444');
		$(this).parents('.opt-sp').find('em').text($(this).html());
		$(this).html(emtxt);
		$(this).parents('.opt-sp').find('p').show();
		$(this).parents('.opt-sp').find('ul').hide();
		location.href=urls;
		return false;
	});
	
	function changeURLArg(url,arg,arg_val){ 
    	var pattern=arg+'=([^&]*)'; 
    	var replaceText=arg+'='+arg_val; 
    	if(url.match(pattern)){ 
        	var tmp='/('+ arg+'=)([^&]*)/gi'; 
        	tmp=url.replace(eval(tmp),replaceText); 
        	return tmp; 
    	}else{ 
        	if(url.match('[\?]')){ 
            	return url+'&'+replaceText; 
        	}else{ 
            	return url+'?'+replaceText; 
        	} 
    	} 
    	return url+'\n'+arg+'\n'+arg_val; 
	} 

	function gotoPage(pageNo){
		var  pageUrl = window.location.href;
		if(pageUrl.indexOf("page")>0){
			var newPageh = pageUrl.substring(0,pageUrl.indexOf("page"));
			var newpageUrl = pageUrl.substring(pageUrl.indexOf("page"));
			var page;
			if(newpageUrl.indexOf("&")>0){
				page = "page="+pageNo+newpageUrl.substring(newpageUrl.indexOf("&"));
			}else{
				page = "page="+pageNo;
			}
			window.location = newPageh+page;
		}else{
			if(pageUrl.indexOf("?")>0){
				window.location = pageUrl+"&page="+pageNo;
			}else{
				if(pageUrl.charAt(pageUrl.length-1)=='#'){
					pageUrl = pageUrl.substring(0,pageUrl.length-1);
				}
				window.location = pageUrl+"?page="+pageNo;
			}
			
		}
	}
	
	$("#pageBut").click(function(){
		var pageNo = $("#inPageNO").val();
		if(pageNo){
			gotoPage(pageNo);
		}
	});	


/*	$(document).ready(function(){
	  $("#pageBut").click(function(){
		var pageNo = $("#inPageNO").val();
		if(pageNo){
			gotoPage(pageNo);
		}
	  });
	});*/
	
	
});