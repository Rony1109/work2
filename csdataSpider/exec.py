#!/usr/python3.6.0/bin/python3.6

"""
author     :LiHuan
date       :3/24/17 12:50 PM
description:Debug scrapy
"""

import re
import sys

from scrapy.cmdline import execute

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])

    args = [sys.argv[0], "crawl", "alibabaCompanyInfo"]

    sys.exit(execute(args))
