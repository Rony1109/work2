'''
功能：爬取数据
'''

import re, time, os, json
import sys
from scrapy.spiders import Spider
from scrapy_redis.utils import bytes_to_str

from config import *
from cuteSpider.items.alibabaItem import LoginCookiesItem, ProductInfoItem, CompanyItem, \
    ContactItem
from store.redis import MyRedis
from store.chaojiying import Chaojiying_Client
from store.alibabaStore import ProductInfoDao, CompanyDao, ContactDao
from scrapy_redis.spiders import RedisSpider
from store.alibabaStore import cookiesUrlkey, searchUrlKey, pageMaxSetKey, pageMaxControl, pageMaxKey, detailUrlkey, \
    detailUrlSetKey, detailUrlControl, \
    companySetUrlKey, \
    contactSetUrlKey, \
    companyUrlKey, \
    contactUrlKey, companySetNewUrlKey, contactSetNewUrlKey, infoUrl, contactUrl
from scrapy.selector import Selector

from selenium import webdriver
from selenium.webdriver.common.proxy import ProxyType
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from cuteSpider.middlewares.proxy import proxyUtils
from .useragent import get_header
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

## 变量
redis = MyRedis()
proxy = webdriver.Proxy()
proxy.proxy_type = ProxyType.MANUAL
# 识别验证码
chaojiying = Chaojiying_Client()
main_url = 'https://www.1688.com/'
sec_url = "https://sec.1688.com"
taobaoLoginUrl = "login.taobao.com"
alibabaLoginUrl = "login.1688.com"

cookiesList = eval(redis.redisServer.get(cookiesUrlkey)) if redis.redisServer.get(cookiesUrlkey) else None


# windows执行
class LoginCookiesSpider(Spider):
    name = 'alibabaLoginCookies'
    start_urls = [main_url]
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.alibabaPipelines.LoginCookiesPipeline': 100,
        },
    }

    def parse(self, response):
        # binary = FirefoxBinary('D:\Program Files (x86)\Mozilla Firefox\\firefox.exe')
        # driver = webdriver.Firefox(firefox_binary=binary)
        driver = webdriver.Firefox()
        # url = "https://login.taobao.com/member/login.jhtml?style=b2b&css_style=b2b&from=b2b&newMini2=true&full_redirect=true&redirect_url=https%3A%2F%2Flogin.1688.com%2Fmember%2Fjump.htm%3Ftarget%3Dhttps%253A%252F%252Flogin.1688.com%252Fmember%252FmarketSigninJump.htm%253FDone%253Dhttp%25253A%25252F%25252Fmember.1688.com%25252Fmember%25252Foperations%25252Fmember_operations_jump_engine.htm%25253Ftracelog%25253Dlogin%252526operSceneId%25253Dafter_pass_from_taobao_new%252526defaultTarget%25253Dhttp%2525253A%2525252F%2525252Fwork.1688.com%2525252F%2525253Ftracelog%2525253Dlogin_target_is_blank_1688&reg=http%3A%2F%2Fmember.1688.com%2Fmember%2Fjoin%2Fenterprise_join.htm%3Flead%3Dhttp%253A%252F%252Fmember.1688.com%252Fmember%252Foperations%252Fmember_operations_jump_engine.htm%253Ftracelog%253Dlogin%2526operSceneId%253Dafter_pass_from_taobao_new%2526defaultTarget%253Dhttp%25253A%25252F%25252Fwork.1688.com%25252F%25253Ftracelog%25253Dlogin_target_is_blank_1688%26leadUrl%3Dhttp%253A%252F%252Fmember.1688.com%252Fmember%252Foperations%252Fmember_operations_jump_engine.htm%253Ftracelog%253Dlogin%2526operSceneId%253Dafter_pass_from_taobao_new%2526defaultTarget%253Dhttp%25253A%25252F%25252Fwork.1688.com%25252F%25253Ftracelog%25253Dlogin_target_is_blank_1688%26tracelog%3Dlogin_s_reg"
        url = "https://login.1688.com/member/signin.htm?spm=a260k.635.2683862.d3.ZZCKXi&Done=https%3A%2F%2Fwww.1688.com%2F"
        driver.get(url)

        taobaoLoginUrl = "login.taobao.com"
        alibabaLoginUrl = "login.1688.com"
        # 获取登录cookies
        cookies = []
        while True:
            cookies = driver.get_cookies()
            current_url = driver.current_url
            if taobaoLoginUrl in current_url or alibabaLoginUrl in current_url:
                time.sleep(1)
            else:
                cookies = cookies
                #print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>cookies=======================================%s' % cookies)
                driver.quit()
                break

        return LoginCookiesItem(cookies=cookies)


