 var bro=$.browser;
 jQuery.fn.rotate = function(angle) {  
 var dom =$(this)[0];
    if(bro.msie){ 
       if(bro.version< 9){ 
	   	 if (!angle) {  
      	     dom.angle = ((dom.angle==undefined?0:dom.angle) + angle) % 360;  
    	 } else {  
      	  dom.angle = angle;  
   		 }  
	    if (dom.angle >= 0) {  
       		 var rotation = Math.PI * dom.angle / 180;  
   		 } else {  
       		 var rotation = Math.PI * (360+dom.angle) / 180;  
    	}  
   		 var costheta = Math.round(Math.cos(rotation) * 1000) / 1000;  
  	     var sintheta = Math.round(Math.sin(rotation) * 1000) / 1000;  
          var canvas = document.createElement('img');  
  		  canvas.src =dom.src;  
          canvas.height = dom.height;  
          canvas.width =dom.width;  
  		  canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+",M12="+(-sintheta)+",M21="+sintheta+",M22="+costheta+",SizingMethod='auto expand')";
		 canvas.id = dom.id;  
    	 canvas.angle = dom.angle;  
  	     dom.parentNode.replaceChild(canvas,dom)
	   }else{
            dom.style.msTransform = 'rotate(' + angle + 'deg)';  
        }; 
	}else if(bro.safari) {  
	 	    dom.style.msTransform = 'rotate(' + angle + 'deg)';  
            dom.style.webkitTransform = 'rotate(' + angle + 'deg)';  
	}else if(bro.mozilla){  
		   dom.style.msTransform = 'rotate(' + angle + 'deg)';  
            dom.style.MozTransform = 'rotate(' + angle + 'deg)';  
        } else if(bro.opera)  {  
            dom.style.OTransform = 'rotate(' + angle + 'deg)';  
        }else {  
            dom.style.transform = 'rotate(' + angle + 'deg)';  
        };  
   
}