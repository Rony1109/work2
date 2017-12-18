"""
author     :LiHuan
date       :3/24/17 12:50 PM
description:
"""

DB_CONFIG = {
    'DB_CONNECT_TYPE': 'sqlalchemy',
    'DB_CONNECT_STRING': 'mysql+pymysql://root:123456@192.168.1.82/csc_cutespider?charset=utf8'
    # 'DB_CONNECT_STRING': 'mysql+pymysql://app_cutespider:{}@10.10.102.200/csc_cutespider?charset=utf8'.format('spider@csc86.com')
}

QUERY_PROXY = "http://192.168.1.66:8088"
DEL_PROXY = "http://192.168.1.66:8088/delete"

REDIS_HOST = '192.168.1.66'
REDIS_PORT = 6379

DOWNLOAD_IMAGE_SIZE = 4

# REDIS_URL = 'redis://user:pass@hostname:9001'
