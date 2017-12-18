from config import *
import happybase
import datetime, time


class Hbase():
    def __init__(self):
        # 要先在hbase某个节点上开启thrift服务
        # hbase thrift -p 9090 start
        self.connection = happybase.Connection(host=HBASE_HOST, port=HBASE_PORT)
        self.connection.open()

    def row_key(self, id, platform):
        split = '.'
        time_str = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        row_key = split.join((platform, time_str, id))
        # print('==' ,row_key)
        return row_key
