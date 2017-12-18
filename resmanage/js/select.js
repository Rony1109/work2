(function(){
	function hostPost(url,callback){
		var xmlhttp;
		if (window.XMLHttpRequest){
		  xmlhttp=new XMLHttpRequest();
		  }
		else{
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
			  if(xmlhttp.readyState==4){
			  
				  if (xmlhttp.status==0 || xmlhttp.status==200)
					{				
						var json=new Function('return'+xmlhttp.responseText)();
						callback && callback(json);	
					}else{
						alert('网络出错，请刷新浏览器')
					}
			  }
		  }	
		xmlhttp.open("GET",url,true);	
		xmlhttp.send();		
	}

	function $$(id){
		return (!id)?null:document.getElementById(id);
	}
	window.onload=function(){
		var  one=$$("one"),tree=$$("tree");
		function selectOption(arr){
			for(var i=0,len=arr.length;i<len;i++){
				if(arr[i].selected == true && arr[i].innerHTML !="请选择分类"){
					return arr[i];
				}else{
					tree.innerHTML='<option value="">请选择分类</option>';
				}
			}
		}
		one.onchange=function(){
			var selEle=selectOption(one.children),id;
			if(selEle!=undefined){		
				id=selEle.getAttribute("value");
			}else{
				id=false;
			}
			selectHost(id);
		}	
	}

	function selectHost(id){
		hostPost("http://bops.csc86.com/bops-app/bops/app/nextLevelCategory?categoryId="+id,function(data){
			var arr=[];
			for(var i=0,len=data.length;i<len;i++){			
				arr[i]='<option value='+data[i].categoryid+'>'+data[i].categoryName+'</option>'
			}
			tree.innerHTML='<option value="">请选择分类</option>'+arr.join('');
		})		
	}
})()
