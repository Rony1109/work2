
<div class="g-o-a">
	<div class="main">
		<div class="bo_inner">
			<div class="box-main news-detail">
				
					<div class="g-t-c news-head">
						<h1>
							<?php echo CSCHelper::setDefault($tdetail['title']);?>
						</h1>
						<p class="news-info"> 阅读数 (
							<?php echo CSCHelper::setDefault($tdetail['readTimes'],0);?>
							) <span class="g-f-c-8">
							<?php echo CSCHelper::setDefault($tdetail['releaseTime']);?>
							</span> </p>
					</div>
					<div class="detail-con un-reset"> <?php echo CSCHelper::setDefault($tdetail['content'])?>
						<?php if(CSCHelper::setDefault($tdetail['imgUrl'])){?>
						<div class="g-i-v-m d-news-pic">
							<div class="ibox"> <span class="i"><img src="<?php echo ShopHelper::image( CSCHelper::setDefault($tdetail['imgUrl']) );?>" data-maxw="705" data-maxh="200" /></span> </div>
						</div>
						<?php }?>
					</div>
					<script>seajs.use(csc.url("res","/f=js/m/editorShow"),function (){
					csc.editorShow().editorImg();
				});</script>
					<h2 class="label-sort">关键词：
						<?php echo CSCHelper::setDefault($tdetail['keyWord']);?>
					</h2>
				</div>
		
		</div>
	</div>
	<div class="sub"><?php CSCHelper::widgets(array('Company','News'));?></div>

</div>

