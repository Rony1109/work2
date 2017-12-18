"""
author     :LiHuan
date       :5/25/17 2:06 PM
description:
"""

import time

import redis
from selenium import webdriver

from config import REDIS_HOST, REDIS_PORT
from store.alibabaStore import cookiesUrlkey

# from selenium.webdriver.common.proxy import ProxyType
# from selenium.webdriver.firefox.firefox_binary import FirefoxBinary

redisServer = redis.Redis(REDIS_HOST, REDIS_PORT)

cookiesList = eval(redisServer.get(cookiesUrlkey))

# cookiesList = None

# binary = FirefoxBinary('/usr/lib64/firefox/firefox')
# driver = webdriver.Firefox(firefox_binary=binary)

driver = webdriver.PhantomJS(executable_path="/opt/phantomjs/bin/phantomjs")


driver.delete_all_cookies()
for cookies in cookiesList:
    driver.add_cookie(cookies)

driver.get("https://www.1688.com/")
time.sleep(3)

driver.save_screenshot("bbbbb.png")
