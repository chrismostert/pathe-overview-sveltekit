<script>
    export let movie;
</script>

<div class="flex flex-col">
    <!-- Description -->
    <p>{movie.description}</p>

    <!-- Date/times -->
    <div class="mt-4">
      {#each movie.dateTimes as datetime}
        <p class="font-medium">{datetime.day}</p>
        <div class="flex flex-wrap">
          {#each datetime.times as time}
            <p class="mr-4">
              {time.start} - {time.end} ({time.label})
            </p>
          {/each}
        </div>
      {/each}
    </div>
  </div>