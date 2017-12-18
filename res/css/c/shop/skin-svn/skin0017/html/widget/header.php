<div class="head">
	<div class="g-o-a">
		<h1 class="logo-name"> <a href="/" class="g-f-l logo"> <img src="<?php eo($this->shopinfo, 'enpLogo')?>" width="100" height="100" alt="<?php eo($this->shopinfo, 'enpName')?>" /> </a>
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
		</h1>
		<ul class="g-f-r follow-fav">
			<li class="ff-follow">
				<div class="cir"><em>
					<?php eo($this->shopinfo, 'enpCircleMemberNum')?>
					</em>个圈友</div>
				<span><a href="<?php echo QUAN_URL.'/index.html?circleId='.setDefault($this->shopinfo, 'enpCircleId')?>"  target="_blank" class="g-ico <?php if (setDefault($this->myself, 'joinEnpCircleFlag')){echo 'ico-followed';}else{echo 'ico-follow';}?>" rel="nofollow"><i class="iocl"></i>
				<?php if (setDefault($this->myself,'joinEnpCircleFlag')){echo '已加入';}else{ echo '加入圈';}?>
				</a></span> </li>
			<li class="ff-fav">
				<div class="cir"><em>
					<?php eo($this->shopinfo, 'likeNum')?>
					</em>人喜欢</div>
				<span><a href="javascript:void(csc.shop.signLike('<?php eo($this->shopinfo, 'id')?>'));" class="g-ico ico-fav<?php if (setDefault($this->myself, 'likedFlag')) echo ' ico-faved';?>" rel="nofollow"><i class="iocl"></i>
				<?php if (setDefault($this->myself, 'likedFlag')){echo '已喜欢';}else{echo '我喜欢';}?>
				</a></span> </li>
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
<div class="g-h-15"></div>
