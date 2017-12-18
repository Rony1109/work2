'''
功能：操作redis,存取数据
'''
import datetime
from store.redis import MyRedis
from store.mysql import Mysql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, INTEGER, VARCHAR, Text, TIMESTAMP

categoryKey = 'toolmall.categoryKey.start_urls'
pageMaxKey = 'toolmall.pageMax.start_urls'
detailUrlkey = 'toolmall.productUrl.start_urls'
BaseModel = declarative_base()


def getNum(num):
    try:
        return int(num)
    except Exception as e:
        return None


# 功能：往redis中添加所有类目链接
class CategoryDao(MyRedis):
    def insert(self, item=None):
        categoryUrls = item['categoryUrls']
        for category_url in categoryUrls:
            self.redisServer.lpush(categoryKey, category_url)


# 功能：往redis中添加所有分页链接
class PageMaxDao(MyRedis):
    def insert(self, item=None):
        pageMax = item['pageMax']
        linkTemplate = item['linkTemplate']
        # 类目信息
        s_category = linkTemplate[-8:]
        num = '0000'
        for i in range(int(pageMax)):
            # 在指定模板后追加分页数
            tem = num + str(i + 1)
            # 只取后面五位数
            page_num = tem[-5:]
            page_link = 'http://www.toolmall.com/%s' % page_num + s_category
            self.redisServer.lpush(pageMaxKey, page_link)


# 功能：往redis中添加所有产品链接
class ProductDao(MyRedis):
    def insert(self, item=None):
        detailUrls = item['detailUrls']
        if type(detailUrls) == list:
            for url in detailUrls:
                self.redisServer.lpush(detailUrlkey, url)
        else:
            return None


class ProductInfoDo(BaseModel):
    __tablename__ = 'product_platform_toolmall'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    productId = Column(VARCHAR(200), nullable=False)
    productUrl = Column(VARCHAR(200), nullable=False)
    category = Column(VARCHAR(1000), nullable=False)
    productName = Column(VARCHAR(1000), nullable=False)
    prices = Column(VARCHAR(1000), nullable=False)
    brand = Column(VARCHAR(1000), nullable=False)
    model = Column(VARCHAR(2000), nullable=False)
    pics = Column(Text(1000), nullable=False)
    sku = Column(VARCHAR(10000), nullable=False)
    otherSku = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    createTime = Column(TIMESTAMP, nullable=False)


# 功能：往Mysql中添加产品数据
class ProductInfoDao(Mysql):
    def insert(self, item=None):
        try:
            productId = item['productUrl'].split('/')[4].replace('.html', '')
            info = ProductInfoDo(productId=productId, productUrl=item['productUrl'], category=item['category'],
                                 productName=item['productName'],
                                 prices=item['prices'], brand=item['brand'], model=item['model'],
                                 pics=str(item['pics']),
                                 sku=item['sku'], otherSku=item['otherSku'], description='',
                                 createTime=datetime.datetime.now())
            self.session.add(info)
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close()
