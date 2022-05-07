<script>
  import { fade } from "svelte/transition";
  import { cinema_id } from "./store";
  import { loadMovies } from "./movieService";
  import Options from "./Options.svelte";
  import Spinner from "./Spinner.svelte";
  import MovieCard from "./MovieCard/MovieCard.svelte";

  let movies = [];

  // On change load new movies
  $: movies = loadMovies($cinema_id);
</script>

<main>
  <div class="max-w-4xl mx-auto">
    <Options />

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
  </div>
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