# 功能：获取所有分页链接
class PageSpider(RedisSpider):
# class PageSpider(Spider):
    name = 'csalibabaPageLink'
     # start_urls = ['https://longchuanjidian.1688.com/page/offerlist.htm?spm=a2615.7691456.0.0.32eda887vHXNus',
     #               'https://shop1471019907846.1688.com/page/offerlist.htm?spm=a2615.2177701.0.0.ef2a4a5UkH5f3',
     #               'https://rhwj158.1688.com/page/offerlist.htm?spm=a2615.2177701.0.0.4ba30a4dIZM4jb',
     #               'https://dgbufan.1688.com/page/offerlist.htm?spm=a2615.2177701.0.0.516f5eb0Z65mhV',
     #               'https://shop1403512304706.1688.com/page/offerlist.htm?spm=a2615.2177701.0.0.1a3a2283RgTLns']
    redis_key = searchUrlKey
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.alibabaPipelines.PageMaxPipeline': 100,
        },
    }

    def make_request_from_data(self, data):

        url = bytes_to_str(data, self.redis_encoding)
        desired_capabilities = DesiredCapabilities.PHANTOMJS.copy()
        headers = get_header()["User-Agent"]
        desired_capabilities["phantomjs.page.settings.userAgent"] = headers
        driver = webdriver.PhantomJS(
            desired_capabilities=desired_capabilities) if sys.platform == 'win32' else webdriver.PhantomJS(
            '/opt/phantomjs/bin/phantomjs', desired_capabilities=desired_capabilities)
        driver.set_window_size(1920, 1080)

        # proxyStr = proxyUtils.get_proxy_alibaba()
        # if proxyStr:
        #     proxy.http_proxy = proxyStr
            # self.proxy.add_to_capabilities(webdriver.DesiredCapabilities.PHANTOMJS)
            # driver.start_session(webdriver.DesiredCapabilities.PHANTOMJS)
        # proxy.add_to_capabilities(get_header())
        # driver.start_session(get_header())


        try:
            driver.get(url)
            # driver.save_screenshot("aaaaa.png")
            # print('======================driver.page_source============================%s' % driver.page_source)
            driver.delete_all_cookies()
            for cookies in cookiesList:
                driver.add_cookie(cookies)


            num = 0
            if taobaoLoginUrl in driver.current_url or alibabaLoginUrl in driver.current_url:
                num += 1
                driver.get(url)
                time.sleep(2)
                pass

            # 识别验证码
            if sec_url in driver.current_url:
                chaojiying.autoCheckCode(driver, driver.current_url)
            body = Selector(text=driver.page_source)
            pageMax = body.xpath('//em[@class="page-count"]/text()').extract()
            pageMax=pageMax and int(pageMax[0]) or 1


            for i in range(1,int(pageMax+1)):
                page_link = driver.current_url + '&pageNum=%s' % i
                redis.redisServer.lpush(pageMaxKey, page_link)
        except Exception as e:
            pass
            #print("alibabaProductPage ====> make_request_from_data error ====> %s" % e)
        finally:
            try:
                #print("alibabaProductPage ====> driver.close<<<<===============================>>>>")
                driver.quit()
                pass
            except Exception as ec:
                pass
                #print("alibabaProductPage ====> close driver error ====> %s" % ec)

    '''
    # Spider时使用
    def start_requests(self):
        #print("start_requests=================================")
        for url in self.start_urls:
            #print('url ================================= %s ' % url)

            proxyStr = proxyUtils.get_proxy_alibaba()
            #print('proxy IP = %s ' % proxyStr)
            if proxyStr:
                self.proxy.http_proxy = proxyStr
                self.proxy.add_to_capabilities(webdriver.DesiredCapabilities.PHANTOMJS)
                driver.start_session(webdriver.DesiredCapabilities.PHANTOMJS)

            for cookies in cookiesList:
                driver.add_cookie(cookies)

            driver.get(url)
            time.sleep(1)

            #print("curl=========>%s" % (driver.current_url))

            if taobaoLoginUrl in driver.current_url or alibabaLoginUrl in driver.current_url:
                #print("==========please login the web site first==========")
                return

            # 识别验证码
            if sec_url in driver.current_url:
                chaojiying.autoCheckCode(driver, driver.current_url)

            driver.save_screenshot("aaaaa.png")
            #print(driver.find_element_by_xpath('//input[@name="keywords"]').get_attribute("value"))
            body = Selector(text=driver.page_source)
            pageMax = body.xpath('//div[@id="sm-pagination"]/div/@data-total-page').extract()[0]

            for i in range(int(pageMax)):
                page_link = driver.current_url + '#beginPage=%s&offset=10' % i
                redis.redisServer.lpush(pageMaxKey, page_link)
            #print("end -------------------------------------")
            yield self.make_requests_from_url("https://www.baidu.com/")
    '''


