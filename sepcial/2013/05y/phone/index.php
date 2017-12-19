<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>采购商机全球通</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="keywords" content="2013华南城网线上订货会, "好货源底价批",线上订货会">
<meta name="description" content="华南城网线上订货会是华南城网线上平台贯穿全年的大型主题活动， 2013年4月起每月将开展一期活动，针对百万数级采购商推荐华南城网线上商户的优质商品。活动汇集当季最热销的商品，以最实惠的批发价格为采购商们供应各行业诚信好货源，实现供应商和采购商供求信息的最优匹配，达成双赢" />
<link href="http://res.csc86.com/bhf/" rel="stylesheet">
<link href="style/home.css" rel="stylesheet" type="text/css" />
<link href="http://res.csc86.com/f=js/p/artDialog/4.1.5/skins/mem.css" rel="stylesheet" />
<script src="http://res.csc86.com/js/"></script>
<script src="http://res.csc86.com/dialog/"></script>
<script src="js/home.js"></script>
</head>
<?php
require_once 'cache/Cache.php';
$date			= '2013-05-01'; 
$textile		= getlist(7, $date);
$textilePage	= isset($textile['page'])?$textile['page']:1;
$plastic		= getlist(8, $date);
$plasticPage	= isset($plastic['page'])?$plastic['page']:1;
$package		= getlist(9, $date);
$packagePage	= isset($package['page'])?$package['page']:1;
?>
<body>
<input name="" id="time" type="hidden" value="2013-06-01">
<div class="huo-top">
  <div class="g-o-a"> <span><a href="http://www.csc86.com/" class="T1" target="_blank">首页</a><a href="http://market.csc86.com/" class="T1" target="_blank">批发市场</a> <a href="http://mall.csc86.com/" class="T1" target="_blank">在线商城</a><a href="http://quan.csc86.com/?spm=01_010004" class="T1" target="_blank">生意人脉</a> <a href="http://info.csc86.com/" class="T1" target="_blank">行业资讯</a><a href="http://cncms.csc86.com/special/" class="T1" target="_blank">精彩专题</a> <a href="http://www.csc86.com/about/contact.html" class="T1" target="_blank">联系我们</a></span> </div>
</div>
<div class="top-banner"></div>
<div class="g-h-10"></div>
<div class="g-o-a">
  <div id="tit_a_show" class=" g-c-f con">
    <div class="con_list fang">
      <h2><span>纺织</span></h2>
      <div class="page"><span class="page_list">
        <input name="" class="prev" type="button" />
        <input name="" class="next" type="button" />
        </span><span class="tit">过去12小时发布的信息</span><em>1</em>/<strong><?php echo $textilePage;?></strong></div>
      <div class="view_win">
        <table width="300" border="0">
		<?php
		if (isset($textile['data'])) {
			foreach ($textile['data'] as $value) {
		?>
          <tr>
            <td><a href="javascript:" id="<?php echo $value['id'];?>" class="tit_list"><?php echo $value['title'];?></a></td>
            <td><em><?php echo $value['count'];?></em></td>
            <td><i><?php echo $value['address'];?></i></td>
          </tr>
		<?php
			}
		}
		?>
        </table>
      </div>
    </div>
    <div class="con_list xang">
      <h2><span>纺织</span></h2>
      <div class="page"><span class="page_list">
        <input name="" class="prev" type="button" />
        <input name="" class="next" type="button" />
        </span><span class="tit">过去12小时发布的信息</span><em>1</em>/<strong><?php echo $plasticPage;?></strong></div>
      <div class="view_win">
        <table width="300" border="0">
		<?php
		if (isset($plastic)) {
			foreach ($plastic['data'] as $value) {
		?>
          <tr>
            <td><a href="javascript:" id="<?php echo $value['id'];?>" class="tit_list"><?php echo $value['title'];?></a></td>
            <td><em><?php echo $value['count'];?></em></td>
            <td><i><?php echo $value['address'];?></i></td>
          </tr>
		<?php
			}
		}
		?>
        </table>
      </div>
    </div>
    <div class="con_list bao">
      <h2><span>纺织</span></h2>
      <div class="page"><span class="page_list">
        <input name="" class="prev" type="button" />
        <input name="" class="next" type="button" />
        </span><span class="tit">过去12小时发布的信息</span><em>1</em>/<strong><?php echo $packagePage;?></strong></div>
      <div class="view_win">
        <table width="300" border="0">
		<?php
		if (isset($package)) {
			foreach ($package['data'] as $value) {
		?>
          <tr>
            <td><a href="javascript:" id="<?php echo $value['id'];?>" class="tit_list"><?php echo $value['title'];?></a></td>
            <td><em><?php echo $value['count'];?></em></td>
            <td><i><?php echo $value['address'];?></i></td>
          </tr>
		<?php
			}
		}
		?>
        </table>
      </div>
    </div>
  </div>
  <div class="g-h-10"></div>
  <div class="g-c-f ca_go">
    <ul>
      <li><a href="http://jhyeefl.csc86.com/" target="_blank"><img width="323" height="78" border="0" src="images/pro_list01.jpg"></a></li>
      <li><a href="http://twzljx.csc86.com/" target="_blank"><img width="323" height="78" border="0" src="images/pro_list02.jpg"></a></li>
      <li><a href="http://jzsemuli.csc86.com/" target="_blank"><img width="323" height="78" border="0" src="images/pro_list03.jpg"></a></li>
      <li><a href="http://maocaowa.csc86.com/" target="_blank"><img width="323" height="78" border="0" src="images/pro_list04.jpg"></a></li>
      <li><a href="http://taiheth.csc86.com/" target="_blank"><img width="323" height="78" border="0" src="images/pro_list05.jpg"></a></li>
      <li><a href="http://zhou2004.csc86.com/" target="_blank"><img width="323" height="78" border="0" src="images/pro_list06.jpg"></a></li>
    </ul>
    <div class="right_cg">
      <input style="display:none;" id="btn_fabu" name="" class="btn_sub" type="button" />
      <a href="http://member.csc86.com/login/phone"></a> </div>
  </div>
  <div class="g-h-01"></div>
  <div class="foot-ad2"><a target="_blank" href="http://cncms.csc86.com/special/2013/2013ppxf/"><img width="990" height="80" border="0" src="images/ban_n_2.jpg"></a></div>
  <div class="g-h-01"></div>
  <div class="foot-ad1"><a target="_blank" href="http://cncms.csc86.com/special/2013/13hly/invite.html"><img width="990" height="80" border="0" src="images/ban_n_1.jpg"></a></div>
  <div class="g-h-01"></div>
  <div class="foot-ad2"><a target="_blank" href="http://cncms.csc86.com/special/2013/13hy/13hy.html"><img width="990" height="80" border="0" src="images/ban_n_3.jpg" /></a></div>
