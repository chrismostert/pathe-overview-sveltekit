export async function load({ url }) {
	let response = await fetch(`${url.origin}/api/cinemas`);

	if (response.ok) {
		return {
			cinemas: (await response.json()).cinemas
		};
	}

	return {
		cinemas: []
	};
}
