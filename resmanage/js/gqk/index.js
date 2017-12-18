var alreadyMatchingInquiry = function(id) { //已匹配的询盘
	$.get("qualityProducts.alreadyMatchingInquiry?productId=" + id, function(data) {
		var item = '';
		for (i in data) {
			var j = parseInt(i) + 1;
			if (i % 2 == 0) {
				item += '<tr>' +
					'<td class="list-id">' + j + '</td>' +
					'<td>' + data[i].memberName + '</td>' +
					'<td>' + data[i].inquiryName + '</td>' +
					'<td>' + data[i].companyName + '</td>' +
					'<td>' + (data[i].imgUrl == "" ? '&nbsp;' : '<span class="inquiry-fj"><b>' + data[i].imgUrl + '</b></span>') + '</td>' +
					'<td>' + data[i].addTime + '</td>' +
					'<td>' + data[i].purchaseNumber + '</td>' +
					'<td>' + data[i].matchOrigin + '</td>' +
					'<td>' + data[i].matchTime + '</td>' +
					'<td>' + data[i].typeAndScope + '</td>' +
					'<td><a href="audinquiry.getDetailedInformation?inquiryId=' + data[i].id + '&tag=yzb&page=1&startTime=&keyWord=&endTime=&line=1" class="g-ico ico-see-children">查看详情</a></td>' +
					'</tr>';
			} else {
				item += '<tr class="bg">' +
					'<td class="list-id">' + j + '</td>' +
					'<td>' + data[i].memberName + '</td>' +
					'<td>' + data[i].inquiryName + '</td>' +
					'<td>' + data[i].companyName + '</td>' +
					'<td>' + (data[i].imgUrl == "" ? '&nbsp;' : '<span class="inquiry-fj"><b>' + data[i].imgUrl + '</b></span>') + '</td>' +
					'<td>' + data[i].addTime + '</td>' +
					'<td>' + data[i].purchaseNumber + '</td>' +
					'<td>' + data[i].matchOrigin + '</td>' +
					'<td>' + data[i].matchTime + '</td>' +
					'<td>' + data[i].typeAndScope + '</td>' +
					'<td><a href="audinquiry.getDetailedInformation?inquiryId=' + data[i].id + '&tag=yzb&page=1&startTime=&keyWord=&endTime=&line=1" class="g-ico ico-see-children">查看详情</a></td>' +
					'</tr>';
			}
		}

		var matchingHtml = '<div class="g-list" style="width:900px;height:350px;overflow:scroll-y;"><table><thead><tr><td width="7%" class="list-id">序号</td><td width="8%">会员帐号</td><td width="13%">询盘名称</td><td width="11%">被询盘企业</td><td width="7%">附件</td><td width="11%">询盘时间</td><td width="7%">采购数量</td><td width="7%">匹配来源</td><td width="10%">匹配时间</td><td width="9%">询盘类型</td><td width="10%">管理操作</td></tr></thead><tbody>' + item + '</tbody></table></div>';

		art.dialog({
			title: "已匹配询盘列表",
			content: matchingHtml,
			fixed: true,
			background: "#000",
			opacity: "0.5",
			padding: "10px",
			lock: true
		});
	}, "jsonp")
}

var selectQualityProducts = function(productid, inquiryid, memberid, inquiryName, companyName) { //选择匹配询盘
	art.dialog({
		title: "选择匹配询盘",
		fixed: true,
		content: "<div style='font-size:14px;'>确定要匹配该条询盘？</div>",
		background: "#000",
		opacity: "0.5",
		ok: function() {
			$.post(
				"qualityProducts.updateMatchingState", {
					"productId": productid,
					"inquiryId": inquiryid,
					"memberId": memberid,
					'companyName': companyName,
					'inquiryName': inquiryName
				},
				function(data) {
					if (data > 0) {
						art.dialog({
							content: "匹配成功！",
							icon: 'succeed',
							fixed: true,
							time: 1.5,
							close: function() {
								location.href = location.href
							}
						});
					} else {
						art.dialog({
							content: "匹配失败！请稍候再试。",
							icon: 'error',
							fixed: true,
							time: 1.5
						})
					}
				}, "jsonp")
		},
		cancel: true,
		lock: true
	});
}
 
