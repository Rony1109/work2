
<div class="g-o-a">
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
					<div class="g-c-f auth-info-box">         
                    <?php if(CSCHelper::setDefault( $enterprise['realApproveTag'] )){?>
            		<a><img src="http://res.csc86.com/css/c/auth/sm60.png" width="60" height="60" alt=""/><br/>企业实名认证</a>
            		<?php }else if ($enterprise['personApproveTag']) {?>
            		<a><img src="http://res.csc86.com/css/c/auth/gr60.png" width="60" height="60" alt=""/><br/>个人实名认证</a>
           			 <?php }?>
                     <?php if(CSCHelper::setDefault( $enterprise['proveApproveTag'] )){?><a><img src="http://res.csc86.com/css/c/auth/ss60.png" width="60" height="60" alt=""/><br/>企业身份认证</a><?php }?>
                     <?php if(CSCHelper::setDefault( $enterprise['localApproveTag'] )){?><a><img src="http://res.csc86.com/css/c/auth/st60.png" width="60" height="60" alt=""/><br/>企业实地认证</a><?php }?>
                    </div>
				</div>
			</div>
			<?php 
			if (CSCHelper::setDefault($enterprise)) {
			?>
			<div class="box-text company-intro">
				<h2 class="bt-hd comtit">
					<?php echo $enterprise['enterprise'];?>
				</h2>
				<div class="bt-bd">
					<?php echo $enterprise['introduce'];?>
				</div>
				<ul class="g-c-f lin_com">
					<li><em>成立时间：</em><span>
						<?php echo $enterprise['registerDate'];?>
						</span></li>
					<li><em>注册资金：</em><span>
						人民币 <?php echo $enterprise['registerMoney'];?>
						</span></li>
					<li><em>经营范围：</em><span>
						<?php echo $enterprise['sellList'];?>
						</span></li>
					<li><em>经营地址：</em><span>
						<?php echo $enterprise['address'];?>
						</span></li>
					<li><em>法定代表人：</em><span>
						<?php echo $enterprise['person'];?>
						</span></li>
					<li><em>联系电话：</em><span>
						<?php
					$contact	= array();
					array_push($contact, CSCHelper::setDefault($contacts[0]['moblie']));
					array_push($contact, CSCHelper::setDefault($contacts[0]['telephone']));
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
			if (CSCHelper::setDefault($enterprise)) {
			?>
			<div class="box-text company-intro">
				<h2 class="bt-hd">主营情况</h2>
				<div class="bt-bd">
					<table class="m_dit" width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td valign="top"><em>主营产品/服务</em></td>
							<td valign="top"><span>
								<?php echo $enterprise['sellList'];?>
								</span></td>
							<td valign="top"><em>主营行业</em></td>
							<td valign="top"><span>
								<?php echo $enterprise['tradeList'];?>
								</span></td>
						</tr>
						<tr>
							<td valign="top"><em>经营模式</em></td>
							<td valign="top"><span>
								<?php echo $enterprise['model'];?>
								</span></td>
							<td valign="top"><em>主要经营地</em></td>
							<td valign="top"><span>
								<?php echo $enterprise['operateAddressList'];?>
								</span></td>
						</tr>
						<tr>
							<td valign="top"><em>是否提供来料/来图加工</em></td>
							<td valign="top"><span>
								<?php echo $enterprise['diy'];?>
								</span></td>
							<td valign="middle"><em>管理体系认证</em></td>
							<td valign="middle"><span>
								<?php echo $enterprise['manage'];?>
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
								<?php echo $enterprise['staff'];?>
								</span></td>
							<td><em>年营业额</em></td>
							<td><span>
								<?php echo $enterprise['trunover'];?>
								</span></td>
						</tr>
						<tr>
							<td><em>注册资本</em></td>
							<td><span>
								人民币<?php echo $enterprise['registerMoney'];?>
								</span></td>
							<td><em>企业类型</em></td>
							<td><span>
								<?php echo $enterprise['enterpriseType'];?>
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
		<!?php $this->widget('Company');?>
	</div-->
</div>

