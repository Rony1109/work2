function ResetF(objTb){
		var $objTb = $(objTb).find("tbody");
		$objTb.find("tr.first,tr.last").removeClass("first last");
		$objTb.children("tr.parent:first").addClass("first").find("a.up").removeAttr("title");
		$objTb.children("tr.parent:last").addClass("last").find("a.down").removeAttr("title");
		$objTb.each(function (){
			var $t = $(this);
			$t.find("tr.subCon:first").addClass("first").find("a.up").removeAttr("title");
			$t.find("tr.subCon:last").addClass("last").find("a.down").removeAttr("title");
		});
}
$(function(){
	$("#p1").wrap("<div class='wrap'></div>");
	$('.addparentbtn').bind('click',function(){
		var msg='<div style="padding:0 125px;"><span>分类名称 &nbsp;</span><input id="catetxt1" type="text" /><div class="g-f-msg-box g-d-b"><p id="w-error" class="g-f-error">分类名称不能为空</p></div></div>';
		artDialog({
				content:msg,
				fixed: true,
				title:"添加分类",
				ok:function(){
					var val =$.trim($("#catetxt1").val());
					if(!val){
						$("#w-error").show();
						return false;
					}
					$.get("/shop/defineCate",{"val":val},function(data){
							location.reload();
					},"jsonp");
				ResetF('.customClassify');
				},
				cancel:true,
				lock:true
		});
	});

	$('.addsubbtn').bind('click',function(){
		var msg='<div style="padding:0 125px;"><span>子分类名称 &nbsp;</span><input id="catetxt2" type="text" /><div class="g-f-msg-box g-d-b"><p id="w-error" class="g-f-error">分类名称不能为空</p></div></div>',
		 	  $parentTr = $(this).parent('td').parent('tr');
		var cateId = $(this).attr('Id');
		artDialog({
				content:msg,
				fixed: true,
				title:"添加子分类",
				ok:function(){
					var val =$.trim($("#catetxt2").val());
					if(!val){
						$("#w-error").show();
						return false;
					}
					$.get("/shop/defineCate",{"val":val,"cateId":cateId},function(data){
						location.reload();
					},"jsonp");
					$parentTr.addClass('parent');
					ResetF('.customClassify');
				},
				cancel:true,
				lock:true
		});
	});
	$('.customClassify .branch').click(function(){
		var $Td = $(this).parent('td'),
			$Tr = $Td.parent('tr'),
			$Tbody =$Tr.parent('tbody'),
			$sub =$Tbody.children('.subCon');
		if($sub.length > 0){
			if($sub.is(':hidden')){
				$Tr.removeClass('haschild');
				$sub.show();
			}else{
				$Tr.addClass('haschild');
				$sub.hide();
			}
		}
	});

	$('.parent .order').click(function(event){
		event.preventDefault();
		var $t=$(this),
			   $Td = $t.parent('td'),
			   $Tr = $Td.parent('tr'),
			   $Tbody =$Tr.parent('tbody'),
			    id = $Tbody.attr('id'),
				index = $('.customClassify tbody').index($Tbody);
		if($t.hasClass('up')){
			var oId = $Tbody.prev('tbody').attr('id'),
				   tpye = 'up',
				   oIndex = index-1;
			$Tbody.insertBefore($Tbody.prev('tbody'));
			$.get("/shop/defineCate",{"id":id,"oId":oId,"index":index,"oIndex":oIndex,"tpye":tpye},function(data){
		},"jsonp");
		}else if($t.hasClass('down')){
			var oId = $Tbody.next('tbody').attr('id'),
				   tpye = 'down',
				   oIndex = index+1;
			$Tbody.insertAfter($Tbody.next('tbody'));
			$.get("/shop/defineCate",{"id":id,"oId":oId,"index":index,"oIndex":oIndex,"tpye":tpye},function(data){
		},"jsonp");
			}
		ResetF('.customClassify');
	});

	$('.subCon .order').click(function(event){
		event.preventDefault();
		var $t=$(this),
			$Td = $t.parent('td'),
			$Tr = $Td.parent('tr'),
			$Tbody =$Tr.parent('tbody'),
			id = $Tr.attr('id'),
			index = $Tbody.find('.subCon').index($Tr);
		if($t.hasClass('up')){
			var oId=$Tr.prev('.subCon').attr('id'),
				   tpye = 'up',
				   oIndex = index-1;
			$Tr.insertBefore($Tr.prev('.subCon'));
			$.get("/shop/defineCate",{"id":id,"oId":oId,"index":index,"oIndex":oIndex,"type":tpye},function(data){
		},"jsonp");
		}else if($t.hasClass('down')){
			var oId=$Tr.next('.subCon').attr('id'),
			tpye = 'down',
			 oIndex = index+1;
			$.get("/shop/defineCate",{"id":id,"oId":oId,"index":index,"oIndex":oIndex,"type":tpye},function(data){
		},"jsonp");
			$Tr.insertAfter($Tr.next('.subCon'));
			}
		ResetF('.customClassify');
	});

	$('.customClassify .del').click(function(){
		var delId =$(this).attr('id'),
			  del = 'del',
			  msg = '删除该分类之后，该分类下的所有产品会被移动到未分类下，确认删除吗？';
		artDialog({
				content:msg,
				fixed: true,
				title:"删除分类",
				width:330,
				ok:function(){
					$.get("/shop/defineCate",{"delId":delId,"del":del},function(data){
						location.reload();
					},"jsonp");
				},
				cancel:true,
				lock:true
		});
	});
	
	//修改自定义分类
	$('#defineCate').find('input[type=submit]').removeAttr("disabled");
	$('#defineCate').submit(function(){
		var $form=$(this),
			$smtBtn=$form.find('input[type=submit]'),
			arry=[];
		$('.customClassify tbody input[type=text]').each(function(){
			var _this=$(this),
				_var=$.trim(_this.val());
			if(!_var){
				arry.push(1);
			}
        });
		if(arry.length>0){
			csc.alert('分类名称不可以为空');
			return false;
		}
		$smtBtn.val('提交中...').attr('disabled',"disabled").css('cursor','default');
		$.post('//member.csc86.com/shop/defineCate.html',$form.serializeArray(),function(data){
			if(data.status=="1"){
				csc.success('保存成功',2);
				$smtBtn.val('保存分类').removeAttr("disabled").css('cursor','pointer');
			}else{
				data.error==""?csc.alert('提交失败，请稍候再试！'):csc.alert(data.error);
				$smtBtn.val('保存分类').removeAttr("disabled").css('cursor','pointer');
				return false;
			}
		});
		return false;
	});
});