var followSituation = function(id, track) { //跟踪情况查询和操作
	var html = '<table>' +
		'<tr><td><b>商家名称：</b></td><td>' + track + '<input type="hidden" name="companyName" value="' + track + '" /></td></tr>' +
		'<tr><td colspan="2" height="15"></td></tr>' +
		'<tr><td><b>操作描述：</b></td><td><textarea onkeyup="var len=this.value.length;if(len>500){this.value=this.value.substr(0,500)}" placeholder="最多输入500个字符" style="vertical-align:top;font-size:12px;padding:5px;width: 400px;" id="followTextarea" cols="23" rows="3"></textarea></td></tr>' +
		'</table>'
	art.dialog({
		title: "跟踪情况：",
		fixed: true,
		content: html,
		background: "#000",
		opacity: "0.5",
		ok: function() {
			var txt = $("#followTextarea").val();
			if (txt == '') {
				art.dialog({
					content: "操作描述不能为空！",
					icon: 'error',
					fixed: true,
					time: 1.5
				});
				return false;
			}
			$.post(
				"qualityProducts.handleFollowSituation", {
					"memberId": id,
					"content": txt
				},
				function(data) {
					if (data > 0) {
						art.dialog({
							title: '消息',
							content: '跟踪设置成功！',
							icon: 'succeed',
							fixed: true,
							time: 1.5,
							close: function() {
								var isFlag = $('body').hasClass('flag');
								if (isFlag) {
									$('body', parent.document).removeClass('flag')
									var $src = $('iframe', parent.document).attr('src');
									$('iframe', parent.document).attr('src', $src);
									$('body', parent.document).attr('SetReload', 'true');
								} else {
									location.href = location.href;
								}
							},
							init: function() {
								this.DOM.iconBg.css('background-position', '-3px 0')
							}
						})
					} else {
						art.dialog({
							content: "跟踪设置失败！请稍候再试。",
							icon: 'error',
							fixed: true,
							time: 1.5
						})
					}
				}, "jsonp"
			);
		},
		cancel: true,
		lock: true
	});

}

var delFollowInfo = function(obj, id) { //删除跟踪信息
	$.post("qualityProducts.delFollowSituation", {
		"id": id
	}, function(data) {
		if (data > 0) {
			art.dialog({
				content: "删除成功！",
				icon: 'succeed',
				fixed: true,
				time: 1.5,
				close: function() {
					$(obj).closest("div").remove();
				}
			});
		}
	}, "jsonp");
};

var verfy = function(obj, input, input2, track) { //输入字符时选中复选框
	if ($(obj).val() != "") {
		$(input2).removeAttr("checked");
		$(input).attr("checked", "checked");
	} else {
		$(input).removeAttr("checked");
		$(input2).removeAttr("checked");
		if ($(input).val() == track) {
			$(input).attr("checked", "checked");
		} else {
			$(input2).attr("checked", "checked");
		}
	}
};

var buyerMatchingProduct = function(productid, memberid, inquiryid, inquiryName, companyName) {
	art.dialog({
		title: "选择匹配",
		fixed: true,
		content: "确定要匹配该款产品？",
		background: "#000",
		opacity: "0.5",
		ok: function() {
			$.post("qualityProducts.buyerMatchingProduct", {
				"memberId": memberid,
				"inquiryId": inquiryid,
				"productId": productid,
				"companyName": companyName,
				"inquiryName": inquiryName
			}, function(data) {
				if (data > 0) {
					art.dialog({
						content: "匹配成功！",
						icon: 'succeed',
						fixed: true,
						time: 1.5,
						close: function() {
							location.href = location.href
						}
					});
				} else {
					art.dialog({
						content: "匹配失败！请稍候再试。",
						icon: 'error',
						fixed: true,
						time: 1.5
					})
				}
			}, "jsonp");
		},
		cancel: true,
		lock: true
	});
};

