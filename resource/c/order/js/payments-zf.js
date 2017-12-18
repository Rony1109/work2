define(function(require, exports, module) {
	var isSubmit=false;
	var dialog=require('dialog');
	require('newtop');
	require('//res.csc86.com/f=js/m/config.js,js/m/cookie.js');
	require('//res.csc86.com/v2/c/order/css/payments-tx.css');

	//require('//res.csc86.com/js/m/cookie.js');
	var	sjRegx=/^1\d{10}$/;//手机号码正则
	var	sfzRegx=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;//身份证号码正则
	var	zjjgRegx=/^[^\s]*$/;//组织机构正则
	//var	zjjgRegx=/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/;//组织机构正则
	var yhkRegx = /^(\d{8,21})$/;//银行卡号正则
	var xmRegx = /^([\u4e00-\u9fa5]{2,20})$/;//姓名正则
	var kyzmRegx = /^(\d{3})$/;//卡后三位验证码
	var yzmRegx = /^(\d{7})$/;//手机验证码
	//var jesl = /^([1-9][\d]{0,3}(\.[\d]{1,2})?$|0)(\.(?!0+$)[\d]{1,2})?$|10{4}(\.[0]{1,2})?$/;//金额
	var jesl = /^[1-4][\d]{0,4}(\.[\d]{1,2})?$|^[1-9][\d]{0,3}(\.[\d]{1,2})?$|^(0\.(?!0+$)[\d]{1,2})?$|^(50{4})(\.[0]{1,2})?$/;//金额
	var jqjeRegx = /^[1-9][\d]{0,1}(\.[\d]{1,2})?$|^[1-9][\d]{0,1}(\.[\d]{1,2})?$|^(0\.(?!0+$)[\d]{1,2})?$|^(10{2})(\.[0]{1,2})?$/;//鉴权金额

			var $xyzjts =$('.xyzjts');
	$xyzjts.hover(function(){
		$(this).find('.d1').css("display","block");
		},function(){
			$(this).find('.d1').css("display","none");
			});

	var valid=require('valid');
	var _placeholder=require('placeholder');

	if($('input[name=realName]')[0]){
				var tshtml = '<div class="cftxtcon con2">\
				绑定银行卡要进行实名认证，<b>认证成功后</b>，<b>不可更改</b>，只能绑定该实名认证下的银行卡，后续将开放对公银行卡的绑定功能，为了不影响对公银行账号的绑定，<b>建议绑定法人代表的银行卡</b>。</div>\
				<div class="ydty"><span>我知道了</span></div>';
		 var tsdg = dialog({
                        id: 'cftxy',
                        title: "重要提示",
                        content: tshtml,
                        padding: 0,
                        fixed: true,
                        lock: true,
                        opacity: 0.2,
                        init: function() {
							$('.aui_state_lock').addClass('paymentszf');
                            $('.ydty span').on('click',function() {
                                tsdg.close();
                                return false;
                            });
                        },
						width: 510,
                        height: 200
                    });
		};

	_placeholder.placeholder('#formxm','#888');
	_placeholder.placeholder('#formsfz','#888');
	_placeholder.placeholder('#formyhk','#888');
	_placeholder.placeholder('#formkyzm','#888');
	_placeholder.placeholder('#formsj','#888');
	_placeholder.placeholder('#formyzm','#888');




	$('.txsm').on('click',function(){
		var $this=$(this);
		var tipHtml = '<div class="cftxtcon con3">\
		  提现金额小于5万，在工作日的工作时间（09:00~17:00）为实时到账；<br>大于5万，通常情况下为2小时内到账；具体到账时间以收款行处理为准。<br>\
		  </div>\
		  <div class="ydty"><span>我知道了</span></div>';
		var dg = dialog({
			id: 'cftxy',
			title: "到账时间说明",
			content: tipHtml,
			padding: 0,
			fixed: true,
			lock: true,
			opacity: 0.2,
			init: function() {
				$('.aui_state_lock').addClass('paymentszf');
				$('.ydty span').on('click',function() {
					dg.close();
					return false;
				});
			},
			width: 510
		});

		return false;
	});



	$('.cftxy').on('click',function(){
		var $this=$(this);
		  var tipHtml = '<div class="cftxtcon">\
		  欢迎使用我的钱包服务，为了保障您的权益，请您确认已于注册、使用我的钱包服务前，已经详细阅读了本服务协议的所有内容，并同意接受本协议的全部内容。本协议会对与您的权益具有或可能具有重大关系的条款，以及对华南城网具有或可能具有免责或限制责任的条款均用粗体字标注，请您注意。如果您不同意本协议的任意内容，或者无法准确理解华南城网对条款的解释，请不要进行后续操作。<br>\
		  一、声明与承诺<br>\
		  1.1 您保证，在您同意接受本协议并注册账户时，您是依据中华人民共和国法律规定具有完全民事行为能力的自然人或法人；如您代表一家公司或其他法律主体在华南城网登记，则您声明和保证，您有权使该公司或该法律主体受本协议的约束。本协议内容不受您所属国家或地区法律的排斥。不具备前述条件的，您应立即终止注册或停止使用本服务。您在使用本服务时，应自行判断对方是否是完全民事行为能力人并自行决定是否与对方进行交易或转账给对方等，且您应自行承担与此相关的所有风险。<br>\
		  1.2 您同意，<b>华南城网有权根据业务需要随时酌情修订条款，修改后的条款一经公示立即生效。在华南城网修改服务条款后，若您继续使用服务，则将视为您已接受了经修订的条款。当您与华南城网发生争议时，应以最新的“条款”为准。若您不同意，则您应主动立即停止使用本服务。</b><br>\
		  1.3 您同意，您在华南城网上（域名为www.csc86.com）发生的所有交易，您不可撤销的授权由华南城网按照其制定的规则进行处理；同时，您不可撤销的授华南城网根据其独立判断将争议款项的全部或部分支付给交易一方或双方。华南城网进行资金的冻结、扣划完全来自于您的授权，华南城网对因此给您造成的任何损失（如有）均不承担责任。<br>\
		  1.4 <b>您确认，您使本服务时，您完全遵守本协议、《华南城网服务条款》、《华南城网在线交易平台服务协议》及华南城网制定的各项规则及公告通知等。</b><br>\
		  二、关于“我的钱包”注册<br>\
		  您须在华南城网完成账号的注册，并且按照华南城网要求提供相关信息完成注册后方可使用本服务。您同意：<br>\
		  2.1 按照华南城网要求准确提供并在取得该账户后及时更新您正确、最新及完整的身份信息及相关资料。您有义务维护并立即更新您的注册信息，确保其为正确、最新及完整。若您提供任何错误、不实、过时或不完整的资料，或者华南城网有合理的理由怀疑您的注册信息为错误、不实、过时或不完整，华南城网有权暂停或终止您的账户，您并同意负担因此所产生的直接或间接的任何损失、支出、费用、罚金。若华南城网依照国家法律法规、部门规章或监管机构的要求需要您补充提供任何相关资料时您不能及时配合提供，华南城网有权暂停或终止向您提供部分或全部服务。<br>\
		  2.2 您应当准确提供并及时更新您提供的联系电话、电子邮箱地址、联系地址、邮政编码等联系方式，以便华南城网与您进行及时、有效联系。您应完全独自承担因通过这些联系方式无法与您取得联系而导致的您在使用本服务过程中遭受的任何损失。您理解并同意，您有义务保持您提供的联系方式的有效性，如有变更需要更新的，您应按华南城网的要求进行操作。<br>\
		  2.3 <b>因您未及时更新资料（包括但不限于身份证、营业执照等证件或其他身份证明文件、联系方式、与账户绑定的邮箱、手机号码等），导致本服务无法提供或提供时发生任何错误，您不得将此作为取消交易、拒绝付款的理由，您将承担因此产生的一切后果，华南城网不承担任何责任。</b><br>\
		  2.4 华南城网通过您的账号和密码识别您的指示，您应当妥善保管您的账号和密码及身份信息，对于因密码泄露、身份信息泄露所致的损失，由您自行承担。您保证不向其他任何人泄露您的账号及密码以及身份信息，亦不使用其他任何人的账号及密码。如您发现有他人冒用或盗用您的账号及密码或任何其他未经合法授权之情形时，应立即以有效方式通知华南城网，要求暂停相关服务。<br>\
		  2.5 您应对您的账户负责，只有您本人可以使用您的账户。在您决定不再使用该账户时，您应将该账户下所对应的可用款项全部提现或者向华南城网发出其它支付指令，并向华南城网申请注销该账户。<br>\
		  2.6 您同意，若您丧失全部或部分民事权利能力或民事行为能力，华南城网有权根据有效法律文书（包括但不限于生效的法院判决等）处置与您的账户相关的款项。<br>\
		  三、关于“我的钱包”服务<br>\
		  3.1 代收功能：接受您的指令代为收取其他第三方向您支付的各类合法款项。<br>\
		  3.2 代付功能：经由您的授权或指令，自您的账户内扣划一定金额向指定账户或指定第三方支付。如非经法律程序或者非由于本条款约定事项之出现，此等支付是不可逆转的。<br>\
		  3.3 提现功能：您可以要求华南城网退返华南城网代管的您的款项或向您支付由华南城网代收的货款。当您向华南城网做出提现指令时，必须提供一个与您的名称相符的有效的中国大陆银行账户，华南城网将于收到指令后的<b>七个工作日内</b>，将相应的款项汇入您提供的有效银行账户（根据您提供的银行不同，会产生汇入时间上的差异）。华南城网拥有制定及调整提现限制额度以及提现频率之权利。您同意当华南城网发现您发出大额提现指令时，要求您向华南城网提供合法有效的身份证明。在您未能按要求提供前述材料之前，华南城网有权不执行您的提现要求。除本条约定外，华南城网不接受您提供的其他受领方式。<br>\
		  3.4 充值功能：您委托华南城网代为保管您通过使用本服务的指定的方式向您的账户充值的资金。<br>\
		  3.5 查询功能： 华南城网将对您在本系统中的所有操作进行记录，不管该操作的目的最终是否实现，您可以在本系统中实时进行查询，并可以此为基础与您的银行账户进行核对查询，如您认为数额有误，则华南城网将向您提供已按照您的指令所执行的收付款的相关记录，您了解并同意您最终能够收到款项的责任是由您登记的银行账户对应的银行提供的，您需向该银行请求查证。<br>\
		  3.6 账户记录： 华南城网将对您账户内的信息和操作的全部或部分进行记录。<br>\
		  四、<b>系统服务中断或故障</b><br>\
		  <b>我的钱包系统因下列状况无法正常运作，使您无法使用各项服务时，华南城网对您不负任何损害赔偿责任， 包括但不限于：</b><br>\
		  <b>（一）华南城网公告系统停机维护期间。</b><br>\
		  <b>（二）信息网络连接故障，电脑、通讯或其他系统故障。</b><br>\
		  <b>（三）因台风、地震、海啸、火灾、洪水、爆炸、停电、罢工、劳动争议、暴乱、起义、骚乱、战争、恐怖袭击，生产力或生产资料不足，政府行为，司法行政机关的命令或第三方的不作为而造成的不能服务或延迟服务的。</b><br>\
		  <b>（四）因黑客攻击、电信部门技术调整或故障、网站升级、银行方面的问题等因素造成的服务中断或者延迟。</b><br>\
		  五、商标、知识产权的保护 <br>\
		  5.1 华南城网拥有本网站内所有资料及展现形式的知识产权，本网站所有的技术及程序均属华南城网所有，并未授权任何人使用。<br>\
		  5.2 未经华南城网许可，任何人不得擅自使用（包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载）、修改、传播华南城网的知识产权。否则，华南城网将依法追究法律责任。<br>\
		  六、条款的解释、法律适用及争端解决<br>\
		  6.1 在法律允许的范围内，华南城网对本协议服务条款拥有最终解释权。<br>\
		  6.2 本协议及其修订本的有效性、履行和与本协议及其修订本效力有关的所有事宜，均适用中华人民共和国法律。<br>\
		  6.3 <b>凡与本协议有关的任何争议，均提交华南国际经济贸易仲裁委员会调解中心进行调解；一方不愿调解或调解不成的，应提交华南国际经济贸易仲裁委员会进行仲裁。</b>\
		  </div>\
		  <div class="ydty"><span>已阅读并同意此协议</span></div>';
		 var dg = dialog({
                        id: 'cftxy',
                        title: "用户协议",
                        content: tipHtml,
                        padding: 0,
                        fixed: true,
                        lock: true,
                        opacity: 0.2,
                        init: function() {
							$('.aui_state_lock').addClass('paymentszf');
                            $('.ydty span').on('click',function() {
                                dg.close();
                                return false;
                            });
                        },
						width: 510,
                        height: 350
                    });

				return false;
		});

	var djstimer = null;
	var djstime= function (ms) {
              //  var ts = (new Date(2018, 11, 11, 9, 0, 0)) - (new Date());//计算剩余的毫秒数
			    var d =  new Date();
			    var ts =ms-d.getTime();//计算剩余的毫秒数
				/*
                var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
                var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
                var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
                var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
                dd = djscheckTime(dd);
                hh = djscheckTime(hh);
                mm = djscheckTime(mm);
                ss = djscheckTime(ss);
				*/
				var outs = parseInt(ts / 1000 , 10);//计算剩余的总秒数
               if(ts>0){$('.yzm').val( outs + " 秒");
			   		if(!$('.yzm').is(':disabled')){ $('.yzm').prop("disabled", true);}
			   }else{
				   clearInterval(djstimer);
				   $('.yzm').prop("disabled", false);
				   $('.yzm').val('获取验证码');
				    $('.yzmts').html('');
				   };
			 //  console.log(outs);
			  // console.log(mm+"分"+ss);

			 };
			 /*
	  var  djscheckTime = function(i) {
               if (i < 10) {
                   i = "0" + i;
                }
               return i;
            }
			*/




	var validFrm=function(obj,isSmtValid){
				var isMust=true,
					nullTip='',
					errorTip='',
					regx=null,
					objId=obj.attr('id'),
					tipObj=obj.parent();
				switch(objId){
					case 'formxm':
					regx = xmRegx;
					nullTip='请输入姓名';
					errorTip='请输入正确的姓名';
					break;
					case 'formsfz':
					regx = sfzRegx;
					nullTip='请输入身份证号';
					errorTip='请输入正确的身份证号码';
					break;
					case 'formyzzcode':
						regx = zjjgRegx;
						nullTip='请输入组织机构代码或社会统一信用号';
						errorTip='请输入正确的组织机构代码或社会统一信用号';
						break;
					case 'formyhk':
					regx = yhkRegx;
					nullTip='请输入银行卡号';
					errorTip='卡号为8~21位数字';
					break;
					case 'formkyzm':
					regx = kyzmRegx;
					nullTip='请输入卡验证码';
					errorTip='请输入卡背面三位数字';
					break;
					case 'formsj':
					regx = sjRegx;
					nullTip='请输入手机号码';
					errorTip='请输入11位号码';
					break;
					case 'jesl':
					regx = jesl;
					nullTip='请输入金额';
					errorTip='请输入0.01~50000的数字金额';
					break;
					case 'formyzm':
					regx = yzmRegx;
					nullTip='请输入验证码';
					errorTip='请输入正确的验证码';
					break;
					case 'captcha':
						regx = yzmRegx;
						nullTip='请输入验证码';
						errorTip='请输入正确的验证码';
						break;
					case 'formjqje':
						regx = jqjeRegx;
						nullTip='请输入鉴权金额';
						errorTip='请输入正确的鉴权金额';
					break;
					case 'formkyxqn':
					nullTip='请选择开户银行';
					break;
					case 'formyhkzh':
					nullTip=$('#formyhkzh').data("errormsg");
					break;
					case 'formkyxsf':
					nullTip='请选择省份';
					break;
					case 'formkyxcs':
					nullTip='请选择城市';
					break;
					case 'formkyxqy':
					nullTip='请输入完整有效期';
					break;
				}
				return valid.init({
					isMust:isMust,
					obj:obj,
					tipObj:tipObj,
					errorClass:'frm-error',
					nullTip:nullTip,
					errorTip:errorTip,
					regx:regx,
					isSmtValid:isSmtValid
				});
			};

	var $formxm = $('#formxm');
	var $formsfz = $('#formsfz');
	var $formyzzcode= $('#formyzzcode');
	var $formyhk = $('#formyhk');
	var $formkyzm = $('#formkyzm');
	var $formsj = $('#formsj');
	var $formyzm = $('#formyzm');
	var $formjqje = $('#formjqje');
	var $formkyxqn = $('#formkyxqn');
	var $formyhkzh = $('#formyhkzh');
	var $formkyxsf = $('#formkyxsf');
	var $formkyxcs = $('#formkyxcs');
	var $formkyxxj = $('#formkyxxj');
	var $formkhzhlist = $('#formkhzhlist');
	var $formkyxqy = $('#formkyxqy');
	var $jesl = $('#jesl');

	$formxm.on('blur',function(){
				validFrm($(this),0);
			});
	$formsfz.on('blur',function(){
				validFrm($(this),0);
			});
	$formyzzcode.on('blur',function(){
		validFrm($(this),0);
	});
	$formyhk.on('blur',function(){
				validFrm($(this),0);
			});
	$formkyzm.on('blur',function(){
				validFrm($(this),0);
			});
	$formsj.on('blur',function(){
				validFrm($(this),0);
			});
	$formyzm.on('blur',function(){
				validFrm($(this),0);
			});
	$formjqje.on('blur',function(){
		validFrm($(this),0);
	});
	$formkyxqn.on('blur',function(){
				validFrm($(this),0);
			});

	$formyhkzh.on('blur',function(){
				validFrm($(this),0);
			});

	$formkyxsf.on('blur',function(){
				validFrm($(this),0);
			});
	$formkyxcs.on('blur',function(){
				validFrm($(this),0);
			});
	$jesl.on('blur',function(){
				validFrm($(this),0);
			});


	$("body").on('blur',"#captcha",function(){
		validFrm($(this),0);
	});

	$("body").on('keypress',"input",function(e){
		if (e.which == 13) {
			return false;
		}
	});

	var $sroll=$('.sroll');
	$sroll.on('click','.jsli',function(){
		var $this=$(this);
		var $paymentslst=$sroll.find('.payments-lst');
		$thisnum=$this.index();
		$this.addClass("active").siblings().removeClass("active");
		$paymentslst.eq($thisnum).removeClass("none").siblings().addClass("none");
		});


$formkyxqn.on('change',function(){
	var $this=$(this),$form=$this.parents('.jszfOrderFrm');
	var $thistext = $this.find("option:selected").text();
	$('.zhlist').hide();
	$('#formyhkzh').val('');
	$this.val()?$form.find('input[type=hidden][name=bankName]').val($thistext):$form.find('input[type=hidden][name=bankName]').val('');
		$formyhkzh.data({"flag":1});
		$formkhzhlist.find("option").each(function() {
        var $this=$(this);
		if($this.val()){$this.remove()}
    });
	});

$('.jszfOrderFrm').on('change','#formkyxsf',function(){
	var $this=$(this),$form=$this.parents('.jszfOrderFrm');
	var dataobj = {"provinceNo":$this.val()};
	$('.zhlist').hide();
	$('#formyhkzh').val('');
	$formkyxcs.find("option").each(function() {
        var $this=$(this);
		if($this.val()){$this.remove()}
    });

	$formkyxxj.find("option").each(function() {
        var $this=$(this);
		if($this.val()){$this.remove()}
    });
	$formkhzhlist.find("option").each(function() {
        var $this=$(this);
		if($this.val()){$this.remove()}
    });
	if($this.val()){
		$.post('cityList.do',dataobj,function(data){
			if(data.status===0){
				$formyhkzh.data({"flag":1});
				$formkyxcs.show();
				var datas = data.data;
				var html ='';
				$.each(datas,function(){
					var _this=this;
					html+='<option value="'+_this.cityAreacode+'">'+_this.cityAreaname+'</option>';
					});
				$formkyxcs.append(html);
				}else{

					}
	});
	}
	});

$('.jszfOrderFrm').on('change','#formkyxcs',function(){
	var $this=$(this),$form=$this.parents('.jszfOrderFrm');
	var dataobj = {"cityNo":$this.val()};
	$formkyxxj.find("option").each(function() {
        var $this=$(this);
		if($this.val()){$this.remove()}
    });
	$('.zhlist').hide();
	$('#formyhkzh').val('');
	if($this.val()){
		$.post('countyList.do',dataobj,function(data){
			if(data.status===0){
				$formyhkzh.data({"flag":1});
				if(data.data.length){
				$formkyxxj.show();
				var datas = data.data;
				var html ='';
				$.each(datas,function(){
					var _this=this;
					html+='<option value="'+_this.cityOraareacode+'">'+_this.cityAreaname+'</option>';
					});
				$formkyxxj.append(html);
				}else{
					$formkyxxj.hide();
					}
				}else{

					}
	});
	}
	});

		$('#formyhk,#formsj,#formyzm').on('focus',function(){
			if($('.zhlist')[0]){$('.zhlist').hide();}
		});


	$formyhkzh.data({"flag":1});
	$formyhkzh.on('click',function(){
		var $this = $(this);
		var con='';
		var html ='';
		if($this.data("flag")==1){
		var $formkyxqnval = $formkyxqn.val();
		var $formkyxcsval = $formkyxcs.val();
		var $formkyxxjval = $formkyxxj.val();
		var val = $formkyxxjval?$formkyxxjval:$formkyxcsval ;
		var dataobj = {"cityNo":val,"bankCode":$formkyxqnval};
		if(val&&$formkyxqnval){
			$.post('bankList.do',dataobj,function(data){
				if(data.status===0){
	$formkhzhlist.find("option").each(function() {
        var $this=$(this);
		if($this.val()){$this.remove()}
    });
					$this.data({flag:0});
					var datas = data.data;
				$.each(datas,function(){
					var _this=this;
					html+='<option value="'+_this.bankno+'">'+_this.bankname+'</option>';
					});
					con = data.data;
				$formkhzhlist.append(html);
					}
				});
			};
		}
		$('.zhlist').show();


/*		$('.jszfOrderFrm').on('keyup','#formyhkzh',function(){
		var $this=$(this);
		var $zhlist = $('#formkhzhlist');
		var $zhlistoption = $zhlist.find("option");
		var $thisval = $this.val();

		if($thisval){
			var html2='';
			console.log(con);
		$.each(con,function(n) {
            var _this=this;
			if(_this.bankname.indexOf($thisval)>=0){
				html2+='<option value="'+_this.bankno+'">'+_this.bankname+'</option>';
				}

				if(n==con.length-1){

		$formkhzhlist.find("option").each(function(i) {
        var $this=$(this);
		if($this.val()){$this.remove();}
		if(i==0){
			$formkhzhlist.append(html2);
			}
    });

					}
					});
					}else{
			$formkhzhlist.append(html);
						}

		});*/

		$('.jszfOrderFrm').on('keyup','#formyhkzh',function(){
		var $this=$(this);
		var $zhlist = $('#formkhzhlist');
		var $zhlistoption = $zhlist.find("option");
		var $thisval = $this.val();
		//$('.zhlist').show();
		if($thisval){
		$.each($zhlistoption,function() {
            var $this=$(this);
			if($this.val()){
			if($this.text().indexOf($thisval)>=0){
				$this.show();
				}else{
				$this.hide();
					};
					}
        });
		}else{
			$.each($zhlistoption,function() {
            var $this=$(this);
				$this.show();
        });
			}
		});


		return false;
		});



	$('.jszfOrderFrm').on('change','#formkhzhlist',function(){
		var $this=$(this),$thisparent=$this.parents('.zhlist');
		var $thistext = $this.find("option:selected").text();
		var $thistips= $this.parents('td').find('.valid-tips');
	if($this.val()){
		$thisparent.hide();
		$thistips.removeClass('valid-error').text('');
		$formyhkzh.val($thistext);
		$('input[name=bankCodeNo][type=hidden]').val($this.val());;
		$this.find("option").eq(0).prop("selected",true);
	}
		});






	$("body").on('click',".yzm",function(){

			var $this=$(this),arry=[],$form=$this.parents('.jszfOrderFrm');
			var $sendUrl = $('input[type=hidden][name=sendUrl]').val();
			var $formsj = $('#formsj');
			var $thiscompay=$(this).is('.comjqje');
		    $this.prop("disabled", true);

        var $formyhkzhval=$formyhkzh.val();
        var $yhkzh = false;
        $.each($formkhzhlist.find('option'),function(){
            $thistext = $(this).text();
            if($formyhkzhval==$thistext){
                $yhkzh=true;
                return false;
            }
        })
        if(!$yhkzh){
            $formyhkzh.val('');
            $formyhkzh.trigger('keyup');
            $formyhkzh.trigger('click')
            if($formyhkzh[0]){arry.push(validFrm($formyhkzh,1))};
        }

		  	if($formxm[0]){arry.push(validFrm($formxm,1))};
			if($formsfz[0]){arry.push(validFrm($formsfz,1))};
			if($formyzzcode[0]){arry.push(validFrm($formyzzcode,1))};
			if($formyhk[0]){arry.push(validFrm($formyhk,1))};
			if($formkyzm[0]){arry.push(validFrm($formkyzm,1))};
			if($formsj[0]){arry.push(validFrm($formsj,1))};
			if($formkyxqn[0]){arry.push(validFrm($formkyxqn,1))};
			// if($formyhkzh[0]){arry.push(validFrm($formyhkzh,1))};
			if($formkyxsf[0]){arry.push(validFrm($formkyxsf,1))};
			if($formkyxcs[0]){arry.push(validFrm($formkyxcs,1))};
			if($formkyxqy[0]){arry.push(validFrm($formkyxqy,1))};

			if(!$thiscompay){
				if($formyhk[0]&&$formsj[0]){
					if($formyhk.val()==csc.getCookie('car')){
						var mstime =  csc.getCookie('mstime');
						if(mstime){
							djstimer = setInterval(function(){djstime(mstime)},1000);
							return false;
						}
					}
				};
				if(!$formyhk[0]&&$formsj[0]){
					if($formsj.val()==csc.getCookie('phone')){
						var mstime =  csc.getCookie('mstime');
						if(mstime){
							djstimer = setInterval(function(){djstime(mstime)},1000);
							return false;
						}
					}
				};
			}
			if ($.inArray(false, arry) >= 0) {
					$this.prop("disabled", false);
					return false;
				}

		 $.post('https://payment.csc86.com/'+$sendUrl,$form.serializeArray(),function(data) {
			 var _msg=data.data.errorMsg;
		 	if(data.status===0){
				var $serialNo = $form.find('input[type=hidden][name=serialNo]');
				if($serialNo[0]){ $serialNo.val(data.data.serialNo)};
				if(!$thiscompay){
					var captchaInterval = 120000;
					var dt =  new Date().getTime();
					var mstime = captchaInterval+dt;
					if($formyhk[0]&&$formsj[0]){
						csc.setCookie('car',$formyhk.val(),2);
					};
					if(!$formyhk[0]&&$formsj[0]){
						csc.setCookie('phone',$formsj.val(),2);
					};
					csc.setCookie('mstime',mstime,2);
					djstimer = setInterval(function(){djstime(mstime)},1000);
					if($form.find('.yzmts')[0]){$form.find('.yzmts').html('验证码发送成功，如2分钟后仍未收到,请重新获取');}
				}else{
					if($form.find('.yzmts')[0]){$form.find('.yzmts').html('短信发送成功，请查收短信');}
				}

				}else{
					$this.prop("disabled", false);
					dialog.tip(_msg?_msg:'发送失败！',2);
				}
		 },'json');

		});
	//同意并提交
	$('.jszftj').on('click',function(){
		var $this=$(this),arry=[],$form=$this.parents('.jszfOrderFrm');
			//$this.find(".tj").attr("disabled",true);

        var $formyhkzhval=$formyhkzh.val();
        var $yhkzh = false;
        $.each($formkhzhlist.find('option'),function(){
            $thistext = $(this).text();
            if($formyhkzhval==$thistext){
                $yhkzh=true;
                return false;
            }
        })
        if(!$yhkzh){
            $formyhkzh.val('');
            $formyhkzh.trigger('keyup');
            $formyhkzh.trigger('click')
            if($formyhkzh[0]){arry.push(validFrm($formyhkzh,1))};
        }

			if($formxm[0]){arry.push(validFrm($formxm,1))};
			if($formsfz[0]){arry.push(validFrm($formsfz,1))};
			if($formyzzcode[0]){arry.push(validFrm($formyzzcode,1))};
			if($formyhk[0]){arry.push(validFrm($formyhk,1))};
			if($formkyzm[0]){arry.push(validFrm($formkyzm,1))};
			if($formsj[0]){arry.push(validFrm($formsj,1))};
			if($formyzm[0]){arry.push(validFrm($formyzm,1))};
			if($formjqje[0]){arry.push(validFrm($formjqje,1))};
			if($formkyxqn[0]){arry.push(validFrm($formkyxqn,1))};
			if($formkyxqy[0]){arry.push(validFrm($formkyxqy,1))};
            //if($formyhkzh[0]){arry.push(validFrm($formyhkzh,1))};


				if ($.inArray(false, arry) >= 0) {
					return false;
				}
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;
		var host = location.host;
		$.post($form.attr('action'),$form.serializeArray(),function(data){
			var _msg=data.data.errorMsg;
			if(data.status===0){
				location.href='https://'+host+'/'+data.data;
			}
			else{
				dialog.tip(_msg?_msg:'删除该银行卡失败！',2);
			}
			isSubmit=false;
		},'json');
		return false;
	});



		$('.jstxfrm').on('click',function(){
		var $this=$(this),arry=[],$form=$this.parents('.jstxFrm'),host = location.host,$token = $('#tokenDrawCash').val()||$('#tokenDrawCashCompany').val(),$sendUrlWin=$form.find('input[type=hidden][name=sendUrlWin]').val(),$tokenname=$('#tokenDrawCashCompany').val()?"tokenDrawCashCompany":"tokenDrawCash",$action=$('#tokenDrawCashCompany').val()?"drawCashToJzbCompany.do":"drawCashToJzb.do";

		if(!$("input[type='radio']:checked").length){
				dialog.tip('请选择银行卡！', 2);
				return false;
				};

				if($jesl[0]){arry.push(validFrm($jesl,1))};

			if ($.inArray(false, arry) >= 0) {
					return false;
				}


			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			//'//'+host+'/'+$form.attr('action')
			$.post('//'+host+'/'+$sendUrlWin,$form.serializeArray(),function(data){
				if(data.status===0){
					//$(document.body).html(data.data);

					var tipHtml='<form class="jszfOrderFrm txzfFrm" action="'+$action+'" method="post">\
   				<table class="txzftable" cellspacing="0" cellpadding="0">\
				<input type="hidden" value="'+data.data.hiddenphone+'" name="hiddenphone" id="formsj">\
				<input type="hidden" value="'+data.data.cardId+'" name="cardId">\
				<input type="hidden" value="'+data.data.drawMoney+'" name="tranAmount">\
				<input type="hidden" value="'+$token+'" name="'+$tokenname+'">\
				<input type="hidden" value="" name="serialNo">\
				<colgroup>\
				<col width="185">\
				<col>\
				</colgroup>\
				<tbody>\
                <tr>\
				<td class="left top first">银行卡信息：</td>\
				<td class="right first">'+data.data.userName+'<p>'+data.data.cardName+' 尾号'+data.data.cardNo+'</p></td>\
				</tr>\
				<tr>\
				<td class="left">提现金额：</td>\
				<td class="right"><span class="s3">'+data.data.drawMoney+'</span><span class="s4">元</span></td>\
				</tr>\
				<tr>\
				<td class="left">手机号码：</td>\
				<td class="right">'+data.data.phone+'</td>\
				</tr>\
				<tr>\
				<td class="left top2">手机验证码：</td>\
				<td class="right"><input value="" id="captcha" name="captcha" placeholder="输入验证码"><input class="yzm" type="button" value="获取验证码"><p><span class="valid-tips"></span></p></td>\
				</tr>\
                <tr>\
                <td class="left"></td>\
				<td class="left center tl"><a href="#" class="red-abtn pt1 jsqrtx">确认提现</a><span class="s1">返回修改</span></td>\
				</tr>\
				</tbody>\
				</table>\
                </form>';
				var dg=dialog({
					id:'payFail',
					title:"确认提现",
					content:tipHtml,
					padding:0,
					fixed:true,
					lock:true,
					opacity:0.5,
					init:function(){

						$('.aui_state_lock').addClass('paymentszf');
						//取消
						$('.s1').on('click',function(){
							dg.close();
							return false;
						});

						$('.jsqrtx').on('click',function(){
							var $form = $('.txzfFrm');
							var $captcha = $('#captcha');
								if(isSubmit===true){return false;}//阻止表单重复提交
							isSubmit=true;

							if($captcha [0]){arry.push(validFrm($captcha ,1))};

							if ($.inArray(false, arry) >= 0) {
								return false;
							}

							$.post('//'+host+'/'+$('.txzfFrm').attr('action'),$form.serializeArray(),function(data){
								if(data.status===0){
									location.href=data.data.actionurl;
									}
									else{
										dialog.tip(data.data.errorMsg?data.data.errorMsg:'提交错误，请重试！',2);
										}
										isSubmit=false;
								});
							return false;
						});
					}
				});


				}else{
					dialog.tip(data.data.errorMsg?data.data.errorMsg:'提交错误，请重试！',2);
				}
				isSubmit=false;
			},'json');
		return false;

	});


});