# -*- coding: utf-8 -*-

import redis

from scrapy.exceptions import DropItem
from scrapy.http import Request
from store.ehsyStore import *


class EhsySpiderPipeline(object):
    one_category_dao = OneCategoryDao()
    two_category_dao = TwoCategoryDao()
    product_dao = ProductDao()
    product_info_dao = ProductInfoDao()


    def process_item(self, item, spider):
        if spider.name == "ehsyOnecategory":
            self.one_category_dao.insert(item)
        elif spider.name == "ehsyTwoCategory":
            self.two_category_dao.insert(item)
        elif spider.name == "ehsyProductLink":
            self.product_dao.insert(item)
        if spider.name == "ehsyProductInfo":
            self.product_info_dao.insert(item)
        return item
