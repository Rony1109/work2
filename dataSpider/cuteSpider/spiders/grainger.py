"""
author     :LiHuan
date       :3/24/17 5:07 PM
description:
"""
import json
from config import *
from scrapy.spiders import Spider
from scrapy_redis.spiders import RedisSpider
from store.graingerStore import pageMaxKey, productUrlListkey
from cuteSpider.items.graingerItem import PageMaxItem, ProductLinkItem, ProductInfoItem


class PageMaxSpider(Spider):
    name = "graingerPageMax"
    start_urls = ["http://item.grainger.cn/s/"]
    custom_settings = {
        "LOG_LEVEL": "INFO",
        "ITEM_PIPELINES": {
            "cuteSpider.pipelines.graingerPipelines.PageMaxPipeline": 100,
        },
    }

    pageUrl = "http://item.grainger.cn/s/page-%d/"

    def parse(self, response):
        pageMax = response.xpath("//p[@class='page_curl_number']/a[last()-1]/text()").extract()[0]
        return PageMaxItem(pageUrl=self.pageUrl, pageMax=pageMax)


class ProductLinkSpider(RedisSpider):
    name = "graingerProductLink"
    redis_key = pageMaxKey
    custom_settings = {
        "ITEM_PIPELINES": {
            "cuteSpider.pipelines.graingerPipelines.ProductLinkPipeline": 100,
        },
    }

    def parse(self, response):
        productUrlList = []
        urlPrefix = "http://item.grainger.cn%s"
        divs = response.xpath("//div[@class='product_grid_box item']")
        for div in divs:
            image = div.xpath("div[@class='product_grid_image img']/a/img/@data-original").extract()[0]
            a_href = div.xpath("div[@class='product_grid_image img']/a/@href").extract()[0]
            price = div.xpath("div[@class='grid_price_fromto price']/text()").extract()[0]
            if "hp_np.gif" in image:
                continue
            if "-" in price:
                continue
            productUrlList.append(urlPrefix % a_href)
        return ProductLinkItem(productUrlList=productUrlList)


class ProductInfoSpider(RedisSpider):
    name = "graingerProductInfo"
    redis_key = productUrlListkey
    custom_settings = {
        "ITEM_PIPELINES": {
            "cuteSpider.pipelines.pipelines.ImagesPipeline": 200,
            "cuteSpider.pipelines.graingerPipelines.ProductInfoPipeline": 100,
        },
        "IMAGES_STORE": "/data/images/grainger",
    }

    def parse(self, response):
        productUrl = response.url
        category = response.xpath("//div[@class='node_path']").xpath("normalize-space(string(.))").extract()
        category = category and category[0] or ""
        productName = response.xpath("//div[@id='product-intro']/div[@id='name']/h1/text()").extract()
        productName = productName and productName[0] or ""
        prices = response.xpath("//li[@id='summary-price']/div[@class='dd']/strong/text()").extract()
        prices = prices and prices[0] or ""
        brand = response.xpath("//li[@id='summary-brand']/div[@class='dd']/a/em/text()").extract()
        brand = brand and brand[0] or ""
        skuObj = {}
        sku_lis = response.xpath("//ul[@class='specifications']/li")

        for li in sku_lis:
            li_text = li.xpath("normalize-space(string(.))").extract()[0]
            text_arr = li_text.split("：")
            skuObj[text_arr[0]] = text_arr[1]
        sku = json.dumps(skuObj, ensure_ascii=False)
        description = response.xpath("//div[@class='property']").xpath('normalize-space(string(.))').extract()
        description = description and description[0] or ""
        # 其他型号
        th_arr = []
        thead_th = response.xpath("//table[@id='pd_table']/thead/tr[1]/th")
        for index, th in enumerate(thead_th):
            th_arr.append(th.xpath("text()").extract()[0])

        th_arr.insert(0, "产品ID")
        tbody_tr = response.xpath("//table[@id='pd_table']/tbody/tr")

        num = 0
        td_arr = []
        for tr in tbody_tr:
            if num > 20:
                break
            num += 1
            tds = tr.xpath("td")
            obj = {}
            for index, td in enumerate(tds):
                if index == 0:
                    href = td.xpath("a[2]/@href").extract()[0]
                    text = td.xpath("a[2]/text()").extract()
                    text = text and text[0] or ""
                    id = href.split('/')[4]
                    obj[th_arr[index]] = id
                    obj[th_arr[index + 1]] = text
                else:
                    text = td.xpath('normalize-space(string(.))').extract()
                    text = text[0] if len(text) > 0 else ""
                    obj[th_arr[index + 1]] = text
            td_arr.append(obj)

        otherSku = json.dumps(td_arr, ensure_ascii=False)
        image_src = list(set(response.xpath("//ul[@class='lh imageThumb']/*/*/img/@src").extract()))
        image_urls = []
        pics = ""
        for index, src in enumerate(image_src):
            src_large = src.replace("/50/", "/350/")
            if index < DOWNLOAD_IMAGE_SIZE:
                image_urls.append(src_large)
                if index == 0:
                    pics = src_large
                else:
                    pics += "," + src_large.split("static.grainger.cn")[1]
        return ProductInfoItem(productUrl=productUrl, category=category, productName=productName,
                               prices=prices, brand=brand, sku=sku, otherSku=otherSku, description=description,
                               image_urls=image_urls,
                               pics=pics)
