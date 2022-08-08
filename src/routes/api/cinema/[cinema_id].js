import pLimit from 'p-limit';
const limit = pLimit(20);

export async function GET({ params, url }) {
	let movielist = await fetch(`${url.origin}/api/movie`).then(
		async (response) => await response.json()
	)

	let movies = await Promise.all(
		movielist.movies.map((movie) =>
			limit(() => fetch(`${url.origin}/api/movie/${movie.id}`).then((res) => res.json()))
		)
	)


	return {
		body: movies
	};
}
