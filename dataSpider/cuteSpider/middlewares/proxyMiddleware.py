"""
author     :LiHuan
date       :3/24/17 2:55 PM
description:
"""

from cuteSpider.middlewares.proxy import proxyUtils


class ProxyMiddleware:
    def process_request(self, request, spider):
        # Set the location of the proxy
        proxy = proxyUtils.get_proxy()
        request.meta['proxy'] = proxy if proxy else None

        # Use the following lines if your proxy requires authentication
        # proxy_user_pass = "USERNAME:PASSWORD"
        # setup basic authentication for the proxy
        # encoded_user_pass = base64.encodebytes(proxy_user_pass)
        # request.headers['Proxy-Authorization'] = 'Basic ' + encoded_user_pass
