
define(function(require, exports, module){
	module.exports  = {
		// 省市地区级联菜单选择
		addrCascade: function (s_prov, s_city, s_area, provinceId, cityId) {
			var host = "//i.csc86.com/",
				api_Prov = "getAllProvince",
				api_Zone = "getZoneByParentId?parentId=";

			// 获取省的数据
			if ( arguments.length === 3 ) {
				$.get(host + api_Prov, function ( res ) {
					if ( res.status == "200" ) {
						var data = res.data;
						createOption( data, s_prov );
					}
				}, 'jsonp');
			}
			// 生产option选择项
			function createOption ( data, elem ) {
				var len = data.length, i = 0,
					opt = $('<option>'),
					t;
				clearOption( elem );
				for ( ; i < len ; i ++ ) {
					t = opt.clone();
					t.attr("value", data[i].id);
					t.text(data[i].name);
					elem.append(t);
				}
			}
			// 清除选择项
			function clearOption () {
				var i = 0, args = arguments, len = args.length, temp;
				for ( ; i < len ; i++ ) {
					temp = args[ i ];
					var t = temp.children().first();
					temp.empty();
					temp.append(t);
				}
				s_area.show();
			}
			// 选择省
			s_prov.change(function () {
				var v = $(this).val();
				if ( v && v != -1 ) {
					// 先清除市和区
					clearOption(s_city, s_area);
					// 获取市的数据
					$.get(host + api_Zone + v, function ( res ) {
						if ( res.status == "200" ) {
							var data = res.data;
							createOption( data, s_city );
						}
					}, 'jsonp');
				} else {
					clearOption(s_city, s_area);
				}
			});
			// 选择市
			s_city.change(function () {
				var v = $(this).val();
				if ( v && v != -1 ) {
					// 先清除区
					clearOption(s_area);
					// 获取区的数据
					$.get(host + api_Zone + v, function ( res ) {
						if ( res.status == "200" ) {
							var data = res.data;
							createOption( data, s_area );
							s_area.show();
						} else {
							s_area.hide();
						}
					}, 'jsonp');
				} else {
					clearOption(s_area);
				}
			});
			
			if ( provinceId && cityId ) {
				/*$.get(host + api_Zone + provinceId, function ( res ) {
					if ( res.status == "200" ) {
						var data = res.data;
						createOption( data, s_city );
					}
				}, 'jsonp');*/
				/*$.get(host + api_Zone + cityId, function ( res ) {
					if ( res.status == "200" ) {
						var data = res.data;
						createOption( data, s_area );
						s_area.show();
					} else {
						s_area.hide();
					}
				}, 'jsonp');*/
				$.ajax({  
		          url: host + api_Zone + provinceId,  
		          async: false,
		          dataType: 'jsonp',  
		          success: function(res){  
		            if ( res.status == "200" ) {
						var data = res.data;
						createOption( data, s_city );
					} 
		          }  
		        });
		        $.ajax({  
		          url: host + api_Zone + cityId,  
		          async: false,
		          dataType: 'jsonp',  
		          success: function(res){  
		            if ( res.status == "200" ) {
						var data = res.data;
						createOption( data, s_area );
						s_area.show();
					} else {
						s_area.hide();
					}
		          }  
		        });
			}
		},
		// 输入框内容删除增强
		inputDeletePlus: function ( context ) {
			context = context || document;
			$( context ).find("input:text").each(function () {
				var t = $(this),
					btn = $( '<i></i>' ),
					w = t.outerWidth( true ),
					mt = t.outerHeight( true ) - t.outerHeight(),
					offst = t.position();
				
				btn.css({
					'background': 'url(//res.csc86.com/v2/l/addrselect/css/img/close.png) 10px 0',
					'width': 10 + "px",
					'height': 10 + "px",
					'position': 'absolute',
					'left': offst.left + w - 15 + 17 + 'px',
					'top': offst.top + 9 + mt + 'px'
				});
				t.css({
					'padding-right': 20 + 'px'
				});
				t.focus(function () {
					var vl = $(this).val(),
						_this = $(this);
					if ( vl.length > 0 ) {
						_this.parent().append( btn );
						btn.click(function () {
							_this.val("");
							_this[0].focus();
							$(this).remove();
						});
					}
				});
				t.blur(function () {
					setTimeout(function () {
						btn.remove();
					},100);
				});
			});
		}
	};
});