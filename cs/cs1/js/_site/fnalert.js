define(function(require,exports, module) {

   return function($){
         (function($) {
           $.fn.extend({
	alertWhileClick:function(){ 
$(this).click(function(){ 

alert($(this).text()); 
return false;
}); 
},
alertclick:function(){ 
$(this).click(function(){ 

alert($(this).text()); 
return false;
}); 
}
}); 
         })($);
     }
	 
	 
});