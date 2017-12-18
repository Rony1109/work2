/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
	require('//res.csc86.com/f=js/p/Highcharts/code/highcharts.js,/js/p/Highcharts/code/modules/no-data-to-display.js');
function hicharts(obj,options) {
    var chart = Highcharts.chart(obj[0], options);
}

function charts(dataobj){

	$.post('//programlog.csc86.com/getAllErrorStatistic.html',dataobj, function (data) {
		if(data.pie.status==200){
			var options1={
				chart: {
					type: 'spline'
				},
				title: {
					text: ''
				},
				xAxis: {
					categories: data.line.datetime
				},
				yAxis: {
					title: {
						text: 'Exception quantity'
					},
					min:0,
					allowDecimals:false
				},
				series: data.line.content,
				colors: ['#2d91dc','#afd436','#db7e2c','#f15959','#e459f1','#39fcf1','#FFF635','#1CFF49'],
				credits:{
					enabled:false
				},
				legend: {
					align: 'center',
					//   floating:true,
					verticalAlign: 'bottom',
					x: 0,
					y: 0
				}
			};


			var options2={
				title: {
					text: ''/*$('#startTime').val()*/,
					floating:true,
					align:'center',
					verticalAlign:'bottom',
					style: {
						color: '#666',
						fontWeight: 'normal',
						fontSize: '12px'
					}
				},
				lang: {
					noData: "noData"
				},
				noData: {
					style: {
						fontWeight: 'bold',
						fontSize: '15px',
						color: '#303030'
					}
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
							format: '<b>{point.name}</b>: {point.y}'
						}
					}
				},
				series: [{
					type: 'pie',
					name: '所占比例',
					data: data.pie.data
				}],
				colors: ['#2d91dc','#afd436','#db7e2c','#f15959','#e459f1','#39fcf1','#FFF635','#1CFF49'],
				credits:{
					enabled:false
				}
			};


			var options3={
				chart: {
					type: 'column'
				},
				title: {
					text: ''
				},
				tooltip: {
					style: {
						//padding: '50px'
					}
				},
				xAxis: {
					categories: data.histogram.datetime
				},
				yAxis: {
					title: {
						text: 'Exception quantity'
					},
					min:0,
					allowDecimals:false
				},
				lang: {
					noData: "noData"
				},
				noData: {
					style: {
						fontWeight: 'bold',
						fontSize: '15px',
						color: '#303030'
					}
				},
				series: data.histogram.content,
				colors: ['#2d91dc','#afd436','#db7e2c','#f15959','#e459f1','#39fcf1','#FFF635','#1CFF49'],
				credits:{
					enabled:false
				},
				legend: {
					align: 'center',
					verticalAlign: 'bottom',
					x: 0,
					y: 0
				}
			};
			hicharts($('#rizhicontent'),options1);
			hicharts($('#rizhicontent2'),options2);
			hicharts($('#rizhicontent3'),options3);

		}

	},'jsonp');

}
	charts.apply(this,[{startTime:$('#startTime').val(),endTime:$('#endTime').val()}]);

    $('.htan').on('click',function(){
		charts.apply(this,[{startTime:$('#startTime').val(),endTime:$('#endTime').val()}]);
    });

	$('.close-left').on('click',function(){
		if($('.warpbottom').is('.qp')){
			$('.warpbottom').removeClass('qp');
		}else{
			$('.warpbottom').addClass('qp');
		}
	});

});