/*
 * 后台-会员审核管理
 * author: 鲁刚
 * date  : 2013.1.12
 * desc  : 依赖弹出框插件
 */
var url = BASEURL + "bops-app/bops/",
	ck_name = "";

function Resetpwd(btn, pwd) { //重置会员密码
	var btn = $(btn),
		pwd = $(pwd);
	pwd.live("keyup", function() {
		this.value = this.value.replace(/[^_a-zA-Z0-9\d]/g, '');
		btn.prop("disabled", this.value == $(this).data("default") ? true : false);
	});
	btn.on("click", function() {
		var pwdVal = $("#initpwd").val();
		if (pwdVal == "" || pwdVal == null) {
			art.dialog({
				content: '初始密码不能为空！',
				icon: 'warning',
				fixed: true,
				time: 1.5
			});
			pwd.focus();
			return false;
		} else if (pwdVal.length < 6 || pwdVal.length > 20) {
			art.dialog({
				content: '初始密码在6-20个字符之间！',
				icon: 'warning',
				fixed: true,
				time: 1.5
			});
			pwd.focus();
			return false;
		} else {
			$.post(url + "memberManagerPwd.insertPassword", {
				"password": pwdVal
			}, function(data) {
				if (data == 1) {
					art.dialog({
						content: '初始密码已经设置成功！',
						icon: 'succeed',
						fixed: true,
						time: 1.5
					});
				} else {
					art.dialog({
						content: '初始密码设置失败！',
						icon: 'error',
						fixed: true,
						time: 1.5
					});
				}
			}, "jsonp");
		}
	});
}

function mresetPwd(mid) { //会员列表重置密码
	art.dialog({
		id: "resetpwdID",
		title: "提示",
		content: "是否重置此会员的密码？",
		ok: function() {
			$.post(url + "memberManager.updatePassword", {
					"uid": mid
				},
				function(data) {
					if (data < 1) {
						art.dialog({
							content: '初始密码重置失败！',
							icon: 'error',
							fixed: true,
							time: 1.5
						});
					} else {
						art.dialog({
							content: '初始密码重置成功！',
							icon: 'succeed',
							fixed: true,
							time: 1.5
						});
					}
				}, "jsonp")
		},
		okVal: "是",
		cancel: true,
		cancelVal: "否"
	});
}

//会员管理新重置密码相关js
function rstPwdFun(mid, user, loginName) {
	loginName = loginName || user;
	var _html = '<div class="resetpwd-pop">\
				  <table class="resetpwd-tbl">\
					  <tr>\
						  <th width="100">会员账号：</th>\
						  <td width="285"><span class="g-fs-14 jsMmbrName">' + user + '</span></td>\
					  </tr>\
					  <tr>\
						  <th class="jsRstPwdT">重置密码：</th>\
						  <td>&nbsp;</td>\
					  </tr>\
					  <tr>\
						  <td colspan="2" class="rstpwd-td">\
							  <p class="ipt-itm"><input id="rstPwd" name="" type="checkbox" value=""> <label for="rstPwd">重置密码</label> <span class="tip">(用户密码会更改为所设置的原始密码)</span></p>\
						  </td>\
					  </tr>\
					  <tr><td colspan="2" class="line-td"></td></tr>\
					  <tr>\
						  <th class="jsClrInfT">清除信息：</th>\
						  <td>&nbsp;</td>\
					  </tr>\
					  <tr>\
						  <td colspan="2">\
							  <p class="ipt-itm"><input id="clrPhone" name="" type="checkbox" value=""> <label for="clrPhone">清除已验证手机号码</label></p>\
							  <p class="ipt-itm"><input id="clrEmail" name="" type="checkbox" value=""> <label for="clrEmail">清除已验证邮箱</label></p>\
						  </td>\
					  </tr>\
				  </table>\
				  <div class="tips-box">\
					  <p>清除已验证的手机号码或邮箱后，用户需重新验证新的手机或邮箱。</p>\
					  <p>清除已验证手机和邮箱后，用户只能用用户名 <strong style="color:#f00">' + loginName + '</strong> 登录网站。</p>\
				  </div>\
			  </div><input type="hidden" value="" name="checkedOpt" />';

	var dg = art.dialog({
		id: "rstPwdPop",
		fixed: true,
		title: "提示",
		content: _html,
		padding: "0 20px 20px 0",
		init: function() {
			$('.resetpwd-tbl .ipt-itm input[type=checkbox]').change(function() {
				var _this = $(this);
				var _checked = _this.is(':checked');
				var _id = _this.attr('id');
				switch (_id) {
					case "rstPwd":
						if (_checked) {
							$('#clrPhone,#clrEmail').attr('disabled', "disabled");
							$('#clrPhone,#clrEmail').siblings('label').css('color', '#aaa');
							$('.jsClrInfT').css('color', '#aaa');
						} else {
							$('#clrPhone,#clrEmail').removeAttr("disabled");
							$('#clrPhone,#clrEmail').siblings('label').css('color', '#333');
							$('.jsClrInfT').css('color', '#333');
						}
						break;
					default:
						var _schecked = _this.parents('.ipt-itm').siblings().find('input[type=checkbox]').is(':checked');
						if (_checked || _schecked) {
							$('#rstPwd').attr('disabled', "disabled");
							$('#rstPwd').siblings('label').css('color', '#aaa');
							$('.jsRstPwdT').css('color', '#aaa');
						} else {
							$('#rstPwd').removeAttr("disabled");
							$('#rstPwd').siblings('label').css('color', '#333');
							$('.jsRstPwdT').css('color', '#333');
						}
				}
			});
		},
		ok: function() {
			var checkedOpt = $('input[name=checkedOpt][type=hidden]');
			var _checkbox = $('.resetpwd-tbl .ipt-itm input[type=checkbox]:checked');
			var _len = _checkbox.length;
			var _id = "";
			if (_len == 0) {
				art.dialog({
					opacity: .1,
					content: '请选择您需要的操作！',
					icon: 'warning',
					fixed: true,
					lock: true,
					ok: true
				});
				checkedOpt.val("");
				return false;
			}
			if (_len == 1) {
				_id = _checkbox.attr('id');
				switch (_id) {
					case "rstPwd":
						checkedOpt.val(0);
						rstPwdTip('重置密码后，用户密码恢复初始密码，确定要重置吗？', mid, checkedOpt.val());
						break;
					case "clrPhone":
						checkedOpt.val(1);
						rstPwdTip('确定要清除用户所验证的手机号码吗？', mid, checkedOpt.val());
						break;
					case "clrEmail":
						checkedOpt.val(2);
						rstPwdTip('确定要清除用户所验证的邮箱吗？', mid, checkedOpt.val());
						break;
				}
			}
			if (_len > 1) {
				checkedOpt.val(3);
				rstPwdTip('确定要清除用户所验证的手机和邮箱吗？', mid, checkedOpt.val());
			}
			return false;
		},
		okVal: "确定",
		cancel: true,
		cancelVal: "取消"
	});
}

