import subprocess
import sys

if len(sys.argv)>1:
    shellarr=sys.argv[1:]
    pass
else:
    shellarr = ["alibabaPageLink", "alibabaProductLink", "alibabaProductDetail", "alibabaIntroduce", "alibabaContact",
                 "ehsyProductLink", "ehsyProductInfo", "graingerProductLink", "graingerProductInfo",
                 "toolmallProductPage",
                 "toolmallProductDetail", "toolmallProductInfo", "hc360PageLink", "hc360ProductLink", "hc360ProductDetail",
                 "hc360Contact", "hc360Introduce"]

def shell():
    str1 = '|'.join(shellarr)
    shellstr1 = "ps -ef|grep -E '" + str1 + "'|grep -v grep|grep -v 'killSpidershell.py'|awk '{print $2}'|xargs"
    out1=subprocess.Popen(shellstr1, shell=True, stdout=subprocess.PIPE)
    out1text=out1.stdout.read()
    #print(len(out1text.strip()))
    if len(out1text.strip())>0:
        shellstr = "ps -ef|grep -E '" + str1 + "'|grep -v grep|grep -v 'killSpidershell.py'|awk '{print $2}'|xargs kill -9"
        subprocess.Popen(shellstr, shell=True, stdout=None).wait()
        print(str1+' stop:ok')
    else:
        print(str1+' no pid')

shell()
