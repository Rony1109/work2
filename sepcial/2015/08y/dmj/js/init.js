/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({
    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
		'comment': 'm/comment/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js'
    },
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	require('http://res.csc86.com/f=js/m/config.js');
	var dialog=require('dialog');


var cscs={};
cscs.dialogs=function(circleId){
	  dialog({
		   id: circleId,
		   title:'',
		   fixed: true,
		   lock:true,
		   background:"#000",
		   opacity:"0.3",
		   content:$("#"+circleId).html(),
		   init:function(){
			   var that=this;
		       $('#dmj-rz-subbtn').on('click',function(){
				    var $this = $(this);
				   if($("#dmj-qymc").val()=="")
				  {
				      alert("企业名称不能为空！");
				      return;
				  }else if($("#dmj-cgcp").val()==""){
					  alert("采购产品不能为空！");
				      return;
				  }else if($("#dmj-name").val()==""){
					  alert("姓名不能为空！");
				      return;
				  }else if($("#dmj-tel").val()==""){
					  alert("电话不能为空！");
				      return;
				  }else if($("#dmj-Email").val()==""){
					  alert("邮箱不能为空！");
				      return;
				  }else if($("#dmj-other").val()==""){
					  alert("其他不能为空！");
				      return;
				  }else
				  {
					  var datas=$this.parents("form.dmj-rzlist").serializeArray();
					  $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				          if(data.status==true){
						      that.close();
							  cscs.dialogs('dmj-subxinxi-list');
					      }else{
							  alert('提交失败！')
						  }
					  }, 'jsonp');
				  }
				});
				
				$('#gys-rz-subbtn').on('click',function(){
					var $this = $(this);
					if($("#gys-qymc").val()=="")
					{
						alert("企业名称不能为空！");
						return;
					}else if($("#gys-zycp").val()==""){
						alert("主营产品不能为空！");
						return;
					}else if($("#gys-name").val()==""){
					    alert("姓名不能为空！");
						return;
					}else if($("#gys-tel").val()==""){
						alert("电话不能为空！");
						return;
					}else if($("#gys-Email").val()==""){
					    alert("邮箱不能为空！");
						return;
					}else if($("#gys-other").val()==""){
						alert("其他不能为空！");
						return;
					}else
					{
					  var datas=$this.parents("form.gys-rzlist").serializeArray();
					  $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				          if(data.status==true){
						      that.close();
							  cscs.dialogs('dmj-subxinxi-list');
					      }else{
							  alert('提交失败！')
						  }
					  }, 'jsonp'); 
					
					}
				});
				
				$('#gys-xinxi-subbtn').on('click',function(){
				    var $this = $(this);
				   if($("#cg-qymc").val()=="")
				  {
				      alert("企业名称不能为空！");
				      return;
				  }else if($("#cg-name").val()==""){
					  alert("联系人不能为空！");
				      return;
				  }else if($("#cg-tel").val()==""){
					  alert("电话不能为空！");
				      return;
				  }else if($("#cg-QQ").val()==""){
					  alert("QQ不能为空！");
				      return;
				  }else if($("#cg-Email").val()==""){
					  alert("邮箱不能为空！");
				      return;
				  }else if($("#cg-other").val()==""){
					  alert("其他不能为空！");
				      return;
				  }else
				  {
					  var datas=$this.parents("form.cg-xinxi-list").serializeArray();
					  $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				          if(data.status==true){
						      that.close();
							  cscs.dialogs('dmj-subxinxi-list');
					      }else{
							  alert('提交失败！')
						  }
					  }, 'jsonp');
				  }
				});

		   }
      });
}

/*
$('.baojia-btn-red').on('click',function(){
	cscs.dialogs('dmj-gys-list');
});
*/
<!-- 大买家入驻的JS -->
$('#dmj-rz-btn').on('click',function(){
	   $.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
		   //alert(JSON.stringify(data));
		   if(data.status != true) {
			   seajs.use(csc.url("res", "/js/m/sign"), function() {
					csc.checkSign("location.reload");
				});
		   }
		   if(data.status==true)
		   {
			   cscs.dialogs('dmj-rzlstd-list');
		   }
	   },"jsonp");
});

