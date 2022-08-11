import pLimit from 'p-limit';
const limit = pLimit(5);

export async function GET({ params, url }) {
	// Get master list of movies
	let movielist = await fetch(`${url.origin}/api/movies`).then(
		async (response) => await response.json()
	);

	// Get times for each movie
	let times = await Promise.all(
		movielist.movies.map((movie) =>
			limit(() =>
				fetch(`${url.origin}/api/times/${movie.id}/${params.cinema_id}`).then((res) => res.json())
			)
		)
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
	let info = await Promise.all(
		movielist.map((movie) =>
			limit(() => fetch(`${url.origin}/api/movie/${movie.id}`).then((res) => res.json()))
		)
	);

	// Get RT ratings
	let ratings = await Promise.all(
		movielist.map((movie) =>
			limit(() => fetch(`${url.origin}/api/rating/${movie.id}`).then((res) => res.json()))
		)
	);

	movielist = movielist.map((movie, i) => {
		movie.pathe = info[i];
		movie.rt = ratings[i];
		return movie;
	});

	return {
		body: {
			movies: movielist
		}
	};
}
