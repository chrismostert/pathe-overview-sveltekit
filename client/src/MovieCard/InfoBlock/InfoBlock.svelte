<script>
  import Time from "./Time.svelte";
  export let movie;
</script>

<div class="flex flex-col">
  <!-- Description -->
  <p>{movie.description}</p>

  <!-- Date/times -->
  <div class="mt-2">
    {#each movie.dateTimes as datetime}
      <p class="font-medium">{datetime.day}</p>
      <div class="flex flex-wrap">
        {#each datetime.times as time}
          <Time {time} />
        {/each}
      </div>
    {/each}
  </div>
</div>
