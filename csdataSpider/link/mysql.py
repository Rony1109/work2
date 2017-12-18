from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from link.dao import Dao
from link.config import DB_CONFIG


class Mysql(Dao):
    def __init__(self):
        self.engine = create_engine(DB_CONFIG['DB_CONNECT_STRING'], echo=False)
        session = sessionmaker(bind=self.engine)
        self.session = session()
