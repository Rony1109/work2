
    var url =BASEURL+"bops-app/bops/";

    var refC = getref_html();

    //生成输入理由文本框
	  function getref_html(){
				var html="";
				/*html = '<div class="ly-d-art"><p>请选择或输入拒绝理由:</p>';
				for(i=0;i<res.length;i++){
					html += '<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="'+res[i]+'">'+(i+1)+'、'+res[i]+'</p>'
				}
				html += '</div>';*/
				html += '<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';
				return html;
	    }
	   //全选和全不选
      function selectedAll(flag){

				var checkboxs = document.getElementsByName("chkbox");

				if(flag){
					for(var i=0;i<checkboxs.length;i++){
						checkboxs[i].checked = true;
					}
				}else{
					for(var i=0;i<checkboxs.length;i++){
						checkboxs[i].checked = false;
					}
				}
      }

  	  //融资审核搜索
      function searchByPm(state){

	      	var  searchname=document.getElementById("searchname").value; //用户名

	      	var  isNative=document.getElementById("isNative").value; //户籍

	      	var  loanAmount=document.getElementById("loanAmount").value; //贷款金额

	      	var st=$("#startTime").val(); //开始时间

		      var et=$("#endTime").val(); //结束时间

		      var url_arg="?state="+state+"&searchname="+searchname+"&isNative="+isNative+"&loanAmount="+loanAmount+"&startdate="+st+"&enddate="+et;

		      window.location.href="finance.findFinanceDataList" + url_arg;
      }

      //融资审核查看详情
	    function showDetail(listtest,id){

 		    document.myfinance.action="finance.financeDetail?uuid="+id+"&listtest="+listtest;
		    document.myfinance.submit();
       }


	    //列表页批量审核通过
		  function updateBatchState(flag){
				var $checked = $('tbody').find('.list-id input:checked');
				if($checked.length>0){
					var uuids=[];
					$checked.each(function(){
						uuids.push(this.value);
					});
					if(flag=="pass"){
					   $.post(url+"finance.updateBatchState",{laststate:"pass",uuid:uuids},function(data){aReturn(data,"审核通过！","审核不通过!");},"jsonp");
					}else{
					   if(window.confirm("你确定要删除这些数据吗?")){
					     $.post(url+"finance.updateBatchState",{laststate:"del",uuid:uuids},function(data){aReturn(data,"删除成功！","删除失败!");},"jsonp");
					    }
					}
				}else{
					art.dialog({
						content: '请先选择您要操作的项！',
						fixed: true,
						time: 1.5
					});
				}
		  }

		  //列表页单个审核通过
		  function updateState(uuid ,flag){

		 		$.post(url+"finance.updateState",{laststate:"pass",uuid:uuid},function(data){aReturn(data,"审核通过！","审核不通过!");},"jsonp");

		  }


	    //批量拒绝
		   function mvRefs(){
				 var $checked = $('tbody').find('.list-id input:checked');
				 if($checked.length>0){
					var uuids=[];
					$checked.each(function(){
						uuids.push(this.value);
					});
				   mvRefs_pr("finance.updateBatchState",{uuid:uuids},refC);
				 }else{
					art.dialog({
						content: '请先选择您要操作的项！',
						fixed: true,
						time: 1.5
					});
			   }
		  }

			//批量拒绝理由
		  function mvRefs_pr(href,prVal,ref){
					art.dialog({
						title:"拒绝理由",
						content: ref,
						fixed: true,
						okVal: '保存',
						background:"#000",
						opacity:"0.3",
						ok: function () {
							var textVal=document.getElementById("testVal").value;
							if(verifyReason(textVal,"#testVal")){
								$.post(url+href,{laststate:"refs",reason:textVal,uuid:prVal['uuid']},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
							}else{
								return false;
							}
						},
						init:function(){
							$(".test-focus").click(function(){
								//$(".ly-d-art input").removeAttr("checked");
								$(this).children(".test-lay").remove();
							});
						},
						cancel: true,
						lock:true
					});
			}

	    //单个拒绝
	    function mvRefs_s(obj){
					var $tr=$(obj).parents("tr").find(".list-id"),
					uuid = $tr.find('input:checkbox').val();
					mvRefs_sPr("finance.updateState",{uuid:uuid},refC);
			 }

		   //单个拒绝理由
		   function mvRefs_sPr(href,valTd,ref){
				    art.dialog({
					title:"拒绝理由",
					content:ref,
					fixed: true,
					okVal: '保存',
					background:"#000",
					opacity:"0.3",
					ok: function () {
						var textVal=document.getElementById("testVal").value;
						if(verifyReason(textVal,"#testVal")){
							$.post(href,{laststate:"refs",reason:textVal,uuid:valTd['uuid']},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
						}else{
							return false;
						}
					},
					init:function(){
						$(".test-focus").click(function(){
							//$(".ly-d-art input").removeAttr("checked");
							$(this).children(".test-lay").remove();
						});
					},
					cancel: true,
					lock:true
				  });
	     }

       //理由
			 function verifyReason(text,id){
          if(text.length == 0){
						aReturn(0,"","请输入理由");
						return false;
					}else if(text.length <=5 ){
						aReturn(0,"","理由少于5个字符");
						return false;
					}
					var id = id || "#testVal",
						$id = $(id);
					if(maxLength(text)){
						$id.next("p.error-msg").remove();
						return true;
					}else{
						$id.next().is("p.error-msg") ? '' : $id.after('<p class="error-msg" style="position:absolute;margin-top:-2px;color:#f00">输入了超过2000个字符数限制</p>');
						return false;
					};
			 }

       //返回
			 function aReturn(tmp,po,pt){
				if(tmp>0){
					art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
					setTimeout(function(){location.href = location.href;},1500);
				}else{
					art.dialog({content: pt,icon: 'error',fixed: true,time: 1.5});
				}
			 }

	    //详情页单个通过
		  function mvPass_d(state){

				var selT = [tmpList['data'][tmpList['listtest']][0]];
				$.get(url+"finance.updateBatchState",{laststate:"pass",uuid:selT},function(data){aBack(data,"审核成功！","审核不通过",state);},"jsonp");

			}

      //详情页单个拒绝
		  function mvRefs_d(state){
			  var selT = [tmpList['data'][tmpList['listtest']][0]];
		    mvRefs_d_pr("finance.updateBatchState",{uuid:selT},refC,state);

		  }


		  //详情页拒绝
		  function mvRefs_d_pr(href,valT,ref,state){
			art.dialog({
					title:"拒绝理由",
					content:ref,
					fixed: true,
					okVal: '保存',
					background:"#000",
					opacity:"0.3",
					ok: function () {
						var textVal=document.getElementById("testVal").value;
						if(verifyReason(textVal,"#testVal")){
							$.post(url+href,{laststate:"refs",reason:textVal,uuid:valT['uuid']},function(data){aBack(data,"操作成功！","操作失败！",state);},"jsonp");
						}else{
							return false;
						}
					},
					init:function(){
						$(".test-focus").click(function(){
							//$(".ly-d-art input").removeAttr("checked");
							$(this).children(".test-lay").remove();
						});
					},
					cancel: true,
					lock:true
				});
		  }

		  //限制长度
      function maxLength(text,num){
      	var num = num || 2000;
      	return text.length<=num ? true : false;
      }

      //返回
		  function aBack(tmp,po,pt,state){

					if(tmp>0){
						art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
						setTimeout(function(){window.location.href="finance.findFinanceDataList?state="+state;},1500);
					}else{
						art.dialog({content:pt,icon: 'error',fixed: true,time: 1.5});
					}
			}
			//详情页下一条
	    function verifyNextId(){

				if(tmpList.listtest == (tmpList.total-1)){
					art.dialog({content: "当前已是最后一条！",icon: 'error',fixed: true,time: 1.5});
					return;
				}

				if(tmpList.listtest == tmpList.lastsize){
					var data = {};
					$("div.index-look").find("input").each(function (i,item){
						var $item = $(item);
						data[$item.attr("name")] = $.trim($item.val());
					});
					data['pageIndex']=tmpList['pageIndex'];
					$.ajax({
						url:"finance.findFinanceTo10",
						data:data,
						async:false,
						success:function (data){
							var tmp = {};
							for(var i in data){
								tmp[data[i]['listtest']] = [data[i]['uuid'],''];
							}
							tmpList['data']=tmp;
							tmpList.lastsize = tmpList.lastsize + data.length;
							tmpList.pageIndex+=1;
							tmpList.listtest+=1;
							$.post("finance.nextFinanceDetail",{uuid:tmpList['data'][tmpList.listtest][0]},function (data){
								dateTemplate(data['financeDetail']);
							},"jsonp");
						},
						dataType:"jsonp"
					});
				}else{
					tmpList.listtest+=1;
					$.post("finance.nextFinanceDetail",{uuid:tmpList['data'][tmpList.listtest][0]},function (data){
						dateTemplate(data['financeDetail']);
					},"jsonp");
				}
  	 }
     	//详情页模板
		  function dateTemplate(data){

			$.each(data,function (i,item){

				$("#"+i).html(item);
			});
			ImgZoomFun("a.highslide");
		 }

