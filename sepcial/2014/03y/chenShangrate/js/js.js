var a_stop = {};
$(function(){ 

	 $.ajax({url:csc.url('api','/oldcj/getwinner.html'),data:{channelid:1,event:8},success:function(data){
    if(data['status']){
      function fData(d){
        d = new Date(d*1000);
        return (d.getMonth()+1)+'月'+d.getDate()+'日';
      }
      var html = '<tr><td colspan="3"><div class="bopos"><table width="100%" border="0" cellspacing="0" cellpadding="0">';
      $.each(data['data'],function(i,v){
        html += '<tr><td>'+v['winners']+'</td><td title="'+jqpa[v['prizeid']][1]+'"><div>'+jqpa[v['prizeid']][0]+'等奖：'+jqpa[v['prizeid']][1]+'</div></td><td>'+fData(v['wintime'])+'</td></tr>';
      });
      $('.de_jname').find('tbody').html(html+'</table></div></td></tr>');
	$('#de_jame').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$(this).find(".bopos");
			textTimer = setInterval(function(){
				 AutoScroll($t)
			} ,2000);
	 }).trigger("mouseleave");	
    }
  }, 
   async: false,dataType:'jsonp'});

	var $obj= $("#src_view"),ln=$obj.find("ul").children("li").length;	
    $("#out_view").on("click","div.l",function(){
       scrollRight($obj);
    }).on("click","div.r",function() {
       scrollLeft($obj);
     });
	 
	 //点击向左
	function scrollLeft(obj){
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.animate({ "left" : -lineWidth +"px" }, 400 , function(){
				$self.css({left:0}).find("li:first").appendTo($self);
			})
		}
	}
	 //点击向右
	function scrollRight(obj) {
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.find("li:last").prependTo($self);
			$self.css({ left: -lineWidth }).animate({ "left": 0 + "px" }, 400);
		}   
	}
	
	$('#out_view').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$("#src_view");
			textTimer = setInterval(function(){
				 scrollLeft($t);
			} ,2000);
	 }).trigger("mouseleave");
	 
	
	 $('#a_link a').hover(function(){
		  clearInterval(a_stop[$t]);
		 },function(){
			var $t = $(this), l = $t.position().left;;
			a_stop[$t] = setInterval(function(){
				 jump($t,l);
			} ,5000);
	 }).trigger("mouseleave");
	 
	 function jump($t,l){
		$t.animate({left:l+20},2000,function(){
			//$t.css({top:t,left:l});
			$t.animate({left:l},2000,function(){
				//$t.css({top:t,left:l});
		 	});
		 });
	 }
	 //新闻滚动
	var textTimer,AutoScroll = function (obj){
		    var self=obj.find("table:first");
			self.animate({
					marginTop:"-25px"
			},500,function(){
				self.css({marginTop:"0px"}).find("li:first").appendTo(self);
			});
	}

	 
	// $('#de_jame').trigger("mouseleave")
})