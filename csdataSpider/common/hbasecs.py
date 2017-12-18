import happybase

HBASE_HOST = '192.168.1.78'
HBASE_PORT = 9090

connection = happybase.Connection(host=HBASE_HOST, port=HBASE_PORT)
connection.open()

table = connection.table('spider_product_platform')
for key, data in table.scan(row_prefix=b'd.',limit=10):
    print(key, data)