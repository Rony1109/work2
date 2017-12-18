/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
	var dialog=require('//res.csc86.com/f=v2/m/dialog/js/init.js,js/m/config.js');
    require("//res.csc86.com/swfupload/");//上传图片插件
    var isSubmit=false;


var  dsq=function(){
    var $dsqform=$('.dsqform');
    var dataobj=$dsqform.serialize();
    $.post('//programlog.csc86.com/javaLogSearch.html',dataobj,function(data){
        var html='';
        $.each(data.data,function(){
            if(data.status==true){
                var me=this;
                var content='';
                var level='';
                var code=$.trim(me.code)?me.code+'<br>':'';
                var message=$.trim(me.message)?me.message+'<br>':'';
                var params=$.trim(me.params)?me.params+'<br>':'';
                var throwable=$.trim(me.throwable)?me.throwable+'<br>':'';
                if(me.code.length+me.message.length+me.params.length+me.throwable.length>500){
                    content='<div class="wdt wdt2"><div class="zk">'+me.code+'<br>'+me.message+'<br>'+me.params+'<br>'+me.throwable+'</div><span class="zkgd">查看更多</span></div>';
                }else{
                    content='<div class="wdt wdt2">'+code+message+params+throwable+'</div>';
                }
                if(me.level=="ERROR"){
                    level='<span class="error">'+me.level+'</span>';
                }else{
                    level=me.level;
                }
                html+='<tr>\
            <td>'+me.loginId+'</td>\
            <td>'+me.ip+'</td>\
        <td>'+me.time+'</td>\
        <td>'+me.appName+'</td>\
        <td class="tl"><div class="wdt">'+me.className+'</div></td>\
            <td>'+level+'</td>\
            <td class="tl">'+content+'</td>\
        </tr>';
            }
            }
          );
      $('.cwmxtable').find('tbody').html(html);
    },'jsonp');
};

    $('.dssx').on('click',function(){
        dsq();
        var dsqgo=setInterval(dsq,60000);
        $(this).attr("disabled","");
    });

    $('.close-left').on('click',function(){
        if($('.warpbottom').is('.qp')){
            $('.warpbottom').removeClass('qp');
        }else{
            $('.warpbottom').addClass('qp');
        }
    });
    var upload = function(callback){

        $('.jsUploadBtn').each(function(){
            var id=$(this).attr('id');
            new SWFUpload(uploadSettings({
                upload_url: "https://member.csc86.com/file/upload?hash=ZGU2NWUwNDQtYmM3YS00YjExLWJhYTEtYjVjYmIyMGQ0OTM4",
                //type:"androidPhoto",
                button_placeholder_id:id,
                button_action:SWFUpload.BUTTON_ACTION.SELECT_FILES,
                file_types: "*.war;*.rar;*.zip",
                file_size_limit : "200MB",
               // button_image_url : "//res.csc86.com/v2/c/member/supply/css/img/upload-btn.png",
                button_width: 80,
                //button_height : 80,
                file_upload_limit : 0,
                button_text_left_padding:18,
                button_text_top_padding: 2,
                button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
                button_text: '<span class="btncor">上传</span>',
                button_text_style:".btncor{color:#555;font-size:12px}",
                upload_success_handler:function(file, serverData){
                    var response =  eval('(' + serverData + ')');
                    if(response.result != "success"){
                        var msg = response.msg || "上传失败，请稍后重试！";
                        artDialog.tip(msg,2);
                        return;
                    } else {
                        var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]);
                        var $th=$('#SWFUpload_'+id);
                        var $thparent=$th.parents('.tjtp li');
                        //$thparent.find('.p1').html("<img  src="+url+file.type+">");
                        $thparent.find('.p0 img').attr("src",url);
                        var key=response.key.replace(/\//,"")+file.type;
                        var $imglink = $thparent.find('input');
                        $imglink.val(response.key);

                        //this.setButtonText('<span class="btncor">上传图片</span>');
                        if(callback){callback()};

                    }
                }
            }));
        });
    };
   // upload();
	$('.repair').on('click',function(){
		var thisdata=$(this).data("objid");
		var  dataobj={"ROW_KEY":thisdata};
		$(this).removeClass();
		$(this).text('已修复');
		$.post('//programlog.csc86.com/updateRepairStatus.html',dataobj,function(){},'jsonp')
	});

    $('.logdel').on('click',function(){
        var thisdata=$(this).data("sj");
        if(isSubmit===true){return false;}//阻止表单重复提交
        isSubmit=true;
        $.post('//logcode.csc86.com/delete.html',thisdata,function(data){
        if(data.status==true){
            dialog.tip(data.msg,3,function(){location.href=location.href});
        }else{
            dialog.tip(data.msg,3);
        }
        isSubmit=false;
        },'jsonp');
    });

    $('.logextract').on('click',function(){
        var thisdata=$(this).data("sj");
        if(isSubmit===true){return false;}//阻止表单重复提交
        isSubmit=true;
        $.post('//logcode.csc86.com/searchProject.html',thisdata,function(data){
            if(data.status==true){
                dialog.tip(data.msg,3,function(){location.href=location.href});
            }else{
                dialog.tip(data.msg,3);
            }
            isSubmit=false;
        },'jsonp');
    });

    $('.logedit').on('click',function(){
        var thisdata=$(this).data("sj");

        var html='<div class="logbmdiv"><form class="logbmform"><table class="logbmtable" cellspacing="0" cellpadding="0">\
                <colgroup>\
                <col width="100">\
                <col>\
                </colgroup>\
                <tbody>\
                <tr>\
                <td>项目名称</td>\
                <td class="tl"><input type="hidden" value="'+thisdata.id+'" name="id"><input class="inpt1" value="'+thisdata.appName+'" name="appName"></td>\
                </tr>\
                <tr>\
                <td>项目编号</td>\
                <td class="tl"><input class="inpt1"  value="'+thisdata.appCode+'" name="appCode"></td>\
                </tr>\
                <tr>\
                <td>SVN路径</td>\
                <td class="tl"><input class="inpt1"  value="'+thisdata.svn+'" name="svn"></td>\
                </tr>\
                </tbody>\
                </table></form></div>';
        var dg=art.dialog({
            id:'logedit',
            title:"修改",
            content:html,
            padding:"10px",
            fixed:true,
            lock:true,
            cancel:true,
            okVal:"确定",
            opacity:0.3,
            init:function(){

                $(this.DOM.buttons[0].firstChild).css({
                    'background': '#0a6cd6'
                });

            },
            ok:function(){
                var $dataobj=$('.logbmform').serializeArray();
                if(isSubmit===true){return false;}//阻止表单重复提交
                isSubmit=true;
                $.post('//logcode.csc86.com/update.html',$dataobj,function(data){
                    if(data.status==true){

                        dialog.tip(data.msg,3,function(){location.href=location.href});
                    }else{
                        dialog.tip(data.msg,3);
                    }
                    isSubmit=false;
                },'jsonp');
            }
        });

    });


    $('.logadd').on('click',function(){
        var thisdata=$(this).data("sj");

        var html='<div class="logbmdiv"><form class="logbmform"><table class="logbmtable" cellspacing="0" cellpadding="0">\
                <colgroup>\
                <col width="100">\
                <col>\
                </colgroup>\
                <tbody>\
                <tr>\
                <td>项目名称</td>\
                <td class="tl"><input class="inpt1" value="" name="appName"></td>\
                </tr>\
                <tr>\
                <td>项目编号</td>\
                <td class="tl"><input class="inpt1"  value="" name="appCode"></td>\
                </tr>\
                <tr>\
                <td>SVN路径</td>\
                <td class="tl"><input class="inpt1"  value="" name="svn"></td>\
                </tr>\
                </tbody>\
                </table></form></div>';
        var dg=art.dialog({
            id:'logedit',
            title:"新增",
            content:html,
            padding:"10px",
            fixed:true,
            lock:true,
            cancel:true,
            okVal:"确定",
            opacity:0.3,
            init:function(){

                $(this.DOM.buttons[0].firstChild).css({
                    'background': '#0a6cd6'
                });

            },
            ok:function(){
                var $dataobj=$('.logbmform').serializeArray();
                if(isSubmit===true){return false;}//阻止表单重复提交
                isSubmit=true;
                $.post('//logcode.csc86.com/insert.html',$dataobj,function(data){
                    if(data.status==true){

                        dialog.tip(data.msg,3,function(){location.href=location.href});
                    }else{
                        dialog.tip(data.msg,3);
                    }
                    isSubmit=false;
                },'jsonp');
            }
        });

    });

    $('#uploadBtn2').on('click',function(){
        var $thisfrom=$(this).parents("form");
        var dataobj=$thisfrom.serialize();
        if(isSubmit===true){return false;}//阻止表单重复提交
        isSubmit=true;
        $.post('//logcode.csc86.com/logCode/searchApp.html',dataobj,function(data){


                artDialog.tip(data.msg,3);
            isSubmit=false;
        },'jsonp');
        return false;
    });

    $('#uploadBtn3').on('click',function(){
        var $thisfrom=$(this).parents("form");
        var dataobj=$thisfrom.serialize();
        if(isSubmit===true){return false;}//阻止表单重复提交
        isSubmit=true;
        $.post('//logcode.csc86.com/unusedLogCode.html',dataobj,function(data){

            if(data.status==true){
                var html='';
            $.each(data.data,function(){
                var me=this;
                html+='<div style="text-align: center"> <p>'+me+'</p></div>';
            });


                var dg=art.dialog({
                    id:'addpp',
                    title:"日志编码",
                    content:html,
                    padding:"10px",
                    fixed:true,
                    lock:true,
                    //cancel:true,
                   // okVal:"确定",
                    opacity:0.3,
                    init:function(){
                    }
                });


             }
            isSubmit=false;
        },'jsonp');
        return false;
    });

	$('.cwmxtable').on('click','.zkgd',function(){
		//$(this).parent().find('.zk').removeClass();
		//$(this).remove();
		var divH=$(window).height()-110+'px';
		var html='<div style="max-height:'+divH+';overflow-y: auto; padding: 30px; width: 1000px;word-wrap:break-word; white-space: pre-wrap">'+$(this).parent().find('.zk').html()+'</div>';
		var ts = dialog({
			id: 'ts',
			title: "完整信息",
			content: html,
			padding: 0,
			fixed: true,
			lock: true,
			opacity: 0.2,
			init: function() {
				/*$('.aui_state_lock').addClass('paymentszf');
				$('.ydty span').on('click',function() {
					tsdg.close();
					return false;
				});*/
			}
			// width: '80%'
			//height: 200
		});
	});

});