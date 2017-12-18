(function () {
	document.domain = 'csc86.com';
    var parent = window.parent;
    //dialog对象
    dialog = parent.$EDITORUI[window.frameElement.id.replace( /_iframe$/, '' )];
    //当前打开dialog的编辑器实例
    editor = dialog.editor;

    UE = parent.UE;

    domUtils = UE.dom.domUtils;

    utils = UE.utils;

    browser = UE.browser;

    ajax = UE.ajax;

    $G = function ( id ) {
        return document.getElementById( id )
    };
    //focus元素
    $focus = function ( node ) {
        setTimeout( function () {
            if ( browser.ie ) {
                var r = node.createTextRange();
                r.collapse( false );
                r.select();
            } else {
                node.focus()
            }
        }, 0 )
    };
    utils.loadFile(document,{
        href:editor.options.themePath + editor.options.theme + "/dialogbase.css?cache="+Math.random(),
        tag:"link",
        type:"text/css",
        rel:"stylesheet"
    });
    lang = editor.getLang(dialog.className.split( "-" )[2]);
    if( lang ) {

        domUtils.on(window,'load',function () {
            var langImgPath = editor.options.langPath + editor.options.lang + "/images/";
            //针对静态资源
            for ( var i in lang["static"] ) {
                var dom = $G( i );
                if(!dom) continue;
                var tagName = dom.tagName,
                    content = lang["static"][i];
                if(content.src){
                    //clone
                    content = utils.extend({},content,false);
                    content.src = langImgPath + content.src;
                }
                if(content.style){
                    content = utils.extend({},content,false);
                    content.style = content.style.replace(/url\s*\(/g,"url(" + langImgPath)
                }
                switch ( tagName.toLowerCase() ) {
                    case "var":
                        dom.parentNode.replaceChild( document.createTextNode( content ), dom );
                        break;
                    case "select":
                        var ops = dom.options;
                        for ( var j = 0, oj; oj = ops[j]; ) {
                            oj.innerHTML = content.options[j++];
                        }
                        for ( var p in content ) {
                            p != "options" && dom.setAttribute( p, content[p] );
                        }
                        break;
                    default :
                        domUtils.setAttributes( dom, content);
                }
            }
			if ( dialog.title == "模板" ) {
				parent.$( "#" + dialog.buttons[0].id ).parent().parent().remove();
				parent.$( "#" + dialog.id + "_body" ).height(419);
			}
			if ( dialog.title != "模板" ) {
				return;
			}
			// tab 切换 我的模板和模板市场
			var $tab = $( "#tab" ),
				$tablist1 = $( "#tablist-1" ),
				$tablist2 = $( "#tablist-2" );
			$tab.find("a").click(function () {
				$tab.find("a").removeClass("temp_select_a_hover");
				$(this).addClass("temp_select_a_hover");
				var index = $tab.find("a").index($(this));
				if ( index === 0 ) {
					$tablist2.removeClass("g-dn");
					$tablist1.addClass("g-dn");
				} else {
					$tablist1.removeClass("g-dn");
					$tablist2.addClass("g-dn");
				}
			});
			// 使用artTemplate render 我的模板
			function renderMyTemp () {
				$.post("//member.csc86.com/product/sell/GetMyTmpls", function ( res ) {
					var status = res.status,
						data = res.data || [],
						len = data.length,
						html = template('tpl-myTemplate', res);
					$tablist2.empty().append(html);
					// 事件处理
					$tablist2.find(".tr-hack").each(function () {
						var isDefault = $(this).attr("isDefault"),
							d = $(this).children().last();
						if ( isDefault == "1" ) {
							$(this).addClass("hover");
							d.children().addClass("g-dn").eq(0).removeClass("g-dn");
						}
						// 设为默认
						d.children().eq(1).click(function () {
							var tid = $(this).parent().attr("tid"),
								p = $(this).parent().parent(),
								_t = $(this);
							$.post("//member.csc86.com/product/sell/SetDefaultTmpl", {'id': tid}, function ( res ) {
								if ( res.status == "1" ) {
									renderMyTemp();
								} else {
									alert( res.msg );
								}
							}, 'jsonp');
						});
						// 取消默认
						d.children().eq(2).click(function () {
							var tid = $(this).parent().attr("tid"),
								p = $(this).parent().parent(),
								_t = $(this);
							$.post("//member.csc86.com/product/sell/CancelDefaultTmpl", {'id': tid}, function ( res ) {
								if ( res.status == "1" ) {
									renderMyTemp();
								} else {
									alert( res.msg );
								}
							}, 'jsonp');
						});
						$(this).hover(function () {
							$(this).addClass("hover");
							if ( isDefault == "0" ) {
								d.children().addClass("g-dn").eq(1).removeClass("g-dn");  // 设为默认
							} else if ( isDefault == "1" ) {
								d.children().addClass("g-dn").eq(2).removeClass("g-dn");  // 取消默认
							}
						}, function () {
							if ( isDefault == "0" ) {
								$(this).removeClass("hover");
								d.children().addClass("g-dn");
							} else if ( isDefault == "1" ) {
								d.children().addClass("g-dn").eq(0).removeClass("g-dn");
							}
						});
					});
					// checkbox 事件
					$tablist2.find("input[name='c-all-temp']").change(function () {
						var ck = $(this)[0].checked,
							cboxs = $tablist2.find("input[name='c-temp']");
						if ( ck ) {
							cboxs.each(function () {
								$(this)[0].checked = true;
							});
						} else {
							cboxs.each(function () {
								$(this)[0].checked = false;
							});
						}
					});
					$tablist2.find("input[name='c-temp']").each(function () {
						$(this).change(function () {
							var ck = $(this)[0].checked,
								fg = true;
							if ( ck ) {
								$tablist2.find("input[name='c-temp']").each(function () {
									if ( ! $(this)[0].checked ) {
										fg = false;
									}
								});
								if ( fg ) {
									$tablist2.find("input[name='c-all-temp']")[0].checked = true;
								}
							} else {
								$tablist2.find("input[name='c-all-temp']")[0].checked = false;
							}
						});
					});
					// 删除我的模板
					$( "#delete-temp" ).click(function () {
						var ids = "";
						$tablist2.find("input[name='c-temp']").each(function () {
							var ck = $(this)[0].checked;
							if ( ck ) {
								ids += $(this).attr("tid") + ",";
							}
						});
						ids = ids.substring(0, ids.length-1);
						if ( ids.length === 0 ) {
							window.parent.art.dialog.alert("请选择模板",2);
							return false;
						}
						window.parent.art.dialog.confirm("确定删除该模板？", function () {
							$.post("//member.csc86.com/product/sell/BatchDeleteTmpl", {'ids': ids}, function ( res ) {
								if ( res.status == "1" ) {
									$tablist2.find("input[name='c-temp']").each(function () {
										var ck = $(this)[0].checked;
										if ( ck ) {
											$(this).parent().parent().remove();
											var count = parseInt( $( "#gz-temp-count" ).text(), 10 );
											$( "#gz-temp-count" ).text( --count );
										}
									});
								} else {
									alert( res.msg );
								}
							}, 'jsonp');
						}, function () {
						});
					});
					// 预览功能
					$tablist2.find(".tpl-preview").click(function () {
						previewFun.call(this);
					});
					// 使用功能
					$tablist2.find(".tpl-useit").click(function () {
						useIt.call(this);
					});
				}, 'jsonp');
			}
			renderMyTemp();
			
			// 使用artTemplate render 市场模板
			function renderSCTemp (a, b) {
				$.post("//member.csc86.com/product/sell/MarketTmplList", {'firstCate': a || "", 'secondCate': b || ""}, function ( res ) {
					var html = template('tpl-scTemplate', res);
					if ( $tablist1.children().length === 2 ) {
						$tablist1.children().last().remove();
					}
					$tablist1.append(html);
					// 预览功能
					$tablist1.find(".tpl-preview").click(function () {
						previewFun.call(this);
					});
					// 使用功能
					$tablist1.find(".tpl-useit").click(function () {
						useIt.call(this);
					});
				}, 'jsonp');
			}
			renderSCTemp();
			// render 类目
			$.post("//member.csc86.com/product/sell/GetTmplFirstCate", function ( res ) {
				if ( res.status == "1" && res.data && res.data.length > 0 ) {
					for ( var i = 0; i < res.data.length; i ++ ) {
						$( "#temp-cate-1" ).append('<option value="'+ res.data[i].categoryNo +'">'+ res.data[i].categoryName +'</option>');
					}
				}
			}, 'jsonp');
			$( "#temp-cate-1" ).change(function () {
				var v = $(this).val();
				if ( v == "-1" ) {
					$( "#temp-cate-2" ).empty().append('<option value="-1">请选择</option>');
				} else {
					$.post("//member.csc86.com/product/sell/getSecondCate", {'categoryNo': v}, function ( res ) {
						if ( res.status == "1" && res.data && res.data.length > 0 ) {
							for ( var i = 0; i < res.data.length; i ++ ) {
								$( "#temp-cate-2" ).empty().append('<option value="-1">请选择</option>')
									.append('<option value="'+ res.data[i].categoryNo +'">'+ res.data[i].categoryName +'</option>');
							}
						}
					}, 'jsonp');
				}
				renderSCTemp(v == "-1" ? "" : v);
			});
			$( "#temp-cate-2" ).change(function () {
				var v1 = $( "#temp-cate-1" ).val(),
					v2 = $( "#temp-cate-2" ).val();
				renderSCTemp(v1 == "-1" ? "" : v1, v2 == "-1" ? "" : v2);
			});
			// 预览函数
			function previewFun () {
				var $ = window.parent.$,
					tid = $(this).attr("tid"),
					type = $(this).attr("type"),
					show = function ( html ) {
						$.cscConfirm({
							content: html,
							title: "模板预览",
							width: 800,
							callback: function () {
								this.DOM.content.css({
									"padding": "0",
									'height': "600px",
									'overflow': "auto",
									'width': '820px'
									// 'white-space': 'normal'
								});
								this.DOM.buttons.hide();
								this._reset();
							},
							cancelFun: function () {
								this.DOM.content.css({
									"padding": "0",
									'height': "auto",
									'overflow': "auto",
									'width': 'auto'
									// 'white-space': 'normal'
								});
								this.DOM.buttons.show();
								this._reset();
							}
						});
					},
					html = '<iframe src="//res.csc86.com/v2/c/pro-template/'+ tid +'/index.html" style="width:820px;height:595px;border:none 0;"></iframe>';
				// 预览我的模板
				if ( type == "1" ) {
					$.post("//member.csc86.com/product/sell/previewMyTmpl", {'id': tid}, function ( res ) {
						if ( res.status == "1" ) {
							show(res.data.content);
						}
					}, 'jsonp');
					return;
				}
				show(html);
			}
			// 使用函数
			function useIt () {
				var p = window.parent,
					tid = $(this).attr("tid"),
					type = $(this).attr("type"),
					obj = {};
				// 使用我的模板
				if ( type == "1" ) {
					$.post("//member.csc86.com/product/sell/previewMyTmpl", {'id': tid}, function ( res ) {
						if ( res.status == "1" ) {
							obj.html = res.data.content;
							p.editor.execCommand("cleardoc");
							p.editor.execCommand( "template", obj );
							dialog.close();
						}
					}, 'jsonp');
					return;
				}
				// 使用市场模板
				var loader = $( "<div>" );
				loader.load("//res.csc86.com/v2/c/pro-template/"+ tid +"/index.html", function ( res ) {
					res = res.substring(res.indexOf('<body>')+6, res.indexOf("</body>"));
					res = res.replace(/>\s+</gm, "><");
					
					obj.html = $.trim( res );
					p.editor.execCommand("cleardoc");
					p.editor.execCommand( "template", obj );
					dialog.close();
				});
			}
        });
    }
})();

