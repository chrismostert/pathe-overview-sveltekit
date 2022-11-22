import get_movie from '$lib/api/movie.js';
import get_movies from '$lib/api/movies.js';
import get_rating from '$lib/api/rating.js';
import get_times from '$lib/api/times.js';

export async function load({ params }) {
	console.log(`Fetching data for cinema with id ${params.cinema_id}...`);

	// Get master list of movies
	let movielist = await get_movies();

	// Get times for each movie
	let times = await Promise.all(
		movielist.movies.map((movie) => get_times(movie.id, params.cinema_id))
	);

	// Add times to the object and filter out movies without any playtimes
	movielist = movielist.movies.reduce((prev, cur, i) => {
		if (times[i].length > 0) {
			prev.push({
				id: cur.id,
				title: cur.title,
				times: times[i]
			});
		}
		return prev;
	}, []);

	// Get pathe info (including year)
	let info = await Promise.all(movielist.map((movie) => get_movie(movie.id)));

	// Get RT ratings
	let ratings = await Promise.all(movielist.map((movie) => get_rating(movie.id)));

	// Combine object
	movielist = movielist.map((movie, i) => {
		movie.pathe = info[i];
		movie.rt = ratings[i];
		return movie;
	});

	return {
		movies: movielist
	};
}
