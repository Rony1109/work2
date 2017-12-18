/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	require('l/highcharts/4.0.1/js/highcharts');
	init = require('./init');


	$('.help').hover(function(){
		$(this).addClass('help-hover');
	},function(){
		$(this).removeClass('help-hover');
	});

	exports.init = function(data){
		$('#flowTrend7').highcharts({
			chart: {
				type: 'spline'
			},
			title: {
				text: ''
			},
			xAxis: {
				categories: data['trend']['7']['date']
			},
			yAxis: {
				title: {
					text: ''
				},
				min:0,
				allowDecimals:false
			},
			series: [{
				name: '浏览次数',
				data: data['trend']['7']['pv']
			}, {
				name: '访客数',
				data: data['trend']['7']['uv']
			}],
			colors: ['#afd436','#2d91dc'],
			credits:{
				enabled:false
			},
			legend:{
				enabled:false
			}
		});
		$('#product7').highcharts({
			title: {
				text: ''
			},
			tooltip: {
				pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.y} 人'
					}
				}
			},
			series: [{
				type: 'pie',
				name: '所占比例',
				data: data['product']['7']
			}],
			colors: ['#2d91dc','#afd436','#db7e2c','#f15959','#e459f1','#39fcf1'],
			credits:{
				enabled:false
			}
		});
		init.tabs('.tabs',function($t){
			if($t.data('flow')){
				return;
			}
			$t.data('flow',true);
			if($t.data('line')){
				$('#flowTrend30').highcharts({
					chart: {
						type: 'spline'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: data['trend']['30']['date'],
						tickInterval: 3
					},
					yAxis: {
						title: {
							text: ''
						},
						min:0,
						allowDecimals:false
					},
					series: [{
						name: '浏览次数',
						data: data['trend']['30']['pv']
					}, {
						name: '访客数',
						data: data['trend']['30']['uv']
					}],
					colors: ['#afd436','#2d91dc'],
					credits:{
						enabled:false
					},
					legend:{
						enabled:false
					}
				});
			}
			if($t.data('donut')){
				$('#product30').highcharts({
					title: {
						text: ''
					},
					tooltip: {
						pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								format: '<b>{point.name}</b>: {point.y} 人'
							}
						}
					},
					series: [{
						type: 'pie',
						name: '所占比例',
						data: data['product']['30']
					}],
					colors: ['#2d91dc','#afd436','#db7e2c','#f15959','#e459f1','#39fcf1'],
					credits:{
						enabled:false
					}
				});
			}
		});
	}
});