# 功能：获取的产品链接
class ProductSpider(RedisSpider):
    # class ProductSpider(Spider):
    name = 'csalibabaProductLink'
    # start_urls = [
    #     'https://s.1688.com/selloffer/offer_search.htm?keywords=%BB%B7%B1%A3%CE%FD%B8%E0&button_click=top&earseDirect=false&n=y&smToken=8ed899d36cc142319a5b0820fa2f2abe&smSign=mD%2Bk2B0c%2BSGK8ctVu2qOxg%3D%3D&beginPage=32&offset=10']
    redis_key = pageMaxKey
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.alibabaPipelines.ProductPipeline': 100,
        },
    }
    thiscontrol = True
    thisCookiecontrol=True

    def make_request_from_data(self, data):
        url = bytes_to_str(data, self.redis_encoding)

        desired_capabilities = DesiredCapabilities.PHANTOMJS.copy()
        headers = get_header()["User-Agent"]
        desired_capabilities["phantomjs.page.settings.userAgent"] = headers
        desired_capabilities["phantomjs.page.settings.loadImages"] = False
        driver = webdriver.PhantomJS(
            desired_capabilities=desired_capabilities) if sys.platform == 'win32' else webdriver.PhantomJS(
            '/opt/phantomjs/bin/phantomjs', desired_capabilities=desired_capabilities)
        driver.set_window_size(1920, 1080)

        # proxyStr = proxyUtils.get_proxy_alibaba()

        # #print('1111111===========================proxyStr=====================================%s ' %  proxyStr)
        # if proxyStr:
        #     proxy.http_proxy = proxyStr

        # proxy.add_to_capabilities(get_header())
        # driver.start_session(get_header())

        try:
            # 模仿用户操作，下拉滚动条

            driver.get(url)

            driver.delete_all_cookies()
            for cookies in cookiesList:
                driver.add_cookie(cookies)

            js = """
                                (function () {
                                function f(){
                                    window.scroll(0, 9999);
                                    setTimeout(f, 500);
                                }
                                var newabcd=document.createElement('div');
                                newabcd.innerHTML =navigator.userAgent;
                                document.body.appendChild(newabcd);
                               f()

                                })();
                            """
            num = 0
            if taobaoLoginUrl in driver.current_url or alibabaLoginUrl in driver.current_url:
                num += 1
                # for cookies in cookiesList:
                #     driver.add_cookie(cookies)
                driver.get(url)
                time.sleep(2)

            # 识别验证码
            if sec_url in driver.current_url:
                chaojiying.autoCheckCode(driver, driver.current_url)
                time.sleep(2)

            driver.execute_script(js)
            # #print('================cookies================ %s'  % driver.get_cookies())
            time.sleep(2)
            # driver.save_screenshot("aaaaa.png")
            # #print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>==========================driver.page_source=========================== %s' % len(self.driver.page_source))
            body = Selector(text=driver.page_source)
            # txt1name = re.search(r'\d+$', url, flags=0)
            # txt1name = txt1name and txt1name.group(0) or ""
            # #print('========================txt1name=============================== %s' % txt1name)
            # txtpath='E:/temp/'+txt1name+'-'+str(num)+'.txt' if sys.platform == 'win32' else  '/data/checkcode/'+txt1name+'-'+str(num)+'.txt'
            # with open(txtpath, 'wb') as f:
            #     f.write(bytes(driver.page_source,encoding = "utf8"))

            a_href_arr = body.xpath('//div[@class="common-column-150"]//node()/li/div[contains(@class, "image")]/a/@href').extract()
            print('<><><><><><><><><><><><><><><><><>a_href_arr=========================== %s' % a_href_arr)

            for _url in a_href_arr:
                # #print('===============================================================_url==============================_url===================== %s' % _url)
                redis.redisServer.sadd(detailUrlSetKey, _url)
            # #print('=====================================>>>>>>>>>>>>>>>>> %s' % len(body.xpath('//ul[@id="sm-offer-list"]').extract()))
            # #print('>>>>>>>>>>>>>>>>>>>>>>>>>>>=========================================urllen==========================url===================== %s' % len(a_href_arr))
            # txtpath2 = 'E:/temp/' + txt1name + '-' + str(
            #     num) + '.jpg' if sys.platform == 'win32' else  '/data/checkcode/' + txt1name + '-' + str(num) + '.jpg'
            # driver.save_screenshot(txtpath2)
            if int(redis.redisServer.llen(pageMaxKey)) == 0:
                if self.thiscontrol:
                    self.thiscontrol = False
                    if int(redis.redisServer.scard(pageMaxControl)) == 0:
                        redis.redisServer.sadd(pageMaxControl, "True")
                        detailUrl_set = redis.redisServer.smembers(detailUrlSetKey)
                        for linkset in detailUrl_set:
                            redis.redisServer.lpush(detailUrlkey, linkset)
        except Exception as e:
            #print("alibabaProduct ====> make_request_from_data error ====> %s" % e)
            pass
        finally:
            try:
                #print("alibabaProduct ===> driver.close<<<<===============================>>>> %s" % time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())))
                driver.quit()
                pass
            except Exception as ec:
                pass
                #print("alibabaProduct ====> close driver error ====> %s===== %s" % (ec,time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))))


