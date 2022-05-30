<script>
    import Spinner from "./Spinner.svelte";
    import MovieCard from "./MovieCard/MovieCard.svelte";
    import { fade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { cinema_id, hidden_movies, sorted_critics } from "../store";
    import { loadMovies, sortMovies } from "../patheApiService";

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
    $: renderedMovies = sortMovies(
        movies.filter((movie) => !$hidden_movies.hasOwnProperty(movie.patheID)),
        $sorted_critics
    );
</script>

{#if loading}
    <Spinner />
{:else}
    {#each renderedMovies as movie (movie.patheID)}
        <div in:fade={{ duration: 200 }} animate:flip={{ duration: 500 }}>
            <MovieCard {movie} />
        </div>
    {/each}
{/if}
