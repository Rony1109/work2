from store.hc360Store import  ProductListLinkDao ,IntroduceLinkDao ,ContactLinkDao,hc360DetailsDao, HcantDao,PageMaxDao,EnterpriseInfoDetailsDao,ProductListLinkSetDao
from scrapy.exceptions import DropItem
import logging


# 分页
class PageMaxPipeline(object):
    pageMaxDao = PageMaxDao()

    def process_item(self, item, spider):
        self.pageMaxDao.insert(item)
        return item



# 商品列表链接
class ProductListLinkPipeline(object):
    #productListLinkDao = ProductListLinkDao()
    ProductListLinkSetDao =ProductListLinkSetDao()

    def process_item(self, item, spider):
        #self.productListLinkDao.insert(item)
        self.ProductListLinkSetDao.insert(item)
        return item

# 商品详情页
class ProductDetailPipeline(object):
    productDetailDao = hc360DetailsDao()
    introduceLinkDao = IntroduceLinkDao()
    contactLinkDao = ContactLinkDao()

    def process_item(self, item, spider):
        self.introduceLinkDao.insert(item)
        self.contactLinkDao.insert(item)
        self.productDetailDao.insert(item)
        return item


# 商家信息
class EnterpriseInfoPipeline(object):
    hcantDao = HcantDao()

    def process_item(self, item, spider):
        self.hcantDao.insert(item)
        return item

    # def process_item(self, item, spider):
    #     if item['contactinfo']:
    #         self.hcantDao.insert(item)
    #         return item
    #     else:
    #         raise DropItem("Missing contactinfo in %s" % item)

# 商家详细信息
class EnterpriseInfoDetailsPipeline(object):
    enterpriseInfoDetailsDao = EnterpriseInfoDetailsDao()

    def process_item(self, item, spider):
        self.enterpriseInfoDetailsDao.insert(item)
        return item


