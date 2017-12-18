/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('link', function(K) {
	var self = this, name = 'link',
		untarget = self.untarget || false,
		filterLink = self.filterLink || false,
		domains = self.passDomains || ["csc86.com"],
		inDomains = function(url){
			var u;
			for(u in domains){
				var reg = new RegExp("^(http||https):\\/\\/([^\\s\\/\\?\\#]+\\.)?"+domains[u].replace(".","\\.")+"([\\?\\/#][^\\s]*)?$","ig");
				if(reg.test(url)){
					return true;
				}
			}
			return false;
		}; 
	self.plugin.link = {
		edit : function() {
			var lang = self.lang(name + '.'),
				html = '<div style="padding:20px;">' +
					//url
					'<div class="ke-dialog-row">' +
					'<label for="keUrl" style="width:60px;">' + lang.url + '</label>' +
					'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:260px;" />' +
					(filterLink?'<p style="padding-left:65px;" title="如果您插入其他链接，在您提交后链接将会失效！">仅支持链接地址为：'+domains.join(" , ")+' 的华南城网站内链接。</p>':'') +
					'</div>' + 
					//type
					'<div class="ke-dialog-row"'+ (untarget?' style="display:none">':'>') +
					'<label for="keType" style="width:60px;">' + lang.linkType + '</label>' +
					'<select id="keType" name="type"></select>' +
					'</div>' +
					'</div>',
				dialog = self.createDialog({
					name : name,
					width : 450,
					title : self.lang(name),
					body : html,
					yesBtn : {
						name : self.lang('yes'),
						click : function(e) {
							var url = K.trim(urlBox.val());
							if (url == 'http://' || K.invalidUrl(url) || (filterLink && !inDomains(url))){
								alert(self.lang('invalidUrl'));
								urlBox[0].focus();
								return;
							}
							self.exec('createlink', url, typeBox.val()).hideDialog().focus();
						}
					}
				}),
				div = dialog.div,
				urlBox = K('input[name="url"]', div),
				typeBox = K('select[name="type"]', div);
			urlBox.val('http://');
			typeBox[0].options[0] = new Option(lang.newWindow, '_blank');
			//typeBox[0].options[1] = new Option(lang.selfWindow, '');
			self.cmd.selection();
			var a = self.plugin.getSelectedLink();
			if (a) {
				self.cmd.range.selectNode(a[0]);
				self.cmd.select();
				urlBox.val(a.attr('data-ke-src'));
				typeBox.val(a.attr('target'));
			}
			urlBox[0].focus();
			urlBox[0].select();
		},
		'delete' : function() {
			self.exec('unlink', null);
		}
	};
	self.clickToolbar(name, self.plugin.link.edit);
});