</div>
<div class="footer">
  <div class="g-o-a link">
    <div class="g-h-10"></div>
    <div class="love-links"> <a rel="nofollow" target="_blank" href="http://cncms.csc86.com/about/">关于华南城网</a> <a rel="nofollow" target="_blank" href="http://cncms.csc86.com/about/member.html">会员服务</a> <a rel="nofollow" target="_blank" href="http://ad.csc86.com">广告服务</a> <a rel="nofollow" target="_blank" href="http://cncms.csc86.com/about/business.html">商务合作</a> <a rel="nofollow" target="_blank" href="http://cncms.csc86.com/about/server.html">服务条款</a> <a rel="nofollow" target="_blank" href="http://cncms.csc86.com/about/laws.html">法律申明</a> <a rel="nofollow" target="_blank" href="http://cncms.csc86.com/about/privacy.html">隐私保护</a> <a rel="nofollow" target="_blank" href="http://cncms.csc86.com/about/feedback.html">意见反馈</a> <a rel="nofollow" target="_blank" href="http://cncms.csc86.com/help/">帮助中心</a> <a target="_blank" href="http://cncms.csc86.com/sitemap.html">网站地图</a> <a rel="nofollow" target="_blank" href="http://cncms.csc86.com/about/contact.html">联系我们</a> </div>
    <p>Copyright©2009-2013 China South City Holdings Limited. All Rights Reserved</p>
    <p>深圳华南城网电子商务有限公司 版权所有 粤ICP备12062577号-5</p>
  </div>