var alreadyMatchingProduct = function(memberid, inquiryid) {
	$.post("qualityProducts.alreadyMatchingProduct", {
		"memberId": memberid,
		"inquiryId": inquiryid
	}, function(data) {
		var item = '';
		for (i in data) {
			var j = parseInt(i) + 1,
				price, member, grade;

			if (data[i].speak == "Y" || data[i].speak == "0.0" || data[i].speak == "0.00" || data[i].speak == "") {
				price = "价格面议"
			} else {
				price = data[i].speak
			};
			if (data[i].memberGroup == "cst") {
				member = "城商通"
			} else if (data[i].memberGroup == "vip") {
				member = "VIP"
			} else {
				member = "普通会员"
			};
			if (data[i].grade == "H") {
				grade = '<span class="g-ico ico-rat-h"></span><div class="g-h-03"></div>'
			} else if (data[i].grade == "M") {
				grade = '<span class="g-ico ico-rat-m"></span><div class="g-h-03"></div>'
			} else if (data[i].grade == "L") {
				grade = '<span class="g-ico ico-rat-l"></span><div class="g-h-03"></div>'
			} else {
				grade = ''
			};

			if (i % 2 == 0) {
				item += '<tr>' +
					'<td class="list-id">' + j + '</td>' +
					'<td>' + data[i].memberName + '</td>' +
					'<td>' + data[i].enterprise + '</td>' +
					'<td>' + data[i].productName + '</td>' +
					'<td><img src="http://img.csc86.com' + data[i].picture + '" height="80" width="80" /></td>' +
					'<td>' + price + '</td>' +
					'<td>' + member + '</td>' +
					'<td>' + data[i].reTime + '</td>' +
					'<td>' + data[i].matchType + '</td>' +
					'<td>' + data[i].matchTime + '</td>' +
					'<td>' + grade + '<a href="productAudit.showDetail?ids=' + data[i].productId + '&index=1&starts=1&tag=all&qChecked=Q" class="g-ico ico-see-children">查看详情</a></td>' +
					'</tr>';
			} else {
				item += '<tr class="bg">' +
					'<td class="list-id">' + j + '</td>' +
					'<td>' + data[i].memberName + '</td>' +
					'<td>' + data[i].enterprise + '</td>' +
					'<td>' + data[i].productName + '</td>' +
					'<td><img src="http://img.csc86.com' + data[i].picture + '" height="80" width="80" /></td>' +
					'<td>' + price + '</td>' +
					'<td>' + member + '</td>' +
					'<td>' + data[i].reTime + '</td>' +
					'<td>' + data[i].matchType + '</td>' +
					'<td>' + data[i].matchTime + '</td>' +
					'<td>' + grade + '<a href="productAudit.showDetail?ids=' + data[i].productId + '&index=1&starts=1&tag=all&qChecked=Q" class="g-ico ico-see-children">查看详情</a></td>' +
					'</tr>';
			}
		}

		var matchingHtml = '<div class="g-list" style="width:900px;height:350px;overflow:scroll-y;">'+
								'<table>'+
									'<thead>'+
										'<tr>'+
											'<td width="6%" class="list-id">序号</td>'+
											'<td width="10%">会员帐号</td>'+
											'<td width="10%">企业名称</td>'+
											'<td width="">信息标题</td>'+
											'<td width="7%">产品图片</td>'+
											'<td width="7%">价格</td>'+
											'<td width="7%">会员组</td>'+
											'<td width="8%">发布时间</td>'+
											'<td width="7%">匹配来源</td>'+
											'<td width="8%">匹配时间</td>'+
											'<td width="10%">管理操作</td>'+
										'</tr>'+
									'</thead>'+
									'<tbody>' + item + '</tbody>'+
								'</table>'+
							'</div>';

		art.dialog({
			title: "已匹配产品列表",
			content: matchingHtml,
			fixed: true,
			background: "#000",
			opacity: "0.5",
			padding: "10px",
			lock: true
		});

	}, "jsonp");
};

