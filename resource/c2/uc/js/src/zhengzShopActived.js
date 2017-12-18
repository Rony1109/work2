/**
 * 会员中心2.0
 * 郑州诚商通用户旺铺激活功能
 * anthor guoz
 * date 2015-11-06
 */
define(function(require, exports, module) {
	var tpl = require("c/member/home/tpl/build/tpl-cominfoForm.js?t=20160412");
	require('c/member/common/js/alertDialog');
	require('//res.csc86.com/f=js/p/My97DatePicker/4.8/WdatePicker.js');
	require('json2');
	// 检查旺铺激活状态
	(function () {
		// 新的需求
		var status = $( "#importUserStatus" ).val() || "",
			status_set = ["NA", "W", "P", "R"],
			$a = $('#companyInfo').parent().parent(),
			txt = "由于目前您尚未填写企业相关信息及上传资质材料，因此旺铺尚未激活",
			txt2 = "您的资料正在审核中，请耐心等待",
			txt3 = "您的资料未通过审核，请查看您的站内信通知，核对后重新修改并进行旺铺激活",
			$btn = '<a href="javascript:;" id="writeCompanyInfo" title="请点击激活">请点击激活</a>',
			$btn2 = '<a data-type="ag" href="javascript:;" id="writeCompanyInfo" title="请点击修改">请点击修改</a>',
			showTips = function ( a ) {
				$a.addClass('g-pr');
				$a.append('<div class="wpjh-mask">');

				var $div = $('<div class="wpjh-tips">');

				$a.append( $div );

				if ( a === 1 ) {
					$div.append('<div><p>'+ txt +'</p>'+ $btn +'</div>');
				} else if ( a === 2 ) {
					$div.append('<div><p>'+ txt2 +'</p></div>');
				} else if ( a === 3 ) {
					$div.append('<div><p>'+ txt3 +'</p>'+ $btn2 +'</div>');
				};
				// 设置垂直居中
				// $div.find('div').css("padding-top", ($div.height() -$div.find('div').height())/2 + "px" );
			};
		// status = "NA";
		if ( status === "NA" ) {
			showTips(1);
		} else if ( status === "W" ) {
			showTips(2);
		} else if ( status === "R" ) {
			showTips(3);
		}
	})();
	// 点击填写企业资料
	$( "#writeCompanyInfo" ).click(function () {
		var html = tpl("tpl-cominfoForm", {}),
			ag = $(this).attr("data-type") || "";
		$.cscConfirm({
            title: false,
            content: html,
            okVal: "保存并填写激活码",
            callback: function() {
				this.DOM.content.css({
                    'padding': '0',
					'height': 'auto'
                });
				$("#cominfoform").height( $( window ).height() - 150 );
				this.size(850);
				this._reset();

				// 初始化企业资料表单
				cominfoForm.init();
				// 再次编辑时赋值
				if ( ag === "ag" || true ) {
					cominfoForm.fillForm();
				}
            },
            okFun: function () {
				var fns = cominfoForm.valid_set, len = fns.length;
				for ( var i = 0; i < len ; i ++ ) {
					fns[i]();
				}
				if ( cominfoForm.ck_valid_success() ) {
					// 验证通过，转到填写激活码
					cominfoForm.save.call(this, function () {
						this.DOM.buttons.hide();
						cominfoForm.fillJHM.call(this);
					})
				} else {
					// 不通过
				}
				return false;
            },
            cancelFun: function () {
				if ( cominfoForm.isSuccess ) {
					window.location.reload();
				}
            }
        });
	});
	// require jquery-file-upload
	require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');
	var dialog = require("dialog");
	// 企业资料表单模块
	var cominfoForm = {
		init: function () {
			// 若加下面配置jquery fileupload ie 9及以下不能上传
			/*$.ajaxSetup({
				async: false
			});*/
			// 主营行业
			this.mainIndustry();
			// 执照上传
			this.initUpload();
			// 级联菜单
			this.addrSelect();
			// 商户类型
			this.shopType();
			this.companyType();
			this.valid();

			var $cominfoform = $( "#cominfoform" ),
				tools = require("l/addrselect/js/addrselect");

			$cominfoform.find("input:text").focus(function () {
				$(this).addClass("bd-blue");
			});
			$cominfoform.find("input:text").blur(function () {
				$(this).removeClass("bd-blue");
			});
			tools.inputDeletePlus( $cominfoform );
			// 第一个input focus
			$cominfoform.find(":text").first().focus();
		},
		// 验证
		valid: function () {
			var $cominfoform = $( "#cominfoform" ),
				reg1 = /^\d*[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z]+\d*$/i, // 中文，字母，数字且不能全是数字
				reg2 = /^1\d{10}$/i,
				reg3 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/i,
				reg4 = /^[\w\d]*$/i,
				reg5 = /^[1-9]\d{7}$/i,
				reg6 = /^\d*$/i,
				reg7 = /^\d*$/i,
				reg8 = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/,
				reg9 = /^\d{4}-\d{2}-\d{2}$/;
			function valid_fn (elem, tip, n, msg, reg, f ) {
				var map = {
					qymc: "企业名称",
					qylxdz: "企业联系地址",
					xxdz: "详细地址",
					jjms: "经营模式",
					zyhy: "主营行业",
					zycpfw: "主营产品/服务",
					qylx: "企业类型",
					xm: "姓名",
					sjhm: "手机号码",
					sjhm2: "手机号码",
					dzyx: "电子邮箱",
					gddh: "固定电话",
					gddh2: "固定电话",
					qymcc: "企业名称",
					yyzzzzh: "营业执照注册号",
					ffdbr: "法定代表人",
					yyzzsmj: "营业执照扫描件",
					gsjs: "公司介绍",
					yyqx: "营业期限",
					djjg: "登记机关",
					jyfw: "经营范围",
					clrq: "成立日期",
					sqrbm: "申请人部门",
					sqrzw: "申请人职位",
					sqr: "申请人"
				},
				showMsg = function ( s ) {
					tip.removeClass("g-dn").text( s || map[n] + "不能为空" );
					elem.addClass("bd-red");
					$cominfoform.find('li[n='+ n +']').attr("valid", "false");
				},
				clearMsg = function () {
					tip.addClass("g-dn").text( "" );
					elem.removeClass("bd-red");
					$cominfoform.find('li[n='+ n +']').attr("valid", "true");
				};
				function fn () {
					var vl = $.trim( elem.val() );
					if ( vl.length === 0 && !f && n !== 'gddh2' && n !== 'sjhm2' ) { // 申请人资料固定电话不做为空验证
						showMsg();
					} else if ( reg && !reg.test( vl ) && vl.length > 0 ) {
						showMsg( msg );
					} else {
						clearMsg();
					}
					if ( n === "qymc" ) {
						$.get("/user/isEnterpriseNameExits", {'enterpriseName': vl}, function ( res ) {
							if ( res.status && ! res.data ) {
								showMsg("企业名称已存在");
							} else if ( res.status && res.data ) {
								clearMsg();
							}
						}, 'json');
					}
				}
				elem.blur(function () {
					fn();
				});
				return fn;
			}
			
			var fn1 = valid_fn($( "#cominfo-qymc" ), $( "#cominfo-qymc" ).next(), "qymc" );
			// 公司介绍
			var fn17 = valid_fn($( "#description" ), $( "#description" ).next(), "gsjs" );
			var fn19 = valid_fn($( "#cominfo-djjg" ), $( "#cominfo-djjg" ).next(), "djjg" );
			var fn20 = valid_fn($( "#cominfo-jyfw" ), $( "#cominfo-jyfw" ).next(), "jyfw" );
			var fn22 = valid_fn($( "#cominfo-sqrbm" ), $( "#cominfo-sqrbm" ).next(), "sqrbm" );
			var fn23 = valid_fn($( "#cominfo-sqrzw" ), $( "#cominfo-sqrzw" ).next(), "sqrzw" );
			var fn28 = valid_fn($( "#cominfo-sqr" ), $( "#cominfo-sqr" ).next(), "sqr" );
			// 营业期限
			var fn18 = valid_fn($( "#cominfo-yyqx" ), $( "#cominfo-yyqx" ).next(), "yyqx", "日期格式不正确", reg9 );
			var fn21 = valid_fn($( "#cominfo-clrq" ), $( "#cominfo-clrq" ).next(), "clrq", "日期格式不正确", reg9 );

			var fn2 = valid_fn($( "#cominfo-xxzd" ), $( "#cominfo-xxzd" ).next(), "xxdz" );
			var fn3 = valid_fn($( "#cominfo-xm" ), $( "#cominfo-xm" ).parent().find(".c-ce0201"), "xm" );
			var fn4 = valid_fn($( "#cominfo-sjhm" ), $( "#cominfo-sjhm" ).next(), "sjhm", "您输入的手机号码不正确", reg2 );
			var fn27 = valid_fn($( "#cominfo-sjhm2" ), $( "#cominfo-sjhm2" ).next(), "sjhm2", "您输入的手机号码不正确", reg2 );
			var fn5 = valid_fn($( "#cominfo-dzyx" ), $( "#cominfo-dzyx" ).next(), "dzyx", "您输入的电子邮箱不正确", reg3 );
			var fn6 = valid_fn($( "#cominfo-qymcc" ), $( "#cominfo-qymcc" ).next(), "qymcc" );
			var fn7 = valid_fn($( "#cominfo-yyzzzzh" ), $( "#cominfo-yyzzzzh" ).next(), "yyzzzzh", "您输入的营业执照注册号不正确", reg4 );
			var fn8 = valid_fn($( "#cominfo-ffdbr" ), $( "#cominfo-ffdbr" ).next(), "ffdbr", "请输入汉字", reg8 );
			var fn13 = valid_fn($( "#cominfo-gddh" ), $( "#cominfo-gddh" ).parent().parent().next(), "gddh", "您输入的电话号码不正确", reg5 );
			var fn14 = valid_fn($( "#cominfo-gddh" ).prev(), $( "#cominfo-gddh" ).parent().parent().next(), "gddh", "您输入的区号不正确", reg6 );
			var fn15 = valid_fn($( "#cominfo-gddh" ).next(), $( "#cominfo-gddh" ).parent().parent().next(), "gddh", "您输入的分机号不正确", reg7, true );
			var fn9 = (function () {
				var $d1 = $( "#cominfo-cscshop" ),
					$d6 = $( "#cominfo-comshop" ),
					$d2 = $( "#cominfo-cscshop-select" ),
					$d3 = $( "#s_prov" ),
					$d4 = $( "#s_city" ),
					$d5 = $( "#s_area" ),

					$d7 = $( "#s_prov2" ),  // 营业执照注册地验证
					$d8 = $( "#s_city2" );

				fn = function () {
					$(this).removeClass("bd-red");
					$(this).parent().find(".c-ce0201").addClass("g-dn").text("");
					$cominfoform.find('li[n="qylxdz"]').attr("valid", "true");
				}
				$d2.change(function () {
					fn.call(this);
				});
				$d3.change(function () {
					fn.call(this);
				});
				$d4.change(function () {
					fn.call(this);
				});
				$d5.change(function () {
					fn.call(this);
				});
				$d7.change(function () {
					$(this).removeClass("bd-red");
					$(this).parent().find(".c-ce0201").addClass("g-dn").text("");
					$cominfoform.find('li[n="yyzzzcd"]').attr("valid", "true");
				});
				$d8.change(function () {
					$(this).removeClass("bd-red");
					$(this).parent().find(".c-ce0201").addClass("g-dn").text("");
					$cominfoform.find('li[n="yyzzzcd"]').attr("valid", "true");
				});
				return function () {
					if ( $d1[0].checked ) {
						if ( $d2.val() == "-1" ) {
							$d2.addClass("bd-red");
							$d2.parent().find(".c-ce0201").removeClass("g-dn").text("请选择您所在的华南城");
							$cominfoform.find('li[n="qylxdz"]').attr("valid", "false");
						}
					} else {
						if ( $d3.val() == "-1" ) {
							$d3.addClass("bd-red");
							$d3.parent().find(".c-ce0201").removeClass("g-dn").text("请选择省");
							$cominfoform.find('li[n="qylxdz"]').attr("valid", "false");
						}
						else if ( $d4.val() == "-1" ) {
							$d4.addClass("bd-red");
							$d4.parent().find(".c-ce0201").removeClass("g-dn").text("请选择市");
							$cominfoform.find('li[n="qylxdz"]').attr("valid", "false");
						}
						else if ( $d5.val() == "-1" && $d5[0].style.display != "none" ) {
							$d5.addClass("bd-red");
							$d5.parent().find(".c-ce0201").removeClass("g-dn").text("请选择区");
							$cominfoform.find('li[n="qylxdz"]').attr("valid", "false");
						}
					}
					if ( $d7.val() == "-1" ) {
						$d7.addClass("bd-red");
						$d7.parent().find(".c-ce0201").removeClass("g-dn").text("请选择省");
						$cominfoform.find('li[n="yyzzzcd"]').attr("valid", "false");
					} else if ( $d8.val() == "-1" ) {
						$d8.addClass("bd-red");
						$d8.parent().find(".c-ce0201").removeClass("g-dn").text("请选择市");
						$cominfoform.find('li[n="yyzzzcd"]').attr("valid", "false");
					}
				};
			})();
			var fn10 = function () {
				var $d = $("#cominfo-hangye").children().first();
				if ( $d.children().length === 0 ) {
					$("#cominfo-hangye").addClass("bd-red");
					$d.parent().next(".c-ce0201").removeClass("g-dn").text("主营行业不能为空");
					$cominfoform.find('li[n="zyhy"]').attr("valid", "false");
				} else {
					$cominfoform.find('li[n="zyhy"]').attr("valid", "true");
				}
			};
			var fn11 = function () {
				var $d = $( "#cominfo-zyfu" ),
					$tp = $d.parent().find( ".c-ce0201" ),
					f = true;
				$d.find("input").each(function () {
					var vl = $(this).val();

					if ( $.trim( vl ).length > 0 ) {
						f = false;
					}
				});
				// 全部没填写
				if ( f ) {
					$d.find("input").first().addClass("bd-red");
					$tp.removeClass("g-dn").text("主营产品/服务不能为空");
					$cominfoform.find('li[n="zycpfw"]').attr("valid", "false");
				}
			};
			$( "#cominfo-zyfu" ).find("input").each(function () {
				$(this).blur(function () {
					var vl = $(this).val();
					if ( vl.length > 0 && !reg1.test(vl) ) {
						$(this).addClass("bd-red");
						$( "#cominfo-zyfu" ).parent().find( ".c-ce0201" ).removeClass("g-dn").text("只能是中文数字字母且非全数字");
						$cominfoform.find('li[n="zycpfw"]').attr("valid", "false");
					} else {
						$(this).removeClass("bd-red");
						$( "#cominfo-zyfu" ).parent().find( ".c-ce0201" ).addClass("g-dn").text("");
						$cominfoform.find('li[n="zycpfw"]').attr("valid", "true");
					} 
				});
			});
			var fn12 = function () {
				if ( $("#cominfo-type").val() == "-1" ) {
					$("#cominfo-type").next().removeClass("g-dn");
					$("#cominfo-type").addClass("bd-red");
					$cominfoform.find('li[n="qylx"]').attr("valid", "false");
				}
			}
			$("#cominfo-type").change(function () {
				$("#cominfo-type").next().addClass("g-dn");
				$("#cominfo-type").removeClass("bd-red");
				$cominfoform.find('li[n="qylx"]').attr("valid", "true");
			});
			// 营业执照扫描件
			var fn16 = function () {
				var v = $( "#cominfo-uploadbtn" ).attr("index");
				if ( !v ) {
					$( "#cominfo-upload-tip" ).removeClass("g-dn").text("请上传营业执照扫描件");
					$cominfoform.find('li[n="yyzzsmj"]').attr("valid", "false");
				}

				var v1 = $('#idCardz').attr('index');
				var v2 = $('#idCardf').attr('index');

				if (!v1) {
					$( "#idCardzInput-tip" ).removeClass("g-dn").text("请上传身份证正面");
					$cominfoform.find('li[n="sqrsfz"]').attr("valid", "false");
				}
				if (!v2) {
					$( "#idCardfInput-tip" ).removeClass("g-dn").text("请上传身份证反面");
					$cominfoform.find('li[n="sqrsfz"]').attr("valid", "false");
				}
			};
			// 企业名称重复验证
			$( "#cominfo-qymc" ).blur(function () {
				var vl = $(this).val();
				var _this = $(this);
				$.get("/user/isEnterpriseNameExits", {'enterpriseName': $.trim(vl)}, function ( res ) {
					if ( res.status && ! res.data ) {
						$cominfoform.find("li[n='qymc']").attr("valid", "false");
						_this.next().text("企业名称已存在").removeClass("g-dn");
						_this.addClass("bd-red");
					} else if ( res.status && res.data ) {
						$cominfoform.find("li[n='qymc']").attr("valid", "true");
						_this.next().text("企业名称不能为空").addClass("g-dn");
						_this.removeClass("bd-red");
					}
				}, 'json');
			});
			// 申请人资料里的固定电话
			var fn24 = valid_fn($( "#cominfo-gddh2" ), $( "#cominfo-gddh2" ).parent().parent().next(), "gddh2", "您输入的电话号码不正确", reg5 );
			var fn25 = valid_fn($( "#cominfo-gddh2" ).prev(), $( "#cominfo-gddh2" ).parent().parent().next(), "gddh2", "您输入的区号不正确", reg6 );
			var fn26 = valid_fn($( "#cominfo-gddh2" ).next(), $( "#cominfo-gddh2" ).parent().parent().next(), "gddh2", "您输入的分机号不正确", reg7, true );
			
			// 申请人资料中的固定电话和手机必须填写一项
			var fn27 = function () {
				var $sjhm2 = $d2 = $('#cominfo-sjhm2');
				var $gddh2 = $('#cominfo-gddh2');

				if ($sjhm2.val().length === 0 && $gddh2.val().length === 0) {
					$d2.addClass("bd-red");
					$d2.parent().find(".c-ce0201").removeClass("g-dn").text("手机号码和固定电话必须填写一项");
					$cominfoform.find('li[n="sjhm2"]').attr("valid", "false");
				}
				$sjhm2.focus(function () {
					$d2.removeClass("bd-red");
					$d2.parent().find(".c-ce0201").addClass("g-dn").text("");
					$cominfoform.find('li[n="sjhm2"]').attr("valid", "true");
				})
				$gddh2.focus(function () {
					$d2.removeClass("bd-red");
					$d2.parent().find(".c-ce0201").addClass("g-dn").text("");
					$cominfoform.find('li[n="sjhm2"]').attr("valid", "true");
				})
			}

			this.valid_set.push( fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8, fn9, fn10, fn11, 
				fn12,fn13, fn14, fn15, fn16, fn17, fn18, fn19, fn20, fn21, fn22, fn23, fn27, fn28 );
		},
		ck_valid_success: function () {
			$cominfoform = $( "#cominfoform" );
			return $cominfoform.find('li[valid="false"]').length === 0 ? true : false;
		},
		// 提交表单
		save: function ( callback ) {
			var $cominfoform = $( "#cominfoform" ),
				loading,
				_this = this,
				params = {};
			$cominfoform.find('li').each(function () {
				var n = $(this).attr("n"),
					temp;
				if ( n === "qymc" || n === "xxdz" || n === "xm" || n === "sjhm" || 
					 n === "dzyx" || n === "qymcc" || n === "yyzzzzh" || n === "ffdbr" ||
					 n === "yyqx" || n === "djjg" || n === "jyfw" || n === "clrq" ||
					 n === "sqrbm" || n === "sqrzw" || n === "sjhm2" || n === "sqr") {
					params[ $(this).find('input:text').attr("name") ] = $(this).find('input:text').val();
					if ( n === "xm" ) {
						params.sex = $(this).find("input[name='sex']:checked").val();
					}
				} else if ( n === "qylxdz" ) {
					// 企业联系地址
					temp = $(this).find('input[name=isCSCEnterprise]:checked').val();
					params['isCSCEnterprise'] = temp;
					if ( temp === "Y" ) {
						params.city = $( "#cominfo-cscshop-select" ).val();
						// params.csc = $( "#cominfo-cscshop-select" ).find("option:selected").text();
					} else {
						params.provinceId = $( "#s_prov" ).val();
						params.province = $( "#s_prov" ).find("option:selected").text();
						params.cityId = $( "#s_city" ).val();
						params.city = $( "#s_city" ).find("option:selected").text();
						if ( $( "#s_area" ).children().length > 1 ) {
							params.areaId = $( "#s_area" ).val();
							params.area = $( "#s_area" ).find("option:selected").text();
						}
					}
				} else if ( n === "jjms" ) {
					temp = $( "#cominfo-jjms input[name='modelId']:checked" ).val();
					temp = temp.split(":");
					params.modelId = temp[0];
					params.model = temp[1];
				} else if ( n === "zyhy" ) {
					params.tradeIds = "";
					params.trades = "";
					$( this ).find(".cominfo-selected-hy").each(function () {
						var index = $(this).attr("index"),
							text = $(this).text();
						params.tradeIds += index + ";";
						params.trades += text + ";";
					});
					params.tradeIds = params.tradeIds.substring(0, params.tradeIds.length-1);
					params.trades = params.trades.substring(0, params.trades.length-1);
				} else if ( n === "zycpfw" ) {
					params.goods = "";
					$( "#cominfo-zyfu" ).find("input").each(function () {
						if ( $(this).val().length > 0 ) {
							params.goods += $(this).val() + ";";
						}
					});
					params.goods = params.goods.substring(0, params.goods.length-1);
				} else if ( n === "qylx" ) {
					temp = $( "#cominfo-type" ).val();
					temp = temp.split(":");
					params.enterpriseTypeId = temp[0];
					params.enterpriseType = temp[1];
				} else if ( n === "xm" ) {
					params.sex = $(this).find('input[name="sex"]:checked').val();
				} else if ( n === "gddh" ) {
					params.telephone = "";
					$(this).find('input:text').each(function () {
						params.telephone += $(this).val() + "-";
					});
					params.telephone = params.telephone.substring(0, params.telephone.length-1);
				} else if ( n === "yyzzsmj" ) {
					var src = $( "#cominfo-upload-img" ).attr("src");
					var index = $( "#cominfo-uploadbtn" ).attr("index");
					params.licenseImgUrl = index || src.substring(src.lastIndexOf("/"));
				
				} else if ( n === "gsjs" ) {
					params[ $(this).find('textarea').attr("name") ] = $(this).find('textarea').val();
				} else if ( n === "gddh2" ){
					params.fixTelephone = "";
					$(this).find('input:text').each(function () {
						params.fixTelephone += $(this).val() + "-";
					});
					params.fixTelephone = params.fixTelephone.substring(0, params.fixTelephone.length-1);
				} else if ( n === "sqrsfz" ) {
					var src = $( "#idCardzInput-img" ).attr("src");
					var index = $( "#idCardz" ).attr("index");
					params.uploadApplicantCard = index || src.substring(src.lastIndexOf("/"));

					var src = $( "#idCardfInput-img" ).attr("src");
					var index = $( "#idCardf" ).attr("index");
					params.uploadApplicantCard2 = index || src.substring(src.lastIndexOf("/"));
				} else if ( n === "yyzzzcd" ) {
					params.licenseProvinceId = $( "#s_prov2" ).val();
					params.licenseProvince = $( "#s_prov2" ).find("option:selected").text();
					params.licenseCityId = $( "#s_city2" ).val();
					params.licenseCity = $( "#s_city2" ).find("option:selected").text();
				}
			});
			loading = dialog.loading("提交资料，请稍后...");
			$.post("/user/submitEnterpriseInfo", {"userInfo": JSON.stringify(params)}, function ( res ) {
				if ( res.status ) {
					callback.call(_this);
				} else {
					artDialog.error(res.msg);
				}
				loading.close();
			}, 'json');
		},
		// 再次编辑时，赋值
		fillForm: function () {
			var $cominfoform = $( "#cominfoform" ),
				params = {};
			$.get("/user/findEnterpriseInfo", function ( res ) {
				if ( res.status && res.data ) {
					params = res.data;
					setTimeout(fill, 500);
				}
			}, 'json');
			function fill () {
				var tools = require("l/addrselect/js/addrselect");
				tools.addrCascade($( "#s_prov" ), $( "#s_city" ), $( "#s_area" ), params.provinceId, params.cityId);
				tools.addrCascade($( "#s_prov2" ), $( "#s_city2" ), $( "#s_area2" ), params.licenseProvinceId, params.licenseCityId);

				$cominfoform.find('li').each(function () {
					var n = $(this).attr("n"),
						temp, name;
					if ( n === "qymc" || n === "xxdz" || n === "xm" || n === "sjhm" || 
					 	n === "dzyx" || n === "qymcc" || n === "yyzzzzh" || n === "ffdbr" ||
					 	n === "yyqx" || n === "djjg" || n === "jyfw" || n === "clrq" ||
					 	n === "sqrbm" || n === "sqrzw" || n === "sjhm2" || n === "sqr") {
						name = $(this).find('input:text').attr("name");
						$(this).find('input:text').val( params[name] );
						if ( n === "xm" && !! params.sex ) {
							$(this).find("input[name='sex'][value='"+ params.sex +"']")[0].checked = true;
						}
					} else if ( n === "qylxdz" ) {
						// 企业联系地址
						if ( params['isCSCEnterprise'] === "Y" ) {
							$( "#cominfo-cscshop" )[0].checked = true;
							$( "#cominfo-cscshop-select" ).parent().removeClass("g-dn");
							$( "#s_prov" ).parent().addClass("g-dn");
							$( "#cominfo-cscshop-select" ).val(params.city);
						} else {
							$( "#cominfo-comshop" )[0].checked = true;
							$( "#cominfo-cscshop-select" ).parent().addClass("g-dn");
							$( "#s_prov" ).parent().removeClass("g-dn");
							$( "#s_prov" ).val(params.provinceId);
							$( "#s_city" ).val(params.cityId);
							if ( params.areaId ) {
								$( "#s_area" ).val(params.areaId);
							}
						}
					} else if ( n === "jjms" ) {
						$( "#cominfo-jjms input[name='modelId'][value='"+ params.modelId + ":" + params.model +"']" )[0].checked = true;
					} else if ( n === "zyhy" && !!params.tradeIds ) {
						temp = params.tradeIds.split(";");
						for ( var i = 0; i < temp.length ; i ++ ) {
							$( "#cominfo-hangye-items" ).find('input[value="'+ temp[i] +'"]').click();
						}
					} else if ( n === "zycpfw" && !!params.goods ) {
						temp = params.goods.split(";");
						for ( var i = 0; i < temp.length ; i ++ ) {
							$( "#cominfo-zyfu" ).find('input[name="goods'+ (i+1) +'"]').val(temp[i]);
						}
					} else if ( n === "qylx" ) {
						$( "#cominfo-type" ).val( params.enterpriseTypeId + ":" + params.enterpriseType );
					} else if ( n === "xm" ) {
						$(this).find('input[name="sex"][value="'+ params.sex +'"]')[0].checked = true;
					} else if ( n === "gddh" && !!params.telephone ) {
						temp = params.telephone.split("-");
						var i = 0;
						$(this).find('input:text').each(function () {
							$(this).val(temp[i]);
							i ++;
						});
					} else if ( n === "yyzzsmj" ) {
						$( "#cominfo-uploadbtn" ).attr("index", params.licenseImgUrl);
						$( "#cominfo-upload-img" ).attr("src", "http://img.csc86.com" + params.licenseImgUrl);

					} else if ( n === "gsjs" ) {
						$(this).find('textarea').val( params['description'] );
					} else if ( n === "gddh2" && !!params.fixTelephone ){
						temp = params.fixTelephone.split("-");
						var i = 0;
						$(this).find('input:text').each(function () {
							$(this).val(temp[i]);
							i ++;
						});
					} else if ( n === "sqrsfz" ) {
						$( "#idCardz" ).attr("index", params.uploadApplicantCard);
						$( "#idCardzInput-img" ).attr("src", "http://img.csc86.com" + params.uploadApplicantCard);

						$( "#idCardf" ).attr("index", params.uploadApplicantCard2);
						$( "#idCardfInput-img" ).attr("src", "http://img.csc86.com" + params.uploadApplicantCard2);
					} else if ( n === "yyzzzcd" ) {
						$( "#s_prov2" ).val(params.licenseProvinceId);
						$( "#s_city2" ).val(params.licenseCityId);
					}
					if ( n ) {
						$(this).attr("valid", "true");
					}
				});
			}
		},
		valid_set: [],
		// 主营行业选择
		mainIndustry: function () {
			var $hy = $( "#cominfo-hangye" ),
				$hy_item = $hy.parent().find(".cominfo-hangye"),
				$se_wrap = $hy.children().first(),
				$item = $( document.createElement("span") ),
				timer,
				count = 0,
				renderItem = function () {
					$hy_item.empty();
					$.get("/user/mainCategorys", function ( res ) {
						if ( res.status && res.data && res.data.length > 0 ) {
							var data = res.data, len = data.length, i,
								temp;
							for ( i = 0; i < len ; i++ ) {
								temp = data[i];
								$hy_item.append( '<label><input name="zyhy" type="checkbox" value="'+ temp.categoryNo +'" />'+ temp.categoryName +'</label>' );
							}
							handleEvent();
						}
					}, 'json');
				};
			renderItem();
			$item.addClass("cominfo-selected-hy");
			// 主营行业显示隐藏
			$hy.parent().hover(function () {
				$hy_item.removeClass("g-dn")
			}, function () {
				$hy_item.addClass("g-dn")
			});
			function handleEvent () {
				$hy_item.find("input").each(function () {
					var cl;
					$(this).on('change', function () {
						var ck = $(this)[0].checked;
						if ( ck ) {
							// 可选数量最多5个
							if ( count > 4 ) {
								$hy.next().text("主营行业最多选择5个").removeClass("g-dn");
								timer = setTimeout(function () {
									$hy.next().text("").addClass("g-dn");
								}, 3000);
								$(this)[0].checked = false;
								return false;
							}
							cl = $item.clone( true );
							$se_wrap.append( cl.attr("index", $(this).val()).text($(this).parent().text()) );
							count ++;
							$("#cominfo-hangye").removeClass("bd-red");
							$("#cominfo-hangye").next().addClass("g-dn");
							$( "#cominfoform" ).find('li[n="zyhy"]').attr("valid", "true");
						} else {
							if ( cl ) {
								cl.remove();
							};
							count --;
							$hy.next().text("").addClass("g-dn");
							timer = null;
							if ( count === 0 ) {
								$( "#cominfoform" ).find('li[n="zyhy"]').attr("valid", "false");
							}
						}
					});
				});
				$item.on('click', function () {
					$(this).remove();
					var v = $(this).attr("index");
					$hy_item.find('input[value="'+ v +'"]')[0].checked = false;
					count --;
					$hy.next().text("").addClass("g-dn");
					timer = null;
					if ( count === 0 ) {
						$( "#cominfoform" ).find('li[n="zyhy"]').attr("valid", "false");
					}
				});
			};
		},
		// 企业类型 & 经营模式
		companyType: function () {
			var $cominfotype = $( "#cominfo-type" ),
				$cominfojjms = $( "#cominfo-jjms" );
			$.get("/user/enterpriseTypes", function ( res ) {
				if ( res.status && res.data && res.data.length > 0 ) {
					var data = res.data, len = data.length, i,
						temp;
					for ( i = 0; i < len ; i++ ) {
						temp = data[i];
						$cominfotype.append( '<option value="'+ temp.id +':'+ temp.name +'">'+ temp.name +'</option>' );
					}
					$cominfotype.children().eq(1)[0].selected = true;
					$( "#cominfoform" ).find('li[n="qylx"]').attr("valid", "true");
				}
			}, 'json');
			$.get("/user/models", function ( res ) {
				if ( res.status && res.data && res.data.length > 0 ) {
					var data = res.data, len = data.length, i,
						temp;
					for ( i = 0; i < len ; i++ ) {
						temp = data[i];
						if ( i === 0 ) {
							$cominfojjms.append( '<label><input checked="checked" type="radio" name="modelId" class="vm" value='+ temp.id +':'+ temp.name +' /> '+ temp.name +'</label>' );
						} else {
							$cominfojjms.append( '<label class="ml25"><input type="radio" name="modelId" class="vm" value='+ temp.id +':'+ temp.name +' /> '+ temp.name +'</label>' );
						}
					}
				}
			}, 'json');
		},
		// 商户类型选择
		shopType: function  () {
			var $d1 = $( "#cominfo-cscshop" ),
				$d2 = $( "#cominfo-comshop" ),
				$d3 = $d1.parent().parent().next(),
				$d4 = $d1.parent().parent().next().next();
			$d1.click(function () {
				$d3.removeClass("g-dn");
				$d4.addClass("g-dn");
			});
			$d2.click(function () {
				$d4.removeClass("g-dn");
				$d3.addClass("g-dn");
			});
		},
		// 省市县级联菜单
		addrSelect: function () {
			var s_prov = $( "#s_prov" ),
				s_city = $( "#s_city" ),
				s_area = $( "#s_area" ),
				s_prov2 = $( "#s_prov2" ),
				s_city2 = $( "#s_city2" ),
				s_area2 = $( "#s_area2" ),
				tools = require("l/addrselect/js/addrselect");
			tools.addrCascade(s_prov, s_city, s_area);
			tools.addrCascade(s_prov2, s_city2, s_area2);
		},
		// 填写激活码
		fillJHM: function () {
			var $d1 = $( "#cominfoform" ),
				$d2 = $( "#cominfo-jhm" ),
				$back_btn = $( "#jhm-back-btn" ),
				$jh_btn = $( "#jh-btn" ),
				_this = this;
			$d1.addClass("g-dn");
			$d2.removeClass("g-dn");
			// 隐藏按钮
			this.DOM.buttons.hide();
			this.size(750);
			this._reset();
			$jh_btn.off("click");
			$back_btn.off("click");
			// 点击激活
			$jh_btn.click(function () {
				cominfoForm.jhSuccess.call(_this);
			});
			// 返回继续修改资料
			$back_btn.click(function () {
				$d2.addClass("g-dn");
				$d1.removeClass("g-dn");
				_this.DOM.buttons.show();
				_this.size(850);
				_this._reset();
			});
		},
		isSuccess: false,
		// 激活成功提示
		jhSuccess: function () {
			var $d1 = $( "#jh-success" ),
				$d2 = $( "#cominfo-jhm" ),
				$back_home = $( "#back-home" ),
				$tip = $d2.find(".c-ce0201"),
				_this = this,
				code = $d2.find('input').val();
			
			if ( $.trim(code).length === 0 ) {
				$tip.text("请输入激活码").removeClass("g-dn");
				setTimeout(function () {
					$tip.text("").addClass("g-dn");
				}, 3000);
				return;
			}
			$.post("/user/checkActivationCode", {code: code}, function ( res ) {
				if ( res.status ) {
					$d2.addClass("g-dn");
					$d1.removeClass("g-dn");
					_this._reset();
					cominfoForm.isSuccess = true;
					$back_home.click(function () {
						_this.close();
						window.location.reload();
					});
				} else {
					$tip.text(res.msg).removeClass("g-dn");
					setTimeout(function () {
						$tip.text("").addClass("g-dn");
					}, 3000);
				}
			}, 'json');
		},
		// 初始化上传空间 jquery-file-upload
		initUpload: function () {
			function initUpload ($file, $btn, $tip, $img, n) {
				var $cominfoform = $( "#cominfoform" ),
					tip1 = "仅支持jpg，png，gif格式的图片，大小3M以内，确保图片清晰",
					tip2 = "图片大小不得超过3M！",
					loading;
				$file.fileupload({
					url: "//i.csc86.com/user/uploadImg?imgType=authenticateLicense",
					dataType: 'json',
					progressall: function (e, data) {
						loading = dialog.loading("图片正在上传中，请稍后...");
					},
					add: function (e, data) {
						var fileInfo = data.files[0],
							regx = /(\.|\/)(jpe?g|png|gif)$/i;
						if(!regx.test(fileInfo.name)){
							$tip.removeClass("g-dn");
							$tip.text( tip1 );
							return false;
						}else{
							if(fileInfo.size > 1024*1024*3){
								$tip.removeClass("g-dn");
								$tip.text( tip2 );
								return false;
							}else{
								data.submit();
							}
						}
					},
					done: function (e, data) {
						if ( data.result.data.result === "success" ) {
							$img.attr( "src", "http://img.csc86.com" + data.result.data.key );
							$cominfoform.find('li[n="'+ n +'"]').attr("valid", "true");
							$btn.attr("index", data.result.data.key);
							$tip.addClass("g-dn").text("");
						} else {
							$cominfoform.find('li[n="'+ n +'"]').attr("valid", "false");
							$tip.removeClass("g-dn").text(data.result.msg);
						}
						loading.close();
					}
				});
			}
			initUpload($( "#cominfo-upload-file" ), $( "#cominfo-uploadbtn" ), $( "#cominfo-upload-tip" ), $( "#cominfo-upload-img" ), "yyzzsmj");
			initUpload($( "#idCardzInput" ), $( "#idCardz" ), $( "#idCardzInput-tip" ), $( "#idCardzInput-img" ), "sqrsfz");
			initUpload($( "#idCardfInput" ), $( "#idCardf" ), $( "#idCardfInput-tip" ), $( "#idCardfInput-img" ), "sqrsfz");
		}
	};
	// 根据旺铺页面传过来的参数 打开填写企业资料弹框
	var arr = location.search.match(/wpjh=(\w+)&?/);
	var wpjh_params = !! arr && arr.length > 0 ? arr[1] : false;
	if (wpjh_params && wpjh_params === "add") {
		$( "#writeCompanyInfo" ).click();
	}
});