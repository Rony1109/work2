<?php if(ShopHelper::XmlCallBack('shopAdvers')){?>
<div class="shop-focus">
	<div class="g-o-a focus-play">
		<ul class="g-i-v-m">
		<?php foreach (ShopHelper::XmlCallBack('shopAdvers') as $value){?>
			<li><div class="ibox"><a href="javascript:" class="i"><img src="<?php echo ShopHelper::image($value['img_url']);?>" data-maxw="1000" data-maxh="200" /></a></div></li>
		<?php }?>
		</ul>
	</div>
</div>
<script>seajs.use(csc.url("res","/f=js/m/focusPlay"),function (){
	csc.foucsPlay("div.focus-play")
});</script><div class="g-h-10"></div><?php }?>