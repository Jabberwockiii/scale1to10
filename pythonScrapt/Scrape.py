import requests
from bs4 import BeautifulSoup
import time
number = 1
for i in range(10):
    response = requests.get("https://www.thispersondoesnotexist.com/image")
    file = open(str(i)+".png", "wb")
    file.write(response.content)
    time.sleep(1)
file.close()