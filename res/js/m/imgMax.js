//ΪͼƬ�������ߴ�Ч��,�ȱ������� ��ҪimgReady.js
csc.imgMax = function (id,width,height){
	var
		$id = $(id),
		_do = function (id,act,max){
			if(max.height){
				var ratio = Math.min(max.width /act.width,max.height /act.height);
				ratio > 1 || (id.width = act.width*ratio);
			}else{
				id.width = Math.min(act.width , max.width);
			}
		};
	seajs.use(csc.url("res","/f=js/m/imgReady"),function (){
		$.each($id,function (i,v){
			imgReady(v.src, function () {
				_do(v,{width:this.width,height:this.height},{width:width,height:height});
			});
		});
	});
};