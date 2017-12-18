define(function(require, exports, module) {
	require("l/ueditor/1.4.3/ueditor.config.js");
	require("l/ueditor/1.4.3/ueditor.all.min.js");
	require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');
	var tpl_savetemplate = require("c/member/supply/tpl/build/tpl-product-release-savetemplate");
	var artDialogger = require("//res.csc86.com/v2/m/dialog/js/init");
	var imgId = "";

	module.exports = {
		init: function ( id ) {
			document.domain = 'csc86.com';
			
			setTimeout(function () {
				UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
				UE.Editor.prototype.getActionUrl = function( action ){
					if(action == 'uploadimage') {
						return '//member.csc86.com/upload?type=texteditor';
					}
					return this._bkGetActionUrl( action );
				}
			}, 500);

			var ue = UE.getEditor( id, {
				UEDITOR_HOME_URL:"//res.csc86.com/v2/l/ueditor/1.4.3/",
				toolbars: [
					["bold","italic","underline", "fontsize" ,"strikethrough","forecolor","backcolor","justifyleft","justifycenter","justifyright","justifyjustify","fullscreen","insertunorderedlist","insertorderedlist","unlink","link","inserttable","deletetable","insertimage","undo","redo","cleardoc","template"]
				],
				// "fontfamily","fontsize","backcolor",,"cleardoc","simpleupload"
				allowDivTransToP: false,
				initialFrameHeight: 300,
				imageScaleEnabled: false,
				imagePopup: false,
				// serverUrl: '//img.csc86.com/upload?type=texteditor',
				// initialFrameWidth: 1000,
				scaleEnabled: true,
				iframeCssUrl: "//res.csc86.com/v2/c/pro-template/template.css",
				autoFloatEnabled: false,
				enableAutoSave: false,
				shortcutMenu: [],
				saveInterval: 10000000000
			});
			this.editor = ue;
			window.editor = ue;
			
			var _t = this;
			ue.ready(function () {
				_t.ready();
			});
			this.listener();
			return ue;
		},
		ready: function () {
			var doc = document.getElementById("ueditor_0").contentWindow.document,
				editor = this.editor,
				// iframeHolder = document.getElementById("edui1_iframeholder"),
				meta = '<meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=Edge" /><link rel="stylesheet" href="//res.csc86.com/v2/m/init/css/style.css" /><style>body{padding:10px;height:100%;min-height:200px;}.pro-template .tips2, .pro-template .tips1{display:block;}</style>';
			doc = $( doc );
			doc.find("head").children("style").remove();
			doc.find("head").append( meta );
			// $( "#content2" ).css("width", "820px");
			// 显示新图标
			$( editor.container ).find("div[title='模板']").children().first().removeClass("edui-icon").addClass("icon-template");
			$( editor.container ).find("div[title='模板']").append('<i class="icon-new"></i>');
			
			if ( editor.getContent().length === 0 ) {
				var new_tips = $( '<i class="icon-qipao"><span>可以通过模板让您的产品详情更美观！</span></i>' );
				$( editor.container ).find("div[title='模板']").append( new_tips );
				new_tips.mouseover(function () {
					return false;
				});
				new_tips.click(function () {
					$(this).remove();
					return false;
				});
			}
			
			$( editor.container ).after('<input type="file" name="file_data" id="temp-fileupload" />');
			// 初始化上传
			function initUpload () {
				var 
					$file = $( "#temp-fileupload" ),
					loading;
				$file.fileupload({
					url: "//member.csc86.com/upload?type=texteditor",
					dataType: 'json',
					progressall: function (e, data) {
						// loading = dialog.loading("图片正在上传中，请稍后...");
					},
					add: function (e, data) {
						var fileInfo = data.files[0],
							regx = /(\.|\/)(jpe?g|png|gif)$/i;
						if(!regx.test(fileInfo.name)){
							artDialogger.error("图片格式不对，只允许jpg/png/gif格式的图片");
							return false;
						}else{
							if(fileInfo.size > 1024*1024*3){
								artDialogger.error("图片大小不能大于3M");
								return false;
							}else{
								data.submit();
							}
						}
					},
					done: function (e, data) {
						if ( data.result.state === "FAIL" ) {
							artDialogger.error( data.result.error );
						} else {
							$( editor.body ).find("#" + imgId).attr("_src", data.result.url).attr("src", data.result.url);
						}
						// loading.close();
					}
				});
			}
			initUpload();

			// 火狐全屏问题解决
			if ( navigator.userAgent.indexOf("Firefox") > 0 ) {
				$( editor.container ).find(".edui-for-fullscreen").toggle(function () {
					$("#edui1").css("top", "0");
				}, function () {
					$("#edui1").css("top", "");
				});
			}
			$( editor.container ).find("div[title='模板']").parent().parent().hover(function () {
				$(this).removeClass("edui-state-hover");
			});

			function renderSaveTemp () {
				// render保存按钮
				$( editor.container ).after('<div id="save-template" class="save-tpl-box g-tr"><input class="frm-btn white-btn" type="button" name="submit" value="取消模板" /><input class="frm-btn lblue-btn ml10" type="button" name="submit" value="保存为我的模板" /></div>');
				// 取消模板
				$( "#save-template" ).children().first().click(function () {
					art.dialog.confirm("确定取消模板？", function () {
						editor.execCommand("cleardoc");
					}, function () {
					});
				});
				// 保存模板
				$( "#save-template" ).children().last().click(function () {
					var content = editor.getContent();
					if ( $.trim(content).length === 0 ) {
						art.dialog.alert("模板内容为空", 2);
						return;
					}
					art.dialog({
						title: "保存为我的模板",
						content: tpl_savetemplate({}),
						fixed: true,
						background: "#000",
						opacity: "0.5",
						padding: "10px",
						lock: true,
						okVal: '保存',
						cancelVal: '取消',
						ok: function () {
							if ( moduleTemplate.saveTempValid() ) {
								moduleTemplate.saveTemp.call(this);
							}
							return false;
						},
						cancel: function () {
							this.DOM.buttons.css("text-align", "");
						},
						init: function () {
							moduleTemplate.preSavetemp.call(this);
							this.DOM.buttons.css("text-align", "right");
						}
					});
				});
			}
			renderSaveTemp();
			bindDblClick();
		},
		listener: function () {
			// template命令执行之后，绑定事件
			var	editor = this.editor;
			editor.addListener("afterExecCommand",function () {
				if ( arguments[1] === "template" ) {
					bindDblClick();
					// renderSaveTemp();
					$( editor.container ).find("div[title='模板']").find(".icon-qipao").remove();
				}
				if ( arguments[1] === "cleardoc" ) {
					// $( "#save-template" ).remove();
				}
			});
		}
	};
	// 模板操作对象
	var moduleTemplate = {
		preSavetemp: function () {
			var a = $( "#gz-save-box" ),
				r = a.find("input[type='radio']"),
				b = a.find("input[name='temp-name']"),
				c = $( "#se-mytemplate" ),
				e = $( "#temp-count" );
			// 查询我的模板
			$.get("//member.csc86.com/product/sell/GetMyTmpls", function ( res ) {
				var status = res.status,
					data = res.data,
					len = data.length;
				e.text( len ); // 显示模板数量
				if ( len === 5 ) {
					r.eq(1)[0].checked = true;
					r.eq(0)[0].disabled = true;
					b[0].disabled = true;
				}
				if ( len === 0 ) {
					c[0].disabled = true;
					r.eq(1)[0].disabled = true;
				}
				for ( var i = 0; i < len ; i++ ) {
					c.append('<option value="'+ data[i].id +'">'+ data[i].templetName +'</option>');
				}
			}, 'jsonp');
			var _t = this;
			$( "#gz-save-box" ).find("a").click(function () {
				editor.getDialog('template').open();
				_t.close();
			});
			// 检查模板数量
			/*
			$.get("/product/sell/GetTmplCount", function ( res ) {
			}, 'json');*/
		},
		saveTempValid: function () {
			var tempName = $( "#temp-name" ),
				vl = tempName.val(),
				vl = $.trim( vl ),
				c = $( "#se-mytemplate" ),
				a = $( "#gz-save-box" ),
				r = a.find("input[type='radio']");
			if ( r.eq(0)[0].checked ) {
				if ( vl.length === 0 && false ) {
					tempName.next().text("请输入模板名称").removeClass("g-dn");
					setTimeout(function () {
						tempName.next().addClass("g-dn");
					}, 3000);
					return false;
				}
			} else if ( r.eq(1)[0].checked ) {
				if ( c.val() == "-1" ) {
					c.next().text("请选择替换模板").removeClass("g-dn");
					setTimeout(function () {
						c.next().addClass("g-dn");
					}, 3000);
					return false;
				}
			}
			return true;
		},
		saveTemp: function () {
			var a = $( "#gz-save-box" ),
				b = a.find("input:radio"),
				c = a.find("input[name='temp-name']"),
				d = $( "#se-mytemplate" ),
				e = $( "#gz-savetemp-success" ),
				content = editor.getContent(),
				r1 = b.eq(0),
				r2 = b.eq(1),
				_t = this,  // artDialog对象
				url = "",
				data = {};
			if ( r1[0].checked ) {
				// 新增模板
				url = "//member.csc86.com/product/sell/addTmpl";
				data = {'content': content, 'name': c.val() };
				
			} else if ( r2[0].checked ) {
				// 替换模板
				url = "//member.csc86.com/product/sell/updateTmpl";
				data = {'content': content, 'id': d.val() };
			}
			$.post(url, data, function ( res ) {
				if ( res.status === 1 ) {
					a.addClass("g-dn");
					e.removeClass("g-dn");
					_t.DOM.buttons.hide();
				} else {
					alert( res.msg );
				}
			}, 'jsonp');
			// 查看我的模板
			$( "#check-mytemp" ).click(function () {
				editor.getDialog('template').open();
				_t.close();
			});
		}
	};

	// 绑定双击事件
	function bindDblClick () {
		$( editor.body ).find("img").click(function () {
			return false;
		});
		$( editor.body ).find("img").dblclick(function () {
			imgId = "img" + new Date().getTime();
			$(this).attr( "id", imgId );
			if ( $.browser.msie ) {
				editor.getDialog('insertimage').open();
			} else {
				$( "#temp-fileupload" ).click();
			}
		});
		$( editor.body ).find("*[edit='true']").click(function () {
			$(this).text("");
		});
	}
})