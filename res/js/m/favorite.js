//收藏

csc.faving = false;

csc.signFavorite = function(id, fun, type) {
	this.favoriteId = id;
	this.favoriteType = type || "product";
	this.favoriteFun = fun || function() {};
	var othis = this;
	seajs.use(othis.url("res", "/f=js/m/sign"), function() {
		othis.checkSign("csc.favorite");
	});
};

csc.favorite = function() {
	if (csc.faving) return;
	csc.faving = true;
	this.signDialogClose(csc.shop ? "shop" : true);
	var
		othis = this,
		url = csc.url("api", "/favorites/savefor" + (othis.favoriteType == "product" ? "goods" : "shop") + ".html"),
		data = othis.favoriteType == "product" ? {
			gid: othis.favoriteId
		} : {
			memberid: othis.favoriteId
		};
	$.get(url, data, function(data) {
		csc.faving = false;
		if (data.status || data.msg.indexOf("收藏过") > -1) {
			othis.favoriteFun();
		} else {
			othis.useDialog(function() {
				othis.tip(data.msg);
			});
		}
	}, "jsonp");
};