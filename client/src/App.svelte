<script>
  import { onMount } from "svelte";
  import Spinner from "./Spinner.svelte";
  import PosterBlock from "./PosterBlock.svelte";
  import InfoBlock from "./InfoBlock.svelte";

  let movies = [];
  let moviesLoaded = false;

  onMount(async () => {
    moviesLoaded = false;
    // Fetch data
    const res = await fetch("http://localhost:3000/movies?cinema=18");
    let moviesJson = await res.json();

    // Is playing in selected cinema?
    moviesJson = moviesJson.filter((movie) => movie.dateTimes.length > 0);

    // Sort by critic score
    moviesJson.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.rtData && a.rtData.scores && a.rtData.scores.criticsScore) {
        scoreA = a.rtData.scores.criticsScore;
      }
      if (b.rtData && b.rtData.scores && b.rtData.scores.criticsScore) {
        scoreB = b.rtData.scores.criticsScore;
      }
      return scoreB - scoreA;
    });

    // Set movie variable
    movies = moviesJson;
    moviesLoaded = true;
  });
</script>

<main>
  <div class="container relative mx-auto py-4">
    {#if !moviesLoaded}
      <Spinner />
    {:else}
      {#each movies as movie}
        <!-- Card -->
        <div
          class="max-w-4xl mx-auto p-4 mb-1 shadow-md border-2"
        >
          <!-- Title -->
          <div class="mb-2">
            <a
              href={`https://www.pathe.nl/film/${movie.patheID}`}
              class="text-xl font-bold text-cyan-700 hover:text-cyan-900">{movie.titleVisual}</a
            >
          </div>

          <div class="flex">
            <PosterBlock {movie} />
            <InfoBlock {movie} />
          </div>
          
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
