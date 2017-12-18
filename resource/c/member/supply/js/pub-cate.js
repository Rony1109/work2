/*发布产品类目搜索js*/
define(function(require, exports, module) {

	var dialog = require('//res.csc86.com/v2/m/jsM/dialog');//按钮弹窗组件

	var html = $('<div class="cate-float"><div class="cate-lsit"></div><div class="cate-close">关闭</div></div>');

	$("#btn-cate-search").bind("click",function(){
		var $this = $(this),hostname=location.host,
			inputval = $.trim($this.prev("div.cate-input").find("input.cate-input-text").val());
			//$this.attr("disabled",true);
		$.post('//'+hostname+'/shop/productPublish//productPublish.findCategoryByName',{categoryName:inputval},function(response){
			if(response.status == 1){
					//$(this).parent("div.cate-float").show();
				if(response.data.length > 0){
					var item = '';
					for(var i=0; i<(response.data).length; i++){//构建搜索结果数据
						item += '<label><input type="radio" value="'+response.data[i].path+'">'+ response.data[i].ca1Name +' &gt; '+ response.data[i].ca2Name + ( response.data[i].ca3Name ? ('&gt; '+response.data[i].ca3Name) : '')+'</label>';
					}
					html.find("div.cate-lsit").empty().css({
						'height': '145px',
						'padding': '10px 0'
					}).append(item);
					html.find(".cate-close").show();
					$this.prev("div.cate-input").append(html);//插入搜索结果数据
					document.body.onclick = function () {
					}
				}else{
					html.find("div.cate-lsit").empty().css({
						'height': 'auto',
						'padding': '0'
					}).append('<p class="g-tc">没有搜索到您所查找的类目</p>');
					html.find(".cate-close").hide();
					$this.prev("div.cate-input").append(html);
					document.body.onclick = function () {
						html.find(".cate-close").click();
					}
				}
				html.find(".cate-close").bind("click",function(){//绑定关闭事件
					//csc.offer.newcateName();
					$(this).parent("div.cate-float").remove();
					console.log($('select[name^="category["]').find("option:selected").length);
				});
				html.find("label").bind("click",function(){
					var txt = $(this).text();
					var $thisinput= $(this).find('input').val();
					$('select[name="category[1]"]').find('option').remove();
					$('input[name="categoryPath"').val(txt);
					$('select[name="category[2]"]').remove();
					$('input[name="cmmnClssfy"]').val($thisinput);
					$("div.you-select strong").html(txt);
					$('select[name^="category["]').find("option:selected").attr("selected",false);
				});
			}else{
				dialog.error(response.msg);
			}
			//$this.attr("disabled",false);
		},"json");
	});

});