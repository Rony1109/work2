"""
author     :LiHuan
date       :3/24/17 7:06 PM
description:
"""

from store.graingerStore import PageMaxDao, ProductLinkDao, ProductInfoDao


class PageMaxPipeline(object):
    pageMaxDao = PageMaxDao()

    def process_item(self, item, spider):
        self.pageMaxDao.insert(item)
        return item


class ProductLinkPipeline(object):
    productLinkDao = ProductLinkDao()

    def process_item(self, item, spider):
        self.productLinkDao.insert(item)
        return item


class ProductInfoPipeline(object):
    dao = ProductInfoDao()

    def process_item(self, item, spider):
        self.dao.insert(item)
        return item