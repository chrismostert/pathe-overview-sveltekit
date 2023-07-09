import { fetch_page } from '$lib/utils.js';
import pRetry from 'p-retry';
import memoize from 'fast-memoize';
import levenshtein from 'fast-levenshtein';
import get_movie from '$lib/api/movie.js';

const RT_ENV_PARAM = 'VITE_RT_LINK';

export default memoize(async (movie_id) => {
	if (import.meta.env[RT_ENV_PARAM] === undefined) {
		throw new Error(
			500,
			`${RT_ENV_PARAM} has not been set as an environment variable. Rotten Tomatoes score lookup will not work without this link being set.`
		);
	}

	let info = await get_movie(movie_id);

	let title_q = info.title;
	let year_q = info.year;

	let getScore = (hit) => {
		return (
			levenshtein.get(hit.title, title_q) +
			0.1 * Math.abs(parseInt(hit.releaseYear) - parseInt(year_q))
		);
	};

	let content = {
		requests: [
			{
				indexName: 'content_rt',
				query: title_q,
				params: 'filters=isEmsSearchable%20%3D%201&hitsPerPage=5'
			}
		]
	};

	let result = await pRetry(() =>
		fetch_page(import.meta.env[RT_ENV_PARAM], {
			method: 'POST',
			body: JSON.stringify(content)
		}).then((res) => res.json())
	);
	let hits = result.results[0].hits;

	// No hits, can not return any rating
	if (hits.length == 0) {
		return {};
	}

	let bestScore = Infinity;
	let best = null;

	for (const hit of hits) {
		const score = getScore(hit);
		if (score < bestScore) {
			bestScore = score;
			best = hit;
		}
	}

	let res = {};
	if (levenshtein.get(best.title, title_q) < 5) {
		res = {
			id: best.rtId,
			title: best.title,
			vanity: best.vanity,
			description: best.description,
			releaseYear: best.releaseYear,
			genres: best.genres,
			runTime: best.runTime,
			scores: best.rottenTomatoes
		};
	}

	return res;
});
