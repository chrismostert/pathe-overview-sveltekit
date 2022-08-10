import { load } from 'cheerio';

export async function GET({ params }) {
	try {
		let page = await fetch(`https://www.pathe.nl/film/${params.movie_id}`);
		let cont = await page.text();
		let $ = load(cont);

		let title_visual = $('.visual-movie__title-name').text();
		let title = title_visual.replace(/\ \(.*\)/, '').slice(0, -1);
		let id = params.movie_id;
		let year = $('.movie-intro__release')
			.text()
			.replace('Release: ', '')
			.match(/\d+-\d+-(\d+)/)[1];
		let description = $("span[itemprop = 'description'] p").text().replace(' Lees meer', '').trim();
		let poster = $('.visual-movie__poster img').attr('src');

		return {
			headers: {
				'Cache-Control': 's-maxage=1800'
			},
			body: {
				title_visual,
				title,
				id,
				year,
				description,
				poster
			}
		};
	} catch (e) {
		return {
			status: 500,
			body: e
		};
	}
}
