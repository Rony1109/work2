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
	  'seacss':'jquery/seajs-css',
	  'css':'./css/css.css',
	  'myplugin':'jquery/fnmyflugin',
	  'prototypealert':'jquery/prototypealert'
    },
    charset: 'utf-8',
    timeout: 20000,
    debug: false
});

define(function(require,exports, module) {

    require('jquery');
	
	require('myplugin');

	var exportsalert = require('exportsalert');
	
	var prototypealert = require('prototypealert');
	
	$(function(){
		$('.myplugin').click(function(){$(this).myplugin()}); 
	});
	
	//require('fnalert')($);
	
   // var data = require('data');
   
	
	require.async(['data','seacss'], function(data) {
$('.author').html(data.author);
$('.blog a').attr('href', data.blog);
seajs.use("css");

  });
  
 // $('.blog a').alertclick();
  
  exportsalert.get(2,3);

$('.author').click(function(){alert(module.aaa()+module.foo+prototypealert.foo)});
    
	
    //$('.blog a').attr('href', data.blog);
	
	console.log(require.resolve('data'));
	
	console.log(module.uri); 
	
	console.log(module.aaa()); 
	
	

});