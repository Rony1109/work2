<!doctype html>
<html lang="zh-cn">
<head>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
<title><?php echo $this->title;?></title>
<meta name="keywords" content="<?php echo $this->keywords;?>" />
<meta name="description" content="<?php echo strip_tags($this->description);?>" />
<link rel="stylesheet" href="http://res.csc86.com/v2/m/init/css/style.css" >
<link rel="stylesheet" href="http://res.csc86.com/v2/c/shop/template1/css/<?php echo Yii::app()->controller->action->id;?>.css" >
<?php if(Yii::app()->request->getParam('static') == 'edit'){?><link rel="stylesheet" href="http://res.csc86.com/v2/c/shop/css/design.css" ><?php }?><!--设计相关样式-->
<script src="http://res.csc86.com/v2/l/seajs/sea.js"></script>
<script src="http://res.csc86.com/v2/c/shop/js/seajs-config.js"></script>
</head>
<body>
<div id="header">
	<div class="g-o top-bar">
    	<a class="g-fl logo" href="" target="_blank"><img src="http://res.csc86.com/v2/c/shop/image/min-csc.png" width="178" height="31" alt="华南城网"/></a>
        <div class="g-fl top-sign">
	        您好，<span><?php if (Yii::app()->session->get('userlogin')=='Y'){?><a href="<?php echo MEMBER_URL?>" target="_blank" rel="nofollow" data-memberid="<?php echo Yii::app()->session->get('mem_memberid');?>"><?php if(Yii::app()->session->get('userName')){ echo cut_str(Yii::app()->session->get('userName'),10,false,'...');}else {echo '匿名用户';}?></a>！消息<a class="top-msg-num" href="<?php echo MEMBER_URL.'/membercenter/messageall/'?>" target="_blank" rel="nofollow"><em class="msg"><?php echo IndexMessageModel::inits()->countMessage("all",0);?></em></a><i class="sprt">|</i><a href="<?php echo LOGOUT_URL;?>" rel="nofollow">退出</a><i class="sprt">|</i></span><?php }else{?><span>欢迎光临华南城网！<a target="_blank" rel="nofollow" href="<?php echo MEMBER_URL.'/login/phone'?>/">登录</a><i class="sprt">|</i><a href="<?php echo MEMBER_URL.'/register/phonereg';?>" target="_blank" rel="nofollow">免费注册</a><i class="sprt">|</i></span><?php }?>
        </div>
        <div class="g-fl top-mycnt jsTopMycnt">
        	<div class="hd"><a href="" target="_blank" rel="nofollow">我的账户<i></i></a></div>
            <div class="bd">
            	<ul>
                	<li><a href="<?php echo MEMBER_URL.'/shop/guide.html';?>" target="_blank" rel="nofollow">我的旺铺</a></li>
                    <li><a href="<?php echo MEMBER_URL.'/product/sell/category.html';?>" target="_blank" rel="nofollow">产品发布</a></li>
                    <li><a href="<?php echo MEMBER_URL.'/quote/list.html';?>" target="_blank" rel="nofollow">报价管理</a></li>
                    <li><a href="<?php echo MEMBER_URL.'/inquiry/list.html';?>" target="_blank" rel="nofollow">询盘管理</a></li>
                </ul>
            </div>
        </div>
       <div class="g-fr g-cf top-search">
			<form action="<?php echo SEARCH_URL;?>/products.do" method="get" target="_blank">
					<div class="g-fl hd jsTopSrchHd">
						<ul>
							<li class="cur"><a rel="nofollow" href="<?php echo SEARCH_URL;?>/products.do">产品</a></li>
							<li><a rel="nofollow" href="<?php echo SEARCH_URL;?>/companys.do">公司</a></li>
						</ul>
						<i></i>
				</div>
				<div class="g-fl bd"><input class="ipt-txt" type="text" name="q" value="" placeholder="请输入产品"/></div>
            <input class="srch-smt" type="submit" name="" value="搜索"/>
			</form>
		</div>
    </div>
</div>
<?php $this->widget('Header')?>
<?php echo $content;?>
<?php $this->widget('Footer')?>