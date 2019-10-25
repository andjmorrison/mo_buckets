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
                  y: -65,
                  xref: 'x',
                  yref: 'y',
                  text: `FG: ${madeBaskets}/${shotMade.length}`,
                  showarrow: false,
                  ax: 0,
                  ay: -40
                },
                {
                    x: 200,
                    y: -80,
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
                zeroline: false,
            },
            yaxis: {
                range: [-100, 500],
                showgrid: false,
                type: 'linear',
                showline: false,
                showticklabels: false,
                zeroline: false,
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
    d3.json(`/playerdashboard/${playerId}`).then(response => {

        // name
        let headers = response['headers']

        rows = response['resultSets'][0]['rowSet'][0]

        // let playerGp = rows[2]
        // let playerWinPct = rows[5]
        let playerPts = rows[26]
        // let playerPlusMinus = rows[27]
        let playerFgM = rows[7]
        let playerFgA = rows[8]
        let playerFg3M = rows[10]
        let playerFg3A = rows[11]
        let playerAst = rows[19]
        let playerReb = rows[18]
        let playerOReb = rows[16]
        let playerDReb = rows[17]
        let playerStl = rows[21]
        let playerBlk = rows[22]
        let playerBlkA = rows[23]
        let playerTov = rows[20]
        let playerPf = rows[24]
      


        dataRadar = [{
            type: 'scatterpolar',
            r: [
                // playerGp,
                // playerWinPct,
                playerPts,
                // playerPlusMinus,
                playerFgM,
                playerFgA,
                playerFg3M,
                playerFg3A,                
                playerAst,
                playerReb,
                playerOReb,
                playerDReb,
                playerStl,
                playerBlk,
                playerBlkA,
                playerTov,
                playerPf,
            ],
            theta: [
                // 'Gp',
                // 'WinPct',
                'Pts',
                // 'PlusMinus',
                'FgM',
                'FgA',
                'Fg3M',
                'Fg3A',
                'Ast',
                'Reb',
                'OReb',
                'DReb',
                'Stl',
                'Blk',
                'BlkA',
                'Tov',
                'Pf',
            ],
            fill: 'toself',
            fillcolor: 'goldenrod',
            line:{
                color: 'teal'
            }
        }]
        console.log(dataRadar)


        layoutRadar = {
            title: {
                text:`Stats Per 36`,
                font: {
                  family: 'Helvetica Neue, monospace',
                  size: 16,
                  color: 'teal'
                },
            },
            width: 400,
            height: 400,
            paper_bgcolor: '#F4F4F3',
            plot_bgcolor: '#F4F4F3',
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 25]
                },
                paper_bgcolor: '#F4F4F3',
                // bgcolor: 'teal',
            },
            showlegend: false
        }

        Plotly.newPlot('radar', dataRadar, layoutRadar);

    })

    // parallel coordinates
    d3.json(`/playerdashboardextended/${playerId}`).then(response => {

        console.log('dashboard extended',response)

        let playerName = response[1]
        let rankGp = response[34]
        let rankWin = response[35]
        let rankPts = response[58]
        let rankPlusMinus = response[59]
        let rankFgM = response[39]
        let rankFgA = response[40]
        let rankFgPct = response[41]
        let rankFg3M = response[42]
        let rankFg3A = response[43]
        let rankFtM = response[45]
        let rankFtA = response[46]
        let rankAst = response[51]
        let rankReb = response[50]
        let rankOReb = response[48]
        let rankDReb = response[49]
        let rankStl = response[53]
        let rankBlk = response[54]
        let rankBlkA = response[55]
        let rankTov = response[52]
        let rankPf = response[56]

        let traceParaCoord = {
            type: 'parcoords',
            line: {
                showscale: true,
                reversescale: true,
                colorscale: 'Jet',
                cmin: -4000,
                cmax: -100,
                color: 'teal'
              },
            
            dimensions: [{
              range: [500,1],
              label: 'Wins',
              values: [rankWin],
              tickvals: [1,100,200,300,400,500],
              ticktext: ['Best', 'Great', 'Good', 'Okay', 'Passable', 'G-League']
            }, {    
              range: [500,1],
              label: 'GP',
              values: [rankGp],
              tickvals: []
            }, {
              range: [500,1],
              label: 'Pts',
              values: [rankPts],
              tickvals: [],
            }, {
              range: [500,1],
              label: '+/-',
              values: [rankPlusMinus],
              tickvals: []
            }, {
              range: [500,1],
              label: 'FgM',
              values: [rankFgM],
              tickvals: []
            }, {
              range: [500,1],
              label: 'FgA',
              values: [rankFgA],
              tickvals: []
            }, {
              range: [500,1],
              label: 'FgPct',
              values: [rankFgPct],
              tickvals: []
            }, {
              range: [500,1],
              label: 'Fg3M',
              values: [rankFg3M],
              tickvals: []
            }, {
              range: [500,1],
              label: 'Fg3A',
              values: [rankFg3A],
              tickvals: []
            }, {
              range: [500,1],
              label: 'Ftm',
              values: [rankFtM],
              tickvals: []
            }, {
              range: [500,1],
              label: 'FtA',
              values: [rankFtA],
              tickvals: []
            }, {
              range: [500,1],
              label: 'Ast',
              values: [rankAst],
              tickvals: []
            }, {
              range: [500,1],
              label: 'Reb',
              values: [rankReb],
              tickvals: []
            
            }, {
              range: [500,1],
              label: 'OReb',
              values: [rankOReb],
              tickvals: []
            
            }, {
              range: [500,1],
              label: 'DReb',
              values: [rankDReb],
              tickvals: []
            
            }, {
              range: [500,1],
              label: 'Stl',
              values: [rankStl],
              tickvals: []
            
            }, {
              range: [500,1],
              label: 'Blk',
              values: [rankBlk],
              tickvals: []
          
            }, {
              range: [500,1],
              label: 'BlkA',
              values: [rankBlkA],
              tickvals: []
            }, {
              range: [500,1],
              label: 'Tov',
              values: [rankTov],
              tickvals: []
            }, {
              range: [500,1],
              label: 'Pf',
              values: [rankPf],
              tickvals: [1,100,200,300,400,500]
            }]
        }

        let layoutParaCoords = {
            title: {
                text:`${playerName}'s Rank: Stats Per 36`,
                font: {
                  family: 'Helvetica Neue, monospace',
                  size: 16,
                  color: 'teal'
                },
            },
            paper_bgcolor: '#F4F4F3',
            plot_bgcolor: '#F4F4F3',
            width: 800
          }
          
        let dataParaCoord = [traceParaCoord]
          
        Plotly.newPlot('paracoord', dataParaCoord, layoutParaCoords)

        // construct table
        let playerTeam = response[3]
        let playerAge = response[4]
        let playerGP = response[5]
        let playerW = response[6]
        let playerL = response[7]
        let playerPts = response[29]
        let playerPlusMinus = response[30]
        let playerMin = Math.round(response[9])
        let playerFgM = response[10]
        let playerFgA = response[11]
        let playerFgPct = response[12]
        let playerFg3M = response[13]
        let playerFg3A = response[14]
        let playerFg3Pct = response[15]
        let playerFtM = response[16]
        let playerFtA = response[17]
        let playerFtPct = response[18]
        let playerReb = response[21]
        let playerOReb = response[19]
        let playerDReb = response[20]
        let playerAst = response[22]
        let playerTov = response[23]
        let playerStl = response[24]
        let playerBlk = response[25]
        let playerBlkA = response[26]
        let playerPf = response[27]

        let valuesTableAll = [
            playerTeam,
            playerAge,
            playerGP,
            playerW,
            playerL,
            playerPts,
            playerPlusMinus,
            playerMin,
            playerFgM,
            playerFgA,
            playerFgPct,
            playerFg3M,
            playerFg3A,
            playerFg3Pct,
            playerFtM,
            playerFtA,
            playerFtPct,
            playerReb,
            playerOReb,
            playerDReb,
            playerAst,
            playerTov,
            playerStl,
            playerBlk,
            playerBlkA,
            playerPf,
        ]

        let labelsTableAll = [
            'Team',
            'Age',
            'GP',
            'W',
            'L',
            'Pts',
            'PlusMinus',
            'Min',
            'FgM',
            'FgA',
            'FgPct',
            'Fg3M',
            'Fg3A',
            'Fg3Pct',
            'FtM',
            'FtA',
            'FtPct',
            'Reb',
            'OReb',
            'DReb',
            'Ast',
            'Tov',
            'Stl',
            'Blk',
            'BlkA',
            'Pf',
        ]
        

        let valuesTable = [
            labelsTableAll,
            valuesTableAll,
            ]
      
        let dataTable = [{
            type: 'table',
            header: {
            values: [["<b>Category</b>"], ["<b>Value</b>"]],
            align: ["left", "center"],
            line: {width: 1, color: '#4A494A'},
            fill: {color: '#4A494A'},
            font: {family: "Helvetica Neue", size: 12, color: "white"}
            },
            cells: {
            values: valuesTable,
            align: ["left", "center"],
            line: {color: "#4A494A", width: 1},
            fill: {color: ['white', 'white']},
            font: {family: "Helvetica Neue", size: 11, color: ["#4A494A"]}
            }
        }]

        let layoutTable = {
            title: {
                text:`Stats Per 36`,
                font: {
                  family: 'Helvetica Neue, monospace',
                  size: 16,
                  color: 'teal'
                },
            },
            paper_bgcolor: '#F4F4F3',
            plot_bgcolor: '#F4F4F3',
            width: 400
          }
        
        Plotly.plot('playertable', dataTable, layoutTable);

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