<script>
	import MovieContainer from '$lib/components/MovieContainer.svelte';
	export let data;
</script>

<MovieContainer movies={data.movies} />
