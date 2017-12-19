function bmto(){
	artDialog({title:"",padding:"20px",content:'<div class="tablewidth"><h2>华南城网用户调查问卷（2013年第三季度）</h2><h4>亲爱的用户：</h4><p>您好！</p><p>为了更好的了解您对我们华南城网的使用情况，提升我们的产品质量和服务质量，特邀请您参加我们的使用调查问卷。</p><p  style="margin:6px 0 0 0;">参与即可获得抽奖机会，并可成为华南网重点培育对象，享受多种扶持资源。</p><p style="margin:10px 0 0 0;">获奖名单将在调查结束后及时公布出来。</p><p>请您根据个人情况如实填写，您的意见对我们非常重要，真诚期待您的参与！</p></div>',
	ok: function() {},
	cancel:false,
	fixed: false,
    id: 'Fm7',
	lock:'false',
    icon: 'question',
    okVal: '&nbsp;'});
}

function potbtn(){
	var rg1=$("input[name=rg1]:checked").val(),
		rg2=$("input[name=rg2]:checked").val(),
		rg3=$("input[name=rg3]:checked").val(),
		rg4=$("input[name=rg4]:checked").val(),
		rg5=$("input[name=rg5]:checked").val(),
		rg6=$("input[name=rg6]:checked").val(),
		rg7=$("input[name=rg7]:checked").val(),
		rg8=$("input[name=rg8]:checked"),
		rg9=$("input[name=rg9]:checked").val(),
		rg10=$("input[name=rg10]:checked").val(),
		rg11=$("input[name=rg11]:checked"),
		rg12=$("input[name=rg12]:checked"),
		rg13=$("input[name=rg13]:checked"),
		enterprise=$("input[name=cp]").val(),
		name=$("input[name=name]").val(),
		trade=$("input[name=style]").val(),
		tel=$("input[name=tel]").val(),
		prove=$("textarea[name=prove]").val();
		var pr02,pr05,pr08='',pr09,pr10,pr11='',pr12='',pr13='';
		pr02=(rg2=='其他')?'其他；如：'+$("input[name=rg201]").val():rg2;
		pr05=(rg5=='其他')?'其他；如：'+$("input[name=rg501]").val():rg5;
		pr09=(rg9=='其他')?'其他；如：'+$("input[name=rg901]").val():rg9;
		pr10=(rg10=='其他')?'其他；如：'+$("input[name=rg1001]").val():rg10;
		for(var i=0;i<rg8.length;i++){
			if(rg8.eq(i).val()=='其他'){
				pr08+='其他；如：'+$("input[name=rg801]").val();
				break;
			}
			pr08+=rg8.eq(i).val()+',';
		}
		for(var i=0;i<rg11.length;i++){
			pr11+=rg11.eq(i).val()+',';
		}
		for(var i=0;i<rg12.length;i++){
			if(rg12.eq(i).val()=='其他'){
				pr12+='其他；如：'+$("input[name=rg1201]").val();
				break;
			}
			pr12+=rg12.eq(i).val()+',';
		}
		for(var i=0;i<rg13.length;i++){
			if(rg13.eq(i).val()=='其他'){
				pr13+='其他；如：'+$("input[name=rg1301]").val();
				break;
			}
			pr13+=rg13.eq(i).val()+',';
		}
		if(rg1==undefined||pr02==undefined||rg3==undefined||rg4==undefined||pr05==undefined||rg6==undefined||rg7==undefined||pr09==undefined||pr10==undefined){
			alert('请填写每道答题！');
			return;
		}else if(enterprise==''||name==''||trade==''||tel==''){
			alert('请填写您的相关信息（企业名称、姓名、主营行业、电话为必填）！');
			return;
		}{
			//alert(pr10+'==='+pr11+'==='+pr12+'==='+pr13);
			$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 24,"subtype": "ajax","dosubmit":"用户调查问卷",
				   "info[question_01]":rg1,
				   "info[question_02]":pr02,
				   "info[question_03]":rg3,
				   "info[question_04]":rg4,
				   "info[question_05]":pr05,
				   "info[question_06]":rg6,
				   "info[question_07]":rg7,
				   "info[question_08]":pr08,
				   "info[question_09]":pr09,
				   "info[question_10]":pr10,
				   "info[question_11]":pr11,
				   "info[question_12]":pr12,
				   "info[question_13]":pr13,
				   "info[enterprise]":enterprise,
				   "info[name]":name,
				   "info[trade]":trade,
				   "info[tel]":tel,
				   "info[prove]":prove
				   },
				   function(data){
				if(data.status == true){
					alert("提交成功，感谢您的意见！");
					$("input[name=rg201]").val("");
					$("input[name=rg501]").val("");
					$("input[name=rg901]").val("");
					$("input[name=rg1001]").val("");
					$("input[name=rg801]").val("");
					$("input[name=rg1201]").val("");
					$("input[name=rg1301]").val("");
					$("input[name=cp]").val("");
					$("input[name=name]").val("");
					$("input[name=style]").val("");
					$("input[name=tel]").val("");
					$("textarea[name=prove]").val("");
				}else{
					alert("提交失败，请刷新后重试！");
				}
			},"jsonp");	
		}
	
}