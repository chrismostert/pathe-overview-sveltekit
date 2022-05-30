<script>
  import Time from "./Time.svelte";
  import { window_width } from "../../../store";

  export let movie;

  let expanded = false;
  const startHeight = 105;

  let dateTimeElem;
  let dateHeight;

  $: if ($window_width && dateTimeElem) {
    dateHeight = dateTimeElem.scrollHeight;
  }
</script>

<div>
  <!-- Description -->
  <p>{movie.description}</p>

  <!-- Date/times -->
  <div
    bind:this={dateTimeElem}
    class="mt-2 overflow-hidden transition-all duration-500"
    style={expanded ? `max-height: ${dateHeight}px` : `max-height: ${startHeight}px`}
  >
    {#each movie.dateTimes as datetime}
      <p class="font-medium">{datetime.day}</p>
      <div class="flex flex-wrap justify-center xxs:justify-start">
        {#each datetime.times as time}
          <Time {time} />
        {/each}
      </div>
    {/each}
  </div>

  {#if dateHeight > startHeight}
    <button
      on:click={() => {
        expanded = !expanded;
      }}
      class="w-full bg-gray-100 hover:bg-gray-300 text-sm rounded-b-2xl"
      >{expanded ? "Less times..." : "More times..."}</button
    >
  {/if}
</div>
