import requests
from bs4 import BeautifulSoup

def crawler():

    url = "http://fifaonline4.nexon.com/datacenter/PlayerList?n4OvrMin="+str(79)+"&n4OvrMax="+str(79)+"&strSeason=%2C"+str(300)+"%2C&n4LeagueId="+str(13)
    print(url)
    html = requests.post(url)
    soup = BeautifulSoup( html.text, 'html.parser')
    t = soup.select(".tr")
    
    for tr in t :
        playerName = tr.find('div', {'class':'name'}).text
        bp_1=tr.find('span', {'class':'span_bp1'}).text
        bp_2=tr.find('span', {'class':'span_bp2'}).text
        bp_3=tr.find('span', {'class':'span_bp3'}).text
        bp_4=tr.find('span', {'class':'span_bp4'}).text
        bp_5=tr.find('span', {'class':'span_bp5'}).text
        bp_6=tr.find('span', {'class':'span_bp6'}).text
        bp_7=tr.find('span', {'class':'span_bp7'}).text
        bp_8=tr.find('span', {'class':'span_bp8'}).text
        position = tr.find('span', {'class':'position'}).find('span',{'class','txt'}).text
        ovr = tr.find('span', {'class':'position'}).select_one('span[class*="skillData_"]').text

        #temp.getElementsByClass("name").text()
        #print(playerName  ,  position , ovr)
        #print(bp_1, bp_2, bp_3, bp_4, bp_5, bp_6, bp_7, bp_8)
    #print(html.text)

    

crawler()