art.dialog.tips = function (a , b) {
	var dialog = art.dialog({
		content: a,
		fixed: true,
		id: 'Fm7',
		icon: 'succeed',
		time: b || 0
	});
}
// 添加&编辑买家
var addOrEditBuyer = function ( memberId ) {
	var html = template('gqk/addOrEditBuyer', {}),
		type = !! memberId ? "编辑买家" : "添加买家",
		// 动态生成市和区的数据
		renderCityOrArea = function ( dom, dom2 ) {
			dom.empty().append('<option value="">请选择</option>');
			if ( dom2 ) {
				dom2.empty().append('<option value="">请选择</option>');
			}
			var v = $(this).val();
			if ( !v ) {
				return;
			}
			$.get('quality.listZone', {'parentId': v || "" }, function ( res ) {
				if ( res.success === "true" ) {
					var data = res.data,
						i, len;
					for ( i = 0, len = data.length; i < len; i++ ) {
						dom.append('<option value="'+ data[i].id +':'+ data[i].name +'">'+ data[i].name +'</option>');
					}
				} else {
				}
			}, 'json');
		};
	art.dialog({
		title: type,
		content: html,
		fixed: true,
		background: "#000",
		opacity: "0.5",
		padding: "10px",
		lock: true,
		okVal: '提交',
		cancelVal: '返回',
		ok: function () {
			// 检查企业名称是否为空
			var $a = $( "#addOrEditBuyer_qymc" );
			if ( ! $a.val() ) {
				$a.next().removeClass("g-dn");
				setTimeout(function () {
					$a.next().addClass("g-dn");
				}, 3000);
				return false;
			}
			// 构造参数
			var elms = $( "#addOrEditBuyer_form" )[0].elements,
				len = elms.length,
				name,
				arr = ['email', 'moblie', 'name', 'position', 'qqNo'],
				contactpersons = [],
				params = {};

			for ( var i = 0; i < len ; i++ ) {
				name = elms[i].name;
				if ( !name || $.inArray(name, arr) != -1 ) {
					continue;
				}
				params[name] = elms[i].value || "";
			}
			var flag = true;
			$( "#linkerList" ).children().each(function () {
				var el = $(this).find("input"),
					o = {};
				el.each(function () {
					var name = $(this)[0].name;
					if ( name === "name" ) {
						if ( $.trim( $(this).val() ).length === 0 ) {
							flag = false;
						}
						o[name] = $(this).val() || "匿名";
					} else {
						o[name] = $(this).val();
					}
				});
				contactpersons.push(o);
			});
			if ( !flag ) {
				$( "#linkerList" ).after('<p class="c-red" id="linkerList-tip">请填写联系人姓名</p>');
				setTimeout(function () {
					$( "#linkerList-tip" ).remove();
				}, 3000);
				return false;
			}
			params.contactpersons = JSON.stringify(contactpersons);
			
			// submit
			$.get('quality.saveInsertOrUpdateImportBuyer', params, function ( res ) {
				if ( res.success === "true" ) {
					window.location.reload();
				} else {
					art.dialog.alert( type + "失败" );
				}
			}, 'json');
			return false;
		},
		cancel: function () {
		},
		init: function () {
			var item = $( "#linkerList" ).children().first(),
				count = 0,
				_t = this;
			// 添加联系人
			$( "#addBuyerBtn" ).click(function () {
				if ( count > 3 ) {
					art.dialog.alert( "最多添加5条联系人" );
					return false;
				}
				if ( item.length > 0 ) {
					var del = $( '<div class="g-fl ml10 addOrEditBuyer_3"><a href="javascript:;" title="删除" class="delete_item">删除</a></div>' );
					var cl = item.clone();
					cl.find("input").val("");
					$( "#linkerList" ).append( cl.append(del).addClass("mt5") );
					
					del.children().first().click(function () {
						$(this).parent().parent().remove();
						count --;
					});
					count ++;
					_t._reset();
				}
				return false;
			});

			var $addOrEditBuyer_zyhy = $( "#addOrEditBuyer_zyhy" ); // 主要行业dom
			var $area_provice = $( "#area_provice" ),
				$area_city = $( "#area_city" ),
				$area_area = $( "#area_area" );
			// 初始化表单数据
			$.get('quality.insertOrUpdateImportBuyer', {'memberId': memberId || ""}, function ( res ) {
				if ( res.success == "true" ) {
					var data = res.data,
						importBuyer = data.importBuyer,
						listProvince = data.listProvince,
						listTrades = data.listTrades,
						i = 0, len;
					
					for ( i = 0, len = listTrades.length ; i < len ; i ++ ) {
						$addOrEditBuyer_zyhy.append('<option value="'+ listTrades[i].catName +'">'+ listTrades[i].catName +'</option>');
					}
					for ( i = 0, len = listProvince.length ; i < len ; i ++ ) {
						$area_provice.append('<option value="'+ listProvince[i].id +':'+ listProvince[i].name +'">'+ listProvince[i].name +'</option>');
					}
					// 添加时无需赋值
					if ( !memberId ) {
						return;
					}
					// 编辑时赋值
					var elms = $( "#addOrEditBuyer_form" )[0].elements;
					for ( i = 0, len = elms.length; i < len; i ++ ) {
						var name = elms[i].name;
						// 暂时不给省市区赋值
						if ( name === "province" || name === "city" || name === "area" ) {
							continue;
						}
						if ( importBuyer.hasOwnProperty( name ) ) {
							elms[i].value = importBuyer[ name ];
						}
					}
					// 给省赋值 根据省查询市 区的数据并赋值
					var selectedProvince = "",
						selectedCity = "";
					$area_provice.children().each(function () {
						if ( $(this).text() === importBuyer.province ) {
							$(this).attr("selected", true);
							selectedProvince = $(this).val();
						}
					});
					// 查询市的数据 并赋值
					$.get('quality.listZone', {'parentId': selectedProvince }, function ( res ) {
						if ( res.success === "true" ) {
							var data = res.data,
								i, len;
							for ( i = 0, len = data.length; i < len; i++ ) {
								$area_city.append('<option value="'+ data[i].id +':'+ data[i].name +'">'+ data[i].name +'</option>');
							}
							// 赋值市
							$area_city.children().each(function () {
								if ( $(this).text() === importBuyer.city ) {
									$(this).attr("selected", true);
									selectedCity = $(this).val();
								}
							});
							// 查询区的数据 并赋值
							$.get('quality.listZone', {'parentId': selectedCity }, function ( res ) {
								if ( res.success === "true" ) {
									var data = res.data,
										i, len;
									for ( i = 0, len = data.length; i < len; i++ ) {
										$area_area.append('<option value="'+ data[i].id +':'+ data[i].name +'">'+ data[i].name +'</option>');
									}
									// 赋值区
									$area_area.children().each(function () {
										if ( $(this).text() === importBuyer.area ) {
											$(this).attr("selected", true);
										}
									});
								} else {
								}
							}, 'json');
						} else {
						}
					}, 'json');

					// 赋值联系人
					var linkers = importBuyer.importContactPersonDtos;
					if ( linkers && linkers.length > 0 ) {
						for ( i = 0,len = linkers.length; i < len ; i++ ) {
							if ( i === 0 ) {
								$( "#linkerList" ).children().first().find("input").each(function () {
									var name = $(this)[0].name;
									$(this).val( linkers[i][name] );
								});
							} else {
								$( "#addBuyerBtn" ).click(); // 增加一个联系人
								$( "#linkerList" ).children().eq(i).find("input").each(function () {
									var name = $(this)[0].name;
									$(this).val( linkers[i][name] );
								});
							}
						}
					}
				} else {
				}
			}, 'json');
			$area_provice.change(function () {
				renderCityOrArea.call(this, $area_city, $area_area);
			});
			$area_city.change(function () {
				renderCityOrArea.call(this, $area_area);
			});
		}
	});
	return false;
}
// 激活买家
var inquireBuyer = function ( memberId ) {
	var html = template('gqk/inquireBuyer', {});
	art.dialog({
		title: "激活买家",
		content: html,
		fixed: true,
		background: "#000",
		opacity: "0.5",
		padding: "10px",
		lock: true,
		okVal: '确定',
		cancelVal: '取消',
		ok: function () {
			$.get("quality.activateBuyers", {'memberIds': memberId}, function ( res ) {
				if ( res.success === "true" ) {
					art.dialog.tips("激活成功", 2);
					setTimeout(function () {
						window.location.reload();
					}, 2000);
				} else {
					art.dialog.alert( res.msg );
				}
			}, 'json');
			return false;
		},
		cancel: function () {
		},
		init: function () {
		}
	});
}
// inquireBuyer();

