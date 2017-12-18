define(function(require, exports, module) {

  var dialog = require('dialog');

  $(".jsUpload").bind("click",function(event){//上传文件
    event.preventDefault();
    var html = '<ul id="upUl" class="upload-bd">'+
                  '<li>'+
                    '<span class="upload-td">应用名称：</span>'+
                    '逛市场'+
                  '</li>'+
                  '<li>'+
                    '<span class="upload-td">版本号：</span>'+
                    '<input type="text" id="appVersion" maxlength="10" name="appVersion" />'+
                    '<input type="hidden" id="fileName" name="fileName" />'+
                    '<input type="hidden" id="filePath" name="filePath" />'+
                  '</li>'+
                  '<li>'+
                    '<span class="upload-td">选择文件：</span>'+
                    '<button id="upFile" class="upFileButton">上传</button>'+
                  '</li>'+
               '</ul>';
    dialog({
      title:"编辑应用",
      content:html,
      ok:function(){
        var version = $("input#appVersion").val(),
            fileName = $("input#fileName").val(),
            filePath = $("input#filePath").val();

        $.post("app.uploadAdd",{"version":version,"fileName":fileName,"filePath":filePath},function(response){
          if(response.status){
            dialog.success(response.msg,1.5,function(){window.location.href = window.location.href});
          }else{
            dialog.error(response.msg,function(){window.location.href = window.location.href});
          }
        },"json")

      },
      cancel:true,
      okVal:"确定",
      cancelVal:"取消",
      lock:true
    });

    newUpload("upFile");
  });

  function verfyAppVersion(obj){
    var $this = $(obj);
    $this.next().remove();
    if(!($this.val()) || ($this.val())==""){
      $this.after("<span class='upfilerr'>* 版本号不能为空</span>");
      return false;
    }
  }

  $(".JSdelapp").bind("click",function(){//删除
    var id = $(this).parent("td").attr("id");
    $.post("app.packageDelete",{"id":id},function(response){
      if(response.status){
        dialog.success(response.msg,1.5,function(){window.location.href = window.location.href});
      }else{
        dialog.error(response.msg,function(){window.location.href = window.location.href});
      }
    },"json");
  });

  $(".JSonapp").bind("click",function(){//启用
    var id = $(this).parent("td").attr("id");
    $.post("app.packageActivity",{"id":id},function(response){
      if(response.status){
        dialog.success(response.msg,1.5,function(){window.location.href = window.location.href});
      }else{
        dialog.error(response.msg,function(){window.location.href = window.location.href});
      }
    },"json");
  });

});