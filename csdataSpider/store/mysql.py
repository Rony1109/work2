"""
author     :LiHuan
date       :3/24/17 12:58 PM
description:
"""

from config import DB_CONFIG
from store.iStore import IStore
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class Mysql(IStore):
    def __init__(self):
        self.engine = create_engine(DB_CONFIG['DB_CONNECT_STRING'], echo=False)
        session = sessionmaker(bind=self.engine)
        self.session = session()
