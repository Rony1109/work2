<?php $this->widget('Banner');?>

<div class="g-o-a">
	<div class="main home">
		<div class="box-home rec-product">
			<div class="bh-hd">
				<h2>橱窗产品</h2>
			</div>
			<div class="bh-bd">
				<?php if(ShopHelper::XmlCallBack('getShopProductList')){?>
				<ul class="g-c-f g-i-v-m rec-list">
					<?php foreach (ShopHelper::XmlCallBack('getShopProductList') as $value){?>
					<li class="item">
						<div class="inner">
							<div class="ibox"> <a href="/product/<?php echo CSCHelper::setDefault($value['id'])?>.html" class="i" target="_blank"><span class="img-shade"></span> <img src="<?php echo ShopHelper::scale($value['pic1'],300);?>" data-max="248" alt="<?php echo CSCHelper::setDefault($value['title']);?>" /> </a> </div>
							<div class="bg"> <a href="/product/<?php echo CSCHelper::setDefault($value['id'])?>.html" class="t" target="_blank">
								<?php echo CSCHelper::setDefault($value['title']);?>
								</a>
								<div class="price"><strong>
									<?php echo CSCHelper::priceFormat($value['price'],$value['speak']);?>
									</strong></div>
								<div class="g-c-f">
									<?php if(array_search($value['id'], $collectProduct)){?>
									<a class="g-f-l g-ico ico-favorited" rel="nofollow" data-id="14204" href="javascript:">已收藏</a>
									<?php }else{?>
									<a href="javascript:void(csc.shop.fav('<?php echo CSCHelper::setDefault($value['id'])?>',function (){csc.shop.favRec('<?php echo CSCHelper::setDefault($value['id'])?>')}));" data-id="14204" class="g-f-l g-ico ico-favorite" rel="nofollow">收藏</a>
									<?php }?>
									<a href="http://jiaoyi.csc86.com/inquiry/publish/?proid=<?php echo CSCHelper::setDefault($value['id'])?>" class="g-f-r g-ico ico-inquiry" target="_blank" rel="nofollow">询盘</a> </div>
							</div>
						</div>
					</li>
					<?php }?>
				</ul>
				<?php }else{ ?>
				<div class="empty">暂无橱窗产品</div>
				<?php }?>
			</div>
		</div>
		<div class="g-h-10"></div>
		<div class="box-home hot-product">
			<div class="bh-hd">
				<h2><a href="/product.html" class="more" rel="nofollow">更多</a>热门产品</h2>
			</div>
			<div class="bh-bd">
				<?php if(ShopHelper::XmlCallBack('getHotProductList')){?>
				<ul class="g-c-f g-i-v-m thumb-list">
					<?php foreach (ShopHelper::XmlCallBack('getHotProductList') as $value){?>
					<li class="item">
						<div class="inner">
							<div class="ibox"> <a href="/product/<?php echo CSCHelper::setDefault($value['id'])?>.html" class="i" target="_blank"><span class="imgShade"></span> <img src="<?php echo ShopHelper::scale($value['pic1'],300);?>" data-max="160" alt="<?php echo CSCHelper::setDefault($value['title']);?>" /> </a> </div>
							<div class="bg"> <a href="/product/<?php echo CSCHelper::setDefault($value['id'])?>.html" class="t" target="_blank">
								<?php echo CSCHelper::setDefault($value['title'])?>
								</a>
								<div class="price"> <strong>
									<?php echo CSCHelper::priceFormat($value['price'],$value['speak']);?>
									</strong> </div>
								<a href="http://jiaoyi.csc86.com/inquiry/publish/?proid=<?php echo CSCHelper::setDefault($value['id'])?>" class="g-ico ico-inquiry" target="_blank" rel="nofollow">询盘</a></div>
						</div>
					</li>
					<?php }?>
				</ul>
				<?php }else{ ?>
				<div class="empty">暂无热门产品</div>
				<?php }?>
			</div>
		</div>
	</div>
	  <script>
csc.ie6 && seajs.use(csc.url("res","/f=js/m/hover"),function (){
	csc.hover("ul.rec-list>li.item");
	csc.hover("ul.thumb-list>li.item");
});	
</script>
	<div class="sub"><?php CSCHelper::widgets(array('Company','Cate','News','Links'));?></div>

</div>