function rstPwdTip(content, mid, val) {
	artDialog.confirm(content, function() {
		var dg = art.dialog({
			id: "rstPwdPop"
		});
		var dg2 = art.dialog({
			opacity: .1,
			content: '提交中...',
			fixed: true,
			lock: true,
			init: function() {
				$.post(url + "memberManager.deleteById", {
					"userId": mid,
					"ban": val
				}, function(data) {
					var _data = parseInt(data);
					if (_data >= 0) {
						dg2.close();
						if (val == 0) {
							art.dialog({
								opacity: .1,
								content: '重置成功！',
								icon: 'succeed',
								fixed: true,
								lock: true,
								time: 2
							});
						} else {
							art.dialog({
								opacity: .1,
								content: '清除成功！',
								icon: 'succeed',
								fixed: true,
								lock: true,
								time: 2
							});
						}
						setTimeout(function() {
							dg.close();
						}, 2100);
					} else {
						dg2.close();
						if (val == 0) {
							art.dialog({
								opacity: .1,
								content: '重置失败！',
								icon: 'succeed',
								fixed: true,
								lock: true,
								time: 2
							});
						} else {
							art.dialog({
								opacity: .1,
								content: '清除失败！',
								icon: 'succeed',
								fixed: true,
								lock: true,
								time: 2
							});
						}
					}

				});
			}
		});
	});
}



function canncelFun(mid) { //取消会员名片墙
	art.dialog({
		id: "cannceID",
		title: "用户名片墙占位取消",
		content: "确认取消该用户的名片墙占位?",
		ok: function() {
			$.post(url + "socialWall.cancelWall", {
					"snsId": mid
				},
				function(data) {
					if (data < 1) {
						art.dialog({
							content: '取消失败！',
							icon: 'error',
							fixed: true,
							time: 1.5
						});
					} else {
						art.dialog({
							content: '取消成功！',
							icon: 'succeed',
							fixed: true,
							time: 1.5,
							close: function() {
								location.href = location.href;
							}
						});
					}
				}, "jsonp")
		},
		okVal: "确定",
		cancel: true,
		cancelVal: "取消"
	});
}

function cardAsc() {
	$('#cardOrder').val('asc').parent().trigger('submit');
}

function cardDesc() {
	$('#cardOrder').val('desc').parent().trigger('submit');
}

//开通会员服务
function servOpen(id) {
	var oid = id,
		tmp, vipVal, startTime, endTime, vipVerify, timeVerify,
		vipErro = '<span class="c-878787"><b class="erro_icon">错误图标</b>请选择会员类型</span>',
		timeErro = '<span class="c-878787"><b class="erro_icon">错误图标</b>请选择服务时间</span>',
		tmp = '<div class="serv-list"><ul><li><span class="sl-th">选择会员类型：</span><span class="sl-td"><select id="vip" name="vip" class="g-d-text"><option value="请选择">请选择</option>memberGroup</select></span></li><li><span class="sl-th">服务时间：</span><span class="sl-td"><input type="text" id="startTime" class="g-d-text" readonly="readonly" /><a class="g-data" href="javascript:"  onclick="WdatePicker({maxDate:\'#F{$dp.$D(\\\'endTime\\\')}\',el:\'startTime\'})"></a><label class="p-l-r-10">到</label><input type="text"  class="g-d-text" id="endTime" readonly="readonly" /><a class="g-data" href="javascript:"  onclick="WdatePicker({minDate:\'#F{$dp.$D(\\\'startTime\\\')}\',el:\'endTime\'})"></a></span></li></ul></div>';
	$.get("memberManager.findEitemList", function(data) {
		var dataList = new Array();
		for (var i in data) {
			if (data[i].code != "pt") dataList[i] = '<option value="' + data[i].code + '">' + data[i].name + '</option>'
		};
		dataList = dataList.join(""); //转换为字符串
		tmp = tmp.replace("memberGroup", dataList); //插入选项

		var isSubmit = false;
		var dg = art.dialog({
			id: "servOpen",
			title: "开通会员服务",
			lock: true,
			background: '#000',
			opacity: 0.6,
			content: tmp,
			ok: function() {
				vipVal = $("#vip option:selected").val();
				startTime = $("#startTime").val();
				endTime = $("#endTime").val();
				if (vipVal == "" || vipVal == "请选择") {
					$("#vip").parent("span").next().remove();
					$("#startTime").parent("span").next().remove();
					$("#vip").parent("span").after(vipErro);
					return false;
				} else if (startTime == "" || endTime == "") {
					$("#vip").parent("span").next().remove();
					$("#startTime").parent("span").next().remove();
					$("#startTime").parent("span").after(timeErro);
					return false;
				} else {
					$("#vip").parent("span").next().remove();
					$("#startTime").parent("span").next().remove();
					if (isSubmit === true) {
						return false;
					}
					isSubmit = true;
					$.post("memberManager.openOrCloesService", {
							"openType": "open",
							"userId": oid,
							"vip": vipVal,
							"startTime": startTime,
							"endTime": endTime
						},
						function(data) {
							if (data.status) {
								location.href = location.href;
							}
						}, "jsonp");
					return false;
				}
			},
			okVal: "确定",
			cancel: true,
			cancelVal: "取消"
		});
	}, "jsonp");
}

