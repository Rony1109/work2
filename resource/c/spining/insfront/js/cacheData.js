define(function(require, exports, module) {
	module.exports = function() {
		//日期对象
		var _date = null, //日期对象
			_arr = [], //三个月内的数据容器
			_m1 = {}, //第一个月的日期与信息对象
			_m2 = {}, //第二个月的日期与信息对象
			_m3 = {}; //第三个月的日期与信息对象

		//第一个月
		$.ajax({
			url: '//api.csc86.com/search/Montzh?zh=fangzhi&y=2013&m=11&c=2',
			dataType: 'jsonp',
			type: 'get',
			success: function(data) {
					// 获取年份 console.log(new Date(parseFloat(data[i][0].starttime)*1000).getFullYear());
					// 获取当前日期对象 console.log(new Date(parseFloat(data[i][0].starttime)*1000));
					// 获取当前月份的第一天的展会信息 console.log(data[i][0].title);
					// 获取当前月份的第一天 console.log(i);
					// i : data[i][0].title
					/*$.each(data[i], function(curDate){
						console.log(this.title);
					});*/
				$.each(data, function(day){
					$(this).each(function(){
						_m1['"'+day+'"'] = this.title;
						_date = new Date(parseFloat(this.starttime) * 1000);
					});

				});
			}
		});

		function(
			data){
			
		}

		//第二个月
		$.ajax({
			url: '//api.csc86.com/search/Montzh',
			data:{
				zh:,
				y:'2014',

				zh=fangzhi&y=2014&m=1&c=2
			},
			dataType: 'jsonp',
			type: 'get',
			success: function(data) {


					// 获取年份 console.log(new Date(parseFloat(data[i][0].starttime)*1000).getFullYear());
					// 获取当前日期对象 console.log(new Date(parseFloat(data[i][0].starttime)*1000));
					// 获取当前月份的第一天的展会信息 console.log(data[i][0].title);
					// 获取当前月份的第一天 console.log(i);
					// i : data[i][0].title
					/*$.each(data[i], function(curDate){
						console.log(this.title);
					});*/
					$.each(data, function(day){
						$(this).each(function(){
							_m2['"'+day+'"'] = this.title;
						});

					});
			}
		});

		//第三个月
		$.ajax({
			url: '//api.csc86.com/search/Montzh?zh=fangzhi&y=2014&m=2&c=2',
			dataType: 'jsonp',
			type: 'get',
			success: function(data) {
					// 获取年份 console.log(new Date(parseFloat(data[i][0].starttime)*1000).getFullYear());
					// 获取当前日期对象 console.log(new Date(parseFloat(data[i][0].starttime)*1000));
					// 获取当前月份的第一天的展会信息 console.log(data[i][0].title);
					// 获取当前月份的第一天 console.log(i);
					// i : data[i][0].title
					/*$.each(data[i], function(curDate){
						console.log(this.title);
					});*/
					$.each(data, function(day){
						$(this).each(function(){
							_m3['"'+day+'"'] = this.title;
						});

					});
			}
		});

		_arr.push(_m1, _m2, _m3);

		
		return {
			DATE: _date,
			ARRAY: _arr
		};
	};
});
