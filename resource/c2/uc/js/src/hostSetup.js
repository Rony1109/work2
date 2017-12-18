// 会员中心2.0新旧版切换时，相关接口换了临时域名，在此统一对需更换的的域名做映射2015-12-08
  if (!!window.$) {
  	$.ajaxSetup({
	    beforeSend: function (xhr) {
	    	var host = location.host;
	    	if (host === 'my.csc86.com') {
	    		this.url = this.url.replace('i.csc86.com', 'my.csc86.com');
	    	}
	    	if (host === 'work.csc86.com') {
	    		this.url = this.url.replace('member.csc86.com', 'work.csc86.com');
	    	}
	    	if (host === 'tongji.csc86.com') {
	    		this.url = this.url.replace('statistics.csc86.com', 'tongji.csc86.com');
	    	}
	    	if (host === 'renzheng.csc86.com') {
	    		this.url = this.url.replace('approve.csc86.com', 'renzheng.csc86.com');
	    	}
	    	if (host === 'xunpan.csc86.com') {
	    		this.url = this.url.replace('inquiry.csc86.com', 'xunpan.csc86.com');
	    	}
	    }
	});
  }
