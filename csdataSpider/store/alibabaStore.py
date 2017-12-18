'''
功能：操作redis,存取数据
'''
import datetime
from store.redis import MyRedis
from store.mysql import Mysql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, INTEGER, VARCHAR, Text, TIMESTAMP
from sqlalchemy import and_
import xlwt
import json
from datetime import datetime

cookiesUrlkey = 'alibaba.cookies.start_urls'
searchUrlKey = 'cs-alibaba.search.start_urls'
pageMaxKey = 'cs-alibaba.pageMax.start_urls'
pageMaxSetKey = 'alibaba.pageMax.set.start_urls'
pageMaxControl = 'cs-alibaba.pageMax.set.control'

detailUrlkey = 'cs-alibaba.productUrl.start_urls'
detailUrlSetKey = 'cs-alibaba.productUrl.set.start_urls'
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
    {'name': 'JSESSIONID', 'value': '9L780cdu1-fQfXkn13eZ8dxOcYpB-KSKfeLQ-tWNr1', 'path': '/', 'domain': '.1688.com',
     'expiry': None, 'secure': False, 'httpOnly': False},
    {'name': '__cn_logon__', 'value': 'true', 'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
     'httpOnly': False},
    {'name': '__cn_logon_id__', 'value': 'choselovegoods', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False},
    {'name': 'ali_apache_track', 'value': '"c_ms=1|c_mid=b2b-785671281|c_lid=choselovegoods"', 'path': '/',
     'domain': '.1688.com', 'expiry': None, 'secure': False, 'httpOnly': False},
    {'name': 'ali_apache_tracktmp', 'value': '"c_w_signed=Y"', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False}, {'name': 'cn_tmp',
                                           'value': '"Z28mC+GqtZ1e6mxrHw431LVpqppmmBboK61x2NOBeEfhBRIlB8Vrymj7nT2tK9Eur26jqEOaCREa9WMgRBWB1V037L/5QtAhHrR50EUBUjOltC8X8gfy5MwNoOmbrTwEMEjJteNk6H+NeFYCCMBpN9AqmriR+hFKJoAE0Uz3mN6ZR9togHCVVN+m+H4rJ+W57TrKLTt1VwmR+bY3/M7uMVIxffbuR4Gs/k/AoS9G0fJcluo5SLs3SXiNBh+ns+7V"',
                                           'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
                                           'httpOnly': True},
    {'name': '_cn_slid_', 'value': 'maLcWzztwT', 'path': '/', 'domain': '.1688.com', 'expiry': None, 'secure': False,
     'httpOnly': False},
    {'name': '_nk_', 'value': '"4E6HmyNAp3V5xA27uSwq5w%3D%3D"', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False},
    {'name': 'tbsnid', 'value': 'DiPog8kNS2ZFlJmZX%2BRj7hHTLkMO%2BSm%2FR96YLA1Xoms6sOlEpJKl9g%3D%3D', 'path': '/',
     'domain': '.1688.com', 'expiry': None, 'secure': False, 'httpOnly': True},
    {'name': 'LoginUmid', 'value': '"hz5AIPn9fZglhhAEndW4kS9dP6sSPm%2FKSbB%2FlNxovX3BlpK6JhHIZA%3D%3D"', 'path': '/',
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
    {'name': '_csrf_token', 'value': '1496645819117', 'path': '/', 'domain': '.1688.com', 'expiry': None,
     'secure': False, 'httpOnly': False}, {'name': '_tmp_ck_0',
                                           'value': '"zR25iojv9aUeZH7Zypv8HDArg9%2BPePS4JYQBtJ4iCf1nhZyFiy7%2FvOmLejHkAm3dJWVo9T5XnAjEYrseM5WxQt4ge3Ij8YjS1Q4lRNCUUJPivePZ5lFxkHdA8D8%2Fnzj4RTUCFjWcRkQHZExq0hrzf6adoUyy%2FxpneIBdHHIHTfwsP0LldXD0PX3SU1wxzZfq%2FC51sZwZeOJShYHL9xE0VEy0l698YGaDImRO06KrwasQglPSM7VIVyWYnWorgt%2B5wxHGHN2JS0YVjsWqQ%2B2Z0fyz0NByS3noi0Okd7xSrl%2Bn%2BJwChb0dZEMzvjx9gLpVbsaUrpCZmPnEpSgRV3pSL7gUcCnjbexArYCDBIJSDPJddKBPCG77uIxd0t7fXulKa%2B6bkaNOge%2FLN788wFsZy7Z0Rndr7vj2DaeTFytFDuvigc3G0%2BIEHJvohWjDna%2BY7V0TS516Vpel31%2FYAbMJzkNuFtuyCP5Hr%2F1C131dQelmFKDDV6wQJ8dCbwk2qCbnOgAuDYKqC6twf9Ss1pEoByqtZAdQ8bgpPOl0ku4vNO4%3D"',
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





# 功能：查询Mysql中产品数据
class selectProduct(Mysql):
    def select(self, item=None):
        try:
            content = self.session.query(ProductInfoDo).filter(and_(ProductInfoDo.createTime >'2017-07-31 00:00:00',ProductInfoDo.createTime < '2017-08-01 17:30:00')).order_by(ProductInfoDo.memberId).all()

            datas = ['产品名称', '型号', '价格','起批量','公司名称','链接','时间']
            companyName={'b2b-1720988921':'东莞市龙川机电有限公司','b2b-2140245581':'深圳市连讯达仪器仪表有限公司',
                         'extraordinary2010':'东莞市不凡电子有限公司','rhwj158':'东莞市荣乔源五金工具有限公司',
                         'b2b-2946985474596ee':'深圳小金蛋贸易有限公司'}
            file_path = 'E:/temp/data.xls'

            wb = xlwt.Workbook()

            sheet = wb.add_sheet('test')  # sheet的名称为test

            # 单元格的格式
            style = 'pattern: pattern solid, fore_colour yellow; '  # 背景颜色为黄色
            style += 'font: bold on; '  # 粗体字
            style += 'align: horz centre, vert center; '  # 居中
            style += 'font:height 200; '  # 字体大小
            header_style = xlwt.easyxf(style)
            tall_style = xlwt.easyxf('font:height 220;')

            borders= xlwt.Borders()
            borders.left= 1
            borders.right= 1
            borders.top= 1
            borders.bottom= 1

            alignment = xlwt.Alignment()  # Create Alignment
            alignment.horz = xlwt.Alignment.HORZ_LEFT  # May be: HORZ_GENERAL, HORZ_LEFT, HORZ_CENTER, HORZ_RIGHT, HORZ_FILLED, HORZ_JUSTIFIED, HORZ_CENTER_ACROSS_SEL, HORZ_DISTRIBUTED
            alignment.vert = xlwt.Alignment.VERT_CENTER  # May be: VERT_TOP, VERT_CENTER, VERT_BOTTOM, VERT_JUSTIFIED, VERT_DISTRIBUTED
            cellstyle = xlwt.XFStyle()  # Create Style
            cellstyle.alignment = alignment  # Add Alignment to Style
            cellstyle.borders=borders

            for i in range(0, len(datas)):
                sheet.write(0, i, datas[i], header_style)

            row_count = len(content)

            def returnCompany(value):

                pass

            rownum=0
            for row in range(0, row_count):
                col_content=content[row].__dict__
                sku = json.loads(col_content['sku'])
                if len(sku)>0:
                    num=0
                    for k,v in enumerate(sku):

                        num+=1
                        rownum += 1

                        sheet.write(rownum, 1, v["规格"+str(num)],style=cellstyle)
                        sheet.write(rownum, 2, v["价格"],style=cellstyle)
                        sheet.write(rownum, 3, col_content['minAmount'],style=cellstyle)
                        sheet.write(rownum, 6, str(col_content['createTime']), style=cellstyle)

                    oldnum=rownum-num+1 if num>1 else  rownum
                    sheet.write_merge(oldnum, rownum, 0, 0, col_content['productName'],style=cellstyle)
                    sheet.write_merge(oldnum, rownum, 4, 4, companyName[col_content['memberId']],style=cellstyle)
                    sheet.write_merge(oldnum, rownum, 5, 5, col_content['productUrl'],style=cellstyle)
                else:
                    rownum += 1

                    sheet.write(rownum, 1, '',style=cellstyle)
                    sheet.write(rownum, 2, col_content['prices'],style=cellstyle)
                    sheet.write(rownum, 3, col_content['minAmount'],style=cellstyle)
                    sheet.write(rownum, 6, str(col_content['createTime']), style=cellstyle)

                    sheet.write_merge(rownum, rownum, 0, 0, col_content['productName'], style=cellstyle)
                    sheet.write_merge(rownum, rownum, 4, 4, companyName[col_content['memberId']],style=cellstyle)
                    sheet.write_merge(rownum, rownum, 5, 5, col_content['productUrl'],style=cellstyle)

                sheet.col(0).width = 256 * 60
                sheet.col(1).width = 256 * 30
                sheet.col(2).width = 256 * 15
                sheet.col(3).width = 256 * 20
                sheet.col(4).width = 256 * 30
                sheet.col(5).width = 256 * 40
                sheet.col(6).width = 256 * 20
            wb.save(file_path)

                # print('{memberId}, {productId}, {productUrl},{category}, {productName},{prices}, {minAmount}, {star},{bargain}, {satisfaction},{sku},{pics}, {detail}, {createTime}'.format(**cont.__dict__))

            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close()

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
                             createTime=datetime.datetime.now())
            self.session.add(info)
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close()


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


# 功能：往Mysql中添加产品数据
class ContactDao(Mysql):
    def insert(self, item=None):
        try:
            info = ContactDo(memberId=item['memberId'], contacts=item['contacts'], telephone=item['telephone'],
                             mobile=item['mobile'], fax=item['fax'], address=item['address'],
                             zipCode=item['zipCode'], website=item['website'],
                             createTime=datetime.datetime.now())
            self.session.add(info)
            self.session.commit()
        except:
            self.session.rollback()
            raise
        finally:
            self.session.close()

if __name__=='__main__':
    select = selectProduct()
    select.select()