// 发通知 - 短信 - 邮件
var setMessage = function ( memberId ) {
	var html = template('gqk/setMessage', {}),
		type = 1, // 1短信 2邮件
		arrparams, // 选择的联系人
		um;
	if ( ! memberId ) {
		var flag = true;
		$( "#tableList" ).find('input[type="checkbox"]').each(function () {
			if ( $(this)[0].checked ) {
				flag = false;
			}
		});
		if ( flag ) {
			art.dialog.alert("请选择要发送的联系人");
			return false;
		};
	};
	art.dialog({
		title: "发通知",
		content: html,
		fixed: true,
		background: "#000",
		opacity: "0.5",
		padding: "10px",
		lock: true,
		okVal: '确定',
		cancelVal: '取消',
		ok: function () {
			var a1 = $( "#setMessage_table_1" ),
				a2 = $( "#setMessage_table_2" ),
				arrparams = [],
				arrMemberIds = [],
				msg = "",
				subject = "",
				url='';
			if(memberId!='all'){
				url='qualityProducts.sendMsg';
				// 取联系人
				if ( memberId && type === 1 ) {
					a1.find("input[type='checkbox']").each(function () {
						var ck = $(this)[0].checked;
						if ( ck ) {
							arrparams.push( $(this).attr("index") );
						} 
					});
				} else if ( memberId && type === 2 ) {
					a2.find("input[type='checkbox']").each(function () {
						var ck = $(this)[0].checked;
						if ( ck ) {
							arrparams.push( $(this).attr("index") );
						} 
					});
				} else {
					$( "#tableList" ).find('input[type="checkbox"]').each(function () {
						if ( $(this)[0].checked ) {
							var mobile = $(this).attr("mobile"),
								email = $(this).attr("email");
							if ( type === 1 ) {
								arrparams.push(mobile);
							} else {
								arrparams.push(email);
							}
							
							arrMemberIds.push($(this).parents('tr:first').data("buyer"));
							
						}
					});
				}
				
				if ( arrparams.length === 0 ) {
					art.dialog.alert("请选择要发送的联系人");
					return false;
				}
				
			}else{
				
				url='qualityBuyer.sendAllMsg';
				memberId='';
				
			}
			
			if ( type === 1 ) {
				msg = $( "#messageValue1" ).val();
				if ( $.trim(msg).length === 0 ) {
					art.dialog.alert("短信内容不能为空");
					return false;
				} else if ( $.trim(msg).length > 150 ) {
					art.dialog.alert("短信内容不能超过150个字");
					return false;
				}
			} else if ( type === 2 ) {
				msg = um.getContent();
				subject = $( "#emailSubject" ).val();
				if ( $.trim(subject).length === 0 ) {
					art.dialog.alert("邮件标题不能为空");
					return false;
				}
				if ( $.trim(msg).length === 0 ) {
					art.dialog.alert("邮件内容不能为空");
					return false;
				}
			}
			var _t = this;
			$.post(url, {"arrparams": arrparams.length === 0 ? "" : arrparams,"arrMemberIds": arrMemberIds.length === 0 ? "" : arrMemberIds,"memberId": memberId || "", "type": type, "msg": msg, "subject": subject}, function ( res ) {
				if ( res.status === 1 ) {
					art.dialog.tips("发送成功", 2);
					_t.close();
					um.destroy();
				} else {
					art.dialog.alert("发送失败");
				}
			}, 'jsonp');
			return false;
		},
		cancel: function () {
			// 销毁编辑器
			um.destroy();
		},
		init: function () {
			initEditor.call(this);
			// tab切换
			var setMessage_tab = $( "#setMessage_tab" ),
				setMessage_tablist = $( "#setMessage_tablist" );
			setMessage_tab.children().click(function () {
				var index = setMessage_tab.children().index($(this));
				setMessage_tab.children().removeClass("hover");
				$(this).addClass("hover");
				setMessage_tablist.children().addClass("g-dn").eq(index).removeClass("g-dn");
				if ( index === 0 ) {
					type = 1;
				} else {
					type = 2;
				}
			});

			// 联系人
			if ( memberId && memberId!='all') {
				getLinkers();
			}
			//
		}
	});
	// 获取联系人
	function getLinkers () {
		var a1 = $( "#setMessage_table_1" ),
			a2 = $( "#setMessage_table_2" );
		a1.before('<p class="setMessage_t">选择接收人</p>');
		a2.before('<p class="setMessage_t">选择接收人</p>');
		if ( memberId ) {
			$.get('qualityProducts.getContactPerson', {'memberId': memberId}, function ( res ) {
				if ( res.status === 1 && res.data.length > 0 ) {
					var i, data = res.data, len = data.length,
						html = "";
					for ( i = 0; i < len ; i ++ ) {
						html += '<td><label><span><input type="checkbox" name="linkers" index="'+ data[i].moblie +'" /></span> '+ data[i].name +' '+ data[i].moblie +'</label></td>';
						if ( i === len -1 || (i + 1) % 3 === 0  ) {
							a1.append('<tr>' + html + '</tr>');
							html = "";
						}
					}
					html = "";
					for ( i = 0; i < len ; i ++ ) {
						html += '<td><label><span><input type="checkbox" name="linker2s" index="'+ data[i].email +'" /></span> '+ data[i].name +' '+ data[i].email +'</label></td>';
						if ( i === len -1 || (i + 1) % 3 === 0  ) {
							a2.append('<tr>' + html + '</tr>');
							html = "";
						}
					}
				} else {
				}
			}, 'jsonp');
		}
	}
	// 初始化编辑器
	function initEditor () {
		var _t = this;
		um = UM.getEditor('emailContent', {
            toolbar:[
				'undo redo bold italic underline strikethrough forecolor backcolor removeformat',
				'insertorderedlist insertunorderedlist selectall cleardoc paragraph fontfamily fontsize' ,
				'justifyleft justifycenter justifyright justifyjustify',
				'link unlink',
				'horizontal fullscreen', 'drafts'
			],
            focus: true,
			initialFrameWidth: 532,
			initialFrameHeight: 200
        });
		um.ready(function () {
			_t._reset();
		});
	}
	return false;
}
// setMessage();

