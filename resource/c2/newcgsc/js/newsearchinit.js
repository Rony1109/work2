define(function(require, exports, module) {
	var ph = require('m/sea-modules/placeholder');
	ph.placeholder('#search-txt');
	$.fn.extend({
		Search: function() {
			$(this).find('form').on("submit", function() {
				var
					$q = $(this).find("input[name='q']"),
					val = $.trim($q.val()),
					arr = ["请输入公司名称或关键词", "请输入产品名称"];
				if (val.length == 0 || $.inArray(val, arr) != -1) {
					$q.trigger("focus");
					return false;
				}
				cscga('create', 'SU-10001-1', 'auto','searchTracker');
				cscga('searchTracker.require', 'cscplugin',{
					searchKeyWord:val,
					eventAction:'searchSuccess'
				});
				cscga('searchTracker.cscplugin:searchInit');
			});
			this._SearchSwitch($(this));
			require('c2/newcgsc/js/newsearchComplete.js');
    		$('.search_txt').SearchComplete();
		},
		_SearchSwitch: function($parent) {
			var arr = ["请输入产品名称", "请输入公司名称"];
			var url = ['//search.csc86.com/selloffer/products.html', '//search.csc86.com/company/company.html']
			var $ch_search = $parent.find('.search_txt');
			var $form = $parent.find('form')
			$parent.find('.ch_search').on('click', 'a', function() {
				var index = $parent.find('.ch_search').find('a').index(this);
				var $input = '<input type="text" id="search-txt" maxlength="50" autocomplete="off" value="" placeholder="' + arr[index] + '" name="q" class="txt">';
				$(this).addClass('ared').siblings('a').removeClass('ared');
				$form.attr('action', url[index]);
				$ch_search.html($input);
				ph.placeholder('#search-txt');
				return false
			});
		}
	});
	$('.g_search').Search();
});