import redis
from link.config import *
from link.dao import Dao


class MyRedis(Dao):
    def __init__(self):
        super().__init__()
        self.redisServer = redis.Redis(REDIS_HOST, REDIS_PORT)
