function importProduct(productIds){//单个 或多个产品入库操作
	$.get('qualityProduct.updateChecked',{productIds:productIds},function(data) {
		if(data > 0){
			artDialog({
				title:'操作成功',
				content:'操作成功',
				icon:'succeed',
				fixed: true,
				time: 1.5
			});
			setTimeout(function(){
				location.href = location.href;
			},1500);
			return;
		}
		artDialog.alert('操作失败，请稍后重试');
	},'jsonp');
}

function delProduct(productIds){//单个或多个产品删除操作
	$.get('qualityProduct.delQualityProduct',{productIds:productIds},function(data) {
		if(data > 0){
			artDialog({
				title:'操作成功',
				content:'操作成功',
				icon:'succeed',
				fixed: true,
				time: 1.5
			});
			setTimeout(function(){
				location.href = location.href;
			},1500);
			return;
		}
		artDialog.alert('操作失败，请稍后重试');
	},'jsonp');
}

function importProducts(){//批量入库
	var
		$checked = $('tbody').find('input:checkbox:checked'),
		hasNoRat = false,
		ids = [];
	if($checked.length > 0){
		$checked.each(function(){
			var
				$t = $(this),
				$tr = $t.parents('tr');
			if($tr.find('a.ico-to-rat').length > 0){
				hasNoRat = true;
				return;
			}
			ids.push($t.val());
		});
		if(hasNoRat){
			artDialog.alert('存在未评级产品，不能入库！');
			return false;
		}
		importProduct(ids.join());
		return false;
	}else{
		artDialog.alert('请选择你要操作的项！');
	}
	return false;
}

function delProducts(){//批量删除
	var
		$checked = $('tbody').find('input:checkbox:checked'),
		ids = [];
	if($checked.length > 0){
		$checked.each(function(){
			ids.push($(this).val());
		});
		delProduct(ids.join());
	}else{
		artDialog.alert('请选择你要操作的项！');
	}
	return false;
}

function ratProduct(productId,$toRat){//星级评定
	$.get('qualityProduct.findGradeDetail', {productId:productId}, function(data) {console.log(data['grade']);
		var html = '<div class="rat-product"><dl clas="g-c-f g-fs-14">';
			html += '<dt>产品标题：</dt><dd>'+data['productName']+'</dd><dt>产品分类：</dt><dd>'+data['categoryName']+'</dd><dt>产品价格：</dt><dd>'+data['price']+'</dd><dt>企业名称：</dt><dd>'+data['enterprise']+'</dd>';
			html += '</dl>'+
					'<div class="g-c-f g-t-c">'+
						'<label class="g-f-l"><input type="radio" name="rad" value="H" '+((data['grade'] == 'H') ? 'checked' : '')+' /><span class="g-ico ico-rat-h"></span></label>'+
						'<label><input type="radio" name="rad" value="M" '+((data['grade'] == 'M') ? 'checked' : '')+'/><span class="g-ico ico-rat-m"></span></label>'+
						'<label class="g-f-r"><input type="radio" name="rad" value="L" '+((data['grade'] == 'L') ? 'checked' : '')+'/><span class="g-ico ico-rat-l"></span></label>'+
					'</div></div>';
			artDialog({
				title:'产品信息',
				content:html,
				ok:function(){
					var $star = $('div.rat-product').find(':checked');
					if($star.length == 0){//等级评定后才能提交
						artDialog.alert('请评定等级！');
						return false;
					}
					$.get('qualityProduct.updateGrade',{productId:productId,grade:$star.val()},function(data) {//星级评定接口
						if(data == 0){
							artDialog.alert('操作失败，请稍后重试');
							return;
						}
						$toRat.before('<a href="javascript:" class="J_rat '+$star.next().attr('class')+'"></a>');
						$toRat.remove();
					},'jsonp');
				},
				cancel:true,
				lock:true
			});
	},'jsonp');
}

