function buildChart (playerId, playerTeamId) {
    d3.json(`/shotchart/${playerId}/${playerTeamId}`).then( individual =>{

        console.log(individual)

        let shotCoordX = []
        let shotCoordY = []
        let shotText = []
        let shotDistance = []
        let shotDate = []

        individual.forEach ( row => {

            let x = row[17]
            let y = row[18]
            let text = row[11]
            let distance = row[16]
            let date = row[21]

            shotCoordX.push(x)
            shotCoordY.push(y)
            shotText.push(text)
            shotDistance.push(distance)
            shotDate.push(date)

        })

        console.log(shotCoordX)
        console.log(shotCoordY)

        var trace = {
            x: shotCoordX,
            y: shotCoordY,
            mode: 'markers',
            type: 'scatter',
            text: shotText,
            marker: {
                color: shotDistance,
                }
        };

        var data = [trace];

        var layout = {
            autosize: false,
            width: 625,
            height: 800,
            xaxis: {
                range: [-260, 260],
                type: 'linear'
              },
              yaxis: {
                range: [-50, 850],
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
            plot_bgcolor: 'white'
        };

        console.log(trace)

        Plotly.newPlot('shotchart', data, layout);

    })
}


function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selectPlayer")

    // Use the list of sample names to populate the select options
    d3.json("/players").then( players => {

        console.log(players)

        let testing = Object.entries(players)

        testing.forEach( (player) => {

            // console.log(player[1].name, player[1].team_id)

            let playerName = player[1].name
            let playerId = player[1].id
            let playerTeamId = player[1].team_id

            // let playerString = playerId, playerTeamId
            let playerArray = [playerId, playerTeamId]
            let playerObject = {
                'id' : playerId,
                'team' : playerTeamId
            }

            // console.log(playerArray)
            // console.log(typeof playerArray)

            console.log(playerObject)
            console.log(typeof playerObject)

            selector
            .append('option')
            .text(playerName)
            .attr('value', [playerObject.id, playerObject.team])
            // .property("value", playerObject)
        })
    })
}


//     // first player for initial chaart
//     const firstPlayer = playerNames[0];
//     buildCharts(firstPlayer);
//     })

// use functions based on selected player
function optionChanged(newPlayer) {

    let data = newPlayer.split(',')

    console.log(data[0], data[1])
    console.log(typeof data)

    // console.log(JSON.stringify(newPlayer))


  // Fetch new data each time a new player is selected
    console.log(`Plotting stats for player ${data[0]} on team ${data[1]}`)
    buildChart(data[0],data[1])
}

init()
