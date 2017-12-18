#!/bin/bash
source /etc/profile
t1=`date -d '-1 hours' +%s%N | cut -c 1-13`
if [ ! "$2"  ]; then
  t1=`date -d '-1 hours' +%s%N | cut -c 1-13`
else
  t1=`date -d "$2" +%s%N | cut -c 1-13`

fi
t2=`date  +%s%N | cut -c 1-13`
if [ ! "$3"  ]; then
  t2=`date  +%s%N | cut -c 1-13`
else
  t2=`date -d "$3" +%s%N | cut -c 1-13`
fi

key='abcde'
if [ ! "$1"  ]; then
  key="abcde"
else
  key="$1"
fi

exec $HBASE_HOME/bin/hbase shell <<EOF
import org.apache.hadoop.hbase.filter.RegexStringComparator
import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SubstringComparator
import org.apache.hadoop.hbase.filter.RowFilter
scan 'spider_product_platform', {TIMERANGE => [${t1}, ${t2}],FILTER => RowFilter.new(CompareFilter::CompareOp.valueOf('EQUAL'),RegexStringComparator.new('^[${key}].*'))}
EOF