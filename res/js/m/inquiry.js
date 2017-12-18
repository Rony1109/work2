csc.signInquiry = function (id){
	var	othis = this;
	othis.inquiryId = id;
	seajs.use(othis.url("res","/f=js/m/sign"),function (){
		othis.checkSign("csc.inquiry");
	});
};

csc.inquiry = function (){
	var	othis = this;
	othis.signDialogClose();
	location.href = othis.url("jiaoyi","/inquiry/publish/?proid=" + othis.inquiryId);
};