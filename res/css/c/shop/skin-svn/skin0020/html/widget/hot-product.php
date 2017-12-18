<div class="box-sub hot_side">
	<h2 class="bs-hd">热门产品</h2>
	<ol class="g-i-v-m bs-bd sub-hot-product">
	<?php if($this->getList('getHotProductList')){$tag = 1 ;?><?php foreach ($this->getList('getHotProductList') as $value){?>	
		<li <?php if($tag==1)?>class="first">
			<div class="ibox">
				<a href="/product/<?php eo($value, 'id')?>.html" class="i" target="_blank">
					<img src="<?php eo($value, 'pic1')?>" data-max="<?php if($tag==1){?>90<?php }else{?>60<?php }?>" alt="<?php eo($value, 'title')?>" />
				</a>
			</div>

			<a href="/product/<?php eo($value, 'id')?>.html" class="t" target="_blank"><?php eo($value, 'title')?></a>
			<div class="price"> <strong><?php eo($value, 'price')?></strong> 
			</div>

			<span class="num"><?php echo $tag;?></span>
		</li>
	<?php $tag++;}}?>
	</ol>
</div>
<div class="g-h-10"></div>