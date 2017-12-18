/**
 * 会员中心
 * 
 */
define(function(require, exports, module) {

	require('m/jsM/placeholder')("input[placeholder]");//为input添加提示语
	//require('c/member/common/js/verfylogin'),//检测登录

	var hover = require('hover'),//hover样式
		menu = require('./menu');//自定义菜单
	
	//menu.initIco();//初始化排序图标

	$("#menuList").delegate("li>div","mouseover",function(){//滑过添加背景颜色
		hover(this);
	});

	$("#menuList").delegate("li>div>span.node>b","click",function(){//折叠事件
		menu.foldEvent(this);
	});

	$("#menuList").delegate("li>div>span.addnode>em","click",function(){//添加子菜单事件
		menu.addChild(this);
	});

	$("#menuList").delegate("li>div>span.option>em","click",function(){//删除菜单事件
		menu.delRow(this);
	});

	$("#addMenu").bind("click",function(){//添加主菜单事件
		menu.addParent("#menuList");
	});

	$("#menuList").delegate("li>div>span.sort>b.ico-up","click",function(){//向上排序
		menu.sortUp(this);
	});

	$("#menuList").delegate("li>div>span.sort>b.ico-down","click",function(){//向下排序
		menu.sortDown(this);
	});

	$("#menuList").delegate("input[name='name']","blur",function(){//验证菜单名
		var inputval = menu.veryfyBlank(this);
		if(inputval){
			menu.veryfyLength(this);
		}
	});

	$("#menuList").delegate("input[name='subs']","blur",function(){//验证子级链接是否为空
		menu.veryfyBlank(this);
	});

	$("#menuList").delegate("input[name='content']","blur",function(){//验证主菜单链接是否为空
		menu.veryfyBlank(this);
	});

	$("#saveMenuList").bind("click",function(){//提交事件
		menu.saveList("#Menu");
	});

	$("#creatMenu").bind("click",function(){//生成菜单
		menu.responseMenu(this);
	});

	$("#onOffMenu").bind("click",function(){//停用/开启菜单
		menu.responseMenu(this);
	});
	
});