# 功能：获取产品详情中的数据
class ProductInfoSpider(RedisSpider):
    # class ProductInfoSpider(Spider):
    name = 'csalibabaProductDetail'
    # start_urls = ['https://detail.1688.com/offer/522196125959.html']
    redis_key = detailUrlkey
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.pipelines.ImagesPipeline': 200,
            'cuteSpider.pipelines.alibabaPipelines.ProductInfoPipeline': 500,
        },
        'IMAGES_STORE': '/data/images/alibaba',
    }
    thiscontrol = True

    def start_requests(self):
        """Returns a batch of start requests from redis."""
        try:
            return self.next_requests()
        except Exception as e:
            #print("ProductInfoSpider=======================>start_requests====>%s" % e)
            return None

    def make_request_from_data(self, data):
        url = bytes_to_str(data, self.redis_encoding)

        desired_capabilities = DesiredCapabilities.PHANTOMJS.copy()
        headers = get_header()["User-Agent"]
        desired_capabilities["phantomjs.page.settings.userAgent"] = headers
        driver = webdriver.PhantomJS(
            desired_capabilities=desired_capabilities) if sys.platform == 'win32' else webdriver.PhantomJS(
            '/opt/phantomjs/bin/phantomjs', desired_capabilities=desired_capabilities)
        driver.set_window_size(1920, 1080)

        # proxyStr = proxyUtils.get_proxy_alibaba()
        # if proxyStr:
        #     proxy.http_proxy = proxyStr
        # proxy.add_to_capabilities(get_header())
        # driver.start_session(get_header())


        try:
            driver.get(url)
            driver.save_screenshot('111.jpg')
            driver.delete_all_cookies()
            for cookies in cookiesList:
                driver.add_cookie(cookies)

            num = 0
            if taobaoLoginUrl in driver.current_url or alibabaLoginUrl in driver.current_url:
                num += 1
                driver.get(url)
                time.sleep(2)
                pass

            # 识别验证码
            if sec_url in driver.current_url:
                chaojiying.autoCheckCode(driver, driver.current_url)

            body = Selector(text=driver.page_source)
            # print('================================driver.page_source===============================%s' % driver.page_source)
            self.parse_data(body, driver.current_url)
            if int(redis.redisServer.llen(detailUrlkey)) == 0:
                if self.thiscontrol:
                    self.thiscontrol = False
                    if int(redis.redisServer.scard(detailUrlControl)) == 0:
                        #print('detailUrlControl==================================0======================')
                        redis.redisServer.sadd(detailUrlControl, "True")

                        company_set_new = redis.redisServer.smembers(companySetNewUrlKey)
                        for info in company_set_new:
                            redis.redisServer.lpush(companyUrlKey, info)
                        contact_set_new = redis.redisServer.smembers(contactSetNewUrlKey)
                        for info in contact_set_new:
                            redis.redisServer.lpush(contactUrlKey, info)


        except Exception as e:
            pass
            #print("alibabaProductInfo ====> make_request_from_data error ====> %s" % e)
        finally:
            try:
                #print("alibabaProductInfo ====> driver.close<<<<===============================>>>>")
                driver.quit()
                pass
            except Exception as ec:
                #print("alibabaProductInfo ====> close driver error ====> %s" % ec)
                pass

    def parse_data(self, body, curl):
        # 获取数据
        memberId = body.xpath('//input[@id="feedbackUid"]/@value').extract()[0]
        productId = curl.split('/')[4].split('.')[0]
        productName = body.xpath('//div[@id="mod-detail-title"]/h1/text()').extract()[0]
        prices = body.xpath('//tr[@class="price"]').xpath("normalize-space(string(.))").extract()[0]
        minAmount = body.xpath('//tr[@class="amount"]').xpath("normalize-space(string(.))").extract()[0]
        star = ''
        star_i = body.xpath('//p[@class="star-level"]/i/@class').extract()
        if len(star_i) > 0:
            pre_star = star_i[0]
            star = re.sub(r"\D", "", pre_star)

        bargain = ''
        pre_bargain = body.xpath('//p[@class="bargain-number"]/a').xpath("string(.)").extract()
        if len(pre_bargain) > 0:
            bargain = re.sub(r"\D", "", pre_bargain[0])

        satisfaction = ''
        pre_satisfaction = body.xpath('//p[@class="satisfaction-number"]/a').xpath("string(.)").extract()
        if len(pre_satisfaction) > 0:
            satisfaction = re.sub(r"\D", "", pre_satisfaction[0])

        sku_tr = body.xpath('//table[@class="table-sku"]/tbody/tr')
        sku_arr = []
        for index, tr in enumerate(sku_tr):
            skuObj = {}
            name = tr.xpath('td[@class="name"]').xpath("normalize-space(string(.))").extract()[0]
            price = tr.xpath('td[@class="price"]').xpath("normalize-space(string(.))").extract()[0]
            count = tr.xpath('td[@class="count"]').xpath("normalize-space(string(.))").extract()[0]
            skuObj['规格%s' % (index + 1)] = name
            skuObj['价格'] = price
            skuObj['数量'] = count
            sku_arr.append(skuObj)
        sku = json.dumps(sku_arr, ensure_ascii=False)
        # 详细信息
        detail_tr = body.xpath('//div[@id="mod-detail-attributes"]/div/table/tbody/tr/td/text()').extract()
        # 列表转字典
        detail = json.dumps(dict(zip(detail_tr[0::2], detail_tr[1::2])), ensure_ascii=False)

        image_src = list(set(body.xpath('//ul[@class="nav nav-tabs fd-clr"]/li/div/a/img/@src').extract()))
        image_urls = []
        pics = ''
        for index, a_src in enumerate(image_src):
            image = a_src.replace('60x60', '400x400')
            if index < DOWNLOAD_IMAGE_SIZE:
                image_urls.append(image)
                if index == 0:
                    pics = image
                else:
                    pics += ',' + a_src.replace('60x60', '400x400').split('cbu01.alicdn.com')[1]

        # 保存供应商链接和联系人链接
        if len(memberId) > 0:
            company_url = infoUrl % memberId
            contact_url = contactUrl % memberId
            # 增量更新
            company_set = redis.redisServer.smembers(companySetUrlKey)
            contact_set = redis.redisServer.smembers(contactSetUrlKey)

            if company_url not in company_set:
                redis.redisServer.sadd(companySetNewUrlKey, company_url)
            if contact_url not in contact_set:
                redis.redisServer.sadd(contactSetNewUrlKey, contact_url)

        item = ProductInfoItem(memberId=memberId, productId=productId, productUrl=curl,
                               productName=productName,
                               prices=prices, minAmount=minAmount, star=star, bargain=bargain,
                               satisfaction=satisfaction, sku=str(sku), pics=pics, detail=detail)
        # 保存数据
        dao = ProductInfoDao()
        dao.insert(item)