//续期企业会员服务
function servRenewal(id, tim) {
	var oid = id,
		tmp, vipVal, startTime, endTime, vipVerify, timeVerify,
		t = tim;
	vipErro = '<span class="c-878787"><b class="erro_icon">错误图标</b>请选择会员类型</span>',
		timeErro = '<span class="c-878787"><b class="erro_icon">错误图标</b>请选择服务时间</span>',
		tmp = '<div class="serv-list"><ul><li><span class="sl-th">选择会员类型：</span><span class="sl-td"><select id="vip" name="vip" class="g-d-text"><option value="请选择">请选择</option>memberGroup</select></span></li><li><span class="sl-th">服务时间：</span><span class="sl-td"><input type="text" id="startTime" class="g-d-text" readonly="readonly" /><a class="g-data" href="javascript:"  onclick="WdatePicker({minDate:\'' + t + '\',disabledDates:[\'' + t + '\'],maxDate:\'#F{$dp.$D(\\\'endTime\\\')||\\\'2020-10-01\\\'}\',el:\'startTime\'})"></a><label class="p-l-r-10">到</label><input type="text"  class="g-d-text" id="endTime" readonly="readonly" /><a class="g-data" href="javascript:"  onclick="WdatePicker({minDate:\'#F{$dp.$D(\\\'startTime\\\')}\',maxDate:\'2020-10-01\',el:\'endTime\'})"></a></span></li></ul></div>';
	$.get("memberManager.findEitemList", function(data) {
		var dataList = new Array();
		for (var i in data) {
			if (data[i].code != "pt") dataList[i] = '<option value="' + data[i].code + '">' + data[i].name + '</option>'
		};
		dataList = dataList.join(""); //转换为字符串
		tmp = tmp.replace("memberGroup", dataList); //插入选项
		art.dialog({
			id: "servOpen",
			title: "续期会员服务",
			lock: true,
			background: '#000',
			opacity: 0.6,
			content: tmp,
			ok: function() {
				vipVal = $("#vip option:selected").val();
				startTime = $("#startTime").val();
				endTime = $("#endTime").val();
				if (vipVal == "" || vipVal == "请选择") {
					$("#vip").parent("span").next().remove();
					$("#startTime").parent("span").next().remove();
					$("#vip").parent("span").after(vipErro);
					return false;
				} else if (startTime == "" || endTime == "") {
					$("#vip").parent("span").next().remove();
					$("#startTime").parent("span").next().remove();
					$("#startTime").parent("span").after(timeErro);
					return false;
				} else {
					$("#vip").parent("span").next().remove();
					$("#startTime").parent("span").next().remove();
					$.post("memberManager.openOrCloesService", {
							"openType": "rollover",
							"userId": oid,
							"vip": vipVal,
							"startTime": startTime,
							"endTime": endTime
						},
						function(data) {
							if (data.status) {
								location.href = location.href;
							}
						}, "jsonp");
				}
			},
			okVal: "确定",
			cancel: true,
			cancelVal: "取消"
		});
	}, "jsonp");
}

//关闭会员服务
function servClose(id, userid, cod, time) {
	var oid = id,
		uId = userid,
		tml = '请填写关闭理由：<input style="height:20px;border:1px solid #ccc;padding:0 2px;" name="remarks" maxlength="100" type="text">',
		cod = cod,
		time = time;
	art.dialog({
		id: "servOpen",
		title: "关闭会员服务",
		lock: true,
		background: '#000',
		opacity: 0.6,
		content: tml,
		ok: function() {
			var remarksVal = $("input[name=remarks]").val();
			if (remarksVal != "") {
				$.post("memberManager.openOrCloesService", {
					"openType": "close",
					"id": oid,
					'userId': uId,
					"remarks": remarksVal,
					"code": cod,
					"startTime": time
				}, function(data) {
					if (data.status) {
						location.href = location.href;
					}
				}, "jsonp");
			} else {
				$("input[name=remarks]").css("background-color", "#F3A3A3");
				return false;
			}
		},
		okVal: "确定",
		cancel: true,
		cancelVal: "取消"
	});
}

//种子用户开通与关闭
function seedOpen(me, id, code, name) {
	var $this = $(me),
		id = id,
		code = code,
		name = name;
	if ($this.is(":checked")) {
		art.dialog({
			id: "servOpen",
			title: "开通" + name + "服务",
			lock: true,
			background: '#000',
			opacity: 0.6,
			content: "确定要开通" + name + "吗？",
			ok: function() {
				$.post("memberManager.openOrCloesEServe", {
						"userId": id,
						"code": code,
						"name": name,
						"openType": 1
					},
					function(data) {
						if (data.status) {
							location.href = location.href;
						}
					}, "jsonp");
			},
			okVal: "确定",
			cancel: function() {
				$this.attr("checked", false);
			},
			cancelVal: "取消"
		});
	} else {
		art.dialog({
			id: "servOpen",
			title: "关闭" + name + "服务",
			lock: true,
			background: '#000',
			opacity: 0.6,
			content: "确定要关闭" + name + "吗？",
			ok: function() {
				$.post("memberManager.openOrCloesEServe", {
						"userId": id,
						"code": code,
						"name": name,
						"openType": 0
					},
					function(data) {
						if (data.status) {
							location.href = location.href;
						}
					}, "jsonp");
			},
			okVal: "确定",
			cancel: function() {
				$this.attr("checked", true);
			},
			cancelVal: "取消"
		});
	}
}


