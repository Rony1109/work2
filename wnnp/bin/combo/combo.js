var express = require('express');
var router = express.Router();
var CleanCSS = require('clean-css');
var UglifyJS = require("uglify-js");
var config = require('./config');
var fs = require('fs');
var path = require('path');
var url = require('url');
var crypto = require('crypto');
var mimes = {
  css: 'text/css',
  js: 'application/javascript'
};
var cscDebug = false;

function unique(arr) {
  var result = [],
    hash = {};
  for (var i = 0, elem;
    (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
}

function noys(path) {
  var result =false;
  var nougjs =config.noUglifyJS.js;
  for (var i = 0;i<nougjs.length; i++) {
    	if(path==nougjs[i]){
		result =true;
		break; 
		}
  }
	return result;
}

router.get('*', function(req, res, next) { //设置Content-Type 和检测是否是debug模式
 var nougjs = noys(req.path);
  console.log(req.path)
  cscDebug = config.debug || nougjs ||req.param('cscdebug') || url.parse(req.get('Referer') || '', true).query.cscdebug;
  next();
});

router.get(/^\/(v2|v3|v5|js|css)\/(.[^=]*)\.(cs|j)s$/, function(req, res) { //单文件版本css 和js 处理
  var filePath = path.normalize(config.root + req.path);
  try {
    var stat = fs.statSync(filePath);
  } catch (err) {
    res.send(404);
  }

  var mime = req.path.match(/\.((cs|j)s)$/)[1];
  res.set('Content-Type', mimes[mime] + '; charset=utf-8');

  if (cscDebug) { //调试模式直接输出
    var reader = fs.createReadStream(filePath);
    return reader.pipe(res);
  }

  var lastModified = stat.mtime;
  var modifiedSince = new Date(req.get('if-modified-since'));

  if (modifiedSince >= lastModified) { //没有修改返回304
    return res.send(304);
  }

  res.set("Last-Modified", lastModified.toUTCString()); //设置http最后修改时间

  var cachePath = config.cachePath + config.cachePrefix + '_' + crypto.createHash('md5').update(req.path).digest('hex'); //根据请求路径生成md5
  try { //是否有已压缩的缓存
    var minifyStat = fs.statSync(cachePath);
    if (minifyStat.mtime > lastModified) { //没有更新 如果被import的css更新了还是会有服务器缓存问题
      var reader = fs.createReadStream(cachePath);
      return reader.pipe(res);
    }
  } catch (err) { //没有已压缩的缓存
  }

  var code = '';

  if (mime == 'css') {
    var minimized = new CleanCSS({
      root: config.root,
      relativeTo: path.dirname(filePath) + '/',
      compatibility: 'ie7'
    });
    try {
      code = minimized.minify(new Buffer(fs.readFileSync(filePath)).toString().replace('f=', ''));
    } catch (err) {
      console.log(err);
      return res.send(500);
    }
  }

  if (mime == 'js') {
    try {
      code = UglifyJS.minify(filePath, {
        mangle: {
          except: ['$', 'require', 'exports', 'module']
        }
      }).code;
    } catch (err) {
      console.log(err);
      return res.send(500);
    }
  }

  fs.writeFile(cachePath, code, 'utf-8', function(err) {
    if (err) {
      console.log('缓存写入失败！');
    }
  });
  res.send(code); //因为要压缩所以同步，要不然可以流模式输出
});

router.get(/^(\/[bfg]=.*\.(j|cs)s|\/(js|css|app|dialog|editor|editorqq|bhf|shop|swfupload)\/([bfg]=.*\.(j|cs)s)?)$/, function(req, res) {
  var group = /^\/([a-z]+)\//.test(req.path) ? req.path.match(/^\/([a-z]+)\/.*/)[1] : '';
  var paths = [];
  var query = url.parse(req.path.replace(group ? group + '/' : '/', '?'), true).query;

  for (var i in query) {
    if (Array.isArray(query[i]) && query[i].length > 1) {
      query[i] = query[i][query[i].length - 1];
    }
  }

  var dir = '/';
  var lastModified = 0;
  var code = '';
  var mime = '';
  if (group) {
    paths = paths.concat(config.groups[group]);
  }

  if (query.b) {
    dir += query.b + '/';
  }

  if (query.f) {
    paths = paths.concat(query.f.split(','));
  }

  for (var i in paths) {
    try {
      paths[i] = path.normalize((config.root + dir + paths[i]).replace(dir + dir, dir));
      lastModified = Math.max(lastModified, fs.statSync(paths[i]).mtime);
    } catch (err) {
      console.error(paths[i] + '不存在！');
      return res.send(404);
    }
    if (mime == '') {
      mime = paths[i].match(/\.((cs|j)s)$/)[1];
    } else if (new RegExp('\.' + mime).test(paths[i]) == false) {
      console.error(paths[i] + '和请求类型不匹配！');
      return res.send(404);
    }
  }

  paths = unique(paths);

  res.set('Content-Type', mimes[mime]);

  if (cscDebug) {
    var relativeTo = '';
    for (var i in paths) {
      relativeTo = paths[i].replace(path.normalize(config.root), '').replace(/\\/g, '/');
      code += '/* ' + relativeTo + ' 开始*/\n';
      code += mime == 'js' ? ';' + fs.readFileSync(paths[i]) + ';' : (fs.readFileSync(paths[i]) + '').replace(/url\(([^\/|\'|http|https].*?)\)/g, 'url(' + path.dirname(relativeTo) + '/$1)');
      code += '\n/* ' + relativeTo + ' 结束*/\n\n\n\n\n';
    }
    return res.send(code);
  }

  var modifiedSince = new Date(req.get('if-modified-since'));

  if (modifiedSince >= lastModified) { //没有修改返回304
    return res.send(304);
  }

  res.set("Last-Modified", (new Date(lastModified)).toUTCString()); //设置http最后修改时间

  var cachePath = config.cachePath + config.cachePrefix + '_' + crypto.createHash('md5').update(paths.toString()).digest('hex'); //根据请求路径生成md5
  try { //是否有已压缩的缓存
    var minifyStat = fs.statSync(cachePath);
    if (minifyStat.mtime > lastModified) { //没有更新 如果被import的css更新了还是会有服务器缓存问题
      var reader = fs.createReadStream(cachePath);
      return reader.pipe(res);
    }
  } catch (err) { //没有已压缩的缓存
  }

  if (mime == 'css') {
    for (var i in paths) {
      var minimized = new CleanCSS({
        root: config.root,
        relativeTo: path.dirname(paths[i]) + '/',
        compatibility: 'ie7'
      });
      try {
        code += minimized.minify(new Buffer(fs.readFileSync(paths[i])).toString().replace('f=', ''));
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (mime == 'js') {
    try {
      code = UglifyJS.minify(paths, {
        mangle: {
          except: ['$', 'require', 'exports', 'module']
        }
      }).code;
    } catch (err) {
      console.log(err);
    }
  }

  fs.writeFile(cachePath, code, 'utf-8', function(err) {
    if (err) {
      console.log('缓存写入失败！');
    }
  });
  res.send(code);
});

router.get('*', function(req, res) { //其他url 返回404
  res.send(404);
});

module.exports = router;
