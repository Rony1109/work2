<div class="box-sub sub-cate">
	<h2 class="bs-hd"><span>产品分类</span></h2>
	<ul>
	<?php if(ShopHelper::XmlCallBack('cuscategorys')){?><?php foreach (ShopHelper::XmlCallBack('cuscategorys') as $value){?>
		<li class="item">
			<div class="frst-t">
				<a href="/scate/<?php echo CSCHelper::setDefault($value['id']);?>.html" class="txt"><span><?php echo CSCHelper::setDefault($value['title']);?></span></a>
			</div><?php if(CSCHelper::setDefault($value['childsCategorys'])){?>
			<ul>
				<?php foreach (CSCHelper::setDefault($value['childsCategorys']) as $value){?>
				<li>
					<div class="sec-t">
						<a href="/scate/<?php echo CSCHelper::setDefault($value['id']);?>.html"><?php echo CSCHelper::setDefault($value['title']);?></a>
					</div>
				</li>
				<?php }?>
			</ul><?php }?>
		</li>
	<?php }}?>
	</ul>
</div><script>csc.shop.subCate();</script>
<div class="g-h-10"></div>