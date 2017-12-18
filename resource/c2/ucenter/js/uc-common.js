define(function(require, exports, module) {
    var dialog=require('./dialog');//弹窗
    var	hostmap = seajs.hostmap;  // 域名配置表
    var ucCommon={
        /*获取url参数*/
        getUrlParam:function(_url,key){
            if(_url.lastIndexOf("?") != -1){
                var queryStr = _url.substring(_url.lastIndexOf("?") + 1, _url.length);
                if(!key)
                    return queryStr;//返回所有参数
                else{
                    var params  = queryStr.split("&");
                    for(var j = 0 ;j < params.length;j++){
                        var tmp = params[j].split("=");
                        if(tmp[0]==key){
                            return tmp[1];
                            break;
                        }
                    }
                }
            }
        },

        /*
         * 获取当前域名下功能性2级域名
         * host 二级域名
         * path 路径
         * domain 一级域名（一般为csc86.com）可留空
         */
        url:function(host ,path ,domain){
            var	domain = domain || 'csc86.com';
            if(host){
                switch(host){
                    default:
                        ;
                }
            }
            return location.protocol + "//" + (host ? host + "." : "") + domain + (path ? path : "");
        },

        /*获取本机ip*/
        getLocalIPAddress:function(){
            var obj = null;
            var rslt = "127.0.0.1";
            try
            {
                obj = new ActiveXObject("rcbdyctl.Setting");
                if (!isNull(obj.GetIPAddress))
                {
                    rslt = obj.GetIPAddress;
                }
                obj = null;
            }
            catch(e)
            {
                //异常发生
            }
            return rslt;
        },

        /*刷新验证码*/
        refreshCode:function(obj){
            var w=obj.width(),
                h=obj.height(),
                src = obj.attr('src'),
                t = (new Date).getTime();
            src = /\?/.test(src) ? /t=.+?/.test(src) ? src.replace(/t=\d+/, 't=' + t) : src + '&t=' + t : (src + '?w=' + w + '&h=' + h + '&t=' + t);
            obj.attr("src", src);
        },

        /*
        * 省市区js
        * provinceObj为省的jquery对象
        * cityId为市select的id和name
        * areaId为区select的id和name
        * */
        getAddress:function(provinceObj,cityId,areaId){
            //获取身份
            if(provinceObj.find('option').length<2){
                $.get('//'+hostmap.i+'/getAllProvince',function(data){
                    var status=data.status,
                        arry=[],
                        html='';
                    if(status==='200'){
                        arry=data.data;
                        $.each(arry,function(i,n){
                            html+='<option data-id="'+arry[i].id+'" value="'+arry[i].id+':'+arry[i].name+'">'+arry[i].name+'</option>';
                        });
                        provinceObj.append(html);
                    }
                },'jsonp');
            }

            if(cityId){
                provinceObj.on('change',function(){
                    var $this=$(this);
                    var id=$this.find('option:selected').data('id');
                    if(id){
                        $.get('//'+hostmap.i+'/getZoneByParentId?parentId='+id,function(data){
                            var status=data.status,
                                arry=[],
                                cityObj=$('<select id="'+cityId+'" class="g-mr5 frm-slt" name="'+cityId+'"></select>');
                                html='<option value="">请选择市</option>';
                            if(status==='200'){
                                arry=data.data;
                                if(arry.length>0){
                                    $.each(arry,function(i,n){
                                        html+='<option data-id="'+arry[i].id+'" value="'+arry[i].id+':'+arry[i].name+'">'+arry[i].name+'</option>';
                                    });
                                    if(!$('#'+cityId)[0]){
                                        cityObj.insertAfter($this);
                                        cityObj.append(html);
                                    }else{
                                        $('#'+cityId).html('').append(html);
                                    }
                                    $('#'+cityId).trigger('change');//验证表单的时候用的
                                }
                            }
                        },'jsonp');
                    }else{
                        $('#'+cityId).remove();
                    }
                    $('#'+areaId).remove();
                });
            }

            if(cityId&&areaId) {
                $('body').on('change','#'+cityId, function () {
                    var $this = $(this);
                    var id = $this.find('option:selected').data('id');
                    if(id){
                        $.get('//' + hostmap.i + '/getZoneByParentId?parentId=' + id, function (data) {
                            var status = data.status,
                                arry = [],
                                areaObj = $('<select id="' + areaId + '" class="frm-slt" name="'+areaId+'"></select>');
                            html = '<option value="">请选择市</option>';
                            if (status === '200') {
                                arry = data.data;
                                if(arry.length>0) {
                                    $.each(arry, function (i, n) {
                                        html += '<option data-id="' + arry[i].id + '" value="' + arry[i].id + ':' + arry[i].name + '">' + arry[i].name + '</option>';
                                    });
                                    if (!$('#' + areaId)[0]) {
                                        areaObj.insertAfter($this);
                                        areaObj.append(html);
                                    } else {
                                        $('#' + areaId).html('').append(html);
                                    }
                                    $('#' + areaId).trigger('change');//验证表单的时候用的
                                }
                            }
                        }, 'jsonp');
                    }else{
                        $('#'+areaId).remove();
                    }
                });
            }
        },

        /*图片上传*/
        upload:function(options){
            var opts={
                url:'',
                uploadBtn:null,
                previewObj:null,
                dataType:'json',
                formData:null,
                regx:/(\.|\/)(jpe?g|png|gif)$/i,
                fileSize:1024*1024*5,//5M
                typeTip:'仅支持jpg、png、gif格式图片，请选择正确的图片格式！',
                sizeTip:'图片大小不得超过5M！'
            };
            opts=$.extend({},opts,options);
            var url=opts.url,
                uploadBtn=opts.uploadBtn,
                previewObj=opts.previewObj,
                dataType=opts.dataType,
                formData=opts.formData,
                regx=opts.regx,
                fileSize=opts.fileSize,
                typeTip=opts.typeTip,
                sizeTip=opts.sizeTip;
            uploadBtn.fileupload({
                url:url,
                dataType:dataType,
                formData:formData,
                progressall:function(e,data){
                    dialog.loading({
                        content:'图片正在上传中，请稍后...'
                    });
                },
                add:function(e,data){
                    var flinfo=data.files[0],
                        flname=flinfo.name,
                        flsize=flinfo.size;
                    if(!regx.test(flname)){
                        dialog.tip({
                            content:typeTip,
                            time:3
                        });
                        return false;
                    }else{
                        if(flsize>fileSize){
                            dialog.tip({
                                content:sizeTip,
                                time:3
                            });
                            return false;
                        }else{
                            data.submit();
                        }
                    }
                },
                done:function(e,data){
                    art.dialog({id:"loading"}).close();
                    var result = data.result,
                        msg=result.msg;
                    if(result.status==='1'){
                        previewObj.find('img').attr('src','http://'+hostmap.img+''+result.key);//图片必须写死http
                        previewObj.find('input[type=hidden]').val(result.key);

                        //开通旺铺：企业logo
                        if(formData.imgType=='shopLogo'){
                            previewObj.find('.upload-fbtn span').html('修改logo');
                        }

                        //开通旺铺：联系人头像
                        if(formData.imgType=='shopContactFace'){
                            $('.user-img').find('.upload-fbtn span').html('修改');
                        }
                    }else{
                        dialog.tip({
                            content:msg?msg:'上传失败，请稍后重试！',
                            time:3
                        });
                    }
                },
                fail:function(e,data){
                    art.dialog({id:"loading"}).close();
                    dialog.tip({
                        content:'上传失败，请稍后重试！',
                        time:3
                    });
                }
            });
        }
    };
    module.exports=ucCommon;
})