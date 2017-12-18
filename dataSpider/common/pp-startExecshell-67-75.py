# -*- coding:utf-8 -*-
import time, sched ,subprocess ,sys

schedule = sched.scheduler(time.time, time.sleep)

if len(sys.argv)>1:
    shellarr=' '+ ' '.join(sys.argv[1:])
    pass
else:
    shellarr=''

host_list=["192.168.1.67",
           "192.168.1.68",
           "192.168.1.69",
           "192.168.1.70",
           "192.168.1.71",
           "192.168.1.72",
           "192.168.1.73",
           "192.168.1.74",
           "192.168.1.75"]

def commandfun(inc):
    nohupstr = 'nohup /usr/python-3.6.0/bin/python3 pp-catErrorLogsshell-67-75.py  > /data/logs/catErrorLogsshell.log 2>&1 &'
    subprocess.Popen(nohupstr, shell=True, stdout=None)

    time.sleep(5)

    for host in host_list:
        subprocess.Popen("ssh root@" + host + ' python /data/pywork/cuteSpider/common/startExecshell.py' + shellarr,
                         shell=True, stdout=None)
        print('ip:' + host + ',exec: ok')
        print('')

    schedule.enter(inc, 0, commandfun, (inc,))
    schedule.run()

def sleepfun(inc=3600):
    schedule.enter(0, 0, commandfun , (inc,))
    schedule.run()
def shell():
    # shellstr1 = "ps -ef|grep -E 'pp-startExecshell-67-75.py'|grep -v grep|grep -cv 'pp-startExecshell-67-75.py'"
    # out1 = subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
    # out1text = out1.stdout.read()
    # print(out1text)
    # if int(out1text) > 0:
    #     pass
    #     shellstr2 = "ps -ef|grep -E 'pp-startExecshell-67-75.py'|grep -v grep|awk '{print $2}'|xargs kill -9"
    #     subprocess.Popen(shellstr2, shell=True, stdout=None).wait()
    #     print('The pp-startExecshell-67-75.py is running. It is now killed. Please try again' )
    # else:
    #     pass
    sleepfun(7200)
shell()