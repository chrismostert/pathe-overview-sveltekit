import { load } from 'cheerio';
import { fetch_page } from '$lib/utils.js';
import pRetry from 'p-retry';
import memoize from 'fast-memoize';

export default memoize(async () => {
	let pagenum = 1;
	let movies = [];

	while (true) {
		const page = await pRetry(() =>
			fetch_page(`https://www.pathe.nl/films/actueel?page=${pagenum}`)
		);
		const cont = await page.text();
		const $ = load(cont);

		let posters = $('.poster');
		if (posters.length == 0) break;

		posters.each((_, elem) => {
			movies.push({
				title: elem.attribs.title,
				id: elem.attribs['data-gtmclick']
			});
		});

		pagenum += 1;
	}

	return { movies };
});
