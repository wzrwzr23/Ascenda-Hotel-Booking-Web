from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import requests
import json



chrome_options = Options()
chrome_options.add_argument("--disable-web-security")
chrome_options.add_argument("--disable-site-isolation-trials")

driver = webdriver.Chrome(chrome_options=chrome_options, executable_path='./chromedriver_win32/chromedriver')
driver.get("http://localhost:3000/")
print(driver.title)

element=driver.find_element(By.ID,"input")
element.send_keys("Shanghai, China")
driver.find_element(By.ID,"guest-count-i").click()
driver.find_element(By.ID,"search_button").click()
time.sleep(2)

res = requests.get('https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=YCcf&checkin=2022-08-04&checkout=2022-08-05&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1')
print(type(res.content))
data = json.loads(res.content.decode("utf-8"))
print(data["hotels"][0])
hotel_id = data["hotels"][0]["id"]
res_hotel = requests.get(f'https://hotelapi.loyalty.dev/api/hotels/{hotel_id}')

# driver.refresh()
# driver.get(driver.current_url)
time.sleep(2)