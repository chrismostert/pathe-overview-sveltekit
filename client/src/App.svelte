<script>
  import { fade } from "svelte/transition";
  import { cinema_id, moviesLoaded, movies } from "./store";
  import { loadMovies } from "./movieService";
  import Options from "./Options.svelte";
  import Spinner from "./Spinner.svelte";
  import MovieCard from "./MovieCard/MovieCard.svelte";

  // On change load new movies
  $: loadMovies($cinema_id);
</script>

<main>
  <div class="max-w-4xl mx-auto">
    <Options />
    {#if !$moviesLoaded}
      <Spinner />
    {:else}
      {#each $movies as movie}
        <div in:fade={{duration:100}}>
          <MovieCard {movie} />
        </div>
      {/each}
    {/if}
  </div>
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
