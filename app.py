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

    allshots = shotchartdetail.ShotChartDetail(player_id=player, team_id=team, season_nullable='2018-19').get_dict()
    # allshots = shotchartdetail.ShotChartDetail(player_id=player, team_id=1610612745).get_dict()

    data = allshots['resultSets'][0]['rowSet']

    return jsonify(data)

@app.route('/playerdashboard/<player>')
def construct_dashboard(player):

    dashboard = playerdashboardbygeneralsplits.PlayerDashboardByGeneralSplits(player_id=player, season='2018-19').get_dict()

    data = dashboard['resultSets'][0]['rowSet']

    return jsonify(data)

@app.route('/teams')
def team_scraper():

    teams_all = teams.get_teams()

    return jsonify(teams_all)

if __name__ == "__main__":
    app.run(debug=True)
