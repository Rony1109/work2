import subprocess
import sys

if len(sys.argv)>1:
    shellarr=sys.argv[1:]
    pass
else:
    shellarr = ["crawl"]

def shell():
    str1 = '|'.join(shellarr)
    shellstr1 = "ps -ef|grep -E '" + str1 + "'|grep -v grep|grep -v 'selectSpidershell.py'"
    out1=subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
    out1text = out1.stdout.read()
    #print(len(out1text.strip()))
    if len(out1text.strip()) > 0:
        print(out1text)
    else:
        print('no '+str1 +' to run')

shell()