//个人会员的模糊查询
function searchPersonalMember() {
		var searchVal = document.getElementById("searchname").value;
		var searchId = $("#searchId").val();
		if (searchVal == "" || searchVal == null) {
			art.dialog({
				content: '请输入搜索条件！',
				icon: 'csc-warn',
				fixed: true,
				time: 1.5
			});
		} else {
			window.location.href = "memberManager.findPersonal?searchname=" + searchVal + "&searchType=" + searchId;
		}
	}
	//日期搜索
function searchByTime(pr) {
		var st = $("#startTime").val(),
			et = $("#endTime").val();
		if ((st != "" && st != null) || (et != "" && et != null)) {
			if (pr == "pe") {
				window.location.href = "memberManager.findPersonal?startdate=" + st + "&enddate=" + et;
			} else {
				window.location.href = "memberManager.findPersonal?startdate=" + st + "&enddate=" + et;
			}
		}
	}
	//跳转到详细页,个人会员
function personalMember(listtest, id,type) {
		type=type?type:'';
		$("form[action='memberManager.personalDetail']").attr("action", "memberManager.personalDetail?uuid=" + id + "&listtest=" + listtest+ "&closeType=" + type).trigger("submit");
	}
	//跳转到详请页，企业会员
function enterpriseMember(listtest, id,type) {
	type=type?type:'';
	$("form[action='memberManager.enterpriseDetail']").attr("action", "memberManager.enterpriseDetail?uuid=" + id + "&listtest=" + listtest+ "&closeType=" + type).trigger("submit");
}

//详情页模板
function dateTemplate(data) {
	var code = data.code;
	$.each(data, function(i, item) {
		if (i == 'evip') {
			if (item == "") {
				item = '会员类型：';
			} else {
				item = '会员类型：' + item;
			}
		}
		if (i == 'startTime') {
			if (item == "") {
				item = '开通时间：';
			} else {
				item = '开通时间：' + item;
			}
		}
		if (i == 'endTime') {
			if (item == "") {
				item = '到期时间：';
			} else {
				item = '到期时间：' + item;
			}
		}
		if (i == 'keyWord') {
			if (item == "") {
				item = '关键词：';
			} else {
				item = '关键词：' + item;
			}
		}
		if (i == 'productId') {
			if (item == "") {
				item = '绑定产品ID：';
			} else {
				item = '绑定产品ID：' + item;
			}
		}
		if (i == 'keyWordEndTime') {
			if (item == "") {
				item = '到期时间：';
			} else {
				item = '到期时间：' + item;
			}
		}
		if (i == 'imgUrl' || i == 'userImgUrl') {
			if (item == "") {
				item = '';
			} else {
				item = '<a href="http://img.csc86.com' + item + '" class="highslide"><img src="http://img.csc86.com' + item + '" width="45" height="45" /></a>';
			}
		}
		if (i == "submain") {
			if (item == "") {
				item = '&nbsp;';
			} else {
				item = '<a href="http://' + item + '.csc86.com/" target="_blank">http://' + item + '.csc86.com/</a>';
			}
		}
		if (i == "workList") {
			var tmp = '';
			for (var j in item) {
				if ($.trim(item[j]["company"]).length > 0 && $.trim(item[j]["section"]).length > 0 && $.trim(item[j]["post"]).length > 0 && $.trim(item[j]["startTime"]).length > 0 && $.trim(item[j]["endTime"]).length > 0) {
					tmp += '<tr><th>公司名称：</th><td>' + item[j]["company"] + '</td></tr>';
					tmp += '<tr><th>部门：</th><td>' + item[j]["section"] + '</td></tr>';
					tmp += '<tr><th>职位：</th><td>' + item[j]["post"] + '</td></tr>';
					tmp += '<tr><th>工作时间：</th><td>' + item[j]["startTime"] + ' 到 ' + item[j]["endTime"] + '</td></tr>';
				}
			}
			if (tmp.length > 0) {
				item = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="at-look">' + tmp + '</table>';
			} else {
				item = '';
			}
		}
		if (i == 'giveList') {
			var _item = '';
			$("#" + i).empty();
			if (item == "null" || item == "[]" || item == "") {
				item = ''
			} else {
				item = eval(item);
				for (var j in item) {
					var items = '<span class="block">关键词：' + item[j]['keyWord'] + '</span><span class="block">绑定产品ID：' + item[j]['productId'] + '</span><span class="block">到期时间：' + item[j]['endTime'] + '</span><span class="block g-h-05">&nbsp;</span>';
					//					if(item[j]['starts']==1){
					//						items = items.replace('star','<b class="icon-y-star"></b><b class="icon-d-star"></b><b class="icon-d-star"></b>');
					//					}else if(item[j]['starts']==2){
					//						items = items.replace('star','<b class="icon-y-star"></b><b class="icon-y-star"></b><b class="icon-d-star"></b>');
					//					}else if(item[j]['starts']==3){
					//						items = items.replace('star','<b class="icon-y-star"></b><b class="icon-y-star"></b><b class="icon-y-star"></b>');
					//					}
					_item += items;
				}
				if (_item.length > 0) {
					item = _item;
				} else {
					item = '';
				}
			}
		}
		if (i == 'useWord') {
			if (code == 'vip') {
				if (item == '' || item == '[]' || item == null) {
					item = ''
				} else {
					item = '<span class="block"><strong>VIP赠送排名8个，已使用' + item + '个：</strong></span>';
				}
			} else if (code == 'cst') {
				if (item == '' || item == '[]' || item == null) {
					item = '';
				} else {
					item = '<span class="block"><strong>成商通赠送排名2个，已使用' + item + '个：</strong></span>';
				}
			} else {
				item = '';
			}
		}
		if (i == 'paidWord') {
			if (item == 0 || item == '' || item == '[]' || item == 'null') {
				item = ''
			} else {
				item = '<span class="block"><strong>付费排名' + item + '个：</strong></span>';
			}
		}
		if (i == 'paidList') {
			var _item = '';
			$("#" + i).empty();
			if (item == null || item == [] || item == "") {
				item = ''
			} else {
				item = eval(item);
				for (var j in item) {
					var items = '<span class="block">关键词：' + item[j]['keyWord'] + '&nbsp;&nbsp;' + item[j]['charge'] + '</span><span class="block">绑定产品ID：' + item[j]['productId'] + '</span><span class="block">到期时间：' + item[j]['endTime'] + '</span>';
					_item += items;
				}
				if (_item.length > 0) {
					item = _item;
				} else {
					item = '';
				}
			}
		}
		if (i == 'eServeList') {
			var _item = '';
			$("#" + i).empty();
			if (item == '[]' || item == '' || item == 'null') {
				item = ''
			} else {
				item = eval(item);
				for (var j in item) {
					var items = '<li>' + item[j].name + '</li>';
					_item += items;
				}
				if (_item.length > 0) {
					item = _item;
				} else {
					item = '';
				}
			}
		}
		if (i == 'evipList') {
			$("#" + i).empty();
			if (item == "[]" || item == "") {
				item = '';
			} else {
				item = eval(item);
				for (var j in item) {
					var _item = '<li>' + item[j]['startTime'] + '-' + item[j]['endTime'] + '<span class="m-l-20">' + item[j]['name'] + '</span>' + '</li>';
					$("#" + i).append(_item);
				}
			}
		} else {
			$("#" + i).empty().html(item);
		}
	});
	ImgZoomFun("a.highslide");
}

