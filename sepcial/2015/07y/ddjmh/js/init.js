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
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js',
        'comment': 'm/comment/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	var dialog=require('dialog');
    var comment = require('comment');
    /*
     * 以下为专题js代码
     * ......
     */
	 
	 <!-- 聚合页面鼠标移入移出 -->
	$(".pyst-gys-cgs").each(function() {
        $(".gys-list").mouseover(function(){
		    $(".gysinput").css("display","block");
		});
		$(".gys-list").mouseout(function(){
		    $(".gysinput").css("display","none");
		});
		$(".cgs-list").mouseover(function(){
		     $(".cgsinput").css("display","block");
		});
		$(".cgs-list").mouseout(function(){
		     $(".cgsinput").css("display","none");
		});
		$(".suspension-dh").hide();
		$(".suspension-kf").mousemove(function(){
			$(".suspension-dh").show();
		});
		
		$(".suspension-kf").mouseout(function(){
			$(".suspension-dh").hide();
		});
		
		$("#gys_btn_click").on('click',function(){
			var $this = $(this);
			var tel =/^1\d{10}$/;
			if($("#gys_name").val()==""||$("#gys_name").val()=="请输入您的姓名")
			{
			    alert("姓名不能为空！");
				return;	
		    }else if($("#gys_tel").val()==""||$("#gys_tel").val()=="请输入您的手机号")
			{
			    alert("电话不能为空！");
				return;
			}else if(!tel.test($("#gys_tel").val()))
			{
			   alert("请输入正确的电话号码");
			   return;
			}else
			{
			    var datas=$this.parents("form.gys-rzlist").serializeArray();
				$.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				    if(data.status==true){
						 $("#gys_name").val("");
						 $("#gys_tel").val("");
						 //alert('加入成功！');
						 cscs.dialogs('jhym-tijiao-list');
				    }else{
					    alert('提交失败！')
				    }
				}, 'jsonp'); 
			}
		});
		
		$("#cgs_btn_click").on('click',function(){
			var $this = $(this);
			var tel =/^1\d{10}$/;
			if($("#cgs_name").val()==""||$("#cgs_name").val()=="请输入您的姓名")
			{
			    alert("姓名不能为空！");
				return;	
		    }else if($("#cgs_tel").val()==""||$("#cgs_tel").val()=="请输入您的手机号")
			{
			    alert("电话不能为空！");
				return;
			}else if(!tel.test($("#cgs_tel").val()))
			{
			   alert("请输入正确的电话号码");
			   return;
			}else
			{
			    var datas=$this.parents("form.cgs-rzlist").serializeArray();
				$.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				    if(data.status==true){
						 $("#cgs_name").val("");
						 $("#cgs_tel").val("");
					     cscs.dialogs('jhym-tijiao-list');
				    }else{
					    alert('提交失败！')
				    }
				}, 'jsonp'); 
			}
		});
    }); 
	
    
	
	<!-- 倒计时 -->
	var time={
	    init:function()
		{
			var EndTime= new Date('2015/08/17 17:00:00');
			var NowTime = new Date();
			var t =EndTime.getTime() - NowTime.getTime();
			var d=Math.floor(t/1000/60/60/24);
            var h=Math.floor(t/1000/60/60%24);
            var m=Math.floor(t/1000/60%60);
            var s=Math.floor(t/1000%60);
			//alert(h.substring(0,1));
			
			if(d<10)
			{
				d="0"+d;
			}
			if(h<10)
			{
				h="0"+h;
			}
			if(m<10)
			{
				m="0"+m;
			}
			if(s<10)
			{
				s="0"+s;
			}
			$("#ddjmh_time_d").html(d);
			$("#ddjmh_time_h").html(h);
			$("#ddjmh_time_m").html(m);
			$("#ddjmh_time_s").html(s);
			$("#ddjmh_time_d1").html(d);
			$("#ddjmh_time_h1").html(h);
			$("#ddjmh_time_m1").html(m);
			setTimeout(time.init,1000);
		}
	}
    
    time.init();
	
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
			   
		   }
	  })
}
exports.module=cscs;
});