// 详情
var checkDetail = function ( memberId ) {
	$.get('quality.selectBuyer', {'memberId': memberId}, function ( res ) {
		if ( res.success === "true" ) {
			var data = res.data;
			data.importBuyer.area = data.importBuyer.province + data.importBuyer.city + data.importBuyer.area;

			render( data );
		} else {
			//
		}
	}, 'json');
	function render ( data ) {
		var html = template('gqk/detail', data);
		art.dialog({
			title: "买家详情",
			content: html,
			fixed: true,
			background: "#000",
			opacity: "0.5",
			padding: "10px",
			lock: true
		});
	}
}
// checkDetail();

// 已发消息列表
var messageList = function ( memberId ) {
	$.get("quality.selectInform", {'memberId': memberId || ""}, function ( res ) {
		if ( res.success === "true" ) {
			var html = template('gqk/messageList', res);
			art.dialog({
				title: "已发通知",
				content: html,
				fixed: true,
				background: "#000",
				opacity: "0.5",
				padding: "10px",
				lock: true
			});
		} else {
			art.dialog.alert( "请求失败" );
		}
	}, 'json');
	return false;
}
// messageList();

// 添加关键词
var setKeyWord = function ( _this, memberId ) {
	var html = template('gqk/setKeyWord', {}),
		type = true ? "添加关键词" : "修改关键词",
		_t = $( _this );
	art.dialog({
		title: type,
		content: html,
		fixed: true,
		background: "#000",
		opacity: "0.5",
		padding: "10px",
		lock: true,
		okVal: '确定',
		cancelVal: '取消',
		ok: function () {
			var keywords = $( "#keywords" ).val();
			if ( $.trim(keywords).length === 0 ) {
				art.dialog.alert("请填写关键词");
				return false;
			}
			var arr = keywords.split(","),
				len = arr.length,
				flag = true;
			if ( len > 20 ) {
				art.dialog.alert("不能大于20个关键词");
				return false;
			}
			for ( var i = 0; i < len ; i++ ) {
				if ( arr[i].length > 10 ) {
					flag = false;
					break;
				}
			}
			if ( !flag ) {
				art.dialog.alert("单个关键词不能大于10个字");
				return false;
			}
			var me = this;
			$.post("memberManager.setKeyWords", {'memberId': memberId || "", 'keyWords': keywords}, function ( res ) {
				if ( res.status === 1 ) {
					_t.attr("keywords", keywords);
					me.close();
					art.dialog.tips("设置成功", 2);
				} else {
					art.dialog.alert("设置关键词失败");
				}
			}, 'jsonp');
			return false;
		},
		cancel: function () {
		},
		init: function () {
			var enname = _t.attr("enname"),
				evip = _t.attr("evip"),
				keywords = _t.attr("keywords");
			$( "#keyCompanyName" ).text(enname);
			$( "#keyVipname" ).text(evip);
			$( "#keywords" ).val(keywords);
		}
	});
}

