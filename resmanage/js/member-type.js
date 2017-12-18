/*
* 后台-会员类型管理
* author: 鲁刚
* date  : 2013.12.16
*/
var url =BASEURL+"bops-app/bops/",ck_name = "";

function ynblank(val){//验证是否为空
	if($.trim(val)=="" || $.trim(val) == "undefined"){return false;}else{return true;}
}
function repeatVal($this,id,type,code){
	var $this = $($this) , $saveBtn = $("#saveType"),
		$thisVal = $this.val(),
		loading = '<label class="ml-10"><b class="ico-loading"></b></label>',
		errTxt = '<label class="ml-10 c-f00">不能为空！</label>',
		yes = '<label class="ml-10 c-39f">可以使用</label>',
		no = '<label class="ml-10 c-f00">已被占用</label>',
		hid = '<input class="vhid" type="hidden">',
		thisVal = ynblank($thisVal);
	if(!thisVal){$this.nextAll().remove();$this.after(errTxt);return false;}
	if(type=="G"){
		if(code=="name"){
			$.ajax({
				url:"memberType.checkByName",
				type:"POST",
				data:{"id":id,"name":$thisVal,"type":type},
				dataType:"jsonp",
				async:false,
				beforeSend: function(data){
					$this.nextAll().remove();
					$this.after(loading);
					$this.attr("readonly","");
					$saveBtn.attr("disabled",true);
				},
				success: function(data){
					$this.nextAll().remove();
					$this.removeAttr("readonly");
					$saveBtn.removeAttr("disabled");
					if(!data.status){$this.after(yes); return true;}
					else {$this.after(no+hid); return false;}
				}
			});
		}else{
			$.ajax({
				url:"memberType.checkByCode",
				type:"POST",
				data:{"id":id,"code":$thisVal,"type":type},
				dataType:"jsonp",
				async:false,
				beforeSend: function(data){
					$this.nextAll().remove();
					$this.after(loading);
					$this.attr("readonly","");
					$saveBtn.attr("disabled",true);
				},
				success: function(data){
					$this.nextAll().remove();
					$this.removeAttr("readonly");
					$saveBtn.removeAttr("disabled");
					if(!data.status){$this.after(yes); return true;}
					else {$this.after(no+hid); return false;}
				}
			});
		}
	}else if(type=="S"){
		if(code=="name"){
			$.ajax({
				url:"memberType.checkByName",
				type:"POST",
				data:{"id":id,"name":$thisVal,"type":type},
				dataType:"jsonp",
				async:false,
				beforeSend: function(data){
					$this.nextAll().remove();
					$this.after(loading);
					$this.attr("readonly","");
					$saveBtn.attr("disabled",true);
				},
				success: function(data){
					$this.nextAll().remove();
					$this.removeAttr("readonly");
					$saveBtn.removeAttr("disabled");
					if(!data.status){$this.after(yes); return true;}
					else {$this.after(no+hid); return false;}
				}
			});
		}else{
			$.ajax({
				url:"memberType.checkByCode",
				type:"POST",
				data:{"id":id,"code":$thisVal,"type":type},
				dataType:"jsonp",
				async:false,
				beforeSend: function(data){
					$this.nextAll().remove();
					$this.after(loading);
					$this.attr("readonly","");
					$saveBtn.attr("disabled",true);
				},
				error: function(msg){alert(msg);return false;},
				success: function(data){
					$this.nextAll().remove();
					$this.removeAttr("readonly");
					$saveBtn.removeAttr("disabled");
					if(!data.status){$this.after(yes); return true;}
					else {$this.after(no+hid); return false;}
				}
			});
		}
	}
}

function verifyAddMemGroup(){
	var $verUl = $("#verUl") , errTxt = '<label class="ml-10 c-f00">请填写会员组名称！</label>',errTxt2 = '<label class="ml-10 c-f00">请填写会员组标识！</label>',
		$name = $("input[name=name]"),$nameval = $name.val(),nameVal = ynblank($nameval),
		$code = $("input[name=code]"),$codeval = $code.val(),codeVal = ynblank($codeval);
	if(!nameVal || !codeVal){
		if(!nameVal){
			$name.nextAll().remove();
			$name.after(errTxt);
		}if(!codeVal){
			$code.nextAll().remove();
			$code.after(errTxt2);
		}
		return false;
	}else{
		var hidlength = $verUl.find(".vhid").length;
		if(hidlength>=1){return false;}
	}
};