</div>
<div id="mem-toolct" class="mem-toolct" style="display:none; ">
  <form onsubmit="return submitlog();" name="loginform" method="post" action="http://data.csc86.com/index.php?m=formguide&c=index&a=show&formid=13&siteid=1">
    <ul>
      <li>
        <label><span><em>*</em>发布标题:</span>
          <input name="info[title]" class="txt" maxlength="11" id="titlername" type="text" />
          <i id="tit_num">0</i><strong>/11</strong> </label>
      </li>
      <li>
        <label><span><em>*</em>产品名称:</span>
          <input name="info[productname]" class="txt" id="proname" type="text" />
        </label>
      </li>
      <li>
        <label><span><em>*</em>商家名称:</span>
          <input name="info[companyname]" class="txt" id="username" type="text" />
        </label>
      </li>
      <li>
        <label><span><em>*</em>产品数量:</span>
          <input name="info[count]" class="txt" id="pronumber" type="text" />
        </label>
      </li>
      <li>
        <label><span><em>*</em>单价范围:</span>
          <input name="info[price]" class="txt" id="pricefa" type="text" />
        </label>
      </li>
      <li class="list_area">
        <label><span>详细说明:</span>
          <textarea name="info[content]" cols=""  maxlength="300" rows="" id="area" class="area"></textarea>
          <i id="con_num">0</i><strong>/300</strong> </label>
      </li>
      <li class="str_font">
        <label><span><em>*</em>收货地址:</span>
          <input  id="adress" name="info[address]" class="txt" type="text" />
        </label>
      </li>
      <li class="str_font">
        <label><span><em>*</em>联 系 人:</span>
          <input name="info[contactname]" class="txt" id="ehdname" type="text" />
        </label>
      </li>
      <li class="str_font">
        <label><span><em>*</em>联系电话:</span>
          <input name="info[contact]" class="txt" id="phone" maxlength="11" type="text" />
        </label>
      </li>
      <li class="sub"> <span id="tips" class="tips">&nbsp;</span>
        <input id="memberid" name="info[memberid]" type="hidden" value=""/>
        <input name="dosubmit" type="submit" value="填写完成" />
      </li>
    </ul>
  </form>
  <script>
  function checkMobile( s ){ 
		var regu =/^1[3458]\d{9}$/; 
		var re = new RegExp(regu); 
		if (re.test(s)) { 
			return true; 
		}else{ 
			return false; 
		} 
	} 
	var hide = function(id){
		$(id).focus();
		$(id).keydown(function(){
			$("#tips").addClass("g-v-h");	
		});
	};
	
	function submitlog(){
		var titlername=$("#titlername"), titlernameval=$.trim(titlername.val()),pro=$("#proname"), proval=$.trim(pro.val()), pronumber=$("#pronumber"), pronumberval=$.trim(pronumber.val()), pricefa=$("#pricefa"), pricefaval=$.trim(pricefa.val()), username=$("#username"),usernameval=$.trim(username.val()), adress=$("#adress"), adressval=$.trim(adress.val()),ehdname=$("#ehdname"), ehdnameval=$.trim(ehdname.val()), phone=$("#phone"),phoneval=$.trim(phone.val());
		
		if(!titlernameval){
			$("#tips").html('<em>*</em>产品标题不能为空').removeClass("g-v-h");
			hide(titlername);
			return false;
		}else if(!proval){
			$("#tips").html('<em>*</em>产品名称不能为空').removeClass("g-v-h");
			hide(pro);
			return false;
		}else if(!usernameval){
			$("#tips").html('<em>*</em>商家姓名不能为空').removeClass("g-v-h");
			hide(username);
			return false;
		}else if(!pronumberval){
			$("#tips").html('<em>*</em>产品数量不能为空').removeClass("g-v-h");
			hide(pronumber);
			return false;
		}else if(!pricefaval){
			hide(pricefa);
			$("#tips").html('<em>*</em>单价范围不能为空').removeClass("g-v-h");
			return false;
		}else if(!adressval){
			$("#tips").html('<em>*</em>收货地址不能为空').removeClass("g-v-h");
			hide(adress);
			return false;
		}else if(!ehdnameval){
			$("#tips").html('<em>*</em>联系人姓名不能为空').removeClass("g-v-h");
			hide(ehdname);
			return false;
		}else if(!phoneval){
			$("#tips").html('<em>*</em>手机号码不能为空').removeClass("g-v-h");
			hide(phone);
			return false;
		}else if(!checkMobile(phoneval)){
			$("#tips").html('<em>*</em>手机号码格式不对，重新输入').removeClass("g-v-h");
			hide(phone);
			return false;
		}
	}
	
	
	/*发布标题字段*/
		$("#titlername").keyup(function(){
			$("#tips").addClass("g-v-h");
			var len=$.trim($(this).val()).length;
			if(len<11){
				$("#tit_num").html(11-len);
			}else{
				$("#tit_num").html(0);
			}
		}).bind("focus",function(){
			var len=$.trim($(this).val()).length;
			if(len<11){
				$("#tit_num").html(11-len);
			}else{
				$("#tit_num").html(0);
			}
		}).bind("blur",function(){
			var len=$.trim($(this).val()).length;
			if(len<11){
				$("#areacount").html(11-len);
			}else{
				$("#areacount").html(0);
			}
		});
	  /*发布标题字段*/
		$("#area").keyup(function(){
			$("#tips").addClass("g-v-h");
			var len=$.trim($(this).val()).length;
			if(len<300){
				$("#con_num").html(300-len);
			}else{
				$("#con_num").html(0);
			}
		}).bind("focus",function(){
			var len=$.trim($(this).val()).length;
			if(len<300){
				$("#con_num").html(300-len);
			}else{
				$("#con_num").html(0);
			}
		}).bind("blur",function(){
			var len=$.trim($(this).val()).length;
			if(len<300){
				$("#con_num").html(300-len);
			}else{
				$("#con_num").html(0);
			}
		});
	</script> 
</div>
<div style="display:none"><script src="http://res.csc86.com/f=js/m/statistics.js"></script></div>
</body>
</html>
