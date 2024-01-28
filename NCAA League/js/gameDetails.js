function loadGameDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');

    fetch('../json/gamesData.json')
        .then(response => response.json())
        .then(allGamesData => {
            const gameData = allGamesData[gameId];
            document.getElementById('gameScore').textContent = gameData.score;
            document.getElementById('newsTitle').textContent = gameData.newsTitle;
            document.getElementById('newsImg').src = gameData.newsImg;
            document.getElementById('newsCaption').textContent = gameData.newsCaption;
            const articleText = gameData.articleText.split('\n').map(para => `<p>${para}</p>`).join('');
            document.getElementById('articleText').innerHTML = articleText;


            // Extract stats for each team
            const team1Stats = gameData.stats.team1;
            const team2Stats = gameData.stats.team2;

            // Create a horizontal table for QB stats
            const statsTable = `
                <table>
                    <tr>
                        <th>Stat</th>
                        <th>${team1Stats.QBName} (${team1Stats.team})</th>
                        <th>${team2Stats.QBName} (${team2Stats.team})</th>
                    </tr>
                    <tr><td>Completions</td><td>${team1Stats.comp}</td><td>${team2Stats.comp}</td></tr>
                    <tr><td>Attempts</td><td>${team1Stats.att}</td><td>${team2Stats.att}</td></tr>
                    <tr><td>Yards</td><td>${team1Stats.yds}</td><td>${team2Stats.yds}</td></tr>
                    <tr><td>Touchdowns</td><td>${team1Stats.td}</td><td>${team2Stats.td}</td></tr>
                    <tr><td>Interceptions</td><td>${team1Stats.int}</td><td>${team2Stats.int}</td></tr>
                </table>`;

            // Display the stats table
            document.getElementById('teamStats').innerHTML = statsTable;
        })
        .catch(error => console.error('Error loading game data:', error));

}

document.addEventListener('DOMContentLoaded', loadGameDetails);
