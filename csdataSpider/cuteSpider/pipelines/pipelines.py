"""
author     :LiHuan
date       :4/6/17 1:28 PM
description:
"""


class ImagesPipeline(object):
    def process_item(self, item, spider):
        store_root = spider.custom_settings["IMAGES_STORE"]
        if not store_root:
            raise NotADirectoryError("Not IMAGES_STORE")

        return item
