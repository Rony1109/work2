$(function(){
	//旺铺友情链接删除
	$(".links-list").delegate("li a.del","click",function(event){
		event.preventDefault();
		var
				delId = $(this).attr("id"),
				msg = '确认删除吗？';
			artDialog({
					content:msg,
					fixed: true,
					title:"删除友情链接",
					ok:function(){
						$.get("/shop/link",{"d":"del","delId":delId},function(data){
							if(data.status){
								location.href = csc.url("member","/shop/link");
							}
						},"jsonp");
					},
					cancel:true,
					lock:true
			});
	});
	
	//旺铺友情链接添加
	$('.add-link-submit').on('click',function(){
		var 
		$t=$(this),
		tVal=$t.val(),
		tName = $t.attr('name'),
		$name = $('#linkName'),
		$address = $('#linkAddress'),
		linkName = $name.attr('name'),
		linkNameVal = $name.val(),
		linkAddress = $address.attr('name'),
		linkAddressVal = $address.val();
		if($.trim(linkName)!==''&&$.trim(linkAddressVal)!==''&&$address.next().find('.g-f-success').is(':visible')){
			$.post('/shop/link',{'tName':tName,'status':tVal,'linkName':linkName,'linkNameVal':linkNameVal,'linkAddress':linkAddress,'linkAddressVal':linkAddressVal},function(data){
				if(data.status){
					location.reload();
				}else{
					csc.alert(data.msg);
				}
			},'jsonp');
		}
	});
});
