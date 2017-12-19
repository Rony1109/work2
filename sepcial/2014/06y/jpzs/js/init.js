/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('http://res.csc86.com/js/l/jquery.js');
    require('top');
	require('http://res.csc86.com/f=js/m/config.js,js/p/artDialog/4.1.5/jquery.artDialog.js,js/p/artDialog/4.1.5/plugins/iframeTools.source.js');
    /*
     * 以下为专题js代码
     * ......
     */
	
	$(function(){
		$(".jsJr").click(function(){
			tolinetwo();
			return false;
		});
	});
	
	function tolinetwo(){
		$.get("http://api.csc86.com/api/member/islogin",function(data){
			if(data.status==true){
				var dg=art.dialog({
					title:"金牌供应商",
					padding:"20px",
					content:'<div class="tablewidth"><div class="tab-title"><a class="g-fr jsClose" href="javascript:void(0);" title=""></a></div><form  id="myform" name="myform" action="http://pgmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=21&siteid=1&pc_hash=mGpwrR" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i> 公司名称</span><input type="text" name="info[company]" id="contact" value="" class="input-text"></li><li><span color="red"><i>*</i>联系人</span><input type="text" name="info[contact]" id="tel" value="" class="input-text"></li><li><span color="red"><i>*</i>电话</span><input type="text" name="info[tel]" id="mainProduct" value="" class="input-text"></li><li><span color="red"><i>*</i>主营产品</span><input type="text" name="info[mainProduct]" id="company" value="" class="input-text"></li></ul>'+
	'<input type="submit" value="提交" id="dosubmit" name="dosubmit">'+
	'</form></div>',
					ok:function(){},
					cancel:false,
					fixed:true,
					lock:true,
					init:function(){
						$("form").submit( function () {
							var company=$("input[name='info[company]']").val(),
							contact=$("input[name='info[contact]']").val(),
							tel=$("input[name='info[tel]']").val(),
							mainProduct=$("input[name='info[mainProduct]']").val();
							if(company==""||contact==""||tel==""||mainProduct==""){
								return false;
							}else{
								return true;
							}
						} );
						$(".jsClose").click(function(){
							dg.close();
						});
					},
					icon: 'question',
					okVal: false
				});
			}else{
				seajs.use(csc.url("res","/f=js/m/sign"),function (){			
					csc.checkSign("location.reload");
				});
			}
		},"jsonp");			
	}
});


