import { json, error } from '@sveltejs/kit';
import { load } from 'cheerio';

export async function GET() {
	try {
		let page = await fetch('https://www.pathe.nl/bioscoopagenda');
		let cont = await page.text();
		let $ = load(cont);

		let res = new Set();
		$('.filter__input-list li').each((_, elem) => {
			let cinema_elem = $(elem).find('.cinema.checkbox');
			res.add(
				JSON.stringify({
					cinema_name: cinema_elem.attr('data-show-value'),
					cinema_id: cinema_elem.attr('value')
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
