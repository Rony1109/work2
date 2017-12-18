"""
author     :LiHuan
date       :2017/5/25 11:23
description:
"""
import random

USER_AGENTS = [
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/517.11 (KHTML, like Gecko) Chrome/57.0.1201.133 Safari/537.11",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/527.12 (KHTML, like Gecko) Chrome/57.0.1202.134 Safari/537.12",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/57.0.1203.135 Safari/537.13",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/547.14 (KHTML, like Gecko) Chrome/57.0.1204.136 Safari/537.14",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/557.15 (KHTML, like Gecko) Chrome/57.0.1205.137 Safari/537.15",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/567.16 (KHTML, like Gecko) Chrome/57.0.1206.138 Safari/537.16",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/577.17 (KHTML, like Gecko) Chrome/57.0.1207.139 Safari/537.17",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/587.18 (KHTML, like Gecko) Chrome/57.0.1208.140 Safari/537.18",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/597.19 (KHTML, like Gecko) Chrome/57.0.1209.141 Safari/537.19",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/137.20 (KHTML, like Gecko) Chrome/57.0.1210.142 Safari/537.20",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/237.21 (KHTML, like Gecko) Chrome/57.0.1211.143 Safari/537.21",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/337.22 (KHTML, like Gecko) Chrome/57.0.1212.144 Safari/537.22",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/437.23 (KHTML, like Gecko) Chrome/57.0.1213.145 Safari/537.23",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.24 (KHTML, like Gecko) Chrome/57.0.1214.146 Safari/537.24",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/637.25 (KHTML, like Gecko) Chrome/57.0.1215.147 Safari/537.25",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/737.26 (KHTML, like Gecko) Chrome/57.0.1216.148 Safari/537.26",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/837.27 (KHTML, like Gecko) Chrome/57.0.1217.149 Safari/537.27",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/937.28 (KHTML, like Gecko) Chrome/57.0.1218.150 Safari/537.28",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/531.29 (KHTML, like Gecko) Chrome/57.0.1219.151 Safari/537.29",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/532.30 (KHTML, like Gecko) Chrome/57.0.1230.152 Safari/537.30",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/533.31 (KHTML, like Gecko) Chrome/57.0.1231.153 Safari/537.31",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/534.32 (KHTML, like Gecko) Chrome/57.0.1232.154 Safari/537.32",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/535.33 (KHTML, like Gecko) Chrome/57.0.1233.155 Safari/537.33",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/536.34 (KHTML, like Gecko) Chrome/57.0.1234.156 Safari/537.34",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.35 (KHTML, like Gecko) Chrome/57.0.1235.157 Safari/537.35",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/538.36 (KHTML, like Gecko) Chrome/57.0.1236.158 Safari/537.36",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/539.37 (KHTML, like Gecko) Chrome/57.0.1237.159 Safari/537.37",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/123.38 (KHTML, like Gecko) Chrome/57.0.1238.160 Safari/537.38",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/124.39 (KHTML, like Gecko) Chrome/57.0.1239.161 Safari/537.39",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/125.40 (KHTML, like Gecko) Chrome/57.0.1240.162 Safari/537.40",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/126.41 (KHTML, like Gecko) Chrome/57.0.1241.163 Safari/537.41",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/127.42 (KHTML, like Gecko) Chrome/57.0.1242.164 Safari/537.42",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/128.43 (KHTML, like Gecko) Chrome/57.0.1243.165 Safari/537.43",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/129.44 (KHTML, like Gecko) Chrome/57.0.1244.166 Safari/537.44",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/130.45 (KHTML, like Gecko) Chrome/57.0.1245.167 Safari/537.45",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/131.46 (KHTML, like Gecko) Chrome/57.0.1246.168 Safari/537.46",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/132.47 (KHTML, like Gecko) Chrome/57.0.1247.169 Safari/537.47",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/133.48 (KHTML, like Gecko) Chrome/57.0.1248.170 Safari/537.48",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/134.49 (KHTML, like Gecko) Chrome/57.0.1249.171 Safari/537.49",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/135.50 (KHTML, like Gecko) Chrome/57.0.1250.172 Safari/537.50",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/136.51 (KHTML, like Gecko) Chrome/57.0.1251.173 Safari/537.51",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/137.52 (KHTML, like Gecko) Chrome/57.0.1252.174 Safari/537.52",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/138.53 (KHTML, like Gecko) Chrome/57.0.1253.175 Safari/537.53",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/139.54 (KHTML, like Gecko) Chrome/57.0.1254.176 Safari/537.54",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/140.55 (KHTML, like Gecko) Chrome/57.0.1255.177 Safari/537.55",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/141.56 (KHTML, like Gecko) Chrome/57.0.1256.178 Safari/537.56",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/142.57 (KHTML, like Gecko) Chrome/57.0.1257.179 Safari/537.57",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/143.58 (KHTML, like Gecko) Chrome/57.0.1258.180 Safari/537.58",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/144.59 (KHTML, like Gecko) Chrome/57.0.1259.181 Safari/537.59",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/145.60 (KHTML, like Gecko) Chrome/57.0.1260.182 Safari/537.60",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/146.61 (KHTML, like Gecko) Chrome/57.0.1261.183 Safari/537.61"
]



def get_header():
    return {
        'User-Agent': random.choice(USER_AGENTS),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate',
    }
