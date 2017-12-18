 $(function(){
	 seajs.use(csc.url("res", "/f=css/c/membercenter/mem-tool.css"));
	 $("#mem-ry,#entr-ment").click(function(){
		artDialog({id: "memtool",
			content: $("#mem-toolct")[0],
			fixed: true,
			title: "工具管理",
			width: 600,
			height: 200,
			padding: "5px 19px 25px 15px",
			close: function() {
				$.get(location.href,function(data){
					$("div.tools>ul").html($("div.tools>ul",data).html());
					$("li.apply div.inner>ul").html($("li.apply div.inner>ul",data).html());
					if($("#usertool").find("li").length<=0){
						$("div.mem-toolct").html($("div.mem-toolct",data).html());
					}
					
				});
			},
			lock:true
		});
	});
	$("#mem-toolct").delegate("span>input.l","click",function(){
		var $t= $(this).prop("disabled", true), li = $t.parents("li"),prev=li.prev();
		 $.ajax({
			type: "post",
 		 	url: "/membercenter/tooladdordelormove",
 		 	async: false,
			 data:{"id":$t.parent().prev().children("a").attr("id"),"status":"move","dir":-1},
			success: function(data){
				if(data.status){
					li.removeClass("hover");
					prev.before(li);
				}else{
					csc.alert(data.msg);
				}
				$t.prop("disabled", false);
			},
			dataType: "jsonp"
 		})
	}).delegate("span>input.r","click",function(){
		var $t= $(this).prop("disabled", true),li = $t.parents("li"),next=li.next();
		$.post("/membercenter/tooladdordelormove",{"id":$t.parent().prev().children("a").attr("id"),"status":"move","dir":1},function(data){
			if(data.status){
				li.removeClass("hover");
				next.after(li);
			}else{
				csc.alert(data.msg);	
			}	
			$t.prop("disabled", false);		
		},"jsonp");
	}).delegate("span>a.del","click",function(){
		var li = $(this).parents("li"),$t=$(this);
		/*$.post("/membercenter/tooladdordelormove",{"id":$t.attr("id"),"status":"del"},function(data){
			if(data.status){
				li.removeClass("hover");
				$("#unused").append(li);
				$t.attr("class","add");
				li.find("span:last").removeClass("title");
				//csc.alert(data.msg);
			}else{
				csc.alert(data.msg);
			}
			
		},"jsonp");*/
		 $.ajax({
			type: "post",
 		 	url: "/membercenter/tooladdordelormove",
 		 	async: false,
			 data:{"id":$t.attr("id"),"status":"del"},
			success: function(data){
				if(data.status){
					li.removeClass("hover");
					$("#unused").append(li);
					$t.attr("class","add");
					li.find("span:last").removeClass("title");
					//csc.alert(data.msg);
				}else{
					csc.alert(data.msg);
				}
			},
			dataType: "jsonp"
 		});
	}).delegate("span>a.add","click",function(){
		var li = $(this).parents("li"),$t=$(this);
		/*$.post("/membercenter/tooladdordelormove",{"id":$t.attr("id"),"status":"add"},function(data){
			if(data.status){
				li.removeClass("hover");
				$("#usertool").append(li);
				$t.attr("class","del");
				li.find("span:last").attr("class","title");
			}else{
				csc.alert(data.msg);
			}
		},"jsonp");*/
		 $.ajax({
			type: "post",
 		 	url: "/membercenter/tooladdordelormove",
 		 	async: false,
			 data:{"id":$t.attr("id"),"status":"add"},
			success: function(data){
				if(data.status){
					li.removeClass("hover");
					$("#usertool").append(li);
					$t.attr("class","del");
					li.find("span:last").attr("class","title");
				}else{
					csc.alert(data.msg);
				}
			},
			dataType: "jsonp"
 		});
	});
	
	seajs.use(csc.url("res", "/f=js/m/hover"),function(){
		csc.hover(".mem-toolct li");
	})
	
});