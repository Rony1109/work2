var addDialog;

function fileDialogComplete(numFilesSelected, numFilesQueued){
	var $id = $('#'+this['movieName']).parents('.pt-value');
	if(numFilesQueued > 0 && $id.find('.v2-images').length > 0 && $id.find('img[src$="img/img.png"]').length < 1){
		artDialog.alert('最多可以上传 '+$id.find('.pt-pic').length+' 张图片！')
	}else{
		numFilesQueued > 0 && this.startUpload();
	}
}

function supportImageSuccess(file,serverData){//单图片上传成功
	var data = eval("("+serverData+")");
	if(data.result == "success"){
		var $id = $('#'+this['movieName']).parents('.pt-value');

		$id.find('img').attr('src',csc.url('img',data['key']));
		$id.find('input').val(data['key']);
	}else{
		artDialog.alert(data['msg']||"上传失败，请重新上传！");
	}
}

function supportImagesSuccess(file,serverData){//多图片上传成功
	var data = eval("("+serverData+")");
	if(data.result == "success"){
		var $id = $('#'+this['movieName']).parents('.pt-value');

		$id.is('.J_images') || $id.addClass('J_images');//添加class用来处理数据验证

		$id.find('img[src$="img/img.png"]:first').attr('src',csc.url('img',data['key'])).data('scr',data['key']).after('<a href="javascript:" class="images-del">删除</a>').parents('div.pt-pic').find('input:hidden').val(data['key']);
	}else{
		artDialog.alert(data['msg']||"上传失败，请重新上传！");
	}
}

function addMember(){
	var $circle = $('input[name="circleId"]'),
		circleId = $circle.val();
	if(circleId){
		var $member= $('input[name="specialmember"]');
		$member.next('ul').length || $member.after('<ul class="g-c-f member-checked dialog-box dialog-checked"></ul>');
		var $ul = $member.next();
		getMember(1,circleId,function(data){
			addDialog = artDialog({
				title:'饭友列表',
				content:data,
				init:function(){
					if(!$(document).data('memberEvent')){

						$(document).delegate('.J_member input', 'change', function(event) {
							var $t = $(this);
							if($t.prop('checked')){
								if($ul.find('li').length > 1){
									alert('最多可以绑定两个饭友！');
									$t.prop('checked',false);
									return;
								}
								$ul.append('<li data-id="'+$t.val()+'">■ '+$t.parent().text()+'</li>');
								$member.val($t.val()+','+$member.val());
							}else{
								$ul.find('li[data-id="'+$t.val()+'"]').remove();
								$member.val($member.val().replace($t.val()+',',''));
							}
						}).delegate('.J_member .page a', 'click', function(event) {
							getMember($(this).attr('href'),null,function(data){
								addDialog.content(data);
							});
							return false;
						}).data('memberEvent',true);
					}
				},
				lock:true,
				close:function(){
					$circle.prop('readonly',$ul.find('li').length > 0 ? true : false);
				}
			});
		});
	}else{
		artDialog.alert('请先绑定圈子！')
	}
}

function getMember(page,circleId,fn){
	page = page || 1;
	fn = fn || function(){};
	var url = /^\d+$/.test(page) ? 'guang.listSpecialMember' : page,
		data = {};
	if(/^\d+$/.test(page)){
		data = {
			pageNo:page,
			circleId:circleId
		};
	}
	var $checked = $('ul.member-checked');
	$.get(url,data,function(data){
		if(data['other']['status'] === '0'){
			artDialog.alert(data['other']['error']);
			return;
		}
		var list = data['data'],
			html = '<div class="dialog-box J_member"><ul class="g-c-f">';
		for(var i in list){
			html += '<li><label><input type="checkbox" value="'+list[i]['userId']+'"'+($checked.find('li[data-id="'+list[i]['userId']+'"]').length ? ' checked' : '')+'>'+list[i]['userName']+'</label></li>';
		}
		html += '</ul><div class="page g-t-r">';
		html += (data['other']['pageCode'] || '');//翻页
		html+='</div></div>';
		fn(html);
	},'jsonp');
}

function addRecommend(){
	var $recommend= $('input[name="recommend"]');
	$recommend.next('ul').length || $recommend.after('<ul class="g-c-f recommend-checked dialog-box dialog-checked"></ul>');
	var $ul = $recommend.next();
	getRecommend(1,'',function(data){
		addDialog = artDialog({
			title:'商家列表',
			content:data,
			init:function(){
				if(!$(document).data('recommendEvent')){
					$(document).delegate('.J_recommend input', 'change', function(event) {
						var $t = $(this);
						if($t.prop('checked')){
							$ul.append('<li data-id="'+$t.val()+'">■ '+$t.parent().text()+'</li>');
							$recommend.val($t.val()+','+$recommend.val());
						}else{
							$ul.find('li[data-id="'+$t.val()+'"]').remove();
							$recommend.val($recommend.val().replace($t.val()+',',''));
						}
					}).delegate('.J_recommend .page a', 'click', function(event) {
						getRecommend($(this).attr('href'),null,function(data){
							addDialog.content(data);
						});
						return false;
					}).delegate('.J_recommend select', 'change', function(event) {
						getRecommend(1,$(this).val(),function(data){
							addDialog.content(data);
						});
					}).data('recommendEvent',true);
				}
			},
			lock:true
		});
	});

}

