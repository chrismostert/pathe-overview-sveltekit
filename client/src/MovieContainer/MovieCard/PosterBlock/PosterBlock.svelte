<script>
    import Ratings from "./Ratings.svelte";
    export let movie;
</script>

<div class="inline-block ml-auto mr-auto xxs:mr-4 shrink-0">
    <img
        src={movie.poster.includes("poster_missing.png")
            ? `https://www.pathe.nl/${movie.poster}`
            : movie.poster}
        alt={movie.title}
        class="w-48 mb-2"
    />
    {#if movie.rtData}
        <Ratings {movie} />
    {/if}
</div>
