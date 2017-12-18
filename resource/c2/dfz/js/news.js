define(function(require, exports, module) {
	var common=require('./common.js');
	var news={
		/*知商讯首页*/
		indx:function(){
			//轮播
			require.async('l/cscSwitch/js/cscSwitch.js',function(){
				var $scrllLst=$('#scrllLst'),
					$scrllLi=$scrllLst.find('li'),
					scrllLen=$scrllLi.length,
					$scrllTrg=$('#scrllTrg');
				if(scrllLen>0){
					$scrllTrg.cscSwitch($scrllLi,{
						trigger:'li',
						currCls:'cur',
						triggerType:'mouse',
						effect:'scroll',
						speed: .4,
						beforeSwitch:function(i,n){
							var $img=$scrllLi.find('img').eq(n);
							if (!$img.attr('src')||$img.data('original')) {
								// 图片动态载入
								$img.attr("src", $img.data("original"));	
							}
							$img.removeAttr("data-original");
						}
					}).carousel().autoplay(5);
				}
			});
			
			//图片懒加载
			common.lazyload();
		},
		
		/*图文列表页面*/
		picLst:function(){
			common.lazyload();//图片懒加载
		}
	};
	module.exports=news;
});