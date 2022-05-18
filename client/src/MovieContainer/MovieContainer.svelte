<script>
    import Spinner from "./Spinner.svelte";
    import MovieCard from "./MovieCard/MovieCard.svelte";
    import { fade, scale, fly } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { cinema_id, hidden_movies } from "../options";
    import { loadMovies } from "../patheApiService";

    let loading = true;
    let movies = [];
    let renderedMovies = [];

    // On change load new movies
    $: {
        loading = true;
        loadMovies($cinema_id).then((res) => {
            loading = false;
            movies = res;
        });
    }

    // Apply filters
    $: renderedMovies = movies.filter(
        (movie) => !$hidden_movies.includes(movie.patheID)
    );
    
</script>

{#if loading}
    <Spinner />
{:else}
    {#each renderedMovies as movie (movie.patheID)}
        <div
            in:fade={{ duration: 100 }}
            animate:flip={{ duration: 100 }}
        >
            <MovieCard {movie} />
        </div>
    {/each}
{/if}
