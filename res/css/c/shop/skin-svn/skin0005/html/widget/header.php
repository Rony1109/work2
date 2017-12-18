<div class="head">
	<div class="g-o-a"> 
		<h1 class="logo-name">
			<a href="/" class="g-f-l logo">
				<img src="<?php eo($this->shopinfo, 'enpLogo')?>" width="100" height="100" alt="<?php eo($this->shopinfo, 'enpName')?>" />
			</a>
			<div class="h-f">
				<a href="/" class="name" title="<?php eo($this->shopinfo, 'enpName')?>"><?php eo($this->shopinfo, 'enpName')?></a>
				<?php if(setDefault($this->shopinfo, 'seed')){?>
				<span class="ppxf"><img src="http://res.csc86.com/image/m/mark/ppxf.gif" width="30" height="30"/></span>
				<?php }?>
			</div>
			<p>主营：<?php eo($this->shopinfo, 'tradeList')?></p>
		</h1>
		<div class="g-f-r g-t-c shop-fav">
		<?php if(!setDefault($this->myself, 'collectedFlag')){?>
		<a href="javascript:void(csc.shop.fav('<?php eo($this->shopinfo,'id')?>',null,'shop'));" rel="nofollow"><span>收藏旺铺</span></a>
		<?php }else{?>
		已收藏
		<?php }?>
		</div>
	</div>
</div>
<div class="nav">
	<ul class="g-o-a">
		<li class="item <?php if($this->lamp == 'index'){?>cur <?php }?> ">
			<a href="/" class="item-txt">首　页</a>
		</li>
		<li class="item pro <?php if($this->lamp == 'product'||$this->lamp == 'pdetail'){?>cur <?php }?>">
			<a href="/product.html" class="item-txt">产品中心</a>
			<span class="item-arr"></span>
			<div class="nav-cate">
				<ul class="cate-1th">
				<?php if($this->getList('cuscategorys')){?><?php foreach ($this->getList('cuscategorys') as $value){?>	
					<li class="c1-item">
						<div class="frst-t">
							<a href="/scate/<?php eo($value, 'id');?>.html" class="c1-item-txt"><?php eo($value, 'title');?></a>
						</div>
						<?php if(setDefault($value, 'childsCategorys')){?>
						<div class="cate-2th">
							<ul>
							<?php foreach (setDefault($value, 'childsCategorys') as $valuec){?>
								<li>
									<div class="sec-t">
										<a href="/scate/<?php eo($valuec, 'id');?>.html"><?php eo($valuec, 'title');?></a>
									</div>
								</li>
							<?php }?>
							</ul>
						</div><?php }?>
					</li>
				<?php }}?>
				</ul>
			</div>
		</li>
		<li class="item <?php if($this->lamp == 'authentication'){?>cur <?php }?> ">
			<a href="/authentication.html" class="item-txt">诚信档案</a>
		</li>
		<li class="item <?php if($this->lamp == 'news'||$this->lamp == 'tdetail'){?>cur <?php }?> ">
			<a href="/news.html" class="item-txt">公司动态</a>
		</li>
		<li class="item <?php if($this->lamp == 'about'){?>cur <?php }?>">
			<a href="/about.html" class="item-txt" >关于我们</a>
		</li>
	</ul>
</div>
<script>csc.shop.navCate('div.nav');</script>
<div class="g-h-01"></div>