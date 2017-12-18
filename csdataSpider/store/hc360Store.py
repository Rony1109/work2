from store.mysql import Mysql
from sqlalchemy import Column, INTEGER, VARCHAR ,TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
import re
import datetime
from store.redis import MyRedis


BaseModel = declarative_base()

searchKey = "hcanter.searchproductUrl.start_urls"
pageMaxKey = "hcanter.productUrl.start_urls"
productListLinkControlsSetkey = "hc360.productListLink.controlsSetkey"
productDetailControlsSetkey = "hc360.productDetail.controlsSetkey"
productLinkUrlListkey = "hcanter.productListLink.start_urls"
productLinkSetkey = "hcanter.productLinkSet.start_urls"
introduceLinkkey = "hcanter.IntroduceLink.start_urls"
newintroduceLinkkey = "hcanter.newIntroduceLink.start_urls"
contactLinkkey = "hcanter.contactLinkkey.start_urls"
newcontactLinkkey = "hcanter.newcontactLinkkey.start_urls"
introduceLinklistkey = "hcanter.IntroduceLinklist.start_urls"
contactLinklistkey = "hcanter.contactLinklistkey.start_urls"
productUrlListkey = "hcanter.enterprise_urls"
enterpriseInfoLinkUrlListkey = "hcanter.enterpriseinfolink_urls"


# 分页
class PageMaxDao(MyRedis):
    def insert(self, value=None):
        pageUrl = value["pageUrl"]
        pageMax = int(value["pageMax"])
        for pageNo in range(1,int(pageMax+1)):
            self.redisServer.lpush(pageMaxKey, pageUrl+"ee=%s&ap=A&t=1" % pageNo)


# 商品列表链接list
class ProductListLinkDao(MyRedis):
    def insert(self, value=None):
        for productListUrl in value["link"]:
            relink = re.search(r'.*/(\d+)', productListUrl, flags=0)
            if relink:
                self.redisServer.lpush(productLinkUrlListkey, productListUrl)


# 商品页链接集合
class ProductListLinkSetDao(MyRedis):
    def insert(self, value=None):
        for productListset in value["link"]:
            relink = re.search(r'.*/(\d+)', productListset, flags=0)
            if relink:
                self.redisServer.sadd(productLinkSetkey, productListset)
                # print('==================================relink===================================%s' % productListset)

# 商品详情页
class IntroduceLinkDao(MyRedis):
    def insert(self, value=None):
        introduceLink = value["introduce"]
        introduceControl = value["introduceControl"]
        # print("===================introduceLink================== %s" % introduceLink)
        if introduceControl:
            #self.redisServer.sadd(introduceLinkkey, introduceLink)
            pass
        else:
            self.redisServer.sadd(newintroduceLinkkey, introduceLink)

# 商品详情页
class ContactLinkDao(MyRedis):
    def insert(self, value=None):
        contactLink = value["contact"]
        contactControl = value["contactControl"]
        # print("===================contactLink================== %s" % contactLink)
        if contactControl:
            #self.redisServer.sadd(contactLinkkey, contactLink)
            pass
        else:
            self.redisServer.sadd(newcontactLinkkey, contactLink)




class hc360DetailsDo(BaseModel):
    __tablename__ = 'hc360details_platform_hcant'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    # 标题
    title = Column(VARCHAR(2000), nullable=False)
    # 价格
    price = Column(VARCHAR(2000), nullable=False)
    # 单位
    unit = Column(VARCHAR(2000), nullable=False)
    # 供应总量
    total = Column(VARCHAR(2000), nullable=False)
    # 订购信息
    orderInfo = Column(VARCHAR(2000), nullable=False)
    # 产品图片
    pics = Column(VARCHAR(2000), nullable=False)
    # 规格
    company = Column(VARCHAR(2000), nullable=False)
    # 其他信息
    otherInfo = Column(VARCHAR(2000), nullable=False)
    # 页面url
    companyHome = Column(VARCHAR(200), nullable=False)
    # 页面url
    url = Column(VARCHAR(2000), nullable=False)
    # 页面url
    createTime = Column(TIMESTAMP, nullable=False)
    # 产品ID
    productId = Column(VARCHAR(20), nullable=False)


# 商品详情页
class hc360DetailsDao(Mysql):
    def insert(self, value=None):
        info = hc360DetailsDo(title=value["title"], price=value["price"],unit=value["unit"],
                              total=value["total"], orderInfo=value["orderInfo"],pics=value["pics"],
                              company=value["company"],otherInfo=value["otherInfo"],companyHome=value["companyHome"],url=value["url"],productId=value["productId"],createTime=datetime.datetime.now())
        self.session.add(info)
        self.session.commit()



class HcantDo(BaseModel):
    __tablename__ = 'hc360contact_platform_hcant'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    contactinfo = Column(VARCHAR(4000), nullable=False)
    companyHome = Column(VARCHAR(200), nullable=False)
    url = Column(VARCHAR(200), nullable=False)
    createTime = Column(TIMESTAMP, nullable=False)


# 商家信息
class HcantDao(Mysql):
    def insert(self, value=None):
        info = HcantDo(contactinfo=value["contactinfo"], companyHome=value["companyHome"],url=value["url"],createTime=datetime.datetime.now())
        self.session.add(info)
        self.session.commit()


class EnterpriseInfoDetailsDo(BaseModel):
    __tablename__ = 'hc360introduce_platform_hcant'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    # 主营产品
    basicinfo = Column(VARCHAR(4000), nullable=False)
    # 主营行业
    contactinfo = Column(VARCHAR(4000), nullable=False)
    # 公司主页
    companyHome = Column(VARCHAR(200), nullable=False)
    # 页面地址
    url = Column(VARCHAR(200), nullable=False)
    # 页面url
    createTime = Column(TIMESTAMP, nullable=False)


# 商家详细信息
class EnterpriseInfoDetailsDao(Mysql):
    def insert(self, value=None):
        info = EnterpriseInfoDetailsDo(basicinfo=value["basicinfo"], contactinfo=value["contactinfo"],companyHome=value["companyHome"],url=value["url"],createTime=datetime.datetime.now())
        self.session.add(info)
        self.session.commit()




class ProductLinkDao(MyRedis):
    def insert(self, value=None):
        for productUrl in value["urls"]:
            self.redisServer.lpush(productUrlListkey, productUrl)

