import { json, error } from '@sveltejs/kit';
import levenshtein from 'fast-levenshtein';

const RT_ENV_PARAM = 'VITE_RT_LINK';

export async function GET({ params, url }) {
	if (import.meta.env[RT_ENV_PARAM] === undefined) {
		throw new error(500, `${RT_ENV_PARAM} has not been set as an environment variable. Rotten Tomatoes score lookup will not work without this link being set.`)
	}

	try {
		let info = await fetch(`${url.origin}/api/movie/${params.movie_id}`).then(
			async (response) => await response.json()
		);

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
					params: 'filters=rtId%20%3E%200%20AND%20isEmsSearchable%20%3D%201&hitsPerPage=5'
				}
			]
		};

		let req = await fetch(import.meta.env[RT_ENV_PARAM], {
			method: 'POST',
			body: JSON.stringify(content)
		});
		let result = await req.json();
		let hits = result.results[0].hits;

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

		return json(res, {
			headers: {
				'Cache-Control': 'max-age=1800, public'
			}
		});
	} catch (_) {
		throw error(500, `Unable to fetch RT ratings for ${params.movie_id}`)
	}
}
