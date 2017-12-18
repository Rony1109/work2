"""
author     :LiHuan
date       :3/24/17 5:30 PM
description:
"""

from scrapy import Item, Field


class PageMaxItem(Item):
    pageUrl = Field()
    pageMax = Field()


class ProductLinkItem(Item):
    productUrlList = Field()


class ProductInfoItem(Item):
    productId = Field()
    productUrl = Field()
    category = Field()
    productName = Field()
    brand = Field()
    prices = Field()
    pics = Field()
    sku = Field()
    otherSku = Field()
    description = Field()

    image_urls = Field()
    images = Field()
