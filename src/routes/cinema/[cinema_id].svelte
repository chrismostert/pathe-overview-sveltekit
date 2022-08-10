<script context="module">
	export const prerender = true;
</script>

<script>
	import MovieContainer from '$lib/components/MovieContainer.svelte';
	export let movies;
</script>

{#each movies as movie}
	<h1>{movie.title}</h1>
{/each}
<!--<MovieContainer {movies} />-->
