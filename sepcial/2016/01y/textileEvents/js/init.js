/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('jquery');
    require('top');
    require('header');
    require('placeholder');

    /*
     * 以下为专题js代码
     * ......
     */
	 
	 //第五层效果
 $(function(){
	 var items = $("#f5-right").find("li");
	 var leftTit = $(".f5-left .title h3 a"),leftInt = $(".f5-left .title p");
	 var leftImg = $(".f5-left>a img");
	 //alert(leftImg.attr("src"));
	 //console.log(items);
	 items.hover(function(){
		 var liImg = $(this).find("a:first img").attr("src");
		 $(this).css("backgroundColor","#555");
		 leftTit.text($(this).find("h5").text());
		 leftInt.text($(this).find("p").text());
		 leftImg.attr("src",liImg);
		 },
		 function(){
	   	 $(this).css("backgroundColor","#e58322");	 
			 });
	
	 })//windows加载结束
	 
	 //第六层效果
    function bannerImg(a,b,c){	 
	 var tabBox = $(a),
	     tabLen = tabBox.length,
		 prevBtn = $(b),
		 nextBtn = $(c),
		 _index = 0,
		 _timer = null;
	// alert(tabLen);
	nextBtn.on("click",function(){
		_index++;
		if(_index > tabLen-1){
			_index = 0;
			}
			changeBox(_index);
		});
	prevBtn.on("click",function(){
		_index--;
		if(_index < 0){
			_index = tabLen-1;
			}
			changeBox(_index);
		});	
	function changeBox(_index){
		tabBox.eq(_index).fadeIn(250);
		tabBox.eq(_index).siblings().fadeOut(200);
		clearInterval(_timer);
		_timer = setInterval(function(){nextBtn.click()},5000);
		}
		_timer = setInterval(function(){nextBtn.click()},5000);
	};
	 bannerImg('.tabbox','#prev','#next');
	 bannerImg('.f4 .con','#forthprev','#forthnext')
	 //焦点图轮播
/*function tab(option,floorID){
	function $(id){
	return typeof id === 'string'?document.getElementById(id):id;
	} 
	//当前高亮显示的页签的索引
	var index = 0;
	var timer = null;
	
	//获取所有的页签和要切换的内容
	var lists = $(option).getElementsByTagName("li");
	//if(!document.getElementsByClassName()) return false;加了这一句就不执行了
	var divs = $(floorID).getElementsByClassName("con");
    
	//遍历每一个页签，给它们绑定鼠标滑过事件
	for(var i=0; i < lists.length;i++){
		lists[i].id=i;
		lists[i].onmouseover = function(){
			clearInterval(timer);
			changeOption(this.id);
			}
		divs[i].onmouseover = function(){
			clearInterval(timer);
			}	
			
		lists[i].onmouseout = function(){
			timer = setInterval(autoPlay,2000);
				}
		divs[i].onmouseout = function(){
			timer = setInterval(autoPlay,2000);
				}	
		}
	//在添加定时器之前，清空正在等待的一些定时器
	if(timer){
		clearInterval(timer);
		timer = null;
		}
	//添加定时器，改变当前高亮的索引
   timer = setInterval(autoPlay,2000);
	
   function autoPlay(){
		index++;
		if(index >= lists.length){
			index=0;
			}
			changeOption(index);
	   }

   function changeOption(curIndex){
	   //console.log(curIndex);
	   for(var j=0; j < lists.length; j++){
				lists[j].className = "";
				divs[j].className = "con g-dn";
				index = curIndex;
				}
		//高亮显示当前页签
		lists[curIndex].className = "cho";
		divs[curIndex].className = "con g-db";
	   }
}
addLoadEvent(tab("opt4","floor4"));*/
});





