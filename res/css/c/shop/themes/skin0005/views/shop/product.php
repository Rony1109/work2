<div class="g-o-a">
	<div class="main product">
		<div class="main-cate">
			<?php if($this->cate != ''){?>
			<h2><?php echo CSCHelper::setDefault($this->cateshow['title']);?><span>(<?php  echo CSCHelper::setDefault($this->cateshow['pcount'],0);?>)</span></h2>	
			<?php }else{?>
			<h2>所有产品</h2>
			<?php }?>
			<ul class="g-c-f">
			<?php if($this->catearr){foreach ($this->catearr as $value){?>
				<li>
					<a href="/scate/<?php echo CSCHelper::setDefault($value['id'])?>.html"><?php echo CSCHelper::setDefault($value['title'])?></a>
					<span>(<?php echo CSCHelper::setDefault($value['pcount'],0)?>)</span>
				</li>
			
			<?php }}?>
			</ul>
		</div>
		<div class="g-c-f order-bar">
			<div class="g-f-l order-text">排列显示:</div>
			<ul class="g-f-l a-40 order-factor">
				<li class="arr up">
					<a rel="nofollow" href="javascript:void(csc.shop.type('price-asc'));">价格</a>
				</li>
				<li class="arr down">
					<a rel="nofollow" href="javascript:void(csc.shop.type('price-desc'));">价格</a>
				</li>
				<li>
					<a rel="nofollow" href="javascript:void(csc.shop.type('hot-desc'));">按热度排序</a>
				</li>
			</ul>
			<script>csc.shop.sort();</script>
			<label class="g-f-r only-price">
				<input type="checkbox" name="speak" />
				只显示已标价的商品
			</label>
		</div>
		<div class="product-list">
		<?php if(ShopHelper::XmlCallBack('getProductList')){?>	
		<ul class="g-c-f g-i-v-m thumb-list">
		<?php foreach (ShopHelper::XmlCallBack('getProductList') as $value){?>	
			<li class="item">
				<div class="ibox"><a href="/product/<?php echo CSCHelper::setDefault($value['id'])?>.html" class="i" target="_blank"><img src="<?php echo ShopHelper::scale($value['pic1'],300)?>" data-max="160" alt="<?php echo CSCHelper::setDefault($value['title']);?>" /></a></div>
				<a href="/product/<?php echo CSCHelper::setDefault($value['id'])?>.html" class="t" target="_blank"><?php echo CSCHelper::setDefault($value['title']);?></a>
								<div class="price"><strong><?php echo CSCHelper::priceFormat($value['price'], $value['speak'])?></strong></div>
				<div class="g-c-f"><a href="http://jiaoyi.csc86.com/inquiry/publish/?proid=<?php echo CSCHelper::setDefault($value['id'])?>" class="g-ico ico-inquiry" target="_blank" rel="nofollow">立即询盘</a></div>
			</li>
		<?php }?>
		</ul>
		<div class="g-t-c Spage">
		 <?php  $this->widget('CCscBasePagerWidget',$this->pageparams);?>
		</div>
		<?php }else{?>
		<div class="empty">暂时没有产品信息~</div>
		<?php }?></div>
	</div>
	<div class="sub"><?php CSCHelper::widgets(array('Company','Cate','HotProduct'));?></div>

</div>
