<div class="g-h-10"></div>
<div class="g-o-a">
	<div class="main auth">
		<div class="bo_inner">
		<div class="con_tit">
			<ul class="tit_imt">
				<li class="first cur"><a href="javascript:">认证档案</a><i></i></li>
				<li class=""><a href="javascript:">资质荣誉</a><i></i></li>
			</ul>
		</div>
		<div class="item_resd cur">
		
			<div class="box-main">
				<h2 class="bm-hd">认证信息</h2>
				<div class="bm-bd">
					<div class="g-c-f auth-info-box">                        
                        <?php if($approve['realName']){?>
                        <a><img src="http://res.csc86.com/css/c/auth/sm60.png" width="60" height="60" alt=""/><br/>企业实名认证</a>
                        <?php }elseif($approve['person']){?>
                        <a><img src="http://res.csc86.com/css/c/auth/gr60.png" width="60" height="60" alt=""/><br/>个人实名认证</a>
                        <?php }?>
                        <?php if ($approve['prove']) {?><a><img src="http://res.csc86.com/css/c/auth/ss60.png" width="60" height="60" alt=""/><br/>企业身份认证</a><?php }?>
                        <?php if($approve['local']){?><a><img src="http://res.csc86.com/css/c/auth/st60.png" width="60" height="60" alt=""/><br/>企业实地认证</a><?php }?>
                    </div>
				</div>
			</div>
			<?php if ($approve['prove']||$approve['local']) {?>
			 <div class="box-main">
				<h2 class="bm-hd">工商注册信息（该信息于<?php echo CSCHelper::setDefault($approve['realName']['approveTime']);?>通过众信专业验证）</h2>
				<div class="bm-bd gszc-info-bd">
					<table class="shop-lr-tbl">
                    	<tbody>
                            <tr>
                                <th>企业名称</th>
                                <td><?php echo CSCHelper::setDefault($approve['prove']['company']['NAME']);?></td>
                                <th>工商注册号</th>
                                <td><?php echo CSCHelper::setDefault($approve['prove']['company']['licenseNo']);?></td>
                            </tr>
                            <tr>
                                <th>注册资本</th>
                                <td><?php echo CSCHelper::setDefault($approve['prove']['company']['regCap']);?></td>
                                <th>组织机构代码</th>
                                <td><?php echo CSCHelper::setDefault($approve['prove']['company']['regNo']);?></td>
                            </tr>
                            <tr>
                                <th>登记机关</th>
                                <td><?php echo CSCHelper::setDefault($approve['realName']['regAuhtority']);?></td>
                                <th>成立日期</th>
                                <td><?php echo CSCHelper::setDefault($approve['prove']['company']['estDate']);?></td>
                            </tr>
                            <tr>
                                <th>营业期限</th>
                                <td><?php echo CSCHelper::setDefault($approve['prove']['company']['licExpDate']);?></td>
                                <th>法定代表</th>
                                <td><?php echo CSCHelper::setDefault($approve['prove']['company']['lerep']);?></td>
                            </tr>
                            <tr>
                                <th>经营范围</th>
                                <td><?php echo CSCHelper::setDefault($approve['prove']['company']['bizScope']);?></td>
                                <th>企业类型</th>
                                <td><?php echo CSCHelper::setDefault($approve['prove']['company']['entType']);?></td>
                            </tr>
                            <tr>
                                <th>注册地址</th>
                                <td class="last" colspan="3"><?php echo CSCHelper::setDefault($approve['prove']['company']['regAddress']);?></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="crtfd-bz"></div>
				</div>
			</div>			
            <?php }elseif ($approve['realName']){?>
           			<div class="box-main">
				<h2 class="bm-hd">企业实名认证</h2>
				<div class="bm-bd">
					<ul class="g-c-f auth-identity">
						<li> <strong>企业名称：</strong>
							<p>
								<?php echo CSCHelper::setDefault($approve['realName']['enterpriseName']);?>
							</p>
						</li>
						<li> <strong>企业类型：</strong>
							<p>
								<?php echo CSCHelper::setDefault($approve['realName']['companyType']);?>
							</p>
						</li>
						<li> <strong>法定代表人：</strong>
							<p>
								<?php echo $approve['realName']['legalPerson'];?>
							</p>
						</li>
						<li> <strong>营业执照注册地：</strong>
							<p>
								<?php echo $approve['realName']['licenseProvince'].$approve['realName']['licenseCity'].$approve['realName']['licenseAddress'];?>
							</p>
						</li>
						<li> <strong>认证日期：</strong>
							<p>
								<?php echo CSCHelper::setDefault($approve['realName']['approveTime']);?>
							</p>
						</li>
						<li> <strong>成立日期：</strong>
							<p>
								<?php echo CSCHelper::setDefault($approve['realName']['registerDate']);?>
							</p>
						</li>
						<li class="scope"> <strong>经营范围：</strong>
							<p>
								<?php echo CSCHelper::setDefault($approve['realName']['scope']);?>
							</p>
						</li>
					</ul>
				</div>
			</div>
            <?php }?> <?php if ($approve['prove']||$approve['local']) {?>
            <div class="box-main">
				<h2 class="bm-hd">企业身份认证信息</h2>
				<div class="bm-bd sfrz-info-bd">
					<dl>
                    	<dt>本旺铺已经于<?php echo CSCHelper::setDefault($approve['prove']['passTime'])?>通过企业身份验证。</dt>
                        <dd><span>验证方式：<?php echo ($approve['prove'])?'二次鉴权验证':'实地认证'; ?> </span><span class="khh"><?php if (isset($approve['prove']['bankinfo']['bank'])) echo '开户行：'.CSCHelper::setDefault($approve['prove']['bankinfo']['bank'])?></span></dd>
                    </dl>
				</div>
			</div>
			<?php }?>
            <?php if ($approve['local']) {?>
			<div class="box-main">
				<h2 class="bm-hd">企业实地认证信息</h2>
				<div class="bm-bd sdrz-info-bd">
					<iframe src="http://shidi.ebs.org.cn/enterprise/realvalidationdetailpart?mainid=<?php echo $approve['ebsId']?>" width="750" height="1000" frameborder=0 style="margin:0;padding:0;"> 
				</iframe>
				</div>
			</div>
			<?php }?>
		</div>
		<div class="item_resd">
		<?php if(ShopHelper::XmlCallBack('shopBooks')){?>
			<div class="box-main honor">
				<h2 class="bm-hd">企业资质类认证</h2>
				<div class="bm-bd">
					<ul class="g-c-f honor-list">
						<?php 
						$auth1	=	false;	// 判断是否有资质类认证 
						foreach (ShopHelper::XmlCallBack('shopBooks') as $value){
							if (CSCHelper::def($value, 'bookType')==5) continue;
							$auth1	= $auth1? $auth1:true; 
						?>
						<li> <img src="<?php echo ShopHelper::image($value['bookUrl'])?>" width="200" height="200" alt="<?php echo CSCHelper::setDefault($value['bookName'])?>" /> 证书名称：<span>
							<?php echo CSCHelper::setDefault($value['bookName'])?>
							</span> <br />
							发证机构：<span>
							<?php echo CSCHelper::setDefault($value['agency'])?>
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
						foreach (ShopHelper::XmlCallBack('shopBooks') as $value){
							if (CSCHelper::def($value, 'bookType')!=5) continue;
							$auth2	= $auth2? $auth2:true; 
						?>
						<li> <img src="<?php echo ShopHelper::image($value['bookUrl'])?>" width="200" height="200" alt="<?php echo CSCHelper::setDefault($value['bookName'])?>" /> 证书名称：<span>
							<?php echo CSCHelper::setDefault($value['bookName'])?>
							</span> <br />
							发证机构：<span>
							<?php echo CSCHelper::setDefault($value['agency'])?>
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
	</div>
	<script>
	seajs.use(csc.url("res","/f=js/m/tab"),function(){
	csc.tab("ul.tit_imt>li","div.item_resd","click");
	});
</script>
	<div class="sub"><?php CSCHelper::widgets(array('Company'));?></div>

</div>
