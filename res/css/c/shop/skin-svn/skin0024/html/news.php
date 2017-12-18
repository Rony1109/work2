<?php $this->show('header');?>
<div class="g-h-10"></div>
<div class="g-o-a">
	<div class="main news">
		<div class="bo_inner">
			<h2 class="bm-hd">公司动态</h2>
			<?php if($this->getList('getArticleList')->list){$tag = 1 ;?>
			<ul class="news-list">
				<?php foreach ($this->getList('getArticleList')->list as $value){?>
				<li <?php if($tag%5==0){?>class="line"<?php }?>>
					<h2> <a href="/news/<?php eo($value, 'id')?>.html" class="title" target="_blank">
						<?php eo($value, 'title')?>
						</a> </h2>
					<span class="date">
					<?php eo($value, 'releaseTime')?>
					</span> <span class="amount">阅读（<em>
					<?php eo($value, 'readTimes')?>
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
	<div class="sub">
		<?php $this->show('company');?>
	</div>
</div>
<?php $this->show('foot');?>
