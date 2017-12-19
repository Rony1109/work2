(function($){
	function FzMagazine(func,ary,dom){
		this.data=ary;
		if(func=="LeftComeIn"){
			return this["_"+func](ary,dom);
		}
		else if(func=="FadeIn"){
			return this["_"+func](ary,dom);
		}
		else if(func=="Scroll"){
			return this["_"+func](dom,ary)
		}
	}
	FzMagazine.prototype={
		_LeftComeIn:function(data,dom){
			var me=this,items=data;;
			var i=0,len=items.length;
			var timer=setInterval(function(){	

				if(i<len){
					i++;
					dom.eq(i-1).animate(items[i-1],500);
				}
				if(i==len){
					clearInterval(timer);
				}
			},100)
				
		},
		_FadeIn:function(data,dom){
			var len=dom.length;
			var i=0,len=dom.length;
			var timer=setInterval(function(){	
				if(i<len){
					i++;
					dom.eq(i-1).fadeIn(500);
				}
				if(i==len){
					clearInterval(timer)
				}
			},100)
		},
		_Scroll:function(dom,ary){
			var i=0,len=dom.length;
			return dom.each(function(i){
				$(this).hover(function(){
					$(this).addClass("zindex");
					$(this).siblings(ary).eq(i).show();
				},function(){
					$(this).siblings(ary).eq(i).hide();
					$(this).removeClass("zindex");
				})

			})

		}
	}
	$.fn.extend({
		Magazine:function(func,data){
			var a=$(this)
			return new FzMagazine(func,data,a);
		}
	})
})(jQuery)