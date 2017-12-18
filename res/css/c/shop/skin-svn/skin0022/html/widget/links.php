<div class="box-sub friend-links">
	<h2 class="bs-hd">友情链接</h2>
	<ul>
	<?php if($this->getList('shopLinks')){?><?php foreach ($this->getList('shopLinks') as $value){?>
		<li><a rel="nofollow" href="<?php echo eo($value,'linkAddress'); ?>" target="_blank"><?php echo eo($value,'linkName'); ?></a></li>
	<?php }}?>
	</ul>
</div>
<div class="g-h-15"></div>