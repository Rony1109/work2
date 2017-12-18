# -*- coding:utf-8 -*-
import subprocess,sched,sys,time

schedule = sched.scheduler(time.time, time.sleep)

total = 0

if len(sys.argv)>1:
    shellarr=sys.argv[1:]
    pass
else:
     shellarr = ["alibabaPageLink", "alibabaProductLink", "alibabaProductDetail", "alibabaIntroduce", "alibabaContact",
                  "ehsyProductLink", "ehsyProductInfo", "graingerProductLink", "graingerProductInfo",
                  "toolmallProductPage",
                  "toolmallProductDetail", "toolmallProductInfo", "hc360PageLink", "hc360ProductLink", "hc360ProductDetail",
                  "hc360Contact", "hc360Introduce"]
    #shellarr = ["ehsyProductLink", "ehsyProductInfo", "graingerProductLink", "graingerProductInfo",
    #             "toolmallProductPage",
    #             "toolmallProductDetail", "toolmallProductInfo", "hc360PageLink", "hc360ProductLink", "hc360ProductDetail",
    #             "hc360Contact", "hc360Introduce"]

def shell():
    str1 = '|'.join(shellarr)
    shellstr1 = "ps -ef|grep -E '" + str1 + "'|grep -v grep|grep -v 'stopSpidershell.py'|awk '{print $2}'|xargs"
    out1=subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
    out1text=out1.stdout.read()
    def workrun(stime):
        global total
        total +=5
        if total > 120:
            shellstr2 = "ps -ef|grep -E '" + str1 + "'|grep -v grep|grep -v 'stopSpidershell.py'|awk '{print $2}'|xargs kill -9"
            subprocess.Popen(shellstr2, shell=True, stdout=None).wait()
        out2 = subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
        out2text = out2.stdout.read()
        if len(out2text.strip()) > 0:
            #time.sleep(5)
            schedule.enter(stime, 0, workrun, (stime,))
            schedule.run()
    if len(out1text.strip()) > 0:
        print('=============================== stopping.....===============================')
        shellstr = "ps -ef|grep -E '" + str1 + "'|grep -v grep|grep -v 'stopSpidershell.py'|awk '{print $2}'|xargs kill -2"
        subprocess.Popen(shellstr, shell=True, stdout=None).wait()
        schedule.enter(0, 0, workrun, (5,))
        schedule.run()
        print(str1 + ' stop:ok' +' useTime :' + str(total) + 's')
    else:
        print(str1 + ' no pid')

shell()
