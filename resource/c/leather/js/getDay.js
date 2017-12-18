/**
 * 前端模板js文件
 * 
 *	
 */
define(function(require, exports, module) {
	
	exports.init = function (date,ins,options) {
			var defaults = {
				container: '.J_Date',
				dateEl: '.date-list',
				msgEl: '.J_Msg',
				msgInfo: '.J_Msg .data-info',
				curMonth: 'span.m1'
			};

			options = $.extend(defaults, options);

			//当前年份
			var _year = date.year;
			var ins = ins || 'fangzhi';
			//当前月份
			var _month = date.month;
			//当前日期
			var _day = new Date();
			//当前是星期几

			//当前月有多少天
			var days = new Date(_year, _month, 0).getDate();
			// 上个月有多少天
			var p_days = new Date(_year, _month-1, 0).getDate();
			// 下个月有多少天
			var n_days = new Date(_year, _month+1, 0).getDate();
			// 下下个月有多少天
			var nn_days = new Date(_year, _month+2, 0).getDate();
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
						'<tbody><tr>';
			//获取星期几
			function _getDay(y, m, d) {
				return new Date(y, m-1, d).getDay() == 0 ? 7 : new Date(y, m-1, d).getDay();
			}


			//当前月的第一个天是星期几
			var _start = _getDay(_year, _month, 1) == 0 ? 7 : _getDay(_year, _month, 1);
			//当前月第一天不是星期一
			if(_start != 1) {
				for(var j = (p_days - _start + 2); j <= p_days; j++) {
					html += '<td class="old">'+j+'</td>';
				}
			}

			for(var i = 1; i <= days; i++) {
				html += '<td data-info="'+_year+'-'+_month+'-'+i+'">'+i+'</td>';
				if(_getDay(_year, _month, i)%7 == 0 || _getDay(_year, _month, i) == 7){html += '</tr><tr>';} 
			}

			var last_day = 7 - _getDay(_year, _month, days);

			if(last_day != 7) {
				for(var k = 1; k <= last_day; k++) {
					html += '<td class="old">'+k+'</td>';
				}
			}

			html += '</tr></tbody></table>';

			$(options.container).find(options.dateEl).html(html);

			/*for(var ii in ad) {
				2013-12-4
				//api.csc86.com/search/getMonth?zh=fangzhi&y=2013&m=11
			}*/
			$.get('//api.csc86.com/search/getMonth',{
				zh:ins,
				y:date.year,
				m:date.month
			},function(ad){
				$.each(ad,function(ii, ext){
					$(options.container).find('td[data-info$="-'+ii+'"]').addClass('active').on({
						mouseenter: function(){
							//var _left = (_getDay(_year, _month, ii) >= 4) ? () : $(this).position().left-40;
							if(_getDay(_year, _month, ii) > 4){
								_left = $(this).position().left-170;
								$(options.msgEl).find('i').css('left', 180);
							}
							else {
								_left = $(this).position().left-40;
								$(options.msgEl).find('i').css('left', 50);
							}

							$(options.msgEl).css({
								left: _left,
								top: $(this).position().top+ 25,
								zIndex: 3
							}).show();

							$(options.msgInfo).empty();
							$(ext).each(function(){
								$('<p><a target="_blank" href="'+this.url+'" title="'+this.title+'">'+this.title+'</a></p>').appendTo($(options.msgInfo)).on({
									mouseover: function(){
										$(this).addClass('hover');
									},
									mouseout: function(){
										$(this).removeClass('hover');
									}
								});
							});
							
						},
						mouseleave: function(){
							$(options.msgEl).hide();
						}
					});
				});
			},'jsonp');

			$(options.msgEl).on({
				mouseenter: function(){
					$(this).show();
				},
				mouseleave: function(){
					$(this).hide();
				}
			});
			

			//标注今天日期
			if($(options.container).find(options.curMonth).hasClass('cur')) {
				$(options.container).find('td[data-info="'+_day.getFullYear()+'-'+(_day.getMonth()+1)+'-'+_day.getDate()+'"]').addClass('today');
			}
			
		}



	
});