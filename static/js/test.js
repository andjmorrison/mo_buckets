let urlPhoto = ''

function buildChart(playerId, playerTeamId) {


    // shotchart
    d3.json(`/shotchart/${playerId}/${playerTeamId}`).then(individual => {

        // name
        playerName = individual[0][4]
        playerTeam = individual[0][6]
        // console.log(playerName)

        // coords
        // console.log(individual)

        let shotCoordX = []
        let shotCoordY = []
        let shotText = []
        let shotDistance = []
        let shotDate = []
        let shotMade = []

        individual.forEach(row => {

            let x = row[17]
            let y = row[18]
            let text = row[11]
            let distance = row[16]
            let date = row[21]
            let made = row[20]

            shotCoordX.push(x)
            shotCoordY.push(y)
            shotText.push(text)
            shotDistance.push(distance)
            shotDate.push(date)
            shotMade.push(made)

        })

        // console.log(shotCoordX)
        // console.log(shotCoordY)

        urlPhoto = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${playerTeamId}/2019/260x190/${playerId}.png`
        // urlPhoto = 'https://scoutfly.cbsistatic.com/bundles/scoutcss/images/default/default-headshot.png'

        function getUrlPhoto(urlPhoto) {
            fetch(urlPhoto).then(response => {
                if (response.status == 403) {
                    urlPhoto = `https://scoutfly.cbsistatic.com/bundles/scoutcss/images/default/default-headshot.png`
                    return urlPhoto
                }
                // else {
                //     urlPhoto2 = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${playerTeamId}/2019/260x190/${playerId}.png`
                //     return urlPhoto2
                // }
            })
            return urlPhoto
        }

        getUrlPhoto(urlPhoto)
        console.log(urlPhoto)

        let trace = {
            x: shotCoordX,
            y: shotCoordY,
            mode: 'markers',
            type: 'scatter',
            text: shotText,
            marker: {
                color: shotMade,
                colorscale: 'Portland',
            },
            colorscale: [
                ['0', 'red'],
                ['1.0', 'blue']
              ],
        }

        console.log(trace)

        let data = [trace]

        let layout = {
            title: {
                text:`Shot Chart:<br> ${playerName}, ${playerTeam}`,
                font: {
                //   family: 'Courier New, monospace',
                  size: 24,
                  color: 'white'
                },
            },
            annotations: [
                {
                  x: 200,
                  y: 355,
                  xref: 'x',
                  yref: 'y',
                  text: 'FG%: ',
                  showarrow: false,
                  ax: 0,
                  ay: -40
                },
                {
                    x: 200,
                    y: 340,
                    xref: 'x',
                    yref: 'y',
                    text: '3P%: ',
                    showarrow: false,
                    ax: 0,
                    ay: -40
                  }
            ],
            autosize: false,
            width: 605,
            height: 800,
            xaxis: {
                range: [-260, 260],
                showgrid: false,
                type: 'linear'
            },
            yaxis: {
                range: [-100, 500],
                showgrid: false,
                type: 'linear'
            },
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            paper_bgcolor: '#7f7f7f',
            plot_bgcolor: 'white',
            shapes: [
                {
                    // halfcourt
                    type:'rect',
                    xref:'x',
                    yref:'y',
                    x0:'-250',
                    y0:'-47.5',
                    x1:'250',
                    y1:'422.5',
                    line: {
                        color:'rgba(10, 10, 10, 1)',
                        width:1
                    }
                },
                {
                    // basket
                    type:'circle',
                    xref:'x',
                    yref:'y',
                    x0:'7.5',
                    y0:'7.5',
                    x1:'-7.5',
                    y1:'-7.5',
                    line: {
                        color:'rgba(10, 10, 10, 1)',
                        width:1
                    }
                },
                {
                    // 3 pt left corner
                    type:'rect',
                    xref:'x',
                    yref:'y',
                    x0:'-80',
                    y0:'-47.5',
                    x1:'80',
                    y1:'143.5',
                    line: {
                        color:'rgba(10, 10, 10, 1)',
                        width:1
                    }
                },
                {
                    type:'line',
                    xref:'x',
                    yref:'y',
                    x0:'-220',
                    y0:'-47.5',
                    x1:'-220',
                    y1:'92.5',
                    line: {
                        color:'rgba(10, 10, 10, 1)',
                        width:1
                    }
                },
                {
                    // 3pt right corner
                    type:'line',
                    xref:'x',
                    yref:'y',
                    x0:'220',
                    y0:'-47.5',
                    x1:'220',
                    y1:'92.5',
                    line: {
                        color:'rgba(10, 10, 10, 1)',
                        width:1
                    }
                },
                {
                    // 3pt arc
                    type:'path',
                    xref:'x',
                    yref:'y',
                    path:'M -220 92.5 C -70 300, 70 300, 220 92.5',
                    line: {
                        color:'rgba(10, 10, 10, 1)',
                        width:1
                    }
                },
                {
                    // ft circle
                    type:'circle',
                    xref:'x',
                    yref:'y',
                    x0:'60',
                    y0:'200',
                    x1:'-60',
                    y1:'80',
                    line: {
                        color:'rgba(10, 10, 10, 1)',
                        width:1
                    }
                },
            ],
            images: [
                {
                    x: .95,
                    y: .87,
                    sizex: 0.2,
                    sizey: 0.2,
                    source: urlPhoto,
                    xanchor: 'right',
                    xref: 'paper',
                    yanchor: 'bottom',
                    yref: 'paper'
                }
            ],
        }

        // console.log(trace)

        Plotly.newPlot('shotchart', data, layout);

    })

    // radar plot
    d3.json(`/playerdashboard/${playerId}`).then(individual => {

        // name
        let headers = individual['headers']
        console.log(headers)

        rows = individual['rowSet'][0]
        console.log(rows)

        let playerGP = rows[2]

        let playerPTS = rows[26]/playerGP
        let playerREB = rows[18]/playerGP
        let playerAST = rows[19]/playerGP
        let playerSTL = rows[21]/playerGP
        let playerBLK = rows[22]/playerGP


        // console.log(shotCoordX)
        // console.log(shotCoordY)

        urlPhoto = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${playerTeamId}/2019/260x190/${playerId}.png`
        // urlPhoto = 'https://scoutfly.cbsistatic.com/bundles/scoutcss/images/default/default-headshot.png'


        dataRadar = [{
            type: 'scatterpolar',
            r: [playerPTS, playerREB, playerAST, playerSTL, playerBLK, playerPTS],
            theta: ['PTS', 'REB', 'AST', 'STL', 'BLK', 'PTS'],
            fill: 'toself'
        }]
        console.log(dataRadar)


        layoutRadar = {
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 30]
                }
            },
            showlegend: false
        }

        Plotly.newPlot('radar', dataRadar, layoutRadar);

    })


}


function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selectPlayer")

    // Use the list of sample names to populate the select options
    d3.json("/players").then(players => {

        // console.log(players)

        let testing = Object.entries(players)

        testing.forEach((player) => {

            // console.log(player[1].name, player[1].team_id)

            let playerName = player[1].name
            let playerId = player[1].id
            let playerTeamId = player[1].team_id

            // let playerString = playerId, playerTeamId
            let playerArray = [playerId, playerTeamId]
            let playerObject = {
                'id': playerId,
                'team': playerTeamId
            }

            // console.log(playerArray)
            // console.log(typeof playerArray)

            // console.log(playerObject)
            // console.log(typeof playerObject)

            selector
                .append('option')
                .text(playerName)
                .attr('value', [playerObject.id, playerObject.team])
            // .property("value", playerObject)
        })


        // let selector = d3.select("#selectPlayer")
        let selectId = document.getElementById('selectPlayer')

        // sort function
        function sortSelectOptions(selector) {

            let tmpAry = new Array()
            for (let i = 0; i < selector.options.length; i++) {
                tmpAry[i] = new Array()
                tmpAry[i][0] = selector.options[i].text
                tmpAry[i][1] = selector.options[i].value
            }
            tmpAry.sort();
            while (selector.options.length > 0) {
                selector.options[0] = null
            }
            for (let i = 0; i < tmpAry.length; i++) {
                let op = new Option(tmpAry[i][0], tmpAry[i][1])
                selector.options[i] = op
            }

            // console.log(tmpAry)

            return
        }

        // run sort function
        sortSelectOptions(selectId)

        // build initial chaart from first value
        let firstPlayer = selectId.options[0].value
        // console.log(selectId.options[0].value)

        function firstBuild(firstPlayer) {

            let data = firstPlayer.split(',')

            // console.log(data[0], data[1])
            // console.log(typeof data)

            // Fetch new data each time a new player is selected
            console.log(`Plotting stats for player ${data[0]} on team ${data[1]}`)
            buildChart(data[0], data[1])
        }
        firstBuild(firstPlayer)
    })
}

// let selector = d3.select("#selectPlayer")
// let selector = document.getElementById('selectPlayer')


// use functions based on selected player
function optionChanged(newPlayer) {

    let data = newPlayer.split(',')

    console.log(data[0], data[1])
    console.log(typeof data)

    // Fetch new data each time a new player is selected
    console.log(`Plotting stats for player ${data[0]} on team ${data[1]}`)
    buildChart(data[0], data[1])
}

init()