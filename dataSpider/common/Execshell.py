# -*- coding:utf-8 -*-
import subprocess,sched,sys,time

schedule = sched.scheduler(time.time, time.sleep)

def shell():
    shellstr1 = "ps -ef|grep -E 'pp-startExecshell-67-75.py'|grep -cv grep"
    out1 = subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
    out1text = out1.stdout.read()
    if int(out1text) > 0:
        shellstr2 = "ps -ef|grep -E 'pp-startExecshell-67-75.py'|grep -v grep|awk '{print $2}'|xargs kill -9"
        subprocess.Popen(shellstr2, shell=True, stdout=None).wait()
    else:
        pass
    nohupstr = 'nohup /usr/python-3.6.0/bin/python3 pp-startExecshell-67-75.py  > /data/logs/Execshell.log 2>&1 &'
    subprocess.Popen(nohupstr, shell=True, stdout=subprocess.PIPE, cwd='/data/pywork/cuteSpider/common/')
    print('Execshell start: ok')

shell()







