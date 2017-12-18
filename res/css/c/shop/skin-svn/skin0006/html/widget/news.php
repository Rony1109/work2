<div class="box-sub latest-news">
	<div class="bs-hd">
		<h2>公司动态</h2>
		
	</div>				
	<ul>
	<?php if($this->getList('getArticleList')->list){?><?php foreach ($this->getList('getArticleList')->list as $value){?>
		<li><a href="/news/<?php echo eo($value,'id'); ?>.html" target="_blank"><?php eo($value, 'title');?></a></li>
		<?php }}?>
	</ul>			
</div>
<div class="g-h-10"></div>