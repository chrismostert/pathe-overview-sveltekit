import { json, error } from '@sveltejs/kit';
import { load } from 'cheerio';

export async function GET() {
	try {
		let page = await fetch('https://www.pathe.nl/bioscoopagenda');
		let cont = await page.text();
		let $ = load(cont);

		let res = new Set();
		$('.js-cinema-filter-checkbox, .city.cinema.checkbox').each((_, elem) => {
			res.add(
				JSON.stringify({
					cinema_name: elem.attribs['data-show-value'],
					cinema_id: elem.attribs['value']
				})
			);
		});

		return json({
			cinemas: [...res].map(JSON.parse)
		}, {
			headers: {
				'Cache-Control': 'max-age=1800, public'
			}
		});
	} catch (_) {
		throw error(500, "Unable to fetch cinemas.")
	}
}
