'''
功能：爬取数据
'''

import json
from config import *
from store.toolmallStore import categoryKey, pageMaxKey, detailUrlkey
from scrapy.spiders import Spider
from scrapy_redis.spiders import RedisSpider
from cuteSpider.items.toolmallItem import CategoryItem, PageMaxItem, ProductItem, ProductInfoItem


# 功能：获取所有类目
class CategorySpider(Spider):
    name = 'toolmallCategory'
    start_urls = ['http://www.toolmall.com/']
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.toolmallPipelines.CategoryPipeline': 100,
        },
    }

    def parse(self, response):
        html = response.xpath('//ul[@class="menu"]/li')
        a_href = html.xpath('a/@href').extract()
        return CategoryItem(categoryUrls=a_href)


# 功能：获取所有分页链接
class PageMaxSpider(RedisSpider):
    name = 'toolmallProductPage'
    # 所有类目链接
    redis_key = categoryKey
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.toolmallPipelines.PageMaxPipeline': 100,
        },
    }

    def parse(self, response):
        # 获取最大页数
        a_last_tag = response.xpath('//div[@class="pagination1"]/a[last()-1]')

        pageMax = a_last_tag.xpath('text()').extract()
        pageMax = pageMax and pageMax[0] or ""
        a_href = a_last_tag.xpath('@href').extract()
        a_href = a_href and a_href[0] or ""

        linkTemplate = 'http:%s' % a_href
        return PageMaxItem(pageMax=pageMax, linkTemplate=linkTemplate)


# 功能：获取的产品详情链接
class ProductSpider(RedisSpider):
    name = 'toolmallProductDetail'
    # 所有分页链接
    redis_key = pageMaxKey
    custom_settings = {
        'ITEM_PIPELINES': {
            'cuteSpider.pipelines.toolmallPipelines.ProductPipeline': 100,
        },
    }

    def parse(self, response):
        item = ProductItem()
        html = response.xpath('//ul/li')
        a_href = html.xpath(
            'div[@class="tm-prdlist-item"]/div[@class="product-photo tm-list-col-1"]/a/@href').extract()
        return ProductItem(detailUrls=a_href)


# 功能：获取产品详情中的数据
class ProductInfoSpider(RedisSpider):
    name = 'toolmallProductInfo'
    # 所有产品详情链接
    redis_key = detailUrlkey
    custom_settings = {
        'ITEM_PIPELINES': {
            "cuteSpider.pipelines.pipelines.ImagesPipeline": 200,
            'cuteSpider.pipelines.toolmallPipelines.ProductInfoPipeline': 500,
        },
        'IMAGES_STORE': '/data/images/toolmall',
    }

    # 替换特殊字符
    def rep(self, value):
        return value.replace('\r', '').replace('\t', '').replace('\n', '')

    def parse(self, response):
        # 产品详情链接
        productUrl = response.url
        # 类目路径
        category = response.xpath('//p[@id="breadcrumb_container_top"]').xpath("string(.)").extract()
        category = category and category[0] or ""
        div = response.selector.xpath('//div[@class="firstPanel"]')
        # 产品名称
        productName = div.xpath('div[@class="productBrief"]/h1/text()').extract()
        productName = productName and productName[0] or ""
        # 规格(部分产品存在规格)
        sku = ''
        sku_arr = div.xpath(
            'div[@class="productBrief"]/ul/li[@id="specification"]/div[@class="tm-row"]/div[@class="tm-prd-type-div"]/a[@class="tm-prd-type-a text selected"]/@val').extract()
        if len(sku_arr) > 0:
            sku = sku_arr[0]
        # 品牌(类目为其他,无品牌)
        brand = ''
        brand_arr = div.xpath('//ul/li[1]/h2/a/text()').extract()
        if len(brand_arr) > 0:
            brand = brand_arr[0]
        model = ''
        model_arr = div.xpath('div/ul/li[3]')
        if len(model_arr) > 0:
            li_value = model_arr.xpath("normalize-space(string(.))").extract()[0]
            model = li_value.split('：')[1]
        # 产品价格
        prices = div.xpath(
            'div[@class="productBrief"]/div[@class="tm-price"]/span[@class="c-e4041c tm-price-span1"]').xpath(
            "normalize-space(string(.))").extract()
        prices = prices and prices[0] or ""
        obj = {}
        tr_arr = response.xpath('//div[@id="parameter"]/table/tr')
        for index, tr in enumerate(tr_arr):
            if index != 0:
                key = tr.xpath("th/text()").extract()[0]
                value = tr.xpath("td/text()").extract()[0]
                obj[key] = value
        otherSku = json.dumps(obj, ensure_ascii=False)
        # 产品图片(去重,最多下载四张图片,多图片以分号分隔)
        image_src = list(set(div.xpath('//div[@class="items"]/a/img/@src').extract()))
        image_urls = []
        pics = ''
        for index, a_src in enumerate(image_src):
            image = "http:%s" % a_src.replace('thumbnail', 'large')
            if index < DOWNLOAD_IMAGE_SIZE:
                image_urls.append(image)
                if index == 0:
                    pics = image
                else:
                    img = a_src.replace('thumbnail', 'large').split('image.toolmall.com')
                    img = img[1] if len(img) > 1 else img[0]
                    pics += ',' + img

        return ProductInfoItem(productUrl=productUrl, category=self.rep(category), productName=productName,
                               sku=sku, otherSku=otherSku, brand=brand, model=model, prices=self.rep(prices), pics=pics,
                               image_urls=image_urls)
