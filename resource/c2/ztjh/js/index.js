define(function(require, exports, module) {
	var common=require('./common.js');

	var ztjh = {
		index:function(){
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
				var url = ['/placesite/products.html', '/placesite/companys.html'];
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
			});
			
			$('.wqhg-nf').find('li').hover(function(){
				$(this).css('background','#ccc');
			},function(){
				$(this).css('background','#fff');
			});
	
			$(".wqhg-nf").hover(function(){
	
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
			
			$(".wqhg-nf").find('li').on('click',function(){
				$(".wqhg-nf").find('span').text($(this).text());
				$(".wqhg-nf").find('ul').css('display','none');
				$(this).hide();
			});
			
			$('.wqhg-yf').find('li').hover(function(){
				$(this).css('background','#ccc');
			},function(){
				$(this).css('background','#fff');
			});
	
			$(".wqhg-yf").hover(function(){
	
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
			
			$(".wqhg-yf").find('li').on('click',function(){
				$(".wqhg-yf").find('span').text($(this).text());
				$(".wqhg-yf").find('ul').css('display','none');
				$(this).hide();
			});
			
			$('.jhzt-ul').find('li').on('click',function(){
				var len=$('.jhzt-ul').find('li').length;
				
				for(var i=0;i<len;i++)
				{
					$('.jhzt-ul').find('li').eq(i).removeClass('cure');			 	
				}
				$(this).addClass('cure');
			});
			
			$('.jhym-zt').hover(function(){
				$(this).find('.jhym-ztyc').show();
					
			},function(){
				$(this).find('.jhym-ztyc').hide();
			});
			
			$('.jhym-fx').hover(function(){
				$(this).find('.jhym-fxyc').show();
					
			},function(){
				$(this).find('.jhym-fxyc').hide();
			});
			
			$('.wqhg-go').on('click',function(){
				
				$('.datatim').submit();
				/*var start =$('#d1').val();
				var end   =$('#d2').val();
				var typeid=$('#typeid').val();
				var keywords=$('#keywords').val();
				$.get('http://www.csc86.com/zhuanti/',{'begintimes':start,'endtimes':end,'typeid':typeid,'keywords':keywords},function(data){
					alert(data);
				});*/
				/*var start =$('#d1').val();
				var end   =$('#d2').val();
				var typeid=$('#typeid').val();
				var keywords=$('#keywords').val();*/
				
				//window.location='http://www.csc86.com/zhuanti/?'+'begintimes='+start+'&endtimes='+end+'&typeid='+typeid+'&keywords='+keywords;
				/*$.get('http://www.csc86.com/zhuanti/',{'begintimes':start,'endtimes':end,'typeid':typeid,'keywords':keywords},function(data){
							
				},'json');*/
				
			})
			
			/*
			$('.jhzt-ul').find('li').hover(function(){
				$(this).css('color','#e94545');
			},function(){
				$(this).css('color','#444');
			})*/
		}
	}
	module.exports = ztjh;		
});