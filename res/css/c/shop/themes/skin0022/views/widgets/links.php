<div class="box-sub friend-links">
	<h2 class="bs-hd">友情链接</h2>
	<ul>
	<?php if(ShopHelper::XmlCallBack('shopLinks')){?><?php foreach (ShopHelper::XmlCallBack('shopLinks') as $value){?>
		<li><a rel="nofollow" href="<?php echo CSCHelper::setDefault($value['linkAddress']);?>" target="_blank"><?php echo CSCHelper::setDefault($value['linkName']);?></a></li>
	<?php }}?>
	</ul>
</div>
<div class="g-h-15"></div>