import pLimit from 'p-limit';
const limit = pLimit(2);

export const fetch_page = async (url, params = {}) =>
	limit(async () => {
		try {
			let response = await fetch(url, params);

			if (!response.ok) {
				throw new Error('Unable to fetch');
			}

			return response;
		} catch {
			throw new Error('Unable to fetch');
		}
	});
