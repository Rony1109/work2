module.exports = {
  root: 'E:/work/res/',
  groups: {
    'js':['/js/l/jquery.js', '/js/p/seajs/1.2.0/dist/sea.js', '/js/m/config.js'],
    'css':['/css/base-reset.css'],
    'bhf':['/css/base-reset.css', '/css/m/web-head/top.css', '/css/m/web-head/web-search.css', '/css/m/web-head/web-nav.css', '/css/m/web-foot/web-foot.css'],
    'shop':['/css/base-reset.css', '/css/c/shop/style.css'],
    'dialog':['/js/p/artDialog/4.1.5/jquery.artDialog.js', '/js/p/artDialog/4.1.5/plugins/iframeTools.source.js', '/js/m/dialog.js'],
    'editor':['/js/p/kindeditor/4.1.2/kindeditor.js', '/js/p/kindeditor/4.1.2/lang/zh_CN.js'],
    'app':['/css/base-reset.css', '/css/m/app-frame/style.css'],
    'swfupload':['/js/p/SWFUpload/v2.2.0.1/swfupload.js', '/js/m/handlers.js']
  },
  noUglifyJS:{
	  'js':['/js/m/noys.js','/v2/l/echarts/echarts.min.js']
	  }
  ,
  debug: true,
  cachePath: 'E:/work/cache/res/',
  cachePrefix: 'res'
};
