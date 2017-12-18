# -*- coding:utf-8 -*-
import sys,time,socket,struct,requests,os
from selenium import webdriver
from scrapy.selector import Selector
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.proxy import ProxyType
from cuteSpider.middlewares.proxy import proxyUtils
import pytesseract
from PIL import Image
import random

def get_ip( ifname = 'eth0'):
    if sys.platform == 'win32':
        return socket.gethostbyname(socket.gethostname())
    mod_name = 'fcntl'
    mod_obj = __import__(mod_name)
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(mod_obj.ioctl(s.fileno(),0x8915,struct.pack('256s', ifname[:15]))[20:24])



def path():
    rootdir = "E:\work\dataSpider" if sys.platform == 'win32' else  "/data/logs/"

    for parent,dirnames,filenames in os.walk(rootdir):
        # print("parent is: "+ parent)

        # for dirname in  dirnames:
        #     print("parent is: " + parent)
        #     print("dirname is: " + dirname)

        for filename in filenames:
            # print("parent is:" + parent)
            # print("filename is:" + filename)
            print("the full name of the file is:" + os.path.join(parent,filename))

# path()

# image = Image.open('test.png')
# # 获得图像尺寸:
# w, h = image.size
# # 缩放到50%:
# image.thumbnail((w//2, h//2))
# # 把缩放后的图像用jpeg格式保存:
# image.save('1213.jpg', 'jpeg')
# vcode = pytesseract.image_to_string(image)
#D:\python3.6.0\Lib\site-packages\pytesseract执行 cmd命令运行
# print(vcode)



# print(get_ip())
# # binary = FirefoxBinary(r'D:\Firefox\firefox.exe')
# # driver = webdriver.Firefox(firefox_binary=binary)
# driver = webdriver.Firefox()
# #driver = webdriver.PhantomJS()
# driver.get("http://www.csc86.com")
# # 获得cookie 信息
# current_url = driver.current_url
# cookie= driver.get_cookies()
# #将获得cookie 的信息打印
# print(cookie)
# print(current_url)
# driver.save_screenshot("111222.png")
# # driver.quit()


# response = requests.get('https://pin.aliyun.com/get_img?sessionid=86d2415304daab39ef58a5f16b86d4fd&identity=sm-searchweb2&type=default')
# with open('E:/temp/111.jpg', 'wb') as f:
#     f.write(response.content)

QUERY_PROXY = "http://192.168.1.66:8088"
proxies = []
def __getRemoteProxy():
    try:
        params = {}
        # params['types'] = 0
        params['count'] = 50
        resp = requests.get(QUERY_PROXY, params)
        global proxies
        print('=====================resp====================%s' % resp.json())
        proxies += resp.json()
        print('=====================proxies====================%s' % proxies)
    except Exception as e:
        print(e)



def _chrome():
    driver = webdriver.Chrome() if sys.platform == 'win32' else webdriver.PhantomJS(
        '/opt/phantomjs/bin/phantomjs')
    url = "http://www.ip168.com/"
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('headless')
    chrome_options.add_argument('disable-gpu')
    driver = webdriver.Chrome(chrome_options=chrome_options)
    driver.get(url)
    title = driver.title
    print(title)




def _getheaderproxy():

    dcap =  DesiredCapabilities.PHANTOMJS.copy()

    dcap[
        "phantomjs.page.settings.userAgent"] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
    dcap["phantomjs.page.settings.loadImages"] = False
    proxy = webdriver.Proxy()
    proxy.proxy_type = ProxyType.MANUAL
    proxyStr = proxyUtils.get_proxy_alibaba()
    proxy.http_proxy = proxyStr
    print('=====123======== %s' % proxyStr)
    proxy.add_to_capabilities(dcap)

    driver = webdriver.PhantomJS(
        desired_capabilities=dcap) if sys.platform == 'win32' else webdriver.PhantomJS(
        '/opt/phantomjs/bin/phantomjs', desired_capabilities=dcap)
    driver.set_window_size(1920, 1080)

    url = "http://www.ip168.com/"

    driver.start_session(dcap)
    driver.get(url)


    js = """
                        (function () {
                        function f(){
                            window.scroll(0, 9999);
                            setTimeout(f, 500);
                        }
                        var newabcd=document.createElement('div');
                        newabcd.innerHTML =navigator.userAgent;
                        document.body.appendChild(newabcd);
                       f()

                        })();
                    """
    driver.execute_script(js)
    time.sleep(10)
    driver.save_screenshot('E:/temp/123.jpg')

    # 把代理ip加入
    proxy.proxy_type = ProxyType.MANUAL
    proxyStr = proxyUtils.get_proxy_alibaba()
    proxy.http_proxy = proxyStr
    print('=====234======== %s' % proxyStr)
    proxy.add_to_capabilities(dcap)
    # 新建一个会话，并传入
    driver.start_session(dcap)
    driver.get(url)
    time.sleep(10)
    driver.save_screenshot('E:/temp/234.jpg')

    #
    # driver.find_elements_by_xpath("//a[@class='forget-pwd J_Quick2Static']/text()").click()
    #
    # driver.find_element_by_id("TPL_username_1").clear()
    # driver.find_element_by_id("TPL_password_1").clear()
    #
    # driver.find_element_by_id("TPL_username_1").send_keys("")
    # driver.find_element_by_id("TPL_password_1").send_keys("")
    #
    # driver.find_element_by_id("J_SubmitStatic").click()

    # cookies = driver.get_cookies()

    # print(cookies)
    driver.save_screenshot('123.jpg')
    driver.quit()
# _getheaderproxy()

def take_screenshot(url, save_fn="123.png"):
    driver = webdriver.Firefox() # Get local session of firefox
    # driver = webdriver.PhantomJS()
    driver.set_window_size(1920, 1080)
    driver.get(url) # Load page
    driver.execute_script("""
        (function () {
            var y = 0;
            var step = 100;
            window.scroll(0, 0);

            function f() {
                if (y < document.body.scrollHeight) {
                    y += step;
                    window.scroll(0, y);
                    setTimeout(f, 100);
                } else {
                    //window.scroll(0, 0);
                    $('img').remove();
                    document.title += "scroll-done";
                }
            }

            setTimeout(f, 1000);
        })();
    """)

    for i in range(30):
        if "scroll-done" in driver.title:
            break
        time.sleep(5)
    current_url = driver.current_url
    print('======================current_url======================== %s' % current_url)
    html = Selector(text=driver.page_source)
    pageMax = html.xpath('//div[@id="sm-pagination"]/div/@data-total-page').extract()
    pageMax = pageMax and pageMax[0] or 1
    print('========================pageMax====================== %s' % pageMax)
    driver.save_screenshot(save_fn)
    driver.quit()


if __name__ == "__main__":
    pass
    # take_screenshot("https://s.1688.com/selloffer/offer_search.htm?keywords=%BB%B7%B1%A3%CE%FD%B8%E0&button_click=top&earseDirect=false&n=y&smToken=8ed899d36cc142319a5b0820fa2f2abe&smSign=mD%2Bk2B0c%2BSGK8ctVu2qOxg%3D%3D&beginPage=32&offset=10")