<script>
  import { onDestroy } from "svelte";

  let show = false;
  const timeout = setTimeout(() => (show = true), 100);
  onDestroy(() => clearTimeout(timeout));
</script>

{#if show}
  <div class="text-center">
    <img src="popcorn.gif" alt="loader" class="mx-auto" />
    <p>Loading movies...</p>
  </div>
{/if}
