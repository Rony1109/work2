# -*- coding:utf-8 -*-
import subprocess,sched,sys,time,socket,struct

schedule = sched.scheduler(time.time, time.sleep)

total = 0

if len(sys.argv)>1:
    spiderarr=sys.argv[1:]
    pass
else:
    spiderarr = ["ehsyProductLink", "ehsyProductInfo", "graingerProductLink", "graingerProductInfo",
                 "toolmallProductPage",
                 "toolmallProductDetail", "toolmallProductInfo", "hc360PageLink", "hc360ProductLink",
                 "hc360ProductDetail",
                 "hc360Contact", "hc360Introduce"]

# spiderarr = ["alibabaPageLink", "alibabaProductLink", "alibabaProductDetail", "alibabaIntroduce", "alibabaContact",
#                  "ehsyProductLink", "ehsyProductInfo", "graingerProductLink", "graingerProductInfo",
#                  "toolmallProductPage",
#                  "toolmallProductDetail", "toolmallProductInfo", "hc360PageLink", "hc360ProductLink", "hc360ProductDetail",
#                  "hc360Contact", "hc360Introduce"]


spiderstr = '|'.join(spiderarr)

def get_ip( ifname = 'eth0'):
    if sys.platform == 'win32':
        return socket.gethostbyname(socket.gethostname())
    mod_name = 'fcntl'
    mod_obj = __import__(mod_name)
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(mod_obj.ioctl(s.fileno(),0x8915,struct.pack('256s', ifname[:15]))[20:24])

def shell():
    shellstr1 = "ps -ef|grep -E '" + spiderstr + "'|grep -v grep|grep -v 'startExecshell.py'|awk '{print $2}'|xargs"
    out1 = subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
    out1text = out1.stdout.read()

    def workrun(stime):
        global total
        total +=5
        out3 = subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
        out3text = out3.stdout.read()
        if len(out3text.strip()) > 0:
            if total > 120:
                shellstr5 = "ps -ef|grep -E '" + spiderstr + "'|grep -v grep|grep -v 'startExecshell.py'|awk '{print $2}'|xargs kill -9"
                subprocess.Popen(shellstr5, shell=True, stdout=None).wait()
            schedule.enter(stime, 0, workrun, (stime,))
            schedule.run()

    if len(out1text.strip()) > 0:
        print('')
        print('=============================== stopping.....===============================')
        shellstr2 = "ps -ef|grep -E '" + spiderstr + "'|grep -v grep|grep -v 'startExecshell.py'|awk '{print $2}'|xargs kill -2"
        subprocess.Popen(shellstr2, shell=True, stdout=None).wait()
        schedule.enter(0, 0, workrun, (5,))
        schedule.run()
        print('ip :'+get_ip()+ ' now :'+time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())) +' spiders stop:ok' + ' useTime :' + str(total) + 's')
        print('')

    else:
        pass

    shellstr3 = "ps -ef|grep -E 'phantomjs'|grep -v grep|awk '{print $2}'|xargs"
    out2 = subprocess.Popen(shellstr3, shell=True, stdout=subprocess.PIPE)
    out2text = out2.stdout.read()
    if len(out2text.strip()) > 0:
        shellstr4 = "ps -ef|grep  'phantomjs'|awk 'BEGIN {count=0;} {name[count] = $2;count++;};END{for (i = 0; i < NR-1; i++) print  name[i]}' |xargs  kill -9"
        subprocess.Popen(shellstr4, shell=True, stdout=None).wait()
    else:
        pass

    for i in spiderarr:
        nohupstr = 'nohup /usr/python-3.6.0/bin/scrapy crawl ' + i + ' > /data/logs/' + i + '.log 2>&1 &'
        subprocess.Popen(nohupstr, shell=True, stdout=subprocess.PIPE, cwd='/data/pywork/cuteSpider/').wait()


shell()
