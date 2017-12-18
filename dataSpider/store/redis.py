"""
author     :LiHuan
date       :3/24/17 5:39 PM
description:
"""

import redis
from config import *
from store.iStore import IStore

class MyRedis(IStore):
    def __init__(self):
        super().__init__()
        self.redisServer = redis.Redis(REDIS_HOST, REDIS_PORT)