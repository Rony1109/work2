var express = require('express'),
    router = express.Router();
var qr = require('qr-image');
var images = require("images");

/*var qr_svg = qr.image('I love QR!', { type: 'png' });
qr_svg.pipe(require('fs').createWriteStream('i_love_qr.png'))
console.log(qr_svg);*/

var svg_string = qr.imageSync('I love QR!', { type: 'png' });

images(svg_string)                     //Load image from file//加载图像文件
    .size(400)                          //Geometric scaling the image to 400 pixels width//等比缩放图像到400像素宽
    .save("../public/images/outimage/ewm.png", {               //Save the image to a file,whih quality 50
        quality : 50                    //保存图片到文件,图片质量为50
    });



router.get('/', function(req, res) {
     res.render('qrImage',{imgsrc:'/images/outimage/ewm.png',title:'qr-image'});
   /* var img=qr.image('I love QR!', { type: 'png' });
    res.writeHead(200, {'Content-Type': 'image/png'});
    img.pipe(require('fs').createWriteStream('i_love_qr.png'));
    img.pipe(res);*/
});

module.exports = router;