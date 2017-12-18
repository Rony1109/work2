# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy import Item, Field

# 分页
class PageMaxItem(Item):
    pageUrl = Field()
    pageMax = Field()

# 产品链接
class ProductLinkItem(Item):
    link = Field()


# 产品详情
class ProductdetailItem(Item):
    title = Field()
    price = Field()
    unit= Field()
    total = Field()
    orderInfo = Field()
    pics=Field()
    company = Field()
    otherInfo = Field()
    url = Field()
    contact = Field()
    introduce = Field()
    companyHome = Field()
    productId=Field()
    contactControl=Field()
    introduceControl=Field()

# 商家信息
class EnterpriseItem(Item):
    contactinfo = Field()
    companyHome = Field()
    url = Field()

# 商家联系我们链接
class EnterpriseLinkItem(Item):
    urls = Field()

# 商家详细介绍链接
class EnterpriseInfoLinkItem(Item):
    enterpriseInfoLinkUrls = Field()

# 商家详细资料
class EnterpriseInfoDetailsItem(Item):
    # 基本信息
    basicinfo = Field()
    # 主营行业
    contactinfo = Field()
    # 公司主页
    companyHome = Field()
    # 页面地址
    url = Field()

# 商品详细信息
class ProductDetailsItem(Item):
    # 价格
    price = Field()
    # 商品名称
    productName = Field()
    # 供应商名称
    enterpriseName = Field()
    # 发货期限
    deliverTime = Field()
    # 订购信息
    orderInfomation = Field()
    # 基本参数
    basicParameters = Field()
