<div class="head">
	<div class="g-o-a"> 
	<<?php echo (Yii::app()->controller->action->id == 'pdetail')?'div':'h1';?> class="logo-name">
			<a href="/" class="g-f-l logo">
				<img src="<?php echo ShopHelper::image(array($enterprise,'imgUrl'))?>" width="100" height="100" alt="<?php echo $enterprise['enterprise'];?>" />
			</a>
			<div class="h-f">
				<a href="/" class="name <?php echo $cssName;?>" title="<?php echo $enterprise['enterprise'];?>"><?php echo $enterprise['enterprise'];?></a>
				<?php if(CSCHelper::setDefault( $enterprise['seed'] )){?>
				<span class="ppxf"><img src="http://res.csc86.com/image/m/mark/ppxf.gif" width="30" height="30"/></span>
				<?php }?>
			</div>
			<p>主营：<?php echo $enterprise['tradeList'];?></p>
	</<?php echo (Yii::app()->controller->action->id == 'pdetail')?'div':'h1';?>>
		<div class="g-f-r g-t-c shop-fav">
		<?php if(!CSCHelper::setDefault( $myself['collectedFlag'] )){?>
		<a href="javascript:void(csc.shop.fav('<?php echo $enterprise['id'];?>',null,'shop'));" rel="nofollow"><span>收藏旺铺</span></a>
		<?php }else{?>
		已收藏
		<?php }?>
		</div>
	</div>
</div>
<div class="nav">
	<ul class="g-o-a">
		<li class="item <?php if($actionName == 'index'){?>cur <?php }?> ">
			<a href="/" class="item-txt">首　页</a>
		</li>
		<li class="item pro <?php if($actionName == 'product'||$actionName == 'pdetail'){?>cur <?php }?>">
			<a href="/product.html" class="item-txt">产品中心</a>
			<span class="item-arr"></span>
			<div class="nav-cate">
				<ul class="cate-1th">
				<?php if(ShopHelper::XmlCallBack('cuscategorys')){?><?php foreach (ShopHelper::XmlCallBack('cuscategorys') as $value){?>	
					<li class="c1-item">
						<div class="frst-t">
							<a href="/scate/<?php echo CSCHelper::setDefault($value['id']);?>.html" class="c1-item-txt"><?php echo CSCHelper::setDefault($value['title']);?></a>
						</div>
						<?php if(CSCHelper::setDefault($value['childsCategorys'])){?>
						<div class="cate-2th">
							<ul>
							<?php foreach (CSCHelper::setDefault($value['childsCategorys']) as $valuec){?>
								<li>
									<div class="sec-t">
										<a href="/scate/<?php eo($valuec, 'id');?>.html"><?php eo($valuec, 'title');?></a>
									</div>
								</li>
							<?php }?>
							</ul>
						</div><?php }?>
					</li>
				<?php }}?>
				</ul>
			</div>
		</li>
		<li class="item <?php if($actionName == 'authentication'){?>cur <?php }?> ">
			<a href="/authentication.html" class="item-txt">诚信档案</a>
		</li>
		<li class="item <?php if($actionName == 'news'||$actionName == 'tdetail'){?>cur <?php }?> ">
			<a href="/news.html" class="item-txt">公司动态</a>
		</li>
		<li class="item <?php if($actionName == 'about'){?>cur <?php }?>">
			<a href="/about.html" class="item-txt" >关于我们</a>
		</li>
	</ul>
</div>
<script>csc.shop.navCate('div.nav');</script>
<div class="g-h-01"></div>