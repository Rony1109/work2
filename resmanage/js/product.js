//var url = "http://192.168.1.251:8284/bops-app/bops/";
//var url = "http://10.10.10.44:8080/bops-app/bops/";
//var url="http://192.168.0.249:8080/categorymanager/categorymanager/";
var url =BASEURL+"bops-app/bops/";


$(function (){
	$("li.ln-2th-item-cur a[href$='"+ $.trim($("#top").val()) +"']").closest("li").addClass("ln-3th-cur");
	$(".a-transfer li.has(ul.c-2th-items)").addClass("has-children");
	$(".a-transfer .c-2th-items li.has(ul.c-3th-items)").addClass("has-children");
	var $sideId=document.getElementById("top").value;
	$("#"+$sideId).closest(".li-last").addClass("ln-3th-cur");
	$("ul.c-items li:has(ul)").addClass("has-children");
	var
		id =document.getElementById("currentNo").value,
		$id = $("#c-"+id);
	$id.next().show();
	switch ($id.attr('class')) {
	   case 'c-item-hd' :
		   	$id.parent(".has-children").addClass("c-item-cur");
			break;
	   case 'c-2th-item-hd' :
			$id.parent(".has-children").addClass("c-2th-item-cur");
			$id.closest(".c-item").addClass("c-item-cur");
			break;
	   default :
			$id.closest(".has-children").addClass("c-2th-item-cur").closest(".c-item").addClass("c-item-cur");
	}
	var parentCategoryNo=document.getElementById("No").value,
		name=document.getElementById("name").value;
	window.addA1= function (){
		art.dialog({
			 title:'新增类目',
			content: '<div class="art-p-category"><span>所属父类目：</span>'+name+'</div>'+'<div class="art-p-category"><span>类目名称：</span><input type="text" id="c-a-categoryName" /><span class="po-mes">最多25个字！</span></div>',
			fixed: true,
			okVal: '保存',
			background:"#000",
			opacity:"0.3",
			ok: function () {
				var caName=document.getElementById('c-a-categoryName').value,vaName;
					if(caName.length<=25&&caName.length>0){
						vaName=caName;
					}else{
						$(".po-mes").addClass("p-error");
					   return false;
					}
					$.get(url+"categorymanager.insertCategory",{"parentCategoryNo":parentCategoryNo,"categoryName":vaName},function(data){var tmp=data;aReturn(data);},"jsonp");
				},
			cancel: true,
			lock:true
		});
	}

	window.addA12= function (obj){
		var $this=$(obj);
		var $paclass=$this.closest("td").attr('class');
		var parId,parName,titleName,iNode;
		var menuLeng=$(".crumb strong a").length,radioG1,
			radioGroup1='<div class="art-p-category"><span>是否末级类目：</span><label><input checked type="radio" name="RadioGroup1" value="是" id="Group1_0">是</label><label><input type="radio" name="RadioGroup1" value="否" id="Group1_1" disabled>否</label></div>',
			radioGroup2='<div class="art-p-category"><span>是否末级类目：</span><label><input type="radio" name="RadioGroup1" value="是" id="Group1_0">是</label><label><input type="radio" name="RadioGroup1" value="否" id="Group1_1" checked>否</label></div>';
		if($paclass=='list-do'){
			parId=$("#"+$this.attr("id")).closest("tr").children("td:eq(0)").html();
			parName=$("#"+$this.attr("id")).closest("tr").children("td:eq(1)").html();
			titleName="新增子类目";
			if(menuLeng==1){
				radioG1=radioGroup1;
			}else{
				radioG1=radioGroup2;
			}
		}else{
			parId=parentCategoryNo;
			parName=name;
			titleName="新增类目";
			if(menuLeng>=2){
				radioG1=radioGroup1;
			}else{
				radioG1=radioGroup2;
			}
		}
		art.dialog({
			 title:titleName,
			content: '<div class="art-p-category"><span>所属父类目：</span>'+parName+'</div>'+'<div class="art-p-category"><span>类目名称：</span><input type="text" id="categoryName2" /><span class="po-mes">最多25个字！</span></div>'+radioG1,
			fixed: true,
			okVal: '保存',
			background:"#000",
			opacity:"0.3",
			ok: function () {
				var caName=document.getElementById('categoryName2').value,vaName;
					if($(".art-p-category input:checked").attr("id")=="Group1_0"){
							iNode='Y';
					}else{iNode='N';}
					if(caName.length<=25&&caName.length>0){
						vaName=caName;
					}else{
						$(".po-mes").addClass("p-error");
					   return false;
					}
					$.get(url+"categorymanager.insertCategory",{"parentCategoryNo":parId,"categoryName":vaName,"radio":iNode},function(data){var tmp=data;aReturn(tmp);},"jsonp");
				},
			cancel: true,
			lock:true
		});
	}

	window.reviseA1 = function (obj){
		var $this=$(obj);
		var parId=$("#"+$this.attr("id")).closest("tr").children("td:eq(0)").html();
		var parName=$("#"+$this.attr("id")).closest("tr").children("td:eq(1)").html(),group,iNode;
		var isNo=$(obj).siblings ("#isLeafNode").attr("value");
		var group;
		if(isNo=="Y"){
			group='<label><input type="radio" id="Group1_0" value="是" name="RadioGroup1" checked>是</label><label><input type="radio" id="Group1_1" value="否" name="RadioGroup1">否</label>';
		}else{
			group='<label><input type="radio" id="Group1_0" value="是" name="RadioGroup1">是</label><label><input type="radio" id="Group1_1" value="否" name="RadioGroup1" checked="">否</label>';
		}
		if($this.data('islast') == "Y"){
			group = '<label><input type="radio" id="Group1_0" value="是" name="RadioGroup1" checked readonly>是</label><label><input type="radio" id="Group1_1" value="否" name="RadioGroup1" disabled>否</label>';
		}
		art.dialog({
			 title:'修改类目',
			content: '<div class="art-p-category"><span>所属父类目：</span>'+name+'</div>'+'<div class="art-p-category"><span>类目ID：</span><input id="reviseId1" type="text" value="'+parId+'" disabled/><input type="hidden" id="hiId" value="'+parId+'" /></div>' +'<div class="art-p-category"><span>类目名称：</span><input type="text" id="reviseName1" value="'+parName+'" /><span class="po-mes">最多25个字！</span></div><div class="art-p-category"><span>是否末级类目：</span>'+group+'</div>',
			fixed: true,
			okVal: '保存',
			background:"#000",
			opacity:"0.3",
			ok: function () {
				var id=document.getElementById('reviseId1').value,
					hiId=document.getElementById("hiId").value,
					caName=document.getElementById('reviseName1').value,valId,vaName;
					if(caName.length<=25&&caName.length>0){
						vaName=caName;
					}else{
						$(".po-mes").addClass("p-error");
					   return false;
					}
					if($(".art-p-category input:checked").attr("id")=="Group1_0"){
							iNode='Y';
					}else{iNode='N';}
					$.get(url+"categorymanager.updateCategory",{"isLeafNode":isNo,"newIsLeafNode":iNode,"parentCategoryNo":parentCategoryNo,"newCategoryName":vaName,"newCategoryNo":id,"categoryNo":hiId,"categoryName":parName},function(data){aReturnT(data);},"jsonp");
				},
			cancel: true,
			lock:true
		});
	}
	window.addAbute = function (obj){
		var $this=$(obj);
		var $paclass=$this.closest("td").attr('class');
		var parId,parName,titleName,iNode,selVal;
		if($paclass=='list-do'){
			parId=$("#"+$this.attr("id")).closest("tr").children("td:eq(0)").html();
			parName=$("#"+$this.attr("id")).closest("tr").children("td:eq(1)").html();
		}else{
			parId=parentCategoryNo;
			parName=name;
		}
		art.dialog({
			 title:'新增属性',
			content: '<div class="art-p-category"><span>所属父类目：</span>'+parName+'</div>'+'<div class="art-p-category"><span>类目ID：</span><input id="categoryID" type="text" value="'+parId+'" disabled /></div>'+'<div class="art-p-category"><span>属性名称：</span><input type="text" id="attrName" /><span class="po-mes">2~10个字！　</span></div>'+'<div class="art-p-category"><span>单位：</span><input type="text" id="unit" /></div>'+'<div class="art-p-category"><span>展现形式：</span><select class="u121"><option value="下拉菜单" selected="">下拉菜单</option><option value="文本框" selected="">文本框</option></select></div>'+'<div class="art-p-category a-s"><span>是否必选：</span><label><input type="radio" name="RadioGroup1" value="是" id="Group1_0" checked>是</label><label><input type="radio" name="RadioGroup1" value="否" id="Group1_1">否</label></div>',
			fixed: true,
			okVal: '保存',
			background:"#000",
			opacity:"0.3",
			ok: function () {
				var attrName=$.trim(document.getElementById('attrName').value),vaName,vaAunit,
					aunit=document.getElementById("unit").value,
					displayType=$(".u121 option:selected").html();
					switch (displayType) {
						   case '下拉菜单' :
								selVal="LIST";
								break;
						   case '多选' :
								selVal="CHECK";
								break;
							case '单选' :
								selVal="RADIO";
								break;
						   default :
								selVal="TEXT";
					}
					if($(".a-s input:checked").attr("id")=="Group1_0"){
							iNode='Y';
					}else{iNode='N';}
					if(attrName.length<11&&attrName.length>1){
						vaName=attrName;
					}else{
						$(".po-mes").addClass("p-error");
					   return false;
					}
					$.get(url+"categorymanager.insertProperty",{"categoryNo":parId,"propertyName":vaName,"displayUnit":aunit,"displayType":selVal,"isRequired":iNode},function(data){var tmp=data;aReturn(tmp);},"jsonp");
				},
			cancel: true,
			lock:true
		});
	}
	window.reviseAbute = function (obj){
		if(!$.isPlainObject(obj)) return;
		art.dialog({
			 title:'修改属性',
			content: '<div class="art-p-category"><span>所属父类目：</span>'+name+'</div>'+'<div class="art-p-category"><span>属性ID：</span><input id="categoryID" type="text" value="'+obj.id+'" disabled /></div>'+'<div class="art-p-category"><span>属性名称：</span><input type="text" id="attrName"  value="'+obj.propertyName+'"/><span class="po-mes">2~10个字！　</span></div>'+'<div class="art-p-category"><span>单位：</span><input type="text" id="unit"  value="'+obj.displayUnit+'"/></div>'+'<div class="art-p-category"><span>展现形式：</span><select class="u121" name="displayType"><option value="LIST" selected="">下拉菜单</option><option value="TEXT" selected="">文本框</option></select></div>'+'<div class="art-p-category"><span>是否必选：</span><label><input type="radio" name="isRequired" value="Y">是</label><label><input type="radio" name="isRequired" value="N">否</label></div>',
			fixed: true,
			okVal: '保存',
			background:"#000",
			opacity:"0.3",
			init:function (){
				setTimeout(function (){
					$("[name='displayType']").val(obj.displayType);
					$("[name='isRequired'][value='"+obj.isRequired+"']").prop("checked",true);
				},10);
			},
			ok: function () {
				var attrName=$.trim(document.getElementById('attrName').value),vaName,vaAunit,
					aunit=document.getElementById("unit").value,
					selVal=$("[name='displayType']").val();
					iNode=$(".art-p-category input:checked").val();
					if(attrName.length<11&&attrName.length>1){
						vaName=attrName;
						var parentCategoryNo = $("#No").val();
					}else{
						$(".po-mes").addClass("p-error");
					   return false;
					}
					$.get(url+"categorymanager.updateProperty",{"propertyID":obj.id,"categoryNo":parentCategoryNo,"propertyName":vaName,"displayUnit":aunit,"displayType":selVal,"isRequired":iNode},function(data){var tmp=data;aReturn(tmp);},"jsonp");
				},
			cancel: true,
			lock:true
		});
	}
	window.delAbute= function (obj){
		var $this=$(obj);
		var $tmp=$("#"+$this.attr("id")).closest("tr");
		var parId=$tmp.children("td:eq(0)").html(),
			parName=$tmp.children("td:eq(1)").html();
		art.dialog({
			 title:'删除属性',
			content: '<div class="art-p-del">你确认要把属性：<span>'+parName+'&nbsp;</span>删除吗？</div>',
			fixed: true,
			background:"#000",
			opacity:"0.3",
			ok: function () {
				$.get(url+"categorymanager.deleteProperty",{"propertyID":parId},function(data){var tmp=data;aReturn(tmp);},"jsonp");
			},
			cancel: true,
			lock:true
		});
	}
	window.defendAbute = function (obj){
		var $this=$(obj);
		var abuteId=$("#"+$this.prev().attr("id")).closest("tr").children("td:eq(0)").html();
		var abuteVal=$this.parent("td").prev().children("select").html();
		art.dialog({
			 title:'维护属性值',
			content: '<form><div class="a-add"><input type="text" name="listItem1" value="" class="a-content"><input type="button" value="添加" name="btnAdd" onclick="amove(this.form.listItem1,this.form.listView1)"/></div><div class="art-p-category" id="aSel"><select name="listView1"  size="8">'+abuteVal+'</select><div class="de-r"><input type="button" value="修改" onclick="arevise()" /><br /><input type="button" value="删除" onclick="aremove()" /><br /><input type="button" value="上移" onclick="amoveUp()"/><br /><input type="button" value="下移" onclick="amoveDown()" name="btnDown"/></div></div><div class="a-rev"><input type="text" value="" class="a-content"><input type="button" value="修改"  onclick="apreserve()"/></div></form>',
			fixed: true,
			okVal: '保存',
			background:"#000",
			opacity:"0.3",
			ok: function () {
				var $length=$("#aSel select option").length;
				var selArry=$("#aSel select option").map(function(){return $(this).val()}).get().join(",");
				$.get(url+"categorymanager.keepPropertyValue",{"propertyID":abuteId,"propertyValue":selArry},function(data){var tmp=data;aReturn(tmp);},"jsonp");
			},
			cancel: true,
			lock:true
		});
	}
	window.delA1= function (obj){
		var $this=$(obj);
		var $tmp=$this.closest("tr");
		var parId=$tmp.children("td:eq(0)").html(),
			parName=$tmp.children("td:eq(1)").html();
			$.get(url+"categorymanager.canRemoveOrNo",{"categoryNo":parId},function(data){
				if(data=='0'){
					art.dialog({
							 title:'删除类目',
							content: '<div class="art-p-del">请先转移&nbsp;<span>'+parName+'</span>&nbsp;该类目或子类目下所有产品信息：</div></div>',
							fixed: true,
							okVal: '确定',
							background:"#000",
							opacity:"0.3",
							ok: true,
							cancel: true,
							lock:true
						});
				}else{
					art.dialog({
						 title:'删除类目',
						content: '<div class="art-p-del">你确认要把类目：<span>'+parName+'&nbsp;</span>删除吗？</div>',
						fixed: true,
						background:"#000",
						opacity:"0.3",
						ok: function () {
							$.get(url+"categorymanager.deleteCategory",{"categoryNo":parId},function(data){var tmp=data;aReturn(tmp);},"jsonp");
						},
						cancel: true,
						lock:true
					});
				}
			},"jsonp");
	}

	window.movePr= function (obj){
		var $this=$(obj);
		var $tmp=$this.closest("tr");
		var parId=$tmp.children("td:eq(0)").html(),
			parName=$tmp.children("td:eq(1)").html();
		$.get(url+"categorymanager.moveProductTo",{"beforeCategoryNo":parId},function (data){
			var tmp =  '<ul class="c-items">';
			for (var i in data) {
				tmp += '<li class="has-children" name="1"><a id="'+data[i].categoryNo+'" name="'+data[i].isLeafNode+'" href="javascript:" onClick="alast(\'c-item-cur\',\'has-children\',this)" class="c-item-hd">' + data[i].categoryName+ '</a>';
					var tmp2 = "";
					if(typeof(data[i].childNodes)=='object'){
							tmp2 += '<ul class="c-2th-items">';
							for(var j in data[i].childNodes){
								tmp2 +='<li  class="has-children"><a name="'+data[i].childNodes[j].isLeafNode+'" href="javascript:" onClick="alast(\'c-2th-item-cur\',\'has-children\',this)" class="c-2th-item-hd" id="'+data[i].childNodes[j].categoryNo+'">'+data[i].childNodes[j].categoryName+'</a>';
								var tmp3 = "";
								if(typeof(data[i].childNodes[j].childNodes)=='object'){
									tmp3 += '<ul class="th3">';
									for(var k in data[i].childNodes[j].childNodes){
										tmp3 +='<li><a name="'+data[i].childNodes[j].childNodes[k].isLeafNode+'" id="'+data[i].childNodes[j].childNodes[k].categoryNo+'" href="javascript:" class="last-3th" onClick="alast(\'\',\'last-3th\',this)" >'+data[i].childNodes[j].childNodes[k].categoryName+'</a></li>';
									}
									tmp3+='</ul>';
								}
								tmp2+= (tmp3 + "</li>");
							}
							tmp2+='</ul>';
					}
					tmp+= (tmp2 + "</li>");
			}
			tmp+='</ul>';
			$(".hidden-art").html("");
			$(tmp).appendTo(".hidden-art");
			$("ul:empty").parent().addClass("c-2th-item-cur");
			$("ul:empty").remove();
			$(".hidden-art a[name='Y']").before('<input name="RadioGroup" type="radio" />');

			art.dialog({
				 title:'转移产品',
				content: '<div>转移原类目下产品至所选择的新类目下，请选择：</div><div class="a-transfer" id="prSelVal">'+$(".hidden-art").html()+'</div>',
				fixed: true,
				okVal: '保存',
				background:"#000",
				opacity:"0.3",
				ok: function () {
					if($("#prSelVal input:checked").length>0){
						var aselect=$("#prSelVal input:checked").next().attr("id");
						$.get(url+"categorymanager.goMove",{"beforeCategoryNo":parId,"newCategoryNo":aselect},function(data){var tmp=data;aReturn(tmp);},"jsonp");
					}else{
						art.dialog({content: '请选择一个类目！',icon: 'error',fixed: true,time: 1.5});
						return false;
					}
				},
				cancel: true,
				lock:true
			});
		},"jsonp");
	}

});



