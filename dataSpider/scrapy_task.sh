#!/bin/bash
#Use crontab to enter the timing task

echo "===============================`date '+%Y-%m-%d %T'`==============================="

cd /data/pywork/cuteSpider/link
nohup /usr/python-3.6.0/bin/python3 searchUrl.py > /data/logs/searchUrl.log 2>&1 &

cd /data/pywork/cuteSpider

nohup /usr/python-3.6.0/bin/scrapy crawl toolmallCategory > /data/logs/toolmallCategory.log 2>&1 &

nohup /usr/python-3.6.0/bin/scrapy crawl graingerPageMax > /data/logs/graingerPageMax.log 2>&1 &

#nohup /usr/python-3.6.0/bin/scrapy crawl ehsyOnecategory > /data/logs/ehsyOnecategory.log 2>&1 &
