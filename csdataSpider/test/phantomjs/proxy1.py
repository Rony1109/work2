"""
author     :LiHuan
date       :2017/5/18 11:54
description:
"""
"""
author     :LiHuan
date       :5/17/17 3:44 PM
description:
"""
import requests

session = requests.session()

proxies = {"http": "http://85.159.2.205:9999"}

resp = session.get("https://www.1688.com/", proxies=proxies)
# resp = session.get("https://www.grainger.cn/", proxies=proxies)

print(resp.text)
