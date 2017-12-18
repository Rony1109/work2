import subprocess
host_list=["192.168.1.67",
           "192.168.1.68",
           "192.168.1.69",
           "192.168.1.70",
           "192.168.1.71",
           "192.168.1.72",
           "192.168.1.73",
           "192.168.1.74",
           "192.168.1.75"]

for host in host_list:
     str1='scp /usr/python-3.6.0/lib/python3.6/site-packages/commonPy/__init__.py root@'+host+':/usr/python-3.6.0/lib/python3.6/site-packages/commonPy/__init__.py'
     s = subprocess.Popen(str1,shell=True, stdout=None)
     print('ip:' + host + ',scp-status: ok')


