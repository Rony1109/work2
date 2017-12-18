import re
from scrapy.spiders import Spider,logging
from scrapy_redis.spiders import RedisSpider
from store.hc360Store import searchKey,pageMaxKey,productLinkUrlListkey,introduceLinkkey,contactLinkkey,introduceLinklistkey,\
    contactLinklistkey,productLinkSetkey,productListLinkControlsSetkey,productDetailControlsSetkey,newintroduceLinkkey,newcontactLinkkey
from cuteSpider.items.hc360Item import ProductDetailsItem, PageMaxItem, EnterpriseInfoLinkItem,ProductLinkItem,ProductdetailItem,EnterpriseItem,EnterpriseInfoDetailsItem
from store.redis import MyRedis
from common.common import Common


# 分页
class hc360PageLinkSpider(RedisSpider):
# class PageMaxSpider(Spider):
    name = "hc360PageLink"
    # start_urls = ["http://s.hc360.com/?w=%CB%E6%B3%B5%D7%E9%CC%D7%B9%A4%BE%DF&mc=seller"]
    redis_key = searchKey
    custom_settings = {
        "LOG_LEVEL": "INFO",
        "ITEM_PIPELINES": {
            "cuteSpider.pipelines.hc360Pipelines.PageMaxPipeline": 100,
        },
    }

    def parse(self, response):
        total = response.xpath("//span[@class='total']/text()").extract()
        if len(total) == 0:
            total = [1]
        #print("===============%s" % total)
        pageMax = re.search(r'(\d+)', str(total[0]), flags=0)
        pageMax = pageMax.group(1)
        #print("==============BBBBBBBBBBB=%s" % pageMax)
        return PageMaxItem(pageUrl=response.url + "&", pageMax=pageMax)


 # 商品列表信息界面链接
# class productListLinkSpider(Spider):
class hc360ProductLinkSpider(RedisSpider):
    name = "hc360ProductLink"
    # start_urls = ["http://s.hc360.com/?w=%C6%F8%B6%AF%BD%BA%C7%B9&mc=seller&ee=36&ap=A&t=1","http://s.hc360.com/?w=%C6%F8%B6%AF%BD%BA%C7%B9&mc=seller&ee=36&ap=A&t=1"]
    redis_key = pageMaxKey
    custom_settings = {
        "ITEM_PIPELINES": {
            "cuteSpider.pipelines.hc360Pipelines.ProductListLinkPipeline": 100,
        },
    }

    redis = MyRedis()

    thiscontrol=True

    def parse(self, response):
        productListLinkUrls = response.xpath("//dd[@class='newName']/a/@href").extract()
        if productListLinkUrls is None:
            return
        urlList = []
        #print("==============productListLinkUrls=%s" % productListLinkUrls)
        for productListLinkUrl in productListLinkUrls:
            urlList.append(productListLinkUrl)


        if int(self.redis.redisServer.llen(pageMaxKey)) == 0:
            if self.thiscontrol:
                self.thiscontrol=False
                if int(self.redis.redisServer.scard(productListLinkControlsSetkey)) == 0:
                    self.redis.redisServer.sadd(productListLinkControlsSetkey,"True")
                    #print("controls======================pageMaxKey==llen============================= %s" % self.redis.redisServer.llen(pageMaxKey))
                    #print("controls======================productListLinkControlsSetkey=============================== %s" % self.redis.redisServer.sismember(productListLinkControlsSetkey,"True"))
                    productlink_set = self.redis.redisServer.smembers(productLinkSetkey)
                    for linkset in productlink_set:
                        self.redis.redisServer.lpush(productLinkUrlListkey, linkset)

        return ProductLinkItem(link=urlList)





 # 商品详情页
