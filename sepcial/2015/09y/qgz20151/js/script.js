

function loopScroll() {	
	return loopScroll.prototype.init.apply(this, arguments);		
}
loopScroll.prototype.init = function () {
	var arg = arguments[0],
		clones,
		that = this;
		
	that.obj = $("#" + arg.id);
	that.num = that.obj.find("li").length;		
	if (that.num <= 3) return;
	that.count = 20;
	that.topVal = that.count;
	that.list = that.obj.find("ul");		
	clones = that.list[0].cloneNode(true);		
	that.obj.append(clones);
	that.move();
	
	that.obj.find("a").hover(function () {
		clearInterval(that.time);
	},function () {
		that.move();
	});
	
};
loopScroll.prototype.move = function () {
	var _this = this;
	this.time = setInterval(function () {
		if (_this.topVal == 0 ){
			_this.obj.scrollTop(0);
		} else {
			_this.obj.animate({"scrollTop": _this.topVal}, 500);
		}
		_this.topVal += _this.count;
		if (_this.topVal > _this.num * _this.count) {
			_this.topVal = 0;				
		}				
	}, 3000);
};




function BanScroll() {		
	return BanScroll.prototype.init.apply(this, arguments);
}
BanScroll.prototype.init = function () {
	var arg = arguments[0],
		that = this.that = this;
		
	that.obj = $("#" + arg.id);
	that.left = that.obj.find("." + arg.left);
	that.right = that.obj.find("." + arg.right);
	that.banShow = that.obj.find("." + arg.banShow);
	that.banShowLi = that.banShow.find("li");
	that.list = that.obj.find("." + arg.list);
	that.banListLis = that.list.find("li");
	that.banCur = that.obj.find("." + arg.banCur);
	that.bcTop = parseInt(that.banCur.height() + 7);
	that.showIndex = 0;
	that.curIndex = 0;

	that.banShowLi.eq(0).css("display", "block");
	
	if (that.banListLis.length < 2) return;
	that.right.on("click", function () {
		that.rightMove();
	});
	that.left.on("click", function () {		
		that.leftMove();
	});
	
	that.autoPlay();
	
	that.banListLis.hover(function () {
		var $this = $(this);
		
		clearTimeout(that.tms);
		clearTimeout(that.timer);
		that.tms = setTimeout(function () {
			that.showIndex = $this.index();
			that.banShowLi.css("display", "none");
			that.banShowLi.eq(that.showIndex).css("display", "block");
			
			if (that.moveNum >= 1) {		
				that.curIndex = that.showIndex - that.moveNum;
			} else {
				that.curIndex = that.showIndex;
			}
			that.banCur.css("marginTop", that.curIndex * that.bcTop);
		}, 500);
	},function () {
		that.autoPlay();
		clearTimeout(that.tms);
	});
		
};

BanScroll.prototype.autoPlay = function () {
	var $this = this;
	this.timer = setInterval(function () {
		$this.rightMove();
	}, 5000);
};
BanScroll.prototype.leftMove = function () {
	clearInterval(this.timer);
	if (this.showIndex == 0) {
		this.curIndex = this.banShowLi.length - 1 > 3 ? 3 : this.banShowLi.length - 1;
	} else if (this.showIndex <= 3){
		this.curIndex = this.curIndex <= 0 ? 0 : --this.curIndex;
	} else {
		this.curIndex = 3;	
	}

	this.banCur.css("marginTop", this.curIndex * this.bcTop);
	
	this.banShowLi.css("display", "none");
	this.showIndex = this.showIndex <= 0 ? this.banListLis.length - 1 : --this.showIndex;
	this.banShowLi.eq(this.showIndex).css("display", "block");		
	
	
	if (this.banListLis.length > 4) {	
		if (this.showIndex > 3) {
			this.moveNum = this.showIndex - 3;
		} else {
			this.moveNum = 0;
		}
		
		this.list.animate({"scrollTop": this.moveNum*102}, 300);
	}
	this.autoPlay();
}
BanScroll.prototype.rightMove = function () {
	clearInterval(this.timer);
	if (this.showIndex >= this.banShowLi.length - 1){
		this.curIndex = 0;
	} else if (this.showIndex >= 3){
		this.curIndex = 3;
	} else {
		this.curIndex = this.curIndex >= 4 ? 0 : ++this.curIndex;	
	}
	
	this.banCur.css("marginTop", this.curIndex * this.bcTop);
	
	this.banShowLi.css("display", "none");
	this.showIndex = this.showIndex >= this.banShowLi.length - 1 ? 0 : ++this.showIndex;
	this.banShowLi.eq(this.showIndex).css("display", "block");		
	
		if (this.banListLis.length > 4) {			
		
		if (this.showIndex >= 3) {
			this.moveNum = this.showIndex - 3;
		} else {
			this.moveNum = 0;
		}
		this.list.animate({"scrollTop": this.moveNum*102}, 300);
	}
	this.autoPlay();
};

