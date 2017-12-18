"""
author     :LiHuan
date       :5/18/17 4:43 PM
description:
"""

import time
from selenium import webdriver
from test.phantomjs.useragent import get_header
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

url = "https://www.wenjuan.com/s/rYfAFrU/"
clickCount = 0
while True:
    try:
        desired_capabilities = DesiredCapabilities.PHANTOMJS.copy()
        headers = get_header()["User-Agent"]
        desired_capabilities["phantomjs.page.settings.userAgent"] = headers
        driver = webdriver.PhantomJS(desired_capabilities=desired_capabilities)
        desired_capabilities["phantomjs.page.settings.loadImages"] = False
        driver.get(url)
        driver.find_element_by_xpath("//input[@id='option_593e6b20f27e69b97edfd084']/../../label").click()
        time.sleep(1)
        driver.find_element_by_xpath("//input[@id='option_5940e668a320fc7a3f2492fb']/../../label").click()
        driver.save_screenshot('img_%s.jpg' % clickCount)
        driver.find_element_by_xpath("//div[@id='next_button']").click()
        driver.save_screenshot('img_%s.png' % clickCount)
        clickCount += 1
        driver.quit()
    except:
        time.sleep(3)
    print('time=>'+time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))+' clickCount=>%s' % clickCount)
