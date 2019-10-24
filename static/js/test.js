var urlPhoto = ''

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

        madeBaskets = (
            shotMade.reduce((a, b) => a + b, 0)
          )

        urlPhoto = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${playerTeamId}/2019/260x190/${playerId}.png`
        // urlPhoto = 'https://scoutfly.cbsistatic.com/bundles/scoutcss/images/default/default-headshot.png'

        // function getUrlPhoto(urlPhoto) {
        //     fetch(urlPhoto).then(response => {

        //         console.log(response.status)
        //         if (response.status === 403) {
        //             urlPhoto = `https://scoutfly.cbsistatic.com/bundles/scoutcss/images/default/default-headshot.png`
        //             console.log(urlPhoto)
        //             return urlPhoto

        //         }
        //         // if (response.status === 200) {
        //         //     urlPhoto = 'https://img.icons8.com/pastel-glyph/2x/worldwide-location.png'
        //         //     console.log(urlPhoto)
        //         //     return urlPhoto

        //         // }
        //         // else {
        //         //     urlPhoto2 = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${playerTeamId}/2019/260x190/${playerId}.png`
        //         //     return urlPhoto2
        //         // }
        //     })
        //     return urlPhoto
        // }

        let trace = {
            x: shotCoordX,
            y: shotCoordY,
            mode: 'markers',
            type: 'scatter',
            text: shotText,
            marker: {
                color: shotMade,
                colorscale: [
                    ['0', 'goldenrod'],
                    ['1.0', 'teal']
                  ],
            },
            colorscale: [
                ['0', 'goldenrod'],
                ['1.0', 'teal']
              ],
            name: 'Shots Taken'
        }

        console.log(trace)

        let data = [trace]

        let layout = {
            title: {
                text:`Shot Chart:<br> ${playerName}, ${playerTeam}`,
                font: {
                  family: 'Helvetica Neue, monospace',
                  size: 24,
                  color: 'white'
                },
                showlegend: true,
            },
            annotations: [
                {
                  x: 200,
                  y: 355,
                  xref: 'x',
                  yref: 'y',
                  text: `FG: ${madeBaskets}/${shotMade.length}`,
                  showarrow: false,
                  ax: 0,
                  ay: -40
                },
                {
                    x: 200,
                    y: 340,
                    xref: 'x',
                    yref: 'y',
                    text: `FG%: ${(madeBaskets/(shotMade.length)).toFixed(2)}`,
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
                type: 'linear',
                showline: false,
                showticklabels: false,
            },
            yaxis: {
                range: [-100, 500],
                showgrid: false,
                type: 'linear',
                showline: false,
                showticklabels: false,
            },
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            paper_bgcolor: '#7F9DA4',
            plot_bgcolor: '#F4F4F3',
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

        Plotly.newPlot('shotchart', data, layout);

    })

    // radar plot
    d3.json(`/playerdashboard/${playerId}`).then(individual => {

        // name
        let headers = individual['headers']

        rows = individual['rowSet'][0]

        let playerGP = rows[2]

        let playerPTS = rows[26]/playerGP
        let playerREB = rows[18]/playerGP
        let playerAST = rows[19]/playerGP
        let playerSTL = rows[21]/playerGP
        let playerBLK = rows[22]/playerGP


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
                    range: [0, 20]
                }
            },
            showlegend: false
        }

        Plotly.newPlot('radar', dataRadar, layoutRadar);

    })

    // parallel coordinates
    d3.json(`/playerdashboardextended/${playerId}`).then(individual => {

        console.log('dashboard extended',individual)

        let w_rank = individual[37]
        let fg_pct_rank = individual[43]
        let fg3m_rank = individual[44]
        let min_rank = individual[40]

        console.log(w_rank)

        let traceParaCoord = {
            type: 'parcoords',
            line: {
                showscale: true,
                reversescale: true,
                colorscale: 'Jet',
                cmin: -4000,
                cmax: -100,
                color: 'blue'
              },
            
            dimensions: [{
              range: [500,1],
              label: 'Win Pct',
              values: [w_rank],
              tickvals: [1,100,200,300,400,500]
            }, {    
              range: [500,1],
              label: 'FG Pct',
              values: [fg_pct_rank],
              tickvals: [1,100,200,300,400,500]
            }, {
              range: [500,1],
              label: '3pt Pct',
              values: [fg3m_rank],
              tickvals: [1,100,200,300,400,500],
            }, {
              range: [500,1],
              label: 'Min',
              values: [min_rank],
              tickvals: [1,100,200,300,400,500]
            }]
        }

        let layoutParaCoords = {
            width: 800
          }
          
        let dataParaCoord = [traceParaCoord]
          
        Plotly.newPlot('paracoord', dataParaCoord, layoutParaCoords)

    })

}

// initialization of list/selector/chart
function init() {

    // Grab a reference to the dropdown select element
    let selector = d3.select("#selectPlayer")

    // Use the list of sample names to populate the select options
    d3.json("/players").then(players => {

        let testing = Object.entries(players)

        testing.forEach((player) => {

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
        })

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
            // buildLine(data[0])
        }
        firstBuild(firstPlayer)
    })
}

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