//下一条
function nextId() {
	if (tmpList.listtest == (tmpList.total - 1)) {
		art.dialog({
			content: "当前已是最后一条！",
			icon: 'error',
			fixed: true,
			time: 1.5
		});
		return;
	}
	var
		url = {
			"E": "memberManager.nextEnterpriseDetail",
			"P": "memberManager.nextPersonalDetail"
		},
		id = location.pathname.indexOf("enterpriseDetail") > 0 ? "E" : "P";
	
	var toUrl='';
	switch($('input[name=closeType]').val()){
		case 'Q':
		toUrl="memberManager.findEnterpriseTo10";
		break;
		case 'G':
		toUrl="memberManager.findPersonalTo10";
		break;
		case 'k':
		toUrl="memberManager.findEnterpriseTo10"
		break;
		case 'GYS':
		toUrl="memberManager.findSupplierTo10";
		break;
		default:
		toUrl="memberManager.findBuyerListTo10"
		break;
	}
		
	if (tmpList.listtest == tmpList.lastsize) {
		var data = {};
		$("div.index-look").find("input").each(function(i, item) {
			var $item = $(item);
			data[$item.attr("name")] = $.trim($item.val());
		});
		data['pageindex'] = tmpList['pageindex'];
		$.ajax({
			//url: id == "E" ? "memberManager.findEnterpriseTo10" : "memberManager.findPersonalTo10",
			url:toUrl,
			data: data,
			async: false,
			success: function(data) {
				var tmp = {};
				for (var i in data) {
					tmp[data[i]['listtest']] = data[i][id == "E" ? 'tempId' : 'uuid'];
				}
				tmpList['data'] = tmp;
				tmpList.lastsize = tmpList.lastsize + data.length;
				tmpList.pageindex += 1;
				tmpList.listtest += 1;
				$.post(url[id], {
					"uuid": tmpList['data'][tmpList.listtest]
				}, function(data) {
					dateTemplate(data[id == "E" ? 'enterpriseDetail' : 'personalDetail']);
				}, "jsonp");
			},
			dataType: "jsonp"
		});
	} else {
		tmpList.listtest += 1;
		$.post(url[id], {
			"uuid": tmpList['data'][tmpList.listtest]
		}, function(data) {
			dateTemplate(data[id == "E" ? 'enterpriseDetail' : 'personalDetail']);
		}, "jsonp");
	}
}

//why 企业会员详情页_下一页按钮;
//function nextId__(){
//	var list_url = "memberManager.findEnterprise";
//	var list_reg = setURL_argument({"uuid":""}).replace("/^\?*/","");
//	var id = "";
//
//	var nexturl = setURL_argument({"uuid":id,"ck_name":ck_name});
//	window.location.href = nexturl;
//	alert(list_reg);
//}

function gethc(url, calback) {
		$.get(ulr, function(data) {
			if (typeof(calback) == "function") {
				calback(data);
			}
		})
	}
	//处理HTML,得到缓存
function gethc(html) {

	}
	//企业会员页面的模糊查询
function searchEnterpriseMember() {
		var searchVal = document.getElementById("searchname").value;
		var searchId = $("#searchId").val();
		if (searchVal == "" || searchVal == null) {
			art.dialog({
				content: '请输入搜索条件！',
				icon: 'csc-warn',
				fixed: true,
				time: 1.5
			});
		} else {
			window.location.href = "memberManager.findEnterprise?searchname=" + searchVal + "&searchType=" + searchId;
		}
	}
	//日期搜索
function searchByTime(pr) {
	var st = $("#startTime").val(),
		et = $("#endTime").val();
	if ((st != "" && st != null) || (et != "" && et != null)) {
		if (pr == "pe") {
			window.location.href = "memberManager.findPersonal?startdate=" + st + "&enddate=" + et;
		} else {
			window.location.href = "memberManager.findEnterprise?startdate=" + st + "&enddate=" + et;
		}
	}
}

