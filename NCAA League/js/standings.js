function loadStandings() {
    fetch('../json/standings.json')
        .then(response => response.json())
        .then(data => {
            // Sort the data first by wins, then by point differential
            data.sort((a, b) => {
                if (b.wins !== a.wins) {
                    return b.wins - a.wins; // Descending order of wins
                }
                return b.pointDiff - a.pointDiff; // Descending order of point differential
            });

            const tableBody = document.querySelector('.standings tbody');
            let standingsHtml = '';
            for (let i = 0; i < data.length; i++) {
                let standing = data[i];
                let rowClass = '';

                if (i < 3) {
                    rowClass = 'green'; // Top 3 teams
                } else if (i >= 3 && i < 5) {
                    rowClass = 'yellow'; // Next 2 teams
                } else {
                    rowClass = 'red'; // Last 3 teams
                }

                standingsHtml += `
                    <tr class="${rowClass}">
                        <td>${standing.team}</td>
                        <td>${standing.wins}</td>
                        <td>${standing.losses}</td>
                        <td>${standing.ties}</td>
                        <td>${standing.pointDiff}</td>
                    </tr>
                `;
            }
            tableBody.innerHTML = standingsHtml;
        })
        .catch(error => console.error('Error loading standings:', error));
    fetch('../json/coachesPoll.json')
        .then(response => response.json())
        .then(data => {

            data.sort((a, b) => b.pollScore - a.pollScore);

            const pollBody = document.querySelector('.coaches-poll tbody');
            let pollHtml = '';
            data.forEach((team, index) => {
                pollHtml += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${team.name}</td>
                        <td>${team.pollScore}</td>
                    </tr>
                `;
            });
            pollBody.innerHTML = pollHtml;
        })
        .catch(error => console.error('Error loading coaches poll:', error));
}

document.addEventListener('DOMContentLoaded', loadStandings);