# 供应商基本信息
class CompanyInfoSpider(RedisSpider):
    # class CompanyInfoSpider(Spider):
    name = 'alibabaIntroduce'
    # start_urls = [
    #     'https://corp.1688.com/page/index.htm?memberId=b110032025&fromSite=company_site&tab=companyWeb_detail']
    redis_key = companyUrlKey
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.alibabaPipelines.CompanyPipeline': 500,
        },
        'DOWNLOADER_MIDDLEWARES': {
            'scrapy.contrib.downloadermiddleware.cookies.CookiesMiddleware': 700,
        },
    }
    thiscontrol = True

    def make_request_from_data(self, data):
        url = bytes_to_str(data, self.redis_encoding)

        desired_capabilities = DesiredCapabilities.PHANTOMJS.copy()
        headers = get_header()["User-Agent"]
        desired_capabilities["phantomjs.page.settings.userAgent"] = headers
        driver = webdriver.PhantomJS(
            desired_capabilities=desired_capabilities) if sys.platform == 'win32' else webdriver.PhantomJS(
            '/opt/phantomjs/bin/phantomjs', desired_capabilities=desired_capabilities)
        driver.set_window_size(1920, 1080)

        # proxyStr = proxyUtils.get_proxy_alibaba()
        # if proxyStr:
        #     proxy.http_proxy = proxyStr
        # proxy.add_to_capabilities(get_header())
        # self.driver.start_session(get_header())
        # self.driver.delete_all_cookies()


        try:
            driver.get(url)

            driver.delete_all_cookies()
            for cookies in cookiesList:
                driver.add_cookie(cookies)

            num = 0
            if taobaoLoginUrl in driver.current_url or alibabaLoginUrl in driver.current_url:
                num += 1
                driver.get(url)
                time.sleep(2)
                pass

            # 识别验证码
            if sec_url in driver.current_url:
                chaojiying.autoCheckCode(driver, driver.current_url)

            body = Selector(text=driver.page_source)
            self.parse_data(body, driver.current_url)

            if int(redis.redisServer.llen(companyUrlKey)) == 0:
                if self.thiscontrol:
                    self.thiscontrol = False
                    redis.redisServer.srem(pageMaxControl, "True")
                    redis.redisServer.srem(detailUrlControl, "True")

                    company_set_new = redis.redisServer.smembers(companySetNewUrlKey)
                    for company_url in company_set_new:
                        redis.redisServer.sadd(companySetUrlKey, company_url)
                        redis.redisServer.srem(companySetNewUrlKey, company_url)
                    contact_set_new = redis.redisServer.smembers(contactSetNewUrlKey)
                    for contact_url in contact_set_new:
                        redis.redisServer.sadd(contactSetUrlKey, contact_url)
                        redis.redisServer.srem(contactSetNewUrlKey,contact_url)

        except Exception as e:
            pass
            #print("alibabaCompanyInfo ====> make_request_from_data error ====> %s" % e)
        finally:
            try:
                #print("alibabaCompanyInfo ====> driver.close<<<<===============================>>>>")
                driver.quit()
                pass
            except Exception as ec:
                pass
                #print("alibabaCompanyInfo ====> close driver error ====> %s" % ec)

    def parse_data(self, body, curl):
        item = CompanyItem(memberId='', companyName='', scope='', bussinessIndustry='', model='', diy='',
                           registerMoney='', registerDate='',
                           licenseAddress='', companyType='', legalPerson='', licenseNumber='')
        mem = curl.split('?')[1].split('&')
        for a in mem:
            a_arr = a.split('=')
            if a_arr[0] == 'memberId':
                item['memberId'] = a_arr[1]
        companyName = body.xpath('//h1[@class="company-name"]/text()').extract()
        companyName= companyName and companyName[0] or ""
        item['companyName'] = companyName
        # table: 基本信息
        table_info = body.xpath('//div[@class="content"]/table[1]/tbody')
        for table in table_info:
            head_title = table.xpath('tr[@class="head-title"]').xpath("normalize-space(string(.))").extract()
            head_title = head_title and   head_title[0] or ""
            trs = table.xpath('tr[@class="content-info"]')
            for tr in trs:
                title = tr.xpath('td[@class="title"]').xpath("normalize-space(string(.))").extract()
                title = title and title[0] or ""
                info = tr.xpath('td[@class="info"]').xpath("normalize-space(string(.))").extract()
                info = info and info[0] or ""
                if '主营产品或服务' in title:
                    item['scope'] = info
                elif '主营行业' in title:
                    item['bussinessIndustry'] = info
                elif '经营模式' in title:
                    item['model'] = info
                elif '是否提供加工/定制服务' in title:
                    item['diy'] = info
                elif '注册资本' in title:
                    item['registerMoney'] = info
                elif '公司成立时间' in title:
                    item['registerDate'] = info
                elif '公司注册地' in title:
                    item['licenseAddress'] = info
                elif '企业类型' in title:
                    item['companyType'] = info
                elif '法定代表人' in title:
                    item['legalPerson'] = info
                elif '工商注册号' in title:
                    item['licenseNumber'] = info

        dao = CompanyDao()
        dao.insert(item)


