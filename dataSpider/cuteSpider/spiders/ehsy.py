# -*- coding: utf-8 -*-
import scrapy
import re
from store.redis import MyRedis
from scrapy.spiders import Spider, Request
from scrapy_redis.spiders import RedisSpider
from cuteSpider.items.ehsyItems import EhsySpiderItem, sed_category_item, ProductLinkItem, ProductItem
from store.ehsyStore import oneCategoryKey, searchUrlKey, detailUrlkey, detailUrlSetkey, searchUrlControl
from scrapy.crawler import CrawlerProcess

ehsy_url = "http://www.ehsy.com"
redis = MyRedis()


# 一级类目链接spider
class EhsyspiderSpider(Spider):
    name = "ehsyOnecategory"
    start_urls = ['http://www.ehsy.com/']
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.ehsyPipelines.EhsySpiderPipeline': 100,
        },
    }

    def parse(self, response):
        # 获取所以一级类目链接
        categoryLinks = response.xpath('//li[@class="shopping-li-li"]/a/@href').extract()
        item = EhsySpiderItem()
        item["first_category_links"] = categoryLinks
        return item


# 二级类目链接spider
class child_spider(RedisSpider):
    name = "ehsyTwoCategory"
    redis_key = oneCategoryKey
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.ehsyPipelines.EhsySpiderPipeline': 100,
        },
    }

    def parse(self, response):
        catNodes = response.xpath('//div[@class="catNodes"]/div[2]/a')
        category_links = []
        for category in catNodes:
            sed_category_link = "http://www.ehsy.com{:s}".format(category.xpath("@href").extract()[0])
            category_links.append(sed_category_link)

        item = sed_category_item(category_links=category_links)
        return item


# 所有产品链接spider
class ProductLinkSpider(RedisSpider):
    name = "ehsyProductLink"
    redis_key = searchUrlKey
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.ehsyPipelines.EhsySpiderPipeline': 100,
        },
    }
    thiscontrol = True

    def parse(self, response):
        links = []
        source_link = str(response.url)
        links.append(source_link)
        totalpages = response.xpath("//li[@class='pg-num-total']/text()").extract()
        if totalpages:
            pagestr = str(totalpages[0]).strip()
            maxpage = pagestr[1:len(pagestr) - 1]
            if "?" in source_link:
                link = source_link.split('?')
                for i in range(2, int(maxpage) + 1):
                    pageCondi = "p={}&{}".format(i, link[1])
                    page_link = "{}?{}".format(link[0], pageCondi)
                    #print(page_link)
                    links.append(page_link)
            else:
                for i in range(2, int(maxpage) + 1):
                    pageCondi = "p={}".format(i)
                    page_link = "{}?{}".format(source_link, pageCondi)
                    #print(page_link)
                    links.append(page_link)
        for l in links:
            yield Request(l, self.parse_product_link)

    def parse_product_link(self, response):
        c_link = response.url
        productNotes = response.xpath("//div[@class='productName']/a")
        pLinks = []
        if productNotes:
            for p in productNotes:
                plink = ehsy_url + p.xpath("@href").extract()[0]
                pLinks.append(plink)

        if int(redis.redisServer.llen(searchUrlKey)) == 0:
            if self.thiscontrol:
                self.thiscontrol = False
                if int(redis.redisServer.scard(searchUrlControl)) == 0:
                    redis.redisServer.sadd(searchUrlControl, "True")
                    detailUrl_set = redis.redisServer.smembers(detailUrlSetkey)
                    for linkset in detailUrl_set:
                        redis.redisServer.lpush(detailUrlkey, linkset)
        item = ProductLinkItem(product_links=pLinks)
        return item


