<div class="box-sub company-info">
	<h2 class="bs-hd">商家信息</h2>
	<div class="inner">
		<div class="g-c-f mi-authenticate">
			<div class="g-c-f">
				<?php if(setDefault($this->shopinfo, 'realApproveTag')){?><a href="/authentication.html" class="real" rel="nofollow" title="实名认证" target="_blank">实名认证</a><?php }?>
				<?php if(setDefault($this->shopinfo, 'storeApproveTag')){?><a href="/authentication.html" class="entity" rel="nofollow" title="实体店认证" target="_blank">实体店认证</a><?php }?>
				<?php if(setDefault($this->shopinfo, 'creditApproveTag')){?><a href="/authentication.html" class="integrity" rel="nofollow" target="_blank" title="诚信深商">诚信深商</a><?php }?>
			</div>
			
		</div>
		<h2 class="g-c-f busi-name"><strong title="<?php eo($this->shopinfo, 'enpName')?>"><?php eo($this->shopinfo, 'enpName',7)?></strong>
            <?php if(setDefault($this->shopinfo, 'evip')=='cst'){?>
                <span class="vip" title="城商通会员"><img src="<?php echo RES_URL;?>/css/c/auth/cst20.png" /></span>
            <?php }else if(setDefault($this->shopinfo, 'evip')=='vip'){?>
                <span class="vip" title="VIP会员"><img src="<?php echo RES_URL;?>/css/c/auth/vip20.png" /></span>
            <?php } ?>
        </h2>
		<ul class="mi-basic">
			<li class="g-c-f"><strong>主　　营：</strong>
				<p><?php eo($this->shopinfo, 'sellList',8)?></p>
			</li>
			<li class="g-c-f">
				<strong>创建时间：</strong>
				<?php
					$createTime = substr($this->shopinfo['createTime'],0,strpos($this->shopinfo['createTime'],' '));
				?>
				<p><?php echo $createTime;?></p>
			</li>
		</ul>
		<div class="m-shop-contact">
		<?php if($this->getList('contacts')){$tag = 1 ;?><?php foreach ($this->getList('contacts') as $value){?>	
			<ul class="msc-bd  <?php if(isset($tag)&&$tag==1)echo "cur"?> <?php if(isset($tag)&&$tag == 2)echo "msc-bd2"?>">
				<li>
					联系人：
					<?php eo($value, 'contact',5)?>
					<?php if(setDefault($value, 'qqNo')){?><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<?php eo($value, 'qqNo')?>&site=qq&menu=yes">
						<img border="0" width="21" height="21" src="<?php echo RES_URL ?>/image/m/third-im/qq.gif" alt="点击这里给我发消息" title="点击这里给我发消息"/>
					</a><?php }?>
					<?php if(setDefault($value, 'wangwang')){?><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=<?php echo urldecode(setDefault($value, 'wangwang'));?>&siteid=cntaobao&status=2&charset=utf-8">
					<img border="0" width="21" height="21" src="<?php echo RES_URL ?>/image/m/third-im/ww.gif" alt="点击这里给我发消息" /></a>
					<?php }?>
				</li>
				<?php if(setDefault($value,'moblie')){?><li>手　机：<?php eo($value, 'moblie')?></li><?php }?>
				<?php if(setDefault($value,'telephone')){?><li title="<?php eo($value, 'telephone')?>">座　机：<?php eo($value, 'telephone')?></li><?php }?>
				<?php if(setDefault($value,'fax')){?><li title="<?php eo($value, 'fax')?>">传　真：<?php eo($value, 'fax')?></li><?php }?>
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
		<?php if(setDefault($this->myself, 'collectedFlag')){?>
		<div class="g-t-c shop-fav shop-faved"><a href="javascript:" rel="nofollow"><span>旺铺已收藏</span></a></div>
		<?php }else{?>
		<div class="g-t-c shop-fav"><a href="javascript:void(csc.shop.fav('<?php eo($this->shopinfo, 'id')?>',null,'shop'));" rel="nofollow"><span>收藏旺铺</span></a></div>
		<?php }?>
		<?php if($this->getList('joinedCircles')){$tag = 1 ;?>
		<div class="dottline"></div>
		<div class="group">
			<h3 class="g-ff-y">他的商圈</h3>
			<ul class="g-c-f">
			<?php foreach ($this->getList('joinedCircles') as $value){?>	
				<li><a href="http://quan.csc86.com/index.html?circleId=<?php eo($value, 'circleId')?>" target="_blank"><img src="<?php eo($value, 'circleLogoUrl')?>" title="<?php eo($value, 'circleName')?>"  width="80" height="80" /><?php eo($value, 'circleName',5)?></a></li>
			<?php }?>
			</ul>
		</div>
		<?php }?>
	</div>
</div>
<div class="g-h-10"></div>