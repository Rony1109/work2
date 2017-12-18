define(function(require, exports, module) {
    var goPage = require("m/jsM/page");   
    $(".af-page").delegate("input.afp-text","keyup",function(){
		var $t = $(this);
		$t.val($t.val().replace(/\D/g,''));
		if($t.val() == 0){
			$t.val('');
		}
	});
    
    $(".af-page").delegate("form","submit",function(event) {
        var val = $(this).find(".afp-text").val();
        if(val != ''){
            goPage.page($(this));
        }
        $("div.afp-box").hide();
        return false;
    });
    $(".af-page").delegate(".turn","click",function(event) {
    	goPage.afPage($(this));
    	return false;
    }); 

});