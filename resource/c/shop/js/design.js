define(function(require, exports, module) {
	var $dialog=require('dialog');
	
	//关闭操作栏
	$('#toolbar .close').on('click',function(){
		$('#toolbar').hide();
		return false;
	});
	
	$('body').each(function() {
		$(document.body).find("div[data-name]").each(function(){
			 var attr = $(this).attr("data-name");
			 var positionInfo=$("#positionInfo").val();
			 positionInfo = eval('(' + positionInfo + ')');
			 //console.log(j);
			 var index = positionInfo[attr];
			 
			 $(this).attr("data-index", index);
			 
		});
    });
	
	//关闭保存提示
	$("#close_savetis").on('click', function(){
	   $("#tis_san").css("display","none");
	   $("#tis_txt").css("display","none");
	});
	
	//保存装修
	$('#toolbar .save').on('click',function(){
		var save_updown=$(this).attr('data-issave');
		var datas=location.search.match(/static=(\w+)&?/);
		var datas2=location.search.match(/skin=(\w+)&?/);
		var static={"static": !! datas && datas.length > 1 ? datas[1] : "", "skin": !! datas2 && datas2.length > 1 ? datas2[1] : "" };

		if(save_updown==1)
		{
			var listjson="{";
			$(document.body).find("div[data-name]").each(function(){
				listjson+="\""+$(this).attr("data-name")+"\""+":"+""+$(this).attr("data-index")+",";
			});
			listjson = listjson.substring(0,listjson.lastIndexOf(','));
			 listjson+= "}";
			var url="http://"+window.location.host+"/SavePosition";
			var urladd="http://"+window.location.host+"/addData";
			//var data=eval('(' + listjson + ')'); 
			listjson=$.parseJSON(listjson);

			listjson.static = static.static;
			listjson.skin = static.skin;
			$.ajax({
			  type:'POST',
			  url:url,
			  data:listjson,
			  dataType: 'json',
			  success: function(data){
			  },
			  error:function(data){
			  }
			});
          
			$.post(urladd,function(data){
				if(data){
				    $dialog.tip('保存成功！',2);
				}else{
					$dialog.tip('你还未装修店铺,请先装修！',2);
				}
			},'json');
			
			
		    //var _url=$(this).attr('href');
			//var loading=$dialog.loading('正在保存中，请稍后……');  
			 	
		}else{
			
			var _url=$(this).attr('href');
			var loading=$dialog.loading('正在保存中，请稍后……');
			$.post(_url,function(data){
				loading.close();
				if(data){
					if(data.status){
						$dialog.tip('保存成功！',2);
						parent.location.reload();
					}else{
						$dialog.tip('你还未装修店铺,请先装修！',2);
					}
				}else{
					$dialog.tip('你还未装修店铺,请先装修！',2);
				}
			},'json');
			
		}
		return false;
	});
	
	/*显示编辑遮罩层*/
    $('.wp-mdl').hover(function(){
		var $this=$(this);
		var $skinBox = $this.find('.skin-box').length > 0 ? $this.find('.skin-box') : $(this);
		var $skinBoxBd=$skinBox.find('.skin-box-bd');
		var $w=$skinBoxBd.outerWidth() || 1000;
		var $h = $skinBox.outerHeight() < $(this).height() ? $(this).height() : $skinBox.outerHeight();
		var $isedit=$this.attr('data-isedit');
		var $isup=$this.attr('data-isup');
		var $isdown=$this.attr('data-isdown');
		var $editHtml='<div class="wp-mdl-cz">'+'<div class="bg"></div>'+'<div class="acts">';
		
		// 第17套橱窗产品宽度
		if ( window.MODULEINDEX === "skin0017" && $(this)[0].id === "cctj" ) {
			$w = $(this).find(".cctj-bg1").outerWidth();
		}

		if($isedit=="1"){
		    $editHtml+=	'<a class="edit" href="">设置</a>'
		}
		if($isup=="1")
		{
			$editHtml+='<a href="javascript:;" class="wp-up"></a>'
		}
		if($isdown=="1")
		{
		    	$editHtml+='<a href="javascript:;" class="wp-down"></a>'
		}
		$editHtml+='</div>';
		$editHtml+='</div>';
		/*'<div class="wp-mdl-cz">'+
                        "<div class='bg'></div>"+
                        "<div class='acts'>"+"if($isedit==1){+
                        	'<a class="edit" href="">设置</a>'+
							}
							'<a class="up" href="">1</a>'+
							'<a class="down" href="">2</a>'+
                        '</div>'+
                    '</div>';*/
		if($isedit=="1"||$isup=="1"||$isdown=="1"){
			$('.wp-mdl').removeClass('wp-mdl-hover');
			$this.addClass('wp-mdl-hover');
			$this.prepend($editHtml);
			$this.find('.wp-mdl-cz').css({'height':$h,'margin-bottom':-$h});
			$this.find('.wp-mdl-cz .bg').css({'width':$w,'height':$h,'margin-left':-$w/2});
		}
	},function(){
		var $this=$(this);
		$this.addClass('wp-mdl-hover');
		if($this.find('.wp-mdl-cz')[0]){
			$this.find('.wp-mdl-cz').remove();
		}
	});
	// 上下移动right层
	$(".wp-colmain1").each(function(){
		var listlen1=$(".wp-colmain1").find(".wp-right").length;
		$(".wp-colmain1").find(".wp-right").eq(0).attr('data-isup','0');
		$(".wp-colmain1").find(".wp-right").eq($(".wp-colmain1").find(".wp-right").length-1).attr('data-isdown','0');

		$('.wp-right').on('click','.wp-mdl-cz .wp-up',function(){
		    var _divright=$(this).parents(".wp-right");
			var indexs=parseInt($(this).parents(".wp-right").attr("data-index"))-1;
			var indexp=parseInt($(this).parents(".wp-right").prev().attr("data-index"))+1;
			//parseInt($(".wp-colmain1").find(".wp-right").eq(0).attr("data-index"));
			if(indexs<=0)
			{
				alert("已经是最上层了！");
				return;
			}else
			{
				$(this).parents(".wp-right").prev().attr("data-index",indexp);
				$(this).parents(".wp-right").attr("data-index",indexs);
			}
			
            var _divrightindex=$(".wp-colmain1").find(".wp-right").index(_divright); 
			
			if(_divrightindex>0){
			   
			   $(".wp-colmain1").find(".wp-right").eq(_divrightindex-1).before(_divright); 
			}
			if(_divrightindex==1)
			{
			    for(var i=0;i<listlen1;i++)
				{
				   $(".wp-colmain1").find(".wp-right").eq(i).attr('data-isup','1');
				}	
				$(this).parents(".wp-right").attr('data-isup','0');
			}
			if(_divrightindex==listlen1-1)
			{
				$(".wp-colmain1").find(".wp-right").eq($(".wp-colmain1").find(".wp-right").length-1).attr('data-isdown','0');
				$(this).parents(".wp-right").attr('data-isdown','1'); 
			}
		});
		
		$('.wp-right').on('click','.wp-mdl-cz .wp-down',function(){
		    var _divright=$(this).parents(".wp-right");
			var _divrightindex=$(".wp-colmain1").find(".wp-right").index(_divright);
			var indexs=parseInt($(this).parents(".wp-right").attr("data-index"))+1;
			var indexp=parseInt($(this).parents(".wp-right").next().attr("data-index"))-1;
			$(this).parents(".wp-right").next().attr("data-index",indexp);
			$(this).parents(".wp-right").attr("data-index",indexs);
				
			if(_divrightindex<$(".wp-colmain1").find(".wp-right").length-1){
				$(".wp-colmain1").find(".wp-right").eq(_divrightindex+1).after(_divright);
			}
			
			if(_divrightindex==0)
			{
				for(var i=0;i<listlen1;i++)
				{
					$(".wp-colmain1").find(".wp-right").eq(i).attr('data-isup','1');
				}
				$(".wp-colmain1").find(".wp-right").eq(0).attr('data-isup','0');
			}
			
			if(_divrightindex==listlen1-2)
			{
               //$(this).css("display","none");
				$(this).parents(".wp-right").attr('data-isdown','0'); 
				$(".wp-colmain1").find(".wp-right").eq($(".wp-colmain1").find(".wp-right").length-2).attr('data-isdown','1');
			    
			}
		});
	});
	
	// 上下移动left层 
    $(".wp-colsub").each(function(){
        var listlen=$(".wp-colsub").find(".wp-left").length;
		$(".wp-colsub").find(".wp-left").eq(0).attr('data-isup','0');
		$(".wp-colsub").find(".wp-left").eq($(".wp-colsub").find(".wp-left").length-1).attr('data-isdown','0');
		// 点击上移按钮触发事件
			$('.wp-left').on('click','.wp-mdl-cz .wp-up',function(){
				var _div=$(this).parents(".wp-left");
				var indexs=parseInt($(this).parents(".wp-left").attr("data-index"))-1;
				var indexp=parseInt($(this).parents(".wp-left").prev().attr("data-index"))+1;
	          
				if(indexs<=$(".wp-colmain1").find(".wp-right").length)
				{
					alert("已经是最上层了！");
					return;
				}else
				{
					$(this).parents(".wp-left").prev().attr("data-index",indexp);
					$(this).parents(".wp-left").attr("data-index",indexs);
				}
				var _divindex=$(".wp-colsub").find(".wp-left").index(_div);
			    if(_divindex>0){
			       $(".wp-colsub").find(".wp-left").eq(_divindex-1).before(_div);
                }
			    if(_divindex==1)
			    {
				    for(var i=0;i<listlen;i++)
				    {
					   $(".wp-colsub").find(".wp-left").eq(i).attr('data-isup','1');
				    }
					
				   $(this).parents(".wp-left").attr('data-isup','0');
			    }
				if(_divindex==listlen-1)
				{
					$(".wp-colsub").find(".wp-left").eq($(".wp-colsub").find(".wp-left").length-1).attr('data-isdown','0');
					$(this).parents(".wp-left").attr('data-isdown','1'); 
				}
			
		});
		
		// 点击下移按钮触发事件

		$('.wp-left').on('click','.wp-mdl-cz .wp-down',function(){ 
		    var _div=$(this).parents(".wp-left");
			var indexs=parseInt($(this).parents(".wp-left").attr("data-index"))+1;
		    var indexp=parseInt($(this).parents(".wp-left").next().attr("data-index"))-1;
		    $(this).parents(".wp-left").next().attr("data-index",indexp);
		    $(this).parents(".wp-left").attr("data-index",indexs);
		
		    var _divindex=$(".wp-colsub").find(".wp-left").index(_div);
		    if(_divindex<$(".wp-colsub").find(".wp-left").length-1){
		       $(".wp-colsub").find(".wp-left").eq(_divindex+1).after(_div);
            }
		    if(_divindex==0)
		    {
			    for(var i=0;i<listlen;i++)
			    {
				    $(".wp-colsub").find(".wp-left").eq(i).attr('data-isup','1');
			    }
			    $(".wp-colsub").find(".wp-left").eq(0).attr('data-isup','0');
		    }
		    if(_divindex==listlen-2)
		    {
			    $(this).parents(".wp-left").attr('data-isdown','0'); 
			    $(".wp-colsub").find(".wp-left").eq($(".wp-colsub").find(".wp-left").length-2).attr('data-isdown','1');
		    }
	    });
    });
	
	/*上下移动leftdown层*/
    $(".wp-colmain2").each(function(){
		var listlen1=$(".wp-colmain2").find(".wp-right-down").length;
		
		$(".wp-colmain2").find(".wp-right-down").eq(0).attr('data-isup','0');
		$(".wp-colmain2").find(".wp-right-down").eq($(".wp-colmain2").find(".wp-right-down").length-1).attr('data-isdown','0');

		$('.wp-right-down').on('click','.wp-mdl-cz .wp-up',function(){
		    var _divright=$(this).parents(".wp-right-down");
			var indexs=parseInt($(this).parents(".wp-right-down").attr("data-index"))-1;
			var indexp=parseInt($(this).parents(".wp-right-down").prev().attr("data-index"))+1;
			//parseInt($(".wp-colmain1").find(".wp-right").eq(0).attr("data-index"));
			if(indexs<=0)
			{
				alert("已经是最上层了！");
				return;
			}else
			{
				$(this).parents(".wp-right-down").prev().attr("data-index",indexp);
				$(this).parents(".wp-right-down").attr("data-index",indexs);
			}
			
            var _divrightindex=$(".wp-colmain2").find(".wp-right-down").index(_divright); 
			
			if(_divrightindex>0){
			   
			   $(".wp-colmain2").find(".wp-right-down").eq(_divrightindex-1).before(_divright); 
			}
			if(_divrightindex==1)
			{
			    for(var i=0;i<listlen1;i++)
				{
				   $(".wp-colmain2").find(".wp-right-down").eq(i).attr('data-isup','1');
				}	
				$(this).parents(".wp-right-down").attr('data-isup','0');
			}
			if(_divrightindex==listlen1-1)
			{
				$(".wp-colmain2").find(".wp-right-down").eq($(".wp-colmain2").find(".wp-right-down").length-1).attr('data-isdown','0');
				$(this).parents(".wp-right-down").attr('data-isdown','1'); 
			}
		});
		
		$('.wp-right-down').on('click','.wp-mdl-cz .wp-down',function(){
		    var _divright=$(this).parents(".wp-right-down");
			var _divrightindex=$(".wp-colmain2").find(".wp-right-down").index(_divright);
			var indexs=parseInt($(this).parents(".wp-right-down").attr("data-index"))+1;
			var indexp=parseInt($(this).parents(".wp-right-down").next().attr("data-index"))-1;
			$(this).parents(".wp-right-down").next().attr("data-index",indexp);
			$(this).parents(".wp-right-down").attr("data-index",indexs);
				
			if(_divrightindex<$(".wp-colmain2").find(".wp-right-down").length-1){
				$(".wp-colmain2").find(".wp-right-down").eq(_divrightindex+1).after(_divright);
			}
			
			if(_divrightindex==0)
			{
				for(var i=0;i<listlen1;i++)
				{
					$(".wp-colmain2").find(".wp-right-down").eq(i).attr('data-isup','1');
				}
				$(".wp-colmain2").find(".wp-right-down").eq(0).attr('data-isup','0');
			}
			
			if(_divrightindex==listlen1-2)
			{
               //$(this).css("display","none");
				$(this).parents(".wp-right-down").attr('data-isdown','0'); 
				$(".wp-colmain2").find(".wp-right-down").eq($(".wp-colmain2").find(".wp-right-down").length-2).attr('data-isdown','1');
			    
			}
		});
	});


	/*点击设置*/
	$('.wp-mdl').on('click','.wp-mdl-cz .edit',function(){
		var $this=$(this),
		    $mdl=$this.parents('.wp-mdl'),
		    $url=$mdl.data('url'),//iframe弹窗的url
			$title=$mdl.data('title'),//弹窗的标题
			$w=parseInt($mdl.data('width')),//弹窗的宽度
			$h=parseInt($mdl.data('height'));//弹窗的高度
			
		//当有title弹出设置模块
		if($title){
			var dg=$dialog.open($url,{
				id:'mdlEdit',
				title:$title,
				width:$w,
				height:$h,
				fixed:true,
				lock:true,
				padding:0,
				opacity:.3,
				init:function(){
					//点击弹窗里的取消按钮关闭弹窗
					$('iframe').contents().find('.jsCnclBtn').bind('click',function(){
						dg.close();
					});
				}
			});
		}
		//当没有title时直接新页面调整对应的设置页面(比如橱窗推荐点击设置时直接调整至设置橱窗推荐页面)
		else{
			window.open($url);
		}
		return false;
	});
	
	// 开始新手引导
	$(function(){
        var bodh=$(document.body).height();
		$("#file_bod").css("height",bodh);
		
		var url="http://"+window.location.host+"/GetuserProperty";
		var datas=location.search.match(/static=(\w+)&?/);
		var datas2=location.search.match(/skin=(\w+)&?/);
		var static={"static": !! datas && datas.length > 1 ? datas[1] : "", "skin": !! datas2 && datas2.length > 1 ? datas2[1] : "" };
	    $.post(url,static,function(data){
			//alert(JSON.stringify(data))	;
			if(data.decoration=="Y")
			{
			if(data.status=="pt")
			{   
			    $("#desc_template0").show();      
			    $("#file_bod").show();
			    $("#desc_template0 ul" ).append('<li class="file_li_hover"></li><li></li><li></li><li></li><li></li><li></li>');
			    $("#desc_template0").find('.file_btn').on('click',function(){
					   $("#desc_template0").hide();
					   $("#save_template1").show();
			           $("#desc_template1").show();
					   $("#desc_template1 ul").append('<li></li><li class="file_li_hover"></li><li></li><li></li><li></li><li></li>');
					   
				 });
				 $("#desc_template1").find('.file_btn').on('click',function(){
					   $("#save_template1").hide();
					   $("#desc_template1").hide();
					   $("#save_template2").show();
			           $("#desc_template2").show();
					   $("#desc_template2 ul").append('<li></li><li></li><li class="file_li_hover"></li><li></li><li></li><li></li>'); 
				 });
				 $("#desc_template2").find('.file_btn').on('click',function(){
					   $("#save_template2").hide();
					   $("#desc_template2").hide();
					   $("#save_template3").show();
			           $("#desc_template3").show();
					   $("#desc_template3 ul").append('<li></li><li></li><li></li><li class="file_li_hover"></li><li></li><li></li>'); 
				 });
				 $("#desc_template3").find('.file_btn').on('click',function(){
					   $("#save_template3").hide();
					   $("#desc_template3").hide();
					   $("#save_template4").show();
					   
					   $("#save_template7").show();
			           $("#desc_template4").show();
					   $("#desc_template4 ul").append('<li></li><li></li><li></li><li ></li><li class="file_li_hover"></li><li></li>'); 
				 });
				 $("#desc_template4").find('.file_btn').on('click',function(){
					   $("#save_template4").hide();
					   $("#desc_template4").hide();
					   $("#save_template7").show();
					   $("#save_template5").show();
			           $("#desc_template5").show();
					   $("#desc_template5 ul").append('<li></li><li></li><li></li><li ></li><li></li><li class="file_li_hover"></li>'); 
				 });
				 $("#desc_template5").find('.file_btn').on('click',function(){
					   //$("#save_template5").hide();
					   $("#desc_template5").hide();
						var url="http://"+window.location.host+"/AjaxDecoration";
					   $.post(url, static, function(data){
						if(data){
							if(data.status){
								$("#file_bod").hide();
								
							}
						}else{
							$dialog.tip('系统异常！',2);
						}
					   },'json'); 
  
					  
				 });
				 
			 //分界线
			}else if(data.status=="cst"||data.status=="vip")
			{
				  $("#save_template1").show();
			      $("#desc_template1").show();
				  $("#file_bod").show();
				 // $("#desc_template1 ul").remove();
				  $("#desc_template1 ul" ).append('<li class="file_li_hover"></li><li></li><li></li><li></li><li></li>');
				  
				  
				  $("#desc_template1").find('.file_btn').on('click',function(){
					  
					   $("#save_template1").hide();
					   $("#desc_template1").hide();
					   $("#save_template2").show();
			           $("#desc_template2").show(); 
					  
					   $("#desc_template2 ul" ).append('<li></li><li class="file_li_hover"></li><li></li><li></li><li></li>');
					   
				  });
				  $("#desc_template2").find('.file_btn').on('click',function(){
					  
					   $("#save_template2").hide();
					   $("#desc_template2").hide();
					   $("#save_template3").show();
			           $("#desc_template3").show(); 
					  
					   $("#desc_template3 ul" ).append('<li></li><li></li><li class="file_li_hover"></li><li></li><li></li>');
					   
				  });
				  $("#desc_template3").find('.file_btn').on('click',function(){
					  
					   $("#save_template3").hide();
					   $("#desc_template3").hide();
					   $("#save_template4").show();
					   $("#save_template7").show();
			           $("#desc_template4").show(); 
					   $("#desc_template4 ul" ).append('<li></li><li></li><li></li><li class="file_li_hover"></li><li></li>');
					   
				  });
				  
				  $("#desc_template4").find('.file_btn').on('click',function(){
					  
					   $("#save_template4").hide();
					   $("#save_template7").hide();
					   $("#desc_template4").hide();
					   $("#save_template5").show();
			           $("#desc_template5").show();
					   $("#desc_template5 ul" ).append('<li></li><li></li><li></li><li></li><li class="file_li_hover"></li>');
					   
				  });
				   $("#desc_template5").find('.file_btn').on('click',function(){
					  
					   $("#save_template5").hide();
					   $("#desc_template5").hide();
					   var url="http://"+window.location.host+"/AjaxDecoration";
					   $.post(url, static, function(data){
						if(data){
							if(data.status){
								$("#file_bod").hide();
							}
						}else{
							$dialog.tip('系统异常！',2);
						}
					   },'json'); 
  
				  });
 
		}else if(data.status=="old")
		{
		     $("#save_template1").show();
			 $("#desc_template1").show();
		     $("#file_bod").show();
			 $("#desc_template1 ul" ).append('<li class="file_li_hover"></li><li></li><li></li><li></li>');
			 $("#desc_template1").find('.file_btn').on('click',function(){
				   $("#save_template1").hide();
				   $("#desc_template1").hide();
				   $("#save_template2").show();
				   $("#desc_template2").show(); 
				   $("#desc_template2 ul" ).append('<li></li><li class="file_li_hover"></li><li></li><li></li>');
				   
		    });
			$("#desc_template2").find('.file_btn').on('click',function(){  
			   $("#save_template2").hide();
			   $("#desc_template2").hide();
			 
			   $("#save_template3").show();
			   $("#desc_template3").show(); 
			 
			   $("#desc_template3 ul" ).append('<li></li><li></li><li class="file_li_hover"></li><li></li>');	   
		     });
			 
			$("#desc_template3").find('.file_btn').on('click',function(){	  
			   $("#save_template3").hide();
			   $("#desc_template3").hide();
			   $("#save_template4").show();
			   $("#desc_template4").show(); 
			   $("#desc_template4 ul" ).append('<li></li><li></li><li></li><li class="file_li_hover"></li>');	   
			});
			$("#desc_template4").find('.file_btn').on('click',function(){
					  
					   $("#save_template4").hide();
					   $("#desc_template4").hide();
					   var url="http://"+window.location.host+"/AjaxDecoration";
					   $.post(url, static, function(data){
						if(data){
							if(data.status){
								$("#file_bod").hide();
								
							}
						}else{
							$dialog.tip('系统异常！',2);
						}
					   },'json'); 
  
				  });
				  
			
		}else if(data.status==false)
		{
			
			return;
		}
	  }else
	  {
		  $("#tis_san").css("display","block");
	      $("#tis_txt").css("display","block");
		  return;
	  }
	    },'jsonp');
		// close
		$( ".intro_close" ).click(function () {
			$(this).parent().hide();
			var id = $(this).parent().attr("id");
			id = id.replace("desc", "save");
			$( "#" + id ).hide();
			$( "#file_bod" ).hide();
		});
	});
});