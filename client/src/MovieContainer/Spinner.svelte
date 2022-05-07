<script>
  import { onDestroy } from "svelte";

  let show = false;
  let imageLoaded = false;
  
  const timeout = setTimeout(() => (show = true), 200);
  onDestroy(() => clearTimeout(timeout));
</script>

{#if show}
  <div class="text-center">
    <img
      src="popcorn.gif"
      alt="loader"
      class="mx-auto"
      on:load={() => imageLoaded = true}
    />
    {#if imageLoaded}
      <div>Loading movies...</div>
    {/if}
  </div>
{/if}
