$.get('js/20160620.json',function(data){
var html='';
	$.each(data.data.row,function(){
		var me=this;
		var thisname = me.memberName;
		var arr=[];
		
		var first = thisname.substr(0,1);
		var end = thisname.substr(thisname.length-1,1);
		arr.push(first);
		thisname = thisname.replace(/^.(.*).$/g,'$1');
		thisname=thisname.split("");
		$.each(thisname,function(){
		arr.push('*');
		});
		arr.push(end);
		arr=arr.join("");
			
		html+='<li><div class="em1">'+arr+'</div><a href="#" target="_blank"><div class="em2">'+me.productName+'</div></a><a href="javascript:;" title="3400"><div class="em2">'+me.enterprise+'</div></a><div class="em3">'+me.STATUS+'</div></li>';
		});
		
		$('.cgsc-jydt').find('ul').append(html);
	
	var This = $('.cgsc-jydt');
			var $img=$('.cgsc-loginfo').find('img');
				$img.each(function(){
					var $this=$(this);
					if (!$this.attr('src')||$this.data('original')) {
						// 图片动态载入
						$this.attr("src", $this.data("original"));	
					}
					$this.removeAttr("data-original");
				});
			var sHeight =This.find('li').height(),
				Timer;
			$(This).hover(function(){
				clearInterval(Timer);
			},function(){
				Timer=setInterval(function(){
					Tony(This);
				}, 2000)
			}).trigger("mouseleave");
			function Tony(obj){
				$(obj).find('ul').animate({
					marginTop : "-26px"
				},500,function(){
					$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
				});
			};	
		

	
	},'json');
	
			