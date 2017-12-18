from scrapy import Item, Field

'''
Item模型(阿里巴巴)
'''


class LoginCookiesItem(Item):
    cookies = Field()


class PageMaxItem(Item):
    linkTemplate = Field()
    pageMax = Field()


class ProductItem(Item):
    detailUrls = Field()


class UrlItem(Item):
    infoUrl = Field()
    contact = Field()


class CompanyItem(Item):
    memberId = Field()
    companyName = Field()
    scope = Field()
    bussinessIndustry = Field()
    model = Field()
    diy = Field()
    registerMoney = Field()
    registerDate = Field()
    licenseAddress = Field()
    companyType = Field()
    legalPerson = Field()
    licenseNumber = Field()


class ContactItem(Item):
    memberId = Field()
    contacts = Field()
    telephone = Field()
    mobile = Field()
    fax = Field()
    address = Field()
    zipCode = Field()
    website = Field()


class ProductInfoItem(Item):
    memberId = Field()
    productUrl = Field()
    productId = Field()
    category = Field()
    productName = Field()
    prices = Field()
    minAmount = Field()
    star = Field()
    bargain = Field()
    satisfaction = Field()
    sku = Field()
    pics = Field()
    detail = Field()

    image_urls = Field()
    images = Field()
