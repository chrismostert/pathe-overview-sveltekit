import { load } from 'cheerio';
import { fetch_page } from '$lib/utils.js';
import pRetry from 'p-retry';
import memoize from 'fast-memoize';

export default memoize(async (movie_id, cinema_id) => {
	let page = await pRetry(() =>
		fetch_page(`https://www.pathe.nl/film/${movie_id}/agenda?cinemas=${cinema_id}`)
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

	return date_times;
});
