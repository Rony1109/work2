<div class="box-sub friend-links">
<div  class="bs-hd"><h2>友情链接</h2></div>
	<ul>
	<?php if($this->getList('shopLinks')){?><?php foreach ($this->getList('shopLinks') as $value){?>
		<li><a rel="nofollow" href="<?php echo eo($value,'linkAddress'); ?>" target="_blank"><?php echo eo($value,'linkName'); ?></a></li>
	<?php }}?>
	</ul>
</div>
<div class="g-h-10"></div>