from selenium import webdriver
from selenium.webdriver.support import ui
from scrapy.http import HtmlResponse
import time
import  sys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from cuteSpider.spiders.useragent import get_header


class javaScriptMiddleware(object):
    def process_request(self, request, spider):
        # print('js spider = %s' % spider.name)
        if spider.name == "hc360ProductLink":

            desired_capabilities = DesiredCapabilities.PHANTOMJS.copy()
            headers = get_header()["User-Agent"]
            desired_capabilities["phantomjs.page.settings.userAgent"] = headers
            desired_capabilities["phantomjs.page.settings.loadImages"] = False
            driver = webdriver.PhantomJS(
                desired_capabilities=desired_capabilities) if sys.platform == 'win32' else webdriver.PhantomJS(
                '/opt/phantomjs/bin/phantomjs', desired_capabilities=desired_capabilities)
            driver.set_window_size(1366, 8000)

            # print ("PhantomJS is starting...")

            driver.get(request.url)
            js = """
                                (function () {
                                window.scroll(0, 8000);
                                //var newabcd=document.createElement('div');
                                //newabcd.innerHTML =navigator.userAgent;
                                //document.body.appendChild(newabcd);
                                })();
                            """
            driver.execute_script(js)  # 模仿用户操作，下拉滚动条
            time.sleep(3)
            # driver.save_screenshot('E:/temp/shot_%s.jpg' % time.strftime('%Y-%m-%d_%H-%M-%S',time.localtime(time.time())))
            body = driver.page_source
            # print ("PhantomJS is visiting "+request.url)
            # driver.quit()
            return HtmlResponse(driver.current_url, body=body, encoding='utf-8', request=request)
        else:
            return