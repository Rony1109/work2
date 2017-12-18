var express = require('express'),
    router = express.Router();
var images = require("images");

images("../public/images/csc.png")                     //Load image from file//加载图像文件
    .size(400)                          //Geometric scaling the image to 400 pixels width//等比缩放图像到400像素宽
    .draw(images("../public/images/payh.png"), 10, 10)   //Drawn logo at coordinates (10,10)//在(10,10)处绘制Logo
    .save("../public/images/outimage/csc.png", {               //Save the image to a file,whih quality 50
      quality : 50                    //保存图片到文件,图片质量为50
    });

router.get('/', function(req, res) {
    res.render('images',{imgsrc:'/images/outimage/csc.png',title:'image'});
});

module.exports = router;