/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-11-04 21:54:47
 * @version $Id$
 */
var calUtil = {
	getDaysInmonth: function(iMonth, iYear) {//返回月份天数
		var dPrevDate = new Date(iYear, iMonth, 0);
		return dPrevDate.getDate();
	},
	bulidCal: function(iYear, iMonth) {
		var aMonth = {};
		aMonth[0] = new Array(7);
		aMonth[1] = new Array(7);
		aMonth[2] = new Array(7);
		aMonth[3] = new Array(7);
		aMonth[4] = new Array(7);
		aMonth[5] = new Array(7);
		aMonth[6] = new Array(7);
		var dCalDate = new Date(iYear, iMonth - 1, 1);
		var dCalNextDate=new Date(iYear, iMonth, 1);
		var dCalPreDate=new Date(iYear, iMonth-2, 1);
		var iDayOfFirst = dCalDate.getDay();//返回 0（周日） 到 6（周六） 之间的一个整数
		var iDatNextOfFirst=dCalNextDate.getDay();
		var iDatPreOfFirst=dCalPreDate.getDay();
		var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);//月份总数
		var iDaysInNextMonth=calUtil.getDaysInmonth(iMonth+1, iYear);
		var iDaysInPreMonth=calUtil.getDaysInmonth(iMonth-1, iYear);
		var iVarDate =1, iVarNext=1;//每月号的初始值
		var iVarPre=iDayOfFirst==0?iDaysInPreMonth-6:iDaysInPreMonth-iDayOfFirst+1;
		var d, w;
		aMonth[0][0] = "日";
		aMonth[0][1] = "一";
		aMonth[0][2] = "二";
		aMonth[0][3] = "三";
		aMonth[0][4] = "四";
		aMonth[0][5] = "五";
		aMonth[0][6] = "六";
		for (d = 0; d < 7; d++) {
			if(d<iDayOfFirst){
				aMonth[1][d]=iVarPre+"-"+(iMonth-1);
				iVarPre++;
			}else{
				aMonth[1][d] = iVarDate+"-"+iMonth;
				iVarDate++;
			}
			
		}
		for (w = 2; w < 7; w++) {
			for (d = 0; d < 7; d++) {
				if (iVarDate <= iDaysInMonth) {
					aMonth[w][d] = iVarDate+"-"+iMonth;
					iVarDate++;
				}else{
					aMonth[w][d]=iVarNext+"-"+(iMonth +1);
					iVarNext++;
				}
			}
		}
		return aMonth;

	},
	ifHasSigned: function(signList,mh,yr,day) {
		var signed = false;
		$.each(signList, function(index, item) {
			var year=item.split("-")[0],month=item.split("-")[1],d=item.split("-")[2];
			if(year==yr && month==mh && d==day ){
				signed=true;
			}
		});
		return signed;
	},
	drawCal: function(iYear, iMonth) {
		var myMonth = calUtil.bulidCal(iYear, iMonth);
		var htmls = new Array();
		var current = new Date();
		// current.setMonth(1,5);
		var currentdat=current.getDate(),currentMonth=current.getMonth() +1;
		htmls.push("<div class='sign_main' id='sign_layer'>");
		htmls.push("<div class='sign_succ_calendar_title'>");
		// htmls.push("<div class='calendar_month_next'> </div>");
		// htmls.push("<div class='calendar_month_prev'> </div>");
		htmls.push("<div class='calendar_month_span'>"+iYear+"年"+iMonth+"月"+currentdat+"日</div>");
		htmls.push("</div>");
		htmls.push("<div class='sign' id='sign_cal'>");
		htmls.push('<table data-month="'+iMonth+'">');
		htmls.push("<tr>");
		htmls.push("<th>" + myMonth[0][0] + "</th>");
		htmls.push("<th>" + myMonth[0][1] + "</th>");
		htmls.push("<th>" + myMonth[0][2] + "</th>");
		htmls.push("<th>" + myMonth[0][3] + "</th>");
		htmls.push("<th>" + myMonth[0][4] + "</th>");
		htmls.push("<th>" + myMonth[0][5] + "</th>");
		htmls.push("<th>" + myMonth[0][6] + "</th>");
		htmls.push("</tr>");
		
		var d, w,i=1;
		for (w = 1; w < 6; w++) {
			htmls.push("<tr>");
			for (d = 0; d < 7; d++) {
				var strnum=myMonth[w][d],daynum=strnum.split("-")[0],monthnum=strnum.split("-")[1];
				 if(currentMonth==monthnum){
				 	if(currentdat==daynum){
				 		htmls.push('<td class="cur c'+monthnum+'-'+daynum+'"><i>'  +daynum + "</i></td>");
				 	}
				 	else{
				 		htmls.push('<td class="c'+monthnum+'-'+daynum+'"><i>'  +daynum + "</i></td>");
				 	}
					
				}
				else{
					htmls.push('<td class="gray c'+monthnum+'-'+daynum+'"><i>'  +daynum + "</i></td>");
				}
			}
			htmls.push("</tr>");
		}
		htmls.push("</table>");
		htmls.push("</div>");
		htmls.push("</div>");
		// console.log(htmls);
		return htmls.join('');
	}
};
