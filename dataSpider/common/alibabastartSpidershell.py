# -*- coding:utf-8 -*-
import subprocess,sched,sys,time,socket,struct

schedule = sched.scheduler(time.time, time.sleep)

total = 0

# if len(sys.argv)>1:
#     shellarr=sys.argv[1:]
#     pass
# else:
#     shellarr = ["alibabaPageLink", "alibabaProductLink", "alibabaProductDetail", "alibabaIntroduce", "alibabaContact",
#                  "ehsyProductLink", "ehsyProductInfo", "graingerProductLink", "graingerProductInfo",
#                  "toolmallProductPage",
#                  "toolmallProductDetail", "toolmallProductInfo", "hc360PageLink", "hc360ProductLink", "hc360ProductDetail",
#                  "hc360Contact", "hc360Introduce"]

def get_ip( ifname = 'eth0'):
    if sys.platform == 'win32':
        return socket.gethostbyname(socket.gethostname())
    mod_name = 'fcntl'
    mod_obj = __import__(mod_name)
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(mod_obj.ioctl(s.fileno(),0x8915,struct.pack('256s', ifname[:15]))[20:24])

def runspidername():
    ip = get_ip()
    if  ip in ['192.168.1.75','192.168.1.74']:
        shellarr=['alibabaContact']
    elif ip in ['192.168.1.73','192.168.1.72']:
        shellarr = ['alibabaIntroduce']
    elif ip in ['192.168.1.71','192.168.1.70']:
        shellarr = ['alibabaProductDetail']
    elif ip in ['192.168.1.69','192.168.1.68']:
        shellarr = ['alibabaProductLink']
    elif ip in ['192.168.1.67']:
        shellarr = ['alibabaPageLink']
    else:
        shellarr = None
    # print(shellarr)
    return shellarr


def shell(args):
    if args ==None:
        return
    str1 = '|'.join(args)
    shellstr1 = "ps -ef|grep -E '" + str1 + "'|grep -v grep|grep -v 'startSpidershell.py'|awk '{print $2}'|xargs"
    out1=subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
    out1text = out1.stdout.read()
    def workrun(stime):
        global total
        total +=5
        out2 = subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
        out2text = out2.stdout.read()
        if len(out2text.strip()) > 0:
            #time.sleep(5)
            if total > 120:
                shellstr2 = "ps -ef|grep -E '" + str1 + "'|grep -v grep|grep -v 'startSpidershell.py'|awk '{print $2}'|xargs kill -9"
                subprocess.Popen(shellstr2, shell=True, stdout=None).wait()
            schedule.enter(stime, 0, workrun, (stime,))
            schedule.run()
            pass
    if len(out1text.strip()) > 0:
        print('=============================== stopping.....===============================')
        shellstr = "ps -ef|grep -E '" + str1 + "'|grep -v grep|grep -v 'startSpidershell.py'|awk '{print $2}'|xargs kill -2"
        subprocess.Popen(shellstr, shell=True, stdout=None).wait()
        schedule.enter(0, 0, workrun, (5,))
        schedule.run()
        print(str1 + ' stop:ok' +' useTime :' + str(total) + 's')
    else:
        print(' ')
    for i in args:
        nohupstr = 'nohup /usr/python-3.6.0/bin/scrapy crawl ' + i + ' > /data/logs/' + i + '.log 2>&1 &'
        subprocess.Popen(nohupstr, shell=True, stdout=subprocess.PIPE, cwd='/data/pywork/cuteSpider/')
        print('spiderName:' + i + ',start: ok')
args =  runspidername()
shell(args)