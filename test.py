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

# document = db.player_stats.find_one({'id':203507})

# stats = {}

# player = db.player_stats.find({'id':203507})
# # player = db.player_stats.find({'id':playerId})

# for stat in player:
#     stats[stat['id']] = {'name': stat['name']}


# print(stats)

# test = db.player_stats.find()


for player in test['resultSets'][0]['rowSet']:

    document = {
    "player_id" : player[0],
    "name" : player[1],
    "team_id" : player[2],
    "team_abbr" : player[3],
    "age" : player[4],
    "gp" : player[5],
    "w" : player[6],
    "l" : player[7],
    "w_pct" : player[8],
    "min" : player[9],
    "fgm" : player[10],
    "fga" : player[11],
    "fg_pct" : player[12],
    "fg3m" : player[13],
    "fg3a" : player[14],
    "fg3_pct" : player[15],
    "ftm" : player[16],
    "fta" : player[17],
    "ft_pct" : player[18],
    "oreb" : player[19],
    "dreb" : player[20],
    "reb" : player[21],
    "ast" : player[22],
    "tov" : player[23],
    "stl" : player[24],
    "blk" : player[25],
    "blka" : player[26],
    "pf" : player[27],
    "pfd" : player[28],
    "pts" : player[29],
    "plus_minus" : player[30],
    "nba_fant_pts" : player[31],
    "dd2" : player[32],
    "td3" : player[33],
    "gp_rank" : player[34],
    "w_rank" : player[35],
    "l_rank" : player[36],
    "w_pct_rank" : player[37],
    "min_rank" : player[38],
    "fgm_rank" : player[39],
    "fga_rank" : player[40],
    "fg_pct_rank" : player[41],
    "fg3m_rank" : player[42],
    "fg3a_rank" : player[43],
    "fg3_pct_rank" : player[44],
    "ftm_rank" : player[45],
    "fta_rank" : player[46],
    "ft_pct_rank" : player[47],
    "oreb_rank" : player[48],
    "dreb_rank" : player[49],
    "reb_rank" : player[50],
    "ast_rank" : player[51],
    "tov_rank" : player[52],
    "stl_rank" : player[53],
    "blk_rank" : player[54],
    "blka_rank" : player[55],
    "pf_rank" : player[56],
    "pfd_rank" : player[57],
    "pts_rank" : player[58],
    "plus_minus_rank" : player[59],
    "nba_fant_pts_rank" : player[60],
    "dd2_rank" : player[61],
    "td3_rank" : player[62],
    "cfid" : player[63],
    "cfparams" : player[64]}
        
    print(document)
    db.player_stats2.insert_one(document)