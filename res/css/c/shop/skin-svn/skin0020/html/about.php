<?php $this->show('header');?>

<div class="g-o-a con_bg_d"><div class="g-h-10"></div>
	<div class="about">
	<div class="bo_inner">
		<div class="con_tit">
			<ul class="tit_imt">
				<li class="cur"><a href="javascript:">公司概况</a><i></i></li>
			</ul>
		</div>
		<div class="about_iner">
			<div class="box-text company-detail">
				<div class="bm-bd">
					<ul class="auth-items">
						<?php if(setDefault($this->shopinfo, 'realApproveTag')){?>
						<li class="auth-ico auth-ico-real">企业实名认证</li>
						<?php }?>
						<?php if(setDefault($this->shopinfo, 'storeApproveTag')){?>
						<li class="auth-ico auth-ico-entity">实体店认证</li>
						<?php }?>
						<?php if(setDefault($this->shopinfo, 'creditApproveTag')){?>
						<li class="auth-ico auth-ico-integrity">诚信深商</li>
						<?php }?>
					</ul>
				</div>
			</div>
			<?php 
			if (CSCHelper::def($this, 'shopinfo')) {
			?>
			<div class="box-text company-intro">
				<h2 class="bt-hd comtit">
					<?php eo($this->shopinfo, 'enpName')?>
				</h2>
				<div class="bt-bd">
					<?php eo($this->shopinfo, 'introduce')?>
				</div>
				<ul class="g-c-f lin_com">
					<li><em>成立时间：</em><span>
						<?php eo($this->shopinfo, 'registerDate')?>
						</span></li>
					<li><em>注册资金：</em><span>
						人民币 <?php eo($this->shopinfo, 'registerMoney')?>
						</span></li>
					<li><em>经营范围：</em><span>
						<?php eo($this->shopinfo, 'sellList')?>
						</span></li>
					<li><em>经营地址：</em><span>
						<?php eo($this->shopinfo, 'address')?>
						</span></li>
					<li><em>法定代表人：</em><span>
						<?php eo($this->shopinfo, 'person')?>
						</span></li>
					<li><em>联系电话：</em><span>
						<?php
					$contact	= array();
					array_push($contact, CSCHelper::def(CSCHelper::def(CSCHelper::def($this->shopinfo, 'contacts'), 0), 'moblie'));
					array_push($contact, CSCHelper::def(CSCHelper::def(CSCHelper::def($this->shopinfo, 'contacts'), 0), 'telephone'));
						echo implode(' / ', $contact);
					?>
						</span></li>
				</ul>
			</div>
			<?php }else{?>
			<div class="no_redrit">尚未发布公司简介</div>
			<?php }?>
		</div>
		<div class="con_tit">
			<ul class="tit_imt">
				<li class="cur"><a href="javascript:">详细信息</a><i></i></li>
			</ul>
		</div>
		<div class="about_iner">
			<?php 
			if (CSCHelper::def($this, 'shopinfo')) {
			?>
			<div class="box-text company-intro">
				<h2 class="bt-hd">主营情况</h2>
				<div class="bt-bd">
					<table class="m_dit" width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td valign="top"><em>主营产品/服务</em></td>
							<td valign="top"><span>
								<?php eo($this->shopinfo, 'sellList')?>
								</span></td>
							<td valign="top"><em>主营行业</em></td>
							<td valign="top"><span>
								<?php eo($this->shopinfo, 'tradeList')?>
								</span></td>
						</tr>
						<tr>
							<td valign="top"><em>经营模式</em></td>
							<td valign="top"><span>
								<?php eo($this->shopinfo, 'model')?>
								</span></td>
							<td valign="top"><em>主要经营地</em></td>
							<td valign="top"><span>
								<?php eo($this->shopinfo, 'operateAddressList')?>
								</span></td>
						</tr>
						<tr>
							<td valign="top"><em>是否提供来料/来图加工</em></td>
							<td valign="top"><span>
								<?php eo($this->shopinfo, 'diy')?>
								</span></td>
							<td valign="middle"><em>管理体系认证</em></td>
							<td valign="middle"><span>
								<?php eo($this->shopinfo, 'manage')?>
								</span></td>
						</tr>
					</table>
				</div>
				<script>$("ul.m_dit>li:odd").addClass("wh");</script>
				<h2 class="bt-hd">企业规模</h2>
				<div class="bt-bd">
					<table class="gui_dit" width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td><em>员工人数</em></td>
							<td><span>
								<?php eo($this->shopinfo, 'staff')?>
								</span></td>
							<td><em>年营业额</em></td>
							<td><span>
								<?php eo($this->shopinfo, 'trunover')?>
								</span></td>
						</tr>
						<tr>
							<td><em>注册资本</em></td>
							<td><span>
								人民币 <?php eo($this->shopinfo, 'registerMoney')?>
								</span></td>
							<td><em>企业类型</em></td>
							<td><span>
								<?php eo($this->shopinfo, 'enterpriseType')?>
								</span></td>
						</tr>
					</table>
				</div>
				<script>$("ul.gui_dit>li:odd").addClass("wh");</script> 
			</div>
			<?php }else{?>
			<div class="no_redrit">尚未发布公司详细信息</div>
			<?php }?>
		</div></div>
	</div>
	<!--div class="sub">
		<!?php $this->show('company');?>
	</div--><?php $this->show('foot');?>
</div>

