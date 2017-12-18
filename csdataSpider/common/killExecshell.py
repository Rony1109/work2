import subprocess
import sys

if len(sys.argv)>1:
    shellarr=sys.argv[1:]
    pass
else:
    shellarr = ["startExecshell"]

def shell():
    str1 = '|'.join(shellarr)
    shellstr1 = "ps -ef|grep -E 'pp-startExecshell-67-75.py'|grep -v grep|grep -v 'killExecshell.py'|awk '{print $2}'|xargs"
    out1=subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
    out1text=out1.stdout.read()
    #print(len(out1text.strip()))
    if len(out1text.strip())>0:
        shellstr = "ps -ef|grep -E 'pp-startExecshell-67-75.py'|grep -v grep|grep -v 'killExecshell.py'|awk '{print $2}'|xargs kill -9"
        subprocess.Popen(shellstr, shell=True, stdout=None).wait()
        print(str1+' kill:ok')
    else:
        print(str1+' no pid')

shell()
