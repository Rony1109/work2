/**
 * 微商联盟V1.1 会员中心 
 * 2014.06.03 by lg
 */
define(function(require, exports, module) {

	var dialog = require('m/dialog/js/init'),//调用弹出框插件
		d = 0;

	module.exports = {
		menuParent : function(str){//主菜单
			return '<li>'+
			          '<div>'+
			            '<span class="node"><b class="ico-unfold"></b></span>'+
			            '<span class="name"><input name="name" type="text" maxlength="8" placeholder="4个汉字或8个字母" /></span>'+
			            '<span class="addnode"><em>添加子菜单</em></span>'+
			            '<span class="sort"><b class="ico-dis-up"></b>&nbsp;&nbsp;&nbsp;<b class="ico-dis-down"></b></span>'+
			            '<span class="link"><input name="content" type="text" placeholder="链接请以http://开头" /></span>'+
			            '<span class="option"><em>删除</em></span>'+
			          '</div>'+
			        '</li>';
		},
		menuChild : function(){//子菜单
			return	'<div class="li-child">'+
			            '<span class="node"><b class="ico-extend"></b></span>'+
			            '<span class="name"><input name="name" type="text" maxlength="8" placeholder="4个汉字或8个字母" /></span>'+
			            '<span class="addnode">&nbsp;</span>'+
			            '<span class="sort"><b class="ico-dis-up"></b>&nbsp;&nbsp;&nbsp;<b class="ico-dis-down"></b></span>'+
			            '<span class="link"><input name="subs" type="text" placeholder="链接请以http://开头" /></span>'+
			            '<span class="option"><em>删除</em></span>'+
			        '</div>';
		},
		foldEvent : function(str){//折叠菜单
			var $this = $(str),
				$child = $this.parents("div").siblings(".li-child"),
				childlength = $child.length,
				hideli = $child.is(":hidden");
			if(childlength > 0){
				if(hideli){
					$child.show();
					$this.prop("class","ico-unfold");
				}else{
					$child.hide();
					$this.prop("class","ico-fold");
				}
			}
		},
		unFold : function(str){//展开主菜单
			var $this = $(str) ,
				$child = $this.parents("div").siblings(".li-child"),
				$icofold = $this.parent().siblings("span.node").children("b"),
				childlength = $child.length,
				hideli = $child.is(":hidden");
			if(childlength > 0 && hideli){
				$child.show();
				$icofold.prop("class","ico-unfold");
			}
		},
		sortIco : function(str){//排序图标
			var $this = $(str),
				$row = $this.closest("div"),
				$menu =  $row.parent(),
				rowindex = $row.index(),
				menuindex = $menu.index(),
				menulength = $menu.siblings().length,
				childlength = $row.siblings().length,
				ico = $row.find("span.sort>b");			
			if(rowindex == 0 && menuindex == 0){
				$(ico[0]).prop("class","ico-dis-up");
				if(menuindex < menulength){
					$(ico[1]).prop("class","ico-down");
				}else{
					$(ico[1]).prop("class","ico-dis-down");
				}
			}else if(rowindex == 0 && menuindex >= 1){
				$(ico[0]).prop("class","ico-up");
				if(menuindex < menulength){
					$(ico[1]).prop("class","ico-down");
				}else{
					$(ico[1]).prop("class","ico-dis-down");
				}
			}else if(rowindex == 1){
				$(ico[0]).prop("class","ico-dis-up");
				if(rowindex < childlength){
					$(ico[1]).prop("class","ico-down");
				}else{
					$(ico[1]).prop("class","ico-dis-down");
				}
			}else if(rowindex > 1){
				$(ico[0]).prop("class","ico-up");
				if(rowindex < childlength){
					$(ico[1]).prop("class","ico-down");
				}else{
					$(ico[1]).prop("class","ico-dis-down");
				}
			}
		},
		initIco : function(){//初始化排序图标
			var ico = $("#menuList>li>div>span.sort>b");
			for(i=0; i<ico.length; i+=2){
				module.exports.sortIco(ico[i]);
			};
		},
		addParent : function(str){//添加主菜单
			var $menu = $(str) , menuparent = module.exports.menuParent;
			if($menu.children("li").length < 2){
				$menu.append(menuparent);
			};module.exports.initIco();d++;
		},
		addChild : function(str){//添加子菜单
			var $this = $(str) , $li = $this.closest("li"), menuchild = module.exports.menuChild;
			module.exports.unFold(str);//展开当前菜单
			if($li.children("div").length < 6){
				$li.append(menuchild);
			};module.exports.initIco();
			  module.exports.hideLink($li);
			  d++;
		},
		delRow : function(str){//删除
			var $this = $(str) , index = $this.closest("div").index(), $li = $this.closest("li");
			if(index == 0){
				$this.closest("li").remove();
			}else{
				$this.closest("div").remove();
			};module.exports.initIco();
			  module.exports.hideLink($li);
			  d++;
		},
		hideLink : function(str){//隐藏主菜单链接输入框
			var $this = $(str),
				$link = $this.children(":first").find("span.link"),
				childlength = $this.children("div").length;				
			if(childlength == 1){
				$link.append('<input name="content" type="text" placeholder="链接请以http://开头">');
			}else{
				$link.empty();
			}
		},
		sortUp : function(str){//向上排序
			var $this = $(str),
				$row = $this.closest("div"),
				$menu =  $row.parent(),
				rowindex = $row.index(),
				menuindex = $menu.index();
			if(rowindex <= 0 && menuindex > 0){
				$menu.insertBefore($menu.prev());
			}else{
				$row.insertBefore($row.prev());
			};module.exports.initIco();
		},
		sortDown : function(str){//向下排序
			var $this = $(str),
				$row = $this.closest("div"),
				$menu =  $row.parent(),
				rowindex = $row.index();
			if(rowindex == 0){
				$menu.insertAfter($menu.next());
			}else{
				$row.insertAfter($row.next());
			};module.exports.initIco();
		},
		veryfyBlank : function(inputdom){//验证是否为空
			var $inputdom = $(inputdom), inputval = $.trim($inputdom.val());

			if (!inputval){
				$inputdom.siblings('font.erro').remove();
				$inputdom.parent().append('<font class="erro c-red">* 不能为空</font>');
				return false;
			}else{ $inputdom.siblings('font.erro').remove(); return true; }

		},
		veryfyLength : function(inputdom){//验证字符长度
			var $inputdom = $(inputdom),
				inputval = $.trim($inputdom.val()),
				charlength = inputval.replace(/[^\x00-\xff]/g, "**").length;
			if (charlength > 8){//小于8个字符
				$inputdom.siblings('font.erro').remove();
				$inputdom.parent().append('<font class="erro c-red">* 字符过长</font>');
				return false;
			}else{ $inputdom.siblings('font.erro').remove(); return true; }
		},
		getJson : function(str){//数据组装(返回数组)
			var $this = $(str), lidom = $this.find("li"), menus = new Array();

			if(str){
				for(i=0;i<lidom.length;i++){
					var div = $(lidom[i]).children("div") , arry = new Array() , ary = new Array();
					for(j=0;j<div.length;j++){
						var input = $(div[j]).find("input");
						if(j==0){
							for(k=0;k<input.length;k++){
								arry.push($(input[k]).val());
							}
						}else{
							ary.push(new Array($(input[0]).val(),$(input[1]).val()));
						}
					}
					arry.push(ary);
					menus.push(arry);
				}
			}

			return menus;

		},
		saveList : function(form){//提交表单
			var $form = $(form), v = $form.serializeArray(), erro,
				lilength = $form.find("li").length,
				inputname = $form.find("input[name='name']"),
				inputcontent = $form.find("input[name='content']"),
				inputsubs = $form.find("input[name='subs']"),
				url = window.location.pathname;

			if(lilength != 0){
				for(i=0;i<inputname.length;i++){
					var inputval = module.exports.veryfyBlank(inputname[i]);
					if(inputval){
						module.exports.veryfyLength(inputname[i]);
					}
				};
				for(i=0;i<inputcontent.length;i++){
					module.exports.veryfyBlank(inputcontent[i]);
				};
				for(i=0;i<inputsubs.length;i++){
					module.exports.veryfyBlank(inputsubs[i]);
				};
				erro = $form.find("font.erro").length;
				if(erro>0){
					return false;
				}else{
					var json = module.exports.getJson(form);
					$.post(url,{"menus":json},function(response){
						if(response.status)
							dialog.success(response.msg,3,function(){window.location.reload();});
						else
							dialog.alert(response.msg,3);
					},"json");
				}
			}else{
				var json = module.exports.getJson(false);
				$.post(url,{"menus":json},function(response){
					if(response.status)
						dialog.success(response.msg,3,function(){window.location.reload();});
					else
						dialog.alert(response.msg,3);
				},"json");
			}
		},
		responseMenu : function(id){
			var $id = $(id) , url = $id.attr("src");
			if(d == 0){
				$.post(url,function(response){
					if(response.status){
						dialog.success(response.msg,3,function(){window.location.reload();});
					}else{
						dialog.alert(response.msg,3);
					}
				},"json");
			}else{
				dialog.success("请先保存菜单！",2);
			}
		}
	}

});