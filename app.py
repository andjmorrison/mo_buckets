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

    dashboard = playerdashboardbygeneralsplits.PlayerDashboardByGeneralSplits(
        player_id=player, 
        season='2018-19', 
        per_mode_detailed='Per36',
        rank='N',
        ).get_dict()

    data = dashboard

    return jsonify(data)

@app.route('/playerdashboardextended/<playerId>')
def construct_dashboard_full(playerId):

    idvariable = playerId

    player = db.player_stats_per36.find({'player_id':int(idvariable)})

    stats = []

    for thing in player:
        stats.append(thing['player_id']),
        stats.append(thing["name"]),
        stats.append(thing['team_id']),
        stats.append(thing['team_abbr'])
        stats.append(thing['age'])
        stats.append(thing['gp']),
        stats.append(thing['w']),
        stats.append(thing['l']),
        stats.append(thing['w_pct']),
        stats.append(thing['min']),
        stats.append(thing['fgm']),
        stats.append(thing['fga']),
        stats.append(thing['fg_pct']),
        stats.append(thing['fg3m']),
        stats.append(thing['fg3a']),
        stats.append(thing['fg3_pct']),
        stats.append(thing['ftm']),
        stats.append(thing['fta']),
        stats.append(thing['ft_pct']),
        stats.append(thing['oreb']),
        stats.append(thing['dreb']),
        stats.append(thing['reb']),
        stats.append(thing['ast']),
        stats.append(thing['tov']),
        stats.append(thing['stl']),
        stats.append(thing['blk']),
        stats.append(thing['blka']),
        stats.append(thing['pf']),
        stats.append(thing['pfd']),
        stats.append(thing['pts']),
        stats.append(thing['plus_minus']),
        stats.append(thing['nba_fant_pts']),
        stats.append(thing['dd2']),
        stats.append(thing['td3']),
        stats.append(thing['gp_rank']),
        stats.append(thing['w_rank']),
        stats.append(thing['l_rank']),
        stats.append(thing['w_pct_rank']),
        stats.append(thing['min_rank']),
        stats.append(thing['fgm_rank']),
        stats.append(thing['fga_rank']),
        stats.append(thing['fg_pct_rank']),
        stats.append(thing['fg3m_rank']),
        stats.append(thing['fg3a_rank']),
        stats.append(thing['fg3_pct_rank']),
        stats.append(thing['ftm_rank']),
        stats.append(thing['fta_rank']),
        stats.append(thing['ft_pct_rank']),
        stats.append(thing['oreb_rank']),
        stats.append(thing['dreb_rank']),
        stats.append(thing['reb_rank']),
        stats.append(thing['ast_rank']),
        stats.append(thing['tov_rank']),
        stats.append(thing['stl_rank']),
        stats.append(thing['blk_rank']),
        stats.append(thing['blka_rank']),
        stats.append(thing['pf_rank']),
        stats.append(thing['pfd_rank']),
        stats.append(thing['pts_rank']),
        stats.append(thing['plus_minus_rank']),
        stats.append(thing['nba_fant_pts_rank']),
        stats.append(thing['dd2_rank']),
        stats.append(thing['td3_rank']),
        stats.append(thing['cfid']),
        stats.append(thing['cfparams'])

    return jsonify(stats)

@app.route('/teams')
def team_scraper():

    teams_all = teams.get_teams()

    return jsonify(teams_all)

if __name__ == "__main__":
    app.run(debug=True)
