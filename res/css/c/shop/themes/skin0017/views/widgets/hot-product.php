<div class="box-sub">
	<h2 class="bs-hd"><span>热门产品</span></h2>
	<ol class="g-i-v-m bs-bd sub-hot-product">
	<?php if(ShopHelper::XmlCallBack('getHotProductList')){$tag = 1 ;?><?php foreach (ShopHelper::XmlCallBack('getHotProductList') as $value){?>	
		<li <?php if($tag==1)?>class="first">
			<div class="ibox">
				<a href="/product/<?php echo CSCHelper::setDefault($value['id']);?>.html" class="i" target="_blank">
					<img src="<?php echo ShopHelper::scale($value['pic1'],100);?>" data-max="<?php if($tag==1){?>90<?php }else{?>60<?php }?>" alt="<?php echo CSCHelper::setDefault($value['title']);?>" />
				</a>
			</div>

			<a href="/product/<?php echo CSCHelper::setDefault($value['id']);?>.html" class="t" target="_blank"><?php echo CSCHelper::setDefault($value['title']);?></a>
			<div class="price"> <strong><?php echo CSCHelper::priceFormat($value['price'], $value['speak']);?></strong> 
			</div>

			<span class="num"><?php echo $tag;?></span>
		</li>
	<?php $tag++;}}?>
	</ol>
</div>
<div class="g-h-15"></div>