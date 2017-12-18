define(function(require, exports, module) {
	module.exports = function($form){
		$form = $form || $('form[data-autocomplete]');
		var arr = location.search.slice(1).split("&"),
		tmp;
		for(var i in arr){
			tmp = arr[i].split('=');
			tmp[1] = $.trim(decodeURIComponent((tmp[1]||'').replace(/\+/g,' ')));
			if(tmp[1] != ''){
				$form.find('[name="'+tmp[0]+'"]').val(tmp[1]);
			}
		}
	}

});