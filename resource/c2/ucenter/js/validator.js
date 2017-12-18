/*
 * 此js是基于jquery,seajs写的
 * obj为jquery对象
 * Animation相关函数动画是通过css3实现，直接添加对应的实现了动画的类名
 * */
define(function(require, exports, module){
    var validator={
        //常用正则
        regxp:{
            d:/\d+/,//纯数字
            lower:/[a-z]+/,//纯小写字母
            capital:/[A-Z]+/,//纯大写字母
            tszf:/[~!@#\$%^&*\(\)\{\};,.\?\/'"]/,//纯特殊字符
            num:function(n1,n2){//数字
                var regx=new RegExp("^\\d{"+n1+","+n2+"}$", "g");
                return regx;
            },
            all:function(n1,n2){//任意字符
                var regx=new RegExp("^[\\w\\W]{"+n1+","+n2+"}$", "g");
                return regx;
            },
            cn:function(n1,n2){//纯汉字
                var regx=new RegExp("^[\\u4e00-\\u9fa5]{"+n1+","+n2+"}$", "g");
                return regx;
            },
            cnEn:function(n1,n2){//字母或汉字
                var regx=new RegExp("^([A-Za-z]|[\\u4e00-\\u9fa5]){"+n1+","+n2+"}$", "g");
                return regx;
            },
            url:function(){//企业网址
                var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@
                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                    + "|" // 允许IP和DOMAIN（域名）
                    + "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.
                    + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名
                    + "[a-zA-Z]{2,6})" // first level domain- .com or .museum
                    + "(:[0-9]{1,4})?" // 端口- :80
                    + "((/?)|" + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
                var re = new RegExp(strRegex);
                return re;
            },
            pwd:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,20}$/,//数字字母组合，必须包含数字、小写字母或者大写字母
            //pwd:/^(?![0-9a-z]+$)(?![a-zA-Z]+$)(?![0-9A-Z]+$)[0-9A-Za-z]{8,20}$/,//数字字母组合，必须包含数字、大写字母、小写字母
            email:/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,//邮箱
            tel:/^((\d{3}|0\d{2,3})\-?)?[1-9]\d{5,7}$/,//固定电话
            phone:/^1\d{10}$/,//手机号
            ww:/^(?!_)(?!.*?_$)(?!\d+$)[a-zA-Z\d_\u2E80-\u9FFF]{2,25}$/,//旺旺号，不能全为数字且不可以下划线开头和结尾，且不可包含非法字符
            name:/^[\w\W]{2,8}$/,//个人实名认证处的姓名
            idcard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/, //身份证号
            yyzzzch:/(^[0-9a-zA-Z]{15}$)|(^[0-9a-zA-Z]{18}$)/, //营业执照注册号
            dlrPart:/^(?!\d+$)[\da-zA-Z\u4e00-\u9fa5]{1,20}$/, //企业实名认证：申请人部门(1-20位中文、英文、数字，且不能全为数字)
            gsjs:/^(?!\d+$)(?![^A-Za-z0-9\u4e00-\u9fa5]+$)[\w\W]{50,5000}$/ //公司介绍，50-5000个字符且不可全为数字或特殊字符
        },

        /*
        * /[^\x00-\xff]/ig检查是否是汉字或者全角
        * 获取字符串中汉字及全角的格式
        * */
        getCnLen:function(str){
            var len=str.length;
            var str= str.replace(/[^\x00-\xff]/ig, '');
            len=len-str.length;
            return len;
        },

        //不可输入一样的字符
        isUniq:function(val){
            var len=val.length,
                arry1=[],
                arry2=[],
                obj={}

            for(var i=0;i<len;i++){
                arry1.push(val.charAt(i));
            }
            $.each(arry1,function(i,n){
                obj[n]=n;
            });
            $.each(obj,function(i,n){
                arry2.push(n);
            });
            if(arry2.length<=1){
                return false;
            }
            return true;
        },

        validOpts:{
            frmWarnClass:'frm-warn',
            frmErrorClass:'frm-error',
            tipClass:'valid-tips',//提示信息的默认类名
            rightClass:'valid-right',//正确提示信息的类名
            errorClass:'valid-error',//错误提示信息的类名
            warnClass:'valid-warn',
            animationClass:'shake'//动画的类名
        },

        //显示错误信息
        showTips:function(options){
            var opts={
                obj:null,//开发时不可为空，否则报错
                frmObj:null,
                validTip:'',//错误提示信息
                isEanimation:true
            };
            opts=$.extend({},validator.validOpts,opts,options);
            var obj=opts.obj,
                frmObj=opts.frmObj,
                frmWarnClass=opts.frmWarnClass,
                frmErrorClass=opts.frmErrorClass,
                tipClass=opts.tipClass,
                rightClass=opts.rightClass,
                errorClass=opts.errorClass,
                warnClass=opts.warnClass,
                validTip=opts.validTip,
                isEanimation=opts.isEanimation,
                animationClass=opts.animationClass,
                $tip;
            $tip=obj.find('.'+tipClass);
            $tip.removeClass(animationClass+' '+warnClass+' '+rightClass);

            //只有当表单可读写时执行
            if(!frmObj.attr('readonly')) {
                frmObj.removeClass(frmWarnClass).addClass(frmErrorClass);
            }

            if($tip[0]){
                if(!$tip.hasClass(errorClass)){
                    $tip.addClass(errorClass);
                }
                $tip.html(validTip);
            }else{
                //只有当表单可读写时执行
                if(!frmObj.attr('readonly')) {
                    obj.append('<span class="' + tipClass + ' ' + errorClass + '">' + validTip + '</span>');
                }
            }
            if(isEanimation){
                $tip=obj.find('.'+tipClass);
                $tip.addClass(animationClass);
                setTimeout(function(){
                    $tip.removeClass(animationClass);
                },1000);
            }
        },

        //显示正确信息
        showRightTips:function(options){
            var opts={
                obj:null,
                tipObj:null,
                rightTip:''//正确提示信息
            };
            opts=$.extend({},validator.validOpts,opts,options);
            var obj=opts.obj,
                tipObj=opts.tipObj?opts.tipObj:obj.parent(),
                frmWarnClass=opts.frmWarnClass,
                frmErrorClass=opts.frmErrorClass,
                tipClass=opts.tipClass,
                rightClass=opts.rightClass,
                errorClass=opts.errorClass,
                warnClass=opts.warnClass,
                rightTip=opts.rightTip,
                animationClass=opts.animationClass,
                $tip=tipObj.find('.'+tipClass);
            obj.removeClass(frmErrorClass+' '+frmWarnClass);
            if($tip[0]){
                $tip.removeClass(errorClass+' '+warnClass+' '+animationClass).addClass(rightClass).html(rightTip);
            }else{
                //只有当表单可读写时执行
                if(!obj.attr('readonly')) {
                    tipObj.append('<span class="' + tipClass + '">' + rightTip + '</span>');
                    tipObj.find('.'+tipClass).addClass(rightClass);
                }
            }

        },

        //表单获取焦点时候显示的信息
        focusTips:function(options){
            var opts={
                obj:null,//开发时不可为空，否则报错
                frmObj:null,
                focusTip:'',//提示信息
                isShowError:true
            };
            opts=$.extend({},validator.validOpts,opts,options);
            var obj=opts.obj,
                frmObj=opts.frmObj,
                frmWarnClass=opts.frmWarnClass,
                frmErrorClass=opts.frmErrorClass,
                tipClass=opts.tipClass,
                rightClass=opts.rightClass,
                errorClass=opts.errorClass,
                warnClass=opts.warnClass,
                focusTip=opts.focusTip,
                isShowError=opts.isShowError,
                animationClass=opts.animationClass,
                $tip=obj.find('.'+tipClass);
            if($tip[0]){
                if(isShowError){
                    focusTip=$tip.html();
                    if(!$tip.hasClass(rightClass)){
                        $tip.addClass(errorClass).removeClass(warnClass);
                    }
                    if($tip.hasClass(errorClass)){
                        $tip.removeClass(warnClass+' '+rightClass);
                    }
                }else{
                    if(!$tip.hasClass(rightClass)){
                        $tip.addClass(warnClass).removeClass(errorClass);
                    }
                    else{
                        $tip.removeClass(errorClass+' '+warnClass);
                        focusTip='';
                    }

                }
                $tip.html(focusTip);
            }else{
                //只有当表单可读写且为空时执行
                if(!frmObj.attr('readonly')&&frmObj.val()==''){
                    obj.append('<span class="'+tipClass+'">'+focusTip+'</span>');
                    obj.find('.'+tipClass).addClass(warnClass);
                }
            }
            $tip.removeClass(animationClass);

            //只有当表单可读写时执行
            if(!frmObj.attr('readonly')){
                frmObj.removeClass(frmErrorClass).addClass(frmWarnClass);
            }
        },
        init:function(options){
            var opts={
                isMust:false,//true代表必填项，false代表非必填项(默认)
                obj:null,//需要验证的对象 ，开发时不可为空，否则报错
                tipObj:null,//提示信息显示的地方
                rightTip:'',//正确提示信息
                errorTip:'',//错误时的提示消息
                nullTip:'',//为空时的提示消息
                isEanimation:true,//错误提示是否需要动画
                regx:null, //正则表达式
                isUniq:true,//是否允许表单值输入全为相同的字符,false不允许 true允许
                notUniqTip:'',//当isUniq为false时才需设置
                isAjax:false //需要向后台验证是否已存在（需求发送ajax请求验证）
            };
            opts=$.extend({},validator.validOpts,opts,options);
            var isMust=opts.isMust,
                obj=opts.obj,
                tipObj=null,
                frmWarnClass=opts.frmWarnClass,
                frmErrorClass=opts.frmErrorClass,
                tipClass=opts.tipClass,
                rightClass=opts.rightClass,
                errorClass=opts.errorClass,
                warnClass=opts.warnClass,
                rightTip=opts.rightTip,
                errorTip=opts.errorTip,
                nullTip=opts.nullTip,
                defaultTip=opts.defaultTip,
                isDerror=opts.isDerror,
                isEanimation=opts.isEanimation,
                animationClass=opts.animationClass,
                regx=opts.regx,
                isUniq=opts.isUniq,
                notUniqTip=opts.notUniqTip,
                isAjax=opts.isAjax,
                objVal,placeholderVal;

            tipObj=opts.tipObj?opts.tipObj:obj.parent();
            objVal=obj.val();
            placeholderVal=obj.attr('placeholder')?obj.attr('placeholder'):'';

            if(isMust&&(objVal==''||(!placeholderVal==''&&objVal==placeholderVal))){
                //obj.addClass(frmErrorClass).removeClass(frmWarnClass);
                validator.showTips({
                    obj:tipObj,
                    frmObj:obj,
                    frmWarnClass:frmWarnClass,
                    frmErrorClass:frmErrorClass,
                    tipClass:tipClass,
                    rightClass:rightClass,
                    errorClass:errorClass,
                    warnClass:warnClass,
                    validTip:nullTip,
                    isEanimation:isEanimation,
                    animationClass:animationClass
                });
                return false;
            }
            else if(regx&&!objVal==''&&!regx.test(objVal)){
                //obj.addClass(frmErrorClass).removeClass(frmWarnClass);
                validator.showTips({
                    obj:tipObj,
                    frmObj:obj,
                    frmWarnClass:frmWarnClass,
                    frmErrorClass:frmErrorClass,
                    tipClass:tipClass,
                    rightClass:rightClass,
                    errorClass:errorClass,
                    warnClass:warnClass,
                    validTip:errorTip,
                    isEanimation:isEanimation,
                    animationClass:animationClass
                });
                return false;
            }
            else if(!isUniq&&!validator.isUniq(objVal)){
                validator.showTips({
                    obj:tipObj,
                    frmObj:obj,
                    frmWarnClass:frmWarnClass,
                    frmErrorClass:frmErrorClass,
                    tipClass:tipClass,
                    rightClass:rightClass,
                    errorClass:errorClass,
                    warnClass:warnClass,
                    validTip:notUniqTip,
                    isEanimation:isEanimation,
                    animationClass:animationClass
                });
                return false;
            }
            else{
                if(!isAjax){
                    /*obj.removeClass(frmErrorClass+' '+frmWarnClass);
                    tipObj.find('.'+tipClass).removeClass(errorClass+' '+warnClass+' '+animationClass).addClass(rightClass).html(rightTip);*/

                    validator.showRightTips({
                        obj:obj,
                        tipObj:tipObj,
                        frmWarnClass:frmWarnClass,
                        frmErrorClass:frmErrorClass,
                        tipClass:tipClass,
                        rightClass:rightClass,
                        errorClass:errorClass,
                        warnClass:warnClass,
                        rightTip:rightTip,
                        animationClass:animationClass
                    });
                }
            }
            return true
        }
    };
    module.exports=validator;
});