function getRecommend(page,sT,fn){
	page = page || 1;
	sT = sT || '';
	fn = fn || function(){};
	var url = /^\d+$/.test(page) ? 'guang.listRecommend' : page,
		data = {};
	if(/^\d+$/.test(page)){
		data = {
			pageNo:page,
			supportType:sT
		};
	}

	var brand = /type\=2/.test(location.search);

	if(brand){
		url = url.replace('listRecommend','listSpecialBrandsShop');
	}

	var $checked = $('ul.recommend-checked');
	$.get(url,data,function(data){
		var list = brand ? data['data']['list'] : data['data']['listSupport']['list'],
			listType = data['data']['listType'],
			html = '<div class="dialog-box J_recommend">';
		if(!brand){
			html +='<select name="listType"><option value="">选择商家类型</option>';
			for(var i in listType){
				html += '<option value="'+listType[i]['id']+'"'+(data['supportType'] == listType[i]['id'] ? ' selected' : '')+'>'+listType[i]['name']+'</option>';
			}
			html += '</select>';
		}
		html+='<ul class="g-c-f">';
		for(var j in list){
			html += '<li><label><input type="checkbox" value="'+list[j]['id']+'"'+($checked.find('li[data-id="'+list[j]['id']+'"]').length ? ' checked' : '')+'>'+list[j]['name']+'</label></li>';
		}
		html += '</ul><div class="page g-t-r">';
		html += (data['pageCode'] || '');//翻页
		html+='</div></div>';
		fn(html);
	},'jsonp');
}

function addHotSpecial(){//添加推荐专题
	var $hot = $('input[name="hot"]');
		$hot.next('ul').length || $hot.after('<ul class="g-c-f special-checked dialog-box dialog-checked"></ul>'),
		$ul = $hot.next();
	getHotSpecial(1,function(data){
		addDialog = artDialog({
			title:'专题列表',
			content:data,
			init:function(){
				if(!$(document).data('specialEvent')){//检测是否已经绑定
					$(document).delegate('.J_hotSpecial input', 'change', function(event) {
						var $t = $(this);
						if($t.prop('checked')){
							$ul.append('<li data-id="'+$t.val()+'">'+$t.parent().text()+'</li>');
							$hot.val($t.val()+','+$hot.val());
						}else{
							$ul.find('li[data-id="'+$t.val()+'"]').remove();
							$hot.val($hot.val().replace($t.val()+',',''));
						}
					}).delegate('.J_hotSpecial .page a', 'click', function(event) {
						getHotSpecial($(this).attr('href'),function(data){
							addDialog.content(data);
						});
						return false;
					}).data('specialEvent',true);
				}
			},
			lock:true
		});
	});
}


function getHotSpecial(page,fn){//获取推荐专题
	page = page || 1;
	fn = fn || function(){};
	var url = /^\d+$/.test(page) ? 'guang.hotSpecial' : page,
		data = {};
	if(/^\d+$/.test(page)){
		data = {
			pageNo:page
		};
	}
	var $checked = $('ul.special-checked');
	$.get(url,data,function(data){
		var list = data['data']['list'],
			html = '<div class="dialog-box J_hotSpecial"><ul class="g-c-f">';
		for(var i in list){
			html += '<li><label><input type="checkbox" value="'+list[i]['id']+'"'+($checked.find('li[data-id="'+list[i]['id']+'"]').length ? ' checked' : '')+'>第'+list[i]['issue']+'期 '+list[i]['title']+'</label></li>';
		}
		html += '</ul><div class="page g-t-r">';
		html += (data['pageCode'] || '');//翻页
		html+='</div></div>';
		fn(html);
	},'jsonp');
}

