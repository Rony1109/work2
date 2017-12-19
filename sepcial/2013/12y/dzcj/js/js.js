// 电子频道全新上线专题 2013.11.29 by lg
var scrollTop={//滚动列表
	move : function(str,t){
		var $id = $(str);
		$id.children().first().animate({marginTop:-27},(t-100),function(){
			$(this).appendTo($id).css("margin-top",0);
		})
	},
	start : function(str,t){
		var t = t || 1000 , loop = window.setInterval("scrollTop.move("+str+","+t+")",t);
		return loop;
	}
};

function vest(){
	$.get(csc.url("api","/ec/index?event=8&ajax"),function(data){
		$("#scrollList").empty();
		var djs = ['', "一等奖","二等奖","三等奖","四等奖","五等奖","六等奖","七等奖","八等奖","九等奖"];
		for(var i in data){
			var time = new Date(data[i].wintime*1000);
			var t	= (time.getMonth()+1)+"月"+time.getDate()+"日";
			arrs	= data[i].wininfo.split(":");
			dj		= djs[arrs[0]];
			info	= arrs[1];
			$("#scrollList").append("<div><span>"+data[i].winners+"</span><span class='sls'>"+dj+":"+info+"</span><span>"+t+"</span></div>");
		}
	},"jsonp");
};

var game1= $("#game1");
(function(win){
	vest();
	scrollTop.start("'#scrollList'");//滚动列表
	var $xc,$go=0,game1 = {} , pid , eid , mid,
		$DL={
			"0":[4,"还差一点点就中奖了，每天都有一次机会，明天再来吧！"],
            "7":[9,"5000元广告资源"],
            "3":[0,"30000元广告资源"],
            "9":[1,"1000元广告资源"],
            "2":[2,"50000元广告资源"],
            "4":[3,"20000元广告资源"],
            "1":[5,"100000元广告资源"],
            "6":[7,"12000元广告资源"],
            "5":[10,"15000元广告资源"],
            "8":[11,"3000元广告资源"]
		};
	game1.play = function(x){
		var o = this;
		if($go){
			//alert("正在抽奖,请稍等！");
			return false;
		};
		clearTimeout($xc);
		this.cc = $("table.game_t");
		this.nx = this.cc.find("tr:eq(0)>td").length;
		this.ny = this.cc.find("tr").length;
		this.sd = 60;
		this.cs = 0;
		this.thisk = [0,0];
		this.thiso;
		this.cs=0;
		this.kjbm = 0;
		setTimeout(function(){
		$.get("http://api.csc86.com/ec/draw?event=8&ajax",function(data){
			switch(data.No){
				case 	-1:
					csc.useDialog(function(){
						seajs.use(csc.url("res","/f=js/m/sign"),function(){
							csc.checkSign("location.reload");
						});
					});
				break;
				case 	-2:
					alert("亲，活动已结束！");
				break;
				case 	-3:
					alert("亲，活动已结束！");
				break;
				case 	-4:
					alert("亲，活动还未开始！");
				break;
				case 	-6:
					alert("您已经抽过了，每天都有一次机会，明天再来吧！");
				break;
				case 	-7:
					o.jp = $DL["0"] || $DL[0];
					o.cs_max = 108 + (4*12) + (o.jp[0]-0);
					o.cs_f = o.cs_max - 20;
					$go=1;
					o.aa.call(o);
				break;
				case 	0:
					o.jp = $DL["0"] || $DL[0];
					o.cs_max = 108 + (4*12) + (o.jp[0]-0);
					o.cs_f = o.cs_max - 20;
					$go=1;
					o.aa.call(o);
				break;
				case 	1:
					o.jp = $DL[data.data.prizename] || $DL[0];
					o.cs_max = 108 + (4*12) + (o.jp[0]-0);
					o.cs_f = o.cs_max - 20;
					$go=1;
					o.aa.call(o);
				break;
				default:
				break;
			}
		},"jsonp");
		},10)
		return false;
	};
game1.splet = function(){
	var o = this;
	if(this.cs>this.cs_f){
		//this.sd += (((this.cs)*1.3)/4<<0);
		this.sd += ((this.sd+50)*0.1)<<0;
	}else if(this.cs<20){
		this.sd -=2;
	}else if(this.cs>o.cs_max-100){
		this.sd += 1;
	};
	$(this.thiso).removeClass("s");
	this.thiso = this.cc.find("tr").eq(this.thisk[0]).find("td").eq(this.thisk[1]).addClass("s");
	this.thisk = function(){
		if(o.thisk[0] == 0){
			if(o.thisk[1] < o.nx-1){
				return [o.thisk[0],o.thisk[1]+1];
			}else{
				return [o.thisk[0]+1,o.nx-1];
			}
		}else if(o.thisk[0] == o.ny-1){
			if(o.thisk[1]>0){
				return [o.thisk[0],o.thisk[1]-1];
			}else{
				return [o.thisk[0]-1,0];
			}
		}else{
			if(o.thisk[1] == 0){
				return [o.thisk[0]-1,0];
			}else{
				return [o.thisk[0]+1,o.nx-1];
			}
		}
	}();
};
game1.aa = function(){
	var o = this;
	if(o.cs >= o.cs_max){
		if(o.jp[0]==$DL["0"][0]){
			showgame_msg(o.jp[1]);
		}else{
			showgame_msg('太棒了！恭喜您抽中了'+o.jp[1]+'！请尽快完善资料，方便准确兑奖！');
			vest();
		};
		$go = 0;
		return;
	};
	//if($go==2){$go = 0; return;};
	this.splet();
	$xc = setTimeout(function(){o.aa.call(o);o.cs++;},o.sd);
};
function apd(str){}
var showgame_msg = function(str){
	alert(str);
};
win.game1 = game1;
})(window);
