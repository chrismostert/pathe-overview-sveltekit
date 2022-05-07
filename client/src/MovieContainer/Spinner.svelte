<script>
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";

  let show = false;
  let imageLoaded = false;
  
  const timeout = setTimeout(() => (show = true), 200);
  onDestroy(() => clearTimeout(timeout));
</script>

{#if show}
  <div in:fade={{duration:100}} class="text-center">
    <img
      src="popcorn.gif"
      alt="loader"
      class="mx-auto"
      on:load={() => imageLoaded = true}
    />
    {#if imageLoaded}
      <div>Loading movies, please wait...</div>
    {/if}
  </div>
{/if}