class ProductSpider(RedisSpider):
    name = "ehsyProductInfo"
    redis_key = detailUrlkey
    # start_urls = ["http://www.ehsy.com/product-RXE464"]
    custom_settings = {
        'ITEM_PIPELINES': {
            "cuteSpider.pipelines.pipelines.ImagesPipeline": 200,
            'cuteSpider.pipelines.ehsyPipelines.EhsySpiderPipeline': 200,
        },
        'IMAGES_STORE': '/data/images/ehsy',
    }
    thiscontrol = True

    def parse(self, response):
        # 产品链接
        p_link = str(response.url)
        # 产品id
        if "?" in p_link:
            p_id = re.findall(r'product-(.+)\?', p_link)[0]
        else:
            p_id = re.findall(r'product-(.+)', p_link)[0]

        # 类目
        c_name = ""
        c_str = response.xpath("//div[@class='crumbs']/span/a/text()").extract()
        if c_str:
            del (c_str[-1])
            c_name = ">".join(c_str)
            if len(c_name) > 1000:
                c_name = c_name[:1000]

        p_name = response.xpath("//div[@class='productDetail product-detail-repair']/h1/text()").extract()
        p_name = p_name and p_name[0] or ""
        if len(p_name) > 500:
            p_name = p_name[:500]
        p_price = response.xpath("//span[@class='nowPrice-price']/text()").extract()
        p_price = p_price and p_price[0] or ""
        if len(p_price) > 100:
            p_price = p_price[:100]
        p_unit = response.xpath("//span[@class='orgin']/text()").extract()
        p_unit = p_unit and p_unit[0] or ""
        p_unit = p_unit.replace("/", "")
        if len(p_unit) > 100:
            p_unit = p_unit[:100]
        p_brand_no = response.xpath("//span[@class='typeValue']/text()").extract()
        p_brand_no = p_brand_no and p_brand_no[0] or ""
        if len(p_brand_no) > 100:
            p_brand_no = p_brand_no[:100]
        p_minAmount = response.xpath("//span[@class='minCountValue']/text()").extract()
        p_minAmount = p_minAmount and p_minAmount[0] or ""
        if len(p_minAmount) > 1000:
            p_minAmount = p_minAmount[:1000]
        p_properties = "{"
        keys = response.xpath(
            "//div[@class='tabContent data-tab-index1']/div/table/tr[@class='keyValue']/td[1]/text()").extract()
        values = response.xpath(
            "//div[@class='tabContent data-tab-index1']/div/table/tr[@class='keyValue']/td[2]/text()").extract()
        p_brand = ""
        p_properties_list = []
        quote = "\"{}\""
        if values and keys:
            p_brand = values[0]
            for i in range(len(keys)):
                if not i == 0:
                    p_properties_list.append(quote.format(str(keys[i]).replace('"', '\\"')) + ":" + quote.format(
                        str(values[i]).replace('"', '\\"')))
        p_properties = p_properties + ",".join(p_properties_list) + "}"

        if p_brand == "":
            p_brand = p_brand_no
        if len(p_brand) > 500:
            p_brand = p_brand[:500]
        p_content = ""
        content_node = response.xpath("//div[@class='tec-container clearfix']/node()")
        content = response.xpath("//div[@class='tec-container clearfix']/node()").extract()
        if content:
            p_content = "".join(content)
        p_content.encode("utf-8").decode("utf-8")

        p_view_pic = response.xpath("//ul[@class='previewImage']/li/img/@src").extract()
        view_pic_links = ""
        if p_view_pic:
            p_view_pic = [str(l).replace("_S", "_M") for l in p_view_pic]
            view_pic_links = ";".join(p_view_pic)

        if int(redis.redisServer.llen(detailUrlkey)) == 0:
            if self.thiscontrol:
                self.thiscontrol = False
                redis.redisServer.srem(searchUrlControl, "True")
        item = ProductItem(productId=p_id, productUrl=p_link, category=c_name, productName=p_name, brand=p_brand,
                           sku=p_properties, prices=p_price, pics=view_pic_links, description=p_content,
                           image_urls=p_view_pic, unit=p_unit, minAmount=p_minAmount)

        return item
