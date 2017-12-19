/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({
    alias: {
        'top': 'c2/newcgsc/js/newtop.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    }
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');
    $("#myform").find("input[type=button]").on("click",function(){
        var $this=$(this);
        var arr1 = [],arr2=[],arr3=[];
        var len1=$.trim($("#company").val()).length,len2=$.trim($("#contact").val()).length,len3=$.trim($("#phone").val()).length;
        $(".category input[type=checkbox]:checked").each(function () {
            arr1.push($(this).val());
        });
        $(".saleform input[type=checkbox]:checked").each(function () {
            arr2.push($(this).val());
        });
        $(" input[type=radio]:checked").each(function () {
            arr3.push($(this).val());
        });
        //$("#category").val(arr1.join(","));
        //$("#saleform").val(arr2.join(","));
        if(arr1.length<=0){
          alert("请选择入驻品类");
            return;
        }else if(arr2.length<=0){
            alert("请选择主要销售模式");
            return;
        }else if(arr1.length<=0){
            alert("请选择公司类型");
            return;
        }else if(len1<=0){
            alert("请填写公司全称");
            return;
        }
        else if(len2<=0){
            alert("请填写联系人");
            return;
        }
        else if(len3<=0){
            alert("请填写手机号码");
            return;
        }
        var datas=$("#myform").serializeArray();
        $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
            if(data.status==true){
                alert("提交成功")
            }else{
                alert('提交失败！')
            }
        }, 'jsonp');
     return false
    })
    $('.bank-list li').hover(function(){
        $(this).addClass('li-hover');
    },function(){
        $(this).removeClass('li-hover');
    });
});
