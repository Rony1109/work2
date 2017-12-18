'''
功能：操作redis,存取数据
'''
import datetime
from store.redis import MyRedis
from store.mysql import Mysql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, INTEGER, VARCHAR, Text, TIMESTAMP

oneCategoryKey = 'ehsy.oneCategory.start_urls'
twoCategoryKey = 'ehsy.twoCategory.start_urls'
searchUrlKey = 'ehsy.search.start_urls'
searchUrlControl = 'ehsy.search.control'
detailUrlkey = 'ehsy.productUrl.start_urls'
detailUrlSetkey = 'ehsy.productUrl.set.start_urls'
BaseModel = declarative_base()


def getNum(num):
    try:
        return int(num)
    except Exception as e:
        return None


# 功能：往redis中添加一级类目链接
class OneCategoryDao(MyRedis):
    def insert(self, item=None):
        categoryUrls = item['first_category_links']
        for category_url in categoryUrls:
            self.redisServer.lpush(oneCategoryKey, "http://www.ehsy.com%s" % category_url)


# 功能：往redis中添加二级类目链接
class TwoCategoryDao(MyRedis):
    def insert(self, item=None):
        categoryUrls = item['category_links']
        for category_url in categoryUrls:
            self.redisServer.lpush(twoCategoryKey, category_url)


# 功能：往redis中添加所有产品链接(set)
class ProductDao(MyRedis):
    def insert(self, item=None):
        product_links = item['product_links']
        if type(product_links) == list:
            for url in product_links:
                self.redisServer.sadd(detailUrlSetkey, url)
        else:
            return None


class ehsy_product(BaseModel):
    __tablename__ = "product_platform_ehsy"
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    productId = Column(VARCHAR(20))
    productUrl = Column(VARCHAR(50))
    category = Column(VARCHAR(1000))
    productName = Column(VARCHAR(500))
    prices = Column(VARCHAR(100))
    brand = Column(VARCHAR(500))
    pics = Column(Text)
    sku = Column(Text)
    description = Column(Text)
    createTime = Column(TIMESTAMP)
    unit = Column(VARCHAR(100))
    minAmount = Column(VARCHAR(1000))


# 功能：往Mysql中添加产品数据
class ProductInfoDao(Mysql):
    def insert(self, item=None):
        try:
            info = ehsy_product(productId=item["productId"], productUrl=item["productUrl"], category=item["category"],
                                productName=item["productName"], prices=item["prices"], brand=item["brand"],
                                pics=item["pics"],
                                sku=item["sku"], description=item["description"], createTime=datetime.datetime.now(),
                                unit=item["unit"], minAmount=item["minAmount"])
            self.session.add(info)
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close()
