"""
author     :LiHuan
date       :5/19/17 10:27 AM
description:
"""

import random
import requests
from config import QUERY_PROXY, DEL_PROXY


class ProxyUtils(object):
    proxies = []

    def __getRemoteProxy(self):
        try:
            params = {}
            # params['types'] = 0
            params['count'] = 50
            resp = requests.get(QUERY_PROXY, params)
            self.proxies += resp.json()
        except Exception as e:
            print(e)

    def get_proxy(self):
        if len(self.proxies) < 10:
            self.__getRemoteProxy()

        if len(self.proxies) == 0:
            return None

        # protocol(0:http, 1:https&http)
        proxy = random.choice(self.proxies)
        # if proxy[3] == 0:
        # return "http://180.136.96.63:8086"
        return "http://%s:%d" % (proxy[0], proxy[1])
        # return "https://%s:%d" % (proxy[0], proxy[1])

    def get_proxy_alibaba(self):
        if len(self.proxies) < 10:
            self.__getRemoteProxy()

        if len(self.proxies) == 0:
            return None
        proxy = random.choice(self.proxies)
        return "%s:%d" % (proxy[0], proxy[1])

    def del_proxy(self, oldProxy):
        if oldProxy:
            ip = oldProxy.split(':')[1].replace('//', '')
            params = {}
            params['ip'] = ip
            for index, proxy in enumerate(self.proxies):
                if ip in proxy[0]:
                    del self.proxies[index]
                    break
            t = requests.get(DEL_PROXY, params)
            print('delete result = %s ' % t.text)
            pass


proxyUtils = ProxyUtils()
