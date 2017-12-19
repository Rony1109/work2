var dialog = {
	open : function(html){
		var art = $('<aside class="dialog g-dn"><table class="dialog-content"><tr><td><div class="dialog-frame g-pr"><div class="dialog-frame-cont">'+html+'</div><div onclick="dialog.close()" class="close"></div></div></td></tr></table><div class="dialog-shadow"></div></aside>');
		if( $("body").find("aside.dialog").length < 1 ){
			$("body").append(art);
		}$("aside.dialog").fadeIn();
	},
	close : function(art){
		var art = art || ".dialog";
		$(art).remove();
	}
}

var dialog2 = {
	open : function(html){
		var art = $('<aside class="dialog g-dn"><table class="dialog-content"><tr><td><div class="dialog-frame"><div class="dialog-frame-cont">'+html+'</div></div></td></tr></table><div class="dialog-shadow"></div></aside>');
		if( $("body").find("aside.dialog").length < 1 ){
			$("body").append(art);
		}$("aside.dialog").fadeIn();
	},
	close : function(art){
		var art = art || ".dialog";
		$(art).remove();
	}
}