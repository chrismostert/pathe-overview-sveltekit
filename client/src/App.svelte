<script>
  import OptionBanner from "./OptionBanner.svelte";
  import MovieContainer from "./MovieContainer/MovieContainer.svelte";  
</script>

<main>
  <div class="max-w-4xl mx-auto">
    <OptionBanner />
    <MovieContainer />
  </div>
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
