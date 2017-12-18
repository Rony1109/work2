define(function(require, exports, module) {
    var receipt={
		init:function(){
			var url = location.search; //获取url中"?"符后的字串 
			if (url.indexOf("?") != -1) { 
				var str = url.substr(1); 
				var strs = str.split("&"); 
				var ss=strs[0];
				var sss=ss.split("=");
				var uid=this.getQueryString(sss[0]);
			} 
			if(uid==null){}else{
			//url: '//estate.csc86.com/receipt?'+uid=09b140e9-9ddf-4d29-8983-2119a5ba6f57',
				$.ajax({
	                url: '//estate.csc86.com/receipt?'+sss[0]+'='+uid,
	                type: "post",
	                dataType: 'jsonp',
	                success: function (data) {
	                	//console.log(data);
	                	if(data.status==1)
	                	{
	                		var str="<div class='sh_nullpotion'>"+
										"<img src='img/null.png' class='index_img_alter sh_di_block sh_margin_a'>"+
									"</div>";
							var htm = $('.receiptall').html();
	                    	$('.receiptall').html(htm + str);		
	                	}else{
		                	var data = JSON.parse(data.data); 
		                	var len=data.length;
		                	//console.log(data);
		                	var str="";

		                	for(var i=0;i<len;i++)
		                	{
		                		str+="<div class='sh_bg_color_3 sh_pr_hg20 sh_bor_bottom_3'></div>"+
		                			 	"<div class='sh_bg_color_2 index_choose_container sh_pd_top20 sh_te_align_c sh_font_sz0 sh_pd_bottom20'>"+
											"<div class='sh_pd_left20  sh_float_l sh_te_align_c sh_width_2'><img src='"+data[i].logo+"' alt='' class='sh_v_middle sh_img_max'></div>"+ 
											"<div class='sh_float_l sh_margin_l_2 sh_pr_hg140 sh_width_9'><div class='sh_font_sz28'>"+data[i].banner_ch+"</div>"+
						 					"<div class='sh_font_sz20 sh_font_color11'>"+data[i].banner_en+"</div>"+
						 				"</div>"+
						 			"</div>"+
						 			"<div class='sh_bg_color_2 sh_te_align_c sh_pd_bottom15 sh_font_sz28'>电子收据(Official Receipt)</div>"+
						 			"<div class='sh_pd_left20 sh_pd_right20 sh_bg_color_2 sh_pd_bottom15 sh_font_color10 index_choose_container'>"+
										"<div class='sh_float_l sh_font_sz28'>"+data[i].payTime+"</div>"+
										"<div class='sh_float_r sh_font_sz28'>No："+data[i].electronicReceiptNo+"</div>"+
									"</div>"+
									"<div class='sh_bg_color_1'>"+
										"<div class='sh_margin_l_2 sh_margin_r_2 sh_font_color10 sh_fkname'>"+
											"<div class='sh_width_7 sh_float_l sh_pd_left20 sh_bor_right_2 sh_font_sz28 sh_pr_hg90'>付款人名称:</div>"+
											"<div class='sh_float_l sh_pd_left20 sh_font_sz28 sh_pr_hg90 sh_width_65'>"+data[i].ownerName+"</div>"+
										"</div>"+
									"</div>"+
									"<div class='sh_bg_color_1'>"+
										"<div class='sh_margin_l_2 sh_margin_r_2 sh_font_color10 sh_sphcs-als sh_bor_a_2 sh_bor_top_0'>"+
											"<div class='sh_float_l sh_sphcs-lef'>"+
												"<div class='sh_pd_left20 sh_font_sz28 sh_pr_hg18_100'>商铺号:</div>"+
											"</div>"+
											"<div class='sh_float_l sh_sphcs-rig'>"+
												"<div class='sh_pd_left20 sh_font_sz28'>"+data[i].shopNum+"</div>"+	
											"</div>"+
											"<div class='sh_clear_sp'></div>"+
										"</div>"+
									"</div>"+
									"<div class='sh_bg_color_1'>"+
										"<div class='sh_margin_l_2 sh_margin_r_2 sh_font_color10 sh_sphcs'>"+
											"<div class='sh_width_50 sh_float_l  sh_te_align_c sh_bor_right_2'>项目</div>"+
											"<div class='sh_float_l  sh_width_3 sh_te_align_c sh_bor_right_2'>金额</div>"+
											"<div class='sh_float_l  sh_width_3 sh_te_align_c' >备注</div>"+
										"</div>"+
									"</div>";
									for(var j=0;j<data[i].records.length;j++)
									{
										str+="<div class='sh_bg_color_1 sh_font_color10'>"+
											 	"<table cellpadding=0 cellspacing=0 class='sh_tab_all' >"+
													"<tr>"+
														"<td class='sh_tab_td1'>"+data[i].records[j].projectName+"</td>"+
														"<td class='sh_tab_td2'>¥"+data[i].records[j].moneyStr+"</td>"+
														"<td>截至"+data[i].records[j].deadLineStr+"<br/>"+data[i].records[j].couponStr+"</td>"+
													"</tr>"+
												"</table>"+
											"</div>"
									}
									str+="<div class='sh_bg_color_1 sh_positon_r'>"+
										 	"<div class='sh_margin_l_2 sh_margin_r_2 sh_font_color10 sh_sphcs'>"+
											 	"<div class='sh_width_4 sh_float_l sh_pd_left20 sh_bor_right_2 sh_font_sz20'>金额总额（大写）:</div>"+
												"<div class='sh_width_59 sh_float_l sh_pd_left20 sh_te_align_r sh_font_sz24'>"+data[i].totalMonye_Ch+"</div>"+
								   		 		"<div class='sh_positon_a sh_position_img'><img src='"+data[i].seal+"' alt='' class='sh_v_middle pro_intrHead_left_a sh_pd_right36 sh_pd_bottom10 sh_pd_top10 sh_width_175'>"+
								   			"</div>"+
										"</div>"+
										"<div class='sh_bg_color_1 sh_pd_bottom15'>"+
											"<div class='sh_margin_l_2 sh_margin_r_2 sh_font_color10 sh_sphcs'>"+
												"<div class='sh_width_4 sh_float_l sh_pd_left20 sh_bor_right_2 sh_font_sz20'>金额总额（小写）:</div>"+
												"<div class='sh_width_59 sh_float_l sh_pd_left20 sh_te_align_r sh_font_sz24'>¥"+data[i].totalMonye_Num+"</div>"+
											"</div>"+
										"</div>"; 
									
		                	}
		                	var htm = $('.receiptall').html();
		                    $('.receiptall').html(htm + str);
		                }    
	                }


	            });	
			}
		},
		getQueryString:function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return decodeURI(r[2]); return null; //返回参数值
        },

	};
	receipt.init();
});