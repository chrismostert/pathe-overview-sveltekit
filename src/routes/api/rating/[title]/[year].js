import levenshtein from 'fast-levenshtein';

const RT_ENV_PARAM = 'VITE_RT_LINK';

export async function GET({ params, url }) {
	if (import.meta.env[RT_ENV_PARAM] === undefined) {
		return {
			status: 500,
			body: {
				error: `${RT_ENV_PARAM} has not been set as an environment variable. Rotten Tomatoes score lookup will not work without this link being set.`
			}
		};
	}

	let getScore = (hit) => {
		return (
			levenshtein.get(hit.title, params.title) +
			0.1 * Math.abs(parseInt(hit.releaseYear) - parseInt(params.year))
		);
	};

	let content = {
		requests: [
			{
				indexName: 'content_rt',
				query: params.title,
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

	let res = undefined;
	if (levenshtein.get(best.title, params.title) < 5) {
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

	return {
		headers: {
			'Cache-Control': 's-maxage=1800'
		},
		body: res
	};
}
