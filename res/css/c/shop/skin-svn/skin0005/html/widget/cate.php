<div class="box-sub sub-cate">
	<h2 class="bs-hd">产品分类<span>MENU</span></h2>
	<ul>
	<?php if($this->getList('cuscategorys')){?><?php foreach ($this->getList('cuscategorys') as $value){?>
		<li class="item">
			<div class="frst-t">
				<a href="/scate/<?php eo($value, 'id');?>.html" class="txt"><span><?php eo($value, 'title');?></span></a>
			</div><?php if(process($value, 'childsCategorys')){?>
			<ul>
				<?php foreach (process($value, 'childsCategorys') as $value){?>
				<li>
					<div class="sec-t">
						<a href="/scate/<?php eo($value, 'id');?>.html"><?php eo($value, 'title');?></a>
					</div>
				</li>
				<?php }?>
			</ul><?php }?>
		</li>
	<?php }}?>
	</ul>
</div><script>csc.shop.subCate();</script>
<div class="g-h-10"></div>