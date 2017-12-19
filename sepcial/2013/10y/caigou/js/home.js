$(function(){

	var flag=false;

	$("#tit_a_show tr:odd").addClass("odd");

		$.get(csc.url("api","/member/isLogin.html"),function (data){

			if(data.status){

				flag =true;

				$("#btn_fabu").show().next().hide();

				$("#memberid").val(data.data.memberId);

			}

		},"jsonp");

	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}
	},"jsonp");

	$("#btn_fabu").click(function(){

			if(flag){

				artDialog({id: "memtool",

					content: $("#mem-toolct").html(),

					opacity:0.4,

					fixed: true,

					title: "发布采购信息",

					width: 500,

					padding: "5px 19px 25px 15px",

					lock:true

				});	

			}else{

				location.href="http://member.csc86.com/login/phone";	

			}

	

	});

	

	$("#tit_a_show").delegate("tr a.tit_list","click",function(){

		var id =$(this).attr("id")||8,div = '<div id="show_con" class="show_con">';

		$.get("http://data.csc86.com/api.php",{"op":"content","id":+id},function(data){

			if(data.productname){

				div+='<div class="g-c-f"><label>产品名称:</label><span>'+data.productname+'</span> </div>'

			}

			if(data.count){

				div+='<div class="g-c-f"><label>产品数量:</label><span class="font_str">'+data.count+'</span> </div>'

			}

			if(data.price){

				div+='<div class="g-c-f"><label>单价范围:</label><span>'+data.price+'</span> </div>'

			}

			if(data.content){

				div+='<div class="g-c-f"><label>详细说明:</label><span class="condixs">'+data.content+'</span> </div>'

			}

			if(data.companyname){

				div+='<div class="g-c-f"><label>商家名称:</label><span>'+data.companyname+'</span></div>'

			}

			if(data.address){

				div+='<div class="g-c-f shr_font"><label>收货地址:</label><span>'+data.address+'</span></div>'

			}

			if(data.contactname){

				div+='<div class="g-c-f shr_font"><label>联 系 人:</label><span>'+data.contactname+'</span></div>'

			}

			if(data.contact&&flag){

				div+='<div class="g-c-f shr_font"><label>联系方式:</label><span>'+data.contact+'</span></div>'

			}else if(data.contact&&!flag){

				div+='<div class="g-c-f shr_font"><label>联系方式:</label><span><a href="http://member.csc86.com/login/phone" class="btn-reg">登录</a>后查看联系方式</span></div>'

			}

			div+='</div>';

		artDialog({id: "tit_a_show",

			content: div,

			fixed: true,

			opacity:0.4,

			title: data.title,

			width: 500,

			padding: "5px 19px 25px 15px",

			lock:true

		});		

		},"jsonp");

	});

		var time = $.trim($("#time").val())||"2013-05-02";



	csc.getdata=function(id,$t,em,emtxt){

		$t.attr("disabled",true);

		$.get(csc.url("data","/api.php"),{"op":"special","id":id,"l":20,"type":"list","p":emtxt,t:time},function(data){

			if(data.data){

				var table='<table width="300" border="0"><tbody>';

				$.each(data.data,function(index,value){

					table +='<tr><td><a class="tit_list" id='+value.id+' href="javascript:">'+value.title+'</a></td><td><em>'+value.count+'</em></td><td><i>'+value.address+'</i></td></tr>';

				});

				table+='</tbody></table>';

				$t.parents("div.page").next("div.view_win").html(table);	

				em.html(emtxt);

				$("#tit_a_show tr:odd").addClass("odd");

	       }

		   $t.attr("disabled",false);

		},"jsonp");

	}

	

	

	$("#tit_a_show").delegate(".fang input.prev","click",function(){

		var $t =$(this), em = $t.parents("div.page").find("em"), emtxt = Number(em.text())-1;;

		if(emtxt===0){return false;}	

		csc.getdata(21,$t,em,emtxt);		

	}).delegate(".fang input.next","click",function(){

	    var $t =$(this), em = $t.parents("div.page").find("em"),emtxt = Number(em.text())+1,tal = Number($t.parents("div.page").find("strong").text());;

		if(emtxt>tal){return false;}	

		csc.getdata(21,$t,em,emtxt);		

	}).delegate(".xang input.prev","click",function(){

		var $t =$(this), em = $t.parents("div.page").find("em"), emtxt = Number(em.text())-1;;

		if(emtxt===0){return false;}	

		csc.getdata(22,$t,em,emtxt);	

	}).delegate(".xang input.next","click",function(){

		 var $t =$(this), em = $t.parents("div.page").find("em"),emtxt = Number(em.text())+1,tal = Number($t.parents("div.page").find("strong").text());;

		if(emtxt>tal){return false;}	

		csc.getdata(22,$t,em,emtxt);	

	}).delegate(".bao input.prev","click",function(){

		var $t =$(this), em = $t.parents("div.page").find("em"), emtxt = Number(em.text())-1;;

		if(emtxt===0){return false;}	

		csc.getdata(23,$t,em,emtxt);

	}).delegate(".bao input.next","click",function(){

		 var $t =$(this), em = $t.parents("div.page").find("em"),emtxt = Number(em.text())+1,tal = Number($t.parents("div.page").find("strong").text());

		if(emtxt>tal){return false;}	

		csc.getdata(23,$t,em,emtxt);	

	});

});

//登录
function loginname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}