function dateClearVal() {
	$("#tradeId").val("");
	$("#searchname").val("");
	$("#search").submit();
}

function searchClearVal() {
		$("#tradeId").val("");
		$("#startTime").val("");
		$("#endTime").val("");
		$("#search").submit();
	}
	//主营行业搜索
function searchByTrade() {
		var
			$trade = $("#tradeId"),
			name = $trade.attr("name")
		val = $.trim($trade.val());
		$("#searchname").val("");
		$("#startTime").val("");
		$("#endTime").val("");
		if (val.length > 0 && val != defaultData[name]) {
			$trade.closest("form").trigger("submit");
		}
	}
	//分页搜索
function mjumper(obj) {
	var pg = $(obj).prev().val(),
		pgMt = $(".page-r strong").html();
	if (pg == null || pg == "") {
		art.dialog({
			content: '请输入页码数！',
			fixed: true,
			time: 1.5
		});
	} else if (parseInt(pg) > parseInt(pgMt)) {
		art.dialog({
			content: pg + ' 大于实际页码数 ' + pgMt,
			fixed: true,
			time: 1.5
		});
	} else {
		$url = window.location.href.replace(/pageindex=\d+/, "pageindex=" + pg);
		if ($url.indexOf('pageindex') == -1 && $url.indexOf('?') == -1) {
			$url = $url + "?pageindex=" + pg;
		} else if ($url.indexOf('pageindex') == -1) {
			$url = $url + "&pageindex=" + pg;
		}
		window.location.href = $url;
	}
}

function mpageKeyDown(e, obj) { //页面跳转
	var e = e || event;　
	var currKey = e.keyCode || e.which || e.charCode;　
	if (currKey == 13) {
		var $id = $(obj).attr("id");
		var pg = document.getElementById($id).value;
		var pgMax = $(".page-r strong").html();
		if (pg == null || pg == "") {
			art.dialog({
				content: '请输入页码数！',
				fixed: true,
				time: 1.5
			});
		} else if (pg > pgMax) {
			art.dialog({
				content: '输入页码数大于实际页码数！',
				fixed: true,
				time: 1.5
			});
		} else {
			/*if(pr=="pr"){
				window.location.href="verifymanage.findPersonal?verifystate="+tmp+"&pageindex="+pg;
			}else{
				window.location.href="verifymanage.findEnterprise?verifystate="+tmp+"&pageindex="+pg;
			}*/
			var $url = window.location.href.replace(/pageindex=\d+/, "pageindex=" + pg);
			if ($url.indexOf('pageindex') == -1 && $url.indexOf('?') == -1) {
				$url = $url + "?pageindex=" + pg;
			} else if ($url.indexOf('pageindex') == -1) {
				$url = $url + "&pageindex=" + pg;
			}
			window.location.href = $url;
		}
	}
}


//上一页，下一页
/*
函数用途：更据当前URL返回指定页的URL （保留当前URL中的其他参数）
用法 getnewpageurl("页码参数的参数名"，第几页[数字])
返回 URL 地址；

function getnewpageurl(pagename,num){//
	var url;
	var paraString = location.search;
	var reg = new RegExp('\\b' + pagename + '=\\d+',"")
	if(paraString.indexOf("?")<=-1){ paraString += "?"; }
	if(reg.test(paraString)){
		paraString = paraString.replace(reg,pagename + "=" + num);
	}else{
		paraString += /\?$/.test(paraString) ? "" : "&";
		paraString += pagename + "=" + num;
	}
	return location.href.split("?")[0] + paraString;
}*/

function toPrevious() //前一页
	{
		var $page = $("#page"),
			$cur = $("#page").find("input[name='pageindex']"),
			index = parseInt($.trim($cur.val()));
		if (index == 1) {
			art.dialog({
				content: '已经是第一页!',
				fixed: true,
				time: 1.5
			});
		} else {
			$("#inputpage").css("color", "#fff").val(index - 1);
			$page.trigger("submit");
		}
	}

function toNext() //下一页
	{
		var $page = $("#page"),
			$cur = $("#page").find("input[name='pageindex']"),
			index = parseInt($.trim($cur.val())),
			total = parseInt($.trim($("#pagetotal").html()));
		if (index == total) {
			art.dialog({
				content: '已经是最后一页!',
				fixed: true,
				time: 1.5
			});
		} else {
			$("#inputpage").css("color", "#fff").val(index + 1);
			$page.trigger("submit");
		}
	}

function goPage(f) {
	var
		$f = $(f),
		inputpage = $.trim($f.find("[name='inputpage']").val()),
		msg = '';
	if (inputpage.length == 0) {
		msg = '请输入页码数！';
	}
	if (/^0+$/.test(inputpage)) {
		msg = '页码数不能为0！';
	}
	if (parseInt(inputpage) > parseInt($("#pagetotal").html())) {
		msg = '输入页码数大于实际页码数！';
	}
	if (msg.length > 0) {
		art.dialog({
			content: msg,
			fixed: true,
			time: 1.5
		});
		return false;
	} else {
		$f.find("[name='pageindex']").val(inputpage);
		$f.find("[name='inputpage'],[name='total']").removeAttr("name");
	}
}

function goback(tag, tmp) { //返回列表页
	tag_str = {
		"Q": "memberManager.findEnterprise",
		"G": "memberManager.findPersonal",
		"k": "memberManager.getEnterpriseService",
		"GYS":"memberManager.listSupplier",
		"CGS":"memberManager.findBuyer"
	};
	var $indexLook = $("div.index-look");
	$indexLook.find("[name='lastsize']").removeAttr("name");
	$indexLook.wrap('<form method="get" action="' + tag_str[tag] + '"></form>').parent().append('<input name="ban" type="hidden" value="' + tmp + '" />').trigger("submit");
}

