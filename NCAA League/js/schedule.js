function openWeek(evt, weekName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-tab", "");
    }
    document.getElementById(weekName).style.display = "block";
    evt.currentTarget.className += " active-tab";
}


// Function to load and display the schedule
function loadSchedule() {
    fetch('../json/schedule.json')
        .then(response => response.json())
        .then(data => {
            for (let week in data) {
                let weekData = data[week];
                let scheduleHtml = '<ul class="schedule-list">';
                for (let game of weekData) {
                    const scoreParts = game.score.split('-');
                    let homeTeamClass = '', awayTeamClass = '';

                    if (game.isCompleted) {
                        homeTeamClass = parseInt(scoreParts[0]) > parseInt(scoreParts[1]) ? 'winner' : 'loser';
                        awayTeamClass = parseInt(scoreParts[0]) < parseInt(scoreParts[1]) ? 'winner' : 'loser';
                    }

                    let spreadText = game.spread ? `, Spread: ${game.spread}` : '';

                    let gameLink = `gameDetails.html?game=${game.id}`;

                    scheduleHtml += `
                        <li>
                            <a href="${gameLink}">
                                <span class="${homeTeamClass}">${game.homeTeam}</span> vs 
                                <span class="${awayTeamClass}">${game.awayTeam}</span>${spreadText}, 
                                Score: ${game.score ? game.score : 'TBD'}
                            </a>
                        </li>`;

                }
                scheduleHtml += '</ul>';
                document.getElementById(week).innerHTML = scheduleHtml;
            }
            document.querySelector('.tab-link').click();

        })
        .catch(error => console.error('Error loading schedule:', error));
}

// Call the function to load the schedule when the page loads
document.addEventListener('DOMContentLoaded', loadSchedule);
