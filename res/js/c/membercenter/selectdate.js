 (function(win){
	 var win=win;
	 function init(){
		$("#datetips").addClass("g-d-n").html("");
	 }
	 function selectyear(){
		var year=Number($("#year").val());
		if(isNaN(year)){
			$("#datetips").removeClass("g-d-n").html("请选择");
			return;
		} 
	 }
	 function selectmonth(){
		var month=Number($("#month").val());
		if(isNaN(month)){
			$("#datetips").removeClass("g-d-n").html("请选择");
			return false;
		} 
	 }
	 function showdate(month){
		var $date=$("#date"),
			tmp = '<option>请选择</option>',
			year=Number($("#year").val());
		switch(month){
		 case 1:
		 case 3:
		 case 5:
		 case 7:
		 case 8:
		 case 10:
		 case 12:
		 for(var i=1;i<=31;i++){
		 	tmp += '<option value="'+i+'">'+i+'</option>';
		 }
        	  break;
			 case 4:
			 case 6:
			 case 9:
			 case 11:
			 for(var i=1;i<=30;i++){
				 tmp += '<option value="'+i+'">'+i+'</option>';
			 }
        	 break;
			 case 2:
			 if((year%4==0 && year%100!=0)||(year%100==0 && year%400==0)){
				 for(var i=1;i<=29;i++){
					 tmp += '<option value="'+i+'">'+i+'</option>';
				 }
			 }else{
					 for(var i=1;i<=28;i++){
						 tmp += '<option value="'+i+'">'+i+'</option>';
					 }  
			 }
			 break;
			 default:
				 for(var i=1;i<=31;i++){
					 tmp += '<option value="'+i+'">'+i+'</option>';
				 }
				 break;
			 } 
		$date.html(tmp);
     }
	 function sDate(){
		this.changeyear =function(){
			init();
			var month=$("#month").val();
			if(month!="请选择"){
				showdate(Number(month))
			}
		}
		this.changemonth=function(){
		    init();
			selectyear();
			var month=$("#month").val();
			showdate(Number(month));
		}
		this.changedate=function(){
			//init();
			//selectyear();
			//selectmonth();
		} 
     };
	  win["csc"]["sdate"]=new sDate();
 })(window)
 
$(function(){ 
	 var
	 	date=new Date(),
	 	year=date.getFullYear(),
	 	d=$.trim($("#sdate").val()),
	 	tmpYear= '请选择',
	 	tmpMonth= '请选择',
	 	$year = $("#year"),
	 	$month = $("#month"),
	 	$date = $("#date");
	 for(var i=1940;i<=year;i++){
	 	tmpYear += '<option value="'+i+'">'+i+'</option>';
	 }
	 for(var i=1;i<=12;i++){
		 tmpMonth += '<option value="'+i+'">'+i+'</option>';
	 }
	$year.html(tmpYear);
	$month.html(tmpMonth);
	if(d.length>0){
		var arr = d.split("-");
		setTimeout(function (){$year.val(arr[0])},10);
		setTimeout(function (){$month.val(Number(arr[1]))},10);
		csc.sdate.changemonth();
		setTimeout(function (){$date.val(Number(arr[2]))},10);
	}
	 $year.bind("change",csc.sdate.changeyear);
	 $month.bind("change",csc.sdate.changemonth);
	 $date.bind("change",csc.sdate.changedate);	
})