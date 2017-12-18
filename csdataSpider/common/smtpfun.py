# coding: utf-8
import smtplib,sys,os,random,base64,re
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
from email.mime.image import MIMEImage


sender = 'renmh@csc-ec.com'
receiver = ['renmh@csc-ec.com','lihuan@csc-ec.com','huanglb@csc-ec.com']
subject = '来自67-75-logsError的日志'
smtpserver = 'smtp.exmail.qq.com'
username = 'renmh@csc-ec.com'
password = 'hncw123'


def filelen(arg):
    for parent, dirnames, filenames in os.walk(arg):
        return len(filenames)

def smtpfun(arg=''):
    msg = MIMEMultipart()
    msg['From'] = 'renmh@csc-ec.com'
    msg['Subject'] = subject

    html = 'Hi:\n<p>'+arg+'</p>'

    pathdir = "E:/work/dataSpider/common/gif/" if sys.platform == 'win32' else  "/data/pywork/cuteSpider/common/gif/"
    pathdir2 = "E:/work/dataSpider/common/giftext/" if sys.platform == 'win32' else  "/data/pywork/cuteSpider/common/giftext/"

    giflen = filelen(pathdir)
    if giflen!=filelen(pathdir2):
        for parent, dirnames, filenames in os.walk(pathdir):
            for filename in filenames:
                textname= re.sub(r'\..*', '', filename, count=0, flags=0)
                textname = textname+'.txt'
                srctextpathdir = "E:/work/dataSpider/common/giftext/" + textname if sys.platform == 'win32' else  "/data/pywork/cuteSpider/common/giftext/" + textname
                with open(srctextpathdir, 'wb') as f:
                    fp = open(os.path.join(parent, filename), 'rb')
                    imgtxt = base64.b64encode(fp.read())

                    f.write(imgtxt)
                    fp.close()
    num = random.choice(range(0,giflen))

    imgsrc=""
    for parent, dirnames, filenames in os.walk(pathdir2):
        num2=0

        for filename in filenames:
            if(num2==num):
                fp2 = open(os.path.join(parent, filename), 'rb')
                imgsrc= fp2.read()
                break
            num2 += 1
        if isinstance(imgsrc, str)==False:
            imgsrc = imgsrc.decode("utf-8")

    part1 = MIMEText(html, 'html','utf-8')
    part2 = MIMEText('<br><br><b>乐一个:</b><br><img src="data:image/gif;base64,'+imgsrc+'"><br>', 'html', 'utf-8')

    msg.attach(part1)
    msg.attach(part2)

    # 附件
    # att = MIMEText(img, 'base64', 'utf-8')
    # att["Content-Type"] = 'application/octet-stream'
    # att["Content-Disposition"] = 'attachment; filename="abc.gif"'
    # msg.attach(att)

    smtp = smtplib.SMTP()
    smtp.connect(smtpserver)
    # SSL
    # smtp.ehlo()
    # smtp.starttls()
    # smtp.ehlo()
    # smtp.set_debuglevel(1)
    smtp.login(username, password)
    smtp.sendmail(sender, receiver, msg.as_string())
    smtp.quit()


if __name__ == "__main__":
    smtpfun('测试')