$(function(){
	//本期饭友绑定
	$('input[name="specialmember"]').prev().on('click',addMember);

	//本期推荐绑定
	$('input[name="recommend"]').prev().on('click',addRecommend);

	//人气排行绑定
	$('input[name="hot"]').prev().on('click',addHotSpecial);


	$('form:not(.J_specialSearch)').on('submit',function(){

		var $form = $(this),
			cancel = false,
			$images = $form.find('div.v2-images');

		$form.find('.required').each(function(){//验证必填字段
			var $t = $(this);
			if($t.val() == ''){
				var key = $t.parents('li').find('.pt-key').text().replace('*','').replace('：','');
				artDialog.alert(key+'不能为空 !!!');
				$t.trigger('focus');
				cancel = true;
				return false;
			}
		});

		if(cancel){
			return false;
		}

		if (window.editor && editor.html() == '') { //内容为空
			artDialog.alert('请输入' + ($('div.ke-container').parents('li').find('.pt-key').text().replace('*', '').replace('：', '') || '内容') + ' ！');
			return false;
		}

		cancel || $images.each(function(){
			var $t = $(this),
				key = $t.parents('li').find('.pt-key').text().replace('*','').replace('：','');
			if($images.is(':not(.unrequired)') && $t.find('img[src$="img/img.png"]').length > 4){
				artDialog.alert('请至少上传一张'+key+'图片！！！');
				$t.find('input:first').trigger('focus');
				cancel = true;
				return false;
			}
			$t.find('div.pt-pic.g-f-l').each(function(){
				var $t = $(this),
					pic = $t.find('input:hidden').val(),
					url = $t.find('input:visible').val();
				if((pic == '' && url != '') || (pic != '' && url =='')){
					artDialog.alert(key+' 第'+($t.index()+1)+'张图片的'+(pic == '' ? '图片路径' : '链接地址')+'不能为空 ！！！');
					$t.find('input').trigger('focus');
					cancel = true;
					return false;
				}
			});
		});

		if($form.is('[action^="guang.saveSupport"]') || $form.is('[action^="guang.updateSupport"]') || $form.is('[action^="guang.doBrandshopInfo"]')){//配套服务 或 品牌商家时，其他不能为空
			var $other = $form.find('input:checkbox').parents('.pt-value');
			if($other.is(':not(.unrequired)') && $other.find('input:checkbox:checked').length < 1){
				artDialog.alert('其他不能为空 ！！！');
				cancel = true;
			}
		}

		if(cancel){
			return false;
		}

		if($form.is('[action^="guang.saveSpecial"]') || $form.is('[action^="guang.updateSpecial"]')){
			editor.sync();//同步编辑器内容
			$.post($form.attr('action'),$form.serializeArray(),function(data){
				if(data['status'] == 1){
					artDialog.alert(( data['info'] || '添加成功 ！'));
					location.href = location.href.replace('addSpecial','listSpecial').replace('specialDetails','listSpecial');
				}else{
					artDialog.alert(( data['info'] || '添加失败 ！'));
				}
			},'jsonp');
			return false;
		}

		if ($form.is('.column-form')) {
			$.post($form.attr('action'), $form.serializeArray(), function(data) {
				if (data['status'] == 1) {
					artDialog.alert((data['info'] || '添加成功 ！'));
					history.back();
				} else {
					artDialog.alert((data['info'] || '添加失败 ！'));
				}
			},'jsonp');
			return false;
		}
	}).delegate('a.images-del', 'click', function(event) {
		var $t = $(this);
		$t.prev().attr('src','http://resmanage.csc86.com/img/img.png').parents('div.pt-pic').find('input:hidden').val('');
		$t.remove();
	}).delegate('input[name="circleId"]', 'click', function(event) {
		$(this).prop('readonly') && artDialog.alert('绑定饭友后不能修改圈子ID，请清空饭友后再修改！');
	});


	//专题删除操作
	$('div.g-list').delegate('a[data-delspecialid]', 'click', function(event) {
		var specialId = $(this).data('delspecialid');
		artDialog.confirm('确认要删除此专题么？',function(){
			$.post('guang.deleteSpecial',{specialId:specialId},function(data){
				if(data['status'] == 1){
					artDialog.alert('删除成功！');
					setTimeout(function(){
						location.href = location.href;
					},1800);
				}else{
					artDialog.alert((data['info']||'删除失败，请刷新后再试！'))
				}
			},'jsonp');
		});
		event.preventDefault();
	});

	$('form.J_specialSearch').delegate('select', 'change', function(event) {
		var $form = $(this).parents('form');
		$(this).attr('name','sepcialId');
		$form.find('input[name="keyWord"]').removeAttr('name');
		$form.attr('action','guang.listById').trigger('submit');
	});

	if($.browser.version <= 7){
		$("#pt-form li,.m_basic .nth1").addClass("g-c-f");
	}

	if (location.pathname === '/bops-app/bops/guang.listShop') {
		(function() {
			$('.operation-l').on('click', '.bind', function(event) {

				var $ids = $('.g-list').find('.list-id :checked');
				var ids = [];

				if ($ids.length === 0) {
					return artDialog.alert('请选择数据后操作');
				}

				$ids.each(function(index) {
					ids.push(this.value);
				});

				artDialog({
					title: '绑定楼层',
					content: '<div class="floor-bind"><form action="" class="J_floor_bind"><select name="" class="J_venue">' + (window.cacheBind ? cacheBind.venue : '<option value="">请选择</option>') + '</select><br /><select name="" class="J_floor" disabled><option value="">请选择</option></select><br /><select name="" class="J_area" disabled><option value="">请选择</option></select></form></div>',
					button: [{
						name: '　绑定　',
						callback: function() {
							var dialog = this;
							var $venue = $('.J_venue');
							var $floor = $('.J_floor');
							var $area = $('.J_area');
							if($area.val() === '') {
								artDialog.alert('请选择商铺区域');
								return false;
							};
							$.post('guang.shopMappingSave', {
								shopIds: '["' + ids.join('","') + '"]',
								venueId: $venue.val(),
								venueName: $venue.find(':selected').text(),
								floorId: $floor.val(),
								floorName: $floor.find(':selected').text(),
								shopAreaId: $area.val(),
								shopAreaName: $area.find(':selected').text()
							}, function(data) {
								if (data.success === 'true') {
									dialog.close();
									artDialog(data.msg || '绑定成功');
									setTimeout(function() {
										location.href = location.href;
									}, 2000)
									return;
								}
								artDialog.alert(data.msg || '绑定失败');
							}, 'json');
							return false;
						}
					}, {
						name: '取消绑定',
						callback: function() {
							var dialog = this;
							var $venue = $('.J_venue').find(':selected');
							var $floor = $('.J_floor').find(':selected');
							var $area = $('.J_area').find(':selected');
							$.post('guang.shopMappingDelete', {
								shopIds: '["' + ids.join('","') + '"]'
							}, function(data) {
								if (data.success === 'true') {
									dialog.close();
									artDialog(data.msg || '解除成功');
									setTimeout(function() {
										location.href = location.href;
									}, 2000)
									return;
								}
								artDialog.alert(data.msg || '解除失败');
							}, 'json');
							return false;
						}
					}],
					init: function() {
						$('button:contains(　绑定　)').addClass('aui_state_highlight');
						if (window.cacheBind) return;
						cacheBind = {
							floors: {},
							venues: {}
						};
						$.get('guang.shopMappingDetail',{"cityId":$("#cityId").val()}, function(data) {
							var html = '<option value="">请选择</option>';
							if (data.success === 'true') {
								data = data.data;
								for (var i = 0; i < data.length; i++) {
									if (data[i].venueId) {
										html += '<option value="' + data[i].venueId + '">' + data[i].venueName + '</option>';
									}
								}
								cacheBind.venue = html;
								$('.J_floor_bind').find('select:first').html(html);
							} else {
								alert(data.msg || '加载数据出错');
							}
						}, 'json');
					},
					lock: true
				});
				$('body').on('change', '.J_floor_bind select', function(event) {
					var $t = $(this);
					var val = $t.val();
					var $floor = $('.J_floor');
					var $area = $('.J_area');
					if ($t.is('.J_venue')) {
						$area.html('<option value="">请选择</option>').prop('disabled', true);
						if (cacheBind.venues[val]) {
							$floor.html(cacheBind.venues[val]).prop('disabled', false);
							return;
						}
						$floor.prop('disabled', true);
						$.get('guang.shopMappingDetailFloor', {
							venueId: val
						}, function(data) {
							var html = '<option value="">请选择</option>';
							if (data.success === 'true') {
								data = data.data;
								for (var i = 0; i < data.length; i++) {
									if (data[i].floorId) {
										html += '<option value="' + data[i].floorId + '">' + data[i].floorName + '</option>';
									}
								}
								cacheBind.venues[val] = html;
								$floor.html(html).prop('disabled', false);
							} else {
								alert(data.msg || '加载数据出错');
							}
						}, 'json');
					}
					if ($t.is('.J_floor')) {
						if (cacheBind.floors[val]) {
							$area.html(cacheBind.floors[val]).prop('disabled', false);
							return;
						}
						$area.prop('disabled', true);
						$.get('guang.shopMappingDetailArea', {
							floorId: val
						}, function(data) {
							var html = '<option value="">请选择</option>';
							if (data.success === 'true') {
								data = data.data;
								for (var i = 0; i < data.length; i++) {
									if (data[i].shopAreaId) {
										html += '<option value="' + data[i].shopAreaId + '">' + data[i].shopAreaName + '</option>';
									}
								}
								cacheBind.floors[val] = html;
								$area.html(html).prop('disabled', false);
							} else {
								alert(data.msg || '加载数据出错');
							}
						}, 'json');
					}
				});
			});
		}());
	}
});