# class productDetailSpider(Spider):
class hc360ProductDetailSpider(RedisSpider):
    name = "hc360ProductDetail"
    # start_urls = ["http://b2b.hc360.com/supplyself/613001680.html"]
    redis_key = productLinkUrlListkey
    custom_settings = {
        "ITEM_PIPELINES": {
            "cuteSpider.pipelines.hc360Pipelines.ProductDetailPipeline": 100,
        },
    }

    redis = MyRedis()

    thiscontrol = True

    def parse(self, response):
        title = response.xpath("//h1[@id='comTitle']/text()").extract()
        title =  title and title[0] or ""
        logging.debug("========================title=========================== %s" % title)
        price = response.xpath("//div[@id='oriPriceTop']/text()").extract()
        price =  price and price[0] or ""
        price = re.sub(r'\s', '', price, count=0, flags=0)
        #print("========================price=========================== %s" % price)
        unit = response.xpath("//span[@class='supply-numb']/text()").extract()
        unit = unit and unit[0] or ""
        unit = re.sub(r'[\d\s<>=]', '', unit, count=0, flags=0)
        #print("========================unit=========================== %s" % unit)
        total = response.xpath("//span[@class='supply-numb']/text()").extract()
        total = total and total[0] or ""
        total = re.sub(r'[\s\D]', '', total, count=0, flags=0)
        #print("========================total=========================== %s" % total)
        orderInfo1path = response.xpath("//tr[@id='dj_tr']/td[1]/text()").extract()
        orderInfo2path = response.xpath("//tr[@id='dj_tr']/td[2]/text()").extract()
        orderInfo =Common.return2Array(orderInfo1path,orderInfo2path)
        orderInfo = re.sub(r'[¥￥]', '', orderInfo, count=0, flags=0)
        #print("========================orderInfo=========================== %s" % orderInfo)
        company = response.xpath("//div[@class='position']/a[3]|//div[@class='locationLeft']/a[3]").xpath("normalize-space(string(.))").extract()
        company = company and company[0] or ""
        #print("========================company=========================== %s" % company)
        otherInfo1path = response.xpath("//div[@class='d-vopy']//node()/tr/th")
        otherInfo2path = response.xpath("//div[@class='d-vopy']//node()/tr/td")
        otherInfo1path = otherInfo1path.xpath("normalize-space(string(.))").extract()
        otherInfo2path = otherInfo2path.xpath("normalize-space(string(.))").extract()
        otherInfo =Common.return2Array(otherInfo1path,otherInfo2path)
        otherInfo = re.sub(r'[\s：]|同参数产品', '',  otherInfo, count=0, flags=0)
        #print("========================otherInfo=========================== %s" % otherInfo)
        url = response.url
        companyHome = response.xpath("//div[@class='position']/a[3]/@href|//div[@class='locationLeft']/a[3]/@href").extract()
        companyHome = companyHome and companyHome[0] or ""
        #companyHome = re.search(r'(http://.*?/)(.*)', url, flags=0)
        #companyHome = companyHome and companyHome.group(1) or ""
        companyHome = re.sub(r'/$', '', companyHome, count=0, flags=0)
        #print("========================companyHome=========================== %s" % companyHome)
        contact = companyHome + '/shop/company.html'
        #print("======================contact=============================== %s" % contact)
        introduce = companyHome + '/shop/show.html'
        #print("======================introduce=============================== %s" % introduce)
        productId = re.search(r'(.*)/(\d+).*', url, flags=0)
        productId = productId and productId.group(2) or ""
        #print("======================productId=============================== %s" % productId)
        contactControl=True if int(self.redis.redisServer.sismember(contactLinkkey,contact)) else False
        introduceControl = True if int(self.redis.redisServer.sismember(introduceLinkkey,introduce)) else False
        pics=response.xpath("//a[@id='imgContainer']/img/@src|//div[@class='vertical-img zoomThumbActive']//node()/img/@src").extract()
        if len(pics)>1:
            pics=pics[1:5]
            picarr=[]
            picnum=0
            for pic in pics:
                picnum+=1
                if picnum>1:
                    pic = re.search(r'(http(s)?://.*?)(/.*)', pic, flags=0)
                    pic = pic and pic.group(3) or ""
                pic = re.sub(r'100x100', '300x300', pic, count=0, flags=0)
                picarr.append(pic)
            pics=','.join(picarr)
            #print("======================pics=============================== %s" % pics)
        else:
            pics  = pics and pics[0] or ""
            #print("======================pics=============================== %s" % pics)

        if int(self.redis.redisServer.llen(productLinkUrlListkey)) == 0:
            if self.thiscontrol:
                self.thiscontrol=False
                if int(self.redis.redisServer.scard(productDetailControlsSetkey)) == 0:
                    self.redis.redisServer.sadd(productDetailControlsSetkey,"True")
                    #print("controls======================productLinkUrlListkey============================== %s" % self.redis.redisServer.llen(productLinkUrlListkey))
                    #print("controls======================productDetailControlsSetkey=============================== %s" % self.redis.redisServer.sismember(productDetailControlsSetkey, "True"))
                    introdu_set = self.redis.redisServer.smembers(newintroduceLinkkey)
                    for info in introdu_set:
                        self.redis.redisServer.lpush(introduceLinklistkey, info)
                    contact_set = self.redis.redisServer.smembers(newcontactLinkkey)
                    for info2 in contact_set:
                        self.redis.redisServer.lpush(contactLinklistkey, info2)

        return ProductdetailItem(title=title,price=price,unit=unit,total=total,orderInfo=orderInfo,pics=pics,
                                 company=company,otherInfo=otherInfo,url=url,contact=contact,introduce=introduce,
                                 companyHome=companyHome,productId=productId,contactControl=contactControl,introduceControl=introduceControl)

