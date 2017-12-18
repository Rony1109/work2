# -*- coding: utf-8 -*-

from scrapy import Item, Field


class EhsySpiderItem(Item):
    first_category_links = Field()


class sed_category_item(Item):
    category_links = Field()


class ProductLinkItem(Item):
    product_links = Field()


class ProductItem(Item):
    productId = Field()
    productUrl = Field()
    category = Field()
    productName = Field()
    brand = Field()
    sku = Field()
    prices = Field()
    pics = Field()
    description = Field()
    unit = Field()
    minAmount = Field()

    image_urls = Field()
    images = Field()
