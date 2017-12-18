<div class="head">
	<div class="g-o-a">
		<div class="logo-name"> <a href="/" class="g-f-l logo"> <img src="<?php eo($this->shopinfo, 'enpLogo')?>" width="100" height="100" alt="<?php eo($this->shopinfo, 'enpName')?>" /> </a>
			<div class="h-f"> <a href="/" class="name" title="<?php eo($this->shopinfo, 'enpName')?>">
				<?php eo($this->shopinfo, 'enpName')?>
				</a>
				<?php if(setDefault($this->shopinfo, 'seed')){?>
				<span class="ppxf"><img src="http://res.csc86.com/image/m/mark/ppxf.gif" width="30" height="30"/></span>
				<?php }?>
			</div>
			<p>主营：
				<?php eo($this->shopinfo, 'tradeList')?>
			</p>
		</div>
		<ul class="g-f-r follow-fav">
			<li class="ff-follow br_fff"><span><a href="<?php echo QUAN_URL.'/index.html?circleId='.setDefault($this->shopinfo, 'enpCircleId')?>"  target="_blank" class="g-ico <?php if (setDefault($this->myself, 'joinEnpCircleFlag')){echo 'ico-followed';}else{echo 'ico-follow';}?>" rel="nofollow"><div class="cir"><em>
					<?php eo($this->shopinfo, 'enpCircleMemberNum')?>
					</em>个圈友</div><i class="iocl"></i>
				<?php if (setDefault($this->myself,'joinEnpCircleFlag')){echo '已加入';}else{ echo '加入圈';}?>
				</a></span>
				
			</li>
			<li class="ff-fav"><span><a href="javascript:void(csc.shop.signLike('<?php eo($this->shopinfo, 'id')?>'));" class="g-ico ico-fav<?php if (setDefault($this->myself, 'likedFlag')) echo ' ico-faved';?>" rel="nofollow"><div class="cir"><em>
					<?php eo($this->shopinfo, 'likeNum')?>
					</em>人喜欢</div><i class="iocl"></i>
				<?php if (setDefault($this->myself, 'likedFlag')){echo '已喜欢';}else{echo '我喜欢';}?>
				</a></span>
				
			</li>
		</ul>
		<script>
csc.ie6 && seajs.use(csc.url("res","/f=js/m/hover"),function (){
	csc.hover("ul.follow-fav>li");
	
});	
</script> 
	</div>
</div>
<ul class="g-o-a nav">
	<li class="item <?php if($this->lamp == 'index'){?>cur <?php }?> "> <a href="/" class="item-txt">首　页</a> </li>
	<li class="item pro <?php if($this->lamp == 'product'||$this->lamp == 'pdetail'){?>cur <?php }?>"> <a href="/product.html" class="item-txt">产品中心</a> <span class="item-arr"></span>
		<div class="nav-cate">
			<ul class="cate-1th">
				<?php if($this->getList('cuscategorys')){?>
				<?php foreach ($this->getList('cuscategorys') as $value){?>
				<li class="c1-item">
					<div class="frst-t"> <a href="/scate/<?php eo($value, 'id');?>.html" class="c1-item-txt">
						<?php eo($value, 'title');?>
						</a> </div>
					<?php if(setDefault($value, 'childsCategorys')){?>
					<div class="cate-2th">
						<ul>
							<?php foreach (setDefault($value, 'childsCategorys') as $valuec){?>
							<li>
								<div class="sec-t"> <a href="/scate/<?php eo($valuec, 'id');?>.html">
									<?php eo($valuec, 'title');?>
									</a> </div>
							</li>
							<?php }?>
						</ul>
					</div>
					<?php }?>
				</li>
				<?php }}?>
			</ul>
		</div>
	</li>
	<li class="item <?php if($this->lamp == 'authentication'){?>cur <?php }?> "> <a href="/authentication.html" class="item-txt">诚信档案</a> </li>
	<li class="item <?php if($this->lamp == 'news'||$this->lamp == 'tdetail'){?>cur <?php }?> "> <a href="/news.html" class="item-txt">公司动态</a> </li>
	<li class="item <?php if($this->lamp == 'about'){?>cur <?php }?>"> <a href="/about.html" class="item-txt" >关于我们</a> </li>
</ul>
<script>
csc.ie6 && seajs.use(csc.url("res","/f=js/m/hover"),function (){
	csc.hover("ul.nav>li");
	csc.hover("div.nav-cate>ul.cate-1th>li.c1-item");
});	
</script>
<div class="g-h-10"></div>

