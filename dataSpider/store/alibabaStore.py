'''
功能：操作redis,存取数据
'''
import datetime
from config import *
from store.redis import MyRedis
from store.mysql import Mysql
from store.hbase import Hbase
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, INTEGER, VARCHAR, Text, TIMESTAMP

cookiesUrlkey = 'alibaba.cookies.start_urls'
searchUrlKey = 'alibaba.search.start_urls'
pageMaxKey = 'alibaba.pageMax.start_urls'
pageMaxSetKey = 'alibaba.pageMax.set.start_urls'
pageMaxControl = 'alibaba.pageMax.set.control'

detailUrlkey = 'alibaba.productUrl.start_urls'
detailUrlSetKey = 'alibaba.productUrl.set.start_urls'
detailUrlControl = 'alibaba.productUrl.set.control'

companySetUrlKey = 'alibaba.company.set.start_urls'
companySetNewUrlKey = 'alibaba.company.set.new.start_urls'
contactSetUrlKey = 'alibaba.contact.set.start_urls'
contactSetNewUrlKey = 'alibaba.contact.set.new.start_urls'

companyUrlKey = 'alibaba.company.start_urls'
contactUrlKey = 'alibaba.contact.start_urls'

infoUrl = 'https://corp.1688.com/page/index.htm?memberId=%s&fromSite=company_site&tab=companyWeb_detail'
contactUrl = 'https://corp.1688.com/page/index.htm?memberId=%s&fromSite=company_site&tab=companyWeb_contact'

BaseModel = declarative_base()

