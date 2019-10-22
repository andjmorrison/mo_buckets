import requests
import json
import pandas as pd

import pymongo
from resources import mongo_user, mongo_pass, mongo_clusteruri, connection_uri
from nba_api.stats.endpoints import shotchartdetail, commonplayerinfo


playerinfo = commonplayerinfo.CommonPlayerInfo(player_id=2544).get_dict()
print(playerinfo)

# ---------------------------

# client = pymongo.MongoClient("mongodb+srv://ajmorrison:yedx6icaVe@cluster0-q82px.gcp.mongodb.net/test?retryWrites=true&w=majority")

# db = client.nba_db

# players = []
    
# collection = db.active_players.find()

# for document in collection:

#     id = document['id']
#     name = document['full_name']
#     data = (id, name)
#     players.append(data)

# print(players)

# ----------------------------

# game = db.nba_reddit.find_one()
# return render_template("index.html", game=game)

# base_url = 'https://stats.nba.com/stats/shotchartdetail?'

# AheadBehind = 'AheadBehind='
# CFID = 'CFID=33'
# CFPARAMS = 'CFPARAMS=2018-19'
# ClutchTime = 'ClutchTime='
# Conference = 'Conference='
# ContextFilter = 'ContextFilter='
# ContextMeasure = 'ContextMeasure=FGA'
# DateFrom = 'DateFrom='
# DateTo = 'DateTo='
# Division = 'Division='
# EndPeriod = 'EndPeriod=10'
# EndRange = 'EndRange=28800'
# GROUP_ID = 'GROUP_ID='
# GameEventID = 'GameEventID='
# GameID = 'GameID='
# GameSegment = 'GameSegment='
# GroupID = 'GroupID='
# GroupMode = 'GroupMode='
# GroupQuantity = 'GroupQuantity=5'
# LastNGames = 'LastNGames=0'
# LeagueID = 'LeagueID=00'
# Location = 'Location='
# Month = 'Month=0'
# OnOff = 'OnOff='
# OpponentTeamID = 'OpponentTeamID=0'
# Outcome = 'Outcome='
# PORound = 'PORound=0'
# Period = 'Period=0'
# PlayerID = 'PlayerID=201939'
# PlayerID1 = 'PlayerID1='
# PlayerID2 = 'PlayerID2='
# PlayerID3 = 'PlayerID3='
# PlayerID4 = 'PlayerID4='
# PlayerID5 = 'PlayerID5='
# PlayerPosition = 'PlayerPosition='
# PointDiff = 'PointDiff='
# Position = 'Position='
# RangeType = 'RangeType=0'
# RookieYear = 'RookieYear='
# Season = 'Season=2018-19'
# SeasonSegment = 'SeasonSegment='
# SeasonType = 'SeasonType=Regular+Season'
# ShotClockRange = 'ShotClockRange='
# StartPeriod = 'StartPeriod=1'
# StartRange = 'StartRange=0&'
# StarterBench = 'StarterBench='
# TeamID = 'TeamID=0'
# VsConference = 'VsConference='
# VsDivision = 'VsDivision='
# VsPlayerID1 = 'VsPlayerID1='
# VsPlayerID2 = 'VsPlayerID2='
# VsPlayerID3 = 'VsPlayerID3='
# VsPlayerID4 = 'VsPlayerID4='
# VsPlayerID5 = 'VsPlayerID5='
# VsTeamID = 'VsTeamID='

# shotchart_url = f'{base_url}{CFID}&{AheadBehind}&{CFPARAMS}&{ClutchTime}&{Conference}&{ContextFilter}&{ContextMeasure}&{DateFrom}&{DateTo}&{Division}&{EndPeriod}&{EndRange}&{GROUP_ID}&{GameEventID}&{GameID}&{GameSegment}&{GroupID}&{GroupMode}&{GroupQuantity}&{LastNGames}&{LeagueID}&{Location}&{Month}&{OnOff}&{OpponentTeamID}&{Outcome}&{PORound}&{Period}&{PlayerID}&{PlayerID1}&{PlayerID2}&{PlayerID3}&{PlayerID4}&{PlayerID5}&{PlayerPosition}&{PointDiff}&{Position}&{RangeType}&{RookieYear}&{Season}&{SeasonSegment}&{SeasonType}&{ShotClockRange}&{StartPeriod}&{StartRange}&{StarterBench}&{TeamID}&{VsConference}&{VsDivision}&{VsPlayerID1}&{VsPlayerID2}&{VsPlayerID3}&{VsPlayerID4}&{VsPlayerID5}&{VsTeamID}'
# headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}

# shotchart = requests.get(shotchart_url, headers=headers)

# shot_dict = shotchart.json()
# shot_dict['parameters']

# headers_df = shot_dict['resultSets'][0]['headers']

# data_df = shot_dict['resultSets'][0]['rowSet']

# single = shot_dict['resultSets'][0]['rowSet'][0]

# df = pd.DataFrame.from_records(data_df, columns=headers_df)
# testdf = df.to_html()
