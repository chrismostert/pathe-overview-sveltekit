import { json, error } from '@sveltejs/kit';
import { load } from 'cheerio';

export async function GET({ params }) {
	try {
		let page = await fetch(`https://www.pathe.nl/film/${params.movie_id}`);
		let cont = await page.text();
		let $ = load(cont);

		let title_visual = $('.visual-movie__title-name').text();
		let title = title_visual.replace(/\ \(.*\)/, '').slice(0, -1);
		let year = $('.movie-intro__release')
			.text()
			.replace('Release: ', '')
			.match(/\d+-\d+-(\d+)/)[1];
		let description = $("span[itemprop = 'description'] p").text().replace(' Lees meer', '').trim();
		let poster = $('.visual-movie__poster img').attr('src');

		return json({
			title_visual,
			title,
			year,
			description,
			poster
		}, {
			headers: {
				'Cache-Control': 'max-age=1800, public'
			}
		});
	} catch (_) {
		throw error(500, `Unable to fetch movie info for pathe movie ${params.movie_id}`);
	}
}
