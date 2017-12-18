"""
author     :LiHuan
date       :3/24/17 12:50 PM
description:Define data storage interface
"""


class IStore(object):
    def insert(self, value=None):
        raise NotImplemented

    def delete(self, conditions=None):
        raise NotImplemented

    def update(self, conditions=None, value=None):
        raise NotImplemented

    def query(self, count=None, conditions=None):
        raise NotImplemented
