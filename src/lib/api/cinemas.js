import { load } from 'cheerio';
import { fetch_page } from '$lib/utils.js';
import pRetry from 'p-retry';
import memoize from 'fast-memoize';

export default memoize(async () => {
	let page = await pRetry(() => fetch_page('https://www.pathe.nl/bioscoopagenda'));
	let cont = await page.text();
	let $ = load(cont);

	let res = new Set();
	$('.js-cinema-filter-checkbox, .city.cinema.checkbox').each((_, elem) => {
		let cinema_name = elem.attribs['data-show-value'];
		res.add(
			JSON.stringify({
				cinema_name: cinema_name.includes('Pathé') ? cinema_name : `Pathé ${cinema_name}`,
				cinema_id: elem.attribs['value']
			})
		);
	});

	return [...res].map(JSON.parse);
});
