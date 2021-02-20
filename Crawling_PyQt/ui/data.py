import requests
import json

SERVER = 'localhost:3000'
SERVER = 'jmnas6701.synology.me:3000'
#GC00001
#SG00001

class Req():
    def getCode(self, groupCode, subGroupCode):
        
        #r =requests.post("http://"+SERVER+"/cmm/getCode" , data ={ "groupCode":groupCode, "subGroupCode":subGroupCode})
        r =requests.post("http://localhost:3000/cmm/getCode" , data ={ "groupCode":groupCode, "subGroupCode":subGroupCode})
        data = r.json()
        return data