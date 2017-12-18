'''
功能：项目管理,主要任务是清洗、验证和存储数据
'''
from store.alibabaStore import LoginCookiesDao, PageMaxDao, ProductDao, ProductInfoDao, CompanyDao, ContactDao


class LoginCookiesPipeline(object):
    dao = LoginCookiesDao()

    def process_item(self, item, spider):
        self.dao.insert(item)

        return item


class PageMaxPipeline(object):
    dao = PageMaxDao()

    def process_item(self, item, spider):
        self.dao.insert(item)
        return item


class ProductPipeline(object):
    dao = ProductDao()

    def process_item(self, item, spider):
        self.dao.insert(item)
        return item


class ProductInfoPipeline(object):
    dao = ProductInfoDao()

    def process_item(self, item, spider):
        self.dao.insert(item)
        return item


class CompanyPipeline(object):
    dao = CompanyDao()

    def process_item(self, item, spider):
        self.dao.insert(item)
        return item


class ContactPipeline(object):
    dao = ContactDao()

    def process_item(self, item, spider):
        self.dao.insert(item)
        return item