# 联系方式
class ContactSpider(RedisSpider):
    # class ContactSpider(Spider):
    name = 'alibabaContact'
    # start_urls = [
    #     'https://corp.1688.com/page/index.htm?memberId=03977456149&fromSite=company_site&tab=companyWeb_contact']
    redis_key = contactUrlKey
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.alibabaPipelines.ContactPipeline': 500,
        },
        'DOWNLOADER_MIDDLEWARES': {
            'scrapy.contrib.downloadermiddleware.cookies.CookiesMiddleware': 700,
        },
        'IMAGES_STORE': '/data/images/alibaba',
    }

    def make_request_from_data(self, data):
        url = bytes_to_str(data, self.redis_encoding)

        desired_capabilities = DesiredCapabilities.PHANTOMJS.copy()
        headers = get_header()["User-Agent"]
        desired_capabilities["phantomjs.page.settings.userAgent"] = headers
        driver = webdriver.PhantomJS(
            desired_capabilities=desired_capabilities) if sys.platform == 'win32' else webdriver.PhantomJS(
            '/opt/phantomjs/bin/phantomjs', desired_capabilities=desired_capabilities)
        driver.set_window_size(1920, 1080)
        # proxyStr = proxyUtils.get_proxy_alibaba()
        # #print('proxyStr ===============> %s ' % proxyStr)
        # if proxyStr:
        #     proxy.http_proxy = proxyStr
        # proxy.add_to_capabilities(get_header())
        # driver.start_session(get_header())
        # driver.delete_all_cookies()


        try:
            driver.get(url)
            driver.delete_all_cookies()
            for cookies in cookiesList:
                driver.add_cookie(cookies)

            num = 0
            if taobaoLoginUrl in driver.current_url or alibabaLoginUrl in driver.current_url:
                num += 1
                driver.get(url)
                time.sleep(2)
                pass

            # 识别验证码
            if sec_url in driver.current_url:
                chaojiying.autoCheckCode(driver, driver.current_url)
            time.sleep(2)
            body = Selector(text=driver.page_source)
            self.parse_data(body, driver.current_url)
        except Exception as e:
            pass
            #print("alibabaContact ====> make_request_from_data error ====> %s" % e)
        finally:
            try:
                #print("alibabaContact ====> driver.close<<<<===============================>>>>")
                driver.quit()
                pass
            except Exception as ec:
                pass
                #print("alibabaContact ====> close driver error ====> %s" % ec)

    def parse_data(self, body, curl):

        item = ContactItem(memberId='', contacts='', telephone='', mobile='', fax='', address='', zipCode='',
                           website='')
        com_url = curl
        mem = com_url.split('?')[1].split('&')
        for a in mem:
            a_arr = a.split('=')
            if a_arr[0] == 'memberId':
                item['memberId'] = a_arr[1]
        # table: 联系方式
        tr_arr = body.xpath('//div[@class="content"]/table[1]/tbody/tr[@class="content-info"]')
        for tr in tr_arr:
            title = tr.xpath('td[@class="title"]').xpath("normalize-space(string(.))").extract()
            title = title and title[0] or ""
            info = tr.xpath('td[@class="info"]').xpath("normalize-space(string(.))").extract()
            info = info and info[0] or ""
            if '联系人' in title:
                item['contacts'] = info
            elif '电话' in title:
                item['telephone'] = info
            elif '移动电话' in title:
                item['mobile'] = info
            elif '传真' in title:
                item['fax'] = info
            elif '地址' in title:
                item['address'] = info
            elif '邮编' in title:
                item['zipCode'] = info
            elif '公司主页' in title:
                item['website'] = info

        dao = ContactDao()
        dao.insert(item)
