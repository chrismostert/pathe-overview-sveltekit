import { json, error } from '@sveltejs/kit';
import { load } from 'cheerio';

export async function GET() {
	console.log(`Fetching cinema list...`);
	try {
		let page = await fetch('https://www.pathe.nl/bioscoopagenda');
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

		return json(
			{
				cinemas: [...res].map(JSON.parse)
			},
			{
				headers: {
					'Cache-Control': 'max-age=1800, public'
				}
			}
		);
	} catch (_) {
		throw error(500, 'Unable to fetch cinemas.');
	}
}
