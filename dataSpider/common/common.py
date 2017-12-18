# coding: utf-8
"""
author     :Ren maohua
date       :5/16/17 13:37
description:  公共方法
"""
import  json ,re

class Common:
    @staticmethod
    def returnArray(array):
        length = int(len(array)/2)
        arr= [[array[2*i],array[2*i+1]] for i in range(length)]
        return str(arr)

    @staticmethod
    def formatstr(s):
        s = re.sub(r'["]', '&quot;', s, count=0, flags=0)
        s = re.sub(r'[：:]', '', s, count=0, flags=0)
        return s

    @staticmethod
    def formatstrip(s):
        s = re.sub(r'[\s]', '', s, count=0, flags=0)
        s = s.split('：',1)
        return s

    @staticmethod
    def filterstr(s):
        s1 = re.findall(r'：', s, flags=0)
        s1 = s1 and True or False
        return s1

    @staticmethod
    def return2Array(array1, array2):
        # array1=array1
        # array2 = array2
        # length =int(len(array1))
        # arr = [[array1[i],array2[i]] for i in range(length)]
        #return str(arr)
        return json.dumps(dict(zip(array1,array2)),ensure_ascii=False) if dict(zip(array1,array2)) else ""

