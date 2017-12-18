module.exports = function(grunt) {

  grunt.initConfig({
	  
    pkg: grunt.file.readJSON('package.json'),

	concat: {
    options: {
      separator: '',
	  stripBanners: true 
    },
    dist: {
      src: ['src/b.js', 'src/c.js', 'src/d.js'],
      dest: 'src/a.js',
    }
  },
  
    jshint: {
    beforeconcat: ['src/b.js', 'src/c.js','src/d.js'],
    afterconcat: ['src/a.js']
  },
  
    uglify: {
      build: {
        src: 'src/a.js',
        dest: 'build/a.min.js'
      }
    },
	
	cssmin: {  
         options: {  
             keepSpecialComments: 0  
         },  
         compress: {  
             files: {  
                 'css/css.css': [  
                     "css/css1.css",  
                     "css/css2.css",  
                     "css/css3.css"  
                 ]  
             }  
         }  
     } ,
	
	watch: {
        another: {
            files: ['src/*.js'],
            tasks: ['concat','uglify'],
            options: {
                 spawn: false,
            }
        }
    }
	
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');  
  
  grunt.loadNpmTasks('grunt-contrib-jshint'); 
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-contrib-watch');  
  
  grunt.loadNpmTasks('grunt-contrib-cssmin');  

  grunt.registerTask('default', ['jshint','concat','uglify','cssmin','watch']);

};