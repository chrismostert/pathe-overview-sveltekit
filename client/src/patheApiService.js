export async function loadMovies(id) {
    // Fetch data
    const res = await fetch(`process.env.API_URL/movies?cinema=${id}`);
    let moviesJson = await res.json();

    // Is playing in selected cinema?
    return moviesJson.filter((movie) => movie.dateTimes.length > 0);
}

// TODO refactor this to be more sane
export function sortMovies(movies, byCritics) {
    return movies.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        if (byCritics) {
            if (a.rtData && a.rtData.scores && a.rtData.scores.criticsScore) {
                scoreA = a.rtData.scores.criticsScore;
            }
            if (b.rtData && b.rtData.scores && b.rtData.scores.criticsScore) {
                scoreB = b.rtData.scores.criticsScore;
            }
        } else {
            if (a.rtData && a.rtData.scores && a.rtData.scores.audienceScore) {
                scoreA = a.rtData.scores.audienceScore;
            }
            if (b.rtData && b.rtData.scores && b.rtData.scores.audienceScore) {
                scoreB = b.rtData.scores.audienceScore;
            }
        }
        return scoreB - scoreA;
    });
}

export async function loadCinemas() {
    const res = await fetch("process.env.API_URL/cinemas");
    return await res.json();
}