define(function(require, exports, module) {
    require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');//上传图片插件
    var dialog=require('./dialog');//弹窗
    var ucCommon=require('./uc-common');
    var validator=require('./validator');
    var regxp=validator.regxp;//正则
    var	hostmap = seajs.hostmap;  // 域名配置表
    var sellListTxt='至少输入一项主营产品/服务，且须由中文、英文和数字组成，且不可全为数字、汉字不可超过10个';
    var sellListRegx=/^(?!\d+$)[a-zA-Z0-9\u4e00-\u9fa5]+$/;
    var ktwp={
        focusFun:function(obj,frmObj){
            var id=frmObj.attr('id'),
                focusTip='';
            switch(id) {
                case 'qyName':
                    focusTip = '请输入企业名称';
                    break;
                case 'dtlAdrss':
                    focusTip = '请输入详细地址';
                    break;
                case 'qyWebUrl':
                    focusTip = '请输入企业网址';
                    break;
                case 'frName':
                    focusTip = '请输入法定代表人';
                    break;
                case 'regMoney':
                    focusTip='请输入注册资本';
                    break;
                case 'gsjs':
                    focusTip='请输入公司介绍';
                    break;
                case 'userName1':
                    focusTip='方便客户联系到您，请输入您真实有效的姓名';
                    break;
                case 'phone1':
                    focusTip='请输入手机号';
                    break;
                case 'email1':
                    focusTip='请输入常用电子邮件';
                    break;
                case 'department1':
                    focusTip='请输入所在部门';
                    break;
                case 'position1':
                    focusTip='请输入职位';
                    break;
                case 'telPrfx1':
                    focusTip='请输入国家代码';
                    break;
                case 'telArea1':
                    focusTip='请输入区号';
                    break;
                case 'telNum1':
                    focusTip='请输入电话号码及分机号';
                    break;
                case 'tel4001':
                    focusTip='请输入400电话，方便买家与您在线沟通';
                    break;
                case 'czPrfx1':
                    focusTip='请输入国家代码';
                    break;
                case 'czArea1':
                    focusTip='请输入区号';
                    break;
                case 'czNum1':
                    focusTip='请输入电话号码及分机号';
                    break;
                case 'qq1':
                    focusTip='请输入常用QQ号，方便买家与您在线沟通';
                    break;
                case 'ww1':
                    focusTip='请输入常用旺旺ID，以便与买家直接在线沟通';
                    break;
            }
            validator.focusTips({
                obj:obj,
                frmObj:frmObj,
                focusTip:focusTip
            });
        },
        blurFun:function(obj,tipObj){
            var id=obj.attr('id'),
                isMust=true,
                nullTip='',
                errorTip='',
                regx=null,
                isAjax=false;
            switch(id) {
                case 'qyName':
                    nullTip='请输入企业名称';
                    errorTip='企业名称须由4-128位字符组成'
                    regx=regxp.all(4,128);
                    isAjax=true;
                    break;
                case 'csc':
                    nullTip='请选择完整企业联系地址';
                    break;
                case 'venue':
                    nullTip='请选择完整企业联系地址';
                    break;
                case 'floor':
                    nullTip='请选择完整企业联系地址';
                    break;
                case 'floorArea':
                    nullTip='请选择完整企业联系地址';
                    break;
                case 'shopImg':
                    nullTip='请上传店铺实景图';
                    break;
                case 'province':
                    nullTip='请选择完整企业联系地址';
                    break;
                case 'city':
                    nullTip='请选择完整企业联系地址';
                    break;
                case 'area':
                    nullTip='请选择完整企业联系地址';
                    break;
                case 'dtlAdrss':
                    nullTip='请输入详细地址';
                    errorTip='详细地址须由1-40位字符组成';
                    regx=regxp.all(1,40);
                    break;
                case 'qyWebUrl':
                    isMust=false;
                    errorTip='企业网址格式错误';
                    regx=regxp.url();
                    break;
                case 'frName':
                    nullTip='请输入法定代表人';
                    errorTip='法定代表人须由1-60位汉字组成';
                    regx=regxp.cn(1,60);
                    break;
                case 'regMoney':
                    isMust=false;
                    errorTip='注册资本须全为数字,且不可超过10位金额数字';
                    regx=regxp.num(0,10);
                    break;
                case 'gsjs':
                    nullTip='请输入公司介绍';
                    errorTip='公司介绍须由50-5000个字符组成，且不可全为数字或特殊字符';
                    regx=regxp.gsjs;
                    break;
                case 'userName1':
                    nullTip='请输入您的真实姓名';
                    errorTip='姓名须由2-20个汉字或字母组成';
                    regx=regxp.cnEn(2,20);
                    break;
                case 'phone1':
                    nullTip='请输入手机号';
                    errorTip='格式不正确，手机号码为11位数字';
                    regx=regxp.phone;
                    break;
                case 'email1':
                    nullTip='电子邮件不能为空';
                    errorTip='您输入的电子邮件地址格式不对';
                    regx=regxp.email;
                    break;
                case 'department1':
                    isMust=false;
                    errorTip='所在部门须由20位或以内的字符组成';
                    regx=regxp.all(0,20);
                    break;
                case 'position1':
                    isMust=false;
                    errorTip='职位须由20位或以内的字符组成';
                    regx=regxp.all(0,20);
                    break;
                case 'telPrfx1':
                    isMust=false;
                    errorTip='国家代码须由4位或以内的数字组成';
                    regx=regxp.num(0,4);
                    isAjax=true;
                    break;
                case 'telArea1':
                    isMust=false;
                    errorTip='区号须由3-4位数字组成';
                    regx=regxp.num(3,4);
                    isAjax=true;
                    break;
                case 'telNum1':
                    isMust=false;
                    errorTip='请输入正确格式的电话号码';
                    regx=/^([1-9]\d{6,7}((\-\d{1,5})+)?)(,[1-9]\d{6,7}((\-\d{1,5})+)?)*$/;
                    isAjax=true;
                    break;
                case 'tel4001':
                    isMust=false;
                    errorTip='400电话须由10位数字组成';
                    regx=regxp.num(0,10);
                    break;
                case 'czPrfx1':
                    isMust=false;
                    errorTip='国家代码须由4位或以内的数字组成';
                    regx=regxp.num(0,4);
                    isAjax=true;
                    break;
                case 'czArea1':
                    isMust=false;
                    errorTip='区号须由3-4位数字组成';
                    regx=regxp.num(3,4);
                    isAjax=true;
                    break;
                case 'czNum1':
                    isMust=false;
                    errorTip='请输入正确格式的电话号码';
                    regx=/^([1-9]\d{6,7}((\-\d{1,5})+)?)(,[1-9]\d{6,7}((\-\d{1,5})+)?)*$/;
                    isAjax=true;
                    break;
                case 'qq1':
                    isMust=false;
                    errorTip='QQ号必由5-11位数字组成';
                    regx=regxp.num(5,11);
                    break;
                case 'ww1':
                    isMust=false;
                    errorTip='请输入正确格式的旺旺ID';
                    regx=regxp.ww
                    break;
            }
            return validator.init({
                isMust:isMust,
                obj:obj,
                tipObj:tipObj,
                nullTip:nullTip,
                errorTip:errorTip,
                regx:regx,
                isAjax:isAjax
            });
        },

        //获取城内商户地址
        getCscAddress:function(url,obj,objId){
            $.get(url,function(data){
                var status=data.status,
                    arry=[],
                    venueObj=$('<select id="'+objId+'" class="g-mr5 frm-slt" name="'+objId+'"></select>');
                html='<option value="">请选择</option>';
                if(status==1){
                    arry=data.data;
                    if(arry.length>0){
                        $.each(arry,function(i,n){
                            html+='<option value="'+arry[i].id+':'+arry[i].name+'">'+arry[i].name+'</option>';
                        });

                        if(!$('#'+objId)[0]){
                            venueObj.insertAfter(obj);
                            venueObj.append(html);
                        }else{
                            $('#'+objId).html('').append(html);
                        }
                        $('#'+objId).trigger('change');//验证表单的时候用的
                    }
                }
            },'jsonp');
        },

        //城内商户地址下拉列表切换
        changeCscAddress:function(obj,venueId,floorId,floorAreaId){
            if(obj.find('option').length<2) {
                $.get('//' + hostmap.i + '/reg/getCitys', function (data) {
                    var status = data.status,
                        arry = [],
                        html = '';
                    if (status == 1) {
                        arry = data.data;
                        $.each(arry, function (i, n) {
                            html += '<option value="' + arry[i].id + ':' + arry[i].name + '">' + arry[i].name + '</option>';
                        });
                        obj.append(html);
                    }
                }, 'jsonp');
            }
            if(venueId){
                obj.on('change',function(){
                    var $this=$(this),
                        id=$this.val().split(':')[0];
                    if(id){
                        ktwp.getCscAddress('//'+hostmap.i+'/reg/getVenues?cityId='+id,$this,venueId);
                    }else{
                        $('#'+venueId).remove();
                    }
                    $('#'+floorId).remove();
                    $('#'+floorAreaId).remove();
                });
            }
            if(venueId&&floorId){
                $('body').on('change','#'+venueId,function(){
                    var $this=$(this),
                        id=$this.val().split(':')[0];
                    if(id){
                        ktwp.getCscAddress('//'+hostmap.i+'/reg/getFloors?venueId='+id,$this,floorId);
                    }else{
                        $('#'+floorId).remove();
                    }
                    $('#'+floorAreaId).remove();
                });
            }
            if(venueId&&floorId&&floorAreaId){
                $('body').on('change','#'+floorId,function(){
                    var $this=$(this),
                        id=$this.val().split(':')[0];
                    if(id){
                        ktwp.getCscAddress('//'+hostmap.i+'/reg/getshopAreas?floorId='+id,$this,floorAreaId);
                    }else{
                        $('#'+floorAreaId).remove();
                    }
                });
            }
        },

        upload:function(){
            $('.jsUploadBtn').each(function(){
                var $this=$(this),
                    type=$this.data('type'),
                    id=$this.attr('id'),
                    $previewBox;
                if(type=='shopLogo'){
                    $previewBox=$this.parents('.qylogo-preview');
                }
                if(type=='memberCompanyLogo'){
                    $previewBox=$this.parents('.shType-c');
                }
                if(type=='shopContactFace'){
                    $previewBox=$this.parents('.user-img');
                }
                ucCommon.upload({
                    url:'//'+hostmap.i+'/reg/imgUpload',
                    uploadBtn:$this,
                    previewObj:$previewBox,
                    formData:{imgType:type}
                });
            });
        },

        //主要经营地
        zyjyd:function(){
            var $zyjydLst=$('.zyjyd-lst'),
                $zyjydGylst=$('.zyjyd-gylst'),
                $qg=$zyjydGylst.find('.ipt-chk:first'),//全国复选框
                $area=$zyjydGylst.find('.ipt-chk:gt(0)'),//除全国外的区域复选框
                $zyjydDltlst=$('.zyjyd-dltlst'),//省份容器
                $prvIptChk=$zyjydDltlst.find('.ipt-chk'),//省份复选框
                areaLen=$area.length,
                prvLen=$prvIptChk.length;

            //选择全国
            $qg.on('change',function(){
                var $this=$(this),
                    $parent=$this.parent(),
                    $chk=$this.parents('.uc-divslt-dft').siblings('.uc-divslt-chkd'),
                    val=$this.val(),
                    text=$parent.find('span').html();
                if($this.is(':checked')){
                    $chk.html('<li data-value="'+text+'"><span>'+text+'</span><i></i></li>');
                    $zyjydLst.find('.ipt-chk').prop('checked',true);
                }else{
                    $chk.html('');
                    $zyjydLst.find('.ipt-chk').prop('checked',false);
                }
            });

            //选择区域
            $area.on('change',function(){
                var $this=$(this),
                    $parent=$this.parent(),
                    $chk=$this.parents('.uc-divslt-dft').siblings('.uc-divslt-chkd'),
                    text=$parent.find('span').html(),
                    $areaChk=$zyjydGylst.find('.ipt-chk:gt(0):checked'),
                    $prvDlIptChk=$('.zyjyd-dltlst[data-dt="'+text+'"]').find('.ipt-chk'),
                    areaChkLen=$areaChk.length;
                if($this.is(':checked')){
                    if(areaChkLen==areaLen){
                        $chk.html('<li data-value="全国"><span>全国</span><i></i></li>');
                        $zyjydLst.find('.ipt-chk').prop('checked',true);
                    }else{
                        $chk.append('<li data-value="'+text+'"><span>'+text+'</span><i></i></li>');
                        $prvDlIptChk.prop('checked',true);
                        $prvDlIptChk.each(function(){
                            var $this=$(this),
                                $parent=$this.parent(),
                                text=$parent.find('span').html();
                            $chk.find('li[data-value="'+text+'"]').remove();
                        });
                    }
                }else{
                    $chk.find('li[data-value="全国"]').remove();
                    $qg.prop('checked',false);
                    $chk.find('li[data-value="'+text+'"]').remove();
                    $this.prop('checked',false);
                    $prvDlIptChk.prop('checked',false);
                    $areaChk.each(function(){
                        var $this=$(this),
                            $parent=$this.parent(),
                            text=$parent.find('span').html();
                        if(!$chk.find('li[data-value="'+text+'"]')[0]){
                            $chk.append('<li data-value="'+text+'"><span>'+text+'</span><i></i></li>');
                        }
                    });
                }
            });

            //选择省份
            $prvIptChk.on('change',function(){
                    var $this=$(this),
                        $parent=$this.parent(),
                        $chk=$this.parents('.uc-divslt-dft').siblings('.uc-divslt-chkd'),
                        text=$parent.find('span').html(),
                        $dl=$this.parents('dl'),
                        $dlIptChk=$dl.find('.ipt-chk'),
                        $dlChk=$dl.find('.ipt-chk:checked'),
                        dlLen=$dlIptChk.length,
                        dlChkLen=$dlChk.length,
                        dtTxt=$dl.find('dt').html(),
                        prvChkLen=$zyjydDltlst.find('.ipt-chk:checked').length;
                    if($this.is(':checked')){
                        if(prvChkLen==prvLen){
                            $chk.html('<li data-value="全国"><span>全国</span><i></i></li>');
                            $zyjydLst.find('.ipt-chk').prop('checked',true);
                        }else{
                            if(dlChkLen==dlLen){
                                $('.ipt-chk[value$="'+dtTxt+'"]').prop('checked',true);
                                $dlChk.each(function(){
                                    var $this=$(this),
                                        $parent=$this.parent(),
                                        text=$parent.find('span').html();
                                    $chk.find('li[data-value="'+text+'"]').remove();
                                });
                                $chk.append('<li data-value="'+dtTxt+'"><span>'+dtTxt+'</span><i></i></li>');
                            }else{
                                $chk.find('li[data-value="'+dtTxt+'"]').remove();
                                $chk.append('<li data-value="'+text+'"><span>'+text+'</span><i></i></li>');
                            }
                        }
                    }else{
                        $chk.find('li[data-value="全国"]').remove();
                        $qg.prop('checked',false);
                        $('.ipt-chk[value$="'+dtTxt+'"]').prop('checked',false);
                        $chk.find('li[data-value="'+dtTxt+'"]').remove();
                        $chk.find('li[data-value="'+text+'"]').remove();
                        $dlChk.each(function(){
                            var $this=$(this),
                                $parent=$this.parent(),
                                text=$parent.find('span').html();
                            if(!$chk.find('li[data-value="'+text+'"]')[0]) {
                                $chk.append('<li data-value="' + text + '"><span>' + text + '</span><i></i></li>');
                            }
                        });
                        $zyjydGylst.find('.ipt-chk:gt(0):checked').each(function(){
                            var $this=$(this),
                                $parent=$this.parent(),
                                text=$parent.find('span').html();
                            if(!$chk.find('li[data-value="'+text+'"]')[0]){
                                $chk.append('<li data-value="'+text+'"><span>'+text+'</span><i></i></li>');
                            }
                        });
                    }
            });

            //删除
            ktwp.delFun($('#zyjydDivslt').find('.uc-divslt-chkd'));
        },

        delFun:function(obj){
            obj.on('click','li i',function(){
                var $this=$(this),
                    $li=$this.parent(),
                    $dft=$li.parents('.uc-divslt-chkd').siblings('.uc-divslt-dft'),
                    value=$li.data('value'),
                    text=$li.find('span').html(),
                    $ucDivSlt=$this.parents('.uc-divslt'),
                    top;
                $dft.find('.ipt-chk[value$="'+text+'"]').prop('checked',false);
                $li.remove();
                if($('.zyjyd-dltlst[data-dt="'+text+'"]')[0]){
                    $('.zyjyd-dltlst[data-dt="'+text+'"]').find('.ipt-chk').prop('checked',false);
                }
                if(text=='全国'){
                    $dft.find('.ipt-chk').prop('checked',false);
                }
                top=$ucDivSlt.height();
                $ucDivSlt.find('.uc-divslt-dft').css({top:top-1});
            });
        },

        //主营行业、主要经营地、管理体系认证选项相关js
        sltFun:function(){
            //<li><span>纺织、皮革</span><i></i></li>
            var $zyhyDivslt=$('#zyhyDivslt');
            var $gltxDivslt=$('#gltxDivslt');
            var sltfun=function(obj){
                obj.on('change','.ipt-chk',function(){
                    var $this=$(this),
                        $parent=$this.parent(),
                        $chk=$this.parents('.uc-divslt-dft').siblings('.uc-divslt-chkd'),
                        val=$this.val(),
                        text=$parent.find('span').html();
                    if($this.is(':checked')){
                        $chk.append('<li data-value="'+val+'"><span>'+text+'</span><i></i></li>');
                    }else{
                        $chk.find('li[data-value="'+val+'"]').remove();
                    }
                });
            };

            //编辑的时候设置浮动层的初始位置
            $('.uc-divslt-chkd').each(function(){
                var $this=$(this),
                    $li=$this.find('li'),
                    $parent=$this.parent(),
                    $siblings=$this.siblings('.uc-divslt-dft');
                if($li[0]){
                    $siblings.css('top',$parent.height()-1);
                }
            });

            //展开主营行业、主要经营地、管理体系认证 选项
            $('.uc-divslt').hover(function(){
                var $this=$(this),
                    $dft=$this.find('.uc-divslt-dft');
                $dft.show();
            },function(){
                var $this=$(this),
                    $dft=$this.find('.uc-divslt-dft');
                $dft.hide();
            });

            //主营行业选项
            sltfun($zyhyDivslt.find('.uc-divslt-dft'));
            ktwp.delFun($zyhyDivslt.find('.uc-divslt-chkd'));

            //管理体系认证选项
            sltfun($gltxDivslt.find('.uc-divslt-dft'));
            ktwp.delFun($gltxDivslt.find('.uc-divslt-chkd'));

            //主要经营地
            ktwp.zyjyd();

            //改变浮层的top值
            $('.uc-divslt-dft').on('change','.ipt-chk',function(){
                var $this=$(this),
                    $ucDivSlt=$this.parents('.uc-divslt'),
                    top;
                top=$ucDivSlt.height();
                $ucDivSlt.find('.uc-divslt-dft').css({top:top-1});
            });

        },

        //主营产品/服务验证
        sellListValid:function(){
            var $sellList=$('input[name^="sellList"]'),//主营产品/服务文本框
                $sellListTd=$sellList.parents('td');

            $sellList.on('focus',function(){
                var $this=$(this);
                validator.focusTips({
                    obj:$sellListTd,
                    frmObj:$this,
                    focusTip:sellListTxt
                });
            });
            $sellList.on('blur',function(){
                var $this=$(this),
                    $ul=$this.parents('ul'),
                    $iptTxt=$ul.find('.ipt-txt'),
                    $siblingsLi=$this.parents('li').siblings(),
                    $siblingsIpt=$siblingsLi.find('.ipt-txt'),
                    val=$this.val(),
                    errorArry=[],
                    arry=[];
                $iptTxt.each(function(){
                    var $this=$(this),
                        val=$this.val(),
                        len= 0,
                        isTrue=validator.init({
                            obj:$this,
                            tipObj:$sellListTd,
                            errorTip:sellListTxt,
                            regx:sellListRegx,
                            isAjax:true
                        });
                    if(isTrue){
                        len=validator.getCnLen(val);
                        if(val!=''){
                            if(len<=10){
                                arry.push(val);
                                $this.removeClass('frm-error frm-warn');
                            }else{
                                errorArry.push(val);
                            }
                        }else{
                            if(arry.length>0){
                                arry.push(val);
                                $this.removeClass('frm-error frm-warn');
                            }
                        }
                    }else{
                        errorArry.push(val);
                    }
                });
                if(arry.length>0){
                    if(!$sellListTd.find('.frm-error')[0]){
                        validator.showRightTips({
                            obj:$this,
                            tipObj:$sellListTd
                        });
                    }
                }else{
                    validator.showTips({
                        obj:$sellListTd,
                        frmObj:$this,
                        validTip:sellListTxt
                    });
                }
            });
        },

        //固定电话和传真
        telFun:function(prfxObj,areaObj,numObj,parent){
            var isGjTrue=ktwp.blurFun(prfxObj,parent),
                isQhTrue=ktwp.blurFun(areaObj,parent),
                isGdTrue=ktwp.blurFun(numObj,parent);
            if(isGjTrue){
                prfxObj.removeClass('frm-error frm-warn');
            }
            if(isQhTrue){
                areaObj.removeClass('frm-error frm-warn');
            }
            if(isGdTrue){
                numObj.removeClass('frm-error frm-warn');
            }
            if(isGjTrue&&isQhTrue&&isGdTrue){
                parent.find('.valid-tips').removeClass('valid-error valid-warn shake').addClass('valid-right').html('');
            }
        },

        //展开和收起
        fold:function(obj1,obj2,txt1,txt2){
            var txt=txt1;
            if(obj2.is(':visible')){
                obj2.hide();
            }else{
                obj2.show();
                txt=txt2;
            }
            obj1.html(txt);
        },

        //开通旺铺类型
        shopType:function(){
            var $shopType=$('#shopType');
            $shopType.on('change',function(){
               $.get('//' + hostmap.i + '/reg/getShopType?shopType='+$(this).val(),function(data){
                   var status=data.status;
                   var result=data.data||null;
                   var $countryObj=$('<select id="country" class="g-mr4 frm-slt" name="country"></select>');
                   var $country=$('#country');
                   var html='';
                   if(status===1){
                       if(result){
                           $.each(result,function(i,n){
                               html+='<option value="'+result[i].countryCode+'::'+result[i].countryName+'">'+result[i].countryName+'</option>';
                           });
                           if($country[0]){
                               $country.html(html);
                           }else{
                               $countryObj.append(html);
                               $countryObj.insertAfter($shopType);
                           }
                       }else{
                           $country.remove();
                       }
                   }
               },'jsonp');
           });
        },

        init:function(){
            var $qyLogo=$('#qyLogo'),//企业logo隐藏域
                $qyName=$('#qyName'),//企业名称文本框
                $qyNameParent=$qyName.parent(),
                $csc=$('#csc'),//城内商户地址下拉列表
                $venue=$('#venue'),//城内商户地址下拉列表
                $floor=$('#floor'),//城内商户地址下拉列表
                $floorArea=$('#floorArea'),//城内商户地址下拉列表
                $cscParent=$csc.parent(),
                $shopImg=$('#shopImg'),//店铺实景图隐藏域
                $province=$('#province'),//城外商户地址下拉列表
                $city=$('#city'),//城外商户地址下拉列表
                $area=$('#area'),//城外商户地址下拉列表
                $prvParent=$province.parent(),
                $dtlAdrss=$('#dtlAdrss'),//详细地址文本框
                $dtlAdrssTd=$dtlAdrss.parent(),
                $qyWebUrl=$('#qyWebUrl'),//企业网址文本框
                $qyWebUrlTd=$qyWebUrl.parent(),
                $shType=$('input[name=result]'),//企业联系地址单选框
                $model=$('input[name=model]'),//经营模式单选框
                $modelTd=$model.parents('td'),
                $sellList=$('input[name="sellList[]"]'),//主营产品/服务文本框
                $sellListTd=$sellList.parents('td'),
                $frName=$('#frName'),//法定代表人文本框
                $frNameTd=$frName.parent(),
                $regMoney=$('#regMoney'),//注册资本文本框
                $regMoneyTd=$regMoney.parent(),
                $gsjs=$('#gsjs'),//公司介绍文本域
                $gsjsTd=$gsjs.parent(),
                $userName=$('#userName1'),//联系人：姓名文本框
                $userNameTd=$userName.parent(),
                $phone=$('#phone1'),//联系人：手机号码文本框
                $phoneTd=$phone.parent(),
                $email=$('#email1'),//联系人：电子邮箱文本框
                $emailTd=$email.parent(),
                $department=$('#department1'),//联系人:部门文本框
                $departmentTd=$department.parent(),
                $position=$('#position1'),//联系人:职位文本框
                $positionTd=$position.parent(),
                $telPrfx=$('#telPrfx1'),//固定电话：国家代码文本框
                $telPrfxTd=$telPrfx.parent(),
                $telArea=$('#telArea1'),//固定电话：区号文本框
                $telNum=$('#telNum1'),//固定电话：电话号码文本框
                $tel4001=$('#tel4001'),//联系人：400电话文本框
                $tel4001Td=$tel4001.parent(),
                $czPrfx=$('#czPrfx1'),//联系人：传真 - 国家代码
                $czPrfxTd=$czPrfx.parent(),
                $czArea=$('#czArea1'),//联系人：传真 - 区号
                $czNum=$('#czNum1'),//联系人：传真 - 电话号码
                $qq=$('#qq1'),//联系人：qq文本框
                $qqTd=$qq.parent(),
                $ww=$('#ww1'),//联系人：旺旺文本框
                $wwTd=$ww.parent(),
                $moreUserInf=$('.more-user-inf');//更多联系人容器

            function checkQyName(val){
                if(ktwp.blurFun($qyName,$qyNameParent)){
                    //status:1 代表成功 0代表有表单字段错误 500代表系统错误 2代表未登录
                    $.get('//'+hostmap.i+'/reg/checkShopName?shopName='+val,function(data){
                        var status=data.status,
                            msg=data.msg;
                        if(status==1){
                            $qyName.removeAttr('readonly');
                            validator.showRightTips({
                                obj:$qyName,
                                tipObj:$qyNameParent
                            });
                            $qyName.attr('readonly','true');
                        }
                        else if(status==2){
                            dialog.tip({
                                content:msg,
                                close:function(){
                                    location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
                                }
                            });
                        }
                        else{
                            $qyName.removeAttr('readonly');
                            validator.showTips({
                                obj:$qyNameParent,
                                frmObj:$qyName,
                                validTip:msg
                            });
                            $qyName.attr('readonly','true');
                        };
                    },'jsonp');
                }
            }

            //上传图片
            ktwp.upload();

            //删除企业logo
            $('.jsDelLogo').on('click',function(){
                var $img=$qyLogo.siblings('img');
                $qyLogo.val('');
                $img.attr('src','//res.csc86.com/v2/c2/ucenter/images/no-img.png');
                $img.siblings('.upload-fbtn').find('span').html('上传logo');
            });

            //企业联系地址切换
            $shType.on('change',function(){
                var $this=$(this),
                    $shTypeC=$('.shType-c'),
                    index=$('input[name=result]').index(this);
                $shTypeC.hide().eq(index).show();
            });

            //城内商户地址选择
            ktwp.changeCscAddress($('#csc'),'venue','floor','floorArea');

            //城外商户地址选择
            ucCommon.getAddress($province,'city','area');

            //主营行业、主要经营地、管理体系认证选项相关js
            ktwp.sltFun();

            //开通旺铺类型选择
            ktwp.shopType();

            //更多企业规模资料
            $('.more-qygm').on('click',function(){
                var $this=$(this),
                    $moreQygmC=$('.more-qygm-c'),
                    txt1='更多企业规模资料',
                    txt2='收起';
                ktwp.fold($this,$moreQygmC,txt1,txt2);
                return false;
            });

            //更多联系人
            $('.contact-cz .unfold').on('click',function(){
                var $this=$(this),
                    txt1='更多联系人资料',
                    txt2='收起';
                ktwp.fold($this,$moreUserInf,txt1,txt2);
                return false;
            });

            //企业名称验证
            $qyName.on('focus',function(){
                ktwp.focusFun($qyNameParent,$qyName);
            });
            $qyName.on('blur',function(){
                var $this=$(this),
                    val=$this.val();
                checkQyName(val);
                /*if(ktwp.blurFun($qyName,$qyNameParent)){
                    //status:1 代表成功 0代表有表单字段错误 500代表系统错误 2代表未登录
                    $.get('//'+hostmap.i+'/reg/checkShopName?shopName='+val,function(data){
                        var status=data.status,
                            msg=data.msg;
                        if(status==1){
                            validator.showRightTips({
                                obj:$qyName,
                                tipObj:$qyNameParent
                            });
                        }
                        else if(status==2){
                            dialog.tip({
                                content:msg,
                                close:function(){
                                    location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
                                }
                            });
                        }
                        else{
                            validator.showTips({
                                obj:$qyNameParent,
                                frmObj:$qyName,
                                validTip:msg
                            });
                        };
                    },'jsonp');
                }*/
            });

            //城内商户地址验证
            $cscParent.on('change','select:last',function(){
                ktwp.blurFun($(this),$cscParent);
            });

            //城外商户地址验证
            $prvParent.on('change','select:last',function(){
                ktwp.blurFun($(this),$prvParent);
            });

            //经营模式验证
            $model.on('click',function(){
                validator.showRightTips({
                    obj:$model,
                    tipObj:$modelTd
                });
            });

            //详细地址验证
            $dtlAdrss.on('focus',function(){
                ktwp.focusFun($dtlAdrssTd,$dtlAdrss);
            });
            $dtlAdrss.on('blur',function(){
                ktwp.blurFun($dtlAdrss,$dtlAdrssTd);
            });

            //企业网址验证
            $qyWebUrl.on('focus',function(){
                ktwp.focusFun($qyWebUrlTd,$qyWebUrl);
            });
            $qyWebUrl.on('blur',function(){
                ktwp.blurFun($qyWebUrl,$qyWebUrlTd);
            });

            //主营产品/服务验证
            ktwp.sellListValid();

            //法定代表人验证
            $frName.on('focus',function(){
                ktwp.focusFun($frNameTd,$frName);
            });
            $frName.on('blur',function(){
                ktwp.blurFun($frName,$frNameTd);
            });

            //注册资本验证
            $regMoney.on('focus',function(){
                ktwp.focusFun($regMoneyTd,$regMoney);
            });
            $regMoney.on('blur',function(){
                ktwp.blurFun($regMoney,$regMoneyTd);
            });

            //公司介绍
            $gsjs.on('focus',function(){
                ktwp.focusFun($gsjsTd,$gsjs);
            });
            $gsjs.on('blur',function(){
                ktwp.blurFun($gsjs,$gsjsTd);
            });

            //联系人：姓名
            $userName.on('focus',function(){
                ktwp.focusFun($userNameTd,$userName);
            });
            $userName.on('blur',function(){
                ktwp.blurFun($userName,$userNameTd);
            });

            //联系人：手机号码
            $phone.on('focus',function(){
                ktwp.focusFun($phoneTd,$phone);
            });
            $phone.on('blur',function(){
                ktwp.blurFun($phone,$phoneTd);
            });

            //联系人：电子邮箱
            $email.on('focus',function(){
                ktwp.focusFun($emailTd,$email);
            });
            $email.on('blur',function(){
                ktwp.blurFun($email,$emailTd);
            });

            //联系人：部门
            $department.on('focus',function(){
                ktwp.focusFun($departmentTd,$department);
            });
            $department.on('blur',function(){
                ktwp.blurFun($department,$departmentTd);
            });

            //联系人：职位
            $position.on('focus',function(){
                ktwp.focusFun($positionTd,$position);
            });
            $position.on('blur',function(){
                ktwp.blurFun($position,$positionTd);
            });

            //联系人：固定电话 - 国家代码
            $telPrfx.on('focus',function(){
                ktwp.focusFun($telPrfxTd,$telPrfx);
            });
            $telPrfx.on('blur',function(){
                ktwp.telFun($telPrfx,$telArea,$telNum,$telPrfxTd);
            });

            //联系人：固定电话 - 区号
            $telArea.on('focus',function(){
                ktwp.focusFun($telPrfxTd,$telArea);
            });
            $telArea.on('blur',function(){
                ktwp.telFun($telPrfx,$telArea,$telNum,$telPrfxTd);
            });

            //联系人：固定电话 - 电话号码
            $telNum.on('focus',function(){
                ktwp.focusFun($telPrfxTd,$telNum);
            });
            $telNum.on('blur',function(){
                ktwp.telFun($telPrfx,$telArea,$telNum,$telPrfxTd);
            });

            //联系人：400电话
            $tel4001.on('focus',function(){
                ktwp.focusFun($tel4001Td,$tel4001);
            });
            $tel4001.on('blur',function(){
                ktwp.blurFun($tel4001,$tel4001Td);
            });

            //联系人：传真 - 国家代码
            $czPrfx.on('focus',function(){
                ktwp.focusFun($czPrfxTd,$czPrfx);
            });
            $czPrfx.on('blur',function(){
                ktwp.telFun($czPrfx,$czArea,$czNum,$czPrfxTd);
            });

            //联系人：传真 - 区号
            $czArea.on('focus',function(){
                ktwp.focusFun($czPrfxTd,$czArea);
            });
            $czArea.on('blur',function(){
                ktwp.telFun($czPrfx,$czArea,$czNum,$czPrfxTd);
            });

            //联系人：传真 - 电话号码
            $czNum.on('focus',function(){
                ktwp.focusFun($czPrfxTd,$czNum);
            });
            $czNum.on('blur',function(){
                ktwp.telFun($czPrfx,$czArea,$czNum,$czPrfxTd);
            });

            //联系人：qq
            $qq.on('focus',function(){
                ktwp.focusFun($qqTd,$qq);
            });
            $qq.on('blur',function(){
                ktwp.blurFun($qq,$qqTd);
            });

            //联系人：旺旺
            $ww.on('focus',function(){
                ktwp.focusFun($wwTd,$ww);
            });
            $ww.on('blur',function(){
                ktwp.blurFun($ww,$wwTd);
            });

            //提交旺铺信息
            $('#ktwpFrm').on('submit',function(){
                var $this=$(this),
                    $smtBtn=$this.find('input[type=submit]'),
                    $zyhyDivslt=$('#zyhyDivslt'),
                    $zyhyDivChk=$zyhyDivslt.find('.uc-divslt-chkd'),
                    $sellList=$('input[name^="sellList"]'),
                    $validError,top;

                //$qyName.trigger('blur');//企业名称验证
                checkQyName($qyName.val());

                //城内城外商户验证
                if($('input[name=result]:checked').val()=='Y'){
                    ktwp.blurFun($shopImg,$shopImg.parent());
                }
                $('.shType-c:visible').find('select:last').trigger('change');

                ktwp.blurFun($dtlAdrss,$dtlAdrssTd);//详细地址验证
                ktwp.blurFun($qyWebUrl,$qyWebUrlTd);//企业网址验证

                //经营模式验证
                if(!$('input[name=model]:checked')[0]){
                    validator.showTips({
                        obj:$modelTd,
                        frmObj:$model,
                        validTip:'请选择经营模式'
                    });
                }else{
                    validator.showRightTips({
                        obj:$model,
                        tipObj:$modelTd
                    });
                }

                //主营产品/服务验证
                var sellListArry=[];
                $sellList.each(function(){
                    var $this=$(this),
                        val=$this.val(),
                        index=$('input[name^="sellList"]').index(this);
                    if(val!=''){
                        sellListArry.push(index);
                    }
                });
                if(sellListArry.length<1){
                    $sellList.addClass('frm-error');
                    validator.showTips({
                        obj:$('.zycp-td'),
                        frmObj:$sellList.eq(0),
                        validTip:sellListTxt
                    });
                }else{
                    $.each(sellListArry,function(i,n){
                        $sellList.eq(n).trigger('blur');
                    });
                }

                //主营行业验证
                if($zyhyDivChk.find('li').length<1){
                    validator.showTips({
                        obj:$zyhyDivslt,
                        frmObj:$zyhyDivChk,
                        validTip:'请选择主营行业'
                    });
                }else{
                    validator.showRightTips({
                        obj:$zyhyDivChk,
                        tipObj:$zyhyDivslt
                    });
                }

                ktwp.blurFun($frName,$frNameTd);//法定代表人验证
                ktwp.blurFun($regMoney,$regMoneyTd);//注册资本验证
                ktwp.blurFun($gsjs,$gsjsTd);//公司介绍验证
                ktwp.blurFun($userName,$userNameTd);//姓名验证
                ktwp.blurFun($phone,$phoneTd);//手机号码验证
                ktwp.blurFun($email,$emailTd);//电子邮箱验证
                ktwp.blurFun($department,$departmentTd);//部门验证
                ktwp.blurFun($position,$positionTd);//职位验证
                ktwp.telFun($telPrfx,$telArea,$telNum,$telPrfxTd);//固定电话验证
                ktwp.blurFun($tel4001,$tel4001Td);//400电话验证
                ktwp.telFun($czPrfx,$czArea,$czNum,$czPrfxTd);//传真验证
                ktwp.blurFun($qq,$qqTd);//qq验证
                ktwp.blurFun($ww,$wwTd);//旺旺验证

                $validError=$('.valid-error').not('.shType-c:hidden .valid-error');
                if($validError[0]){
                    if($validError.parents('.more-qygm-c')[0]){
                        $validError.parents('tbody').show();
                        $('.more-qygm').html('收起');
                    }
                    if($validError.parents('.more-user-inf')[0]){
                        $validError.parents('tbody').show();
                        $('.contact-cz .unfold').html('收起');
                    }
                    top=$validError.eq(0).offset().top;
                    $('html,body').animate({scrollTop:top-100},300);
                    return false;
                }

                $smtBtn.attr('disabled',true).css('cursor','default').val('正在提交...');
                $.ajax({
                    type:"post",
                    url:$this.attr('action'),
                    data:$this.serializeArray(),
                    dataType:"jsonp",
                    success:function(data){
                        var status=data.status,
                            msg=data.msg,
                            result=data.data,
                            html='';
                        //status:1 代表成功 0代表有表单字段错误 500代表系统错误 2代表未登录 4代表违禁词
                        switch(status){
                            case 1:
                                location.href='//'+hostmap.i+'/'+result.url;
                                break;
                            case 2:
                                dialog.tip({
                                    content:msg.sysMsg,
                                    close:function(){
                                        location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
                                    }
                                });
                                break;
                            case 0:
                                $.each(msg,function(i,n){
                                    var $i=$('input[name="'+i+'"]'),
                                        $iParent=$i.parent();
                                    if(i=='qyLogo'||i=='model'||i=='sellList[]'){
                                        $iParent=$i.parents('td');
                                    }
                                    if(i=='tradeList[]'){
                                        $iParent=$zyhyDivslt;
                                    }
                                    if(i=='province'||i=='city'||i=='area'||i=='cscName'||i=='venue'||i=='floor'||i=='floorArea'){
                                        $i=$('select[name="'+i+'"]');
                                        $iParent=$i.parent();
                                    }
                                    if(i=='introduce'){
                                        $i=$('textarea[name="'+i+'"]');
                                        $iParent=$i.parent();
                                    }
                                    validator.showTips({
                                        obj:$iParent,
                                        frmObj:$i,
                                        validTip:n
                                    });
                                    $validError=$('.valid-error').not('.shType-c:hidden .valid-error');
                                    if($validError[0]){
                                        if($validError.parents('.more-qygm-c')[0]){
                                            $validError.parents('tbody').show();
                                            $('.more-qygm').html('收起');
                                        }
                                        if($validError.parents('.more-user-inf')[0]){
                                            $validError.parents('tbody').show();
                                            $('.contact-cz .unfold').html('收起');
                                        }
                                        top=$validError.eq(0).offset().top;
                                        $('html,body').animate({scrollTop:top-100},300);
                                    }
                                });
                                break;
                            case 4:
                                $.each(msg,function(i,n){
                                    html+='<p>'+(i+1)+'、<span class="g-fwb">'+n.frmTxt+'</span>中的<span>“'+n.wjc.replace(/[\[\]]/g,'')+'”</span>属于违禁词或敏感词，请修改</p>';
                                });
                                dialog.stop({
                                    width:450,
                                    content:'<h2 class="g-fs16">对不起，您填写的信息不规范！</h2>'+html,
                                    ok:function(){}
                                });
                                break;
                            default:
                                dialog.tip({
                                    content:msg.sysMsg
                                });
                        }
                    },
                    error:function(){
                        dialog.tip({
                            content:'系统异常，请稍候再试'
                        });
                    },
                    complete:function(){
                        $smtBtn.removeAttr('disabled').css('cursor','pointer').val('提交旺铺信息');
                    }
                });
                return false;
            });

        }
    };
    ktwp.init();
});