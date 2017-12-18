<?php $this->show('header');?>

<div class="g-o-a">
	<div class="main product">
		<div class="bo_inner">
			<div class="main-cate">
				<?php if($this->cate != ''){?>
				<h2><?php echo setDefault($this->cateshow, 'title');?><span>(
					<?php  echo setDefault($this->cateshow, 'pcount','0');?>
					)</span></h2>
				<?php }else{?>
				<h2>所有产品</h2>
				<?php }?>
				<ul class="g-c-f seach_key">
					<?php if($this->catearr){foreach ($this->catearr as $value){?>
					<li> <a href="/scate/<?php eo($value, 'id')?>.html">
						<?php eo($value, 'title')?>
						<span>(
						<?php eo($value, 'pcount')?>
						)</span> </a> </li>
					<?php }}?>
				</ul>
			</div>
			<div class="g-c-f order-bar">
				<div class="g-f-l order-text">排列显示:</div>
				<ul class="g-f-l a-40 order-factor">
					<li class="arr up"> <a rel="nofollow" href="javascript:void(csc.shop.type('price-asc'));">价格</a> </li>
					<li class="arr down"> <a rel="nofollow" href="javascript:void(csc.shop.type('price-desc'));">价格</a> </li>
					<li> <a rel="nofollow" href="javascript:void(csc.shop.type('hot-desc'));">按热度排序</a> </li>
				</ul>
				<script>csc.shop.sort();</script>
				<label class="g-f-r only-price">
					<input type="checkbox" name="speak" />
					只显示已标价的商品 </label>
			</div>
			<div class="hot-product product-list">
				<?php if($this->getList('getProductList')->list){?>
				<ul class="g-c-f g-i-v-m thumb-list">
					<?php foreach ($this->getList('getProductList')->list as $value){?>
					<li class="item">
						<div class="inner">
							<div class="ibox"><a href="/product/<?php eo($value, 'id')?>.html" class="i" target="_blank"><span class="imgShade"></span><img src="<?php eo($value, 'pic1')?>" data-max="160" alt="<?php eo($value, 'title');?>" /></a></div>
							<div class="bg"> <a href="/product/<?php eo($value, 'id')?>.html" class="t" target="_blank">
								<?php eo($value, 'title');?>
								</a>
								<div class="price"><strong>
									<?php eo($value, 'price')?>
									</strong></div>
								<a href="http://jiaoyi.csc86.com/inquiry/publish/?proid=<?php eo($value, 'id')?>" class="g-ico ico-inquiry" target="_blank" rel="nofollow">询盘</a> </div>
						</div>
					</li>
					<?php }?>
				</ul>
				<div class="g-t-c Spage">
					<?php  $this->widget('CCscBasePagerWidget',$this->pageparams);?>
				</div>
				<?php }else{?>
				<div class="empty">暂时没有产品信息~</div>
				<?php }?>
			</div>
		</div>
	</div>
	<script>
csc.ie6 && seajs.use(csc.url("res","/f=js/m/hover"),function (){
	csc.hover("ul.thumb-list>li.item");
});	
</script>
	<div class="sub">
		<?php $this->show('company');?>
		<?php $this->show('cate');?>
		<?php $this->show('hot-product');?>
	</div>
</div>
<?php $this->show('foot');?>
