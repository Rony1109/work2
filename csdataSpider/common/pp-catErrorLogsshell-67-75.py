# coding: utf-8
import subprocess,sys,os,time,smtpfun

if len(sys.argv)>1:
    shellarr = ' ' + ' '.join(sys.argv[1:])
    pass
else:
    shellarr = ''

host_list=["192.168.1.67",
           "192.168.1.68",
           "192.168.1.69",
           "192.168.1.70",
           "192.168.1.71",
           "192.168.1.72",
           "192.168.1.73",
           "192.168.1.74",
           "192.168.1.75"]

txt=''
txt2=''
for host in host_list:
    print("")
    s=subprocess.Popen("ssh root@"+host+' python /data/pywork/cuteSpider/common/catErrorLogsshell.py'+shellarr,shell=True, stdout=subprocess.PIPE)
    outtext = s.stdout.read()
    # outtext=str(outtext, encoding="utf-8")
    outtext=outtext.decode("utf-8")
    if len(outtext)>0:
        txt+=outtext
        txt2+='ip:' + host +':<br>'+outtext+'<br><br>'
        print(outtext)
        print('ip:' + host + ',cat: is error')
    else:
        print('ip:' + host + ',cat: no error')
    print("")

if len(txt)>0:
    print(time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))+',Send mail...')
    smtpfun.smtpfun(txt2)

