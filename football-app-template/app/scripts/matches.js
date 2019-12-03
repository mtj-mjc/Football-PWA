/**
 * Get's all Matches of a Competition
 *
 * @param {string} id Competition ID.
 */
async function fetchMatches(id) {
    try {
        // Get all Matches of the Competition
        const result = await fetch(`/competitions/${id}/matches`).then(response => response.json());
        const matches = result.matches;
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

// Get Parameter Competition ID from URL
var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
fetchMatches(id);