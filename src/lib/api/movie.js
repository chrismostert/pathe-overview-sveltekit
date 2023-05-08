import { load } from 'cheerio';
import { fetch_page } from '$lib/utils.js';
import pRetry from 'p-retry';
import memoize from 'fast-memoize';

export default memoize(async (movie_id) => {
	let page = await pRetry(() => fetch_page(`https://www.pathe.nl/film/${movie_id}`));
	let cont = await page.text();
	let $ = load(cont);

	let title_visual = $('.visual-movie__title-name').text();
	let title = title_visual.replace(/ \(.*\)/, '').slice(0, -1);
	let year = $('.movie-intro__release')
		.text()
		.replace('Release: ', '')
		.match(/\d+-\d+-(\d+)/)[1];
	let description = $("span[itemprop = 'description'] p").text().replace(' Lees meer', '').trim();
	let poster = $('.visual-movie__poster img').attr('src');

	return {
		title_visual,
		title,
		year,
		description,
		poster
	};
});
