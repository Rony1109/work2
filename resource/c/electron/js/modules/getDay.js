/**
 * 前端模板js文件
 * 
 *	
 */
define(function(require, exports, module) {
	

	
	exports.init = function (date,ins,options) {
			var defaults = {
				container: '.J_Date',
				dateEl: '#date-list',
				msgEl: '.J_Msg',
				msgInfo: '.J_Msg .data-info',
				curMonth: 'span.m1',
				api:"//api.csc86.com/search/getMonth"
			};
			options = $.extend(defaults, options);
			
			//获取星期几 星期天为7
			function _getDay(y, m, d) {
				return new Date(y, m-1, d).getDay() == 0 ? 7 : new Date(y, m-1, d).getDay();
			}
			
			//生成月分表格HTML
			function getDateTableHtml(y,m){
				var days = new Date(y, m, 0).getDate(),	//当前月有多少天
					p_days = new Date(y, m-1, 0).getDate(),	// 上个月有多少天
					n_days = new Date(y, m+1, 0).getDate();	// 下个月有多少天
					
				var html = '<table>'+
							'<thead>'+
								'<tr>'+
									'<td>一</td>'+
									'<td>二</td>'+
									'<td>三</td>'+
									'<td>四</td>'+
									'<td>五</td>'+
									'<td>六</td>'+
									'<td>日</td>'+
								'</tr>'+
							'</thead>'+
							'<tbody>';
		
		
				//当前月的第一个天是星期几
				var _start = _getDay(y, m, 1);
				//当前月第一天不是星期一
				var arr_p=[],qk = _start-1;
				for(var xq = p_days - _start + 2; xq <= p_days ; xq++){
					arr_p.push(xq);
				}
				
				for(var x = 1 ; x <= Math.ceil((_start-1+days)/7)*7; x++){
					html += x%7 == 1 ? "<tr>":"";
					if(x<=qk){
						html += '<td class="old">'+arr_p[x-1]+'</td>';
					}else if(x>qk+days){
						html += '<td class="old">'+(x-qk-days)+'</td>';
					}else{
						var zd = x - qk;
						html += '<td data-info="'+zd+'">'+zd+'</td>';
					}
					html += x%7 == 0 ? "</tr>":"";
				}
				html += '</tbody></table>';
				return html;
			}
			
			//查询参数时间
			var _year = date.year,	//年
				_month = date.month, //月
				ins = ins || 'ec';	//行业
						
			var	dateEl = $(options.dateEl);
				msgEl = $(options.msgEl),
				msgInfo=$(options.msgInfo);
			
			
			
			
			var zh_data = {};
			dateEl.off("mouseenter.date",".active")
				.off("mouseleave.date",".active")
				.on("mouseenter.date",".active",function(){
					var $o = $(this),
						ii = $(this).attr("data-info"),
						ext = zh_data[ii];

					msgInfo.empty();
					if(!ext){return;}
					$(ext).each(function(){
						$('<a target="_blank" href="'+this.url+'" title="'+this.title+'">'+this.title+'</a>').appendTo($(options.msgInfo));
					});
					if(_getDay(_year, _month, ii) > 4){
						_left = $o.position().left-170;
						msgEl.find('i').css('left', 182);
					}else{
						_left = $o.position().left-40;
						msgEl.find('i').css('left', 52);
					}
					msgEl.css({
						left: _left,
						top: $o.position().top + $o.outerHeight() - 2,
						zIndex: 3
					}).show();

				})
				.on("mouseleave.date",".active",function(){
					$(options.msgEl).hide();					
				});		
			
			dateEl.html('<img src="//res.csc86.com/v2/m/init/image/loading.gif"> 正在加载...');
			$.get(defaults.api,{ zh:ins, y:date.year, m:date.month},function(ad){
				zh_data = ad;
				dateEl.html(getDateTableHtml(_year,_month));
				$.each(ad,function(ii, ext){
					$(options.container).find('td[data-info="'+ii+'"]').addClass('active');
				});
				//标注今天日期
				var _day = new Date();
				if(_day.getFullYear() == _year && _day.getMonth()+1==_month){
					dateEl.find('td[data-info="'+_day.getDate()+'"]').addClass('today').attr("title","今天");
				}
				
				
			},'jsonp');

			msgEl.on({
				mouseenter: function(){
					$(this).show();
				},
				mouseleave: function(){
					$(this).hide();
				}
			});
			
		}
});