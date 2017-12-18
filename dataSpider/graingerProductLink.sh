#! /bin/bash

echo "===============================`date '+%Y-%m-%d %T'`==============================="

findStr='crawl graingerProductLink'

PID=`ps -ef |grep "$findStr"|grep -v 'grep'|awk '{print $2}'|head -1`

if [[ "$PID" != "" ]]
then
    #kill -9 $PID
    #echo $PID
    echo `ps -ef |grep "$findStr"|grep -v 'grep'|awk '{print $2}'|xargs kill`
fi

sleep 1

if [[ "$1" != "stop" ]]
then
    cd /data/pywork/cuteSpider
    nohup /usr/python-3.6.0/bin/scrapy crawl graingerProductLink > /data/logs/graingerProductLink.log 2>&1 &
fi
