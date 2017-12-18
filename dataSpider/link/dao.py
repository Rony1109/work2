
class Dao(object):
    def insert(self, value=None):
        raise NotImplemented

    def delete(self, conditions=None):
        raise NotImplemented

    def update(self, conditions=None, value=None):
        raise NotImplemented

    def query(self, count=None, conditions=None):
        raise NotImplemented
