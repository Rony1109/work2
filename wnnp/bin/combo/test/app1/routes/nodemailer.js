var nodemailer = require("nodemailer");
// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport("SMTP",{
    host: "smtp.qq.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: "xxxxxxxx@qq.com", // 账号
        pass: "xxxxxxxx" // 密码
    }
});
// 设置邮件内容
var mailOptions = {
    from: "Fred Foo <xxxxxxxx@qq.com>", // 发件地址
    to: "2838890xx@qq.com, minimixx@126.com", // 收件列表
    subject: "Hello world", // 标题
    html: "<b>thanks a for visiting!</b> 世界，你好！" // html 内容
}
// 发送邮件
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
    smtpTransport.close(); // 如果没用，关闭连接池
});