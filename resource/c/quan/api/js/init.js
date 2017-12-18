/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	var $form = $('form'),
		$orderType = $form.find('select[name="orderType"]'),
		$idKey = $form.find('dt.J_id'),
		apis = {
			grouptopic:'thread/',
			topiccomment:'comment/thread/',
			grouptopiccomment:'comment/circle/thread/',
			groupactcomment:'comment/circle/act/'
		},
		idKyes = {
			grouptopic:'圈子Id',
			topiccomment:'话题Id',
			grouptopiccomment:'圈子Id',
			groupactcomment:'圈子Id'
		},
		friendly = {
			status:'接口调用状态',
			has_nextPage:'是否有下一页',
			has_prePage:'是否有上一页',
			pageIndex:'当前页码',
			pageSize:'每页显示条数',
			totalPages:'总页数',
			totalRows:'总记录数'
		},
		$data = $('.J_data');
	$form.on('submit',function(){
		$.get('//quan.csc86.com/api/'+apis[$form.find('select[name="api"]').val()]+$form.find('input[name="id"]').val(),$form.serializeArray(),function(data){
			var html = '<dl>';
			html += '<dt>'+friendly['status']+'：</dt><dd>'+ (data['status'] ? '正常' : '出错') +'</dd>';
			if(data['status']){
				$.each(data['data'],function(i,v){
					if(i != 'list'){
						html += '<dt>'+friendly[i]+'：</dt><dd>'+ ($.isNumeric(v) ? v : v ? '是' : '否') +'</dd>'
					}
				});
				html += '<dt>列表数据：</dt><dd><ol>';
				$.each(data['data']['list'],function(i,v){
					html += '<li><dl>';
					$.each(v,function(k,v){
						html += '<dt>'+k+'</dt><dd>'+v+'</dd>';
					});
					html +='</dl></li>';
				});
				html += '</ol></dd>';
			}else{
				html += '<dt>错误信息：</dt><dd>'+ data['data'] +'</dd>';
			}
			$data.html(html);
		},'jsonp')
		return false;
	}).delegate('select[name="api"]', 'change', function(event) {
		var val = $(this).val();
		$orderType.prop('disabled',val != 'grouptopic');
		$idKey.html(idKyes[val] + '：');
	});
});