<div class="g-o-a">
	<div class="main product-detail">
		<div class="bo_inner">
			<ol class="crumb">
				<?php if(setDefault($this->pdetail, 'cusCats')){foreach (setDefault($this->pdetail, 'cusCats') as $value){?>
				<li><a href="/scate/<?php eo($value, 'id')?>.html" target="_blank">
					<?php eo($value, 'name')?>
					</a>&gt;</li>
				<?php }}?>
				<li><strong>
					<?php eo($this->pdetail, 'title')?>
					</strong></li>
			</ol>
			<div class="detail-info">
				<h1 class="di-hd">
					<?php eo($this->pdetail, 'title')?>
				</h1>
				<div class="g-c-f">
					<div class="g-f-r di-params">
						<table class="di-price">
							<thead>
								<tr>
									<th>订货量（
										<?php eo($this->pdetail, 'unitsVale')?>
										）：</th>
									<td>价格：</td>
								</tr>
							</thead>
							<tbody>
								<?php if(setDefault($this->pdetail, 'speak') != 'Y'){?>
								<?php if(setDefault($this->pdetail, 'pricearr')){foreach (setDefault($this->pdetail, 'pricearr') as $value){?>
								<tr>
									<th>≥
										<?php eo($value, 'more');?></th>
									<td><strong>
										<?php eo($value, 'detail');?>
										</strong> 元/
										<?php eo($this->pdetail, 'unitsVale')?></td>
								</tr>
								<?php }}?>
								<?php }else{?>
								<tr>
									<td colspan="2"><strong class="g-ff-y call-price">价格面议</strong></td>
								</tr>
								<?php }?>
							</tbody>
						</table>
						<div class="di-attr">
							<h2>产品属性</h2>
							<table width="100%">
								<tr>
									<td>类别：
										<?php eo($this->pdetail, 'scateName')?></td>
								</tr>
							</table>
						</div>
						<div class="inquiry-fav"> <a href="http://jiaoyi.csc86.com/inquiry/publish/?proid=<?php eo($this->pdetail, 'id')?>" class="g-f-l" target="_blank" rel="nofollow">立即询盘</a> <a href="javascript:void(csc.shop.order('<?php eo($this->pdetail, 'id')?>'));" class="g-f-l di-order" rel="nofollow" data-memberid="<?php eo($this->pdetail, 'memberid')?>">意向订单</a>
							<?php if(setDefault($this->pdetail, 'collectTag')){?>
							<a class="g-f-l di-fav di-faved" rel="nofollow" data-id="b1649de9-3b0c-4488-9ff3-8f18991db974" href="javascript:">产品已收藏</a>
							<?php }else{?>
							<a href="javascript:void(csc.shop.fav('<?php eo($this->pdetail, 'id')?>'));" data-id="<?php eo($this->pdetail, 'id')?>" class="g-f-l di-fav" rel="nofollow" >收藏该商品</a>
							<?php }?>
						</div>
					</div>
					<div class="g-i-v-m di-thumb">
						<div class="thumb-img ibox"> <a class="i" href="<?php echo IMG_URL.newthumbex(setDefault($this->pdetail, 'pic1'),4)?>" target="_blank"> <img src="<?php echo IMG_URL.newthumbex(setDefault($this->pdetail, 'pic1'),3)?>" alt="<?php eo($this->pdetail, 'title')?>" data-max="300"/> </a> </div>
						<ul class="g-c-f thumb-items">
							<?php if(setDefault($this->pdetail, 'picarr')){foreach (setDefault($this->pdetail, 'picarr') as $value){?>
							<li class="ibox"><span class="arr"></span> <a class="i" href="<?php eo($value, 'imgUrl')?>" target="_blank"> <img src="<?php eo($value, 'imgUrl')?>" alt="<?php eo($this->pdetail, 'title')?>" data-max="60" /> </a> </li>
							<?php }}?>
						</ul>
					</div>
				</div>
				<ul class="g-c-f a-40 di-tab-hd">
					<li class="cur"> <a href="javascript:">详细说明</a> </li>
					<li> <a href="javascript:">规格参数</a> </li>
				</ul>
				<ul class="di-tab-bd">
					<li class="di-tab-bd-item cur detail-intro">
						<div class="un-reset">
							<?php eo($this->pdetail, 'content');?>
						</div>
						<script>seajs.use(csc.url("res","/f=js/m/editorShow"),function (){
						csc.editorShow("div.un-reset",730).editorImg();
					});</script> 
					</li>
					<li class="di-tab-bd-item detail-params">
						<ul class="g-c-f" >
							<?php if(setDefault($this->pdetail, 'productPropertyVOs')){foreach (setDefault($this->pdetail, 'productPropertyVOs') as $value){?>
							<li> <span>
								<?php eo($value, 'propertyName')?>
								:</span>
								<div>
									<?php eo($value, 'propertyvalue')?>
								</div>
							</li>
							<?php }}?>
						</ul>
					</li>
				</ul>
				<script>csc.shop.detailThumb();
				seajs.use(csc.url("res","/f=js/m/tab"),function (){
					csc.tab("ul.di-tab-hd>li","ul.di-tab-bd>li","click");
				});</script> 
			</div>
		</div>
	</div>
	<div class="sub">
		<?php $this->show('company');?>
		<?php $this->show('cate');?>
		<?php $this->show('hot-product');?>
	</div>
</div>
<?php $this->show('foot');?>
