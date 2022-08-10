from this import d
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import requests
import json
import random



chrome_options = Options()
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--ignore-ssl-errors')
chrome_options.add_argument("--disable-web-security")
chrome_options.add_argument("--disable-site-isolation-trials")

def main():
    # try:
    driver = webdriver.Chrome(options=chrome_options, executable_path='./chromedriver_win32/chromedriver')
    driver.get("http://localhost:3000")
    driver.maximize_window()
    print(driver.title)
    # find destination input
    element=driver.find_element(By.ID,"input")
    #input destination
    element.send_keys("Guangzhou, China")
    #click date range to drop
    driver.find_element(By.ID, "date_click").click()
    #start date
    driver.find_element(By.XPATH, "//button[22]").click()
    #end date
    driver.find_element(By.XPATH, "//button[25]").click()
    #click date range to fold
    driver.find_element(By.ID, "date_click").click()
    #find guest count button and increase by 1
    driver.find_element(By.ID,"guest-count-i").click()
    driver.find_element(By.ID,"guest-count-d").click()
    driver.find_element(By.ID,"guest-count-d").click()
    driver.find_element(By.ID,"guest-count-i").click()
    driver.find_element(By.ID,"room-count-i").click()
    driver.find_element(By.ID,"room-count-d").click()
    driver.find_element(By.ID,"room-count-d").click()
    driver.find_element(By.ID,"room-count-i").click()
    #find search button
    ele_searchbtn = driver.find_element(By.ID,"search_button")
    #make sure page loaded
    time.sleep(1)
    search_window = driver.current_window_handle
    print(search_window)
    #click search
    ele_searchbtn.click()
    #wait for page to jump to hotel list
    time.sleep(8)
    #result = driver.find_element(By.ID, "result")
    driver.find_element(By.XPATH, "//div[1]//div[3]//div[1]//div[2]//div[1]//div[2]//div[2]//a[@href]").click()
    time.sleep(8)
    driver.find_element(By.XPATH, "//body//div[1]//div[1]//div[3]//div[2]//div[1]//div[1]//div[1]//a//button").click()
    time.sleep(2)
    driver.find_element(By.ID, "salutation").click()
    driver.find_element(By.ID, "mr").click
    firstName = driver.find_element(By.ID, "firstName")
    firstName.send_keys("Jack")
    lastName = driver.find_element(By.ID, "lastName")
    lastName.send_keys("White")
    phone = driver.find_element(By.ID, "phone")
    phone.send_keys("81109243")
    email = driver.find_element(By.ID, "email")
    email.send_keys("jack_white@gmail.com")
    card = driver.find_element(By.ID, "card")
    card.send_keys("1111 2222 3333 4444")
    expiry = driver.find_element(By.ID, "expiry")
    expiry.send_keys("07/25")
    cvc = driver.find_element(By.ID, "cvc")
    cvc.send_keys("123")
    special = driver.find_element(By.ID, "special")
    special.send_keys("More orange juice, thank you")
    billing = driver.find_element(By.ID, "billing")
    billing.send_keys("My Home Street")
    driver.find_element(By.ID, "submit").click()
    time.sleep(5)
    driver.find_element(By.ID, "confirm").click()
    time.sleep(5)

    #print(result)

    # except Exception:
    #     break
def fuzz_destination():
    driver = webdriver.Chrome(options=chrome_options, executable_path='./chromedriver_win32/chromedriver')
    driver.get("http://localhost:3000")
    driver.maximize_window()
    print(driver.title)
    letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+`-=[]'\\;./{}|:\"<>? "
    input = random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter)
    element=driver.find_element(By.ID,"input")
    element.send_keys(input)
    ele_searchbtn = driver.find_element(By.ID,"search_button")
    ele_searchbtn.click()
    time.sleep(3)
    driver.find_element(By.ID, "homepage").click()
    time.sleep(3)

def fuzz_side_search1():
    driver = webdriver.Chrome(options=chrome_options, executable_path='./chromedriver_win32/chromedriver')
    driver.get("http://localhost:3000/hotelsearch/C7r0")
    driver.maximize_window()
    print(driver.title)
    letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+`-=[]'\\;./{}|:\"<>? "
    input = random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter)
    element=driver.find_element(By.ID,"input")
    element.send_keys(input)
    ele_searchbtn = driver.find_element(By.ID,"search_button")
    ele_searchbtn.click()
    time.sleep(3)
    driver.find_element(By.ID, "homepage").click()
    time.sleep(3)

def fuzz_side_search2():
    driver = webdriver.Chrome(options=chrome_options, executable_path='./chromedriver_win32/chromedriver')
    driver.get("http://localhost:3000/hotelsearch2/C7r0")
    driver.maximize_window()
    print(driver.title)
    letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+`-=[]'\\;./{}|:\"<>? "
    input = random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter) + random.choice(letter)
    element=driver.find_element(By.ID,"input")
    element.send_keys(input)
    ele_searchbtn = driver.find_element(By.ID,"search_button")
    ele_searchbtn.click()
    time.sleep(3)
    driver.find_element(By.ID, "homepage").click()
    time.sleep(3)

fuzz_side_search2()
