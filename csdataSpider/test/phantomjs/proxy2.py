"""
author     :LiHuan
date       :5/18/17 4:43 PM
description:
"""

from selenium import webdriver
from selenium.webdriver.common.proxy import ProxyType
import  time
from test.phantomjs.useragent import get_header

from cuteSpider.middlewares.proxy import proxyUtils

# cookiesList = None
# driver = webdriver.PhantomJS(executable_path="/opt/phantomjs/bin/phantomjs")
# binary = FirefoxBinary('/usr/lib64/firefox/firefox')
# driver = webdriver.Firefox(firefox_binary=binary)
driver = webdriver.PhantomJS()
print("=============================================")

proxy = webdriver.Proxy()
proxy.proxy_type = ProxyType.MANUAL
# proxy.http_proxy = '85.159.2.205:9999'
proxyStr = proxyUtils.get_proxy_alibaba()
driver.set_window_size(1920, 1080)

print('1111111===========================proxyStr=====================================%s ' %  proxyStr)
if proxyStr:
    proxy.http_proxy = proxyStr
# 将代理设置添加到webdriver.DesiredCapabilities.PHANTOMJS中
# proxy.add_to_capabilities(webdriver.DesiredCapabilities.PHANTOMJS)
driver.start_session(webdriver.DesiredCapabilities.PHANTOMJS)

# proxy.add_to_capabilities(get_header())
# driver.start_session(get_header())

driver.get('http://www.ip168.com/')
# driver.get('https://www.baidu.com/')
# driver.get('http://1212.ip138.com/ic.asp')
time.sleep(15)
driver.save_screenshot('123.jpg')
# print('1: ', driver.session_id)
# print('2: ', driver.page_source)
# print('3: ', driver.get_cookies())
driver.quit()