// 删除
var deleteBuyer = function ( ids ) {
	var params = "";
	if ( ! ids ) {
		$( "#tableList" ).find('input[type="checkbox"]').each(function () {
			if ( $(this)[0].checked ) {
				var memberId = $(this).attr("memberId");
				if ( memberId ) {
					if ( params.length === 0 ) {
						params = memberId;
					} else {
						params += ":" + memberId;
					}
				}
			}
		});
		
		if ( params.length === 0 ) {
			art.dialog.alert("请选择你要删除的项");
			return false;
		}
	} else {
		params = ids;
	}
	art.dialog.confirm("确定删除吗？", function () {
		$.post('quality.deleteBuyers', {'memberIds': params}, function ( res ) {
			if ( res.success === "true" ) {
				art.dialog.tips("删除成功", 2);
				window.location.reload();
			} else {
				art.dialog.alert("删除失败");
			}
		}, 'json');
	}, function () {
	});
	return false;
}

//复原
var restore=function(ids){
	var params = "";
	if ( ! ids ) {
		$( "#tableList" ).find('input[type="checkbox"]').each(function () {
			if ( $(this)[0].checked ) {
				var memberId = $(this).attr("memberId");
				if ( memberId ) {
					if ( params.length === 0 ) {
						params = memberId;
					} else {
						params += ":" + memberId;
					}
				}
			}
		});
		
		if ( params.length === 0 ) {
			art.dialog.alert("请选择你要复原的项");
			return false;
		}
	} else {
		params = ids;
	}
	art.dialog.confirm("确定复原吗？", function () {
		$.post('quality.restoreBuyers', {'memberIds': params}, function ( res ) {
			if ( res.success === "true" ) {
				art.dialog.tips("复原成功", 2);
				window.location.reload();
			} else {
				art.dialog.alert("复原失败");
			}
		}, 'json');
	}, function () {
	});
	return false;
}




// 初始化上传
function initUpload () {
	var 
		$file = $( "input[name='filePath']" ),
		loading;
	if ( ! $file.fileupload ) {
		return;
	}
	$file.fileupload({
		url: "quality.importBuyers",
		dataType: 'json',
		progressall: function (e, data) {
			// loading = dialog.loading("图片正在上传中，请稍后...");
		},
		add: function (e, data) {
			var fileInfo = data.files[0],
				regx = /(\.|\/)(xlsx|xls)$/i;
			if(!regx.test(fileInfo.name)){
				art.dialog.alert("请上传excel格式的文件");
				return false;
			}else{
				if(fileInfo.size > 1024*1024*10 && false){
					art.dialog.alert("文件大小不能超过10M");
					return false;
				}else{
					data.submit();
				}
			}
		},
		done: function (e, data) {
			var res = data.result;
			if ( res && res.success === "true" ) {
				if ( res.data.length > 0 ) {
					var html = "";
					var i = 0, data = res.data, len = data.length,temp;
					for (; i < len ;i++ ) {
						temp = data[i];
						html += '<p style="font-size:14px;line-height:250%;width:500px">'+ (i+1) +'、第 '+ temp.page +' 页的第' + temp.rowNumList.join(",") + '行导入失败</p>';
					}
					art.dialog({
						title: "未导入成功提示",
						content: html,
						fixed: true,
						background: "#000",
						opacity: "0.5",
						padding: "10px",
						lock: true,
						okVal: '我知道了',
						ok: function () {
							window.location.reload();
						}
					});
				} else {
					art.dialog.tips("导入全部成功", 2);
					setTimeout(function () {
						window.location.reload();
					}, 2000);
				}
			} else {
				art.dialog.alert("上传失败请重试", 2);
			}
		}
	});
}

