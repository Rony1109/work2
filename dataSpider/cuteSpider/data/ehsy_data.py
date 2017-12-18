from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, VARCHAR,String,TEXT

BASE = declarative_base()

#类目链接表
class ehsy_category_link(BASE):
    __tablename__ = 'ehsy_category_link'
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_category_link = Column(VARCHAR(50))
    sed_category_link = Column(VARCHAR(50))
    sed_category_name = Column(VARCHAR(50))
    state = Column(Integer)

class ehsy_product_link(BASE):
    __tablename__ = 'ehsy_product_link'
    id = Column(Integer, primary_key=True, autoincrement=True)
    c_link = Column(VARCHAR(50))
    p_link = Column(VARCHAR(50))
    state = Column(Integer)
    pic_state = Column(Integer)

class ehsy_product(BASE):
    __tablename__ = "ehsy_product"
    id = Column(Integer, primary_key=True, autoincrement=True)
    p_link = Column(VARCHAR(50))
    c_name = Column(VARCHAR(100))
    p_name = Column(VARCHAR(200))
    p_brand = Column(VARCHAR(100))
    p_brand_no = Column(VARCHAR(100))
    p_price = Column(VARCHAR(100))
    p_unit = Column(VARCHAR(100))
    p_properties = Column(VARCHAR(1000))
    p_view_pic = Column(VARCHAR(1000))
    p_content = Column(TEXT)
    p_content_pic = Column(VARCHAR(2000))
    state = Column(Integer)