function goPage(f){
	var
		$f = $(f),
		inputpage = $.trim($f.find("[name='start']").val()),
		msg = '';
	if(inputpage.length == 0){
		msg = '请输入页码数！';
	}else if(/\D/.test(inputpage)){
		msg = '页码只能为正整数！'
	}else if(/^0+$/.test(inputpage)){
		msg = '页码数不能为0！';
	}else if(parseInt(inputpage) > $f.data('total')){
		msg = '输入页码数大于实际页码数！';
	}else if(parseInt(inputpage) == $f.data('index')){
		msg = '当前已经是第'+inputpage+'页！';
	}
	if(msg.length != ''){
		artDialog({
			icon:'error',
			content: msg,
			fixed: true,
			time: 1.5
		});
		return false;
	}else{
		$f.find("[name='start']").css('color','#fff').val((inputpage-1)*10);
	}
}

$(function(){
	$('div.g-list').delegate('thead input:checkbox', 'change', function(event) {//全选事件
		change($(this).prop('checked'));
	}).delegate('a.ico-import', 'click', function(event) {
		var $t = $(this),
			$tr = $t.parents('tr');
		if($tr.find('a.ico-to-rat').length > 0){
			artDialog.alert('该产品还未评级，不能入库！');
			return;
		}
		importProduct($tr.data('product'));
		event.preventDefault();
	}).delegate('a.ic-del', 'click', function(event) {
		delProduct($(this).parents('tr').data('product'));
		event.preventDefault();
	}).delegate('a.J_rat', 'click', function(event) {
		var $t = $(this),
			productId = $t.parents('tr').data('product');
		ratProduct(productId,$t);
		event.preventDefault();
	});

	$('button.import-btn').bind('click',importProducts);
	$('button.del-btn').bind('click',delProducts);

	$('form[data-total]').bind('submit',function(){
		return goPage(this);
	}).delegate('a.pg-prev,a.pg-next', 'click', function(event) {

		var $t = $(this),
			$form = $t.parents('form'),
			index = $form.data('index'),
			total = $form.data('total');
		if(index == 1 && $t.is('.pg-prev')){
			artDialog({
				icon:'error',
				content: '已经是第一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		if(index == total && $t.is('.pg-next')){
			artDialog({
				icon:'error',
				content: '已经是最后一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		$form.find('input[name="start"]').val( $t.is('.pg-next') ? index + 1 : index-1);
		$form.trigger('submit');
		event.preventDefault();
	});

	var $autoForm = $('form[data-autocomplete]'),
		defLev1 = getURL_argument('sel_level1'),
		defLev2 = getURL_argument('sel_level2'),
		defLev3 =getURL_argument('sel_level3');

	autoCompleteDefaultVal($autoForm);

	$.get('qualityProduct.findLevel1', function(data) {
		var tmp = '';
		for(var i in data){
			tmp+= '<option value="'+data[i]['categoryNo']+'"'+ (data[i]['categoryNo'] == defLev1 ? ' selected':'')+'>'+data[i]['categoryName']+'</option>'
		}
		$autoForm.find('[name="sel_level1"]').append(tmp).trigger('change');

	},'json');

	$autoForm.delegate('[name="sel_level1"]', 'change', function(event) {
		var val = $(this).val(),
			$level2 = $autoForm.find('[name="sel_level2"]'),
			tmp = '<option value="">二级分类</option>';
		if(val == ''){
			$level2.html(tmp);
			return;
		}
		$.get('qualityProduct.findSubCategory',{sel_level:val}, function(data) {
			for(var i in data){
				tmp+= '<option value="'+data[i]['categoryNo']+'"'+ (data[i]['categoryNo'] == defLev2 ? ' selected':'')+'>'+data[i]['categoryName']+'</option>'
			}
			defLev2 = null;
			$level2.html(tmp).trigger('change');
		},'json');
	}).delegate('[name="sel_level2"]', 'change', function(event) {
		var val = $(this).val(),
			$level3 = $autoForm.find('[name="sel_level3"]'),
			tmp = '<option value="">三级分类</option>';
		if(val == ''){
			$level3.html(tmp);
			return;
		}
		$.get('qualityProduct.findSubCategory',{sel_level:val}, function(data) {
			for(var i in data){
				tmp+= '<option value="'+data[i]['categoryNo']+'"'+ (data[i]['categoryNo'] == defLev3 ? ' selected':'')+'>'+data[i]['categoryName']+'</option>'
			}
			defLev3 = null;
			$level3.html(tmp);
		},'json');
	});


});