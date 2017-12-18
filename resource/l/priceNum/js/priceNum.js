/*价钱和数量相关js*/
define(function(require, exports, module){
	var priceNum={
		//获取对应数量的价格
		rangePrc: function (l, n) {
		  if (l && l.length) {
			  for (var m = 0; m < l.length; m++) {
				  if (m === 0 && n < l[m][0]) {
					  return l[m][1];
				  }
				  if (m < l.length - 1 && n >= l[m][0] && n < l[m + 1][0]) {
					  return l[m][1];
				  }
				  if (m === l.length - 1 && n >= l[m][0]) {
					  return l[m][1];
				  }
			  }
		  }
		},
		//转换价钱格式(使价钱转换为带都号的格式，如将1000转为1,000)
		formatPrc: function (s) {
			var s = s.toString().split(",").join("");
			if (/[^0-9\.]/.test(s)) return "invalid value";
			s = s.replace(/^(\d*)$/, "$1.");
			s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
			s = s.replace(".", ",");
			var re = /(\d)(\d{3},)/;
			while (re.test(s)) {
				s = s.replace(re, "$1,$2");
			}
			s = s.replace(/,(\d\d)$/, ".$1");
			return s.replace(/^\./, "0.");
		},
		//恢复价钱格式与前面formatPrc刚好相反
		reFormatPrc:function(s){
			var s = s.toString().split(",").join("");
			return s;
		},
		//保留两位小数
		fixTwo:function(num){
			num=num+'';//将num转换为string类型
			var arry=num.split('.'),
				len=arry.length;
			if(len==1||(len==2&&arry[1]=="")){
				arry[1]="00";
			}
			if(len==2&&arry[1].length==1){
				arry[1]=arry[1]+'0';
			}
			return arry.join(".");
		},
		//数量加减相关js
		addPlut:{
			opts:{//默认参数
				obj:null,//实际用的时候此项不可为空
				minNum:1,
				maxNum:999999
			},
			plut:function(options){//数量减法
				var opts=priceNum.addPlut.opts;
				opts=$.extend({},opts,options);
				var $this=opts.obj,
					minNum=opts.minNum,
					maxNum=opts.maxNum,
					$numipt = $this.next('.ipt-txt'),
					num = $numipt.val() * 1 - 1;
				num = num <= minNum ? minNum : num;
				if(num<minNum+1){
					$this.removeClass().addClass('no-plut-opt');
				}
				if(num<maxNum){
					$this.siblings('.no-add-opt').removeClass().addClass('add-opt');
				}
				$numipt.val(num);
				return num;
			},
			add:function(options){//数量加法
				var opts=priceNum.addPlut.opts;
				opts=$.extend({},opts,options);
				var $this=opts.obj,
					minNum=opts.minNum,
					maxNum=opts.maxNum,
					$numipt = $this.prev('.ipt-txt'),
					num = $numipt.val() * 1 + 1;
				if(num>minNum){
					$this.siblings('.no-plut-opt').removeClass().addClass('plut-opt');	
				}
				if(num>=maxNum){
					num=maxNum;
					$this.removeClass().addClass('no-add-opt');
				}
				$numipt.val(num);
				return num;
			},
			iptKeyUp:function(options){//加减法中的文本框按下键盘时
				var opts=priceNum.addPlut.opts;
				opts=$.extend({},opts,options);
				var $this=opts.obj,
					minNum=opts.minNum,
					maxNum=opts.maxNum,
					$plutOpt=$this.prev(),
					$addOpt=$this.next(),
					val=$this.val();
				$this.val(val.replace(/\D/g,''));
				var num=$this.val();
				if(parseInt(num)===0){
					num=minNum;
				}
				if(num>=maxNum){
					num=maxNum;
					$addOpt.removeClass().addClass('no-add-opt');
				}else{
					$addOpt.removeClass().addClass('add-opt');	
				}
				if(num>minNum){
					$plutOpt.removeClass().addClass('plut-opt');	
				}else{
					$plutOpt.removeClass().addClass('no-plut-opt');	
				}
				$this.val(num);
				return num;	
			},
			iptBlur:function(options){//加减法中的文本框失去焦点时
				var opts=priceNum.addPlut.opts;
				opts=$.extend({},opts,options);
				var $this=opts.obj,
					minNum=opts.minNum,
					maxNum=opts.maxNum,
					$addOpt=$this.next(),
					val=$this.val(),
					defaultVal=$this.data('default')?$this.data('default'):val;
				$this.val(val.replace(/\D/g,''));
				var num=$this.val();
				if(!num){
					num=defaultVal;
				}
				if(num>=maxNum){
					num=maxNum;
					$addOpt.removeClass().addClass('no-add-opt');
				}else{
					$addOpt.removeClass().addClass('add-opt');	
				}
				$this.val(num);
				return num;	
			}
		}
	};
	module.exports=priceNum;
});