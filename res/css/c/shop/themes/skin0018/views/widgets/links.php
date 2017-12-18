<div class="box-sub friend-links">
<div  class="bs-hd"><h2>友情链接</h2></div>
	<ul>
	<?php if(ShopHelper::XmlCallBack('shopLinks')){?><?php foreach (ShopHelper::XmlCallBack('shopLinks') as $value){?>
		<li><a rel="nofollow" href="<?php echo CSCHelper::setDefault($value['linkAddress']);?>" target="_blank"><?php echo CSCHelper::setDefault($value['linkName']);?></a></li>
	<?php }}?>
	</ul>
</div>
<div class="g-h-10"></div>