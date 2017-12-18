<div class="con_b_out">
<div class="g-o-a">
	<div class="main news">
		<div class="bo_inner">
			<h2 class="bm-hd">公司动态</h2>
			<?php if(ShopHelper::XmlCallBack('getArticleList')){$tag = 1 ;?>
			<ul class="news-list">
				<?php foreach (ShopHelper::XmlCallBack('getArticleList') as $value){?>
				<li <?php if($tag%5==0){?>class="line"<?php }?>>
					<h2> <a href="/news/<?php echo CSCHelper::setDefault($value['id'])?>.html" class="title" target="_blank">
						<?php echo CSCHelper::setDefault($value['title'])?>
						</a> </h2>
					<span class="date">
					<?php echo ShopHelper::datetime( $value['releaseTime'] );?>
					</span> <span class="amount">阅读（<em>
					<?php echo CSCHelper::setDefault($allReadTimes[$value['id']],0);?>
					</em>）</span> </li>
				<?php $tag++;}?>
			</ul>
			<div class="g-t-c Spage">
				<?php  $this->widget('CCscBasePagerWidget',$this->pageparams);?>
			</div>
			<?php }else{?>
			<div class="empty">该公司目前还没有任何动态呃~</div>
			<?php }?>
		</div>
	</div>
	<div class="sub"><?php CSCHelper::widgets(array('Company'));?></div>

</div>
</div>

