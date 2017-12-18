<div class="g-o-a">
	<div class="main product-detail">
		<ol class="crumb">
		<?php if(CSCHelper::setDefault($pdetail['cusCats'])){foreach (CSCHelper::setDefault($pdetail['cusCats']) as $value){?>
			<li><a href="/scate/<?php echo CSCHelper::setDefault($value['id'])?>.html" target="_blank"><?php echo CSCHelper::setDefault($value['name'])?></a>&gt;</li>
		<?php }}?>
			<li><strong><?php echo CSCHelper::setDefault($pdetail['title'])?></strong></li>
		</ol>
		<div class="detail-info">
			<h1 class="di-hd"><?php echo CSCHelper::setDefault($pdetail['title'])?></h1>
			<div class="g-c-f">
				<div class="g-f-r di-params">
				
					<table class="di-price">
						<thead>
							<tr>
								<th>订货量（<?php echo CSCHelper::setDefault($pdetail['unitsVale'])?>）：</th>
								<td>价格：</td>
							</tr>
						</thead>
						<tbody>
						<?php if(CSCHelper::setDefault($pdetail['speak']) != 'Y'){?>
						<?php if(CSCHelper::setDefault($pdetail['pricearr'])){foreach (CSCHelper::setDefault($pdetail['pricearr']) as $value){?>
							<tr>
								<th>≥<?php echo CSCHelper::setDefault($value['more']);?></th>
								<td> <strong><?php echo CSCHelper::setDefault($value['detail']);?></strong> 
									元/<?php echo CSCHelper::setDefault($pdetail['unitsVale'])?>
								</td>
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
								<td>类别：<?php echo CSCHelper::setDefault($pdetail['scateName'])?></td>
							</tr>
						</table>
					</div>
					<div class="inquiry-fav">
						<a href="http://jiaoyi.csc86.com/inquiry/publish/?proid=<?php echo CSCHelper::setDefault($pdetail['id'])?>" class="g-f-l" target="_blank" rel="nofollow">立即询盘</a>
						<a href="javascript:void(csc.shop.order('<?php echo CSCHelper::setDefault($pdetail['id'])?>'));" class="g-f-l di-order" rel="nofollow" data-memberid="<?php echo CSCHelper::setDefault($pdetail['memberid'])?>">意向订单</a>
						<?php if(CSCHelper::setDefault($pdetail['collectTag'])){?>
							<a class="g-f-l di-fav di-faved" rel="nofollow" data-id="b1649de9-3b0c-4488-9ff3-8f18991db974" href="javascript:">产品已收藏</a>
						<?php }else{?>
						<a href="javascript:void(csc.shop.fav('<?php echo CSCHelper::setDefault($pdetail['id'])?>'));" data-id="<?php echo CSCHelper::setDefault($pdetail['id'])?>" class="g-f-l di-fav" rel="nofollow" >收藏该商品</a>
						<?php }?>
					</div>
				</div>
				<div class="g-i-v-m di-thumb">
					<div class="thumb-img ibox">
						<a class="i" href="<?php echo IMG_URL.newthumbex(CSCHelper::setDefault($pdetail['pic1']),4)?>" target="_blank">
							<img src="<?php echo IMG_URL.newthumbex(CSCHelper::setDefault($pdetail['pic1']),3)?>" alt="<?php echo CSCHelper::setDefault($pdetail['title'])?>" data-max="300"/>
						</a>
					</div>
					<ul class="g-c-f thumb-items">
					<?php if(CSCHelper::setDefault($pdetail['picarr'])){foreach (CSCHelper::setDefault($pdetail['picarr']) as $value){?>
						<li class="ibox">
							<a class="i" href="<?php echo ShopHelper::image($value['imgUrl'])?>" target="_blank">
								<img src="<?php echo ShopHelper::image($value['imgUrl'])?>" alt="<?php echo CSCHelper::setDefault($pdetail['title'])?>" data-max="60" />
							</a>
						</li>
					<?php }}?>
					</ul>
				</div>
			</div>
			<ul class="g-c-f a-40 di-tab-hd">
				<li class="cur">
					<a href="javascript:">详细说明</a>
				</li>
				<li>
					<a href="javascript:">规格参数</a>
				</li>
			</ul>
			<ul class="di-tab-bd">
				<li class="di-tab-bd-item cur detail-intro">
					<div class="un-reset">
						<?php echo CSCHelper::setDefault($pdetail['content']);?>
					</div>
					<script>seajs.use(csc.url("res","/f=js/m/editorShow"),function (){
						csc.editorShow("div.un-reset",730).editorImg();
					});</script>
				</li>
				<li class="di-tab-bd-item detail-params">
					<ul class="g-c-f" >
					<?php if(CSCHelper::setDefault($pdetail['productPropertyVOs'])){foreach (CSCHelper::setDefault($pdetail['productPropertyVOs']) as $value){?>
						<li>
							<span><?php echo CSCHelper::setDefault($value['propertyName'])?>:</span>
							<div><?php echo CSCHelper::setDefault($value['propertyvalue'])?></div>
						</li>
					<?php }}?>
					</ul>
				</li>
			</ul><script>csc.shop.detailThumb();
				seajs.use(csc.url("res","/f=js/m/tab"),function (){
					csc.tab("ul.di-tab-hd>li","ul.di-tab-bd>li","click");
				});</script>
		</div>
	</div>
	<div class="sub"><?php CSCHelper::widgets(array('Cate','HotProduct'));?></div>

</div>