//显/隐 初始化密码;
function showpwd(obj) {
	var
		o = $(obj),
		pwd = $("#initpwd").val(),
		defaultVal = $("#initpwd").data("default");
	if (o.attr("checked")) {
		$("#initpwd").replaceWith('<input id="initpwd" value="' + pwd + '" type="text" style="width:150px;" data-default="' + defaultVal + '" />');
	} else {
		$("#initpwd").replaceWith('<input id="initpwd" value="' + pwd + '" type="password" style="width:150px;" data-default="' + defaultVal + '" />');
	}
};

function setURL_argument() { //修改、添加,删除URL参数
	var set = function(key, val, url_) {
		var url = url_ || location.href;
		if (url.indexOf("?") <= -1) {
			url += "?";
		};
		var paraString = url.substring(url.indexOf("?") + 1, url.length),
			key = key || "",
			val = val || "";
		if (key == "") {
			return url.replace(/\?*\s*$/, "")
		};
		var reg = new RegExp('\\b' + key + '=[^&]*', "");
		if (reg.test(paraString) && val !== "") { //值不为空，则替换
			paraString = paraString.replace(reg, key + "=" + val);
		} else if (reg.test(paraString) && val == "") { //值为空，则删除
			paraString = paraString.replace(reg, "");
		} else if (val !== "") { //没有则添加
			paraString += "&" + key + "=" + val;
		}
		paraString = paraString.replace(/(^&*|&*$|&*(?=&))/g, "")
		return url.split("?")[0] + (paraString == "" ? "" : "?" + paraString);
	}
	if (typeof(arguments[0]) == "string") {
		return set.apply(this, arguments);
	} else if (typeof(arguments[0]) == "object") {
		var arg = arguments[0],
			url = arguments[1] || location.href;
		for (aaa in arg) {
			url = set(aaa, arg[aaa], url);
		};
		return url;
	} else {
		return location.href;
	}
}

