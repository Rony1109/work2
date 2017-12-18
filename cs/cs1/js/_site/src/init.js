seajs.config({
   //base: 'v2/c/cs/js/',
   paths: {
        'data': '../data/',
		'jquery': '../js/',
    },
	
	vars: {
        'da': 'data'
    },
    alias: {
      'jquery': 'jquery/jquery',
	  'data':'data/{da}',
	  'fnalert':'jquery/fnalert',
	  'exportsalert':'jquery/exportsalert',
	  'prototypealert':'jquery/prototypealert'
    },
    charset: 'utf-8',
    timeout: 20000,
    debug: false
});

define(function(require,exports, module) {

    var $ = require('jquery');
	
	var exportsalert = require('exportsalert');
	
	var prototypealert = require('prototypealert');
	
	require('fnalert')($);
	
   // var data = require('data');
   
	
	require.async(['data'], function(data) {
$('.author').html(data.author);
$('.blog a').attr('href', data.blog);


  });
  
  $('.blog a').alertclick();
  
  exportsalert.get(2,3);
  

$('.author').click(function(){alert(module.aaa()+module.foo+prototypealert.foo)});
    
	
    //$('.blog a').attr('href', data.blog);
	
	console.log(require.resolve('data'));
	
	console.log(module.uri); 
	
	console.log(module.aaa()); 
	
	

});