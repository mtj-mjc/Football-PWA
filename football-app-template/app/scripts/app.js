/**
 * Get's available Competitions.
 */
async function fetchCompetitions() {
    try {
        // Get Competitions
        const competitions = await fetch('/competitions').then(response => response.json());
        let content = '';

        competitions.forEach(competition => {
            // Check if needed Values exist
            if (competition.name && competition.area.name && competition.code && competition.id) {
                // Create Card for Competition
                let piece = `
                    <div class="card col-10 col-md-3 mx-2 mb-3" style="height: 25rem;">
                        <img src="../images/${competition.code}.svg" alt="${competition.name}" class="card-img-top" height="60%"/>
                        <div class="card-body">
                            <h5>${competition.name}</h5>
                            <p class="card-text">${competition.area.name}</p>
                            <div class="text-right">
                                <a href="./pages/matches.html?id=${competition.id}" class="btn btn-primary text-right">See Match Results</a>
                            </div>
                        </div>
                    </div>
                `;
                content += piece;
            }
        });
        document.getElementById('competitions').innerHTML = content;
    } catch (e) {
        console.error('could not fetch competitions', e);
    }
}

fetchCompetitions();