function alast(mn,pr,obj){
	var $this=$(obj);
	if($this.next().is(":hidden")){
		$this.parent("."+pr).addClass(mn);
	}else{
		$this.parent("."+pr).removeClass(mn);
	}
}

function aReturn(tmp){
	if(tmp==1){
			art.dialog({content: '操作成功！',icon: 'succeed',fixed: true,time: 1.5});
			setTimeout(function(){location.href = location.href;},1500);
		}else if(tmp==0){
			art.dialog({content: '操作失败！',icon: 'error',fixed: true,time: 1.5});
		}else{
			art.dialog({content: '未做任何操作！',fixed: true,time: 1.5});
		}
}
function aReturnT(tmp){
	switch(tmp){
		case 1:
			art.dialog({content: '更新成功！',icon: 'succeed',fixed: true,time: 1.5});
			setTimeout(function(){location.href = location.href;},1500);
			break;
		case 2:
			art.dialog({content: '未作任何修改！',icon: 'csc-warn',fixed: true,time: 1.5});
			break;
		case 3:
			art.dialog({content: '请先删除子类目再设置为末级类目！',icon: 'csc-warn',fixed: true,time: 1.5});
			break;
		case 4:
			art.dialog({content: '请先删除该类目下属性再设置为非末级类目！',icon: 'csc-warn',fixed: true,time: 1.5});
			break;
		default:
			break;
	}
}
function arevise(){
	var $val=$("#aSel select option:selected").attr("value");
	$(".a-rev .a-content").attr("value",$val);
	$(".a-rev").addClass("a-show");
}
function apreserve(){
	var $val=$(".a-rev .a-content").val(),
		  $this=$("#aSel select option:selected");
	$this.html($val).val($val);
	$(".a-rev").removeClass("a-show");
}
function amove(listItem,listObj) {
    if(listItem.value != "") {
        var newOp = new Option();
        newOp.value = listItem.value;
        newOp.text = listItem.value;
        listObj.options[listObj.options.length] = newOp;
        listItem.value = "";
       }
}
function aremove(){
	$("#aSel select option:selected").remove();
}
function amoveUp(){
	var $this=$("#aSel select option:selected");
	var $after=$this.prev();
	$this.insertBefore($after);
}
function amoveDown() {
	var $this=$("#aSel select option:selected");
	var $after=$this.next();
	$this.insertAfter($after);
}
