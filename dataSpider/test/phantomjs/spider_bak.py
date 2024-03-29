"""
author     :LiHuan
date       :5/24/17 4:03 PM
description:
"""

import time

import redis
from selenium import webdriver
from selenium.webdriver.common.proxy import ProxyType

from config import REDIS_HOST, REDIS_PORT
from store.alibabaStore import cookiesUrlkey, searchUrlKey
from store.chaojiying import Chaojiying_Client
from test.phantomjs.useragent import get_header
from test.phantomjs.proxy import proxyUtils

# 识别验证码
chaojiying = Chaojiying_Client()

redisServer = redis.Redis(REDIS_HOST, REDIS_PORT)

cookiesList = eval(redisServer.get(cookiesUrlkey))

# cookiesList = None
# binary = FirefoxBinary('/usr/lib64/firefox/firefox')
# driver = webdriver.Firefox(firefox_binary=binary)

driver = webdriver.PhantomJS(executable_path="/opt/phantomjs/bin/phantomjs")

taobaoLoginUrl = "login.taobao.com"
alibabaLoginUrl = "login.1688.com"
sec_url = "https://sec.1688.com"

proxy = webdriver.Proxy()
proxy.proxy_type = ProxyType.MANUAL

# driver.delete_all_cookies()
# for cookies in cookiesList:
#     driver.add_cookie(cookies)
#     # print(cookies)

# print("cookies1====>%s" % cookiesList)
# print("cookies10====>%s" % driver.get_cookies())

def parse(url, whileCount):
    proxyStr = proxyUtils.get_proxy()
    if proxyStr:
        proxy.http_proxy = proxyStr
        proxy.add_to_capabilities(get_header())
        driver.start_session(get_header())

    # driver.get("https://www.1688.com")
    # time.sleep(1)
    # print("cookies2====>%s" % driver.get_cookies())

    # driver.delete_all_cookies()
    for cookies in cookiesList:
        driver.add_cookie(cookies)
        # print(cookies)
    driver.get(url)
    time.sleep(1)
    print("cookies3====>%s" % driver.get_cookies())

    print("curl=%s========>%s" % (whileCount, driver.current_url))

    if taobaoLoginUrl in driver.current_url or alibabaLoginUrl in driver.current_url:
        print("==========please login the web site first==========")
        return

    # 识别验证码
    if sec_url in driver.current_url:
        chaojiying.autoCheckCode(driver, driver.current_url)
        print("cookies4====>%s" % driver.get_cookies())
        print('checkcode after url===== %s ' % driver.current_url)

    # driver.execute_script("location.reload()")

    # body = Selector(text=driver.page_source)
    driver.save_screenshot("aaaaa-%s.png" % whileCount)
    print(driver.find_element_by_xpath('//input[@name="keywords"]').get_attribute("value"))


def run():
    whileCount = 0
    # searchCount = redisServer.llen(searchUrlKey)
    searchCount = 2
    while whileCount != searchCount:
        whileCount += 1
        surl = str(redisServer.lpop(searchUrlKey), 'utf-8')
        # surl = 'https://s.1688.com/selloffer/offer_search.htm?keywords=%CE%E5%BD%F0%B9%A4%BE%DF&n=y&spm=a260k.635.1998096057.d1'
        print("surl=====>%s, searchCount = %s, whileCount = %s" % (surl, searchCount, whileCount))
        parse(surl, whileCount)

run()
