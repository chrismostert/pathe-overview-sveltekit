export async function GET({ url, params }) {
	const pathe = await fetch(`${url.origin}/api/movie/${params.movie_id}/info`).then(
		async (resp) => await resp.json()
	);

	const rt = await fetch(
		`${url.origin}/api/rating?${new URLSearchParams({
			title: pathe.title,
			year: pathe.year
		})}`
	).then(async (resp) => await resp.json());

	return {
		body: {
			pathe,
			rt
		}
	};
}
