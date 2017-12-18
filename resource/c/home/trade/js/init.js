/**
 * 前端模板js文件
 * 
 */
seajs.config({
	alias:  {
		'focus': 'c/home/index/js/focusPlay'
	}			  
});
 
define(function(require, exports, module) {
	var csc = require('focus');
	
	//设置首页及添加收藏
	require('m/top-bar/js/init');
	require('m/head-search/js/init');
	
	//弹出框
	//require('m/dialog/js/init');
	//require('c/home/material/js/sign_up');
	
	//时间
	require('l/My97DatePicker/4.8/buyoffer_WdatePicker');
	
	//轮播
	$(".src-img ul").find("script").remove();
	csc.focusPlay("div.src-img");
	csc.focusPlay("div.src-two-img");
	
	//tmp:$(this);elem:当前事件元素；add：同事要添加删除的class;
	exports.hover_more=function(tmp,elem,add,num){
		var length=arguments.length;
		if(length==3){
			$th=tmp.index();
			$(add).removeClass("cur");
			$(add).eq($th).addClass("cur");
		}
		$(elem).removeClass("cur");
		tmp.addClass("cur");
	}
	
	//供应商服务
	$(".tab_inner li .tab_tit").hover(function(){
		$(".tab_inner li").removeClass("cur");
		$(this).parent("li").addClass("cur");
	});
	//展会集锦
	$(".tit ul li").hover(function(){
		exports.hover_more($(this),".tit ul li",".high_con .tab_exhi");
	});
	
	//本周热门排行
	$(".tabs-nav ul li").hover(function(){
		exports.hover_more($(this),".tabs-nav ul li",".tabs-ctn ul");
	});
	
	//登录后采购数
	$.get("//api.csc86.com/shop/countproduct",function(data){
		if(data.status==true&&data.data.hasOpened==true){
			$(".tab_inner .tab>li:eq(0)").find(".btn_shop").css("display","none");
			$(".tab_inner .tab>li:eq(0)").find(".f_push").css("display","block").children("em").html(data.data.product);
			$(".tab_inner .tab>li:eq(1)").find(".btn_shop").css("display","none");
			$(".tab_inner .tab>li:eq(1)").find(".f_push").css("display","block").children("em").html(data.data.inquiry);
		}else if(data.status==true&&data.data.hasOpened==false){
			$(".tab_inner .tab>li:eq(1)").find(".btn_shop").css("display","none");
			$(".tab_inner .tab>li:eq(1)").find(".f_push").css("display","block").children("em").html(data.data.inquiry);
		}
	},"jsonp");
	
	//获取第二级类目
	$("select[name='c1']").change(function(){
		var strone=$(this).children("option:selected").val();
		if(strone!=""){
			$.get("//symanage.csc86.com/api.php?op=get_links&act=select&parentid="+strone+"&keyid=1",function(data){
				var tmp ="<option value=''>第二级</option>";
				$.each(data,function (i,v){
					tmp += '<option value="' + v.linkageid + '">' + v.name + '</option>';
				});
				$("select[name='c']").html(tmp);
			},"jsonp");	
		}else{
			$("select[name='c']").html('<option value="">第二级</option>');
		}
	});
	//获取市
	/*$("select[name='p']").change(function(){
		var strone=$(this).children("option:selected").val();
		$("select[name='a']").html("");
		if(strone!=""){
			$.get("//symanage.csc86.com/api.php?op=get_links&act=select&parentid="+strone+"&keyid=1056",function(data){
				var tmp ="<option value=''>选择市</option>";
				$.each(data,function (i,v){
					tmp += '<option value="' + v.linkageid + '">' + v.name + '</option>';
				});
				$("select[name='a']").html(tmp);
			},"jsonp");	
		}else{
			$("select[name='a']").html('<option value="">选择市</option>');
		}
	});*/
	
	
/*	$("a.btn_sub").click(function(){
		var sta=$("#startTime").val(),
		end=$("#endTime").val(),
		c=$("select[name='c'] option:selected").val()||'',
		c1=$("select[name='c1'] option:selected").val()||'',
		p=$("select[name='p'] option:selected").val()||'',
		a=$("select[name='a'] option:selected").val()||'';
		if(sta!=""){
			sta=sta.replace(/-/g,'/');
			sta=new Date(sta);
			sta=(sta.getTime())/1000;
		}
		if(end!=""){
			end=end.replace(/-/g,'/');
			end=new Date(end);
			end=(end.getTime())/1000;
		}
		$.get("//api.csc86.com/search/zhanhui?number=8&m=1&t1="+sta+"&t2="+end+"&c="+c+"&p="+p+"&a="+a+"&c1="+c1,function(data){																						
			if(data.totalcount==0){
				$(".warning").css("display","block");
			}else{
				$(".search_result").css("display","block");
				$(".retri_con form").css("display","none");
				var tmp='<ul class="g-cf l_list">';
				$.each(data.doc,function (i,v){
					tmp += '<li><a href="'+v.url+'"  target="_blank" title="'+v.title+'">'+v.title+'</a></li>';
				});
				tmp=tmp+"</ul>";
				if($(".search_result").children().is("ul")){
					$(".search_result ul.l_list").replaceWith(tmp);
				}else{
					$(".retri_con .search_result").prepend(tmp);
				}
			}
		},"jsonp"); 
		return false;
	});*/
	
	//列表搜索
	$(".sear-list a").click(function(){
		document.formsec.submit();
		//return false;
	});
	//列表时间失去焦点时
	/*
	$("#startTime").blur(function(){
		var sta=$(this).val();	
		if(sta!=""){
			sta=sta.replace(/-/g,'/');
			sta=new Date(sta);
			sta=(sta.getTime())/1000;
			$("input[name='st']").val(sta);
		}else{
			$("input[name='st']").val("");
		}
	});
	$("#endTime").blur(function(){
		var sta=$(this).val();	
		if(sta!=""){
			sta=sta.replace(/-/g,'/');
			sta=new Date(sta);
			sta=(sta.getTime())/1000;
			$("input[name='et']").val(sta);
		}else{
			$("input[name='et']").val("");
		}
	});
	*/
	//重新查询
	$(".res_btn a").click(function(){
		$(".search_result").css("display","none");
		$(".retri_con form").css("display","block");
		$(".warning").css("display","none");
	});

    //友情链接更多
    require('c/home/links/js/linkMore');

    //好货源
    var tabs=require('m/jsM/tab');
    tabs($(".tab-nav li"), $(".tab-c"), 'mouseover', 'cur');
     tabs($(".tab-nav-1 li"), $(".tab-c-1"), 'mouseover', 'cur');
});