$(function() {
	var ChangeParameter = function(parameter) { //切换排序参数
		var Reg = /(sort\=price\&desc\=desc)|(sort\=price\&desc\=asc)/g,
			_search = window.location.search,
			flag = Reg.test(_search),
			fixSearch = null,
			_url = 'http://bops.csc86.com/bops-app/bops/qualityProduct.findProductByFactor';

		if (flag) {
			fixSearch = _search.replace(Reg, parameter);
		} else {
			fixSearch = _search == '' ? '?' + parameter : _search + '&' + parameter;
		}
		window.location.href = _url + fixSearch;
	}

	$('.sort-main').on('click', '.sort-u', function() { //价格升序排列
		ChangeParameter('sort=price&desc=asc');
	}).on('click', '.sort-d', function() { //价格降序排列
		ChangeParameter('sort=price&desc=desc');
	});

	$('.JsFollow').on('click', function() { //跟进次数
		$url = 'qualityProducts.findFollowSituation?' + $(this).attr('data-search');
		var index = $('.JsFollow').index(this);
		art.dialog.data('aValue', index)
		art.dialog.open($url, {
			title: '买家跟进记录',
			lock: true,
			width: 800,
			close: function() {
				var isReload = $('body').attr('SetReload');
				if (isReload) {
					window.location.reload();
				}
			}
		}, false);
	});

	$('.tool').on('click', 'span', function() { //跟进数小页面的新增跟进记录
		var index = art.dialog.data('aValue');
		$('body', parent.document).addClass('flag');
		$('.u-allot', parent.document).eq(index).trigger('click');
	});
	$('select[name=sel_price]').on('change', function() { //优质库价格筛选
		var $val = $(this).val(),
			$Psection = $('.p-section');
		if ($val != 3) {
			$Psection.hide().find('input').prop('disabled', true);
		} else {
			$Psection.show().find('input').prop('disabled', false);
		}
	});
	$('.p-section').on('blur', 'input', function() { //数字限制
		var $val = $(this).val(),
			$NumVal = Number($val),
			Reg = /^(\d|([1-9]\d+))(\.\d{1,2})?$/,
			isNum = Reg.test($val),
			index = $('.p-section').find('input').index(this);
		if ($val == '') {
			return;
		}
		switch (index) {
			case 0:
				var $otherVal = Number($('.p-section').find('input').eq(index + 1).val());
				if ($otherVal != '' && $NumVal > $otherVal) {
					$(this).val('');
					alert('必须小于等于' + $otherVal + '或者为空！');
				}
				break;
			case 1:
				var $otherVal = Number($('.p-section').find('input').eq(index - 1).val());
				if ($otherVal != '' && $NumVal < $otherVal) {
					$(this).val('');
					alert('必须大于等于' + $otherVal + '或者为空！');

				}
				break;
		}
		if (!isNum) {
			alert('请输入最多保留两位小数的数！');
			$(this).val('');
		}
	});
	$('input[name=startFollowCount],input[name=endFollowCount]').on('blur', function() { //跟进次数限制
		var $attr = $(this).attr('name'),
			$val = $(this).val(),
			$NumVal = Number($val)
		if ($val == '') {
			return;
		}
		switch ($attr) {
			case 'startFollowCount':
				var $otherVal = Number($('input[name=endFollowCount]').val());
				if ($otherVal != '' && $NumVal > $otherVal) {
					$(this).val('');
					alert('必须小于等于' + $otherVal + '或者为空！');
				}
				break;
			case 'endFollowCount':
				var $otherVal = Number($('input[name=startFollowCount]').val());
				if ($otherVal != '' && $NumVal < $otherVal) {
					$(this).val('');
					alert('必须大于等于' + $otherVal + '或者为空！');

				}
				break;
		}
	});
	// fenye
	$('form[name="search"]').delegate('a.pg-prev,a.pg-next', 'click', function(event) {
		var $t = $(this),
			$form = $t.parents('form'),
			index = parseInt($form.attr('page'), 10),
			total = parseInt($form.attr('pagetotal'), 10);
		if(index == 1 && $t.is('.pg-prev')){
			artDialog({
				icon:'error',
				content: '已经是第一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		if(index == total && $t.is('.pg-next')){
			artDialog({
				icon:'error',
				content: '已经是最后一页!',
				fixed: true,
				time: 1.5
			});
			return;
		}
		$form.find('input[name="page"]').val( $t.is('.pg-next') ? index + 1 : index-1);
		$form.trigger('submit');
		event.preventDefault();
	});
	// 根据市选择区
	$( "select[name='provinceId']" ).change(function () {
		var v = $(this).val(),
			se = $("select[name='cityId']");
		se.empty().append('<option value="">请选择</option>');
		if ( v == "" ) {
			return;
		}
		$.get('quality.listZone', {'parentId': v }, function ( res ) {
			if ( res.success === "true" ) {
				var data = res.data,
					i, len;
				for ( i = 0, len = data.length; i < len; i++ ) {
					se.append('<option value="'+ data[i].id +':'+ data[i].name +'">'+ data[i].name +'</option>');
				}
			} else {
			}
		}, 'json');
	});
	// 初始化上传
	initUpload();
	// 清空inputpage 的值
	$( "input[name='inputpagefirst']").val("");
	$( "input[name='inputpagesecond']").val("");

	$( ".search-btn" ).click(function () {
		$( "input[name='page']").val("");
	});
});