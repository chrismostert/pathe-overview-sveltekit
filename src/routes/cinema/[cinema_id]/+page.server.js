import pLimit from 'p-limit';
import pRetry from 'p-retry';
const limit = pLimit(2);

const fetch_with_retry = async (fetch_fn, url) => {
	let response = await fetch_fn(url);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response.json();
};

export async function load({ fetch, params }) {
	console.log(`Begin fetching ${params.cinema_id}...`);

	// Get master list of movies
	let movielist = await pRetry(() => fetch_with_retry(fetch, '/api/movies'));

	// Get times for each movie
	let times = await Promise.all(
		movielist.movies.map((movie) =>
			limit(() =>
				pRetry(() => fetch_with_retry(fetch, `/api/times/${movie.id}/${params.cinema_id}`))
			)
		)
	);

	console.log(`Got all times for ${params.cinema_id}...`);

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
			limit(() => pRetry(() => fetch_with_retry(fetch, `/api/movie/${movie.id}`)))
		)
	);

	// Get RT ratings
	let ratings = await Promise.all(
		movielist.map((movie) =>
			limit(() => pRetry(() => fetch_with_retry(fetch, `/api/rating/${movie.id}`)))
		)
	);

	// Combine object
	movielist = movielist.map((movie, i) => {
		movie.pathe = info[i];
		movie.rt = ratings[i];
		return movie;
	});

	console.log(`Done fetching ${params.cinema_id}...`);

	return {
		movies: movielist
	};
}
