export async function fetch_page(url, params = {}) {
	try {
		let response = await fetch(url, params);

		if (!response.ok) {
			throw new Error('Unable to fetch');
		}

		return response;
	} catch {
		throw new Error('Unable to fetch');
	}
}