cookiesList = [
    {'name': 'JSESSIONID', 'value': '9L780cdu1-cM3Y6F4S0UQqtemM47-MDecYQQ-N2Uk', 'path': '/', 'domain': '.1688.com',
     'expiry': None, 'secure': False, 'httpOnly': False},
    {'name': 'cookie1', 'value': 'BxUBDhVXnjMG5ZNeGiW6wPaJyJVuUU0%2FwXutGuvu2kA%3D', 'path': '/', 'domain': '.1688.com',
     'expiry': None, 'secure': False, 'httpOnly': True},
    {'name': 'cookie2', 'value': '196e3eeccc336a14d729af80f012a9df', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': True},
    {'name': 'cookie17', 'value': 'VAmv21JmdpyI', 'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
     'httpOnly': True},
    {'name': 'uss', 'value': 'B0egsfyosyb6V8Eg9PYrQ%2F7UUAXq0w%2BGxWQxVvYv7tYSMlSL4ORRHL6Dyg%3D%3D', 'path': '/',
     'domain': '.1688.com', 'expiry': None, 'secure': False, 'httpOnly': False},
    {'name': 't', 'value': '2d6d6b2fe6b72093f6f56650d7f591d2', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False},
    {'name': '_tb_token_', 'value': 'e77755667e9a8', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False},
    {'name': 'sg', 'value': 's19', 'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
     'httpOnly': False},
    {'name': '__cn_logon__', 'value': 'true', 'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
     'httpOnly': False},
    {'name': '__cn_logon_id__', 'value': 'choselovegoods', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False},
    {'name': 'ali_apache_track', 'value': '"c_ms=1|c_mid=b2b-785671281|c_lid=choselovegoods"', 'path': '/',
     'domain': '.1688.com', 'expiry': None, 'secure': False, 'httpOnly': False},
    {'name': 'ali_apache_tracktmp', 'value': '"c_w_signed=Y"', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False}, {'name': 'cn_tmp',
                                           'value': '"Z28mC+GqtZ1e6mxrHw431LVpqppmmBboK61x2NOBeEfhBRIlB8Vrymj7nT2tK9Eur26jqEOaCREa9WMgRBWB1dP+p8Ksls0IeFSe/ePSfYnKjjx7pEr+aXmV2S0nOmTnB7vctB8b/GkTdBzaXkJg0f7LUUK5Q7VSRl+OB9LEu441oDrek+z80tfIQdi4TlM2GnuahTfdJ72Knhpx80ejRx++Zu9Jb4mHTLwV3V5CZwiXZidJ35l2hb9Q2tfscwmP"',
                                           'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
                                           'httpOnly': True},
    {'name': '_cn_slid_', 'value': 'maLcWzztwT', 'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
     'httpOnly': False},
    {'name': '_nk_', 'value': '"4E6HmyNAp3V5xA27uSwq5w%3D%3D"', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False},
    {'name': 'tbsnid', 'value': '3EX0P7xDrqvXR57bYtvwbfgHPN1YNOr%2FTNt9mAnhYwc6sOlEpJKl9g%3D%3D', 'path': '/',
     'domain': '.1688.com', 'expiry': None, 'secure': False, 'httpOnly': True},
    {'name': 'LoginUmid', 'value': '"7VzamEU8%2BfscnVEKuI756%2BLjJmgB8AT%2BHs5iow9WQuhTAhztWl1ziA%3D%3D"', 'path': '/',
     'domain': '.1688.com', 'expiry': None, 'secure': False, 'httpOnly': False},
    {'name': 'userID', 'value': '"CVIMJSAaLXn1ytukm7gWr2Pj18cYuFhPJtPc0C7FZm86sOlEpJKl9g%3D%3D"', 'path': '/',
     'domain': '.1688.com', 'expiry': None, 'secure': False, 'httpOnly': False},
    {'name': 'last_mid', 'value': 'b2b-785671281', 'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
     'httpOnly': False},
    {'name': 'unb', 'value': '785671281', 'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
     'httpOnly': True},
    {'name': 'userIDNum', 'value': '"YerLNp2QKGVTAhztWl1ziA%3D%3D"', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False},
    {'name': '__last_loginid__', 'value': 'choselovegoods', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False},
    {'name': 'login', 'value': '"kFeyVBJLQQI%3D"', 'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
     'httpOnly': False},
    {'name': '_csrf_token', 'value': '1501137185848', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False}, {'name': '_tmp_ck_0',
                                           'value': '"HCGgddy%2F7BADoNPWj2QJLHFzvnbkXtTV9W%2BfTD4ewDqTPIH72kq%2F7AH9GZkiwIiRN96XjixSZARljH%2BoKJoX1viLeWk6WIZAb2lascBb5lIUKSVX6x8XQJWEEqF0VyyxfvwHwwfYf43ou5GvWVffyIHE8ovYqtd1JjNKDobokSGBxhVGKPIwNG%2Frarkx91kb8VVluesbs0%2FRU%2FFixW%2F43jR7QEy4ZJbb0YReheAqQ4TZoo8GEw8eUvJYIlh4zvO%2F6frRa446NpTYZc9U4bvDtIXi1fMtoByj9KJsK020m2MLMZIwtqYZx8vYLD705Cg4%2BQ4ssjXmOLoKHy%2BEf0ngaNS3vwOmeuW88sVKOOzQjkSL6dH%2FpNUpDtzQ0aoTX4ADI1G3iQNSWgyVRL1VB%2FQTs%2FvxhcRXs69o6Ra7RDS%2B5EVgdFaSzYX%2BBFR7A%2F6RXFuDOflHI3l%2B%2B2GvT8rVuLYVNGLp1QRAGIjHhoP4QULPjXNkSKDsouiNS0wKtAm1P9yD%2FJZbafy%2Bs%2Fr4YDVBcYsLYo3yhjwqIHZKkeEWvFX0qSg%3D"',
                                           'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
                                           'httpOnly': False}]


def getNum(num):
    try:
        return int(num)
    except Exception as e:
        return None


# 功能：往redis中添加登录后的cookies
class LoginCookiesDao(MyRedis):
    def insert(self, item=None):
        cookies = item['cookies']
        if type(cookies) == list:
            oldCookies = self.redisServer.get(cookiesUrlkey)
            if oldCookies and len(oldCookies) > 0:
                self.redisServer.delete(cookiesUrlkey)
            self.redisServer.set(cookiesUrlkey, cookies)
        else:
            return None


# 功能：往redis中添加所有分页链接
class PageMaxDao(MyRedis):
    def insert(self, item=None):
        pageMax = item['pageMax']
        linkTemplate = item['linkTemplate']
        for i in range(int(pageMax)):
            page_link = linkTemplate + '#beginPage=%s&offset=10' % i
            self.redisServer.lpush(pageMaxKey, page_link)


# 功能：往redis中添加所有产品链接(set)
class ProductDao(MyRedis):
    def insert(self, item=None):
        detailUrls = item['detailUrls']
        if type(detailUrls) == list:
            for url in detailUrls:
                self.redisServer.sadd(detailUrlSetKey, url)
        else:
            return None


class ProductInfoDo(BaseModel):
    __tablename__ = 'alibaba_product'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    memberId = Column(VARCHAR(100), nullable=False)
    productUrl = Column(VARCHAR(200), nullable=False)
    productId = Column(VARCHAR(200), nullable=False)
    category = Column(VARCHAR(1000), nullable=False)
    productName = Column(VARCHAR(1000), nullable=False)
    prices = Column(VARCHAR(1000), nullable=False)
    minAmount = Column(VARCHAR(20), nullable=False)
    star = Column(VARCHAR(100), nullable=False)
    bargain = Column(VARCHAR(100), nullable=False)
    satisfaction = Column(VARCHAR(100), nullable=False)
    sku = Column(Text, nullable=False)
    pics = Column(Text, nullable=False)
    detail = Column(Text, nullable=False)
    createTime = Column(TIMESTAMP, nullable=False)


'''
# 功能：往Mysql中添加产品数据
class ProductInfoDao(Mysql):
    def insert(self, item=None):
        try:
            memberId = item['memberId']
            info = ProductInfoDo(memberId=memberId, productId=item['productId'], productUrl=item['productUrl'],
                                 category='', productName=item['productName'],
                                 prices=item['prices'], minAmount=item['minAmount'], star=item['star'],
                                 bargain=item['bargain'], satisfaction=item['satisfaction'], sku=item['sku'],
                                 pics=str(item['pics']), detail=item['detail'], createTime=datetime.datetime.now())
            self.session.add(info)
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close()
'''


# 功能：往Hbase中添加产品数据
class ProductInfoDao(Hbase):
    def insert(self, item=None):
        try:
            if len(item['productId']) > 0:
                info = ProductInfoDo(memberId=item['memberId'], productId=item['productId'],
                                     productUrl=item['productUrl'],
                                     category='', productName=item['productName'],
                                     prices=item['prices'], minAmount=item['minAmount'], star=item['star'],
                                     bargain=item['bargain'], satisfaction=item['satisfaction'], sku=item['sku'],
                                     pics=str(item['pics']), detail=item['detail'],
                                     createTime=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
                info_dict = info.__dict__
                info_dict2 = {'resource': RESOURCE_ALIBABA}
                info_dict3 = {}
                info_dict.update(info_dict2)

                for key, value in info_dict.items():
                    if key != '_sa_instance_state':
                        info_dict3[('data:' + key).encode('utf-8')] = value.encode('utf-8')

                table = self.connection.table(TB_PRODUCT_PLATFORM)
                row_key = self.row_key(item['productId'], PLATFORM_ALIBABA)
                table.put(row_key.encode('utf-8'), info_dict3)
        except:
            raise


class CompanyDo(BaseModel):
    __tablename__ = 'alibaba_company'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    memberId = Column(VARCHAR(100), nullable=False)
    companyName = Column(VARCHAR(100), nullable=False)
    scope = Column(VARCHAR(500), nullable=False)
    bussinessIndustry = Column(VARCHAR(200), nullable=False)
    model = Column(VARCHAR(100), nullable=False)
    diy = Column(VARCHAR(1), nullable=False)
    registerMoney = Column(VARCHAR(20), nullable=False)
    registerDate = Column(VARCHAR(20), nullable=False)
    licenseAddress = Column(VARCHAR(100), nullable=False)
    companyType = Column(VARCHAR(200), nullable=False)
    legalPerson = Column(VARCHAR(50), nullable=False)
    licenseNumber = Column(VARCHAR(50), nullable=False)
    createTime = Column(TIMESTAMP, nullable=False)


'''
# 功能：往Mysql中添加产品数据
class CompanyDao(Mysql):
    def insert(self, item=None):
        try:
            info = CompanyDo(memberId=item['memberId'], companyName=item['companyName'], scope=item['scope'],
                             bussinessIndustry=item['bussinessIndustry'],
                             model=item['model'], diy=item['diy'], registerMoney=item['registerMoney'],
                             registerDate=item['registerDate'], licenseAddress=item['licenseAddress'],
                             companyType=item['companyType'], legalPerson=item['legalPerson'],
                             licenseNumber=item['licenseNumber'],
                             createTime=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            self.session.add(info)
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close()
'''


# 功能：往Hbase中添加产品数据
class CompanyDao(Hbase):
    def insert(self, item=None):
        try:
            info = CompanyDo(memberId=item['memberId'], companyName=item['companyName'], scope=item['scope'],
                             bussinessIndustry=item['bussinessIndustry'],
                             model=item['model'], diy=item['diy'], registerMoney=item['registerMoney'],
                             registerDate=item['registerDate'], licenseAddress=item['licenseAddress'],
                             companyType=item['companyType'], legalPerson=item['legalPerson'],
                             licenseNumber=item['licenseNumber'],
                             createTime=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            info_dict = info.__dict__
            info_dict2 = {'resource': RESOURCE_ALIBABA}
            info_dict3 = {}
            info_dict.update(info_dict2)

            for key, value in info_dict.items():
                if key != '_sa_instance_state':
                    info_dict3[('data:' + key).encode('utf-8')] = value.encode('utf-8')

            table = self.connection.table(TB_COMPANY_PLATFORM)
            row_key = self.row_key(item['memberId'], PLATFORM_ALIBABA)
            table.put(row_key.encode('utf-8'), info_dict3)

        except:
            raise


class ContactDo(BaseModel):
    __tablename__ = 'alibaba_contact'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    memberId = Column(VARCHAR(100), nullable=False)
    contacts = Column(VARCHAR(50), nullable=False)
    telephone = Column(VARCHAR(50), nullable=False)
    mobile = Column(VARCHAR(50), nullable=False)
    fax = Column(VARCHAR(100), nullable=False)
    address = Column(VARCHAR(200), nullable=False)
    zipCode = Column(VARCHAR(10), nullable=False)
    website = Column(VARCHAR(100), nullable=False)
    createTime = Column(TIMESTAMP, nullable=False)


'''
# 功能：往Mysql中添加产品数据
class ContactDao(Mysql):
    def insert(self, item=None):
        try:
            info = ContactDo(memberId=item['memberId'], contacts=item['contacts'], telephone=item['telephone'],
                             mobile=item['mobile'], fax=item['fax'], address=item['address'],
                             zipCode=item['zipCode'], website=item['website'],
                             createTime=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            self.session.add(info)
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close()
'''


# 功能：往Hbase中添加产品数据
class ContactDao(Hbase):
    def insert(self, item=None):
        try:
            info = ContactDo(memberId=item['memberId'], contacts=item['contacts'], telephone=item['telephone'],
                             mobile=item['mobile'], fax=item['fax'], address=item['address'],
                             zipCode=item['zipCode'], website=item['website'],
                             createTime=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            info_dict = info.__dict__
            info_dict2 = {'resource': RESOURCE_ALIBABA}
            info_dict3 = {}
            info_dict.update(info_dict2)

            for key, value in info_dict.items():
                if key != '_sa_instance_state':
                    info_dict3[('data:' + key).encode('utf-8')] = value.encode('utf-8')

            table = self.connection.table(TB_CONTACT_PLATFORM)
            row_key = self.row_key(item['memberId'], PLATFORM_ALIBABA)
            table.put(row_key.encode('utf-8'), info_dict3)
        except:
            raise