//获取URL参数值；
function getURL_argument(kdy) { //JS获取URL参数
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {}
	for (i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[kdy.toLowerCase()];
	if (typeof(returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
};

function setCookie(c_name, value, expiredays) { //设置Cookie值 键名,值,保存时长(天)
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == 0) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
};

function defaultVal() { //页面中的隐藏域赋值
	var data = location.search.slice(1).split("&");
	window.defaultData = {};
	for (var i = 0; i < data.length; i++) {
		var tmp = data[i].split("="),
			val = $.trim(decodeURIComponent(tmp[1])).replace(/[\+]/g, " ");
		defaultData[tmp[0]] = val;
		if (val.length > 0) {
			$("[name='" + tmp[0] + "']").val(val);
		}
	}
}

function clearUrl() { //清除表单提交时为空的值
	$("form").live("submit", function() {
		var tmp = $(this).find("[name!='inputpage']");
		for (var i = 0; i < tmp.length; i++) {
			$.trim(tmp[i].value).length > 0 || $(tmp[i]).removeAttr("name");
		}
	});
}

//种子用户会员筛选
function uServiceFilter() {
	var
		$id = $(".s-filter li input");
	$id.bind("click", function() {
		var $t = $(this);
		if ($t.is(":checked")) {
			$t.val(1);
		} else {
			$t.val(0);
		}
		$t.closest("form").trigger("submit");
	});
}

//会员禁用
var refM_arr = [
	"请上传代表您个人形象的图片",
	"严禁上传淫秽、低俗、反动等违禁图片",
	"填写您的真实姓名",
	"严禁填写国家违禁产品名称",
	"请填写正确的手机号码",
	"请填写正确的电子邮箱",
	"请填写正确的固定电话号码",
	"请填写正确的传真号码",
	"联系地址必须填写正确、完整的地址",
	"请填写正确的公司名称",
	"请填写正确的部门",
	"请填写正确的职位",
	"工作经历栏不能填写与您工作经历无关的内容"
];

var refM = getref_html(refM_arr);

function getref_html(res) {
	var html;
	html = '<div class="ly-d-art"><p>请选择或输入禁用理由:</p>';
	for (i = 0; i < res.length; i++) {
		html += '<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="' + res[i] + '">' + (i + 1) + '、' + res[i] + '</p>'
	}
	html += '</div>';
	html += '<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';
	return html;
};

//添充禁用理由
function selVal(tmp) {
		$(".test-focus").find(".test-lay").remove();
		var ly = $("#testVal").val(),
			addstr = tmp.value.replace(/[\.,;!。，；！、]\s*$/, "");;
		if ($(tmp).attr("checked")) {
			if ($.trim(ly) != "" && !(/[；。！，!,\.;!]\s*$/ig.test(ly))) {
				ly += "；";
			}
			ly += addstr;
			if (!/[；。！，!,\.;!]\s*$/ig.test(addstr)) {
				ly += "；";
			}
		} else { //删除己选的拒绝理由(tmp为checkbox时有效);
			var reg = new RegExp($.trim(addstr) + "(\s*；\s*)*");
			ly = ly.replace(reg, "");
		}
		$("#testVal").val(ly);
	}
	//限制禁用理由长度
function maxLength(text, num) {
	var num = num || 2000;
	return text.length <= num ? true : false;
}

function verifyReason(text, id) {
	if (text.length == 0) {
		aReturn(0, "", "请选择或输入理由");
		return false;
	} else if (text.length <= 5) {
		aReturn(0, "", "理由少于5个字符");
		return false;
	}
	var id = id || "#testVal",
		$id = $(id);
	if (maxLength(text)) {
		$id.next("p.error-msg").remove();
		return true;
	} else {
		$id.next().is("p.error-msg") ? '' : $id.after('<p class="error-msg" style="position:absolute;margin-top:-2px;color:#f00">输入了超过2000个字符数限制</p>');
		return false;
	};
}

function disMember(obj, tmp, pr) { //个人会员禁用
	var selT = $(obj).parent("td.e-cent").siblings(".list-id").children("input").attr("value");
	mvDel_s_pr("memberManager.updatePersonalState", selT, refM, tmp);
}

function mvDel_s_pr(href, valT, ref, tmp) {
	art.dialog({
		title: "禁用理由",
		content: ref,
		fixed: true,
		okVal: '保存',
		background: "#000",
		opacity: "0.3",
		ok: function() {
			var textVal = document.getElementById("testVal").value;
			if (verifyReason(textVal, "#testVal")) {
				$.get(url + href, {
					"id": valT,
					"ban": tmp,
					"reason": textVal
				}, function(data) {
					aReturn(data, "操作成功！", "操作失败！");
				}, "jsonp");
			} else {
				return false;
			}
		},
		init: function() {
			$(".test-focus").click(function() {
				$(this).children(".test-lay").remove();
			});
		},
		cancel: true,
		lock: true
	});
}

function aReturn(tmp, po, pt, ap) {
	if (tmp == 0) {
		art.dialog({
			content: pt,
			icon: 'error',
			fixed: true,
			time: 1.5
		});
	} else if (tmp == -1) {
		art.dialog({
			content: ap,
			icon: 'error',
			fixed: true,
			time: 1.5
		});
	} else {
		art.dialog({
			content: po,
			icon: 'succeed',
			fixed: true,
			time: 1.5
		});
		setTimeout(function() {
			location.href = location.href;
		}, 1500);
	}
}

function undisMember(obj, str, reason) { //个人会员解禁
	var selT = $(obj).parent("td.e-cent").siblings(".list-id").children("input").attr("value");
	art.dialog({
		id: "undisMemberId",
		title: "解禁会员",
		content: "确定解禁此会员？",
		ok: function() {
			$.get(url + "memberManager.updatePersonalState", {
				"id": selT,
				"ban": str,
				"reason": ""
			}, function(data) {
				aReturn(data, '操作成功！', '操作失败！')
			}, "jsonp");
		},
		okVal: "是",
		cancel: true,
		cancelVal: "否"
	});

}

function showDetail(listtest, id, tmp,type) { //查看详情
	type=type?type:'';
	var $form = $("form[action^='memberManager.personalDetail']");
	$form.attr("action", $form.attr("action") + "?uuid=" + id + "&listtest=" + listtest + "&ban=" + tmp+"&closeType=" + type).trigger("submit");
}

$(function() {
	//Resetpwd("#subinitpwd","#initpwd");
	if (getURL_argument("ck_name") != "") {
		ck_name = getURL_argument("ck_name");
	} else {
		ck_name = "hc_" + Math.random(1);
	}
	defaultVal();
	clearUrl();
	uServiceFilter();

	//在线交易管理
	$('.rdo-btn').on('change', 'input', function() {
		var $this = $(this);
		var $defualtiInput = $this.parent().siblings('label').find('input')
		var $checked = $this.prop('checked');
		var $val = $this.val();
		var $memberid = $this.attr('memberid');
		var $title = null;
		var $msg = null;
		var $succeed = null;
		var $error = null;
		if ($val == 'Y') {
			$title = '开通服务';
			$msg = '确认开通此商家的在线交易服务？';
			$succeed = '开通成功！';
			$error = '开通失败！';
		} else {
			$title = '关闭服务';
			$msg = '<p>关闭理由：</p><textarea name="" id="reason" style="height: 100px;width: 240px;margin-top: 10px;"></textarea>';
			$succeed = '关闭成功！';
			$error = '关闭失败！';
		}
		var Tips = function(msg, title) {
			art.dialog({
				id: "tips",
				title: title,
				content: msg,
				time: 2,
				icon: 'csc-tip'
			});
		}
		art.dialog({
			id: "tips",
			title: $title,
			content: $msg,
			fixed: true,
			lock: true,
			opacity:0.2,
			ok: function() {
				var $reason = $('#reason'),
					len = $reason.length,
					$reasonVal = $.trim($reason.val()),
					$url = null;
				if (len > 0) {
					if (!$reasonVal||$reasonVal.length>50) {
						art.dialog({
							content: '请输入关闭原因，50个字符以内！',
							icon: 'csc-tip',
							fixed: true,
							lock:true,
							opacity:0,
							time:2,
							padding:'20px 25px 20px 10px'
						});
						return false;
					}
					$url = 'http://bops.csc86.com/bops-app/bops/memberManager.openOrClosePayService?status=' + $val + '&memberId=' + $memberid + '&reason=' + $reasonVal;
				} else {
					$url = 'http://bops.csc86.com/bops-app/bops/memberManager.openOrClosePayService?status=' + $val + '&memberId=' + $memberid
				}

				$.get($url, function(data) {
					var $statuscode = data.statuscode;
					switch ($statuscode) {
						case '0':
							Tips($succeed, '提示');
							window.location.reload();
							break;
						case '1':
							Tips('status为空！', '提示');
							$defualtiInput.prop('checked', true);
							break;
						case '2':
							Tips('memberId为空！', '提示');
							$defualtiInput.prop('checked', true);
							break;
						case '3':
							Tips($error, '提示');
							$defualtiInput.prop('checked', true);
							break;
						case '4':
						    Tips('操作失败！', '提示');
							$defualtiInput.prop('checked', true);
					}
				}, 'jsonp')
			},
			okVal: "确认",
			cancel: function() {
				$defualtiInput.prop('checked', true);
			},
			cancelVal: "取消"
		});
	});
});