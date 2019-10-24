from flask import Flask, render_template, redirect, jsonify

import requests
import json
import pandas as pd

import pymongo

import nba_api
from nba_api.stats.static import players, teams
from nba_api.stats.endpoints import shotchartdetail, commonplayerinfo, playerdashboardbygeneralsplits

# credentials
from resources import mongo_user, mongo_pass, mongo_clusteruri

# -----------------------------------------------------

app = Flask(__name__)

conn = (f'mongodb+srv://{mongo_user}:{mongo_pass}@{mongo_clusteruri}')
client = pymongo.MongoClient(conn)

db = client.nba_db
collection = db.nba_reddit.find()

# -----------------------------------------------------

@app.route('/')
def index():
    return render_template('index.html')


# route for players
@app.route('/players')
def player_scraper():

    players = {}
    
    collection = db.active_players_copy.find()

    for document in collection:

        player_id = document['id']
        player_name = document['name_last_first']
        team_id = document['team_id']
        team = document['team_abbreviation']
        
        players[player_id] = {'name': player_name, 'id':player_id, 'team_id':team_id, 'team':team}
        

    return jsonify(players)

@app.route('/shotchart/<player>/<team>')
def construct_shotchart(player, team):

    allshots = shotchartdetail.ShotChartDetail(
                player_id=player, 
                team_id=team, 
                context_measure_simple='FGA',
                season_nullable='2018-19').get_dict()
    # allshots = shotchartdetail.ShotChartDetail(player_id=player, team_id=1610612745).get_dict()

    data = allshots['resultSets'][0]['rowSet']

    return jsonify(data)

@app.route('/playerdashboard/<player>')
def construct_dashboard(player):

    dashboard = playerdashboardbygeneralsplits.PlayerDashboardByGeneralSplits(player_id=player, season='2018-19').get_dict()

    data = dashboard['resultSets'][0]

    return jsonify(data)

@app.route('/playerdashboardextended/<player>')
def construct_dashboard_full(player):

    stats = {}

    player = db.player_stats.find_one({'name':'Andre Ingram'})

    

    # player_id = document['id']
    # player_name = document['name']
    # team_id = document['team_id']
    # team = document['team_abbr']
        
    # stats[player_id] = {'name': player_name, 'id':player_id, 'team_id':team_id, 'team':team}
        

    stats = {
    "id" : player['id'],
    "name" : player["name"],
    "team_id" : player[team_id],
    "team_abbr" : player[team_abbr],
    "age" : player[age],
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
    "dd2_rank" : player[dd2_rank],
    "td3_rank" : player[td3_rank],
    "cfid" : player[cfid],
    "cfparams" : player[cfparams]}



    return (stats)

@app.route('/teams')
def team_scraper():

    teams_all = teams.get_teams()

    return jsonify(teams_all)

if __name__ == "__main__":
    app.run(debug=True)
