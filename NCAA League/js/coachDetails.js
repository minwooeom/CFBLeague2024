// Function to extract query parameters from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to fetch coach details and populate the page
function fetchCoachDetails(coachId) {
    fetch('../json/coaches.json') // Adjust the path to your JSON file
        .then(response => response.json())
        .then(data => {
            if (data[coachId]) {
                console.log('Fetched Coach Data:', data[coachId]); // Log specific coach data

                populateCoachDetails(data[coachId]);
            } else {
                console.error('Coach not found');
                // Handle the case where the coach is not found
            }
        })
        .catch(error => console.error('Error fetching coach data:', error));
}

// Function to populate coach details on the page
function populateCoachDetails(coach) {
    document.getElementById('coachName').textContent = coach.name;
    document.getElementById('profilePic').src = coach.profilePic;
    document.getElementById('backgroundImg').src = coach.backgroundPic;
    document.getElementById('winLossRecord').textContent = coach.winLossRecord + ' Overall Record';
    document.getElementById('nationalChampionships').textContent = coach.nationalChampionships + ' National Championships';
    document.getElementById('coachOfTheYearAwards').textContent = coach.coachOfTheYearAwards + ' COTY';
    document.getElementById('heismanWinnersCoached').textContent = coach.heismanWinnersCoached + ' Heisman Winners Coached';
}

// Load coach details from query parameter when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    const coachId = getQueryParam('coachId');
    if (coachId) {
        fetchCoachDetails(coachId);
    } else {
        console.error('No coachId specified in URL');
        // Handle the case where no coachId is specified
    }
});
