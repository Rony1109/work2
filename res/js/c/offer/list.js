csc.offer = csc.offer || {};

csc.offer.selectAll = function (){
	var
		$all = $("[name='all']"),
		$offerId = $(".c>:checkbox");
	$all.on("change",function (){
		var	prop = $(this).prop("checked");
		$all.prop("checked",prop);
		$offerId.prop("checked",prop);
	});
	$offerId.on("change",function (){
		$offerId.filter(":not(:checked)").length ? $all.prop("checked",false) : $all.prop("checked",true);
	});
	return this;
};

csc.offer.checkedLength = function (){
	return $(".c>:checkbox:checked").length
};

csc.offer.ajaxDo = function (ids, type){
	var	othis = this,
			ids = $.isArray(ids) ? ids : [ids],
			url;
	switch(type){
		case "delete":
		url = "sell/delete.html";
		break;
		case "groundings":
		url = "sell/groundings.html";
		break;
		case "ungroundings":
		url = "sell/ungroundings.html";
		break;
		case "grounding":
		url = "sell/grounding.html";
		break;
		case "ungrounding":
		url = "sell/ungrounding.html";
		break;
		case "changeStatus":
		url = "sell/changeStatus.html";
		break;
		default:
		;
	}
	$.post("/product/" + url,{"proid":ids},function (data){
		csc.useDialog(function (){
			if(data.status){
				csc.success(data.msg);
				if($.browser.msie && $.browser.version < 9.0){
					setTimeout(function(){location.reload()},2000);
				}else{
					$.get(location.href,function (data){
						$("div.af-bd").html($("div.af-bd",data).html());
						othis.selectAll().doOn().doOff().doSubmit();
						if(/status=/.test(location.search)){
							seajs.use([csc.url("res","/f=js/m/statusTab"),csc.url("res","/f=js/m/param")],function(){
								csc.statusTab("ul.af-tab>li>a","[href*='status="+csc.param("status")+"']");
							});
						}
					});
				}
			}else{
				csc.alert(data.msg);
			}
		});
	},"jsonp");
};


csc.offer.doOn = function (){
	var	othis = this;
	$("table").delegate("td>a[href^='/product/sell/grounding.html']","click",function (){
		var	ids = $(this).attr("href").split("proid=")[1];
		othis.ajaxDo(ids, "grounding");
		return false;
	});
	return this;
};

