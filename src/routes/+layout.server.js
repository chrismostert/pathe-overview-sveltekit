import get_cinemas from '$lib/api/cinemas.js';

export const prerender = true;
export async function load() {
	return {
		cinemas: await get_cinemas()
	};
}