#商家联系方式
# class productDetailSpider(Spider):
class hc360ContactSpider(RedisSpider):
    name = "hc360Contact"
    redis_key = contactLinklistkey
    # start_urls =["http://jxxfg.b2b.hc360.com/shop/company.html"]
    #start_urls =["http://xiaozhan888.b2b.hc360.com/shop/company.html"]
    custom_settings = {
        "LOG_LEVEL": "INFO",
        "ITEM_PIPELINES": {
            "cuteSpider.pipelines.hc360Pipelines.EnterpriseInfoPipeline": 100,
        },
    }

    def parse(self, response):
        if len(response.xpath("//div[@class='company-words']")):
            contactinfo1path = response.xpath("//div[@class='company-words']/div[@class='key-message']/span/text()").extract()
            contactinfo2path = response.xpath("//div[@class='company-words']/div[@class='key-message']/em")
            contactinfo2path = contactinfo2path.xpath("normalize-space(string(.))").extract()
        elif len(response.xpath("//div[@class='con3Left']")):
            contactinfo1path = response.xpath("//div[@class='con3Left']").xpath("normalize-space(string(.))").extract()
            contactinfo2path = response.xpath("//div[@class='con3Rig']").xpath("normalize-space(string(.))").extract()
        elif len(response.xpath("//div[@class='contactbox']")):
            contactinfo1pathAndinfo2path = response.xpath("//div[@class='contactbox']//table//node()/li").xpath("normalize-space(string(.))").extract()
            contactinfo1pathAndinfo2path=list(filter(Common.filterstr, contactinfo1pathAndinfo2path))
            contactinfo1pathAndinfo2path = list(map(Common.formatstrip, contactinfo1pathAndinfo2path))
            contactinfo1path = [i[0] for i in contactinfo1pathAndinfo2path]
            contactinfo2path = [i[1] for i in contactinfo1pathAndinfo2path]
        else:
            contactinfo1path=[]
            contactinfo2path=[]
        contactinfo1path = list(map(Common.formatstr, contactinfo1path))
        contactinfo2path = list(map(Common.formatstr, contactinfo2path))
        contactinfo = Common.return2Array(contactinfo1path, contactinfo2path)
        #contactinfo = re.sub(r'[\s\\r\\t\\n：]', '', contactinfo, count=0, flags=0)

        url = response.url
        companyHome = re.search(r'(http://.*?/)(.*)', url, flags=0)
        companyHome = companyHome and companyHome.group(1) or ""
        #print("===============contactinfo==============%s" % contactinfo)

        return EnterpriseItem(contactinfo=contactinfo, companyHome=companyHome, url=url)



