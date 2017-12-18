csc.search = {};
$(function (){
	seajs.use(csc.url("res","/f=js/m/focus"),function (){
		csc.focus("#advancedSearch .txt","txt2");
	});
	$("#advancedSearch").on("submit",function (){
		var
			$t = $(this),
			sortArr=[['province','area'],['city','city'],['selectOneCate','categoryId'],['selectTwoCate','twoCategoryId'],['businessType','businessType']];
		if(!$.trim($t.find("input[name='q']").val())){
			alert('请输入搜索关键词！');
			return false;
		}
		function _traversal(selector){
			$.each(selector,function(i){
				var
					si = selector[i],
					$si = $('#'+si[0]),
					$select = $si.find(":selected"),
					_text = $select.text(),
					_val = $select.val(),
					__val = (i<2) ? _text : _val;
				if($si.val() != 's'){
					$t.append('<input name=' + si[1] +' type="hidden" value="'+__val +'" />');
				}
			});
		}
		_traversal(sortArr);
		cscga('create', 'SU-10001-1', 'auto','searchTracker');
		cscga('searchTracker.require', 'cscplugin',{
			searchKeyWord:$t.find("input[name='q']").val(),
			province:$('#province').val(),
			city:$('#city').val(),
			proFirstCat:$('#selectOneCate').val(),
			proSecCat:$('#selectTwoCate').val(),
			businessType:$('#businessType').val(),
			eventAction:'searchSuccess'
		});
		cscga('searchTracker.cscplugin:searchInit');
	});
});