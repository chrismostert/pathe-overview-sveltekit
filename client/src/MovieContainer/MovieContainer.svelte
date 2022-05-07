<script>
    import Spinner from "./Spinner.svelte";
    import MovieCard from "./MovieCard/MovieCard.svelte";
    import { fade } from "svelte/transition";
    import { cinema_id } from "../options";
    import { loadMovies } from "../patheApiService";
    let movies = [];

    // On change load new movies
    $: movies = loadMovies($cinema_id);
</script>

{#await movies}
    <Spinner />
{:then movies}
    {#each movies as movie}
        <div in:fade={{ duration: 100 }}>
            <MovieCard {movie} />
        </div>
    {/each}
{:catch error}
    <div>
        {error}
    </div>
{/await}