# 商家详细信息界面数据
# class enterpriseInfoLinkSpider(Spider):
class hc360IntroduceSpider(RedisSpider):
    name = "hc360Introduce"
    # start_urls = ["http://gaomi00.b2b.hc360.com/shop/show.html"]
    redis_key = introduceLinklistkey
    custom_settings = {
        "LOG_LEVEL": "INFO",
        "ITEM_PIPELINES": {
            "cuteSpider.pipelines.hc360Pipelines.EnterpriseInfoDetailsPipeline": 100,
        },
    }

    redis = MyRedis()

    thiscontrol=True

    def parse(self, response):
        if len(response.xpath("//div[@class='company-words']")):
            basicinfo1path = response.xpath("//div[@class='company-words']/ul/li/text()").extract()
            basicinfo2path = response.xpath("//div[@class='company-words']/ul/li/span")
            basicinfo2path = basicinfo2path.xpath("normalize-space(string(.))").extract()
        elif len(response.xpath("//div[@id='detailInfoDiv']")):
            basicinfo1path = response.xpath("//div[@id='detailInfoDiv']//table/tr/td[1]|//div[@id='detailInfoDiv']//table/tr/td[3]").xpath("normalize-space(string(.))").extract()
            basicinfo2path = response.xpath("//div[@id='detailInfoDiv']//table/tr/td[2]|//div[@id='detailInfoDiv']//table/tr/td[4]").xpath("normalize-space(string(.))").extract()
        else:
            basicinfo1path=[]
            basicinfo2path = []
        basicinfo2path =list(map(Common.formatstr, basicinfo2path))
        basicinfo =Common.return2Array(basicinfo1path,basicinfo2path)
        basicinfo = re.sub(r'[\s\\r\\t\\n：]', '', basicinfo, count=0, flags=0)

        contactinfo1path = response.xpath("//div[@class='company-words']/div[@class='key-message']/span/text()").extract()
        contactinfo2path = response.xpath("//div[@class='company-words']/div[@class='key-message']/em")
        contactinfo2path = contactinfo2path.xpath("normalize-space(string(.))").extract()
        contactinfo2path = list(map(Common.formatstr, contactinfo2path))
        contactinfo =Common.return2Array(contactinfo1path,contactinfo2path)
        contactinfo = re.sub(r'[\s\\r\\t\\n：]', '', contactinfo, count=0, flags=0)

        url = response.url
        companyHome = re.search(r'(http://.*?/)(.*)', url, flags=0)
        companyHome = companyHome and companyHome.group(1) or ""
        #print("===============contactinfo==============%s" % contactinfo)

        if int(self.redis.redisServer.llen(introduceLinklistkey)) == 0:
            if self.thiscontrol:
                self.thiscontrol=False
                self.redis.redisServer.srem(productListLinkControlsSetkey,"True")
                self.redis.redisServer.srem(productDetailControlsSetkey, "True")

                introdu_set = self.redis.redisServer.smembers(newintroduceLinkkey)
                for info in introdu_set:
                    self.redis.redisServer.sadd(introduceLinkkey, info)
                    self.redis.redisServer.srem(newintroduceLinkkey, info)
                contact_set = self.redis.redisServer.smembers(newcontactLinkkey)
                for info2 in contact_set:
                    self.redis.redisServer.sadd(contactLinkkey, info2)
                    self.redis.redisServer.srem(newcontactLinkkey, info2)

        return EnterpriseInfoDetailsItem(basicinfo=basicinfo,contactinfo=contactinfo,companyHome=companyHome,url=url)