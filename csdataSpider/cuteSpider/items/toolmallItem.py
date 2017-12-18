from scrapy import Item, Field

'''
Item模型(土猫网数据)
'''


# 类目链接Item
class CategoryItem(Item):
    categoryUrls = Field()


# 最大页数
class PageMaxItem(Item):
    linkTemplate = Field()
    pageMax = Field()


# 产品详情链接Item
class ProductItem(Item):
    detailUrls = Field()


class ProductInfoItem(Item):
    productId = Field()
    productUrl = Field()
    category = Field()
    productName = Field()
    brand = Field()
    model = Field()
    sku = Field()
    otherSku = Field()
    prices = Field()
    pics = Field()

    image_urls = Field()
    images = Field()
