'''
功能：操作redis,保存搜索链接
'''
import sys
from urllib import parse
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, INTEGER, VARCHAR

sys.path[len(sys.path) - 1] = '/data/pywork/cuteSpider'
# sys.path[len(sys.path) - 1] = 'F:\pythonspace\cuteSpider'
from link.mysql import Mysql
from link.myRedis import MyRedis

BaseModel = declarative_base()

class CategoryDO(BaseModel):
    __tablename__ = 'csc_category_hjg'
    id = Column(INTEGER, primary_key=True, autoincrement=True)
    parentId = Column(INTEGER, nullable=False)
    title = Column(VARCHAR(255), nullable=False)


class CategoryDao(Mysql):
    redis = MyRedis()
    all_search_Key = 'all.search.start_urls'
    alibaba_search_Key = 'alibaba.search.start_urls'
    alibaba_tem_url = 'https://s.1688.com/selloffer/offer_search.htm?keywords=%s&button_click=top&earseDirect=FALSE&n=Y'
    ehsy_search_key = 'ehsy.search.start_urls'
    ehsy_tem_url = 'http://www.ehsy.com/search?k=%s'
    hcanter_search_key = 'hcanter.searchproductUrl.start_urls'
    hcanter_tem_url = 'http://s.hc360.com/?w=%s&mc=seller'

    def query(self, count=None, conditions=None):
        query = self.session.query(CategoryDO).filter(CategoryDO.parentId != None)
        if self.redis.redisServer.scard(self.all_search_Key) > 0:
            self.redis.redisServer.srem(self.all_search_Key,"True")
            self.redis.redisServer.delete("search.keys")
            for index, vo in enumerate(query):
                self.redis.redisServer.sadd("search.keys", vo.title)

            keys = self.redis.redisServer.smembers("search.keys")
            for key in keys:
                self.redis.redisServer.lpush(self.alibaba_search_Key,
                                             self.alibaba_tem_url % parse.quote(key.decode().encode('gb2312')))
                self.redis.redisServer.lpush(self.ehsy_search_key,
                                             self.ehsy_tem_url % parse.quote(key.decode().encode('utf-8')))
                self.redis.redisServer.lpush(self.hcanter_search_key,
                                             self.hcanter_tem_url % parse.quote(key.decode().encode('gb2312')))

        else:
            if self.redis.redisServer.scard("search.keys") > 0:
                for i in range(2):
                    key = self.redis.redisServer.spop("search.keys")
                    self.redis.redisServer.lpush(self.alibaba_search_Key,
                                                 self.alibaba_tem_url % parse.quote(key.decode().encode('gb2312')))
                    self.redis.redisServer.lpush(self.ehsy_search_key,
                                                 self.ehsy_tem_url % parse.quote(key.decode().encode('utf-8')))
                    self.redis.redisServer.lpush(self.hcanter_search_key,
                                                 self.hcanter_tem_url % parse.quote(key.decode().encode('gb2312')))
            else:
                # 遍历关键字
                for index, vo in enumerate(query):
                    self.redis.redisServer.sadd("search.keys", vo.title)

                for i in range(2):
                    key = self.redis.redisServer.spop("search.keys")
                    self.redis.redisServer.lpush(self.alibaba_search_Key,
                                                 self.alibaba_tem_url % parse.quote(key.decode().encode('gb2312')))
                    self.redis.redisServer.lpush(self.ehsy_search_key,
                                                 self.ehsy_tem_url % parse.quote(key.decode().encode('utf-8')))
                    self.redis.redisServer.lpush(self.hcanter_search_key,
                                                 self.hcanter_tem_url % parse.quote(key.decode().encode('gb2312')))


# 测试
print('9：00 start')
dao = CategoryDao()
dao.query()
