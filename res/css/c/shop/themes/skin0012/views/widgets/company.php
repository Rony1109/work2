<div class="box-sub company-info">
	<h2 class="bs-hd">商家信息</h2>
	<div class="inner">
		<div class="g-c-f mi-authenticate">
			<div class="g-c-f auth-info-box">        	
				<?php if(CSCHelper::setDefault( $enterprise['realApproveTag'] )){?>
                    <a href="/authentication.html" rel="nofollow" title="实名认证" target="_blank">
                    <img src="http://res.csc86.com/css/c/auth/sm25.png" width="25" height="25" alt=""/><br/>实名认证</a>
                <?php }else if ($enterprise['personApproveTag']) {?>
                <a href="/authentication.html" rel="nofollow" title="个人实名认证" target="_blank">
                <img src="http://res.csc86.com/css/c/auth/gr25.png" width="25" height="25" alt=""/><br/>个人实名认证</a>
                <?php }?>
                <?php if(CSCHelper::setDefault( $enterprise['proveApproveTag'] )){?><a href="/authentication.html" rel="nofollow" title="身份认证" target="_blank"><img src="http://res.csc86.com/css/c/auth/ss25.png" width="25" height="25" alt=""/><br/>身份认证</a><?php }?>
                <?php if(CSCHelper::setDefault( $enterprise['localApproveTag'] )){?><a href="/authentication.html" rel="nofollow" title="实地认证" target="_blank"><img src="http://res.csc86.com/css/c/auth/st25.png" width="25" height="25" alt=""/><br/>实地认证</a><?php }?>
            </div>
		</div>
		<h2 class="g-c-f busi-name"><strong title="<?php echo $enterprise['enterprise'];?>"><?php echo CSCHelper::substr($enterprise['enterprise'],7);?></strong>
            <?php if(CSCHelper::setDefault( $enterprise['evip'] )=='cst'){?>
                <span class="vip" title="城商通会员"><img src="<?php echo RES_URL;?>/css/c/auth/cst20.png" /></span>
            <?php }else if(CSCHelper::setDefault( $enterprise['evip'] )=='vip'){?>
                <span class="vip" title="VIP会员"><img src="<?php echo RES_URL;?>/css/c/auth/vip20.png" /></span>
            <?php } ?>
        </h2>
		<ul class="mi-basic">
			<li class="g-c-f"><strong>主　　营：</strong>
				<p><?php echo CSCHelper::substr($enterprise['sellList'],8);?></p>
			</li>
			<li class="g-c-f">
				<strong>创建时间：</strong>
				<?php
					$createTime = substr($enterprise['createTime'],0,strpos($enterprise['createTime'],' '));
				?>
				<p><?php echo $createTime;?></p>
			</li>
		</ul>
		<div class="m-shop-contact">
		<?php if(ShopHelper::XmlCallBack('getContact')){$tag = 1 ;?><?php foreach (ShopHelper::XmlCallBack('getContact') as $value){?>	
			<ul class="msc-bd  <?php if(isset($tag)&&$tag==1)echo "cur"?> <?php if(isset($tag)&&$tag == 2)echo "msc-bd2"?>">
				<li>
					联系人：
					<?php echo CSCHelper::substr($value['contact'],5)?><?php echo ($value['sex']=='男')?'先生':'女士';?>
					<?php if(CSCHelper::setDefault($value['qqNo']) ){?><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo CSCHelper::setDefault($value['qqNo'])?>&site=qq&menu=yes">
						<img border="0" width="21" height="21" src="<?php echo RES_URL ?>/image/m/third-im/qq.gif" alt="点击这里给我发消息" title="点击这里给我发消息"/>
					</a><?php }?>
					<?php if(CSCHelper::setDefault($value['wangwang']) ){?><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=<?php echo urldecode(CSCHelper::setDefault($value['wangwang']));?>&siteid=cntaobao&status=2&charset=utf-8">
					<img border="0" width="21" height="21" src="<?php echo RES_URL ?>/image/m/third-im/ww.gif" alt="点击这里给我发消息" /></a>
					<?php }?>
				</li>
				<?php if(CSCHelper::setDefault($value['moblie'])){?><li>手　机：<?php echo CSCHelper::setDefault($value['moblie'])?></li><?php }?>
				<?php if(CSCHelper::setDefault($value['telephone'])){?><li title="<?php echo CSCHelper::setDefault($value['telephone'])?>">座　机：<?php echo CSCHelper::setDefault($value['telephone'])?></li><?php }?>
				<?php if(CSCHelper::setDefault($value['fax'])){?><li title="<?php echo CSCHelper::setDefault($value['fax'])?>">传　真：<?php echo CSCHelper::setDefault($value['fax'])?></li><?php }?>
			</ul>
			<?php $tag++;}if($tag ==3){?>
			<ul class="msc-indicators">
				<li class="cur">1</li>
				<li>2</li>
			</ul>
			<?php }}?>
			<script>seajs.use(csc.url("res","/f=js/m/tab"),function(){
				csc.tab("ul.msc-indicators>li","ul.msc-bd","click");
			});</script>
		</div>
		<?php if(CSCHelper::setDefault( $myself['collectedFlag'] )){?>
		<div class="g-t-c shop-fav shop-faved"><a href="javascript:" rel="nofollow"><span>旺铺已收藏</span></a></div>
		<?php }else{?>
		<div class="g-t-c shop-fav"><a href="javascript:void(csc.shop.fav('<?php echo $enterprise['id'];?>',null,'shop'));" rel="nofollow"><span>收藏旺铺</span></a></div>
		<?php }?>
		<?php if(ShopHelper::XmlCallBack('joinedCircles')){$tag = 1 ;?>
		<div class="group">
			<h3 class="g-ff-y">他的商圈</h3>
			<ul class="g-c-f">
			<?php foreach (ShopHelper::XmlCallBack('joinedCircles') as $value){?>	
				<li><a href="http://quan.csc86.com/index.html?circleId=<?php echo CSCHelper::setDefault($value['circleId'])?>" target="_blank"><img src="<?php echo ShopHelper::image($value['circleLogoUrl']);?>" title="<?php echo CSCHelper::setDefault($value['circleName'])?>"  width="80" height="80" /><?php echo CSCHelper::substr($value['circleName'],5)?></a></li>
			<?php }?>
			</ul>
		</div>
		<?php }?>
	</div>
</div>
<div class="g-h-10"></div>