import { json, error } from '@sveltejs/kit';
import { load } from 'cheerio';

export async function GET({ params }) {
	console.log(`Fetching times for ${params.movie_id} at cinema ${params.cinema_id}...`)
	try {
		let page = await fetch(
			`https://www.pathe.nl/film/${params.movie_id}/agenda?cinemas=${params.cinema_id}`
		);
		let cont = await page.text();
		let $ = load(cont);

		const date_times = $('.schedule__section')
			.map((_, day) => {
				return {
					day: $(day).find('.schedule__day').text(),
					times: $(day)
						.find('.schedule-time__content')
						.map((_, time) => {
							return {
								start: $(time).find('.schedule-time__start').text(),
								end: $(time).find('.schedule-time__end').text(),
								label: $(time).find('.schedule-time__label').text().trim()
							};
						})
						.toArray()
				};
			})
			.toArray();

		return json(date_times, {
			headers: {
				'Cache-Control': 'max-age=1800, public'
			}
		});
	} catch (_) {
		throw error(
			500,
			`Unable to fetch times for movie ${params.movie_id} in cinema ${params.cinema_id}`
		);
	}
}