csc.offer.doOff = function() {
	var othis = this;
	$("table").delegate("td>a[href^='/product/sell/ungrounding.html']", "click", function() {
		var $t = $(this);
		var ids = $t.attr("href").split("proid=")[1];
		$.get($t.parents('td').data('url'), function(data) {
			if(data.status === '-1'){
				$.tip({
					content:data.error,
					closeTime: 2,
					closeCallback:function(){
						location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
					}
				});
			}
			else if(data.status === '0') {
				csc.useDialog(function() {
					csc.confirm('<span class="g-fs-14">'+data.error+'</span>', function() {
						othis.ajaxDo(ids, "ungrounding");
					});
				});
			} 
			else{
				othis.ajaxDo(ids, "ungrounding");
			}
		}, 'jsonp');

		return false;
	});
	return this;
};
csc.offer.doSubmit = function (){
	var	othis = this;
	$("table").delegate("td>a[href^='/product/sell/changeStatus.html']","click",function (){
		var	ids = $(this).attr("href").split("proid=")[1];
		othis.ajaxDo(ids, "changeStatus");
		return false;
	});
	return this;
};
$(function() {
	var othis = csc.offer;
	var $doc = $(document);
	othis.selectAll().doOn().doOff().doSubmit();
	$doc.on('click', 'li.item>a', function() {
		var $t = $(this);
		csc.useDialog(function() {
			if (othis.checkedLength()) {
				var ids = [];
				$(".c>:checkbox:checked").each(function(i, v) {
					ids[i] = v.value;
				});
				if ($t.text() != "删除") {
					if ($t.text() === "批量提交") {
						othis.ajaxDo(ids, "changeStatus");
					} else {
						var groundings = $t.text().indexOf("上架") > -1;
						if (!groundings) {
							$.post('/product/sell/getReleaseAndRecomProIds', {
								proid: ids.join()
							}, function(data) {
								var msg = "删除后不可恢复，确定要删除吗？";
								if (data.status === '0') {
									csc.confirm('<span class="g-fs-14">' + data.error + '</span>', function() {
										othis.ajaxDo(ids, 'ungroundings');
									});
									var $af = $('.af-list');
									$.each($.extend(data.data.recommendProIds, data.data.republishProIds), function(i, v) {

										$af.find('input[value="' + v + '"]').parents('tr').find('.pro-title a').css('color', 'red');
									});
								} else {
									othis.ajaxDo(ids, 'ungroundings');
								}
							}, 'json');
						} else {
							othis.ajaxDo(ids, 'groundings');
						}
					}
				} else {
					$.post('/product/sell/getReleaseAndRecomProIds', {
						proid: ids.join()
					}, function(data) {
						var msg = "删除后不可恢复，确定要删除吗？";
						if (data.status === '0') {
							csc.confirm('<span class="g-fs-14">' + data.error + '</span>', function() {
								setTimeout(function() {
									csc.confirm(msg, function() {
										othis.ajaxDo(ids, "delete");
									});
								}, 1);
							});
							var $af = $('.af-list');
							$.each($.extend(data.data.recommendProIds, data.data.republishProIds), function(i, v) {
								$af.find('input[value="' + v + '"]').parents('tr').find('.pro-title a').css('color', 'red');
							});
						} else {
							csc.confirm(msg, function() {
								othis.ajaxDo(ids, "delete");
							});
						}



					}, 'json');



				}
			} else {
				csc.tip("请选中数据后操作");
			}
		});
		return false;
	}).on('submit','.search form',function(){
		var $title = $(this).find('.txt');
		var val = $.trim($title.val());
		if (val === '请输入产品名称') {
			$title.val('');
		}
	});
	seajs.use(csc.url("res", "/f=js/m/placeholder"), function() {
		csc.placeholder("input[placeholder]");
	});
	if ($('link[href*="page-to/style_li"]').length == 0) { //加载分页样式
		seajs.use(csc.url('res', '/f=css/m/page-to/style_li.css'));
	}

	$doc.on('click', 'div.inquiry-list div.il-pg a', function(event) {
		var $inquiryList = $('div.inquiry-list');
		$.get($(this).attr('href'), function(data) {
			$inquiryList.find('tbody').html(data['list']);
			$inquiryList.find('div.il-pg').html(data['pagebar'])
		}, 'jsonp')
		event.preventDefault();
	});
}).on('click', 'a.inquiry-num', function(event) {
	var productId = $(this).data('product');
	$.get(csc.url('inquiry', '/pageQueryInquiry'), {
		productId: productId,
		page: 1
	}, function(data) {
		artDialog({
			title: '询盘列表',
			content: '<div class="inquiry-list" data-product="' + productId + '">' +
				'<div class="il-bd"><table><thead class="g-t-l"><tr><td width="200" class="in">询盘名称</td><td width="150">会员名称</td><td width="168">公司名称</td><td class="g-t-c" widt="100">询盘时间</td><td class="g-t-c" width="120">操作</td></tr></thead><tbody>' + data['list'] + '</tbody></table></div>' +
				'<div class="il-pg">' + data['pagebar'] + '</div>' +
				'</div>',
			lock: true,
			fixed: true
		});
	}, 'jsonp');
	event.preventDefault();
}).on('click', 'td[data-url] .J_edit', function() {
	var $t = $(this);
	$.get($t.parents('td').data('url'), function(data) {
		if(data.status === '-1'){
			$.tip({
				content:data.error,
				closeTime: 2,
				closeCallback:function(){
					location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
				}
			});
		}
		else if (data.status === '0') {
			csc.useDialog(function() {
				csc.confirm('<span class="g-fs-14">' + data.error + '</span>', function() {
					location.href = $t.attr('href');
				});
			});
		} else {
			location.href = $t.attr('href');
		}
	}, 'jsonp');
	return false;
});

csc.offer.sj = function(str) {
	$(str).parent("div.pro-sj").addClass("hover");
};