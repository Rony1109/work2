<div class="box-sub latest-news">
	<div class="bs-hd">
		<h2>公司动态<span>NEWS</span></h2>
		<a href="/news.html" class="more" rel="nofollow">更多&gt;&gt;</a>
	</div>				
	<ul>
	<?php if($this->getList('getArticleList')->list){?><?php foreach ($this->getList('getArticleList')->list as $value){?>
		<li><a href="/news/<?php echo eo($value,'id'); ?>.html" target="_blank"><?php eo($value, 'title');?></a></li>
		<?php }}?>
	</ul>			
</div>
<div class="g-h-10"></div>