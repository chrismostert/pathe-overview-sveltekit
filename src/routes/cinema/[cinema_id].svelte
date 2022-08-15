<script context="module">
	export const prerender = true;
</script>

<script>
	import MovieContainer from '$lib/components/MovieContainer.svelte';
	export let movies;
</script>

<MovieContainer {movies} />
