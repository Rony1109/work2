import subprocess
import sys

# if len(sys.argv)>1:
#     shellarr=' '+ ' '.join(sys.argv[1:])
#     pass
# else:
#     shellarr=''

host_list=["192.168.1.67",
           "192.168.1.68",
           "192.168.1.69",
           "192.168.1.70",
           "192.168.1.71",
           "192.168.1.72",
           "192.168.1.73",
           "192.168.1.74",
           "192.168.1.75"]
print('running...')
for host in host_list:
    subprocess.Popen("ssh root@"+host+' python /data/pywork/cuteSpider/common/alibabastartSpidershell.py',shell=True, stdout=None).wait()
    print('ip:' + host + ',start: ok')
    print('')