<!-- 供应商入驻的JS -->
$('#gys-rz-btn').on('click',function(){
	$.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
	   //alert(JSON.stringify(data));
	   if(data.status != true) {
		   seajs.use(csc.url("res", "/js/m/sign"), function() {
				csc.checkSign("location.reload");
			});
	   }
	   if(data.status==true)
	   {
		   cscs.dialogs('dmj-gysrz-list');
	   }
   },"jsonp");
		
});

$('#new-dmj-rz-btn').on('click',function(){
	$.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
		  
	   if(data.status != true) {
		   seajs.use(csc.url("res", "/js/m/sign"), function() {
				csc.checkSign("location.reload");
			});
	   }
	   if(data.status==true)
	   {
		   cscs.dialogs('dmj-rzlstd-list');
	   }
   },"jsonp");
    
});

/*悬浮客服*/
$(".dmj-suspension").each(function() {
    $(".suspension-dh").hide();
	
	$(".suspension-kf").mousemove(function(){
        $(".suspension-dh").show();
    });
	
	$(".suspension-kf").mouseout(function(){
		$(".suspension-dh").hide();
	});
});

$(".dmj-cg-tab").each(function() {
	var reg = /id=(\d+)/i;
	var r= window.location.search.match(reg);
	var txtname=parseInt(r[1]);
	$.ajax({  
        type:"GET",  
        //json文件位置  
        url:"txt/"+txtname+".txt",  
        //返回数据格式为json  
        dataType: "json",
        //请求成功完成后要执行的方法  
        success: function(data){
		
		   $("#dmj-cg-start").css("background-image","url(image/"+data.backimg+")");
		   $("#cg-lst-left-img").attr("src",data.img);
		   var txtname1=data.name;
		   
		   $("#cg-list-til").html(data.title);
		   $("#cg-list-til-p").html(data.conten);
		  $.get("http://inquiry.csc86.com/dmj-new?account="+txtname1,function(obj){
	      if(obj.status=="success")
		  {
			  var htm=""
			  var len=obj.data.length;
			  for(var i=0;i<len;i++)
			  {
			      htm+='<div class="tab-lb">';
			      htm+='<div class="li-icon">';
			      htm+='<a href="javascript:;">'+obj.data[i][0].month+'月</a><br>';
                  htm+='<a href="javascript:;">20'+obj.data[i][0].year+'</a></div>';
			      htm+='<ul>';
			      htm+='<li class="li-head"><span class="span-46">采购信息</span><span class="span-15">截止时间</span><span class="span-16">当前状态</span><span class="span-16">联系采购商</span></li>';
				
			      for(var j=0;j<obj.data[i].length;j++)
			      {
				     if(j==0 &&i==0)
				 {
			     
					 htm+='<li>'; 
					 htm+='<div class="dmj-img-shenz"><em class="dmj-img-shenem"><a href="javascript:;"><img src="image/dmj-img-jian.jpg" style="cursor:pointer;"/></a></em></div>';
					 htm+='<div class="dmj-bod-stretch-none">';
					 htm+='<span class="span-46">'+obj.data[i][j].inquiryName+'&nbsp;&nbsp;'+obj.data[i][j].purchaseNumber+obj.data[i][j].purchaseUnits+'</span>';
					 htm+='<span class="span-15">'+obj.data[i][j].addTime+'</span>';
					 htm+='<span class="span-16"><p>'+obj.data[i][j].state+'</p></span>';
					 htm+='</div>';
					 htm+='<div class="dmj-bod-stretch-block">';
					 htm+='<span class="span-46">'+obj.data[i][j].inquiryName+'&nbsp;&nbsp;'+obj.data[i][j].purchaseNumber+obj.data[i][j].purchaseUnits+'</span>';
					 htm+='<span class="span-15">'+obj.data[i][j].addTime+'</span>';
					 htm+='<span class="span-16"><p>'+obj.data[i][j].state+'</p></span>';
					 htm+='<span class="span-16"><a href="javaScript:;" class="baojia-btn-red" ><em class="em_baojia">立即报价</em></a></span>';
					 htm+=' <div style=" margin:0px 0px 0px 50px; line-height:30px;">';
					 htm+='<p style="font-size:12px; font-weight:bold;  line-height:40px; padding:0px;">供应商要求</p>';
					 htm+='<span style="width:500px; display:block; line-height:20px;padding-bottom:10px;">'+obj.data[i][j].content+'</span>';
					 htm+='</div></div></li>';
				 }else
				 {
			         htm+='<li>'; 
					 htm+='<div class="dmj-img-shenz"><em class="dmj-img-shenem"><a href="javascript:;"><img src="image/dmj-img-jia.jpg" style="cursor:pointer;"/></a></em></div>';
					 htm+='<div class="dmj-bod-stretch-none" style="width:100%; display:block;">';
					 htm+='<span class="span-46">'+obj.data[i][j].inquiryName+'&nbsp;&nbsp;'+obj.data[i][j].purchaseNumber+obj.data[i][j].purchaseUnits+'</span>';
					 htm+='<span class="span-15">'+obj.data[i][j].addTime+'</span>';
					 htm+='<span class="span-16"><p>'+obj.data[i][j].state+'</p></span>';
					 htm+='</div>';
					 htm+='<div class="dmj-bod-stretch-block" style=" display:none;">';
					 htm+='<span class="span-46">'+obj.data[i][j].inquiryName+'&nbsp;&nbsp;'+obj.data[i][j].purchaseNumber+obj.data[i][j].purchaseUnits+'</span>';
					 htm+='<span class="span-15">'+obj.data[i][j].addTime+'</span>';
					 htm+='<span class="span-16"><p>'+obj.data[i][j].state+'</p></span>';
					 htm+='<span class="span-16"><a href="javaScript:;" class="baojia-btn-red"><em class="em_baojia">立即报价</em></a></span>';
					 htm+=' <div style=" margin:0px 0px 0px 50px; line-height:30px;">';
					 htm+='<p style="font-size:12px; font-weight:bold;  line-height:40px; padding:0px;">供应商要求</p>';
					 htm+='<span style="width:500px; display:block; line-height:20px;padding-bottom:10px;">'+obj.data[i][j].content+'</span>';
					 htm+='</div></div></li>';
				 }
			      }
                  htm+='</ul></div></div>';
			   }
			    $(".dmj-cg-tab").append(htm);
			
			    var len=$(".dmj-img-shenz").length;    
			    $(".dmj-img-shenz").delegate('.dmj-img-shenem','click',function(){
				if($(this).find('a').find('img').attr('src')=="image/dmj-img-jian.jpg")
				{
					 return;
				}else
				{
					for(var i=0;i<len;i++)
					{
						$(".dmj-img-shenz a img").eq(i).attr("src","image/dmj-img-jia.jpg");    
						$(".dmj-bod-stretch-none").eq(i).css('display','block');
						$(".dmj-bod-stretch-block").eq(i).slideUp();      
					}
					$(this).parent().next('.dmj-bod-stretch-none').hide();
					$(this).parent().next().next('.dmj-bod-stretch-block').slideDown();
					$(this).find('a').find('img').attr("src","image/dmj-img-jian.jpg");
				}
			}); 
			
			  $('.baojia-btn-red').delegate('.em_baojia','click',function(){
				
				
				$.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
					  
				   if(data.status != true) {
					   seajs.use(csc.url("res", "/js/m/sign"), function() {
							csc.checkSign("location.reload");
						});
				   }
				   if(data.status==true)
				   {
					   cscs.dialogs('dmj-xinxi-list');
				   }
			   },"jsonp");
				
			});

		  }else
		  {
		      alert("对不起~采购信息返回失败！");
		  }
	
	},'jsonp');
		}
	});

});



exports.module=cscs;
 });
