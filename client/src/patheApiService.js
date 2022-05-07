export async function loadMovies(id) {
    // Fetch data
    const res = await fetch(`process.env.API_URL/movies?cinema=${id}`);
    let moviesJson = await res.json();

    // Is playing in selected cinema?
    moviesJson = moviesJson.filter((movie) => movie.dateTimes.length > 0);

    // Sort by critic score
    moviesJson.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        if (a.rtData && a.rtData.scores && a.rtData.scores.criticsScore) {
            scoreA = a.rtData.scores.criticsScore;
        }
        if (b.rtData && b.rtData.scores && b.rtData.scores.criticsScore) {
            scoreB = b.rtData.scores.criticsScore;
        }
        return scoreB - scoreA;
    });

    return moviesJson;
}

export async function loadCinemas() {
    const res = await fetch("process.env.API_URL/cinemas");
    return await res.json();
}