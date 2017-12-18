<?php $this->show('header');?>
<div class="g-o-a">

	<div class="main">
		<div class="box-main news-detail">
		<div class="g-t-c news-head">
			<h1><?php eo($this->tdetail, 'title')?></h1>
			<p class="news-info">
				阅读数 (<?php eo($this->tdetail, 'readTimes')?>) <span class="g-f-c-8"><?php eo($this->tdetail, 'releaseTime')?></span>
			</p>
		</div>
		<div class="detail-con un-reset">
			<?php echo setDefault($this->tdetail, 'content')?>
			<?php if(setDefault($this->tdetail,'imgUrl')){?>
			<div class="g-i-v-m d-news-pic">
				<div class="ibox">
				<span class="i"><img src="<?php eo($this->tdetail, 'imgUrl')?>" data-maxw="705" data-maxh="200" /></span>
				</div>
			</div>
			<?php }?>
		</div>
		<script>seajs.use(csc.url("res","/f=js/m/editorShow"),function (){
					csc.editorShow().editorImg();
				});</script>
		<h2 class="label-sort">关键词：<?php eo($this->tdetail, 'keyWord')?></h2>
		</div>
	</div>

	<div class="sub">
		<?php $this->show('company');?>
		<?php $this->show('news');?>
	</div>
</div>
<?php $this->show('foot');?>