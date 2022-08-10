<script context="module">
	export async function load({params, fetch, url}) {
		const resp = await fetch(`${url.origin}/api/cinema/${params.cinema_id}`);
		const resp_obj = await resp.json();

		return {
			props: {
				movies: resp_obj.movies,
				times: resp_obj.times
			},
			cache: {
				"maxage": 3600,
				"private": false
			}
		}
	}
</script>

<script>
	import MovieContainer from '$lib/components/MovieContainer.svelte';
	export let movies, times;
</script>

<MovieContainer {movies} />
