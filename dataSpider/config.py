"""
author     :LiHuan
date       :3/24/17 12:50 PM
description:
"""

DB_CONFIG = {
    'DB_CONNECT_TYPE': 'sqlalchemy',
    # 'DB_CONNECT_STRING': 'mysql+pymysql://root:123456@192.168.1.82/csc_cutespider?charset=utf8'
    'DB_CONNECT_STRING': 'mysql+pymysql://app_cutespider:{}@10.10.102.200/csc_cutespider?charset=utf8'.format(
        'spider@csc86.com')
}

QUERY_PROXY = "http://192.168.1.66:8088"
DEL_PROXY = "http://192.168.1.66:8088/delete"

REDIS_HOST = '192.168.1.66'
REDIS_PORT = 6379

DOWNLOAD_IMAGE_SIZE = 4

# 开发环境
# HBASE_HOST = '192.168.1.78'
# 测试环境
# HBASE_HOST = '192.168.0.215'
HBASE_HOST = '10.10.97.35'
HBASE_PORT = 9090

PLATFORM_ALIBABA = 'a' #alibaba
PLATFORM_TOOLMALL = 'b' #toolmall
PLATFORM_EHSY = 'c' #ehsy
PLATFORM_HC360 = 'd' #hc360
PLATFORM_GRAINGER = 'e' #grainger

RESOURCE_ALIBABA = 'alibaba'
RESOURCE_TOOLMALL = 'toolmall'
RESOURCE_EHSY = 'ehsy'
RESOURCE_HC360 = 'hc360'
RESOURCE_GRAINGER = 'grainger'


TB_PRODUCT_PLATFORM = 'spider_ns:product_platform'
TB_COMPANY_PLATFORM = 'spider_ns:company_platform'
TB_CONTACT_PLATFORM = 'spider_ns:contact_platform'

# REDIS_URL = 'redis://user:pass@hostname:9001'
