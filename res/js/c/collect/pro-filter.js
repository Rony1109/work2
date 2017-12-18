(function(window){
		var win=window,csc=win.csc;
		csc.collect=csc.collect||{};
		/*产品收起/展开 yq*/
		csc.collect.cateMore=function(id){
			var $con=$(id||"#fiter-sph"), he=$con.height();
			if(he>30){
				$con.append('<a href="javascript:" class="more">展开</a>');
				$(id||"#fiter-sph a.more").live("click",function(){
					var $this=$(this);
					if(!$(this).is(".less")){
						$("#filter-e").css({"height":"auto"});
						$this.addClass("less").text("收起");
					}else{
						$("#filter-e").css({"height":"30px"});
						$this.removeClass("less").text("展开");
					}
				});
			}
		}
		/*产品筛选状态 yq*/
	    csc.collect.fiter = function(){
			var href = window.location.href,sort = href.lastIndexOf("/"),str = href.substr(sort+1);
			var arrHref = $("#filter-e a"),first = $("#filter-e a").first();
			arrHref.each(function(index) {
                if($(this).attr("href").indexOf(str)!=-1){
					first.removeClass("cur");
					$(this).addClass("cur");
				} else if(index == 0) {
					first.addClass("cur");
				}
            });
		}
		/*产品全选/全不选 yq*/
	    csc.collect.allSelect=function(id,con){
			var $con = $(con||"#web-allSelect");
			$(id||'#ochecked label input[type="checkbox"],#ochecked0 label input[type="checkbox"]').bind("click",function(){
				flag=$(this)[0].checked;
				$con.find('td input[type="checkbox"]').each(function(index, element) {
                   $(this).attr("checked",flag);
				});
			});
		}
			/*产品全选/全不选/取消收藏 yq*/
	    csc.collect.portList=function(url,id,parent){
			/*产品全选/全不选 yq*/
			var $con = $(parent||"#pro-shop");
			$(id||'#ochecked a.canc-coll,#ochecked a.canc-coll').bind("click",function(){
				var arr=[];
					$("#web-allSelect tbody input:checkbox:checked").each(function(index,value){
						arr[index]=$(this).val();
					});
				if(arr.length){
					csc.confirm("确定要删除该收藏吗？",function(){
							$.post(url,{"gid":arr},function(data){
								if(data.status){
									location.reload();
								}else{
									csc.alert(data.msg);
								}
							},"jsonp");
					});
				}else{
					var msg="请选择您要取消的项";
					if(url.indexOf("delmarket")!=-1){
						msg="请选择要取消的市场";
					}else if(url.indexOf("delgoods")!=-1){
						msg="请选择要取消的商品";
					}else if(url.indexOf("delshop")!=-1){
						msg="请选择要取消的店铺";
					}
					csc.alert(msg);
				}
			});
			/*产品全选/全不选 yq*/
			var url =url||"url";
			$(id||'#web-allSelect tbody td a.sig-can').bind("click",function(){
				var id = $(this).attr("id");
				csc.confirm("确定要删除该收藏吗？",function(){
					$.get(url,{"gid":id},function(data){
						if(data.status){
							location.reload();
						}else{
							csc.alert(data.msg);
						}
					},"jsonp");
				});
			});
		}
})(window);

$(function(){
	 csc.collect.fiter();		
});
