/**
 * Get's all Matches of a Competition via Network
 *
 * @param {string} id Competition ID.
 */
async function getMatchesFromNetwork(id) {
    // Get Matches of a Competition
    return await fetch(`/competitions/${id}/matches`)
        .then(response => response.json())
        .catch((e) => {
            console.info('Could not fetch matches from Network', e);
            return null;
        });
}

/**
 * Create Title with Competition Information
 * 
 * @param {Object} competition Competition Information
 */
function renderCompetition(competition) {
    if (competition != null) {
        let content =
            `
                <h3 class="ml-3 text-truncate">
                    <img src="../images/${competition.code}.svg" alt="${competition.name}" width="75px" class="mr-2"/>
                    ${competition.name}
                </h1>
            `;
        document.getElementById('competition').innerHTML = content;
    }
}

/**
 * Create a list entry for every Match
 * 
 * @param {Object} data Matches of a Competition
 */
function renderMatches(data) {
    try {
        // Render Titile with Competition Information
        renderCompetition(data.competition);

        const matches = data.matches;
        // Is needed so we can differantiate between Group Stage and other Stages e.g Round of 16, Semi-final, etc.
        const groupStage = 'GROUP_STAGE';
        let content = '<ul class="list-group col-10" >';
        let matchDay = 0;
        let matchGroup = 'Regular Season';

        matches.forEach(match => {
            if (match.group && match.homeTeam && match.awayTeam && match.score) {
                // Set Matchday Title, if it's a new Matchday
                if (match.matchday > matchDay) {
                    matchDay = match.matchday;
                    content += `<li class="list-group-item list-group-item-secondary">Match Day ${matchDay}</li>`;
                }
                // Set Stage Titles
                if (match.group != null && matchGroup != match.group) {
                    matchGroup = match.group;
                    // If GroupStage than set other design
                    if (match.stage == groupStage) {
                        content += `<li class="list-group-item list-group-item-light text-center">${match.group}</li>`;
                    } else {
                        content += `<li class="list-group-item list-group-item-secondary">${match.group}</li>`;
                    }
                }

                // Create List Entry for the Match
                let piece = `
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-5 text-right">${match.homeTeam.name}</div>
                            <div class="col-2 text-nowrap text-center">
                                <span class="badge badge-secondary">${match.score.fullTime.homeTeam == null ? "-" : match.score.fullTime.homeTeam}</span>
                                    :
                                <span class="badge badge-secondary">${match.score.fullTime.awayTeam == null ? "-" : match.score.fullTime.awayTeam}</span>
                            </div>
                            <div class="col-5">${match.awayTeam.name}</div>
                        </div>
                    </li>
                `;
                content += piece;
            }
        });
        content += '</ul>';
        document.getElementById('matches').innerHTML = content;
    } catch (e) {
        console.error('could not fetch matches', e);
    }
}

/**
 * Updates Data on the UI
 */
async function updateData() {
    // Get Parameter Competition ID from URL
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    // Get data from Network
    var resultFromNetwork = getMatchesFromNetwork(id)
        .then((matches) => {
            if (matches != null) {
                renderMatches(matches);
                return true;
            }
            else {
                return false;
            }
        });
}


updateData();