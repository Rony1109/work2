<?php $this->show('header');?>
<div class="g-o-a">
	<div class="main auth">
		<div class="con_tit">
			<ul class="tit_imt">
				<li class="first cur"><a href="javascript:">认证档案</a><i></i></li>
				<li class=""><a href="javascript:">资质荣誉</a><i></i></li>
			</ul>
		</div>
		<div class="item_resd cur">
		<?php
		// 初始数据信息
		$approves	= CSCHelper::def($this->shopinfo, 'approve');
		$ebs		= CSCHelper::def($approves, 'ebs'); 		// 众信认证
		$realName	= CSCHelper::def($approves, 'realName'); 	// 实名认证
		$realStore	= CSCHelper::def($approves, 'realStore'); 	// 实体认证
		?>
			<?php if($ebs||$realName||$realStore){?>
			<div class="box-main">
				<h2 class="bm-hd">认证信息</h2>
				<div class="bm-bd">
					<ul class="auth-items">
						<?php if($realName){?>
						<li class="auth-ico auth-ico-real">企业实名认证</li>
						<?php }?>
						<?php if($realStore){?>
						<li class="auth-ico auth-ico-entity">实体店认证</li>
						<?php }?>
						<?php if($ebs){?>
						<li class="auth-ico auth-ico-integrity">诚信深商</li>
						<?php }?>
					</ul>
				</div>
			</div>
			<?php if($realName){?>
			<div class="box-main">
				<h2 class="bm-hd">企业实名认证</h2>
				<div class="bm-bd">
					<ul class="g-c-f auth-identity">
						<li> <strong>企业名称：</strong>
							<p>
								<?php eo($this->shopinfo, 'realenterpriseName')?>
							</p>
						</li>
						<li> <strong>企业类型：</strong>
							<p>
								<?php eo($this->shopinfo, 'realcompanyType')?>
							</p>
						</li>
						<li> <strong>法定代表人：</strong>
							<p>
								<?php eo($this->shopinfo, 'reallegalPerson')?>
							</p>
						</li>
						<li> <strong>营业执照注册地：</strong>
							<p>
								<?php eo($realName, 'licenseProvince').eo($realName, 'licenseCity').eo($realName, 'licenseAddress');?>
							</p>
						</li>
						<li> <strong>认证日期：</strong>
							<p>
								<?php eo($this->shopinfo, 'realapproveTime')?>
							</p>
						</li>
						<li> <strong>成立日期：</strong>
							<p>
								<?php eo($this->shopinfo, 'realregisterDate')?>
							</p>
						</li>
						<li class="scope"> <strong>经营范围：</strong>
							<p>
								<?php eo($this->shopinfo, 'realscope')?>
							</p>
						</li>
					</ul>
				</div>
			</div>
			<?php }?>
			<?php if($realStore){?>
			<div class="box-main">
				<h2 class="bm-hd">企业实体店认证</h2>
				<div class="g-c-f bm-bd auth-entity">
					<div class="g-f-l entity-photo">
						<ul class="g-f-r ep-hd">
							<?php if($this->getList('storeImg')){?>
							<?php foreach ($this->getList('storeImg') as $value){?>
							<li > <img src="<?php eo($value, 'imgUrl')?>" alt="" width="60" height="42" /> <span></span> </li>
							<?php }}?>
						</ul>
						<ul class="g-f-l ep-bd">
							<?php if($this->getList('storeImg')){$tag=1;?>
							<?php foreach ($this->getList('storeImg') as $value){?>
							<li <?php if($tag==1){?> class="cur"<?php }?>> <img src="<?php eo($value, 'imgUrl')?>" alt="" width="240" height="180" /> </li>
							<?php $tag++;}}?>
						</ul>
					</div>
					<script>
				seajs.use(csc.url("res","/f=js/m/tab"),function (){
					csc.tab("ul.ep-hd>li","ul.ep-bd>li");
				});
				</script>
					<div class="g-f-r entity-info">
						<ul>
							<?php if($this->getList('storeAddress')){$tag=1;?>
							<?php foreach ($this->getList('storeAddress') as $value){?>
							<li class="g-c-f"> <strong class="g-ico <?php if(setDefault($value, 'status')){?>ico-verif<?php }?>">
								<?php if(setDefault($value, 'status')){?>
								已核实
								<?php }else{?>
								未核实
								<?php }?>
								</strong> <strong class="ei-key">实体店址<?php echo $tag;?>：</strong>
								<p class="ei-value">
									<?php eo($value, 'address')?>
								</p>
							</li>
							<?php $tag++;}}?>
							<li class="g-c-f"> <strong class="ei-key">核查时间：</strong>
								<p class="ei-value">
									<?php eo($this->shopinfo, 'storeapproveTime')?>
								</p>
							</li>
						</ul>
						<div class="seal"></div>
					</div>
				</div>
			</div>
			<?php }?>
			<?php if ($ebs){?>
			<div class="box-main shen_sh">
				<h2 class="bm-hd">诚信深商认证</h2>
				<div class="bm-bd">
					<h3>工商注册信息<span>(该信息已通过众信认证）</span></h3>
					<div class="g-c-f t-list">
						<table width="100%" cellspacing="0" cellpadding="0" border="0">
							<tbody>
								<tr>
									<td>企业名称</td>
									<td><?php eo($ebs, 'enterpriseName')?></td>
									<td>注册地址</td>
									<td><?php eo($ebs, 'approveAddress')?></td>
								</tr>
								<tr>
									<td>注册资本</td>
									<td>人民币 <?php eo($this->shopinfo, 'registerMoney')?></td>
									<td>成立日期</td>
									<td><?php eo($this->shopinfo, 'registerDate')?></td>
								</tr>
								<tr>
									<td>注册号</td>
									<td><?php eo($ebs, 'licenseNumber')?></td>
									<td>法定代表人</td>
									<td><?php eo($realName, 'legalPerson')?></td>
								</tr>
								<tr>
									<td>登记机关</td>
									<td><?php eo($realName, 'regAuhtority')?></td>
									<td>企业类型</td>
									<td><?php eo($realName, 'companyType')?></td>
								</tr>
								<tr>
									<td>营业期限</td>
									<td><?php eo($realName, 'businessTern')?></td>
									<td>经营范围</td>
									<td><?php eo($ebs, 'mainIndustryName')?></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div> 
			<?php }?>
			<?php }else{?>
			
			<div class="box-main no_cerr">
				<h2 class="bm-hd">认证信息</h2>
				<div class="bm-bd">
          <p>该商家没有进行认证。</p>
          <div class="bg_con">
            <h3>为什么要认证？</h3>
            认证是华南城或第三方提供的认证服务，包括个人实名认证、行业认证等，认证意味着企业在交易中拥有更高的信誉度和可信度。</div>
        </div>
			</div>
			<?php }?>
		</div>
		<div class="item_resd">
		<?php if($this->getList('shopBooks')){?>
			<div class="box-main honor">
				<h2 class="bm-hd">企业资质类认证</h2>
				<div class="bm-bd">
					<ul class="g-c-f honor-list">
						<?php 
						$auth1	=	false;	// 判断是否有资质类认证 
						foreach ($this->getList('shopBooks') as $value){
							if (CSCHelper::def($value, 'bookType')==5) continue;
							$auth1	= $auth1? $auth1:true; 
						?>
						<li> <img src="<?php eo($value, 'bookUrl')?>" width="200" height="200" alt="<?php eo($value, 'bookName')?>" /> 证书名称：<span>
							<?php eo($value, 'bookName')?>
							</span> <br />
							发证机构：<span>
							<?php eo($value, 'agency')?>
							</span> </li>
						<?php }?>
					</ul>
					<?php if (!$auth1){?>
					<div class="empty">该商家没有上传相关荣誉证书</div>
					<?php }?>
				</div>
			</div>
			<div class="box-main honor">
				<h2 class="bm-hd">企业荣誉证书</h2>
				<div class="bm-bd">
					<ul class="g-c-f honor-list">
						<?php 
						$auth2	=	false;	// 判断是否有资质类认证 
						foreach ($this->getList('shopBooks') as $value){
							if (CSCHelper::def($value, 'bookType')!=5) continue;
							$auth2	= $auth2? $auth2:true; 
						?>
						<li> <img src="<?php eo($value, 'bookUrl')?>" width="200" height="200" alt="<?php eo($value, 'bookName')?>" /> 证书名称：<span>
							<?php eo($value, 'bookName')?>
							</span> <br />
							发证机构：<span>
							<?php eo($value, 'agency')?>
							</span> </li>
						<?php }?>
					</ul>
					<?php if (!$auth2){?>
					<div class="empty">该商家没有上传相关荣誉证书</div>
					<?php }?>
				</div>
			</div>
			<?php }else{?>			
		      <div class="box-main no_cerr">
		        <h2 class="bm-hd">资质及荣誉证书</h2>
		        <div class="bm-bd">
		          <p>该商家没有上传相关荣誉证书。</p>
		          <div class="bg_con">上传资质及荣誉证书可以展示企业实力及信誉！</div>
		        </div>
		      </div>
			<?php }?>
		</div>
	</div>
	<script>
	seajs.use(csc.url("res","/f=js/m/tab"),function(){
	csc.tab("ul.tit_imt>li","div.item_resd","click");
	});
</script>
	<div class="sub">
		<?php $this->show('company');?>
	</div>
</div>
<?php $this->show('foot');?>