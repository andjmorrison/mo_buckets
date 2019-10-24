import requests
import json
import pandas as pd

import pymongo
from resources import mongo_user, mongo_pass, mongo_clusteruri, connection_uri
from nba_api.stats.endpoints import shotchartdetail, commonplayerinfo, leaguedashplayerstats


test = leaguedashplayerstats.LeagueDashPlayerStats(season='2018-19').get_dict()
# print(test)

conn = (f'mongodb+srv://{mongo_user}:{mongo_pass}@{mongo_clusteruri}')
client = pymongo.MongoClient(conn)

db = client.nba_db

for i in test['resultSets'][0]['rowSet']:
    # print( i )
    document = {i[0]:i}
    print(document)
    db.player_stats.replace_one(document, document, upsert=True)