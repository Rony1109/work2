#!/usr/bin/env python
# coding:utf-8

import requests,time,os,sys
from hashlib import md5


# 超级鹰,专业验证码识别平台
class Chaojiying_Client(object):
    def __init__(self):
        self.username = 'csc861668'
        # self.password = md5(password).hexdigest()
        self.password = 'csc86123456'
        self.soft_id = '893414'
        self.base_params = {
            'user': self.username,
            'pass': self.password,
            'softid': self.soft_id,
        }
        self.headers = {
            'Connection': 'Keep-Alive',
            'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
        }

    def PostPic(self, im):
        """
        im: 图片字节
        codetype: 题目类型 参考 http://www.chaojiying.com/price.html
        """
        params = {
            'codetype': 1902,
        }
        params.update(self.base_params)
        files = {'userfile': ('ccc.jpg', im)}
        r = requests.post('http://upload.chaojiying.net/Upload/Processing.php', data=params, files=files,
                          headers=self.headers)
        return r.json()

    def ReportError(self, im_id):
        """
        im_id:报错题目的图片ID
        """
        params = {
            'id': im_id,
        }
        params.update(self.base_params)
        r = requests.post('http://code.chaojiying.net/Upload/ReportError.php', data=params, headers=self.headers)
        return r.json()

    def autoCheckCode(self, driver, sec_url):
        save_img_url='E:/temp/sec_'+str(time.time())+'.jpg' if sys.platform == 'win32' else '/data/checkcode/sec_'+str(time.time())+'.jpg'
        # print('========================save_img_url======================================'+save_img_url)
        driver.get(sec_url)
        time.sleep(5)
        # print('checkcodeImg url ===================================================== %s ' % driver.find_element_by_id("checkcodeImg").get_attribute("src"))
        checkcodeimg_url = driver.find_element_by_id("checkcodeImg").get_attribute("src")
        response = requests.get(checkcodeimg_url)
        with open(save_img_url, 'wb') as f:
            f.write(response.content)

        im = open(save_img_url, 'rb').read()
        json = self.PostPic(im)
        # print('checkcode =======================checkcode================================================================= %s ' % json['pic_str'])
        code_input = driver.find_element_by_id("checkcodeInput")
        code_input.send_keys(json['pic_str'])
        driver.find_element_by_xpath("//input[@type='submit']").click()
        time.sleep(2)
        os.remove(save_img_url)
        return driver.page_source

'''
if __name__ == '__main__':

    chaojiying = Chaojiying_Client()
    im = open('temp3.jpg', 'rb').read()
    json = chaojiying.PostPic(im)
    print (chaojiying.PostPic(im))
    print('= %s ' % json['pic_str'])
'''
