import { load } from 'cheerio';

export async function GET({ params }) {
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

	return {
		headers: {
			'Cache-Control': 'max-age=1800, public'
		},
		body: date_times
	};
}
