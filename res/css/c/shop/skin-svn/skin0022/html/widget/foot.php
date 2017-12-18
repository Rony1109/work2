<div class="g-h-30"></div>
<div class="foot">
	<div class="g-o-a"> <a href="http://www.csc86.com" title="实体商圈，可信交易。" class="foot-logo" target="_blank"> <img src="http://res.csc86.com/image/c/shop/logo-24.png" width="250" height="44" alt="华南城网logo" /> </a>
		<div class="foot-contact">
			<ul>
				<li>
					<?php eo($this->shopinfo, 'enpName')?>
				</li>
				<li>网址：http://
					<?php eo($this->shopinfo, 'submain')?>
					.csc86.com/</li>
				<li>地址：
					<?php eo($this->shopinfo, 'address')?>
				</li>
				<li>技术支持：华南城网 http://www.csc86.com</li>
			</ul>
		</div>
	</div>
</div>
<div class="foot-bg"></div>
<div style="display:none"><script src="http://res.csc86.com/f=js/m/statistics.js?memberId=<?php echo CSCHelper::def($this, 'memberId');?>"></script></div>
</body></html>