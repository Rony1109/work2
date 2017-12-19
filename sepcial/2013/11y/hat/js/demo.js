var editor;

function showTopic(){
    showTopic_ajaxBind();
    csc.ie6 && seajs.use(csc.url("res","/f=js/m/hover"),function (){csc.hover(".q_tpc_title .f_comm");});
}

//编辑器
function showTopic_ajaxBind(){
    if(typeof(KindEditor) !== "undefind" && $("#replyContent").length){
        editor = KindEditor.create("#replyContent", {
            themeType : 'qq',
            pasteType : 1,
            newlineTag:'br',
            afterChange : function() {
                var v='<span class="chLeft">500</span>';
                showTopic_jc(this.count('text'));
                this.sync();
            }
        });
        seajs.use(csc.url("res","/js/m/emoticons"),function (){
            $("#addreg").find(".emoticons").on("click",function(){emoticons_ico.emoticons(editor,this)});
        })
    }
}

//字数检查
function showTopic_jc(n){
    var pass=false,v='<span class="chLeft">500</span>';
    if(n==0){
        $("#submitBtn").attr({"class":"r2-btn1","disabled":true});
    }else if(n>500){
        v='<span class="chLeft red">已超出'+(n-500)+'</span>';
        $("#submitBtn").attr({"class":"r2-btn1","disabled":true});
    }else if(1<=n && n<=500){
        v='<span class="chLeft">'+(500-n)+'</span>';
        $("#submitBtn").attr({"class":"r2-btn","disabled":false});
        pass = true;
    }
    $(".rep-font-nu").html(v);
    return pass;
}

//话题回复
function showTopic_Reply(form){
    var n = editor.count('text'),
        o = form ? $(form): $("#addreg"),
        username = $("input[name='username']").val(),
        email = $("input[name='email']").val();

    if(username==''){
        $(".addregcomm .error").html("请输入昵称").show();
        setTimeout(function(){
            $(".addregcomm .error").fadeOut();
        },2000);
        return false;
    }

//    if($("#submitBtn").attr("replying")){
//        return false;
//    }
    if(email !==''){
        if(!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)){
            $(".addregcomm .error").html("邮箱格式不正确").show();
            setTimeout(function(){
                $(".addregcomm .error").fadeOut();
            },2000);
            return false;
        }
    }
    //$("#submitBtn").attr("replying",true).attr({"disabled":true,"class":"r2-btn1"});
    if(showTopic_jc(n)){
        $("#replyContent").val($("#replyContent").val().replace(/<(?!img|IMG)[^\<\>]*>/g,""));
        var f_data = o.serialize();
        $.post(location.href,f_data,function(data){
            if(data){
                ajaxRe(location.href,"replylistbox");
            }
        });
    }
    return false;
}

//ajax加载
function ajaxRe(url,box,callback,loading,rtype){
    var fun = csc.typeOf(arguments[2]) == "function" ?
            arguments[2] : csc.typeOf(arguments[3])=="function" ?
            arguments[3] : function(){}
        ,loading = csc.typeOf(arguments[2]) != "function" ?
            arguments[2] : csc.typeOf(arguments[3])!="function" ?
            arguments[3] : false
        , loading_div = false;
    if(loading){csc.useDialog(function(){
        loading_div = loading_box();
        $.post(url,function(data){
            if(loading_div){loading_div.close();}
            if("jsonp"==rtype||"json"==rtype){
                data=data.code;
            }
            $("#"+box).html($.trim(data));
            if(fun){fun(data);}
        },rtype);
    })}else{
        $.post(url,function(data){
            if(loading_div){loading_div.close();}
            if("jsonp"==rtype||"json"==rtype){
                data=data.code;
            }
            $("#"+box).html($.trim(data));
            if(fun){fun(data);}
        },rtype);

    }
}

//loading
function loading_box(id){
    var options_ = {title:false,cancel:false,drag: false,padding:"0px 25px",esc:false,fixed:true,top:"60%"};
    options_["content"] = "<div class=\"aui_loading\"><span>loading..</span></div>";
    if(id){options_["id"]=id};
    return art.dialog(options_);
}

//话题赞
function topicPraise(tmp){
    var obj=$(tmp);
    var topicId=obj.attr("data-topicid");
    $.get(csc.url("quan","/like.html?topicId="+topicId),function(data){
        if("sns_likeTopic_000"==data.code){
            obj.siblings(".tal-one").fadeIn(100).animate({top: '-40px'}, "1000").fadeOut(500).animate({top: '-20px'}, "1000");
            obj.html('赞(<b class="b1-1">'+data.desc+'</b>)');
        }else if("login_fail"==data.code){
            login();
        }else if("sns_likeTopic_001"==data.code){
            topicPraiseNo(obj);
        }else{
            csc.alert(data.desc);
        }
    },"json");
}
//赞过了
function topicPraiseNo(tmp){
    $th=$(tmp);
    $th.siblings(".tal-expire").stop(true).removeAttr("style")
        .fadeIn(100).animate({top: '-40px',opacity:0}, 450);
}

$(function(){
    $(".choice li:odd").addClass("mr");

    $(".submDiv .seldown").bind("click",function(){
        var $t = $(this);
        if($t.hasClass("selup")){
            $t.removeClass("selup");
            $(".submDiv ul li:gt(0)").slideUp()
            $(".submDiv ul li:gt(0) input").val('');
        }else{
            $t.addClass("selup");
            $(".submDiv ul li:gt(0)").slideDown();
        }
    });
    $(".addregcomm").append('<span class="error"/>');
    showTopic();
});