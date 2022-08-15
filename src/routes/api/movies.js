import { load } from 'cheerio';

export async function GET() {
	try {
		console.log('Fetching movies');
		let pagenum = 1;
		let movies = [];

		while (true) {
			const page = await fetch(`https://www.pathe.nl/films/actueel?page=${pagenum}`);
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

		return {
			headers: {
				'Cache-Control': 'max-age=1800, public'
			},
			body: {
				movies
			}
		};
	} catch (_) {
		return {
			status: 500,
			movies: []
		};
	}
}
