'''
创建数据库链接
数据库操作基类
'''

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..config import DB_CONFIG

class base_dao:
    def __init__(self):
        engine = create_engine(DB_CONFIG['DB_CONNECT_STRING'])
        self.DBSession = sessionmaker(bind=engine)

    #插入
    def inset(self,*args):
        session = self.DBSession()
        for data in args:
            session.add(data)
            session.commit()
        session.close()

    #修改
    def update(self,*args):
        session = self.DBSession()
        for data in args:
            session.merge(data)
            session.commit()
        session.close()

    #查询
    def query(self,sql):
        session = self.DBSession()
        return session.execute(sql).fetchall()
