export const prerender = true;
export async function load({ fetch }) {
	let response = await fetch(`/api/cinemas`);

	if (response.ok) {
		return {
			cinemas: (await response.json()).cinemas
		};
	}

	return {
		cinemas: []
	};
}
