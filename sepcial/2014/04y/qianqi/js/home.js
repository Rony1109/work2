$(function(){
	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<305){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});		   
})

function bmto(){
		artDialog({title:"快速报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">快速报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><form  id="myform" name="myform" action="http://ecmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=20&siteid=1" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i>企业名称</span><input type="text" name="info[name]" id="contact" value="" class="input-text"></li><li><span color="red"><i>*</i>所属行业</span><input type="text" name="info[hy]" id="tel" value="" class="input-text"></li><li><span color="red"><i>*</i>联系人</span><input type="text" name="info[tel]" id="mainProduct" value="" class="input-text"></li><li><span color="red"><i>*</i>联系电话</span><input type="text" name="info[pho]" id="company" value="" class="input-text"></li><li><span color="red"><i>*</i>联系邮箱</span><input type="text" name="info[email]" id="email" value="" class="input-text"></li></ul>'+
'<input type="submit" value=" 提交 " id="dosubmit" name="dosubmit">'+
'</form></div>',
		ok: function() {},
		cancel:false,
		fixed: true,
		id: 'Fm7',
		init:function(){
			$("form").submit( function () {
				var company=$("input[name='info[name]']").val(),
				contact=$("input[name='info[hy]']").val(),
				tel=$("input[name='info[tel]']").val(),
				mainProduct=$("input[name='info[pho]']").val(),
				email=$("input[name='info[email]']").val();
				if(company==""||contact==""||tel==""||mainProduct==""||email==""){
					return false;
				}else{
					return true;
				}
			} );
		},
		icon: 'question',
		okVal: false});		
}

function closet(){
	art.dialog({id:'Fm7'}).close();	
}
